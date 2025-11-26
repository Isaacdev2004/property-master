import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Award, Users, CheckCircle2, Clock, Heart, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/generated_images/luxury_living_room_hero_1b740bbd.png";
import StickyScrollServices from "@/components/StickyScrollServices";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import SignatureSpacesShowcase from "@/components/SignatureSpacesShowcase";
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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
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
                className="bg-[#D7A144] hover:bg-[#C69136] text-white font-semibold rounded-full px-12 py-6 text-base h-auto shadow-xl"
                data-testid="button-hero-consultation"
              >
                <Link href="/contact">
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 h-12" data-testid="badge-emi">
                <svg className="w-5 h-5 text-[#D7A144]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-white">Low Cost EMI</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Real Stories, Real Results - Testimonials Marquee */}
      <TestimonialsMarquee />

      {/* Sticky Scroll Services Section */}
      <StickyScrollServices />

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
                          className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#D7A144]/10 flex items-center justify-center" 
                          data-testid={`why-choose-icon-${index}`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className="w-6 h-6 text-[#D7A144]" />
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
