import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Paintbrush, Building2, Wrench, Zap, ShieldCheck, Hammer } from "lucide-react";
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
];

const maintenanceServices = [
  {
    id: 3,
    title: "Property Maintenance",
    description: "Comprehensive maintenance services to keep your property in pristine condition year-round.",
    icon: Wrench,
    link: "/services/maintenance",
    gradient: "from-[#09263D]/90 to-[#1C4668]/90",
  },
  {
    id: 4,
    title: "MEP Services",
    description: "Expert mechanical, electrical, and plumbing services for all your property needs.",
    icon: Zap,
    link: "/services/mep",
    gradient: "from-[#720632]/90 to-[#970A44]/90",
  },
];

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15
    }
  },
  viewport: { once: true, amount: 0.2 }
};

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
    <motion.div variants={fadeInUp}>
      <Link href={service.link}>
        <Card 
          className="group relative overflow-visible h-full hover-elevate active-elevate-2 cursor-pointer border-0"
          data-testid={`card-service-${service.id}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-xl`}></div>
          <CardContent className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[200px]">
            <div>
              <div 
                className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg mb-4"
                data-testid={`icon-service-${service.id}`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 
                className="text-xl font-bold text-white mb-2"
                data-testid={`title-service-${service.id}`}
              >
                {service.title}
              </h3>
              <p 
                className="text-sm text-white/80 line-clamp-2"
                data-testid={`desc-service-${service.id}`}
              >
                {service.description}
              </p>
            </div>
            <div 
              className="flex items-center text-white font-medium text-sm mt-4 group-hover:gap-2 transition-all"
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
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-8"
        >
          <div 
            className="flex items-center gap-2 mb-4"
            data-testid="label-fitout-services"
          >
            <Hammer className="w-5 h-5 text-[#970A44]" />
            <h3 className="text-lg font-semibold text-[#970A44]">Fit-Out & Design</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {fitoutServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Maintenance Services Row */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div 
            className="flex items-center gap-2 mb-4"
            data-testid="label-maintenance-services"
          >
            <ShieldCheck className="w-5 h-5 text-[#970A44]" />
            <h3 className="text-lg font-semibold text-[#970A44]">Maintenance Services</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {maintenanceServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index + 2} />
            ))}
          </div>
        </motion.div>

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
