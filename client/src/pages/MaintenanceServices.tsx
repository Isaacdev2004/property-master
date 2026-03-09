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
  Headphones,
  Sparkles,
  Bug,
  Waves,
  Home,
  Truck,
  Smartphone,
  Flame,
  Package,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  X,
  Target,
  CheckCircle2,
  MapPin,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Hero badges - matching hitchesglitches.com
const heroBadges = [
  { icon: ThumbsUp, title: "Guaranteed", subtitle: "Satisfaction" },
  { icon: Calendar, title: "Online", subtitle: "Booking" },
  { icon: Clock, title: "Emergency", subtitle: "Response" },
  { icon: Headphones, title: "24/7", subtitle: "Working days" },
];

// 16 Services matching hitchesglitches.com - using brand colors only
const services = [
  { icon: Sparkles, title: "Disinfection Service", href: "/maintenance/disinfection", color: "bg-[#970A44]" },
  { icon: Flame, title: "Kitchen Equipment Maintenance", href: "/maintenance/kitchen", color: "bg-[#1C4668]" },
  { icon: Hammer, title: "Civil Minor Work", href: "/maintenance/civil", color: "bg-[#09263D]" },
  { icon: Sparkles, title: "Special Cleaning", href: "/maintenance/cleaning-special", color: "bg-[#720632]" },
  { icon: Smartphone, title: "Smart Product Installation", href: "/maintenance/smart-home", color: "bg-[#1C4668]" },
  { icon: Truck, title: "Move In / Move Out", href: "/maintenance/moving", color: "bg-[#970A44]" },
  { icon: Bug, title: "Pest Control", href: "/maintenance/pest-control", color: "bg-[#09263D]" },
  { icon: Droplets, title: "Water Tank Cleaning", href: "/maintenance/water-tank", color: "bg-[#1C4668]" },
  { icon: Waves, title: "Swimming Pool Service", href: "/maintenance/pool", color: "bg-[#720632]" },
  { icon: Droplets, title: "Plumbing Service", href: "/maintenance/plumbing", color: "bg-[#09263D]" },
  { icon: Home, title: "Home Improvement", href: "/maintenance/home-improvement", color: "bg-[#970A44]" },
  { icon: Zap, title: "Electrical Services", href: "/maintenance/electrical", color: "bg-[#1C4668]" },
  { icon: Sparkles, title: "Cleaning Services", href: "/maintenance/cleaning", color: "bg-[#720632]" },
  { icon: Wind, title: "Air Conditioning", href: "/maintenance/ac", color: "bg-[#09263D]" },
  { icon: Shield, title: "Security Systems", href: "/maintenance/security", color: "bg-[#1C4668]" },
  { icon: Package, title: "Maintenance Packages", href: "/maintenance/packages", color: "bg-[#970A44]" },
];

// How it works steps
const howItWorks = [
  { step: 1, title: "Select the service(s)", subtitle: "you need", icon: Settings },
  { step: 2, title: "Book a date and time", subtitle: "that suits you", icon: Calendar },
  { step: 3, title: "Sit back and relax", subtitle: "while we get to work", icon: ThumbsUp },
];

// Maintenance Packages - now fetched from API

// Statistics
const statistics = [
  { value: "40+", label: "Years of Expertise in UAE" },
  { value: "3000+", label: "Customers" },
  { value: "2,500+", label: "Properties Managed" },
  { value: "8000+", label: "Staff" },
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

// Blog posts
const blogPosts = [
  {
    id: 1,
    title: "Demand for elite maintenance in luxury branded residences...",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    date: "2025-08-15",
  },
  {
    id: 2,
    title: "Swimming pool maintenance – how professional care saves money",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&q=80",
    date: "2025-07-23",
  },
  {
    id: 3,
    title: "Preventative Drain Line Cleaning in Dubai Saves Money",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80",
    date: "2024-11-08",
  },
  {
    id: 4,
    title: "How Much Does a Home Maintenance Contract Cost?",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
    date: "2024-11-08",
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

import { useQuery } from "@tanstack/react-query";
import type { MaintenancePackage } from "@shared/schema";
import type { BlogPost } from "@shared/schema";

export default function MaintenanceServices() {
  const { data: posts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const { data: maintenancePackages = [] } = useQuery<MaintenancePackage[]>({
    queryKey: ["/api/maintenance-packages"],
  });

  const filteredBlogPosts = posts.filter(p => p.category === "Maintenance");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMaintenanceVideoPlaying, setIsMaintenanceVideoPlaying] = useState(false);
  const maintenanceVideoRef = useRef<HTMLVideoElement>(null);
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
      {/* Hero Section - Matching hitchesglitches.com */}
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#09263D]/95 via-[#09263D]/80 to-[#09263D]/60" />
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
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[#970A44] font-semibold text-lg mb-4 tracking-wide"
                >
                  Quality Repairs & Maintenance, Hassle-Free
                </motion.p>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-serif leading-tight"
                >
                  Best Home Maintenance{" "}
                  <span className="text-[#970A44]">Company in UAE</span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button 
                    asChild
                    size="lg"
                    className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-10 py-7 text-lg shadow-2xl shadow-[#970A44]/30"
                    data-testid="button-hero-enquiry"
                  >
                    <Link href="/contact">
                      Make An Enquiry
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right - Feature Badges */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 gap-4"
              >
                {heroBadges.map((badge, index) => (
                  <motion.div
                    key={badge.title}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center cursor-pointer transition-all"
                    data-testid={`badge-${badge.title.toLowerCase()}`}
                  >
                    <div className="w-16 h-16 mx-auto mb-3 bg-[#970A44] rounded-2xl flex items-center justify-center">
                      <badge.icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white font-bold text-lg">{badge.title}</p>
                    <p className="text-white/70 text-sm">{badge.subtitle}</p>
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

      {/* Services Grid Section - "How can we help you today?" */}
      <section className="py-24 bg-gradient-to-b from-[#F6F4EB] to-white" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <p className="text-[#970A44] font-semibold text-sm uppercase tracking-widest mb-3">
              CHOOSE YOUR SERVICE
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#09263D]">
              How can we help you today?
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={service.href}>
                  <Card 
                    className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group bg-white"
                    data-testid={`card-service-${index}`}
                  >
                    <CardContent className="p-6 text-center">
                      <motion.div 
                        className={`w-16 h-16 mx-auto mb-4 ${service.color} rounded-2xl flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <service.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="font-semibold text-[#09263D] group-hover:text-[#970A44] transition-colors text-sm md:text-base">
                        {service.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Free Consultation CTA Section */}
      <section className="py-20 bg-[#970A44] relative overflow-hidden" data-testid="section-consultation-cta">
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
              Want a Free Consultation?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              We are always Ready To Help You
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                asChild
                size="lg"
                className="bg-white text-[#970A44] hover:bg-white/90 rounded-full px-10 py-7 text-lg font-bold shadow-2xl"
                data-testid="button-consultation"
              >
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-0" data-testid="section-how-it-works">
        <div className="grid lg:grid-cols-2">
          {/* Left - Video Section */}
          <div 
            className="relative min-h-[500px] lg:min-h-[700px] cursor-pointer bg-black"
            onClick={() => {
              const video = maintenanceVideoRef.current;
              if (!video) return;
              if (isMaintenanceVideoPlaying) {
                video.pause();
                setIsMaintenanceVideoPlaying(false);
              } else {
                video.play();
                setIsMaintenanceVideoPlaying(true);
              }
            }}
            data-testid="button-play-video"
          >
            <video
              ref={maintenanceVideoRef}
              src="/videos/maintenance-page.mp4"
              className="w-full h-full object-cover absolute inset-0"
              playsInline
              onEnded={() => setIsMaintenanceVideoPlaying(false)}
              data-testid="video-maintenance"
            />
            <AnimatePresence>
              {!isMaintenanceVideoPlaying && (
                <motion.div
                  className="absolute inset-0 bg-black/30 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Play className="w-8 h-8 text-[#970A44] ml-1" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right - Steps and Description */}
          <div className="bg-[#09263D] p-8 lg:p-16 flex flex-col justify-center">
            {/* Steps */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-6 mb-12"
            >
              {howItWorks.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={staggerItem}
                  className="text-center"
                  data-testid={`step-${step.step}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 mx-auto mb-4 bg-[#970A44] rounded-2xl flex items-center justify-center"
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <p className="text-white font-semibold text-sm md:text-base">{step.title}</p>
                  <p className="text-white/60 text-xs md:text-sm">{step.subtitle}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Company Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Welcome to Property Masters Maintenance, part of The Property Masters Group, and Dubai's most trusted home maintenance company. With a reputation based on quality, reliability and value for money we work hard to keep our customers happy.
              </p>
              <motion.div
                whileHover={{ x: 10 }}
              >
                <Button 
                  asChild
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-8"
                  data-testid="button-about-us"
                >
                  <Link href="/about">
                    About Us
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Maintenance Packages Section */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F6F4EB]" data-testid="section-packages">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <p className="text-[#970A44] font-semibold text-sm uppercase tracking-widest mb-3">
              Choose
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#09263D] mb-4">
              Maintenance Packages
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We have variety of different packages according to customer needs, as well as customer can customize their packages.
            </p>
          </motion.div>

          <div className="flex justify-center mb-12">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button 
                asChild
                variant="outline"
                className="rounded-full px-8 border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
                data-testid="button-view-packages"
              >
                <Link href="/maintenance/packages">
                  View Packages
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {maintenancePackages.map((pkg, index) => (
              <motion.div
                key={pkg.title}
                variants={staggerItem}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card 
                  className={`h-full border-0 shadow-xl transition-all duration-300 overflow-hidden ${
                    pkg.popular ? 'ring-2 ring-[#970A44] bg-[#970A44] text-white' : 'bg-white'
                  }`}
                  data-testid={`card-package-${pkg.title.toLowerCase()}`}
                >
                  <CardContent className="p-8">
                    <h3 className={`text-2xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-[#09263D]'}`}>
                      {pkg.title}
                    </h3>
                    {pkg.isCustom ? (
                      <p className={`text-sm mb-6 ${pkg.popular ? 'text-white/80' : 'text-muted-foreground'}`}>
                        {pkg.subtitle}
                      </p>
                    ) : (
                      <>
                        <p className={`text-sm mb-2 ${pkg.popular ? 'text-white/80' : 'text-muted-foreground'}`}>
                          Starting at
                        </p>
                        <p className={`text-3xl font-bold mb-6 ${pkg.popular ? 'text-white' : 'text-[#970A44]'}`}>
                          {pkg.price}<span className="text-base font-normal">{pkg.period}</span>
                        </p>
                      </>
                    )}
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Check className={`w-4 h-4 flex-shrink-0 ${pkg.popular ? 'text-white' : 'text-[#970A44]'}`} />
                          <span className={pkg.popular ? 'text-white/90' : ''}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full rounded-full ${
                        pkg.popular 
                          ? 'bg-white text-[#970A44] hover:bg-white/90' 
                          : 'bg-[#970A44] hover:bg-[#720632] text-white'
                      }`}
                      data-testid={`button-select-${pkg.title.toLowerCase()}`}
                    >
                      {pkg.isCustom ? 'Request Now' : 'Select Plan'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-[#09263D]" data-testid="section-statistics">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {statistics.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="text-center"
                data-testid={`stat-${index}`}
              >
                <motion.p 
                  className="text-5xl md:text-6xl font-bold text-[#970A44] mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-white/80 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
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
                        <img loading="lazy" 
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

      {/* Latest News & Blogs Section */}
      <section className="py-24 bg-white" data-testid="section-blogs">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <p className="text-[#970A44] font-semibold text-sm uppercase tracking-widest mb-3">
              Resources
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#09263D]">
              Latest News & Blogs
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredBlogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={staggerItem}
                whileHover={{ y: -8 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card 
                    className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                    data-testid={`card-blog-${post.id}`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img loading="lazy" 
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-[#09263D] group-hover:text-[#970A44] transition-colors line-clamp-2 mb-3">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <CalendarDays className="w-4 h-4" />
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <motion.p 
                        className="text-[#970A44] font-semibold text-sm mt-4 flex items-center gap-1"
                        whileHover={{ x: 5 }}
                      >
                        Read more <ArrowRight className="w-4 h-4" />
                      </motion.p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MAINTENANCE SERVICES OVERVIEW SECTION */}
      <section className="py-24 bg-background" data-testid="section-maintenance-overview">
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
              Maintenance Services in Dubai
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Property maintenance plays a critical role in preserving the value, safety, and functionality of homes and commercial spaces. In Dubai, properties are exposed to constant air conditioning, heavy usage, heat, and humidity, all of which place ongoing strain on building systems and finishes.
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
                    <h3 className="text-2xl font-bold mb-4 text-[#09263D]">Why Maintenance Services Matter in Dubai</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Without proper maintenance, small issues can quickly turn into costly repairs or disruptions. Effective maintenance is not about reacting to problems when they appear, but about identifying and addressing issues early through structured, professional care.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        "Continuous use of cooling systems",
                        "Wear and tear from daily occupancy",
                        "Environmental strain from heat and humidity",
                        "Increased maintenance needs in shared spaces"
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
                <span className="text-[#970A44] font-medium">Our Approach to Property Maintenance</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 font-serif text-[#09263D]">
                Planned, Consistent & Professional
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Maintenance works best when it is planned, consistent, and handled by experienced professionals. Our approach focuses on:
              </p>
              <ul className="space-y-4">
                {[
                  "Preventive maintenance rather than reactive fixes",
                  "Clear assessment of issues before repair",
                  "Use of appropriate materials and methods",
                  "Reliable execution with minimal disruption"
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
                <span className="text-[#1C4668] font-medium">What Our Maintenance Services Cover</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 font-serif text-[#09263D]">
                Comprehensive Property Care
              </h3>
              <div className="space-y-4">
                {[
                  { title: "General Property Maintenance", desc: "Routine maintenance services that support the overall condition and functionality of properties." },
                  { title: "Electrical Maintenance Services", desc: "Inspection, repair, and maintenance of electrical systems to ensure safety and reliable operation." },
                  { title: "Plumbing Maintenance Services", desc: "Services focused on identifying leaks, blockages, and plumbing inefficiencies before they escalate." },
                  { title: "HVAC & Air Conditioning", desc: "Maintenance services designed to support efficient cooling performance and indoor comfort." },
                  { title: "Handyman & Repair Services", desc: "Support for small repairs and fixes that help maintain daily functionality." },
                  { title: "Preventive Maintenance Solutions", desc: "Scheduled maintenance programs aimed at reducing long-term repair costs." },
                ].map((item, idx) => (
                  <Card key={idx} className="border hover-elevate" data-testid={`maintenance-cover-${idx}`}>
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
              <p className="text-muted-foreground">Each property is assessed individually to determine the most appropriate maintenance support.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Home, title: "Homeowners & Tenants", desc: "Regular maintenance for daily comfort" },
                { icon: Building2, title: "Property Owners", desc: "And landlords protecting investments" },
                { icon: Users, title: "Commercial Managers", desc: "Maintaining business facilities" },
                { icon: Award, title: "Offices & Shared Spaces", desc: "Professional upkeep for shared areas" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-lg hover-elevate text-center" data-testid={`maintenance-for-${idx}`}>
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

          {/* How Maintenance Projects Are Handled */}
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
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-serif">How Maintenance Projects Are Handled</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-8">
                  Our maintenance process is structured and transparent, helping maintain consistency and reliability across services.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { step: "1", title: "Assessment", desc: "Assessing the issue or maintenance requirement" },
                    { step: "2", title: "Recommendation", desc: "Recommending suitable repair or solutions" },
                    { step: "3", title: "Execution", desc: "Carrying out work efficiently and safely" },
                    { step: "4", title: "Review", desc: "Reviewing outcomes to ensure resolution" },
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

      {/* COMPREHENSIVE FAQ SECTION */}
      <section className="py-24 bg-[#F6F4EB]" data-testid="section-maintenance-faq">
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
              Find answers to common questions about our maintenance services.
            </p>
          </motion.div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full max-w-5xl mx-auto mb-8 flex flex-wrap h-auto gap-2 bg-transparent justify-center">
              {[
                { value: "overview", label: "Overview" },
                { value: "general", label: "General" },
                { value: "electrical", label: "Electrical" },
                { value: "plumbing", label: "Plumbing" },
                { value: "hvac", label: "HVAC" },
                { value: "handyman", label: "Handyman" },
                { value: "amc", label: "AMC" },
              ].map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value}
                  className="px-4 py-2 data-[state=active]:bg-[#970A44] data-[state=active]:text-white rounded-full"
                  data-testid={`tab-maintenance-faq-${tab.value}`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "What do maintenance services cover?", a: "All aspects of property upkeep, including routine checks, repairs, and preventive solutions." },
                  { q: "Are these services suitable for both homes and commercial properties?", a: "Yes. Services are tailored for residential, commercial, and shared spaces." },
                  { q: "Do I need to schedule all services at once?", a: "No. Services can be scheduled individually or through ongoing programs like AMC." },
                  { q: "Can maintenance help prevent costly repairs?", a: "Yes. Regular maintenance reduces unexpected breakdowns and long-term repair costs." },
                  { q: "Do you operate throughout Dubai?", a: "Yes. Maintenance services are available across all areas of Dubai." },
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

            <TabsContent value="general" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "What is included in general property maintenance?", a: "Routine inspections, minor repairs, preventive checks, and coordination of small tasks." },
                  { q: "Can general maintenance be done without disruption?", a: "Yes. Services are planned to minimize interference with daily property use." },
                  { q: "Do you offer both residential and commercial general maintenance?", a: "Yes. Services are tailored to different property types." },
                  { q: "How often should general maintenance be carried out?", a: "Frequency depends on property size, usage, and client requirements." },
                  { q: "Do you provide a record of completed maintenance tasks?", a: "Yes. Each visit is documented for transparency and future reference." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`faq-general-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="electrical" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "Do you handle both residential and commercial electrical systems?", a: "Yes. All systems are supported with inspection and repair." },
                  { q: "Can you identify potential electrical issues before they become serious?", a: "Yes. Routine inspection helps prevent safety risks and downtime." },
                  { q: "Are electrical repairs performed safely in occupied properties?", a: "Yes. All work follows safety protocols to protect residents and occupants." },
                  { q: "Do you replace faulty switches, sockets, or fixtures?", a: "Yes. Replacement and repairs are part of the service." },
                  { q: "Is electrical maintenance included in preventive maintenance programs?", a: "Yes. Electrical checks are included in scheduled AMC plans." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`faq-electrical-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="plumbing" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "What plumbing issues are covered?", a: "Leaks, blockages, low water pressure, faulty fixtures, and preventive checks." },
                  { q: "Do you work in occupied properties?", a: "Yes. Services are planned to minimize disruption." },
                  { q: "Can minor plumbing issues be fixed before they escalate?", a: "Yes. Preventive maintenance helps avoid major problems." },
                  { q: "Do you provide maintenance for both residential and commercial plumbing?", a: "Yes. Solutions are tailored for each property type." },
                  { q: "Are emergency plumbing repairs available?", a: "Yes. Priority support can be provided depending on the issue." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`faq-plumbing-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hvac" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "Do you maintain all types of AC and HVAC systems?", a: "Yes. Both residential and commercial systems are supported." },
                  { q: "Does HVAC maintenance improve cooling efficiency?", a: "Yes. Routine servicing helps maintain performance and reduce energy consumption." },
                  { q: "Are filter cleaning and replacement included?", a: "Yes. Proper maintenance of filters is part of all service visits." },
                  { q: "Can HVAC maintenance prevent system breakdowns during peak summer?", a: "Yes. Preventive maintenance reduces the risk of failure in high-demand periods." },
                  { q: "Is this service safe for occupied homes or offices?", a: "Yes. All work is carried out safely and efficiently." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`faq-hvac-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="handyman" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "What types of repairs are handled?", a: "Minor repairs, furniture and fixture adjustments, door and window hardware, and wall touch-ups." },
                  { q: "Can multiple small tasks be done in a single visit?", a: "Yes. Handyman services are coordinated to address multiple issues efficiently." },
                  { q: "Are services suitable for both homes and offices?", a: "Yes. Services are tailored for residential and commercial spaces." },
                  { q: "Can repairs be scheduled flexibly?", a: "Yes. Visits are arranged according to client needs and availability." },
                  { q: "Do you provide maintenance documentation?", a: "Yes. All completed tasks are recorded for reference." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`faq-handyman-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="amc" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "What is included in preventive maintenance and AMC?", a: "Scheduled inspections, system checks, minor repairs, and preventive actions across the property." },
                  { q: "Do preventive maintenance plans reduce repair costs?", a: "Yes. Early detection of issues helps minimize long-term costs." },
                  { q: "Can AMC contracts be customized?", a: "Yes. Contracts are tailored based on property type, size, and requirements." },
                  { q: "Are residential and commercial properties covered under AMC?", a: "Yes. AMC services are available for all property types." },
                  { q: "Do you provide reports for maintenance activities?", a: "Yes. Documentation is provided to track completed tasks and recommendations." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`faq-amc-${idx}`}>
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
              Ready to Experience Hassle-Free Maintenance?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied property owners in UAE. Get started with a free consultation today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  asChild
                  size="lg"
                  className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-10 py-7 text-lg shadow-2xl"
                  data-testid="button-cta-quote"
                >
                  <Link href="/contact">
                    Get Free Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                  className="border-white/50 text-white hover:bg-white/10 rounded-full px-10 py-7 text-lg"
                  data-testid="button-cta-call"
                >
                  <a href="tel:+971585707110">
                    <Phone className="mr-2 w-5 h-5" />
                    Call +971 585 707 110
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
