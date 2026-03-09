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
import { Plus, Edit, Trash2, Search, Globe, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { SeoSettings } from "@shared/schema";

const defaultPages = [
  { path: "/", title: "Homepage" },
  { path: "/about", title: "About Us" },
  { path: "/services", title: "Services" },
  { path: "/services/interior-design-fitout", title: "Interior Design" },
  { path: "/services/wellness", title: "Wellness Services" },
  { path: "/services/maintenance", title: "Maintenance Services" },
  { path: "/shop", title: "Shop" },
  { path: "/portfolio", title: "Portfolio" },
  { path: "/blog", title: "Blog" },
  { path: "/contact", title: "Contact" },
  { path: "/book", title: "Book a Service" },
];

export default function AdminSEO() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSettings, setEditingSettings] = useState<SeoSettings | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    pagePath: "",
    pageTitle: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
  });

  const { data: seoSettings = [], isLoading } = useQuery<SeoSettings[]>({
    queryKey: ["/api/admin/seo"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/seo");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await adminFetch("/api/admin/seo", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create SEO settings");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo"] });
      toast({ title: "Success", description: "SEO settings created successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create SEO settings", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await adminFetch(`/api/admin/seo/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update SEO settings");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo"] });
      toast({ title: "Success", description: "SEO settings updated successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update SEO settings", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/seo/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete SEO settings");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo"] });
      toast({ title: "Success", description: "SEO settings deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete SEO settings", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      pagePath: "",
      pageTitle: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
    });
    setEditingSettings(null);
  };

  const handleEdit = (settings: SeoSettings) => {
    setEditingSettings(settings);
    setFormData({
      pagePath: settings.pagePath,
      pageTitle: settings.pageTitle,
      metaTitle: settings.metaTitle,
      metaDescription: settings.metaDescription,
      metaKeywords: settings.metaKeywords || "",
      ogTitle: settings.ogTitle || "",
      ogDescription: settings.ogDescription || "",
      ogImage: settings.ogImage || "",
    });
    setIsDialogOpen(true);
  };

  const handleQuickAdd = (page: { path: string; title: string }) => {
    setFormData({
      pagePath: page.path,
      pageTitle: page.title,
      metaTitle: `${page.title} | The Property Masters`,
      metaDescription: "",
      metaKeywords: "",
      ogTitle: page.title,
      ogDescription: "",
      ogImage: "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSettings) {
      updateMutation.mutate({ id: editingSettings.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredSettings = seoSettings.filter(s =>
    s.pagePath.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.pageTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const configuredPaths = seoSettings.map(s => s.pagePath);
  const unconfiguredPages = defaultPages.filter(p => !configuredPaths.includes(p.path));

  if (isLoading) {
    return <div className="p-6">Loading SEO settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">SEO Management</h1>
          <p className="text-gray-600">Configure meta titles, descriptions, and Open Graph settings for each page</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-seo" className="bg-[#CD9342] hover:bg-[#A67A2E]">
              <Plus className="w-4 h-4 mr-2" />
              Add SEO Settings
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSettings ? "Edit SEO Settings" : "Add SEO Settings"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pagePath">Page Path</Label>
                  <Input
                    id="pagePath"
                    data-testid="input-seo-path"
                    value={formData.pagePath}
                    onChange={(e) => setFormData({ ...formData, pagePath: e.target.value })}
                    placeholder="e.g., /about or /services/wellness"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pageTitle">Page Title (Internal)</Label>
                  <Input
                    id="pageTitle"
                    data-testid="input-seo-page-title"
                    value={formData.pageTitle}
                    onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
                    placeholder="e.g., About Us"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title (Browser Tab)</Label>
                <Input
                  id="metaTitle"
                  data-testid="input-meta-title"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="e.g., About Us | The Property Masters Dubai"
                  required
                />
                <p className="text-xs text-gray-500">{formData.metaTitle.length}/60 characters (recommended)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  data-testid="input-meta-description"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Describe the page content for search engines..."
                  rows={3}
                  required
                />
                <p className="text-xs text-gray-500">{formData.metaDescription.length}/160 characters (recommended)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Meta Keywords (Optional)</Label>
                <Input
                  id="metaKeywords"
                  data-testid="input-meta-keywords"
                  value={formData.metaKeywords}
                  onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                  placeholder="e.g., interior design, dubai, luxury"
                />
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-4">Open Graph (Social Media)</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ogTitle">OG Title</Label>
                    <Input
                      id="ogTitle"
                      data-testid="input-og-title"
                      value={formData.ogTitle}
                      onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                      placeholder="Title for social media shares"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ogDescription">OG Description</Label>
                    <Textarea
                      id="ogDescription"
                      data-testid="input-og-description"
                      value={formData.ogDescription}
                      onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                      placeholder="Description for social media shares"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ogImage">OG Image URL</Label>
                    <Input
                      id="ogImage"
                      data-testid="input-og-image"
                      value={formData.ogImage}
                      onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  data-testid="button-save-seo"
                  className="bg-[#CD9342] hover:bg-[#A67A2E]"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending ? "Saving..." : editingSettings ? "Update Settings" : "Create Settings"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {unconfiguredPages.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Pages Without SEO Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {unconfiguredPages.map((page) => (
                <Button
                  key={page.path}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAdd(page)}
                  className="text-amber-700 border-amber-300 hover:bg-amber-100"
                  data-testid={`button-quick-add-${page.path.replace(/\//g, '-')}`}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {page.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search SEO settings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          data-testid="input-search-seo"
        />
      </div>

      <div className="grid gap-4">
        {filteredSettings.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              <Globe className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No SEO settings configured yet. Add settings for your pages to improve search engine visibility!</p>
            </CardContent>
          </Card>
        ) : (
          filteredSettings.map((settings) => (
            <Card key={settings.id} data-testid={`card-seo-${settings.id}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4 text-[#CD9342]" />
                      <h3 className="font-semibold text-[#1A1A1A]">{settings.pageTitle}</h3>
                      <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600 font-mono">
                        {settings.pagePath}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">{settings.metaTitle}</p>
                    <p className="text-gray-600 text-sm line-clamp-2">{settings.metaDescription}</p>
                    {settings.metaKeywords && (
                      <p className="text-xs text-gray-400 mt-1">Keywords: {settings.metaKeywords}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(settings)}
                      data-testid={`button-edit-seo-${settings.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete these SEO settings?")) {
                          deleteMutation.mutate(settings.id);
                        }
                      }}
                      data-testid={`button-delete-seo-${settings.id}`}
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
