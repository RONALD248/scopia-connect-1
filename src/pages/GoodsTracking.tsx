import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Navigation2,
  MapPin,
  Clock,
  Gauge,
  Route,
  Phone,
  MessageSquare,
  Shield,
  Star,
  ChevronLeft,
  Sparkles,
  Package,
  Truck,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Camera,
  FileText,
  Box,
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { LiveProviderMap } from '@/components/LiveProviderMap';
import { useProviderSimulation, SimulatedProvider } from '@/hooks/useProviderSimulation';
import { useGeolocation } from '@/hooks/useGeolocation';
import { cn } from '@/lib/utils';

type TrackingPhase = 'pickup' | 'in_transit' | 'delivering' | 'delivered';

const phaseSteps: { phase: TrackingPhase; label: string; icon: typeof Package }[] = [
  { phase: 'pickup', label: 'Pickup', icon: Package },
  { phase: 'in_transit', label: 'In Transit', icon: Truck },
  { phase: 'delivering', label: 'Delivering', icon: Navigation2 },
  { phase: 'delivered', label: 'Delivered', icon: CheckCircle2 },
];

const mockItems = [
  { name: '3-Seater Sofa', weight: '45 kg', status: 'loaded' },
  { name: 'Dining Table Set', weight: '30 kg', status: 'loaded' },
  { name: 'Moving Boxes (x8)', weight: '60 kg', status: 'loaded' },
  { name: 'Wardrobe', weight: '55 kg', status: 'loaded' },
];

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const GoodsTracking = () => {
  const [searchParams] = useSearchParams();
  const providerId = searchParams.get('provider') || 'sp-002';

  const { latitude, longitude, getCurrentPosition, isSupported } = useGeolocation();
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const { providers, getProviderById } = useProviderSimulation(userLocation);
  const [phase, setPhase] = useState<TrackingPhase>('pickup');
  const [elapsed, setElapsed] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto-detect location
  useEffect(() => {
    if (isSupported) getCurrentPosition();
  }, []);

  useEffect(() => {
    if (latitude && longitude) setUserLocation({ lat: latitude, lon: longitude });
    else setUserLocation({ lat: -1.2921, lon: 36.8219 }); // Nairobi fallback
  }, [latitude, longitude]);

  // Elapsed timer
  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 0.3;
        if (next >= 25 && phase === 'pickup') setPhase('in_transit');
        if (next >= 65 && phase === 'in_transit') setPhase('delivering');
        if (next >= 95 && phase === 'delivering') setPhase('delivered');
        return Math.min(next, 100);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  const currentProvider = getProviderById(providerId);
  const currentPhaseIndex = phaseSteps.findIndex(s => s.phase === phase);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/search"><ChevronLeft className="w-5 h-5" /></Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">SCOPIA</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-destructive text-destructive-foreground shadow-lg gap-1.5">
              <Circle className="w-2 h-2 fill-current animate-pulse" />
              LIVE TRACKING
            </Badge>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 space-y-5">
        {/* Live Map with provider tracking */}
        <div className="animate-fade-in">
          <LiveProviderMap
            userLocation={userLocation}
            providers={providers.filter(p => p.id === providerId)}
            selectedProviderId={providerId}
            trackingProviderId={providerId}
            showRoute
          />
        </div>

        {/* Phase Progress Stepper */}
        <Card className="p-4 border-2 animate-fade-up">
          <div className="flex items-center justify-between mb-4">
            {phaseSteps.map((step, i) => {
              const StepIcon = step.icon;
              const isActive = i === currentPhaseIndex;
              const isDone = i < currentPhaseIndex;
              return (
                <div key={step.phase} className="flex flex-col items-center flex-1 relative">
                  {i > 0 && (
                    <div className={cn(
                      "absolute top-4 -left-1/2 w-full h-0.5",
                      isDone ? "bg-primary" : "bg-border"
                    )} />
                  )}
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all border-2",
                    isActive ? "bg-primary text-primary-foreground border-primary scale-110 shadow-lg" :
                    isDone ? "bg-primary text-primary-foreground border-primary" :
                    "bg-background text-muted-foreground border-border"
                  )}>
                    <StepIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className={cn("text-[10px] mt-1.5 font-medium",
                    isActive ? "text-primary" : isDone ? "text-foreground" : "text-muted-foreground"
                  )}>{step.label}</span>
                </div>
              );
            })}
          </div>
          <Progress value={progress} className="h-1.5" />
          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
            <span>Elapsed: {formatTime(elapsed)}</span>
            <span>{currentProvider?.eta ? `ETA: ${currentProvider.eta}` : 'Calculating...'}</span>
          </div>
        </Card>

        {/* Provider + Vehicle Info */}
        {currentProvider && (
          <Card className="p-4 border-2 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img src={currentProvider.photo} alt={currentProvider.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{currentProvider.name}</h3>
                  {currentProvider.verified && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-[10px] gap-0.5 px-1.5">
                      <Shield className="w-2.5 h-2.5" /> Verified
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{currentProvider.service}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 text-secondary fill-secondary" />
                  <span className="text-xs font-semibold">{currentProvider.rating}</span>
                  <span className="text-[10px] text-muted-foreground">({currentProvider.reviews})</span>
                </div>
              </div>
              <div className="flex gap-1.5">
                <Button size="icon" variant="outline" className="border-2 w-9 h-9">
                  <Phone className="w-3.5 h-3.5" />
                </Button>
                <Button size="icon" variant="outline" className="border-2 w-9 h-9">
                  <MessageSquare className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
            <div className="mt-3 p-2.5 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <Truck className="w-4 h-4 text-secondary" />
                <span className="font-medium">{currentProvider.vehicle}</span>
                <span className="text-muted-foreground">•</span>
                <span className="font-mono text-[10px] bg-background px-1.5 py-0.5 rounded">{currentProvider.plate}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px]">
                <Gauge className="w-3 h-3 text-muted-foreground" />
                <span className="font-medium">{currentProvider.speed} km/h</span>
              </div>
            </div>
          </Card>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          {[
            { icon: Route, label: 'Distance', value: `${currentProvider?.distanceFromUser || 0} km`, color: 'text-primary' },
            { icon: Gauge, label: 'Speed', value: `${currentProvider?.speed || 0} km/h`, color: 'text-secondary' },
            { icon: Clock, label: 'Elapsed', value: formatTime(elapsed), color: 'text-accent' },
          ].map(({ icon: Icon, label, value, color }) => (
            <Card key={label} className="p-3 border-2 text-center">
              <Icon className={cn("w-4 h-4 mx-auto mb-1", color)} />
              <p className="text-sm font-bold">{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </Card>
          ))}
        </div>

        {/* Items being moved */}
        <Card className="p-4 border-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 mb-3">
            <Box className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Items Being Moved</h3>
            <Badge variant="outline" className="ml-auto text-[10px]">{mockItems.length} items</Badge>
          </div>
          <div className="space-y-2">
            {mockItems.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-accent/30 border border-border/50">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">{item.weight}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                  <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 animate-fade-up" style={{ animationDelay: '0.25s' }}>
          {phase !== 'delivered' ? (
            <>
              <Button variant="outline" className="flex-1 h-12 border-2 gap-2">
                <Camera className="w-4 h-4" />
                Request Photo Update
              </Button>
              <Button variant="outline" className="h-12 border-2 gap-2 px-6">
                <FileText className="w-4 h-4" />
                Report Issue
              </Button>
            </>
          ) : (
            <Button asChild className="flex-1 h-12 bg-gradient-primary hover:opacity-90 font-semibold gap-2">
              <Link to="/search">
                <Star className="w-4 h-4" /> Rate & Review Delivery
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoodsTracking;
