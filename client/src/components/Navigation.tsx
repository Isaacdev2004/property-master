import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart, ChevronDown, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Service } from "@shared/schema";
import heroImage from "@assets/generated_images/luxury_living_room_hero_1b740bbd.png";

export function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
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

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  const serviceCategories = [
    { 
      id: "interior-design-fitout", 
      label: "Interior Design & Fit-Out",
    },
    { 
      id: "wellness-services", 
      label: "Wellness Services",
    },
    { 
      id: "maintenance-services", 
      label: "Maintenance Services",
    },
  ];

  const navItems = [
    { href: "/", label: "Home" },
    { href: null, label: "Services", hasDropdown: true },
    { href: "/portfolio", label: "Projects" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Appointments" },
    { href: "/blog", label: "Blog" },
  ];

  const getServicesByCategory = (category: string) => {
    return services.filter(s => s.category === category);
  };

  const navTextClass = (isScrolled || !isHomePage) 
    ? "text-gray-900 hover:text-[#970A44]" 
    : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-[#970A44]";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-black/40 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo + Phone */}
          <div className="flex items-center gap-4">
            <Link href="/" data-testid="link-home">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
                  isScrolled || !isHomePage 
                    ? "bg-[#970A44]" 
                    : "bg-white/90"
                }`}>
                  <span className={`font-bold text-lg font-[Montserrat] ${
                    isScrolled || !isHomePage ? "text-white" : "text-[#970A44]"
                  }`}>PM</span>
                </div>
              </motion.div>
            </Link>

            {/* Phone Number */}
            <a 
              href="tel:+97125500888" 
              className="hidden md:flex items-center gap-2"
              data-testid="link-phone"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isScrolled || !isHomePage ? "bg-[#970A44]" : "bg-white/90"
              }`}>
                <Phone className={`w-4 h-4 ${
                  isScrolled || !isHomePage ? "text-white" : "text-[#970A44]"
                }`} />
              </div>
              <span className={`text-sm font-semibold ${
                isScrolled || !isHomePage 
                  ? "text-gray-900" 
                  : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              }`}>
                +971 2550 0888
              </span>
            </a>
          </div>

          {/* Center: Main Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item, index) => (
              item.hasDropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`text-sm font-semibold transition-all flex items-center gap-1 py-2 ${navTextClass} ${
                      isServicesOpen ? "text-[#970A44]" : ""
                    }`}
                    data-testid="menu-services"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
              ) : (
                <Link key={`${item.href}-${index}`} href={item.href!} data-testid={`link-${item.label.toLowerCase()}`}>
                  <span
                    className={`text-sm font-semibold transition-all cursor-pointer ${
                      location === item.href
                        ? "text-[#970A44]" 
                        : navTextClass
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            ))}
          </nav>

          {/* Right side: Icons + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button 
              variant={(isScrolled || !isHomePage) ? "ghost" : "outline"} 
              size="icon" 
              className={`${(!isScrolled && isHomePage) ? "border-white/50 text-white hover:bg-white/10" : ""}`}
              data-testid="button-search"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Link href="/cart" data-testid="link-cart">
              <Button 
                variant={(isScrolled || !isHomePage) ? "ghost" : "outline"} 
                size="icon" 
                className={`${(!isScrolled && isHomePage) ? "border-white/50 text-white hover:bg-white/10" : ""}`}
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact" data-testid="link-consultation">
              <Button 
                className="bg-[#970A44] hover:bg-[#720632] text-white font-semibold rounded-full px-6"
              >
                Book Consult
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {isServicesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex gap-6">
                {/* Left Section - Essential with Image */}
                <div className="w-64 flex-shrink-0">
                  <div className="bg-gray-50 rounded-xl p-4 h-full">
                    <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={heroImage} 
                        alt="Our Services" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">Essential</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Real fit interiors to your own life of, ut enim ad minim et cique magna aliqua. Eno autem veniam quis nostrud.
                    </p>
                  </div>
                </div>

                {/* Middle Section - Service Categories in 4 Columns */}
                <div className="flex-1 grid grid-cols-4 gap-6">
                  {serviceCategories.map((category) => (
                    <div key={category.id}>
                      <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                        {category.label}
                      </h4>
                      <ul className="space-y-2">
                        {getServicesByCategory(category.id).slice(0, 8).map((service) => (
                          <li key={service.id}>
                            <Link href={`/services/${service.slug}`}>
                              <span
                                className="text-sm text-gray-700 hover:text-[#970A44] transition-colors cursor-pointer block py-0.5"
                                onClick={() => setIsServicesOpen(false)}
                                data-testid={`megamenu-service-${service.slug}`}
                              >
                                {service.title}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Additional Column for Training/Other */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                      Training & Support
                    </h4>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/services">
                          <span className="text-sm text-gray-700 hover:text-[#970A44] transition-colors cursor-pointer block py-0.5">
                            Social Media Management
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services">
                          <span className="text-sm text-gray-700 hover:text-[#970A44] transition-colors cursor-pointer block py-0.5">
                            Delivery Apps Management
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services">
                          <span className="text-sm text-gray-700 hover:text-[#970A44] transition-colors cursor-pointer block py-0.5">
                            Food Safety Training
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services">
                          <span className="text-sm text-gray-700 hover:text-[#970A44] transition-colors cursor-pointer block py-0.5">
                            Fire Safety Training
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services">
                          <span className="text-sm text-gray-700 hover:text-[#970A44] transition-colors cursor-pointer block py-0.5">
                            PIC Training
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Section - Promo + CTA Button */}
                <div className="w-48 flex-shrink-0 flex flex-col justify-between">
                  {/* Promo Box */}
                  <div className="bg-gradient-to-br from-[#970A44] to-[#720632] rounded-xl p-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-80">
                      Limited Offer
                    </p>
                    <p className="text-lg font-bold mb-2">
                      Free Design Consultation
                    </p>
                    <p className="text-xs opacity-90 leading-relaxed">
                      Book now and get a complimentary 3D visualization for your project
                    </p>
                  </div>
                  
                  {/* CTA Button */}
                  <Link href="/services" onClick={() => setIsServicesOpen(false)} className="w-full mt-4">
                    <Button 
                      className="w-full bg-[#970A44] hover:bg-[#720632] text-white font-semibold rounded-md py-5"
                      data-testid="button-view-all-services"
                    >
                      View All Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <nav className="flex flex-col px-6 py-4 gap-4 max-h-[80vh] overflow-y-auto">
              {/* Home Link */}
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-home">
                <span className={`text-base font-medium transition-colors cursor-pointer block py-2 ${
                  location === "/" ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                }`}>
                  Home
                </span>
              </Link>

              {/* Services Overview Link */}
              <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-services">
                <span className="text-base font-medium transition-colors cursor-pointer block py-2 text-[#970A44] font-semibold">
                  All Services
                </span>
              </Link>

              {/* Service Categories */}
              {serviceCategories.map((category) => (
                <div key={category.id} className="border-b border-border pb-4">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                    {category.label}
                  </h3>
                  <div className="space-y-2 pl-4">
                    {getServicesByCategory(category.id).map((service) => (
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

              {/* Other Links */}
              <Link href="/portfolio" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-projects">
                <span className="text-base font-medium transition-colors cursor-pointer block py-2 hover:text-primary">
                  Projects
                </span>
              </Link>
              <Link href="/portfolio" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-portfolio">
                <span className="text-base font-medium transition-colors cursor-pointer block py-2 hover:text-primary">
                  Portfolio
                </span>
              </Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-appointments">
                <span className="text-base font-medium transition-colors cursor-pointer block py-2 hover:text-primary">
                  Appointments
                </span>
              </Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-blog">
                <span className="text-base font-medium transition-colors cursor-pointer block py-2 hover:text-primary">
                  Blog
                </span>
              </Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-about">
                <span className="text-base font-medium transition-colors cursor-pointer block py-2 hover:text-primary">
                  About
                </span>
              </Link>
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-shop">
                <span className="text-base font-medium transition-colors cursor-pointer block py-2 hover:text-primary">
                  Shop
                </span>
              </Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-contact">
                <span className="text-base font-medium transition-colors cursor-pointer block py-2 hover:text-primary">
                  Contact
                </span>
              </Link>
              
              <div className="pt-2 border-t border-border space-y-2">
                <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-cart">
                  <Button variant="outline" className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart
                  </Button>
                </Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#970A44] hover:bg-[#720632]">
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
