import { motion } from "framer-motion";
import { 
  Home,
  UtensilsCrossed,
  Sofa,
  DoorOpen,
  Bath,
  Layers,
  Paintbrush,
  Square,
  Flower2,
  Waves,
  GlassWater,
  Gem,
  Store,
  Briefcase,
  Target,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
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

const services = [
  {
    icon: Home,
    title: "Residential Interior Design",
    description: "Homes are designed around comfort, storage, and ease of movement. We handle full renovations as well as room-specific upgrades, ensuring consistency across the property."
  },
  {
    icon: UtensilsCrossed,
    title: "Kitchen Remodeling & Modular Kitchens",
    description: "Kitchens are planned around workflow, storage efficiency, and materials that handle heat and daily use reliably."
  },
  {
    icon: Sofa,
    title: "Living Room, Bedroom & Kids Room Interiors",
    description: "Individual spaces are designed to support their specific purpose, whether it's shared living, rest, or growth and learning."
  },
  {
    icon: DoorOpen,
    title: "Wardrobe & Storage Solutions",
    description: "Storage systems are designed around real usage habits, helping reduce clutter and improve daily routines."
  },
  {
    icon: Bath,
    title: "Bathroom Interior Design & Renovation",
    description: "Bathrooms are planned with attention to moisture management, safety, and durability, ensuring comfort and ease of maintenance."
  },
  {
    icon: Layers,
    title: "Flooring Services",
    description: "We provide guidance and installation for a wide range of flooring options, selected based on usage, maintenance needs, and environmental conditions."
  },
  {
    icon: Paintbrush,
    title: "Interior Painting, Gypsum & False Ceilings",
    description: "Finishing works are treated as part of the overall design, supporting lighting, proportions, and clean detailing."
  },
  {
    icon: Square,
    title: "Quartz & Natural Stone Countertops",
    description: "Countertop solutions are selected and installed with attention to durability, usage, and visual consistency."
  },
  {
    icon: Flower2,
    title: "Outdoor Renovation & Landscaping",
    description: "Outdoor spaces are designed as functional extensions of the interior, using materials suited to sun exposure and heat."
  },
  {
    icon: Waves,
    title: "Swimming Pool Design & Build",
    description: "Pools are planned and constructed as complete systems, balancing design, safety, and long-term performance."
  },
  {
    icon: GlassWater,
    title: "Glass & Aluminum Works",
    description: "Glass and aluminum elements are designed and installed with precision to support modern interiors and exterior structures."
  },
  {
    icon: Gem,
    title: "Marble Restoration Services",
    description: "Professional restoration services help revive marble surfaces and extend their lifespan without replacement."
  },
  {
    icon: Store,
    title: "Commercial Interior Design",
    description: "We design commercial interiors for restaurants, hospitality, and retail spaces, focusing on operational efficiency and brand alignment."
  }
];

const missionPoints = [
  "Design should support daily routines, not complicate them",
  "Materials should be chosen for performance, not just appearance",
  "Execution should match the approved design without shortcuts",
  "Interiors should age well, not demand constant correction"
];


const clientTypes = [
  { icon: Home, text: "Homeowners renovating or upgrading their properties" },
  { icon: Briefcase, text: "Property investors and landlords" },
  { icon: Store, text: "Business owners and commercial operators" },
  { icon: Target, text: "Clients seeking long-term, well-planned interior solutions" }
];

export default function InteriorDesign() {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center" data-testid="section-hero">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif leading-tight">
              Interior Design & Property Services in Dubai
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Property Masters is a Dubai-based interior design and property services company focused on creating well-planned, practical, and durable spaces. Our work spans residential and commercial interiors, renovation, and specialized property services, all delivered with a clear understanding of local conditions, usage patterns, and long-term performance.
            </p>
            <p className="text-base md:text-lg text-white/80 mb-6 leading-relaxed">
              In Dubai, properties are exposed to constant air conditioning, heat, humidity, and heavy daily use. Design decisions that ignore these factors often lead to early wear, discomfort, or high maintenance costs. Our approach is built around designing and executing spaces that not only look balanced, but continue to function well over time.
            </p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              This page provides an overview of who we are, how we work, and the range of interior and property services we offer across Dubai.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="py-24 bg-background" data-testid="section-who-we-are">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
                Who We Are
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Property Masters is built around the idea that good interiors come from planning, not excess. We focus on understanding how spaces are actually used and translating that understanding into layouts, materials, and finishes that make sense in real life.
                </p>
                <p>
                  Our team works across apartments, villas, and commercial properties, coordinating design and execution to ensure consistency from concept to completion. Rather than treating services as separate tasks, we approach projects as connected systems, where each decision affects the final outcome.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
                  alt="Property Masters Interior Design"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION & PHILOSOPHY SECTION */}
      <section className="py-24 bg-muted/30" data-testid="section-mission">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
              Our Mission & Philosophy
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our mission is to create interiors and property solutions that are practical, reliable, and comfortable to live or work in.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-0 shadow-xl bg-background">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-xl font-semibold mb-8 text-center">We believe that:</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {missionPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-[#970A44] rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-foreground leading-relaxed">{point}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-center mt-8 text-muted-foreground">
                  This philosophy guides every project, regardless of size or scope.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DO - SERVICES SECTION */}
      <section id="services" className="py-24 bg-background" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
              What We Do
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Property Masters provides a complete range of interior design and property services in Dubai. Each service is structured to address specific needs while remaining part of a cohesive whole.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-[#970A44]/10 border border-[#970A44]/20 rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold text-[#970A44] mb-2">
                Interior Design & Renovation Services
              </h3>
              <p className="text-muted-foreground">
                We design and renovate residential and commercial interiors with a focus on layout planning, material suitability, and long-term usability. This includes apartments, villas, and business spaces.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card 
                    className="h-full border-0 shadow-lg hover-elevate group cursor-pointer"
                    data-testid={`card-service-${index}`}
                  >
                    <CardContent className="p-6">
                      <div className="w-14 h-14 bg-[#970A44]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#970A44] transition-colors duration-300">
                        <Icon className="w-7 h-7 text-[#970A44] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground">
              Each service is explained in detail on its own dedicated page, allowing clients to explore only what is relevant to their needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* HOW WE WORK SECTION */}
      <section className="py-24 bg-muted/30" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
              How We Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
              Our process is structured to reduce uncertainty and maintain quality throughout the project.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
              We begin by understanding the property, usage requirements, and client priorities. Design decisions are developed with practical constraints in mind, and all materials and finishes are finalized before execution begins. During execution, coordination and quality control ensure the finished space reflects the approved plan.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              This approach helps avoid unnecessary changes, delays, and mismatched outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHO WE WORK WITH SECTION */}
      <section className="py-24 bg-background" data-testid="section-clients">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
              Who We Work With
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We work with:
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientTypes.map((client, index) => {
              const Icon = client.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-lg hover-elevate" data-testid={`card-client-${index}`}>
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 mx-auto mb-4 bg-[#970A44]/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-[#970A44]" />
                      </div>
                      <p className="text-foreground font-medium">{client.text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground">
              Each project is approached with the same attention to detail and accountability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* EXPLORE OUR SERVICES SECTION */}
      <section className="py-24 bg-muted/30" data-testid="section-explore">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
              Explore Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Property Masters offers a structured range of interior and property services designed to meet the needs of Dubai properties. You can explore each service in detail through the dedicated pages linked throughout this section.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-[#970A44]" data-testid="section-cta">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-serif">
              Planning an interior design or property project in Dubai?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Property Masters can help you plan and execute a space that is practical, durable, and designed for real use.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
