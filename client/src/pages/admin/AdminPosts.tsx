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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Search, Link2, Image, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { BlogPost } from "@shared/schema";

const categories = [
  "Interior Design",
  "Wellness",
  "Maintenance",
  "Commercial",
  "Design Tips"
];

export default function AdminPosts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    author: "The Property Masters Team",
    publishedAt: new Date().toISOString().split("T")[0],
    featured: false,
    metaTitle: "",
    metaDescription: "",
    focusKeywords: "",
    additionalImages: [] as string[],
    internalLinks: [] as { text: string; url: string }[],
  });
  
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newLinkText, setNewLinkText] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/posts"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/posts");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await adminFetch("/api/admin/posts", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create post");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({ title: "Success", description: "Blog post created successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create blog post", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await adminFetch(`/api/admin/posts/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update post");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({ title: "Success", description: "Blog post updated successfully" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update blog post", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete post");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({ title: "Success", description: "Blog post deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete blog post", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      image: "",
      author: "The Property Masters Team",
      publishedAt: new Date().toISOString().split("T")[0],
      featured: false,
      metaTitle: "",
      metaDescription: "",
      focusKeywords: "",
      additionalImages: [],
      internalLinks: [],
    });
    setNewImageUrl("");
    setNewLinkText("");
    setNewLinkUrl("");
    setEditingPost(null);
  };
  
  const addImage = () => {
    if (newImageUrl.trim()) {
      setFormData({
        ...formData,
        additionalImages: [...formData.additionalImages, newImageUrl.trim()],
      });
      setNewImageUrl("");
    }
  };
  
  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      additionalImages: formData.additionalImages.filter((_, i) => i !== index),
    });
  };
  
  const addInternalLink = () => {
    if (newLinkText.trim() && newLinkUrl.trim()) {
      setFormData({
        ...formData,
        internalLinks: [...formData.internalLinks, { text: newLinkText.trim(), url: newLinkUrl.trim() }],
      });
      setNewLinkText("");
      setNewLinkUrl("");
    }
  };
  
  const removeInternalLink = (index: number) => {
    setFormData({
      ...formData,
      internalLinks: formData.internalLinks.filter((_, i) => i !== index),
    });
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image: post.image,
      author: post.author,
      publishedAt: post.publishedAt.split("T")[0],
      featured: post.featured,
      metaTitle: post.metaTitle || "",
      metaDescription: post.metaDescription || "",
      focusKeywords: post.focusKeywords || "",
      additionalImages: post.additionalImages || [],
      internalLinks: post.internalLinks || [],
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = {
      ...formData,
      publishedAt: new Date(formData.publishedAt).toISOString(),
    };

    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data: postData });
    } else {
      createMutation.mutate(postData);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-500 mt-1">Manage your blog content</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-[#CD9342] hover:bg-[#A67A2E]" data-testid="button-add-post">
              <Plus className="w-4 h-4 mr-2" />
              Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? "Edit Post" : "Create New Post"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="content" data-testid="tab-content">Content</TabsTrigger>
                  <TabsTrigger value="seo" data-testid="tab-seo">
                    <Globe className="w-4 h-4 mr-1" />
                    SEO
                  </TabsTrigger>
                  <TabsTrigger value="media" data-testid="tab-media">
                    <Image className="w-4 h-4 mr-1" />
                    Media & Links
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => {
                          setFormData({ 
                            ...formData, 
                            title: e.target.value,
                            slug: generateSlug(e.target.value)
                          });
                        }}
                        required
                        data-testid="input-title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        required
                        data-testid="input-slug"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                        data-testid="input-author"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <ImageUpload
                      label="Featured Image"
                      value={formData.image}
                      onChange={(url) => setFormData({ ...formData, image: url })}
                      placeholder="Upload or enter image URL"
                    />
                    <div className="space-y-2">
                      <Label htmlFor="publishedAt">Publish Date</Label>
                      <Input
                        id="publishedAt"
                        type="date"
                        value={formData.publishedAt}
                        onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                        required
                        data-testid="input-date"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={2}
                      required
                      data-testid="input-excerpt"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content (HTML supported)</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={10}
                      required
                      data-testid="input-content"
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
                    <Label htmlFor="featured">Featured post</Label>
                  </div>
                </TabsContent>
                
                <TabsContent value="seo" className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      SEO settings help improve your blog post's visibility in search engines.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      placeholder="SEO optimized title (50-60 characters)"
                      maxLength={70}
                      data-testid="input-meta-title"
                    />
                    <p className="text-xs text-gray-500">
                      {formData.metaTitle.length}/60 characters (recommended)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      placeholder="Brief description for search results (150-160 characters)"
                      rows={3}
                      maxLength={200}
                      data-testid="input-meta-description"
                    />
                    <p className="text-xs text-gray-500">
                      {formData.metaDescription.length}/160 characters (recommended)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="focusKeywords">Focus Keywords</Label>
                    <Input
                      id="focusKeywords"
                      value={formData.focusKeywords}
                      onChange={(e) => setFormData({ ...formData, focusKeywords: e.target.value })}
                      placeholder="interior design dubai, luxury home decor, property maintenance"
                      data-testid="input-focus-keywords"
                    />
                    <p className="text-xs text-gray-500">
                      Comma-separated keywords that this post should rank for
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="media" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Image className="w-5 h-5 text-[#CD9342]" />
                      <Label className="text-lg font-semibold">Additional Images</Label>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        data-testid="input-new-image"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={addImage}
                        data-testid="button-add-image"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {formData.additionalImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {formData.additionalImages.map((img, index) => (
                          <div key={index} className="relative group">
                            <img loading="lazy" 
                              src={img} 
                              alt={`Additional ${index + 1}`}
                              className="w-full h-24 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              data-testid={`button-remove-image-${index}`}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Link2 className="w-5 h-5 text-[#CD9342]" />
                      <Label className="text-lg font-semibold">Internal Links</Label>
                    </div>
                    <p className="text-sm text-gray-500">
                      Add links to other pages on your site for better SEO and user navigation.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={newLinkText}
                        onChange={(e) => setNewLinkText(e.target.value)}
                        placeholder="Link text (e.g., Our Services)"
                        data-testid="input-link-text"
                      />
                      <div className="flex gap-2">
                        <Input
                          value={newLinkUrl}
                          onChange={(e) => setNewLinkUrl(e.target.value)}
                          placeholder="/services or /blog/post-slug"
                          data-testid="input-link-url"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={addInternalLink}
                          data-testid="button-add-link"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {formData.internalLinks.length > 0 && (
                      <div className="space-y-2">
                        {formData.internalLinks.map((link, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <div>
                              <span className="font-medium">{link.text}</span>
                              <span className="text-gray-400 mx-2">→</span>
                              <span className="text-[#CD9342]">{link.url}</span>
                            </div>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              onClick={() => removeInternalLink(index)}
                              data-testid={`button-remove-link-${index}`}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
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
                  data-testid="button-submit-post"
                >
                  {editingPost ? "Update" : "Create"} Post
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          data-testid="input-search"
        />
      </div>

      <div className="grid gap-4">
        {filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              No posts found
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} data-testid={`post-card-${post.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{post.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-[#CD9342]/10 text-[#CD9342] rounded text-xs">
                          {post.category}
                        </span>
                        {post.featured && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">
                            Featured
                          </span>
                        )}
                        <span className="text-xs text-gray-400">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEdit(post)}
                      data-testid={`button-edit-${post.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this post?")) {
                          deleteMutation.mutate(post.id);
                        }
                      }}
                      data-testid={`button-delete-${post.id}`}
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
