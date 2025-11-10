import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg font-[Montserrat]">PM</span>
              </div>
              <span className="text-lg font-bold font-[Montserrat]">The Property Masters</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transforming spaces with premium interior design and professional maintenance services.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="rounded-full" data-testid="button-facebook">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" data-testid="button-instagram">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" data-testid="button-linkedin">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4 font-[Montserrat]">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/interior-design" data-testid="link-footer-interior-design">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Interior Design
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services/home-maintenance" data-testid="link-footer-home-maintenance">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Home Maintenance
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services/commercial-maintenance" data-testid="link-footer-commercial-maintenance">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Commercial Maintenance
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4 font-[Montserrat]">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/portfolio" data-testid="link-footer-portfolio">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">Portfolio</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" data-testid="link-footer-blog">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/shop" data-testid="link-footer-shop">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">Shop</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" data-testid="link-footer-contact">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-4 font-[Montserrat]">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Design Street, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+971 50 123 4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@propertymasters.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} The Property Masters. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" data-testid="link-privacy">
                <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms" data-testid="link-terms">
                <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
