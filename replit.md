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
The design adheres to a warm luxury minimalist aesthetic with a full-width brand-focused hero section. The hero features a luxury living room background image with a dark gradient overlay (black/70 to black/30) for text readability. White text with drop shadows is centered over the image with responsive sizing. Gold color (#D7A144) is used for CTAs and accents. Navigation features bold white text with drop shadows when on the hero section, switching to dark text with white background when scrolled. Stats pill displays 4 statistics with gold dividers, positioned below the hero. EMI badge has a frosted glass effect (backdrop blur). All animations are subtle and smooth using Framer Motion.

**Technical Implementations & Features:**
- **Dynamic Mega Menu Navigation:** Services are organized into three main categories (Interior Design & Fit-Out Works, Wellness Services, Maintenance Services) with dynamic backend-fetched content. Navigation has 5 main items with improved visibility and styling.
- **Comprehensive Homepage:** Includes full-width hero with brand image, statistics pill, Complete Turnkey Services, Why Choose Us (6 benefits with icons), Our Proven 5-Step Process (consultation to handover), factory tour video section, product collection showcase, design ideas gallery with tabs, client testimonials, and final CTA section.
- **Comprehensive Page Set:** Includes Homepage, dynamic Services pages, About, Portfolio with a custom before/after comparison slider, Shop with cart functionality, multi-step Book Service form, Blog, and Contact page.
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