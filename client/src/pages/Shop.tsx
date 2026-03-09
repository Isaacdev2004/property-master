import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  ShoppingCart, 
  Star, 
  ArrowRight, 
  ArrowLeft,
  Sofa,
  Lamp,
  Frame,
  Armchair,
  Clock,
  BedDouble,
  Table,
  ChefHat,
  Wind,
  Palette,
  Sparkles,
  Package,
  Truck,
  Shield,
  HeadphonesIcon,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { getSessionId } from "@/lib/cart";
import type { Product } from "@shared/schema";

// Animation variants with proper easing
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } }
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const quickCategories = [
  { name: "Sofas", icon: Sofa, category: "Sofas", color: "bg-[#CD9342]" },
  { name: "Beds", icon: BedDouble, category: "Beds", color: "bg-[#1A1A1A]" },
  { name: "Tables", icon: Table, category: "Coffee Tables", color: "bg-[#A67A2E]" },
  { name: "Chairs", icon: Armchair, category: "Chairs", color: "bg-[#1A1A1A]" },
  { name: "Lighting", icon: Lamp, category: "Lighting", color: "bg-[#CD9342]" },
  { name: "Dining", icon: ChefHat, category: "Dining", color: "bg-[#1A1A1A]" },
  { name: "Storage", icon: Package, category: "Storage", color: "bg-[#A67A2E]" },
  { name: "Decor", icon: Frame, category: "Decor", color: "bg-[#1A1A1A]" },
  { name: "Kitchen", icon: Wind, category: "Kitchen", color: "bg-[#CD9342]" },
  { name: "All", icon: Sparkles, category: "All", color: "bg-[#1A1A1A]" },
];

const featuredCollections = [
  {
    name: "Luxury Sofas",
    discount: 20,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    category: "Sofas"
  },
  {
    name: "Premium Beds",
    discount: 18,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    category: "Beds"
  },
  {
    name: "Dining Collection",
    discount: 8,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80",
    category: "Dining"
  },
  {
    name: "Designer Chairs",
    discount: 10,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80",
    category: "Chairs"
  },
  {
    name: "Coffee Tables",
    discount: 15,
    image: "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=800&q=80",
    category: "Coffee Tables"
  },
  {
    name: "Lighting",
    discount: 12,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab3fe?w=800&q=80",
    category: "Lighting"
  },
  {
    name: "Wallpapers",
    discount: 27,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80",
    category: "Wallpapers"
  },
  {
    name: "Storage Solutions",
    discount: 5,
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80",
    category: "Storage"
  },
  {
    name: "Decor & Accessories",
    discount: 15,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80",
    category: "Decor"
  },
  {
    name: "Kitchen Appliances",
    discount: 29,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    category: "Kitchen"
  },
];

// Design inspiration tabs (inspired by interiorcompany.com)
const designTabs = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Dining Room",
  "Office",
  "Outdoor"
];

const designInspirations = {
  "Living Room": [
    { image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", title: "Modern Minimalist Living" },
    { image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80", title: "Contemporary Luxury" },
    { image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80", title: "Scandinavian Comfort" },
    { image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80", title: "Urban Chic" },
  ],
  "Bedroom": [
    { image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80", title: "Serene Retreat" },
    { image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80", title: "Luxurious Master" },
    { image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80", title: "Cozy Minimalist" },
    { image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80", title: "Elegant Suite" },
  ],
  "Kitchen": [
    { image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", title: "Modern Kitchen" },
    { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", title: "Open Concept" },
    { image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80", title: "Chef's Paradise" },
    { image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800&q=80", title: "Contemporary Style" },
  ],
  "Dining Room": [
    { image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80", title: "Formal Dining" },
    { image: "https://images.unsplash.com/photo-1595514535116-d3e0baedffc0?w=800&q=80", title: "Modern Elegance" },
    { image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80", title: "Family Gatherings" },
    { image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", title: "Intimate Space" },
  ],
  "Office": [
    { image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80", title: "Executive Office" },
    { image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", title: "Home Workspace" },
    { image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&q=80", title: "Creative Studio" },
    { image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80", title: "Productive Space" },
  ],
  "Outdoor": [
    { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", title: "Garden Lounge" },
    { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", title: "Poolside Retreat" },
    { image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", title: "Terrace Living" },
    { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", title: "Al Fresco Dining" },
  ],
};

// Stats (inspired by thehealthyhome.me)
const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "4.9/5", label: "Google Rating" },
  { value: "5,000+", label: "Products Delivered" },
  { value: "15+ Years", label: "of Excellence" },
];

// Benefits
const benefits = [
  { icon: Truck, title: "Free Delivery", description: "Across UAE" },
  { icon: Shield, title: "Quality Guarantee", description: "Premium materials only" },
  { icon: HeadphonesIcon, title: "24/7 Support", description: "Always here to help" },
  { icon: Package, title: "Easy Returns", description: "30-day return policy" },
];

export default function Shop() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeDesignTab, setActiveDesignTab] = useState("Living Room");
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const sessionId = getSessionId();
  const collectionsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      return apiRequest("POST", "/api/cart", {
        productId,
        quantity: 1,
        sessionId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product) => {
    addToCartMutation.mutate(product.id);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const scrollCollections = (direction: 'left' | 'right') => {
    if (collectionsRef.current) {
      const scrollAmount = 320;
      collectionsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#CD9342] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#1A1A1A]/60">Loading our premium collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80)`,
            y: heroY
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/80 to-transparent" />
        
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full"
          style={{ opacity: heroOpacity }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Badge className="bg-[#CD9342] text-white mb-6 px-4 py-2 text-sm">
                Custom Furniture by The Property Masters
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif leading-tight" data-testid="text-shop-title">
                Bespoke Furniture
                <span className="text-[#CD9342] block">Crafted for You</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-lg leading-relaxed">
                Handcrafted luxury furniture designed for Dubai's finest homes. From concept to creation, every piece is made to your exact specifications.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <Button 
                  size="lg"
                  className="bg-[#CD9342] hover:bg-[#A67A2E] text-white rounded-full px-8 py-6 text-lg shadow-2xl"
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-shop-now"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white/50 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg backdrop-blur-sm"
                  asChild
                >
                  <Link href="/book">
                    Book Consultation
                  </Link>
                </Button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-center"
                  >
                    <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-white/60 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* EMI Badge - Floating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden lg:flex justify-center"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-sm">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-[#CD9342] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Custom Solutions</h3>
                  <p className="text-white/70 mb-4">Tailored to your needs</p>
                  <p className="text-sm text-white/50">Get a personalized quote for any product in our collection</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Quick Categories (inspired by thehealthyhome.me) */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
            {quickCategories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => {
                  setSelectedCategory(category.category);
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex flex-col items-center gap-2 min-w-[80px] group"
                data-testid={`quick-category-${category.name.toLowerCase().replace(' ', '-')}`}
              >
                <div className={`w-14 h-14 ${category.color} rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-[#1A1A1A] text-center whitespace-nowrap">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections (inspired by interiorcompany.com) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="flex items-center justify-between mb-12">
            <div>
              <p className="text-[#CD9342] font-semibold text-sm uppercase tracking-widest mb-2">
                Featured Collections
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] font-serif">
                Discover Our Décor & Furniture Collection
              </h2>
            </div>
            <div className="hidden md:flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => scrollCollections('left')}
                className="rounded-full border-[#CD9342]/20 hover:bg-[#CD9342] hover:text-white"
                data-testid="button-scroll-left"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => scrollCollections('right')}
                className="rounded-full border-[#CD9342]/20 hover:bg-[#CD9342] hover:text-white"
                data-testid="button-scroll-right"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          <div 
            ref={collectionsRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          >
            {featuredCollections.map((collection, index) => (
              <motion.div
                key={collection.name}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex-shrink-0 w-[280px] group cursor-pointer"
                onClick={() => {
                  setSelectedCategory(collection.category);
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                data-testid={`collection-${collection.name.toLowerCase().replace(' ', '-')}`}
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAFAFA]">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{collection.name}</h3>
                    <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                      <span className="text-sm">Shop Now</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Shop All Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex-shrink-0 w-[280px]"
            >
              <div 
                className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#CD9342] to-[#A67A2E] flex flex-col items-center justify-center p-8 cursor-pointer group"
                onClick={() => {
                  setSelectedCategory("All");
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Sparkles className="w-16 h-16 text-white/80 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Explore More Deals</h3>
                <p className="text-white/70 text-center mb-6">Discover our complete collection</p>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-[#CD9342] rounded-full"
                  data-testid="button-shop-all"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Factory Tour Section (inspired by interiorcompany.com) */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <p className="text-[#CD9342] font-semibold text-sm uppercase tracking-widest mb-4">
                From Concept to Creation
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white font-serif mb-6">
                Your Furniture's Journey
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Step inside our state-of-the-art factory and see how your dream furniture comes to life. 
                From raw materials to finished masterpieces, we ensure quality at every step.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-3xl font-bold text-[#CD9342]">200+</p>
                  <p className="text-white/60 text-sm">Skilled Craftsmen</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-3xl font-bold text-[#CD9342]">50,000 sqft</p>
                  <p className="text-white/60 text-sm">Manufacturing Facility</p>
                </div>
              </div>

              <Button 
                size="lg"
                className="bg-[#CD9342] hover:bg-[#A67A2E] text-white rounded-full"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Factory Tour
              </Button>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              className="relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden bg-[#1A1A1A]">
                <img
                  src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80"
                  alt="Factory Tour"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#CD9342] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-2xl">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Ideas Section (inspired by interiorcompany.com) */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <p className="text-[#CD9342] font-semibold text-sm uppercase tracking-widest mb-2">
              Get Inspired
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] font-serif mb-4">
              Design Ideas for Every Space
            </h2>
            <p className="text-[#1A1A1A]/60 max-w-2xl mx-auto">
              Because every corner holds a unique design potential
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {designTabs.map((tab) => (
              <Button
                key={tab}
                variant={activeDesignTab === tab ? "default" : "outline"}
                onClick={() => setActiveDesignTab(tab)}
                className={`rounded-full ${
                  activeDesignTab === tab 
                    ? "bg-[#CD9342] hover:bg-[#A67A2E]" 
                    : "border-[#CD9342]/20 text-[#1A1A1A] hover:border-[#CD9342] hover:text-[#CD9342]"
                }`}
                data-testid={`tab-${tab.toLowerCase().replace(' ', '-')}`}
              >
                {tab}
              </Button>
            ))}
          </div>

          {/* Design Grid */}
          <motion.div 
            key={activeDesignTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {designInspirations[activeDesignTab as keyof typeof designInspirations]?.map((design, index) => (
              <motion.div
                key={design.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-semibold text-sm line-clamp-2">{design.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-[#CD9342] text-[#CD9342] hover:bg-[#CD9342] hover:text-white rounded-full"
            >
              View All Designs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-12 bg-[#CD9342]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-center gap-4 text-white"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">{benefit.title}</h3>
                  <p className="text-white/70 text-sm">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <p className="text-[#CD9342] font-semibold text-sm uppercase tracking-widest mb-2">
              Shop Our Collection
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] font-serif mb-4">
              Premium Furniture & Décor
            </h2>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full ${
                  selectedCategory === category 
                    ? "bg-[#CD9342] hover:bg-[#A67A2E]" 
                    : "border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#CD9342] hover:text-[#CD9342]"
                }`}
                data-testid={`filter-${category.toLowerCase().replace(' ', '-')}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-[#1A1A1A]/20 mx-auto mb-4" />
              <p className="text-[#1A1A1A]/60 text-lg">No products found in this category.</p>
            </div>
          ) : (
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={staggerItem}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <Card 
                    className="group h-full border-0 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden bg-white cursor-pointer"
                    data-testid={`card-product-${product.id}`}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden bg-[#FAFAFA]">
                          <Link href={`/shop/${product.id}`}>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </Link>
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
                          {product.featured && (
                            <Badge className="bg-[#CD9342] text-white">Featured</Badge>
                          )}
                          
                        </div>

                        {/* Quick Actions */}
                        <div 
                          className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
                            hoveredProduct === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                          }`}
                        >
                          <Button 
                            size="icon" 
                            variant="secondary"
                            className="w-10 h-10 rounded-full bg-white shadow-lg hover:bg-[#CD9342] hover:text-white"
                            onClick={(e) => e.stopPropagation()}
                            data-testid={`button-wishlist-${product.id}`}
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="secondary"
                            className="w-10 h-10 rounded-full bg-white shadow-lg hover:bg-[#CD9342] hover:text-white"
                            onClick={(e) => e.stopPropagation()}
                            data-testid={`button-quickview-${product.id}`}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Out of Stock Overlay */}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                            <Badge variant="destructive" className="text-lg py-2 px-4">Out of Stock</Badge>
                          </div>
                        )}

                        
                      </div>

                      <Link href={`/shop/${product.id}`} className="block">
                        <div className="p-5">
                        <Badge variant="secondary" className="mb-2 text-xs bg-[#FAFAFA] text-[#1A1A1A]">
                          {product.category}
                        </Badge>
                        <h3 className="font-bold text-[#1A1A1A] mb-2 line-clamp-1 text-lg">
                          {product.name}
                        </h3>
                        <p className="text-sm text-[#1A1A1A]/60 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#CD9342] text-[#CD9342]" />
                          ))}
                          <span className="text-xs text-[#1A1A1A]/60 ml-1">(4.9)</span>
                        </div>

                        {/* Get Quote CTA */}
                        <Button
                          asChild
                          className="w-full bg-[#CD9342] hover:bg-[#A67A2E] text-white rounded-full"
                          data-testid={`button-get-quote-${product.id}`}
                        >
                          <Link href={`/book?product=${encodeURIComponent(product.name)}`}>
                            Get Quote
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#CD9342] to-[#A67A2E]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <Sparkles className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
              Ready to Transform Your Space?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Book a free consultation with our interior design experts and get personalized recommendations for your home.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  asChild
                  size="lg"
                  className="bg-white text-[#CD9342] hover:bg-white/90 rounded-full px-10 py-7 text-lg shadow-2xl"
                  data-testid="button-cta-consultation"
                >
                  <Link href="/book">
                    Book Free Consultation
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
