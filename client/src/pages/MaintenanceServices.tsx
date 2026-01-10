import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Wrench,
  Zap,
  Droplets,
  Wind,
  Shield,
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
  Headphones,
  Sparkles,
  Home,
  Package,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  ClipboardCheck,
  Search,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Hero feature cards - matching wellness page pattern
const heroFeatures = [
  { icon: ShieldCheck, title: "Professional Team", description: "Experienced technicians" },
  { icon: Clock, title: "Reliable Service", description: "On-time, every time" },
  { icon: Award, title: "Quality Guaranteed", description: "100% satisfaction promise" },
  { icon: Settings, title: "Preventive Care", description: "Structured maintenance" },
];

// 6 Main Services from document
const services = [
  { 
    icon: Wrench, 
    title: "General Property Maintenance", 
    description: "Routine maintenance services that support the overall condition and functionality of residential and commercial properties.",
    href: "/maintenance/general", 
    color: "bg-[#970A44]" 
  },
  { 
    icon: Zap, 
    title: "Electrical Maintenance Services", 
    description: "Inspection, repair, and maintenance of electrical systems to ensure safety and reliable operation.",
    href: "/maintenance/electrical", 
    color: "bg-[#1C4668]" 
  },
  { 
    icon: Droplets, 
    title: "Plumbing Maintenance Services", 
    description: "Services focused on identifying leaks, blockages, and plumbing inefficiencies before they escalate.",
    href: "/maintenance/plumbing", 
    color: "bg-[#09263D]" 
  },
  { 
    icon: Wind, 
    title: "HVAC & Air Conditioning Maintenance", 
    description: "Maintenance services designed to support efficient cooling performance and indoor comfort.",
    href: "/maintenance/hvac", 
    color: "bg-[#720632]" 
  },
  { 
    icon: Hammer, 
    title: "Handyman & Repair Services", 
    description: "Support for small repairs and fixes that help maintain daily functionality.",
    href: "/maintenance/handyman", 
    color: "bg-[#1C4668]" 
  },
  { 
    icon: Shield, 
    title: "Preventive Maintenance Solutions", 
    description: "Scheduled maintenance programs aimed at reducing long-term repair costs and unexpected issues.",
    href: "/maintenance/preventive", 
    color: "bg-[#970A44]" 
  },
];

// Our Approach points from document
const approachPoints = [
  { 
    title: "Preventive Focus", 
    description: "Preventive maintenance rather than reactive fixes to avoid costly repairs and disruptions." 
  },
  { 
    title: "Clear Assessment", 
    description: "Thorough assessment of issues before repair to ensure the right solution is applied." 
  },
  { 
    title: "Quality Materials", 
    description: "Use of appropriate materials and methods that meet Dubai's building standards." 
  },
  { 
    title: "Minimal Disruption", 
    description: "Reliable execution with minimal disruption to your daily operations and comfort." 
  },
];

// Why Maintenance Matters - from document
const whyMattersPoints = [
  "Continuous use of cooling systems",
  "Wear and tear from daily occupancy",
  "Environmental strain from heat and humidity",
  "Increased maintenance needs in shared spaces"
];

// Who Services Are For - from document
const targetAudiences = [
  { icon: Home, title: "Homeowners & Tenants", description: "Complete property care for your home" },
  { icon: Building2, title: "Property Owners & Landlords", description: "Protect your investment value" },
  { icon: Users, title: "Commercial Property Managers", description: "Maintain business operations" },
  { icon: Sparkles, title: "Offices & Shared Facilities", description: "Keep workspaces running smoothly" },
];

// Process steps from document
const processSteps = [
  { step: 1, title: "Assess", description: "Assessing the issue or maintenance requirement", icon: Search },
  { step: 2, title: "Recommend", description: "Recommending suitable repair or maintenance solutions", icon: ClipboardCheck },
  { step: 3, title: "Execute", description: "Carrying out work efficiently and safely", icon: Settings },
  { step: 4, title: "Review", description: "Reviewing outcomes to ensure proper resolution", icon: CheckCircle2 },
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: "Craig Fraser",
    role: "Client",
    content: "Your call centre's person on duty was very clear and organized. The technicians who arrived were excellent in every way and got the job done with minimum fuss. An excellent job all round.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    role: "Property Manager",
    content: "We've been using Property Masters for all our maintenance needs across 15 properties. Their response time and quality of work is consistently excellent.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
  },
  {
    id: 3,
    name: "Ahmed Al-Mansoori",
    role: "Villa Owner",
    content: "The annual maintenance contract has been a game-changer. No more worrying about AC breakdowns in summer or plumbing issues. They handle everything professionally.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    rating: 5,
  },
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.08 }
  },
  viewport: { once: true }
};

const staggerItem = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
};

export default function MaintenanceServices() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section - Two Column Layout */}
      <section ref={heroRef} className="relative min-h-screen flex items-center" data-testid="section-hero">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80"
            alt="Professional Maintenance Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Back to Home</span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
                >
                  <div className="w-10 h-10 bg-[#970A44] rounded-full flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium">Maintenance Services</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif leading-tight"
                  style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
                >
                  Maintenance Services{" "}
                  <span className="text-[#970A44]">in Dubai</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="text-xl text-[#970A44] font-medium mb-4"
                >
                  Reliable Property Care for Long-Term Performance
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-base md:text-lg leading-relaxed text-white/90 mb-8"
                  data-testid="text-hero-description"
                >
                  Property maintenance plays a critical role in preserving the value, safety, and functionality of homes and commercial spaces. In Dubai, properties are exposed to constant air conditioning, heavy usage, heat, and humidity, all of which place ongoing strain on building systems and finishes. Property Masters provides Maintenance Services designed to keep properties in good working condition, reduce unexpected breakdowns, and support long-term reliability.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button 
                    asChild
                    size="lg"
                    className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-10 py-7 text-lg shadow-2xl shadow-[#970A44]/30"
                    data-testid="button-hero-enquiry"
                  >
                    <Link href="/book">
                      Book a Service
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 rounded-full px-10 py-7 text-lg backdrop-blur-sm"
                    data-testid="button-hero-contact"
                  >
                    <Link href="/contact">
                      Contact Us
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right - Feature Cards */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 gap-4"
                data-testid="hero-features"
              >
                {heroFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5"
                  >
                    <div className="w-10 h-10 bg-[#970A44] rounded-lg flex items-center justify-center mb-3">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-white/70 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* What Our Maintenance Services Cover */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              What Our Maintenance Services Cover
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Property Masters offers a comprehensive range of maintenance services, each addressing specific aspects of property upkeep.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <Link href={service.href}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group" data-testid={`card-service-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <service.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-2 text-[#09263D] group-hover:text-[#970A44] transition-colors">{service.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 bg-white" data-testid="section-approach">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              Our Approach to Property Maintenance
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Maintenance works best when it is planned, consistent, and handled by experienced professionals. Our approach focuses on structured, professional care.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {approachPoints.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
              >
                <Card className="h-full border-0 shadow-lg text-center" data-testid={`card-approach-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-[#970A44]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-6 h-6 text-[#970A44]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-[#09263D]">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Maintenance Matters Section */}
      <section className="py-20 bg-[#09263D]" data-testid="section-why-matters">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-white">
                Why Maintenance Services Matter in Dubai
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Without proper maintenance, small issues can quickly turn into costly repairs or disruptions. Effective maintenance is not about reacting to problems when they appear, but about identifying and addressing issues early through structured, professional care.
              </p>
              <p className="text-white/80 mb-6">Dubai properties often experience:</p>
              <ul className="space-y-4 mb-8">
                {whyMattersPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-white/90"
                  >
                    <div className="w-6 h-6 bg-[#970A44] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    {point}
                  </motion.li>
                ))}
              </ul>
              <p className="text-[#970A44] font-semibold text-lg">
                Professional maintenance helps extend system lifespan, maintain safety, and preserve property value.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
                alt="Dubai Property Maintenance"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#970A44] text-white p-6 rounded-xl shadow-xl">
                <p className="text-3xl font-bold">40+</p>
                <p className="text-white/80 text-sm">Years in UAE</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who These Services Are For */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-audiences">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              Who These Services Are For
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Each property is assessed individually to determine the most appropriate maintenance support.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudiences.map((audience, index) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full border-0 shadow-lg text-center" data-testid={`card-audience-${index}`}>
                  <CardContent className="p-6">
                    <motion.div 
                      className="w-16 h-16 mx-auto mb-4 bg-[#970A44] rounded-2xl flex items-center justify-center"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <audience.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-[#09263D] mb-2">{audience.title}</h3>
                    <p className="text-muted-foreground text-sm">{audience.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Maintenance Projects Are Handled */}
      <section className="py-20 bg-white" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              How Maintenance Projects Are Handled
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our maintenance process is structured and transparent, helping maintain consistency and reliability across services.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg relative overflow-hidden" data-testid={`card-process-${step.step}`}>
                  <CardContent className="p-6 text-center">
                    <div className="absolute top-4 right-4 text-6xl font-bold text-[#970A44]/10">
                      {step.step}
                    </div>
                    <motion.div 
                      className="w-14 h-14 mx-auto mb-4 bg-[#970A44] rounded-xl flex items-center justify-center relative z-10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <step.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-[#09263D] text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Feedback / Testimonials Section */}
      <section className="py-24 bg-[#F6F4EB]" data-testid="section-testimonials">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#09263D]">
              Client Feedback
            </h2>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 shadow-2xl bg-white" data-testid={`testimonial-${testimonials[currentTestimonial].id}`}>
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="flex-shrink-0">
                        <img 
                          src={testimonials[currentTestimonial].image}
                          alt={testimonials[currentTestimonial].name}
                          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#970A44]/20"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex justify-center md:justify-start gap-1 mb-4">
                          {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-[#970A44] text-[#970A44]" />
                          ))}
                        </div>
                        <Quote className="w-10 h-10 text-[#970A44]/20 mb-4 mx-auto md:mx-0" />
                        <p className="text-lg md:text-xl text-[#09263D] leading-relaxed mb-6">
                          {testimonials[currentTestimonial].content}
                        </p>
                        <div>
                          <p className="font-bold text-[#09263D] text-lg">{testimonials[currentTestimonial].name}</p>
                          <p className="text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#09263D] hover:bg-[#970A44] hover:text-white transition-colors"
                data-testid="button-prev-testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#09263D] hover:bg-[#970A44] hover:text-white transition-colors"
                data-testid="button-next-testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-[#970A44]' : 'bg-[#970A44]/30'
                  }`}
                  data-testid={`dot-testimonial-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Maintenance Services Section */}
      <section className="py-20 bg-white" data-testid="section-explore">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              Explore Our Maintenance Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Each maintenance service is explained in detail on its own dedicated page, allowing you to explore solutions relevant to your property needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={service.href}>
                  <Card className="h-full border-0 shadow-lg hover-elevate cursor-pointer group" data-testid={`card-explore-${index}`}>
                    <CardContent className="p-6">
                      <div className="w-14 h-14 bg-[#970A44]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#970A44]/20 transition-colors">
                        <service.icon className="w-7 h-7 text-[#970A44]" />
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-[#09263D] group-hover:text-[#970A44] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center text-[#970A44] font-medium text-sm">
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p 
            {...fadeInUp} 
            viewport={{ once: true }}
            className="text-center text-muted-foreground mt-10 max-w-3xl mx-auto"
          >
            Each service is structured to address common maintenance needs found in Dubai properties.
          </motion.p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#09263D] to-[#1C4668]" data-testid="section-final-cta">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
              Looking for Reliable Maintenance Services in Dubai?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Property Masters can help keep your property running smoothly through professional maintenance solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  asChild
                  size="lg"
                  className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-10 py-7 text-lg shadow-2xl"
                  data-testid="button-cta-book"
                >
                  <Link href="/book">
                    Book a Service
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-10 py-7 text-lg"
                  data-testid="button-cta-contact"
                >
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
