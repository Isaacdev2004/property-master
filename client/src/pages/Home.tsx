import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Palette, Hammer, Shield, Play, Award, Users, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
  { value: "5000+", label: "Interior Projects", icon: Award },
  { value: "200+", label: "Design Experts", icon: Users },
  { value: "10 Cities", label: "2 Countries", icon: MapPin },
  { value: "2 lac+", label: "Design Options", icon: Sparkles },
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
  "Wall Colour Combination",
  "Living Room",
  "Modular Kitchen",
  "Wardrobe",
  "Master Bedroom",
  "Kids Room",
  "Kitchen Wall Tiles",
  "Kitchen False Ceiling",
  "Balcony",
  "TV Units",
  "Bathroom",
  "Pooja Mandir",
  "Dining Room",
  "False Ceiling",
  "Wall Paint",
  "Wall",
  "Window",
  "Tiles",
  "Staircase",
  "Door",
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Wall Colour Combination");
  
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: portfolioProjects = [] } = useQuery<PortfolioProject[]>({
    queryKey: ["/api/portfolio"],
  });

  const getProjectsByCategory = (category: string) => {
    const filtered = portfolioProjects.filter(project => 
      project.category === category
    );
    return filtered.length > 0 ? filtered.slice(0, 8) : portfolioProjects.slice(0, 8);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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

        {/* Statistics Badges */}
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
                    className="bg-white/95 backdrop-blur-sm rounded-lg p-4 text-center"
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

      {/* Complete Turnkey Services */}
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

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {turnkeyServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  {...fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  data-testid={`service-${index}`}
                >
                  <Card className="h-full hover-elevate">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 font-[Montserrat]">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button variant="outline" size="lg">
                Know More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* From Concept to Creation Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[Montserrat]">
              From Concept to Creation: Your Furniture's Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Step Inside Our Factory: See Your Kitchen or Wardrobe Come to Life
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="relative max-w-4xl mx-auto">
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm mb-4 hover-elevate active-elevate-2 cursor-pointer">
                    <Play className="w-10 h-10 text-primary fill-primary" />
                  </div>
                  <p className="text-muted-foreground">Factory Tour Video</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Collection */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[Montserrat]">
              Discover Your Dream Home: Dive into Our Decor & Furniture Collection!
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`product-${index}`}
              >
                <Link href="/shop">
                  <Card className="group hover-elevate active-elevate-2 cursor-pointer overflow-hidden">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2 font-[Montserrat]">{product.name}</h3>
                      {product.discount && (
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-primary font-semibold">
                            Upto {product.discount}% Discount
                          </p>
                          <ArrowRight className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg">
                Explore More Deals - Shop Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Design Ideas Gallery */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[Montserrat]">
              Design Ideas for Every Space
            </h2>
            <p className="text-lg text-muted-foreground">
              Because every corner holds a unique design potential.
            </p>
          </motion.div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <ScrollArea className="w-full whitespace-nowrap mb-8">
              <TabsList className="inline-flex w-auto gap-2 bg-transparent">
                {designCategories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    data-testid={`tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {designCategories.map((category) => {
              const categoryProjects = getProjectsByCategory(category);
              return (
                <TabsContent key={category} value={category} className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoryProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      {...fadeInUp}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      data-testid={`project-${index}`}
                    >
                      <Card className="group hover-elevate active-elevate-2 overflow-hidden cursor-pointer">
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <img
                            src={project.afterImage}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-1 line-clamp-2">{project.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                    ))}
                  </div>

                  <div className="text-center mt-12">
                    <Link href="/portfolio">
                      <Button variant="outline" size="lg">
                        Explore More {category} Designs
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[Montserrat]">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Let our expert designers bring your vision to life with personalized solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" data-testid="button-cta-booking">
                <Button size="lg">
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
