import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Award, Users, CheckCircle2, Clock, Heart, BadgeCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/generated_images/luxury_living_room_hero_1b740bbd.jpg";
import heroImageMobile from "@assets/generated_images/luxury_living_room_hero_mobile.jpg";
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
      {/* Hero + Reviews Section */}
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="relative flex-1 lg:flex-[6] flex items-end lg:items-center overflow-hidden pb-6 lg:pb-0">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImage} 
              srcSet={`${heroImageMobile} 800w, ${heroImage} 1408w`}
              sizes="100vw"
              alt="Luxury interior design" 
              className="w-full h-full object-cover"
              decoding="async"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          </div>

          {/* Hero Content - Two Column Layout */}
          <div className="relative z-10 w-full pt-20 md:pt-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
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
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-white mb-2 sm:mb-3"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Your Complete Property Solutions Partner
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90 mb-3 sm:mb-4"
                  >
                    Interior Design • Wellness Facilities • Property Maintenance
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
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
                    <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2" data-testid="badge-emi">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-white">Low Cost EMI</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Column - Statistics Grid */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="grid grid-cols-2 gap-2 sm:gap-3 mt-2 lg:mt-0"
                  data-testid="stats-grid"
                >
                  {[
                    { value: "5000+", label: "Projects Completed", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                    { value: "200+", label: "Property Experts", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                    { value: "15+", label: "Years Experience", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                    { value: "10", label: "Cities Served", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-2.5 sm:p-4 text-center"
                    >
                      <div className="flex justify-center mb-1 sm:mb-2">
                        <div className="w-7 h-7 sm:w-10 sm:h-10 bg-[#970A44] rounded-lg flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                          </svg>
                        </div>
                      </div>
                      <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                      <p className="text-[9px] sm:text-xs text-white/80 uppercase tracking-wide leading-tight">{stat.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Testimonials Section - Takes ~40% of viewport */}
        <section className="flex-[4] bg-gradient-to-b from-muted/50 to-background overflow-hidden flex flex-col justify-center py-3 sm:py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <p className="text-xs uppercase tracking-wider text-[#970A44] font-semibold mb-1">
                Trusted by 5000+ Happy Clients
              </p>
              <h2 className="text-xl md:text-2xl font-bold font-serif">
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
                x: [0, -(300 + 16) * 8],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...testimonialsCompact, ...testimonialsCompact].map((testimonial, index) => (
                <div
                  key={`compact-${index}`}
                  className="flex-shrink-0 w-[300px] bg-white rounded-xl shadow-md border border-primary/5 p-3"
                  data-testid={`testimonial-compact-${index}`}
                >
                  <div className="flex gap-0.5 mb-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#970A44] text-[#970A44]" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug mb-2 line-clamp-2">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#970A44] to-[#720632] flex items-center justify-center text-white font-bold text-[10px]">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-[10px] text-muted-foreground">{testimonial.role}</p>
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
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-serif">
              Why Choose The Property Masters?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
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
      <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-serif">
              Ready to Transform Your Space?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto" data-testid="text-cta-description">
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
