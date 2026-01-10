import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Heart,
  Leaf,
  CheckCircle2,
  ShieldCheck,
  Wind,
  Droplets,
  SprayCan,
  Home,
  Building2,
  Users,
  Baby,
  Thermometer,
  Shield,
  Target,
  Lightbulb,
  ClipboardCheck,
  Eye,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const heroStats = [
  { value: "15+", label: "Years Experience", icon: Shield },
  { value: "500+", label: "Projects Completed", icon: CheckCircle2 },
  { value: "100%", label: "Client Satisfaction", icon: Heart },
  { value: "24/7", label: "Support Available", icon: ShieldCheck },
];

const approachPoints = [
  {
    icon: Eye,
    title: "Identify Health Factors",
    description: "Identifying factors that affect indoor health and comfort"
  },
  {
    icon: Target,
    title: "Climate-Suited Solutions",
    description: "Using solutions suited to Dubai's climate and building conditions"
  },
  {
    icon: Shield,
    title: "Safe & Practical Methods",
    description: "Applying methods that are safe, practical, and easy to maintain"
  },
  {
    icon: Lightbulb,
    title: "Long-Term Improvement",
    description: "Supporting long-term improvement rather than temporary fixes"
  }
];

const wellnessServices = [
  {
    id: 1,
    icon: Wind,
    title: "Indoor Air Quality Solutions",
    description: "Services aimed at improving air circulation, reducing airborne pollutants, and creating cleaner indoor environments.",
    href: "/wellness/air-quality"
  },
  {
    id: 2,
    icon: SprayCan,
    title: "Hygiene & Sanitization Services",
    description: "Professional cleaning and sanitization services designed to maintain high hygiene standards in residential and commercial spaces.",
    href: "/wellness/hygiene"
  },
  {
    id: 3,
    icon: Droplets,
    title: "Mold & Moisture Control",
    description: "Solutions that address moisture buildup, mold growth, and related indoor health concerns common in humid environments.",
    href: "/wellness/mold-control"
  },
  {
    id: 4,
    icon: Thermometer,
    title: "Water Quality & Filtration Solutions",
    description: "Services focused on improving water quality for daily use through filtration and treatment systems.",
    href: "/wellness/water-quality"
  },
  {
    id: 5,
    icon: Leaf,
    title: "Allergy & Dust Reduction Solutions",
    description: "Measures designed to reduce allergens, dust accumulation, and irritants within indoor spaces.",
    href: "/wellness/allergy-solutions"
  }
];

const whyItMatters = [
  { icon: Wind, title: "Limited natural ventilation" },
  { icon: Droplets, title: "Higher indoor humidity" },
  { icon: Sparkles, title: "Accumulation of dust and pollutants" },
  { icon: Thermometer, title: "Increased reliance on air conditioning" }
];

const targetAudiences = [
  { icon: Home, title: "Homeowners", description: "seeking healthier living environments" },
  { icon: Users, title: "Families", description: "with children or elderly residents" },
  { icon: Building2, title: "Property Owners", description: "and landlords managing properties" },
  { icon: Baby, title: "Commercial Spaces", description: "prioritizing hygiene and comfort" }
];

const processSteps = [
  { step: 1, title: "Assessment", description: "Assessing the space and identifying wellness concerns" },
  { step: 2, title: "Recommendation", description: "Recommending suitable services and solutions" },
  { step: 3, title: "Execution", description: "Executing services using safe and effective methods" },
  { step: 4, title: "Review", description: "Reviewing outcomes to ensure improvement" }
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function WellnessServices() {
  return (
    <div className="min-h-screen bg-[#F6F4EB]">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="Wellness Services Dubai"
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
                  Wellness Services in Dubai
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-base md:text-lg leading-relaxed text-white/90 mb-6"
                  data-testid="text-hero-description"
                >
                  Creating healthier environments by improving air quality, hygiene, comfort, and overall living conditions. Our wellness services are designed to support healthier living and working spaces across Dubai.
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
            <p className="text-lg text-muted-foreground leading-relaxed">
              Wellness within a home or commercial space goes beyond appearance. It focuses on creating healthier environments by improving air quality, hygiene, comfort, and overall living conditions. In Dubai, wellness services are especially important due to climate conditions, sealed indoor environments, and long hours spent indoors.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-6">
              Property Masters provides Wellness Services designed to support healthier living and working spaces. These services focus on reducing indoor pollutants, improving cleanliness standards, and creating environments that are safer and more comfortable for daily use.
            </p>
          </motion.div>
        </div>
      </section>

      {/* OUR APPROACH TO WELLNESS */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-approach">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              Our Approach to Wellness
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Wellness services are most effective when they are preventive, structured, and based on real environmental needs rather than trends.
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
            Each wellness service is designed to integrate seamlessly into existing homes and properties without unnecessary disruption.
          </motion.p>
        </div>
      </section>

      {/* WHAT OUR WELLNESS SERVICES COVER */}
      <section className="py-20 bg-white" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              What Our Wellness Services Cover
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Property Masters offers a range of wellness services that address different aspects of indoor and environmental health. Each service is explained in detail on its own dedicated page.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wellnessServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <Card className="h-full border-0 shadow-lg hover-elevate cursor-pointer group" data-testid={`card-service-${index}`}>
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-[#970A44]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#970A44]/20 transition-colors">
                        <service.icon className="w-8 h-8 text-[#970A44]" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-[#09263D] group-hover:text-[#970A44] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
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
            Each service is structured to address a specific wellness concern while contributing to overall environmental comfort.
          </motion.p>
        </div>
      </section>

      {/* WHY WELLNESS SERVICES MATTER IN DUBAI */}
      <section className="py-20 bg-[#09263D]" data-testid="section-why-matters">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-white">
              Why Wellness Services Matter in Dubai
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Dubai's climate, combined with modern building designs, often leads to unique challenges that require specialized wellness solutions.
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
            Wellness services help counter these challenges by improving indoor conditions and supporting healthier daily living.
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
              Our wellness services are suitable for a variety of clients and property types across Dubai.
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
            Each project is approached with attention to specific needs and usage patterns.
          </motion.p>
        </div>
      </section>

      {/* HOW WELLNESS PROJECTS ARE HANDLED */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              How Wellness Projects Are Handled
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our process is simple and structured to ensure wellness services deliver meaningful and lasting results.
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

      {/* EXPLORE OUR WELLNESS SERVICES */}
      <section className="py-16 bg-white" data-testid="section-explore">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-serif text-[#09263D]">
              Explore Our Wellness Services
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Each wellness service is explained in detail on its dedicated page, allowing you to explore solutions that are relevant to your property.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {wellnessServices.map((service) => (
                <Link key={service.id} href={service.href}>
                  <Button variant="outline" className="rounded-full" data-testid={`button-explore-${service.id}`}>
                    {service.title}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-[#970A44]" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-white">
              Looking to Improve Wellness and Comfort in Your Property?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Property Masters can help you create a healthier indoor environment through practical, well-planned wellness services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-white text-[#970A44] hover:bg-white/90 font-semibold rounded-full shadow-xl"
                data-testid="button-cta-consult"
              >
                <Link href="/contact">
                  Request Free Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full"
                data-testid="button-cta-call"
              >
                <Link href="/contact">
                  <ClipboardCheck className="mr-2 w-4 h-4" />
                  Schedule Assessment
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
