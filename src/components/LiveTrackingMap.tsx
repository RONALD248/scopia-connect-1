import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Navigation2,
  MapPin,
  Locate,
  ZoomIn,
  ZoomOut,
  Layers,
  Circle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrackingPoint } from '@/hooks/useLiveTracking';

interface LiveTrackingMapProps {
  currentPosition: TrackingPoint | null;
  positionHistory: TrackingPoint[];
  providerPosition?: { lat: number; lon: number; heading?: number } | null;
  heading: number | null;
  isTracking: boolean;
  className?: string;
}

export function LiveTrackingMap({
  currentPosition,
  positionHistory,
  providerPosition,
  heading,
  isTracking,
  className,
}: LiveTrackingMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the tracking trail on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || positionHistory.length < 2) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.clearRect(0, 0, rect.width, rect.height);

    // Normalize positions to canvas
    const lats = positionHistory.map(p => p.latitude);
    const lons = positionHistory.map(p => p.longitude);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const padding = 60;
    const rangeBuffer = 0.001; // minimum range

    const latRange = Math.max(maxLat - minLat, rangeBuffer);
    const lonRange = Math.max(maxLon - minLon, rangeBuffer);

    const toX = (lon: number) => padding + ((lon - minLon) / lonRange) * (rect.width - padding * 2);
    const toY = (lat: number) => rect.height - padding - ((lat - minLat) / latRange) * (rect.height - padding * 2);

    // Draw trail with gradient
    ctx.beginPath();
    ctx.strokeStyle = 'hsl(168, 80%, 40%)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    positionHistory.forEach((point, i) => {
      const x = toX(point.longitude);
      const y = toY(point.latitude);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw trail dots
    positionHistory.forEach((point, i) => {
      if (i % 3 !== 0 && i !== positionHistory.length - 1) return;
      const x = toX(point.longitude);
      const y = toY(point.latitude);
      const opacity = 0.3 + (i / positionHistory.length) * 0.7;

      ctx.beginPath();
      ctx.fillStyle = `hsla(168, 80%, 40%, ${opacity})`;
      ctx.arc(x, y, i === positionHistory.length - 1 ? 6 : 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [positionHistory]);

  return (
    <Card className={cn("relative overflow-hidden border-2", className)}>
      <div className="aspect-[16/10] bg-gradient-to-br from-accent-muted via-background to-primary/5 relative">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }} />

        {/* Canvas trail */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-10"
          style={{ pointerEvents: 'none' }}
        />

        {/* Range circles */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-56 h-56 rounded-full border border-primary/10 border-dashed" />
          <div className="absolute inset-0 w-36 h-36 rounded-full border border-primary/15 m-auto" />
          <div className="absolute inset-0 w-20 h-20 rounded-full border border-primary/20 m-auto" />
        </div>

        {/* User location (blue dot like Uber) */}
        {currentPosition && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              {/* Accuracy circle */}
              <div className="absolute -inset-4 w-14 h-14 bg-primary/10 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute -inset-3 w-12 h-12 bg-primary/15 rounded-full" />
              {/* Direction cone */}
              {heading != null && (
                <div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-0 h-0 z-10"
                  style={{
                    transform: `translateX(-50%) rotate(${heading}deg)`,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderBottom: '16px solid hsla(168, 80%, 40%, 0.3)',
                    transformOrigin: 'center 24px',
                  }}
                />
              )}
              {/* Center dot */}
              <div className="w-6 h-6 bg-primary rounded-full border-3 border-primary-foreground shadow-lg flex items-center justify-center relative z-20">
                <div className="w-2 h-2 bg-primary-foreground rounded-full" />
              </div>
            </div>
            <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <Badge className="bg-primary text-primary-foreground shadow-lg text-[10px] px-2 py-0.5">
                You
              </Badge>
            </div>
          </div>
        )}

        {/* Simulated provider marker */}
        {providerPosition && (
          <div className="absolute z-20" style={{ left: '65%', top: '35%' }}>
            <div className="relative">
              <div className="absolute -inset-1 w-10 h-10 bg-secondary/20 rounded-full animate-pulse" />
              <div className="w-8 h-8 bg-secondary rounded-full border-2 border-secondary-foreground shadow-lg flex items-center justify-center">
                <Navigation2 className="w-4 h-4 text-secondary-foreground" style={{
                  transform: providerPosition.heading != null ? `rotate(${providerPosition.heading}deg)` : undefined
                }} />
              </div>
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <Badge className="bg-secondary text-secondary-foreground shadow-lg text-[10px] px-2 py-0.5">
                Provider en route
              </Badge>
            </div>
          </div>
        )}

        {/* Destination marker */}
        <div className="absolute z-20" style={{ left: '78%', top: '25%' }}>
          <div className="w-8 h-8 bg-destructive rounded-full border-2 border-destructive-foreground shadow-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-destructive-foreground" />
          </div>
          <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <Badge variant="outline" className="bg-background/90 backdrop-blur-sm shadow text-[10px] px-2 py-0.5">
              Destination
            </Badge>
          </div>
        </div>

        {/* No tracking state */}
        {!isTracking && !currentPosition && (
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center z-30">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Navigation2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Start Tracking</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Begin the service to activate real-time GPS tracking
              </p>
            </div>
          </div>
        )}

        {/* Map controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5 z-20">
          {[ZoomIn, ZoomOut, Layers, Locate].map((Icon, i) => (
            <Button key={i} size="icon" variant="secondary" className="w-8 h-8 bg-background/90 backdrop-blur-sm shadow-md hover:bg-background">
              <Icon className="w-3.5 h-3.5" />
            </Button>
          ))}
        </div>

        {/* Live badge */}
        {isTracking && (
          <div className="absolute left-3 top-3 z-20">
            <Badge className="bg-destructive text-destructive-foreground shadow-lg gap-1.5 px-3">
              <Circle className="w-2 h-2 fill-current animate-pulse" />
              LIVE
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
}
