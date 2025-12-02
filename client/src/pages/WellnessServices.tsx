import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Heart,
  Dumbbell,
  Waves,
  Leaf,
  Sun,
  Moon,
  Sparkles,
  Play,
  CheckCircle2,
  ShieldCheck,
  Award,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const wellnessServices = [
  {
    id: 1,
    title: "Home Gym Design",
    subtitle: "Your personal fitness sanctuary",
    description: "Transform any space into a fully-equipped personal fitness sanctuary with premium equipment and motivating aesthetics.",
    longDescription: "Our expert designers create custom home gym layouts that maximize your space while providing a professional training environment. From cardio zones to strength training areas, we design spaces that inspire you to achieve your fitness goals.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    icon: Dumbbell,
  },
  {
    id: 2,
    title: "Spa & Sauna Installation",
    subtitle: "Your private wellness retreat",
    description: "Create your private retreat with luxury spa facilities, steam rooms, and Finnish saunas for ultimate relaxation.",
    longDescription: "Experience the pinnacle of relaxation with our bespoke spa installations. We design and install premium saunas, steam rooms, and jacuzzis that transform your home into a five-star wellness destination.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    icon: Waves,
  },
  {
    id: 3,
    title: "Yoga & Meditation Rooms",
    subtitle: "Spaces for mindful living",
    description: "Design tranquil spaces dedicated to mindfulness, yoga practice, and spiritual well-being with calming aesthetics.",
    longDescription: "Our yoga and meditation room designs incorporate natural elements, proper acoustics, and serene lighting to create the perfect environment for your mindfulness practice. Every detail is considered to promote peace and tranquility.",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
    icon: Leaf,
  },
  {
    id: 4,
    title: "Pool & Outdoor Wellness",
    subtitle: "Luxury outdoor living",
    description: "Design stunning pool areas and outdoor wellness spaces that blend luxury with natural elements.",
    longDescription: "From infinity pools to outdoor spas, we create breathtaking outdoor wellness spaces that seamlessly integrate with your property's landscape. Experience resort-style living in your own backyard.",
    image: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=800&q=80",
    icon: Sun,
  },
  {
    id: 5,
    title: "Sleep Wellness Rooms",
    subtitle: "Optimized rest & recovery",
    description: "Optimize your bedroom environment for restorative sleep with specialized lighting, acoustics, and climate control.",
    longDescription: "Quality sleep is essential for overall wellness. Our sleep wellness rooms feature advanced blackout systems, sound insulation, air purification, and smart climate control to ensure you wake up refreshed and rejuvenated.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    icon: Moon,
  },
  {
    id: 6,
    title: "Wellness Consulting",
    subtitle: "Holistic wellness planning",
    description: "Comprehensive wellness space planning and consultation to create holistic health environments in your property.",
    longDescription: "Our certified wellness consultants work with you to assess your lifestyle, health goals, and available space to create a comprehensive wellness plan tailored to your unique needs.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    icon: Sparkles,
  },
];

const qualityCertifications = [
  { 
    title: "ISO Certified", 
    description: "International quality standards",
    icon: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80"
  },
  { 
    title: "Health Approved", 
    description: "Dubai Health Authority compliant",
    icon: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80"
  },
  { 
    title: "Made in UAE", 
    description: "Premium local craftsmanship",
    icon: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80"
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function WellnessServices() {
  return (
    <div className="min-h-screen bg-[#F6F4EB]">
      {/* Hero Section - Matching HealthyHome Style */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#F6F4EB] to-white" data-testid="section-hero">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif text-[#09263D]">
              Welcome to <span className="text-[#970A44]">Wellness by Property Masters,</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl">and a healthier, happier you.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Make your home the center of your health with professionally designed wellness spaces that make you feel your best.
            </p>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-center text-[#970A44] font-semibold mb-6 text-lg">
              Watch Now to Learn More!
            </p>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer" data-testid="video-thumbnail">
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80"
                alt="Wellness Video Thumbnail"
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all group-hover:bg-black/40">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-xl"
                  data-testid="button-play-video"
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-[#970A44] ml-1" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Sections - Alternating Layout Like HealthyHome */}
      {wellnessServices.map((service, index) => {
        const Icon = service.icon;
        const isReversed = index % 2 === 1;
        
        return (
          <section 
            key={service.id}
            className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F6F4EB]'}`}
            data-testid={`section-service-${service.id}`}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div className="relative">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[350px] md:h-[450px] object-cover rounded-2xl shadow-xl"
                    />
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#970A44]/10 rounded-2xl -z-10"></div>
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#1C4668]/10 rounded-xl -z-10"></div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#970A44]/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#970A44]" />
                    </div>
                    <span className="text-sm font-medium text-[#970A44] uppercase tracking-wider">
                      {service.subtitle}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
                    {service.title}
                  </h2>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    <strong className="text-[#09263D]">{service.title}</strong> {service.longDescription}
                  </p>
                  
                  <Button 
                    asChild
                    className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-8"
                    data-testid={`button-learn-more-${service.id}`}
                  >
                    <Link href="/contact">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Quality Counts Section */}
      <section className="py-24 bg-[#09263D]" data-testid="section-quality">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">
              Quality Counts
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              We maintain the highest standards in every wellness space we create
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="text-center" data-testid="quality-iso">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">ISO Certified</h3>
              <p className="text-white/60">International quality standards</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center" data-testid="quality-health">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Health Approved</h3>
              <p className="text-white/60">Dubai Health Authority compliant</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center" data-testid="quality-uae">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Made in UAE</h3>
              <p className="text-white/60">Premium local craftsmanship</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white" data-testid="section-benefits">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D] mb-4">
              Why Choose <span className="text-[#970A44]">Our Wellness Services?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the difference with our dedicated wellness design experts
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: Heart, title: "Health-Focused Design", description: "Every element designed to enhance your physical and mental well-being" },
              { icon: ShieldCheck, title: "Premium Materials", description: "Only the finest, health-safe materials used in all installations" },
              { icon: Building2, title: "Expert Team", description: "Certified wellness designers and installation specialists" },
              { icon: CheckCircle2, title: "Timely Delivery", description: "Projects completed on schedule without compromising quality" },
              { icon: Award, title: "5-Year Warranty", description: "Comprehensive warranty on all wellness installations" },
              { icon: Sparkles, title: "Aftercare Support", description: "Ongoing maintenance and support for your wellness spaces" },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full border-0 shadow-lg hover-elevate" data-testid={`benefit-card-${index}`}>
                    <CardContent className="p-8">
                      <div className="w-14 h-14 bg-[#970A44]/10 rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-7 h-7 text-[#970A44]" />
                      </div>
                      <h3 className="font-bold text-lg mb-3 text-[#09263D]">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#970A44]" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-6">
              Ready to Transform Your Home?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Start your journey to a healthier lifestyle with our expert wellness space design team. Book your free consultation today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-white text-[#970A44] hover:bg-gray-100 rounded-full px-8"
                data-testid="button-cta-consultation"
              >
                <Link href="/contact">
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-8"
                data-testid="button-cta-portfolio"
              >
                <Link href="/portfolio">
                  View Our Work
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#F6F4EB]" data-testid="section-testimonials">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D] mb-4">
              What Our Clients <span className="text-[#970A44]">Say</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from homeowners who transformed their spaces with our wellness solutions
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Sarah Al-Maktoum",
                role: "Villa Owner, Palm Jumeirah",
                content: "Property Masters transformed our basement into a stunning home spa. The attention to detail and quality of work exceeded our expectations. It's now our favorite space in the house.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
              },
              {
                name: "Ahmed Hassan",
                role: "CEO, Hassan Holdings",
                content: "The home gym they designed is world-class. Professional equipment layout, perfect lighting, and motivating atmosphere. Best investment I've made for my health.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
              },
              {
                name: "Dr. Fatima Rashid",
                role: "Wellness Coach",
                content: "As a wellness professional, I'm very particular about space design. Property Masters created a yoga studio that perfectly balances functionality with tranquility.",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg bg-white" data-testid={`testimonial-card-${index}`}>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-[#09263D]">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white" data-testid="section-contact">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D] mb-6">
              Start Your Wellness Journey
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Contact us today to discuss your wellness space requirements
            </p>
            
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Your Name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#970A44] focus:border-transparent"
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Your Email"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#970A44] focus:border-transparent"
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#970A44] focus:border-transparent"
                      data-testid="input-phone"
                    />
                  </div>
                  <div>
                    <select 
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#970A44] focus:border-transparent text-muted-foreground"
                      data-testid="select-service"
                    >
                      <option value="">Select Wellness Service</option>
                      <option value="gym">Home Gym Design</option>
                      <option value="spa">Spa & Sauna Installation</option>
                      <option value="yoga">Yoga & Meditation Rooms</option>
                      <option value="pool">Pool & Outdoor Wellness</option>
                      <option value="sleep">Sleep Wellness Rooms</option>
                      <option value="consulting">Wellness Consulting</option>
                    </select>
                  </div>
                  <div>
                    <textarea 
                      placeholder="Tell us about your wellness goals..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#970A44] focus:border-transparent resize-none"
                      data-testid="textarea-message"
                    />
                  </div>
                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-[#970A44] hover:bg-[#720632] text-white rounded-full"
                    data-testid="button-submit-form"
                  >
                    Get Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
