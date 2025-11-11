import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Service } from "@shared/schema";

interface MegaMenuItem {
  label: string;
  href?: string;
  category?: string;
}

export function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const isHomePage = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMegaMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  const megaMenuItems: MegaMenuItem[] = [
    { label: "Interior Design & Fit-Out Works", category: "interior-design-fitout" },
    { label: "Wellness Services", category: "wellness-services" },
    { label: "Maintenance Services", category: "maintenance-services" },
  ];

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const getServicesByCategory = (category: string) => {
    return services.filter(s => s.category === category);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" data-testid="link-home">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg font-[Montserrat]">PM</span>
              </div>
              <span className={`text-xl font-bold font-[Montserrat] transition-colors ${isScrolled || !isHomePage ? "text-foreground" : "text-white drop-shadow-lg"}`}>
                The Property Masters
              </span>
            </motion.div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-${link.label.toLowerCase()}`}>
                <span
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    location === link.href
                      ? (isScrolled || !isHomePage) ? "text-primary" : "text-white font-semibold"
                      : (isScrolled || !isHomePage) ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            
            {megaMenuItems.map((item) => (
              <div
                key={item.category}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.category!)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                    (isScrolled || !isHomePage) ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                  data-testid={`menu-${item.category}`}
                >
                  {item.label}
                  <ChevronDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {activeMegaMenu === item.category && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-background border border-border rounded-lg shadow-xl p-6"
                    >
                      <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                        {item.label}
                      </h3>
                      <div className="space-y-2">
                        {getServicesByCategory(item.category!).map((service) => (
                          <Link key={service.id} href={`/services/${service.slug}`}>
                            <div
                              className="p-3 rounded-lg hover-elevate active-elevate-2 cursor-pointer"
                              onClick={() => setActiveMegaMenu(null)}
                              data-testid={`megamenu-service-${service.slug}`}
                            >
                              <h4 className="font-semibold text-sm mb-1">{service.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {service.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/cart" data-testid="link-cart">
              <Button variant={(isScrolled || !isHomePage) ? "ghost" : "outline"} size="icon" className={(!isScrolled && isHomePage) ? "border-white text-white hover:bg-white/10" : ""}>
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/book" data-testid="link-book">
              <Button className="font-medium">Book a Service</Button>
            </Link>
          </div>

          <Button
            variant={(isScrolled || !isHomePage) ? "ghost" : "outline"}
            size="icon"
            className={`lg:hidden ${(!isScrolled && isHomePage) ? "border-white text-white" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <nav className="flex flex-col px-6 py-4 gap-4 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} data-testid={`mobile-link-${link.label.toLowerCase()}`}>
                  <span
                    className={`text-base font-medium transition-colors cursor-pointer block py-2 ${
                      location === link.href ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              
              {megaMenuItems.map((item) => (
                <div key={item.category} className="border-t border-border pt-4">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                    {item.label}
                  </h3>
                  <div className="space-y-2 pl-4">
                    {getServicesByCategory(item.category!).map((service) => (
                      <Link key={service.id} href={`/services/${service.slug}`} onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="py-2 cursor-pointer">
                          <h4 className="font-medium text-sm hover:text-primary transition-colors">
                            {service.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="flex gap-3 pt-2 border-t border-border">
                <Link href="/cart" className="flex-1" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-cart">
                  <Button variant="outline" className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart
                  </Button>
                </Link>
                <Link href="/book" className="flex-1" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-book">
                  <Button className="w-full">Book Service</Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
