import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft,
  Wrench,
  Zap,
  Droplets,
  Wind,
  Shield,
  Hammer,
  Settings,
  Check,
  ShieldCheck,
  Clock,
  Award,
  Users,
  Home,
  Building2,
  Eye,
  Target,
  Lightbulb,
  Heart,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const heroStats = [
  { value: "15+", label: "Years Experience", icon: Shield },
  { value: "500+", label: "Projects Completed", icon: CheckCircle2 },
  { value: "100%", label: "Client Satisfaction", icon: Heart },
  { value: "24/7", label: "Support Available", icon: ShieldCheck },
];

const serviceData: Record<string, {
  title: string;
  tagline: string;
  description: string;
  introText: string;
  icon: any;
  heroImage: string;
  services: { title: string; description: string }[];
  approach: { title: string; description: string }[];
  whyMatters: { title: string; points: string[] };
  targetAudience: { icon: any; title: string; description: string }[];
  process: { step: number; title: string; description: string }[];
  ctaText: string;
  relatedServices: { name: string; slug: string }[];
}> = {
  general: {
    title: "General Property Maintenance in Dubai",
    tagline: "Reliable Property Care for Long-Term Performance",
    description: "General property maintenance is essential for keeping homes and commercial spaces functional, safe, and presentable.",
    introText: "In Dubai, properties experience continuous usage, constant air conditioning, and environmental stress from heat and humidity. Over time, even well-built spaces develop minor issues that can escalate if left unattended. General maintenance focuses on identifying and addressing these issues early. Rather than waiting for systems or fixtures to fail, regular maintenance helps preserve property condition, reduce repair costs, and maintain comfort for occupants.",
    icon: Wrench,
    heroImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80",
    services: [
      { title: "Routine Property Inspections", description: "Regular inspections help identify wear, damage, or potential problems before they become major repairs. This includes checking common fixtures, fittings, and functional elements." },
      { title: "Minor Repairs & Adjustments", description: "Small issues such as loose fittings, misaligned doors, minor surface damage, or basic fixes are handled promptly to maintain usability and appearance." },
      { title: "Preventive Maintenance Support", description: "Preventive actions are taken to reduce the likelihood of future breakdowns, helping extend the lifespan of property components." },
      { title: "Coordination of Maintenance Tasks", description: "General maintenance often involves coordinating multiple small tasks efficiently rather than handling them individually over time." },
      { title: "Residential & Commercial Maintenance", description: "Services are suitable for apartments, villas, offices, and shared commercial spaces, adjusted based on property type and usage." }
    ],
    approach: [
      { title: "Proactive", description: "Proactive rather than reactive maintenance approach" },
      { title: "Efficient", description: "Efficient and practical execution of all tasks" },
      { title: "Minimal Disruption", description: "Carried out with minimal disruption to daily life" },
      { title: "Long-Term Focus", description: "Aligned with long-term property care goals" }
    ],
    whyMatters: {
      title: "Why General Property Maintenance Matters in Dubai",
      points: [
        "Continuous use of air-conditioned environments",
        "Wear and tear from daily occupancy",
        "Environmental stress from heat and humidity",
        "Higher maintenance demands in shared or rental properties"
      ]
    },
    targetAudience: [
      { icon: Home, title: "Homeowners", description: "maintaining their properties" },
      { icon: Building2, title: "Landlords & Investors", description: "protecting property value" },
      { icon: Users, title: "Property Managers", description: "commercial properties" },
      { icon: Shield, title: "Tenants", description: "requiring ongoing support" }
    ],
    process: [
      { step: 1, title: "Review", description: "Reviewing the property and identifying maintenance needs" },
      { step: 2, title: "Prioritize", description: "Prioritizing tasks based on urgency and impact" },
      { step: 3, title: "Execute", description: "Carrying out maintenance work efficiently" },
      { step: 4, title: "Review", description: "Reviewing outcomes to ensure issues are resolved" }
    ],
    ctaText: "Need reliable general property maintenance in Dubai? Property Masters can help keep your property in good condition through professional maintenance services.",
    relatedServices: [
      { name: "Electrical Maintenance", slug: "electrical" },
      { name: "Plumbing Maintenance", slug: "plumbing" },
      { name: "HVAC Maintenance", slug: "hvac" }
    ]
  },
  electrical: {
    title: "Electrical Maintenance Services in Dubai",
    tagline: "Safe & Reliable Electrical Solutions",
    description: "Inspection, repair, and maintenance of electrical systems to ensure safety and reliable operation.",
    introText: "Electrical systems are critical to property safety and daily functionality. In Dubai, where properties rely heavily on lighting, appliances, and climate control systems, electrical issues can disrupt comfort and pose safety risks. Electrical maintenance focuses on identifying and resolving issues early. Regular inspection and care helps prevent hazards, reduce energy waste, and ensure reliable electrical performance.",
    icon: Zap,
    heroImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=80",
    services: [
      { title: "Electrical Safety Inspections", description: "Comprehensive inspection of wiring, connections, and electrical panels to identify potential hazards or inefficiencies." },
      { title: "Lighting Repairs & Upgrades", description: "Repair, replacement, and upgrade of lighting fixtures, switches, and dimmers for improved functionality and energy efficiency." },
      { title: "Socket & Switch Maintenance", description: "Inspection and repair of power sockets, switches, and outlets to ensure safe and reliable operation." },
      { title: "Circuit Breaker & Panel Maintenance", description: "Maintenance of electrical panels and circuit breakers to prevent overloads and ensure proper power distribution." },
      { title: "Electrical Fault Finding", description: "Professional diagnosis and resolution of electrical faults, short circuits, and power fluctuations." }
    ],
    approach: [
      { title: "Safety-First", description: "All work follows strict safety protocols and standards" },
      { title: "Certified Professionals", description: "Work performed by qualified electrical technicians" },
      { title: "Code Compliant", description: "Services meet Dubai electrical codes and regulations" },
      { title: "Preventive Focus", description: "Regular maintenance to prevent major failures" }
    ],
    whyMatters: {
      title: "Why Electrical Maintenance Matters in Dubai",
      points: [
        "High electrical loads from constant AC usage",
        "Aging wiring in older properties",
        "Safety risks from faulty connections",
        "Energy waste from inefficient systems"
      ]
    },
    targetAudience: [
      { icon: Home, title: "Homeowners", description: "ensuring electrical safety" },
      { icon: Building2, title: "Commercial Properties", description: "maintaining operations" },
      { icon: Users, title: "Property Managers", description: "managing multiple units" },
      { icon: Shield, title: "Landlords", description: "protecting investments" }
    ],
    process: [
      { step: 1, title: "Inspect", description: "Comprehensive inspection of electrical systems" },
      { step: 2, title: "Diagnose", description: "Identifying issues and recommending solutions" },
      { step: 3, title: "Repair", description: "Professional repair and maintenance work" },
      { step: 4, title: "Verify", description: "Testing and verification of proper operation" }
    ],
    ctaText: "Need professional electrical maintenance in Dubai? Property Masters can help ensure your property's electrical systems are safe, efficient, and reliable.",
    relatedServices: [
      { name: "General Maintenance", slug: "general" },
      { name: "HVAC Maintenance", slug: "hvac" },
      { name: "Handyman Services", slug: "handyman" }
    ]
  },
  plumbing: {
    title: "Plumbing Maintenance Services in Dubai",
    tagline: "Reliable Water Systems for Daily Comfort",
    description: "Services focused on identifying leaks, blockages, and plumbing inefficiencies before they escalate.",
    introText: "Plumbing systems are essential to daily comfort and functionality in any property. In Dubai, constant water usage, pressure variations, and aging pipework can lead to leaks, blockages, or inefficiencies if not maintained properly. Many plumbing issues begin small and go unnoticed until they cause visible damage or disruption. Plumbing maintenance focuses on identifying and resolving these issues early. Regular maintenance helps prevent water damage, reduce repair costs, and ensure reliable water flow throughout the property.",
    icon: Droplets,
    heroImage: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1920&q=80",
    services: [
      { title: "Leak Detection & Repair", description: "Leaks in pipes, fittings, or fixtures are identified and repaired before they cause damage to walls, floors, or ceilings." },
      { title: "Drain & Blockage Clearing", description: "Blocked drains and slow water flow are addressed to restore proper drainage and prevent overflow or odor issues." },
      { title: "Fixture & Fitting Maintenance", description: "Maintenance and repair of taps, mixers, toilets, and other fixtures help ensure smooth operation and reduce water wastage." },
      { title: "Water Pressure Assessment", description: "Water pressure is checked to identify issues that may affect fixtures, appliances, or overall system performance." },
      { title: "Preventive Plumbing Maintenance", description: "Preventive measures are applied to reduce recurring plumbing issues and extend the lifespan of the system." }
    ],
    approach: [
      { title: "Preventive", description: "Preventive rather than reactive approach to plumbing care" },
      { title: "Clearly Assessed", description: "Issues are clearly assessed before repair" },
      { title: "Minimal Disruption", description: "Executed with minimal disruption to occupants" },
      { title: "Long-Term Reliability", description: "Designed for long-term reliability and performance" }
    ],
    whyMatters: {
      title: "Why Plumbing Maintenance Matters in Dubai",
      points: [
        "High daily water usage",
        "Pressure fluctuations affecting fixtures",
        "Hidden leaks causing structural damage",
        "Increased maintenance needs in shared buildings"
      ]
    },
    targetAudience: [
      { icon: Home, title: "Residential Homes", description: "apartments and villas" },
      { icon: Building2, title: "Villas & Townhouses", description: "larger residential properties" },
      { icon: Users, title: "Commercial Properties", description: "offices and retail spaces" },
      { icon: Shield, title: "Property Managers", description: "managing multiple properties" }
    ],
    process: [
      { step: 1, title: "Inspect", description: "Inspecting plumbing systems and identifying issues" },
      { step: 2, title: "Recommend", description: "Recommending suitable maintenance or repair actions" },
      { step: 3, title: "Execute", description: "Carrying out work efficiently and safely" },
      { step: 4, title: "Review", description: "Reviewing system performance before completion" }
    ],
    ctaText: "Experiencing plumbing issues or need routine maintenance in Dubai? Property Masters can help maintain efficient and reliable plumbing systems through professional maintenance services.",
    relatedServices: [
      { name: "General Maintenance", slug: "general" },
      { name: "HVAC Maintenance", slug: "hvac" },
      { name: "Preventive Maintenance", slug: "preventive" }
    ]
  },
  hvac: {
    title: "HVAC & Air Conditioning Maintenance in Dubai",
    tagline: "Consistent Indoor Comfort Year-Round",
    description: "Maintenance services designed to support efficient cooling performance and indoor comfort.",
    introText: "Air conditioning systems are among the most heavily used systems in Dubai properties. With cooling systems running for most of the year, even minor inefficiencies or maintenance gaps can lead to discomfort, higher energy consumption, or unexpected breakdowns. HVAC and air conditioning maintenance focuses on keeping systems running efficiently, safely, and reliably. Regular maintenance helps prevent system failure, improve cooling performance, and extend the lifespan of equipment.",
    icon: Wind,
    heroImage: "https://images.unsplash.com/photo-1631545806609-11e27e55a72d?w=1920&q=80",
    services: [
      { title: "AC System Inspection", description: "We inspect indoor and outdoor units, connections, and system components to identify wear, blockage, or performance issues." },
      { title: "Filter Cleaning & Replacement", description: "Dirty filters reduce airflow and system efficiency. Cleaning or replacing filters helps maintain air quality and cooling performance." },
      { title: "Cooling Performance Checks", description: "Cooling output is assessed to ensure the system is operating effectively and distributing air evenly." },
      { title: "Basic System Servicing", description: "Routine servicing helps reduce strain on system components and supports stable operation." },
      { title: "Preventive HVAC Maintenance", description: "Preventive measures are applied to reduce the risk of breakdowns during peak usage periods." }
    ],
    approach: [
      { title: "Preventive", description: "Preventive and efficiency-driven maintenance approach" },
      { title: "Clearly Assessed", description: "Systems clearly assessed before servicing" },
      { title: "Minimal Disruption", description: "Performed with minimal disruption to occupants" },
      { title: "Long-Term Health", description: "Focused on long-term system health and efficiency" }
    ],
    whyMatters: {
      title: "Why HVAC Maintenance Matters in Dubai",
      points: [
        "High outdoor temperatures requiring constant cooling",
        "Limited natural ventilation in most properties",
        "Continuous indoor occupancy throughout the day",
        "Increased strain on systems during summer months"
      ]
    },
    targetAudience: [
      { icon: Home, title: "Residential Homes", description: "apartments and villas" },
      { icon: Building2, title: "Villas & Townhouses", description: "larger residential properties" },
      { icon: Users, title: "Offices & Commercial", description: "commercial spaces" },
      { icon: Shield, title: "Property Managers", description: "and landlords" }
    ],
    process: [
      { step: 1, title: "Review", description: "Reviewing system condition and usage patterns" },
      { step: 2, title: "Identify", description: "Identifying maintenance or servicing needs" },
      { step: 3, title: "Service", description: "Carrying out cleaning and servicing tasks" },
      { step: 4, title: "Verify", description: "Reviewing performance after maintenance" }
    ],
    ctaText: "Need reliable HVAC or air conditioning maintenance in Dubai? Property Masters can help maintain comfortable indoor environments through professional HVAC maintenance services.",
    relatedServices: [
      { name: "General Maintenance", slug: "general" },
      { name: "Electrical Maintenance", slug: "electrical" },
      { name: "Preventive Maintenance", slug: "preventive" }
    ]
  },
  handyman: {
    title: "Handyman & Repair Services in Dubai",
    tagline: "Quick Fixes for Daily Functionality",
    description: "Support for small repairs and fixes that help maintain daily functionality.",
    introText: "Every property experiences minor issues that can affect daily comfort and functionality. From loose door handles to squeaky hinges, picture hanging to furniture assembly, small tasks can accumulate and become frustrating if left unattended. Our Handyman & Repair Services provide reliable support for these everyday needs. Rather than managing multiple contractors for small jobs, our service offers a single point of contact for general repairs and fixes.",
    icon: Hammer,
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
    services: [
      { title: "Door & Window Repairs", description: "Fixing misaligned doors, stuck windows, broken handles, and hinges to restore proper function." },
      { title: "Furniture Assembly & Repairs", description: "Assembly of flat-pack furniture and repair of damaged or loose furniture components." },
      { title: "Wall Mounting & Fixtures", description: "Secure mounting of TVs, shelves, mirrors, pictures, and other wall-mounted items." },
      { title: "Minor Carpentry Work", description: "Small carpentry repairs including shelving adjustments, cabinet fixes, and trim repairs." },
      { title: "General Fixes & Adjustments", description: "Miscellaneous repairs and adjustments to maintain property functionality and appearance." }
    ],
    approach: [
      { title: "Responsive", description: "Quick response for urgent small repairs" },
      { title: "Multi-Skilled", description: "Technicians capable of handling various tasks" },
      { title: "Efficient", description: "Multiple small jobs completed in single visits" },
      { title: "Quality-Focused", description: "Attention to detail in every repair" }
    ],
    whyMatters: {
      title: "Why Handyman Services Matter in Dubai",
      points: [
        "Accumulation of minor issues affects comfort",
        "Difficulty finding reliable help for small jobs",
        "Time constraints for busy property owners",
        "Need for quick fixes without major contractor involvement"
      ]
    },
    targetAudience: [
      { icon: Home, title: "Homeowners", description: "needing quick repairs" },
      { icon: Building2, title: "Tenants", description: "with landlord approval" },
      { icon: Users, title: "Offices", description: "maintaining workspaces" },
      { icon: Shield, title: "Property Managers", description: "handling multiple units" }
    ],
    process: [
      { step: 1, title: "Request", description: "Describe the repairs or tasks needed" },
      { step: 2, title: "Schedule", description: "Book a convenient time for the visit" },
      { step: 3, title: "Complete", description: "Handyman completes all listed tasks" },
      { step: 4, title: "Review", description: "Verify all work meets expectations" }
    ],
    ctaText: "Need reliable handyman services in Dubai? Property Masters can help with quick repairs and fixes to keep your property functioning smoothly.",
    relatedServices: [
      { name: "General Maintenance", slug: "general" },
      { name: "Electrical Maintenance", slug: "electrical" },
      { name: "Plumbing Maintenance", slug: "plumbing" }
    ]
  },
  preventive: {
    title: "Preventive Maintenance Solutions in Dubai",
    tagline: "Planned Care for Lasting Performance",
    description: "Scheduled maintenance programs aimed at reducing long-term repair costs and unexpected issues.",
    introText: "Preventive maintenance is about addressing potential issues before they become costly problems. Rather than waiting for systems to fail or fixtures to break, preventive maintenance schedules regular inspections and care to maintain property condition over time. In Dubai, where properties experience constant use and environmental stress, preventive maintenance is especially valuable. It helps reduce emergency repairs, extend equipment lifespan, and maintain consistent comfort for occupants.",
    icon: Settings,
    heroImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=80",
    services: [
      { title: "Scheduled Property Inspections", description: "Regular inspections to identify wear, potential issues, and maintenance needs across all property systems." },
      { title: "AC & HVAC Preventive Care", description: "Scheduled cleaning, filter replacement, and system checks to maintain cooling efficiency and prevent breakdowns." },
      { title: "Plumbing System Checks", description: "Periodic inspection of pipes, fixtures, and drainage to catch leaks and blockages early." },
      { title: "Electrical System Reviews", description: "Regular assessment of wiring, connections, and panels to ensure safety and efficiency." },
      { title: "Annual Maintenance Contracts (AMC)", description: "Comprehensive maintenance packages covering multiple systems with scheduled visits throughout the year." }
    ],
    approach: [
      { title: "Scheduled", description: "Regular maintenance at planned intervals" },
      { title: "Comprehensive", description: "Covering all major property systems" },
      { title: "Cost-Effective", description: "Reducing long-term repair expenses" },
      { title: "Documentation", description: "Detailed records of all maintenance activities" }
    ],
    whyMatters: {
      title: "Why Preventive Maintenance Matters in Dubai",
      points: [
        "Reduces unexpected breakdowns and emergencies",
        "Extends lifespan of property systems and equipment",
        "Maintains property value over time",
        "Provides peace of mind for property owners"
      ]
    },
    targetAudience: [
      { icon: Home, title: "Homeowners", description: "protecting their investment" },
      { icon: Building2, title: "Landlords", description: "maintaining rental properties" },
      { icon: Users, title: "Property Managers", description: "managing portfolios" },
      { icon: Shield, title: "Commercial Properties", description: "ensuring operations" }
    ],
    process: [
      { step: 1, title: "Assessment", description: "Evaluate property and determine maintenance needs" },
      { step: 2, title: "Plan", description: "Create customized maintenance schedule" },
      { step: 3, title: "Execute", description: "Perform scheduled maintenance visits" },
      { step: 4, title: "Report", description: "Document findings and recommendations" }
    ],
    ctaText: "Looking for preventive maintenance solutions in Dubai? Property Masters can help protect your property with scheduled, professional maintenance programs.",
    relatedServices: [
      { name: "General Maintenance", slug: "general" },
      { name: "HVAC Maintenance", slug: "hvac" },
      { name: "Plumbing Maintenance", slug: "plumbing" }
    ]
  }
};

export default function MaintenanceServiceDetail() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const service = serviceData[serviceSlug || ""];

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F6F4EB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-[#09263D]">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">The maintenance service you're looking for doesn't exist.</p>
          <Button asChild className="bg-[#970A44] hover:bg-[#720632] rounded-full">
            <Link href="/maintenance">Back to Maintenance Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-[#F6F4EB]" data-testid="page-maintenance-detail">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0">
          <img 
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09263D]/90 via-[#09263D]/70 to-[#09263D]/40" />
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
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-4"
                >
                  <Link href="/maintenance" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Back to Maintenance Services</span>
                  </Link>
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-[#970A44] font-semibold text-lg mb-4 tracking-wide"
                >
                  Property Masters Dubai
                </motion.p>
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-white mb-4 font-serif"
                  data-testid="text-hero-title"
                >
                  {service.title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="text-xl text-[#970A44] font-medium mb-4"
                >
                  {service.tagline}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-base md:text-lg leading-relaxed text-white/90 mb-6"
                  data-testid="text-hero-description"
                >
                  {service.description}
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
                      Get Free Consultation
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2" data-testid="badge-certified">
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">Certified Professionals</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Statistics Grid */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid grid-cols-2 gap-3"
                data-testid="stats-grid"
              >
                {heroStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
                    data-testid={`stat-${index}`}
                  >
                    <div className="flex justify-center mb-2">
                      <div className="w-10 h-10 bg-[#970A44] rounded-lg flex items-center justify-center">
                        {stat.icon && <stat.icon className="w-5 h-5 text-white" />}
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

      {/* INTRO SECTION */}
      <section className="py-16 bg-white" data-testid="section-intro">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp} viewport={{ once: true }}>
            <div className="w-16 h-16 bg-[#970A44]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Icon className="w-8 h-8 text-[#970A44]" />
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {service.introText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHAT THIS SERVICE COVERS */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              What This Service Covers
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our {service.title.toLowerCase().replace(" in dubai", "")} addresses a range of needs to keep your property functioning properly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.services.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="h-full border-0 shadow-lg hover-elevate" data-testid={`card-service-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-[#970A44]/10 rounded-2xl flex items-center justify-center mb-4">
                      <Check className="w-6 h-6 text-[#970A44]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-[#09263D]">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="py-20 bg-white" data-testid="section-approach">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              Our Approach
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We focus on maintenance solutions that are structured, professional, and designed for long-term results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.approach.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg text-center" data-testid={`card-approach-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-[#970A44]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-7 h-7 text-[#970A44]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-[#09263D]">{point.title}</h3>
                    <p className="text-sm text-muted-foreground">{point.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="py-20 bg-[#09263D]" data-testid="section-why-matters">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-white">
              {service.whyMatters.title}
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Dubai properties commonly experience challenges that make this service essential.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.whyMatters.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center"
                data-testid={`card-why-${index}`}
              >
                <div className="w-12 h-12 bg-[#970A44] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-medium">{point}</p>
              </motion.div>
            ))}
          </div>

          <motion.p 
            {...fadeInUp} 
            viewport={{ once: true }}
            className="text-center text-white/80 mt-10 max-w-3xl mx-auto"
          >
            Regular maintenance helps prevent deterioration and supports long-term property value.
          </motion.p>
        </div>
      </section>

      {/* WHO THIS SERVICE IS FOR */}
      <section className="py-20 bg-white" data-testid="section-target-audience">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              Who This Service Is For
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              This service is suitable for a variety of clients and property types across Dubai.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.targetAudience.map((audience, index) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg text-center" data-testid={`card-audience-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-[#970A44]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <audience.icon className="w-7 h-7 text-[#970A44]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-[#09263D]">{audience.title}</h3>
                    <p className="text-sm text-muted-foreground">{audience.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.p 
            {...fadeInUp} 
            viewport={{ once: true }}
            className="text-center text-muted-foreground mt-10 max-w-3xl mx-auto"
          >
            Each property is assessed to determine appropriate maintenance needs.
          </motion.p>
        </div>
      </section>

      {/* HOW THIS SERVICE IS HANDLED */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              How This Service Is Handled
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our process follows a clear structure to ensure consistent and dependable results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
                data-testid={`step-${index}`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#970A44] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#09263D]">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-[#970A44]/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE RELATED SERVICES */}
      <section className="py-16 bg-white" data-testid="section-explore">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-serif text-[#09263D]">
              Explore Related Services
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Discover other maintenance services that may complement your property care needs.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {service.relatedServices.map((related) => (
                <Link key={related.slug} href={`/maintenance/${related.slug}`}>
                  <Button 
                    variant="outline" 
                    className="border-[#970A44]/30 text-[#09263D] hover:bg-[#970A44]/10 hover:border-[#970A44] rounded-full"
                    data-testid={`button-related-${related.slug}`}
                  >
                    {related.name}
                  </Button>
                </Link>
              ))}
              <Link href="/maintenance">
                <Button 
                  variant="outline" 
                  className="border-[#970A44]/30 text-[#09263D] hover:bg-[#970A44]/10 hover:border-[#970A44] rounded-full"
                  data-testid="button-all-services"
                >
                  View All Maintenance Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 bg-gradient-to-r from-[#09263D] to-[#1C4668]" data-testid="section-final-cta">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-white">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              {service.ctaText}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild 
                size="lg"
                className="bg-[#970A44] hover:bg-[#720632] text-white font-semibold rounded-full shadow-xl"
                data-testid="button-cta-consultation"
              >
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-full"
                data-testid="button-cta-book"
              >
                <Link href="/book">
                  Book a Service
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
