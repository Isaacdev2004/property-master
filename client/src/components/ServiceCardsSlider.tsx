import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Paintbrush, Building2, Wrench, Zap, Sparkles, Home, Lightbulb, Shield, Hammer, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fitoutServices = [
  {
    id: 1,
    title: "Interior Design",
    description: "Transform your space with bespoke interior designs that reflect your unique style and personality.",
    icon: Paintbrush,
    link: "/services/interior-design",
    gradient: "from-[#970A44]/90 to-[#720632]/90",
  },
  {
    id: 2,
    title: "Fit-Out Works",
    description: "Complete fit-out solutions from concept to completion for residential and commercial spaces.",
    icon: Building2,
    link: "/services/fit-out",
    gradient: "from-[#1C4668]/90 to-[#09263D]/90",
  },
  {
    id: 3,
    title: "Renovation",
    description: "Expert renovation services to breathe new life into your existing property with modern upgrades.",
    icon: Home,
    link: "/services/renovation",
    gradient: "from-[#09263D]/90 to-[#1C4668]/90",
  },
  {
    id: 4,
    title: "Lighting Design",
    description: "Create the perfect ambiance with custom lighting solutions for every room and occasion.",
    icon: Lightbulb,
    link: "/services/lighting",
    gradient: "from-[#720632]/90 to-[#970A44]/90",
  },
];

const maintenanceServices = [
  {
    id: 5,
    title: "Property Maintenance",
    description: "Comprehensive maintenance services to keep your property in pristine condition year-round.",
    icon: Wrench,
    link: "/services/maintenance",
    gradient: "from-[#09263D]/90 to-[#1C4668]/90",
  },
  {
    id: 6,
    title: "MEP Services",
    description: "Expert mechanical, electrical, and plumbing services for all your property needs.",
    icon: Zap,
    link: "/services/mep",
    gradient: "from-[#720632]/90 to-[#970A44]/90",
  },
  {
    id: 7,
    title: "Deep Cleaning",
    description: "Professional deep cleaning services to maintain hygiene and freshness in your space.",
    icon: Sparkles,
    link: "/services/cleaning",
    gradient: "from-[#970A44]/90 to-[#720632]/90",
  },
  {
    id: 8,
    title: "Security Systems",
    description: "Advanced security solutions to protect your property with modern surveillance technology.",
    icon: Shield,
    link: "/services/security",
    gradient: "from-[#1C4668]/90 to-[#09263D]/90",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    description: string;
    icon: typeof Paintbrush;
    link: string;
    gradient: string;
  };
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;
  
  return (
    <motion.div 
      variants={fadeInUp}
      className="flex-shrink-0 w-full"
    >
      <Link href={service.link}>
        <Card 
          className="group relative overflow-visible h-full hover-elevate active-elevate-2 cursor-pointer border-0"
          data-testid={`card-service-${service.id}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-xl`}></div>
          <CardContent className="relative z-10 p-5 h-full flex flex-col justify-between min-h-[180px]">
            <div>
              <div 
                className="inline-flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg mb-3"
                data-testid={`icon-service-${service.id}`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 
                className="text-lg font-bold text-white mb-2"
                data-testid={`title-service-${service.id}`}
              >
                {service.title}
              </h3>
              <p 
                className="text-xs text-white/80 line-clamp-2"
                data-testid={`desc-service-${service.id}`}
              >
                {service.description}
              </p>
            </div>
            <div 
              className="flex items-center text-white font-medium text-sm mt-3 group-hover:gap-2 transition-all"
              data-testid={`link-service-${service.id}`}
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

interface ServiceRowProps {
  title: string;
  icon: typeof Hammer;
  services: typeof fitoutServices;
  testIdPrefix: string;
}

function ServiceRow({ title, icon: Icon, services, testIdPrefix }: ServiceRowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerView = 4;
  const totalSlides = Math.ceil(services.length / cardsPerView);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleServices = services.slice(
    currentSlide * cardsPerView,
    (currentSlide + 1) * cardsPerView
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mb-10"
    >
      {/* Row Header with Arrows */}
      <div 
        className="flex items-center justify-between mb-5"
        data-testid={`label-${testIdPrefix}-services`}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-[#970A44]" />
          <h3 className="text-lg font-semibold text-[#970A44]">{title}</h3>
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border-[#970A44]/30 hover:bg-[#970A44] hover:text-white hover:border-[#970A44] transition-all"
            data-testid={`button-prev-${testIdPrefix}`}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border-[#970A44]/30 hover:bg-[#970A44] hover:text-white hover:border-[#970A44] transition-all"
            data-testid={`button-next-${testIdPrefix}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Cards Grid - 4 per row */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {visibleServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentSlide 
                  ? "bg-[#970A44] w-6" 
                  : "bg-[#970A44]/30 hover:bg-[#970A44]/50"
              }`}
              data-testid={`indicator-${testIdPrefix}-${idx}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function ServiceCardsSlider() {
  return (
    <section 
      className="py-20 bg-gradient-to-b from-background to-muted/30"
      data-testid="section-service-cards"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4 font-serif"
            data-testid="heading-service-cards"
          >
            Our Core Services
          </h2>
          <p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            data-testid="desc-service-cards"
          >
            From stunning interiors to reliable maintenance - explore our comprehensive property solutions
          </p>
        </motion.div>

        {/* Fit-Out Services Row */}
        <ServiceRow 
          title="Fit-Out & Design" 
          icon={Hammer} 
          services={fitoutServices}
          testIdPrefix="fitout"
        />

        {/* Maintenance Services Row */}
        <ServiceRow 
          title="Maintenance Services" 
          icon={ShieldCheck} 
          services={maintenanceServices}
          testIdPrefix="maintenance"
        />

        {/* View All Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button 
            asChild
            variant="outline"
            className="rounded-full px-8 py-6 h-auto border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
            data-testid="button-view-all-services"
          >
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
