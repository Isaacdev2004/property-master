import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adminFetch } from "@/contexts/AdminContext";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, MapPin, FileText, Code, HelpCircle, Search, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { LocationPage, Service } from "@shared/schema";

interface FAQ {
  question: string;
  answer: string;
}

const dubaiLocations = [
  "Dubai Marina",
  "Downtown Dubai",
  "Business Bay",
  "JBR - Jumeirah Beach Residence",
  "Palm Jumeirah",
  "DIFC",
  "Jumeirah",
  "Al Barsha",
  "Silicon Oasis",
  "Sports City",
  "Motor City",
  "Arabian Ranches",
  "Mirdif",
  "Al Nahda",
  "Deira",
  "Bur Dubai",
  "JLT - Jumeirah Lake Towers",
  "Discovery Gardens",
  "International City",
  "Dubai Hills",
];

export default function AdminLocationPages() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<LocationPage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    location: "",
    slug: "",
    serviceId: "",
    h1: "",
    h2: "",
    heroImage: "",
    description: "",
    content: "",
    localInfo: "",
    faqs: [] as FAQ[],
    schema: "",
    metaTitle: "",
    metaDescription: "",
    isActive: true,
  });

  const { data: locationPages = [], isLoading } = useQuery<LocationPage[]>({
    queryKey: ["/api/admin/location-pages"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/location-pages");
      return res.json();
    },
  });

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/admin/services"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/services");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await adminFetch("/api/admin/location-pages", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create location page");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/location-pages"] });
      toast({ title: "Success", description: "Location page created successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create location page", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await adminFetch(`/api/admin/location-pages/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update location page");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/location-pages"] });
      toast({ title: "Success", description: "Location page updated successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update location page", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/location-pages/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete location page");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/location-pages"] });
      toast({ title: "Success", description: "Location page deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete location page", variant: "destructive" });
    },
  });

  const toggleActive = (page: LocationPage) => {
    updateMutation.mutate({ id: page.id, data: { isActive: !page.isActive } });
  };

  const resetForm = () => {
    setFormData({
      location: "",
      slug: "",
      serviceId: "",
      h1: "",
      h2: "",
      heroImage: "",
      description: "",
      content: "",
      localInfo: "",
      faqs: [],
      schema: "",
      metaTitle: "",
      metaDescription: "",
      isActive: true,
    });
    setEditingPage(null);
  };

  const handleEdit = (page: LocationPage) => {
    setEditingPage(page);
    setFormData({
      location: page.location,
      slug: page.slug,
      serviceId: page.serviceId || "",
      h1: page.h1,
      h2: page.h2 || "",
      heroImage: page.heroImage || "",
      description: page.description,
      content: page.content,
      localInfo: page.localInfo || "",
      faqs: page.faqs || [],
      schema: page.schema || "",
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      isActive: page.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleLocationSelect = (location: string) => {
    const slug = location.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    setFormData({
      ...formData,
      location,
      slug,
      h1: `Professional Services in ${location}`,
      metaTitle: `Premium Property Services in ${location} | The Property Masters`,
      metaDescription: `Expert interior design, wellness, and maintenance services in ${location}, Dubai. Contact The Property Masters for premium property solutions.`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPage) {
      updateMutation.mutate({ id: editingPage.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const addFaq = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: "", answer: "" }],
    });
  };

  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setFormData({ ...formData, faqs: newFaqs });
  };

  const removeFaq = (index: number) => {
    setFormData({
      ...formData,
      faqs: formData.faqs.filter((_, i) => i !== index),
    });
  };

  const generateLocalBusinessSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `The Property Masters - ${formData.location}`,
      "description": formData.description,
      "url": `https://thepropertymasters.ae/location/${formData.slug}`,
      "telephone": "+971 58 570 7110",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": formData.location,
        "addressRegion": "Dubai",
        "addressCountry": "AE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "25.2048",
        "longitude": "55.2708"
      },
      "areaServed": {
        "@type": "City",
        "name": formData.location
      }
    };
    setFormData({ ...formData, schema: JSON.stringify(schema, null, 2) });
  };

  const filteredPages = locationPages.filter(page =>
    page.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-6">Loading location pages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#09263D]">Location Pages</h1>
          <p className="text-gray-600">Create location-based service pages for Local SEO</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#970A44]" onClick={resetForm} data-testid="button-add-location">
              <Plus className="w-4 h-4 mr-2" />
              Add Location Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPage ? "Edit Location Page" : "Add Location Page"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!editingPage && (
                <div className="space-y-2">
                  <Label>Quick Select Dubai Location</Label>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border rounded-lg">
                    {dubaiLocations.map((location) => (
                      <Button
                        key={location}
                        type="button"
                        variant={formData.location === location ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleLocationSelect(location)}
                        className={formData.location === location ? "bg-[#970A44]" : ""}
                      >
                        {location}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic" className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Basic Info
                  </TabsTrigger>
                  <TabsTrigger value="content" className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="faqs" className="flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" />
                    FAQs
                  </TabsTrigger>
                  <TabsTrigger value="seo" className="flex items-center gap-1">
                    <Code className="w-3 h-3" />
                    SEO
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location Name</Label>
                      <Input
                        id="location"
                        data-testid="input-location"
                        value={formData.location}
                        onChange={(e) => {
                          const location = e.target.value;
                          const slug = location.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
                          setFormData({ ...formData, location, slug });
                        }}
                        placeholder="e.g., Dubai Marina"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">URL Slug</Label>
                      <Input
                        id="slug"
                        data-testid="input-slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="dubai-marina"
                        required
                      />
                      <p className="text-xs text-gray-500">/location/{formData.slug || "slug"}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="h1">H1 Heading</Label>
                    <Input
                      id="h1"
                      data-testid="input-h1"
                      value={formData.h1}
                      onChange={(e) => setFormData({ ...formData, h1: e.target.value })}
                      placeholder="Professional Services in Dubai Marina"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="h2">H2 Heading (optional)</Label>
                    <Input
                      id="h2"
                      data-testid="input-h2"
                      value={formData.h2}
                      onChange={(e) => setFormData({ ...formData, h2: e.target.value })}
                      placeholder="Your Trusted Property Partner"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heroImage">Hero Image URL</Label>
                    <Input
                      id="heroImage"
                      data-testid="input-hero"
                      value={formData.heroImage}
                      onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                      data-testid="switch-active"
                    />
                    <Label htmlFor="isActive">Page is Active</Label>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea
                      id="description"
                      data-testid="textarea-description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description for this location page..."
                      rows={2}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Main Content</Label>
                    <Textarea
                      id="content"
                      data-testid="textarea-content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Detailed content about services in this location..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="localInfo">Local Information</Label>
                    <Textarea
                      id="localInfo"
                      data-testid="textarea-local-info"
                      value={formData.localInfo}
                      onChange={(e) => setFormData({ ...formData, localInfo: e.target.value })}
                      placeholder="Information specific to this area (nearby landmarks, service coverage, etc.)"
                      rows={4}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="faqs" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <Label>Location-Specific FAQs</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addFaq} data-testid="button-add-faq">
                      <Plus className="w-4 h-4 mr-1" />
                      Add FAQ
                    </Button>
                  </div>
                  {formData.faqs.map((faq, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <Label>FAQ #{index + 1}</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFaq(index)}
                            className="text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <Input
                          placeholder="Question"
                          value={faq.question}
                          onChange={(e) => updateFaq(index, "question", e.target.value)}
                          data-testid={`input-faq-question-${index}`}
                        />
                        <Textarea
                          placeholder="Answer"
                          value={faq.answer}
                          onChange={(e) => updateFaq(index, "answer", e.target.value)}
                          rows={2}
                          data-testid={`textarea-faq-answer-${index}`}
                        />
                      </CardContent>
                    </Card>
                  ))}
                  {formData.faqs.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No FAQs added yet.</p>
                  )}
                </TabsContent>

                <TabsContent value="seo" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      data-testid="input-meta-title"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      placeholder="SEO Title | The Property Masters"
                      required
                    />
                    <p className="text-xs text-gray-500">{formData.metaTitle.length}/60 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      data-testid="textarea-meta-description"
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      placeholder="SEO description for search results..."
                      rows={2}
                      required
                    />
                    <p className="text-xs text-gray-500">{formData.metaDescription.length}/160 characters</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="schema">LocalBusiness Schema (JSON-LD)</Label>
                      <Button type="button" variant="outline" size="sm" onClick={generateLocalBusinessSchema}>
                        Generate Schema
                      </Button>
                    </div>
                    <Textarea
                      id="schema"
                      data-testid="textarea-schema"
                      value={formData.schema}
                      onChange={(e) => setFormData({ ...formData, schema: e.target.value })}
                      placeholder="JSON-LD schema markup..."
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#970A44]"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-location"
                >
                  {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Page"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
          data-testid="input-search"
        />
      </div>

      <div className="grid gap-4">
        {filteredPages.map((page) => (
          <Card key={page.id} className={!page.isActive ? "opacity-60" : ""} data-testid={`card-location-${page.id}`}>
            <CardHeader className="flex flex-row items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${page.isActive ? "bg-[#970A44]/10" : "bg-gray-100"}`}>
                  <MapPin className={`w-5 h-5 ${page.isActive ? "text-[#970A44]" : "text-gray-400"}`} />
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {page.location}
                    {page.isActive ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </CardTitle>
                  <CardDescription>/location/{page.slug}</CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Switch
                  checked={page.isActive}
                  onCheckedChange={() => toggleActive(page)}
                  data-testid={`switch-active-${page.id}`}
                />
                <Button variant="outline" size="sm" onClick={() => handleEdit(page)} data-testid={`button-edit-${page.id}`}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMutation.mutate(page.id)}
                  className="text-red-500"
                  data-testid={`button-delete-${page.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-2">{page.description}</p>
              <div className="flex flex-wrap gap-2 mt-3 text-sm">
                {page.faqs && page.faqs.length > 0 && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{page.faqs.length} FAQs</span>
                )}
                {page.schema && <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Schema</span>}
                {page.heroImage && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Has Hero</span>}
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredPages.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              {searchTerm ? "No location pages match your search." : "No location pages created yet. Click \"Add Location Page\" to get started."}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
