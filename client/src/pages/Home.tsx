import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2, Palette, Hammer, Shield, Play, Award, Users, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Service, Product, PortfolioProject } from "@shared/schema";
import { useState } from "react";
import heroImage from "@assets/generated_images/luxury_living_room_hero_1b740bbd.png";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const stats = [
  { value: "500+", label: "Interior Projects", icon: Award },
  { value: "50+", label: "Design Experts", icon: Users },
  { value: "3 Cities", label: "2 Countries", icon: MapPin },
  { value: "10,000+", label: "Design Options", icon: Sparkles },
];

const turnkeyServices = [
  {
    icon: Palette,
    title: "We Design",
    description: "From completed homes to modular kitchens, and storage to decor, our top interior designers create spaces that match your vision.",
  },
  {
    icon: Hammer,
    title: "We Execute",
    description: "We follow a meticulous planning approach with detail-driven designs for interiors of your homes.",
  },
  {
    icon: Shield,
    title: "We Manage",
    description: "Our top interior designers spearhead quality assurance by extending support after the execution of home projects.",
  },
];

const designCategories = [
  "Living Room",
  "Modular Kitchen",
  "Master Bedroom",
  "Bathroom",
  "Kids Room",
  "Office",
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Living Room");
  
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: portfolioProjects = [] } = useQuery<PortfolioProject[]>({
    queryKey: ["/api/portfolio"],
  });

  const featuredProducts = products.filter(p => p.featured).slice(0, 6);

  const getProjectsByDesignCategory = (designCategory: string) => {
    const categoryMap: Record<string, string> = {
      "Living Room": "Living Room",
      "Modular Kitchen": "Kitchen",
      "Master Bedroom": "Bedroom",
      "Bathroom": "Bathroom",
      "Kids Room": "Kids Room",
      "Office": "Office",
    };

    const mappedCategory = categoryMap[designCategory] || designCategory;
    const filtered = portfolioProjects.filter(project => 
      project.category === mappedCategory
    );

    return filtered.length > 0 ? filtered : portfolioProjects.slice(0, 8);
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[Montserrat] tracking-tight">
              Interior Design that
              <span className="block text-primary mt-2">Speaks of You</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              From foundation to furnishings, we style your space like our own.
            </p>
            <Link href="/book" data-testid="button-hero-consultation">
              <Button size="lg">
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-12 left-0 right-0 z-20"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="bg-white/95 backdrop-blur-sm rounded-lg p-4 text-center shadow-xl"
                    data-testid={`stat-${index}`}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1 font-[Montserrat]">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[Montserrat]">
              Complete Turnkey Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              With an emphasis on details, extraordinary designs and exceptional customer service, we bring your dreams to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {turnkeyServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  {...fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover-elevate transition-transform duration-300 hover:-translate-y-1">
                    <CardContent className="p-8">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 font-[Montserrat]">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <Link href="/about" data-testid="button-know-more">
              <Button variant="outline" size="lg">
                Know More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[Montserrat]">
              Discover Our Furniture & Decor Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium products with exclusive discounts for your dream space
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                {...fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Link href={`/shop`}>
                  <Card className="group cursor-pointer overflow-hidden hover-elevate transition-all duration-300 hover:-translate-y-2">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                        SALE
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm mb-1 line-clamp-1">{product.category}</h3>
                      <p className="text-xs text-muted-foreground">Up to 50% Off</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/shop" data-testid="button-explore-shop">
              <Button size="lg">
                Explore More Deals - Shop Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[Montserrat]">
              Design Ideas for Every Space
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Because every corner holds a unique design potential.
            </p>
          </motion.div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent mb-12">
              {designCategories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-2"
                  data-testid={`tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {designCategories.map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {getProjectsByDesignCategory(category).map((project, index) => (
                    <motion.div
                      key={project.id}
                      {...fadeInUp}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <Link href="/portfolio">
                        <Card className="group cursor-pointer overflow-hidden hover-elevate transition-all duration-300">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                              src={project.beforeImage}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Link href="/portfolio" data-testid="button-view-all-designs">
                    <Button variant="outline" size="lg">
                      View All {category} Designs
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[Montserrat]">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book a free consultation with our design experts and bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" data-testid="button-cta-book">
                <Button size="lg" variant="secondary">
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact" data-testid="button-cta-contact">
                <Button size="lg" variant="outline" className="border-white text-white backdrop-blur-sm">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
