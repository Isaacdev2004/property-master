import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Award, Users, CheckCircle2, Clock, Heart, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/generated_images/luxury_living_room_hero_1b740bbd.png";
import StickyScrollServices from "@/components/StickyScrollServices";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
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
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-visible pb-16">
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
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1, 
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.2
            }}
            className="max-w-3xl mx-auto lg:mx-0"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl leading-tight font-bold text-white mb-6 font-serif tracking-tight"
            >
              Your Complete Property Solutions Partner
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl leading-relaxed font-light text-white/90 mb-10 max-w-2xl"
            >
              From interior design to wellness facilities and maintenance - we master every aspect of your property needs.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Button 
                asChild 
                className="bg-[#970A44] hover:bg-[#720632] text-white font-semibold rounded-full px-12 py-6 text-base h-auto shadow-xl"
                data-testid="button-hero-consultation"
              >
                <Link href="/contact">
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 h-12" data-testid="badge-emi">
                <svg className="w-5 h-5 text-[#970A44]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-white">Low Cost EMI</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Statistics Pill - Centered at bottom of hero */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute bottom-0 inset-x-0 z-20 flex justify-center px-4"
        >
          <div 
            className="bg-white rounded-full shadow-2xl py-3 px-6 md:px-8 inline-flex items-center gap-4 md:gap-6"
            data-testid="stats-pill"
          >
            {/* Stat 1: Projects */}
            <div className="flex items-center gap-2 px-2">
              <svg className="w-5 h-5 text-[#970A44] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div>
                <p className="text-lg font-bold text-[#970A44] leading-tight">5000+</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Projects Completed</p>
              </div>
            </div>
            
            <div className="w-px h-10 bg-[#970A44]/30"></div>
            
            {/* Stat 2: Experts */}
            <div className="flex items-center gap-2 px-2">
              <svg className="w-5 h-5 text-[#970A44] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <p className="text-lg font-bold text-[#970A44] leading-tight">200+</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Property Experts</p>
              </div>
            </div>
            
            <div className="w-px h-10 bg-[#970A44]/30"></div>
            
            {/* Stat 3: Cities */}
            <div className="flex items-center gap-2 px-2">
              <svg className="w-5 h-5 text-[#970A44] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-lg font-bold text-[#970A44] leading-tight">10 Cities</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">2 Countries</p>
              </div>
            </div>
            
            <div className="w-px h-10 bg-[#970A44]/30"></div>
            
            {/* Stat 4: Services */}
            <div className="flex items-center gap-2 px-2">
              <svg className="w-5 h-5 text-[#970A44] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <div>
                <p className="text-lg font-bold text-[#970A44] leading-tight">3 Services</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">All Property Needs</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Real Stories, Real Results - Testimonials Marquee */}
      <TestimonialsMarquee />

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
