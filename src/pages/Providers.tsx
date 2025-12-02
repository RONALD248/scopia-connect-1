import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Wallet, 
  Calendar,
  MapPin,
  Clock,
  Star,
  Users,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Providers = () => {
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
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
            <Button asChild className="bg-gradient-primary hover:opacity-90">
              <Link to="#apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-up max-w-4xl mx-auto">
            <Badge className="mb-6 bg-accent/50 text-accent-foreground border-accent">
              <Users className="w-4 h-4 mr-2" />
              Join 5,000+ Service Providers
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Turn Your Skills Into <span className="bg-gradient-primary bg-clip-text text-transparent">Steady Income</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join SCOPIA's network of professional cleaning service providers. Get matched with customers instantly, work on your schedule, and earn more.
            </p>
            <Button size="lg" asChild className="bg-gradient-primary hover:opacity-90 text-lg px-12 py-6 shadow-glow group">
              <a href="#apply">
                Start Earning Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: "$2,500+", label: "Average Monthly Earnings", icon: TrendingUp },
              { value: "5,000+", label: "Active Providers", icon: Users },
              { value: "50K+", label: "Jobs Completed", icon: CheckCircle2 },
              { value: "4.9★", label: "Average Provider Rating", icon: Star }
            ].map((stat, index) => (
              <Card 
                key={index} 
                className="p-6 text-center hover:shadow-large transition-all duration-300 border-2 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Why Join SCOPIA?</h2>
            <p className="text-xl text-muted-foreground">Everything you need to grow your business</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                title: "Smart Job Matching",
                description: "Get matched with customers near you automatically using advanced GIS technology",
                color: "text-primary"
              },
              {
                icon: Calendar,
                title: "Flexible Schedule",
                description: "Work when you want. Set your availability and accept jobs that fit your schedule",
                color: "text-secondary"
              },
              {
                icon: Wallet,
                title: "Fast Payouts",
                description: "Get paid weekly via M-Pesa or bank transfer. Track your earnings in real-time",
                color: "text-primary"
              },
              {
                icon: Shield,
                title: "Insurance Coverage",
                description: "All providers are covered with liability insurance while on the job",
                color: "text-secondary"
              },
              {
                icon: Clock,
                title: "Instant Notifications",
                description: "Receive job requests immediately via SMS, email, and mobile push notifications",
                color: "text-primary"
              },
              {
                icon: TrendingUp,
                title: "Growth Support",
                description: "Access training resources, tips, and tools to grow your business",
                color: "text-secondary"
              }
            ].map((benefit, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-2 group animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <benefit.icon className={`w-7 h-7 ${benefit.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works for Providers */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Start earning in 4 simple steps</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "01",
                title: "Sign Up & Verify",
                description: "Create your profile, upload certifications, and complete background verification. Approval takes 24-48 hours."
              },
              {
                step: "02",
                title: "Set Your Availability",
                description: "Choose your service areas, set your rates, and mark when you're available to accept jobs."
              },
              {
                step: "03",
                title: "Receive Job Requests",
                description: "Get matched with nearby customers. View job details and accept or decline based on your schedule."
              },
              {
                step: "04",
                title: "Complete Jobs & Get Paid",
                description: "Navigate to customer location, complete the job, and receive payment automatically. Build your ratings!"
              }
            ].map((step, index) => (
              <Card 
                key={index}
                className="p-8 border-2 hover:shadow-large transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-glow">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="border-2 shadow-large animate-fade-up">
            <div className="p-8 lg:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Apply to Join SCOPIA</h2>
                <p className="text-muted-foreground text-lg">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <Input type="tel" placeholder="+254 700 000 000" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Service Category *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Domestic", "Commercial", "Industrial", "Specialized"].map((category) => (
                      <Button key={category} type="button" variant="outline" className="justify-start">
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Location/City *</label>
                  <Input placeholder="Nairobi, Kenya" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Years of Experience *</label>
                  <Input type="number" placeholder="5" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tell us about your experience</label>
                  <Textarea 
                    placeholder="Describe your cleaning experience, certifications, and what makes you a great provider..."
                    rows={5}
                  />
                </div>

                <div className="flex items-start gap-3 p-4 bg-accent/30 rounded-lg border border-accent">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">What happens next?</p>
                    <p className="text-muted-foreground">
                      We'll review your application within 24-48 hours. If approved, you'll receive login credentials and can start accepting jobs immediately!
                    </p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-primary hover:opacity-90 text-lg py-6 shadow-glow"
                >
                  Submit Application
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 SCOPIA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Providers;