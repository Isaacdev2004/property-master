import { useQuery, useMutation } from "@tanstack/react-query";
import { adminFetch } from "@/contexts/AdminContext";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ContactInquiry } from "@shared/schema";

export default function AdminInquiries() {
  const { toast } = useToast();

  const { data: inquiries = [], isLoading } = useQuery<ContactInquiry[]>({
    queryKey: ["/api/admin/inquiries"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/inquiries");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await adminFetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete inquiry");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/inquiries"] });
      toast({ title: "Success", description: "Inquiry deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete inquiry", variant: "destructive" });
    },
  });

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Inquiries</h1>
        <p className="text-gray-500 mt-1">View and manage contact form submissions</p>
      </div>

      {inquiries.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            No inquiries found
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id} data-testid={`inquiry-card-${inquiry.id}`}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">{inquiry.fullName}</CardTitle>
                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {inquiry.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {inquiry.phone}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this inquiry?")) {
                        deleteMutation.mutate(inquiry.id);
                      }
                    }}
                    data-testid={`button-delete-${inquiry.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-medium">{inquiry.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Message</p>
                  <p className="whitespace-pre-wrap">{inquiry.message}</p>
                </div>
                <div className="mt-4 pt-4 border-t text-xs text-gray-400">
                  Submitted: {new Date(inquiry.createdAt).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
