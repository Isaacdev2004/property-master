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
  Paintbrush,
  TestTube,
  Stethoscope,
  Baby,
  Dumbbell,
  Apple,
  Shirt,
  Sparkles,
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
  Truck,
  Package,
  Heart,
  Waves
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Comprehensive service data for all wellness services
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
  relatedServices: { name: string; slug: string }[];
}> = {
  "ac-cleaning": {
    title: "AC Cleaning Services",
    tagline: "Breathe Cleaner, Healthier Air",
    description: "Professional AC cleaning and sanitization services to improve indoor air quality, reduce energy consumption, and extend the life of your air conditioning system. Our certified technicians use hospital-grade disinfectants and advanced cleaning techniques.",
    icon: Wind,
    color: "bg-[#970A44]",
    heroImage: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1600&q=80",
    features: [
      "Deep coil cleaning",
      "Filter replacement & cleaning",
      "Drain line treatment",
      "Mold & bacteria removal",
      "Anti-bacterial treatment",
      "Energy efficiency optimization"
    ],
    benefits: [
      { icon: Wind, title: "Improved Air Quality", description: "Remove 99.9% of dust, allergens, and harmful particles" },
      { icon: Zap, title: "Energy Savings", description: "Clean ACs use up to 25% less energy" },
      { icon: Shield, title: "Extended Lifespan", description: "Regular cleaning extends AC life by years" }
    ],
    process: [
      { step: 1, title: "Inspection", description: "Thorough assessment of your AC system" },
      { step: 2, title: "Protection", description: "Cover surrounding areas to prevent mess" },
      { step: 3, title: "Deep Cleaning", description: "High-pressure wash and sanitization" },
      { step: 4, title: "Testing", description: "Performance check and quality assurance" }
    ],
    pricing: [
      { name: "Single Split AC", price: "From AED 150", features: ["Deep cleaning", "Filter cleaning", "Sanitization"] },
      { name: "Ducted AC", price: "From AED 350", features: ["Full duct cleaning", "Coil treatment", "Deodorization"] },
      { name: "Annual Contract", price: "From AED 800/yr", features: ["4 services/year", "Priority booking", "10% discount"] }
    ],
    faqs: [
      { question: "How often should I clean my AC?", answer: "We recommend professional AC cleaning every 3-4 months for optimal performance and air quality." },
      { question: "How long does the service take?", answer: "A single split AC takes about 45-60 minutes. Ducted systems may take 2-3 hours." },
      { question: "Is the cleaning solution safe?", answer: "Yes, we use eco-friendly, non-toxic cleaning agents safe for your family and pets." }
    ],
    relatedServices: [
      { name: "AC Repair", slug: "ac-repair" },
      { name: "Mold Removal", slug: "mold-removal" },
      { name: "Air Quality Testing", slug: "air-quality-testing" }
    ]
  },
  "carpet-cleaning": {
    title: "Carpet Cleaning Services",
    tagline: "Deep Clean for Fresh, Healthy Carpets",
    description: "Professional carpet cleaning using hot water extraction and steam cleaning methods. We remove deep-seated dirt, stains, allergens, and bacteria, leaving your carpets fresh, sanitized, and looking like new.",
    icon: Sofa,
    color: "bg-[#1C4668]",
    heroImage: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=1600&q=80",
    features: [
      "Hot water extraction",
      "Steam cleaning",
      "Stain removal treatment",
      "Deodorization",
      "Anti-allergen treatment",
      "Quick dry technology"
    ],
    benefits: [
      { icon: Sparkles, title: "Deep Extraction", description: "Removes dirt from deep within carpet fibers" },
      { icon: Leaf, title: "Allergen Removal", description: "Eliminates dust mites and allergens" },
      { icon: Shield, title: "Stain Protection", description: "Optional nano-coating for future protection" }
    ],
    process: [
      { step: 1, title: "Pre-Inspection", description: "Assess carpet condition and identify stains" },
      { step: 2, title: "Pre-Treatment", description: "Apply stain remover to problem areas" },
      { step: 3, title: "Deep Cleaning", description: "Hot water extraction or steam cleaning" },
      { step: 4, title: "Drying", description: "Speed drying for quick use" }
    ],
    pricing: [
      { name: "Per Room", price: "From AED 100", features: ["Up to 15 sqm", "Deep extraction", "Deodorization"] },
      { name: "Full Villa", price: "From AED 600", features: ["All carpeted areas", "Stain treatment", "Same-day service"] },
      { name: "Commercial", price: "Custom Quote", features: ["Large areas", "After-hours service", "Regular contracts"] }
    ],
    faqs: [
      { question: "How long until I can walk on the carpet?", answer: "With our quick-dry technology, carpets are ready to walk on within 2-4 hours." },
      { question: "Can you remove all stains?", answer: "We can remove most stains. Some permanent stains may be significantly reduced but not fully removed." },
      { question: "Is it safe for pets?", answer: "Yes, our cleaning solutions are pet-friendly and non-toxic." }
    ],
    relatedServices: [
      { name: "Sofa Cleaning", slug: "furniture-cleaning" },
      { name: "Upholstery Cleaning", slug: "upholstery-cleaning" },
      { name: "Curtain Cleaning", slug: "curtain-cleaning" }
    ]
  },
  "mattress-cleaning": {
    title: "Mattress Cleaning Services",
    tagline: "Sleep Better on a Clean, Sanitized Mattress",
    description: "Professional mattress cleaning and sanitization to eliminate dust mites, allergens, bacteria, and odors. Our UV treatment and steam cleaning ensures a hygienic sleeping environment for better health and rest.",
    icon: Sofa,
    color: "bg-[#09263D]",
    heroImage: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80",
    features: [
      "UV-C light sanitization",
      "Steam cleaning",
      "Dust mite elimination",
      "Stain removal",
      "Deodorization",
      "Anti-bacterial treatment"
    ],
    benefits: [
      { icon: Heart, title: "Better Sleep", description: "Clean mattresses improve sleep quality" },
      { icon: Shield, title: "Allergy Relief", description: "Remove 99% of dust mites and allergens" },
      { icon: Sparkles, title: "Fresh & Clean", description: "Eliminate odors and bacteria" }
    ],
    process: [
      { step: 1, title: "Vacuuming", description: "Remove surface dust and debris" },
      { step: 2, title: "Stain Treatment", description: "Pre-treat visible stains" },
      { step: 3, title: "Deep Clean", description: "Steam and UV sanitization" },
      { step: 4, title: "Drying", description: "Quick dry for same-day use" }
    ],
    pricing: [
      { name: "Single Mattress", price: "From AED 120", features: ["Full cleaning", "UV treatment", "Deodorization"] },
      { name: "King Size", price: "From AED 180", features: ["Deep extraction", "Stain removal", "Anti-allergen"] },
      { name: "Full Home", price: "From AED 400", features: ["All mattresses", "Pillows included", "Bulk discount"] }
    ],
    faqs: [
      { question: "How often should I clean my mattress?", answer: "We recommend professional mattress cleaning every 6 months for optimal hygiene." },
      { question: "Will my mattress be dry tonight?", answer: "Yes, our cleaning method leaves mattresses dry within 2-3 hours." },
      { question: "Can you remove urine stains?", answer: "Yes, we have specialized treatments for organic stains including urine." }
    ],
    relatedServices: [
      { name: "Pillow Cleaning", slug: "pillow-cleaning" },
      { name: "Sofa Cleaning", slug: "furniture-cleaning" },
      { name: "Carpet Cleaning", slug: "carpet-cleaning" }
    ]
  },
  "furniture-cleaning": {
    title: "Furniture Cleaning Services",
    tagline: "Revitalize Your Sofas and Upholstery",
    description: "Complete furniture cleaning and sanitization for sofas, chairs, ottomans, and all upholstered items. Our professional deep cleaning removes stains, odors, and allergens while preserving fabric quality.",
    icon: Sofa,
    color: "bg-[#720632]",
    heroImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80",
    features: [
      "Deep steam cleaning",
      "Fabric-safe solutions",
      "Stain extraction",
      "Leather conditioning",
      "Deodorization",
      "Fabric protection coating"
    ],
    benefits: [
      { icon: Sparkles, title: "Like-New Appearance", description: "Restore your furniture's original beauty" },
      { icon: Leaf, title: "Healthier Home", description: "Remove allergens and bacteria" },
      { icon: Shield, title: "Fabric Protection", description: "Optional nano-coating extends furniture life" }
    ],
    process: [
      { step: 1, title: "Assessment", description: "Identify fabric type and cleaning method" },
      { step: 2, title: "Pre-Treatment", description: "Apply appropriate cleaning agents" },
      { step: 3, title: "Deep Clean", description: "Steam or extraction cleaning" },
      { step: 4, title: "Protection", description: "Optional stain guard application" }
    ],
    pricing: [
      { name: "3-Seater Sofa", price: "From AED 200", features: ["Deep cleaning", "Stain removal", "Deodorization"] },
      { name: "L-Shape Sofa", price: "From AED 350", features: ["Complete cleaning", "All cushions", "Sanitization"] },
      { name: "Full Living Room", price: "From AED 600", features: ["Sofa set", "Armchairs", "Ottoman"] }
    ],
    faqs: [
      { question: "How long until furniture is dry?", answer: "Most furniture dries within 4-6 hours depending on fabric type." },
      { question: "Do you clean leather sofas?", answer: "Yes, we have specialized leather cleaning and conditioning services." },
      { question: "Is the cleaning pet-safe?", answer: "Absolutely, all our cleaning agents are non-toxic and pet-friendly." }
    ],
    relatedServices: [
      { name: "Carpet Cleaning", slug: "carpet-cleaning" },
      { name: "Mattress Cleaning", slug: "mattress-cleaning" },
      { name: "Curtain Cleaning", slug: "curtain-cleaning" }
    ]
  },
  "deep-cleaning": {
    title: "Home Deep Cleaning Services",
    tagline: "Complete Home Transformation",
    description: "Comprehensive deep cleaning services for your entire home. From move-in/move-out cleaning to regular deep cleaning, we cover every corner of your property with meticulous attention to detail.",
    icon: Home,
    color: "bg-[#970A44]",
    heroImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80",
    features: [
      "Kitchen deep clean",
      "Bathroom sanitization",
      "Window cleaning",
      "Floor scrubbing",
      "Appliance cleaning",
      "Cabinet interior cleaning"
    ],
    benefits: [
      { icon: Home, title: "Complete Coverage", description: "Every room, every corner, spotlessly clean" },
      { icon: Clock, title: "Time Saving", description: "Professional team completes faster" },
      { icon: Award, title: "Guaranteed Quality", description: "Satisfaction guaranteed or re-clean free" }
    ],
    process: [
      { step: 1, title: "Walkthrough", description: "Assess the scope of cleaning needed" },
      { step: 2, title: "Top to Bottom", description: "Clean from ceilings to floors" },
      { step: 3, title: "Detail Work", description: "Focus on overlooked areas" },
      { step: 4, title: "Final Check", description: "Quality inspection before handover" }
    ],
    pricing: [
      { name: "Studio/1BR", price: "From AED 400", features: ["Full deep clean", "4-5 hours", "All areas"] },
      { name: "2-3 BR Apartment", price: "From AED 700", features: ["Complete service", "6-8 hours", "All inclusive"] },
      { name: "Villa", price: "From AED 1200", features: ["Full property", "Team of 3-4", "One-day service"] }
    ],
    faqs: [
      { question: "What's included in deep cleaning?", answer: "Everything from ceiling fans to baseboards, inside appliances, and detailed bathroom/kitchen cleaning." },
      { question: "How long does it take?", answer: "Depending on size, 4-8 hours for apartments, full day for villas." },
      { question: "Do I need to provide supplies?", answer: "No, we bring all professional-grade cleaning supplies and equipment." }
    ],
    relatedServices: [
      { name: "Move-In Cleaning", slug: "move-in-cleaning" },
      { name: "Regular Cleaning", slug: "regular-cleaning" },
      { name: "Post-Construction", slug: "post-construction" }
    ]
  },
  "painting": {
    title: "Painting Services",
    tagline: "Transform Your Space with Color",
    description: "Professional interior and exterior painting services with premium quality paints and expert workmanship. From single room touch-ups to complete property repainting, we deliver flawless finishes.",
    icon: Paintbrush,
    color: "bg-[#1C4668]",
    heroImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1600&q=80",
    features: [
      "Interior painting",
      "Exterior painting",
      "Wall preparation",
      "Color consultation",
      "Textured finishes",
      "Eco-friendly paints"
    ],
    benefits: [
      { icon: Paintbrush, title: "Expert Finish", description: "Smooth, professional-grade results" },
      { icon: Leaf, title: "Low VOC Paints", description: "Safe, eco-friendly paint options" },
      { icon: Clock, title: "Quick Turnaround", description: "Minimal disruption to your routine" }
    ],
    process: [
      { step: 1, title: "Consultation", description: "Color selection and scope assessment" },
      { step: 2, title: "Preparation", description: "Surface prep, patching, and priming" },
      { step: 3, title: "Painting", description: "Professional application techniques" },
      { step: 4, title: "Touch-up", description: "Final inspection and cleanup" }
    ],
    pricing: [
      { name: "Single Room", price: "From AED 500", features: ["Walls & ceiling", "Prep included", "Premium paint"] },
      { name: "Apartment", price: "From AED 2500", features: ["All rooms", "Color consultation", "2-year warranty"] },
      { name: "Villa", price: "Custom Quote", features: ["Interior/exterior", "Project management", "Premium finishes"] }
    ],
    faqs: [
      { question: "How long does painting take?", answer: "A single room takes 1-2 days. Full apartment 3-5 days. Villas 1-2 weeks." },
      { question: "Do you move furniture?", answer: "Yes, we carefully move and cover furniture as part of our service." },
      { question: "What paint brands do you use?", answer: "We use premium brands like Jotun, Dulux, and Benjamin Moore." }
    ],
    relatedServices: [
      { name: "Wall Repairs", slug: "wall-repairs" },
      { name: "Wallpaper Installation", slug: "wallpaper" },
      { name: "Textured Walls", slug: "textured-walls" }
    ]
  },
  "water-tank": {
    title: "Water Tank Cleaning",
    tagline: "Pure Water for a Healthy Family",
    description: "Professional water tank cleaning and sanitization services to ensure your family has access to clean, safe drinking water. We remove sediment, bacteria, algae, and contaminants from all tank types.",
    icon: Droplets,
    color: "bg-[#09263D]",
    heroImage: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1600&q=80",
    features: [
      "Complete tank drainage",
      "High-pressure cleaning",
      "Disinfection treatment",
      "Sediment removal",
      "Anti-bacterial coating",
      "Water quality testing"
    ],
    benefits: [
      { icon: Droplets, title: "Pure Water", description: "Remove 99.9% of contaminants" },
      { icon: Shield, title: "Health Protection", description: "Prevent waterborne diseases" },
      { icon: ShieldCheck, title: "Certified Process", description: "Meets Dubai Municipality standards" }
    ],
    process: [
      { step: 1, title: "Drainage", description: "Empty tank completely" },
      { step: 2, title: "Scrubbing", description: "Remove all sediment and buildup" },
      { step: 3, title: "Sanitization", description: "Apply food-grade disinfectant" },
      { step: 4, title: "Testing", description: "Verify water quality" }
    ],
    pricing: [
      { name: "Small Tank", price: "From AED 200", features: ["Up to 1000L", "Full cleaning", "Certificate"] },
      { name: "Medium Tank", price: "From AED 350", features: ["1000-5000L", "Sanitization", "Water test"] },
      { name: "Large/Villa", price: "From AED 500", features: ["5000L+", "Multiple tanks", "Annual plan available"] }
    ],
    faqs: [
      { question: "How often should I clean my water tank?", answer: "Dubai Municipality recommends cleaning every 6 months." },
      { question: "Is the disinfectant safe?", answer: "Yes, we use food-grade, WHO-approved disinfectants." },
      { question: "Do you provide a certificate?", answer: "Yes, we provide a cleaning certificate for all services." }
    ],
    relatedServices: [
      { name: "Pipeline Disinfection", slug: "pipeline-disinfection" },
      { name: "Water Filters", slug: "water-filters" },
      { name: "Water Testing", slug: "water-testing" }
    ]
  },
  "packages": {
    title: "Wellness Packages & Contracts",
    tagline: "Complete Care at Better Value",
    description: "Comprehensive wellness service packages and annual maintenance contracts designed to keep your home healthy year-round. Save money while ensuring regular professional care for all your wellness needs.",
    icon: Package,
    color: "bg-[#720632]",
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80",
    features: [
      "Bundled services",
      "Priority scheduling",
      "Discounted rates",
      "Flexible plans",
      "Dedicated support",
      "No hidden fees"
    ],
    benefits: [
      { icon: Award, title: "Best Value", description: "Save up to 30% with packages" },
      { icon: Clock, title: "Priority Service", description: "Same-day booking available" },
      { icon: Users, title: "Dedicated Team", description: "Familiar technicians every visit" }
    ],
    process: [
      { step: 1, title: "Consultation", description: "Assess your property needs" },
      { step: 2, title: "Custom Plan", description: "Design your ideal package" },
      { step: 3, title: "Scheduling", description: "Set up your service calendar" },
      { step: 4, title: "Enjoy", description: "Hassle-free wellness care" }
    ],
    pricing: [
      { name: "Essential", price: "AED 1,500/yr", features: ["AC cleaning x4", "Water tank x2", "10% discount"] },
      { name: "Premium", price: "AED 3,000/yr", features: ["All Essential", "Furniture cleaning x2", "Deep clean x1"] },
      { name: "Ultimate", price: "AED 5,000/yr", features: ["All Premium", "Pest control x4", "Priority support"] }
    ],
    faqs: [
      { question: "Can I customize my package?", answer: "Absolutely! We'll create a package tailored to your specific needs." },
      { question: "Are there cancellation fees?", answer: "Annual contracts can be cancelled with 30 days notice, pro-rated refund applies." },
      { question: "Can I add services later?", answer: "Yes, you can add services anytime at preferential contract rates." }
    ],
    relatedServices: [
      { name: "AC Services", slug: "ac-cleaning" },
      { name: "Water Tank", slug: "water-tank" },
      { name: "Furniture Cleaning", slug: "furniture-cleaning" }
    ]
  },
  "pest-control": {
    title: "Pest Control Services",
    tagline: "Protect Your Home from Unwanted Guests",
    description: "Comprehensive pest control solutions for residential and commercial properties. We safely eliminate cockroaches, bed bugs, rodents, termites, mosquitoes, and other pests using eco-friendly methods.",
    icon: Bug,
    color: "bg-[#970A44]",
    heroImage: "https://images.unsplash.com/photo-1632935190767-4be97c0a228b?w=1600&q=80",
    features: [
      "Cockroach control",
      "Bed bug treatment",
      "Rodent elimination",
      "Termite protection",
      "Mosquito control",
      "Preventive treatments"
    ],
    benefits: [
      { icon: Shield, title: "Safe Methods", description: "Family and pet-friendly treatments" },
      { icon: ShieldCheck, title: "Guaranteed Results", description: "Warranty on all treatments" },
      { icon: Leaf, title: "Eco-Friendly", description: "Environmentally responsible solutions" }
    ],
    process: [
      { step: 1, title: "Inspection", description: "Identify pest type and infestation level" },
      { step: 2, title: "Treatment Plan", description: "Customize the best approach" },
      { step: 3, title: "Elimination", description: "Apply targeted treatments" },
      { step: 4, title: "Prevention", description: "Seal entry points and prevent return" }
    ],
    pricing: [
      { name: "Single Treatment", price: "From AED 200", features: ["One pest type", "Full property", "30-day warranty"] },
      { name: "Complete Home", price: "From AED 450", features: ["All common pests", "Interior/exterior", "60-day warranty"] },
      { name: "Annual Contract", price: "From AED 1,200/yr", features: ["Quarterly visits", "All pests covered", "24/7 emergency"] }
    ],
    faqs: [
      { question: "Is pest control safe for children?", answer: "Yes, we use child-safe and pet-safe treatments. We recommend staying out for 2-4 hours after treatment." },
      { question: "How long does treatment last?", answer: "Depending on the pest and treatment, protection lasts 30-90 days." },
      { question: "Do you offer guarantees?", answer: "Yes, all treatments come with a satisfaction guarantee and free re-treatment if needed." }
    ],
    relatedServices: [
      { name: "Termite Control", slug: "termite-control" },
      { name: "Bed Bug Treatment", slug: "bed-bug-treatment" },
      { name: "Rodent Control", slug: "rodent-control" }
    ]
  },
  "iv-drip": {
    title: "IV Drip Therapy at Home",
    tagline: "Wellness & Rejuvenation Delivered to You",
    description: "Professional IV therapy services in the comfort of your home. Our certified nurses administer vitamin infusions, hydration therapy, and wellness drips for energy, immunity, and recovery.",
    icon: Stethoscope,
    color: "bg-[#1C4668]",
    heroImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&q=80",
    features: [
      "Vitamin infusions",
      "Hydration therapy",
      "Immunity boosters",
      "Energy drips",
      "Recovery formulas",
      "Beauty & anti-aging"
    ],
    benefits: [
      { icon: Zap, title: "Fast Results", description: "100% absorption directly into bloodstream" },
      { icon: Home, title: "Home Comfort", description: "No clinic visits needed" },
      { icon: Heart, title: "Personalized", description: "Customized formulas for your needs" }
    ],
    process: [
      { step: 1, title: "Consultation", description: "Discuss your health goals" },
      { step: 2, title: "Assessment", description: "Brief health check by nurse" },
      { step: 3, title: "Treatment", description: "Comfortable 30-45 min session" },
      { step: 4, title: "Follow-up", description: "Post-treatment care advice" }
    ],
    pricing: [
      { name: "Hydration", price: "From AED 399", features: ["Basic hydration", "Vitamin C boost", "45-min session"] },
      { name: "Immunity", price: "From AED 599", features: ["Immune boost", "High-dose vitamins", "Zinc & selenium"] },
      { name: "Executive", price: "From AED 899", features: ["Energy & focus", "B-complex", "Anti-fatigue"] }
    ],
    faqs: [
      { question: "Is IV therapy safe?", answer: "Yes, administered by licensed nurses using sterile equipment and quality formulations." },
      { question: "How often can I do IV therapy?", answer: "Most drips can be done weekly or bi-weekly depending on your goals." },
      { question: "Do you require a doctor's prescription?", answer: "Our protocols are reviewed by physicians. Some treatments may require brief consultation." }
    ],
    relatedServices: [
      { name: "Blood Tests", slug: "blood-tests" },
      { name: "Health Checkup", slug: "health-checkup" },
      { name: "Vitamin Shots", slug: "vitamin-shots" }
    ]
  },
  "movers": {
    title: "Movers & Packers Services",
    tagline: "Stress-Free Moving Experience",
    description: "Professional moving and packing services for residential and commercial relocations. Our trained team handles your belongings with care, ensuring safe and efficient transport to your new location.",
    icon: Truck,
    color: "bg-[#09263D]",
    heroImage: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1600&q=80",
    features: [
      "Professional packing",
      "Furniture disassembly",
      "Secure transport",
      "Unpacking service",
      "Storage solutions",
      "Insurance coverage"
    ],
    benefits: [
      { icon: Shield, title: "Fully Insured", description: "Complete coverage for peace of mind" },
      { icon: Users, title: "Trained Team", description: "Professional, uniformed movers" },
      { icon: Clock, title: "On-Time", description: "Punctual service guaranteed" }
    ],
    process: [
      { step: 1, title: "Survey", description: "Free home assessment and quote" },
      { step: 2, title: "Packing", description: "Professional packing of all items" },
      { step: 3, title: "Moving", description: "Careful loading and transport" },
      { step: 4, title: "Setup", description: "Unpack and arrange at new location" }
    ],
    pricing: [
      { name: "Studio/1BR", price: "From AED 1,200", features: ["Packing materials", "2 movers", "Local move"] },
      { name: "2-3 BR", price: "From AED 2,500", features: ["Full packing", "3-4 movers", "Assembly included"] },
      { name: "Villa", price: "From AED 5,000", features: ["Complete service", "5+ movers", "Premium care"] }
    ],
    faqs: [
      { question: "How far in advance should I book?", answer: "We recommend booking 1-2 weeks ahead, though we do accommodate last-minute moves." },
      { question: "Do you move fragile/valuable items?", answer: "Yes, we have specialized packing for antiques, artwork, and valuable items." },
      { question: "What about storage?", answer: "We offer short and long-term storage solutions in climate-controlled facilities." }
    ],
    relatedServices: [
      { name: "Storage Solutions", slug: "storage" },
      { name: "Deep Cleaning", slug: "deep-cleaning" },
      { name: "Furniture Assembly", slug: "furniture-assembly" }
    ]
  },
  "healthcare": {
    title: "Healthcare at Home",
    tagline: "Medical Care in Your Comfort Zone",
    description: "Comprehensive home healthcare services including doctor visits, blood tests, vaccinations, and health consultations. Our licensed healthcare professionals bring quality medical care to your doorstep.",
    icon: Stethoscope,
    color: "bg-[#970A44]",
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80",
    features: [
      "Doctor consultations",
      "Blood tests & lab work",
      "Vaccinations",
      "Health checkups",
      "Nursing care",
      "Physiotherapy"
    ],
    benefits: [
      { icon: Home, title: "Home Comfort", description: "No waiting rooms or clinic visits" },
      { icon: Clock, title: "Flexible Timing", description: "Appointments at your convenience" },
      { icon: ShieldCheck, title: "Licensed Staff", description: "DHA-certified healthcare professionals" }
    ],
    process: [
      { step: 1, title: "Book", description: "Schedule your appointment online" },
      { step: 2, title: "Confirm", description: "Receive confirmation and prepare" },
      { step: 3, title: "Visit", description: "Professional arrives at your home" },
      { step: 4, title: "Results", description: "Receive reports digitally" }
    ],
    pricing: [
      { name: "Doctor Visit", price: "From AED 350", features: ["GP consultation", "Prescription", "30-min session"] },
      { name: "Blood Test", price: "From AED 199", features: ["Sample collection", "Lab processing", "Digital results"] },
      { name: "Health Package", price: "From AED 799", features: ["Full checkup", "Blood work", "Doctor review"] }
    ],
    faqs: [
      { question: "Are results sent to my doctor?", answer: "Yes, we can share results with your physician upon request." },
      { question: "What if I need medication?", answer: "Our doctors can prescribe medication which can be delivered to you." },
      { question: "Do you accept insurance?", answer: "Yes, we work with most major insurance providers in UAE." }
    ],
    relatedServices: [
      { name: "IV Therapy", slug: "iv-drip" },
      { name: "Physiotherapy", slug: "physiotherapy" },
      { name: "Nursing Care", slug: "nursing-care" }
    ]
  },
  "mold-removal": {
    title: "Mold Removal & Remediation",
    tagline: "Eliminate Mold, Protect Your Health",
    description: "Professional mold inspection, testing, and complete remediation services. We identify the source, remove mold safely, and implement prevention measures to keep your home mold-free.",
    icon: TestTube,
    color: "bg-[#720632]",
    heroImage: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1600&q=80",
    features: [
      "Mold inspection",
      "Air quality testing",
      "Safe removal",
      "HVAC cleaning",
      "Surface treatment",
      "Prevention measures"
    ],
    benefits: [
      { icon: Shield, title: "Health Protection", description: "Remove harmful mold spores" },
      { icon: TestTube, title: "Lab Testing", description: "Identify mold type accurately" },
      { icon: ShieldCheck, title: "Certified Process", description: "Industry-standard remediation" }
    ],
    process: [
      { step: 1, title: "Inspection", description: "Thorough property assessment" },
      { step: 2, title: "Testing", description: "Air and surface sampling" },
      { step: 3, title: "Remediation", description: "Safe mold removal" },
      { step: 4, title: "Prevention", description: "Moisture control measures" }
    ],
    pricing: [
      { name: "Inspection", price: "From AED 350", features: ["Visual inspection", "Moisture testing", "Report provided"] },
      { name: "Small Area", price: "From AED 800", features: ["Up to 10 sqm", "Full removal", "Treatment"] },
      { name: "Full Property", price: "Custom Quote", features: ["Complete remediation", "HVAC cleaning", "Warranty"] }
    ],
    faqs: [
      { question: "Is mold dangerous?", answer: "Some molds produce toxins that can cause respiratory issues and allergies. Professional removal is recommended." },
      { question: "How long does remediation take?", answer: "Small areas 1-2 days, larger areas may take a week." },
      { question: "Will mold come back?", answer: "With proper moisture control and our prevention measures, recurrence is unlikely." }
    ],
    relatedServices: [
      { name: "AC Cleaning", slug: "ac-cleaning" },
      { name: "Air Quality Testing", slug: "air-quality-testing" },
      { name: "Water Damage", slug: "water-damage" }
    ]
  },
  "air-quality-testing": {
    title: "Indoor Air Quality Testing",
    tagline: "Breathe Easy with Confidence",
    description: "Comprehensive indoor air quality assessment using advanced testing equipment. We measure pollutants, allergens, VOCs, and other contaminants to help you understand and improve your indoor air.",
    icon: Wind,
    color: "bg-[#1C4668]",
    heroImage: "https://images.unsplash.com/photo-1530533718754-001d2668365a?w=1600&q=80",
    features: [
      "Particulate matter testing",
      "VOC measurement",
      "CO2 levels",
      "Humidity assessment",
      "Mold spore count",
      "Allergen detection"
    ],
    benefits: [
      { icon: TestTube, title: "Accurate Data", description: "Lab-grade testing equipment" },
      { icon: Heart, title: "Health Insights", description: "Understand what you're breathing" },
      { icon: Sparkles, title: "Solutions", description: "Recommendations for improvement" }
    ],
    process: [
      { step: 1, title: "Setup", description: "Install testing equipment" },
      { step: 2, title: "Sampling", description: "Collect air samples" },
      { step: 3, title: "Analysis", description: "Lab analysis of samples" },
      { step: 4, title: "Report", description: "Detailed findings and solutions" }
    ],
    pricing: [
      { name: "Basic Test", price: "From AED 450", features: ["PM2.5, PM10", "CO2, humidity", "Same-day results"] },
      { name: "Comprehensive", price: "From AED 850", features: ["All parameters", "VOC testing", "Mold spores"] },
      { name: "Full Assessment", price: "From AED 1,500", features: ["Multiple rooms", "Lab analysis", "Consultation"] }
    ],
    faqs: [
      { question: "How long does testing take?", answer: "Basic testing takes 1-2 hours. Comprehensive testing may need 24-48 hours." },
      { question: "When should I test?", answer: "If you experience allergies, odors, or have concerns about air quality." },
      { question: "What do you test for?", answer: "Particulates, gases, VOCs, humidity, mold spores, and allergens." }
    ],
    relatedServices: [
      { name: "Mold Testing", slug: "mold-removal" },
      { name: "AC Cleaning", slug: "ac-cleaning" },
      { name: "Air Purifiers", slug: "air-purifiers" }
    ]
  },
  "water-services": {
    title: "Water & Pipeline Services",
    tagline: "Clean Water, Healthy Life",
    description: "Complete water system care including tank cleaning, pipeline disinfection, water filtration, and quality testing. Ensure your family has access to safe, clean water throughout your home.",
    icon: Droplets,
    color: "bg-[#09263D]",
    heroImage: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1600&q=80",
    features: [
      "Water tank cleaning",
      "Pipeline disinfection",
      "Water filtration systems",
      "Quality testing",
      "Purifier installation",
      "Maintenance contracts"
    ],
    benefits: [
      { icon: Droplets, title: "Pure Water", description: "Clean water throughout your home" },
      { icon: Shield, title: "Health Safety", description: "Remove harmful contaminants" },
      { icon: ShieldCheck, title: "Compliance", description: "Meet Dubai Municipality standards" }
    ],
    process: [
      { step: 1, title: "Assessment", description: "Evaluate your water system" },
      { step: 2, title: "Treatment", description: "Clean tanks and pipelines" },
      { step: 3, title: "Filtration", description: "Install purification if needed" },
      { step: 4, title: "Testing", description: "Verify water quality" }
    ],
    pricing: [
      { name: "Tank Cleaning", price: "From AED 200", features: ["Complete cleaning", "Sanitization", "Certificate"] },
      { name: "Full System", price: "From AED 500", features: ["Tank + pipeline", "Disinfection", "Quality test"] },
      { name: "Annual Plan", price: "From AED 800/yr", features: ["2 cleanings/year", "Priority service", "Free testing"] }
    ],
    faqs: [
      { question: "How often should I clean my water tank?", answer: "Every 6 months as recommended by Dubai Municipality." },
      { question: "Do you test water quality?", answer: "Yes, we offer comprehensive water quality testing services." },
      { question: "What water filters do you recommend?", answer: "We recommend filters based on your specific water quality test results." }
    ],
    relatedServices: [
      { name: "Water Tank Cleaning", slug: "water-tank" },
      { name: "Water Testing", slug: "water-testing" },
      { name: "Water Filters", slug: "water-filters" }
    ]
  },
  "ac-services": {
    title: "Complete AC Services",
    tagline: "Your AC Care Specialists",
    description: "Full range of AC services from cleaning and maintenance to repair and installation. Keep your home cool and comfortable year-round with our expert technicians and quality service.",
    icon: Wind,
    color: "bg-[#970A44]",
    heroImage: "https://images.unsplash.com/photo-1631545806609-11e27e55a72d?w=1600&q=80",
    features: [
      "AC cleaning",
      "Coil treatment",
      "Repair & maintenance",
      "Installation",
      "Duct cleaning",
      "Annual contracts"
    ],
    benefits: [
      { icon: Wind, title: "Better Cooling", description: "Optimal AC performance" },
      { icon: Zap, title: "Energy Efficient", description: "Reduce electricity bills" },
      { icon: Clock, title: "24/7 Support", description: "Emergency repairs available" }
    ],
    process: [
      { step: 1, title: "Diagnosis", description: "Identify issues and needs" },
      { step: 2, title: "Service", description: "Professional treatment" },
      { step: 3, title: "Testing", description: "Performance verification" },
      { step: 4, title: "Maintenance", description: "Ongoing care plan" }
    ],
    pricing: [
      { name: "Split AC Service", price: "From AED 150", features: ["Deep cleaning", "Filter service", "Gas check"] },
      { name: "Ducted AC", price: "From AED 400", features: ["Complete service", "Duct inspection", "Coil cleaning"] },
      { name: "AMC", price: "From AED 800/yr", features: ["4 services/year", "Priority response", "Parts discount"] }
    ],
    faqs: [
      { question: "How often should I service my AC?", answer: "Every 3 months for optimal performance." },
      { question: "Do you handle all AC brands?", answer: "Yes, our technicians are trained on all major brands." },
      { question: "What if my AC needs repair?", answer: "We provide repair services with genuine parts and warranty." }
    ],
    relatedServices: [
      { name: "AC Cleaning", slug: "ac-cleaning" },
      { name: "AC Repair", slug: "ac-repair" },
      { name: "AC Installation", slug: "ac-installation" }
    ]
  }
};

// Default fallback service for any undefined services
const defaultService = {
  title: "Wellness Service",
  tagline: "Premium Home Wellness Solutions",
  description: "Professional wellness services designed to create a healthier home environment. Our certified experts use advanced technology and eco-friendly solutions for optimal results.",
  icon: Heart,
  color: "bg-[#970A44]",
  heroImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
  features: [
    "Certified professionals",
    "Eco-friendly solutions",
    "Advanced technology",
    "Same-day service available",
    "Quality guarantee",
    "After-service support"
  ],
  benefits: [
    { icon: Shield, title: "Quality Assured", description: "100% satisfaction guarantee" },
    { icon: Clock, title: "Fast Service", description: "Same-day availability" },
    { icon: Award, title: "Certified Team", description: "Trained professionals" }
  ],
  process: [
    { step: 1, title: "Book", description: "Schedule your service online or by phone" },
    { step: 2, title: "Assess", description: "Our expert evaluates your needs" },
    { step: 3, title: "Service", description: "Professional service delivery" },
    { step: 4, title: "Review", description: "Quality check and feedback" }
  ],
  pricing: [
    { name: "Standard", price: "Contact Us", features: ["Quality service", "Professional team", "Standard materials"] },
    { name: "Premium", price: "Contact Us", features: ["Enhanced service", "Priority scheduling", "Premium materials"] },
    { name: "Complete", price: "Contact Us", features: ["Full package", "Extended warranty", "VIP support"] }
  ],
  faqs: [
    { question: "How do I book a service?", answer: "You can book online, call us, or use our booking form for a free quote." },
    { question: "Do you offer warranties?", answer: "Yes, all our services come with quality guarantees and warranties." },
    { question: "Are your products safe?", answer: "We use certified, eco-friendly products safe for families and pets." }
  ],
  relatedServices: [
    { name: "AC Cleaning", slug: "ac-cleaning" },
    { name: "Deep Cleaning", slug: "deep-cleaning" },
    { name: "Carpet Cleaning", slug: "carpet-cleaning" }
  ]
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function WellnessServiceDetail() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  
  // Get service data or use default with formatted title
  const service = serviceSlug && serviceData[serviceSlug] 
    ? serviceData[serviceSlug] 
    : {
        ...defaultService,
        title: serviceSlug 
          ? serviceSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
          : defaultService.title
      };

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-[#F6F4EB]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20" data-testid="section-hero">
        <div className="absolute inset-0">
          <img 
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09263D]/90 via-[#09263D]/70 to-[#09263D]/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href="/wellness">
              <Button variant="ghost" className="text-white hover:bg-white/10 mb-6" data-testid="button-back">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Wellness
              </Button>
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-white/80 text-lg">{service.tagline}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif">
              {service.title}
            </h1>
            
            <p className="text-white/80 text-lg max-w-2xl mb-8">
              {service.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-[#970A44] hover:bg-[#720632] rounded-full px-8"
                data-testid="button-book-now"
              >
                <Link href="/book">
                  Book Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-8"
                data-testid="button-call"
              >
                <a href="tel:+971585707110">
                  <Phone className="mr-2 w-5 h-5" />
                  Call Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" data-testid="section-features">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D] mb-4">
              What's Included
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive service covers everything you need
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-[#F6F4EB] rounded-xl"
                data-testid={`feature-${index}`}
              >
                <div className="w-8 h-8 bg-[#970A44]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-[#970A44]" />
                </div>
                <span className="text-[#09263D] font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-benefits">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D] mb-4">
              Why Choose This Service
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {service.benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg text-center h-full" data-testid={`benefit-${index}`}>
                    <CardContent className="p-8">
                      <div className="w-16 h-16 mx-auto bg-[#970A44]/10 rounded-2xl flex items-center justify-center mb-4">
                        <BenefitIcon className="w-8 h-8 text-[#970A44]" />
                      </div>
                      <h3 className="font-bold text-lg text-[#09263D] mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D] mb-4">
              Our Process
            </h2>
            <p className="text-muted-foreground">Simple, efficient, and professional</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative"
                data-testid={`process-${index}`}
              >
                <div className="w-16 h-16 mx-auto bg-[#970A44] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-lg text-[#09263D] mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
                {index < service.process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-[#970A44]/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-[#09263D]" data-testid="section-pricing">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">
              Pricing Plans
            </h2>
            <p className="text-white/70">Transparent pricing with no hidden fees</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {service.pricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`border-0 shadow-xl h-full ${index === 1 ? 'ring-2 ring-[#970A44]' : ''}`} data-testid={`pricing-${index}`}>
                  <CardContent className="p-8">
                    {index === 1 && (
                      <span className="inline-block bg-[#970A44] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                        Most Popular
                      </span>
                    )}
                    <h3 className="font-bold text-xl text-[#09263D] mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-[#970A44] mb-6">{plan.price}</div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <Check className="w-5 h-5 text-[#970A44]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild
                      className={`w-full rounded-full ${index === 1 ? 'bg-[#970A44] hover:bg-[#720632]' : 'bg-[#09263D] hover:bg-[#09263D]/90'}`}
                      data-testid={`button-select-${index}`}
                    >
                      <Link href="/book">
                        Select Plan
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white" data-testid="section-faq">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D] mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-md" data-testid={`faq-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-[#09263D] mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-[#F6F4EB]" data-testid="section-related">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D] mb-4">
              Related Services
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {service.relatedServices.map((related, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/wellness/${related.slug}`}>
                  <Button 
                    variant="outline" 
                    className="rounded-full border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
                    data-testid={`related-${index}`}
                  >
                    {related.name}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#970A44]" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Book your {service.title.toLowerCase()} today and experience the Property Masters difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-white text-[#970A44] hover:bg-gray-100 rounded-full px-8"
                data-testid="button-cta-book"
              >
                <Link href="/book">
                  Book Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-8"
                data-testid="button-cta-contact"
              >
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
