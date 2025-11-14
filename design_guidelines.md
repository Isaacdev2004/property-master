# Design Guidelines for The Property Masters

## Design Approach

**Reference-Based + Premium Aesthetic Fusion**

Drawing inspiration from interiorcompany.com (elegant spacing and structure), thehealthyhome.me (clean navigation), and renohome.ae (polished e-commerce transitions), while maintaining the specified minimalist premium aesthetic with soft gradients, generous white space, and sharp typography.

## Core Design Principles

**Visual Language:** Warm luxury minimalism - sophisticated beige-gold palette with serif typography for premium feel. Every element serves a purpose, breathing room is intentional, and sophistication comes from restraint rather than embellishment.

**Color Palette:** Warm beige-gold (#f5f1e8 to #faf7f0) with golden accents (hsl(40, 75%, 55%)) replacing the previous amber/orange scheme for a more luxurious, refined aesthetic.

**Hierarchy:** Clear visual flow from hero impact → service showcases → portfolio credibility → conversion points.

## Typography System

**Font Families:**
- Primary: Montserrat or Inter (headlines, navigation, CTAs) - weights 300, 400, 600, 700
- Secondary: Lora or Crimson Pro (accent text, testimonials) - weights 400, 600
- Body: Inter or System stack - weight 400

**Scale:**
- Hero Headlines: text-5xl to text-7xl
- Section Titles: text-3xl to text-4xl  
- Subheadings: text-xl to text-2xl
- Body: text-base to text-lg
- Captions: text-sm

## Layout System

**Spacing Primitives:** Use Tailwind units 4, 6, 8, 12, 16, 20, 24 consistently.

**Section Rhythm:**
- Desktop: py-20 to py-32 for major sections
- Mobile: py-12 to py-16
- Inner content max-width: max-w-7xl with px-6 to px-8

**Grid Strategy:**
- Services: 3-column grid (lg:grid-cols-3, md:grid-cols-2, base: grid-cols-1)
- Portfolio: Masonry-style 3-4 columns with varied heights
- Products: 4-column grid (lg:grid-cols-4, md:grid-cols-3)
- Testimonials: 2-3 column grid

## Component Library

### Navigation
- Fixed header with subtle backdrop blur on scroll
- Logo left, navigation center/right
- Thin border-b with soft shadow on scroll
- Mobile: hamburger with full-screen overlay menu

### Hero Section
- Full viewport height (min-h-screen) with warm beige gradient background
- Left-aligned layout with headline, subtext, and CTA
- Serif typography (Playfair Display) for main headline
- Hero image subtly positioned on right side with low opacity
- Horizontal statistics pill at bottom with golden dividers

### Service Cards
- Clean white cards with subtle shadow and rounded corners (rounded-lg)
- Icon at top (large, 48-64px)
- Title, description, "Learn More" link
- Hover: subtle lift effect (translate-y)

### Portfolio Gallery
- Before/after slider for renovation projects
- Category filter tabs above grid
- Lightbox modal for full-screen viewing
- Project cards with overlay title on hover

### Product Cards (E-Commerce)
- Image with 4:3 or 1:1 aspect ratio
- Product name, price prominent
- "Add to Cart" button appears on hover
- Quick view option

### Booking Form
- Multi-step progress indicator at top
- One step visible at a time with smooth transitions
- Large input fields with labels inside/above
- Next/Previous buttons aligned right

### Testimonials
- Card-based with customer photo, quote, name, location
- 5-star rating display
- Carousel with subtle fade transitions

### Footer
- 4-column layout (Company, Services, Resources, Contact)
- Newsletter signup with inline form
- Social icons, certifications/trust badges
- Copyright and legal links

## Images

**Large Hero Image:** Yes - Full-width hero showcasing completed interior project (luxury living room or commercial space). Should convey sophistication and craftsmanship.

**Additional Images:**
- Service sections: Lifestyle images showing team at work, completed spaces
- Portfolio: 12-20 high-quality before/after project photos
- About page: Team photos, office/workshop images
- Product catalog: Clean product photography on white/neutral backgrounds
- Blog: Featured images for each article

**Image Treatment:**
- Subtle parallax on hero section
- Aspect ratio consistency within each section
- Lazy loading for performance
- Soft rounded corners on card images (rounded-lg)

## Animations & Interactions

**Minimal & Purposeful:**
- Scroll-triggered fade-in for sections (Framer Motion)
- Smooth page transitions between routes
- Hover states: subtle scale (hover:scale-105) or lift
- Form validation with gentle color transitions
- Loading states with elegant spinners

**Avoid:** Excessive parallax, distracting auto-play elements, aggressive animations

## Accessibility

- High contrast text on images with overlays
- Focus states clearly visible on all interactive elements
- Form labels always associated with inputs
- Alt text on all portfolio and product images

## Unique Layout Choices

**Homepage Structure:**
1. Full-screen hero with video background option
2. 3-column service overview (icons + titles)
3. Portfolio masonry grid (6-8 featured projects)
4. Stats bar (projects completed, happy clients, years experience)
5. Testimonial carousel
6. Instagram-style recent work grid
7. CTA section with booking button
8. Footer

**Differentiation:** Asymmetric portfolio grid instead of uniform cards, stats section with animated counters, Instagram-feed style gallery before footer to showcase social proof dynamically.