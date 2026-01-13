import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { 
  ArrowRight, 
  ArrowLeft,
  Filter,
  Grid3X3,
  LayoutGrid,
  Sofa, 
  UtensilsCrossed, 
  Bed, 
  Bath, 
  DoorOpen,
  Lamp,
  Table2,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categoryData: Record<string, {
  title: string;
  description: string;
  icon: typeof Sofa;
  heroImage: string;
  filters: string[];
  designs: {
    id: number;
    title: string;
    image: string;
    slug: string;
    style: string;
  }[];
}> = {
  "living-room": {
    title: "Living Room Designs",
    description: "Explore our curated collection of living room interior designs. From modern minimalist to classic luxury, find inspiration for your perfect living space.",
    icon: Sofa,
    heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80",
    filters: ["All", "Modern", "Contemporary", "Minimalist", "Luxury", "Traditional"],
    designs: [
      { id: 1, title: "Modern Living Room with L-Shaped Sofa and Marble Accents", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", slug: "modern-living-room-l-shaped", style: "Modern" },
      { id: 2, title: "Contemporary Living Room with Velvet Furniture", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", slug: "contemporary-velvet-living", style: "Contemporary" },
      { id: 3, title: "Minimalist Living Room with Natural Light", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80", slug: "minimalist-natural-light", style: "Minimalist" },
      { id: 4, title: "Luxury Living Room with Gold Accents", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "luxury-gold-accents", style: "Luxury" },
      { id: 5, title: "Industrial Living Room with Exposed Brick", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "industrial-exposed-brick", style: "Modern" },
      { id: 6, title: "Scandinavian Living Room Design", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", slug: "scandinavian-living", style: "Minimalist" },
      { id: 7, title: "Traditional Living Room with Fireplace", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80", slug: "traditional-fireplace", style: "Traditional" },
      { id: 8, title: "Bohemian Living Room with Colorful Decor", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "bohemian-colorful", style: "Contemporary" },
      { id: 9, title: "Art Deco Living Room Design", image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80", slug: "art-deco-living", style: "Luxury" },
      { id: 10, title: "Coastal Living Room with Blue Accents", image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80", slug: "coastal-blue-accents", style: "Contemporary" },
      { id: 11, title: "Open Plan Living Room Design", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80", slug: "open-plan-living", style: "Modern" },
      { id: 12, title: "Rustic Living Room with Wood Elements", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80", slug: "rustic-wood-elements", style: "Traditional" },
    ],
  },
  "kitchen": {
    title: "Modular Kitchen Designs",
    description: "Discover stunning modular kitchen designs that combine functionality with style. From L-shaped to island kitchens, find your perfect cooking space.",
    icon: UtensilsCrossed,
    heroImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80",
    filters: ["All", "L-Shaped", "U-Shaped", "Island", "Parallel", "Modern", "Classic"],
    designs: [
      { id: 1, title: "Modern L-Shaped Kitchen with Quartz Countertop", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", slug: "modern-l-shaped-kitchen", style: "L-Shaped" },
      { id: 2, title: "Contemporary White Kitchen with Island", image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=600&q=80", slug: "contemporary-white-kitchen", style: "Island" },
      { id: 3, title: "Sage Green Kitchen with Brass Fixtures", image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80", slug: "sage-green-kitchen", style: "Modern" },
      { id: 4, title: "Industrial Style Kitchen Design", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80", slug: "industrial-kitchen", style: "Modern" },
      { id: 5, title: "U-Shaped Kitchen with Breakfast Bar", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80", slug: "u-shaped-breakfast-bar", style: "U-Shaped" },
      { id: 6, title: "Minimalist White Kitchen Design", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80", slug: "minimalist-white-kitchen", style: "Modern" },
      { id: 7, title: "Classic Kitchen with Wood Cabinets", image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80", slug: "classic-wood-kitchen", style: "Classic" },
      { id: 8, title: "Parallel Kitchen Design for Compact Spaces", image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=600&q=80", slug: "parallel-compact-kitchen", style: "Parallel" },
      { id: 9, title: "Luxury Kitchen with Marble Countertops", image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&q=80", slug: "luxury-marble-kitchen", style: "Island" },
      { id: 10, title: "Rustic Farmhouse Kitchen Design", image: "https://images.unsplash.com/photo-1556909172-89cf0b17034e?w=600&q=80", slug: "rustic-farmhouse-kitchen", style: "Classic" },
      { id: 11, title: "High-Gloss Kitchen with Handleless Cabinets", image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=600&q=80", slug: "high-gloss-handleless", style: "Modern" },
      { id: 12, title: "Two-Tone Kitchen Design", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", slug: "two-tone-kitchen", style: "L-Shaped" },
    ],
  },
  "bedroom": {
    title: "Bedroom Designs",
    description: "Create your perfect retreat with our collection of bedroom interior designs. Find inspiration for master bedrooms, guest rooms, and more.",
    icon: Bed,
    heroImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1920&q=80",
    filters: ["All", "Master", "Guest", "Modern", "Minimalist", "Luxury", "Cozy"],
    designs: [
      { id: 1, title: "Luxurious Master Bedroom with Upholstered Headboard", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80", slug: "luxury-master-bedroom", style: "Master" },
      { id: 2, title: "Minimalist Bedroom with Platform Bed", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80", slug: "minimalist-platform-bed", style: "Minimalist" },
      { id: 3, title: "Cozy Bedroom with Warm Tones", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80", slug: "cozy-warm-bedroom", style: "Cozy" },
      { id: 4, title: "Modern Bedroom with Walk-in Closet", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80", slug: "modern-walk-in-closet", style: "Modern" },
      { id: 5, title: "Contemporary Grey Bedroom Design", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "contemporary-grey-bedroom", style: "Modern" },
      { id: 6, title: "Bohemian Bedroom with Natural Elements", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", slug: "bohemian-natural-bedroom", style: "Cozy" },
      { id: 7, title: "Elegant Guest Bedroom Design", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80", slug: "elegant-guest-bedroom", style: "Guest" },
      { id: 8, title: "Scandinavian Bedroom with White Palette", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "scandinavian-white-bedroom", style: "Minimalist" },
      { id: 9, title: "Art Deco Bedroom with Bold Colors", image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80", slug: "art-deco-bedroom", style: "Luxury" },
      { id: 10, title: "Coastal Bedroom with Blue Accents", image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80", slug: "coastal-bedroom", style: "Cozy" },
      { id: 11, title: "Traditional Bedroom with Four-Poster Bed", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80", slug: "traditional-four-poster", style: "Master" },
      { id: 12, title: "Kids Bedroom with Fun Theme", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80", slug: "kids-fun-bedroom", style: "Guest" },
    ],
  },
  "wardrobe": {
    title: "Wardrobe Designs",
    description: "Maximize your storage with our custom wardrobe designs. From walk-in closets to sliding door wardrobes, find the perfect solution for your space.",
    icon: DoorOpen,
    heroImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=1920&q=80",
    filters: ["All", "Walk-in", "Sliding", "Hinged", "Built-in", "Corner", "Modern"],
    designs: [
      { id: 1, title: "Walk-in Wardrobe with Custom Shelving", image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80", slug: "walk-in-custom-shelving", style: "Walk-in" },
      { id: 2, title: "Sliding Door Wardrobe with Mirror Finish", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80", slug: "sliding-mirror-wardrobe", style: "Sliding" },
      { id: 3, title: "Built-in Wardrobe with LED Lighting", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", slug: "built-in-led-wardrobe", style: "Built-in" },
      { id: 4, title: "Luxury Dressing Room Design", image: "https://images.unsplash.com/photo-1583845112203-29329902332e?w=600&q=80", slug: "luxury-dressing-room", style: "Walk-in" },
      { id: 5, title: "Corner Wardrobe for Small Spaces", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "corner-small-space", style: "Corner" },
      { id: 6, title: "Modern Hinged Door Wardrobe", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", slug: "modern-hinged-wardrobe", style: "Hinged" },
      { id: 7, title: "White Glossy Wardrobe Design", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80", slug: "white-glossy-wardrobe", style: "Modern" },
      { id: 8, title: "Walk-in Closet with Island", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "walk-in-island", style: "Walk-in" },
      { id: 9, title: "Sliding Wardrobe with Wooden Finish", image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80", slug: "sliding-wooden-wardrobe", style: "Sliding" },
      { id: 10, title: "Minimalist Built-in Wardrobe", image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80", slug: "minimalist-built-in", style: "Built-in" },
      { id: 11, title: "Floor-to-Ceiling Wardrobe Design", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80", slug: "floor-ceiling-wardrobe", style: "Modern" },
      { id: 12, title: "L-Shaped Corner Wardrobe", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80", slug: "l-shaped-corner", style: "Corner" },
    ],
  },
  "bathroom": {
    title: "Bathroom Designs",
    description: "Transform your bathroom into a spa-like retreat. Explore our collection of modern, luxurious, and functional bathroom designs.",
    icon: Bath,
    heroImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80",
    filters: ["All", "Master", "Guest", "Modern", "Luxury", "Minimalist", "Spa"],
    designs: [
      { id: 1, title: "Spa-like Bathroom with Freestanding Tub", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", slug: "spa-freestanding-tub", style: "Spa" },
      { id: 2, title: "Modern Bathroom with Rainfall Shower", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80", slug: "modern-rainfall-shower", style: "Modern" },
      { id: 3, title: "Minimalist Bathroom with Floating Vanity", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80", slug: "minimalist-floating-vanity", style: "Minimalist" },
      { id: 4, title: "Luxury Master Bathroom Suite", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80", slug: "luxury-master-bathroom", style: "Luxury" },
      { id: 5, title: "Compact Guest Bathroom Design", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "compact-guest-bathroom", style: "Guest" },
      { id: 6, title: "Industrial Bathroom with Concrete Walls", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80", slug: "industrial-concrete-bathroom", style: "Modern" },
      { id: 7, title: "Classic Bathroom with Clawfoot Tub", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "classic-clawfoot-bathroom", style: "Luxury" },
      { id: 8, title: "Contemporary Bathroom with Glass Shower", image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80", slug: "contemporary-glass-shower", style: "Modern" },
      { id: 9, title: "Zen Bathroom with Natural Elements", image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80", slug: "zen-natural-bathroom", style: "Spa" },
      { id: 10, title: "Marble Master Bathroom Design", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80", slug: "marble-master-bathroom", style: "Master" },
      { id: 11, title: "Small Bathroom with Storage Solutions", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80", slug: "small-bathroom-storage", style: "Guest" },
      { id: 12, title: "Double Vanity Bathroom Design", image: "https://images.unsplash.com/photo-1558882224-dda166c27a7b?w=600&q=80", slug: "double-vanity-bathroom", style: "Master" },
    ],
  },
  "dining": {
    title: "Dining Room Designs",
    description: "Create the perfect dining experience with our elegant dining room designs. From formal to casual, find inspiration for every style.",
    icon: Table2,
    heroImage: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1920&q=80",
    filters: ["All", "Formal", "Casual", "Modern", "Traditional", "Open Plan"],
    designs: [
      { id: 1, title: "Elegant Dining Room with Crystal Chandelier", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "elegant-crystal-chandelier", style: "Formal" },
      { id: 2, title: "Modern Dining with Marble Table", image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80", slug: "modern-marble-dining", style: "Modern" },
      { id: 3, title: "Rustic Dining Room with Wood Accents", image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80", slug: "rustic-wood-dining", style: "Traditional" },
      { id: 4, title: "Contemporary Open-Plan Dining", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80", slug: "contemporary-open-plan", style: "Open Plan" },
      { id: 5, title: "Minimalist Dining Room Design", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "minimalist-dining", style: "Modern" },
      { id: 6, title: "Formal Dining with Velvet Chairs", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", slug: "formal-velvet-dining", style: "Formal" },
      { id: 7, title: "Casual Dining with Bench Seating", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80", slug: "casual-bench-dining", style: "Casual" },
      { id: 8, title: "Industrial Dining Room Design", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80", slug: "industrial-dining", style: "Modern" },
      { id: 9, title: "Traditional Dining with Buffet Unit", image: "https://images.unsplash.com/photo-1558882224-dda166c27a7b?w=600&q=80", slug: "traditional-buffet-dining", style: "Traditional" },
      { id: 10, title: "Round Table Dining Room Design", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", slug: "round-table-dining", style: "Casual" },
      { id: 11, title: "Outdoor Dining Space Design", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", slug: "outdoor-dining-space", style: "Casual" },
      { id: 12, title: "Luxury Dining Room with Gold Details", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80", slug: "luxury-gold-dining", style: "Formal" },
    ],
  },
  "lighting": {
    title: "Lighting Designs",
    description: "Illuminate your space with our creative lighting design ideas. From statement chandeliers to ambient LED solutions.",
    icon: Lamp,
    heroImage: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1920&q=80",
    filters: ["All", "Chandeliers", "Pendant", "LED", "Track", "Ambient", "Task"],
    designs: [
      { id: 1, title: "Statement Pendant Lighting Ideas", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80", slug: "statement-pendant-lighting", style: "Pendant" },
      { id: 2, title: "Ambient Lighting with LED Strips", image: "https://images.unsplash.com/photo-1558882224-dda166c27a7b?w=600&q=80", slug: "ambient-led-strips", style: "LED" },
      { id: 3, title: "Chandelier Designs for Grand Spaces", image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&q=80", slug: "chandelier-grand-spaces", style: "Chandeliers" },
      { id: 4, title: "Task Lighting for Work Areas", image: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=600&q=80", slug: "task-lighting-work", style: "Task" },
      { id: 5, title: "Track Lighting for Modern Spaces", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "track-lighting-modern", style: "Track" },
      { id: 6, title: "Crystal Chandelier for Dining Rooms", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", slug: "crystal-chandelier-dining", style: "Chandeliers" },
      { id: 7, title: "LED Cove Lighting Design", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80", slug: "led-cove-lighting", style: "LED" },
      { id: 8, title: "Industrial Pendant Lights", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "industrial-pendant-lights", style: "Pendant" },
      { id: 9, title: "Ambient Bedroom Lighting Ideas", image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80", slug: "ambient-bedroom-lighting", style: "Ambient" },
      { id: 10, title: "Modern Minimalist Light Fixtures", image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80", slug: "minimalist-light-fixtures", style: "Pendant" },
      { id: 11, title: "Under-Cabinet Kitchen Lighting", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80", slug: "under-cabinet-kitchen", style: "Task" },
      { id: 12, title: "Outdoor Landscape Lighting", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", slug: "outdoor-landscape-lighting", style: "Ambient" },
    ],
  },
  "office": {
    title: "Home Office Designs",
    description: "Create a productive workspace at home with our home office design ideas. From executive studies to creative studios.",
    icon: Grid3X3,
    heroImage: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=1920&q=80",
    filters: ["All", "Executive", "Creative", "Minimalist", "Modern", "Traditional"],
    designs: [
      { id: 1, title: "Executive Home Office Design", image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=600&q=80", slug: "executive-home-office", style: "Executive" },
      { id: 2, title: "Minimalist Workspace with Natural Light", image: "https://images.unsplash.com/photo-1600494448850-6013c46ba587?w=600&q=80", slug: "minimalist-workspace", style: "Minimalist" },
      { id: 3, title: "Creative Studio Office Design", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", slug: "creative-studio-office", style: "Creative" },
      { id: 4, title: "Built-in Study Room Design", image: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=600&q=80", slug: "built-in-study-room", style: "Modern" },
      { id: 5, title: "Modern Home Office with Standing Desk", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", slug: "modern-standing-desk", style: "Modern" },
      { id: 6, title: "Traditional Library Office Design", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", slug: "traditional-library-office", style: "Traditional" },
      { id: 7, title: "Compact Corner Office Design", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&q=80", slug: "compact-corner-office", style: "Minimalist" },
      { id: 8, title: "Industrial Loft Office Design", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80", slug: "industrial-loft-office", style: "Creative" },
      { id: 9, title: "Luxury Executive Study Room", image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80", slug: "luxury-executive-study", style: "Executive" },
      { id: 10, title: "Open Concept Home Office", image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80", slug: "open-concept-office", style: "Modern" },
      { id: 11, title: "Scandinavian Home Office Design", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80", slug: "scandinavian-home-office", style: "Minimalist" },
      { id: 12, title: "Dual Workspace Home Office", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80", slug: "dual-workspace-office", style: "Creative" },
    ],
  },
};

export default function DesignCategory() {
  const [, params] = useRoute("/interior-design/:category");
  const category = params?.category || "living-room";
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "large">("grid");

  const data = categoryData[category] || categoryData["living-room"];
  const Icon = data.icon;

  const filteredDesigns = activeFilter === "All" 
    ? data.designs 
    : data.designs.filter(d => d.style === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={data.heroImage}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/70 text-sm mb-6" data-testid="breadcrumb-nav">
              <Link href="/" data-testid="link-breadcrumb-home">
                <span className="hover:text-white cursor-pointer">Home</span>
              </Link>
              <span>/</span>
              <Link href="/interior-design" data-testid="link-breadcrumb-interior">
                <span className="hover:text-white cursor-pointer">Interior Design</span>
              </Link>
              <span>/</span>
              <span className="text-white">{data.title.replace(" Designs", "")}</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-[#970A44] rounded-xl flex items-center justify-center">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white font-serif">
                {data.title}
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl">
              {data.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {data.filters.map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(filter)}
                    className={activeFilter === filter 
                      ? "bg-[#970A44] hover:bg-[#720632] rounded-full" 
                      : "rounded-full"
                    }
                    data-testid={`filter-${filter.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{filteredDesigns.length} designs</span>
              <div className="flex border rounded-lg">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-muted" : ""}
                  data-testid="button-view-grid"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setViewMode("large")}
                  className={viewMode === "large" ? "bg-muted" : ""}
                  data-testid="button-view-large"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Design Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`grid gap-6 ${
              viewMode === "grid" 
                ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {filteredDesigns.map((design, index) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/interior-design/${design.slug}`} data-testid={`link-design-${design.id}`}>
                  <Card className="group overflow-hidden border-0 shadow-md hover-elevate cursor-pointer" data-testid={`card-design-${design.id}`}>
                    <div className={`relative overflow-hidden ${viewMode === "large" ? "aspect-[4/3]" : "aspect-square"}`}>
                      <img 
                        src={design.image}
                        alt={design.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[#970A44]">
                          {design.style}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 bg-[#970A44] rounded-full flex items-center justify-center">
                          <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-[#970A44] transition-colors">
                        {design.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More / Pagination */}
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              className="rounded-full px-8 border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white"
              data-testid={`button-load-more-${category}`}
            >
              Load More Designs
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 font-serif">Explore Other Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {Object.entries(categoryData).map(([key, cat]) => {
              const CatIcon = cat.icon;
              return (
                <Link key={key} href="/interior-design" data-testid={`link-category-${key}`}>
                  <div className={`p-4 rounded-xl text-center hover-elevate cursor-pointer transition-all ${
                    key === category ? "bg-[#970A44] text-white" : "bg-background border hover:border-[#970A44]"
                  }`}>
                    <CatIcon className={`w-6 h-6 mx-auto mb-2 ${key === category ? "text-white" : "text-[#970A44]"}`} />
                    <span className="text-xs font-medium">{cat.title.replace(" Designs", "")}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#970A44] to-[#720632]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
            Ready to Create Your Dream {data.title.replace(" Designs", "")}?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Book a free consultation with our design experts and bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              asChild
              size="lg"
              className="bg-white text-[#970A44] hover:bg-white/90 rounded-full px-8"
              data-testid="button-category-consultation"
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
              data-testid="button-back-categories"
            >
              <Link href="/interior-design">
                <ArrowLeft className="mr-2 w-5 h-5" />
                Back to All Categories
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
