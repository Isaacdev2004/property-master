import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Heart,
  Dumbbell,
  Waves,
  Leaf,
  Sun,
  Moon,
  Sparkles,
  Users,
  Award,
  Building2,
  Star,
  Phone,
  Check,
  Quote,
  Clock,
  ShieldCheck,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stats = [
  { icon: Building2, value: "500+", label: "Wellness Projects" },
  { icon: Users, value: "50+", label: "Wellness Experts" },
  { icon: Award, value: "10+", label: "Years Experience" },
  { icon: Heart, value: "1000+", label: "Happy Clients" },
];

const wellnessServices = [
  {
    icon: Dumbbell,
    title: "Home Gym Design",
    description: "Transform any space into a fully-equipped personal fitness sanctuary with premium equipment and motivating aesthetics.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    features: ["Custom Equipment Layout", "Ventilation Design", "Flooring Solutions", "Mirror Installations"],
  },
  {
    icon: Waves,
    title: "Spa & Sauna Installation",
    description: "Create your private retreat with luxury spa facilities, steam rooms, and Finnish saunas for ultimate relaxation.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
    features: ["Steam Room Setup", "Sauna Installation", "Jacuzzi Integration", "Aromatherapy Systems"],
  },
  {
    icon: Leaf,
    title: "Yoga & Meditation Rooms",
    description: "Design tranquil spaces dedicated to mindfulness, yoga practice, and spiritual well-being with calming aesthetics.",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
    features: ["Natural Lighting Design", "Acoustic Treatment", "Bamboo Flooring", "Zen Gardens"],
  },
  {
    icon: Sun,
    title: "Pool & Outdoor Wellness",
    description: "Design stunning pool areas and outdoor wellness spaces that blend luxury with natural elements.",
    image: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=600&q=80",
    features: ["Infinity Pools", "Outdoor Showers", "Lounging Areas", "Landscaping"],
  },
  {
    icon: Moon,
    title: "Sleep Wellness Rooms",
    description: "Optimize your bedroom environment for restorative sleep with specialized lighting, acoustics, and climate control.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80",
    features: ["Blackout Systems", "Sound Insulation", "Air Purification", "Smart Climate Control"],
  },
  {
    icon: Sparkles,
    title: "Wellness Consulting",
    description: "Comprehensive wellness space planning and consultation to create holistic health environments in your property.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    features: ["Space Assessment", "Wellness Planning", "Equipment Selection", "Lifestyle Integration"],
  },
];

const completedProjects = [
  { id: 1, title: "Private Wellness Retreat", location: "Palm Jumeirah", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80", type: "Complete Wellness Suite" },
  { id: 2, title: "Executive Home Gym", location: "Emirates Hills", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", type: "Fitness Center" },
  { id: 3, title: "Luxury Spa Residence", location: "Dubai Marina", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", type: "Spa & Sauna" },
  { id: 4, title: "Zen Meditation Garden", location: "Arabian Ranches", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80", type: "Yoga Studio" },
  { id: 5, title: "Rooftop Pool Oasis", location: "Downtown Dubai", image: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=600&q=80", type: "Pool & Outdoor" },
  { id: 6, title: "Corporate Wellness Center", location: "Business Bay", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80", type: "Commercial Wellness" },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Al-Maktoum",
    role: "Villa Owner, Palm Jumeirah",
    content: "Property Masters transformed our basement into a stunning home spa. The attention to detail and quality of work exceeded our expectations. It's now our favorite space in the house.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
    hasVideo: true,
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    role: "CEO, Hassan Holdings",
    content: "The home gym they designed is world-class. Professional equipment layout, perfect lighting, and motivating atmosphere. Best investment I've made for my health.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    rating: 5,
    hasVideo: true,
  },
  {
    id: 3,
    name: "Dr. Fatima Rashid",
    role: "Wellness Coach",
    content: "As a wellness professional, I'm very particular about space design. Property Masters created a yoga studio that perfectly balances functionality with tranquility.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
    rating: 5,
    hasVideo: false,
  },
];

const benefits = [
  { icon: Heart, title: "Health-Focused Design", description: "Every element designed to enhance your physical and mental well-being" },
  { icon: ShieldCheck, title: "Premium Materials", description: "Only the finest, health-safe materials used in all installations" },
  { icon: Users, title: "Expert Team", description: "Certified wellness designers and installation specialists" },
  { icon: Clock, title: "Timely Delivery", description: "Projects completed on schedule without compromising quality" },
  { icon: Award, title: "5-Year Warranty", description: "Comprehensive warranty on all wellness installations" },
  { icon: Sparkles, title: "Aftercare Support", description: "Ongoing maintenance and support for your wellness spaces" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function WellnessServices() {
  const [activeService, setActiveService] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80"
            alt="Wellness Space"
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
              <Heart className="w-4 h-4 text-[#970A44]" />
              <span className="text-white/90 text-sm font-medium">Wellness Services</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight">
              Transform Your Home Into a 
              <span className="text-[#970A44]"> Wellness Sanctuary</span>
            </h1>
            
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Create spaces that nurture your body, mind, and soul. From home gyms and spas to yoga studios and meditation rooms, we design wellness environments that inspire healthier living.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-8 py-6 text-lg"
                data-testid="button-hero-consultation"
              >
                <Link href="/contact">
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="border-white/50 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg backdrop-blur-sm"
                data-testid="button-hero-portfolio"
              >
                <Link href="/portfolio">View Our Work</Link>
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
      <section className="py-24 bg-gradient-to-b from-background to-muted/30" data-testid="section-wellness-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Our Wellness Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive wellness space solutions designed to enhance your lifestyle and well-being.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {wellnessServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="h-full overflow-hidden border-0 shadow-lg hover-elevate cursor-pointer group"
                  onClick={() => setActiveService(index)}
                  data-testid={`card-service-${index}`}
                >
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
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-[#970A44]" />
                          <span>{feature}</span>
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

      {/* Completed Projects */}
      <section className="py-24 bg-background" data-testid="section-completed-projects">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Wellness Spaces We've Created
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our portfolio of stunning wellness installations across Dubai's most prestigious properties.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover-elevate group" data-testid={`card-project-${project.id}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-[#970A44] text-white text-xs font-semibold rounded-full mb-2">
                        {project.type}
                      </span>
                      <h3 className="text-white font-bold text-lg">{project.title}</h3>
                      <p className="text-white/80 text-sm">{project.location}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button 
              asChild
              className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-8"
              data-testid="button-view-portfolio"
            >
              <Link href="/portfolio">
                View Full Portfolio
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Get Quote Section */}
      <section className="py-24 bg-[#970A44]" data-testid="section-get-quote">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
                <Sparkles className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Free Consultation</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
                Ready to Create Your Wellness Space?
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Share your wellness goals and get a personalized consultation with our experts. We'll help you design the perfect wellness environment for your lifestyle.
              </p>
              <ul className="space-y-4 text-white">
                {[
                  "Free space assessment",
                  "Customized wellness plan",
                  "3D visualization",
                  "Transparent pricing"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-white" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Tell Us Your Requirements</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" data-testid="input-quote-name" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="+971" data-testid="input-quote-phone" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="wellness-type">Wellness Space Type</Label>
                      <Select>
                        <SelectTrigger data-testid="select-wellness-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home-gym">Home Gym</SelectItem>
                          <SelectItem value="spa-sauna">Spa & Sauna</SelectItem>
                          <SelectItem value="yoga-room">Yoga & Meditation Room</SelectItem>
                          <SelectItem value="pool">Pool & Outdoor</SelectItem>
                          <SelectItem value="complete">Complete Wellness Suite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="property-type">Property Type</Label>
                      <Select>
                        <SelectTrigger data-testid="select-property-type">
                          <SelectValue placeholder="Select property" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="penthouse">Penthouse</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-[#970A44] hover:bg-[#720632] text-white rounded-full py-6" data-testid="button-get-quote">
                      Get Free Quote
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
      <section className="py-24 bg-background" data-testid="section-testimonials">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from property owners who transformed their spaces with our wellness solutions.
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
      <section className="py-24 bg-muted/30" data-testid="section-why-choose">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Why Choose Property Masters?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We bring expertise, quality, and dedication to every wellness project.
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
      <section className="py-24 bg-[#09263D]" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
              Start Your Wellness Journey Today
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Let us help you create the perfect wellness space. Contact us for a free consultation and discover how we can transform your property.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-8 py-6 text-lg"
                data-testid="button-cta-book"
              >
                <Link href="/contact">
                  Book Free Consultation
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
