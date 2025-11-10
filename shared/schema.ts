import { z } from "zod";

// Service Schema
export const serviceSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  icon: z.string(),
  features: z.array(z.string()),
  category: z.enum(["interior-design", "home-maintenance", "commercial-maintenance"]),
});

export const insertServiceSchema = serviceSchema.omit({ id: true });
export type Service = z.infer<typeof serviceSchema>;
export type InsertService = z.infer<typeof insertServiceSchema>;

// Portfolio Project Schema
export const portfolioProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  description: z.string(),
  beforeImage: z.string(),
  afterImage: z.string(),
  tags: z.array(z.string()),
  featured: z.boolean(),
});

export const insertPortfolioProjectSchema = portfolioProjectSchema.omit({ id: true });
export type PortfolioProject = z.infer<typeof portfolioProjectSchema>;
export type InsertPortfolioProject = z.infer<typeof insertPortfolioProjectSchema>;

// Product Schema
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  image: z.string(),
  inStock: z.boolean(),
  featured: z.boolean(),
});

export const insertProductSchema = productSchema.omit({ id: true });
export type Product = z.infer<typeof productSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;

// Cart Item Schema
export const cartItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  quantity: z.number(),
  sessionId: z.string(),
});

export const insertCartItemSchema = cartItemSchema.omit({ id: true });
export type CartItem = z.infer<typeof cartItemSchema>;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

// Booking Schema
export const bookingSchema = z.object({
  id: z.string(),
  serviceType: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  preferredDate: z.string(),
  preferredTime: z.string(),
  message: z.string().optional(),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
  createdAt: z.string(),
});

export const insertBookingSchema = bookingSchema.omit({ id: true, status: true, createdAt: true }).extend({
  message: z.string().optional(),
});

export type Booking = z.infer<typeof bookingSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

// Blog Post Schema
export const blogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  category: z.string(),
  image: z.string(),
  author: z.string(),
  publishedAt: z.string(),
  featured: z.boolean(),
});

export const insertBlogPostSchema = blogPostSchema.omit({ id: true });
export type BlogPost = z.infer<typeof blogPostSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

// Testimonial Schema
export const testimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  company: z.string().optional(),
  content: z.string(),
  rating: z.number().min(1).max(5),
  image: z.string().optional(),
});

export const insertTestimonialSchema = testimonialSchema.omit({ id: true });
export type Testimonial = z.infer<typeof testimonialSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

// Contact Inquiry Schema
export const contactInquirySchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  subject: z.string(),
  message: z.string(),
  createdAt: z.string(),
});

export const insertContactInquirySchema = contactInquirySchema.omit({ id: true, createdAt: true });
export type ContactInquiry = z.infer<typeof contactInquirySchema>;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
