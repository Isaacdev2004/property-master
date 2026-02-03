import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";
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
  DoorOpen,
  Table2,
  Play,
  Award,
  Users,
  Building2,
  Palette,
  Tv,
  Flower2,
  PaintBucket,
  LayoutGrid,
  Square,
  Baby,
  Star,
  Quote,
  Shield,
  Clock,
  Headphones,
  ThumbsUp,
  Calculator,
  Check,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Eye,
  Sparkles,
  Zap,
  Target,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Hero stats matching interiorcompany.com
const stats = [
  { icon: Building2, value: "5000+", label: "INTERIOR PROJECTS" },
  { icon: Users, value: "200+", label: "DESIGN EXPERTS" },
  { icon: Award, value: "15+", label: "YEARS EXPERIENCE" },
  { icon: Palette, value: "2 Lac+", label: "DESIGN OPTIONS" },
];

// Turnkey Services
const turnkeyServices = [
  {
    icon: Paintbrush,
    title: "We Design",
    description: "From completed homes to modular kitchens, and storage to decor, our top interior designers create spaces that match your vision.",
    gradient: "from-[#970A44] to-[#720632]",
  },
  {
    icon: Ruler,
    title: "We Execute",
    description: "We follow a meticulous planning approach with detail-driven designs for interiors of your homes.",
    gradient: "from-[#1C4668] to-[#09263D]",
  },
  {
    icon: CheckCircle2,
    title: "We Manage",
    description: "Our top interior designers spearhead quality assurance by extending support after the execution of home projects.",
    gradient: "from-[#09263D] to-[#1C4668]",
  },
];

// Furniture Collection
const furnitureCollection = [
  { id: 1, name: "Wallpapers", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80", discount: "27%" },
  { id: 2, name: "Sofas", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", discount: "55%" },
  { id: 3, name: "Beds", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80", discount: "48%" },
  { id: 4, name: "Coffee Tables", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&q=80", discount: "50%" },
  { id: 5, name: "Side Tables", image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=400&q=80", discount: "50%" },
  { id: 6, name: "Clocks", image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&q=80", discount: "50%" },
  { id: 7, name: "Hobs", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", discount: "29%" },
  { id: 8, name: "Chimneys", image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&q=80", discount: "60%" },
  { id: 9, name: "Chairs", image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&q=80", discount: "45%" },
  { id: 10, name: "Bedside Tables", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80", discount: "48%" },
];

// Design categories
const designCategories = [
  { id: "wall-colour", label: "Wall Colour Combination", icon: PaintBucket },
  { id: "living-room", label: "Living Room", icon: Sofa },
  { id: "kitchen", label: "Modular Kitchen", icon: UtensilsCrossed },
  { id: "wardrobe", label: "Wardrobe", icon: DoorOpen },
  { id: "bedroom", label: "Master Bedroom", icon: Bed },
  { id: "kids-room", label: "Kids Room", icon: Baby },
  { id: "tv-unit", label: "TV Units", icon: Tv },
  { id: "bathroom", label: "Bathroom", icon: Bath },
  { id: "pooja-room", label: "Pooja Mandir", icon: Flower2 },
  { id: "dining", label: "Dining Room", icon: Table2 },
  { id: "false-ceiling", label: "False Ceiling", icon: LayoutGrid },
  { id: "balcony", label: "Balcony", icon: Square },
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
    { id: 1, title: "Industrial Living Room Design with Textured Sofa", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", slug: "industrial-living-room" },
    { id: 2, title: "Modern Living Room with Dark Blue L-Shaped Sofa", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", slug: "modern-blue-sofa" },
    { id: 3, title: "Modern Living Room with Green Velvet Sofa", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80", slug: "green-velvet-living" },
    { id: 4, title: "Contemporary Living Room with Grey Sofa", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "contemporary-grey" },
    { id: 5, title: "Modern Yellow-Themed Living Room Design", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "yellow-themed-living" },
    { id: 6, title: "Transitional Living Room with Regal Wooden Sofa", image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80", slug: "transitional-wooden" },
    { id: 7, title: "Contemporary Living Room with Beige Sofa", image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80", slug: "contemporary-beige" },
  ],
  "kitchen": [
    { id: 1, title: "Contemporary Walnut Island Kitchen Design", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", slug: "walnut-island-kitchen" },
    { id: 2, title: "Contemporary L-Shaped Kitchen with Blue Cabinets", image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=600&q=80", slug: "l-shaped-blue" },
    { id: 3, title: "Gloss Finish Grey Contemporary Island Kitchen", image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80", slug: "gloss-grey-island" },
    { id: 4, title: "Modern White Kitchen with Quartz Counter", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80", slug: "white-quartz-kitchen" },
    { id: 5, title: "U-Shaped Kitchen with Maximum Storage", image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&q=80", slug: "u-shaped-storage" },
    { id: 6, title: "Parallel Kitchen with Breakfast Counter", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80", slug: "parallel-breakfast" },
    { id: 7, title: "Open Kitchen with Living Room Integration", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80", slug: "open-kitchen-living" },
  ],
  "wardrobe": [
    { id: 1, title: "Walk-in Wardrobe with Custom Shelving", image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80", slug: "walk-in-custom" },
    { id: 2, title: "Sliding Door Wardrobe with Mirror Finish", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80", slug: "sliding-mirror" },
    { id: 3, title: "Built-in Wardrobe with LED Lighting", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", slug: "built-in-led" },
    { id: 4, title: "Luxury Dressing Room Design", image: "https://images.unsplash.com/photo-1583845112203-29329902332e?w=600&q=80", slug: "luxury-dressing" },
    { id: 5, title: "Open Wardrobe with Industrial Style", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80", slug: "open-industrial" },
    { id: 6, title: "Minimalist Wardrobe with Hidden Handles", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80", slug: "minimalist-hidden" },
    { id: 7, title: "L-Shaped Wardrobe for Corner Space", image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80", slug: "l-shaped-corner" },
  ],
  "bedroom": [
    { id: 1, title: "Luxurious Master Bedroom with Upholstered Headboard", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80", slug: "luxury-master" },
    { id: 2, title: "Minimalist Bedroom with Platform Bed", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80", slug: "minimalist-platform" },
    { id: 3, title: "Cozy Bedroom with Warm Tones", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80", slug: "cozy-warm" },
    { id: 4, title: "Modern Bedroom with Walk-in Closet", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80", slug: "modern-walk-in" },
    { id: 5, title: "Contemporary Bedroom with Bay Window", image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600&q=80", slug: "contemporary-bay" },
    { id: 6, title: "Rustic Bedroom with Wooden Accents", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80", slug: "rustic-wooden" },
    { id: 7, title: "Elegant Bedroom with Chandelier", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", slug: "elegant-chandelier" },
  ],
  "kids-room": [
    { id: 1, title: "Colorful Kids Room with Bunk Beds", image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80", slug: "colorful-bunk" },
    { id: 2, title: "Playful Room with Study Corner", image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80", slug: "playful-study" },
    { id: 3, title: "Themed Kids Room with Wall Murals", image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80", slug: "themed-murals" },
    { id: 4, title: "Twin Kids Room with Shared Space", image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80", slug: "twin-shared" },
    { id: 5, title: "Gender Neutral Kids Room Design", image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80", slug: "gender-neutral" },
    { id: 6, title: "Teen Room with Modern Design", image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80", slug: "teen-modern" },
    { id: 7, title: "Nursery Room with Soft Colors", image: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&q=80", slug: "nursery-soft" },
  ],
  "tv-unit": [
    { id: 1, title: "Modern TV Unit with Floating Shelves", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", slug: "modern-floating" },
    { id: 2, title: "Wall-Mounted TV Unit with LED Backlight", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", slug: "wall-mounted-led" },
    { id: 3, title: "TV Unit with Hidden Storage", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", slug: "hidden-storage" },
    { id: 4, title: "Rustic TV Unit with Wooden Finish", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", slug: "rustic-wooden-tv" },
    { id: 5, title: "Minimalist TV Panel Design", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", slug: "minimalist-panel" },
    { id: 6, title: "Entertainment Center with Bookshelf", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", slug: "entertainment-bookshelf" },
    { id: 7, title: "Corner TV Unit Design", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80", slug: "corner-tv" },
  ],
  "bathroom": [
    { id: 1, title: "Spa-like Bathroom with Freestanding Tub", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", slug: "spa-freestanding" },
    { id: 2, title: "Modern Bathroom with Rainfall Shower", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80", slug: "modern-rainfall" },
    { id: 3, title: "Minimalist Bathroom with Floating Vanity", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80", slug: "minimalist-floating" },
    { id: 4, title: "Luxury Master Bathroom Suite", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80", slug: "luxury-master-bath" },
    { id: 5, title: "Contemporary Bathroom with Marble Tiles", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80", slug: "contemporary-marble" },
    { id: 6, title: "Small Bathroom with Smart Storage", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80", slug: "small-smart" },
    { id: 7, title: "Vintage Bathroom with Brass Fixtures", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80", slug: "vintage-brass" },
  ],
  "pooja-room": [
    { id: 1, title: "Traditional Pooja Room with Wooden Mandir", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "traditional-wooden" },
    { id: 2, title: "Modern Pooja Unit with LED Lights", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "modern-led-pooja" },
    { id: 3, title: "Wall-Mounted Pooja Unit", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "wall-mounted-pooja" },
    { id: 4, title: "Marble Pooja Room Design", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "marble-pooja" },
    { id: 5, title: "Compact Pooja Corner Design", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "compact-corner" },
    { id: 6, title: "Glass Door Pooja Room", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "glass-door-pooja" },
    { id: 7, title: "Brass Accented Pooja Mandir", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "brass-accented" },
  ],
  "dining": [
    { id: 1, title: "Elegant Dining Room with Crystal Chandelier", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "elegant-crystal" },
    { id: 2, title: "Modern Dining with Marble Table", image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80", slug: "modern-marble-dining" },
    { id: 3, title: "Rustic Dining Room with Wood Accents", image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80", slug: "rustic-wood-dining" },
    { id: 4, title: "Contemporary Open-Plan Dining", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80", slug: "contemporary-open" },
    { id: 5, title: "Compact Dining Area Design", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "compact-dining" },
    { id: 6, title: "Dining Room with Built-in Storage", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "dining-storage" },
    { id: 7, title: "Round Dining Table Setup", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "round-dining" },
  ],
  "false-ceiling": [
    { id: 1, title: "Coffered False Ceiling Design", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "coffered-ceiling" },
    { id: 2, title: "Tray Ceiling with LED Lighting", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "tray-led" },
    { id: 3, title: "Wooden False Ceiling Design", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "wooden-ceiling" },
    { id: 4, title: "Modern POP Ceiling Design", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "modern-pop" },
    { id: 5, title: "Minimalist Ceiling with Recessed Lights", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "minimalist-recessed" },
    { id: 6, title: "Artistic Ceiling Design for Hall", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "artistic-hall" },
    { id: 7, title: "Gypsum Ceiling with Cove Lighting", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "gypsum-cove" },
  ],
  "balcony": [
    { id: 1, title: "Cozy Balcony with Seating Area", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "cozy-seating" },
    { id: 2, title: "Garden Balcony with Planters", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "garden-planters" },
    { id: 3, title: "Modern Balcony with Glass Railing", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "modern-glass" },
    { id: 4, title: "Small Balcony Makeover Ideas", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "small-makeover" },
    { id: 5, title: "Balcony with Swing Seating", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "swing-seating" },
    { id: 6, title: "Enclosed Balcony Design", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "enclosed-balcony" },
    { id: 7, title: "Bohemian Balcony Decor", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "bohemian-decor" },
  ],
};

// 360 Tour Projects
const tourProjects = [
  { id: 1, title: "Luxury Villa in Palm Jumeirah", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", location: "Palm Jumeirah, Dubai", sqft: "4,500 sq.ft" },
  { id: 2, title: "Modern Apartment in Downtown", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", location: "Downtown Dubai", sqft: "2,200 sq.ft" },
  { id: 3, title: "Contemporary Penthouse", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", location: "Dubai Marina", sqft: "3,800 sq.ft" },
  { id: 4, title: "Classic Villa Interior", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", location: "Emirates Hills", sqft: "5,200 sq.ft" },
  { id: 5, title: "Minimalist Studio", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80", location: "Business Bay", sqft: "1,100 sq.ft" },
  { id: 6, title: "Family Home Makeover", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", location: "Arabian Ranches", sqft: "3,500 sq.ft" },
];

// How We Work Steps
const processSteps = [
  { step: 1, title: "Meet Our Designer", description: "Schedule a free consultation with our expert designers to discuss your vision and requirements.", icon: Users },
  { step: 2, title: "Get Your Design", description: "Receive detailed 3D designs and floor plans tailored to your space and preferences.", icon: Palette },
  { step: 3, title: "Approve & Modify", description: "Review the designs, suggest modifications, and approve the final layout.", icon: CheckCircle2 },
  { step: 4, title: "Execution Begins", description: "Our skilled craftsmen bring your design to life with precision and quality materials.", icon: Ruler },
  { step: 5, title: "Quality Check", description: "Rigorous quality checks ensure every detail meets our premium standards.", icon: Shield },
  { step: 6, title: "Move In", description: "Your dream space is ready! Enjoy your beautifully designed interior.", icon: Heart },
];

// Expert Team
const expertTeam = [
  { id: 1, name: "Sarah Al-Rashid", role: "Lead Interior Designer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", experience: "12+ Years" },
  { id: 2, name: "Ahmed Hassan", role: "Senior Architect", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", experience: "15+ Years" },
  { id: 3, name: "Priya Sharma", role: "Kitchen Specialist", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", experience: "8+ Years" },
  { id: 4, name: "Michael Chen", role: "Project Manager", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", experience: "10+ Years" },
];

// Google Reviews
const googleReviews = [
  { id: 1, name: "Fatima Al-Maktoum", rating: 5, review: "Exceptional service! The team transformed our villa into a dream home. Every detail was perfect.", date: "2 weeks ago", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { id: 2, name: "Rajesh Patel", rating: 5, review: "Professional team with great attention to detail. Highly recommend for any interior project.", date: "1 month ago", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { id: 3, name: "Emma Thompson", rating: 5, review: "From design to execution, everything was seamless. Love my new kitchen!", date: "3 weeks ago", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
  { id: 4, name: "Mohammed Ali", rating: 5, review: "Best interior design company in Dubai. Quality work at reasonable prices.", date: "1 week ago", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" },
];

// Why Choose Us
const whyChooseUs = [
  { icon: Shield, title: "10-Year Warranty", description: "All our work comes with a comprehensive 10-year warranty for peace of mind." },
  { icon: Clock, title: "45-Day Delivery", description: "We guarantee project completion within 45 days from approval." },
  { icon: Headphones, title: "24/7 Support", description: "Round-the-clock customer support for all your queries and concerns." },
  { icon: ThumbsUp, title: "Quality Assured", description: "Premium materials and expert craftsmanship in every project." },
  { icon: Sparkles, title: "Customized Designs", description: "Every design is tailored to your unique taste and lifestyle." },
  { icon: Zap, title: "Quick Installation", description: "Efficient installation process with minimal disruption." },
];

// Partner Brands
const partnerBrands = [
  { name: "Kohler", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80" },
  { name: "Bosch", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80" },
  { name: "Hafele", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80" },
  { name: "Asian Paints", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80" },
  { name: "Hettich", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80" },
  { name: "Philips", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80" },
];

// Happy Homes
const happyHomes = [
  { id: 1, name: "Al Rashid Residence", location: "Palm Jumeirah", type: "Villa", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
  { id: 2, name: "Marina Heights Apt", location: "Dubai Marina", type: "Apartment", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" },
  { id: 3, name: "Downtown Penthouse", location: "Downtown Dubai", type: "Penthouse", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80" },
  { id: 4, name: "Arabian Villa", location: "Arabian Ranches", type: "Villa", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" },
  { id: 5, name: "JBR Apartment", location: "JBR", type: "Apartment", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80" },
  { id: 6, name: "Hills Estate", location: "Emirates Hills", type: "Villa", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80" },
];

// Video Testimonials
const videoTestimonials = [
  { id: 1, name: "Aisha Mohammed", role: "Homeowner", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", rating: 5, hasVideo: true },
  { id: 2, name: "John Smith", role: "Business Owner", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", rating: 5, hasVideo: true },

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
export default function InteriorDesign() {
  const { data: posts = [] } = useQuery<BlogPost[]>({ queryKey: ["/api/blog"] });
  const filteredBlogPosts = posts.filter(p => p.category === "Interior Design");
  const [activeTab, setActiveTab] = useState("wall-colour");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
                From foundation to furnishings, we style your home like our own.
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
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 text-center"
                    data-testid={`stat-${index}`}
                  >
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#970A44]/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#970A44]" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/70 mt-1">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPLETE TURNKEY SERVICES */}
      <section className="py-24 bg-background" data-testid="section-turnkey">
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
            <Button 
              asChild
              variant="outline"
              className="mt-6 rounded-full px-8 border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
              data-testid="button-know-more"
            >
              <Link href="/about">
                Know More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
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
                  <Card className="h-full border-0 shadow-lg hover-elevate" data-testid={`card-turnkey-${index}`}>
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
        </div>
      </section>

      {/* SECTION 3: FACTORY VIDEO */}
      <section className="py-24 bg-muted/30" data-testid="section-factory">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-sm font-semibold text-[#970A44] uppercase tracking-wider mb-4">
                From Concept to Creation
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
                Your Furniture's Journey
              </h2>
              <div className="bg-[#970A44]/5 border border-[#970A44]/20 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-lg mb-2">Step Inside Our Factory:</h4>
                <p className="text-muted-foreground">
                  See Your Kitchen or Wardrobe Come to Life
                </p>
              </div>
              <Button 
                className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-8"
                data-testid="button-watch-video"
              >
                <Play className="w-5 h-5 mr-2" />
                Play Video
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80"
                  alt="Factory Tour"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <button 
                  className="absolute inset-0 flex items-center justify-center"
                  data-testid="button-play-factory-video"
                >
                  <div className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-xl">
                    <Play className="w-8 h-8 text-[#970A44] ml-1" />
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FURNITURE COLLECTION */}
      <section className="py-24 bg-background" data-testid="section-furniture">
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
              Dive into Our Decor & Furniture Collection!
            </p>
          </motion.div>

          <div className="relative">
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors -ml-4"
              data-testid="button-scroll-left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {furnitureCollection.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex-shrink-0 w-64"
                >
                  <Link href="/shop">
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
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{item.name}</h3>
                          <ArrowRight className="w-4 h-4 text-[#970A44]" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex-shrink-0 w-64"
              >
                <Link href="/shop">
                  <Card className="group h-full overflow-hidden border-2 border-dashed border-[#970A44]/30 hover:border-[#970A44] cursor-pointer transition-colors" data-testid="card-explore-more">
                    <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center aspect-square">
                      <div className="w-16 h-16 bg-[#970A44]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#970A44]/20 transition-colors">
                        <ArrowRight className="w-8 h-8 text-[#970A44]" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Explore More Deals</h3>
                      <span className="text-[#970A44] font-medium">Shop Now</span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </div>

            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-[#970A44] hover:text-white transition-colors -mr-4"
              data-testid="button-scroll-right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: DESIGN IDEAS */}
      <section className="py-24 bg-muted/30" data-testid="section-design-ideas">
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
              Because every corner holds a unique design potential.
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
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4"
                  >
                    {(designIdeas[category.id] || []).map((idea, index) => (
                      <motion.div
                        key={idea.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link href={`/interior-design/${idea.slug}`}>
                          <Card className="group overflow-hidden border-0 shadow-sm hover-elevate cursor-pointer" data-testid={`card-idea-${idea.id}`}>
                            <div className="relative aspect-[3/4] overflow-hidden">
                              <img 
                                src={idea.image}
                                alt={idea.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-3 left-3 right-3">
                                  <span className="text-white text-xs font-medium">View Design</span>
                                </div>
                              </div>
                            </div>
                            <CardContent className="p-3">
                              <h3 className="font-medium text-xs line-clamp-2 group-hover:text-[#970A44] transition-colors">
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
                      <Link href="/interior-design">
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

      {/* SECTION 6: 360-DEGREE TOUR OF EXECUTED PROJECTS */}
      <section className="py-24 bg-background" data-testid="section-360-tour">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              A 360-Degree Tour Of Our Executed Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Like our designs? Explore them from a different perspective!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden border-0 shadow-lg hover-elevate cursor-pointer" data-testid={`card-tour-${project.id}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Eye className="w-6 h-6 text-[#970A44]" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
                      <div className="flex items-center gap-4 text-white/80 text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </span>
                        <span>{project.sqft}</span>
                      </div>
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
              data-testid="button-view-all-tours"
            >
              <Link href="/portfolio">
                View All Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: HOW WE WORK */}
      <section className="py-24 bg-muted/30" data-testid="section-process">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              How We Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process ensures a seamless journey from concept to completion.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-lg hover-elevate" data-testid={`card-process-${step.step}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-14 h-14 bg-[#970A44] rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                          {step.step}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 8: EXPERT TEAM */}
      <section className="py-24 bg-background" data-testid="section-team">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              The Experts Behind Property Masters
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet our talented team of designers and architects who bring your vision to life.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertTeam.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover-elevate" data-testid={`card-team-${member.id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <p className="text-white/80 text-sm">{member.role}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-[#970A44] text-white text-xs font-medium rounded-full">
                        {member.experience}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: GOOGLE REVIEWS */}
      <section className="py-24 bg-muted/30" data-testid="section-reviews">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-8 h-8" />
              <span className="text-lg font-semibold">Google Reviews</span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-xl font-bold">4.9</span>
              <span className="text-muted-foreground">(500+ reviews)</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-serif">
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {googleReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover-elevate" data-testid={`card-review-${review.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={review.image}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      "{review.review}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: WHY CHOOSE US */}
      <section className="py-24 bg-background" data-testid="section-why-choose">
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
              We're committed to delivering excellence in every project we undertake.
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
                  <Card className="h-full border-0 shadow-lg hover-elevate" data-testid={`card-why-${index}`}>
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-[#970A44]/10 rounded-2xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-[#970A44]" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 11: PARTNER BRANDS */}
      <section className="py-16 bg-muted/30" data-testid="section-brands">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-serif">
              Our Trusted Partner Brands
            </h2>
            <p className="text-muted-foreground">
              We work with world-class brands to deliver premium quality
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partnerBrands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="grayscale hover:grayscale-0 transition-all"
              >
                <div className="w-24 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center p-2">
                  <span className="text-sm font-bold text-muted-foreground">{brand.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: HAPPY HOMES */}
      <section className="py-24 bg-background" data-testid="section-happy-homes">
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

      {/* SECTION 13: FREE ESTIMATE */}
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

      {/* SECTION 14: VIDEO TESTIMONIALS */}
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
            {videoTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover-elevate" data-testid={`card-testimonial-${testimonial.id}`}>
                  <CardContent className="p-6">
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
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#970A44] text-[#970A44]" />
                      ))}
                    </div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 15: LATEST BLOG */}
      <section className="py-24 bg-muted/30" data-testid="section-blog">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Latest From Our Blog
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest trends, tips, and insights in interior design.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {filteredBlogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="group overflow-hidden border-0 shadow-lg hover-elevate cursor-pointer" data-testid={`card-blog-${post.id}`}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#970A44] text-white text-xs font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                        <span>{"5 min read"}</span>
                      </div>
                      <h3 className="font-bold text-lg group-hover:text-[#970A44] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
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
              data-testid="button-view-all-blogs"
            >
              <Link href="/blog">
                Read More Articles
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 17: ABOUT PROPERTY MASTERS - COMPREHENSIVE OVERVIEW */}
      <section className="py-24 bg-background" data-testid="section-about-overview">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
              Interior Design & Property Services in Dubai
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Property Masters is a Dubai-based interior design and property services company focused on creating well-planned, practical, and durable spaces. Our work spans residential and commercial interiors, renovation, and specialized property services, all delivered with a clear understanding of local conditions, usage patterns, and long-term performance.
            </p>
          </motion.div>

          {/* Dubai Context */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-20"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#970A44]/5 to-[#720632]/10">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#970A44]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#970A44]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Designed for Dubai's Unique Environment</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      In Dubai, properties are exposed to constant air conditioning, heat, humidity, and heavy daily use. Design decisions that ignore these factors often lead to early wear, discomfort, or high maintenance costs. Our approach is built around designing and executing spaces that not only look balanced, but continue to function well over time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Who We Are */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#970A44]/10 rounded-full mb-6">
                <Users className="w-5 h-5 text-[#970A44]" />
                <span className="text-[#970A44] font-medium">Who We Are</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 font-serif">
                Planning Over Excess
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Property Masters is built around the idea that good interiors come from planning, not excess. We focus on understanding how spaces are actually used and translating that understanding into layouts, materials, and finishes that make sense in real life.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team works across apartments, villas, and commercial properties, coordinating design and execution to ensure consistency from concept to completion. Rather than treating services as separate tasks, we approach projects as connected systems, where each decision affects the final outcome.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1C4668]/10 rounded-full mb-6">
                <Target className="w-5 h-5 text-[#1C4668]" />
                <span className="text-[#1C4668] font-medium">Our Mission & Philosophy</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 font-serif">
                Practical, Reliable, Comfortable
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our mission is to create interiors and property solutions that are practical, reliable, and comfortable to live or work in.
              </p>
              <ul className="space-y-4">
                {[
                  "Design should support daily routines, not complicate them",
                  "Materials should be chosen for performance, not just appearance",
                  "Execution should match the approved design without shortcuts",
                  "Interiors should age well, not demand constant correction"
                ].map((belief, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#970A44] flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{belief}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* What We Do - Complete Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-4xl font-bold mb-4 font-serif">
                What We Do
              </h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Property Masters provides a complete range of interior design and property services in Dubai. Each service is structured to address specific needs while remaining part of a cohesive whole.
              </p>
            </div>

            {/* Interior Design & Renovation Services */}
            <div className="mb-12">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#970A44]/10 rounded-lg flex items-center justify-center">
                  <Paintbrush className="w-5 h-5 text-[#970A44]" />
                </div>
                Interior Design & Renovation Services
              </h4>
              <p className="text-muted-foreground mb-6">
                We design and renovate residential and commercial interiors with a focus on layout planning, material suitability, and long-term usability. This includes apartments, villas, and business spaces.
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Residential Interior Design", desc: "Homes designed around comfort, storage, and ease of movement. Full renovations and room-specific upgrades." },
                  { title: "Kitchen Remodeling & Modular Kitchens", desc: "Planned around workflow, storage efficiency, and materials that handle heat and daily use reliably." },
                  { title: "Living Room, Bedroom & Kids Room", desc: "Individual spaces designed to support their specific purpose, whether shared living, rest, or growth." },
                  { title: "Wardrobe & Storage Solutions", desc: "Storage systems designed around real usage habits, reducing clutter and improving daily routines." },
                  { title: "Bathroom Interior Design & Renovation", desc: "Planned with attention to moisture management, safety, and durability for comfort and ease of maintenance." },
                  { title: "Flooring Services", desc: "Guidance and installation for a wide range of flooring options, selected based on usage and maintenance needs." },
                  { title: "Interior Painting, Gypsum & False Ceilings", desc: "Finishing works treated as part of the overall design, supporting lighting, proportions, and clean detailing." },
                  { title: "Quartz & Natural Stone Countertops", desc: "Countertop solutions selected and installed with attention to durability, usage, and visual consistency." },
                  { title: "Outdoor Renovation & Landscaping", desc: "Outdoor spaces designed as functional extensions of the interior, using materials suited to sun exposure and heat." },
                  { title: "Swimming Pool Design & Build", desc: "Pools planned and constructed as complete systems, balancing design, safety, and long-term performance." },
                  { title: "Glass & Aluminum Works", desc: "Glass and aluminum elements designed and installed with precision to support modern interiors and exterior structures." },
                  { title: "Marble Restoration Services", desc: "Professional restoration services help revive marble surfaces and extend their lifespan without replacement." },
                ].map((service, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`card-service-overview-${idx}`}>
                      <CardContent className="p-5">
                        <h5 className="font-bold mb-2 text-[#09263D]">{service.title}</h5>
                        <p className="text-sm text-muted-foreground">{service.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Commercial Interior Design */}
            <div className="mb-12">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1C4668]/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#1C4668]" />
                </div>
                Commercial Interior Design
              </h4>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <p className="text-muted-foreground leading-relaxed">
                    We design commercial interiors for restaurants, hospitality, and retail spaces, focusing on operational efficiency and brand alignment. Each service is explained in detail on its own dedicated page, allowing clients to explore only what is relevant to their needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* How We Work */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-20"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-[#09263D] to-[#1C4668]">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Ruler className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-serif">How We Work</h3>
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  Our process is structured to reduce uncertainty and maintain quality throughout the project.
                </p>
                <p className="text-white/80 leading-relaxed mb-6">
                  We begin by understanding the property, usage requirements, and client priorities. Design decisions are developed with practical constraints in mind, and all materials and finishes are finalized before execution begins. During execution, coordination and quality control ensure the finished space reflects the approved plan.
                </p>
                <p className="text-white/90 font-medium">
                  This approach helps avoid unnecessary changes, delays, and mismatched outcomes.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Who We Work With */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-4xl font-bold mb-4 font-serif">
                Who We Work With
              </h3>
              <p className="text-lg text-muted-foreground">
                Each project is approached with the same attention to detail and accountability.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Building2, title: "Homeowners", desc: "Renovating or upgrading their properties" },
                { icon: Award, title: "Property Investors", desc: "And landlords seeking value enhancement" },
                { icon: Users, title: "Business Owners", desc: "And commercial operators" },
                { icon: Target, title: "Long-term Clients", desc: "Seeking well-planned interior solutions" },
              ].map((client, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-lg hover-elevate text-center" data-testid={`card-client-${idx}`}>
                    <CardContent className="p-6">
                      <div className="w-14 h-14 mx-auto mb-4 bg-[#970A44]/10 rounded-2xl flex items-center justify-center">
                        <client.icon className="w-7 h-7 text-[#970A44]" />
                      </div>
                      <h4 className="font-bold mb-2">{client.title}</h4>
                      <p className="text-sm text-muted-foreground">{client.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 18: COMPREHENSIVE FAQ */}
      <section className="py-24 bg-muted/30" data-testid="section-faq">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our interior design and renovation services.
            </p>
          </motion.div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full max-w-4xl mx-auto mb-8 flex flex-wrap h-auto gap-2 bg-transparent justify-center">
              {[
                { value: "general", label: "General" },
                { value: "residential", label: "Residential" },
                { value: "kitchen", label: "Kitchen" },
                { value: "bedroom", label: "Bedroom" },
                { value: "bathroom", label: "Bathroom" },
                { value: "commercial", label: "Commercial" },
              ].map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value}
                  className="px-4 py-2 data-[state=active]:bg-[#970A44] data-[state=active]:text-white rounded-full"
                  data-testid={`tab-faq-${tab.value}`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="general" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "Do you provide both interior design and renovation services?", a: "Yes. We manage both design and execution to ensure consistency from planning to completion." },
                  { q: "Do you work across Dubai?", a: "Yes. We provide interior and renovation services across Dubai for residential and commercial properties." },
                  { q: "Can I choose only specific services instead of a full project?", a: "Yes. Clients can select individual services or combine multiple services as needed." },
                  { q: "Do you handle apartments, villas, and commercial spaces?", a: "Yes. Our services cover all property types." },
                  { q: "How do I get started with Property Masters?", a: "You can begin with an initial consultation to discuss your requirements and scope." },
                  { q: "How long does a typical project take?", a: "Timelines vary depending on scope, but are discussed clearly before work begins. We guarantee project completion within agreed timelines." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`card-faq-general-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="residential" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "Do you handle full home renovations?", a: "Yes. We manage complete residential renovations from planning to execution." },
                  { q: "Can you renovate only certain rooms?", a: "Yes. Partial renovations and room-specific upgrades are available." },
                  { q: "Can renovation be done while the home is occupied?", a: "In some cases, yes. This depends on the scope and is assessed beforehand." },
                  { q: "Do you assist with approvals if required?", a: "We guide clients on any approvals required based on the property." },
                  { q: "Do you provide flooring services?", a: "Yes. We provide guidance and installation for a wide range of flooring options, selected based on usage, maintenance needs, and environmental conditions." },
                  { q: "Do you handle subfloor preparation?", a: "Yes. Proper preparation is part of the process for all flooring installations." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`card-faq-residential-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="kitchen" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "Do you offer both modular and custom kitchens?", a: "Yes. The option depends on layout, usage, and budget." },
                  { q: "Can I keep my existing kitchen layout?", a: "Where possible, yes. We assess whether layout changes are necessary." },
                  { q: "Do you help with material and finish selection?", a: "Yes. We guide clients through cabinets, countertops, and finishes." },
                  { q: "How long does a kitchen renovation take?", a: "Most kitchen projects take a few weeks, depending on complexity." },
                  { q: "Can kitchen work be coordinated with other interior services?", a: "Yes. Kitchen remodeling can be integrated into larger renovation projects." },
                  { q: "Which is easier to maintain, quartz or natural stone?", a: "Quartz generally requires less maintenance. We provide guidance based on your specific needs." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`card-faq-kitchen-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bedroom" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "Do you design wardrobes for master bedrooms?", a: "Yes. Wardrobe and storage planning is included in our bedroom design service." },
                  { q: "Can the bedroom design be kept minimal and calm?", a: "Absolutely. Designs are tailored to personal comfort preferences." },
                  { q: "Do you help with lighting selection?", a: "Yes. Lighting is planned to support rest and daily routines." },
                  { q: "Can a dressing area be included?", a: "Yes, where space allows." },
                  { q: "Can the design adapt as the child grows?", a: "Yes. Flexibility is a key part of our kids' room designs." },
                  { q: "Do you offer custom wardrobe designs?", a: "Yes. Storage solutions are customized to the space and usage habits." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`card-faq-bedroom-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bathroom" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "Do you handle complete bathroom renovations?", a: "Yes. From layout to finishes and fixtures." },
                  { q: "Are materials chosen for moisture resistance?", a: "Yes. All materials are selected for humid conditions." },
                  { q: "Can existing plumbing layouts be retained?", a: "Where possible, yes. We assess and advise accordingly." },
                  { q: "Do you design vanity storage solutions?", a: "Yes. Vanity and storage planning is included." },
                  { q: "Can bathroom renovation be part of a larger project?", a: "Yes. It can be integrated with full renovations." },
                  { q: "Do you handle gypsum partitions and false ceilings in bathrooms?", a: "Yes. These are designed with proper moisture considerations." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`card-faq-bathroom-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="commercial" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "Do you design restaurant and retail interiors?", a: "Yes. Restaurants, retail, and hospitality are included." },
                  { q: "Can layouts be designed around business operations?", a: "Yes. Workflow is a key consideration in commercial design." },
                  { q: "Do you handle execution as well as design?", a: "Yes. Projects are managed end-to-end." },
                  { q: "Can materials handle heavy foot traffic?", a: "Yes. Materials are selected for durability and commercial use." },
                  { q: "Do you offer glass and aluminum works?", a: "Yes. Glass and aluminum elements are designed and installed with precision to support modern interiors and exterior structures." },
                  { q: "Is marble restoration available for commercial spaces?", a: "Yes. Both residential and commercial properties are covered for restoration services." },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <Card className="h-full border hover-elevate" data-testid={`card-faq-commercial-${idx}`}>
                      <CardContent className="p-6">
                        <h4 className="font-bold mb-3 text-[#09263D]">{faq.q}</h4>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* SECTION 19: FINAL CTA */}
      <section className="py-24 bg-[#09263D]" data-testid="section-cta">
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
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Let our expert designers bring your vision to life. Book a free consultation today and take the first step towards your dream interior.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-8"
                data-testid="button-cta-consultation"
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
                data-testid="button-cta-portfolio"
              >
                <Link href="/portfolio">
                  View Our Portfolio
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
