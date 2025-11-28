import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Paintbrush, 
  Ruler, 
  CheckCircle2, 
  Sofa, 
  UtensilsCrossed, 
  Bed, 
  Bath, 
  Grid3X3, 
  DoorOpen,
  Lamp,
  Table2,
  Play,
  Award,
  Users,
  Building2,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stats = [
  { icon: Building2, value: "500+", label: "Interior Projects" },
  { icon: Users, value: "50+", label: "Design Experts" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Palette, value: "1000+", label: "Design Options" },
];

const turnkeyServices = [
  {
    icon: Paintbrush,
    title: "We Design",
    description: "From completed homes to modular kitchens, and storage to decor, our expert interior designers create spaces that match your vision perfectly.",
    gradient: "from-[#970A44] to-[#720632]",
  },
  {
    icon: Ruler,
    title: "We Execute",
    description: "We follow a meticulous planning approach with detail-driven designs for interiors of your homes, ensuring premium quality at every step.",
    gradient: "from-[#1C4668] to-[#09263D]",
  },
  {
    icon: CheckCircle2,
    title: "We Manage",
    description: "Our expert interior designers spearhead quality assurance by extending support after the execution of home and commercial projects.",
    gradient: "from-[#09263D] to-[#1C4668]",
  },
];

const designCategories = [
  { id: "living-room", label: "Living Room", icon: Sofa },
  { id: "kitchen", label: "Modular Kitchen", icon: UtensilsCrossed },
  { id: "bedroom", label: "Bedroom", icon: Bed },
  { id: "wardrobe", label: "Wardrobe", icon: DoorOpen },
  { id: "bathroom", label: "Bathroom", icon: Bath },
  { id: "dining", label: "Dining Room", icon: Table2 },
  { id: "lighting", label: "Lighting", icon: Lamp },
  { id: "office", label: "Home Office", icon: Grid3X3 },
];

const designIdeas = {
  "living-room": [
    {
      id: 1,
      title: "Modern Living Room with L-Shaped Sofa and Marble Accents",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
      slug: "modern-living-room-l-shaped",
    },
    {
      id: 2,
      title: "Contemporary Living Room with Velvet Furniture",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
      slug: "contemporary-velvet-living",
    },
    {
      id: 3,
      title: "Minimalist Living Room with Natural Light",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
      slug: "minimalist-natural-light",
    },
    {
      id: 4,
      title: "Luxury Living Room with Gold Accents",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
      slug: "luxury-gold-accents",
    },
  ],
  "kitchen": [
    {
      id: 1,
      title: "Modern L-Shaped Kitchen with Quartz Countertop",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
      slug: "modern-l-shaped-kitchen",
    },
    {
      id: 2,
      title: "Contemporary White Kitchen with Island",
      image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=600&q=80",
      slug: "contemporary-white-kitchen",
    },
    {
      id: 3,
      title: "Sage Green Kitchen with Brass Fixtures",
      image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80",
      slug: "sage-green-kitchen",
    },
    {
      id: 4,
      title: "Industrial Style Kitchen Design",
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80",
      slug: "industrial-kitchen",
    },
  ],
  "bedroom": [
    {
      id: 1,
      title: "Luxurious Master Bedroom with Upholstered Headboard",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80",
      slug: "luxury-master-bedroom",
    },
    {
      id: 2,
      title: "Minimalist Bedroom with Platform Bed",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80",
      slug: "minimalist-platform-bed",
    },
    {
      id: 3,
      title: "Cozy Bedroom with Warm Tones",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80",
      slug: "cozy-warm-bedroom",
    },
    {
      id: 4,
      title: "Modern Bedroom with Walk-in Closet",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      slug: "modern-walk-in-closet",
    },
  ],
  "wardrobe": [
    {
      id: 1,
      title: "Walk-in Wardrobe with Custom Shelving",
      image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80",
      slug: "walk-in-custom-shelving",
    },
    {
      id: 2,
      title: "Sliding Door Wardrobe with Mirror Finish",
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80",
      slug: "sliding-mirror-wardrobe",
    },
    {
      id: 3,
      title: "Built-in Wardrobe with LED Lighting",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      slug: "built-in-led-wardrobe",
    },
    {
      id: 4,
      title: "Luxury Dressing Room Design",
      image: "https://images.unsplash.com/photo-1583845112203-29329902332e?w=600&q=80",
      slug: "luxury-dressing-room",
    },
  ],
  "bathroom": [
    {
      id: 1,
      title: "Spa-like Bathroom with Freestanding Tub",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
      slug: "spa-freestanding-tub",
    },
    {
      id: 2,
      title: "Modern Bathroom with Rainfall Shower",
      image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80",
      slug: "modern-rainfall-shower",
    },
    {
      id: 3,
      title: "Minimalist Bathroom with Floating Vanity",
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80",
      slug: "minimalist-floating-vanity",
    },
    {
      id: 4,
      title: "Luxury Master Bathroom Suite",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80",
      slug: "luxury-master-bathroom",
    },
  ],
  "dining": [
    {
      id: 1,
      title: "Elegant Dining Room with Crystal Chandelier",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
      slug: "elegant-crystal-chandelier",
    },
    {
      id: 2,
      title: "Modern Dining with Marble Table",
      image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80",
      slug: "modern-marble-dining",
    },
    {
      id: 3,
      title: "Rustic Dining Room with Wood Accents",
      image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80",
      slug: "rustic-wood-dining",
    },
    {
      id: 4,
      title: "Contemporary Open-Plan Dining",
      image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80",
      slug: "contemporary-open-plan",
    },
  ],
  "lighting": [
    {
      id: 1,
      title: "Statement Pendant Lighting Ideas",
      image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80",
      slug: "statement-pendant-lighting",
    },
    {
      id: 2,
      title: "Ambient Lighting with LED Strips",
      image: "https://images.unsplash.com/photo-1558882224-dda166c27a7b?w=600&q=80",
      slug: "ambient-led-strips",
    },
    {
      id: 3,
      title: "Chandelier Designs for Grand Spaces",
      image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&q=80",
      slug: "chandelier-grand-spaces",
    },
    {
      id: 4,
      title: "Task Lighting for Work Areas",
      image: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=600&q=80",
      slug: "task-lighting-work",
    },
  ],
  "office": [
    {
      id: 1,
      title: "Executive Home Office Design",
      image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=600&q=80",
      slug: "executive-home-office",
    },
    {
      id: 2,
      title: "Minimalist Workspace with Natural Light",
      image: "https://images.unsplash.com/photo-1600494448850-6013c46ba587?w=600&q=80",
      slug: "minimalist-workspace",
    },
    {
      id: 3,
      title: "Creative Studio Office Design",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
      slug: "creative-studio-office",
    },
    {
      id: 4,
      title: "Built-in Study Room Design",
      image: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=600&q=80",
      slug: "built-in-study-room",
    },
  ],
};

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function InteriorDesign() {
  const [activeTab, setActiveTab] = useState("living-room");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
            alt="Luxury Interior Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-2 bg-[#970A44]/20 backdrop-blur-sm border border-[#970A44]/30 rounded-full text-[#970A44] text-sm font-medium mb-6">
              Interior Design & Fit-Out
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight">
              Interior Design that Speaks of <span className="text-[#970A44]">You</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              From foundation to furnishings, we style your space like our own. Transform your vision into reality with Dubai's premier interior design experts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-8"
                data-testid="button-hero-consultation"
              >
                <Link href="/contact">
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-white/50 text-white hover:bg-white/10 rounded-full px-8"
                data-testid="button-hero-portfolio"
              >
                <Link href="/portfolio">
                  View Our Work
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Stats Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#970A44]/10 rounded-xl mb-3">
                      <Icon className="w-6 h-6 text-[#970A44]" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-[#09263D]">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Turnkey Services Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Complete Turnkey Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              With an emphasis on details, extraordinary designs and exceptional customer service, we bring your dreams to life.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {turnkeyServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full border-0 shadow-lg hover-elevate">
                    <CardContent className="p-8 text-center">
                      <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl mb-6`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

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
              className="rounded-full px-8 border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
              data-testid="button-know-more"
            >
              <Link href="/about">
                Know More About Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Factory Video Section */}
      <section className="py-20 bg-[#09263D]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">
                From Concept to Creation: Your Furniture's Journey
              </h2>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">
                Step inside our state-of-the-art manufacturing facility. See how your dream kitchen or wardrobe comes to life with precision craftsmanship and premium materials.
              </p>
              <Button 
                className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-8"
                data-testid="button-watch-video"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Factory Tour
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
                  alt="Manufacturing Process"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button 
                    className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                    data-testid="button-play-video"
                  >
                    <Play className="w-8 h-8 text-[#970A44] ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Ideas Section */}
      <section className="py-24 bg-background" data-testid="section-design-ideas">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Design Ideas for Every Space
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Because every corner holds a unique design potential. Explore our curated collection of interior inspirations.
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0 mb-10">
              {designCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-[#970A44] data-[state=active]:text-white px-4 py-2.5 rounded-full border border-border data-[state=active]:border-[#970A44] transition-all flex items-center gap-2"
                    data-testid={`tab-${category.id}`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <AnimatePresence mode="wait">
              {designCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {designIdeas[category.id as keyof typeof designIdeas]?.map((idea, index) => (
                      <motion.div
                        key={idea.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Link href={`/interior-design/${category.id}/${idea.slug}`}>
                          <Card 
                            className="group overflow-hidden border-0 shadow-md hover-elevate cursor-pointer"
                            data-testid={`card-design-${category.id}-${idea.id}`}
                          >
                            <div className="relative aspect-[4/3] overflow-hidden">
                              <img 
                                src={idea.image}
                                alt={idea.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-10 h-10 bg-[#970A44] rounded-full flex items-center justify-center">
                                  <ArrowRight className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-[#970A44] transition-colors">
                                {idea.title}
                              </h3>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-10"
                  >
                    <Button 
                      asChild
                      variant="outline"
                      className="rounded-full px-8 border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
                      data-testid={`button-explore-${category.id}`}
                    >
                      <Link href={`/interior-design/${category.id}`}>
                        Explore More {category.label} Designs
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Our Design Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A streamlined journey from your vision to reality, crafted with precision at every step.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Share your vision and requirements with our design experts" },
              { step: "02", title: "Design", desc: "Receive 3D visualizations and detailed design proposals" },
              { step: "03", title: "Execution", desc: "Our skilled craftsmen bring your design to life" },
              { step: "04", title: "Handover", desc: "Final inspection and handover of your dream space" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="text-6xl font-bold text-[#970A44]/10 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <div className="border-t-2 border-dashed border-[#970A44]/30 w-full"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#970A44] to-[#720632]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Book a free consultation with our design experts and take the first step towards your dream interior.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-white text-[#970A44] hover:bg-white/90 rounded-full px-8"
                data-testid="button-cta-book-consultation"
              >
                <Link href="/contact">
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-white/50 text-white hover:bg-white/10 rounded-full px-8"
                data-testid="button-cta-call-now"
              >
                <a href="tel:+97125500888">
                  Call +971 2550 0888
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
