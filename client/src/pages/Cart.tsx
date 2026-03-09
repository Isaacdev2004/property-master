import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, Truck, Shield, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { getSessionId } from "@/lib/cart";
import type { CartItem, Product } from "@shared/schema";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
};

type CartItemWithProduct = CartItem & {
  product: Product;
};

export default function Cart() {
  const sessionId = getSessionId();

  const { data: cartItems = [], isLoading } = useQuery<CartItem[]>({
    queryKey: ["/api/cart", sessionId],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      return apiRequest("PATCH", `/api/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/cart/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  const cartItemsWithProducts: CartItemWithProduct[] = cartItems
    .map(item => {
      const product = products.find(p => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((item): item is CartItemWithProduct => item !== null);

  const subtotal = cartItemsWithProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F4EB]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#970A44] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#09263D]/60">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cartItemsWithProducts.length === 0) {
    return (
      <div className="min-h-screen bg-[#F6F4EB]">
        <div className="max-w-4xl mx-auto px-6 py-32">
          <motion.div {...fadeInUp} className="text-center">
            <div className="w-24 h-24 bg-[#970A44]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-[#970A44]" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-[#09263D] font-serif">Your Cart is Empty</h1>
            <p className="text-[#09263D]/60 mb-8 text-lg">
              Discover our curated collection of luxury custom furniture.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full"
              data-testid="button-continue-shopping"
            >
              <Link href="/shop">
                Browse Custom Furniture
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F4EB]">
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <nav className="flex items-center gap-2 text-sm text-[#09263D]/60 mb-6">
              <Link href="/" className="hover:text-[#970A44] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-[#970A44] transition-colors">Custom Furniture</Link>
              <span>/</span>
              <span className="text-[#09263D]">Cart</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-[#09263D] font-serif">
              Shopping Cart
              <span className="text-lg font-normal text-[#09263D]/60 ml-3">
                ({cartItemsWithProducts.length} {cartItemsWithProducts.length === 1 ? 'item' : 'items'})
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItemsWithProducts.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-6">
                      <div className="flex gap-5">
                        <Link href={`/shop/${item.product.id}`} className="flex-shrink-0">
                          <div className="w-28 h-28 bg-[#F6F4EB] rounded-xl overflow-hidden">
                            <img loading="lazy" 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <Link href={`/shop/${item.product.id}`}>
                                <h3 className="font-bold text-[#09263D] hover:text-[#970A44] transition-colors line-clamp-1">
                                  {item.product.name}
                                </h3>
                              </Link>
                              <p className="text-sm text-[#09263D]/60 mt-1">{item.product.category}</p>
                              {item.product.sku && (
                                <p className="text-xs text-[#09263D]/40 mt-0.5">SKU: {item.product.sku}</p>
                              )}
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-[#09263D]/40 hover:text-red-500 flex-shrink-0"
                              onClick={() => removeItemMutation.mutate(item.id)}
                              disabled={removeItemMutation.isPending}
                              data-testid={`button-remove-${item.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                            <div className="flex items-center border border-[#09263D]/15 rounded-full">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-full h-8 w-8"
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    updateQuantityMutation.mutate({ id: item.id, quantity: item.quantity - 1 });
                                  }
                                }}
                                disabled={updateQuantityMutation.isPending}
                                data-testid={`button-decrease-${item.id}`}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-10 text-center font-semibold text-[#09263D] text-sm">{item.quantity}</span>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-full h-8 w-8"
                                onClick={() => updateQuantityMutation.mutate({ id: item.id, quantity: item.quantity + 1 })}
                                disabled={updateQuantityMutation.isPending}
                                data-testid={`button-increase-${item.id}`}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <motion.div {...fadeInUp}>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#970A44]/20 text-[#970A44] rounded-full"
                >
                  <Link href="/shop">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div {...fadeInUp}>
                <Card className="sticky top-24 border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-[#09263D] mb-6 font-serif">Inquiry Summary</h2>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#09263D]/60">Items ({cartItemsWithProducts.length})</span>
                        <span className="font-medium text-[#09263D]">Quote on request</span>
                      </div>
                    </div>
                    
                    <Separator className="my-4 bg-[#09263D]/10" />
                    
                    <Button 
                      className="w-full mb-3 bg-[#970A44] hover:bg-[#720632] text-white rounded-full py-6" 
                      size="lg" 
                      data-testid="button-checkout"
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    
                    <a
                      href={`https://wa.me/971585707110?text=${encodeURIComponent(`Hi, I'd like to get a quote for ${cartItemsWithProducts.length} item(s): ${cartItemsWithProducts.map(i => i.product.name).join(', ')}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button 
                        variant="outline" 
                        className="w-full border-green-600 text-green-700 hover:bg-green-50 rounded-full"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Order via WhatsApp
                      </Button>
                    </a>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-[#09263D]/60">
                        <Truck className="w-4 h-4 text-[#970A44]" />
                        <span>Free delivery across UAE</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#09263D]/60">
                        <Shield className="w-4 h-4 text-[#970A44]" />
                        <span>Secure checkout with SSL encryption</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
