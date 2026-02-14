import { z } from "zod";

// Service Schema
export const serviceSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  icon: z.string(),
  features: z.array(z.string()),
  category: z.enum(["interior-design-fitout", "wellness-services", "maintenance-services"]),
  subcategory: z.string().optional(),
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
  images: z.array(z.string()).optional(),
  materials: z.string().optional(),
  dimensions: z.string().optional(),
  colors: z.array(z.string()).optional(),
  sku: z.string().optional(),
  inStock: z.boolean(),
  featured: z.boolean(),
  discount: z.number().optional(),
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
  // SEO fields
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  focusKeywords: z.string().optional(),
  additionalImages: z.array(z.string()).optional(),
  internalLinks: z.array(z.object({
    text: z.string(),
    url: z.string(),
  })).optional(),
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

// SEO Settings Schema
export const seoSettingsSchema = z.object({
  id: z.string(),
  pagePath: z.string(),
  pageTitle: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  metaKeywords: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
});

export const insertSeoSettingsSchema = seoSettingsSchema.omit({ id: true });
export type SeoSettings = z.infer<typeof seoSettingsSchema>;
export type InsertSeoSettings = z.infer<typeof insertSeoSettingsSchema>;

// Global Site Settings Schema
export const siteSettingsSchema = z.object({
  id: z.string(),
  siteName: z.string(),
  tagline: z.string().optional(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),
  backgroundColor: z.string(),
  textColor: z.string(),
  logoUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  contactAddress: z.string().optional(),
  socialFacebook: z.string().optional(),
  socialInstagram: z.string().optional(),
  socialLinkedin: z.string().optional(),
  socialTwitter: z.string().optional(),
  footerText: z.string().optional(),
});

export const insertSiteSettingsSchema = siteSettingsSchema.omit({ id: true });
export type SiteSettings = z.infer<typeof siteSettingsSchema>;
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;

// Page Content Schema (for managing H1, H2, H3, FAQs, hero images)
export const pageContentSchema = z.object({
  id: z.string(),
  pagePath: z.string(),
  pageType: z.enum(["service", "product", "blog", "location", "general"]),
  h1: z.string(),
  h2: z.string().optional(),
  h3: z.string().optional(),
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
  introContent: z.string().optional(),
  mainContent: z.string().optional(),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
  internalLinks: z.array(z.object({
    text: z.string(),
    url: z.string(),
    title: z.string().optional(),
  })).optional(),
  schema: z.string().optional(), // JSON-LD schema markup
  updatedAt: z.string(),
});

export const insertPageContentSchema = pageContentSchema.omit({ id: true, updatedAt: true });
export type PageContent = z.infer<typeof pageContentSchema>;
export type InsertPageContent = z.infer<typeof insertPageContentSchema>;

// Tracking Code Schema (for Google/Meta tracking)
export const trackingCodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["header", "footer", "body_start", "body_end"]),
  code: z.string(),
  isActive: z.boolean(),
  description: z.string().optional(),
});

export const insertTrackingCodeSchema = trackingCodeSchema.omit({ id: true });
export type TrackingCode = z.infer<typeof trackingCodeSchema>;
export type InsertTrackingCode = z.infer<typeof insertTrackingCodeSchema>;

// Location Page Schema (for Local SEO)
export const locationPageSchema = z.object({
  id: z.string(),
  location: z.string(), // e.g., "Dubai Marina", "Downtown Dubai"
  slug: z.string(),
  serviceId: z.string().optional(), // Link to a specific service
  h1: z.string(),
  h2: z.string().optional(),
  heroImage: z.string().optional(),
  description: z.string(),
  content: z.string(),
  localInfo: z.string().optional(), // Area-specific information
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
  schema: z.string().optional(), // Local business JSON-LD
  metaTitle: z.string(),
  metaDescription: z.string(),
  isActive: z.boolean(),
});

export const insertLocationPageSchema = locationPageSchema.omit({ id: true });
export type LocationPage = z.infer<typeof locationPageSchema>;
export type InsertLocationPage = z.infer<typeof insertLocationPageSchema>;

