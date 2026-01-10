import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Heart,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  Zap,
  Droplets,
  Wind,
  Shield,
  Hammer,
  Home,
  Building2,
  Users,
  Sparkles,
  Target,
  Lightbulb,
  Eye,
  ClipboardCheck,
  Settings,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What types of maintenance services do you provide?",
    answer: "We provide preventive, corrective, and routine maintenance services for residential and commercial properties across Dubai."
  },
  {
    question: "Do you offer ongoing maintenance contracts?",
    answer: "Yes. Maintenance contracts are available to ensure properties are regularly inspected, maintained, and repaired."
  },
  {
    question: "Are your maintenance services suitable for occupied properties?",
    answer: "Yes. Work is planned and scheduled to minimize disruption for residents, tenants, and businesses."
  },
  {
    question: "How quickly can maintenance issues be addressed?",
    answer: "Response times depend on the nature of the issue, but priority is given to urgent and safety-related concerns."
  },
  {
    question: "Do you handle both minor repairs and larger maintenance works?",
    answer: "Yes. Services range from small fixes to more extensive maintenance requirements."
  },
  {
    question: "Are your maintenance services compliant with Dubai regulations?",
    answer: "Yes. All work is carried out in line with local regulations, building standards, and community guidelines."
  },
  {
    question: "Can maintenance services be customized based on property needs?",
    answer: "Absolutely. Maintenance plans are tailored based on property type, usage, and specific requirements."
  }
];

const heroStats = [
  { value: "15+", label: "Years Experience", icon: Shield },
  { value: "500+", label: "Projects Completed", icon: CheckCircle2 },
  { value: "100%", label: "Client Satisfaction", icon: Heart },
  { value: "24/7", label: "Support Available", icon: ShieldCheck },
];

const approachPoints = [
  {
    icon: Eye,
    title: "Preventive Focus",
    description: "Preventive maintenance rather than reactive fixes to avoid costly repairs and disruptions"
  },
  {
    icon: Target,
    title: "Clear Assessment",
    description: "Thorough assessment of issues before repair to ensure the right solution is applied"
  },
  {
    icon: Shield,
    title: "Quality Materials",
    description: "Use of appropriate materials and methods that meet Dubai's building standards"
  },
  {
    icon: Lightbulb,
    title: "Minimal Disruption",
    description: "Reliable execution with minimal disruption to your daily operations and comfort"
  }
];

const maintenanceServices = [
  {
    id: 1,
    icon: Wrench,
    title: "General Property Maintenance",
    description: "Routine maintenance services that support the overall condition and functionality of residential and commercial properties.",
    href: "/maintenance/general"
  },
  {
    id: 2,
    icon: Zap,
    title: "Electrical Maintenance Services",
    description: "Inspection, repair, and maintenance of electrical systems to ensure safety and reliable operation.",
    href: "/maintenance/electrical"
  },
  {
    id: 3,
    icon: Droplets,
    title: "Plumbing Maintenance Services",
    description: "Services focused on identifying leaks, blockages, and plumbing inefficiencies before they escalate.",
    href: "/maintenance/plumbing"
  },
  {
    id: 4,
    icon: Wind,
    title: "HVAC & Air Conditioning Maintenance",
    description: "Maintenance services designed to support efficient cooling performance and indoor comfort.",
    href: "/maintenance/hvac"
  },
  {
    id: 5,
    icon: Hammer,
    title: "Handyman & Repair Services",
    description: "Support for small repairs and fixes that help maintain daily functionality.",
    href: "/maintenance/handyman"
  },
  {
    id: 6,
    icon: Settings,
    title: "Preventive Maintenance Solutions",
    description: "Scheduled maintenance programs aimed at reducing long-term repair costs and unexpected issues.",
    href: "/maintenance/preventive"
  }
];

const whyItMatters = [
  { icon: Wind, title: "Continuous use of cooling systems" },
  { icon: Droplets, title: "Wear and tear from daily occupancy" },
  { icon: Sparkles, title: "Environmental strain from heat and humidity" },
  { icon: Building2, title: "Increased maintenance needs in shared spaces" }
];

const targetAudiences = [
  { icon: Home, title: "Homeowners & Tenants", description: "seeking reliable property care" },
  { icon: Users, title: "Families", description: "with children or elderly residents" },
  { icon: Building2, title: "Property Owners", description: "and landlords managing properties" },
  { icon: Sparkles, title: "Commercial Spaces", description: "prioritizing operational continuity" }
];

const processSteps = [
  { step: 1, title: "Assess", description: "Assessing the issue or maintenance requirement" },
  { step: 2, title: "Recommend", description: "Recommending suitable repair or maintenance solutions" },
  { step: 3, title: "Execute", description: "Carrying out work efficiently and safely" },
  { step: 4, title: "Review", description: "Reviewing outcomes to ensure proper resolution" }
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function MaintenanceServices() {
  return (
    <div className="min-h-screen bg-[#F6F4EB]">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80"
            alt="Maintenance Services Dubai"
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
                  Maintenance Services in Dubai
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-base md:text-lg leading-relaxed text-white/90 mb-6 space-y-4"
                  data-testid="text-hero-description"
                >
                  <p>Property maintenance plays a critical role in preserving the value, safety, and functionality of homes and commercial spaces.</p>
                  <p>Property Masters provides Maintenance Services designed to keep properties in good working condition, reduce unexpected breakdowns, and support long-term reliability.</p>
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
              Reliable Property Care for Long-Term Performance
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              In Dubai, properties are exposed to constant air conditioning, heavy usage, heat, and humidity, all of which place ongoing strain on building systems and finishes. Proper maintenance helps extend system lifespan, maintain safety, and preserve property value.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This page provides an overview of our maintenance services and how they support well-maintained properties across Dubai.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR APPROACH TO MAINTENANCE */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-approach">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              Our Approach to Maintenance
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Maintenance works best when it is planned, consistent, and handled by experienced professionals.
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
            Each maintenance service is designed to integrate seamlessly into existing properties without unnecessary disruption.
          </motion.p>
        </div>
      </section>

      {/* WHAT OUR MAINTENANCE SERVICES COVER */}
      <section className="py-20 bg-white" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              What Our Maintenance Services Cover
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Property Masters offers a comprehensive range of maintenance services, each addressing specific aspects of property upkeep. Each service is explained in detail on its own dedicated page.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maintenanceServices.map((service, index) => (
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
            Each service is structured to address common maintenance needs found in Dubai properties.
          </motion.p>
        </div>
      </section>

      {/* WHY MAINTENANCE SERVICES MATTER IN DUBAI */}
      <section className="py-20 bg-[#09263D]" data-testid="section-why-matters">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-white">
              Why Maintenance Services Matter in Dubai
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Dubai properties often experience unique challenges that require professional maintenance solutions.
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
            Professional maintenance helps extend system lifespan, maintain safety, and preserve property value.
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
              Our maintenance services are suitable for a variety of clients and property types across Dubai.
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
            Each property is assessed individually to determine the most appropriate maintenance support.
          </motion.p>
        </div>
      </section>

      {/* HOW MAINTENANCE PROJECTS ARE HANDLED */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              How Maintenance Projects Are Handled
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our process is simple and structured to ensure maintenance services deliver meaningful and lasting results.
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

      {/* EXPLORE OUR MAINTENANCE SERVICES */}
      <section className="py-16 bg-white" data-testid="section-explore">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-serif text-[#09263D]">
              Explore Our Maintenance Services
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Each maintenance service is explained in detail on its dedicated page, allowing you to explore solutions that are relevant to your property.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {maintenanceServices.map((service) => (
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

      {/* FAQ SECTION */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-faq">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-12">
            <div className="w-16 h-16 bg-[#970A44]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-[#970A44]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-[#09263D]">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Common questions about our maintenance services in Dubai
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white rounded-xl border-0 shadow-sm px-6"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left font-semibold text-[#09263D] hover:text-[#970A44] hover:no-underline py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
              Ready to Keep Your Property in Top Condition?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Contact Property Masters to discuss your maintenance needs and explore suitable service options.
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
                data-testid="button-cta-book"
              >
                <Link href="/book">
                  Book a Service
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
