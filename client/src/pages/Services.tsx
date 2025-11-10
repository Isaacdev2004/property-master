import { useParams } from "wouter";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Sparkles, Home as HomeIcon, Building2, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const servicesData = {
  "interior-design": {
    title: "Interior Design",
    icon: Sparkles,
    description: "Transform your residential or commercial space with our expert interior design services. From initial concept to final execution, we create stunning environments that reflect your style and enhance your lifestyle.",
    features: [
      "Comprehensive Design Consultation",
      "3D Visualization & Rendering",
      "Custom Furniture Selection",
      "Color Scheme & Material Selection",
      "Space Planning & Layout",
      "Project Management & Coordination",
      "Lighting Design",
      "Accessory & Art Curation",
    ],
    packages: [
      {
        name: "Essential",
        price: "Starting at AED 15,000",
        features: ["Design Consultation", "Floor Plan Layout", "Color Palette", "Material Board"],
      },
      {
        name: "Premium",
        price: "Starting at AED 30,000",
        features: ["Everything in Essential", "3D Renderings", "Custom Furniture Design", "Full Project Management"],
      },
      {
        name: "Luxury",
        price: "Custom Quote",
        features: ["Everything in Premium", "Bespoke Solutions", "Premium Materials", "Dedicated Design Team"],
      },
    ],
  },
  "home-maintenance": {
    title: "Home Maintenance",
    icon: HomeIcon,
    description: "Keep your home in pristine condition with our comprehensive maintenance services. From routine care to emergency repairs, our skilled professionals ensure your property remains beautiful and functional.",
    features: [
      "Regular Preventive Maintenance",
      "HVAC Service & Repair",
      "Plumbing Solutions",
      "Electrical Maintenance",
      "Painting & Touch-ups",
      "Carpentry Work",
      "Deep Cleaning Services",
      "24/7 Emergency Support",
    ],
    packages: [
      {
        name: "Basic Care",
        price: "AED 500/month",
        features: ["Quarterly Inspections", "Minor Repairs", "Priority Scheduling", "Maintenance Reports"],
      },
      {
        name: "Complete Care",
        price: "AED 1,200/month",
        features: ["Monthly Inspections", "All Repairs Included", "24/7 Emergency Support", "Deep Cleaning (Quarterly)"],
      },
      {
        name: "Premium Care",
        price: "AED 2,500/month",
        features: ["Bi-weekly Inspections", "Unlimited Repairs", "Dedicated Technician", "Annual Renovation Budget"],
      },
    ],
  },
  "commercial-maintenance": {
    title: "Commercial Maintenance",
    icon: Building2,
    description: "Professional facility management for commercial properties. We provide reliable, efficient maintenance solutions that minimize downtime and maximize the lifespan of your commercial space.",
    features: [
      "Facility Management Systems",
      "Scheduled Preventive Maintenance",
      "HVAC & MEP Services",
      "Safety Compliance Audits",
      "Energy Efficiency Solutions",
      "Cleaning & Janitorial Services",
      "Security Systems Maintenance",
      "Landscape Management",
    ],
    packages: [
      {
        name: "Standard",
        price: "Starting at AED 5,000/month",
        features: ["Monthly Inspections", "Basic MEP Maintenance", "Cleaning Services", "Compliance Reports"],
      },
      {
        name: "Professional",
        price: "Starting at AED 12,000/month",
        features: ["Weekly Inspections", "Full MEP Coverage", "Daily Cleaning", "Energy Monitoring"],
      },
      {
        name: "Enterprise",
        price: "Custom Quote",
        features: ["24/7 Monitoring", "Dedicated Team", "Comprehensive Coverage", "Custom Solutions"],
      },
    ],
  },
};

export default function Services() {
  const params = useParams();
  const serviceSlug = params.slug as keyof typeof servicesData || "interior-design";
  const service = servicesData[serviceSlug] || servicesData["interior-design"];
  const Icon = service.icon;

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-[Montserrat]">{service.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{service.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-[Montserrat]">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.features.map((feature, index) => (
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

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[Montserrat]">Service Packages</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the package that best fits your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`h-full ${index === 1 ? "border-primary shadow-lg scale-105" : ""}`}>
                  <CardContent className="p-8">
                    {index === 1 && (
                      <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                        MOST POPULAR
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-2 font-[Montserrat]">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-primary mb-6">{pkg.price}</div>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/book" data-testid={`button-book-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[Montserrat]">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Book a consultation with our experts or contact us to discuss your project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" data-testid="button-service-book">
                <Button size="lg">
                  Book Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact" data-testid="button-service-contact">
                <Button size="lg" variant="outline">
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
