import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import kitchenBefore from "@assets/generated_images/kitchen_before_renovation_de1bcc3a.png";
import kitchenAfter from "@assets/generated_images/kitchen_after_renovation_cecd16b9.png";
import officeImage from "@assets/generated_images/commercial_office_design_d5324a05.png";
import bedroomImage from "@assets/generated_images/bedroom_interior_design_d3372076.png";
import bathroomImage from "@assets/generated_images/bathroom_renovation_f7c2a685.png";
import portfolioHeroImage from "@assets/stock_images/luxury_interior_desi_7c187bff.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 }
};

const projects = [
  {
    id: 1,
    title: "Modern Kitchen Transformation",
    category: "Kitchen",
    tags: ["Residential", "Kitchen", "Renovation"],
    beforeImage: kitchenBefore,
    afterImage: kitchenAfter,
    description: "Complete kitchen renovation featuring marble countertops and custom cabinetry",
  },
  {
    id: 2,
    title: "Contemporary Office Design",
    category: "Office",
    tags: ["Commercial", "Office", "Design"],
    beforeImage: officeImage,
    afterImage: officeImage,
    description: "Modern commercial office space with glass partitions and minimalist aesthetics",
  },
  {
    id: 3,
    title: "Luxury Bedroom Suite",
    category: "Bedroom",
    tags: ["Residential", "Bedroom", "Luxury"],
    beforeImage: bedroomImage,
    afterImage: bedroomImage,
    description: "Elegant bedroom design with soft neutral tones and premium textiles",
  },
  {
    id: 4,
    title: "Spa-Inspired Bathroom",
    category: "Bathroom",
    tags: ["Residential", "Bathroom", "Renovation"],
    beforeImage: bathroomImage,
    afterImage: bathroomImage,
    description: "Contemporary bathroom with walk-in shower and floating vanity",
  },
  {
    id: 5,
    title: "Executive Office Renovation",
    category: "Office",
    tags: ["Commercial", "Office", "Renovation"],
    beforeImage: officeImage,
    afterImage: officeImage,
    description: "High-end executive office with custom built-ins and sophisticated finishes",
  },
  {
    id: 6,
    title: "Gourmet Kitchen Design",
    category: "Kitchen",
    tags: ["Residential", "Kitchen", "Luxury"],
    beforeImage: kitchenAfter,
    afterImage: kitchenAfter,
    description: "Chef's kitchen with professional appliances and ample storage",
  },
];

const categories = ["All", "Kitchen", "Bedroom", "Bathroom", "Office"];

const portfolioStats = [
  { value: "120+", label: "Completed Fit-Outs" },
  { value: "250K", label: "Sq Ft Delivered" },
  { value: "70%", label: "Repeat Clients" },
  { value: "15+", label: "Industries Served" },
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [compareProject, setCompareProject] = useState<number | null>(null);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Professional Two-Column Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={portfolioHeroImage}
            alt="The Property Masters Portfolio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative z-10 w-full py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-[#970A44] font-semibold text-lg mb-4 tracking-wide"
                >
                  See Our Work in Action
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-white mb-4 font-serif"
                >
                  Our Portfolio
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-base md:text-lg leading-relaxed text-white/90 mb-6"
                >
                  Explore our collection of stunning transformations and design projects across residential and commercial spaces.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-[#970A44] hover:bg-[#720632] text-white font-semibold rounded-full shadow-xl"
                    data-testid="button-hero-cta"
                  >
                    <Link href="/contact">
                      Start Your Project
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right Column - Statistics Grid */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="grid grid-cols-2 gap-3"
              >
                {portfolioStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
                  >
                    <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/80 uppercase tracking-wide">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background border-b border-border sticky top-20 z-40 backdrop-blur-md bg-background/95">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  {...fadeInUp}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                  data-testid={`project-${project.id}`}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4">
                    {compareProject === project.id ? (
                      <BeforeAfterSlider
                        beforeImage={project.beforeImage}
                        afterImage={project.afterImage}
                        alt={project.title}
                      />
                    ) : (
                      <div 
                        className="relative w-full h-full cursor-pointer"
                        onClick={() => setCompareProject(project.id)}
                      >
                        <img
                          src={project.afterImage}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <Badge className="mb-2 bg-primary/80 backdrop-blur-sm">{project.category}</Badge>
                            <div className="text-white text-sm">Click to compare before/after</div>
                          </div>
                        </div>
                      </div>
                    )}
                    {compareProject === project.id && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-4 left-4 z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCompareProject(null);
                        }}
                      >
                        Close
                      </Button>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-[Montserrat] group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
