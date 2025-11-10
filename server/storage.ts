import {
  type Service, type InsertService,
  type PortfolioProject, type InsertPortfolioProject,
  type Product, type InsertProduct,
  type CartItem, type InsertCartItem,
  type Booking, type InsertBooking,
  type BlogPost, type InsertBlogPost,
  type Testimonial, type InsertTestimonial,
  type ContactInquiry, type InsertContactInquiry
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Services
  getAllServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Portfolio Projects
  getAllPortfolioProjects(): Promise<PortfolioProject[]>;
  getPortfolioProject(id: string): Promise<PortfolioProject | undefined>;
  createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject>;

  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Cart Items
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;

  // Bookings
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;

  // Blog Posts
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;

  // Contact Inquiries
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
}

export class MemStorage implements IStorage {
  private services: Map<string, Service>;
  private portfolioProjects: Map<string, PortfolioProject>;
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private bookings: Map<string, Booking>;
  private blogPosts: Map<string, BlogPost>;
  private testimonials: Map<string, Testimonial>;
  private contactInquiries: Map<string, ContactInquiry>;

  constructor() {
    this.services = new Map();
    this.portfolioProjects = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.bookings = new Map();
    this.blogPosts = new Map();
    this.testimonials = new Map();
    this.contactInquiries = new Map();
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize Services
    const services: Service[] = [
      {
        id: randomUUID(),
        title: "Interior Design",
        slug: "interior-design",
        description: "Transform your residential or commercial space with our expert design services.",
        icon: "Sparkles",
        category: "interior-design",
        features: [
          "Custom Design Plans",
          "3D Visualization",
          "Material Selection",
          "Project Management",
        ],
      },
      {
        id: randomUUID(),
        title: "Home Maintenance",
        slug: "home-maintenance",
        description: "Keep your home in perfect condition with our comprehensive maintenance services.",
        icon: "Home",
        category: "home-maintenance",
        features: [
          "Regular Inspections",
          "Preventive Care",
          "Emergency Repairs",
          "Quality Guarantee",
        ],
      },
      {
        id: randomUUID(),
        title: "Commercial Maintenance",
        slug: "commercial-maintenance",
        description: "Professional facility management for commercial properties.",
        icon: "Building2",
        category: "commercial-maintenance",
        features: [
          "Facility Management",
          "Scheduled Maintenance",
          "24/7 Support",
          "Compliance Assurance",
        ],
      },
    ];
    services.forEach(service => this.services.set(service.id, service));

    // Initialize Products
    const products: Product[] = [
      {
        id: randomUUID(),
        name: "Modern Leather Sofa",
        description: "Premium Italian leather sofa with contemporary design and exceptional comfort",
        price: 8500,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
        inStock: true,
        featured: true,
      },
      {
        id: randomUUID(),
        name: "Designer Pendant Light",
        description: "Elegant brass pendant light with adjustable height, perfect for dining areas",
        price: 1200,
        category: "Lighting",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800",
        inStock: true,
        featured: false,
      },
      {
        id: randomUUID(),
        name: "Marble Coffee Table",
        description: "Stunning white marble coffee table with gold metal base",
        price: 2800,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=800",
        inStock: true,
        featured: true,
      },
      {
        id: randomUUID(),
        name: "Abstract Wall Art",
        description: "Large-format contemporary abstract painting with gold accents",
        price: 3500,
        category: "Decor",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
        inStock: true,
        featured: false,
      },
      {
        id: randomUUID(),
        name: "Velvet Armchair",
        description: "Luxurious velvet armchair in deep emerald green with brass legs",
        price: 1850,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800",
        inStock: true,
        featured: false,
      },
      {
        id: randomUUID(),
        name: "Crystal Chandelier",
        description: "Opulent crystal chandelier with chrome finish, 8 lights",
        price: 4200,
        category: "Lighting",
        image: "https://images.unsplash.com/photo-1565007299-36e89c374c32?w=800",
        inStock: false,
        featured: false,
      },
      {
        id: randomUUID(),
        name: "Silk Throw Pillows",
        description: "Set of 4 luxury silk throw pillows in complementary neutral tones",
        price: 380,
        category: "Textiles",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
        inStock: true,
        featured: false,
      },
      {
        id: randomUUID(),
        name: "Ceramic Vase Set",
        description: "Handcrafted ceramic vase collection in matte white and gold",
        price: 650,
        category: "Decor",
        image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800",
        inStock: true,
        featured: false,
      },
    ];
    products.forEach(product => this.products.set(product.id, product));

    // Initialize Blog Posts
    const blogPosts: BlogPost[] = [
      {
        id: randomUUID(),
        title: "10 Interior Design Trends to Watch in 2025",
        slug: "interior-design-trends-2025",
        excerpt: "Discover the latest interior design trends that are shaping modern homes this year.",
        content: "Full article content here...",
        category: "Design Tips",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        author: "Sarah Johnson",
        publishedAt: new Date("2024-01-15").toISOString(),
        featured: true,
      },
      {
        id: randomUUID(),
        title: "Essential Home Maintenance Checklist for Every Season",
        slug: "home-maintenance-checklist",
        excerpt: "Keep your home in top condition with our comprehensive seasonal maintenance guide.",
        content: "Full article content here...",
        category: "Maintenance",
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
        author: "Michael Chen",
        publishedAt: new Date("2024-02-10").toISOString(),
        featured: true,
      },
      {
        id: randomUUID(),
        title: "Creating a Productive Office Space: Design Tips for Businesses",
        slug: "productive-office-design",
        excerpt: "Transform your commercial workspace into a hub of creativity and efficiency.",
        content: "Full article content here...",
        category: "Commercial",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
        author: "Emily Rodriguez",
        publishedAt: new Date("2024-03-05").toISOString(),
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Maximizing Small Spaces: Smart Storage Solutions",
        slug: "small-space-storage-solutions",
        excerpt: "Learn how to make the most of limited space with clever storage ideas.",
        content: "Full article content here...",
        category: "Design Tips",
        image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
        author: "Sarah Johnson",
        publishedAt: new Date("2024-04-12").toISOString(),
        featured: false,
      },
      {
        id: randomUUID(),
        title: "HVAC Maintenance: When to Call the Professionals",
        slug: "hvac-maintenance-guide",
        excerpt: "Understanding when DIY isn't enough for your heating and cooling systems.",
        content: "Full article content here...",
        category: "Maintenance",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",
        author: "Michael Chen",
        publishedAt: new Date("2024-05-20").toISOString(),
        featured: false,
      },
    ];
    blogPosts.forEach(post => this.blogPosts.set(post.id, post));

    // Initialize Testimonials
    const testimonials: Testimonial[] = [
      {
        id: randomUUID(),
        name: "Sarah Ahmed",
        role: "Homeowner",
        company: "Dubai Marina",
        content: "The Property Masters transformed our villa into a dream home. Their attention to detail and professionalism exceeded all expectations.",
        rating: 5,
      },
      {
        id: randomUUID(),
        name: "Michael Chen",
        role: "Business Owner",
        company: "Tech Innovations LLC",
        content: "Outstanding service! They renovated our office space beautifully and finished ahead of schedule. Highly recommended!",
        rating: 5,
      },
      {
        id: randomUUID(),
        name: "Fatima Al-Mansoori",
        role: "Property Manager",
        company: "Emirates Properties",
        content: "Reliable, professional, and always delivering quality work. They've been maintaining our properties for over 2 years.",
        rating: 5,
      },
    ];
    testimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));
  }

  // Services
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  // Portfolio Projects
  async getAllPortfolioProjects(): Promise<PortfolioProject[]> {
    return Array.from(this.portfolioProjects.values());
  }

  async getPortfolioProject(id: string): Promise<PortfolioProject | undefined> {
    return this.portfolioProjects.get(id);
  }

  async createPortfolioProject(insertProject: InsertPortfolioProject): Promise<PortfolioProject> {
    const id = randomUUID();
    const project: PortfolioProject = { ...insertProject, id };
    this.portfolioProjects.set(id, project);
    return project;
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  // Cart Items
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const id = randomUUID();
    const item: CartItem = { ...insertItem, id };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  // Bookings
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = {
      ...insertBooking,
      id,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  // Blog Posts
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = { ...insertPost, id };
    this.blogPosts.set(id, post);
    return post;
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  // Contact Inquiries
  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = randomUUID();
    const inquiry: ContactInquiry = {
      ...insertInquiry,
      id,
      createdAt: new Date().toISOString(),
    };
    this.contactInquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();
