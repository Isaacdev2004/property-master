import type { Express } from "express";
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
} from "@shared/schema";
import { z } from "zod";

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

  const httpServer = createServer(app);
  return httpServer;
}
