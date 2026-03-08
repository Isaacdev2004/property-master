import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adminFetch } from "@/contexts/AdminContext";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, GripVertical, Eye, EyeOff, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { MaintenancePackage } from "@shared/schema";

export default function AdminMaintenancePackages() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<MaintenancePackage | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    period: "/YEAR",
    subtitle: "",
    features: [""],
    popular: false,
    isCustom: false,
    isActive: true,
    sortOrder: 1,
  });

  const { data: packages = [], isLoading } = useQuery<MaintenancePackage[]>({
    queryKey: ["/api/admin/maintenance-packages"],
    queryFn: () => adminFetch("/api/admin/maintenance-packages").then(r => r.json()),
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await adminFetch("/api/admin/maintenance-packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create package");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/maintenance-packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/maintenance-packages"] });
      setDialogOpen(false);
      resetForm();
      toast({ title: "Package created successfully" });
    },
    onError: () => toast({ title: "Failed to create package", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<typeof formData> }) => {
      const res = await adminFetch(`/api/admin/maintenance-packages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update package");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/maintenance-packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/maintenance-packages"] });
      setDialogOpen(false);
      resetForm();
      toast({ title: "Package updated successfully" });
    },
    onError: () => toast({ title: "Failed to update package", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/maintenance-packages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete package");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/maintenance-packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/maintenance-packages"] });
      toast({ title: "Package deleted successfully" });
    },
    onError: () => toast({ title: "Failed to delete package", variant: "destructive" }),
  });

  const toggleVisibilityMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const res = await adminFetch(`/api/admin/maintenance-packages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });
      if (!res.ok) throw new Error("Failed to toggle visibility");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/maintenance-packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/maintenance-packages"] });
      toast({ title: "Visibility updated" });
    },
  });

  function resetForm() {
    setEditingPackage(null);
    setFormData({
      title: "",
      price: "",
      period: "/YEAR",
      subtitle: "",
      features: [""],
      popular: false,
      isCustom: false,
      isActive: true,
      sortOrder: packages.length + 1,
    });
  }

  function openCreateDialog() {
    resetForm();
    setFormData(prev => ({ ...prev, sortOrder: packages.length + 1 }));
    setDialogOpen(true);
  }

  function openEditDialog(pkg: MaintenancePackage) {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      price: pkg.price,
      period: pkg.period,
      subtitle: pkg.subtitle || "",
      features: pkg.features.length > 0 ? [...pkg.features] : [""],
      popular: pkg.popular,
      isCustom: pkg.isCustom,
      isActive: pkg.isActive,
      sortOrder: pkg.sortOrder,
    });
    setDialogOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanedFeatures = formData.features.filter(f => f.trim() !== "");
    const submitData = { ...formData, features: cleanedFeatures };

    if (editingPackage) {
      updateMutation.mutate({ id: editingPackage.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  }

  function addFeature() {
    setFormData(prev => ({ ...prev, features: [...prev.features, ""] }));
  }

  function removeFeature(index: number) {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  }

  function updateFeature(index: number, value: string) {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => (i === index ? value : f)),
    }));
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#970A44]" />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="admin-maintenance-packages">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#09263D]" data-testid="text-page-title">Maintenance Packages</h1>
          <p className="text-muted-foreground mt-1">
            Manage pricing packages displayed on the Maintenance Services page
          </p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="bg-[#970A44] hover:bg-[#720632] text-white"
          data-testid="button-add-package"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Package
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`relative ${!pkg.isActive ? "opacity-60" : ""}`}
            data-testid={`card-admin-package-${pkg.id}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-lg">{pkg.title}</CardTitle>
                  {pkg.popular && (
                    <Badge className="bg-[#970A44] text-white text-xs">Popular</Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleVisibilityMutation.mutate({ id: pkg.id, isActive: !pkg.isActive })}
                    data-testid={`button-toggle-visibility-${pkg.id}`}
                  >
                    {pkg.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => openEditDialog(pkg)}
                    data-testid={`button-edit-package-${pkg.id}`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this package?")) {
                        deleteMutation.mutate(pkg.id);
                      }
                    }}
                    data-testid={`button-delete-package-${pkg.id}`}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                {pkg.isCustom ? (
                  <p className="text-sm text-muted-foreground">{pkg.subtitle}</p>
                ) : (
                  <p className="text-xl font-bold text-[#970A44]">
                    {pkg.price}<span className="text-sm font-normal text-muted-foreground">{pkg.period}</span>
                  </p>
                )}
              </div>
              <ul className="space-y-1">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-3 h-3 text-[#970A44] flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between gap-2">
                <Badge variant="outline" className="text-xs">
                  Order: {pkg.sortOrder}
                </Badge>
                <Badge variant={pkg.isActive ? "default" : "secondary"} className={`text-xs ${pkg.isActive ? "bg-green-600" : ""}`}>
                  {pkg.isActive ? "Visible" : "Hidden"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {packages.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No maintenance packages yet</p>
            <Button onClick={openCreateDialog} className="bg-[#970A44] hover:bg-[#720632] text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Your First Package
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle data-testid="text-dialog-title">
              {editingPackage ? "Edit Package" : "Add New Package"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Package Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Basic, Standard, Executive"
                required
                data-testid="input-package-title"
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={formData.isCustom}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isCustom: checked }))}
                data-testid="switch-is-custom"
              />
              <Label>Custom pricing package (no fixed price)</Label>
            </div>

            {formData.isCustom ? (
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="e.g., Customize your package"
                  data-testid="input-package-subtitle"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="e.g., AED 1458"
                    required
                    data-testid="input-package-price"
                  />
                </div>
                <div>
                  <Label htmlFor="period">Period</Label>
                  <Input
                    id="period"
                    value={formData.period}
                    onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                    placeholder="e.g., /YEAR"
                    data-testid="input-package-period"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Features</Label>
                <Button type="button" variant="outline" size="sm" onClick={addFeature} data-testid="button-add-feature">
                  <Plus className="w-3 h-3 mr-1" /> Add
                </Button>
              </div>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                      data-testid={`input-feature-${index}`}
                    />
                    {formData.features.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFeature(index)}
                        data-testid={`button-remove-feature-${index}`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.popular}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, popular: checked }))}
                  data-testid="switch-popular"
                />
                <Label>Mark as Popular</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  data-testid="switch-active"
                />
                <Label>Visible on site</Label>
              </div>
            </div>

            <div>
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                type="number"
                min={1}
                value={formData.sortOrder}
                onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 1 }))}
                data-testid="input-sort-order"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} data-testid="button-cancel">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#970A44] hover:bg-[#720632] text-white"
                disabled={createMutation.isPending || updateMutation.isPending}
                data-testid="button-save-package"
              >
                {createMutation.isPending || updateMutation.isPending ? "Saving..." : editingPackage ? "Update Package" : "Create Package"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
