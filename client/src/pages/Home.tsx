import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Award, Users, CheckCircle2, Clock, Heart, BadgeCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/generated_images/luxury_living_room_hero_1b740bbd.png";
import StickyScrollServices from "@/components/StickyScrollServices";
import SignatureSpacesShowcase from "@/components/SignatureSpacesShowcase";
import ServiceCardsSlider from "@/components/ServiceCardsSlider";
import ListenToCustomers from "@/components/ListenToCustomers";
import BlogSection from "@/components/BlogSection";

// Enhanced animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true, amount: 0.2 }
};

// Compact testimonials for hero section
const testimonialsCompact = [
  {
    name: "Sarah Al-Mansouri",
    role: "Homeowner, Dubai Marina",
    content: "The Property Masters transformed our apartment into a stunning modern sanctuary. Their attention to detail exceeded all expectations!",
  },
  {
    name: "Dr. Ahmed Khalid",
    role: "Wellness Center Owner",
    content: "They designed and built our spa facility from concept to completion. The wellness spaces are serene and our clients love the ambiance!",
  },
  {
    name: "Robert Chen",
    role: "Property Manager",
    content: "Outstanding maintenance services! Their team keeps all our properties in perfect condition with quick response times.",
  },
  {
    name: "Fatima Al-Hashimi",
    role: "Restaurant Owner",
    content: "From complete interior fit-out to ongoing maintenance, they handle everything seamlessly. Our restaurant looks stunning!",
  },
  {
    name: "James Wilson",
    role: "Villa Owner, Palm Jumeirah",
    content: "Their wellness consultation helped us create a home gym and yoga studio that's both beautiful and functional.",
  },
  {
    name: "Layla Mohammed",
    role: "Office Manager, DIFC",
    content: "Professional office fit-out with modern design. They completed our 10,000 sq ft space ahead of schedule!",
  },
  {
    name: "Marco Rossi",
    role: "Hotel Manager",
    content: "Their team handles all our property maintenance needs efficiently. From HVAC to plumbing, they're our trusted partner.",
  },
  {
    name: "Aisha Rahman",
    role: "Homeowner, Arabian Ranches",
    content: "We hired them for a complete home renovation. The result is breathtaking! Our home is now a perfect sanctuary.",
  },
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

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero + Reviews Section - 100vh combined for instant trust */}
      <div className="h-screen flex flex-col">
        {/* Hero Section - Takes ~60% of viewport */}
        <section className="relative flex-[6] flex items-center justify-center overflow-hidden">
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
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 w-full text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="max-w-3xl mx-auto lg:mx-0"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl leading-tight font-bold text-white mb-4 font-serif tracking-tight"
              >
                Your Complete Property Solutions Partner
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl leading-relaxed font-light text-white/90 mb-6 max-w-2xl"
              >
                From interior design to wellness facilities and maintenance - we master every aspect of your property needs.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
              >
                <Button 
                  asChild 
                  className="bg-[#970A44] hover:bg-[#720632] text-white font-semibold rounded-full px-8 py-5 text-sm h-auto shadow-xl"
                  data-testid="button-hero-consultation"
                >
                  <Link href="/contact">
                    Book Free Consultation
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full px-5 py-2.5" data-testid="badge-emi">
                  <svg className="w-4 h-4 text-[#970A44]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-white">Low Cost EMI</span>
                </div>
              </motion.div>

              {/* Statistics Inline */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8"
                data-testid="stats-inline"
              >
                <div className="text-center lg:text-left">
                  <p className="text-2xl md:text-3xl font-bold text-white">5000+</p>
                  <p className="text-xs text-white/70 uppercase tracking-wide">Projects</p>
                </div>
                <div className="w-px h-10 bg-white/30 hidden md:block"></div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl md:text-3xl font-bold text-white">200+</p>
                  <p className="text-xs text-white/70 uppercase tracking-wide">Experts</p>
                </div>
                <div className="w-px h-10 bg-white/30 hidden md:block"></div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl md:text-3xl font-bold text-white">10 Cities</p>
                  <p className="text-xs text-white/70 uppercase tracking-wide">2 Countries</p>
                </div>
                <div className="w-px h-10 bg-white/30 hidden md:block"></div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl md:text-3xl font-bold text-white">15+ Years</p>
                  <p className="text-xs text-white/70 uppercase tracking-wide">Experience</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Compact Testimonials Section - Takes ~40% of viewport */}
        <section className="flex-[4] bg-gradient-to-b from-muted/50 to-background overflow-hidden flex flex-col justify-center py-6">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <p className="text-xs uppercase tracking-wider text-[#970A44] font-semibold mb-1">
                Trusted by 5000+ Happy Clients
              </p>
              <h2 className="text-2xl md:text-3xl font-bold font-serif">
                Real Stories. Real Results.
              </h2>
            </motion.div>
          </div>

          {/* Single Row Marquee */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="relative"
          >
            <motion.div
              className="flex gap-4"
              animate={{
                x: [0, -(320 + 16) * 8],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 35,
                  ease: "linear",
                },
              }}
            >
              {[...testimonialsCompact, ...testimonialsCompact].map((testimonial, index) => (
                <div
                  key={`compact-${index}`}
                  className="flex-shrink-0 w-[320px] bg-white rounded-xl shadow-md border border-primary/5 p-4"
                  data-testid={`testimonial-compact-${index}`}
                >
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#970A44] text-[#970A44]" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#970A44] to-[#720632] flex items-center justify-center text-white font-bold text-xs">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* Sticky Scroll Services Section */}
      <StickyScrollServices />

      {/* Service Cards Slider - 2x2 Grid */}
      <ServiceCardsSlider />

      {/* Signature Spaces Showcase */}
      <SignatureSpacesShowcase />

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              Why Choose The Property Masters?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Dubai's most trusted property solutions provider with comprehensive services across design, wellness, and maintenance
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
          >
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeInScale}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  data-testid={`why-choose-${index}`}
                >
                  <Card className="h-full hover-elevate border-primary/5 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#970A44]/10 flex items-center justify-center" 
                          data-testid={`why-choose-icon-${index}`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className="w-6 h-6 text-[#970A44]" />
                        </motion.div>
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
          </motion.div>
        </div>
      </section>

      {/* Listen to Our Customers */}
      <ListenToCustomers />

      {/* Blog Section */}
      <BlogSection />

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
