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
The design adheres to a warm luxury minimalist aesthetic with 100% pixel-perfect matching to interiorcompany.com reference site. Features a beige-gold color palette (#f5f1e8 to #faf7f0 gradient), Playfair Display for headings (64px/74px line-height), and Montserrat for body text (24px/34px weight 300 for subheadlines). Hero section has left-aligned content at 560px max-width with hero image flush right at full opacity, 96px desktop gutters, and 120px vertical padding. Stats pill shows 4 statistics with gold dividers (#D7A144), third stat displaying "10 CITIES | 2 COUNTRIES" on single line. Low Cost EMI badge positioned near CTA with cream background and gold border. Button styling uses rounded-full shape with rich gold (#D7A144) background. All animations are subtle and smooth using Framer Motion.

**Technical Implementations & Features:**
- **Dynamic Mega Menu Navigation:** Services are organized into three main categories (Interior Design & Fit-Out Works, Wellness Services, Maintenance Services) with dynamic backend-fetched content.
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