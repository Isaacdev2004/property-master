import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Palette, Hammer, Shield, Play, Award, Users, MapPin, Sparkles, CheckCircle2, Clock, TrendingUp, Heart, Star, Quote, BadgeCheck, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

const whyChooseUs = [
  {
    icon: BadgeCheck,
    title: "10-Year Warranty",
    description: "Industry-leading warranty on all our work, ensuring long-lasting quality and your peace of mind.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We value your time. 95% of our projects are delivered on or before the promised date.",
  },
  {
    icon: Award,
    title: "Award-Winning Designs",
    description: "Our design team has won multiple international awards for innovation and excellence.",
  },
  {
    icon: Users,
    title: "200+ Design Experts",
    description: "Experienced team of architects, interior designers, and craftsmen at your service.",
  },
  {
    icon: CheckCircle2,
    title: "Quality Assurance",
    description: "Rigorous 150+ point quality checks at every stage of your project.",
  },
  {
    icon: Heart,
    title: "Post-Service Support",
    description: "Dedicated support team available even after project completion for your satisfaction.",
  },
];

const ourProcess = [
  {
    step: "01",
    title: "Free Consultation",
    description: "Meet with our design experts to discuss your vision, budget, and requirements. We listen to understand your unique needs.",
    icon: Target,
  },
  {
    step: "02",
    title: "Design & 3D Visualization",
    description: "Our designers create detailed plans and photorealistic 3D renders so you can see your space before we build.",
    icon: Palette,
  },
  {
    step: "03",
    title: "Material Selection",
    description: "Choose from our curated collection of premium materials, finishes, and furnishings that match your style and budget.",
    icon: Sparkles,
  },
  {
    step: "04",
    title: "Expert Execution",
    description: "Our skilled craftsmen bring the design to life with meticulous attention to detail and quality workmanship.",
    icon: Hammer,
  },
  {
    step: "05",
    title: "Quality Check & Handover",
    description: "Comprehensive quality inspection followed by a smooth handover with detailed documentation and warranty.",
    icon: CheckCircle2,
  },
];

const testimonials = [
  {
    name: "Sarah Al-Mansouri",
    initials: "SA",
    role: "Homeowner, Dubai Marina",
    content: "The Property Masters transformed our apartment into a stunning modern sanctuary. Their attention to detail and professionalism exceeded all expectations. Worth every dirham!",
    rating: 5,
  },
  {
    name: "Mohammed Hassan",
    initials: "MH",
    role: "Villa Owner, Arabian Ranches",
    content: "From consultation to completion, the entire process was seamless. The team delivered our dream villa interior on time and within budget. Highly recommend!",
    rating: 5,
  },
  {
    name: "Jessica Williams",
    initials: "JW",
    role: "Business Owner, Business Bay",
    content: "They designed our office space to be both functional and beautiful. Our productivity has increased, and clients are always impressed when they visit.",
    rating: 5,
  },
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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Luxury interior design" 
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-24 py-32 w-full text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto lg:mx-0"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight font-bold text-white mb-6 font-serif tracking-tight">
              Interior Design that Speaks of You
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed font-light text-white/90 mb-10 max-w-2xl">
              From foundation to furnishings, we style your home like our own.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Button 
                asChild 
                className="bg-[#D7A144] hover:bg-[#C69136] text-white font-semibold rounded-full px-12 py-6 text-base h-auto shadow-xl"
                data-testid="button-hero-consultation"
              >
                <Link href="/contact">
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 h-12" data-testid="badge-emi">
                <svg className="w-5 h-5 text-[#D7A144]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-white">Low Cost EMI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Horizontal Pill - Below Hero */}
      <section className="relative -mt-12 z-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-24">
            <div className="bg-[#fefdfb] border border-[#D7A144]/30 rounded-full shadow-lg py-4 px-8 max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#D7A144]/40">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  const isLocationStat = stat.label === "2 Countries";
                  
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="text-center px-6 py-2"
                      data-testid={`stat-${index}`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-2 text-[#D7A144]" />
                      {isLocationStat ? (
                        <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium whitespace-nowrap">
                          10 CITIES | 2 COUNTRIES
                        </div>
                      ) : (
                        <>
                          <div className="text-[32px] leading-tight font-bold text-[#D7A144] mb-1 font-sans">
                            {stat.value}
                          </div>
                          <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                            {stat.label}
                          </div>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Complete Turnkey Services */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
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
                  <Card className="h-full hover-elevate border-primary/10">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 font-serif">{service.title}</h3>
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
              <Button variant="outline" size="lg" data-testid="button-know-more">
                Know More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              Why Choose The Property Masters?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Dubai's most trusted interior design company with a proven track record of excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  {...fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  data-testid={`why-choose-${index}`}
                >
                  <Card className="h-full hover-elevate">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#D7A144]/10 flex items-center justify-center" data-testid={`why-choose-icon-${index}`}>
                          <Icon className="w-6 h-6 text-[#D7A144]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2" data-testid={`why-choose-title-${index}`}>{item.title}</h3>
                          <p className="text-muted-foreground leading-relaxed" data-testid={`why-choose-description-${index}`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              Our Proven 5-Step Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From initial consultation to final handover, we ensure a seamless and stress-free experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {ourProcess.map((process, index) => {
              const Icon = process.icon;
              return (
                <motion.div
                  key={process.step}
                  {...fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                  data-testid={`process-${index}`}
                >
                  <Card className="h-full hover-elevate">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#D7A144] to-[#C69136] text-white font-bold text-xl mb-4" data-testid={`process-step-${index}`}>
                        {process.step}
                      </div>
                      <Icon className="w-8 h-8 mx-auto mb-4 text-[#D7A144]" data-testid={`process-icon-${index}`} />
                      <h3 className="font-bold mb-3 text-lg" data-testid={`process-title-${index}`}>{process.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`process-description-${index}`}>
                        {process.description}
                      </p>
                    </CardContent>
                  </Card>
                  {index < ourProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#D7A144]/30" />
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/contact">
              <Button size="lg" data-testid="button-start-journey">
                Start Your Design Journey
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
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
                <Link href="/shop" data-testid={`link-product-${index}`}>
                  <Card className="group hover-elevate active-elevate-2 cursor-pointer overflow-hidden border-primary/10">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        data-testid={`img-product-${index}`}
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2 font-sans" data-testid={`text-product-name-${index}`}>{product.name}</h3>
                      {product.discount && (
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-primary font-semibold" data-testid={`text-product-discount-${index}`}>
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
            <Link href="/shop" data-testid="link-explore-shop">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
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
                <TabsContent key={category} value={category} className="mt-8" data-testid={`tab-content-${category.toLowerCase().replace(/\s+/g, '-')}`}>
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
                            data-testid={`img-project-${index}`}
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-1 line-clamp-2" data-testid={`text-project-title-${index}`}>{project.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-project-description-${index}`}>
                            {project.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                    ))}
                  </div>

                  <div className="text-center mt-12">
                    <Link href="/portfolio" data-testid={`link-explore-${category.toLowerCase().replace(/\s+/g, '-')}`}>
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

      {/* Client Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                {...fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`testimonial-${index}`}
              >
                <Card className="h-full hover-elevate">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="w-16 h-16" data-testid={`avatar-${index}`}>
                        <AvatarFallback className="bg-[#D7A144] text-white text-lg font-semibold">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-foreground" data-testid={`testimonial-name-${index}`}>{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground" data-testid={`testimonial-role-${index}`}>{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4" data-testid={`testimonial-rating-${index}`}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#D7A144] text-[#D7A144]" />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`testimonial-content-${index}`}>
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio">
              <Button variant="outline" size="lg" data-testid="button-view-portfolio">
                View Our Complete Portfolio
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto" data-testid="text-cta-description">
              Let our expert designers bring your vision to life with personalized solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" data-testid="link-cta-booking">
                <Button size="lg" data-testid="button-cta-booking">
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact" data-testid="link-cta-contact">
                <Button size="lg" variant="outline" className="border-white text-white backdrop-blur-sm" data-testid="button-cta-contact">
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
