import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Crosshair,
  Globe
} from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { formatCoordinates, isValidCoordinate } from '@/lib/geoUtils';
import { cn } from '@/lib/utils';

interface LocationPickerProps {
  onLocationSelect: (lat: number, lon: number, address?: string) => void;
  className?: string;
}

export function LocationPicker({ onLocationSelect, className }: LocationPickerProps) {
  const [manualAddress, setManualAddress] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const { latitude, longitude, accuracy, error, loading, getCurrentPosition, isSupported } = useGeolocation();

  useEffect(() => {
    if (latitude && longitude && isValidCoordinate(latitude, longitude)) {
      onLocationSelect(latitude, longitude);
      setIsLocating(false);
    }
  }, [latitude, longitude, onLocationSelect]);

  const handleGetLocation = () => {
    setIsLocating(true);
    getCurrentPosition();
  };

  const getLocationStatus = () => {
    if (loading || isLocating) {
      return { icon: Loader2, text: 'Detecting location...', variant: 'default' as const, animate: true };
    }
    if (error) {
      return { icon: AlertCircle, text: getErrorMessage(error), variant: 'destructive' as const, animate: false };
    }
    if (latitude && longitude) {
      return { icon: CheckCircle2, text: 'Location detected', variant: 'default' as const, animate: false };
    }
    return null;
  };

  const getErrorMessage = (error: GeolocationPositionError) => {
    switch (error.code) {
      case 1:
        return 'Location access denied. Please enable permissions.';
      case 2:
        return 'Unable to determine location. Try again.';
      case 3:
        return 'Location request timed out. Try again.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  const status = getLocationStatus();

  return (
    <Card className={cn("p-6 border-2 bg-card/50 backdrop-blur-sm", className)}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Globe className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Your Location</h3>
          <p className="text-sm text-muted-foreground">Enable GPS for accurate matching</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Manual Address Input */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Enter address or area..."
            className="pl-10 h-12 bg-background border-2 focus:border-primary"
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
          />
        </div>

        {/* GPS Detection Button */}
        <Button 
          onClick={handleGetLocation}
          disabled={!isSupported || loading || isLocating}
          className="w-full h-12 bg-gradient-primary hover:opacity-90 transition-all font-medium"
        >
          {loading || isLocating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Detecting Location...
            </>
          ) : (
            <>
              <Crosshair className="w-4 h-4 mr-2" />
              Use Current GPS Location
            </>
          )}
        </Button>

        {/* Status Display */}
        {status && (
          <div className={cn(
            "flex items-center gap-2 p-3 rounded-xl text-sm",
            status.variant === 'destructive' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
          )}>
            <status.icon className={cn("w-4 h-4", status.animate && "animate-spin")} />
            <span>{status.text}</span>
          </div>
        )}

        {/* Coordinates Display */}
        {latitude && longitude && !error && (
          <div className="p-4 rounded-xl bg-accent/50 border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">GPS Coordinates</span>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Navigation className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>
            <code className="text-xs text-muted-foreground font-mono block mb-2">
              {formatCoordinates(latitude, longitude)}
            </code>
            {accuracy && (
              <p className="text-xs text-muted-foreground">
                Accuracy: ±{Math.round(accuracy)}m
              </p>
            )}
          </div>
        )}

        {!isSupported && (
          <p className="text-sm text-destructive text-center">
            Geolocation is not supported by your browser
          </p>
        )}
      </div>
    </Card>
  );
}
