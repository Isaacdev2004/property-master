import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Home,
  UtensilsCrossed,
  Layers,
  Paintbrush,
  Square,
  Waves,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

const services = [
  {
    icon: Home,
    title: "Residential Interior Design & Renovation",
    description: "Apartments, villas, and townhouses planned around daily living, comfort, and long-term use.",
    link: "/services/interior-design/residential"
  },
  {
    icon: UtensilsCrossed,
    title: "Commercial Interior Design",
    description: "Restaurants, hospitality, and retail interiors designed to balance brand identity and operational flow.",
    link: "/services/interior-design/commercial"
  },
  {
    icon: Layers,
    title: "Kitchen Remodeling & Wardrobe Solutions",
    description: "High-use spaces designed for workflow, storage efficiency, and durability.",
    link: "/services/interior-design/kitchen"
  },
  {
    icon: Square,
    title: "Flooring & Surface Finishes",
    description: "Flooring and finishes selected based on usage, maintenance, and environmental conditions.",
    link: "/services/interior-design/countertops"
  },
  {
    icon: Paintbrush,
    title: "Painting, Gypsum & False Ceilings",
    description: "Integrated finishes that define the final look and feel of the space.",
    link: "/services/interior-design/painting"
  },
  {
    icon: Waves,
    title: "Outdoor Renovation & Swimming Pools",
    description: "Outdoor areas designed as functional extensions of the interior.",
    link: "/services/interior-design/outdoor"
  }
];

const philosophyPoints = [
  "Practical layouts",
  "Climate-appropriate materials",
  "Integrated design and execution"
];

export default function InteriorDesign() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-interior-design">
      {/* HERO SECTION */}
      <section 
        className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
        data-testid="section-hero"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-serif"
            data-testid="text-hero-title"
          >
            Interior Design Services in Dubai
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 max-w-4xl mx-auto"
            data-testid="text-hero-paragraph-1"
          >
            Interior design in Dubai is shaped by more than aesthetics. Constant air conditioning, humidity, strong sunlight, and daily use all affect how interiors perform over time.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 max-w-4xl mx-auto"
            data-testid="text-hero-paragraph-2"
          >
            Our Interior Design & Renovation services are developed with these realities in mind. We create spaces that are visually balanced, practical to live in, and durable enough to maintain their quality long after handover.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto"
            data-testid="text-hero-paragraph-3"
          >
            Whether it's a full renovation or a targeted upgrade, every project is approached with careful planning, material awareness, and controlled execution to ensure long-term comfort and consistency.
          </motion.p>
        </div>
      </section>

      {/* WHAT OUR INTERIOR DESIGN SERVICES COVER */}
      <section className="py-24 bg-background" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
              What Our Interior Design Services Cover
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our services span residential and commercial interiors, covering planning, design, and execution.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <Link href={service.link}>
                    <Card 
                      className="h-full border-0 shadow-lg hover-elevate group cursor-pointer"
                      data-testid={`card-service-${index}`}
                    >
                      <CardContent className="p-6">
                        <div className="w-14 h-14 bg-[#970A44]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#970A44] transition-colors duration-300">
                          <Icon className="w-7 h-7 text-[#970A44] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <span className="inline-flex items-center text-[#970A44] font-medium text-sm group-hover:underline">
                          Learn More
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR DESIGN PHILOSOPHY */}
      <section className="py-24 bg-muted/30" data-testid="section-philosophy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
              Our Design Philosophy
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Good interior design should feel natural to live in. That happens when design decisions are practical, materials are chosen thoughtfully, and execution follows a clear plan.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              We focus on:
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {philosophyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg" data-testid={`card-philosophy-${index}`}>
                  <CardContent className="p-6 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#970A44] flex-shrink-0" />
                    <span className="font-medium">{point}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CLIENTS CHOOSE US */}
      <section className="py-24 bg-background" data-testid="section-why-choose-us">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
              Why Clients Choose Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Clients work with us because they want clarity and reliability. We provide realistic timelines, guide material decisions carefully, and stay involved throughout the project to maintain quality and consistency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* EXPLORE ALL SERVICES */}
      <section className="py-24 bg-muted/30" data-testid="section-all-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
              Explore All Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Each of our interior design services is explained in detail on its dedicated page.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Residential Interior Design & Renovation", link: "/services/interior-design/residential" },
              { title: "Kitchen Remodeling & Modular Kitchens", link: "/services/interior-design/kitchen" },
              { title: "Living Room Interior Design", link: "/services/interior-design/living-room" },
              { title: "Master Bedroom Interior Design", link: "/services/interior-design/master-bedroom" },
              { title: "Kids Room Interior Design", link: "/services/interior-design/kids-room" },
              { title: "Wardrobe & Storage Solutions", link: "/services/interior-design/wardrobe" },
              { title: "Bathroom Interior Design & Renovation", link: "/services/interior-design/bathroom" },
              { title: "Interior Painting Services", link: "/services/interior-design/painting" },
              { title: "Gypsum Partitions & False Ceilings", link: "/services/interior-design/gypsum" },
              { title: "Quartz & Natural Stone Countertops", link: "/services/interior-design/countertops" },
              { title: "Outdoor Renovation & Landscaping", link: "/services/interior-design/outdoor" },
              { title: "Swimming Pool Design & Build", link: "/services/interior-design/swimming-pool" },
              { title: "Glass & Aluminum Works", link: "/services/interior-design/glass-aluminum" },
              { title: "Commercial Interior Design", link: "/services/interior-design/commercial" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
              >
                <Link href={item.link}>
                  <Card className="border-0 shadow-md hover-elevate cursor-pointer" data-testid={`card-all-service-${index}`}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <span className="font-medium text-sm">{item.title}</span>
                      <ArrowRight className="w-4 h-4 text-[#970A44]" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-serif">
              Planning an interior design or renovation project in Dubai?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Get in touch with our team to discuss your requirements and next steps.
            </p>
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-white text-[#970A44] hover:bg-white/90 font-semibold px-8"
                data-testid="button-cta-contact"
              >
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
