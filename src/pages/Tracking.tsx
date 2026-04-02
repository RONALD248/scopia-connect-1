import { useState, useEffect } from 'react';
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
  Play,
  Square,
  ChevronLeft,
  Sparkles,
  Compass,
  Activity,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLiveTracking } from '@/hooks/useLiveTracking';
import { LiveTrackingMap } from '@/components/LiveTrackingMap';
import { cn } from '@/lib/utils';

// Simulated provider data
const mockProvider = {
  name: 'Sarah M.',
  rating: 4.9,
  reviews: 234,
  service: 'Deep House Cleaning',
  photo: '/placeholder.svg',
  vehicle: 'White Toyota Corolla',
  plate: 'KBZ 421M',
};

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

type ServicePhase = 'arriving' | 'in_progress' | 'completed';

const Tracking = () => {
  const [phase, setPhase] = useState<ServicePhase>('arriving');
  const [simulatedProviderPos, setSimulatedProviderPos] = useState({ lat: 0, lon: 0, heading: 45 });
  const [progress, setProgress] = useState(0);

  const {
    currentPosition,
    positionHistory,
    distanceTraveled,
    averageSpeed,
    currentSpeed,
    heading,
    cardinalDirection,
    isTracking,
    error,
    elapsedTime,
    eta,
    startTracking,
    stopTracking,
    resetTracking,
  } = useLiveTracking({
    enableHighAccuracy: true,
    destinationLat: -1.2921,
    destinationLon: 36.8219,
  });

  // Simulate provider movement towards user
  useEffect(() => {
    if (phase !== 'arriving') return;
    const interval = setInterval(() => {
      setSimulatedProviderPos(prev => ({
        lat: prev.lat + (Math.random() - 0.3) * 0.0005,
        lon: prev.lon + (Math.random() - 0.3) * 0.0005,
        heading: prev.heading + (Math.random() - 0.5) * 20,
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [phase]);

  // Simulate progress during in_progress phase
  useEffect(() => {
    if (phase !== 'in_progress') return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setPhase('completed');
          stopTracking();
          return 100;
        }
        return prev + 0.5;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, stopTracking]);

  const handleStartService = () => {
    setPhase('in_progress');
    startTracking();
  };

  const phaseConfig = {
    arriving: {
      label: 'Provider En Route',
      color: 'bg-secondary text-secondary-foreground',
      icon: Navigation2,
    },
    in_progress: {
      label: 'Service In Progress',
      color: 'bg-primary text-primary-foreground',
      icon: Activity,
    },
    completed: {
      label: 'Service Completed',
      color: 'bg-success text-success-foreground',
      icon: CheckCircle2,
    },
  };

  const currentPhase = phaseConfig[phase];

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
          <Badge className={cn("gap-1.5", currentPhase.color)}>
            <currentPhase.icon className="w-3 h-3" />
            {currentPhase.label}
          </Badge>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Live Map */}
        <div className="animate-fade-in">
          <LiveTrackingMap
            currentPosition={currentPosition}
            positionHistory={positionHistory}
            providerPosition={phase === 'arriving' ? simulatedProviderPos : null}
            heading={heading}
            isTracking={isTracking}
          />
        </div>

        {/* ETA / Progress bar */}
        {phase === 'in_progress' && (
          <Card className="p-4 border-2 animate-fade-up">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Service Progress</span>
              <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>Started {formatTime(elapsedTime)} ago</span>
              <span>{eta ? `~${eta} remaining` : 'Calculating...'}</span>
            </div>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {[
            { icon: Gauge, label: 'Speed', value: `${currentSpeed} km/h`, color: 'text-primary' },
            { icon: Route, label: 'Distance', value: `${distanceTraveled} km`, color: 'text-secondary' },
            { icon: Clock, label: 'Elapsed', value: formatTime(elapsedTime), color: 'text-accent' },
            { icon: Compass, label: 'Heading', value: cardinalDirection, color: 'text-primary' },
          ].map(({ icon: Icon, label, value, color }) => (
            <Card key={label} className="p-4 border-2 text-center">
              <Icon className={cn("w-5 h-5 mx-auto mb-1", color)} />
              <p className="text-lg font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </Card>
          ))}
        </div>

        {/* Error display */}
        {error && (
          <Card className="p-4 border-2 border-destructive/30 bg-destructive/5 animate-fade-up">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <div>
                <p className="text-sm font-medium text-destructive">{error}</p>
                <p className="text-xs text-muted-foreground mt-1">GPS will auto-retry when signal is restored</p>
              </div>
            </div>
          </Card>
        )}

        {/* Provider Card */}
        <Card className="p-5 border-2 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src={mockProvider.photo} alt={mockProvider.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-bold text-lg">{mockProvider.name}</h3>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs gap-1">
                  <Shield className="w-3 h-3" /> Verified
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{mockProvider.service}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
                <span className="text-sm font-semibold">{mockProvider.rating}</span>
                <span className="text-xs text-muted-foreground">({mockProvider.reviews} reviews)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="border-2 w-10 h-10">
                <Phone className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" className="border-2 w-10 h-10">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {phase === 'arriving' && (
            <div className="mt-4 p-3 rounded-xl bg-secondary/10 border border-secondary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Navigation2 className="w-4 h-4 text-secondary" />
                  <span className="font-medium">{mockProvider.vehicle}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-mono text-xs bg-background px-2 py-0.5 rounded">{mockProvider.plate}</span>
                </div>
                <Badge className="bg-secondary text-secondary-foreground text-xs">~5 min away</Badge>
              </div>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {phase === 'arriving' && (
            <Button onClick={handleStartService} className="flex-1 h-14 bg-gradient-primary hover:opacity-90 text-lg font-semibold gap-2">
              <Play className="w-5 h-5" /> Start Service
            </Button>
          )}
          {phase === 'in_progress' && (
            <Button onClick={() => { setPhase('completed'); stopTracking(); }} variant="destructive" className="flex-1 h-14 text-lg font-semibold gap-2">
              <Square className="w-5 h-5" /> End Service
            </Button>
          )}
          {phase === 'completed' && (
            <>
              <Button asChild className="flex-1 h-14 bg-gradient-primary hover:opacity-90 text-lg font-semibold gap-2">
                <Link to="/search">
                  <Star className="w-5 h-5" /> Rate & Review
                </Link>
              </Button>
              <Button variant="outline" className="h-14 border-2 px-6" onClick={resetTracking}>
                New Booking
              </Button>
            </>
          )}
        </div>

        {/* GPS coordinates footer */}
        {currentPosition && (
          <div className="text-center animate-fade-up" style={{ animationDelay: '0.25s' }}>
            <code className="text-xs text-muted-foreground font-mono">
              {currentPosition.latitude.toFixed(6)}°, {currentPosition.longitude.toFixed(6)}° • ±{Math.round(currentPosition.accuracy)}m accuracy
            </code>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;
