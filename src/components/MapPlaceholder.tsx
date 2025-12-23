import { useState, useEffect } from 'react';
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
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Provider {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  available: boolean;
  category: string;
}

interface MapPlaceholderProps {
  userLocation: { lat: number; lon: number } | null;
  providers: Provider[];
  selectedProviderId?: string;
  onProviderSelect?: (id: string) => void;
  className?: string;
}

export function MapPlaceholder({ 
  userLocation, 
  providers, 
  selectedProviderId,
  onProviderSelect,
  className 
}: MapPlaceholderProps) {
  const [zoom, setZoom] = useState(14);

  // Simulate provider positions on the map grid
  const getProviderPosition = (provider: Provider, index: number) => {
    // Create a pseudo-random but consistent position based on ID
    const seed = provider.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const angle = (seed % 360) * (Math.PI / 180);
    const distance = 20 + (seed % 30);
    
    return {
      left: `${50 + Math.cos(angle) * distance}%`,
      top: `${50 + Math.sin(angle) * distance}%`,
    };
  };

  return (
    <Card className={cn("relative overflow-hidden border-2", className)}>
      {/* Map Background */}
      <div className="aspect-[16/10] bg-gradient-to-br from-accent/30 via-background to-primary/5 relative">
        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Circular Range Indicator */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-48 h-48 rounded-full border-2 border-primary/20 border-dashed animate-pulse" />
          <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-primary/30 m-auto" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-primary/40 m-auto" />
        </div>

        {/* User Location Marker */}
        {userLocation && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              <div className="absolute inset-0 w-6 h-6 bg-primary/30 rounded-full animate-ping" />
              <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm shadow-md text-xs">
                You are here
              </Badge>
            </div>
          </div>
        )}

        {/* Provider Markers */}
        {providers.map((provider, index) => {
          const position = getProviderPosition(provider, index);
          const isSelected = selectedProviderId === provider.id;
          
          return (
            <button
              key={provider.id}
              onClick={() => onProviderSelect?.(provider.id)}
              className={cn(
                "absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300",
                isSelected ? "scale-125 z-30" : "hover:scale-110"
              )}
              style={position}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2",
                provider.available 
                  ? "bg-primary border-primary-foreground" 
                  : "bg-muted border-muted-foreground",
                isSelected && "ring-4 ring-primary/30"
              )}>
                <MapPin className={cn(
                  "w-5 h-5",
                  provider.available ? "text-primary-foreground" : "text-muted-foreground"
                )} />
              </div>
              {isSelected && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <Badge className="bg-primary text-primary-foreground shadow-lg text-xs">
                    {provider.name}
                  </Badge>
                </div>
              )}
            </button>
          );
        })}

        {/* Map Controls */}
        <div className="absolute right-4 top-4 flex flex-col gap-2 z-20">
          <Button 
            size="icon" 
            variant="secondary" 
            className="w-9 h-9 bg-background/90 backdrop-blur-sm shadow-md hover:bg-background"
            onClick={() => setZoom(Math.min(zoom + 1, 20))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button 
            size="icon" 
            variant="secondary" 
            className="w-9 h-9 bg-background/90 backdrop-blur-sm shadow-md hover:bg-background"
            onClick={() => setZoom(Math.max(zoom - 1, 8))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button 
            size="icon" 
            variant="secondary" 
            className="w-9 h-9 bg-background/90 backdrop-blur-sm shadow-md hover:bg-background"
          >
            <Layers className="w-4 h-4" />
          </Button>
          <Button 
            size="icon" 
            variant="secondary" 
            className="w-9 h-9 bg-background/90 backdrop-blur-sm shadow-md hover:bg-background"
          >
            <Locate className="w-4 h-4" />
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute left-4 bottom-4 z-20">
          <div className="bg-background/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-border">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted" />
                <span className="text-muted-foreground">Busy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Provider Count Badge */}
        <div className="absolute right-4 bottom-4 z-20">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm shadow-md">
            <Users className="w-3 h-3 mr-1" />
            {providers.filter(p => p.available).length} available nearby
          </Badge>
        </div>

        {/* No Location State */}
        {!userLocation && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-30">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Navigation2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Enable Location</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Allow location access to see providers near you on the map
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
