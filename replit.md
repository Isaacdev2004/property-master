# The Property Masters

A premium interior design and maintenance website featuring e-commerce, service booking, and Odoo CRM integration.

## Project Overview

The Property Masters is a full-stack web application built for a luxury interior design and property maintenance company. The website showcases a sophisticated, minimalist design following a warm color palette with exceptional attention to visual detail and user experience.

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
1. **Homepage** (`/`)
   - Full-screen hero with gradient overlay
   - Services overview (fetched from backend)
   - Featured portfolio projects
   - Client testimonials (fetched from backend)
   - Company statistics
   - Call-to-action sections

2. **Services** (`/services`, `/services/:slug`)
   - Service listings with filtering
   - Individual service detail pages
   - Package pricing information
   - Feature highlights

3. **Portfolio** (`/portfolio`)
   - Project gallery with category filters
   - **Custom before/after comparison slider**
   - Click to toggle slider view
   - Draggable handle for before/after comparison
   - Categories: Kitchen, Bedroom, Bathroom, Office

4. **Shop** (`/shop`)
   - Product catalog with filtering
   - Category filters: Furniture, Lighting, Decor, Textiles
   - Add to cart functionality
   - Stock status indicators
   - Product cards with images and pricing

5. **Shopping Cart** (`/cart`)
   - Session-based cart persistence
   - Quantity controls (increase/decrease)
   - Remove items
   - Order summary with subtotal, shipping, and total
   - Free shipping promotion (over AED 5,000)

6. **Book Service** (`/book`)
   - Multi-step booking form (4 steps)
   - Step 1: Service details (type, date, time)
   - Step 2: Contact information
   - Step 3: Location details
   - Step 4: Review and confirmation
   - Progress indicator
   - Form validation with Zod
   - Odoo CRM lead creation on submission

7. **Blog** (`/blog`, `/blog/:slug`)
   - Blog post listings with category filters
   - Featured articles section
   - Individual blog post pages
   - Related articles
   - Author and publish date display

8. **Contact** (`/contact`)
   - Contact form with validation
   - Subject selection
   - Company contact information
   - WhatsApp integration button
   - Odoo CRM lead creation on submission

### Key Features
- **Responsive Design**: Mobile-first approach, works across all breakpoints
- **Smooth Animations**: Framer Motion for page transitions and element animations
- **Loading States**: Beautiful skeleton loaders and loading indicators
- **Error Handling**: Graceful error states with user-friendly messages
- **Session Management**: Cart persistence using localStorage
- **API Integration**: All pages fetch data from backend APIs
- **Form Validation**: Client-side and server-side validation using Zod
- **CRM Integration**: Odoo XML-RPC for lead capture (booking and contact forms)
- **Custom Components**: Before/after slider, multi-step form, navigation

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

**January 10, 2025**
- ✅ Completed MVP development
- ✅ Implemented all core features (8 pages)
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
