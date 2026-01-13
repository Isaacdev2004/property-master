import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Shop from "@/pages/Shop";
import Cart from "@/pages/Cart";
import BookService from "@/pages/BookService";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import InteriorDesign from "@/pages/InteriorDesign";
import WellnessServices from "@/pages/WellnessServices";
import WellnessServiceDetail from "@/pages/WellnessServiceDetail";
import MaintenanceServices from "@/pages/MaintenanceServices";
import MaintenanceServiceDetail from "@/pages/MaintenanceServiceDetail";
import InteriorServiceDetail from "@/pages/InteriorServiceDetail";
import ProductDetail from "@/pages/ProductDetail";
import NotFound from "@/pages/NotFound";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
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
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
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
