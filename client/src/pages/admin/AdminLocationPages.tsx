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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, MapPin, FileText, Code, HelpCircle, Search, CheckCircle, XCircle, Link2, Wrench, ListChecks, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { LocationPage, Service } from "@shared/schema";

interface FAQ {
  question: string;
  answer: string;
}

interface ProcessStep {
  title: string;
  description: string;
}

interface InternalLink {
  text: string;
  url: string;
}

const dubaiLocations = [
  "Dubai Marina", "Downtown Dubai", "Business Bay", "JBR - Jumeirah Beach Residence",
  "Palm Jumeirah", "DIFC", "Jumeirah", "Al Barsha", "Silicon Oasis", "Sports City",
  "Motor City", "Arabian Ranches", "Mirdif", "Al Nahda", "Deira", "Bur Dubai",
  "JLT - Jumeirah Lake Towers", "Discovery Gardens", "International City", "Dubai Hills",
  "Jumeirah Village Circle", "Dubai Silicon Oasis", "Al Quoz", "Al Karama",
  "Jumeirah Islands", "The Springs", "The Meadows", "Emirates Hills",
  "Dubai Investment Park", "Al Furjan", "Damac Hills", "Town Square",
  "Dubai South", "Al Warqa", "Nad Al Sheba", "Umm Suqeim",
  "Al Safa", "Al Wasl", "Oud Metha", "Dubai Creek Harbour",
  "MBR City", "Tilal Al Ghaf", "Dubai Land", "Remraam",
  "Mudon", "Villanova", "Sobha Hartland", "City Walk", "La Mer",
];

const serviceTemplates = [
  { name: "Interior Design", slug: "interior-design", category: "Interior Design & Fit-Out" },
  { name: "Villa Renovation", slug: "villa-renovation", category: "Interior Design & Fit-Out" },
  { name: "Office Fit-Out", slug: "office-fit-out", category: "Interior Design & Fit-Out" },
  { name: "Kitchen Renovation", slug: "kitchen-renovation", category: "Interior Design & Fit-Out" },
  { name: "Bathroom Renovation", slug: "bathroom-renovation", category: "Interior Design & Fit-Out" },
  { name: "Custom Furniture", slug: "custom-furniture", category: "Interior Design & Fit-Out" },
  { name: "AC Maintenance", slug: "ac-maintenance", category: "Maintenance Services" },
  { name: "AC Installation", slug: "ac-installation", category: "Maintenance Services" },
  { name: "Plumbing Services", slug: "plumbing-services", category: "Maintenance Services" },
  { name: "Electrical Services", slug: "electrical-services", category: "Maintenance Services" },
  { name: "Painting Services", slug: "painting-services", category: "Maintenance Services" },
  { name: "Deep Cleaning", slug: "deep-cleaning", category: "Maintenance Services" },
  { name: "Pest Control", slug: "pest-control", category: "Maintenance Services" },
  { name: "Swimming Pool Maintenance", slug: "pool-maintenance", category: "Maintenance Services" },
  { name: "Landscaping", slug: "landscaping", category: "Maintenance Services" },
  { name: "Home Maintenance", slug: "home-maintenance", category: "Maintenance Services" },
  { name: "Sauna Installation", slug: "sauna-installation", category: "Wellness Services" },
  { name: "Steam Room Installation", slug: "steam-room-installation", category: "Wellness Services" },
  { name: "Jacuzzi Installation", slug: "jacuzzi-installation", category: "Wellness Services" },
  { name: "Home Gym Setup", slug: "home-gym-setup", category: "Wellness Services" },
  { name: "Spa Design", slug: "spa-design", category: "Wellness Services" },
];

export default function AdminLocationPages() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<LocationPage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterService, setFilterService] = useState<string>("all");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    location: "",
    slug: "",
    serviceId: "",
    serviceName: "",
    h1: "",
    h2: "",
    h3: "",
    heroImage: "",
    description: "",
    content: "",
    localInfo: "",
    serviceFeatures: [] as string[],
    whyChooseUs: "",
    processSteps: [] as ProcessStep[],
    faqs: [] as FAQ[],
    internalLinks: [] as InternalLink[],
    schema: "",
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
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
      toast({ title: "Success", description: "Location service page created successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create location service page", variant: "destructive" });
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
      toast({ title: "Success", description: "Location service page updated successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update location service page", variant: "destructive" });
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
      toast({ title: "Success", description: "Location service page deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete location service page", variant: "destructive" });
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
      serviceName: "",
      h1: "",
      h2: "",
      h3: "",
      heroImage: "",
      description: "",
      content: "",
      localInfo: "",
      serviceFeatures: [],
      whyChooseUs: "",
      processSteps: [],
      faqs: [],
      internalLinks: [],
      schema: "",
      metaTitle: "",
      metaDescription: "",
      focusKeyword: "",
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
      serviceName: page.serviceName || "",
      h1: page.h1,
      h2: page.h2 || "",
      h3: page.h3 || "",
      heroImage: page.heroImage || "",
      description: page.description,
      content: page.content,
      localInfo: page.localInfo || "",
      serviceFeatures: page.serviceFeatures || [],
      whyChooseUs: page.whyChooseUs || "",
      processSteps: page.processSteps || [],
      faqs: page.faqs || [],
      internalLinks: page.internalLinks || [],
      schema: page.schema || "",
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      focusKeyword: page.focusKeyword || "",
      isActive: page.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleTemplateSelect = (serviceName: string, location: string) => {
    const serviceTemplate = serviceTemplates.find(s => s.name === serviceName);
    const serviceSlug = serviceTemplate?.slug || serviceName.toLowerCase().replace(/\s+/g, "-");
    const locationSlug = location.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const slug = `${serviceSlug}-in-${locationSlug}`;
    const focusKeyword = `${serviceName} in ${location}`;

    setFormData({
      ...formData,
      location,
      serviceName,
      slug,
      focusKeyword,
      h1: `Professional ${serviceName} in ${location}`,
      h2: `Expert ${serviceName} Solutions for ${location} Residents`,
      h3: `Why Choose The Property Masters for ${serviceName} in ${location}?`,
      metaTitle: `${serviceName} in ${location} | Expert Services | The Property Masters`,
      metaDescription: `Looking for professional ${serviceName.toLowerCase()} in ${location}? The Property Masters offers premium ${serviceName.toLowerCase()} services in ${location}, Dubai. Call +971 585 707 110 for a free consultation.`,
      description: `The Property Masters delivers exceptional ${serviceName.toLowerCase()} services in ${location}, Dubai. Our team of experts provides tailored solutions to meet the unique needs of ${location} residents and businesses.`,
    });
  };

  const handleLocationSelect = (location: string) => {
    if (formData.serviceName) {
      handleTemplateSelect(formData.serviceName, location);
    } else {
      const slug = location.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      setFormData({
        ...formData,
        location,
        slug,
        h1: `Professional Services in ${location}`,
        metaTitle: `Premium Property Services in ${location} | The Property Masters`,
        metaDescription: `Expert interior design, wellness, and maintenance services in ${location}, Dubai. Contact The Property Masters for premium property solutions.`,
      });
    }
  };

  const handleServiceSelect = (serviceName: string) => {
    if (formData.location) {
      handleTemplateSelect(serviceName, formData.location);
    } else {
      setFormData({
        ...formData,
        serviceName,
      });
    }
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
    setFormData({ ...formData, faqs: [...formData.faqs, { question: "", answer: "" }] });
  };
  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setFormData({ ...formData, faqs: newFaqs });
  };
  const removeFaq = (index: number) => {
    setFormData({ ...formData, faqs: formData.faqs.filter((_, i) => i !== index) });
  };

  const addProcessStep = () => {
    setFormData({ ...formData, processSteps: [...formData.processSteps, { title: "", description: "" }] });
  };
  const updateProcessStep = (index: number, field: "title" | "description", value: string) => {
    const newSteps = [...formData.processSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setFormData({ ...formData, processSteps: newSteps });
  };
  const removeProcessStep = (index: number) => {
    setFormData({ ...formData, processSteps: formData.processSteps.filter((_, i) => i !== index) });
  };

  const addFeature = () => {
    setFormData({ ...formData, serviceFeatures: [...formData.serviceFeatures, ""] });
  };
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.serviceFeatures];
    newFeatures[index] = value;
    setFormData({ ...formData, serviceFeatures: newFeatures });
  };
  const removeFeature = (index: number) => {
    setFormData({ ...formData, serviceFeatures: formData.serviceFeatures.filter((_, i) => i !== index) });
  };

  const addInternalLink = () => {
    setFormData({ ...formData, internalLinks: [...formData.internalLinks, { text: "", url: "" }] });
  };
  const updateInternalLink = (index: number, field: "text" | "url", value: string) => {
    const newLinks = [...formData.internalLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({ ...formData, internalLinks: newLinks });
  };
  const removeInternalLink = (index: number) => {
    setFormData({ ...formData, internalLinks: formData.internalLinks.filter((_, i) => i !== index) });
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": `The Property Masters - ${formData.serviceName || "Services"} in ${formData.location}`,
      "description": formData.description,
      "url": `https://thepropertymasters.ae/location/${formData.slug}`,
      "telephone": "+971585707110",
      "email": "Info@thepropertymasters.ae",
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
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": formData.serviceName || "Property Services",
        "itemListElement": (formData.serviceFeatures || []).map(feature => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": feature
          }
        }))
      }
    };
    setFormData({ ...formData, schema: JSON.stringify(schema, null, 2) });
  };

  const generateFaqSchema = () => {
    if (formData.faqs.length === 0) return;
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": formData.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    const existingSchema = formData.schema ? formData.schema + "\n\n" : "";
    setFormData({ ...formData, schema: existingSchema + JSON.stringify(faqSchema, null, 2) });
  };

  const duplicatePage = (page: LocationPage) => {
    setEditingPage(null);
    setFormData({
      location: "",
      slug: "",
      serviceId: page.serviceId || "",
      serviceName: page.serviceName || "",
      h1: page.h1,
      h2: page.h2 || "",
      h3: page.h3 || "",
      heroImage: page.heroImage || "",
      description: page.description,
      content: page.content,
      localInfo: page.localInfo || "",
      serviceFeatures: page.serviceFeatures || [],
      whyChooseUs: page.whyChooseUs || "",
      processSteps: page.processSteps || [],
      faqs: page.faqs || [],
      internalLinks: page.internalLinks || [],
      schema: "",
      metaTitle: "",
      metaDescription: "",
      focusKeyword: "",
      isActive: false,
    });
    setIsDialogOpen(true);
    toast({ title: "Template Duplicated", description: "Change the location and update the content for the new page." });
  };

  const filteredPages = locationPages.filter(page => {
    const matchesSearch = page.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (page.serviceName || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = filterService === "all" || (page.serviceName || "General") === filterService;
    return matchesSearch && matchesService;
  });

  const uniqueServices = Array.from(new Set(locationPages.map(p => p.serviceName || "General")));

  if (isLoading) {
    return <div className="p-6">Loading location service pages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#09263D]" data-testid="heading-location-pages">Location-wise Service Pages</h1>
          <p className="text-gray-600">Create location + service combination pages for Local SEO (e.g., "Interior Design in Dubai Marina")</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#970A44]" onClick={resetForm} data-testid="button-add-location">
              <Plus className="w-4 h-4 mr-2" />
              Create Location Service Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPage ? "Edit Location Service Page" : "Create Location Service Page"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!editingPage && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
                  <h3 className="font-semibold text-[#09263D]">Step 1: Select Service + Location</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Select Service</Label>
                      <Select value={formData.serviceName} onValueChange={handleServiceSelect}>
                        <SelectTrigger data-testid="select-service-template">
                          <SelectValue placeholder="Choose a service..." />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTemplates.map((s) => (
                            <SelectItem key={s.slug} value={s.name}>
                              {s.name} ({s.category})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Or type custom service name</Label>
                      <Input
                        value={formData.serviceName}
                        onChange={(e) => handleServiceSelect(e.target.value)}
                        placeholder="e.g., Marble Polishing"
                        data-testid="input-custom-service"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Select Location</Label>
                    <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-2 border rounded-lg bg-white">
                      {dubaiLocations.map((location) => (
                        <Button
                          key={location}
                          type="button"
                          variant={formData.location === location ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleLocationSelect(location)}
                          className={formData.location === location ? "bg-[#970A44]" : ""}
                          data-testid={`button-location-${location.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {location}
                        </Button>
                      ))}
                    </div>
                  </div>
                  {formData.slug && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        URL Preview: <strong>/location/{formData.slug}</strong>
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Focus Keyword: <strong>{formData.focusKeyword}</strong>
                      </p>
                    </div>
                  )}
                </div>
              )}

              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="basic" className="flex items-center gap-1 text-xs">
                    <MapPin className="w-3 h-3" />
                    Basic
                  </TabsTrigger>
                  <TabsTrigger value="content" className="flex items-center gap-1 text-xs">
                    <FileText className="w-3 h-3" />
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="features" className="flex items-center gap-1 text-xs">
                    <ListChecks className="w-3 h-3" />
                    Features
                  </TabsTrigger>
                  <TabsTrigger value="faqs" className="flex items-center gap-1 text-xs">
                    <HelpCircle className="w-3 h-3" />
                    FAQs
                  </TabsTrigger>
                  <TabsTrigger value="links" className="flex items-center gap-1 text-xs">
                    <Link2 className="w-3 h-3" />
                    Links
                  </TabsTrigger>
                  <TabsTrigger value="seo" className="flex items-center gap-1 text-xs">
                    <Code className="w-3 h-3" />
                    SEO
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location Name *</Label>
                      <Input
                        id="location"
                        data-testid="input-location"
                        value={formData.location}
                        onChange={(e) => {
                          const location = e.target.value;
                          if (formData.serviceName) {
                            handleTemplateSelect(formData.serviceName, location);
                          } else {
                            const slug = location.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
                            setFormData({ ...formData, location, slug });
                          }
                        }}
                        placeholder="e.g., Dubai Marina"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceName">Service Name</Label>
                      <Input
                        id="serviceName"
                        data-testid="input-service-name"
                        value={formData.serviceName}
                        onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                        placeholder="e.g., Interior Design"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="slug">URL Slug *</Label>
                      <Input
                        id="slug"
                        data-testid="input-slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="interior-design-in-dubai-marina"
                        required
                      />
                      <p className="text-xs text-gray-500">/location/{formData.slug || "slug"}</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="focusKeyword">Focus Keyword</Label>
                      <Input
                        id="focusKeyword"
                        data-testid="input-focus-keyword"
                        value={formData.focusKeyword}
                        onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                        placeholder="e.g., Interior Design in Dubai Marina"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="h1">H1 Heading *</Label>
                    <Input
                      id="h1"
                      data-testid="input-h1"
                      value={formData.h1}
                      onChange={(e) => setFormData({ ...formData, h1: e.target.value })}
                      placeholder="Professional Interior Design in Dubai Marina"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="h2">H2 Heading</Label>
                      <Input
                        id="h2"
                        data-testid="input-h2"
                        value={formData.h2}
                        onChange={(e) => setFormData({ ...formData, h2: e.target.value })}
                        placeholder="Expert Solutions for Dubai Marina Residents"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="h3">H3 Heading</Label>
                      <Input
                        id="h3"
                        data-testid="input-h3"
                        value={formData.h3}
                        onChange={(e) => setFormData({ ...formData, h3: e.target.value })}
                        placeholder="Why Choose Us for This Service?"
                      />
                    </div>
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
                    <Label htmlFor="description">Short Description / Intro *</Label>
                    <Textarea
                      id="description"
                      data-testid="textarea-description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief introduction about this service in this location..."
                      rows={3}
                      required
                    />
                    <p className="text-xs text-gray-500">{formData.description.length} characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Main Content (supports HTML)</Label>
                    <Textarea
                      id="content"
                      data-testid="textarea-content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Detailed content about the service in this location. Use HTML tags like <h3>, <p>, <ul>, <li> for formatting..."
                      rows={8}
                      required
                    />
                    <p className="text-xs text-gray-500">You can use HTML tags for formatting. Word count: ~{formData.content.split(/\s+/).filter(Boolean).length}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whyChooseUs">Why Choose Us Section</Label>
                    <Textarea
                      id="whyChooseUs"
                      data-testid="textarea-why-choose"
                      value={formData.whyChooseUs}
                      onChange={(e) => setFormData({ ...formData, whyChooseUs: e.target.value })}
                      placeholder="Why should customers choose The Property Masters for this service in this location? Supports HTML."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="localInfo">Area-Specific Information</Label>
                    <Textarea
                      id="localInfo"
                      data-testid="textarea-local-info"
                      value={formData.localInfo}
                      onChange={(e) => setFormData({ ...formData, localInfo: e.target.value })}
                      placeholder="Information specific to this area (nearby landmarks, special considerations, coverage area, etc.)"
                      rows={4}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="features" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <Label>Service Features / Key Points</Label>
                        <p className="text-xs text-gray-500 mt-1">List specific features of this service in this location</p>
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={addFeature} data-testid="button-add-feature">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Feature
                      </Button>
                    </div>
                    {formData.serviceFeatures.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          placeholder={`Feature ${index + 1}, e.g., "Licensed and insured technicians"`}
                          data-testid={`input-feature-${index}`}
                        />
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFeature(index)} className="text-red-500 flex-shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {formData.serviceFeatures.length === 0 && (
                      <p className="text-gray-500 text-center py-6">No features added yet. Add key service features for this location.</p>
                    )}
                  </div>

                  <div className="border-t pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <Label>Process Steps / How It Works</Label>
                        <p className="text-xs text-gray-500 mt-1">Outline the service process step by step</p>
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={addProcessStep} data-testid="button-add-step">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Step
                      </Button>
                    </div>
                    {formData.processSteps.map((step, index) => (
                      <Card key={index}>
                        <CardContent className="pt-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <Label>Step {index + 1}</Label>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeProcessStep(index)} className="text-red-500">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <Input
                            placeholder="Step title, e.g., Free Consultation"
                            value={step.title}
                            onChange={(e) => updateProcessStep(index, "title", e.target.value)}
                            data-testid={`input-step-title-${index}`}
                          />
                          <Textarea
                            placeholder="Step description..."
                            value={step.description}
                            onChange={(e) => updateProcessStep(index, "description", e.target.value)}
                            rows={2}
                            data-testid={`textarea-step-desc-${index}`}
                          />
                        </CardContent>
                      </Card>
                    ))}
                    {formData.processSteps.length === 0 && (
                      <p className="text-gray-500 text-center py-6">No process steps added yet.</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="faqs" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label>Location-Specific FAQs</Label>
                      <p className="text-xs text-gray-500 mt-1">FAQs help with SEO and featured snippets</p>
                    </div>
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
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeFaq(index)} className="text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <Input
                          placeholder={`Question, e.g., "How much does ${formData.serviceName || 'this service'} cost in ${formData.location || 'this area'}?"`}
                          value={faq.question}
                          onChange={(e) => updateFaq(index, "question", e.target.value)}
                          data-testid={`input-faq-question-${index}`}
                        />
                        <Textarea
                          placeholder="Answer..."
                          value={faq.answer}
                          onChange={(e) => updateFaq(index, "answer", e.target.value)}
                          rows={2}
                          data-testid={`textarea-faq-answer-${index}`}
                        />
                      </CardContent>
                    </Card>
                  ))}
                  {formData.faqs.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No FAQs added yet. Add location-specific questions and answers for better SEO.</p>
                  )}
                </TabsContent>

                <TabsContent value="links" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label>Internal Links</Label>
                      <p className="text-xs text-gray-500 mt-1">Add internal links to other relevant pages for better SEO interlinking</p>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={addInternalLink} data-testid="button-add-link">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Link
                    </Button>
                  </div>
                  {formData.internalLinks.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Link text, e.g., Interior Design Services"
                        value={link.text}
                        onChange={(e) => updateInternalLink(index, "text", e.target.value)}
                        className="flex-1"
                        data-testid={`input-link-text-${index}`}
                      />
                      <Input
                        placeholder="URL, e.g., /interior-design"
                        value={link.url}
                        onChange={(e) => updateInternalLink(index, "url", e.target.value)}
                        className="flex-1"
                        data-testid={`input-link-url-${index}`}
                      />
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeInternalLink(index)} className="text-red-500 flex-shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {formData.internalLinks.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No internal links added yet.</p>
                      <p className="text-xs mt-2">Suggested links: /interior-design, /maintenance, /wellness, /shop, /contact</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="seo" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="metaTitle">Meta Title *</Label>
                      <Input
                        id="metaTitle"
                        data-testid="input-meta-title"
                        value={formData.metaTitle}
                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                        placeholder="SEO Title | The Property Masters"
                        required
                      />
                      <p className={`text-xs ${formData.metaTitle.length > 60 ? "text-red-500" : "text-gray-500"}`}>{formData.metaTitle.length}/60 characters</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="focusKeywordSeo">Focus Keyword</Label>
                      <Input
                        id="focusKeywordSeo"
                        value={formData.focusKeyword}
                        onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                        placeholder="Primary keyword for this page"
                        data-testid="input-focus-keyword-seo"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description *</Label>
                    <Textarea
                      id="metaDescription"
                      data-testid="textarea-meta-description"
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      placeholder="SEO description for search results..."
                      rows={2}
                      required
                    />
                    <p className={`text-xs ${formData.metaDescription.length > 160 ? "text-red-500" : "text-gray-500"}`}>{formData.metaDescription.length}/160 characters</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border space-y-2">
                    <h4 className="font-semibold text-sm">Google Search Preview</h4>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-blue-700 text-lg truncate">{formData.metaTitle || "Page Title"}</p>
                      <p className="text-green-700 text-sm">thepropertymasters.ae/location/{formData.slug || "slug"}</p>
                      <p className="text-gray-600 text-sm line-clamp-2">{formData.metaDescription || "Meta description will appear here..."}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <Label htmlFor="schema">Schema Markup (JSON-LD)</Label>
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={generateSchema} data-testid="button-generate-schema">
                          Generate LocalBusiness Schema
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={generateFaqSchema} disabled={formData.faqs.length === 0} data-testid="button-generate-faq-schema">
                          Generate FAQ Schema
                        </Button>
                      </div>
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

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by location, service, or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
            data-testid="input-search"
          />
        </div>
        {uniqueServices.length > 1 && (
          <Select value={filterService} onValueChange={setFilterService}>
            <SelectTrigger className="w-[200px]" data-testid="select-filter-service">
              <SelectValue placeholder="Filter by service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {uniqueServices.map(service => (
                <SelectItem key={service} value={service}>{service}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="text-sm text-gray-500">
          {filteredPages.length} page{filteredPages.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredPages.map((page) => (
          <Card key={page.id} className={!page.isActive ? "opacity-60" : ""} data-testid={`card-location-${page.id}`}>
            <CardHeader className="flex flex-row items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${page.isActive ? "bg-[#970A44]/10" : "bg-gray-100"}`}>
                  {page.serviceName ? (
                    <Wrench className={`w-5 h-5 ${page.isActive ? "text-[#970A44]" : "text-gray-400"}`} />
                  ) : (
                    <MapPin className={`w-5 h-5 ${page.isActive ? "text-[#970A44]" : "text-gray-400"}`} />
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg flex flex-wrap items-center gap-2">
                    {page.serviceName ? `${page.serviceName} in ${page.location}` : page.location}
                    {page.isActive ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </CardTitle>
                  <CardDescription>/location/{page.slug}</CardDescription>
                  {page.focusKeyword && (
                    <p className="text-xs text-[#970A44] mt-1">Keyword: {page.focusKeyword}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Switch
                  checked={page.isActive}
                  onCheckedChange={() => toggleActive(page)}
                  data-testid={`switch-active-${page.id}`}
                />
                <Button variant="outline" size="sm" onClick={() => duplicatePage(page)} title="Duplicate as template" data-testid={`button-duplicate-${page.id}`}>
                  <Copy className="w-4 h-4" />
                </Button>
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
                {page.serviceName && (
                  <span className="px-2 py-1 bg-[#970A44]/10 text-[#970A44] rounded">{page.serviceName}</span>
                )}
                {page.faqs && page.faqs.length > 0 && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{page.faqs.length} FAQs</span>
                )}
                {page.serviceFeatures && page.serviceFeatures.length > 0 && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">{page.serviceFeatures.length} Features</span>
                )}
                {page.processSteps && page.processSteps.length > 0 && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{page.processSteps.length} Steps</span>
                )}
                {page.internalLinks && page.internalLinks.length > 0 && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">{page.internalLinks.length} Links</span>
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
              {searchTerm || filterService !== "all"
                ? "No location service pages match your search."
                : "No location service pages created yet. Click \"Create Location Service Page\" to get started."}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
