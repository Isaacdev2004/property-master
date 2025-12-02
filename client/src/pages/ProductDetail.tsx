import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { 
  ShoppingCart, 
  Star, 
  ArrowLeft,
  ArrowRight,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Package,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Check,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { getSessionId } from "@/lib/cart";
import type { Product } from "@shared/schema";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
};

// Benefits
const benefits = [
  { icon: Truck, title: "Free Delivery", description: "On orders above AED 500" },
  { icon: Shield, title: "2 Year Warranty", description: "On all furniture" },
  { icon: RotateCcw, title: "30-Day Returns", description: "Easy return policy" },
  { icon: Package, title: "Premium Quality", description: "Handcrafted furniture" },
];

// Additional product images (mock for gallery)
const getGalleryImages = (mainImage: string) => [
  mainImage,
  mainImage.replace('w=800', 'w=801'),
  mainImage.replace('w=800', 'w=802'),
  mainImage.replace('w=800', 'w=803'),
];

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const sessionId = getSessionId();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    queryFn: async () => {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) throw new Error("Product not found");
      return response.json();
    },
    enabled: !!productId,
  });

  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, qty }: { productId: string; qty: number }) => {
      return apiRequest("POST", "/api/cart", {
        productId,
        quantity: qty,
        sessionId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
      toast({
        title: "Added to cart",
        description: `${quantity} x ${product?.name} has been added to your cart.`,
      });
    },
  });

  const relatedProducts = allProducts
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const galleryImages = product ? getGalleryImages(product.image) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F4EB]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#970A44] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#09263D]/60">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F4EB]">
        <div className="text-center">
          <Package className="w-16 h-16 text-[#09263D]/20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#09263D] mb-4">Product Not Found</h1>
          <p className="text-[#09263D]/60 mb-8">The product you're looking for doesn't exist.</p>
          <Button asChild className="bg-[#970A44] hover:bg-[#720632] rounded-full">
            <Link href="/shop">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Shop
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const originalPrice = product.discount 
    ? Math.round(product.price / (1 - product.discount / 100)) 
    : null;

  return (
    <div className="min-h-screen bg-[#F6F4EB]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-[#09263D]/60">
            <Link href="/" className="hover:text-[#970A44] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#970A44] transition-colors">Shop</Link>
            <span>/</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-[#970A44] transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[#09263D]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F6F4EB] mb-4">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={galleryImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.featured && (
                    <Badge className="bg-[#970A44] text-white">Featured</Badge>
                  )}
                  {product.discount && product.discount > 0 && (
                    <Badge className="bg-[#09263D] text-white">{product.discount}% Off</Badge>
                  )}
                </div>

                {/* Navigation Arrows */}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-lg"
                  onClick={() => setSelectedImage(prev => prev === 0 ? galleryImages.length - 1 : prev - 1)}
                  data-testid="button-prev-image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-lg"
                  onClick={() => setSelectedImage(prev => prev === galleryImages.length - 1 ? 0 : prev + 1)}
                  data-testid="button-next-image"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-[#970A44]' 
                        : 'border-transparent hover:border-[#970A44]/30'
                    }`}
                    data-testid={`thumbnail-${index}`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Badge variant="secondary" className="mb-4 bg-[#F6F4EB] text-[#09263D]">
                {product.category}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl font-bold text-[#09263D] mb-4 font-serif" data-testid="text-product-name">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#970A44] text-[#970A44]" />
                  ))}
                </div>
                <span className="text-[#09263D]/60">(4.9) · 128 Reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-[#970A44]" data-testid="text-price">
                  AED {product.price.toLocaleString()}
                </span>
                {originalPrice && (
                  <span className="text-xl text-[#09263D]/40 line-through">
                    AED {originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discount && product.discount > 0 && (
                  <Badge className="bg-green-500 text-white">Save {product.discount}%</Badge>
                )}
              </div>

              <p className="text-[#09263D]/70 text-lg mb-8 leading-relaxed" data-testid="text-description">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-8">
                {product.inStock ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-green-600 font-medium">In Stock</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-6 mb-8">
                <span className="text-[#09263D] font-medium">Quantity:</span>
                <div className="flex items-center border border-[#09263D]/20 rounded-full">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    data-testid="button-decrease-qty"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold" data-testid="text-quantity">{quantity}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                    onClick={() => setQuantity(q => q + 1)}
                    data-testid="button-increase-qty"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  size="lg"
                  className="flex-1 bg-[#970A44] hover:bg-[#720632] text-white rounded-full py-6 text-lg"
                  disabled={!product.inStock || addToCartMutation.isPending}
                  onClick={() => addToCartMutation.mutate({ productId: product.id, qty: quantity })}
                  data-testid="button-add-to-cart"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`rounded-full px-6 py-6 ${
                    isWishlisted 
                      ? 'border-[#970A44] text-[#970A44]' 
                      : 'border-[#09263D]/20 text-[#09263D]'
                  }`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  data-testid="button-wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#970A44]' : ''}`} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6 py-6 border-[#09263D]/20 text-[#09263D]"
                  data-testid="button-share"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-center gap-3 p-3 bg-[#F6F4EB] rounded-xl">
                    <div className="w-10 h-10 bg-[#970A44]/10 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-[#970A44]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#09263D] text-sm">{benefit.title}</p>
                      <p className="text-[#09263D]/60 text-xs">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-16 bg-[#F6F4EB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl font-bold text-[#09263D] mb-8 font-serif">Product Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Premium quality materials",
                "Handcrafted by skilled artisans",
                "Modern and elegant design",
                "Easy to clean and maintain",
                "Durable construction",
                "Eco-friendly production",
                "Customization available",
                "Complimentary assembly"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl">
                  <div className="w-6 h-6 bg-[#970A44]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#970A44]" />
                  </div>
                  <span className="text-[#09263D]">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div {...fadeInUp} className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#09263D] font-serif">You May Also Like</h2>
              <Button 
                variant="outline" 
                className="border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white rounded-full"
                asChild
              >
                <Link href="/shop">
                  View All
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {relatedProducts.map((relatedProduct) => (
                <motion.div key={relatedProduct.id} variants={staggerItem}>
                  <Link href={`/shop/${relatedProduct.id}`}>
                    <Card className="group h-full border-0 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer" data-testid={`related-product-${relatedProduct.id}`}>
                      <CardContent className="p-0">
                        <div className="relative aspect-square overflow-hidden bg-[#F6F4EB]">
                          <img
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          {relatedProduct.discount && relatedProduct.discount > 0 && (
                            <Badge className="absolute top-3 left-3 bg-[#970A44] text-white">
                              {relatedProduct.discount}% Off
                            </Badge>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-[#09263D] mb-1 line-clamp-1">{relatedProduct.name}</h3>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-[#970A44] text-[#970A44]" />
                            ))}
                          </div>
                          <p className="text-lg font-bold text-[#970A44]">
                            AED {relatedProduct.price.toLocaleString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#970A44] to-[#720632]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <Sparkles className="w-12 h-12 text-white/80 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-serif">
              Need Help Choosing?
            </h2>
            <p className="text-white/80 mb-6">
              Our interior design experts can help you find the perfect pieces for your space.
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-white text-[#970A44] hover:bg-white/90 rounded-full"
            >
              <Link href="/book">
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
