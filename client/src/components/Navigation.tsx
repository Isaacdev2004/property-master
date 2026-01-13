import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart, ChevronDown, Phone, Search, Home, Paintbrush, Building2, Sparkles, Sofa, Wrench, Zap, Droplets, Wind, Shield, Heart, Leaf, Activity, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Mega menu data for services
const interiorDesignMenu = {
  title: "Interior Design & Fit-Out Works",
  description: "Transform your spaces with our premium interior design solutions",
  categories: [
    {
      title: "Residential",
      items: [
        { label: "Luxury Villa Design", href: "/interior-design" },
        { label: "Apartment Interiors", href: "/interior-design" },
        { label: "Penthouse Design", href: "/interior-design" },
      ]
    },
    {
      title: "Commercial",
      items: [
        { label: "Office Fit-Out", href: "/interior-design" },
        { label: "Retail Spaces", href: "/interior-design" },
        { label: "Hospitality Design", href: "/interior-design" },
      ]
    },
    {
      title: "Specialized",
      items: [
        { label: "Kitchen Design", href: "/interior-design" },
        { label: "Bathroom Renovation", href: "/interior-design" },
        { label: "Custom Furniture", href: "/interior-design" },
      ]
    }
  ],
  featuredLink: { label: "View All Interior Services", href: "/interior-design" }
};

const wellnessMenu = {
  title: "Wellness Services",
  description: "Create healthier indoor environments for your family",
  categories: [
    {
      title: "Air Quality",
      items: [
        { label: "AC Cleaning & Sanitization", href: "/wellness" },
        { label: "Duct Cleaning", href: "/wellness" },
        { label: "Air Quality Testing", href: "/wellness" },
      ]
    },
    {
      title: "Hygiene & Cleaning",
      items: [
        { label: "Deep Cleaning", href: "/wellness" },
        { label: "Mattress & Sofa Cleaning", href: "/wellness" },
        { label: "Carpet Cleaning", href: "/wellness" },
      ]
    },
    {
      title: "Health Services",
      items: [
        { label: "Mold Removal", href: "/wellness" },
        { label: "Water Tank Cleaning", href: "/wellness" },
        { label: "Pest Control", href: "/wellness" },
      ]
    }
  ],
  featuredLink: { label: "View All Wellness Services", href: "/wellness" }
};

const maintenanceMenu = {
  title: "Maintenance Services",
  description: "Keep your property running smoothly with our professional maintenance",
  categories: [
    {
      title: "Essential",
      items: [
        { label: "Electrical Services", href: "/maintenance" },
        { label: "Plumbing Services", href: "/maintenance" },
        { label: "AC Maintenance", href: "/maintenance" },
      ]
    },
    {
      title: "Property Care",
      items: [
        { label: "General Maintenance", href: "/maintenance" },
        { label: "Handyman Services", href: "/maintenance" },
        { label: "Painting Services", href: "/maintenance" },
      ]
    },
    {
      title: "Programs",
      items: [
        { label: "Annual Maintenance Contract", href: "/maintenance" },
        { label: "Emergency Repairs", href: "/maintenance" },
        { label: "Property Inspection", href: "/maintenance" },
      ]
    }
  ],
  featuredLink: { label: "View All Maintenance Services", href: "/maintenance" }
};

export function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const isHomePage = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuEnter = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menuName);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const navItems = [
    { href: "/interior-design", label: "Interior Design", hasMegaMenu: true, menuKey: "interior" },
    { href: "/wellness", label: "Wellness", hasMegaMenu: true, menuKey: "wellness" },
    { href: "/maintenance", label: "Maintenance Services", hasMegaMenu: true, menuKey: "maintenance" },
    { href: "/portfolio", label: "Portfolio" },
    { href: null, label: "About", hasDropdown: true },
    { href: "/blog", label: "Blogs" },
  ];

  const aboutDropdownItems = [
    { href: "/about", label: "About Us" },
    { href: "/about#journey", label: "Our Journey" },
  ];

  const navTextClass = (isScrolled || !isHomePage) 
    ? "text-gray-900 hover:text-[#970A44]" 
    : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-[#970A44]";

  const getMegaMenuData = (menuKey: string) => {
    switch (menuKey) {
      case "interior": return interiorDesignMenu;
      case "wellness": return wellnessMenu;
      case "maintenance": return maintenanceMenu;
      default: return null;
    }
  };

  const getCategoryIcon = (menuKey: string, categoryIndex: number) => {
    const icons = {
      interior: [Home, Building2, Paintbrush],
      wellness: [Wind, Sparkles, Heart],
      maintenance: [Zap, Wrench, Shield],
    };
    const IconComponent = icons[menuKey as keyof typeof icons]?.[categoryIndex] || Home;
    return <IconComponent className="w-5 h-5 text-[#970A44]" />;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
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
              item.hasMegaMenu ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter(item.menuKey!)}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link href={item.href!} data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span
                      className={`text-sm font-semibold transition-all flex items-center gap-1 py-2 cursor-pointer ${
                        location === item.href ? "text-[#970A44]" : navTextClass
                      } ${activeMenu === item.menuKey ? "text-[#970A44]" : ""}`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === item.menuKey ? "rotate-180" : ""}`} />
                    </span>
                  </Link>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {activeMenu === item.menuKey && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                        onMouseEnter={() => handleMenuEnter(item.menuKey!)}
                        onMouseLeave={handleMenuLeave}
                      >
                        {(() => {
                          const menuData = getMegaMenuData(item.menuKey!);
                          if (!menuData) return null;
                          return (
                            <div className="p-6">
                              {/* Header */}
                              <div className="mb-6 pb-4 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-[#09263D]">{menuData.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{menuData.description}</p>
                              </div>

                              {/* Categories Grid */}
                              <div className="grid grid-cols-3 gap-6">
                                {menuData.categories.map((category, catIndex) => (
                                  <div key={category.title}>
                                    <div className="flex items-center gap-2 mb-3">
                                      {getCategoryIcon(item.menuKey!, catIndex)}
                                      <h4 className="font-semibold text-[#09263D]">{category.title}</h4>
                                    </div>
                                    <ul className="space-y-2">
                                      {category.items.map((subItem) => (
                                        <li key={subItem.label}>
                                          <Link 
                                            href={subItem.href}
                                            onClick={() => setActiveMenu(null)}
                                          >
                                            <span className="text-sm text-gray-600 hover:text-[#970A44] transition-colors cursor-pointer block py-1">
                                              {subItem.label}
                                            </span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>

                              {/* Featured Link */}
                              <div className="mt-6 pt-4 border-t border-gray-100">
                                <Link 
                                  href={menuData.featuredLink.href}
                                  onClick={() => setActiveMenu(null)}
                                >
                                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#970A44] hover:text-[#720632] transition-colors cursor-pointer">
                                    {menuData.featuredLink.label}
                                    <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                                  </span>
                                </Link>
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : item.hasDropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter("about")}
                  onMouseLeave={handleMenuLeave}
                >
                  <button
                    className={`text-sm font-semibold transition-all flex items-center gap-1 py-2 ${navTextClass} ${
                      activeMenu === "about" ? "text-[#970A44]" : ""
                    }`}
                    data-testid="menu-about"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === "about" ? "rotate-180" : ""}`} />
                  </button>

                  {/* About Dropdown */}
                  <AnimatePresence>
                    {activeMenu === "about" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
                        onMouseEnter={() => handleMenuEnter("about")}
                        onMouseLeave={handleMenuLeave}
                      >
                        {aboutDropdownItems.map((dropdownItem) => (
                          <Link 
                            key={dropdownItem.label} 
                            href={dropdownItem.href}
                            onClick={() => setActiveMenu(null)}
                          >
                            <span 
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#970A44] hover:text-white transition-colors cursor-pointer"
                              data-testid={`menu-${dropdownItem.label.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              {dropdownItem.label}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={`${item.href}-${index}`} href={item.href!} data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
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
            <Link href="/book" data-testid="link-consultation">
              <Button 
                className="bg-[#970A44] hover:bg-[#720632] text-white font-semibold rounded-full px-6"
              >
                Get Free Estimate
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <nav className="flex flex-col px-6 py-4 gap-2 max-h-[80vh] overflow-y-auto">
              {/* Interior Design */}
              <Link href="/interior-design" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-interior-design">
                <span className={`text-base font-medium transition-colors cursor-pointer block py-3 border-b border-border ${
                  location === "/interior-design" ? "text-[#970A44] font-semibold" : "text-foreground hover:text-[#970A44]"
                }`}>
                  Interior Design
                </span>
              </Link>

              {/* Wellness */}
              <Link href="/wellness" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-wellness">
                <span className={`text-base font-medium transition-colors cursor-pointer block py-3 border-b border-border ${
                  location === "/wellness" ? "text-[#970A44] font-semibold" : "text-foreground hover:text-[#970A44]"
                }`}>
                  Wellness
                </span>
              </Link>

              {/* Maintenance Services */}
              <Link href="/maintenance" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-maintenance">
                <span className={`text-base font-medium transition-colors cursor-pointer block py-3 border-b border-border ${
                  location === "/maintenance" ? "text-[#970A44] font-semibold" : "text-foreground hover:text-[#970A44]"
                }`}>
                  Maintenance Services
                </span>
              </Link>

              {/* About Section */}
              <div className="py-3 border-b border-border">
                <span className="text-base font-semibold text-[#970A44] block mb-2">About</span>
                <div className="pl-4 space-y-2">
                  <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-about-us">
                    <span className="text-sm text-foreground hover:text-[#970A44] block py-1">
                      About Us
                    </span>
                  </Link>
                  <Link href="/about#journey" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-our-journey">
                    <span className="text-sm text-foreground hover:text-[#970A44] block py-1">
                      Our Journey
                    </span>
                  </Link>
                </div>
              </div>

              {/* Blogs */}
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-blogs">
                <span className={`text-base font-medium transition-colors cursor-pointer block py-3 border-b border-border ${
                  location === "/blog" ? "text-[#970A44] font-semibold" : "text-foreground hover:text-[#970A44]"
                }`}>
                  Blogs
                </span>
              </Link>

              {/* Quick Links */}
              <div className="pt-4 space-y-2">
                <Link href="/portfolio" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-portfolio">
                  <span className="text-sm text-muted-foreground hover:text-[#970A44] block py-2">
                    Portfolio
                  </span>
                </Link>
                <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-shop">
                  <span className="text-sm text-muted-foreground hover:text-[#970A44] block py-2">
                    Shop
                  </span>
                </Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-contact">
                  <span className="text-sm text-muted-foreground hover:text-[#970A44] block py-2">
                    Contact
                  </span>
                </Link>
              </div>
              
              <div className="pt-4 border-t border-border space-y-2">
                <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-cart">
                  <Button variant="outline" className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart
                  </Button>
                </Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#970A44] hover:bg-[#720632]" data-testid="button-mobile-estimate">
                    Get Free Estimate
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
