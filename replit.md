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
- **Comprehensive Homepage:** Features full-width hero emphasizing "Complete Property Solutions Partner", followed by testimonials marquee section. Includes sticky scroll services showcasing ALL FOUR service offerings (Interior Design & Fit-Out, Wellness Services, Maintenance Services, Premium Furniture Store), Signature Spaces Showcase (bento-style grid with 6 project archetypes), Why Choose Us (6 benefits), "Listen to Our Customers" featured testimonials section, Blog Section with expert tips, and final CTA section.
- **Signature Spaces Showcase Section:** Bento-style grid inspired by Heffl.com's "One Platform, Infinite Solutions" featuring 6 catalog items: Luxury Residences (hero tile, spans 2 cols/rows), Corporate Offices, Wellness Sanctuaries, Hospitality Retreats, Bespoke Furniture Atelier, and Smart Maintenance Command. Each item includes immersive imagery, gold accent typography, metrics/KPIs, and CTAs linking to relevant pages.
- **Real Stories, Real Results Section:** Marquee-style testimonials section inspired by Heffl.com with two rows of continuously scrolling testimonial cards (one left-to-right, one right-to-left). Features 8 authentic testimonials covering all service areas with 5-star ratings, customer quotes, names, and company information. Replaces the previous statistics pill section to build trust through social proof.
- **Listen to Our Customers Section:** Featured testimonials section after "Why Choose Us", inspired by Heffl.com. Includes a featured testimonial with large quote, video CTA placeholder, and author details; a 5-card grid of customer testimonials with star ratings; and trust indicators bar showing "500+ Happy Clients" and "4.9/5 Average Rating". Uses gold accent colors and luxury-grade animations.
- **Blog Section:** "Stay Ahead with Expert Tips" section inspired by Heffl.com. Features a large featured article card with full excerpt, and 3 smaller horizontal blog post cards. Includes color-coded category badges (Interior Design, Wellness, Maintenance, Furniture), author avatars, read times, and dates. Newsletter subscription form at bottom. Links to /blog page.
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