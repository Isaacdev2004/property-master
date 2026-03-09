import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { 
  ArrowRight, 
  ArrowLeft,
  Heart,
  Share2,
  Download,
  Check,
  Phone,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const designDetails: Record<string, {
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: string;
  gallery: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  relatedDesigns: { id: number; title: string; image: string; slug: string }[];
}> = {
  "modern-living-room-l-shaped": {
    title: "Modern Living Room with L-Shaped Sofa and Marble Accents",
    category: "living-room",
    categoryLabel: "Living Room",
    description: "This stunning modern living room design features a luxurious L-shaped sofa as the centerpiece, complemented by elegant marble accents throughout the space. The design emphasizes clean lines, neutral tones, and a perfect balance between comfort and sophistication. Large windows allow natural light to flood the space, while strategically placed lighting creates a warm ambiance in the evening.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    features: [
      "L-shaped premium fabric sofa with chaise lounge",
      "Italian marble coffee table with brass accents",
      "Custom built-in entertainment unit",
      "Floor-to-ceiling windows with sheer curtains",
      "Designer pendant lighting fixtures",
      "Handcrafted decorative accessories",
      "Premium hardwood flooring",
      "Accent wall with textured panels"
    ],
    specifications: [
      { label: "Room Size", value: "450 sq ft" },
      { label: "Style", value: "Modern Contemporary" },
      { label: "Color Palette", value: "Neutral Tones" },
      { label: "Budget Range", value: "AED 80,000 - 120,000" },
      { label: "Completion Time", value: "6-8 weeks" },
      { label: "Materials", value: "Marble, Wood, Fabric" },
    ],
    relatedDesigns: [
      { id: 1, title: "Contemporary Living Room with Velvet Furniture", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", slug: "contemporary-velvet-living" },
      { id: 2, title: "Minimalist Living Room with Natural Light", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80", slug: "minimalist-natural-light" },
      { id: 3, title: "Luxury Living Room with Gold Accents", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "luxury-gold-accents" },
    ]
  }
};

const defaultDesign = {
  title: "Modern Interior Design",
  category: "living-room",
  categoryLabel: "Living Room",
  description: "A beautifully designed modern interior space that combines functionality with aesthetic appeal. This design features carefully curated furniture pieces, thoughtful color combinations, and attention to every detail to create a harmonious living environment.",
  image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  ],
  features: [
    "Premium quality materials",
    "Custom furniture design",
    "Optimal space utilization",
    "Natural lighting integration",
    "Modern fixtures and fittings",
    "Coordinated color scheme",
    "Quality flooring solutions",
    "Decorative wall treatments"
  ],
  specifications: [
    { label: "Room Size", value: "Customizable" },
    { label: "Style", value: "Modern" },
    { label: "Color Palette", value: "Neutral" },
    { label: "Budget Range", value: "Contact for Quote" },
    { label: "Completion Time", value: "4-8 weeks" },
    { label: "Materials", value: "Premium Selection" },
  ],
  relatedDesigns: [
    { id: 1, title: "Contemporary Design", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", slug: "contemporary-design" },
    { id: 2, title: "Minimalist Design", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80", slug: "minimalist-design" },
    { id: 3, title: "Luxury Design", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", slug: "luxury-design" },
  ]
};

export default function DesignDetail() {
  const [, params] = useRoute("/interior-design/:category/:slug");
  const category = params?.category || "living-room";
  const slug = params?.slug || "";

  const design = designDetails[slug] || { ...defaultDesign, category };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="breadcrumb-nav">
            <Link href="/" data-testid="link-breadcrumb-home">
              <span className="hover:text-foreground cursor-pointer">Home</span>
            </Link>
            <span>/</span>
            <Link href="/interior-design" data-testid="link-breadcrumb-interior">
              <span className="hover:text-foreground cursor-pointer">Interior Design</span>
            </Link>
            <span>/</span>
            <Link href="/interior-design" data-testid="link-breadcrumb-category">
              <span className="hover:text-foreground cursor-pointer">{design.categoryLabel}</span>
            </Link>
            <span>/</span>
            <span className="text-foreground">{design.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden mb-4">
              <img 
                src={design.image}
                alt={design.title}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="secondary" size="icon" className="rounded-full bg-white/90 hover:bg-white" data-testid="button-favorite">
                  <Heart className="w-5 h-5 text-[#CD9342]" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full bg-white/90 hover:bg-white" data-testid="button-share">
                  <Share2 className="w-5 h-5 text-[#CD9342]" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {design.gallery.map((img, index) => (
                <button
                  key={index}
                  className={`relative rounded-lg overflow-hidden aspect-square ${
                    index === 0 ? "ring-2 ring-[#CD9342]" : ""
                  }`}
                  data-testid={`button-gallery-${index}`}
                >
                  <img loading="lazy" 
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Design Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-[#CD9342]/10 text-[#CD9342] text-sm font-medium rounded-full mb-4">
              {design.categoryLabel}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 font-serif leading-tight">
              {design.title}
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {design.description}
            </p>

            {/* Specifications */}
            <div className="bg-muted/30 rounded-xl p-6 mb-8">
              <h3 className="font-bold mb-4">Design Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {design.specifications.map((spec, index) => (
                  <div key={index}>
                    <span className="text-sm text-muted-foreground">{spec.label}</span>
                    <p className="font-medium">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-bold mb-4">Key Features</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {design.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#CD9342] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-[#CD9342] hover:bg-[#A67A2E] text-white rounded-full px-8 flex-1 sm:flex-none"
                data-testid="button-book-consultation"
              >
                <Link href="/contact">
                  <Calendar className="mr-2 w-5 h-5" />
                  Book Consultation
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-[#CD9342] text-[#CD9342] hover:bg-[#CD9342] hover:text-white rounded-full px-8 flex-1 sm:flex-none"
                data-testid="button-call-now"
              >
                <a href="tel:+971585707110">
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now
                </a>
              </Button>
              <Button 
                variant="outline"
                size="icon"
                className="rounded-full"
                data-testid="button-download"
              >
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Related Designs */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-serif">Related Designs</h2>
            <Button 
              asChild
              variant="outline"
              className="rounded-full border-[#CD9342] text-[#CD9342] hover:bg-[#CD9342] hover:text-white"
              data-testid="button-view-all-related"
            >
              <Link href="/interior-design">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {design.relatedDesigns.map((related) => (
              <motion.div
                key={related.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Link href={`/interior-design/${related.slug}`} data-testid={`link-related-${related.id}`}>
                  <Card className="group overflow-hidden border-0 shadow-md hover-elevate cursor-pointer" data-testid={`card-related-${related.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img loading="lazy" 
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 bg-[#CD9342] rounded-full flex items-center justify-center">
                          <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold line-clamp-2 group-hover:text-[#CD9342] transition-colors">
                        {related.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#CD9342] to-[#A67A2E] mt-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
            Love This Design?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Let our experts customize this design to perfectly fit your space and style.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              asChild
              size="lg"
              className="bg-white text-[#CD9342] hover:bg-white/90 rounded-full px-8"
              data-testid="button-get-quote"
            >
              <Link href="/contact">
                Get a Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-white/50 text-white hover:bg-white/10 rounded-full px-8"
              data-testid="button-browse-more"
            >
              <Link href="/interior-design">
                <ArrowLeft className="mr-2 w-5 h-5" />
                Browse More Designs
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
