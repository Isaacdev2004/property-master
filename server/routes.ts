import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { odooService } from "./odoo";
import {
  insertServiceSchema,
  insertPortfolioProjectSchema,
  insertProductSchema,
  insertCartItemSchema,
  insertBookingSchema,
  insertBlogPostSchema,
  insertContactInquirySchema,
  insertTestimonialSchema,
} from "@shared/schema";
import { z } from "zod";

// Simple admin session storage
const adminSessions = new Map<string, { expiresAt: Date }>();

// Admin password from environment - required in production
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD && process.env.NODE_ENV === "production") {
  console.error("CRITICAL: ADMIN_PASSWORD environment variable must be set in production");
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

  // Admin Authentication
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      if (password !== getAdminPassword()) {
        return res.status(401).json({ error: "Invalid password" });
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

  const httpServer = createServer(app);
  return httpServer;
}
