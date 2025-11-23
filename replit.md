# The Property Masters

## Overview

The Property Masters is a full-stack web application for a luxury interior design, wellness, and property maintenance company in Dubai. It aims to provide a premium online experience with a sophisticated, minimalist design, comprehensive service offerings, e-commerce capabilities, and CRM integration. The project's ambition is to digitally showcase the company's high-end services and products, streamline client interactions, and support business growth in the luxury market.

## User Preferences

- Luxury minimalist design aesthetic
- Warm color palette (amber/orange primary)
- Generous white space
- Smooth, subtle animations
- Premium feel throughout the application
- Mobile-first responsive design

## System Architecture

The application is built with a React 18, TypeScript, and Tailwind CSS frontend, using Wouter for routing, Framer Motion for animations, and Shadcn UI for components. The backend uses Express.js with TypeScript and an in-memory data store (`MemStorage`). Data fetching is managed by TanStack Query v5, and forms utilize React Hook Form with Zod validation.

**UI/UX Decisions:**
The design adheres to a warm luxury minimalist aesthetic with a full-width brand-focused hero section. The hero features a luxury living room background image with a dark gradient overlay (black/70 to black/30) for text readability. White text with drop shadows is centered over the image with responsive sizing. Gold color (#D7A144) is used for CTAs and accents. Navigation features bold white text with drop shadows when on the hero section, switching to dark text with white background when scrolled. Stats pill displays 4 statistics with gold dividers, positioned below the hero. EMI badge has a frosted glass effect (backdrop blur).

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
- **Comprehensive Homepage:** Showcases ALL THREE service categories (Interior Design & Fit-Out, Wellness Services, Maintenance Services) reflecting the complete property solutions offering. Includes full-width hero emphasizing "Complete Property Solutions Partner", statistics pill (5000+ projects, 200+ experts, 3 services), All Your Property Needs section featuring all three services, Why Choose Us (6 benefits), Our Proven 5-Step Process, factory tour video, product collection, design ideas gallery, and testimonials from clients across all service areas.
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