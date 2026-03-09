import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  ArrowLeft,
  Heart,
  Leaf,
  Sparkles,
  Play,
  CheckCircle2,
  ShieldCheck,
  Award,
  Star,
  Phone,
  Wind,
  Droplets,
  Sofa,
  SprayCan,
  Home,
  Bug,
  Paintbrush,
  Truck,
  TestTube,
  Users,
  Baby,
  Stethoscope,
  Dumbbell,
  Apple,
  Shirt,
  Thermometer,
  Waves,
  Wrench,
  Zap,
  Clock,
  Shield,
  TreePine,
  MapPin,
  Calendar,
  Quote,
  ChevronLeft,
  ChevronRight,
  Target,
  Building2,
  Sparkle,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Hero Stats - matching thehealthyhome.me
const heroStats = [
  { value: "61,000+", label: "Happy Customers" },
  { value: "4.9/5", label: "Google Rating", icon: Star },
  { value: "7,000+", label: "Customer Reviews" },
  { value: "12+", label: "Years of Healthy Living" },
];

// Quick Service Icons - matching thehealthyhome.me
const quickServices = [
  { id: 1, name: "AC Cleaning", icon: Wind, href: "/wellness/ac-cleaning" },
  { id: 2, name: "Carpet Cleaning", icon: Sofa, href: "/wellness/carpet-cleaning" },
  { id: 3, name: "Mattress Cleaning", icon: Sofa, href: "/wellness/mattress-cleaning" },
  { id: 4, name: "Furniture Cleaning", icon: Sofa, href: "/wellness/furniture-cleaning" },
  { id: 5, name: "Home Deep Cleaning", icon: Home, href: "/wellness/deep-cleaning" },
  { id: 6, name: "Painting", icon: Paintbrush, href: "/wellness/painting" },
  { id: 7, name: "Water Tank Cleaning", icon: Droplets, href: "/wellness/water-tank" },
  { id: 8, name: "Contracts & Packages", icon: CheckCircle2, href: "/wellness/packages" },
  { id: 9, name: "More Services", icon: Sparkles, href: "/wellness" },
];

// New Services Carousel - matching thehealthyhome.me
const newServices = [
  { id: 1, name: "IV Drip at Home", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80", href: "/wellness/iv-drip" },
  { id: 2, name: "Movers & Packers", image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=600&q=80", href: "/wellness/movers" },
  { id: 3, name: "Painting Services", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80", href: "/wellness/painting" },
  { id: 4, name: "Furniture Cleaning Packages", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", href: "/wellness/packages" },
];

// Top Categories - matching thehealthyhome.me
const topCategories = [
  {
    id: 1,
    title: "Home Wellness Services",
    description: "Transform your living space with our expert deep cleaning, AC maintenance, water tank sanitization, and mold remediation services designed for a healthier home.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    icon: Home,
    href: "/wellness#home-services"
  },
  {
    id: 2,
    title: "Personal Wellness Services",
    description: "Enhance your well-being with tailored wellness solutions, including IV therapy, blood tests, massage services, and personalized nutrition plans.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
    icon: Heart,
    href: "/wellness#personal-services"
  },
];

// AC Services - matching thehealthyhome.me
const acServices = [
  { id: 1, name: "AC Cleaning", description: "Professional deep cleaning for all AC types", image: "https://images.unsplash.com/photo-1631545806609-11e27e55a72d?w=400&q=80" },
  { id: 2, name: "AC Coil Cleaning", description: "Thorough coil cleaning for better efficiency", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80" },
  { id: 3, name: "AC Repair & Maintenance", description: "Expert repair and preventive maintenance", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80" },
  { id: 4, name: "Mold Removal", description: "Complete mold remediation from AC systems", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80" },
  { id: 5, name: "AC Duct Cleaning", description: "Professional duct cleaning and sanitization", image: "https://images.unsplash.com/photo-1631545806609-11e27e55a72d?w=400&q=80" },
  { id: 6, name: "AC Installation", description: "Expert AC installation and replacement", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80" },
];

// Furniture Cleaning Services - matching thehealthyhome.me
const furnitureServices = [
  { id: 1, name: "Mattress Cleaning", description: "Deep cleaning and sanitization for healthier sleep", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80" },
  { id: 2, name: "Sofa Cleaning", description: "Professional upholstery cleaning and stain removal", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
  { id: 3, name: "Carpet Cleaning", description: "Deep extraction and sanitization for carpets", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { id: 4, name: "Curtain Cleaning", description: "On-site and off-site curtain cleaning", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80" },
  { id: 5, name: "Upholstery Shampooing", description: "Complete fabric care and restoration", image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&q=80" },
  { id: 6, name: "Nano Coating Protection", description: "Advanced stain protection for fabrics", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
];

// Water & Pipeline Services - matching thehealthyhome.me
const waterServices = [
  { id: 1, name: "Water Tank Cleaning", description: "Complete tank cleaning and sanitization", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80" },
  { id: 2, name: "Pipeline Disinfection", description: "Full pipeline cleaning and treatment", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80" },
  { id: 3, name: "Water Filters & Purifiers", description: "Premium filtration solutions", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80" },
  { id: 4, name: "Whole House Filtration", description: "Complete home water treatment systems", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80" },
];

// Pest Control Services - matching thehealthyhome.me (with images like deep cleaning)
const pestServices = [
  { id: 1, name: "Bed Bugs Control", description: "Complete bed bug elimination", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { id: 2, name: "Rodent Control", description: "Effective rat and mice removal", image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&q=80" },
  { id: 3, name: "Cockroach Control", description: "Professional cockroach treatment", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80" },
  { id: 4, name: "Mosquito Control", description: "Indoor and outdoor mosquito solutions", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" },
  { id: 5, name: "Termite Control", description: "Pre and post-construction treatment", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80" },
  { id: 6, name: "Drainage Cleaning", description: "Thorough drain cleaning services", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80" },
];

// Home Deep Cleaning Services - matching thehealthyhome.me
const deepCleaningServices = [
  { id: 1, name: "Move-In/Move-Out Cleaning", description: "Complete unfurnished property cleaning", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80" },
  { id: 2, name: "Premium Deep Cleaning", description: "Thorough furnished home cleaning", image: "https://images.unsplash.com/photo-1527515545081-5db817172677?w=400&q=80" },
  { id: 3, name: "Furniture Cleaning", description: "Complete furniture sanitization", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
];

// Indoor Testing Services - matching thehealthyhome.me
const testingServices = [
  { id: 1, name: "Indoor Air Quality Testing", description: "Comprehensive air analysis", icon: Wind },
  { id: 2, name: "Water Quality Testing", description: "Complete water safety analysis", icon: Droplets },
  { id: 3, name: "Mold Inspection & Testing", description: "Professional mold assessment", icon: TestTube },
  { id: 4, name: "Surface Testing", description: "Hygiene and contamination testing", icon: TestTube },
];

// Personal Wellness Services - matching thehealthyhome.me
const personalServices = [
  { id: 1, name: "Healthcare at Home", description: "Doctor consultations, blood tests, IV therapy", icon: Stethoscope, image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80" },
  { id: 2, name: "Spa & Beauty at Home", description: "Premium massage and beauty services", icon: Sparkles, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80" },
  { id: 3, name: "Health & Nutrition", description: "Personal trainers, meal plans, supplements", icon: Apple, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80" },
  { id: 4, name: "Mom & Baby Services", description: "Nanny services and baby products", icon: Baby, image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&q=80" },
  { id: 5, name: "Laundry Services", description: "Professional laundry and dry cleaning", icon: Shirt, image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&q=80" },
  { id: 6, name: "Fitness Training", description: "Personal fitness trainers at home", icon: Dumbbell, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80" },
];

// Home Improvement Services - matching thehealthyhome.me
const homeImprovementServices = [
  { id: 1, name: "Painting Services", description: "Professional interior & exterior painting" },
  { id: 2, name: "Movers & Packers", description: "Complete moving and packing solutions" },
  { id: 3, name: "Roof Waterproofing", description: "Premium waterproofing solutions" },
  { id: 4, name: "Kitchen Wrapping", description: "Transform your kitchen affordably" },
  { id: 5, name: "Smart Home Solutions", description: "Automated home technology" },
  { id: 6, name: "Parquet Flooring", description: "Quality flooring installation" },
  { id: 7, name: "Custom Curtains", description: "Made-to-measure curtain solutions" },
  { id: 8, name: "Home Renovation", description: "Complete fit-out and renovation" },
];

// Testimonials - matching thehealthyhome.me style
const testimonials = [
  {
    id: 1,
    name: "Sarah Al-Rashid",
    rating: 5,
    content: "Exceptional service! The AC cleaning team was professional and thorough. My home feels so much fresher now.",
    service: "AC Cleaning",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
  },
  {
    id: 2,
    name: "Mohammed Hassan",
    rating: 5,
    content: "The mattress cleaning service exceeded my expectations. Great attention to detail and very friendly staff.",
    service: "Mattress Cleaning",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
  },
  {
    id: 3,
    name: "Emma Thompson",
    rating: 5,
    content: "Best water tank cleaning service in Dubai. Punctual, professional, and thorough. Highly recommend!",
    service: "Water Tank Cleaning",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
  },
  {
    id: 4,
    name: "Ahmed Khalifa",
    rating: 5,
    content: "The deep cleaning service was amazing. My apartment looks brand new. Will definitely use again!",
    service: "Deep Cleaning",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
  },
];

// Why Choose Us
const whyChooseUs = [
  { icon: Shield, title: "100% Satisfaction Guarantee", description: "We're not happy until you are" },
  { icon: Clock, title: "Same Day Service", description: "Quick response when you need it" },
  { icon: Award, title: "Certified Professionals", description: "Trained and experienced technicians" },
  { icon: Leaf, title: "Eco-Friendly Products", description: "Safe for your family and pets" },
  { icon: Zap, title: "Advanced Technology", description: "State-of-the-art equipment" },
  { icon: ShieldCheck, title: "Insured Services", description: "Full coverage for peace of mind" },
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";

export default function WellnessServices() {
  const { data: posts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const filteredBlogPosts = posts.filter(p => p.category === "Wellness");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const newServicesRef = useRef<HTMLDivElement>(null);
  const acServicesRef = useRef<HTMLDivElement>(null);
  const furnitureServicesRef = useRef<HTMLDivElement>(null);
  const waterServicesRef = useRef<HTMLDivElement>(null);
  const pestServicesRef = useRef<HTMLDivElement>(null);
  const deepCleaningRef = useRef<HTMLDivElement>(null);

  const scrollNewServices = (direction: 'left' | 'right') => {
    if (newServicesRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      newServicesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollServices = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-[#F6F4EB]">
      {/* SECTION 1: HERO - matching thehealthyhome.me */}
      <section className="relative pt-24 pb-16 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=75"
            srcSet="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=70 800w, https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=75 1200w, https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80 1920w"
            sizes="100vw"
            alt="Wellness Home"
            className="w-full h-full object-cover"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09263D]/90 via-[#09263D]/70 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif leading-tight">
              A world of wellness for your family
            </h1>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4"
                  data-testid={`stat-${index}`}
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                    {stat.icon && <stat.icon className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
                  </div>
                  <span className="text-white/80 text-sm">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Air Quality & Trees Planted Widgets - inside hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
              data-testid="section-widgets"
            >
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-lg">
                <Wind className="w-6 h-6 text-[#970A44]" />
                <div>
                  <span className="text-xs text-muted-foreground block">Air Quality Today</span>
                  <div className="font-bold text-[#09263D] text-sm">Good - 85 AQI</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-green-50/95 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-lg">
                <TreePine className="w-6 h-6 text-green-600" />
                <div>
                  <span className="text-xs text-muted-foreground block">Trees Planted</span>
                  <div className="font-bold text-green-700 text-sm">11,780+ Trees</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: QUICK SERVICE ICONS - matching thehealthyhome.me */}
      <section className="py-12 bg-white" data-testid="section-quick-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {quickServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link href={service.href}>
                    <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-[#F6F4EB] transition-colors cursor-pointer group" data-testid={`quick-service-${service.id}`}>
                      <div className="w-16 h-16 bg-[#970A44]/10 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-[#970A44]/20 transition-colors">
                        <Icon className="w-8 h-8 text-[#970A44]" />
                      </div>
                      <span className="text-sm font-medium text-[#09263D]">{service.name}</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: DISCOVER NEW SERVICES - matching thehealthyhome.me */}
      <section className="py-16 bg-[#F6F4EB]" data-testid="section-new-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D] mb-4">
              Discover Our New Services!
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At Property Masters Wellness, we're expanding our offerings to bring you more ways to create a cleaner, safer, and healthier living space.
            </p>
          </motion.div>

          <div className="relative -mx-6 lg:-mx-8">
            <button
              onClick={() => scrollNewServices('left')}
              className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors"
              data-testid="button-new-services-left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div 
              ref={newServicesRef}
              className="flex gap-6 overflow-x-auto px-6 lg:px-8 py-2 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {newServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex-shrink-0 w-72 md:w-80"
                >
                  <Link href={service.href}>
                    <Card className="overflow-hidden border-0 shadow-lg hover-elevate cursor-pointer" data-testid={`new-service-${service.id}`}>
                      <div className="relative aspect-[2.5/1] overflow-hidden">
                        <img loading="lazy" 
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#970A44]/80 to-transparent flex items-center">
                          <h3 className="text-white font-bold text-lg px-6">{service.name}</h3>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => scrollNewServices('right')}
              className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors"
              data-testid="button-new-services-right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: TOP CATEGORIES - matching thehealthyhome.me */}
      <section className="py-20 bg-white" data-testid="section-top-categories">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#970A44] font-medium uppercase tracking-wider text-sm">Our Top Category</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D] mt-2 mb-4">
              Your Partner in Healthier Living
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Creating healthier homes with expert wellness services and holistic products for enhanced well-being.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {topCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={category.href}>
                    <Card className="overflow-hidden border-0 shadow-xl hover-elevate cursor-pointer group h-full" data-testid={`category-${category.id}`}>
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img loading="lazy" 
                          src={category.image}
                          alt={category.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#09263D] via-[#09263D]/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4">
                            <Icon className="w-7 h-7 text-[#970A44]" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">{category.title}</h3>
                          <p className="text-white/80 text-sm">{category.description}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: AC SERVICES - matching thehealthyhome.me */}
      <section className="py-20 bg-[#F6F4EB]" id="home-services" data-testid="section-ac-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Wind className="w-8 h-8 text-[#970A44]" />
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D]">
                  AC Services
                </h2>
              </div>
              <p className="text-muted-foreground">Breathe cleaner, healthier air with our professional AC services</p>
            </div>
            <Button 
              asChild
              variant="outline"
              className="hidden md:flex rounded-full border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
              data-testid="button-view-all-ac"
            >
              <Link href="/wellness/ac-services">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="relative -mx-6 lg:-mx-8">
            <button
              onClick={() => scrollServices(acServicesRef, 'left')}
              className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors"
              data-testid="button-ac-left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div 
              ref={acServicesRef}
              className="flex gap-6 overflow-x-auto px-6 lg:px-8 py-2 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {acServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex-shrink-0 w-72 md:w-80"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover-elevate cursor-pointer group" data-testid={`ac-service-${service.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img loading="lazy" 
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-lg text-[#09263D] mb-2">{service.name}</h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => scrollServices(acServicesRef, 'right')}
              className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors"
              data-testid="button-ac-right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 7: FURNITURE CLEANING SERVICES - matching thehealthyhome.me */}
      <section className="py-20 bg-white" data-testid="section-furniture-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Sofa className="w-8 h-8 text-[#970A44]" />
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D]">
                  Furniture Cleaning Services
                </h2>
              </div>
              <p className="text-muted-foreground">Deep cleaning and sanitization for all your furniture</p>
            </div>
            <Button 
              asChild
              variant="outline"
              className="hidden md:flex rounded-full border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
              data-testid="button-view-all-furniture"
            >
              <Link href="/wellness/furniture-cleaning">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="relative -mx-6 lg:-mx-8">
            <button
              onClick={() => scrollServices(furnitureServicesRef, 'left')}
              className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors"
              data-testid="button-furniture-left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div 
              ref={furnitureServicesRef}
              className="flex gap-6 overflow-x-auto px-6 lg:px-8 py-2 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {furnitureServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex-shrink-0 w-72 md:w-80"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover-elevate cursor-pointer group" data-testid={`furniture-service-${service.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img loading="lazy" 
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-lg text-[#09263D] mb-2">{service.name}</h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => scrollServices(furnitureServicesRef, 'right')}
              className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors"
              data-testid="button-furniture-right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 8: WATER & PIPELINE SERVICES - matching thehealthyhome.me */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-water-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Droplets className="w-8 h-8 text-[#970A44]" />
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D]">
                  Water & Pipeline Services
                </h2>
              </div>
              <p className="text-muted-foreground">Ensure clean, safe water throughout your home</p>
            </div>
            <Button 
              asChild
              variant="outline"
              className="hidden md:flex rounded-full border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
              data-testid="button-view-all-water"
            >
              <Link href="/wellness/water-services">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="relative -mx-6 lg:-mx-8">
            <button
              onClick={() => scrollServices(waterServicesRef, 'left')}
              className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors"
              data-testid="button-water-left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div 
              ref={waterServicesRef}
              className="flex gap-6 overflow-x-auto px-6 lg:px-8 py-2 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {waterServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex-shrink-0 w-72 md:w-80"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover-elevate cursor-pointer group" data-testid={`water-service-${service.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img loading="lazy" 
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-lg text-[#09263D] mb-2">{service.name}</h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => scrollServices(waterServicesRef, 'right')}
              className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors"
              data-testid="button-water-right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 9: HOME DEEP CLEANING - matching thehealthyhome.me */}
      <section className="py-20 bg-white" data-testid="section-deep-cleaning">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Home className="w-8 h-8 text-[#970A44]" />
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D]">
                  Home Deep Cleaning Services
                </h2>
              </div>
              <p className="text-muted-foreground">Complete home cleaning for a fresh, healthy environment</p>
            </div>
          </motion.div>

          <div className="relative -mx-6 lg:-mx-8">
            <button
              onClick={() => scrollServices(deepCleaningRef, 'left')}
              className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors"
              data-testid="button-deep-left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div 
              ref={deepCleaningRef}
              className="flex gap-6 overflow-x-auto px-6 lg:px-8 py-2 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {deepCleaningServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex-shrink-0 w-72 md:w-80"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover-elevate cursor-pointer group" data-testid={`deep-cleaning-${service.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img loading="lazy" 
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-lg text-[#09263D] mb-2">{service.name}</h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => scrollServices(deepCleaningRef, 'right')}
              className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors"
              data-testid="button-deep-right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 10: PEST CONTROL SERVICES - matching thehealthyhome.me */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-pest-control">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Bug className="w-8 h-8 text-[#970A44]" />
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D]">
                  Pest Control Services
                </h2>
              </div>
              <p className="text-muted-foreground">Protect your home from unwanted pests</p>
            </div>
            <Button 
              asChild
              variant="outline"
              className="hidden md:flex rounded-full border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
              data-testid="button-view-all-pest"
            >
              <Link href="/wellness/pest-control">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="relative -mx-6 lg:-mx-8">
            <button
              onClick={() => scrollServices(pestServicesRef, 'left')}
              className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors"
              data-testid="button-pest-left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div 
              ref={pestServicesRef}
              className="flex gap-6 overflow-x-auto px-6 lg:px-8 py-2 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {pestServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex-shrink-0 w-72 md:w-80"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover-elevate cursor-pointer group" data-testid={`pest-service-${service.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img loading="lazy" 
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-lg text-[#09263D] mb-2">{service.name}</h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => scrollServices(pestServicesRef, 'right')}
              className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors"
              data-testid="button-pest-right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 11: INDOOR TESTING SERVICES - matching thehealthyhome.me */}
      <section className="py-20 bg-white" data-testid="section-testing">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <TestTube className="w-8 h-8 text-[#970A44]" />
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D]">
                Indoor Environmental Testing
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional testing services to ensure your indoor environment is safe and healthy
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testingServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover-elevate cursor-pointer text-center" data-testid={`testing-service-${service.id}`}>
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto bg-[#970A44]/10 rounded-2xl flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-[#970A44]" />
                      </div>
                      <h3 className="font-bold text-lg text-[#09263D] mb-2">{service.name}</h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 12: PERSONAL WELLNESS SERVICES - matching thehealthyhome.me */}
      <section className="py-20 bg-[#09263D]" id="personal-services" data-testid="section-personal-wellness">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#970A44] font-medium uppercase tracking-wider text-sm">Personal Services</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mt-2 mb-4">
              Personal Wellness Services
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Enhance your well-being with our premium personal wellness offerings delivered to your doorstep
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-0 shadow-xl hover-elevate cursor-pointer group" data-testid={`personal-service-${service.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img loading="lazy" 
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[#970A44]" />
                          </div>
                          <h3 className="font-bold text-lg text-white">{service.name}</h3>
                        </div>
                        <p className="text-white/80 text-sm">{service.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 13: HOME IMPROVEMENT - matching thehealthyhome.me */}
      <section className="py-20 bg-white" data-testid="section-home-improvement">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Wrench className="w-8 h-8 text-[#970A44]" />
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D]">
                Home Improvement Services
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform your home with our professional improvement and renovation services
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {homeImprovementServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="border-0 shadow-md hover-elevate cursor-pointer" data-testid={`improvement-service-${service.id}`}>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-[#09263D] mb-1">{service.name}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14: WHY CHOOSE US - matching thehealthyhome.me */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-why-choose">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D] mb-4">
              Why Choose Property Masters Wellness?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the highest quality wellness services for your home and family
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover-elevate" data-testid={`why-choose-${index}`}>
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto bg-[#970A44]/10 rounded-2xl flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-[#970A44]" />
                      </div>
                      <h3 className="font-bold text-lg text-[#09263D] mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 15: TESTIMONIALS - matching thehealthyhome.me */}
      <section className="py-20 bg-white" data-testid="section-testimonials">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <img loading="lazy" src="https://www.google.com/favicon.ico" alt="Google" className="w-8 h-8" />
              <span className="font-semibold text-lg">Google Reviews</span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-xl font-bold">4.9</span>
              <span className="text-muted-foreground">(7,000+ reviews)</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D]">
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors -ml-6"
              data-testid="button-prev-testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <Card className="border-0 shadow-xl" data-testid="testimonial-card">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-12 h-12 mx-auto text-[#970A44]/20 mb-4" />
                <p className="text-xl text-[#09263D] italic mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <img loading="lazy" 
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-[#09263D]">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].service}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors -mr-6"
              data-testid="button-next-testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-[#970A44]' : 'bg-gray-300'
                  }`}
                  data-testid={`testimonial-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 18: WELLNESS SERVICES OVERVIEW */}
      <section className="py-24 bg-background" data-testid="section-wellness-overview">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif text-[#09263D]">
              Wellness Services in Dubai
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Wellness within a home or commercial space goes beyond appearance. It focuses on creating healthier environments by improving air quality, hygiene, comfort, and overall living conditions. In Dubai, wellness services are especially important due to climate conditions, sealed indoor environments, and long hours spent indoors.
            </p>
          </motion.div>

          {/* Dubai Context Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-16"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-[#970A44]/5 to-[#720632]/10">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#970A44]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-[#970A44]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-[#09263D]">Why Wellness Services Matter in Dubai</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Dubai's climate, combined with modern building designs, often leads to unique indoor environment challenges that require professional attention.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        "Limited natural ventilation",
                        "Higher indoor humidity",
                        "Accumulation of dust and pollutants",
                        "Increased reliance on air conditioning"
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#970A44] flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Our Approach */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#970A44]/10 rounded-full mb-6">
                <Target className="w-5 h-5 text-[#970A44]" />
                <span className="text-[#970A44] font-medium">Our Approach to Wellness</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 font-serif text-[#09263D]">
                Preventive, Structured & Practical
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Wellness services are most effective when they are preventive, structured, and based on real environmental needs rather than trends. Our approach focuses on:
              </p>
              <ul className="space-y-4">
                {[
                  "Identifying factors that affect indoor health and comfort",
                  "Using solutions suited to Dubai's climate and building conditions",
                  "Applying methods that are safe, practical, and easy to maintain",
                  "Supporting long-term improvement rather than temporary fixes"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#970A44] flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1C4668]/10 rounded-full mb-6">
                <Eye className="w-5 h-5 text-[#1C4668]" />
                <span className="text-[#1C4668] font-medium">What Our Wellness Services Cover</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 font-serif text-[#09263D]">
                Comprehensive Indoor Health
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Indoor Air Quality Solutions", desc: "Services aimed at improving air circulation, reducing airborne pollutants, and creating cleaner indoor environments." },
                  { title: "Hygiene & Sanitization Services", desc: "Professional cleaning and sanitization designed to maintain high hygiene standards." },
                  { title: "Mold & Moisture Control", desc: "Solutions that address moisture buildup, mold growth, and related indoor health concerns." },
                  { title: "Water Quality & Filtration", desc: "Services focused on improving water quality through filtration and treatment systems." },
                  { title: "Allergy & Dust Reduction", desc: "Measures designed to reduce allergens, dust accumulation, and irritants within indoor spaces." },
                ].map((item, idx) => (
                  <Card key={idx} className="border hover-elevate" data-testid={`wellness-cover-${idx}`}>
                    <CardContent className="p-4">
                      <h4 className="font-bold text-[#09263D] mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Who These Services Are For */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-16"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-4xl font-bold font-serif text-[#09263D] mb-4">
                Who These Services Are For
              </h3>
              <p className="text-muted-foreground">Each project is approached with attention to specific needs and usage patterns.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Home, title: "Homeowners", desc: "Seeking healthier living environments" },
                { icon: Users, title: "Families", desc: "With children or elderly residents" },
                { icon: Building2, title: "Property Owners", desc: "And landlords investing in wellness" },
                { icon: Award, title: "Commercial Spaces", desc: "Prioritizing hygiene and comfort" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-lg hover-elevate text-center" data-testid={`wellness-for-${idx}`}>
                    <CardContent className="p-6">
                      <div className="w-14 h-14 mx-auto mb-4 bg-[#970A44]/10 rounded-2xl flex items-center justify-center">
                        <item.icon className="w-7 h-7 text-[#970A44]" />
                      </div>
                      <h4 className="font-bold mb-2 text-[#09263D]">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* How Wellness Projects Are Handled */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-[#09263D] to-[#1C4668]">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-serif">How Wellness Projects Are Handled</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-8">
                  Our process is simple and structured to ensure wellness services deliver meaningful and lasting results.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { step: "1", title: "Assessment", desc: "Assessing the space and identifying wellness concerns" },
                    { step: "2", title: "Recommendation", desc: "Recommending suitable services and solutions" },
                    { step: "3", title: "Execution", desc: "Executing services using safe and effective methods" },
                    { step: "4", title: "Review", desc: "Reviewing outcomes to ensure improvement" },
                  ].map((item, idx) => (
                    <div key={idx} className="text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-[#970A44] rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {item.step}
                      </div>
                      <h4 className="font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-white/70 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* SECTION 19: COMPREHENSIVE FAQ */}
      <section className="py-24 bg-[#F6F4EB]" data-testid="section-wellness-faq">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif text-[#09263D]">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our wellness services.
            </p>
          </motion.div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full max-w-5xl mx-auto mb-8 flex flex-wrap h-auto gap-2 bg-transparent justify-center">
              {[
                { value: "overview", label: "Overview" },
                { value: "air-quality", label: "Air Quality" },
                { value: "hygiene", label: "Hygiene" },
                { value: "mold", label: "Mold Control" },
                { value: "water", label: "Water Quality" },
                { value: "allergy", label: "Allergy & Dust" },
              ].map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value}
                  className="px-4 py-2 data-[state=active]:bg-[#970A44] data-[state=active]:text-white rounded-full"
                  data-testid={`tab-wellness-faq-${tab.value}`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "What do wellness services focus on?", a: "Wellness services focus on improving indoor comfort, hygiene, air quality, and overall living conditions." },
                  { q: "Are wellness services suitable for existing homes?", a: "Yes. All services are designed to integrate into existing residential and commercial properties." },
                  { q: "Do wellness services require major renovation work?", a: "No. Most solutions are non-invasive and can be implemented without major disruption." },
                  { q: "Are these services relevant for Dubai properties?", a: "Yes. They are designed specifically around Dubai's climate, indoor environments, and usage patterns." },
                  { q: "Can wellness services be combined with other property services?", a: "Yes. Wellness services can be integrated with interior or maintenance services if required." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`faq-overview-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="air-quality" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "Why is indoor air quality a concern in Dubai?", a: "Heavy air conditioning use and limited natural ventilation can reduce indoor air quality." },
                  { q: "Do you assess air quality before recommending solutions?", a: "Yes. Each space is reviewed to identify air quality concerns." },
                  { q: "Can air quality be improved without changing AC systems?", a: "In many cases, yes. Improvements can be made through circulation and control measures." },
                  { q: "Are solutions safe for daily living?", a: "Yes. All methods are safe for occupied spaces." },
                  { q: "Is this service suitable for offices as well?", a: "Yes. Both residential and commercial spaces are supported." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`faq-air-quality-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hygiene" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "How is sanitization different from regular cleaning?", a: "Sanitization targets bacteria and germs, not just visible dirt." },
                  { q: "Are sanitization methods safe for homes with children or pets?", a: "Yes. Safe and approved methods are used." },
                  { q: "Do you sanitize high-contact areas specifically?", a: "Yes. High-touch surfaces are a key focus." },
                  { q: "Can sanitization be done in commercial spaces?", a: "Yes. Offices and shared spaces are commonly serviced." },
                  { q: "How often should sanitization be done?", a: "Frequency depends on usage and occupancy levels." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`faq-hygiene-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mold" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "What causes mold growth indoors?", a: "Mold develops due to excess moisture, humidity, or poor ventilation." },
                  { q: "Do you treat only visible mold?", a: "No. The focus is on identifying and addressing the moisture source." },
                  { q: "Is mold treatment safe for occupied homes?", a: "Yes. Treatments are applied carefully and safely." },
                  { q: "Can mold return after treatment?", a: "Preventive measures are recommended to reduce recurrence." },
                  { q: "Is this service suitable for bathrooms and kitchens?", a: "Yes. These areas are commonly treated." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`faq-mold-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="water" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "What water issues are common in Dubai homes?", a: "Mineral content, scaling, and sediment are common concerns." },
                  { q: "Do you test water before recommending filtration?", a: "Yes. Water conditions are reviewed before suggesting solutions." },
                  { q: "Are filtration systems installed for the entire home?", a: "Both whole-property and point-of-use options are available." },
                  { q: "Do filtration systems require maintenance?", a: "Yes. Basic maintenance is required for consistent performance." },
                  { q: "Can filtration improve water comfort for bathing?", a: "Yes. Improved water quality enhances daily usability." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`faq-water-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="allergy" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "Why does dust build up quickly in Dubai homes?", a: "Outdoor dust and constant air circulation contribute to buildup." },
                  { q: "Can dust reduction help allergy discomfort?", a: "Yes. Reducing dust and allergens improves indoor comfort." },
                  { q: "Is this service a replacement for regular cleaning?", a: "No. It supports cleaner environments alongside routine cleaning." },
                  { q: "Are solutions suitable for occupied spaces?", a: "Yes. Methods are non-disruptive and safe." },
                  { q: "Can this service be used in offices?", a: "Yes. Offices and shared spaces benefit from dust reduction solutions." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`faq-allergy-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* SECTION 20: BOOK NOW CTA - matching thehealthyhome.me */}
      <section className="py-20 bg-[#970A44]" data-testid="section-book-cta">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-6">
              Ready to Create a Healthier Home?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Book your wellness service today and experience the difference. Our team of certified professionals is ready to transform your living space.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-white text-[#970A44] hover:bg-gray-100 rounded-full px-8"
                data-testid="button-book-now"
              >
                <Link href="/book">
                  Book Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-8"
                data-testid="button-call-us"
              >
                <a href="tel:+971585707110">
                  <Phone className="mr-2 w-5 h-5" />
                  Call Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 17: CONTACT INFO - matching thehealthyhome.me */}
      <section className="py-16 bg-[#09263D]" data-testid="section-contact-info">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-[#970A44] rounded-2xl flex items-center justify-center mb-4">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Call Us</h3>
              <p className="text-white/70">+971 4 345 6789</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-[#970A44] rounded-2xl flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Visit Us</h3>
              <p className="text-white/70">AL Saqr Business Tower - Office A-36, Dubai, UAE</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-[#970A44] rounded-2xl flex items-center justify-center mb-4">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Working Hours</h3>
              <p className="text-white/70">7 Days a Week, 8AM - 8PM</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
