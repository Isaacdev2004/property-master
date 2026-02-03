import { useLocation, Route, Switch, Redirect } from "wouter";
import { useAdmin, AdminProvider } from "@/contexts/AdminContext";
import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminPosts from "./AdminPosts";
import AdminProducts from "./AdminProducts";
import AdminTestimonials from "./AdminTestimonials";
import AdminBookings from "./AdminBookings";
import AdminInquiries from "./AdminInquiries";
import AdminPortfolio from "./AdminPortfolio";
import AdminServices from "./AdminServices";
import AdminSEO from "./AdminSEO";
import AdminSiteSettings from "./AdminSiteSettings";

function AdminRoutes() {
  const { isAuthenticated, isLoading } = useAdmin();
  const [location] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#970A44]"></div>
      </div>
    );
  }

  if (!isAuthenticated && location !== "/admin/login") {
    return <Redirect to="/admin/login" />;
  }

  if (isAuthenticated && location === "/admin/login") {
    return <Redirect to="/admin" />;
  }

  if (location === "/admin/login") {
    return <AdminLogin />;
  }

  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/services" component={AdminServices} />
        <Route path="/admin/posts" component={AdminPosts} />
        <Route path="/admin/products" component={AdminProducts} />
        <Route path="/admin/testimonials" component={AdminTestimonials} />
        <Route path="/admin/bookings" component={AdminBookings} />
        <Route path="/admin/inquiries" component={AdminInquiries} />
        <Route path="/admin/portfolio" component={AdminPortfolio} />
        <Route path="/admin/seo" component={AdminSEO} />
        <Route path="/admin/site-settings" component={AdminSiteSettings} />
        <Route>
          <Redirect to="/admin" />
        </Route>
      </Switch>
    </AdminLayout>
  );
}

export default function Admin() {
  return (
    <AdminProvider>
      <AdminRoutes />
    </AdminProvider>
  );
}
