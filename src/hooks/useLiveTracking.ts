import { useState, useEffect, useCallback, useRef } from 'react';
import { calculateDistance, calculateBearing, getCardinalDirection } from '@/lib/geoUtils';

export interface TrackingPoint {
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number | null;
  heading: number | null;
  timestamp: number;
}

export interface LiveTrackingState {
  currentPosition: TrackingPoint | null;
  positionHistory: TrackingPoint[];
  distanceTraveled: number;
  averageSpeed: number;
  currentSpeed: number;
  heading: number | null;
  cardinalDirection: string;
  isTracking: boolean;
  error: string | null;
  elapsedTime: number;
  eta: string | null;
}

interface UseLiveTrackingOptions {
  enableHighAccuracy?: boolean;
  updateInterval?: number;
  maxHistoryLength?: number;
  destinationLat?: number;
  destinationLon?: number;
}

export function useLiveTracking(options: UseLiveTrackingOptions = {}) {
  const {
    enableHighAccuracy = true,
    maxHistoryLength = 500,
    destinationLat,
    destinationLon,
  } = options;

  const [state, setState] = useState<LiveTrackingState>({
    currentPosition: null,
    positionHistory: [],
    distanceTraveled: 0,
    averageSpeed: 0,
    currentSpeed: 0,
    heading: null,
    cardinalDirection: 'N',
    isTracking: false,
    error: null,
    elapsedTime: 0,
    eta: null,
  });

  const watchIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const calculateETA = useCallback((lat: number, lon: number, speed: number) => {
    if (!destinationLat || !destinationLon || speed <= 0) return null;
    const remaining = calculateDistance(lat, lon, destinationLat, destinationLon);
    const hoursRemaining = remaining / speed;
    const minutesRemaining = Math.ceil(hoursRemaining * 60);
    if (minutesRemaining < 1) return 'Arriving';
    if (minutesRemaining < 60) return `${minutesRemaining} min`;
    const h = Math.floor(minutesRemaining / 60);
    const m = minutesRemaining % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }, [destinationLat, destinationLon]);

  const handlePosition = useCallback((position: GeolocationPosition) => {
    const point: TrackingPoint = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      speed: position.coords.speed,
      heading: position.coords.heading,
      timestamp: position.timestamp,
    };

    setState(prev => {
      const history = [...prev.positionHistory, point].slice(-maxHistoryLength);
      
      // Calculate distance from last point
      let addedDistance = 0;
      if (prev.currentPosition) {
        addedDistance = calculateDistance(
          prev.currentPosition.latitude, prev.currentPosition.longitude,
          point.latitude, point.longitude
        );
      }
      const totalDistance = prev.distanceTraveled + addedDistance;

      // Speed: prefer GPS speed, fallback to calculated
      const currentSpeed = point.speed != null && point.speed >= 0
        ? point.speed * 3.6 // m/s to km/h
        : addedDistance > 0 && prev.currentPosition
          ? (addedDistance / ((point.timestamp - prev.currentPosition.timestamp) / 3600000))
          : prev.currentSpeed;

      // Average speed
      const elapsed = startTimeRef.current ? (Date.now() - startTimeRef.current) / 3600000 : 0;
      const avgSpeed = elapsed > 0 ? totalDistance / elapsed : 0;

      // Heading
      let heading = point.heading;
      if (heading == null && prev.currentPosition) {
        heading = calculateBearing(
          prev.currentPosition.latitude, prev.currentPosition.longitude,
          point.latitude, point.longitude
        );
      }

      const cardinal = heading != null ? getCardinalDirection(heading) : prev.cardinalDirection;
      const eta = calculateETA(point.latitude, point.longitude, currentSpeed || avgSpeed || 30);

      return {
        currentPosition: point,
        positionHistory: history,
        distanceTraveled: Math.round(totalDistance * 100) / 100,
        averageSpeed: Math.round(avgSpeed * 10) / 10,
        currentSpeed: Math.round(currentSpeed * 10) / 10,
        heading,
        cardinalDirection: cardinal,
        isTracking: true,
        error: null,
        elapsedTime: prev.elapsedTime,
        eta,
      };
    });
  }, [maxHistoryLength, calculateETA]);

  const handleError = useCallback((err: GeolocationPositionError) => {
    const messages: Record<number, string> = {
      1: 'Location permission denied. Please enable GPS.',
      2: 'Location unavailable. Check your GPS signal.',
      3: 'Location request timed out. Retrying...',
    };
    setState(prev => ({ ...prev, error: messages[err.code] || 'Unknown location error' }));
  }, []);

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({ ...prev, error: 'Geolocation not supported' }));
      return;
    }

    startTimeRef.current = Date.now();
    setState(prev => ({ ...prev, isTracking: true, error: null, elapsedTime: 0 }));

    // Elapsed time counter
    timerRef.current = setInterval(() => {
      setState(prev => ({ ...prev, elapsedTime: prev.elapsedTime + 1 }));
    }, 1000);

    watchIdRef.current = navigator.geolocation.watchPosition(
      handlePosition,
      handleError,
      { enableHighAccuracy, timeout: 10000, maximumAge: 0 }
    );
  }, [enableHighAccuracy, handlePosition, handleError]);

  const stopTracking = useCallback(() => {
    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setState(prev => ({ ...prev, isTracking: false }));
  }, []);

  const resetTracking = useCallback(() => {
    stopTracking();
    setState({
      currentPosition: null, positionHistory: [], distanceTraveled: 0,
      averageSpeed: 0, currentSpeed: 0, heading: null, cardinalDirection: 'N',
      isTracking: false, error: null, elapsedTime: 0, eta: null,
    });
  }, [stopTracking]);

  useEffect(() => {
    return () => {
      if (watchIdRef.current != null) navigator.geolocation.clearWatch(watchIdRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { ...state, startTracking, stopTracking, resetTracking };
}
