import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

import luxuryResidentialImg from "@assets/stock_images/luxury_residential_i_c7a66543.jpg";
import corporateOfficeImg from "@assets/stock_images/modern_corporate_off_09bac916.jpg";
import wellnessSpaImg from "@assets/stock_images/luxury_spa_wellness__2284ee07.jpg";
import hospitalityImg from "@assets/stock_images/luxury_hotel_hospita_bc97f394.jpg";
import furnitureShowroomImg from "@assets/stock_images/luxury_furniture_sho_9ccd6a99.jpg";
import maintenanceHubImg from "@assets/stock_images/modern_facility_main_fe205381.jpg";

const catalogItems = [
  {
    title: "Luxury Residences",
    tagline: "Where Elegance Meets Everyday Living",
    metric: "500+ Homes Transformed",
    description: "From penthouses to villas, we create bespoke living spaces that embody sophistication and comfort.",
    image: luxuryResidentialImg,
    cta: {
      label: "View Residential Projects",
      link: "/portfolio"
    },
    gradient: "from-black/80 via-black/60 to-transparent",
    isHero: true
  },
  {
    title: "Corporate Offices",
    tagline: "Productivity Meets Premium Design",
    metric: "150+ Offices Designed",
    description: "Modern workspaces that inspire innovation and reflect your brand's identity.",
    image: corporateOfficeImg,
    cta: {
      label: "Explore Offices",
      link: "/portfolio"
    },
    gradient: "from-black/70 via-black/50 to-transparent",
    isHero: false
  },
  {
    title: "Wellness Sanctuaries",
    tagline: "Spaces for Rejuvenation",
    metric: "80+ Wellness Centers",
    description: "Spa, gym, and wellness facilities designed to promote tranquility and well-being.",
    image: wellnessSpaImg,
    cta: {
      label: "Discover Wellness",
      link: "/services"
    },
    gradient: "from-black/70 via-black/50 to-transparent",
    isHero: false
  },
  {
    title: "Hospitality Retreats",
    tagline: "Memorable Guest Experiences",
    metric: "50+ Hotels & Restaurants",
    description: "Luxury hotel lobbies, restaurants, and lounges that captivate guests.",
    image: hospitalityImg,
    cta: {
      label: "View Projects",
      link: "/portfolio"
    },
    gradient: "from-black/70 via-black/50 to-transparent",
    isHero: false
  },
  {
    title: "Bespoke Furniture Atelier",
    tagline: "Handcrafted Masterpieces",
    metric: "1000+ Custom Pieces",
    description: "Designer furniture and decor that adds personality to your space.",
    image: furnitureShowroomImg,
    cta: {
      label: "Shop Collection",
      link: "/shop"
    },
    gradient: "from-black/70 via-black/50 to-transparent",
    isHero: false
  },
  {
    title: "Smart Maintenance Command",
    tagline: "24/7 Property Care",
    metric: "2000+ Properties Managed",
    description: "Advanced facility management keeping your property in pristine condition.",
    image: maintenanceHubImg,
    cta: {
      label: "Learn More",
      link: "/services"
    },
    gradient: "from-black/70 via-black/50 to-transparent",
    isHero: false
  }
];

const luxuryEasing = [0.25, 0.46, 0.45, 0.94] as const;

export default function SignatureSpacesShowcase() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: luxuryEasing }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-serif mb-4">
            Signature Spaces Showcase
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience our expertise across diverse project archetypes — from luxury residences to smart maintenance solutions
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogItems.map((item, index) => (
            <motion.div
              key={item.title}
              className={`relative overflow-hidden rounded-3xl group ${
                item.isHero 
                  ? "md:col-span-2 md:row-span-2 min-h-[600px]" 
                  : "min-h-[300px]"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: luxuryEasing 
              }}
              whileHover={{ 
                scale: 1.02, 
                y: -6,
                transition: { duration: 0.3, ease: luxuryEasing }
              }}
              data-testid={`catalog-item-${index}`}
            >
              {/* Background Image with Parallax */}
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: luxuryEasing }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient}`} />
              </motion.div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8 lg:p-10 text-white">
                {/* Gold Accent Line */}
                <motion.div
                  className="w-16 h-1 mb-4"
                  style={{ backgroundColor: "#970A44" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3, ease: luxuryEasing }}
                />

                <h3 className={`font-bold font-serif mb-2 ${
                  item.isHero ? "text-4xl lg:text-5xl" : "text-2xl lg:text-3xl"
                }`}>
                  {item.title}
                </h3>

                <p className={`mb-3 ${
                  item.isHero ? "text-xl" : "text-base"
                }`} style={{ color: "#970A44" }}>
                  {item.tagline}
                </p>

                <p className={`text-white/90 mb-4 ${
                  item.isHero 
                    ? "text-base lg:text-lg max-w-lg" 
                    : "text-sm line-clamp-2"
                }`}>
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4">
                  <span className="text-sm font-semibold text-white/80">
                    {item.metric}
                  </span>

                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-[#970A44] transition-colors"
                    data-testid={`button-cta-${index}`}
                  >
                    <Link href={item.cta.link}>
                      {item.cta.label}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
