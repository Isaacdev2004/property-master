import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart, ChevronDown, ChevronRight, Phone, Search, Home, Paintbrush, Building2, Sofa, Wrench, Zap, Droplets, Wind, Shield, Heart, Sparkles, Bath, UtensilsCrossed, Bed, Lamp, Clock, FlameKindling, Bug, Waves, TestTube, Stethoscope, Baby, Dumbbell, Truck, PaintBucket, Wifi, Hammer, ArrowRight, Star, Users, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Comprehensive mega menu data with ALL services
const interiorDesignMenu = {
  title: "Interior Design & Fit-Out",
  subtitle: "Transform Your Space",
  stats: { projects: "500+", clients: "1000+", years: "15+" },
  categories: [
    {
      title: "Residential Design",
      icon: Home,
      color: "#970A44",
      services: [
        { label: "Luxury Villa Design", href: "/interior-design/villa", desc: "Complete villa transformation" },
        { label: "Apartment Interiors", href: "/interior-design/apartment", desc: "Modern living spaces" },
        { label: "Penthouse Design", href: "/interior-design/penthouse", desc: "Sky-high luxury" },
        { label: "Townhouse Renovation", href: "/interior-design/townhouse", desc: "Urban elegance" },
        { label: "Studio Apartments", href: "/interior-design/studio", desc: "Smart space solutions" },
      ]
    },
    {
      title: "Commercial Spaces",
      icon: Building2,
      color: "#1C4668",
      services: [
        { label: "Office Fit-Out", href: "/interior-design/office", desc: "Productive workspaces" },
        { label: "Retail Store Design", href: "/interior-design/retail", desc: "Customer experience" },
        { label: "Restaurant & Café", href: "/interior-design/restaurant", desc: "Dining ambiance" },
        { label: "Hotel & Hospitality", href: "/interior-design/hotel", desc: "Guest experience" },
        { label: "Showroom Design", href: "/interior-design/showroom", desc: "Display excellence" },
      ]
    },
    {
      title: "Room Specific",
      icon: Paintbrush,
      color: "#09263D",
      services: [
        { label: "Kitchen Design", href: "/interior-design/kitchen", desc: "Culinary spaces" },
        { label: "Bathroom Renovation", href: "/interior-design/bathroom", desc: "Spa-like retreats" },
        { label: "Bedroom Interiors", href: "/interior-design/bedroom", desc: "Restful sanctuaries" },
        { label: "Living Room Design", href: "/interior-design/living-room", desc: "Entertainment hubs" },
        { label: "Home Office", href: "/interior-design/home-office", desc: "Work from home" },
      ]
    },
    {
      title: "Specialized Services",
      icon: Sparkles,
      color: "#720632",
      services: [
        { label: "Custom Furniture", href: "/interior-design/custom-furniture", desc: "Bespoke pieces" },
        { label: "Lighting Design", href: "/interior-design/lighting", desc: "Ambiance creation" },
        { label: "False Ceiling", href: "/interior-design/ceiling", desc: "Architectural detail" },
        { label: "Flooring Solutions", href: "/interior-design/flooring", desc: "Foundation beauty" },
        { label: "Wall Treatments", href: "/interior-design/walls", desc: "Texture & color" },
      ]
    }
  ],
  featured: {
    title: "Free Design Consultation",
    desc: "Get expert advice on your project",
    cta: "Book Now",
    href: "/book"
  }
};

const wellnessMenu = {
  title: "Wellness Services",
  subtitle: "Healthier Living Spaces",
  stats: { customers: "61,000+", rating: "4.9/5", reviews: "7,000+" },
  categories: [
    {
      title: "AC & Air Quality",
      icon: Wind,
      color: "#970A44",
      services: [
        { label: "AC Cleaning", href: "/wellness/ac-cleaning", desc: "Deep cleaning service" },
        { label: "AC Coil Cleaning", href: "/wellness/ac-coil-cleaning", desc: "Efficiency boost" },
        { label: "AC Duct Cleaning", href: "/wellness/ac-duct-cleaning", desc: "Ductwork sanitization" },
        { label: "AC Mold Removal", href: "/wellness/mold-removal", desc: "Mold elimination" },
        { label: "AC Repair & Service", href: "/wellness/ac-repair", desc: "Expert repairs" },
        { label: "AC Installation", href: "/wellness/ac-installation", desc: "New unit setup" },
        { label: "Air Quality Testing", href: "/wellness/air-quality-testing", desc: "Indoor air analysis" },
      ]
    },
    {
      title: "Furniture & Fabric",
      icon: Sofa,
      color: "#1C4668",
      services: [
        { label: "Carpet Cleaning", href: "/wellness/carpet-cleaning", desc: "Deep extraction" },
        { label: "Mattress Cleaning", href: "/wellness/mattress-cleaning", desc: "Allergen removal" },
        { label: "Sofa & Upholstery", href: "/wellness/furniture-cleaning", desc: "Fabric revival" },
        { label: "Curtain Cleaning", href: "/wellness/curtain-cleaning", desc: "Drape restoration" },
        { label: "Leather Care", href: "/wellness/leather-cleaning", desc: "Premium leather" },
        { label: "Rug Cleaning", href: "/wellness/rug-cleaning", desc: "Oriental & area rugs" },
        { label: "Nano Coating", href: "/wellness/nano-coating", desc: "Stain protection" },
      ]
    },
    {
      title: "Home Deep Cleaning",
      icon: Sparkles,
      color: "#09263D",
      services: [
        { label: "Move-In/Out Cleaning", href: "/wellness/deep-cleaning", desc: "Complete refresh" },
        { label: "Premium Deep Clean", href: "/wellness/premium-cleaning", desc: "Intensive cleaning" },
        { label: "Kitchen Deep Clean", href: "/wellness/kitchen-cleaning", desc: "Grease & grime" },
        { label: "Bathroom Sanitization", href: "/wellness/bathroom-cleaning", desc: "Hygiene focus" },
        { label: "Post-Construction", href: "/wellness/post-construction", desc: "Debris removal" },
        { label: "Party Clean-Up", href: "/wellness/party-cleanup", desc: "Event aftermath" },
      ]
    },
    {
      title: "Water & Tanks",
      icon: Droplets,
      color: "#720632",
      services: [
        { label: "Water Tank Cleaning", href: "/wellness/water-tank", desc: "Tank sanitization" },
        { label: "Pipeline Disinfection", href: "/wellness/pipeline", desc: "Pipe cleaning" },
        { label: "Water Filter Install", href: "/wellness/water-filter", desc: "Filtration systems" },
        { label: "Whole House Filtration", href: "/wellness/whole-house-filter", desc: "Complete solution" },
        { label: "Water Quality Test", href: "/wellness/water-testing", desc: "Quality analysis" },
      ]
    },
    {
      title: "Pest Control",
      icon: Bug,
      color: "#970A44",
      services: [
        { label: "Bed Bug Treatment", href: "/wellness/pest-control", desc: "Complete elimination" },
        { label: "Cockroach Control", href: "/wellness/cockroach-control", desc: "Roach removal" },
        { label: "Rodent Control", href: "/wellness/rodent-control", desc: "Mouse & rat" },
        { label: "Termite Treatment", href: "/wellness/termite-control", desc: "Wood protection" },
        { label: "Mosquito Control", href: "/wellness/mosquito-control", desc: "Outdoor comfort" },
        { label: "General Pest Control", href: "/wellness/general-pest", desc: "All-in-one" },
      ]
    },
    {
      title: "Personal Wellness",
      icon: Heart,
      color: "#1C4668",
      services: [
        { label: "Healthcare at Home", href: "/wellness/healthcare", desc: "Medical services" },
        { label: "IV Drip Therapy", href: "/wellness/iv-drip", desc: "Vitamin infusion" },
        { label: "Spa & Beauty", href: "/wellness/spa-beauty", desc: "Home pampering" },
        { label: "Physiotherapy", href: "/wellness/physiotherapy", desc: "Physical therapy" },
        { label: "Nutrition Consult", href: "/wellness/nutrition", desc: "Diet planning" },
        { label: "Fitness Training", href: "/wellness/fitness", desc: "Personal trainer" },
      ]
    }
  ],
  featured: {
    title: "Same Day Service",
    desc: "Book before 12 PM for same-day service",
    cta: "Book Today",
    href: "/book"
  }
};

const maintenanceMenu = {
  title: "Maintenance Services",
  subtitle: "Hassle-Free Property Care",
  stats: { years: "40+", customers: "3,000+", properties: "2,500+" },
  categories: [
    {
      title: "Electrical",
      icon: Zap,
      color: "#970A44",
      services: [
        { label: "Electrical Repairs", href: "/maintenance/electrical", desc: "Wiring & fixtures" },
        { label: "Light Installation", href: "/maintenance/lighting", desc: "Indoor & outdoor" },
        { label: "Socket & Switch", href: "/maintenance/sockets", desc: "Outlets & switches" },
        { label: "Circuit Breaker", href: "/maintenance/circuit", desc: "Panel services" },
        { label: "Smart Home Wiring", href: "/maintenance/smart-wiring", desc: "Automation ready" },
      ]
    },
    {
      title: "Plumbing",
      icon: Droplets,
      color: "#1C4668",
      services: [
        { label: "Leak Repair", href: "/maintenance/plumbing", desc: "Stop water damage" },
        { label: "Drain Cleaning", href: "/maintenance/drain", desc: "Unclog drains" },
        { label: "Pipe Installation", href: "/maintenance/pipes", desc: "New plumbing" },
        { label: "Water Heater", href: "/maintenance/water-heater", desc: "Hot water systems" },
        { label: "Toilet & Fixtures", href: "/maintenance/fixtures", desc: "Bathroom repairs" },
      ]
    },
    {
      title: "AC & HVAC",
      icon: Wind,
      color: "#09263D",
      services: [
        { label: "AC Maintenance", href: "/maintenance/ac-maintenance", desc: "Regular servicing" },
        { label: "AC Repair", href: "/maintenance/ac-repair", desc: "Fix breakdowns" },
        { label: "AC Installation", href: "/maintenance/ac-install", desc: "New unit setup" },
        { label: "Duct Work", href: "/maintenance/ductwork", desc: "Duct repair" },
        { label: "Thermostat Setup", href: "/maintenance/thermostat", desc: "Temperature control" },
      ]
    },
    {
      title: "General Repairs",
      icon: Wrench,
      color: "#720632",
      services: [
        { label: "Handyman Services", href: "/maintenance/handyman", desc: "All-around repairs" },
        { label: "Door & Lock Repair", href: "/maintenance/doors", desc: "Security fixes" },
        { label: "Furniture Assembly", href: "/maintenance/assembly", desc: "Build & install" },
        { label: "Wall Mounting", href: "/maintenance/mounting", desc: "TV & shelves" },
        { label: "Minor Carpentry", href: "/maintenance/carpentry", desc: "Wood repairs" },
      ]
    },
    {
      title: "Painting & Walls",
      icon: PaintBucket,
      color: "#970A44",
      services: [
        { label: "Interior Painting", href: "/maintenance/painting", desc: "Room makeover" },
        { label: "Exterior Painting", href: "/maintenance/exterior-paint", desc: "Facade refresh" },
        { label: "Wall Repair", href: "/maintenance/wall-repair", desc: "Patch & fix" },
        { label: "Wallpaper Install", href: "/maintenance/wallpaper", desc: "Design accent" },
        { label: "Waterproofing", href: "/maintenance/waterproofing", desc: "Moisture barrier" },
      ]
    },
    {
      title: "Property Programs",
      icon: Shield,
      color: "#1C4668",
      services: [
        { label: "Annual Contract (AMC)", href: "/maintenance/amc", desc: "Year-round care" },
        { label: "Emergency Repairs", href: "/maintenance/emergency", desc: "24/7 response" },
        { label: "Property Inspection", href: "/maintenance/inspection", desc: "Full assessment" },
        { label: "Preventive Maintenance", href: "/maintenance/preventive", desc: "Avoid breakdowns" },
        { label: "Seasonal Service", href: "/maintenance/seasonal", desc: "Summer/winter prep" },
      ]
    }
  ],
  featured: {
    title: "Emergency Response",
    desc: "24/7 emergency repair services",
    cta: "Call Now",
    href: "/contact"
  }
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                <div className="w-full">
                  {/* Header Bar */}
                  <div className="bg-gradient-to-r from-[#09263D] to-[#1C4668] text-white py-4 px-8">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold font-serif">{menuData.title}</h2>
                        <p className="text-white/80 text-sm">{menuData.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-8">
                        {Object.entries(menuData.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-xl font-bold text-[#F6F4EB]">{value}</div>
                            <div className="text-xs text-white/70 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Services Grid */}
                  <div className="max-w-7xl mx-auto px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                      {menuData.categories.map((category, catIndex) => {
                        const Icon = category.icon;
                        return (
                          <div key={category.title} className="space-y-3">
                            {/* Category Header */}
                            <div className="flex items-center gap-2 pb-2 border-b-2" style={{ borderColor: category.color }}>
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${category.color}15` }}
                              >
                                <Icon className="w-4 h-4" style={{ color: category.color }} />
                              </div>
                              <h3 className="font-bold text-sm text-[#09263D]">{category.title}</h3>
                            </div>
                            
                            {/* Service Links */}
                            <ul className="space-y-1">
                              {category.services.map((service) => (
                                <li key={service.label}>
                                  <Link 
                                    href={service.href}
                                    onClick={() => setActiveMenu(null)}
                                  >
                                    <span className="group flex items-start gap-1 py-1.5 cursor-pointer">
                                      <ChevronRight className="w-3 h-3 mt-0.5 text-gray-400 group-hover:text-[#970A44] transition-colors flex-shrink-0" />
                                      <span className="text-xs text-gray-700 group-hover:text-[#970A44] transition-colors leading-tight">
                                        {service.label}
                                      </span>
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Satisfaction Guaranteed</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>5-Star Rated Services</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4 text-[#970A44]" />
                          <span>Certified Professionals</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Link href={activeMenu === "interior" ? "/interior-design" : activeMenu === "wellness" ? "/wellness" : "/maintenance"} onClick={() => setActiveMenu(null)}>
                          <Button variant="outline" className="border-[#970A44] text-[#970A44] hover:bg-[#970A44] hover:text-white rounded-full px-6">
                            View All Services
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                        <Link href={menuData.featured.href} onClick={() => setActiveMenu(null)}>
                          <Button className="bg-[#970A44] hover:bg-[#720632] text-white rounded-full px-6">
                            {menuData.featured.cta}
                            <ArrowRight className="w-4 h-4 ml-2" />
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
