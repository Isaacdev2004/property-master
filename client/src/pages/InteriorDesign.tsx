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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const faqs = [
  {
    question: "What types of interior design projects do you handle in Dubai?",
    answer: "We handle full interior renovations, partial upgrades, and space-specific design solutions for residential and commercial properties. Projects range from apartments and villas to offices and retail spaces, all planned with Dubai's climate and usage patterns in mind."
  },
  {
    question: "How do Dubai's climate and building conditions affect interior design?",
    answer: "Constant air conditioning, humidity, and strong sunlight can impact materials, finishes, and long-term durability. Our designs account for these factors by selecting suitable materials and planning layouts that maintain comfort and performance over time."
  },
  {
    question: "Do you manage both design and execution?",
    answer: "Yes. We provide end-to-end interior design and renovation services, covering planning, material selection, execution, and final handover. This ensures consistency, quality control, and smoother project delivery."
  },
  {
    question: "Can you work with occupied properties?",
    answer: "Yes. Where required, we plan work phases carefully to minimize disruption, especially for residential homes and active commercial spaces."
  },
  {
    question: "How long does an interior design or renovation project usually take?",
    answer: "Timelines vary depending on scope, approvals, and materials. After an initial assessment, we provide a realistic schedule aligned with Dubai regulations and project requirements."
  },
  {
    question: "Do you assist with material and finish selection?",
    answer: "Yes. We guide clients on materials, finishes, and fixtures that balance aesthetics, durability, and maintenance needs, ensuring they perform well in Dubai conditions."
  },
  {
    question: "Are your services suitable for both new properties and older spaces?",
    answer: "Absolutely. We design for new developments as well as existing properties that require refurbishment, upgrades, or functional improvements."
  },
  {
    question: "How do you ensure quality and long-term results?",
    answer: "Every project follows a structured process, from planning and material assessment to controlled execution and final inspection, ensuring the interior maintains its quality long after completion."
  },
  {
    question: "Can services be customized based on budget and requirements?",
    answer: "Yes. Each project is planned around the client's objectives, functional needs, and budget, without compromising on essential quality standards."
  },
  {
    question: "Do you handle approvals and coordination where required?",
    answer: "We assist with coordination and necessary approvals as part of the project workflow, helping ensure compliance with local building and community guidelines."
  }
];

export default function InteriorDesign() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-interior-design">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden" data-testid="section-hero">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury interior design" 
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>

        {/* Hero Content - Two Column Layout */}
        <div className="relative z-10 w-full py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-white mb-4 font-serif"
                  data-testid="text-hero-title"
                >
                  Interior Design Services in Dubai
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base md:text-lg leading-relaxed text-white/90 mb-4"
                  data-testid="text-hero-paragraph-1"
                >
                  Interior design in Dubai is shaped by more than aesthetics. Constant air conditioning, humidity, strong sunlight, and daily use all affect how interiors perform over time.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-base md:text-lg leading-relaxed text-white/90 mb-6"
                  data-testid="text-hero-paragraph-2"
                >
                  Our Interior Design & Renovation services are developed with these realities in mind. We create spaces that are visually balanced, practical to live in, and durable enough to maintain their quality long after handover.
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
                    data-testid="button-hero-consultation"
                  >
                    <Link href="/contact">
                      Book Free Consultation
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2" data-testid="badge-quality">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">10 Year Warranty</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Statistics Grid */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid grid-cols-2 gap-3"
                data-testid="stats-grid"
              >
                {[
                  { value: "2000+", label: "Projects Completed", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                  { value: "150+", label: "Design Experts", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                  { value: "15+", label: "Years Experience", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                  { value: "98%", label: "Client Satisfaction", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
                  >
                    <div className="flex justify-center mb-2">
                      <div className="w-10 h-10 bg-[#970A44] rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                        </svg>
                      </div>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/80 uppercase tracking-wide">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
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

      {/* FAQs SECTION */}
      <section className="py-24 bg-background" data-testid="section-faqs">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
              Interior Design & Renovation in Dubai – FAQs
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about our interior design and renovation services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="border border-border rounded-xl px-6 shadow-sm"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
