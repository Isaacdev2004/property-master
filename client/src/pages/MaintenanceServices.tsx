import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Wrench,
  Zap,
  Droplets,
  Wind,
  Shield,
  PaintBucket,
  Hammer,
  Settings,
  Users,
  Award,
  Building2,
  Star,
  Phone,
  Check,
  Quote,
  Clock,
  ShieldCheck,
  Play,
  Calendar,
  ThumbsUp,
  Headphones
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stats = [
  { icon: Building2, value: "10,000+", label: "Properties Serviced" },
  { icon: Users, value: "100+", label: "Expert Technicians" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: ThumbsUp, value: "98%", label: "Customer Satisfaction" },
];

const maintenanceServices = [
  {
    icon: Zap,
    title: "Electrical Services",
    description: "Complete electrical maintenance, repairs, and installations by certified electricians.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80",
    services: ["Wiring & Rewiring", "Circuit Breaker Repairs", "Lighting Installation", "Electrical Safety Checks"],
  },
  {
    icon: Droplets,
    title: "Plumbing Solutions",
    description: "Expert plumbing services from leak repairs to complete bathroom renovations.",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80",
    services: ["Leak Detection & Repair", "Pipe Installation", "Water Heater Services", "Drain Cleaning"],
  },
  {
    icon: Wind,
    title: "AC & HVAC Services",
    description: "Keep your property cool with our comprehensive air conditioning maintenance.",
    image: "https://images.unsplash.com/photo-1631545806609-35d4e7a68343?w=600&q=80",
    services: ["AC Repair & Maintenance", "Duct Cleaning", "HVAC Installation", "Filter Replacement"],
  },
  {
    icon: PaintBucket,
    title: "Painting & Finishing",
    description: "Professional painting services to refresh and protect your property.",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
    services: ["Interior Painting", "Exterior Painting", "Wall Treatments", "Texture & Finishing"],
  },
  {
    icon: Hammer,
    title: "Carpentry & Woodwork",
    description: "Custom carpentry solutions for furniture, fixtures, and structural repairs.",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80",
    services: ["Custom Furniture", "Door & Window Repairs", "Cabinet Making", "Wood Flooring"],
  },
  {
    icon: Shield,
    title: "Security Systems",
    description: "Protect your property with advanced security system installation and maintenance.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80",
    services: ["CCTV Installation", "Access Control", "Alarm Systems", "Intercom Setup"],
  },
];

const maintenancePackages = [
  {
    title: "Basic Care",
    price: "AED 499",
    period: "/month",
    description: "Essential maintenance for small properties",
    features: [
      "Monthly AC servicing",
      "Basic plumbing checks",
      "Electrical safety inspection",
      "24/7 emergency support",
    ],
    popular: false,
  },
  {
    title: "Premium Care",
    price: "AED 999",
    period: "/month",
    description: "Comprehensive care for homes and offices",
    features: [
      "Everything in Basic Care",
      "Bi-weekly deep cleaning",
      "Priority response time",
      "Preventive maintenance",
      "Annual painting touch-ups",
    ],
    popular: true,
  },
  {
    title: "Elite Care",
    price: "AED 1,999",
    period: "/month",
    description: "Complete property management solution",
    features: [
      "Everything in Premium Care",
      "Dedicated property manager",
      "Quarterly deep maintenance",
      "Smart home support",
      "Landscape maintenance",
      "Pool maintenance",
    ],
    popular: false,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Mohammed Al-Rashid",
    role: "Property Manager, JBR",
    content: "Property Masters has been our go-to maintenance partner for 5 years. Their response time and quality of work is unmatched. They manage 20+ properties for us seamlessly.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
    hasVideo: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Homeowner, Dubai Marina",
    content: "The annual maintenance contract has saved us so much hassle. Their technicians are professional, punctual, and always fix issues on the first visit.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    rating: 5,
    hasVideo: true,
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Villa Owner, Arabian Ranches",
    content: "From AC maintenance to complete villa renovations, Property Masters handles everything. Their pricing is transparent and work quality is exceptional.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    rating: 5,
    hasVideo: false,
  },
];

const benefits = [
  { icon: Clock, title: "24/7 Emergency Service", description: "Round-the-clock support for urgent maintenance needs" },
  { icon: ShieldCheck, title: "Licensed Technicians", description: "All our technicians are certified and background-verified" },
  { icon: ThumbsUp, title: "Satisfaction Guaranteed", description: "We ensure complete satisfaction with every service" },
  { icon: Headphones, title: "Dedicated Support", description: "Personal account manager for all your queries" },
  { icon: Calendar, title: "Flexible Scheduling", description: "Book services at your convenience, any day" },
  { icon: Settings, title: "Preventive Maintenance", description: "Proactive care to prevent costly repairs" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function MaintenanceServices() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80"
            alt="Maintenance Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Wrench className="w-4 h-4 text-[#970A44]" />
              <span className="text-white/90 text-sm font-medium">Maintenance Services</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight">
              Complete Property 
              <span className="text-[#970A44]"> Maintenance Solutions</span>
            </h1>
            
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              From routine maintenance to emergency repairs, our expert technicians ensure your property stays in perfect condition. Available 24/7, every day of the year.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-8 py-6 text-lg"
                data-testid="button-hero-book"
              >
                <Link href="/contact">
                  Book a Service
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="border-white/50 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg backdrop-blur-sm"
                data-testid="button-hero-emergency"
              >
                <a href="tel:+97125500888">
                  <Phone className="mr-2 w-5 h-5" />
                  Emergency: 24/7
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <stat.icon className="w-8 h-8 text-[#970A44] mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30" data-testid="section-maintenance-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Our Maintenance Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive property maintenance solutions delivered by certified professionals.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {maintenanceServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden border-0 shadow-lg hover-elevate group" data-testid={`card-service-${index}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-[#970A44] rounded-xl flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#970A44] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.services.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-[#970A44]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Packages */}
      <section className="py-24 bg-[#09263D]" data-testid="section-packages">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif">
              Annual Maintenance Contracts
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Choose the perfect maintenance plan for your property and enjoy peace of mind.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {maintenancePackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`h-full border-0 ${pkg.popular ? 'ring-2 ring-[#970A44] scale-105' : ''}`} data-testid={`card-package-${index}`}>
                  <CardContent className="p-8">
                    {pkg.popular && (
                      <div className="inline-block px-3 py-1 bg-[#970A44] text-white text-xs font-bold rounded-full mb-4">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-4xl font-bold text-[#970A44]">{pkg.price}</span>
                      <span className="text-muted-foreground">{pkg.period}</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{pkg.description}</p>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="w-5 h-5 text-[#970A44] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full rounded-full ${pkg.popular ? 'bg-[#970A44] hover:bg-[#720632] text-white' : ''}`}
                      variant={pkg.popular ? 'default' : 'outline'}
                      data-testid={`button-select-package-${index}`}
                    >
                      Select Plan
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Service Section */}
      <section className="py-24 bg-background" data-testid="section-request-service">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
                Need Immediate <span className="text-[#970A44]">Assistance?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Whether it's a minor repair or a major emergency, our team is ready to help. Submit your request and we'll get back to you within the hour.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#970A44]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#970A44]" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Quick Response</h3>
                    <p className="text-muted-foreground text-sm">Average response time under 1 hour</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#970A44]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-[#970A44]" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Quality Guaranteed</h3>
                    <p className="text-muted-foreground text-sm">All work backed by our satisfaction guarantee</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#970A44]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-6 h-6 text-[#970A44]" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">24/7 Support</h3>
                    <p className="text-muted-foreground text-sm">Emergency services available round the clock</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Request a Service</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" data-testid="input-service-name" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="+971" data-testid="input-service-phone" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="service-type">Service Type</Label>
                      <Select>
                        <SelectTrigger data-testid="select-service-type">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electrical">Electrical</SelectItem>
                          <SelectItem value="plumbing">Plumbing</SelectItem>
                          <SelectItem value="ac-hvac">AC & HVAC</SelectItem>
                          <SelectItem value="painting">Painting</SelectItem>
                          <SelectItem value="carpentry">Carpentry</SelectItem>
                          <SelectItem value="security">Security Systems</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="urgency">Urgency</Label>
                      <Select>
                        <SelectTrigger data-testid="select-urgency">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emergency">Emergency (Within 2 hours)</SelectItem>
                          <SelectItem value="urgent">Urgent (Same day)</SelectItem>
                          <SelectItem value="scheduled">Scheduled (Pick a date)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Describe the Issue</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Please describe what needs to be fixed..."
                        className="min-h-[100px]"
                        data-testid="textarea-description"
                      />
                    </div>
                    <Button className="w-full bg-[#970A44] hover:bg-[#720632] text-white rounded-full py-6" data-testid="button-submit-request">
                      Submit Request
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30" data-testid="section-testimonials">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Trusted by Property Owners
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See why thousands of property owners rely on us for their maintenance needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover-elevate" data-testid={`card-testimonial-${testimonial.id}`}>
                  <CardContent className="p-6">
                    {testimonial.hasVideo && (
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-muted">
                        <img 
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <button 
                            className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110"
                            data-testid={`button-play-testimonial-${testimonial.id}`}
                          >
                            <Play className="w-6 h-6 text-[#970A44] ml-1" />
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#970A44] text-[#970A44]" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-[#970A44]/20 mb-2" />
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {testimonial.content}
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background" data-testid="section-why-choose">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Why Property Masters?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The most trusted property maintenance company in Dubai.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-md hover-elevate" data-testid={`card-benefit-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-[#970A44]/10 rounded-xl flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-[#970A44]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#970A44]" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
              Ready to Keep Your Property in Perfect Condition?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied property owners. Get started with a free consultation or call us for immediate assistance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                className="bg-white text-[#970A44] hover:bg-white/90 rounded-full px-8 py-6 text-lg"
                data-testid="button-cta-quote"
              >
                <Link href="/contact">
                  Get Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="border-white/50 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg"
                data-testid="button-cta-call"
              >
                <a href="tel:+97125500888">
                  <Phone className="mr-2 w-5 h-5" />
                  Call +971 2550 0888
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
