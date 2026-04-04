import { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Navigation2,
  Layers,
  ZoomIn,
  ZoomOut,
  Locate,
  Users,
  Circle,
  Truck,
  SprayCan,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SimulatedProvider } from '@/hooks/useProviderSimulation';

interface LiveProviderMapProps {
  userLocation: { lat: number; lon: number } | null;
  providers: SimulatedProvider[];
  selectedProviderId?: string;
  onProviderSelect?: (id: string) => void;
  className?: string;
  showRoute?: boolean;
  trackingProviderId?: string;
}

export function LiveProviderMap({
  userLocation,
  providers,
  selectedProviderId,
  onProviderSelect,
  className,
  showRoute = false,
  trackingProviderId,
}: LiveProviderMapProps) {
  const [zoom, setZoom] = useState(14);

  // Calculate map bounds and project coordinates to pixel positions
  const projection = useMemo(() => {
    if (!userLocation) return null;

    const allPoints = [
      { lat: userLocation.lat, lon: userLocation.lon },
      ...providers.map(p => ({ lat: p.latitude, lon: p.longitude })),
    ];

    const lats = allPoints.map(p => p.lat);
    const lons = allPoints.map(p => p.lon);
    const buffer = 0.005;
    const minLat = Math.min(...lats) - buffer;
    const maxLat = Math.max(...lats) + buffer;
    const minLon = Math.min(...lons) - buffer;
    const maxLon = Math.max(...lons) + buffer;

    const latRange = maxLat - minLat || 0.01;
    const lonRange = maxLon - minLon || 0.01;

    const toPercent = (lat: number, lon: number) => ({
      x: ((lon - minLon) / lonRange) * 80 + 10, // 10-90% range
      y: (1 - (lat - minLat) / latRange) * 80 + 10,
    });

    return { toPercent, latRange, lonRange };
  }, [userLocation, providers]);

  const trackedProvider = trackingProviderId ? providers.find(p => p.id === trackingProviderId) : null;

  return (
    <Card className={cn("relative overflow-hidden border-2", className)}>
      <div className="aspect-[16/10] bg-gradient-to-br from-accent/5 via-background to-primary/5 relative">
        {/* Map grid */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />

        {/* Simulated roads */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="10" y1="30" x2="90" y2="30" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
          <line x1="10" y1="70" x2="90" y2="70" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
          <line x1="25" y1="10" x2="25" y2="90" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
          <line x1="75" y1="10" x2="75" y2="90" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
        </svg>

        {/* Route line from tracked provider to user */}
        {showRoute && trackedProvider && userLocation && projection && (
          <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {(() => {
              const from = projection.toPercent(trackedProvider.latitude, trackedProvider.longitude);
              const to = projection.toPercent(userLocation.lat, userLocation.lon);
              const midX = (from.x + to.x) / 2 + (Math.random() > 0.5 ? 5 : -5);
              const midY = (from.y + to.y) / 2 + (Math.random() > 0.5 ? 5 : -5);
              return (
                <path
                  d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                  fill="none"
                  stroke="url(#routeGrad)"
                  strokeWidth="0.6"
                  strokeDasharray="2,1"
                  className="animate-pulse"
                />
              );
            })()}
          </svg>
        )}

        {/* User location marker */}
        {userLocation && projection && (
          <div
            className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${projection.toPercent(userLocation.lat, userLocation.lon).x}%`,
              top: `${projection.toPercent(userLocation.lat, userLocation.lon).y}%`,
            }}
          >
            <div className="relative">
              <div className="absolute -inset-3 w-12 h-12 bg-primary/15 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute -inset-2 w-10 h-10 bg-primary/10 rounded-full" />
              <div className="w-6 h-6 bg-primary rounded-full border-2 border-primary-foreground shadow-lg flex items-center justify-center relative z-10">
                <div className="w-2 h-2 bg-primary-foreground rounded-full" />
              </div>
            </div>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <Badge className="bg-primary text-primary-foreground shadow-lg text-[10px] px-2 py-0.5">
                Your Location
              </Badge>
            </div>
          </div>
        )}

        {/* Provider markers */}
        {userLocation && projection && providers.map((provider) => {
          const pos = projection.toPercent(provider.latitude, provider.longitude);
          const isSelected = selectedProviderId === provider.id;
          const isTracked = trackingProviderId === provider.id;
          const Icon = provider.category === 'moving' ? Truck : SprayCan;

          return (
            <button
              key={provider.id}
              onClick={() => onProviderSelect?.(provider.id)}
              className={cn(
                "absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500",
                isSelected || isTracked ? "scale-125 z-30" : "hover:scale-110"
              )}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div className="relative">
                {/* Movement indicator for en_route */}
                {provider.status === 'en_route' && (
                  <div className="absolute -inset-1 w-12 h-12 bg-secondary/20 rounded-full animate-ping" style={{ animationDuration: '1.5s' }} />
                )}
                {/* Heading direction */}
                <div
                  className="absolute -top-1 left-1/2 w-0 h-0"
                  style={{
                    transform: `translateX(-50%) rotate(${provider.heading}deg)`,
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderBottom: `8px solid ${provider.available ? 'hsl(var(--secondary))' : 'hsl(var(--muted-foreground))'}`,
                    transformOrigin: 'center 16px',
                    opacity: provider.status !== 'idle' ? 1 : 0,
                  }}
                />
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 transition-colors",
                  provider.status === 'en_route' ? "bg-secondary border-secondary-foreground" :
                  provider.available ? "bg-primary border-primary-foreground" :
                  "bg-muted border-muted-foreground",
                  (isSelected || isTracked) && "ring-4 ring-secondary/40"
                )}>
                  <Icon className={cn(
                    "w-4 h-4",
                    provider.status === 'en_route' ? "text-secondary-foreground" :
                    provider.available ? "text-primary-foreground" : "text-muted-foreground"
                  )} />
                </div>
              </div>
              {/* Tooltip */}
              {(isSelected || isTracked) && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-background/95 backdrop-blur-sm rounded-lg shadow-xl border border-border p-2 min-w-[140px]">
                    <p className="text-xs font-bold">{provider.name}</p>
                    <p className="text-[10px] text-muted-foreground">{provider.service}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={cn("text-[9px] px-1 py-0",
                        provider.status === 'en_route' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                        provider.available ? 'bg-primary/10 text-primary border-primary/20' :
                        'bg-muted text-muted-foreground'
                      )}>
                        {provider.status === 'en_route' ? 'En Route' : provider.available ? 'Available' : 'Busy'}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">{provider.distanceFromUser} km</span>
                    </div>
                    {provider.speed > 0 && provider.status !== 'idle' && (
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {provider.speed} km/h • ETA {provider.eta}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </button>
          );
        })}

        {/* No location overlay */}
        {!userLocation && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-30">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Navigation2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Enable Location</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Allow location access to see providers near you
              </p>
            </div>
          </div>
        )}

        {/* Map controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5 z-20">
          <Button size="icon" variant="secondary" className="w-8 h-8 bg-background/90 backdrop-blur-sm shadow-md" onClick={() => setZoom(z => Math.min(z + 1, 20))}>
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
          <Button size="icon" variant="secondary" className="w-8 h-8 bg-background/90 backdrop-blur-sm shadow-md" onClick={() => setZoom(z => Math.max(z - 1, 8))}>
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <Button size="icon" variant="secondary" className="w-8 h-8 bg-background/90 backdrop-blur-sm shadow-md">
            <Layers className="w-3.5 h-3.5" />
          </Button>
          <Button size="icon" variant="secondary" className="w-8 h-8 bg-background/90 backdrop-blur-sm shadow-md">
            <Locate className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute left-3 bottom-3 z-20">
          <div className="bg-background/90 backdrop-blur-sm rounded-xl p-2.5 shadow-lg border border-border">
            <div className="flex flex-wrap items-center gap-3 text-[10px]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <span className="text-muted-foreground">En Route</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-muted" />
                <span className="text-muted-foreground">Busy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Provider count + live indicator */}
        <div className="absolute right-3 bottom-3 z-20 flex items-center gap-2">
          {providers.some(p => p.status === 'en_route') && (
            <Badge className="bg-destructive text-destructive-foreground shadow-lg gap-1 text-[10px]">
              <Circle className="w-1.5 h-1.5 fill-current animate-pulse" />
              LIVE
            </Badge>
          )}
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm shadow-md text-[10px]">
            <Users className="w-3 h-3 mr-1" />
            {providers.filter(p => p.available).length} nearby
          </Badge>
        </div>
      </div>
    </Card>
  );
}
