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
        title: "Residential Interior Design",
        slug: "residential-interior-design",
        description: "Create stunning living spaces that reflect your personal style and enhance your lifestyle.",
        icon: "Home",
        category: "interior-design-fitout",
        subcategory: "Residential",
        features: [
          "Custom Design Concepts",
          "3D Visualization & Rendering",
          "Space Planning & Layout",
          "Furniture & Decor Selection",
          "Project Management",
        ],
      },
      {
        id: randomUUID(),
        title: "Commercial Interior Design",
        slug: "commercial-interior-design",
        description: "Professional workspace design that enhances productivity and brand identity.",
        icon: "Building2",
        category: "interior-design-fitout",
        subcategory: "Commercial",
        features: [
          "Brand-Aligned Design",
          "Ergonomic Space Planning",
          "Lighting Design",
          "Material & Finish Selection",
          "Turnkey Solutions",
        ],
      },
      {
        id: randomUUID(),
        title: "Fit-Out Works",
        slug: "fit-out-works",
        description: "Complete fit-out solutions for residential and commercial properties.",
        icon: "Hammer",
        category: "interior-design-fitout",
        subcategory: "Fit-Out",
        features: [
          "Shell & Core Fit-Out",
          "MEP Integration",
          "Custom Joinery",
          "Quality Finishes",
          "Timeline Guarantee",
        ],
      },
      {
        id: randomUUID(),
        title: "Spa & Wellness Center Design",
        slug: "spa-wellness-design",
        description: "Create tranquil wellness spaces that promote relaxation and rejuvenation.",
        icon: "Droplets",
        category: "wellness-services",
        subcategory: "Spa Design",
        features: [
          "Calming Ambiance Design",
          "Treatment Room Planning",
          "Wellness Equipment Integration",
          "Soundproofing Solutions",
          "Aromatherapy Integration",
        ],
      },
      {
        id: randomUUID(),
        title: "Gym & Fitness Center",
        slug: "gym-fitness-design",
        description: "Energizing fitness spaces designed for optimal performance and motivation.",
        icon: "Dumbbell",
        category: "wellness-services",
        subcategory: "Fitness",
        features: [
          "Equipment Layout Planning",
          "Motivational Design Elements",
          "Proper Ventilation",
          "Acoustic Treatment",
          "Safety Compliance",
        ],
      },
      {
        id: randomUUID(),
        title: "Yoga & Meditation Spaces",
        slug: "yoga-meditation-spaces",
        description: "Peaceful environments designed to enhance mindfulness and inner peace.",
        icon: "Heart",
        category: "wellness-services",
        subcategory: "Mindfulness",
        features: [
          "Zen-Inspired Design",
          "Natural Lighting",
          "Acoustic Privacy",
          "Calming Color Palettes",
          "Air Quality Optimization",
        ],
      },
      {
        id: randomUUID(),
        title: "General Property Maintenance",
        slug: "general-maintenance",
        description: "Comprehensive maintenance services to keep your property in perfect condition.",
        icon: "Wrench",
        category: "maintenance-services",
        subcategory: "General",
        features: [
          "Regular Inspections",
          "Preventive Maintenance",
          "Emergency Repairs",
          "Quality Guarantee",
          "24/7 Support",
        ],
      },
      {
        id: randomUUID(),
        title: "HVAC Maintenance",
        slug: "hvac-maintenance",
        description: "Keep your heating and cooling systems running efficiently year-round.",
        icon: "Wind",
        category: "maintenance-services",
        subcategory: "HVAC",
        features: [
          "System Cleaning",
          "Filter Replacement",
          "Performance Optimization",
          "Energy Efficiency Checks",
          "Seasonal Tune-Ups",
        ],
      },
      {
        id: randomUUID(),
        title: "Plumbing Services",
        slug: "plumbing-services",
        description: "Professional plumbing solutions for residential and commercial properties.",
        icon: "Droplet",
        category: "maintenance-services",
        subcategory: "Plumbing",
        features: [
          "Leak Detection & Repair",
          "Pipe Installation",
          "Drain Cleaning",
          "Fixture Replacement",
          "Emergency Response",
        ],
      },
      {
        id: randomUUID(),
        title: "Electrical Services",
        slug: "electrical-services",
        description: "Safe and reliable electrical installations and repairs.",
        icon: "Zap",
        category: "maintenance-services",
        subcategory: "Electrical",
        features: [
          "Wiring & Rewiring",
          "Lighting Installation",
          "Electrical Safety Inspections",
          "Circuit Breaker Services",
          "Smart Home Integration",
        ],
      },
    ];
    services.forEach(service => this.services.set(service.id, service));

    // Initialize Portfolio Projects
    const portfolioProjects: PortfolioProject[] = [
      {
        id: randomUUID(),
        title: "Modern Living Room with Sectional Sofa",
        category: "Living Room",
        description: "Contemporary living space featuring a plush sectional sofa and minimalist decor",
        beforeImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
        afterImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        tags: ["living room", "modern", "residential"],
        featured: true,
      },
      {
        id: randomUUID(),
        title: "Elegant Living Room Design",
        category: "Living Room",
        description: "Sophisticated living area with warm tones and luxury finishes",
        beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        tags: ["living room", "elegant", "residential"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "L-Shaped Modular Kitchen",
        category: "Kitchen",
        description: "Sleek modular kitchen with ample storage and modern appliances",
        beforeImage: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800",
        afterImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        tags: ["kitchen", "modular", "modern"],
        featured: true,
      },
      {
        id: randomUUID(),
        title: "Contemporary Kitchen Design",
        category: "Kitchen",
        description: "Open concept kitchen with island and pendant lighting",
        beforeImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        tags: ["kitchen", "contemporary", "open plan"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Luxury Master Bedroom Suite",
        category: "Bedroom",
        description: "Spacious master bedroom with walk-in closet and ensuite",
        beforeImage: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800",
        afterImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
        tags: ["bedroom", "master", "luxury"],
        featured: true,
      },
      {
        id: randomUUID(),
        title: "Cozy Bedroom Retreat",
        category: "Bedroom",
        description: "Comfortable bedroom with soft textures and warm lighting",
        beforeImage: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
        afterImage: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800",
        tags: ["bedroom", "cozy", "residential"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Modern Bathroom Renovation",
        category: "Bathroom",
        description: "Contemporary bathroom with walk-in shower and double vanity",
        beforeImage: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800",
        afterImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800",
        tags: ["bathroom", "modern", "renovation"],
        featured: true,
      },
      {
        id: randomUUID(),
        title: "Spa-Inspired Bathroom",
        category: "Bathroom",
        description: "Luxurious bathroom with freestanding tub and marble finishes",
        beforeImage: "https://images.unsplash.com/photo-1564540574-0526c49f82be?w=800",
        afterImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
        tags: ["bathroom", "spa", "luxury"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Playful Kids Room Design",
        category: "Kids Room",
        description: "Colorful and functional children's bedroom with smart storage",
        beforeImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
        afterImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
        tags: ["kids room", "children", "playful"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Modern Office Space",
        category: "Office",
        description: "Professional workspace with ergonomic furniture and natural light",
        beforeImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
        afterImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
        tags: ["office", "commercial", "modern"],
        featured: true,
      },
      {
        id: randomUUID(),
        title: "Executive Office Design",
        category: "Office",
        description: "Elegant executive office with custom built-ins and wood finishes",
        beforeImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
        afterImage: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800",
        tags: ["office", "executive", "luxury"],
        featured: false,
      },
    ];
    portfolioProjects.forEach(project => this.portfolioProjects.set(project.id, project));

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
