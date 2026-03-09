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
import { Plus, Edit, Trash2, Code, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { TrackingCode } from "@shared/schema";

const codeTypes = [
  { value: "header", label: "Header (before </head>)", description: "Best for Google Analytics, Meta Pixel base code" },
  { value: "footer", label: "Footer (before </body>)", description: "Best for chat widgets, deferred scripts" },
  { value: "body_start", label: "Body Start (after <body>)", description: "Best for GTM noscript tags" },
  { value: "body_end", label: "Body End", description: "Best for conversion tracking" },
];

const templateCodes = [
  {
    name: "Google Analytics 4",
    type: "header" as const,
    template: `<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`,
  },
  {
    name: "Google Tag Manager (Head)",
    type: "header" as const,
    template: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->`,
  },
  {
    name: "Google Tag Manager (Body)",
    type: "body_start" as const,
    template: `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`,
  },
  {
    name: "Meta (Facebook) Pixel",
    type: "header" as const,
    template: `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img loading="lazy" height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"/></noscript>
<!-- End Meta Pixel Code -->`,
  },
];

export default function AdminTrackingCodes() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<TrackingCode | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    type: "header" as "header" | "footer" | "body_start" | "body_end",
    code: "",
    isActive: true,
    description: "",
  });

  const { data: trackingCodes = [], isLoading } = useQuery<TrackingCode[]>({
    queryKey: ["/api/admin/tracking-codes"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/tracking-codes");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await adminFetch("/api/admin/tracking-codes", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create tracking code");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tracking-codes"] });
      toast({ title: "Success", description: "Tracking code created successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create tracking code", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await adminFetch(`/api/admin/tracking-codes/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update tracking code");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tracking-codes"] });
      toast({ title: "Success", description: "Tracking code updated successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update tracking code", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/tracking-codes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete tracking code");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/tracking-codes"] });
      toast({ title: "Success", description: "Tracking code deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete tracking code", variant: "destructive" });
    },
  });

  const toggleActive = (code: TrackingCode) => {
    updateMutation.mutate({ id: code.id, data: { isActive: !code.isActive } });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "header",
      code: "",
      isActive: true,
      description: "",
    });
    setEditingCode(null);
  };

  const handleEdit = (code: TrackingCode) => {
    setEditingCode(code);
    setFormData({
      name: code.name,
      type: code.type,
      code: code.code,
      isActive: code.isActive,
      description: code.description || "",
    });
    setIsDialogOpen(true);
  };

  const handleTemplateSelect = (template: typeof templateCodes[0]) => {
    setFormData({
      ...formData,
      name: template.name,
      type: template.type,
      code: template.template,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCode) {
      updateMutation.mutate({ id: editingCode.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading tracking codes...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Tracking Codes</h1>
          <p className="text-gray-600">Manage Google Analytics, Meta Pixel, and other tracking codes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#CD9342]" onClick={resetForm} data-testid="button-add-tracking">
              <Plus className="w-4 h-4 mr-2" />
              Add Tracking Code
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCode ? "Edit Tracking Code" : "Add Tracking Code"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!editingCode && (
                <div className="space-y-2">
                  <Label>Quick Templates</Label>
                  <div className="flex flex-wrap gap-2">
                    {templateCodes.map((template) => (
                      <Button
                        key={template.name}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleTemplateSelect(template)}
                      >
                        {template.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    data-testid="input-tracking-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Google Analytics 4"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Placement</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger data-testid="select-tracking-type">
                      <SelectValue placeholder="Select placement" />
                    </SelectTrigger>
                    <SelectContent>
                      {codeTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    {codeTypes.find(t => t.value === formData.type)?.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                  id="description"
                  data-testid="input-tracking-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What is this tracking code for?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Tracking Code</Label>
                <Textarea
                  id="code"
                  data-testid="textarea-tracking-code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="Paste your tracking code here..."
                  rows={12}
                  className="font-mono text-sm"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  data-testid="switch-tracking-active"
                />
                <Label htmlFor="isActive">Active (code will be injected on website)</Label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#CD9342]"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-tracking"
                >
                  {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Code"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {trackingCodes.map((code) => (
          <Card key={code.id} className={!code.isActive ? "opacity-60" : ""} data-testid={`card-tracking-${code.id}`}>
            <CardHeader className="flex flex-row items-start justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${code.isActive ? "bg-green-100" : "bg-gray-100"}`}>
                  <Code className={`w-5 h-5 ${code.isActive ? "text-green-600" : "text-gray-400"}`} />
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {code.name}
                    {code.isActive ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </CardTitle>
                  <CardDescription>{code.description || codeTypes.find(t => t.value === code.type)?.label}</CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Switch
                  checked={code.isActive}
                  onCheckedChange={() => toggleActive(code)}
                  data-testid={`switch-active-${code.id}`}
                />
                <Button variant="outline" size="sm" onClick={() => handleEdit(code)} data-testid={`button-edit-${code.id}`}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMutation.mutate(code.id)}
                  className="text-red-500"
                  data-testid={`button-delete-${code.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs overflow-x-auto max-h-24 overflow-y-auto">
                <pre className="whitespace-pre-wrap">{code.code.substring(0, 200)}{code.code.length > 200 ? "..." : ""}</pre>
              </div>
            </CardContent>
          </Card>
        ))}
        {trackingCodes.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              No tracking codes configured yet. Click "Add Tracking Code" to get started.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
