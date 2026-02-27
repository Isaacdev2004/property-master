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
  Phone,
  Clock,
  ShieldCheck,
  Calendar,
  ThumbsUp,
  Sparkles,
  Bug,
  Waves,
  Home,
  Truck,
  Smartphone,
  Flame,
  Package,
  Star,
  Award,
  Users,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Service data for all 16 maintenance services
const serviceData: Record<string, {
  title: string;
  tagline: string;
  description: string;
  icon: any;
  color: string;
  heroImage: string;
  features: string[];
  benefits: { icon: any; title: string; description: string }[];
  process: { step: number; title: string; description: string }[];
  pricing: { name: string; price: string; features: string[] }[];
  faqs: { question: string; answer: string }[];
}> = {
  disinfection: {
    title: "Disinfection Service",
    tagline: "Professional Sanitization for a Healthier Environment",
    description: "Our comprehensive disinfection services ensure your home or office is thoroughly sanitized using hospital-grade disinfectants and advanced techniques. We eliminate 99.9% of harmful bacteria, viruses, and pathogens.",
    icon: Sparkles,
    color: "bg-[#970A44]",
    heroImage: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1600&q=80",
    features: [
      "Hospital-grade disinfectants",
      "Electrostatic spraying technology",
      "Surface and air sanitization",
      "COVID-19 deep cleaning protocols",
      "Regular sanitization schedules",
      "Certified technicians"
    ],
    benefits: [
      { icon: ShieldCheck, title: "99.9% Germ Kill Rate", description: "Our EPA-approved disinfectants eliminate virtually all harmful pathogens" },
      { icon: Clock, title: "Quick Service", description: "Most spaces can be fully disinfected within 2-4 hours" },
      { icon: Award, title: "Certified Team", description: "All technicians are trained and certified in sanitization protocols" }
    ],
    process: [
      { step: 1, title: "Assessment", description: "We evaluate your space and identify high-touch surfaces and problem areas" },
      { step: 2, title: "Preparation", description: "Areas are prepared and sensitive items are protected" },
      { step: 3, title: "Disinfection", description: "Thorough application using electrostatic sprayers and foggers" },
      { step: 4, title: "Verification", description: "Quality check and certification of sanitized areas" }
    ],
    pricing: [
      { name: "Residential", price: "From AED 350", features: ["Up to 2000 sq ft", "All rooms covered", "Same-day service"] },
      { name: "Commercial", price: "From AED 750", features: ["Up to 5000 sq ft", "After-hours available", "Certificate provided"] },
      { name: "Deep Clean", price: "From AED 1200", features: ["Comprehensive coverage", "Air purification", "Monthly plans available"] }
    ],
    faqs: [
      { question: "How long does the disinfection last?", answer: "The disinfection is effective immediately and provides protection for 7-14 days under normal conditions." },
      { question: "Is it safe for pets and children?", answer: "Yes, once the solution dries (usually 30-60 minutes), the area is completely safe for everyone." },
      { question: "Do we need to leave the premises?", answer: "We recommend vacating the area during treatment and for 30 minutes after completion." }
    ]
  },
  kitchen: {
    title: "Kitchen Equipment Maintenance",
    tagline: "Keep Your Kitchen Running at Peak Performance",
    description: "Professional maintenance and repair services for all kitchen equipment including ovens, refrigerators, dishwashers, exhaust systems, and commercial kitchen appliances. Extend the life of your equipment and ensure food safety compliance.",
    icon: Flame,
    color: "bg-[#1C4668]",
    heroImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&q=80",
    features: [
      "Commercial & residential equipment",
      "Oven & stove repairs",
      "Refrigerator maintenance",
      "Exhaust hood cleaning",
      "Dishwasher servicing",
      "Preventive maintenance contracts"
    ],
    benefits: [
      { icon: Wrench, title: "Expert Technicians", description: "Specialized in all major kitchen equipment brands" },
      { icon: Clock, title: "Minimal Downtime", description: "Quick diagnostics and repairs to keep your kitchen running" },
      { icon: Shield, title: "Warranty Protected", description: "All repairs come with a service warranty" }
    ],
    process: [
      { step: 1, title: "Inspection", description: "Thorough check of all kitchen equipment and systems" },
      { step: 2, title: "Diagnosis", description: "Identify issues and provide detailed repair estimates" },
      { step: 3, title: "Repair/Service", description: "Professional repairs using genuine parts" },
      { step: 4, title: "Testing", description: "Ensure all equipment operates at optimal performance" }
    ],
    pricing: [
      { name: "Basic Service", price: "From AED 200", features: ["Single appliance", "Diagnosis included", "Parts extra"] },
      { name: "Full Kitchen", price: "From AED 500", features: ["All appliances", "Priority scheduling", "Discount on parts"] },
      { name: "AMC Plan", price: "From AED 1800/yr", features: ["Quarterly visits", "All appliances covered", "Free emergency calls"] }
    ],
    faqs: [
      { question: "What brands do you service?", answer: "We service all major brands including Bosch, Siemens, Miele, Sub-Zero, Viking, and more." },
      { question: "Do you provide emergency repairs?", answer: "Yes, we offer 24/7 emergency repair services for commercial kitchens." },
      { question: "Can you service commercial kitchen equipment?", answer: "Absolutely, we specialize in both residential and commercial kitchen equipment." }
    ]
  },
  civil: {
    title: "Civil Minor Works",
    tagline: "Quality Construction & Repair Solutions",
    description: "From minor repairs to small construction projects, our civil works team handles painting, plastering, tiling, waterproofing, and structural repairs with precision and attention to detail.",
    icon: Hammer,
    color: "bg-[#09263D]",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80",
    features: [
      "Wall repairs & plastering",
      "Painting services",
      "Tiling & flooring",
      "Waterproofing",
      "Ceiling repairs",
      "Masonry work"
    ],
    benefits: [
      { icon: Award, title: "Skilled Craftsmen", description: "Experienced workers for quality finishes" },
      { icon: Clock, title: "On-Time Delivery", description: "Projects completed within agreed timelines" },
      { icon: Shield, title: "Quality Materials", description: "Only premium materials used" }
    ],
    process: [
      { step: 1, title: "Site Visit", description: "Assess the scope of work required" },
      { step: 2, title: "Quotation", description: "Detailed cost breakdown provided" },
      { step: 3, title: "Execution", description: "Work carried out by skilled team" },
      { step: 4, title: "Handover", description: "Final inspection and cleanup" }
    ],
    pricing: [
      { name: "Minor Repairs", price: "From AED 150", features: ["Small fixes", "Same-day service", "Immediate quotation"] },
      { name: "Room Works", price: "From AED 800", features: ["Single room", "Paint or tile", "Material included"] },
      { name: "Full Project", price: "Custom Quote", features: ["Multiple rooms", "Complete renovation", "Project management"] }
    ],
    faqs: [
      { question: "Do you handle permits?", answer: "For works requiring permits, we can guide you through the process or handle it on your behalf." },
      { question: "What is the warranty period?", answer: "All civil works come with a 6-month warranty on workmanship." },
      { question: "Can you match existing finishes?", answer: "Yes, we take great care to match existing paint colors and tile patterns." }
    ]
  },
  "cleaning-special": {
    title: "Special Cleaning Services",
    tagline: "Deep Cleaning Beyond the Ordinary",
    description: "Specialized cleaning services for those hard-to-reach places and challenging cleaning tasks. From post-construction cleanup to marble polishing, we handle the tough jobs with expertise.",
    icon: Sparkles,
    color: "bg-[#720632]",
    heroImage: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1600&q=80",
    features: [
      "Post-construction cleaning",
      "Marble & stone polishing",
      "Carpet deep cleaning",
      "Upholstery cleaning",
      "High-rise window cleaning",
      "Grout & tile restoration"
    ],
    benefits: [
      { icon: Sparkles, title: "Specialized Equipment", description: "Industrial-grade cleaning machines" },
      { icon: Users, title: "Trained Specialists", description: "Experts in each cleaning category" },
      { icon: Award, title: "Guaranteed Results", description: "Satisfaction guaranteed or re-clean free" }
    ],
    process: [
      { step: 1, title: "Consultation", description: "Understand your specific cleaning needs" },
      { step: 2, title: "Assessment", description: "On-site evaluation and quotation" },
      { step: 3, title: "Deep Clean", description: "Thorough specialized cleaning" },
      { step: 4, title: "Inspection", description: "Quality check with client" }
    ],
    pricing: [
      { name: "Single Service", price: "From AED 300", features: ["One specialty area", "Professional grade", "Same-week booking"] },
      { name: "Full Property", price: "From AED 1500", features: ["Complete deep clean", "All special services", "Priority scheduling"] },
      { name: "Maintenance Plan", price: "From AED 400/mo", features: ["Monthly deep clean", "Rotating services", "Preferred pricing"] }
    ],
    faqs: [
      { question: "How often should I do a deep clean?", answer: "We recommend special deep cleaning every 3-6 months depending on usage." },
      { question: "Do you clean high-rise windows?", answer: "Yes, we have certified teams for high-rise window cleaning up to 50 floors." },
      { question: "Is marble polishing worth it?", answer: "Absolutely, professional polishing restores shine and extends marble life significantly." }
    ]
  },
  "smart-home": {
    title: "Smart Product Installation",
    tagline: "Transform Your Home with Smart Technology",
    description: "Complete smart home installation and integration services. From smart locks and lighting to full home automation systems, we make your home intelligent and connected.",
    icon: Smartphone,
    color: "bg-[#1C4668]",
    heroImage: "https://images.unsplash.com/photo-1558002038-1055907df827?w=1600&q=80",
    features: [
      "Smart lighting systems",
      "Smart locks & security",
      "Voice assistant integration",
      "Smart thermostats",
      "Home theater setup",
      "Full home automation"
    ],
    benefits: [
      { icon: Smartphone, title: "Latest Technology", description: "We work with all major smart home platforms" },
      { icon: Settings, title: "Custom Programming", description: "Personalized automation scenes" },
      { icon: Wrench, title: "Full Support", description: "Installation, training, and ongoing support" }
    ],
    process: [
      { step: 1, title: "Consultation", description: "Understand your automation goals" },
      { step: 2, title: "Design", description: "Create your smart home plan" },
      { step: 3, title: "Installation", description: "Professional device installation" },
      { step: 4, title: "Training", description: "Learn to use your smart home" }
    ],
    pricing: [
      { name: "Starter Pack", price: "From AED 1500", features: ["Smart lighting", "1 smart lock", "Basic setup"] },
      { name: "Connected Home", price: "From AED 5000", features: ["Full lighting", "Security system", "Voice control"] },
      { name: "Ultimate Smart Home", price: "From AED 15000", features: ["Complete automation", "Custom scenes", "Dedicated support"] }
    ],
    faqs: [
      { question: "Which smart home systems do you support?", answer: "We support Google Home, Amazon Alexa, Apple HomeKit, and Control4." },
      { question: "Can I add more devices later?", answer: "Yes, all our systems are designed to be expandable." },
      { question: "Do you provide training?", answer: "Comprehensive training is included with every installation." }
    ]
  },
  moving: {
    title: "Move In / Move Out Services",
    tagline: "Seamless Transitions for Your Property",
    description: "Complete move-in and move-out services including deep cleaning, minor repairs, painting touch-ups, and property inspections. Perfect for tenants, landlords, and property managers.",
    icon: Truck,
    color: "bg-[#970A44]",
    heroImage: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1600&q=80",
    features: [
      "Deep cleaning services",
      "Wall painting & touch-ups",
      "AC servicing",
      "Fixture repairs",
      "Property inspection",
      "Handover documentation"
    ],
    benefits: [
      { icon: Clock, title: "Quick Turnaround", description: "Get your property ready in 24-48 hours" },
      { icon: Check, title: "Inspection Ready", description: "Pass landlord/agent inspections" },
      { icon: Award, title: "One-Stop Service", description: "All services under one provider" }
    ],
    process: [
      { step: 1, title: "Assessment", description: "Walk-through to identify all requirements" },
      { step: 2, title: "Quote", description: "Comprehensive package pricing" },
      { step: 3, title: "Execution", description: "All services completed on schedule" },
      { step: 4, title: "Handover", description: "Final inspection and sign-off" }
    ],
    pricing: [
      { name: "Studio/1BR", price: "From AED 800", features: ["Deep clean", "Basic repairs", "AC service"] },
      { name: "2-3BR", price: "From AED 1500", features: ["Complete clean", "Paint touch-ups", "All AC units"] },
      { name: "Villa", price: "From AED 3000", features: ["Full property", "Garden cleaning", "Pool service"] }
    ],
    faqs: [
      { question: "How much notice do you need?", answer: "We recommend 3-5 days notice, but we can accommodate urgent requests." },
      { question: "Do you guarantee deposit return?", answer: "While we can't guarantee decisions, our services are designed to meet inspection standards." },
      { question: "Can you coordinate with the real estate agent?", answer: "Yes, we regularly work with agents and can schedule around viewings." }
    ]
  },
  "pest-control": {
    title: "Pest Control Services",
    tagline: "Protect Your Property from Unwanted Guests",
    description: "Comprehensive pest control solutions for residential and commercial properties. We eliminate cockroaches, bed bugs, termites, rodents, and other pests safely and effectively.",
    icon: Bug,
    color: "bg-[#09263D]",
    heroImage: "https://images.unsplash.com/photo-1632935191452-6f7c4dc7e6f8?w=1600&q=80",
    features: [
      "General pest control",
      "Termite treatment",
      "Bed bug elimination",
      "Rodent control",
      "Bird proofing",
      "Fumigation services"
    ],
    benefits: [
      { icon: Shield, title: "Safe Products", description: "WHO-approved, family & pet safe solutions" },
      { icon: Award, title: "Guaranteed Results", description: "Free re-treatment if pests return" },
      { icon: Calendar, title: "Preventive Plans", description: "Regular treatments to prevent infestations" }
    ],
    process: [
      { step: 1, title: "Inspection", description: "Identify pest type and infestation level" },
      { step: 2, title: "Treatment Plan", description: "Customized solution for your property" },
      { step: 3, title: "Treatment", description: "Safe and effective pest elimination" },
      { step: 4, title: "Follow-up", description: "Monitor and prevent re-infestation" }
    ],
    pricing: [
      { name: "One-Time", price: "From AED 250", features: ["Single treatment", "General pests", "30-day warranty"] },
      { name: "Quarterly", price: "From AED 600/yr", features: ["4 treatments", "All pests covered", "Guaranteed protection"] },
      { name: "Monthly", price: "From AED 150/mo", features: ["Commercial grade", "All pests", "Emergency visits"] }
    ],
    faqs: [
      { question: "Are your products safe for children and pets?", answer: "Yes, we use only WHO-approved products that are safe once dried." },
      { question: "How long before I can enter after treatment?", answer: "Typically 2-4 hours depending on the treatment type." },
      { question: "Do you provide termite warranties?", answer: "Yes, our termite treatments come with up to 5-year warranties." }
    ]
  },
  "water-tank": {
    title: "Water Tank Cleaning",
    tagline: "Clean Water for a Healthy Home",
    description: "Professional water tank cleaning and sanitization services to ensure your family has access to clean, safe drinking water. Municipality approved methods and certified technicians.",
    icon: Droplets,
    color: "bg-[#1C4668]",
    heroImage: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1600&q=80",
    features: [
      "Tank draining & cleaning",
      "Pressure washing",
      "Sanitization treatment",
      "Water quality testing",
      "Anti-bacterial coating",
      "Municipality compliance"
    ],
    benefits: [
      { icon: Droplets, title: "Pure Water", description: "Remove sediment, algae, and bacteria" },
      { icon: Award, title: "Certified Process", description: "Municipality-approved cleaning methods" },
      { icon: Shield, title: "Health Protection", description: "Prevent waterborne diseases" }
    ],
    process: [
      { step: 1, title: "Drain", description: "Complete draining of water tank" },
      { step: 2, title: "Scrub", description: "Manual and pressure washing" },
      { step: 3, title: "Sanitize", description: "Anti-bacterial treatment" },
      { step: 4, title: "Test", description: "Water quality verification" }
    ],
    pricing: [
      { name: "Up to 5000L", price: "From AED 400", features: ["Standard cleaning", "Sanitization", "Report provided"] },
      { name: "Up to 15000L", price: "From AED 700", features: ["Commercial tanks", "Full treatment", "Certificate"] },
      { name: "Annual Plan", price: "From AED 700/yr", features: ["2 cleanings/year", "Priority booking", "Discount rate"] }
    ],
    faqs: [
      { question: "How often should I clean my water tank?", answer: "We recommend cleaning every 6 months as per Dubai Municipality guidelines." },
      { question: "Do you provide a cleaning certificate?", answer: "Yes, we provide a municipality-compliant cleaning certificate." },
      { question: "Can you test water quality?", answer: "Yes, we offer water quality testing services for an additional fee." }
    ]
  },
  pool: {
    title: "Swimming Pool Services",
    tagline: "Crystal Clear Pools All Year Round",
    description: "Complete swimming pool maintenance, repair, and renovation services. From regular cleaning to equipment repair and pool resurfacing, we keep your pool in perfect condition.",
    icon: Waves,
    color: "bg-[#720632]",
    heroImage: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1600&q=80",
    features: [
      "Regular pool cleaning",
      "Chemical balancing",
      "Equipment maintenance",
      "Pump & filter repairs",
      "Pool resurfacing",
      "Heating system service"
    ],
    benefits: [
      { icon: Waves, title: "Crystal Clear Water", description: "Perfect chemical balance for safe swimming" },
      { icon: Wrench, title: "Equipment Experts", description: "All major pool equipment brands serviced" },
      { icon: Calendar, title: "Flexible Plans", description: "Weekly, bi-weekly, or monthly service" }
    ],
    process: [
      { step: 1, title: "Assessment", description: "Evaluate pool condition and equipment" },
      { step: 2, title: "Cleaning", description: "Thorough vacuuming and skimming" },
      { step: 3, title: "Treatment", description: "Chemical balancing and sanitization" },
      { step: 4, title: "Report", description: "Service log and recommendations" }
    ],
    pricing: [
      { name: "One-Time", price: "From AED 300", features: ["Full clean", "Chemical check", "Equipment inspection"] },
      { name: "Weekly", price: "From AED 800/mo", features: ["4 visits/month", "All chemicals", "Equipment checks"] },
      { name: "Premium", price: "From AED 1500/mo", features: ["8 visits/month", "All inclusive", "Emergency service"] }
    ],
    faqs: [
      { question: "Do you provide pool chemicals?", answer: "Yes, all chemicals are included in our maintenance packages." },
      { question: "Can you service saltwater pools?", answer: "Yes, we service both chlorine and saltwater pool systems." },
      { question: "What if my pump breaks down?", answer: "We offer 24-hour emergency repair services for equipment failures." }
    ]
  },
  plumbing: {
    title: "Plumbing Services",
    tagline: "Expert Plumbing Solutions You Can Trust",
    description: "Professional plumbing services for all your needs - from emergency repairs to complete bathroom renovations. Licensed plumbers available 24/7 for residential and commercial properties.",
    icon: Droplets,
    color: "bg-[#09263D]",
    heroImage: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1600&q=80",
    features: [
      "Leak detection & repair",
      "Drain cleaning",
      "Water heater service",
      "Bathroom renovations",
      "Pipe installations",
      "Emergency repairs"
    ],
    benefits: [
      { icon: Clock, title: "24/7 Emergency", description: "Round-the-clock service for urgent issues" },
      { icon: Award, title: "Licensed Plumbers", description: "Certified and experienced professionals" },
      { icon: Shield, title: "Guaranteed Work", description: "All repairs come with warranty" }
    ],
    process: [
      { step: 1, title: "Call", description: "Describe your plumbing issue" },
      { step: 2, title: "Dispatch", description: "Technician sent to your location" },
      { step: 3, title: "Diagnose", description: "Identify problem and provide quote" },
      { step: 4, title: "Fix", description: "Complete repair with quality parts" }
    ],
    pricing: [
      { name: "Service Call", price: "From AED 150", features: ["Diagnosis", "Minor repairs", "Same-day service"] },
      { name: "Major Repair", price: "From AED 400", features: ["Complex issues", "Parts included", "Warranty"] },
      { name: "Emergency", price: "From AED 300", features: ["24/7 service", "Immediate response", "Holiday service"] }
    ],
    faqs: [
      { question: "Do you work on weekends?", answer: "Yes, we offer 7-day service including public holidays." },
      { question: "How quickly can you respond to emergencies?", answer: "We aim to arrive within 1-2 hours for emergencies." },
      { question: "Do you provide quotes before work?", answer: "Yes, we always provide a clear quote before starting any work." }
    ]
  },
  "home-improvement": {
    title: "Home Improvement",
    tagline: "Transform Your Living Space",
    description: "Comprehensive home improvement services to enhance your property's value and comfort. From small upgrades to complete renovations, we bring your vision to life.",
    icon: Home,
    color: "bg-[#970A44]",
    heroImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600&q=80",
    features: [
      "Kitchen remodeling",
      "Bathroom upgrades",
      "Flooring installation",
      "Built-in wardrobes",
      "Partition walls",
      "Lighting upgrades"
    ],
    benefits: [
      { icon: Home, title: "Complete Solutions", description: "Design to completion under one roof" },
      { icon: Award, title: "Quality Craftsmanship", description: "Skilled workers and premium materials" },
      { icon: Building2, title: "Value Addition", description: "Improvements that increase property value" }
    ],
    process: [
      { step: 1, title: "Consultation", description: "Discuss your improvement goals" },
      { step: 2, title: "Design", description: "Create detailed plans and 3D visuals" },
      { step: 3, title: "Execution", description: "Professional implementation" },
      { step: 4, title: "Handover", description: "Final touches and walkthrough" }
    ],
    pricing: [
      { name: "Small Projects", price: "From AED 2000", features: ["Minor updates", "Quick turnaround", "Material options"] },
      { name: "Room Renovation", price: "From AED 8000", features: ["Single room", "Design included", "Premium finish"] },
      { name: "Full Renovation", price: "Custom Quote", features: ["Multiple rooms", "Project management", "Full warranty"] }
    ],
    faqs: [
      { question: "Do you handle permits?", answer: "Yes, we manage all necessary permits and approvals." },
      { question: "Can I stay in the property during renovation?", answer: "Depending on scope, we can phase work to minimize disruption." },
      { question: "Do you provide design services?", answer: "Yes, our in-house design team can create custom solutions." }
    ]
  },
  electrical: {
    title: "Electrical Services",
    tagline: "Safe & Reliable Electrical Solutions",
    description: "Licensed electricians for all your electrical needs. From simple repairs to complete rewiring, we ensure your property's electrical systems are safe and efficient.",
    icon: Zap,
    color: "bg-[#1C4668]",
    heroImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&q=80",
    features: [
      "Electrical repairs",
      "Wiring & rewiring",
      "Panel upgrades",
      "Lighting installation",
      "EV charger installation",
      "Safety inspections"
    ],
    benefits: [
      { icon: Zap, title: "Licensed Electricians", description: "Certified professionals for safe work" },
      { icon: Clock, title: "Quick Response", description: "Same-day service for most issues" },
      { icon: Shield, title: "Safety First", description: "All work meets Dubai regulations" }
    ],
    process: [
      { step: 1, title: "Assessment", description: "Evaluate your electrical needs" },
      { step: 2, title: "Quote", description: "Detailed pricing provided" },
      { step: 3, title: "Work", description: "Professional installation/repair" },
      { step: 4, title: "Testing", description: "Safety verification and sign-off" }
    ],
    pricing: [
      { name: "Minor Repair", price: "From AED 150", features: ["Switches & outlets", "Same-day service", "Parts included"] },
      { name: "Installation", price: "From AED 300", features: ["New fixtures", "Circuit additions", "Safety check"] },
      { name: "Full Rewiring", price: "From AED 5000", features: ["Complete property", "Panel upgrade", "Certification"] }
    ],
    faqs: [
      { question: "Are your electricians licensed?", answer: "Yes, all our electricians are DEWA licensed and certified." },
      { question: "Can you install EV chargers?", answer: "Yes, we specialize in EV charger installations for homes and offices." },
      { question: "Do you provide electrical certificates?", answer: "Yes, we provide all necessary electrical compliance certificates." }
    ]
  },
  cleaning: {
    title: "Cleaning Services",
    tagline: "Professional Cleaning for Every Space",
    description: "Comprehensive cleaning services for homes, offices, and commercial spaces. From regular maid service to deep cleaning, we keep your space spotless and healthy.",
    icon: Sparkles,
    color: "bg-[#720632]",
    heroImage: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1600&q=80",
    features: [
      "Regular house cleaning",
      "Deep cleaning",
      "Office cleaning",
      "Post-party cleanup",
      "Laundry & ironing",
      "Window cleaning"
    ],
    benefits: [
      { icon: Users, title: "Trained Staff", description: "Background-checked and professionally trained" },
      { icon: Sparkles, title: "Quality Products", description: "Eco-friendly cleaning supplies" },
      { icon: Calendar, title: "Flexible Scheduling", description: "One-time or regular bookings" }
    ],
    process: [
      { step: 1, title: "Book", description: "Choose service and schedule" },
      { step: 2, title: "Confirm", description: "Receive booking confirmation" },
      { step: 3, title: "Clean", description: "Professional cleaning service" },
      { step: 4, title: "Review", description: "Share feedback for quality assurance" }
    ],
    pricing: [
      { name: "Basic Clean", price: "From AED 120", features: ["3-hour session", "Standard cleaning", "Own supplies"] },
      { name: "Deep Clean", price: "From AED 350", features: ["Full property", "All areas", "Supplies included"] },
      { name: "Regular Plan", price: "From AED 1200/mo", features: ["Weekly visits", "Same cleaner", "Priority booking"] }
    ],
    faqs: [
      { question: "Do I need to provide cleaning supplies?", answer: "We can bring supplies or use yours - your choice." },
      { question: "Can I request the same cleaner each time?", answer: "Yes, regular clients can request their preferred cleaner." },
      { question: "How do I book a last-minute cleaning?", answer: "We can often accommodate same-day bookings based on availability." }
    ]
  },
  ac: {
    title: "Air Conditioning Services",
    tagline: "Stay Cool All Year Round",
    description: "Complete AC solutions from installation to maintenance and repair. Keep your cooling systems running efficiently with our expert technicians and genuine spare parts.",
    icon: Wind,
    color: "bg-[#09263D]",
    heroImage: "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=1600&q=80",
    features: [
      "AC installation",
      "Regular servicing",
      "Repair & troubleshooting",
      "Duct cleaning",
      "Gas refilling",
      "Thermostat installation"
    ],
    benefits: [
      { icon: Wind, title: "Expert Technicians", description: "Certified AC specialists" },
      { icon: Wrench, title: "All Brands", description: "Service all AC brands and types" },
      { icon: Clock, title: "Quick Service", description: "Same-day service available" }
    ],
    process: [
      { step: 1, title: "Book", description: "Schedule your AC service" },
      { step: 2, title: "Inspect", description: "Thorough system check" },
      { step: 3, title: "Service", description: "Cleaning, repair, or installation" },
      { step: 4, title: "Test", description: "Ensure optimal performance" }
    ],
    pricing: [
      { name: "Basic Service", price: "From AED 100", features: ["Filter cleaning", "Performance check", "Quick service"] },
      { name: "Full Service", price: "From AED 180", features: ["Deep cleaning", "Gas check", "All components"] },
      { name: "AMC Package", price: "From AED 500/yr", features: ["3 services/year", "Priority calls", "Discount on repairs"] }
    ],
    faqs: [
      { question: "How often should I service my AC?", answer: "We recommend servicing every 3-4 months in Dubai's climate." },
      { question: "Why is my AC not cooling properly?", answer: "Common causes include dirty filters, low gas, or compressor issues - we can diagnose and fix." },
      { question: "Do you work on all AC brands?", answer: "Yes, we service all major brands including Carrier, Daikin, LG, Samsung, and more." }
    ]
  },
  security: {
    title: "Security Systems",
    tagline: "Protect What Matters Most",
    description: "Complete security solutions for residential and commercial properties. From CCTV installation to access control and smart security systems, we keep you safe.",
    icon: Shield,
    color: "bg-[#1C4668]",
    heroImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1600&q=80",
    features: [
      "CCTV installation",
      "Access control systems",
      "Intercom systems",
      "Alarm systems",
      "Smart locks",
      "24/7 monitoring"
    ],
    benefits: [
      { icon: Shield, title: "Total Protection", description: "Comprehensive security coverage" },
      { icon: Smartphone, title: "Remote Access", description: "Monitor from anywhere" },
      { icon: Award, title: "Licensed Installers", description: "Government-approved technicians" }
    ],
    process: [
      { step: 1, title: "Survey", description: "Security assessment of property" },
      { step: 2, title: "Design", description: "Custom security solution" },
      { step: 3, title: "Install", description: "Professional installation" },
      { step: 4, title: "Train", description: "Learn to use your system" }
    ],
    pricing: [
      { name: "Basic CCTV", price: "From AED 2500", features: ["4 cameras", "1TB storage", "Mobile viewing"] },
      { name: "Smart Security", price: "From AED 5000", features: ["CCTV + smart locks", "Access control", "App integration"] },
      { name: "Enterprise", price: "Custom Quote", features: ["Full property", "Multiple locations", "24/7 monitoring"] }
    ],
    faqs: [
      { question: "Do I need Dubai Police approval?", answer: "For some systems yes, and we handle all approval processes." },
      { question: "Can I view cameras on my phone?", answer: "Yes, all our CCTV systems include mobile app access." },
      { question: "What happens if my system goes down?", answer: "We offer 24/7 support and can respond to technical issues quickly." }
    ]
  },
  packages: {
    title: "Maintenance Packages",
    tagline: "Comprehensive Care for Your Property",
    description: "Annual maintenance contracts that cover all your property needs. Choose from our range of packages or customize your own for complete peace of mind.",
    icon: Package,
    color: "bg-[#970A44]",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80",
    features: [
      "AC maintenance",
      "Plumbing services",
      "Electrical services",
      "Cleaning services",
      "Pest control",
      "Emergency support"
    ],
    benefits: [
      { icon: Package, title: "All-In-One", description: "Multiple services under one contract" },
      { icon: Clock, title: "Priority Service", description: "Fast response for contract holders" },
      { icon: Award, title: "Cost Savings", description: "Save up to 30% vs. individual services" }
    ],
    process: [
      { step: 1, title: "Consult", description: "Discuss your property needs" },
      { step: 2, title: "Customize", description: "Select services for your package" },
      { step: 3, title: "Activate", description: "Start your maintenance plan" },
      { step: 4, title: "Relax", description: "We handle all maintenance" }
    ],
    pricing: [
      { name: "Basic", price: "AED 1458/yr", features: ["AC servicing", "Basic plumbing", "Electrical checks", "Emergency support"] },
      { name: "Standard", price: "AED 2508/yr", features: ["Everything in Basic", "Deep cleaning", "Priority response", "Preventive checks"] },
      { name: "Executive", price: "AED 3768/yr", features: ["Everything in Standard", "Dedicated manager", "Smart home support", "Pool maintenance"] }
    ],
    faqs: [
      { question: "Can I upgrade my package mid-year?", answer: "Yes, you can upgrade anytime and pay the difference." },
      { question: "What is not covered in the packages?", answer: "Major repairs and spare parts are not included but offered at discounted rates." },
      { question: "Is there a contract lock-in period?", answer: "Packages are annual, but we offer monthly payment options." }
    ]
  },
  "emergency-ac": {
    title: "Emergency AC Repair",
    tagline: "24/7 Fast Response AC Emergency Services",
    description: "When your AC breaks down unexpectedly, our emergency repair team is ready to respond immediately. We provide round-the-clock service with certified technicians who can diagnose and fix most AC issues on the spot.",
    icon: Wind,
    color: "bg-[#970A44]",
    heroImage: "https://images.unsplash.com/photo-1631545806609-15df2e5c252a?w=1600&q=80",
    features: [
      "24/7 emergency response",
      "All AC brands serviced",
      "On-site diagnosis & repair",
      "Genuine spare parts",
      "Same-day service guarantee",
      "No extra weekend charges"
    ],
    benefits: [
      { icon: Clock, title: "Rapid Response", description: "Technician at your door within 2 hours" },
      { icon: Wrench, title: "Expert Technicians", description: "Certified AC specialists" },
      { icon: ShieldCheck, title: "Repair Warranty", description: "90-day guarantee on all repairs" }
    ],
    process: [
      { step: 1, title: "Call Us", description: "Contact our 24/7 emergency hotline" },
      { step: 2, title: "Dispatch", description: "Nearest technician dispatched immediately" },
      { step: 3, title: "Diagnose", description: "Quick assessment and cost estimate" },
      { step: 4, title: "Repair", description: "Fix completed with quality parts" }
    ],
    pricing: [
      { name: "Diagnosis", price: "AED 99", features: ["On-site inspection", "Problem identification", "Free if repaired"] },
      { name: "Standard Repair", price: "From AED 250", features: ["Common AC issues", "Parts included", "Same-day service"] },
      { name: "Major Repair", price: "From AED 500", features: ["Compressor issues", "Complex repairs", "Priority handling"] }
    ],
    faqs: [
      { question: "How fast can you respond to emergencies?", answer: "Our average response time is under 2 hours for emergency calls within Dubai." },
      { question: "Do you charge extra for weekend or night calls?", answer: "No, our emergency service rates are the same regardless of the time or day." },
      { question: "What AC brands do you service?", answer: "We service all major brands including Carrier, Daikin, LG, Samsung, Mitsubishi, and more." }
    ]
  },
  "ac-installation": {
    title: "New AC Installation",
    tagline: "Professional AC Installation by Certified Experts",
    description: "Complete AC installation services for residential and commercial properties. We help you choose the right unit, handle professional installation, and ensure optimal performance from day one.",
    icon: Wind,
    color: "bg-[#1C4668]",
    heroImage: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1600&q=80",
    features: [
      "Free site assessment",
      "Energy-efficient recommendations",
      "All AC types installed",
      "Proper drainage setup",
      "Electrical connections",
      "Post-installation testing"
    ],
    benefits: [
      { icon: Award, title: "Expert Installation", description: "Certified installation technicians" },
      { icon: Zap, title: "Energy Efficiency", description: "Optimal placement for efficiency" },
      { icon: Shield, title: "Full Warranty", description: "Installation warranty included" }
    ],
    process: [
      { step: 1, title: "Consultation", description: "Free site assessment" },
      { step: 2, title: "Selection", description: "Choose the right AC unit" },
      { step: 3, title: "Installation", description: "Professional mounting & setup" },
      { step: 4, title: "Testing", description: "Performance verification" }
    ],
    pricing: [
      { name: "Split AC", price: "From AED 350", features: ["Wall-mounted units", "Standard installation", "Testing included"] },
      { name: "Ducted AC", price: "From AED 800", features: ["Central systems", "Ductwork connection", "Multi-zone setup"] },
      { name: "Commercial", price: "Custom Quote", features: ["Large capacity units", "Project management", "VRF systems"] }
    ],
    faqs: [
      { question: "How long does installation take?", answer: "Standard split AC installation takes 2-4 hours. Ducted systems may take 1-2 days." },
      { question: "Do you supply the AC units?", answer: "Yes, we can supply and install, or install units you've purchased elsewhere." },
      { question: "What about old AC disposal?", answer: "We offer removal and eco-friendly disposal of old units for an additional fee." }
    ]
  },
  "ac-ducting": {
    title: "AC Ducting Services",
    tagline: "Expert Ductwork Installation & Repair",
    description: "Professional AC duct installation, repair, and cleaning services. Proper ductwork ensures efficient cooling, better air quality, and lower energy bills for your property.",
    icon: Wind,
    color: "bg-[#09263D]",
    heroImage: "https://images.unsplash.com/photo-1504280317859-665893143562?w=1600&q=80",
    features: [
      "New duct installation",
      "Duct repair & sealing",
      "Insulation services",
      "Air vent installation",
      "Ductwork cleaning",
      "Efficiency optimization"
    ],
    benefits: [
      { icon: Wind, title: "Better Airflow", description: "Optimized duct design" },
      { icon: Zap, title: "Energy Savings", description: "Reduced cooling costs" },
      { icon: Sparkles, title: "Clean Air", description: "Improved indoor air quality" }
    ],
    process: [
      { step: 1, title: "Inspect", description: "Assess current ductwork" },
      { step: 2, title: "Design", description: "Plan optimal layout" },
      { step: 3, title: "Install", description: "Professional installation" },
      { step: 4, title: "Balance", description: "Airflow optimization" }
    ],
    pricing: [
      { name: "Duct Repair", price: "From AED 200", features: ["Leak sealing", "Minor repairs", "Performance check"] },
      { name: "New Installation", price: "From AED 80/m", features: ["Quality materials", "Insulated ducts", "Proper sizing"] },
      { name: "Full System", price: "Custom Quote", features: ["Complete design", "Installation", "Balancing"] }
    ],
    faqs: [
      { question: "How often should ducts be cleaned?", answer: "We recommend professional duct cleaning every 3-5 years or if you notice dust buildup." },
      { question: "Can you install ducts in an existing property?", answer: "Yes, we specialize in retrofitting ductwork in properties without existing systems." },
      { question: "What's the benefit of insulated ducts?", answer: "Insulated ducts prevent energy loss and condensation, improving efficiency by up to 30%." }
    ]
  },
  "wall-painting": {
    title: "Wall Painting Services",
    tagline: "Transform Your Walls with Professional Painting",
    description: "Expert wall painting services for homes and offices. We use premium paints and professional techniques to deliver flawless finishes that enhance your space and last for years.",
    icon: Hammer,
    color: "bg-[#720632]",
    heroImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1600&q=80",
    features: [
      "Interior & exterior walls",
      "Color consultation",
      "Surface preparation",
      "Premium paint brands",
      "Clean & tidy work",
      "Furniture protection"
    ],
    benefits: [
      { icon: Sparkles, title: "Flawless Finish", description: "Smooth, professional results" },
      { icon: Shield, title: "Long Lasting", description: "Quality paints that endure" },
      { icon: Clock, title: "Quick Turnaround", description: "Minimal disruption" }
    ],
    process: [
      { step: 1, title: "Quote", description: "Free on-site estimate" },
      { step: 2, title: "Prep", description: "Surface preparation" },
      { step: 3, title: "Paint", description: "Professional application" },
      { step: 4, title: "Finish", description: "Clean up & inspection" }
    ],
    pricing: [
      { name: "Per Room", price: "From AED 400", features: ["Standard walls", "2 coats", "Paint included"] },
      { name: "Full Apartment", price: "From AED 2,500", features: ["All rooms", "Ceilings included", "Color matching"] },
      { name: "Villa", price: "Custom Quote", features: ["Interior/exterior", "Premium paints", "Project timeline"] }
    ],
    faqs: [
      { question: "How long does painting take?", answer: "A standard room takes 1 day. Full apartments typically 3-5 days depending on size." },
      { question: "Do I need to move furniture?", answer: "We handle furniture protection and moving. Large items may need to be cleared." },
      { question: "What paint brands do you use?", answer: "We use premium brands like Jotun, Dulux, and National Paints for lasting results." }
    ]
  }
};

// Default fallback service for any undefined services
const defaultService = {
  title: "Maintenance Service",
  tagline: "Professional Property Maintenance",
  description: "Quality maintenance services for residential and commercial properties. Our certified technicians deliver reliable repairs and maintenance with guaranteed satisfaction.",
  icon: Wrench,
  color: "bg-[#970A44]",
  heroImage: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1600&q=80",
  features: [
    "Licensed professionals",
    "Quality workmanship",
    "Genuine spare parts",
    "Same-day service available",
    "Work guarantee",
    "24/7 emergency support"
  ],
  benefits: [
    { icon: Shield, title: "Guaranteed Work", description: "All services come with warranty" },
    { icon: Clock, title: "Fast Response", description: "Same-day service available" },
    { icon: Award, title: "Licensed Team", description: "Certified professionals" }
  ],
  process: [
    { step: 1, title: "Request", description: "Book online or call us" },
    { step: 2, title: "Diagnose", description: "Expert assessment of the issue" },
    { step: 3, title: "Execute", description: "Professional repair/maintenance" },
    { step: 4, title: "Verify", description: "Quality check and sign-off" }
  ],
  pricing: [
    { name: "Standard", price: "Contact Us", features: ["Quality service", "Professional team", "Standard parts"] },
    { name: "Premium", price: "Contact Us", features: ["Priority service", "Premium parts", "Extended warranty"] },
    { name: "Emergency", price: "Contact Us", features: ["24/7 availability", "Immediate response", "After-hours service"] }
  ],
  faqs: [
    { question: "How do I book a service?", answer: "You can book online through our form, call us, or WhatsApp for fastest response." },
    { question: "Do you provide warranties?", answer: "Yes, all our work comes with service warranties for your peace of mind." },
    { question: "What areas do you cover?", answer: "We cover all of Dubai and surrounding emirates." }
  ]
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
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

// Helper function to format slug into proper title with common abbreviations
function formatServiceTitle(slug: string): string {
  const abbreviations: Record<string, string> = {
    'ac': 'AC',
    'hvac': 'HVAC',
    'tv': 'TV',
    'cctv': 'CCTV',
    'dewa': 'DEWA',
    'led': 'LED',
    'spc': 'SPC',
    'vrf': 'VRF',
  };
  
  return slug.split("-").map(word => {
    const lower = word.toLowerCase();
    if (abbreviations[lower]) return abbreviations[lower];
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}

export default function MaintenanceServiceDetail() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  
  // Get service data or use default with formatted title
  const service = serviceSlug && serviceData[serviceSlug] 
    ? serviceData[serviceSlug] 
    : {
        ...defaultService,
        title: serviceSlug 
          ? formatServiceTitle(serviceSlug)
          : defaultService.title
      };

  const ServiceIcon = service.icon;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09263D]/95 to-[#09263D]/70" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href="/maintenance">
              <Button variant="ghost" className="text-white/80 hover:text-white mb-6" data-testid="button-back">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to All Services
              </Button>
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center`}>
                <ServiceIcon className="w-8 h-8 text-white" />
              </div>
              <p className="text-[#970A44] font-semibold text-sm uppercase tracking-widest">
                Maintenance Service
              </p>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif" data-testid="text-service-title">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl">
              {service.tagline}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-8"
                data-testid="button-book-service"
              >
                <Link href="/book">
                  Book This Service
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-white/50 text-white hover:bg-white/10 rounded-full px-8"
                data-testid="button-call"
              >
                <a href="tel:+971585707110">
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description & Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl font-bold text-[#09263D] mb-6 font-serif">
                About This Service
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {service.description}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#970A44]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[#970A44]" />
                    </div>
                    <span className="text-[#09263D]">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {service.benefits.map((benefit, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow" data-testid={`card-benefit-${index}`}>
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <benefit.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#09263D] mb-1">{benefit.title}</h3>
                        <p className="text-muted-foreground text-sm">{benefit.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#F6F4EB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-[#970A44] font-semibold text-sm uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#09263D] font-serif">
              Our Process
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            {service.process.map((step, index) => (
              <motion.div key={step.step} variants={staggerItem} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-[#970A44] text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {step.step}
                  </div>
                  {index < service.process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-[#970A44]/20" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#09263D] mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-[#970A44] font-semibold text-sm uppercase tracking-widest mb-3">
              Pricing
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#09263D] font-serif">
              Service Packages
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {service.pricing.map((pkg, index) => (
              <motion.div key={pkg.name} variants={staggerItem} whileHover={{ y: -8 }}>
                <Card 
                  className={`h-full border-0 shadow-xl transition-all ${
                    index === 1 ? 'ring-2 ring-[#970A44] bg-[#970A44] text-white' : 'bg-white'
                  }`}
                  data-testid={`card-pricing-${index}`}
                >
                  <CardContent className="p-8">
                    <h3 className={`text-xl font-bold mb-2 ${index === 1 ? 'text-white' : 'text-[#09263D]'}`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-3xl font-bold mb-6 ${index === 1 ? 'text-white' : 'text-[#970A44]'}`}>
                      {pkg.price}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Check className={`w-4 h-4 flex-shrink-0 ${index === 1 ? 'text-white' : 'text-[#970A44]'}`} />
                          <span className={index === 1 ? 'text-white/90' : ''}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild
                      className={`w-full rounded-full ${
                        index === 1 
                          ? 'bg-white text-[#970A44] hover:bg-white/90' 
                          : 'bg-[#970A44] hover:bg-[#720632] text-white'
                      }`}
                      data-testid={`button-select-${pkg.name.toLowerCase()}`}
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
      <section className="py-24 bg-[#09263D]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-[#970A44] font-semibold text-sm uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white font-serif">
              Common Questions
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {service.faqs.map((faq, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="border-0 bg-white/5 backdrop-blur" data-testid={`card-faq-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                    <p className="text-white/70">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#970A44] to-[#720632]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Book your {service.title.toLowerCase()} today and experience the Property Masters difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  asChild
                  size="lg"
                  className="bg-white text-[#970A44] hover:bg-white/90 rounded-full px-10 py-7 text-lg shadow-2xl"
                  data-testid="button-cta-book"
                >
                  <Link href="/book">
                    Book Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  asChild
                  variant="outline" 
                  size="lg"
                  className="border-white/50 text-white hover:bg-white/10 rounded-full px-10 py-7 text-lg"
                  data-testid="button-cta-call"
                >
                  <a href="tel:+971585707110">
                    <Phone className="mr-2 w-5 h-5" />
                    +971 2550 0888
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
