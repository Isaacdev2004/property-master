import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adminFetch } from "@/contexts/AdminContext";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Edit, Trash2, Search, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Service } from "@shared/schema";

const categories = [
  { value: "interior-design-fitout", label: "Interior Design & Fit-Out" },
  { value: "wellness-services", label: "Wellness Services" },
  { value: "maintenance-services", label: "Maintenance Services" },
];

export default function AdminServices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    icon: "Wrench",
    features: [""],
    category: "interior-design-fitout" as "interior-design-fitout" | "wellness-services" | "maintenance-services",
    subcategory: "",
  });

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/admin/services"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/services");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await adminFetch("/api/admin/services", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create service");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({ title: "Success", description: "Service created successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create service", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await adminFetch(`/api/admin/services/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update service");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({ title: "Success", description: "Service updated successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update service", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete service");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] });
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({ title: "Success", description: "Service deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete service", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      icon: "Wrench",
      features: [""],
      category: "interior-design-fitout",
      subcategory: "",
    });
    setEditingService(null);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      description: service.description,
      icon: service.icon,
      features: service.features.length > 0 ? service.features : [""],
      category: service.category,
      subcategory: service.subcategory || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedFeatures = formData.features.filter(f => f.trim() !== "");
    const submitData = {
      ...formData,
      features: cleanedFeatures,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
    };

    if (editingService) {
      updateMutation.mutate({ id: editingService.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures.length > 0 ? newFeatures : [""] });
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryLabel = (value: string) => {
    return categories.find(c => c.value === value)?.label || value;
  };

  if (isLoading) {
    return <div className="p-6">Loading services...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#09263D]">Services Management</h1>
          <p className="text-gray-600">Create and manage service pages for your website</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-service" className="bg-[#970A44] hover:bg-[#720632]">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Service Title</Label>
                  <Input
                    id="title"
                    data-testid="input-service-title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., AC Cleaning"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    data-testid="input-service-slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g., ac-cleaning"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: "interior-design-fitout" | "wellness-services" | "maintenance-services") => 
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger data-testid="select-service-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subcategory">Subcategory (Optional)</Label>
                  <Input
                    id="subcategory"
                    data-testid="input-service-subcategory"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    placeholder="e.g., AC Services"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon Name (Lucide Icons)</Label>
                <Input
                  id="icon"
                  data-testid="input-service-icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., Wrench, Home, Sparkles"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  data-testid="input-service-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the service..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Features</Label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                      data-testid={`input-feature-${index}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeFeature(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addFeature} className="w-full">
                  <Plus className="w-4 h-4 mr-2" /> Add Feature
                </Button>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  data-testid="button-save-service"
                  className="bg-[#970A44] hover:bg-[#720632]"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending ? "Saving..." : editingService ? "Update Service" : "Create Service"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          data-testid="input-search-services"
        />
      </div>

      <div className="grid gap-4">
        {filteredServices.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              <Layers className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No services found. Create your first service page!</p>
            </CardContent>
          </Card>
        ) : (
          filteredServices.map((service) => (
            <Card key={service.id} data-testid={`card-service-${service.id}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-[#09263D]">{service.title}</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-[#F6F4EB] text-[#970A44]">
                        {getCategoryLabel(service.category)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-xs bg-gray-100 rounded">
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 3 && (
                        <span className="px-2 py-0.5 text-xs bg-gray-100 rounded">
                          +{service.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(service)}
                      data-testid={`button-edit-service-${service.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this service?")) {
                          deleteMutation.mutate(service.id);
                        }
                      }}
                      data-testid={`button-delete-service-${service.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
