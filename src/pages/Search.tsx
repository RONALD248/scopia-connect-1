import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Navigation,
  Home,
  Building2,
  Factory,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [maxDistance, setMaxDistance] = useState([5]);

  const categories = [
    { id: "domestic", name: "Domestic", icon: Home, color: "text-primary" },
    { id: "commercial", name: "Commercial", icon: Building2, color: "text-secondary" },
    { id: "industrial", name: "Industrial", icon: Factory, color: "text-primary" },
    { id: "specialized", name: "Specialized", icon: Zap, color: "text-secondary" }
  ];

  const providers = [
    {
      id: 1,
      name: "Premium Clean Solutions",
      rating: 4.9,
      reviews: 234,
      distance: 0.8,
      category: "Commercial",
      price: 45,
      available: true,
      specialties: ["Office Cleaning", "Deep Clean"],
      image: "🏢",
      responseTime: "5 min"
    },
    {
      id: 2,
      name: "Sparkle Home Services",
      rating: 4.8,
      reviews: 189,
      distance: 1.2,
      category: "Domestic",
      price: 35,
      available: true,
      specialties: ["Regular Cleaning", "Move-in/out"],
      image: "🏠",
      responseTime: "10 min"
    },
    {
      id: 3,
      name: "Industrial Pro Cleaners",
      rating: 4.7,
      reviews: 156,
      distance: 2.5,
      category: "Industrial",
      price: 85,
      available: false,
      specialties: ["Factory Cleaning", "Warehouse"],
      image: "🏭",
      responseTime: "15 min"
    },
    {
      id: 4,
      name: "Elite Specialized Care",
      rating: 5.0,
      reviews: 98,
      distance: 1.8,
      category: "Specialized",
      price: 120,
      available: true,
      specialties: ["Carpet Cleaning", "Window Washing"],
      image: "✨",
      responseTime: "8 min"
    },
    {
      id: 5,
      name: "Quick Home Helpers",
      rating: 4.6,
      reviews: 312,
      distance: 0.5,
      category: "Domestic",
      price: 30,
      available: true,
      specialties: ["Regular Cleaning", "Laundry"],
      image: "🏠",
      responseTime: "3 min"
    }
  ];

  const filteredProviders = providers
    .filter(p => !selectedCategory || p.category === selectedCategory)
    .filter(p => p.distance <= maxDistance[0]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SCOPIA
            </span>
          </Link>
          <Button variant="outline" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 sticky top-24 border-2 shadow-medium">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Filters</h2>
              </div>

              {/* Search Input */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Location</label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Enter your location..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="w-full mt-2 bg-gradient-primary hover:opacity-90">
                  <MapPin className="w-4 h-4 mr-2" />
                  Use Current Location
                </Button>
              </div>

              {/* Service Categories */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Service Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.name ? "default" : "outline"}
                      className={`justify-start ${selectedCategory === category.name ? 'bg-gradient-primary' : ''}`}
                      onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                    >
                      <category.icon className="w-4 h-4 mr-2" />
                      <span className="text-sm">{category.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Distance Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Max Distance</label>
                  <span className="text-sm font-bold text-primary">{maxDistance[0]} km</span>
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
                  <span>0.5km</span>
                  <span>10km</span>
                </div>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-3 block">Availability</label>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="justify-start">
                    <Clock className="w-4 h-4 mr-2" />
                    Available Now
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule Later
                  </Button>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="text-sm font-medium mb-3 block">Minimum Rating</label>
                <div className="flex gap-1">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <Button key={rating} variant="outline" size="sm" className="flex-1">
                      {rating}★
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <Card className="overflow-hidden border-2 shadow-large animate-fade-in">
              <div className="aspect-video bg-gradient-to-br from-accent/20 via-primary/10 to-secondary/10 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-32 h-32 text-primary/30 animate-float" />
                </div>
                <div className="relative z-10 text-center p-8">
                  <h3 className="text-2xl font-bold mb-2">Interactive Map View</h3>
                  <p className="text-muted-foreground mb-4">Real-time provider locations will appear here</p>
                  <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                    Mapbox Integration Ready
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Results Header */}
            <div className="flex items-center justify-between animate-fade-up">
              <div>
                <h2 className="text-2xl font-bold">{filteredProviders.length} Providers Nearby</h2>
                <p className="text-muted-foreground">Sorted by distance • Updated just now</p>
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Sort By
              </Button>
            </div>

            {/* Provider Cards */}
            <div className="space-y-4">
              {filteredProviders.map((provider, index) => (
                <Card 
                  key={provider.id} 
                  className="p-6 hover:shadow-large transition-all duration-300 border-2 group cursor-pointer animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Provider Image/Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-primary/20 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform">
                        {provider.image}
                      </div>
                    </div>

                    {/* Provider Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                            {provider.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-secondary fill-secondary" />
                              <span className="font-semibold text-foreground">{provider.rating}</span>
                              <span>({provider.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span>{provider.distance} km away</span>
                            </div>
                          </div>
                        </div>
                        {provider.available ? (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            Available Now
                          </Badge>
                        ) : (
                          <Badge variant="outline">Busy</Badge>
                        )}
                      </div>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {provider.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-accent">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      {/* Bottom Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>Responds in {provider.responseTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span className="font-semibold">${provider.price}/hr</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button 
                            size="sm" 
                            className="bg-gradient-primary hover:opacity-90"
                            disabled={!provider.available}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProviders.length === 0 && (
              <Card className="p-12 text-center border-2">
                <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No providers found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or expanding the search radius</p>
                <Button onClick={() => { setSelectedCategory(null); setMaxDistance([10]); }}>
                  Reset Filters
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