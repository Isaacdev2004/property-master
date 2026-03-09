import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Palette, Heart, Shield, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const services = [
  {
    icon: Palette,
    title: "Interior Design & Fit-Out",
    subtitle: "Transform Spaces into Masterpieces",
    description: "From complete home interiors to modular kitchens, wardrobes, and custom furniture - our award-winning designers create spaces that reflect your unique style and vision.",
    features: [
      "Complete Home Interiors",
      "Modular Kitchens & Wardrobes",
      "Custom Furniture Design",
      "Office Fit-Out Solutions",
      "3D Visualization & Planning"
    ],
    gradient: "from-[#CD9342]/20 via-[#CD9342]/10 to-[#A67A2E]/5",
    accentColor: "#CD9342",
    ctaLink: "/interior-design"
  },
  {
    icon: Heart,
    title: "Wellness Services",
    subtitle: "Create Spaces for Well-Being",
    description: "Design and build rejuvenating wellness spaces including spa facilities, wellness centers, gym fit-outs, and relaxation areas that promote health and tranquility.",
    features: [
      "Spa & Wellness Center Design",
      "Gym Facility Fit-Outs",
      "Meditation & Yoga Spaces",
      "Relaxation Area Design",
      "Holistic Environment Planning"
    ],
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/5",
    accentColor: "#10b981",
    ctaLink: "/wellness"
  },
  {
    icon: Shield,
    title: "Maintenance Services",
    subtitle: "Keep Your Property Pristine",
    description: "Comprehensive property maintenance solutions to keep your spaces in perfect condition - from routine upkeep to emergency repairs, we've got you covered.",
    features: [
      "Regular Property Maintenance",
      "Emergency Repair Services",
      "Preventive Maintenance Plans",
      "Facility Management",
      "24/7 Support Available"
    ],
    gradient: "from-blue-500/20 via-indigo-500/10 to-violet-500/5",
    accentColor: "#3b82f6",
    ctaLink: "/maintenance"
  },
  {
    icon: ShoppingBag,
    title: "Premium Furniture Store",
    subtitle: "Shop Exclusive Decor & Furniture",
    description: "Explore our curated collection of premium furniture, decor items, and home accessories. From elegant sofas to stunning wallpapers - find everything to complete your dream space.",
    features: [
      "Designer Furniture Collection",
      "Premium Wallpapers & Wall Art",
      "Luxury Home Accessories",
      "Custom Upholstery Options",
      "Exclusive Discounts & Deals"
    ],
    gradient: "from-purple-500/20 via-pink-500/10 to-rose-500/5",
    accentColor: "#a855f7",
    ctaLink: "/shop"
  }
];

export default function StickyScrollServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height - window.innerHeight);
      
      const newIndex = Math.min(
        Math.floor(scrollProgress * services.length),
        services.length - 1
      );
      
      setActiveIndex(Math.max(0, newIndex));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: `${services.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Service cards that transition */}
            <div className="relative h-[600px] lg:h-[700px]">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isActive = index === activeIndex;
                const isPast = index < activeIndex;
                
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, scale: 0.8, y: 100 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.85,
                      y: isActive ? 0 : isPast ? -50 : 50,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.32, 0.72, 0, 1]
                    }}
                    className="absolute inset-0"
                    style={{
                      zIndex: isActive ? 10 : 0,
                      pointerEvents: isActive ? 'auto' : 'none'
                    }}
                    data-testid={`sticky-service-${index}`}
                  >
                    <div 
                      className={`h-full rounded-3xl bg-gradient-to-br ${service.gradient} border border-white/20 shadow-2xl overflow-hidden`}
                      style={{
                        boxShadow: isActive 
                          ? `0 25px 50px -12px ${service.accentColor}40` 
                          : "none"
                      }}
                    >
                      <div className="h-full p-8 lg:p-12 flex flex-col justify-between">
                        <div>
                          <div 
                            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
                            style={{ backgroundColor: `${service.accentColor}20` }}
                          >
                            <Icon className="w-10 h-10" style={{ color: service.accentColor }} />
                          </div>
                          
                          <h3 className="text-4xl lg:text-5xl font-bold mb-3 font-serif">
                            {service.title}
                          </h3>
                          
                          <p 
                            className="text-xl font-semibold mb-6"
                            style={{ color: service.accentColor }}
                          >
                            {service.subtitle}
                          </p>
                          
                          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            {service.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="px-3 py-1 rounded-full bg-background/50 backdrop-blur">
                            Service {index + 1} of {services.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right side - Service details that update based on active card */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h4 className="text-2xl font-bold mb-6">What We Offer</h4>
                <ul className="space-y-4">
                  {services[activeIndex].features.map((feature, idx) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                      data-testid={`feature-${idx}`}
                    >
                      <div 
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1"
                        style={{ backgroundColor: `${services[activeIndex].accentColor}20` }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: services[activeIndex].accentColor }}
                        />
                      </div>
                      <span className="text-lg">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4 pt-6">
                <Button 
                  asChild
                  size="lg"
                  className="rounded-full"
                  style={{ 
                    backgroundColor: services[activeIndex].accentColor,
                    color: "white"
                  }}
                  data-testid="button-explore-service"
                >
                  <Link href={services[activeIndex].ctaLink}>
                    {activeIndex === 3 ? "Shop Now" : "Explore This Service"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                  data-testid="button-book-consultation"
                >
                  <Link href="/contact">
                    Book Consultation
                  </Link>
                </Button>
              </div>

              {/* Progress indicator */}
              <div className="flex gap-2 pt-4">
                {services.map((_, idx) => (
                  <div
                    key={idx}
                    className="h-1 flex-1 rounded-full bg-muted relative overflow-hidden"
                    data-testid={`progress-indicator-${idx}`}
                  >
                    <motion.div
                      className="h-full absolute inset-0"
                      style={{ 
                        backgroundColor: services[activeIndex].accentColor,
                        transformOrigin: "left"
                      }}
                      initial={{ opacity: 0.2 }}
                      animate={{ 
                        opacity: idx === activeIndex ? 1 : 0.2,
                        scaleX: idx === activeIndex ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
