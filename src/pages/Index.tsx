import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Star, Clock, Shield, TrendingUp, Users, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SCOPIA
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/search" className="text-foreground/80 hover:text-foreground transition-colors">
              Find Services
            </Link>
            <Link to="/providers" className="text-foreground/80 hover:text-foreground transition-colors">
              Become a Provider
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow">
              <Link to="/search">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 backdrop-blur-sm border border-accent mb-6">
                <Star className="w-4 h-4 text-accent-foreground" fill="currentColor" />
                <span className="text-sm font-medium text-accent-foreground">Trusted by 10,000+ customers</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Your <span className="bg-gradient-primary bg-clip-text text-transparent">Perfect Clean</span> is Just a Tap Away
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Connect instantly with verified cleaning professionals near you. Book services in seconds, track in real-time, and experience pristine results every time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 shadow-large group">
                  <Link to="/search">
                    Find Cleaners Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-2">
                  <Link to="/providers">Join as Provider</Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 mt-12">
                <div>
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div>
                  <div className="text-3xl font-bold text-primary">5K+</div>
                  <div className="text-sm text-muted-foreground">Verified Providers</div>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div>
                  <div className="text-3xl font-bold text-primary">4.9★</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 animate-pulse-glow"></div>
                <Card className="relative overflow-hidden border-2 shadow-large">
                  <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center">
                    <MapPin className="w-32 h-32 text-primary animate-float" />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">SCOPIA</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of cleaning services with our intelligent matching platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: "Smart Location Matching",
                description: "Find providers within minutes using advanced GIS technology",
                color: "text-primary"
              },
              {
                icon: Shield,
                title: "Verified Professionals",
                description: "Every provider is background-checked and certified",
                color: "text-secondary"
              },
              {
                icon: Clock,
                title: "Instant Booking",
                description: "Book services in real-time or schedule for later",
                color: "text-primary"
              },
              {
                icon: Star,
                title: "Quality Guaranteed",
                description: "Rated 4.9/5 by thousands of satisfied customers",
                color: "text-secondary"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-large transition-all duration-300 hover:-translate-y-1 animate-fade-up border-2 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Get your space cleaned in 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Search & Filter",
                description: "Enter your location and choose from domestic, commercial, industrial, or specialized cleaning services"
              },
              {
                step: "02",
                title: "Choose Provider",
                description: "View nearby providers on the map, check ratings, reviews, and availability"
              },
              {
                step: "03",
                title: "Book & Track",
                description: "Confirm booking, make secure payment, and track your provider in real-time"
              }
            ].map((step, index) => (
              <div key={index} className="relative animate-fade-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary text-primary-foreground text-2xl font-bold mb-4 shadow-glow">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground">Professional cleaning for every need</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Domestic Cleaning", emoji: "🏠", desc: "Homes & apartments" },
              { name: "Commercial Cleaning", emoji: "🏢", desc: "Offices & retail spaces" },
              { name: "Industrial Cleaning", emoji: "🏭", desc: "Warehouses & factories" },
              { name: "Specialized Services", emoji: "✨", desc: "Deep cleaning & more" }
            ].map((category, index) => (
              <Card 
                key={index}
                className="p-8 text-center hover:shadow-large transition-all duration-300 hover:-translate-y-2 cursor-pointer group animate-fade-up border-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{category.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-muted-foreground">{category.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="relative overflow-hidden border-2 shadow-large">
            <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
            <div className="relative p-12 lg:p-20 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to Experience the Difference?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers and find your perfect cleaning professional today
              </p>
              <Button size="lg" asChild className="bg-gradient-primary hover:opacity-90 text-lg px-12 py-6 shadow-glow">
                <Link to="/search">Start Your Search</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">SCOPIA</span>
              </div>
              <p className="text-muted-foreground">Your trusted platform for connecting with professional cleaning services</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Customers</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/search" className="hover:text-foreground transition-colors">Find Services</Link></li>
                <li><Link to="/how-it-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Providers</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/providers" className="hover:text-foreground transition-colors">Become a Provider</Link></li>
                <li><Link to="/provider-benefits" className="hover:text-foreground transition-colors">Benefits</Link></li>
                <li><Link to="/provider-faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 SCOPIA. All rights reserved. Built with ❤️ for cleaner spaces.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;