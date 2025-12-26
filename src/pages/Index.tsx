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
  Play,
  Truck,
  Home,
  Building2,
  Package,
  Navigation,
  Phone,
  MessageCircle,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const services = [
    {
      id: "cleaning",
      icon: Sparkles,
      title: "Cleaning Services",
      description: "Professional cleaners for homes, offices & industrial spaces",
      color: "from-primary to-primary-glow",
      providers: "5,000+",
      features: ["Domestic", "Commercial", "Industrial", "Specialized"]
    },
    {
      id: "moving",
      icon: Truck,
      title: "Moving Services",
      description: "Reliable movers for local & long-distance relocations",
      color: "from-secondary to-orange-400",
      providers: "2,500+",
      features: ["Local Moving", "Long Distance", "Packing", "Storage"]
    }
  ];

  const stats = [
    { value: "100K+", label: "Happy Customers", icon: Users },
    { value: "7,500+", label: "Verified Providers", icon: Shield },
    { value: "500K+", label: "Jobs Completed", icon: CheckCircle2 },
    { value: "4.9", label: "Average Rating", icon: Star, suffix: "★" }
  ];

  const features = [
    {
      icon: Navigation,
      title: "GPS-Powered Matching",
      description: "Find providers near you instantly with real-time location tracking and smart distance algorithms",
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "Every provider is background-checked, trained, and rated by real customers",
      gradient: "from-accent to-purple-500"
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Book now or schedule ahead. Get confirmation in under 60 seconds",
      gradient: "from-secondary to-orange-400"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Not satisfied? Get a free re-service or full refund. No questions asked",
      gradient: "from-success to-emerald-400"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Tell Us What You Need",
      description: "Select cleaning or moving services and share your requirements",
      icon: MessageCircle
    },
    {
      step: "02",
      title: "Get Matched Instantly",
      description: "Our GPS system finds the best providers near your location",
      icon: MapPin
    },
    {
      step: "03",
      title: "Book & Track Live",
      description: "Confirm your booking and track your provider in real-time",
      icon: Navigation
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-gradient-primary opacity-30 blur-lg -z-10" />
            </div>
            <span className="text-2xl font-bold font-display gradient-text">
              SCOPIA
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/search" className="text-sm font-medium text-muted-foreground hover:text-foreground animated-underline transition-colors">
              Find Services
            </Link>
            <Link to="/providers" className="text-sm font-medium text-muted-foreground hover:text-foreground animated-underline transition-colors">
              Become a Provider
            </Link>
            <Link to="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground animated-underline transition-colors">
              How It Works
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="font-medium">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-primary hover:opacity-90 shadow-lg hover:shadow-glow transition-all duration-300 font-medium">
              <Link to="/search">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 relative overflow-hidden">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 mesh-gradient opacity-60" />
        
        {/* Animated Blobs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-3xl" />

        <div className="container mx-auto relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-6 bg-primary/10 border-primary/20 text-primary px-4 py-2 text-sm font-medium">
                <Globe className="w-4 h-4 mr-2" />
                GPS-Powered Smart Matching — Now Live
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-6 leading-[1.1]"
            >
              Your On-Demand
              <span className="block gradient-text-hero">Cleaning & Moving</span>
              <span className="block">Marketplace</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              Connect with verified cleaning professionals and moving companies instantly. 
              Real-time GPS tracking, secure payments, and guaranteed satisfaction.
            </motion.p>
            
            <motion.div 
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button size="lg" asChild className="bg-gradient-primary hover:opacity-90 text-lg px-8 h-14 shadow-xl hover:shadow-glow transition-all duration-300 group">
                <Link to="/search">
                  <Sparkles className="mr-2 w-5 h-5" />
                  Book Cleaning
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" asChild className="bg-gradient-secondary hover:opacity-90 text-lg px-8 h-14 shadow-xl hover:shadow-glow-secondary transition-all duration-300 group text-secondary-foreground">
                <Link to="/search?service=moving">
                  <Truck className="mr-2 w-5 h-5" />
                  Book Moving
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            
            {/* Stats Row */}
            <motion.div 
              variants={fadeUp}
              className="flex flex-wrap justify-center gap-8 md:gap-12"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-1 text-3xl md:text-4xl font-bold font-display text-foreground">
                    {stat.value}
                    {stat.suffix && <span className="text-secondary">{stat.suffix}</span>}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Our Services</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-4">
              One Platform,
              <span className="block gradient-text">All Your Needs</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you need a spotless home or help with your next move, we've got you covered
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <Card className="group relative overflow-hidden border-2 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-background">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="p-8 relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold font-display mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-muted text-muted-foreground">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{service.providers} providers</span>
                      </div>
                      
                      <Button asChild variant="ghost" className="group/btn font-medium">
                        <Link to="/search">
                          Browse
                          <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Why SCOPIA</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-4">
              Built Different.
              <span className="block gradient-text">Built Better.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform uses cutting-edge technology to deliver the best experience for customers and providers alike
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="p-6 h-full border-2 hover:border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-background">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-display mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">Simple Process</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-4">
              Book in 3 Easy Steps
            </h2>
            <p className="text-lg text-muted-foreground">Fast, simple, and reliable</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary via-accent to-secondary" />
            
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative text-center"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-primary text-white text-2xl font-bold font-display mb-6 shadow-xl shadow-primary/30 z-10">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold font-display mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Categories</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold font-display mb-4">
              Services for Everyone
            </h2>
            <p className="text-lg text-muted-foreground">From homes to warehouses, we've got it all</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Residential", icon: Home, desc: "Homes & Apartments", count: "3,240", color: "from-primary to-primary-glow" },
              { name: "Commercial", icon: Building2, desc: "Offices & Retail", count: "1,890", color: "from-accent to-purple-500" },
              { name: "Local Moving", icon: Truck, desc: "Same City Moves", count: "1,456", color: "from-secondary to-orange-400" },
              { name: "Packing", icon: Package, desc: "Professional Packing", count: "892", color: "from-success to-emerald-400" }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card className="p-8 text-center border-2 hover:border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group bg-background">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-display mb-2">{category.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{category.desc}</p>
                  <Badge variant="outline" className="bg-muted/50 border-0">
                    {category.count} providers
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <Card className="relative overflow-hidden border-0 bg-gradient-dark">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
            
            <div className="relative p-12 lg:p-20 text-center text-white">
              <Badge className="mb-6 bg-white/10 border-white/20 text-white">Get Started Today</Badge>
              <h2 className="text-4xl lg:text-5xl font-bold font-display mb-6">
                Ready to Experience
                <span className="block text-transparent bg-gradient-to-r from-primary-glow via-accent to-secondary bg-clip-text">
                  The Future of Services?
                </span>
              </h2>
              <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
                Join over 100,000 customers who trust SCOPIA for their cleaning and moving needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-white text-foreground hover:bg-white/90 text-lg px-10 h-14 shadow-xl">
                  <Link to="/search">
                    Find Services Near Me
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-10 h-14 border-2 border-white/30 bg-white/5 hover:bg-white/10 text-white">
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
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold font-display gradient-text">SCOPIA</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your on-demand marketplace for cleaning and moving services. GPS-powered matching, verified professionals, guaranteed satisfaction.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/search" className="hover:text-foreground transition-colors">Cleaning Services</Link></li>
                <li><Link to="/search" className="hover:text-foreground transition-colors">Moving Services</Link></li>
                <li><Link to="/search" className="hover:text-foreground transition-colors">Commercial Cleaning</Link></li>
                <li><Link to="/search" className="hover:text-foreground transition-colors">Industrial Cleaning</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link to="/providers" className="hover:text-foreground transition-colors">Become a Provider</Link></li>
                <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link to="/safety" className="hover:text-foreground transition-colors">Safety</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 SCOPIA. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;