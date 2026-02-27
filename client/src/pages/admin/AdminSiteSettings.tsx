import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { adminFetch } from "@/contexts/AdminContext";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Building, Share2, Settings, Save, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { SiteSettings } from "@shared/schema";

export default function AdminSiteSettings() {
  const { toast } = useToast();

  const { data: settings, isLoading } = useQuery<SiteSettings>({
    queryKey: ["/api/admin/site-settings"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/site-settings");
      return res.json();
    },
  });

  const [formData, setFormData] = useState<Partial<SiteSettings>>({
    siteName: "",
    tagline: "",
    primaryColor: "#970A44",
    secondaryColor: "#720632",
    accentColor: "#1C4668",
    backgroundColor: "#F6F4EB",
    textColor: "#09263D",
    logoUrl: "",
    faviconUrl: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    socialFacebook: "",
    socialInstagram: "",
    socialLinkedin: "",
    socialTwitter: "",
    footerText: "",
  });

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<SiteSettings>) => {
      const res = await adminFetch("/api/admin/site-settings", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update settings");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/site-settings"] });
      toast({ title: "Success", description: "Site settings updated successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update site settings", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleReset = () => {
    if (settings) {
      setFormData(settings);
      toast({ title: "Reset", description: "Form reset to saved values" });
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading site settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#09263D]">Site Settings</h1>
          <p className="text-gray-600">Manage your website's global settings, colors, and branding</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} data-testid="button-reset-settings">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#970A44] hover:bg-[#720632]"
            disabled={updateMutation.isPending}
            data-testid="button-save-settings"
          >
            <Save className="w-4 h-4 mr-2" />
            {updateMutation.isPending ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="branding" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="branding" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Branding
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Social
            </TabsTrigger>
          </TabsList>

          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Branding Settings</CardTitle>
                <CardDescription>Configure your site name, tagline, and logos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      data-testid="input-site-name"
                      value={formData.siteName || ""}
                      onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                      placeholder="The Property Masters"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      data-testid="input-tagline"
                      value={formData.tagline || ""}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="Your Complete Property Solutions Partner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input
                      id="logoUrl"
                      data-testid="input-logo-url"
                      value={formData.logoUrl || ""}
                      onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                      placeholder="https://example.com/logo.png"
                    />
                    {formData.logoUrl && (
                      <div className="mt-2 p-2 bg-gray-100 rounded">
                        <img src={formData.logoUrl} alt="Logo preview" className="h-12 object-contain" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faviconUrl">Favicon URL</Label>
                    <Input
                      id="faviconUrl"
                      data-testid="input-favicon-url"
                      value={formData.faviconUrl || ""}
                      onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
                      placeholder="https://example.com/favicon.ico"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footerText">Footer Text</Label>
                  <Textarea
                    id="footerText"
                    data-testid="input-footer-text"
                    value={formData.footerText || ""}
                    onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
                    placeholder="© 2024 The Property Masters. All rights reserved."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colors">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>Customize your website's color scheme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        data-testid="input-primary-color"
                        value={formData.primaryColor || "#970A44"}
                        onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={formData.primaryColor || "#970A44"}
                        onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                        className="flex-1 font-mono"
                        placeholder="#970A44"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Used for CTAs, buttons, and accents</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        data-testid="input-secondary-color"
                        value={formData.secondaryColor || "#720632"}
                        onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={formData.secondaryColor || "#720632"}
                        onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                        className="flex-1 font-mono"
                        placeholder="#720632"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Used for hover states and dark accents</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        type="color"
                        data-testid="input-accent-color"
                        value={formData.accentColor || "#1C4668"}
                        onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={formData.accentColor || "#1C4668"}
                        onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                        className="flex-1 font-mono"
                        placeholder="#1C4668"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Secondary accent color</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="backgroundColor"
                        type="color"
                        data-testid="input-bg-color"
                        value={formData.backgroundColor || "#F6F4EB"}
                        onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={formData.backgroundColor || "#F6F4EB"}
                        onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                        className="flex-1 font-mono"
                        placeholder="#F6F4EB"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Main background and cards</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="textColor">Text Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="textColor"
                        type="color"
                        data-testid="input-text-color"
                        value={formData.textColor || "#09263D"}
                        onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={formData.textColor || "#09263D"}
                        onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                        className="flex-1 font-mono"
                        placeholder="#09263D"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Main text and headings</p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg border">
                  <h4 className="font-medium mb-3">Color Preview</h4>
                  <div className="flex gap-4">
                    <div
                      className="w-20 h-20 rounded-lg shadow-sm flex items-center justify-center text-white text-xs"
                      style={{ backgroundColor: formData.primaryColor }}
                    >
                      Primary
                    </div>
                    <div
                      className="w-20 h-20 rounded-lg shadow-sm flex items-center justify-center text-white text-xs"
                      style={{ backgroundColor: formData.secondaryColor }}
                    >
                      Secondary
                    </div>
                    <div
                      className="w-20 h-20 rounded-lg shadow-sm flex items-center justify-center text-white text-xs"
                      style={{ backgroundColor: formData.accentColor }}
                    >
                      Accent
                    </div>
                    <div
                      className="w-20 h-20 rounded-lg shadow-sm flex items-center justify-center text-xs border"
                      style={{ backgroundColor: formData.backgroundColor, color: formData.textColor }}
                    >
                      Background
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Your business contact details displayed on the website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email Address</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      data-testid="input-contact-email"
                      value={formData.contactEmail || ""}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="info@thepropertymasters.ae"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number</Label>
                    <Input
                      id="contactPhone"
                      data-testid="input-contact-phone"
                      value={formData.contactPhone || ""}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      placeholder="+971 58 570 7110"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactAddress">Business Address</Label>
                  <Textarea
                    id="contactAddress"
                    data-testid="input-contact-address"
                    value={formData.contactAddress || ""}
                    onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })}
                    placeholder="AL Saqr Business Tower - Office A-36, Dubai, UAE"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>Connect your social media profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="socialFacebook">Facebook URL</Label>
                    <Input
                      id="socialFacebook"
                      data-testid="input-social-facebook"
                      value={formData.socialFacebook || ""}
                      onChange={(e) => setFormData({ ...formData, socialFacebook: e.target.value })}
                      placeholder="https://facebook.com/thepropertymasters"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="socialInstagram">Instagram URL</Label>
                    <Input
                      id="socialInstagram"
                      data-testid="input-social-instagram"
                      value={formData.socialInstagram || ""}
                      onChange={(e) => setFormData({ ...formData, socialInstagram: e.target.value })}
                      placeholder="https://instagram.com/thepropertymasters"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="socialLinkedin">LinkedIn URL</Label>
                    <Input
                      id="socialLinkedin"
                      data-testid="input-social-linkedin"
                      value={formData.socialLinkedin || ""}
                      onChange={(e) => setFormData({ ...formData, socialLinkedin: e.target.value })}
                      placeholder="https://linkedin.com/company/thepropertymasters"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="socialTwitter">Twitter/X URL</Label>
                    <Input
                      id="socialTwitter"
                      data-testid="input-social-twitter"
                      value={formData.socialTwitter || ""}
                      onChange={(e) => setFormData({ ...formData, socialTwitter: e.target.value })}
                      placeholder="https://twitter.com/propertymasters"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
