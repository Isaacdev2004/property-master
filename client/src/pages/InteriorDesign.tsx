import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  ArrowLeft,
  Paintbrush, 
  Ruler, 
  CheckCircle2, 
  Sofa, 
  UtensilsCrossed, 
  Bed, 
  Bath, 
  Grid3X3, 
  DoorOpen,
  Lamp,
  Table2,
  Play,
  Award,
  Users,
  Building2,
  Palette,
  Star,
  Calculator,
  Phone,
  Check,
  Tv,
  Flower2,
  PaintBucket,
  LayoutGrid,
  Square,
  Baby,
  Quote,
  Clock,
  Headphones,
  ShieldCheck,
  Truck,
  Percent
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stats = [
  { icon: Building2, value: "5000+", label: "Interior Projects" },
  { icon: Users, value: "200+", label: "Design Experts" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Palette, value: "2 Lac+", label: "Design Options" },
];

const aboutStats = [
  { value: "775+", label: "Homes Delivered" },
  { value: "120+", label: "Projects In Execution Phase" },
  { value: "98+", label: "Homes Under Design Phase" },
];

const readyToUseServices = [
  {
    icon: Ruler,
    title: "Seamless Execution",
    description: "A subtle architectural design is the heart of any home. Our architectural design services give meaning to your space while enhancing its overall aesthetic appeal.",
  },
  {
    icon: Paintbrush,
    title: "Innovative Designs",
    description: "Regarding interior design services, we offer superior interior designs backed by an innovative approach that fits your budget.",
  },
  {
    icon: Building2,
    title: "Bespoke Luxury Homes",
    description: "Every nook and cranny has a tale to tell. Hence, we assist you with bespoke luxury homes while providing the ideal balance of elegance & excellence.",
  },
];

const whyPartnerWithUs = [
  { icon: Palette, title: "Made to Order" },
  { icon: Percent, title: "Lowest Prices Guaranteed" },
  { icon: CheckCircle2, title: "QC At Every Step" },
  { icon: Truck, title: "Timely Delivery Assurance" },
  { icon: ShieldCheck, title: "11-Year Warranty" },
];

const projectSnapshots = [
  { id: 1, title: "Mirdif Hills", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80", size: "large" },
  { id: 2, title: "Ajman Uptown By Sweet Homes", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", size: "large" },
  { id: 3, title: "Park Gate Residency", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", size: "small" },
  { id: 4, title: "Dubai Creek Harbour", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", size: "small" },
  { id: 5, title: "Jumeirah Golf Estate", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", size: "small" },
];

const howWeWork = [
  {
    step: 1,
    title: "Let's Meet Over Coffee",
    description: "A brief chat with us over coffee or even a digital meet-up will help us understand your requirements and your objective.",
  },
  {
    step: 2,
    title: "Defining the Scope of Work",
    description: "As the first step, we create a basic outline of the work to be done and discuss the important details with you, from materials and finishes to everything in between.",
  },
  {
    step: 3,
    title: "Finalisation of Agreement",
    description: "With the discussions in place, we will finalise the deal. You will need to pay 10% of the total fee as an initial amount. Then, pay 50% of the order value to start the project.",
  },
  {
    step: 4,
    title: "Implementing the Ideas",
    description: "As soon as the deal is finalised, our team of interior designers spring into action to finalise the deliverables. We keep you updated at every junction of the process.",
  },
  {
    step: 5,
    title: "Finishing Up",
    description: "Welcome to your dream home! Now, all you need to do is move in and celebrate.",
  },
];

const expertTeam = [
  { id: 1, name: "Sarah Krishnan Andapally", projects: "100+ Projects", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
  { id: 2, name: "Ayush Goyal", projects: "25+ Projects", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { id: 3, name: "Ankita Satyashilani Menon", projects: "50+ Projects", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
  { id: 4, name: "Aparna Vinod", projects: "45+ Projects", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" },
  { id: 5, name: "Ravi Kishan", projects: "35+ Projects", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
  { id: 6, name: "Ayushi Rajendra Haldar", projects: "60+ Projects", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" },
  { id: 7, name: "Mohd Jam", projects: "25+ Projects", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" },
  { id: 8, name: "Mahitha Lalu Abraham", projects: "55+ Projects", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&q=80" },
];

const googleReviews = [
  {
    id: 1,
    name: "Sajeel Zaman",
    rating: 5,
    date: "2 weeks ago",
    content: "We came across Interior Company through the search engine, and the entire experience has been good and also budget friendly, especially with project manager 'Zaki' and Business Manager 'Ashish'. They went out of the way to ensure all our expectations were well met. Keep walking and keep growing...",
    featured: true,
  },
  {
    id: 2,
    name: "Rafiq Adams",
    rating: 5,
    date: "2 weeks ago",
    content: "The team was competent and professional. Saad, Ajmal and Rashmi along with rest of team worked to finish the job and took feedback into consideration patiently and productively. Finished job was well done.",
  },
  {
    id: 3,
    name: "Maya AlEssawi",
    rating: 4,
    date: "a month ago",
    content: "Great experience working with the team. Professional service and quality workmanship throughout the project.",
  },
];

const whatSetsApart = [
  { icon: Building2, title: "One-Stop Solution For Interior Design", description: "Meet all your home interior design needs under one roof." },
  { icon: Users, title: "Best Designing Experts", description: "We craft bespoke design solutions that reflect your personality." },
  { icon: Palette, title: "Immersive 3D Walkthroughs", description: "Experience home interiors with interactive 3D visual walkthroughs." },
  { icon: Percent, title: "Honest Pricing", description: "Transparent pricing with no hidden charges for interior fit-out services." },
  { icon: Headphones, title: "Customer Support", description: "We ensure that all your queries are resolved at the earliest." },
  { icon: CheckCircle2, title: "Consistent Quality Checks", description: "Strict quality inspections are carried out at various stages of the project." },
];

const turnkeyServices = [
  {
    icon: Paintbrush,
    title: "We Design",
    description: "From completed homes to modular kitchens, and storage to decor, our expert interior designers create spaces that match your vision perfectly.",
    gradient: "from-[#970A44] to-[#720632]",
  },
  {
    icon: Ruler,
    title: "We Execute",
    description: "We follow a meticulous planning approach with detail-driven designs for interiors of your homes, ensuring premium quality at every step.",
    gradient: "from-[#1C4668] to-[#09263D]",
  },
  {
    icon: CheckCircle2,
    title: "We Manage",
    description: "Our expert interior designers spearhead quality assurance by extending support after the execution of home and commercial projects.",
    gradient: "from-[#09263D] to-[#1C4668]",
  },
];

const furnitureCollection = [
  { id: 1, name: "Wallpapers", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80", discount: "27%" },
  { id: 2, name: "Sofas", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", discount: "55%" },
  { id: 3, name: "Beds", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80", discount: "48%" },
  { id: 4, name: "Coffee Tables", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&q=80", discount: "50%" },
  { id: 5, name: "Side Tables", image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=400&q=80", discount: "50%" },
  { id: 6, name: "Clocks", image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&q=80", discount: "50%" },
  { id: 7, name: "Chairs", image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&q=80", discount: "45%" },
  { id: 8, name: "Dining Tables", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80", discount: "40%" },
  { id: 9, name: "Mirrors", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", discount: "35%" },
  { id: 10, name: "Rugs", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80", discount: "42%" },
  { id: 11, name: "Curtains", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80", discount: "38%" },
  { id: 12, name: "Lamps", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80", discount: "30%" },
];

const designCategories = [
  { id: "wall-colour", label: "Wall Colour", icon: PaintBucket },
  { id: "living-room", label: "Living Room", icon: Sofa },
  { id: "kitchen", label: "Modular Kitchen", icon: UtensilsCrossed },
  { id: "wardrobe", label: "Wardrobe", icon: DoorOpen },
  { id: "bedroom", label: "Master Bedroom", icon: Bed },
  { id: "kids-room", label: "Kids Room", icon: Baby },
  { id: "tv-unit", label: "TV Units", icon: Tv },
  { id: "bathroom", label: "Bathroom", icon: Bath },
  { id: "pooja-room", label: "Pooja Room", icon: Flower2 },
  { id: "dining", label: "Dining Room", icon: Table2 },
  { id: "false-ceiling", label: "False Ceiling", icon: LayoutGrid },
  { id: "balcony", label: "Balcony", icon: Square },
  { id: "lighting", label: "Lighting", icon: Lamp },
  { id: "office", label: "Home Office", icon: Grid3X3 },
];

const designIdeas: Record<string, Array<{ id: number; title: string; image: string; slug: string }>> = {
  "wall-colour": [
    { id: 1, title: "Bold Terracotta and White Wall Colour for Dining Room", image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80", slug: "terracotta-white-dining" },
    { id: 2, title: "Artistic Olive and Beige Wall Colour for Living Room", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", slug: "olive-beige-living" },
    { id: 3, title: "Timeless Blue and White Wall Colour for Bedroom", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80", slug: "blue-white-bedroom" },
    { id: 4, title: "Unique Grey and Cream Wall Colour for Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", slug: "grey-cream-kitchen" },
    { id: 5, title: "Sophisticated Beige and Brown for Dining Room", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "beige-brown-dining" },
    { id: 6, title: "Graceful Grey and Blue for Living Room", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", slug: "grey-blue-living" },
    { id: 7, title: "Natural Mustard and Olive for Living Room", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "mustard-olive-living" },
  ],
  "living-room": [
    { id: 1, title: "Modern Living Room with L-Shaped Sofa and Marble Accents", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", slug: "modern-living-room-l-shaped" },
    { id: 2, title: "Contemporary Living Room with Velvet Furniture", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", slug: "contemporary-velvet-living" },
    { id: 3, title: "Minimalist Living Room with Natural Light", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80", slug: "minimalist-natural-light" },
    { id: 4, title: "Luxury Living Room with Gold Accents", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "luxury-gold-accents" },
    { id: 5, title: "Industrial Living Room with Exposed Brick", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "industrial-exposed-brick" },
    { id: 6, title: "Scandinavian Living Room with Wooden Elements", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80", slug: "scandinavian-wooden" },
    { id: 7, title: "Bohemian Living Room with Colorful Accents", image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80", slug: "bohemian-colorful" },
  ],
  "kitchen": [
    { id: 1, title: "Modern L-Shaped Kitchen with Quartz Countertop", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", slug: "modern-l-shaped-kitchen" },
    { id: 2, title: "Contemporary White Kitchen with Island", image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=600&q=80", slug: "contemporary-white-kitchen" },
    { id: 3, title: "Sage Green Kitchen with Brass Fixtures", image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80", slug: "sage-green-kitchen" },
    { id: 4, title: "Industrial Style Kitchen Design", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80", slug: "industrial-kitchen" },
    { id: 5, title: "Parallel Kitchen with Breakfast Counter", image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&q=80", slug: "parallel-breakfast-kitchen" },
    { id: 6, title: "U-Shaped Kitchen with Maximum Storage", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80", slug: "u-shaped-storage-kitchen" },
    { id: 7, title: "Open Kitchen with Living Room Integration", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80", slug: "open-kitchen-living" },
  ],
  "bedroom": [
    { id: 1, title: "Luxurious Master Bedroom with Upholstered Headboard", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80", slug: "luxury-master-bedroom" },
    { id: 2, title: "Minimalist Bedroom with Platform Bed", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80", slug: "minimalist-platform-bed" },
    { id: 3, title: "Cozy Bedroom with Warm Tones", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80", slug: "cozy-warm-bedroom" },
    { id: 4, title: "Modern Bedroom with Walk-in Closet", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80", slug: "modern-walk-in-closet" },
    { id: 5, title: "Contemporary Bedroom with Bay Window", image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600&q=80", slug: "contemporary-bay-window" },
    { id: 6, title: "Rustic Bedroom with Wooden Accents", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80", slug: "rustic-wooden-bedroom" },
    { id: 7, title: "Elegant Bedroom with Chandelier", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", slug: "elegant-chandelier-bedroom" },
  ],
  "wardrobe": [
    { id: 1, title: "Walk-in Wardrobe with Custom Shelving", image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80", slug: "walk-in-custom-shelving" },
    { id: 2, title: "Sliding Door Wardrobe with Mirror Finish", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80", slug: "sliding-mirror-wardrobe" },
    { id: 3, title: "Built-in Wardrobe with LED Lighting", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", slug: "built-in-led-wardrobe" },
    { id: 4, title: "Luxury Dressing Room Design", image: "https://images.unsplash.com/photo-1583845112203-29329902332e?w=600&q=80", slug: "luxury-dressing-room" },
    { id: 5, title: "Open Wardrobe with Industrial Style", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80", slug: "open-industrial-wardrobe" },
    { id: 6, title: "Minimalist Wardrobe with Hidden Handles", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80", slug: "minimalist-hidden-handles" },
    { id: 7, title: "L-Shaped Wardrobe for Corner Space", image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80", slug: "l-shaped-corner-wardrobe" },
  ],
  "kids-room": [
    { id: 1, title: "Colorful Kids Room with Bunk Beds", image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80", slug: "colorful-bunk-beds" },
    { id: 2, title: "Playful Room with Study Corner", image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80", slug: "playful-study-corner" },
    { id: 3, title: "Themed Kids Room with Wall Murals", image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80", slug: "themed-wall-murals" },
    { id: 4, title: "Twin Kids Room with Shared Space", image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80", slug: "twin-shared-space" },
    { id: 5, title: "Gender Neutral Kids Room Design", image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80", slug: "gender-neutral-kids" },
    { id: 6, title: "Teen Room with Modern Design", image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80", slug: "teen-modern-design" },
    { id: 7, title: "Nursery Room with Soft Colors", image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80", slug: "nursery-soft-colors" },
  ],
  "tv-unit": [
    { id: 1, title: "Modern TV Unit with Floating Shelves", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", slug: "modern-floating-tv" },
    { id: 2, title: "Wall-Mounted TV Unit with LED Backlight", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", slug: "wall-mounted-led" },
    { id: 3, title: "TV Unit with Hidden Storage", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", slug: "hidden-storage-tv" },
    { id: 4, title: "Rustic TV Unit with Wooden Finish", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", slug: "rustic-wooden-tv" },
    { id: 5, title: "Minimalist TV Panel Design", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", slug: "minimalist-tv-panel" },
    { id: 6, title: "Entertainment Center with Bookshelf", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", slug: "entertainment-bookshelf" },
    { id: 7, title: "Corner TV Unit Design", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", slug: "corner-tv-unit" },
  ],
  "bathroom": [
    { id: 1, title: "Spa-like Bathroom with Freestanding Tub", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", slug: "spa-freestanding-tub" },
    { id: 2, title: "Modern Bathroom with Rainfall Shower", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80", slug: "modern-rainfall-shower" },
    { id: 3, title: "Minimalist Bathroom with Floating Vanity", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80", slug: "minimalist-floating-vanity" },
    { id: 4, title: "Luxury Master Bathroom Suite", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80", slug: "luxury-master-bathroom" },
    { id: 5, title: "Contemporary Bathroom with Marble Tiles", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80", slug: "contemporary-marble-tiles" },
    { id: 6, title: "Small Bathroom with Smart Storage", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80", slug: "small-smart-storage" },
    { id: 7, title: "Vintage Bathroom with Brass Fixtures", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80", slug: "vintage-brass-fixtures" },
  ],
  "pooja-room": [
    { id: 1, title: "Traditional Pooja Room with Wooden Mandir", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "traditional-wooden-mandir" },
    { id: 2, title: "Modern Pooja Unit with LED Lights", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "modern-led-pooja" },
    { id: 3, title: "Wall-Mounted Pooja Unit", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "wall-mounted-pooja" },
    { id: 4, title: "Marble Pooja Room Design", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "marble-pooja-room" },
    { id: 5, title: "Compact Pooja Corner Design", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "compact-pooja-corner" },
    { id: 6, title: "Glass Door Pooja Room", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "glass-door-pooja" },
    { id: 7, title: "Brass Accented Pooja Mandir", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "brass-accented-mandir" },
  ],
  "dining": [
    { id: 1, title: "Elegant Dining Room with Crystal Chandelier", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "elegant-crystal-chandelier" },
    { id: 2, title: "Modern Dining with Marble Table", image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80", slug: "modern-marble-dining" },
    { id: 3, title: "Rustic Dining Room with Wood Accents", image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80", slug: "rustic-wood-dining" },
    { id: 4, title: "Contemporary Open-Plan Dining", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80", slug: "contemporary-open-plan" },
    { id: 5, title: "Compact Dining Area Design", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "compact-dining-area" },
    { id: 6, title: "Dining Room with Built-in Storage", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "dining-built-in-storage" },
    { id: 7, title: "Round Dining Table Setup", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "round-dining-table" },
  ],
  "false-ceiling": [
    { id: 1, title: "Coffered False Ceiling Design", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "coffered-false-ceiling" },
    { id: 2, title: "Tray Ceiling with LED Lighting", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "tray-led-ceiling" },
    { id: 3, title: "Wooden False Ceiling Design", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "wooden-false-ceiling" },
    { id: 4, title: "Modern POP Ceiling Design", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "modern-pop-ceiling" },
    { id: 5, title: "Minimalist Ceiling with Recessed Lights", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "minimalist-recessed-lights" },
    { id: 6, title: "Artistic Ceiling Design for Hall", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "artistic-hall-ceiling" },
    { id: 7, title: "Gypsum Ceiling with Cove Lighting", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "gypsum-cove-lighting" },
  ],
  "balcony": [
    { id: 1, title: "Cozy Balcony with Seating Area", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "cozy-balcony-seating" },
    { id: 2, title: "Garden Balcony with Planters", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "garden-balcony-planters" },
    { id: 3, title: "Modern Balcony with Glass Railing", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "modern-glass-railing" },
    { id: 4, title: "Small Balcony Makeover Ideas", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "small-balcony-makeover" },
    { id: 5, title: "Balcony with Swing Seating", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "balcony-swing-seating" },
    { id: 6, title: "Enclosed Balcony Design", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "enclosed-balcony-design" },
    { id: 7, title: "Bohemian Balcony Decor", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "bohemian-balcony-decor" },
  ],
  "lighting": [
    { id: 1, title: "Statement Pendant Lighting Ideas", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80", slug: "statement-pendant-lighting" },
    { id: 2, title: "Ambient Lighting with LED Strips", image: "https://images.unsplash.com/photo-1558882224-dda166c27a7b?w=600&q=80", slug: "ambient-led-strips" },
    { id: 3, title: "Chandelier Designs for Grand Spaces", image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&q=80", slug: "chandelier-grand-spaces" },
    { id: 4, title: "Task Lighting for Work Areas", image: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=600&q=80", slug: "task-lighting-work" },
    { id: 5, title: "Cove Lighting for Living Rooms", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80", slug: "cove-lighting-living" },
    { id: 6, title: "Decorative Wall Sconces", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80", slug: "decorative-wall-sconces" },
    { id: 7, title: "Smart Lighting Solutions", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80", slug: "smart-lighting-solutions" },
  ],
  "office": [
    { id: 1, title: "Executive Home Office Design", image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=600&q=80", slug: "executive-home-office" },
    { id: 2, title: "Minimalist Workspace with Natural Light", image: "https://images.unsplash.com/photo-1600494448850-6013c46ba587?w=600&q=80", slug: "minimalist-workspace" },
    { id: 3, title: "Creative Studio Office Design", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", slug: "creative-studio-office" },
    { id: 4, title: "Built-in Study Room Design", image: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=600&q=80", slug: "built-in-study-room" },
    { id: 5, title: "Compact Home Office Ideas", image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=600&q=80", slug: "compact-home-office" },
    { id: 6, title: "Industrial Style Office", image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=600&q=80", slug: "industrial-style-office" },
    { id: 7, title: "Dual Workspace Design", image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=600&q=80", slug: "dual-workspace-design" },
  ],
};

const happyHomes = [
  { id: 1, name: "The Sharma Residence", location: "Dubai Marina", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", type: "3 BHK Complete Interior" },
  { id: 2, name: "Al Maktoum Villa", location: "Palm Jumeirah", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", type: "5 BHK Luxury Villa" },
  { id: 3, name: "The Patel Family Home", location: "Downtown Dubai", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", type: "4 BHK Modern Apartment" },
  { id: 4, name: "Emirates Living Project", location: "Emirates Hills", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", type: "6 BHK Estate" },
  { id: 5, name: "The Khan Residence", location: "JBR", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", type: "2 BHK Beachfront" },
  { id: 6, name: "Al Rashid Penthouse", location: "DIFC", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80", type: "Penthouse Interior" },
];

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Homeowner, Dubai Marina",
    content: "The team at Property Masters transformed our apartment into a stunning home. Their attention to detail and commitment to quality is unmatched. We couldn't be happier with the results!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Ahmed Al Maktoum",
    role: "Villa Owner, Palm Jumeirah",
    content: "From the initial consultation to the final handover, the experience was seamless. The 3D visualization helped us see exactly what we were getting. Highly recommend their services!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    hasVideo: true,
  },
  {
    id: 3,
    name: "Fatima Hassan",
    role: "Business Owner, Downtown",
    content: "We hired them for our office fit-out and they exceeded all expectations. Professional, timely, and the quality of work is exceptional. Our workspace looks amazing!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    hasVideo: false,
  },
];

const whyChooseUs = [
  { icon: ShieldCheck, title: "10-Year Warranty", description: "We stand behind our work with comprehensive warranty coverage" },
  { icon: Truck, title: "On-Time Delivery", description: "45-day delivery promise with our streamlined execution process" },
  { icon: Clock, title: "Quick Turnaround", description: "Fast project completion without compromising on quality" },
  { icon: Headphones, title: "24/7 Support", description: "Round-the-clock customer support for all your queries" },
  { icon: Percent, title: "Best Price Guarantee", description: "Competitive pricing with no hidden costs or surprises" },
  { icon: Award, title: "Award-Winning Design", description: "Recognized excellence in interior design and innovation" },
];

const partnerBrands = [
  { id: 1, name: "Hafele", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80" },
  { id: 2, name: "Hettich", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80" },
  { id: 3, name: "Blum", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80" },
  { id: 4, name: "Bosch", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80" },
  { id: 5, name: "Samsung", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80" },
  { id: 6, name: "LG", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80" },
  { id: 7, name: "Siemens", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80" },
  { id: 8, name: "Faber", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80" },
];

const uaeLocations = [
  { id: 1, city: "Dubai", address: "AL Saqr Business Tower - Office A-36", phone: "+971 2550 0888", projects: "500+" },
  { id: 2, city: "Abu Dhabi", address: "Al Reem Island, Sky Tower", phone: "+971 2550 0889", projects: "200+" },
  { id: 3, city: "Sharjah", address: "Al Majaz, Crystal Plaza", phone: "+971 2550 0890", projects: "150+" },
];

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Modular Kitchen Designs for 2024",
    excerpt: "Discover the latest trends in modular kitchen designs that combine functionality with stunning aesthetics.",
    category: "Kitchen",
    date: "Dec 1, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "How to Choose the Perfect Wardrobe Design",
    excerpt: "Expert tips on selecting wardrobe designs that maximize storage and complement your bedroom.",
    category: "Wardrobe",
    date: "Nov 28, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80",
    featured: false,
  },
  {
    id: 3,
    title: "Living Room Color Trends for Dubai Homes",
    excerpt: "Explore the most popular color combinations that are transforming living spaces across Dubai.",
    category: "Living Room",
    date: "Nov 25, 2024",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
    featured: false,
  },
  {
    id: 4,
    title: "Luxury Bathroom Design Ideas",
    excerpt: "Transform your bathroom into a spa-like retreat with these luxury design ideas.",
    category: "Bathroom",
    date: "Nov 20, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
    featured: false,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function InteriorDesign() {
  const [activeTab, setActiveTab] = useState("wall-colour");
  const [currentFurnitureSlide, setCurrentFurnitureSlide] = useState(0);
  const furnitureSliderRef = useRef<HTMLDivElement>(null);
  const itemsPerView = 4;
  const totalSlides = Math.ceil(furnitureCollection.length / itemsPerView);

  const nextFurnitureSlide = () => {
    setCurrentFurnitureSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevFurnitureSlide = () => {
    setCurrentFurnitureSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
            alt="Luxury Interior Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="inline-block px-4 py-2 bg-[#970A44]/20 backdrop-blur-sm border border-[#970A44]/30 rounded-full text-white text-sm font-medium mb-6">
                Interior Design & Fit-Out
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight">
                Interior Design that Speaks of <span className="text-[#970A44]">You</span>
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                From foundation to furnishings, we style your home like our own. Transform your vision into reality with Dubai's premier interior design experts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-8"
                  data-testid="button-hero-consultation"
                >
                  <Link href="/contact">
                    Book Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/50 text-white hover:bg-white/10 rounded-full px-8"
                  data-testid="button-hero-portfolio"
                >
                  <Link href="/portfolio">
                    View Our Work
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Right Column - Statistics Grid */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-2 gap-3"
              data-testid="stats-grid"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
                    data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="flex justify-center mb-2">
                      <div className="w-10 h-10 bg-[#970A44] rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/80 uppercase tracking-wide">{stat.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Property Masters Section */}
      <section className="py-24 bg-background" data-testid="section-about-company">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
                About <span className="text-[#970A44]">Property Masters</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                From conception to bringing the ideal balance of functionality and style, we breathe life into your dream homes with our interior design services in Dubai.
              </p>
              
              <div className="flex flex-wrap gap-6">
                {aboutStats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 border-r border-border pr-6 last:border-0"
                    data-testid={`about-stat-${index}`}
                  >
                    <div className="w-10 h-10 bg-[#970A44]/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#970A44]" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#970A44]">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&q=80"
                  alt="Luxury Living Room"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80"
                  alt="Modern Interior"
                  className="w-full h-32 object-cover rounded-xl"
                />
              </div>
              <div className="pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80"
                  alt="Contemporary Design"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ready To Use Interior Design Services */}
      <section className="py-24 bg-muted/30" data-testid="section-ready-to-use">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Ready To Use Interior Design <span className="text-[#970A44]">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our team of experts works closely on every detail so that you get the best interior design services in Dubai.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {readyToUseServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full border-0 shadow-md hover-elevate bg-background" data-testid={`card-ready-service-${index}`}>
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-[#970A44]/10 rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-[#970A44]" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Partner With Us Section */}
      <section className="py-20 bg-background" data-testid="section-why-partner">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Why Partner With <span className="text-[#970A44]">Us?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience distinguished designs and transparent pricing with the best interior design company in Dubai.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12"
          >
            {whyPartnerWithUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  className="flex flex-col items-center text-center"
                  data-testid={`partner-feature-${index}`}
                >
                  <div className="w-20 h-20 rounded-full border-2 border-[#970A44]/20 flex items-center justify-center mb-4 bg-white shadow-sm">
                    <Icon className="w-8 h-8 text-[#970A44]" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base">{item.title}</h3>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Button 
              asChild
              className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-8"
              data-testid="button-partner-consultation"
            >
              <Link href="/contact">
                Book Free Consultation
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 360-Degree Project Snapshots Section */}
      <section className="py-24 bg-muted/30" data-testid="section-project-snapshots">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              A <span className="text-[#970A44]">360-Degree</span> Snapshot of Our Interior Projects in Dubai
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check here how we make dreams into reality.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Large images row */}
            {projectSnapshots.filter(p => p.size === "large").map((project, index) => (
              <motion.div 
                key={project.id} 
                variants={fadeInUp}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
                data-testid={`project-snapshot-${project.id}`}
              >
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-white font-semibold">{project.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
          >
            {/* Small images row */}
            {projectSnapshots.filter(p => p.size === "small").map((project, index) => (
              <motion.div 
                key={project.id} 
                variants={fadeInUp}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
                data-testid={`project-snapshot-${project.id}`}
              >
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-3 h-3 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-sm">{project.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-24 bg-background" data-testid="section-how-we-work">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              How We <span className="text-[#970A44]">Work?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our expert interior designers in Dubai curate original concepts with exquisite craftsmanship to deliver unique design solutions that match your vision.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-5 gap-8"
          >
            {howWeWork.map((step, index) => (
              <motion.div 
                key={step.step} 
                variants={fadeInUp}
                className="text-center relative"
                data-testid={`how-we-work-step-${step.step}`}
              >
                {/* Step number badge */}
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#970A44]/10 to-[#970A44]/5 rounded-2xl flex items-center justify-center border border-[#970A44]/20">
                  <span className="text-2xl font-bold text-[#970A44]">{step.step}</span>
                </div>
                
                {/* Connector line (except last item) */}
                {index < howWeWork.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#970A44]/30 to-transparent"></div>
                )}
                
                <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experts Behind Property Masters Section */}
      <section className="py-24 bg-muted/30" data-testid="section-expert-team">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Experts Behind Property Masters's <span className="text-[#970A44]">Saga</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our team of interior decorators in Dubai helps you discover fresh design ideas that celebrate you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {expertTeam.map((expert, index) => (
                <motion.div
                  key={expert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex-shrink-0 text-center"
                  data-testid={`expert-${expert.id}`}
                >
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-3 border-[#970A44]/20">
                    <img 
                      src={expert.image}
                      alt={expert.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-sm mb-1 max-w-[120px]">{expert.name}</h4>
                  <p className="text-xs text-muted-foreground">{expert.projects}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Clients Love Our Work - Google Reviews Section */}
      <section className="py-24 bg-background" data-testid="section-google-reviews">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Our Clients Simply <span className="text-[#970A44]">Love</span> Our Work
            </h2>
            <p className="text-lg text-muted-foreground">
              Because for us, your satisfaction is always our priority!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Google Rating Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-blue-600">G</span>
                    <span className="text-2xl font-bold text-red-500">o</span>
                    <span className="text-2xl font-bold text-yellow-500">o</span>
                    <span className="text-2xl font-bold text-blue-600">g</span>
                    <span className="text-2xl font-bold text-green-500">l</span>
                    <span className="text-2xl font-bold text-red-500">e</span>
                    <span className="text-muted-foreground ml-2">Reviews</span>
                  </div>
                  <div className="text-5xl font-bold mb-2">4.4</div>
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-6 h-6 fill-yellow-400/50 text-yellow-400" />
                  </div>
                  <p className="text-muted-foreground text-sm">Based on 66 Reviews</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-4"
            >
              {googleReviews.map((review, index) => (
                <Card key={review.id} className="border-0 shadow-md" data-testid={`google-review-${review.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold">{review.name}</h4>
                          {review.featured && (
                            <span className="px-2 py-0.5 bg-[#970A44] text-white text-xs rounded-full">Detail</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{review.content}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Sets Apart Section */}
      <section className="py-24 bg-muted/30" data-testid="section-what-sets-apart">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              What Sets <span className="text-[#970A44]">Apart?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Elevate beyond the ordinary. Choose excellence with Property Masters.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {whatSetsApart.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full border-0 shadow-md hover-elevate bg-background" data-testid={`what-sets-apart-${index}`}>
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 flex-shrink-0 bg-[#970A44]/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#970A44]" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Turnkey Services Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Complete Turnkey Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              With an emphasis on details, extraordinary designs and exceptional customer service, we bring your dreams to life.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {turnkeyServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full border-0 shadow-lg hover-elevate">
                    <CardContent className="p-8 text-center">
                      <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl mb-6`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button 
              asChild
              variant="outline"
              className="rounded-full px-8 border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
              data-testid="button-know-more"
            >
              <Link href="/about">
                Know More About Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Factory Video Section */}
      <section className="py-20 bg-[#09263D]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">
                From Concept to Creation: Your Furniture's Journey
              </h2>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">
                Step inside our state-of-the-art manufacturing facility. See how your dream kitchen or wardrobe comes to life with precision craftsmanship and premium materials.
              </p>
              <Button 
                className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-8"
                data-testid="button-watch-video"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Factory Tour
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
                  alt="Manufacturing Process"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button 
                    className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                    data-testid="button-play-video"
                  >
                    <Play className="w-8 h-8 text-[#970A44] ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Furniture Collection Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30" data-testid="section-furniture-collection">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Discover Your Dream Home
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dive into Our Decor & Furniture Collection! Exclusive discounts on premium products.
            </p>
          </motion.div>

          <div className="relative">
            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevFurnitureSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border-0 hover:bg-[#970A44] hover:text-white"
              data-testid="button-prev-furniture"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextFurnitureSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border-0 hover:bg-[#970A44] hover:text-white"
              data-testid="button-next-furniture"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>

            {/* Slider */}
            <div className="overflow-hidden" ref={furnitureSliderRef}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFurnitureSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                  {furnitureCollection
                    .slice(currentFurnitureSlide * itemsPerView, (currentFurnitureSlide + 1) * itemsPerView)
                    .map((item) => (
                      <Link key={item.id} href="/shop">
                        <Card className="group overflow-hidden border-0 shadow-md hover-elevate cursor-pointer" data-testid={`card-furniture-${item.id}`}>
                          <div className="relative aspect-square overflow-hidden">
                            <img 
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 left-3 px-3 py-1 bg-[#970A44] text-white text-xs font-bold rounded-full">
                              Upto {item.discount} Off
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-center group-hover:text-[#970A44] transition-colors">
                              {item.name}
                            </h3>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentFurnitureSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentFurnitureSlide 
                      ? "bg-[#970A44] w-6" 
                      : "bg-[#970A44]/30 hover:bg-[#970A44]/50"
                  }`}
                  data-testid={`dot-furniture-${idx}`}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Button 
              asChild
              className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-8"
              data-testid="button-shop-now"
            >
              <Link href="/shop">
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Partner Brands Section */}
      <section className="py-16 bg-muted/30" data-testid="section-partner-brands">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 font-serif">
              Trusted by <span className="text-[#970A44]">Premium Brands</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We partner with world-renowned brands to bring you the finest quality materials and fittings.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-4 md:grid-cols-8 gap-6"
          >
            {partnerBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                data-testid={`brand-${brand.id}`}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-[#970A44]/10 to-[#1C4668]/10 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-[#09263D] text-xs">{brand.name.substring(0, 2).toUpperCase()}</span>
                  </div>
                  <span className="text-xs font-medium text-[#09263D]">{brand.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Design Ideas Section */}
      <section className="py-24 bg-background" data-testid="section-design-ideas">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Design Ideas for Every Space
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Because every corner holds a unique design potential. Explore our curated collection of interior inspirations.
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto p-0 mb-10">
              {designCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-[#970A44] data-[state=active]:text-white px-3 py-2 rounded-full border border-border data-[state=active]:border-[#970A44] transition-all flex items-center gap-1.5 text-xs md:text-sm"
                    data-testid={`tab-${category.id}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {category.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <AnimatePresence mode="wait">
              {designCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {designIdeas[category.id]?.slice(0, 4).map((idea, index) => (
                      <motion.div
                        key={idea.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Link href={`/interior-design/${category.id}/${idea.slug}`}>
                          <Card 
                            className="group overflow-hidden border-0 shadow-md hover-elevate cursor-pointer"
                            data-testid={`card-design-${category.id}-${idea.id}`}
                          >
                            <div className="relative aspect-[4/3] overflow-hidden">
                              <img 
                                src={idea.image}
                                alt={idea.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-10 h-10 bg-[#970A44] rounded-full flex items-center justify-center">
                                  <ArrowRight className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-[#970A44] transition-colors">
                                {idea.title}
                              </h3>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-10"
                  >
                    <Button 
                      asChild
                      variant="outline"
                      className="rounded-full px-8 border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
                      data-testid={`button-explore-${category.id}`}
                    >
                      <Link href={`/interior-design/${category.id}`}>
                        Explore More {category.label} Designs
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

      {/* Happy Homes Section */}
      <section className="py-24 bg-muted/30" data-testid="section-happy-homes">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Happy Homes, Happy Families
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take a tour of homes we've transformed across Dubai and beyond. Real projects, real satisfaction.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {happyHomes.map((home, index) => (
              <motion.div
                key={home.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden border-0 shadow-lg hover-elevate" data-testid={`card-home-${home.id}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={home.image}
                      alt={home.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white mb-1">{home.name}</h3>
                      <p className="text-white/80 text-sm">{home.location}</p>
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#970A44] text-white text-xs font-medium rounded-full">
                      {home.type}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button 
              asChild
              variant="outline"
              className="rounded-full px-8 border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
              data-testid="button-view-all-projects"
            >
              <Link href="/portfolio">
                View All Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Free Estimate Section */}
      <section className="py-24 bg-[#970A44]" data-testid="section-free-estimate">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
                <Calculator className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Free Estimate</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
                Get Your Free Estimate in 30 Seconds
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Simply share your requirements and get an instant estimate for your dream interior. No obligations, no hidden costs.
              </p>
              <ul className="space-y-4 text-white">
                {[
                  "Instant price estimate",
                  "Personalized design consultation",
                  "3D visualization of your space",
                  "Flexible payment options"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-white" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Tell Us About Your Project</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" data-testid="input-estimate-name" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="+971" data-testid="input-estimate-phone" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="property-type">Property Type</Label>
                      <Select>
                        <SelectTrigger data-testid="select-property-type">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="retail">Retail Space</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bhk">Configuration</Label>
                      <Select>
                        <SelectTrigger data-testid="select-bhk">
                          <SelectValue placeholder="Select BHK" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1bhk">1 BHK</SelectItem>
                          <SelectItem value="2bhk">2 BHK</SelectItem>
                          <SelectItem value="3bhk">3 BHK</SelectItem>
                          <SelectItem value="4bhk">4 BHK</SelectItem>
                          <SelectItem value="5bhk+">5+ BHK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full bg-[#970A44] hover:bg-[#720632] text-white rounded-full py-6" data-testid="button-get-estimate">
                      Get Free Estimate
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-24 bg-background" data-testid="section-testimonials">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Hear From Our Happy Customers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from real customers who trusted us with their dream interiors.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover-elevate" data-testid={`card-testimonial-${testimonial.id}`}>
                  <CardContent className="p-6">
                    {testimonial.hasVideo && (
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-muted">
                        <img 
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <button 
                            className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110"
                            data-testid={`button-play-testimonial-${testimonial.id}`}
                          >
                            <Play className="w-6 h-6 text-[#970A44] ml-1" />
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#970A44] text-[#970A44]" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-[#970A44]/20 mb-2" />
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {testimonial.content}
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-muted/30" data-testid="section-why-choose">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Why Choose Property Masters?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to delivering excellence at every step of your interior journey.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-md hover-elevate" data-testid={`card-why-${index}`}>
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-[#970A44]/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-[#970A44]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Our Design Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A streamlined journey from your vision to reality, crafted with precision at every step.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Share your vision and requirements with our design experts" },
              { step: "02", title: "Design", desc: "Receive 3D visualizations and detailed design proposals" },
              { step: "03", title: "Execution", desc: "Our skilled craftsmen bring your design to life" },
              { step: "04", title: "Handover", desc: "Final inspection and handover of your dream space" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="text-6xl font-bold text-[#970A44]/10 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <div className="border-t-2 border-dashed border-[#970A44]/30 w-full"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UAE Locations Map Section */}
      <section className="py-24 bg-muted/30" data-testid="section-uae-locations">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
                We're Across <span className="text-[#970A44]">UAE</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                With offices across the UAE, we bring exceptional interior design services closer to you. Visit our experience centers to explore our work firsthand.
              </p>

              <div className="space-y-6">
                {uaeLocations.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    data-testid={`location-${location.id}`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[#970A44] rounded-full flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-lg">{location.city}</h3>
                        <span className="text-sm text-[#970A44] font-medium">{location.projects} Projects</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-1">{location.address}</p>
                      <a href={`tel:${location.phone}`} className="text-[#970A44] text-sm font-medium hover:underline">
                        {location.phone}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-[#F6F4EB] to-white rounded-3xl overflow-hidden shadow-xl relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-[#970A44]/10 rounded-full flex items-center justify-center">
                      <Building2 className="w-16 h-16 text-[#970A44]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#09263D] mb-2">3 Cities</h3>
                    <p className="text-muted-foreground">Across UAE</p>
                  </div>
                </div>
                
                <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-[#970A44] rounded-full animate-pulse" />
                <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-[#1C4668] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-[#09263D] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

                <div className="absolute top-6 right-6 px-4 py-2 bg-white rounded-full shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#970A44]">850+</span>
                    <span className="text-sm text-muted-foreground">Total Projects</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 px-4 py-2 bg-white rounded-full shadow-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#970A44] fill-[#970A44]" />
                    <span className="text-lg font-bold text-[#09263D]">4.8</span>
                    <span className="text-sm text-muted-foreground">Rating</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Blog Section */}
      <section className="py-24 bg-background" data-testid="section-blog">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Latest News & <span className="text-[#970A44]">Insights</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest trends, tips, and inspiration in interior design and home improvement.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {blogPosts.filter(post => post.featured).map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link href={`/blog/${post.id}`}>
                  <Card className="group overflow-hidden border-0 shadow-lg hover-elevate h-full cursor-pointer" data-testid={`card-blog-featured-${post.id}`}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-[#970A44] text-white text-xs font-medium rounded-full">
                        {post.category}
                      </div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-white/80 text-sm line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 mt-4 text-white/60 text-sm">
                          <span>{post.date}</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}

            <div className="grid gap-6">
              {blogPosts.filter(post => !post.featured).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.id}`}>
                    <Card className="group overflow-hidden border-0 shadow-sm hover-elevate cursor-pointer" data-testid={`card-blog-${post.id}`}>
                      <div className="flex gap-4 p-4">
                        <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                          <img 
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-[#970A44]/10 text-[#970A44] text-xs font-medium rounded-full">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="font-bold text-sm line-clamp-2 group-hover:text-[#970A44] transition-colors">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-2 text-muted-foreground text-xs">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button 
              asChild
              variant="outline"
              className="rounded-full px-8 border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
              data-testid="button-view-all-blogs"
            >
              <Link href="/blog">
                View All Articles
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#970A44] to-[#720632]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Book a free consultation with our design experts and take the first step towards your dream interior.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-white text-[#970A44] hover:bg-white/90 rounded-full px-8"
                data-testid="button-cta-book-consultation"
              >
                <Link href="/contact">
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-white/50 text-white hover:bg-white/10 rounded-full px-8"
                data-testid="button-cta-call-now"
              >
                <a href="tel:+97125500888">
                  <Phone className="mr-2 w-5 h-5" />
                  Call +971 2550 0888
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
