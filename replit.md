# The Property Masters

## Project Overview
The Property Masters is a premium interior design and maintenance website with Odoo CRM integration. The platform offers:
- Interior design services for residential and commercial properties
- Home and commercial maintenance services
- E-commerce shop for home décor products
- Service booking system with multi-step form
- Portfolio showcase with before/after comparisons
- Blog with design tips and maintenance advice

## Tech Stack
- **Frontend**: React with TypeScript, Wouter for routing
- **UI**: Tailwind CSS, Shadcn UI components, Framer Motion for animations
- **Backend**: Express.js with in-memory storage (MemStorage)
- **State Management**: TanStack Query (React Query v5)
- **Forms**: React Hook Form with Zod validation
- **Design**: Montserrat & Lora fonts, warm color palette (HSL 35° base)

## Key Features Implemented
- ✅ Responsive navigation with mobile menu and scroll effects
- ✅ Hero section with full-screen image and gradient overlay
- ✅ Service pages with package pricing (Interior Design, Home/Commercial Maintenance)
- ✅ Portfolio gallery with category filters and before/after sliders
- ✅ E-commerce shop with product catalog (mock data ready for Odoo sync)
- ✅ Multi-step booking form (Service → Schedule → Details → Confirm)
- ✅ Blog with category filtering
- ✅ Contact page with inquiry form and WhatsApp integration
- ✅ Shopping cart functionality
- ✅ Footer with newsletter signup and social links

## Data Schema
All schemas defined in `shared/schema.ts`:
- Service (title, description, category, features)
- PortfolioProject (title, category, before/after images, tags)
- Product (name, price, category, stock status)
- CartItem (product, quantity, session)
- Booking (service type, customer details, schedule, status)
- BlogPost (title, content, category, author, featured)
- Testimonial (name, role, rating, content)
- ContactInquiry (name, email, phone, subject, message)

## Project Structure
```
client/
  src/
    components/
      - Navigation.tsx (header with sticky scroll behavior)
      - Footer.tsx (comprehensive footer with links)
      - ui/ (Shadcn components)
    pages/
      - Home.tsx (hero, services overview, portfolio preview, testimonials, stats, CTA)
      - Services.tsx (service details with dynamic routing)
      - Portfolio.tsx (filterable gallery with before/after comparison)
      - Shop.tsx (product catalog with category filters)
      - Cart.tsx (shopping cart with quantity management)
      - BookService.tsx (4-step booking form)
      - Blog.tsx (blog articles with category filters)
      - Contact.tsx (contact form, info cards, WhatsApp button)
shared/
  - schema.ts (all TypeScript types and Zod schemas)
server/
  - routes.ts (API endpoints - to be implemented)
  - storage.ts (in-memory data storage interface)
```

## Design System
**Colors**: Warm palette with primary at HSL(35, 85%, 45%) - golden/bronze tones
**Fonts**: 
- Headings: Montserrat (weights 300, 400, 600, 700)
- Body: Inter (weight 400)
- Accent: Lora (weights 400, 600)

**Key Design Principles**:
- Premium minimalist aesthetic with generous white space
- Smooth Framer Motion animations (fade-in-up, scale, parallax)
- Mobile-first responsive design
- Consistent spacing using Tailwind scale (4, 6, 8, 12, 16, 20, 24)
- Hover states with subtle elevation and transforms
- Professional imagery with gradient overlays

## Integration Points (Pending Credentials)
**Odoo CRM**: Bookings and contact inquiries will be sent to Odoo as leads
- ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_API_KEY required
- Integration structure ready in backend

**Google Maps**: Contact page has placeholder for embedded map
- GOOGLE_MAPS_API_KEY required

**WhatsApp**: Contact page includes WhatsApp button
- Phone: +971 50 123 4567 (configurable)

## Next Steps
1. Implement backend API routes with Odoo XML-RPC integration
2. Connect frontend to backend (TanStack Query mutations)
3. Populate mock product data structured for Odoo sync
4. Add loading states and error handling
5. Test booking and contact form submissions
6. Configure Google Maps integration once API key is provided

## User Preferences
- Premium, luxury aesthetic
- Clean, minimalist design inspired by interiorcompany.com, thehealthyhome.me, renohome.ae
- Smooth animations and transitions
- Mobile-responsive across all pages
- Professional color scheme with warm tones

## Recent Changes
- Initial project setup with complete frontend implementation
- All main pages created with exceptional visual quality
- Design system configured with custom color palette
- Framer Motion animations added throughout
- Multi-step booking form with validation
- Portfolio with before/after comparison slider
