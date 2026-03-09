import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adminFetch } from "@/contexts/AdminContext";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Edit, Trash2, FileText, Image, Link2, Code, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { PageContent } from "@shared/schema";

interface FAQ {
  question: string;
  answer: string;
}

interface InternalLink {
  text: string;
  url: string;
  title?: string;
}

const pageTypes = [
  { value: "service", label: "Service Page" },
  { value: "product", label: "Product Page" },
  { value: "blog", label: "Blog Page" },
  { value: "location", label: "Location Page" },
  { value: "general", label: "General Page" },
];

export default function AdminPageContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<PageContent | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    pagePath: "",
    pageType: "general" as "service" | "product" | "blog" | "location" | "general",
    h1: "",
    h2: "",
    h3: "",
    heroImage: "",
    heroImageAlt: "",
    introContent: "",
    mainContent: "",
    faqs: [] as FAQ[],
    internalLinks: [] as InternalLink[],
    schema: "",
  });

  const { data: pageContents = [], isLoading } = useQuery<PageContent[]>({
    queryKey: ["/api/admin/page-content"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/page-content");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await adminFetch("/api/admin/page-content", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create page content");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/page-content"] });
      toast({ title: "Success", description: "Page content created successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create page content", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await adminFetch(`/api/admin/page-content/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update page content");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/page-content"] });
      toast({ title: "Success", description: "Page content updated successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update page content", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/page-content/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete page content");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/page-content"] });
      toast({ title: "Success", description: "Page content deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete page content", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      pagePath: "",
      pageType: "general",
      h1: "",
      h2: "",
      h3: "",
      heroImage: "",
      heroImageAlt: "",
      introContent: "",
      mainContent: "",
      faqs: [],
      internalLinks: [],
      schema: "",
    });
    setEditingContent(null);
  };

  const handleEdit = (content: PageContent) => {
    setEditingContent(content);
    setFormData({
      pagePath: content.pagePath,
      pageType: content.pageType,
      h1: content.h1,
      h2: content.h2 || "",
      h3: content.h3 || "",
      heroImage: content.heroImage || "",
      heroImageAlt: content.heroImageAlt || "",
      introContent: content.introContent || "",
      mainContent: content.mainContent || "",
      faqs: content.faqs || [],
      internalLinks: content.internalLinks || [],
      schema: content.schema || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingContent) {
      updateMutation.mutate({ id: editingContent.id, data: formData });
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

  const addInternalLink = () => {
    setFormData({
      ...formData,
      internalLinks: [...formData.internalLinks, { text: "", url: "", title: "" }],
    });
  };

  const updateInternalLink = (index: number, field: keyof InternalLink, value: string) => {
    const newLinks = [...formData.internalLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({ ...formData, internalLinks: newLinks });
  };

  const removeInternalLink = (index: number) => {
    setFormData({
      ...formData,
      internalLinks: formData.internalLinks.filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return <div className="p-6">Loading page contents...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Page Content Manager</h1>
          <p className="text-gray-600">Manage H1, H2, H3 headings, FAQs, hero images, and internal links</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#CD9342]" onClick={resetForm} data-testid="button-add-content">
              <Plus className="w-4 h-4 mr-2" />
              Add Page Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingContent ? "Edit Page Content" : "Add Page Content"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Tabs defaultValue="headings" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="headings" className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    Headings
                  </TabsTrigger>
                  <TabsTrigger value="hero" className="flex items-center gap-1">
                    <Image className="w-3 h-3" />
                    Hero
                  </TabsTrigger>
                  <TabsTrigger value="faqs" className="flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" />
                    FAQs
                  </TabsTrigger>
                  <TabsTrigger value="links" className="flex items-center gap-1">
                    <Link2 className="w-3 h-3" />
                    Links
                  </TabsTrigger>
                  <TabsTrigger value="schema" className="flex items-center gap-1">
                    <Code className="w-3 h-3" />
                    Schema
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="headings" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pagePath">Page Path</Label>
                      <Input
                        id="pagePath"
                        data-testid="input-page-path"
                        value={formData.pagePath}
                        onChange={(e) => setFormData({ ...formData, pagePath: e.target.value })}
                        placeholder="/services/maintenance"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pageType">Page Type</Label>
                      <Select
                        value={formData.pageType}
                        onValueChange={(value: any) => setFormData({ ...formData, pageType: value })}
                      >
                        <SelectTrigger data-testid="select-page-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {pageTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="h1">H1 (Main Heading)</Label>
                    <Input
                      id="h1"
                      data-testid="input-h1"
                      value={formData.h1}
                      onChange={(e) => setFormData({ ...formData, h1: e.target.value })}
                      placeholder="Primary heading for the page"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="h2">H2 (Secondary Heading)</Label>
                    <Input
                      id="h2"
                      data-testid="input-h2"
                      value={formData.h2}
                      onChange={(e) => setFormData({ ...formData, h2: e.target.value })}
                      placeholder="Secondary heading"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="h3">H3 (Tertiary Heading)</Label>
                    <Input
                      id="h3"
                      data-testid="input-h3"
                      value={formData.h3}
                      onChange={(e) => setFormData({ ...formData, h3: e.target.value })}
                      placeholder="Tertiary heading"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="introContent">Intro Content</Label>
                    <Textarea
                      id="introContent"
                      data-testid="textarea-intro"
                      value={formData.introContent}
                      onChange={(e) => setFormData({ ...formData, introContent: e.target.value })}
                      placeholder="Introduction paragraph..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mainContent">Main Content</Label>
                    <Textarea
                      id="mainContent"
                      data-testid="textarea-main"
                      value={formData.mainContent}
                      onChange={(e) => setFormData({ ...formData, mainContent: e.target.value })}
                      placeholder="Main body content..."
                      rows={6}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="hero" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="heroImage">Hero Image URL</Label>
                    <Input
                      id="heroImage"
                      data-testid="input-hero-image"
                      value={formData.heroImage}
                      onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heroImageAlt">Hero Image Alt Text</Label>
                    <Input
                      id="heroImageAlt"
                      data-testid="input-hero-alt"
                      value={formData.heroImageAlt}
                      onChange={(e) => setFormData({ ...formData, heroImageAlt: e.target.value })}
                      placeholder="Descriptive alt text for SEO"
                    />
                  </div>
                  {formData.heroImage && (
                    <div className="mt-4">
                      <Label>Preview</Label>
                      <div className="mt-2 rounded-lg overflow-hidden border">
                        <img
                          src={formData.heroImage}
                          alt={formData.heroImageAlt || "Preview"}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="faqs" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <Label>Frequently Asked Questions</Label>
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
                    <p className="text-gray-500 text-center py-8">No FAQs added yet. Click "Add FAQ" to get started.</p>
                  )}
                </TabsContent>

                <TabsContent value="links" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <Label>Internal Links</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addInternalLink} data-testid="button-add-link">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Link
                    </Button>
                  </div>
                  {formData.internalLinks.map((link, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <Label>Link #{index + 1}</Label>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeInternalLink(index)}
                            className="text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            placeholder="Link text"
                            value={link.text}
                            onChange={(e) => updateInternalLink(index, "text", e.target.value)}
                            data-testid={`input-link-text-${index}`}
                          />
                          <Input
                            placeholder="URL (e.g., /services/maintenance)"
                            value={link.url}
                            onChange={(e) => updateInternalLink(index, "url", e.target.value)}
                            data-testid={`input-link-url-${index}`}
                          />
                        </div>
                        <Input
                          placeholder="Title attribute (optional)"
                          value={link.title || ""}
                          onChange={(e) => updateInternalLink(index, "title", e.target.value)}
                          data-testid={`input-link-title-${index}`}
                        />
                      </CardContent>
                    </Card>
                  ))}
                  {formData.internalLinks.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No internal links added yet. Click "Add Link" to get started.</p>
                  )}
                </TabsContent>

                <TabsContent value="schema" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="schema">JSON-LD Schema Markup</Label>
                    <p className="text-sm text-gray-500">
                      Add custom Schema.org JSON-LD markup for rich snippets in search results.
                    </p>
                    <Textarea
                      id="schema"
                      data-testid="textarea-schema"
                      value={formData.schema}
                      onChange={(e) => setFormData({ ...formData, schema: e.target.value })}
                      placeholder={`{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AC Maintenance Dubai",
  "description": "Professional AC maintenance services in Dubai"
}`}
                      rows={12}
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
                  className="bg-[#CD9342]"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-content"
                >
                  {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Content"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {pageContents.map((content) => (
          <Card key={content.id} data-testid={`card-content-${content.id}`}>
            <CardHeader className="flex flex-row items-start justify-between gap-2">
              <div>
                <CardTitle className="text-lg">{content.h1}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">{content.pagePath}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(content)} data-testid={`button-edit-${content.id}`}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMutation.mutate(content.id)}
                  className="text-red-500"
                  data-testid={`button-delete-${content.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-2 py-1 bg-gray-100 rounded">{content.pageType}</span>
                {content.heroImage && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Has Hero</span>}
                {content.faqs && content.faqs.length > 0 && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{content.faqs.length} FAQs</span>
                )}
                {content.internalLinks && content.internalLinks.length > 0 && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">{content.internalLinks.length} Links</span>
                )}
                {content.schema && <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">Schema</span>}
              </div>
            </CardContent>
          </Card>
        ))}
        {pageContents.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              No page content configured yet. Click "Add Page Content" to get started.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
