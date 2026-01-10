import { motion } from "framer-motion";
import { Building2, Users, Award, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import aboutHeroImage from "@assets/stock_images/professional_design__a5c51df4.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stats = [
  { icon: Users, label: "Happy Clients", value: "500+" },
  { icon: Building2, label: "Projects Completed", value: "1,000+" },
  { icon: Award, label: "Years of Excellence", value: "15+" },
  { icon: Target, label: "Satisfaction Rate", value: "98%" },
];

const values = [
  {
    title: "Excellence",
    description: "We strive for perfection in every project, ensuring the highest standards of quality and craftsmanship.",
  },
  {
    title: "Innovation",
    description: "Embracing cutting-edge design trends and technologies to create spaces that inspire and function beautifully.",
  },
  {
    title: "Integrity",
    description: "Building trust through transparency, honesty, and ethical business practices in all our relationships.",
  },
  {
    title: "Customer-Centric",
    description: "Your vision and satisfaction are at the heart of everything we do, from concept to completion.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Professional Two-Column Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={aboutHeroImage}
            alt="About The Property Masters"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
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
                  Established 2009 in Dubai
                </motion.p>
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-white mb-4 font-serif"
                >
                  About The Property Masters
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-base md:text-lg leading-relaxed text-white/90 mb-6"
                >
                  Transforming spaces and enriching lives through exceptional design and dedicated service. We specialize in Interior Design, Wellness Services, and Property Maintenance across the UAE.
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
                      Meet Our Team
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">15+ Years Excellence</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Statistics Grid */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid grid-cols-2 gap-3"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
                  >
                    <div className="flex justify-center mb-2">
                      <div className="w-10 h-10 bg-[#970A44] rounded-lg flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-white" />
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

      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold mb-6 font-[Montserrat]">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in Dubai in 2009, The Property Masters began with a simple vision: to create beautiful, 
                functional spaces that enhance the way people live and work. What started as a small interior 
                design studio has grown into a comprehensive property solutions company serving clients across 
                the UAE.
              </p>
              <p>
                Today, we specialize in three core areas: Interior Design & Fit-Out Works, Wellness Services, 
                and Maintenance Services. Our integrated approach allows us to deliver complete solutions that 
                not only look exceptional but also function flawlessly for years to come.
              </p>
              <p>
                With over 1,000 completed projects and a team of experienced professionals, we continue to push 
                the boundaries of design excellence while maintaining the personalized service that has been our 
                hallmark since day one.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center hover-elevate">
                <stat.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold mb-2 font-[Montserrat]">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </motion.div>
        </div>

        <motion.div {...fadeInUp} className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center font-[Montserrat]">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="p-6 h-full hover-elevate">
                  <h3 className="text-xl font-bold mb-3 text-primary font-[Montserrat]">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeInUp} className="text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4 font-[Montserrat]">Why Choose Us?</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            We combine creative excellence with technical expertise and unwavering commitment to quality. 
            Our comprehensive services, from initial design concepts to ongoing maintenance, ensure your 
            space remains beautiful and functional for years to come. With a proven track record of 
            successful projects and satisfied clients, we're your trusted partner in creating exceptional 
            environments.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-background px-4 py-2 rounded-full">Licensed & Insured</div>
            <div className="bg-background px-4 py-2 rounded-full">Experienced Team</div>
            <div className="bg-background px-4 py-2 rounded-full">Quality Guaranteed</div>
            <div className="bg-background px-4 py-2 rounded-full">On-Time Delivery</div>
            <div className="bg-background px-4 py-2 rounded-full">Competitive Pricing</div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
