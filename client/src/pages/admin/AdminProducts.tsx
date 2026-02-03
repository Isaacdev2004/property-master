import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adminFetch } from "@/contexts/AdminContext";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { Product } from "@shared/schema";

const categories = [
  "Sofas",
  "Beds",
  "Tables",
  "Chairs",
  "Lighting",
  "Clocks",
  "Kitchen",
  "Decor",
  "Storage",
  "Outdoor"
];

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    inStock: true,
    featured: false,
    discount: 0,
  });

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/admin/products"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/products");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await adminFetch("/api/admin/products", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create product");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Success", description: "Product created successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create product", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await adminFetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update product");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Success", description: "Product updated successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update product", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({ title: "Success", description: "Product deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete product", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
      inStock: true,
      featured: false,
      discount: 0,
    });
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      inStock: product.inStock,
      featured: product.featured,
      discount: product.discount || 0,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      discount: formData.discount || undefined,
    };

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data: productData });
    } else {
      createMutation.mutate(productData);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Manage your shop products</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-[#970A44] hover:bg-[#720632]" data-testid="button-add-product">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Create New Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  data-testid="input-name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (AED)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
                    data-testid="input-price"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) || 0 })}
                    data-testid="input-discount"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger data-testid="select-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <ImageUpload
                label="Product Image"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                placeholder="Upload or enter image URL"
              />
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                  data-testid="input-description"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    data-testid="checkbox-instock"
                  />
                  <Label htmlFor="inStock">In Stock</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    data-testid="checkbox-featured"
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#970A44] hover:bg-[#720632]"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-submit-product"
                >
                  {editingProduct ? "Update" : "Create"} Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          data-testid="input-search"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-8 text-center text-gray-500">
              No products found
            </CardContent>
          </Card>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} data-testid={`product-card-${product.id}`}>
              <CardContent className="p-4">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                )}
                <h3 className="font-semibold truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="font-bold text-[#970A44]">AED {product.price}</span>
                    {product.discount && product.discount > 0 && (
                      <span className="ml-2 text-xs text-green-600">-{product.discount}%</span>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEdit(product)}
                    data-testid={`button-edit-${product.id}`}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this product?")) {
                        deleteMutation.mutate(product.id);
                      }
                    }}
                    data-testid={`button-delete-${product.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
