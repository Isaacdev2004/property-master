import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Heart,
  CheckCircle2,
  ShieldCheck,
  Home,
  Building2,
  Users,
  Paintbrush,
  Layers,
  Square,
  Waves,
  UtensilsCrossed,
  Shield,
  Target,
  Lightbulb,
  Eye,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const heroStats = [
  { value: "15+", label: "Years Experience", icon: Shield },
  { value: "2000+", label: "Projects Completed", icon: CheckCircle2 },
  { value: "98%", label: "Client Satisfaction", icon: Heart },
  { value: "10yr", label: "Warranty", icon: ShieldCheck },
];

const approachPoints = [
  {
    icon: Eye,
    title: "Practical Layouts",
    description: "Spaces designed around how people actually live and work, not just how they look"
  },
  {
    icon: Target,
    title: "Climate-Appropriate Materials",
    description: "Materials selected to perform well in Dubai's heat, humidity, and AC-heavy environments"
  },
  {
    icon: Shield,
    title: "Integrated Execution",
    description: "Design and construction handled together to ensure consistency and quality control"
  },
  {
    icon: Lightbulb,
    title: "Long-Term Durability",
    description: "Solutions that maintain their quality long after handover, reducing future repairs"
  }
];

const interiorServices = [
  {
    id: 1,
    icon: Home,
    title: "Residential Interior Design & Renovation",
    description: "Apartments, villas, and townhouses planned around daily living, comfort, and long-term use.",
    href: "/services/interior-design/residential"
  },
  {
    id: 2,
    icon: UtensilsCrossed,
    title: "Commercial Interior Design",
    description: "Restaurants, hospitality, and retail interiors designed to balance brand identity and operational flow.",
    href: "/services/interior-design/commercial"
  },
  {
    id: 3,
    icon: Layers,
    title: "Kitchen Remodeling & Wardrobe Solutions",
    description: "High-use spaces designed for workflow, storage efficiency, and durability.",
    href: "/services/interior-design/kitchen"
  },
  {
    id: 4,
    icon: Square,
    title: "Flooring & Surface Finishes",
    description: "Flooring and finishes selected based on usage, maintenance, and environmental conditions.",
    href: "/services/interior-design/countertops"
  },
  {
    id: 5,
    icon: Paintbrush,
    title: "Painting, Gypsum & False Ceilings",
    description: "Integrated finishes that define the final look and feel of the space.",
    href: "/services/interior-design/painting"
  },
  {
    id: 6,
    icon: Waves,
    title: "Outdoor Renovation & Swimming Pools",
    description: "Outdoor areas designed as functional extensions of the interior.",
    href: "/services/interior-design/outdoor"
  }
];

const whyItMatters = [
  { icon: Sparkles, title: "Constant air conditioning affects materials" },
  { icon: Home, title: "Humidity impacts finishes over time" },
  { icon: Shield, title: "Strong sunlight causes wear and fading" },
  { icon: Building2, title: "Daily use requires durable solutions" }
];

const targetAudiences = [
  { icon: Home, title: "Homeowners", description: "seeking quality renovations" },
  { icon: Users, title: "Families", description: "planning long-term living spaces" },
  { icon: Building2, title: "Property Investors", description: "improving asset value" },
  { icon: Sparkles, title: "Commercial Clients", description: "needing functional workspaces" }
];

const processSteps = [
  { step: 1, title: "Consult", description: "Understanding your vision, requirements, and budget" },
  { step: 2, title: "Design", description: "Creating detailed plans and material selections" },
  { step: 3, title: "Execute", description: "Professional construction with quality control" },
  { step: 4, title: "Handover", description: "Final inspection and warranty documentation" }
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
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function InteriorDesign() {
  return (
    <div className="min-h-screen bg-[#F6F4EB]" data-testid="page-interior-design">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
            alt="Interior Design Services Dubai"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09263D]/90 via-[#09263D]/70 to-[#09263D]/40" />
        </div>
        
        <div className="relative z-10 w-full py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-[#970A44] font-semibold text-lg mb-4 tracking-wide"
                >
                  Property Masters Dubai
                </motion.p>
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-white mb-4 font-serif"
                  data-testid="text-hero-title"
                >
                  Interior Design Services in Dubai
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-base md:text-lg leading-relaxed text-white/90 mb-6 space-y-4"
                  data-testid="text-hero-description"
                >
                  <p>Interior design in Dubai is shaped by more than aesthetics. Constant air conditioning, humidity, strong sunlight, and daily use all affect how interiors perform over time.</p>
                  <p>Our Interior Design & Renovation services are developed with these realities in mind. We create spaces that are visually balanced, practical to live in, and durable enough to maintain their quality long after handover.</p>
                </motion.div>
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
                      Get Free Consultation
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2" data-testid="badge-certified">
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">Certified Professionals</span>
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
                {heroStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
                    data-testid={`stat-${index}`}
                  >
                    <div className="flex justify-center mb-2">
                      <div className="w-10 h-10 bg-[#970A44] rounded-lg flex items-center justify-center">
                        {stat.icon && <stat.icon className="w-5 h-5 text-white" />}
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

      {/* INTRO SECTION */}
      <section className="py-16 bg-white" data-testid="section-intro">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-serif text-[#09263D]">
              Designing Spaces That Work for Dubai Living
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Good interior design should feel natural to live in. That happens when design decisions are practical, materials are chosen thoughtfully, and execution follows a clear plan.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This page provides an overview of our interior design and renovation services and how they help create lasting, functional spaces across Dubai.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR APPROACH TO INTERIOR DESIGN */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-approach">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              Our Design Philosophy
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We focus on creating interiors that are visually balanced, practical to live in, and durable enough to maintain their quality over time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approachPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover-elevate" data-testid={`card-approach-${index}`}>
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-[#970A44]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <point.icon className="w-7 h-7 text-[#970A44]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-[#09263D]">{point.title}</h3>
                    <p className="text-sm text-muted-foreground">{point.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.p 
            {...fadeInUp} 
            viewport={{ once: true }}
            className="text-center text-muted-foreground mt-10 max-w-3xl mx-auto"
          >
            Each interior design project is planned to integrate seamlessly with your lifestyle and property requirements.
          </motion.p>
        </div>
      </section>

      {/* WHAT OUR INTERIOR DESIGN SERVICES COVER */}
      <section className="py-20 bg-white" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              What Our Interior Design Services Cover
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our services span residential and commercial interiors, covering planning, design, and execution. Each service is explained in detail on its own dedicated page.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interiorServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={service.href}>
                  <Card className="h-full border-0 shadow-lg hover-elevate cursor-pointer group" data-testid={`card-service-${index}`}>
                    <CardContent className="p-6">
                      <div className="w-14 h-14 bg-[#970A44]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#970A44]/20 transition-colors">
                        <service.icon className="w-7 h-7 text-[#970A44]" />
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-[#09263D] group-hover:text-[#970A44] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center text-[#970A44] font-medium text-sm">
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p 
            {...fadeInUp} 
            viewport={{ once: true }}
            className="text-center text-muted-foreground mt-10 max-w-3xl mx-auto"
          >
            Each service is structured to address specific interior design needs found in Dubai properties.
          </motion.p>
        </div>
      </section>

      {/* WHY INTERIOR DESIGN MATTERS IN DUBAI */}
      <section className="py-20 bg-[#09263D]" data-testid="section-why-matters">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-white">
              Why Interior Design Matters in Dubai
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Dubai's unique environment presents specific challenges that professional interior design can address effectively.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItMatters.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center"
                data-testid={`card-why-${index}`}
              >
                <div className="w-12 h-12 bg-[#970A44] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-medium">{item.title}</p>
              </motion.div>
            ))}
          </div>

          <motion.p 
            {...fadeInUp} 
            viewport={{ once: true }}
            className="text-center text-white/80 mt-10 max-w-3xl mx-auto"
          >
            Professional interior design helps create spaces that look great and perform well under Dubai's demanding conditions.
          </motion.p>
        </div>
      </section>

      {/* WHO THESE SERVICES ARE FOR */}
      <section className="py-20 bg-white" data-testid="section-target-audience">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              Who These Services Are For
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our interior design services are suitable for a variety of clients and property types across Dubai.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudiences.map((audience, index) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg text-center" data-testid={`card-audience-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-[#970A44]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <audience.icon className="w-7 h-7 text-[#970A44]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-[#09263D]">{audience.title}</h3>
                    <p className="text-sm text-muted-foreground">{audience.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.p 
            {...fadeInUp} 
            viewport={{ once: true }}
            className="text-center text-muted-foreground mt-10 max-w-3xl mx-auto"
          >
            Each project is approached with attention to specific needs, usage patterns, and budget considerations.
          </motion.p>
        </div>
      </section>

      {/* HOW INTERIOR DESIGN PROJECTS ARE HANDLED */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              How Interior Design Projects Are Handled
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our process is structured to ensure interior design projects deliver meaningful and lasting results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
                data-testid={`step-${index}`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#970A44] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#09263D]">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-[#970A44]/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs SECTION */}
      <section className="py-20 bg-white" data-testid="section-faqs">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              Interior Design & Renovation – FAQs
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
                  className="border border-border rounded-xl px-6 shadow-sm bg-[#F6F4EB]"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5 text-[#09263D]">
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

      {/* EXPLORE OUR INTERIOR DESIGN SERVICES */}
      <section className="py-16 bg-[#F6F4EB]" data-testid="section-explore">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-serif text-[#09263D]">
              Explore Our Interior Design Services
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Each interior design service is explained in detail on its dedicated page, allowing you to explore solutions that are relevant to your property.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {interiorServices.map((service) => (
                <Button 
                  key={service.id} 
                  variant="outline" 
                  asChild 
                  className="border-[#970A44]/30 text-[#09263D] hover:bg-[#970A44]/10 hover:border-[#970A44] rounded-full"
                  data-testid={`button-explore-${service.id}`}
                >
                  <Link href={service.href}>
                    <service.icon className="w-4 h-4 mr-2 text-[#970A44]" />
                    {service.title}
                  </Link>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 bg-gradient-to-r from-[#09263D] to-[#1C4668]" data-testid="section-final-cta">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-white">
              Planning an Interior Design Project in Dubai?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Get in touch with our team to discuss your requirements and explore suitable design solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild 
                size="lg"
                className="bg-[#970A44] hover:bg-[#720632] text-white font-semibold rounded-full shadow-xl"
                data-testid="button-cta-consultation"
              >
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-full"
                data-testid="button-cta-portfolio"
              >
                <Link href="/portfolio">
                  View Our Portfolio
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
