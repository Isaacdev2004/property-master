import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft,
  Home,
  Paintbrush,
  Layers,
  Waves,
  TreePine,
  Gem,
  Building2,
  UtensilsCrossed,
  Bed,
  Bath,
  Sofa,
  Baby,
  Lamp,
  LayoutGrid,
  Check,
  Phone,
  Clock,
  ShieldCheck,
  Calendar,
  ThumbsUp,
  Star,
  Award,
  Users,
  Sparkles,
  Zap,
  Shield,
  Ruler,
  Palette,
  Eye,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Comprehensive service data for all interior design services
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
  gallery: { image: string; title: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: { name: string; slug: string }[];
}> = {
  // Residential Renovation Services
  "kitchen-remodeling": {
    title: "Kitchen Remodeling",
    tagline: "Transform Your Culinary Space",
    description: "Complete kitchen renovation services including layout redesign, cabinet installation, countertop fitting, and modern appliance integration. Create your dream kitchen with our expert designers and craftsmen.",
    icon: UtensilsCrossed,
    color: "bg-[#970A44]",
    heroImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80",
    features: [
      "Custom cabinet design & installation",
      "Countertop selection & fitting",
      "Modern appliance integration",
      "Lighting design & installation",
      "Flooring & backsplash tiling",
      "Plumbing & electrical upgrades"
    ],
    benefits: [
      { icon: Palette, title: "Custom Design", description: "Tailored to your cooking style and preferences" },
      { icon: Zap, title: "Modern Efficiency", description: "Energy-efficient appliances and smart solutions" },
      { icon: Shield, title: "Quality Materials", description: "Premium materials with long-lasting durability" }
    ],
    process: [
      { step: 1, title: "Consultation", description: "Discuss your vision, needs, and budget" },
      { step: 2, title: "Design", description: "3D visualization and material selection" },
      { step: 3, title: "Construction", description: "Professional installation by certified team" },
      { step: 4, title: "Handover", description: "Final inspection and quality assurance" }
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", title: "Modern White Kitchen" },
      { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", title: "Contemporary Open Kitchen" },
      { image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80", title: "Luxury Kitchen Design" },
      { image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80", title: "Minimalist Kitchen" },
      { image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80", title: "Classic Kitchen Style" },
      { image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80", title: "Elegant Kitchen Finish" }
    ],
    faqs: [
      { question: "How long does a kitchen remodel take?", answer: "A typical kitchen remodel takes 4-8 weeks depending on scope and complexity." },
      { question: "Do you handle permits?", answer: "Yes, we manage all necessary permits and approvals for your renovation." },
      { question: "Can I use my kitchen during renovation?", answer: "We can set up a temporary kitchen area to minimize disruption." }
    ],
    relatedServices: [
      { name: "Modular Kitchen", slug: "modular-kitchen" },
      { name: "Kitchen Wall Tiles", slug: "kitchen-tiles" },
      { name: "Countertops", slug: "countertops" }
    ]
  },
  "wardrobe": {
    title: "Wardrobe Design",
    tagline: "Organize Your Life in Style",
    description: "Custom wardrobe solutions designed to maximize storage and complement your bedroom aesthetics. From walk-in closets to built-in wardrobes, we create functional and beautiful storage spaces.",
    icon: LayoutGrid,
    color: "bg-[#1C4668]",
    heroImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=1600&q=80",
    features: [
      "Custom dimensions & layouts",
      "Premium materials & finishes",
      "Internal organization systems",
      "Soft-close mechanisms",
      "LED lighting integration",
      "Mirror & accessory options"
    ],
    benefits: [
      { icon: Ruler, title: "Perfect Fit", description: "Designed to your exact specifications" },
      { icon: Eye, title: "Aesthetic Appeal", description: "Enhances your bedroom décor" },
      { icon: Settings, title: "Smart Storage", description: "Maximizes every inch of space" }
    ],
    process: [
      { step: 1, title: "Measure", description: "Precise measurements of your space" },
      { step: 2, title: "Design", description: "Custom design with 3D visualization" },
      { step: 3, title: "Manufacture", description: "Factory-crafted to specifications" },
      { step: 4, title: "Install", description: "Professional installation & setup" }
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80", title: "Walk-in Closet Design" },
      { image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80", title: "Sliding Door Wardrobe" },
      { image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80", title: "Modern Wardrobe System" },
      { image: "https://images.unsplash.com/photo-1598928506311-c55ez633dc0?w=800&q=80", title: "Built-in Wardrobe" },
      { image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", title: "Luxury Closet" },
      { image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80", title: "Contemporary Storage" }
    ],
    faqs: [
      { question: "What materials do you use?", answer: "We use MDF, HDF, solid wood, and premium laminates depending on your preference and budget." },
      { question: "How long does installation take?", answer: "Standard wardrobes take 2-3 days, walk-in closets may take up to a week." },
      { question: "Do you offer a warranty?", answer: "Yes, all our wardrobes come with a 5-year warranty on structure and 2 years on hardware." }
    ],
    relatedServices: [
      { name: "Master Bedroom", slug: "master-bedroom" },
      { name: "Kids Room", slug: "kids-room" },
      { name: "TV Unit", slug: "tv-unit" }
    ]
  },
  "modular-kitchen": {
    title: "Modular Kitchen",
    tagline: "Smart, Stylish & Functional",
    description: "Pre-fabricated modular kitchen solutions that combine style with functionality. Quick installation, easy maintenance, and endless customization options for the modern home.",
    icon: UtensilsCrossed,
    color: "bg-[#09263D]",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    features: [
      "Ready-to-install modules",
      "Wide range of finishes",
      "Soft-close cabinets",
      "Built-in appliance spaces",
      "Easy maintenance surfaces",
      "Customizable layouts"
    ],
    benefits: [
      { icon: Clock, title: "Quick Installation", description: "Ready in 2-3 weeks vs months for traditional" },
      { icon: Sparkles, title: "Easy Maintenance", description: "Stain-resistant and easy-clean surfaces" },
      { icon: Palette, title: "Design Flexibility", description: "Mix and match modules as needed" }
    ],
    process: [
      { step: 1, title: "Select", description: "Choose modules and finishes" },
      { step: 2, title: "Configure", description: "Plan your kitchen layout" },
      { step: 3, title: "Order", description: "Factory production begins" },
      { step: 4, title: "Install", description: "Quick professional installation" }
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", title: "L-Shape Modular Kitchen" },
      { image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", title: "U-Shape Kitchen Design" },
      { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", title: "Island Kitchen" },
      { image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80", title: "Compact Kitchen" },
      { image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80", title: "Modern Modular" },
      { image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80", title: "Premium Finish Kitchen" }
    ],
    faqs: [
      { question: "What's the difference from regular kitchen?", answer: "Modular kitchens use pre-made units that fit together, allowing faster installation and easier upgrades." },
      { question: "Can I add modules later?", answer: "Yes, modular systems are designed for easy expansion and reconfiguration." },
      { question: "What countertop options are available?", answer: "We offer granite, quartz, solid surface, and laminate countertops." }
    ],
    relatedServices: [
      { name: "Kitchen Remodeling", slug: "kitchen-remodeling" },
      { name: "Kitchen Wall Tiles", slug: "kitchen-tiles" },
      { name: "False Ceiling", slug: "false-ceiling" }
    ]
  },
  "living-room": {
    title: "Living Room Design",
    tagline: "Where Life Happens",
    description: "Create the perfect living space that reflects your personality and lifestyle. From minimalist modern to classic elegance, our designers bring your vision to life.",
    icon: Sofa,
    color: "bg-[#720632]",
    heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80",
    features: [
      "Space planning & layout",
      "Furniture selection & placement",
      "Color scheme design",
      "Lighting design",
      "Entertainment unit design",
      "Décor & accessory styling"
    ],
    benefits: [
      { icon: Eye, title: "Visual Harmony", description: "Cohesive design that flows beautifully" },
      { icon: Sofa, title: "Comfort First", description: "Ergonomic furniture arrangement" },
      { icon: Zap, title: "Smart Features", description: "Integrated technology solutions" }
    ],
    process: [
      { step: 1, title: "Discover", description: "Understand your lifestyle and preferences" },
      { step: 2, title: "Design", description: "Create mood boards and 3D renders" },
      { step: 3, title: "Source", description: "Procure furniture and materials" },
      { step: 4, title: "Execute", description: "Install and style your space" }
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", title: "Contemporary Living Room" },
      { image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", title: "Modern Minimalist" },
      { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", title: "Luxury Living Space" },
      { image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80", title: "Classic Living Room" },
      { image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80", title: "Cozy Family Room" },
      { image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80", title: "Open Plan Living" }
    ],
    faqs: [
      { question: "Can you work with my existing furniture?", answer: "Absolutely! We can incorporate your favorite pieces into the new design." },
      { question: "How do you handle the furniture shopping?", answer: "We source furniture from trusted suppliers and manage all purchases and deliveries." },
      { question: "Do you offer virtual design services?", answer: "Yes, we offer e-design packages with detailed plans and shopping lists." }
    ],
    relatedServices: [
      { name: "TV Unit", slug: "tv-unit" },
      { name: "False Ceiling", slug: "false-ceiling" },
      { name: "Flooring", slug: "lvt-flooring" }
    ]
  },
  "master-bedroom": {
    title: "Master Bedroom Design",
    tagline: "Your Personal Sanctuary",
    description: "Design your dream master bedroom - a personal retreat that combines comfort, style, and functionality. From bed placement to wardrobe integration, we create restful havens.",
    icon: Bed,
    color: "bg-[#970A44]",
    heroImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=80",
    features: [
      "Bed & headboard design",
      "Walk-in closet integration",
      "En-suite bathroom coordination",
      "Ambient lighting design",
      "Window treatments",
      "Seating area design"
    ],
    benefits: [
      { icon: Bed, title: "Restful Design", description: "Optimized for quality sleep" },
      { icon: Palette, title: "Personal Style", description: "Reflects your unique taste" },
      { icon: Settings, title: "Smart Storage", description: "Clutter-free living" }
    ],
    process: [
      { step: 1, title: "Assess", description: "Evaluate space and requirements" },
      { step: 2, title: "Design", description: "Create detailed design plans" },
      { step: 3, title: "Build", description: "Custom furniture & installation" },
      { step: 4, title: "Style", description: "Finishing touches & accessories" }
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80", title: "Luxury Master Suite" },
      { image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80", title: "Modern Bedroom" },
      { image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", title: "Classic Elegance" },
      { image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80", title: "Contemporary Style" },
      { image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80", title: "Minimalist Bedroom" },
      { image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80", title: "Cozy Retreat" }
    ],
    faqs: [
      { question: "Can you design the en-suite bathroom too?", answer: "Yes, we offer coordinated design packages for bedroom and bathroom." },
      { question: "What bed sizes do you work with?", answer: "We design for all bed sizes from single to super king." },
      { question: "Do you provide bedding and linens?", answer: "We can source premium bedding as part of our styling service." }
    ],
    relatedServices: [
      { name: "Wardrobe Design", slug: "wardrobe" },
      { name: "Bathroom Design", slug: "bathroom" },
      { name: "False Ceiling", slug: "false-ceiling" }
    ]
  },
  "kids-room": {
    title: "Kids Room Design",
    tagline: "Spaces That Grow With Them",
    description: "Fun, functional, and safe children's room designs that inspire creativity and support development. From nurseries to teen spaces, we create rooms kids love.",
    icon: Baby,
    color: "bg-[#1C4668]",
    heroImage: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=80",
    features: [
      "Age-appropriate design",
      "Safe materials & furniture",
      "Study area integration",
      "Play zone design",
      "Storage solutions",
      "Growth-adaptable layouts"
    ],
    benefits: [
      { icon: Shield, title: "Child Safety", description: "Non-toxic materials and safe design" },
      { icon: Sparkles, title: "Creativity", description: "Inspiring environments for growth" },
      { icon: Settings, title: "Adaptable", description: "Grows with your child" }
    ],
    process: [
      { step: 1, title: "Consult", description: "Discuss child's needs and interests" },
      { step: 2, title: "Design", description: "Create themed or neutral design" },
      { step: 3, title: "Build", description: "Safe installation process" },
      { step: 4, title: "Reveal", description: "Surprise the little ones!" }
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80", title: "Playful Kids Room" },
      { image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80", title: "Study Corner" },
      { image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", title: "Teen Room" },
      { image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", title: "Nursery Design" },
      { image: "https://images.unsplash.com/photo-1618219740975-d40978bb7378?w=800&q=80", title: "Bunk Bed Room" },
      { image: "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=800&q=80", title: "Creative Space" }
    ],
    faqs: [
      { question: "Are the materials safe for children?", answer: "Yes, we only use non-toxic, child-safe materials and finishes." },
      { question: "Can you design shared rooms for siblings?", answer: "Absolutely! We specialize in creating functional shared spaces." },
      { question: "How do you make rooms adaptable for growth?", answer: "We use modular furniture and neutral base designs that can be updated easily." }
    ],
    relatedServices: [
      { name: "Wardrobe Design", slug: "wardrobe" },
      { name: "False Ceiling", slug: "false-ceiling" },
      { name: "Flooring", slug: "vinyl-flooring" }
    ]
  },
  "bathroom": {
    title: "Bathroom Design",
    tagline: "Your Personal Spa",
    description: "Transform your bathroom into a luxurious retreat with our comprehensive bathroom design and renovation services. From powder rooms to master bathrooms, we create stunning wet spaces.",
    icon: Bath,
    color: "bg-[#09263D]",
    heroImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&q=80",
    features: [
      "Complete bathroom renovation",
      "Tile selection & installation",
      "Vanity & storage design",
      "Shower & bathtub installation",
      "Lighting & ventilation",
      "Waterproofing solutions"
    ],
    benefits: [
      { icon: Sparkles, title: "Spa Experience", description: "Luxury finishes and fixtures" },
      { icon: Shield, title: "Waterproof", description: "Professional waterproofing" },
      { icon: Zap, title: "Efficient", description: "Water-saving fixtures" }
    ],
    process: [
      { step: 1, title: "Plan", description: "Layout and fixture selection" },
      { step: 2, title: "Prepare", description: "Demolition and waterproofing" },
      { step: 3, title: "Install", description: "Tiling, plumbing, fixtures" },
      { step: 4, title: "Finish", description: "Final touches and cleaning" }
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80", title: "Modern Bathroom" },
      { image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80", title: "Spa-Style Bathroom" },
      { image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80", title: "Minimalist Design" },
      { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", title: "Luxury Master Bath" },
      { image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80", title: "Walk-in Shower" },
      { image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80", title: "Classic Bathroom" }
    ],
    faqs: [
      { question: "How long does a bathroom renovation take?", answer: "A typical bathroom takes 2-4 weeks depending on scope." },
      { question: "Do you handle plumbing work?", answer: "Yes, we have licensed plumbers as part of our team." },
      { question: "Can you relocate bathroom fixtures?", answer: "Yes, we can move fixtures though this may affect timeline and cost." }
    ],
    relatedServices: [
      { name: "Master Bedroom", slug: "master-bedroom" },
      { name: "Kitchen Wall Tiles", slug: "kitchen-tiles" },
      { name: "Flooring", slug: "vinyl-flooring" }
    ]
  },
  // Flooring Services
  "lvt-flooring": {
    title: "LVT Flooring",
    tagline: "Luxury Vinyl Tile Excellence",
    description: "Premium Luxury Vinyl Tile flooring that combines the beauty of natural materials with exceptional durability and easy maintenance. Perfect for residential and commercial spaces.",
    icon: Layers,
    color: "bg-[#970A44]",
    heroImage: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600&q=80",
    features: [
      "Realistic wood & stone looks",
      "100% waterproof",
      "Scratch & stain resistant",
      "Easy click installation",
      "Underfloor heating compatible",
      "Low maintenance"
    ],
    benefits: [
      { icon: Shield, title: "Durable", description: "Commercial-grade wear layer" },
      { icon: Sparkles, title: "Beautiful", description: "Realistic textures and patterns" },
      { icon: Clock, title: "Quick Install", description: "Floating click system" }
    ],
    process: [
      { step: 1, title: "Measure", description: "Accurate room measurements" },
      { step: 2, title: "Select", description: "Choose design and finish" },
      { step: 3, title: "Prepare", description: "Subfloor preparation" },
      { step: 4, title: "Install", description: "Professional installation" }
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80", title: "Wood Look LVT" },
      { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", title: "Stone Effect LVT" },
      { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", title: "Herringbone Pattern" },
      { image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", title: "Light Oak Finish" },
      { image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", title: "Grey Wood LVT" },
      { image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80", title: "Marble Effect LVT" }
    ],
    faqs: [
      { question: "Is LVT suitable for wet areas?", answer: "Yes, LVT is 100% waterproof and perfect for bathrooms and kitchens." },
      { question: "How long does LVT flooring last?", answer: "Quality LVT can last 15-20 years with proper care." },
      { question: "Can LVT be installed over existing flooring?", answer: "In many cases yes, over flat, stable surfaces. We'll assess during consultation." }
    ],
    relatedServices: [
      { name: "SPC Flooring", slug: "spc-flooring" },
      { name: "Vinyl Flooring", slug: "vinyl-flooring" },
      { name: "Wooden Flooring", slug: "wooden-flooring" }
    ]
  },
  "spc-flooring": {
    title: "SPC Flooring",
    tagline: "Stone Polymer Composite Strength",
    description: "SPC (Stone Polymer Composite) flooring offers the ultimate combination of durability, waterproof performance, and aesthetic appeal. Ideal for high-traffic areas and commercial spaces.",
    icon: Layers,
    color: "bg-[#1C4668]",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    features: [
      "Rigid core construction",
      "100% waterproof",
      "Dent & impact resistant",
      "Temperature stable",
      "Easy installation",
      "Commercial grade durability"
    ],
    benefits: [
      { icon: Shield, title: "Ultra Durable", description: "Handles heavy foot traffic" },
      { icon: Zap, title: "Temperature Stable", description: "No expansion or contraction" },
      { icon: Sparkles, title: "Easy Care", description: "Simple cleaning routine" }
    ],
    process: [
      { step: 1, title: "Assess", description: "Evaluate subfloor condition" },
      { step: 2, title: "Select", description: "Choose from our range" },
      { step: 3, title: "Prep", description: "Level and prepare surface" },
      { step: 4, title: "Install", description: "Click-lock installation" }
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", title: "Natural Oak SPC" },
      { image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80", title: "Grey Stone SPC" },
      { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", title: "Walnut Finish" },
      { image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", title: "Commercial Grade" },
      { image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", title: "Light Wood SPC" },
      { image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80", title: "Dark Oak SPC" }
    ],
    faqs: [
      { question: "What's the difference between SPC and LVT?", answer: "SPC has a rigid stone composite core making it more stable and dent-resistant than flexible LVT." },
      { question: "Is SPC good for underfloor heating?", answer: "Yes, SPC is excellent with underfloor heating systems." },
      { question: "Can SPC be used in commercial spaces?", answer: "Absolutely, SPC is ideal for retail, offices, and high-traffic areas." }
    ],
    relatedServices: [
      { name: "LVT Flooring", slug: "lvt-flooring" },
      { name: "Laminate Flooring", slug: "laminate-flooring" },
      { name: "Gym Flooring", slug: "gym-flooring" }
    ]
  },
  "false-ceiling": {
    title: "False Ceiling Design",
    tagline: "Elevate Your Interiors",
    description: "Transform your space with stunning false ceiling designs. From modern minimalist to elaborate decorative ceilings, we create architectural features that define your space.",
    icon: Layers,
    color: "bg-[#970A44]",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    features: [
      "Gypsum board ceilings",
      "POP (Plaster of Paris)",
      "Stretch ceilings",
      "Integrated lighting",
      "AC duct concealment",
      "Acoustic solutions"
    ],
    benefits: [
      { icon: Eye, title: "Visual Appeal", description: "Dramatic design statement" },
      { icon: Lamp, title: "Lighting", description: "Integrated lighting options" },
      { icon: Shield, title: "Hide Utilities", description: "Conceal wires and ducts" }
    ],
    process: [
      { step: 1, title: "Design", description: "Create ceiling layout and lighting plan" },
      { step: 2, title: "Frame", description: "Install metal framework" },
      { step: 3, title: "Board", description: "Fix ceiling boards" },
      { step: 4, title: "Finish", description: "Paint and install lighting" }
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", title: "Modern False Ceiling" },
      { image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", title: "Cove Lighting Design" },
      { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", title: "Multi-Level Ceiling" },
      { image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", title: "Living Room Ceiling" },
      { image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80", title: "Bedroom Ceiling" },
      { image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80", title: "Decorative Ceiling" }
    ],
    faqs: [
      { question: "What's the minimum ceiling height needed?", answer: "We recommend at least 9 feet (2.7m) original height for a single-level false ceiling." },
      { question: "How long does installation take?", answer: "A typical room takes 2-4 days, larger projects may take 1-2 weeks." },
      { question: "Can you integrate speakers into the ceiling?", answer: "Yes, we can incorporate speakers, smoke detectors, and other fixtures." }
    ],
    relatedServices: [
      { name: "Wall Treatments", slug: "wall" },
      { name: "Living Room Design", slug: "living-room" },
      { name: "Gypsum Partition", slug: "gypsum-partition" }
    ]
  },
  "tv-unit": {
    title: "TV Unit Design",
    tagline: "Entertainment Center Excellence",
    description: "Custom TV unit and entertainment center designs that combine style with functionality. From floating units to full wall installations, we create the perfect focal point for your living space.",
    icon: Lamp,
    color: "bg-[#1C4668]",
    heroImage: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1600&q=80",
    features: [
      "Custom sizing",
      "Cable management",
      "Storage solutions",
      "Ambient lighting",
      "Sound system integration",
      "Display shelving"
    ],
    benefits: [
      { icon: Eye, title: "Focal Point", description: "Stunning visual centerpiece" },
      { icon: Settings, title: "Organized", description: "Hidden cables and clutter" },
      { icon: Palette, title: "Custom", description: "Tailored to your space" }
    ],
    process: [
      { step: 1, title: "Measure", description: "Wall dimensions and TV size" },
      { step: 2, title: "Design", description: "Create custom design" },
      { step: 3, title: "Build", description: "Factory manufacturing" },
      { step: 4, title: "Install", description: "Professional fitting" }
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80", title: "Modern TV Wall" },
      { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", title: "Full Wall Unit" },
      { image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", title: "Floating TV Unit" },
      { image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", title: "Entertainment Center" },
      { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", title: "LED Backlit Unit" },
      { image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80", title: "Minimalist Design" }
    ],
    faqs: [
      { question: "Can you hide all the cables?", answer: "Yes, we include comprehensive cable management in all our designs." },
      { question: "Do you install the TV as well?", answer: "Yes, TV mounting is included in our service." },
      { question: "What about soundbar integration?", answer: "We can design dedicated space for soundbars and speakers." }
    ],
    relatedServices: [
      { name: "Living Room Design", slug: "living-room" },
      { name: "False Ceiling", slug: "false-ceiling" },
      { name: "Wall Treatments", slug: "wall" }
    ]
  },
  // Pool Services
  "pool-design": {
    title: "Swimming Pool Design & Build",
    tagline: "Your Private Oasis Awaits",
    description: "Complete swimming pool design and construction services. From concept to completion, we create stunning pools that transform your outdoor space into a private resort.",
    icon: Waves,
    color: "bg-[#970A44]",
    heroImage: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1600&q=80",
    features: [
      "Custom pool design",
      "All pool types available",
      "Premium materials",
      "Filtration systems",
      "Heating options",
      "Lighting & automation"
    ],
    benefits: [
      { icon: Eye, title: "Stunning Design", description: "Custom shapes and features" },
      { icon: Shield, title: "Quality Build", description: "Built to last generations" },
      { icon: Settings, title: "Smart Systems", description: "Automated maintenance" }
    ],
    process: [
      { step: 1, title: "Consult", description: "Discuss vision and budget" },
      { step: 2, title: "Design", description: "3D visualization and engineering" },
      { step: 3, title: "Build", description: "Expert construction" },
      { step: 4, title: "Commission", description: "System setup and handover" }
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80", title: "Infinity Pool" },
      { image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", title: "Rooftop Pool" },
      { image: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=800&q=80", title: "Garden Pool" },
      { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", title: "Modern Pool Design" },
      { image: "https://images.unsplash.com/photo-1572331165267-854da2b021aa?w=800&q=80", title: "Luxury Pool" },
      { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", title: "Family Pool" }
    ],
    faqs: [
      { question: "How long does pool construction take?", answer: "Typically 8-16 weeks depending on size and complexity." },
      { question: "Do you handle all permits?", answer: "Yes, we manage all necessary approvals and permits." },
      { question: "What maintenance is required?", answer: "We offer ongoing maintenance contracts to keep your pool pristine." }
    ],
    relatedServices: [
      { name: "Pool Lighting", slug: "pool-lighting" },
      { name: "Pergola & Gazebo", slug: "pergola" },
      { name: "Outdoor Kitchen", slug: "outdoor-kitchen" }
    ]
  },
  // Marble & Restoring
  "marble-polishing": {
    title: "Marble Polishing",
    tagline: "Restore the Natural Beauty",
    description: "Professional marble polishing services to restore the shine and beauty of your marble floors, countertops, and surfaces. We bring back the original luster of your natural stone.",
    icon: Gem,
    color: "bg-[#720632]",
    heroImage: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1600&q=80",
    features: [
      "Diamond polishing",
      "Scratch removal",
      "Shine restoration",
      "Sealing & protection",
      "Stain treatment",
      "Edge polishing"
    ],
    benefits: [
      { icon: Sparkles, title: "Mirror Finish", description: "High-gloss shine restored" },
      { icon: Shield, title: "Protection", description: "Sealed against stains" },
      { icon: Clock, title: "Long Lasting", description: "Results last for years" }
    ],
    process: [
      { step: 1, title: "Assess", description: "Evaluate marble condition" },
      { step: 2, title: "Grind", description: "Remove scratches and damage" },
      { step: 3, title: "Polish", description: "Multi-stage diamond polishing" },
      { step: 4, title: "Seal", description: "Apply protective sealant" }
    ],
    gallery: [
      { image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80", title: "Polished Marble Floor" },
      { image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80", title: "Restored Marble" },
      { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", title: "Crystal Finish" },
      { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", title: "High Gloss Result" },
      { image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", title: "Marble Countertop" },
      { image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", title: "Premium Polish" }
    ],
    faqs: [
      { question: "How often should marble be polished?", answer: "We recommend professional polishing every 1-2 years depending on traffic." },
      { question: "Can you remove deep scratches?", answer: "Yes, our diamond grinding process can remove most scratches and etching." },
      { question: "Is the polishing process messy?", answer: "We use dust-free equipment and protect surrounding areas." }
    ],
    relatedServices: [
      { name: "Marble Stain Removal", slug: "marble-stain" },
      { name: "Marble Floor Sealing", slug: "marble-sealing" },
      { name: "Deep Cleaning", slug: "deep-cleaning" }
    ]
  }
};

// Default fallback for any service not explicitly defined
const defaultService = {
  title: "Interior Design Service",
  tagline: "Transform Your Space",
  description: "Professional interior design and renovation services tailored to your needs. Our expert team delivers exceptional results for residential and commercial projects.",
  icon: Paintbrush,
  color: "bg-[#970A44]",
  heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80",
  features: [
    "Custom design solutions",
    "Premium materials",
    "Expert craftsmanship",
    "Project management",
    "Quality assurance",
    "After-sales support"
  ],
  benefits: [
    { icon: Eye, title: "Expert Design", description: "Professional designers with years of experience" },
    { icon: Shield, title: "Quality Materials", description: "Premium materials and finishes" },
    { icon: Clock, title: "Timely Delivery", description: "Projects completed on schedule" }
  ],
  process: [
    { step: 1, title: "Consultation", description: "Discuss your requirements and vision" },
    { step: 2, title: "Design", description: "Create detailed design plans" },
    { step: 3, title: "Execution", description: "Professional implementation" },
    { step: 4, title: "Handover", description: "Quality check and completion" }
  ],
  gallery: [
    { image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", title: "Contemporary Design" },
    { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", title: "Modern Interior" },
    { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", title: "Luxury Space" },
    { image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", title: "Classic Style" },
    { image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80", title: "Premium Finish" },
    { image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80", title: "Expert Craftsmanship" }
  ],
  faqs: [
    { question: "How do I get started?", answer: "Simply contact us for a free consultation. We'll discuss your project and provide a detailed proposal." },
    { question: "What's included in the service?", answer: "Our services include design, materials, installation, and project management." },
    { question: "Do you offer warranties?", answer: "Yes, all our work comes with comprehensive warranties." }
  ],
  relatedServices: [
    { name: "Kitchen Remodeling", slug: "kitchen-remodeling" },
    { name: "Living Room Design", slug: "living-room" },
    { name: "False Ceiling", slug: "false-ceiling" }
  ]
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

export default function InteriorServiceDetail() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  
  // Get service data or use default
  const service = serviceData[serviceSlug || ""] || {
    ...defaultService,
    title: (serviceSlug || "").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#09263D]/90 via-[#09263D]/70 to-[#09263D]/50" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${service.color} mb-6`}>
              <Icon className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-sm">{service.tagline}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-6">
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
                  Book Consultation
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
                <a href="tel:+97125500888">
                  <Phone className="mr-2 w-5 h-5" />
                  Call Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white" data-testid="section-features">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-[#F6F4EB]"
                data-testid={`feature-${index}`}
              >
                <Check className="w-5 h-5 text-[#970A44] mt-0.5 flex-shrink-0" />
                <span className="text-[#09263D] font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-[#F6F4EB]" data-testid="section-benefits">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
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
                      <h3 className="text-xl font-bold text-[#09263D] mb-2">{benefit.title}</h3>
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
      <section className="py-16 bg-white" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D] mb-4">
              Our Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to transform your space
            </p>
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

      {/* Design Gallery Section */}
      <section className="py-16 bg-[#F6F4EB]" data-testid="section-gallery">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D] mb-4">
              Design Inspiration
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our portfolio for ideas and inspiration for your project
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.gallery.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
                data-testid={`gallery-${index}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                  <p className="text-white/80 text-sm">Click to view details</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeInUp}
            className="text-center mt-12"
          >
            <Button 
              asChild
              size="lg"
              className="bg-[#970A44] hover:bg-[#720632] rounded-full px-8"
            >
              <Link href="/book">
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-white" data-testid="section-faqs">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#09263D]">
              FAQs
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {service.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <details className="group" data-testid={`faq-${index}`}>
                  <summary className="flex items-center justify-between p-5 bg-[#F6F4EB] rounded-lg cursor-pointer hover-elevate list-none">
                    <span className="font-medium text-[#09263D] pr-4">{faq.question}</span>
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#970A44] text-xl font-light group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <div className="px-5 pb-5 pt-3 bg-[#F6F4EB] rounded-b-lg -mt-2">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[#F6F4EB]" data-testid="section-related">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
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
                <Link href={`/interior-design/${related.slug}`}>
                  <Button 
                    variant="outline" 
                    className="rounded-full border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
                  >
                    {related.name}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#970A44]" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Book your free consultation today and let's bring your vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-white text-[#970A44] hover:bg-white/90 rounded-full px-8"
              >
                <Link href="/book">
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-8"
              >
                <Link href="/interior-design">
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  All Services
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
