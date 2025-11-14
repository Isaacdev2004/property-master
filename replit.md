# The Property Masters

A premium interior design, wellness, and maintenance website featuring e-commerce, service booking, and Odoo CRM integration.

## Project Overview

The Property Masters is a full-stack web application built for a luxury interior design, wellness, and property maintenance company based in Dubai, UAE. The website showcases a sophisticated, minimalist design following a warm color palette with exceptional attention to visual detail and user experience. The site features comprehensive service offerings across three main categories with dynamic mega menu navigation.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Wouter (routing), Framer Motion (animations)
- **Backend**: Express.js, TypeScript, In-Memory Storage (MemStorage)
- **Data Fetching**: TanStack Query v5
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Shadcn UI (Radix UI primitives)
- **CRM Integration**: Odoo XML-RPC (optional, gracefully handles missing credentials)
- **Fonts**: Montserrat (headings), Lora (body text via Google Fonts)

## Features Implemented

### Core Pages
1. **Homepage** (`/`) - Exact clone of interiorcompany.com
   - Full-screen hero with "Interior Design that Speaks of You" tagline and gradient overlay
   - Exact statistics: 5000+ Projects, 200+ Experts, 10 Cities 2 Countries, 2 lac+ Options (with lucide-react icons)
   - Complete Turnkey Services section (We Design, We Execute, We Manage)
   - Factory Tour: "From Concept to Creation" with video placeholder
   - Product Collection: 10 categories with discount badges (Wallpapers, Sofas, Beds, Coffee Tables, Side Tables, Clocks, Hobs, Chimneys, Chairs, Bedside Tables)
   - Design Ideas Gallery: 20 scrollable tabs covering all design categories with category-specific portfolio projects
   - Call-to-action sections

2. **Services** (`/services/:slug`)
   - **Dynamic mega menu navigation** with three main categories:
     - Interior Design & Fit-Out Works
     - Wellness Services
     - Maintenance Services
   - Individual service detail pages fetched from backend API
   - Service features displayed dynamically
   - Related services from the same category
   - Call-to-action for booking and contact

3. **About** (`/about`)
   - Company story and mission
   - Company statistics (500+ Projects, 1000+ Happy Clients, etc.)
   - Timeline of company evolution
   - Core values and principles
   - Team introduction
   - Why choose us section

4. **Portfolio** (`/portfolio`)
   - Project gallery with category filters
   - **Custom before/after comparison slider**
   - Click to toggle slider view
   - Draggable handle for before/after comparison
   - Categories: Kitchen, Bedroom, Bathroom, Office

5. **Shop** (`/shop`)
   - Product catalog with filtering
   - Category filters: Furniture, Lighting, Decor, Textiles
   - Add to cart functionality
   - Stock status indicators
   - Product cards with images and pricing

6. **Shopping Cart** (`/cart`)
   - Session-based cart persistence
   - Quantity controls (increase/decrease)
   - Remove items
   - Order summary with subtotal, shipping, and total
   - Free shipping promotion (over AED 5,000)

7. **Book Service** (`/book`)
   - Multi-step booking form (4 steps)
   - Step 1: Service details (type, date, time)
   - Step 2: Contact information
   - Step 3: Location details
   - Step 4: Review and confirmation
   - Progress indicator
   - Form validation with Zod
   - Odoo CRM lead creation on submission

8. **Blog** (`/blog`, `/blog/:slug`)
   - Blog post listings with category filters
   - Featured articles section
   - Individual blog post pages
   - Related articles
   - Author and publish date display

9. **Contact** (`/contact`)
   - Contact form with validation
   - Subject selection
   - Company contact information (AL Saqr Business Tower - Office A-36)
   - WhatsApp integration button
   - Embedded Google Maps showing office location
   - Odoo CRM lead creation on submission

### Key Features
- **Dynamic Mega Menu Navigation**: Three-category service menu that fetches from backend API
- **Responsive Design**: Mobile-first approach, works across all breakpoints
- **Smooth Animations**: Framer Motion for page transitions and element animations
- **Loading States**: Beautiful skeleton loaders and loading indicators
- **Error Handling**: Graceful error states with user-friendly messages and empty state handling
- **Session Management**: Cart persistence using localStorage
- **API Integration**: All pages fetch data from backend APIs with TanStack Query
- **Form Validation**: Client-side and server-side validation using Zod
- **CRM Integration**: Odoo XML-RPC for lead capture (booking and contact forms)
- **Custom Components**: Before/after slider, multi-step form, mega menu navigation
- **Google Maps Integration**: Embedded map showing office location in Dubai

## Design Guidelines

The application follows a luxury minimalist aesthetic as defined in `design_guidelines.md`:

- **Primary Color**: Warm amber/orange (#d97706)
- **Typography**: Montserrat for headings, Lora for body text
- **Spacing**: Generous white space, consistent padding/margins
- **Animations**: Smooth, subtle transitions
- **Component Style**: Flat design with subtle borders and elevations
- **Interactive Elements**: Hover and active states with elevation effects

## API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID

### Portfolio
- `GET /api/portfolio` - Get all portfolio projects

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Cart
- `GET /api/cart/:sessionId` - Get cart items for session
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking (with Odoo CRM integration)

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get blog post by ID

### Testimonials
- `GET /api/testimonials` - Get all testimonials

### Contact
- `POST /api/contact` - Submit contact inquiry (with Odoo CRM integration)

## Environment Configuration

### Required Secrets (for Odoo Integration)
These are optional - the application gracefully handles missing credentials:

- `ODOO_URL` - Odoo instance URL
- `ODOO_DB` - Odoo database name
- `ODOO_USERNAME` - Odoo username
- `ODOO_API_KEY` - Odoo API key/password
- `GOOGLE_MAPS_API_KEY` - For Google Maps integration (future enhancement)

### Built-in Secrets
- `SESSION_SECRET` - Already configured for session management

## Recent Changes

**November 14, 2025**
- ✅ **COMPLETE HOMEPAGE CLONE** - Exact replica of interiorcompany.com homepage with all sections
- ✅ Hero section updated with exact statistics: 5000+ Projects, 200+ Experts, 10 Cities 2 Countries, 2 lac+ Options
- ✅ Replaced all emoji icons with lucide-react icons (Award, Users, MapPin, Sparkles)
- ✅ Factory Tour section: "From Concept to Creation" with video placeholder and imagery
- ✅ Product Collection: 10 categories (Wallpapers, Sofas, Beds, Coffee Tables, Side Tables, Clocks, Hobs, Chimneys, Chairs, Bedside Tables) with discount badges
- ✅ Design Ideas Gallery: Expanded to 20 scrollable tabs covering all design categories
- ✅ **Complete Portfolio Data Coverage**: Added 80+ projects across ALL 20 design categories:
  - Wall Colour Combination (2), Living Room (2), Modular Kitchen (8), Wardrobe (4)
  - Master Bedroom (8), Kids Room (1), Kitchen Wall Tiles (4), Kitchen False Ceiling (4)
  - Balcony (4), TV Units (4), Bathroom (8), Pooja Mandir (4), Dining Room (4)
  - False Ceiling (4), Wall Paint (4), Wall (4), Window (4), Tiles (4), Staircase (4), Door (4)
- ✅ Dynamic tab filtering: Each tab displays category-specific projects (no fallback to generic content)
- ✅ ScrollArea implementation: Horizontal scrolling tabs for improved UX
- ✅ All sections responsive and fully functional
- ✅ Architect final review: PASSED - All categories have adequate data, no tabs showing fallback content

**November 11, 2025**
- ✅ Restructured services into three mega menu categories: Interior Design & Fit-Out Works, Wellness Services, and Maintenance Services
- ✅ Implemented dynamic mega menu navigation that fetches services from backend API
- ✅ Created About page with company story, statistics, timeline, team, and values sections
- ✅ Updated location information throughout site to AL Saqr Business Tower - Office A-36 with embedded Google Maps integration
- ✅ Fixed service detail page routing to dynamically display correct content based on service slug
- ✅ Added empty state handling for Services page API fetch failures
- ✅ All navigation, service detail, and location tests passing successfully

**January 10, 2025**
- ✅ Completed MVP development
- ✅ Implemented all core features (9 pages)
- ✅ Connected frontend to backend APIs with TanStack Query
- ✅ Implemented cart functionality with session persistence
- ✅ Created custom before/after comparison slider for portfolio
- ✅ Added Odoo CRM integration for bookings and contact forms
- ✅ Implemented multi-step booking form with validation
- ✅ Added blog with individual post pages
- ✅ Completed end-to-end testing of all features

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Shadcn UI components
│   │   │   ├── BeforeAfterSlider.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Shop.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── BookService.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── BlogPost.tsx
│   │   │   ├── About.tsx
│   │   │   └── Contact.tsx
│   │   ├── lib/
│   │   │   ├── queryClient.ts
│   │   │   └── cart.ts
│   │   └── App.tsx
│   ├── index.html
│   └── index.css
├── server/
│   ├── storage.ts          # In-memory data storage
│   ├── routes.ts           # API endpoints
│   ├── odoo.ts             # Odoo CRM integration
│   └── index.ts
├── shared/
│   └── schema.ts           # TypeScript types and Zod schemas
├── attached_assets/
│   └── generated_images/   # Premium hero and portfolio images
├── design_guidelines.md    # Design system documentation
└── replit.md              # This file
```

## Testing

All core features have been tested end-to-end:

✅ Shopping cart flow (add, update quantity, remove items)
✅ Service booking form (multi-step submission)
✅ Contact form submission
✅ Blog navigation and individual posts
✅ Portfolio before/after slider
✅ Homepage with dynamic content
✅ Category filtering (shop, portfolio, blog)
✅ Mega menu navigation and service detail pages
✅ About page content display
✅ Location and Google Maps integration

## Known Limitations

1. **In-Memory Storage**: Data is stored in memory and will reset on server restart. For production, migrate to PostgreSQL using Drizzle ORM.

2. **Odoo Integration**: Currently optional. Configure environment variables to enable CRM lead creation.

3. **Google Maps**: Placeholder in contact page. Add `GOOGLE_MAPS_API_KEY` to enable map integration.

4. **Payment Processing**: Shop has cart functionality but no checkout/payment integration yet.

5. **Image Optimization**: Using static images. Consider adding image optimization for production.

## Next Steps for Production

1. **Database Migration**: Migrate from MemStorage to PostgreSQL
2. **Odoo Configuration**: Add Odoo credentials for CRM integration
3. **Payment Integration**: Add Stripe/payment gateway for e-commerce
4. **Google Maps**: Configure Maps API for contact page
5. **Email Notifications**: Add email service for booking confirmations
6. **Analytics**: Add Google Analytics or similar
7. **SEO Optimization**: Add meta tags, sitemap, robots.txt
8. **Performance**: Image optimization, lazy loading, caching
9. **Security**: Rate limiting, CSRF protection, input sanitization
10. **Admin Panel**: Add admin interface for managing content

## Running the Application

The application is already configured and running:

```bash
npm run dev
```

Server runs on port 5000 with both frontend and backend on the same port (Vite proxy).

## User Preferences

- Luxury minimalist design aesthetic
- Warm color palette (amber/orange primary)
- Generous white space
- Smooth, subtle animations
- Premium feel throughout the application
- Mobile-first responsive design
