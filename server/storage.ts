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
  private posts: Map<string, BlogPost>;
  private testimonials: Map<string, Testimonial>;
  private contactInquiries: Map<string, ContactInquiry>;

  constructor() {
    this.services = new Map();
    this.portfolioProjects = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.bookings = new Map();
    this.posts = new Map();
    this.testimonials = new Map();
    this.contactInquiries = new Map();
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize Blog Posts
    const initialPosts: BlogPost[] = [
      {
        id: randomUUID(),
        title: "Why Interiors in Dubai Age Faster Than Expected",
        slug: "why-interiors-dubai-age-faster",
        excerpt: "Many homeowners in Dubai are surprised by how quickly their interiors start to feel worn. Understanding how climate, usage, and materials interact is the first step toward longevity.",
        content: `Many homeowners in Dubai are surprised by how quickly their interiors start to feel worn. A space that looked perfect at handover can show signs of aging far sooner than expected. Faded finishes, peeling surfaces, swollen wood, and uneven wear are common complaints, even in relatively new properties.

This doesn’t usually come down to poor design taste. It comes down to environmental reality.

Dubai interiors operate under conditions that are very different from most parts of the world, and when those conditions aren’t properly accounted for, interiors deteriorate faster.

### Constant Air Conditioning Takes a Toll
In Dubai, air conditioning runs most of the year. While it keeps spaces comfortable, constant AC use affects materials over time.
- Dry air can cause cracking in certain finishes
- Temperature fluctuations stress joinery and fittings
- Poor airflow planning leads to uneven wear in rooms

### Humidity and Moisture Are Silent Contributors
Even with AC running, humidity remains a factor, especially in bathrooms, kitchens, and poorly ventilated areas.
- Wood swelling or warping
- Cabinet interiors and backing panels
- Paint adhesion and surface longevity

### Sunlight Is Stronger Than It Looks
Dubai receives intense sunlight for most of the year. Large windows, open layouts, and glass-heavy designs look great, but they also expose interiors to UV damage.
- Fading fabrics and finishes
- Discoloration of flooring and wall treatments
- Reduced lifespan of surface materials

### Final Thought
Interior aging in Dubai isn’t inevitable. It’s usually the result of design decisions that don’t fully reflect the environment they’re placed in.`,
        category: "Interior Design",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        author: "The Property Masters",
        publishedAt: new Date().toISOString(),
        featured: true,
      },
      {
        id: randomUUID(),
        title: "Understanding the True Scope of Property Maintenance in Dubai",
        slug: "property-maintenance-scope-dubai",
        excerpt: "Property maintenance in Dubai operates within a distinct set of environmental and usage parameters that differentiate it from other climates.",
        content: `Property maintenance in Dubai operates within a distinct set of environmental and usage parameters that differentiate it from maintenance approaches in more temperate climates. Many property owners approach maintenance as a series of reactive tasks fixing what breaks when it breaks yet this perspective overlooks the preventive dimension that becomes particularly crucial in Dubai's challenging conditions.

### What Comprehensive Maintenance Covers in Dubai Properties
- **Routine System Inspections:** Regular assessment of electrical, plumbing, and HVAC systems.
- **Climate-Specific Material Maintenance:** Specialized care for materials affected by heat and humidity.
- **HVAC Performance Optimization:** Beyond filter changes to include coil cleaning and duct inspection.
- **Electrical Load Management:** Monitoring systems to handle high cooling demands.

### Final Thought
Property maintenance in Dubai represents a continuous investment in environmental adaptation rather than merely a series of repair tasks.`,
        category: "Maintenance",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
        author: "The Property Masters",
        publishedAt: new Date().toISOString(),
        featured: true,
      },
      {
        id: randomUUID(),
        title: "The Unseen Environmental Factors Shaping Indoor Wellness",
        slug: "unseen-wellness-factors-dubai",
        excerpt: "Indoor wellness in Dubai extends far beyond visible cleanliness into the realm of environmental management.",
        content: `The concept of indoor wellness in Dubai extends far beyond visible cleanliness into the realm of environmental management a domain where unseen factors quietly influence daily comfort, health, and long-term property performance.

### Common Signs Your Dubai Home Needs Professional Wellness Attention:
- **Persistent Allergy Symptoms:** Family members experiencing ongoing congestion or respiratory irritation.
- **Unusual Odors:** Musty or stale smells that return quickly after cleaning.
- **Visible Dust Accumulation:** Excessive dust settling on surfaces within days.
- **Condensation Issues:** Water beads on windows, walls, or AC vents.

### Final Thought
Indoor wellness in Dubai represents a continuous balancing act between external climate realities and internal environmental management.`,
        category: "Wellness",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
        author: "The Property Masters",
        publishedAt: new Date().toISOString(),
        featured: true,
      }
    ];
    initialPosts.forEach(post => this.posts.set(post.id, post));

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
        category: "Modular Kitchen",
        description: "Sleek modular kitchen with ample storage and modern appliances",
        beforeImage: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800",
        afterImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        tags: ["kitchen", "modular", "modern"],
        featured: true,
      },
      {
        id: randomUUID(),
        title: "Contemporary Modular Kitchen",
        category: "Modular Kitchen",
        description: "Open concept modular kitchen with island and pendant lighting",
        beforeImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        tags: ["kitchen", "modular", "contemporary", "open plan"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "U-Shaped Modular Kitchen",
        category: "Modular Kitchen",
        description: "Efficient U-shaped kitchen with plenty of counter space",
        beforeImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        tags: ["kitchen", "modular", "u-shaped"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Parallel Modular Kitchen",
        category: "Modular Kitchen",
        description: "Modern parallel kitchen with dual workstations",
        beforeImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        afterImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        tags: ["kitchen", "modular", "parallel"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Island Modular Kitchen",
        category: "Modular Kitchen",
        description: "Spacious kitchen with central island",
        beforeImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800",
        tags: ["kitchen", "modular", "island"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Straight Modular Kitchen",
        category: "Modular Kitchen",
        description: "Compact straight kitchen perfect for small spaces",
        beforeImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        afterImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800",
        tags: ["kitchen", "modular", "compact"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Minimalist Modular Kitchen",
        category: "Modular Kitchen",
        description: "Clean modular kitchen with handleless cabinets",
        beforeImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        afterImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        tags: ["kitchen", "modular", "minimalist"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Luxury Modular Kitchen",
        category: "Modular Kitchen",
        description: "Premium modular kitchen with high-end appliances",
        beforeImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800",
        tags: ["kitchen", "modular", "luxury"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Luxury Master Bedroom Suite",
        category: "Master Bedroom",
        description: "Spacious master bedroom with walk-in closet and ensuite",
        beforeImage: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800",
        afterImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
        tags: ["bedroom", "master", "luxury"],
        featured: true,
      },
      {
        id: randomUUID(),
        title: "Modern Master Bedroom",
        category: "Master Bedroom",
        description: "Contemporary master bedroom with minimalist design",
        beforeImage: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
        afterImage: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800",
        tags: ["bedroom", "master", "modern"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Classic Master Bedroom",
        category: "Master Bedroom",
        description: "Elegant master bedroom with traditional furniture",
        beforeImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
        afterImage: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800",
        tags: ["bedroom", "master", "classic"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Minimalist Master Bedroom",
        category: "Master Bedroom",
        description: "Clean master bedroom with simple lines",
        beforeImage: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
        afterImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
        tags: ["bedroom", "master", "minimalist"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Cozy Master Bedroom",
        category: "Master Bedroom",
        description: "Warm master bedroom with soft textures",
        beforeImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
        afterImage: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800",
        tags: ["bedroom", "master", "cozy"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Contemporary Master Bedroom",
        category: "Master Bedroom",
        description: "Stylish master bedroom with accent wall",
        beforeImage: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800",
        afterImage: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
        tags: ["bedroom", "master", "contemporary"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Scandinavian Master Bedroom",
        category: "Master Bedroom",
        description: "Light and airy Scandinavian style bedroom",
        beforeImage: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800",
        afterImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
        tags: ["bedroom", "master", "scandinavian"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Boutique Master Bedroom",
        category: "Master Bedroom",
        description: "Luxurious boutique hotel-style bedroom",
        beforeImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
        afterImage: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800",
        tags: ["bedroom", "master", "boutique"],
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
        title: "Minimalist Bathroom Design",
        category: "Bathroom",
        description: "Clean and modern bathroom with floating vanity and glass shower",
        beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800",
        afterImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800",
        tags: ["bathroom", "minimalist", "modern"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Luxury Master Bathroom",
        category: "Bathroom",
        description: "Spacious master bathroom with dual sinks and walk-in shower",
        beforeImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
        afterImage: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=800",
        tags: ["bathroom", "master", "luxury"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Contemporary Guest Bathroom",
        category: "Bathroom",
        description: "Elegant guest bathroom with modern fixtures and tile accents",
        beforeImage: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800",
        afterImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
        tags: ["bathroom", "guest", "contemporary"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Small Bathroom Makeover",
        category: "Bathroom",
        description: "Space-saving bathroom design with clever storage solutions",
        beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800",
        afterImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800",
        tags: ["bathroom", "small space", "renovation"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Classic Bathroom Renovation",
        category: "Bathroom",
        description: "Timeless bathroom design with subway tiles and chrome fixtures",
        beforeImage: "https://images.unsplash.com/photo-1564540574-0526c49f82be?w=800",
        afterImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
        tags: ["bathroom", "classic", "renovation"],
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
      {
        id: randomUUID(),
        title: "Bold Terracotta and White Wall Colour Combination",
        category: "Wall Colour Combination",
        description: "Dining room with wooden hutch and woven runner",
        beforeImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        afterImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        tags: ["wall colour", "dining", "terracotta"],
        featured: true,
      },
      {
        id: randomUUID(),
        title: "Artistic Olive and Beige Wall Colour Combination",
        category: "Wall Colour Combination",
        description: "Living room with leather sectional and metal shelf",
        beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        tags: ["wall colour", "living room", "olive"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Modular Wardrobe Design",
        category: "Wardrobe",
        description: "Modern wardrobe with sliding doors and ample storage",
        beforeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800",
        tags: ["wardrobe", "storage", "modern"],
        featured: true,
      },
      {
        id: randomUUID(),
        title: "Walk-in Wardrobe Design",
        category: "Wardrobe",
        description: "Spacious walk-in closet with organized shelving",
        beforeImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
        afterImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        tags: ["wardrobe", "walk-in", "luxury"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Minimalist Wardrobe",
        category: "Wardrobe",
        description: "Clean wardrobe design with handleless doors",
        beforeImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800",
        tags: ["wardrobe", "minimalist", "handleless"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Classic Wooden Wardrobe",
        category: "Wardrobe",
        description: "Traditional wardrobe with carved wooden details",
        beforeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800",
        tags: ["wardrobe", "wooden", "classic"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Kitchen Wall Tiles Design",
        category: "Kitchen Wall Tiles",
        description: "Contemporary kitchen with subway tiles and modern backsplash",
        beforeImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        afterImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800",
        tags: ["kitchen", "tiles", "backsplash"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Mosaic Kitchen Backsplash",
        category: "Kitchen Wall Tiles",
        description: "Colorful mosaic tiles for modern kitchen",
        beforeImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        afterImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        tags: ["kitchen", "mosaic", "colorful"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Marble Kitchen Tiles",
        category: "Kitchen Wall Tiles",
        description: "Elegant marble-look tiles for luxury kitchen",
        beforeImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        tags: ["kitchen", "marble", "luxury"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Geometric Kitchen Tiles",
        category: "Kitchen Wall Tiles",
        description: "Modern geometric pattern tiles",
        beforeImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        afterImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800",
        tags: ["kitchen", "geometric", "pattern"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Kitchen False Ceiling Design",
        category: "Kitchen False Ceiling",
        description: "Modern false ceiling with recessed lighting",
        beforeImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        afterImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        tags: ["kitchen", "ceiling", "lighting"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "POP Kitchen Ceiling",
        category: "Kitchen False Ceiling",
        description: "Elegant POP false ceiling with pendant lights",
        beforeImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        tags: ["kitchen", "pop", "ceiling"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Wooden Kitchen Ceiling",
        category: "Kitchen False Ceiling",
        description: "Warm wooden slat ceiling design",
        beforeImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        tags: ["kitchen", "wooden", "ceiling"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Minimalist Kitchen Ceiling",
        category: "Kitchen False Ceiling",
        description: "Clean white ceiling with hidden lighting",
        beforeImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        afterImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        tags: ["kitchen", "minimalist", "white"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Balcony Garden Design",
        category: "Balcony",
        description: "Cozy balcony with plants and seating area",
        beforeImage: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=800",
        afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        tags: ["balcony", "garden", "outdoor"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Modern Balcony Design",
        category: "Balcony",
        description: "Contemporary balcony with outdoor furniture",
        beforeImage: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=800",
        afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        tags: ["balcony", "modern", "furniture"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Small Balcony Makeover",
        category: "Balcony",
        description: "Space-saving balcony design with vertical garden",
        beforeImage: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=800",
        afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        tags: ["balcony", "small", "vertical garden"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Luxury Balcony Design",
        category: "Balcony",
        description: "Premium balcony with lounge seating and planters",
        beforeImage: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=800",
        afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        tags: ["balcony", "luxury", "lounge"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Modern TV Unit Design",
        category: "TV Units",
        description: "Wall-mounted TV unit with storage compartments",
        beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        tags: ["tv unit", "living room", "storage"],
        featured: true,
      },
      {
        id: randomUUID(),
        title: "Floating TV Unit",
        category: "TV Units",
        description: "Sleek floating TV console with LED backlight",
        beforeImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        afterImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        tags: ["tv unit", "floating", "led"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Wooden TV Cabinet",
        category: "TV Units",
        description: "Classic wooden TV unit with shelves",
        beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        tags: ["tv unit", "wooden", "cabinet"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Minimalist TV Stand",
        category: "TV Units",
        description: "Simple TV stand with clean lines",
        beforeImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        afterImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        tags: ["tv unit", "minimalist", "stand"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Traditional Pooja Mandir Design",
        category: "Pooja Mandir",
        description: "Elegant wooden pooja room with carved details",
        beforeImage: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
        afterImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
        tags: ["pooja", "traditional", "wooden"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Modern Pooja Room",
        category: "Pooja Mandir",
        description: "Contemporary pooja space with marble finish",
        beforeImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
        afterImage: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
        tags: ["pooja", "modern", "marble"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Compact Pooja Unit",
        category: "Pooja Mandir",
        description: "Space-saving wall-mounted pooja mandir",
        beforeImage: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
        afterImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
        tags: ["pooja", "compact", "wall-mounted"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Luxury Pooja Mandir",
        category: "Pooja Mandir",
        description: "Grand pooja room with intricate carvings",
        beforeImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
        afterImage: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
        tags: ["pooja", "luxury", "carved"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Elegant Dining Room Design",
        category: "Dining Room",
        description: "Spacious dining area with chandelier and modern furniture",
        beforeImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800",
        tags: ["dining", "elegant", "chandelier"],
        featured: true,
      },
      {
        id: randomUUID(),
        title: "Modern Dining Space",
        category: "Dining Room",
        description: "Contemporary dining room with pendant lights",
        beforeImage: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        tags: ["dining", "modern", "pendant"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Compact Dining Area",
        category: "Dining Room",
        description: "Small dining space with foldable table",
        beforeImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800",
        tags: ["dining", "compact", "foldable"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Farmhouse Dining Room",
        category: "Dining Room",
        description: "Rustic dining room with wooden table",
        beforeImage: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800",
        tags: ["dining", "farmhouse", "rustic"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Living Room False Ceiling",
        category: "False Ceiling",
        description: "Contemporary false ceiling with LED strip lighting",
        beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        tags: ["ceiling", "living room", "LED"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Bedroom False Ceiling",
        category: "False Ceiling",
        description: "Elegant bedroom ceiling with cove lighting",
        beforeImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        afterImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        tags: ["ceiling", "bedroom", "cove"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Gypsum False Ceiling",
        category: "False Ceiling",
        description: "Modern gypsum ceiling with spotlights",
        beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        tags: ["ceiling", "gypsum", "spotlights"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Wooden False Ceiling",
        category: "False Ceiling",
        description: "Warm wooden slat ceiling design",
        beforeImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
        afterImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        tags: ["ceiling", "wooden", "slat"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Modern Wall Paint Design",
        category: "Wall Paint",
        description: "Textured wall paint with accent colors",
        beforeImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
        afterImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        tags: ["wall", "paint", "textured"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Ombre Wall Paint",
        category: "Wall Paint",
        description: "Gradient wall paint effect",
        beforeImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        afterImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
        tags: ["wall", "paint", "ombre"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Metallic Wall Paint",
        category: "Wall Paint",
        description: "Shimmer wall paint with metallic finish",
        beforeImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
        afterImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        tags: ["wall", "paint", "metallic"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Matte Wall Paint",
        category: "Wall Paint",
        description: "Smooth matte finish wall paint",
        beforeImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        afterImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
        tags: ["wall", "paint", "matte"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Feature Wall Design",
        category: "Wall",
        description: "Accent wall with 3D panels and ambient lighting",
        beforeImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
        afterImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        tags: ["wall", "feature", "3D"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Textured Wall Design",
        category: "Wall",
        description: "Textured wall with unique patterns",
        beforeImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        afterImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
        tags: ["wall", "textured", "pattern"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Stone Cladding Wall",
        category: "Wall",
        description: "Natural stone wall cladding",
        beforeImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
        afterImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        tags: ["wall", "stone", "cladding"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Wooden Wall Panels",
        category: "Wall",
        description: "Warm wooden wall paneling",
        beforeImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        afterImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
        tags: ["wall", "wooden", "panels"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Bay Window Design",
        category: "Window",
        description: "Beautiful bay window with cushioned seating",
        beforeImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800",
        afterImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        tags: ["window", "bay", "seating"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "French Window Design",
        category: "Window",
        description: "Elegant French windows with views",
        beforeImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        afterImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800",
        tags: ["window", "french", "elegant"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Picture Window Design",
        category: "Window",
        description: "Large picture window with panoramic view",
        beforeImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800",
        afterImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        tags: ["window", "picture", "panoramic"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Sliding Window Design",
        category: "Window",
        description: "Modern sliding windows with minimal frame",
        beforeImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
        afterImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800",
        tags: ["window", "sliding", "minimal"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Floor Tiles Design",
        category: "Tiles",
        description: "Elegant marble-look floor tiles",
        beforeImage: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800",
        afterImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800",
        tags: ["tiles", "floor", "marble"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Wall Tiles Design",
        category: "Tiles",
        description: "Modern wall tiles with geometric patterns",
        beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800",
        afterImage: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800",
        tags: ["tiles", "wall", "geometric"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Wooden Tiles Design",
        category: "Tiles",
        description: "Wood-look porcelain tiles",
        beforeImage: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800",
        afterImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800",
        tags: ["tiles", "wooden", "porcelain"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Mosaic Tiles Design",
        category: "Tiles",
        description: "Colorful mosaic tile patterns",
        beforeImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800",
        afterImage: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800",
        tags: ["tiles", "mosaic", "colorful"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Modern Staircase Design",
        category: "Staircase",
        description: "Contemporary staircase with glass railings",
        beforeImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        afterImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800",
        tags: ["staircase", "glass", "modern"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Wooden Staircase",
        category: "Staircase",
        description: "Classic wooden staircase with carved details",
        beforeImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800",
        afterImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        tags: ["staircase", "wooden", "classic"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Floating Staircase",
        category: "Staircase",
        description: "Modern floating staircase design",
        beforeImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        afterImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800",
        tags: ["staircase", "floating", "modern"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Spiral Staircase",
        category: "Staircase",
        description: "Space-saving spiral staircase",
        beforeImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800",
        afterImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        tags: ["staircase", "spiral", "space-saving"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Designer Door Design",
        category: "Door",
        description: "Carved wooden door with modern hardware",
        beforeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800",
        tags: ["door", "wooden", "carved"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Modern Glass Door",
        category: "Door",
        description: "Contemporary glass door with metal frame",
        beforeImage: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800",
        afterImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        tags: ["door", "glass", "modern"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Sliding Door Design",
        category: "Door",
        description: "Space-saving sliding door",
        beforeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        afterImage: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800",
        tags: ["door", "sliding", "space-saving"],
        featured: false,
      },
      {
        id: randomUUID(),
        title: "Traditional Wooden Door",
        category: "Door",
        description: "Classic wooden door with brass hardware",
        beforeImage: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800",
        afterImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        tags: ["door", "traditional", "brass"],
        featured: false,
      },
    ];
    portfolioProjects.forEach(project => this.portfolioProjects.set(project.id, project));

    // Initialize Products
    const products: Product[] = [
      {
        id: randomUUID(),
        name: "Wallpapers",
        description: "Premium wallpapers with diverse patterns and textures",
        price: 2500,
        category: "Wallpapers",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800",
        inStock: true,
        featured: true,
        discount: 27,
      },
      {
        id: randomUUID(),
        name: "Sofas",
        description: "Luxury sofas with premium upholstery and modern designs",
        price: 15000,
        category: "Sofas",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
        inStock: true,
        featured: true,
        discount: 55,
      },
      {
        id: randomUUID(),
        name: "Beds",
        description: "Elegant beds with premium mattresses and stylish frames",
        price: 12000,
        category: "Beds",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
        inStock: true,
        featured: true,
        discount: 48,
      },
      {
        id: randomUUID(),
        name: "Coffee Tables",
        description: "Modern coffee tables in various materials and finishes",
        price: 3500,
        category: "Coffee Tables",
        image: "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=800",
        inStock: true,
        featured: true,
        discount: 50,
      },
      {
        id: randomUUID(),
        name: "Side Tables",
        description: "Versatile side tables perfect for any room",
        price: 1800,
        category: "Side Tables",
        image: "https://images.unsplash.com/photo-1616046386908-a13cc9058d29?w=800",
        inStock: true,
        featured: true,
        discount: 50,
      },
      {
        id: randomUUID(),
        name: "Clocks",
        description: "Designer wall clocks that combine style and functionality",
        price: 950,
        category: "Clocks",
        image: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800",
        inStock: true,
        featured: true,
        discount: 50,
      },
      {
        id: randomUUID(),
        name: "Hobs",
        description: "Premium kitchen hobs with latest cooking technology",
        price: 4500,
        category: "Hobs",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
        inStock: true,
        featured: true,
        discount: 29,
      },
      {
        id: randomUUID(),
        name: "Chimneys",
        description: "High-performance kitchen chimneys with auto-clean features",
        price: 8500,
        category: "Chimneys",
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
        inStock: true,
        featured: true,
        discount: 60,
      },
      {
        id: randomUUID(),
        name: "Chairs",
        description: "Ergonomic chairs for dining and office spaces",
        price: 2200,
        category: "Chairs",
        image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800",
        inStock: true,
        featured: true,
        discount: 45,
      },
      {
        id: randomUUID(),
        name: "Bedside Tables",
        description: "Compact bedside tables with storage solutions",
        price: 1500,
        category: "Bedside Tables",
        image: "https://images.unsplash.com/photo-1595428773881-b2b9f7c9388d?w=800",
        inStock: true,
        featured: true,
        discount: 48,
      },
    ];
    products.forEach(product => this.products.set(product.id, product));

    // Initialize Blog Posts
    const posts: BlogPost[] = [
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
    posts.forEach(post => this.posts.set(post.id, post));

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
    return Array.from(this.posts.values());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.posts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = { ...insertPost, id };
    this.posts.set(id, post);
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
