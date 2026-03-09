# The Property Masters

## Overview

The Property Masters is a full-stack web application for a luxury interior design, wellness, and property maintenance company in Dubai. It aims to provide a premium online experience, showcasing high-end services and products, streamlining client interactions, and supporting business growth in the luxury market. Key capabilities include comprehensive service offerings, e-commerce, and CRM integration, all presented with a sophisticated, minimalist design.

## User Preferences

- Luxury minimalist design aesthetic
- New color palette: Maroon/Navy/Cream theme
  - Primary Maroon: #970A44 (CTAs, buttons, accents)
  - Dark Maroon: #720632 (hover states, dark accents)
  - Cream: #F6F4EB (backgrounds, cards)
  - Steel Blue: #1C4668 (secondary accent)
  - Dark Navy: #09263D (dark backgrounds, text)
- Generous white space
- Smooth, subtle animations
- Premium feel throughout the application
- Mobile-first responsive design

## System Architecture

The application is built with a React 18, TypeScript, and Tailwind CSS frontend, using Wouter for routing, Framer Motion for animations, and Shadcn UI for components. The backend uses Express.js with TypeScript and an in-memory data store (`MemStorage`). Data fetching is managed by TanStack Query v5, and forms utilize React Hook Form with Zod validation.

**UI/UX Decisions:**
The design adheres to a warm luxury minimalist aesthetic with a full-width, brand-focused hero section, using a new Maroon (#970A44) color scheme. Navigation features bold white text on the hero, switching to dark text on a white background when scrolled. Subtle, refined animations with professional easing curves `[0.25, 0.46, 0.45, 0.94]` are used throughout for elements like hero sections, statistics, sticky scrolls, and product grids.

**Technical Implementations & Features:**
- **Dynamic Mega Menu Navigation:** Services are categorized into Interior Design & Fit-Out Works, Wellness Services, and Maintenance Services, with dynamic content fetched from the backend.
- **Comprehensive Homepage:** Features a full-width hero, testimonials marquee, sticky scroll service showcasing four offerings, Signature Spaces Showcase (bento-style grid), "Why Choose Us" section, featured testimonials, a blog section, and a final CTA.
- **Signature Spaces Showcase:** A bento-style grid featuring 6 project archetypes with immersive imagery, metrics, and CTAs.
- **Real Stories, Real Results & Listen to Our Customers:** Marquee-style and featured testimonials sections to build trust.
- **Blog Section:** "Stay Ahead with Expert Tips" section featuring articles, a newsletter subscription, and linking to a dedicated blog page.
- **Wellness Services Page:** Redesigned with 17 sections including a hero, air quality widgets, quick service icons, service carousels, categorized services, "Why Choose Us" benefits, Google Reviews testimonials, and individual service detail pages.
- **Maintenance Services Page:** Redesigned with a parallax hero, 16 service cards, a free consultation CTA, a "How It Works" section, maintenance packages, statistics, client feedback, latest news, and individual service detail pages.
- **Ecommerce Shop Page:** Redesigned with a parallax hero, quick category icons, featured collections, a factory tour section, design ideas, a benefits bar, a product grid with filters, and a comprehensive product detail page.
- **Comprehensive Page Set:** Includes Homepage, dynamic Services pages, About, Portfolio (with before/after slider), Shop with cart, multi-step Book Service form, Blog, and Contact page. All hero sections use professional stock photography with dark gradient overlays.
- **Admin CMS System:** A secure, session-based `/admin` content management system providing full CRUD operations for services, blog posts, products, testimonials, portfolio projects, SEO settings, and maintenance packages. It includes a dashboard, site settings (branding, colors, contact, social), bookings view, and contact inquiries management. Admin routes are protected with `requireAdmin` middleware and Zod validation. **Security:** Admin login requires both username and password authentication, accessible via an obscure route path `/cms-portal-x7k9` (not `/admin/login`). Default username is "admin" (configurable via ADMIN_USERNAME env var).
- **Maintenance Packages Manager:** CMS page to add, edit, delete, and hide/show maintenance packages (Basic, Standard, Executive, Custom). Supports title, price, period, features list, popular flag, custom pricing toggle, visibility toggle, and sort order. Packages are fetched from API on the frontend Maintenance Services page.
- **Page Content Editor:** Manage H1, H2, H3 headings, FAQs, hero images, and internal links for any page with JSON-LD schema markup support.
- **Tracking Codes Manager:** Insert Google Analytics 4, Meta Pixel, and Google Tag Manager codes in header/footer with pre-built templates and code preview.
- **Location-wise Service Pages:** Enhanced location + service combination page template for Local SEO. Supports service name, focus keyword, H1/H2/H3 headings, service features, process steps, why choose us section, FAQs with FAQ schema generation, internal links, LocalBusiness + FAQPage JSON-LD schema, Google search preview, and page duplication for efficient bulk creation. SEO person can create pages like "Interior Design in Dubai Marina" with full control over content and SEO settings.
- **Enhanced Blog SEO:** Blog posts support meta title, meta description, focus keywords, multiple additional images, and internal linking for comprehensive SEO.
- **Reusable Page Templates:** `ServicePageTemplate` for consistent service detail pages, accepting `ServiceData` for dynamic content.
- **Title Formatting Helper:** Auto-generates SEO-friendly titles from slugs, handling common abbreviations.
- **Performance Optimization:** Code splitting via `React.lazy`/`Suspense` for all pages in `App.tsx`, non-render-blocking Google Fonts loading (preload/onload pattern in `index.html`), reduced font weights (only 400/600/700 for Montserrat, 400/700 for Playfair Display), and `loading="lazy"` on all below-the-fold images across the application. Hero images are excluded from lazy loading to preserve LCP scores.
- **Responsive Design:** Mobile-first approach for all devices.
- **Loading & Error States:** User-friendly loading indicators and error handling.
- **Session Management:** Cart persistence managed via `localStorage`.

## External Dependencies

- **Odoo XML-RPC:** Optional integration for CRM lead creation.
- **Google Fonts:** Used for Montserrat and Playfair Display typography.
- **Google Maps:** Embedded on the Contact page for office location.