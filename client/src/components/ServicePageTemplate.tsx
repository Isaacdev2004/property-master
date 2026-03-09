import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft,
  Check,
  Phone,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export interface ServiceData {
  title: string;
  tagline: string;
  description: string;
  icon: any;
  color: string;
  heroImage: string;
  category: "interior" | "wellness" | "maintenance";
  categoryLabel: string;
  features: string[];
  benefits: { icon: any; title: string; description: string }[];
  process: { step: number; title: string; description: string }[];
  pricing: { name: string; price: string; features: string[] }[];
  faqs: { question: string; answer: string }[];
  relatedServices?: { name: string; slug: string }[];
}

interface ServicePageTemplateProps {
  service: ServiceData;
  backLink: string;
  backLabel: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export default function ServicePageTemplate({ service, backLink, backLabel }: ServicePageTemplateProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const ServiceIcon = service.icon;

  return (
    <div className="min-h-screen" data-testid="service-page">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center" data-testid="section-hero">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/80 to-[#1A1A1A]/60" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-12 md:pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 md:mb-8"
          >
            <Link href={backLink} className="inline-flex items-center text-white/70 hover:text-white transition-colors" data-testid="link-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm">{backLabel}</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className={`inline-flex items-center gap-2 ${service.color} rounded-full px-4 py-2 mb-4 md:mb-6`}>
              <ServiceIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
              <span className="text-xs md:text-sm font-semibold text-white uppercase tracking-wider">
                {service.categoryLabel}
              </span>
            </div>
            
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4"
              style={{ fontFamily: "'Inter', Georgia, serif" }}
              data-testid="heading-title"
            >
              {service.title}
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-8 px-4">
              {service.tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button 
                asChild 
                size="lg"
                className="bg-[#CD9342] text-white rounded-full px-6 md:px-8 w-full sm:w-auto"
                data-testid="button-book-service"
              >
                <Link href="/book">
                  Book This Service
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white rounded-full px-6 md:px-8 w-full sm:w-auto backdrop-blur-sm"
                data-testid="button-call"
              >
                <a href="tel:+971585707110">
                  <Phone className="mr-2 w-4 h-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About This Service Section */}
      <section className="py-12 md:py-20 bg-[#FAFAFA]" data-testid="section-about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-4 md:mb-6"
                style={{ fontFamily: "'Inter', Georgia, serif" }}
              >
                About This Service
              </h2>
              <p className="text-[#1A1A1A]/70 text-base md:text-lg leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.slice(0, 6).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#CD9342] flex-shrink-0 mt-0.5" />
                    <span className="text-[#1A1A1A]/80 text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              {...fadeInUp}
              className="grid grid-cols-2 gap-3 md:gap-4"
            >
              {service.benefits.slice(0, 4).map((benefit, index) => (
                <Card 
                  key={index} 
                  className="border-0 bg-white shadow-lg hover-elevate"
                  data-testid={`card-benefit-${index}`}
                >
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className={`w-10 h-10 md:w-12 md:h-12 ${service.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-[#1A1A1A] text-sm md:text-base mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-[#1A1A1A]/60 text-xs md:text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-20 bg-white" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-10 md:mb-16">
            <p className="text-[#CD9342] font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-3">
              How It Works
            </p>
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A]"
              style={{ fontFamily: "'Inter', Georgia, serif" }}
            >
              Our Process
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {service.process.map((step, index) => (
              <motion.div 
                key={step.step} 
                variants={staggerItem}
                className="text-center"
                data-testid={`step-${step.step}`}
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-xl md:text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A] mb-2">{step.title}</h3>
                <p className="text-[#1A1A1A]/60 text-sm md:text-base">{step.description}</p>
                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 w-12 h-0.5 bg-[#CD9342]/20" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 md:py-20 bg-[#FAFAFA]" data-testid="section-pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-10 md:mb-16">
            <p className="text-[#CD9342] font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-3">
              Transparent Pricing
            </p>
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A]"
              style={{ fontFamily: "'Inter', Georgia, serif" }}
            >
              Service Packages
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
          >
            {service.pricing.map((pkg, index) => (
              <motion.div key={pkg.name} variants={staggerItem}>
                <Card 
                  className={`border-0 h-full ${
                    index === 1 
                      ? 'bg-gradient-to-br from-[#CD9342] to-[#A67A2E] text-white shadow-2xl scale-100 lg:scale-105' 
                      : 'bg-white shadow-xl'
                  }`}
                  data-testid={`card-pricing-${index}`}
                >
                  <CardContent className="p-6 md:p-8">
                    <h3 className={`text-lg md:text-xl font-bold mb-2 ${index === 1 ? 'text-white' : 'text-[#1A1A1A]'}`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-2xl md:text-3xl font-bold mb-6 ${index === 1 ? 'text-white' : 'text-[#CD9342]'}`}>
                      {pkg.price}
                    </p>
                    <ul className="space-y-3 mb-6 md:mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Check className={`w-4 h-4 flex-shrink-0 ${index === 1 ? 'text-white' : 'text-[#CD9342]'}`} />
                          <span className={index === 1 ? 'text-white/90' : 'text-[#1A1A1A]/80'}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild
                      className={`w-full rounded-full ${
                        index === 1 
                          ? 'bg-white text-[#CD9342]' 
                          : 'bg-[#CD9342] text-white'
                      }`}
                      data-testid={`button-select-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Link href="/book">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-[#1A1A1A]" data-testid="section-faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-10 md:mb-16">
            <p className="text-[#CD9342] font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-3">
              FAQ
            </p>
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white"
              style={{ fontFamily: "'Inter', Georgia, serif" }}
            >
              Common Questions
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {service.faqs.map((faq, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card 
                  className="border-0 bg-white/5 backdrop-blur overflow-hidden"
                  data-testid={`card-faq-${index}`}
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-4 md:p-6 text-left flex items-center justify-between gap-4"
                      data-testid={`button-faq-toggle-${index}`}
                    >
                      <h3 className="text-base md:text-lg font-bold text-white pr-4">{faq.question}</h3>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-[#CD9342] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#CD9342] flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 md:px-6 pb-4 md:pb-6"
                      >
                        <p className="text-white/70 text-sm md:text-base">{faq.answer}</p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Related Services Section */}
      {service.relatedServices && service.relatedServices.length > 0 && (
        <section className="py-12 md:py-20 bg-[#FAFAFA]" data-testid="section-related">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-10 md:mb-12">
              <h2 
                className="text-2xl md:text-3xl font-bold text-[#1A1A1A]"
                style={{ fontFamily: "'Inter', Georgia, serif" }}
              >
                Related Services
              </h2>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 md:gap-4"
            >
              {service.relatedServices.map((related, index) => (
                <motion.div key={related.slug} variants={staggerItem}>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#CD9342]/30 text-[#CD9342] rounded-full"
                    data-testid={`link-related-${index}`}
                  >
                    <Link href={`/${service.category}/${related.slug}`}>
                      {related.name}
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-[#CD9342] to-[#A67A2E]" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6"
              style={{ fontFamily: "'Inter', Georgia, serif" }}
            >
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Book your {service.title.toLowerCase()} today and experience the Property Masters difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-white text-[#CD9342] rounded-full px-8 md:px-10 py-6 md:py-7 text-base md:text-lg shadow-2xl"
                data-testid="button-cta-book"
              >
                <Link href="/book">
                  Book Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-white/50 text-white rounded-full px-8 md:px-10 py-6 md:py-7 text-base md:text-lg backdrop-blur-sm"
                data-testid="button-cta-call"
              >
                <a href="tel:+971585707110">
                  <Phone className="mr-2 w-5 h-5" />
                  +971 585 707 110
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
