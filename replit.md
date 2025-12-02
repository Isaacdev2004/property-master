# The Property Masters

## Overview

The Property Masters is a full-stack web application for a luxury interior design, wellness, and property maintenance company in Dubai. It aims to provide a premium online experience with a sophisticated, minimalist design, comprehensive service offerings, e-commerce capabilities, and CRM integration. The project's ambition is to digitally showcase the company's high-end services and products, streamline client interactions, and support business growth in the luxury market.

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
The design adheres to a warm luxury minimalist aesthetic with a full-width brand-focused hero section. The hero features a luxury living room background image with a dark gradient overlay (black/70 to black/30) for text readability. White text with drop shadows is centered over the image with responsive sizing. Maroon color (#970A44) is used for CTAs and accents, replacing the previous gold theme. Navigation features bold white text with drop shadows when on the hero section, switching to dark text with white background when scrolled. Stats pill displays 4 statistics with maroon dividers, positioned below the hero. EMI badge has a frosted glass effect (backdrop blur).

**Animation System (Inspired by Heffl.com):**
All animations use professional easing curves `[0.25, 0.46, 0.45, 0.94]` with Framer Motion for smooth, luxury-grade interactions:
- **Hero Section:** Sequential reveal with scale/fade effects (heading → paragraph → CTAs) for polished entrance
- **Statistics Section:** Stagger animation with scale effects for progressive reveal
- **Sticky Scroll Services:** Clean card transitions with opacity control (active=1, inactive=0) to prevent overlay bleed-through
- **Why Choose Us:** Stagger grid with subtle lift (y: -8px) on hover, icon rotation (5°)
- **Our Process:** Stagger grid with subtle step badge interaction (scale: 1.08, rotate: 3°), progressive line reveals
- **Products Section:** Stagger grid animation, card hover lift (y: -8px), image zoom on hover (scale: 1.1)
- All hover states are subtle and refined, matching the luxury minimalist aesthetic with no jarring or dramatic motions

**Technical Implementations & Features:**
- **Dynamic Mega Menu Navigation:** Services are organized into three main categories (Interior Design & Fit-Out Works, Wellness Services, Maintenance Services) with dynamic backend-fetched content. Navigation has 5 main items with logo-only branding (no business title text), improved visibility with bg-black/40 backdrop blur on hero.
- **Comprehensive Homepage:** Features full-width hero emphasizing "Complete Property Solutions Partner", followed by testimonials marquee section. Includes sticky scroll services showcasing ALL FOUR service offerings (Interior Design & Fit-Out, Wellness Services, Maintenance Services, Premium Furniture Store), Signature Spaces Showcase (bento-style grid with 6 project archetypes), Why Choose Us (6 benefits), "Listen to Our Customers" featured testimonials section, Blog Section with expert tips, and final CTA section.
- **Signature Spaces Showcase Section:** Bento-style grid inspired by Heffl.com's "One Platform, Infinite Solutions" featuring 6 catalog items: Luxury Residences (hero tile, spans 2 cols/rows), Corporate Offices, Wellness Sanctuaries, Hospitality Retreats, Bespoke Furniture Atelier, and Smart Maintenance Command. Each item includes immersive imagery, maroon accent typography, metrics/KPIs, and CTAs linking to relevant pages.
- **Real Stories, Real Results Section:** Marquee-style testimonials section inspired by Heffl.com with two rows of continuously scrolling testimonial cards (one left-to-right, one right-to-left). Features 8 authentic testimonials covering all service areas with 5-star ratings, customer quotes, names, and company information. Replaces the previous statistics pill section to build trust through social proof.
- **Listen to Our Customers Section:** Featured testimonials section after "Why Choose Us", inspired by Heffl.com. Includes a featured testimonial with large quote, video CTA placeholder, and author details. Uses maroon accent colors and luxury-grade animations.
- **Blog Section:** "Stay Ahead with Expert Tips" section inspired by Heffl.com. Features a large featured article card with full excerpt, and 3 smaller horizontal blog post cards. Includes color-coded category badges (Interior Design, Wellness, Maintenance, Furniture), author avatars, read times, and dates. Newsletter subscription form at bottom. Links to /blog page.
- **Maintenance Services Page (hitchesglitches.com inspired):** Complete redesign matching the reference site with all sections, plus individual service detail pages for all 16 maintenance services:
  - Hero: Parallax effect with "Quality Repairs & Maintenance, Hassle-Free" tagline, "Best Home Maintenance Company in UAE" headline, 4 feature badges (Guaranteed Satisfaction, Online Booking, Emergency Response, 24/7 Working days)
  - Services Grid: 16 service cards with brand-colored icons including Disinfection, Kitchen Equipment, Civil Work, Smart Products, Pest Control, Swimming Pool, Plumbing, Electrical, AC, Cleaning, Security, and Maintenance Packages
  - Free Consultation CTA: Full-width maroon banner with patterned background
  - How It Works: Split layout with video placeholder on left, 3-step process (Select service, Book time, Relax) on right with company description
  - Maintenance Packages: 4 pricing cards (Basic AED 1458/year, Standard AED 2508/year, Executive AED 3768/year, Custom)
  - Statistics: 40+ Years Expertise, 3000+ Customers, 2,500+ Properties, 8000+ Staff
  - Client Feedback: Testimonials carousel with navigation arrows and dots
  - Latest News & Blogs: 4 blog post cards with hover effects
  - Final CTA with two action buttons
- **Ecommerce Shop Page (interiorcompany.com & thehealthyhome.me inspired):** Complete redesign matching both reference sites with rich features:
  - Hero: Parallax effect with stats (10,000+ Happy Customers, 4.9/5 Google Rating, 5,000+ Products Delivered, 15+ Years of Excellence), EMI badge with frosted glass effect
  - Quick Category Icons: 9 category icons with hover animations (Sofas, Beds, Tables, Chairs, Lighting, Clocks, Kitchen, Decor, All Products)
  - Featured Collections: Horizontal scrolling cards with discount badges (Up to X% Off), arrow navigation, product category images
  - Factory Tour Section: "From Concept to Creation" split layout with video placeholder and manufacturing stats
  - Design Ideas Section: Tabbed gallery (Living Room, Bedroom, Kitchen, Dining Room, Office, Outdoor) with hover effects
  - Benefits Bar: Free Delivery, Quality Guarantee, 24/7 Support, Easy Returns
  - Product Grid: Category filters, hover quick actions (wishlist, quick view, add to cart), discount badges, ratings
  - Final CTA: "Ready to Transform Your Space?" with consultation booking
  - Product Detail Page: Image gallery with thumbnails, quantity selector, wishlist/share buttons, product features, related products
- **Comprehensive Page Set:** Includes Homepage, dynamic Services pages, About (with quality hero image), Portfolio with custom before/after comparison slider and quality hero image, Shop with cart functionality, multi-step Book Service form, Blog, and Contact page (with quality hero image). All hero sections feature professional stock photography with dark gradient overlays for text readability.
- **Form Validation:** Client-side and server-side validation using Zod.
- **Responsive Design:** Mobile-first approach ensuring functionality across all devices.
- **Loading & Error States:** User-friendly loading indicators (skeleton loaders) and graceful error handling.
- **Session Management:** Cart persistence is managed using `localStorage`.

**System Design Choices:**
The application integrates with external APIs for all data fetching. It employs a modular structure with dedicated folders for components, pages, and utilities in the frontend, and separate modules for storage, routes, and CRM integration in the backend.

## External Dependencies

- **Odoo XML-RPC:** Optional integration for CRM lead creation via booking and contact forms.
- **Google Fonts:** For Montserrat and Playfair Display typography.
- **Google Maps:** Embedded map on the Contact page to show office location. (Requires API key for full functionality).