import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart, ChevronDown, ChevronRight, Phone, Search, Home, Paintbrush, Building2, Sparkles, Sofa, Wrench, Zap, Droplets, Wind, Shield, Heart, Leaf, Activity, Dumbbell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Mega menu data for services with images
const interiorDesignMenu = {
  title: "Interior Design & Fit-Out Works",
  description: "Transform your spaces with our premium interior design solutions",
  image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
  categories: [
    {
      title: "Residential",
      icon: Home,
      items: [
        { label: "Luxury Villa Design", href: "/interior-design", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=80" },
        { label: "Apartment Interiors", href: "/interior-design", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&q=80" },
        { label: "Penthouse Design", href: "/interior-design", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=80" },
      ]
    },
    {
      title: "Commercial",
      icon: Building2,
      items: [
        { label: "Office Fit-Out", href: "/interior-design", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80" },
        { label: "Retail Spaces", href: "/interior-design", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80" },
        { label: "Hospitality Design", href: "/interior-design", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=80" },
      ]
    },
    {
      title: "Specialized",
      icon: Paintbrush,
      items: [
        { label: "Kitchen Design", href: "/interior-design", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80" },
        { label: "Bathroom Renovation", href: "/interior-design", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=200&q=80" },
        { label: "Custom Furniture", href: "/interior-design", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80" },
      ]
    }
  ],
  featuredLink: { label: "View All Interior Services", href: "/interior-design" }
};

const wellnessMenu = {
  title: "Wellness Services",
  description: "A world of wellness for your family - healthier indoor environments",
  image: "https://images.unsplash.com/photo-1631545806609-11e27e55a72d?w=600&q=80",
  categories: [
    {
      title: "AC & Air Quality",
      icon: Wind,
      items: [
        { label: "AC Cleaning", href: "/wellness/ac-cleaning", image: "https://images.unsplash.com/photo-1631545806609-11e27e55a72d?w=200&q=80" },
        { label: "AC Duct Cleaning", href: "/wellness/ac-duct-cleaning", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&q=80" },
        { label: "Mold Removal", href: "/wellness/mold-removal", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&q=80" },
        { label: "Air Quality Testing", href: "/wellness/air-quality-testing", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80" },
      ]
    },
    {
      title: "Furniture Cleaning",
      icon: Sofa,
      items: [
        { label: "Carpet Cleaning", href: "/wellness/carpet-cleaning", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80" },
        { label: "Mattress Cleaning", href: "/wellness/mattress-cleaning", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&q=80" },
        { label: "Sofa Cleaning", href: "/wellness/furniture-cleaning", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80" },
        { label: "Curtain Cleaning", href: "/wellness/curtain-cleaning", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200&q=80" },
      ]
    },
    {
      title: "Home & Health",
      icon: Heart,
      items: [
        { label: "Deep Cleaning", href: "/wellness/deep-cleaning", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&q=80" },
        { label: "Water Tank Cleaning", href: "/wellness/water-tank", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&q=80" },
        { label: "Pest Control", href: "/wellness/pest-control", image: "https://images.unsplash.com/photo-1632935190508-f9ea39e9bf4e?w=200&q=80" },
        { label: "Painting Services", href: "/wellness/painting", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=200&q=80" },
      ]
    }
  ],
  featuredLink: { label: "View All Wellness Services", href: "/wellness" }
};

const maintenanceMenu = {
  title: "Maintenance Services",
  description: "Keep your property running smoothly with our professional maintenance",
  image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80",
  categories: [
    {
      title: "Essential",
      icon: Zap,
      items: [
        { label: "Electrical Services", href: "/maintenance/electrical", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=200&q=80" },
        { label: "Plumbing Services", href: "/maintenance/plumbing", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=200&q=80" },
        { label: "AC Maintenance", href: "/maintenance/ac-maintenance", image: "https://images.unsplash.com/photo-1631545806609-11e27e55a72d?w=200&q=80" },
      ]
    },
    {
      title: "Property Care",
      icon: Wrench,
      items: [
        { label: "General Maintenance", href: "/maintenance/general", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&q=80" },
        { label: "Handyman Services", href: "/maintenance/handyman", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80" },
        { label: "Painting Services", href: "/maintenance/painting", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=200&q=80" },
      ]
    },
    {
      title: "Programs",
      icon: Shield,
      items: [
        { label: "Annual Maintenance Contract", href: "/maintenance/amc", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&q=80" },
        { label: "Emergency Repairs", href: "/maintenance/emergency", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&q=80" },
        { label: "Property Inspection", href: "/maintenance/inspection", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&q=80" },
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
  const [hoveredCategory, setHoveredCategory] = useState<number>(0);
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
    setHoveredCategory(0);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setHoveredCategory(0);
    }, 150);
  };

  const navItems = [
    { href: "/interior-design", label: "Interior Design", hasMegaMenu: true, menuKey: "interior" },
    { href: "/wellness", label: "Wellness", hasMegaMenu: true, menuKey: "wellness" },
    { href: "/maintenance", label: "Maintenance", hasMegaMenu: true, menuKey: "maintenance" },
    { href: "/shop", label: "Furniture Store" },
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

  return (
    <>
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
            <nav className="hidden lg:flex items-center gap-5">
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
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === item.menuKey ? "rotate-180" : ""}`} />
                      </span>
                    </Link>
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
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === "about" ? "rotate-180" : ""}`} />
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
      </header>

      {/* Full-Width Mega Menu Overlay */}
      <AnimatePresence>
        {activeMenu && activeMenu !== "about" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-16 left-0 right-0 z-[9998] bg-white shadow-2xl border-b border-gray-200"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMenuLeave}
          >
            {(() => {
              const menuData = getMegaMenuData(activeMenu);
              if (!menuData) return null;
              
              return (
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-12 min-h-[400px]">
                    {/* Left Column - Categories List */}
                    <div className="col-span-3 bg-[#F6F4EB] p-6">
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-[#09263D] font-serif">{menuData.title}</h3>
                        <p className="text-sm text-gray-600 mt-2">{menuData.description}</p>
                      </div>
                      
                      <div className="space-y-1">
                        {menuData.categories.map((category, catIndex) => {
                          const Icon = category.icon;
                          return (
                            <div
                              key={category.title}
                              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                hoveredCategory === catIndex 
                                  ? "bg-[#970A44] text-white" 
                                  : "hover:bg-white/80 text-gray-700"
                              }`}
                              onMouseEnter={() => setHoveredCategory(catIndex)}
                            >
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                hoveredCategory === catIndex ? "bg-white/20" : "bg-[#970A44]/10"
                              }`}>
                                <Icon className={`w-5 h-5 ${hoveredCategory === catIndex ? "text-white" : "text-[#970A44]"}`} />
                              </div>
                              <span className="font-semibold">{category.title}</span>
                              <ChevronRight className={`w-4 h-4 ml-auto ${hoveredCategory === catIndex ? "text-white" : "text-gray-400"}`} />
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-300">
                        <Link 
                          href={menuData.featuredLink.href}
                          onClick={() => setActiveMenu(null)}
                        >
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#970A44] hover:text-[#720632] transition-colors cursor-pointer">
                            {menuData.featuredLink.label}
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </Link>
                      </div>
                    </div>

                    {/* Middle Column - Service Items Grid */}
                    <div className="col-span-6 p-6 bg-white">
                      <div className="flex items-center gap-2 mb-6">
                        {(() => {
                          const Icon = menuData.categories[hoveredCategory].icon;
                          return <Icon className="w-5 h-5 text-[#970A44]" />;
                        })()}
                        <h4 className="text-lg font-bold text-[#09263D]">
                          {menuData.categories[hoveredCategory].title}
                        </h4>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {menuData.categories[hoveredCategory].items.map((item) => (
                          <Link 
                            key={item.label} 
                            href={item.href}
                            onClick={() => setActiveMenu(null)}
                          >
                            <motion.div 
                              className="group flex items-center gap-4 p-3 rounded-xl hover:bg-[#F6F4EB] transition-all cursor-pointer"
                              whileHover={{ x: 4 }}
                            >
                              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                <img 
                                  src={item.image} 
                                  alt={item.label}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="flex-1">
                                <span className="font-medium text-gray-900 group-hover:text-[#970A44] transition-colors block">
                                  {item.label}
                                </span>
                                <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                  Learn more <ArrowRight className="w-3 h-3" />
                                </span>
                              </div>
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Right Column - Featured Image */}
                    <div className="col-span-3 relative overflow-hidden">
                      <div className="absolute inset-0">
                        <img 
                          src={menuData.image}
                          alt={menuData.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#09263D]/90 via-[#09263D]/40 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h4 className="text-lg font-bold mb-2">Need Expert Advice?</h4>
                        <p className="text-sm text-white/80 mb-4">
                          Our consultants are ready to help you choose the perfect solution.
                        </p>
                        <Link href="/book" onClick={() => setActiveMenu(null)}>
                          <Button className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-6">
                            Book Free Consultation
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
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
            className="lg:hidden fixed top-16 left-0 right-0 bg-background border-b border-border z-[9997]"
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

              {/* Furniture Store */}
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} data-testid="mobile-link-shop">
                <span className={`text-base font-medium transition-colors cursor-pointer block py-3 border-b border-border ${
                  location === "/shop" ? "text-[#970A44] font-semibold" : "text-foreground hover:text-[#970A44]"
                }`}>
                  Furniture Store
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
    </>
  );
}
