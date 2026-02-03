import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { odooService } from "./odoo";
import { registerObjectStorageRoutes } from "./replit_integrations/object_storage";
import {
  insertServiceSchema,
  insertPortfolioProjectSchema,
  insertProductSchema,
  insertCartItemSchema,
  insertBookingSchema,
  insertBlogPostSchema,
  insertContactInquirySchema,
  insertTestimonialSchema,
  insertSeoSettingsSchema,
  insertSiteSettingsSchema,
  insertPageContentSchema,
  insertTrackingCodeSchema,
  insertLocationPageSchema,
} from "@shared/schema";
import { z } from "zod";

// Simple admin session storage
const adminSessions = new Map<string, { expiresAt: Date }>();

// Admin password from environment - uses SESSION_SECRET
const ADMIN_PASSWORD = process.env.SESSION_SECRET;
if (!ADMIN_PASSWORD && process.env.NODE_ENV === "production") {
  console.error("CRITICAL: SESSION_SECRET environment variable must be set in production");
}

// For development convenience, use a default if not set
const getAdminPassword = () => ADMIN_PASSWORD || "admin123";

// Admin authentication middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.headers["x-admin-session"] as string;
  if (!sessionId) {
    return res.status(401).json({ error: "Admin authentication required" });
  }
  
  const session = adminSessions.get(sessionId);
  if (!session || session.expiresAt < new Date()) {
    adminSessions.delete(sessionId);
    return res.status(401).json({ error: "Session expired" });
  }
  
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Register object storage routes for file uploads
  registerObjectStorageRoutes(app);

  // Services
  app.get("/api/services", async (_req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (service) {
        res.json(service);
      } else {
        res.status(404).json({ error: "Service not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service" });
    }
  });

  // Portfolio Projects
  app.get("/api/portfolio", async (_req, res) => {
    try {
      const projects = await storage.getAllPortfolioProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio projects" });
    }
  });

  // Products
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Cart
  app.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const items = await storage.getCartItems(req.params.sessionId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const validatedData = insertCartItemSchema.parse(req.body);
      const item = await storage.addToCart(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid cart item data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to add item to cart" });
      }
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== "number" || quantity < 1) {
        return res.status(400).json({ error: "Invalid quantity" });
      }
      const item = await storage.updateCartItem(req.params.id, quantity);
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ error: "Cart item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const deleted = await storage.removeFromCart(req.params.id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Cart item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to remove cart item" });
    }
  });

  // Bookings
  app.get("/api/bookings", async (_req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);

      // Attempt to create lead in Odoo CRM
      const odooResult = await odooService.createLead({
        name: `Service Booking: ${validatedData.serviceType} - ${validatedData.fullName}`,
        email: validatedData.email,
        phone: validatedData.phone,
        description: `
Service Type: ${validatedData.serviceType}
Preferred Date: ${validatedData.preferredDate}
Preferred Time: ${validatedData.preferredTime}
Address: ${validatedData.address}, ${validatedData.city}
${validatedData.message ? `Message: ${validatedData.message}` : ""}
        `.trim(),
        type: "opportunity",
      });

      res.status(201).json({
        booking,
        odooIntegration: {
          enabled: odooService.isAvailable(),
          success: odooResult.success,
          leadId: odooResult.leadId,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid booking data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create booking" });
      }
    }
  });

  // Blog Posts
  app.get("/api/blog", async (_req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: "Blog post not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Contact Inquiries
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);

      // Attempt to create lead in Odoo CRM
      const odooResult = await odooService.createLead({
        name: `Contact Inquiry: ${validatedData.subject} - ${validatedData.fullName}`,
        email: validatedData.email,
        phone: validatedData.phone,
        description: `
Subject: ${validatedData.subject}
Message: ${validatedData.message}
        `.trim(),
        type: "lead",
      });

      res.status(201).json({
        inquiry,
        odooIntegration: {
          enabled: odooService.isAvailable(),
          success: odooResult.success,
          leadId: odooResult.leadId,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid inquiry data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create inquiry" });
      }
    }
  });

  // ============ ADMIN ROUTES ============

  // Admin Authentication - using obscure endpoint for security
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
  const ADMIN_PASSWORD = getAdminPassword();
  
  app.post("/api/cms-portal-x7k9/auth", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Validate both username and password
      if (!username || !password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const sessionId = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      adminSessions.set(sessionId, { expiresAt });
      
      res.json({ sessionId, expiresAt });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", async (req, res) => {
    const sessionId = req.headers["x-admin-session"] as string;
    if (sessionId) {
      adminSessions.delete(sessionId);
    }
    res.json({ success: true });
  });

  app.get("/api/admin/verify", requireAdmin, async (_req, res) => {
    res.json({ authenticated: true });
  });

  // Admin Blog Posts CRUD
  app.get("/api/admin/posts", requireAdmin, async (_req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.post("/api/admin/posts", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid post data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create post" });
      }
    }
  });

  app.patch("/api/admin/posts/:id", requireAdmin, async (req, res) => {
    try {
      const partialPostSchema = insertBlogPostSchema.partial();
      const validatedData = partialPostSchema.parse(req.body);
      const updated = await storage.updateBlogPost(req.params.id, validatedData);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid post data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update post" });
      }
    }
  });

  app.delete("/api/admin/posts/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteBlogPost(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  // Admin Products CRUD
  app.get("/api/admin/products", requireAdmin, async (_req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.post("/api/admin/products", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid product data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create product" });
      }
    }
  });

  app.patch("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const partialProductSchema = insertProductSchema.partial();
      const validatedData = partialProductSchema.parse(req.body);
      const updated = await storage.updateProduct(req.params.id, validatedData);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid product data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update product" });
      }
    }
  });

  app.delete("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteProduct(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Admin Testimonials CRUD
  app.get("/api/admin/testimonials", requireAdmin, async (_req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/admin/testimonials", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid testimonial data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create testimonial" });
      }
    }
  });

  app.patch("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const partialTestimonialSchema = insertTestimonialSchema.partial();
      const validatedData = partialTestimonialSchema.parse(req.body);
      const updated = await storage.updateTestimonial(req.params.id, validatedData);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: "Testimonial not found" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid testimonial data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update testimonial" });
      }
    }
  });

  app.delete("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteTestimonial(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Testimonial not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete testimonial" });
    }
  });

  // Admin Services CRUD
  app.get("/api/admin/services", requireAdmin, async (_req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.patch("/api/admin/services/:id", requireAdmin, async (req, res) => {
    try {
      const partialServiceSchema = insertServiceSchema.partial();
      const validatedData = partialServiceSchema.parse(req.body);
      const updated = await storage.updateService(req.params.id, validatedData);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: "Service not found" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid service data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update service" });
      }
    }
  });

  // Admin Portfolio CRUD
  app.get("/api/admin/portfolio", requireAdmin, async (_req, res) => {
    try {
      const projects = await storage.getAllPortfolioProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch portfolio" });
    }
  });

  app.patch("/api/admin/portfolio/:id", requireAdmin, async (req, res) => {
    try {
      const partialPortfolioSchema = insertPortfolioProjectSchema.partial();
      const validatedData = partialPortfolioSchema.parse(req.body);
      const updated = await storage.updatePortfolioProject(req.params.id, validatedData);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: "Project not found" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid project data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update project" });
      }
    }
  });

  // Admin Bookings (read-only)
  app.get("/api/admin/bookings", requireAdmin, async (_req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  // Admin Contact Inquiries
  app.get("/api/admin/inquiries", requireAdmin, async (_req, res) => {
    try {
      const inquiries = await storage.getAllContactInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inquiries" });
    }
  });

  app.delete("/api/admin/inquiries/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteContactInquiry(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Inquiry not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete inquiry" });
    }
  });

  // Admin Services - Full CRUD (create new service pages)
  app.post("/api/admin/services", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid service data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create service" });
      }
    }
  });

  app.delete("/api/admin/services/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteService(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Service not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete service" });
    }
  });

  // ============ SEO SETTINGS ROUTES ============
  app.get("/api/admin/seo", requireAdmin, async (_req, res) => {
    try {
      const settings = await storage.getAllSeoSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SEO settings" });
    }
  });

  app.get("/api/admin/seo/:path", requireAdmin, async (req, res) => {
    try {
      const settings = await storage.getSeoSettingsByPath(decodeURIComponent(req.params.path));
      if (settings) {
        res.json(settings);
      } else {
        res.status(404).json({ error: "SEO settings not found for this path" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SEO settings" });
    }
  });

  app.post("/api/admin/seo", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertSeoSettingsSchema.parse(req.body);
      const settings = await storage.createSeoSettings(validatedData);
      res.status(201).json(settings);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid SEO data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create SEO settings" });
      }
    }
  });

  app.patch("/api/admin/seo/:id", requireAdmin, async (req, res) => {
    try {
      const partialSeoSchema = insertSeoSettingsSchema.partial();
      const validatedData = partialSeoSchema.parse(req.body);
      const updated = await storage.updateSeoSettings(req.params.id, validatedData);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: "SEO settings not found" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid SEO data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update SEO settings" });
      }
    }
  });

  app.delete("/api/admin/seo/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteSeoSettings(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "SEO settings not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete SEO settings" });
    }
  });

  // ============ SITE SETTINGS ROUTES ============
  app.get("/api/admin/site-settings", requireAdmin, async (_req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch site settings" });
    }
  });

  // Public endpoint to get site settings (for frontend theming)
  app.get("/api/site-settings", async (_req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch site settings" });
    }
  });

  app.patch("/api/admin/site-settings", requireAdmin, async (req, res) => {
    try {
      const partialSettingsSchema = insertSiteSettingsSchema.partial();
      const validatedData = partialSettingsSchema.parse(req.body);
      const updated = await storage.updateSiteSettings(validatedData);
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid settings data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update site settings" });
      }
    }
  });

  // ============ PAGE CONTENT ROUTES ============
  app.get("/api/admin/page-content", requireAdmin, async (_req, res) => {
    try {
      const contents = await storage.getAllPageContents();
      res.json(contents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch page contents" });
    }
  });

  app.get("/api/page-content/:path(*)", async (req, res) => {
    try {
      const pagePath = "/" + req.params.path;
      const content = await storage.getPageContentByPath(pagePath);
      if (content) {
        res.json(content);
      } else {
        res.status(404).json({ error: "Page content not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch page content" });
    }
  });

  app.post("/api/admin/page-content", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertPageContentSchema.parse(req.body);
      const content = await storage.createPageContent(validatedData);
      res.status(201).json(content);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid page content data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create page content" });
      }
    }
  });

  app.patch("/api/admin/page-content/:id", requireAdmin, async (req, res) => {
    try {
      const partialSchema = insertPageContentSchema.partial();
      const validatedData = partialSchema.parse(req.body);
      const updated = await storage.updatePageContent(req.params.id, validatedData);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: "Page content not found" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid page content data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update page content" });
      }
    }
  });

  app.delete("/api/admin/page-content/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deletePageContent(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Page content not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete page content" });
    }
  });

  // ============ TRACKING CODE ROUTES ============
  app.get("/api/admin/tracking-codes", requireAdmin, async (_req, res) => {
    try {
      const codes = await storage.getAllTrackingCodes();
      res.json(codes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tracking codes" });
    }
  });

  // Public endpoint for active tracking codes (used by frontend)
  app.get("/api/tracking-codes", async (_req, res) => {
    try {
      const codes = await storage.getActiveTrackingCodes();
      res.json(codes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tracking codes" });
    }
  });

  app.post("/api/admin/tracking-codes", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertTrackingCodeSchema.parse(req.body);
      const code = await storage.createTrackingCode(validatedData);
      res.status(201).json(code);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid tracking code data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create tracking code" });
      }
    }
  });

  app.patch("/api/admin/tracking-codes/:id", requireAdmin, async (req, res) => {
    try {
      const partialSchema = insertTrackingCodeSchema.partial();
      const validatedData = partialSchema.parse(req.body);
      const updated = await storage.updateTrackingCode(req.params.id, validatedData);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: "Tracking code not found" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid tracking code data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update tracking code" });
      }
    }
  });

  app.delete("/api/admin/tracking-codes/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteTrackingCode(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Tracking code not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete tracking code" });
    }
  });

  // ============ LOCATION PAGES ROUTES ============
  app.get("/api/admin/location-pages", requireAdmin, async (_req, res) => {
    try {
      const pages = await storage.getAllLocationPages();
      res.json(pages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch location pages" });
    }
  });

  // Public endpoint for active location pages
  app.get("/api/location-pages", async (_req, res) => {
    try {
      const pages = await storage.getActiveLocationPages();
      res.json(pages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch location pages" });
    }
  });

  app.get("/api/location-pages/:slug", async (req, res) => {
    try {
      const page = await storage.getLocationPageBySlug(req.params.slug);
      if (page && page.isActive) {
        res.json(page);
      } else {
        res.status(404).json({ error: "Location page not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch location page" });
    }
  });

  app.post("/api/admin/location-pages", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertLocationPageSchema.parse(req.body);
      const page = await storage.createLocationPage(validatedData);
      res.status(201).json(page);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid location page data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create location page" });
      }
    }
  });

  app.patch("/api/admin/location-pages/:id", requireAdmin, async (req, res) => {
    try {
      const partialSchema = insertLocationPageSchema.partial();
      const validatedData = partialSchema.parse(req.body);
      const updated = await storage.updateLocationPage(req.params.id, validatedData);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ error: "Location page not found" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid location page data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update location page" });
      }
    }
  });

  app.delete("/api/admin/location-pages/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteLocationPage(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Location page not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete location page" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
