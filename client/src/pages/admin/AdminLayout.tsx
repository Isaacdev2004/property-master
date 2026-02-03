import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Package,
  Star,
  Briefcase,
  Calendar,
  Mail,
  LogOut,
  Settings,
  Menu,
  X,
  Layers,
  Globe,
  Palette,
  Code,
  MapPin,
  Edit3
} from "lucide-react";
import { useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/services", label: "Services", icon: Layers },
  { path: "/admin/posts", label: "Blog Posts", icon: FileText },
  { path: "/admin/products", label: "Products", icon: Package },
  { path: "/admin/testimonials", label: "Testimonials", icon: Star },
  { path: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { path: "/admin/bookings", label: "Bookings", icon: Calendar },
  { path: "/admin/inquiries", label: "Inquiries", icon: Mail },
  { path: "/admin/page-content", label: "Page Content", icon: Edit3 },
  { path: "/admin/location-pages", label: "Location Pages", icon: MapPin },
  { path: "/admin/tracking-codes", label: "Tracking Codes", icon: Code },
  { path: "/admin/seo", label: "SEO Settings", icon: Globe },
  { path: "/admin/site-settings", label: "Site Settings", icon: Palette },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const { logout } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        data-testid="button-toggle-sidebar"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#09263D] text-white transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold">The Property Masters</h1>
          <p className="text-sm text-white/60">Admin Panel</p>
        </div>

        <nav className="p-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location === item.path || 
              (item.path !== "/admin" && location.startsWith(item.path));
            const Icon = item.icon;
            
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-md cursor-pointer transition-colors ${
                    isActive
                      ? "bg-[#970A44] text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link href="/">
            <div className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/10 hover:text-white rounded-lg cursor-pointer mb-2">
              <Settings className="w-5 h-5" />
              View Website
            </div>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-white/70 hover:bg-white/10 hover:text-white"
            onClick={handleLogout}
            data-testid="button-logout"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 lg:ml-0">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
