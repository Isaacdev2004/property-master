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
  Tv,
  Flower2,
  PaintBucket,
  LayoutGrid,
  Square,
  Baby
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Hero stats matching interiorcompany.com
const stats = [
  { icon: Building2, value: "5000+", label: "INTERIOR PROJECTS" },
  { icon: Users, value: "200+", label: "DESIGN EXPERTS" },
  { icon: Award, value: "15+", label: "YEARS EXPERIENCE" },
  { icon: Palette, value: "2 Lac+", label: "DESIGN OPTIONS" },
];

// Turnkey Services - matching interiorcompany.com
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

// Furniture Collection - matching interiorcompany.com
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

// Design categories matching interiorcompany.com tabs
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
      staggerChildren: 0.1,
    },
  },
};

export default function InteriorDesign() {
  const [activeTab, setActiveTab] = useState("wall-colour");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ========================================
          SECTION 1: HERO (matches interiorcompany.com)
          ======================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
            alt="Luxury Interior Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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

      {/* ========================================
          SECTION 2: COMPLETE TURNKEY SERVICES (matches interiorcompany.com)
          ======================================== */}
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

      {/* ========================================
          SECTION 3: FACTORY VIDEO (matches interiorcompany.com)
          ======================================== */}
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

      {/* ========================================
          SECTION 4: FURNITURE COLLECTION (matches interiorcompany.com)
          ======================================== */}
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

      {/* ========================================
          SECTION 5: DESIGN IDEAS (matches interiorcompany.com)
          ======================================== */}
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
                        <Link href={`/interior-design/${category.id}/${idea.slug}`}>
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

      {/* ========================================
          SECTION 6: FINAL CTA (matches interiorcompany.com)
          ======================================== */}
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
