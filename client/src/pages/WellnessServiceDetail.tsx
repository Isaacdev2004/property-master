import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft,
  Wind,
  Droplets,
  Sofa,
  Home,
  Bug,
  TestTube,
  SprayCan,
  UserCheck,
  Check,
  Phone,
  Clock,
  ShieldCheck,
  Calendar,
  ThumbsUp,
  Star,
  Award,
  Users,
  Leaf,
  Zap,
  Shield,
  Heart,
  Wrench,
  Thermometer,
  Eye,
  Target,
  FileCheck,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  process: { step: number; title: string; description: string }[];
  ctaText: string;
  relatedServices: { name: string; slug: string }[];
  comingSoon?: boolean;
}> = {
  "ac-cleaning": {
    title: "AC Cleaning Services in Dubai",
    tagline: "Breathe Cleaner, Live Healthier",
    description: "Professional AC cleaning and maintenance to improve performance, extend system life, and create healthier indoor environments.",
    introText: "Air conditioning systems are essential in Dubai's climate, but without proper cleaning and maintenance, AC units can accumulate dust, mold, and debris. Dirty systems reduce cooling efficiency, affect indoor air quality, and can lead to higher energy bills or unexpected breakdowns.",
    icon: Wind,
    heroImage: "https://images.unsplash.com/photo-1631545806609-11e27e55a72d?w=1920&q=80",
    services: [
      { title: "AC Coil Cleaning", description: "Removes accumulated dust, dirt, and debris from AC coils to restore cooling efficiency and improve airflow. Regular coil cleaning helps reduce energy consumption and prolongs system life." },
      { title: "AC Repair & Maintenance", description: "Covers minor repairs, component checks, and routine maintenance to prevent breakdowns. This ensures the AC operates reliably throughout Dubai's hot months." },
      { title: "Mold Removal", description: "Eliminates mold that can develop inside AC units due to moisture and dust. Mold removal improves indoor air quality and reduces health risks." },
      { title: "AC Duct Liner Services", description: "Cleans and maintains AC duct liners to prevent dust accumulation and odors. This supports better airflow and healthier indoor air." },
      { title: "AC Installation & Replacement", description: "Professional installation or replacement of AC units, ensuring optimal performance and proper integration with existing systems." },
      { title: "Annual AC Maintenance Contract (AMC)", description: "Scheduled maintenance visits throughout the year to keep AC units running efficiently and prevent unexpected issues." },
      { title: "Annual AC Aftercare Cleaning Contract", description: "Follow-up cleaning and inspection after installation or maintenance to ensure the system continues performing at peak efficiency." }
    ],
    approach: [
      { title: "Safe and effective", description: "All cleaning and maintenance is performed using approved methods suitable for occupied properties." },
      { title: "Dubai-appropriate", description: "AC systems are treated with consideration for heat, humidity, and extended daily use." },
      { title: "Preventive", description: "Regular cleaning and maintenance reduces long-term repair costs and improves efficiency." }
    ],
    whyMatters: {
      title: "Why AC Cleaning Matters in Dubai",
      points: ["Poor air quality", "Reduced cooling efficiency", "Higher energy bills", "System breakdowns during peak summer"]
    },
    process: [
      { step: 1, title: "Assessment", description: "Inspect the AC system and ducts for dirt, mold, or component issues." },
      { step: 2, title: "Cleaning & Maintenance", description: "Remove dust, clean coils, ducts, and liners, and perform preventive checks." },
      { step: 3, title: "Repairs & Adjustments", description: "Fix minor issues and ensure optimal system operation." },
      { step: 4, title: "Follow-Up", description: "Review results and schedule any additional preventive maintenance if needed." }
    ],
    ctaText: "Looking to improve your AC performance and indoor air quality in Dubai? Property Masters can help with professional AC cleaning, maintenance, and preventive solutions for your home or business.",
    relatedServices: [
      { name: "Mold Removal", slug: "mold-removal" },
      { name: "Environmental Testing", slug: "environmental-testing" },
      { name: "Deep Cleaning", slug: "deep-cleaning" }
    ]
  },
  "furniture-cleaning": {
    title: "Furniture Cleaning Services in Dubai",
    tagline: "Refresh, Restore, Protect",
    description: "Expert cleaning for sofas, mattresses, carpets, and upholstery to maintain hygiene and extend furniture life.",
    introText: "Maintaining clean furniture is essential for hygiene, comfort, and the longevity of household items. In Dubai, dust, heat, and frequent use can cause sofas, mattresses, carpets, and curtains to accumulate dirt, allergens, and stains. Regular professional cleaning ensures healthier indoor spaces and extends the life of furniture.",
    icon: Sofa,
    heroImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80",
    services: [
      { title: "Mattress Cleaning", description: "Deep cleaning of mattresses to remove dust, allergens, and bacteria, improving hygiene and sleep quality." },
      { title: "Sofa Cleaning", description: "Professional cleaning for sofas, including fabric, leather, and mixed materials, removing stains and accumulated dust." },
      { title: "Carpet Cleaning", description: "Thorough cleaning for all types of carpets, restoring appearance, removing dirt, and reducing allergens." },
      { title: "Curtains Cleaning", description: "Careful cleaning of curtains and drapes, preserving fabrics while eliminating dust, odors, and pollutants." },
      { title: "Upholstery Shampooing", description: "Deep shampooing for upholstered furniture, targeting dirt, grime, and bacteria embedded in fabrics." },
      { title: "Nano Coating & Stain Protection", description: "Application of protective coatings that repel stains and dust, extending the life of furniture and reducing cleaning frequency." },
      { title: "Full Home Furniture Deep Cleaning Package", description: "Comprehensive cleaning of all furniture items in a property, combining mattress, sofa, carpet, and upholstery cleaning for a complete refresh." }
    ],
    approach: [
      { title: "Safe and effective", description: "Suitable for fabrics, leather, and mixed materials." },
      { title: "Dubai-appropriate", description: "Techniques account for high dust levels and daily usage in local homes." },
      { title: "Hygiene-focused", description: "Removes allergens and bacteria for healthier living spaces." },
      { title: "Protective", description: "Options like nano-coating help prevent future staining and damage." }
    ],
    whyMatters: {
      title: "Why Furniture Cleaning Matters in Dubai",
      points: ["High levels of indoor dust", "Frequent air-conditioned environments", "Heat and humidity that affect fabrics", "Daily wear and accidental spills"]
    },
    process: [
      { step: 1, title: "Assessment", description: "Inspect furniture for material type, stains, and condition." },
      { step: 2, title: "Cleaning Execution", description: "Apply appropriate cleaning methods, deep shampooing, or protective coatings." },
      { step: 3, title: "Drying & Inspection", description: "Ensure furniture is dry, clean, and restored." },
      { step: 4, title: "Preventive Advice", description: "Recommend care practices to maintain cleanliness and longevity." }
    ],
    ctaText: "Looking to refresh and protect your furniture in Dubai? Property Masters can help with professional furniture cleaning, upholstery care, and long-term protection for your home or office.",
    relatedServices: [
      { name: "Deep Cleaning", slug: "deep-cleaning" },
      { name: "Mold Removal", slug: "mold-removal" },
      { name: "AC Cleaning", slug: "ac-cleaning" }
    ]
  },
  "water-pipeline": {
    title: "Water & Pipeline Services in Dubai",
    tagline: "Pure Water, Healthy Living",
    description: "Comprehensive water tank cleaning, pipeline disinfection, and filtration solutions for clean water supply.",
    introText: "Clean, safe water is essential for daily living, hygiene, and comfort. In Dubai properties, water quality can be affected by mineral content, pipeline conditions, and environmental factors. Poor water quality can impact drinking water, bathing, and household appliances, leading to scaling, odors, or health concerns.",
    icon: Droplets,
    heroImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1920&q=80",
    services: [
      { title: "Water Tank Cleaning", description: "Thorough cleaning and disinfection of water storage tanks to remove sediment, bacteria, and contaminants." },
      { title: "Pipeline Disinfection", description: "Sanitization of pipelines to reduce biofilm, microbial growth, and ensure clean water flow throughout the property." },
      { title: "Premium Water Filters & Purifiers", description: "Installation and maintenance of high-quality water filters and purifiers to improve drinking water quality." },
      { title: "Whole House Water Filtration System", description: "Comprehensive filtration systems for entire properties, ensuring clean, filtered water at all taps." },
      { title: "blu® Shower Filters", description: "Specialized shower filtration systems to reduce chlorine, odors, and contaminants, improving bathing comfort and skin health." }
    ],
    approach: [
      { title: "Safe and reliable", description: "Products and methods suitable for Dubai's water conditions." },
      { title: "Comprehensive", description: "Solutions cover storage tanks, pipelines, and point-of-use filtration." },
      { title: "Preventive", description: "Regular maintenance prevents future issues like scaling or contamination." },
      { title: "User-focused", description: "Systems are designed for convenience, easy maintenance, and long-term reliability." }
    ],
    whyMatters: {
      title: "Why Water & Pipeline Services Matter in Dubai",
      points: ["High mineral content in water", "Sediment accumulation in tanks and pipes", "Reduced water quality in older pipelines", "Health and hygiene concerns if untreated"]
    },
    process: [
      { step: 1, title: "Assessment", description: "Inspect water tanks, pipelines, and existing filtration." },
      { step: 2, title: "Cleaning & Installation", description: "Clean tanks, disinfect pipelines, install or service filtration systems." },
      { step: 3, title: "Quality Verification", description: "Test water to ensure safety and clarity." },
      { step: 4, title: "Ongoing Maintenance", description: "Recommend preventive measures and regular maintenance schedules." }
    ],
    ctaText: "Concerned about water quality or pipeline hygiene in your Dubai property? Property Masters can provide professional water cleaning, filtration, and disinfection services for homes and commercial spaces.",
    relatedServices: [
      { name: "Environmental Testing", slug: "environmental-testing" },
      { name: "Deep Cleaning", slug: "deep-cleaning" },
      { name: "Mold Removal", slug: "mold-removal" }
    ]
  },
  "deep-cleaning": {
    title: "Home Deep Cleaning Services in Dubai",
    tagline: "Every Corner, Thoroughly Clean",
    description: "Thorough deep cleaning services for move-in/move-out, furnished and unfurnished properties.",
    introText: "Deep cleaning ensures that every corner of a property is hygienic, dust-free, and comfortable for daily living. In Dubai, where dust accumulation and high usage are common, routine cleaning often isn't enough to maintain long-term hygiene and comfort.",
    icon: Home,
    heroImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80",
    services: [
      { title: "Move-In / Move-Out Deep Cleaning (Unfurnished)", description: "A complete cleaning of unfurnished properties before moving in or after vacating, including floors, walls, windows, and high-touch areas." },
      { title: "Premium Deep Cleaning (Furnished)", description: "Detailed cleaning of furnished homes, ensuring all surfaces, furniture, and fixtures are hygienic and free of dust and allergens." },
      { title: "Furniture Cleaning", description: "Professional cleaning of mattresses, sofas, carpets, and upholstery, restoring hygiene and freshness." }
    ],
    approach: [
      { title: "Thorough and systematic", description: "Every area is addressed to ensure a complete refresh." },
      { title: "Safe for residents and materials", description: "Cleaning methods are chosen to protect surfaces and fabrics." },
      { title: "Dubai-appropriate", description: "High dust levels and climate conditions are taken into account." },
      { title: "Preventive", description: "Reduces allergens, dirt buildup, and long-term maintenance issues." }
    ],
    whyMatters: {
      title: "Why Home Deep Cleaning Matters in Dubai",
      points: ["Frequent dust accumulation", "Residue from air-conditioned environments", "High-traffic areas in residential and commercial spaces", "Allergens and bacteria that routine cleaning cannot fully address"]
    },
    process: [
      { step: 1, title: "Assessment", description: "Inspect the property to identify cleaning needs and challenges." },
      { step: 2, title: "Deep Cleaning Execution", description: "Clean floors, walls, high-touch areas, and furniture thoroughly." },
      { step: 3, title: "Inspection & Quality Check", description: "Ensure all areas are cleaned to a high standard." },
      { step: 4, title: "Preventive Guidance", description: "Recommend ongoing practices to maintain cleanliness and hygiene." }
    ],
    ctaText: "Need professional home deep cleaning in Dubai? Property Masters can help make your home fully hygienic, fresh, and comfortable with expert deep cleaning services.",
    relatedServices: [
      { name: "Furniture Cleaning", slug: "furniture-cleaning" },
      { name: "AC Cleaning", slug: "ac-cleaning" },
      { name: "Pest Control", slug: "pest-control" }
    ]
  },
  "pest-control": {
    title: "Pest Control Services in Dubai",
    tagline: "Protect Your Property, Ensure Your Comfort",
    description: "Effective pest control solutions for bed bugs, rodents, cockroaches, mosquitoes, and termites.",
    introText: "Pests are a common concern in Dubai homes and commercial properties due to climate conditions, high occupancy, and urban density. Uncontrolled infestations can affect hygiene, property safety, and comfort.",
    icon: Bug,
    heroImage: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1920&q=80",
    services: [
      { title: "Drainage Cleaning", description: "Removes blockages and prevents pest breeding in drainage systems." },
      { title: "Pest Control Contracts", description: "Scheduled pest control visits to prevent recurring infestations in homes and offices." },
      { title: "Bed Bugs Pest Control", description: "Targeted treatment for bed bug infestations, ensuring a safe and hygienic sleeping environment." },
      { title: "Rodent Pest Control", description: "Safe and effective removal and prevention of rodents in residential and commercial properties." },
      { title: "Cockroach Pest Control", description: "Elimination of cockroach infestations, including preventive treatment to reduce recurrence." },
      { title: "Mosquito Pest Control", description: "Targeted control to reduce mosquito presence, especially in outdoor areas." },
      { title: "Termite Control Services", description: "Prevention and treatment of termite infestations to protect woodwork and property structure." },
      { title: "Biogents™ Mosquito Trap Solutions", description: "Advanced mosquito traps designed to reduce mosquito populations using environmentally safe methods." }
    ],
    approach: [
      { title: "Safe", description: "Effective for homes and commercial spaces without harming occupants." },
      { title: "Dubai-specific", description: "Methods account for local climate, pests, and seasonal challenges." },
      { title: "Preventive", description: "Scheduled treatments reduce the likelihood of recurring infestations." },
      { title: "Comprehensive", description: "Solutions target all major pest types common in Dubai properties." }
    ],
    whyMatters: {
      title: "Why Pest Control Services Matter in Dubai",
      points: ["High temperature and humidity", "Dust accumulation and urban density", "Poorly maintained drainage systems", "High human activity in shared spaces"]
    },
    process: [
      { step: 1, title: "Assessment", description: "Identify pest type, location, and risk factors." },
      { step: 2, title: "Targeted Treatment", description: "Apply safe and effective control methods." },
      { step: 3, title: "Follow-Up & Monitoring", description: "Ensure pests are eliminated and recurrence is minimized." },
      { step: 4, title: "Preventive Advice", description: "Recommend ongoing practices to maintain a pest-free environment." }
    ],
    ctaText: "Looking to protect your property from pests in Dubai? Property Masters can help with expert pest control services tailored to your home or commercial space.",
    relatedServices: [
      { name: "Deep Cleaning", slug: "deep-cleaning" },
      { name: "Mold Removal", slug: "mold-removal" },
      { name: "AC Cleaning", slug: "ac-cleaning" }
    ]
  },
  "mold-removal": {
    title: "Mold Removal Services in Dubai",
    tagline: "Eliminate Mold, Restore Health",
    description: "Professional mold remediation and moisture control to address indoor health concerns in humid environments.",
    introText: "Mold is a common issue in properties with moisture or humidity, and it can affect indoor air quality, health, and structural integrity. In Dubai, sealed air-conditioned spaces, bathrooms, and water-affected areas are especially prone to mold growth.",
    icon: SprayCan,
    heroImage: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1920&q=80",
    services: [
      { title: "Mold Inspection & Testing", description: "Professional inspection and testing to identify mold presence, severity, and sources. Determines whether remediation or preventive measures are needed." },
      { title: "Mold Cleaning & Remediation", description: "Targeted cleaning and removal of mold from affected surfaces, combined with moisture control and preventive measures to reduce recurrence." }
    ],
    approach: [
      { title: "Thorough", description: "Address both visible and hidden mold growth." },
      { title: "Safe", description: "Methods are safe for residents and property finishes." },
      { title: "Dubai-appropriate", description: "Techniques consider air-conditioned spaces and local humidity." },
      { title: "Preventive", description: "Steps are included to minimize future mold development." }
    ],
    whyMatters: {
      title: "Why Mold Removal Matters in Dubai",
      points: ["Poor indoor air quality", "Respiratory or allergy issues", "Surface and structural damage"]
    },
    process: [
      { step: 1, title: "Assessment & Testing", description: "Identify mold type, location, and severity." },
      { step: 2, title: "Cleaning & Remediation", description: "Remove mold safely and effectively." },
      { step: 3, title: "Moisture Control", description: "Address underlying causes to prevent recurrence." },
      { step: 4, title: "Follow-Up Recommendations", description: "Advise on maintenance and preventive measures." }
    ],
    ctaText: "Concerned about mold in your Dubai property? Property Masters can help inspect, clean, and remediate mold for a healthier indoor environment.",
    relatedServices: [
      { name: "Environmental Testing", slug: "environmental-testing" },
      { name: "AC Cleaning", slug: "ac-cleaning" },
      { name: "Water & Pipeline", slug: "water-pipeline" }
    ]
  },
  "environmental-testing": {
    title: "Indoor Environmental Testing Services in Dubai",
    tagline: "Know Your Environment, Protect Your Health",
    description: "Comprehensive air quality, water quality, mold inspection, and surface testing services.",
    introText: "Maintaining a healthy indoor environment requires accurate assessment of air, water, surfaces, and mold presence. In Dubai, sealed buildings, air conditioning, and high occupancy levels can lead to hidden issues that affect comfort, hygiene, and safety.",
    icon: TestTube,
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80",
    services: [
      { title: "Indoor Air Quality Testing", description: "Measures pollutants, allergens, humidity, and ventilation effectiveness to assess the quality of air inside residential or commercial properties." },
      { title: "Water Quality Testing", description: "Tests water for contaminants, sediment, and minerals to ensure safe and clean water for daily use." },
      { title: "Mold Inspection & Testing", description: "Identifies mold presence and severity, including hidden mold that may affect air quality and health." },
      { title: "Surface Testing", description: "Analyzes surfaces for bacteria, allergens, and other contaminants to evaluate hygiene levels and identify areas needing cleaning or remediation." }
    ],
    approach: [
      { title: "Accurate", description: "Using professional testing methods for reliable results." },
      { title: "Dubai-specific", description: "Taking into account local climate, AC use, and environmental factors." },
      { title: "Practical", description: "Providing clear recommendations based on results." },
      { title: "Preventive", description: "Helping prevent health or hygiene issues before they escalate." }
    ],
    whyMatters: {
      title: "Why Indoor Environmental Testing Matters in Dubai",
      points: ["Continuous air conditioning circulation", "High dust or allergen accumulation", "Water and surface contamination", "Humidity leading to mold growth"]
    },
    process: [
      { step: 1, title: "Property Assessment", description: "Identify areas to test based on occupancy, system use, and potential risks." },
      { step: 2, title: "Testing Execution", description: "Conduct air, water, mold, and surface tests using professional methods." },
      { step: 3, title: "Analysis & Reporting", description: "Provide clear results with actionable recommendations." },
      { step: 4, title: "Follow-Up Advice", description: "Recommend corrective or preventive actions to improve environmental quality." }
    ],
    ctaText: "Want to ensure your indoor environment is safe and healthy in Dubai? Property Masters can provide professional environmental testing services and actionable recommendations for homes or offices.",
    relatedServices: [
      { name: "Mold Removal", slug: "mold-removal" },
      { name: "AC Cleaning", slug: "ac-cleaning" },
      { name: "Water & Pipeline", slug: "water-pipeline" }
    ]
  },
  "maid-services": {
    title: "Maid Services in Dubai",
    tagline: "Professional Housekeeping, Coming Soon",
    description: "Professional housekeeping and maid services for residential and commercial properties.",
    introText: "Maintaining a clean and organized home can be time-consuming, especially in busy Dubai households. Professional maid services help ensure that every area of the home is hygienic, well-maintained, and ready for daily living.",
    icon: UserCheck,
    heroImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80",
    services: [
      { title: "Routine Home Cleaning", description: "Regular cleaning and upkeep to maintain a fresh and hygienic living space." },
      { title: "Laundry & Linen Management", description: "Assistance with laundry, ironing, and linen organization." },
      { title: "Kitchen & Bathroom Maintenance", description: "Thorough hygiene maintenance for kitchens and bathrooms." },
      { title: "Dusting & Vacuuming", description: "Comprehensive dusting, vacuuming, and furniture care." },
      { title: "Customized Cleaning Schedules", description: "Special requests and flexible cleaning schedules tailored to your needs." }
    ],
    approach: [
      { title: "Safety", description: "Using approved cleaning products and methods safe for all household members." },
      { title: "Consistency", description: "Scheduled cleaning visits to maintain hygiene standards." },
      { title: "Customization", description: "Flexible service plans tailored to household needs." },
      { title: "Dubai-Specific", description: "Designed to handle local dust levels, climate conditions, and lifestyle requirements." }
    ],
    whyMatters: {
      title: "Why Maid Services Matter in Dubai",
      points: ["Dust accumulation from desert winds", "High reliance on air-conditioned indoor environments", "Busy family or work schedules", "Need for professional hygiene standards"]
    },
    process: [
      { step: 1, title: "Consultation", description: "Discuss your household needs and preferences." },
      { step: 2, title: "Service Planning", description: "Create a customized cleaning schedule." },
      { step: 3, title: "Regular Service", description: "Professional cleaning visits as scheduled." },
      { step: 4, title: "Quality Assurance", description: "Ongoing feedback and service adjustments." }
    ],
    ctaText: "Maid Services coming soon! Stay tuned or contact Property Masters to discuss upcoming household support services and schedule priority access once the service launches.",
    relatedServices: [
      { name: "Deep Cleaning", slug: "deep-cleaning" },
      { name: "Furniture Cleaning", slug: "furniture-cleaning" },
      { name: "AC Cleaning", slug: "ac-cleaning" }
    ],
    comingSoon: true
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function WellnessServiceDetail() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const service = serviceSlug ? serviceData[serviceSlug] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F6F4EB] flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold text-[#09263D] mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">The wellness service you're looking for doesn't exist.</p>
          <Button asChild className="bg-[#970A44] hover:bg-[#720632]" data-testid="button-back-wellness">
            <Link href="/wellness">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Wellness Services
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-[#F6F4EB]">
      {/* Hero Section - Professional Two-Column Layout */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0">
          <img 
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09263D]/95 via-[#09263D]/80 to-[#09263D]/50" />
        </div>
        
        <div className="relative z-10 w-full py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link href="/wellness">
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 cursor-pointer"
                    data-testid="link-back"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Wellness Services</span>
                  </motion.div>
                </Link>
                
                {service.comingSoon && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="inline-block mb-4"
                  >
                    <span className="bg-[#970A44] text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                      Coming Soon
                    </span>
                  </motion.div>
                )}
                
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className="w-12 h-12 bg-[#970A44] rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[#970A44] font-semibold text-lg tracking-wide">Property Masters</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-white mb-4 font-serif"
                  data-testid="text-hero-title"
                >
                  {service.title}
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="text-xl md:text-2xl text-[#970A44] font-medium mb-4"
                >
                  {service.tagline}
                </motion.p>
                
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-base md:text-lg leading-relaxed text-white/90 mb-8"
                  data-testid="text-hero-description"
                >
                  {service.introText}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  {!service.comingSoon ? (
                    <>
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
                      <Button 
                        asChild 
                        size="lg"
                        variant="outline"
                        className="border-white text-white hover:bg-white/10 rounded-full"
                        data-testid="button-hero-call"
                      >
                        <Link href="/contact">
                          <Phone className="mr-2 w-4 h-4" />
                          Call Us Now
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <Button 
                      asChild 
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 rounded-full"
                      data-testid="button-hero-notify"
                    >
                      <Link href="/contact">
                        Get Notified When Available
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  )}
                </motion.div>
              </motion.div>

              {/* Right Column - Feature Highlights */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="hidden lg:grid grid-cols-2 gap-4"
                data-testid="hero-features"
              >
                {[
                  { icon: ShieldCheck, title: "Certified Professionals", description: "Trained and experienced technicians" },
                  { icon: Clock, title: "Flexible Scheduling", description: "Appointments that fit your schedule" },
                  { icon: Award, title: "Quality Guaranteed", description: "100% satisfaction promise" },
                  { icon: Leaf, title: "Eco-Friendly", description: "Safe for family and environment" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5"
                  >
                    <div className="w-10 h-10 bg-[#970A44] rounded-lg flex items-center justify-center mb-3">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-white/70 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* What This Service Covers */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              What This Service Covers
            </h2>
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
                <Card className="h-full border-0 shadow-lg" data-testid={`card-service-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#970A44] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-[#09263D]">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-white" data-testid="section-approach">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              Our {service.title.split(' ')[0]} Approach
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We focus on solutions that deliver lasting results for your property.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.approach.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg text-center" data-testid={`card-approach-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-[#970A44]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-6 h-6 text-[#970A44]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-[#09263D]">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-[#09263D]" data-testid="section-why-matters">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-white">
              {service.whyMatters.title}
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Properties in Dubai often face unique challenges that require specialized solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.whyMatters.points.map((point, index) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center"
                data-testid={`card-why-${index}`}
              >
                <p className="text-white font-medium">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#09263D]">
              How Projects Are Handled
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our structured approach ensures consistent, professional results.
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
                className="relative text-center"
                data-testid={`step-${index}`}
              >
                <div className="w-16 h-16 bg-[#970A44] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#09263D]">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-[#970A44]/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#970A44]" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {service.ctaText}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-white text-[#970A44] hover:bg-white/90 font-semibold rounded-full shadow-xl"
                data-testid="button-cta-consult"
              >
                <Link href="/contact">
                  Request Free Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full"
                data-testid="button-cta-call"
              >
                <Link href="/contact">
                  <Phone className="mr-2 w-4 h-4" />
                  Call Us Now
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-white" data-testid="section-related">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-serif text-[#09263D]">
              Related Services
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {service.relatedServices.map((related) => (
              <Link key={related.slug} href={`/wellness/${related.slug}`}>
                <Button variant="outline" className="rounded-full" data-testid={`button-related-${related.slug}`}>
                  {related.name}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
