import { useState, useEffect, useCallback, useRef } from 'react';
import { calculateDistance, calculateBearing } from '@/lib/geoUtils';

export interface SimulatedProvider {
  id: string;
  name: string;
  category: 'cleaning' | 'moving';
  service: string;
  rating: number;
  reviews: number;
  photo: string;
  vehicle: string;
  plate: string;
  phone: string;
  verified: boolean;
  available: boolean;
  latitude: number;
  longitude: number;
  heading: number;
  speed: number; // km/h
  status: 'idle' | 'en_route' | 'working' | 'returning';
  distanceFromUser: number;
  eta: string;
}

const PROVIDER_TEMPLATES = [
  { id: 'sp-001', name: 'Sarah M.', category: 'cleaning' as const, service: 'Deep House Cleaning', rating: 4.9, reviews: 234, vehicle: 'White Toyota Corolla', plate: 'KBZ 421M', phone: '+254 712 345 678', verified: true },
  { id: 'sp-002', name: 'James K.', category: 'moving' as const, service: 'Residential Moving', rating: 4.8, reviews: 189, vehicle: 'Blue Isuzu Truck', plate: 'KCA 891B', phone: '+254 723 456 789', verified: true },
  { id: 'sp-003', name: 'Grace W.', category: 'cleaning' as const, service: 'Office Cleaning', rating: 4.7, reviews: 312, vehicle: 'Silver Honda Fit', plate: 'KDA 112C', phone: '+254 734 567 890', verified: true },
  { id: 'sp-004', name: 'Peter O.', category: 'moving' as const, service: 'Commercial Moving', rating: 4.9, reviews: 156, vehicle: 'White Mitsubishi Canter', plate: 'KBM 223D', phone: '+254 745 678 901', verified: false },
  { id: 'sp-005', name: 'Lucy N.', category: 'cleaning' as const, service: 'Carpet & Upholstery', rating: 5.0, reviews: 98, vehicle: 'Red Suzuki Swift', plate: 'KCB 334E', phone: '+254 756 789 012', verified: true },
  { id: 'sp-006', name: 'David M.', category: 'moving' as const, service: 'Furniture Delivery', rating: 4.6, reviews: 267, vehicle: 'Grey Toyota Dyna', plate: 'KAZ 445F', phone: '+254 767 890 123', verified: true },
  { id: 'sp-007', name: 'Mary A.', category: 'cleaning' as const, service: 'Post-Construction', rating: 4.8, reviews: 145, vehicle: 'Black Nissan Note', plate: 'KDB 556G', phone: '+254 778 901 234', verified: true },
  { id: 'sp-008', name: 'John T.', category: 'moving' as const, service: 'Office Relocation', rating: 4.7, reviews: 203, vehicle: 'Blue Fuso Fighter', plate: 'KBN 667H', phone: '+254 789 012 345', verified: true },
];

function generateProviderPosition(centerLat: number, centerLon: number, index: number) {
  // Distribute providers in a realistic pattern around center
  const angles = [30, 85, 140, 200, 255, 310, 15, 170];
  const distances = [0.8, 1.5, 2.2, 0.5, 3.0, 1.8, 2.5, 1.2]; // km
  const angle = (angles[index % angles.length]) * (Math.PI / 180);
  const dist = distances[index % distances.length];
  const latOffset = (Math.sin(angle) * dist) / 111;
  const lonOffset = (Math.cos(angle) * dist) / (111 * Math.cos(centerLat * Math.PI / 180));
  return {
    latitude: centerLat + latOffset,
    longitude: centerLon + lonOffset,
    heading: angles[index % angles.length],
  };
}

function formatETA(distKm: number, speedKmh: number): string {
  if (speedKmh <= 0) speedKmh = 25;
  const mins = Math.ceil((distKm / speedKmh) * 60);
  if (mins < 1) return '<1 min';
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function useProviderSimulation(userLocation: { lat: number; lon: number } | null) {
  const [providers, setProviders] = useState<SimulatedProvider[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize providers when user location changes
  useEffect(() => {
    if (!userLocation) return;

    const initial = PROVIDER_TEMPLATES.map((tmpl, i) => {
      const pos = generateProviderPosition(userLocation.lat, userLocation.lon, i);
      const dist = calculateDistance(userLocation.lat, userLocation.lon, pos.latitude, pos.longitude);
      return {
        ...tmpl,
        photo: '/placeholder.svg',
        available: i !== 3, // One provider busy
        latitude: pos.latitude,
        longitude: pos.longitude,
        heading: pos.heading,
        speed: 15 + Math.random() * 30,
        status: (i === 1 ? 'en_route' : i === 3 ? 'working' : 'idle') as SimulatedProvider['status'],
        distanceFromUser: Math.round(dist * 100) / 100,
        eta: formatETA(dist, 25),
      };
    });
    setProviders(initial);
  }, [userLocation]);

  // Simulate movement every 3 seconds
  useEffect(() => {
    if (!userLocation || providers.length === 0) return;

    intervalRef.current = setInterval(() => {
      setProviders(prev => prev.map(p => {
        // Only move providers that are en_route or working
        const shouldMove = p.status === 'en_route' || p.status === 'working';
        if (!shouldMove && Math.random() > 0.15) return p; // Idle providers occasionally drift

        // Simulate realistic movement
        const moveScale = shouldMove ? 0.0003 : 0.00005;
        const jitterLat = (Math.random() - 0.4) * moveScale;
        const jitterLon = (Math.random() - 0.4) * moveScale;
        const newLat = p.latitude + jitterLat;
        const newLon = p.longitude + jitterLon;
        const newHeading = calculateBearing(p.latitude, p.longitude, newLat, newLon);
        const dist = calculateDistance(userLocation.lat, userLocation.lon, newLat, newLon);
        const speed = shouldMove ? 20 + Math.random() * 25 : Math.random() * 5;

        return {
          ...p,
          latitude: newLat,
          longitude: newLon,
          heading: newHeading || p.heading,
          speed: Math.round(speed * 10) / 10,
          distanceFromUser: Math.round(dist * 100) / 100,
          eta: formatETA(dist, speed || 25),
        };
      }));
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [userLocation, providers.length]);

  const getProviderById = useCallback((id: string) => {
    return providers.find(p => p.id === id) || null;
  }, [providers]);

  return { providers, getProviderById };
}
