import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Star, 
  Clock, 
  Shield, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Zap,
  Globe,
  Award,
  TrendingUp,
  Play
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SCOPIA
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/search" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
              Find Services
            </Link>
            <Link to="/providers" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
              Become a Provider
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
              How It Works
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-md" size="sm">
              <Link to="/search">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <Badge className="mb-6 bg-accent border-0 text-accent-foreground px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                GPS-Powered Smart Matching
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                Professional
                <span className="block bg-gradient-primary bg-clip-text text-transparent">Cleaning Services</span>
                <span className="block">Near You</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Connect instantly with verified cleaning professionals using our advanced location-based matching system. Real-time tracking, secure payments, and guaranteed quality.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button size="lg" asChild className="bg-gradient-primary hover:opacity-90 text-base px-8 h-14 shadow-lg group">
                  <Link to="/search">
                    Find Cleaners Near Me
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-8 h-14 border-2 group">
                  <Link to="/providers">
                    <Play className="mr-2 w-5 h-5" />
                    See How It Works
                  </Link>
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center gap-8 pt-4 border-t border-border/50">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">50K+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Users</div>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">5K+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Providers</div>
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground flex items-center gap-1">
                    4.9 <Star className="w-5 h-5 fill-secondary text-secondary" />
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Rating</div>
                </div>
              </div>
            </motion.div>
            
            {/* Hero Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main Card */}
                <Card className="relative overflow-hidden border-2 shadow-2xl">
                  <div className="aspect-square bg-gradient-to-br from-accent/30 via-background to-primary/10 p-8 flex items-center justify-center">
                    {/* Map Preview */}
                    <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border overflow-hidden">
                      {/* Grid */}
                      <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                          linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                        opacity: 0.5
                      }} />
                      
                      {/* User Pin */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="relative">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg border-3 border-white">
                            <MapPin className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" />
                        </div>
                      </div>
                      
                      {/* Provider Pins */}
                      {[
                        { top: '25%', left: '30%' },
                        { top: '35%', left: '70%' },
                        { top: '65%', left: '25%' },
                        { top: '70%', left: '65%' },
                        { top: '20%', left: '55%' }
                      ].map((pos, i) => (
                        <div 
                          key={i}
                          className="absolute w-8 h-8 bg-secondary rounded-full flex items-center justify-center shadow-md animate-pulse"
                          style={{ top: pos.top, left: pos.left, animationDelay: `${i * 0.2}s` }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-secondary-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                
                {/* Floating Stats Card */}
                <Card className="absolute -bottom-6 -left-6 p-4 border-2 shadow-xl bg-background animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Matched in 3s</div>
                      <div className="text-xs text-muted-foreground">Average matching time</div>
                    </div>
                  </div>
                </Card>
                
                {/* Floating Rating Card */}
                <Card className="absolute -top-4 -right-4 p-4 border-2 shadow-xl bg-background animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[0,1,2].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-primary border-2 border-background" />
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[0,1,2,3,4].map((i) => (
                          <Star key={i} className="w-3 h-3 fill-secondary text-secondary" />
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">2,547 reviews</div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-accent/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-0">Why SCOPIA</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Smart Features for
              <span className="block bg-gradient-primary bg-clip-text text-transparent">Modern Cleaning</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform uses advanced GPS technology and intelligent algorithms to connect you with the perfect cleaning professional
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: "GPS Matching",
                description: "Real-time location-based provider matching with distance calculation"
              },
              {
                icon: Shield,
                title: "Verified Pros",
                description: "Background-checked and certified cleaning professionals"
              },
              {
                icon: Clock,
                title: "Instant Booking",
                description: "Book immediately or schedule for a convenient time"
              },
              {
                icon: Award,
                title: "Quality Guaranteed",
                description: "Satisfaction guaranteed with our rating system"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-background"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-0">Simple Process</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Get your space cleaned in 3 easy steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Enable Location",
                description: "Share your GPS location for accurate provider matching"
              },
              {
                step: "02",
                title: "Choose Provider",
                description: "Browse nearby providers sorted by distance, rating, and availability"
              },
              {
                step: "03",
                title: "Book & Track",
                description: "Confirm booking and track your provider in real-time"
              }
            ].map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary text-primary-foreground text-xl font-bold mb-4 shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/40 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-24 px-4 bg-accent/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-0">Services</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Cleaning Categories</h2>
            <p className="text-lg text-muted-foreground">Professional cleaning for every need</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Domestic", emoji: "🏠", desc: "Homes & apartments", count: "2,340 providers" },
              { name: "Commercial", emoji: "🏢", desc: "Offices & retail", count: "1,890 providers" },
              { name: "Industrial", emoji: "🏭", desc: "Warehouses & factories", count: "456 providers" },
              { name: "Specialized", emoji: "✨", desc: "Deep clean & restoration", count: "892 providers" }
            ].map((category, index) => (
              <Card 
                key={index}
                className="p-8 text-center border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group bg-background"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{category.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{category.desc}</p>
                <Badge variant="outline" className="bg-accent/50 border-0 text-xs">
                  {category.count}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <Card className="relative overflow-hidden border-2 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="relative p-12 lg:p-20 text-center">
              <Badge className="mb-6 bg-primary/10 text-primary border-0">Get Started</Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to Find Your
                <span className="block bg-gradient-primary bg-clip-text text-transparent">Perfect Cleaner?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers using GPS-powered matching
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-gradient-primary hover:opacity-90 text-base px-10 h-14 shadow-lg">
                  <Link to="/search">
                    Start Searching
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-10 h-14 border-2">
                  <Link to="/providers">Become a Provider</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">SCOPIA</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The smart platform connecting you with verified cleaning professionals using GPS technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link to="/search" className="hover:text-foreground transition-colors">Find Services</Link></li>
                <li><Link to="/how-it-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Providers</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link to="/providers" className="hover:text-foreground transition-colors">Join as Provider</Link></li>
                <li><Link to="/provider-benefits" className="hover:text-foreground transition-colors">Benefits</Link></li>
                <li><Link to="/provider-faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 SCOPIA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
