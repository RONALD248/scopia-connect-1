import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  MapPin, 
  Star, 
  Filter, 
  Search as SearchIcon, 
  Clock, 
  DollarSign,
  Sparkles,
  Home,
  Building2,
  Factory,
  Zap,
  Phone,
  MessageSquare,
  ChevronRight,
  Shield,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { LocationPicker } from "@/components/LocationPicker";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { calculateDistance, rankProviders, ProviderLocation } from "@/lib/geoUtils";

const Search = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [maxDistance, setMaxDistance] = useState([5]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [selectedProviderId, setSelectedProviderId] = useState<string | undefined>();
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  const handleLocationSelect = useCallback((lat: number, lon: number) => {
    setUserLocation({ lat, lon });
  }, []);

  const categories = [
    { id: "domestic", name: "Domestic", icon: Home, description: "Homes & Apartments" },
    { id: "commercial", name: "Commercial", icon: Building2, description: "Offices & Retail" },
    { id: "industrial", name: "Industrial", icon: Factory, description: "Warehouses" },
    { id: "specialized", name: "Specialized", icon: Zap, description: "Deep Clean" }
  ];

  // Mock provider data with realistic coordinates (will be near user when location is set)
  const baseProviders = [
    {
      id: "prov-001",
      name: "Premium Clean Solutions",
      rating: 4.9,
      reviews: 234,
      category: "Commercial",
      price: 45,
      available: true,
      specialties: ["Office Cleaning", "Deep Clean"],
      image: "/placeholder.svg",
      responseTimeMinutes: 5,
      verified: true,
      specializations: ["Commercial", "Office Cleaning"]
    },
    {
      id: "prov-002",
      name: "Sparkle Home Services",
      rating: 4.8,
      reviews: 189,
      category: "Domestic",
      price: 35,
      available: true,
      specialties: ["Regular Cleaning", "Move-in/out"],
      image: "/placeholder.svg",
      responseTimeMinutes: 10,
      verified: true,
      specializations: ["Domestic", "Regular Cleaning"]
    },
    {
      id: "prov-003",
      name: "Industrial Pro Cleaners",
      rating: 4.7,
      reviews: 156,
      category: "Industrial",
      price: 85,
      available: false,
      specialties: ["Factory Cleaning", "Warehouse"],
      image: "/placeholder.svg",
      responseTimeMinutes: 15,
      verified: true,
      specializations: ["Industrial", "Factory Cleaning"]
    },
    {
      id: "prov-004",
      name: "Elite Specialized Care",
      rating: 5.0,
      reviews: 98,
      category: "Specialized",
      price: 120,
      available: true,
      specialties: ["Carpet Cleaning", "Window Washing"],
      image: "/placeholder.svg",
      responseTimeMinutes: 8,
      verified: true,
      specializations: ["Specialized", "Carpet Cleaning"]
    },
    {
      id: "prov-005",
      name: "Quick Home Helpers",
      rating: 4.6,
      reviews: 312,
      category: "Domestic",
      price: 30,
      available: true,
      specialties: ["Regular Cleaning", "Laundry"],
      image: "/placeholder.svg",
      responseTimeMinutes: 3,
      verified: false,
      specializations: ["Domestic", "Regular Cleaning"]
    },
    {
      id: "prov-006",
      name: "GreenClean Eco Services",
      rating: 4.8,
      reviews: 267,
      category: "Domestic",
      price: 40,
      available: true,
      specialties: ["Eco-Friendly", "Organic Products"],
      image: "/placeholder.svg",
      responseTimeMinutes: 12,
      verified: true,
      specializations: ["Domestic", "Eco-Friendly"]
    }
  ];

  // Calculate distances and filter providers based on user location
  const providersWithDistance = useMemo(() => {
    if (!userLocation) {
      return baseProviders.map(p => ({ ...p, distance: Math.random() * 5 + 0.5 }));
    }

    // Generate pseudo-random but consistent coordinates for each provider
    return baseProviders.map((provider, index) => {
      const seed = provider.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const angle = (seed % 360) * (Math.PI / 180);
      const dist = 0.5 + (seed % 100) / 20; // 0.5 to 5.5 km
      
      const providerLat = userLocation.lat + (Math.sin(angle) * dist / 111);
      const providerLon = userLocation.lon + (Math.cos(angle) * dist / (111 * Math.cos(userLocation.lat * Math.PI / 180)));
      
      const distance = calculateDistance(userLocation.lat, userLocation.lon, providerLat, providerLon);
      
      return {
        ...provider,
        latitude: providerLat,
        longitude: providerLon,
        distance
      };
    });
  }, [userLocation]);

  // Filter and sort providers
  const filteredProviders = useMemo(() => {
    return providersWithDistance
      .filter(p => !selectedCategory || p.category === selectedCategory)
      .filter(p => p.distance <= maxDistance[0])
      .filter(p => !minRating || p.rating >= minRating)
      .sort((a, b) => a.distance - b.distance);
  }, [providersWithDistance, selectedCategory, maxDistance, minRating]);

  // Map providers for the MapPlaceholder component
  const mapProviders = filteredProviders.map(p => ({
    id: p.id,
    name: p.name,
    latitude: (p as any).latitude || 0,
    longitude: (p as any).longitude || 0,
    available: p.available,
    category: p.category
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SCOPIA
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/providers">For Providers</Link>
            </Button>
            <Button variant="outline" className="border-2" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Find Cleaning Services</h1>
          <p className="text-muted-foreground">Discover verified professionals near your location</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Location Picker */}
            <div className="animate-fade-up">
              <LocationPicker onLocationSelect={handleLocationSelect} />
            </div>

            {/* Filters Card */}
            <Card className="p-6 border-2 shadow-lg animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Filter className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Filters</h2>
              </div>

              {/* Service Categories */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block text-muted-foreground">Service Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.name ? "default" : "outline"}
                      className={`justify-start flex-col items-start h-auto py-3 ${selectedCategory === category.name ? 'bg-gradient-primary border-0' : 'border-2'}`}
                      onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                    >
                      <category.icon className="w-4 h-4 mb-1" />
                      <span className="text-xs font-medium">{category.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Distance Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-muted-foreground">Max Distance</label>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {maxDistance[0]} km
                  </Badge>
                </div>
                <Slider
                  value={maxDistance}
                  onValueChange={setMaxDistance}
                  max={10}
                  min={0.5}
                  step={0.5}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0.5 km</span>
                  <span>10 km</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block text-muted-foreground">Minimum Rating</label>
                <div className="flex gap-1">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <Button 
                      key={rating} 
                      variant={minRating === rating ? "default" : "outline"}
                      size="sm" 
                      className={`flex-1 ${minRating === rating ? 'bg-secondary text-secondary-foreground' : 'border-2'}`}
                      onClick={() => setMinRating(minRating === rating ? null : rating)}
                    >
                      {rating}★
                    </Button>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="text-sm font-medium mb-3 block text-muted-foreground">Availability</label>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="justify-start border-2 h-11">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    Available Now
                  </Button>
                  <Button variant="outline" className="justify-start border-2 h-11">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    Schedule Later
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <div className="animate-fade-in">
              <MapPlaceholder
                userLocation={userLocation}
                providers={mapProviders}
                selectedProviderId={selectedProviderId}
                onProviderSelect={setSelectedProviderId}
              />
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div>
                <h2 className="text-xl font-bold">
                  {filteredProviders.length} Provider{filteredProviders.length !== 1 ? 's' : ''} Found
                </h2>
                <p className="text-sm text-muted-foreground">
                  {userLocation ? 'Sorted by distance from your location' : 'Enable GPS for accurate distance'}
                </p>
              </div>
              <Button variant="outline" className="border-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                Sort By
              </Button>
            </div>

            {/* Provider Cards */}
            <div className="space-y-4">
              {filteredProviders.map((provider, index) => (
                <Card 
                  key={provider.id} 
                  className={`p-6 transition-all duration-300 border-2 cursor-pointer animate-fade-up hover:shadow-xl hover:border-primary/30 ${
                    selectedProviderId === provider.id ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}
                  style={{ animationDelay: `${0.15 + index * 0.05}s` }}
                  onClick={() => setSelectedProviderId(provider.id)}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Provider Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                        <img 
                          src={provider.image} 
                          alt={provider.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Provider Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold">{provider.name}</h3>
                            {provider.verified && (
                              <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-secondary fill-secondary" />
                              <span className="font-semibold text-foreground">{provider.rating}</span>
                              <span>({provider.reviews})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="font-medium">{provider.distance.toFixed(1)} km</span>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          className={provider.available 
                            ? 'bg-primary/10 text-primary border-primary/20' 
                            : 'bg-muted text-muted-foreground'
                          }
                        >
                          {provider.available ? 'Available' : 'Busy'}
                        </Badge>
                      </div>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="bg-accent/50 border-0">
                          {provider.category}
                        </Badge>
                        {provider.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="border-border">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      {/* Bottom Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{provider.responseTimeMinutes} min response</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span className="font-bold text-foreground">${provider.price}</span>
                            <span className="text-muted-foreground">/hr</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-2">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-2">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-gradient-primary hover:opacity-90"
                            disabled={!provider.available}
                          >
                            Book Now
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProviders.length === 0 && (
              <Card className="p-12 text-center border-2 border-dashed">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <SearchIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No providers found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or expanding the search radius</p>
                <Button 
                  onClick={() => { 
                    setSelectedCategory(null); 
                    setMaxDistance([10]); 
                    setMinRating(null);
                  }}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  Reset All Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
