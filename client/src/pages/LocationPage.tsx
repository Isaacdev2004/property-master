import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Phone, MapPin, Check, ChevronDown, ChevronUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import type { LocationPage as LocationPageType } from "@shared/schema";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

export default function LocationPage() {
  const [, params] = useRoute("/location/:slug");
  const slug = params?.slug;
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const { data: page, isLoading, error } = useQuery<LocationPageType>({
    queryKey: ["/api/location-pages", slug],
    queryFn: async () => {
      const res = await fetch(`/api/location-pages/${slug}`);
      if (!res.ok) throw new Error("Location page not found");
      return res.json();
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (page) {
      document.title = page.metaTitle || `${page.serviceName ? page.serviceName + " in " : ""}${page.location} | The Property Masters`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", page.metaDescription || page.description);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = page.metaDescription || page.description;
        document.head.appendChild(meta);
      }
    }
  }, [page]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F4EB]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#970A44]" />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6F4EB] px-4">
        <h1 className="text-3xl font-bold text-[#09263D] mb-4">Location Not Found</h1>
        <p className="text-[#09263D]/70 mb-8">The location page you're looking for doesn't exist.</p>
        <Button asChild className="bg-[#970A44]">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  const pageTitle = page.serviceName ? `${page.serviceName} in ${page.location}` : page.location;

  return (
    <div className="min-h-screen" data-testid="location-page">
      {page.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: page.schema }}
        />
      )}

      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center" data-testid="section-hero">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: page.heroImage ? `url(${page.heroImage})` : "linear-gradient(to right, #09263D, #1C4668)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#09263D]/95 via-[#09263D]/80 to-[#09263D]/60" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-12 md:pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 md:mb-8"
          >
            <Link href="/services" className="inline-flex items-center text-white/70 hover:text-white transition-colors" data-testid="link-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm">All Services</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-[#970A44] rounded-full px-4 py-2 mb-4 md:mb-6">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white" />
              <span className="text-xs md:text-sm font-semibold text-white uppercase tracking-wider">
                {page.location}
              </span>
            </div>
            
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              data-testid="heading-h1"
            >
              {page.h1}
            </h1>
            
            {page.h2 && (
              <h2 className="text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-8 px-4" data-testid="heading-h2">
                {page.h2}
              </h2>
            )}
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button 
                asChild 
                size="lg"
                className="bg-[#970A44] text-white rounded-full px-6 md:px-8 w-full sm:w-auto"
                data-testid="button-book"
              >
                <Link href="/book">
                  Book a Service
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

      <section className="py-12 md:py-20 bg-[#F6F4EB]" data-testid="section-description">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#09263D] mb-4 md:mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {page.serviceName ? `${page.serviceName} Services in ${page.location}` : `Services in ${page.location}`}
              </h2>
              <p className="text-[#09263D]/70 text-base md:text-lg leading-relaxed mb-6">
                {page.description}
              </p>
              <Button asChild className="bg-[#970A44] rounded-full" data-testid="button-explore">
                <Link href="/contact">
                  Get Free Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div {...fadeInUp} className="grid grid-cols-2 gap-4">
              {(page.serviceFeatures && page.serviceFeatures.length > 0 
                ? page.serviceFeatures.slice(0, 4) 
                : ["Interior Design", "AC Maintenance", "Wellness Services", "Property Care"]
              ).map((feature, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#970A44]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[#970A44]" />
                    </div>
                    <span className="text-sm font-medium text-[#09263D]">{feature}</span>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {page.serviceFeatures && page.serviceFeatures.length > 4 && (
        <section className="py-12 md:py-20 bg-white" data-testid="section-features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-10 md:mb-16">
              <p className="text-[#970A44] font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-3">
                What We Offer
              </p>
              <h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#09263D]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Our {page.serviceName || "Service"} Features
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.serviceFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-[#F6F4EB] border-none h-full">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#970A44]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-5 h-5 text-[#970A44]" />
                      </div>
                      <span className="text-[#09263D] font-medium">{feature}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-20 bg-white" data-testid="section-content">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp}>
            <div 
              className="prose prose-lg max-w-none text-[#09263D]/80"
              dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, "<br />") }}
            />
          </motion.div>
        </div>
      </section>

      {page.processSteps && page.processSteps.length > 0 && (
        <section className="py-12 md:py-20 bg-[#F6F4EB]" data-testid="section-process">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-10 md:mb-16">
              <p className="text-[#970A44] font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-3">
                How It Works
              </p>
              <h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#09263D]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Our Process
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {page.processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Card className="bg-white h-full text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-full bg-[#970A44] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                        {index + 1}
                      </div>
                      <h3 className="font-bold text-[#09263D] mb-2">{step.title}</h3>
                      <p className="text-sm text-[#09263D]/70">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.whyChooseUs && (
        <section className="py-12 md:py-20 bg-white" data-testid="section-why-choose">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-8">
              <p className="text-[#970A44] font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-3">
                Why Choose Us
              </p>
              {page.h3 && (
                <h3 
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#09263D]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  data-testid="heading-h3"
                >
                  {page.h3}
                </h3>
              )}
            </motion.div>
            <motion.div {...fadeInUp}>
              <div 
                className="prose prose-lg max-w-none text-[#09263D]/80"
                dangerouslySetInnerHTML={{ __html: page.whyChooseUs.replace(/\n/g, "<br />") }}
              />
            </motion.div>
          </div>
        </section>
      )}

      {page.localInfo && (
        <section className="py-12 md:py-20 bg-[#09263D]" data-testid="section-local-info">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center">
              <h2 
                className="text-2xl md:text-3xl font-bold text-white mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                About {page.location}
              </h2>
              <div 
                className="text-white/80 text-base md:text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: page.localInfo.replace(/\n/g, "<br />") }}
              />
            </motion.div>
          </div>
        </section>
      )}

      {page.faqs && page.faqs.length > 0 && (
        <section className="py-12 md:py-20 bg-[#F6F4EB]" data-testid="section-faqs">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-10 md:mb-16">
              <p className="text-[#970A44] font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-3">
                FAQ
              </p>
              <h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#09263D]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="space-y-3 md:space-y-4">
              {page.faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <button
                      className="w-full p-4 md:p-6 flex items-center justify-between text-left"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      data-testid={`button-faq-${index}`}
                    >
                      <span className="font-semibold text-[#09263D] pr-4">{faq.question}</span>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-[#970A44] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#970A44] flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 md:px-6 pb-4 md:pb-6">
                        <p className="text-[#09263D]/70">{faq.answer}</p>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.internalLinks && page.internalLinks.length > 0 && (
        <section className="py-12 md:py-16 bg-white" data-testid="section-internal-links">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp}>
              <h3 className="text-lg font-bold text-[#09263D] mb-4">Related Services</h3>
              <div className="flex flex-wrap gap-3">
                {page.internalLinks.map((link, index) => (
                  <Link key={index} href={link.url}>
                    <span 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#F6F4EB] text-[#09263D] rounded-full text-sm font-medium hover:bg-[#970A44] hover:text-white transition-colors cursor-pointer"
                      data-testid={`link-internal-${index}`}
                    >
                      <ArrowRight className="w-3 h-3" />
                      {link.text}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-20 bg-gradient-to-r from-[#970A44] to-[#720632]" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Ready to Transform Your Space in {page.location}?
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              {page.serviceName 
                ? `Get professional ${page.serviceName.toLowerCase()} services in ${page.location}. Contact us for a free consultation.`
                : "Contact us today for a free consultation and experience premium property services."
              }
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-white text-[#970A44] rounded-full px-8 md:px-10 py-6 md:py-7 text-base md:text-lg shadow-2xl"
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
