import { Link } from "wouter";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail, 
  MapPin, 
  Phone,
  ArrowRight,
  Clock,
  Shield,
  Award,
  Headphones
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Complete Home Interiors", href: "/interior-design" },
    { name: "Modular Kitchen", href: "/interior-design/modular-kitchen" },
    { name: "Wardrobe Designs", href: "/interior-design/wardrobe" },
    { name: "Living Room Design", href: "/interior-design/living-room" },
    { name: "Master Bedroom", href: "/interior-design/master-bedroom" },
    { name: "False Ceiling", href: "/interior-design/false-ceiling" },
  ];

  const wellness = [
    { name: "AC Cleaning", href: "/wellness/ac-cleaning" },
    { name: "Carpet Cleaning", href: "/wellness/carpet-cleaning" },
    { name: "Deep Cleaning", href: "/wellness/deep-cleaning" },
    { name: "Pest Control", href: "/wellness/pest-control" },
  ];

  const maintenance = [
    { name: "AC Maintenance", href: "/maintenance/ac" },
    { name: "Plumbing Services", href: "/maintenance/plumbing" },
    { name: "Electrical Services", href: "/maintenance/electrical" },
    { name: "Painting Services", href: "/maintenance/wall-painting" },
    { name: "Maintenance Packages", href: "/maintenance/packages" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Portfolio", href: "/portfolio" },
    { name: "Shop Furniture", href: "/shop" },
    { name: "Blog & Tips", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
    { name: "Book Consultation", href: "/book" },
  ];

  const cities = [
    "UAE", "Pakistan", "UK", "Saudi Arabia"
  ];

  return (
    <footer className="bg-[#09263D] text-white">
      {/* Top CTA Section */}
      <div className="bg-gradient-to-r from-[#970A44] to-[#720632]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-1">Ready to Transform Your Space?</h3>
              <p className="text-white/80 text-sm">Get a free consultation with our design experts today</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                asChild 
                className="bg-white text-[#970A44] hover:bg-white/90 rounded-full px-6"
                data-testid="button-footer-consultation"
              >
                <Link href="/contact">
                  Book Free Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="border-white/50 text-white hover:bg-white/10 rounded-full px-6"
                data-testid="button-footer-call"
              >
                <a href="tel:+971585707110">
                  <Phone className="mr-2 w-4 h-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#970A44]" />
              </div>
              <div>
                <p className="font-semibold text-sm">10 Year Warranty</p>
                <p className="text-xs text-white/60">On all furniture</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#970A44]" />
              </div>
              <div>
                <p className="font-semibold text-sm">45 Day Delivery</p>
                <p className="text-xs text-white/60">Guaranteed timeline</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-[#970A44]" />
              </div>
              <div>
                <p className="font-semibold text-sm">ISO Certified</p>
                <p className="text-xs text-white/60">Quality assured</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Headphones className="w-6 h-6 text-[#970A44]" />
              </div>
              <div>
                <p className="font-semibold text-sm">24/7 Support</p>
                <p className="text-xs text-white/60">Always available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#970A44] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">PM</span>
              </div>
              <span className="text-lg font-bold">The Property Masters</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-sm">
              Dubai's premier property solutions company offering complete interior design, wellness facilities, and maintenance services. Transform your space with our expert team.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full"
                  data-testid="input-newsletter-email"
                />
                <Button 
                  className="bg-[#970A44] hover:bg-[#720632] rounded-full px-4"
                  data-testid="button-newsletter-subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#970A44] rounded-full flex items-center justify-center transition-colors"
                data-testid="link-social-facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#970A44] rounded-full flex items-center justify-center transition-colors"
                data-testid="link-social-instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#970A44] rounded-full flex items-center justify-center transition-colors"
                data-testid="link-social-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#970A44] rounded-full flex items-center justify-center transition-colors"
                data-testid="link-social-youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Interior Design */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-[#970A44]">Interior Design</h4>
            <ul className="space-y-2.5">
              {services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer" data-testid={`link-footer-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Wellness */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-[#970A44]">Wellness Services</h4>
            <ul className="space-y-2.5">
              {wellness.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer" data-testid={`link-footer-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Maintenance */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-[#970A44]">Maintenance</h4>
            <ul className="space-y-2.5">
              {maintenance.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer" data-testid={`link-footer-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-[#970A44]">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer" data-testid={`link-footer-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Cities Row */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-sm mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#970A44] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white/90">AL Saqr Business Tower - Office A-36</p>
                    <p className="text-sm text-white/70">Dubai, UAE</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#970A44] flex-shrink-0" />
                  <div>
                    <a href="tel:+971585707110" className="text-sm text-white/90 hover:text-white transition-colors">
                      +971 585 707 110
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#970A44] flex-shrink-0" />
                  <a href="mailto:Info@thepropertymasters.ae" className="text-sm text-white/90 hover:text-white transition-colors">
                    Info@thepropertymasters.ae
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#970A44] flex-shrink-0" />
                  <p className="text-sm text-white/70">Mon - Sat: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>

            {/* Cities We Serve */}
            <div>
              <h4 className="font-semibold text-sm mb-4">Our Locations</h4>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <span 
                    key={city}
                    className="px-3 py-1.5 bg-white/10 rounded-full text-xs text-white/80 hover:bg-[#970A44] hover:text-white transition-colors cursor-pointer"
                    data-testid={`badge-city-${city.toLowerCase()}`}
                  >
                    {city}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="font-semibold text-sm mb-3">Download Our App</h4>
                <div className="flex gap-3">
                  <a href="#" className="block" data-testid="link-app-store">
                    <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition-colors">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <div>
                        <p className="text-[10px] text-white/60">Download on</p>
                        <p className="text-xs font-semibold">App Store</p>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="block" data-testid="link-play-store">
                    <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition-colors">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.64.71.64 1.19s-.3.92-.64 1.19L17.89 15l-2.5-2.5 2.5-2.5 2.27 1.81zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/>
                      </svg>
                      <div>
                        <p className="text-[10px] text-white/60">Get it on</p>
                        <p className="text-xs font-semibold">Google Play</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/60">
              © {currentYear} The Property Masters. All rights reserved. | Licensed by Dubai DED
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link href="/privacy">
                <span className="text-xs text-white/60 hover:text-white transition-colors cursor-pointer" data-testid="link-privacy">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-xs text-white/60 hover:text-white transition-colors cursor-pointer" data-testid="link-terms">
                  Terms of Service
                </span>
              </Link>
              <Link href="/refund">
                <span className="text-xs text-white/60 hover:text-white transition-colors cursor-pointer" data-testid="link-refund">
                  Refund Policy
                </span>
              </Link>
              <Link href="/sitemap">
                <span className="text-xs text-white/60 hover:text-white transition-colors cursor-pointer" data-testid="link-sitemap">
                  Sitemap
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
