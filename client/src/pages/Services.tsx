import { useParams } from "wouter";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Sparkles, Home, Building2, Check, ArrowRight, Hammer, Droplets, 
  Dumbbell, Heart, Wrench, Wind, Droplet, Zap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Service } from "@shared/schema";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const iconMap: Record<string, any> = {
  "Home": Home,
  "Building2": Building2,
  "Hammer": Hammer,
  "Droplets": Droplets,
  "Dumbbell": Dumbbell,
  "Heart": Heart,
  "Wrench": Wrench,
  "Wind": Wind,
  "Droplet": Droplet,
  "Zap": Zap,
  "Sparkles": Sparkles,
};

export default function Services() {
  const params = useParams();
  const serviceSlug = params.slug;

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const currentService = services.find(s => s.slug === serviceSlug) || services[0];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading services...</p>
        </div>
      </div>
    );
  }

  if (!currentService || services.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-3xl font-bold mb-4 font-[Archivo]">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The service you're looking for could not be found. Please check the URL or explore our other services.
          </p>
          <Link href="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[currentService.icon] || Sparkles;
  const categoryServices = services.filter(s => s.category === currentService.category);

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-24 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-[Archivo]">{currentService.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{currentService.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-[Archivo]">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentService.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  {...fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-base">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {categoryServices.length > 1 && (
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[Archivo]">Related Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our other services in this category
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryServices
                .filter(s => s.id !== currentService.id)
                .map((service, index) => {
                  const ServiceIcon = iconMap[service.icon] || Sparkles;
                  return (
                    <motion.div
                      key={service.id}
                      {...fadeInUp}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover-elevate">
                        <CardContent className="p-8">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                            <ServiceIcon className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold mb-3 font-[Archivo]">{service.title}</h3>
                          <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{service.description}</p>
                          <Link href={`/services/${service.slug}`}>
                            <Button variant="outline" className="w-full group">
                              Learn More
                              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[Archivo]">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's bring your vision to life. Book a consultation with our experts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" className="w-full sm:w-auto">
                  Book a Consultation
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
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
