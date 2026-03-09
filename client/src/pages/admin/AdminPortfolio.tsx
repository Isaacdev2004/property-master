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
} from "@/components/ui/dialog";
import { Edit, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { PortfolioProject } from "@shared/schema";

export default function AdminPortfolio() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    beforeImage: "",
    afterImage: "",
    tags: "",
    featured: false,
  });

  const { data: projects = [], isLoading } = useQuery<PortfolioProject[]>({
    queryKey: ["/api/admin/portfolio"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/portfolio");
      return res.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await adminFetch(`/api/admin/portfolio/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update project");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({ title: "Success", description: "Project updated successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update project", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      beforeImage: "",
      afterImage: "",
      tags: "",
      featured: false,
    });
    setEditingProject(null);
  };

  const handleEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      beforeImage: project.beforeImage,
      afterImage: project.afterImage,
      tags: project.tags.join(", "),
      featured: project.featured,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const projectData = {
      ...formData,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
    };

    updateMutation.mutate({ id: editingProject.id, data: projectData });
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
        <p className="text-gray-500 mt-1">Manage portfolio projects</p>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  data-testid="input-title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  data-testid="input-category"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="beforeImage">Before Image URL</Label>
              <Input
                id="beforeImage"
                value={formData.beforeImage}
                onChange={(e) => setFormData({ ...formData, beforeImage: e.target.value })}
                placeholder="https://..."
                data-testid="input-before-image"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="afterImage">After Image URL</Label>
              <Input
                id="afterImage"
                value={formData.afterImage}
                onChange={(e) => setFormData({ ...formData, afterImage: e.target.value })}
                placeholder="https://..."
                data-testid="input-after-image"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Luxury, Modern, Villa"
                data-testid="input-tags"
              />
            </div>
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
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                data-testid="checkbox-featured"
              />
              <Label htmlFor="featured">Featured project</Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-[#CD9342] hover:bg-[#A67A2E]"
                disabled={updateMutation.isPending}
                data-testid="button-submit-project"
              >
                Update Project
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          data-testid="input-search"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-8 text-center text-gray-500">
              No projects found
            </CardContent>
          </Card>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id} data-testid={`project-card-${project.id}`}>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Before</p>
                    <img
                      src={project.beforeImage}
                      alt="Before"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">After</p>
                    <img
                      src={project.afterImage}
                      alt="After"
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                </div>
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="px-2 py-0.5 bg-[#CD9342]/10 text-[#CD9342] rounded text-xs">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">
                      Featured
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => handleEdit(project)}
                  data-testid={`button-edit-${project.id}`}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Project
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
