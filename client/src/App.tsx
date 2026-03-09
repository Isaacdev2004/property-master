import { Suspense, lazy } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const Shop = lazy(() => import("@/pages/Shop"));
const Cart = lazy(() => import("@/pages/Cart"));
const BookService = lazy(() => import("@/pages/BookService"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const InteriorDesign = lazy(() => import("@/pages/InteriorDesign"));
const WellnessServices = lazy(() => import("@/pages/WellnessServices"));
const WellnessServiceDetail = lazy(() => import("@/pages/WellnessServiceDetail"));
const MaintenanceServices = lazy(() => import("@/pages/MaintenanceServices"));
const MaintenanceServiceDetail = lazy(() => import("@/pages/MaintenanceServiceDetail"));
const InteriorServiceDetail = lazy(() => import("@/pages/InteriorServiceDetail"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const LocationPage = lazy(() => import("@/pages/LocationPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Admin = lazy(() => import("@/pages/admin"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-[#CD9342] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  
  if (location.startsWith("/admin") || location === "/cms-portal-x7k9") {
    return (
      <Suspense fallback={<PageLoader />}>
        <Admin />
      </Suspense>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/services/:slug" component={Services} />
            <Route path="/interior-design" component={InteriorDesign} />
            <Route path="/interior-design/:serviceSlug" component={InteriorServiceDetail} />
            <Route path="/wellness" component={WellnessServices} />
            <Route path="/wellness/:serviceSlug" component={WellnessServiceDetail} />
            <Route path="/maintenance" component={MaintenanceServices} />
            <Route path="/maintenance/:serviceSlug" component={MaintenanceServiceDetail} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/shop" component={Shop} />
            <Route path="/shop/:productId" component={ProductDetail} />
            <Route path="/cart" component={Cart} />
            <Route path="/book" component={BookService} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/blog" component={Blog} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/location/:slug" component={LocationPage} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
      {!location.startsWith("/admin") && !location.startsWith("/cms-portal") && <WhatsAppFloat />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
