import { useQuery } from "@tanstack/react-query";
import { adminFetch } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Package, Star, Calendar, Mail, Briefcase, Layers, Globe, Palette } from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  const { data: posts = [] } = useQuery({
    queryKey: ["/api/admin/posts"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/posts");
      return res.json();
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ["/api/admin/products"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/products");
      return res.json();
    },
  });

  const { data: testimonials = [] } = useQuery({
    queryKey: ["/api/admin/testimonials"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/testimonials");
      return res.json();
    },
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ["/api/admin/bookings"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/bookings");
      return res.json();
    },
  });

  const { data: inquiries = [] } = useQuery({
    queryKey: ["/api/admin/inquiries"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/inquiries");
      return res.json();
    },
  });

  const { data: portfolio = [] } = useQuery({
    queryKey: ["/api/admin/portfolio"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/portfolio");
      return res.json();
    },
  });

  const { data: services = [] } = useQuery({
    queryKey: ["/api/admin/services"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/services");
      return res.json();
    },
  });

  const { data: seoSettings = [] } = useQuery({
    queryKey: ["/api/admin/seo"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/seo");
      return res.json();
    },
  });

  const stats = [
    { label: "Services", value: services.length, icon: Layers, color: "bg-indigo-500", path: "/admin/services" },
    { label: "Blog Posts", value: posts.length, icon: FileText, color: "bg-blue-500", path: "/admin/posts" },
    { label: "Products", value: products.length, icon: Package, color: "bg-green-500", path: "/admin/products" },
    { label: "Testimonials", value: testimonials.length, icon: Star, color: "bg-yellow-500", path: "/admin/testimonials" },
    { label: "Portfolio Projects", value: portfolio.length, icon: Briefcase, color: "bg-purple-500", path: "/admin/portfolio" },
    { label: "SEO Pages", value: seoSettings.length, icon: Globe, color: "bg-teal-500", path: "/admin/seo" },
    { label: "Bookings", value: bookings.length, icon: Calendar, color: "bg-[#970A44]", path: "/admin/bookings" },
    { label: "Inquiries", value: inquiries.length, icon: Mail, color: "bg-[#1C4668]", path: "/admin/inquiries" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your website content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.path}>
              <Card className="hover-elevate cursor-pointer" data-testid={`card-stat-${stat.label.toLowerCase().replace(' ', '-')}`}>
                <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <p className="text-gray-500 text-sm">No bookings yet</p>
            ) : (
              <ul className="space-y-3">
                {bookings.slice(0, 5).map((booking: any) => (
                  <li key={booking.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">{booking.fullName}</p>
                      <p className="text-sm text-gray-500">{booking.serviceType}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === "confirmed" ? "bg-green-100 text-green-700" :
                      booking.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {booking.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {inquiries.length === 0 ? (
              <p className="text-gray-500 text-sm">No inquiries yet</p>
            ) : (
              <ul className="space-y-3">
                {inquiries.slice(0, 5).map((inquiry: any) => (
                  <li key={inquiry.id} className="border-b pb-2">
                    <div className="flex justify-between">
                      <p className="font-medium">{inquiry.fullName}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{inquiry.subject}</p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
