import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { 
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

interface ServiceContent {
  title: string;
  heroImage: string;
  introParagraphs: string[];
  scopeTitle?: string;
  scopeIntro?: string;
  scopeItems: { title: string; description: string }[];
  approachTitle: string;
  approachIntro: string;
  approachPoints: string[];
  approachOutro?: string;
  whyChooseTitle: string;
  whyChooseContent: string;
  processTitle: string;
  processIntro: string;
  processSteps: string[];
  processOutro: string;
  ctaQuestion: string;
  ctaAnswer: string;
}

const servicesContent: Record<string, ServiceContent> = {
  residential: {
    title: "Residential Interior Design & Renovation in Dubai",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    introParagraphs: [
      "A home should feel comfortable and easy to live in. In Dubai, that requires careful space planning, materials that handle climate conditions, and layouts that support daily routines.",
      "Our Residential Interior Design & Renovation service focuses on creating homes that feel balanced, functional, and comfortable over time. We design with real living in mind, whether the project involves a full renovation or selected upgrades."
    ],
    scopeTitle: "Service Scope",
    scopeItems: [
      { title: "Full home interior renovation", description: "" },
      { title: "Apartment interior design", description: "" },
      { title: "Villa interior design", description: "" },
      { title: "Partial renovations and room upgrades", description: "" }
    ],
    approachTitle: "Our Residential Approach",
    approachIntro: "We prioritize:",
    approachPoints: [
      "Function before finish",
      "Materials that last",
      "Cohesive design across the home"
    ],
    approachOutro: "Each project is planned to ensure consistency across spaces and finishes.",
    whyChooseTitle: "Why Homeowners Work With Us",
    whyChooseContent: "Homeowners value our structured approach, clear communication, and ability to manage details that often cause stress during renovations.",
    processTitle: "",
    processIntro: "",
    processSteps: [],
    processOutro: "",
    ctaQuestion: "Considering a residential interior renovation in Dubai?",
    ctaAnswer: "Speak with our team to plan your home with confidence."
  },
  kitchen: {
    title: "Kitchen Remodeling & Modular Kitchens in Dubai",
    heroImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    introParagraphs: [
      "Kitchens are one of the most demanding spaces in a home. Heat, moisture, and daily use require layouts and materials that work reliably over time.",
      "Our kitchen remodeling services focus on workflow, storage efficiency, and finishes that are easy to maintain."
    ],
    scopeTitle: "What We Design",
    scopeItems: [
      { title: "Kitchen remodeling", description: "" },
      { title: "Modular kitchen layouts", description: "" },
      { title: "Custom cabinetry and storage", description: "" },
      { title: "Wall tiles and backsplashes", description: "" },
      { title: "False ceilings and lighting", description: "" },
      { title: "Quartz and natural stone countertops", description: "" }
    ],
    approachTitle: "Our Kitchen Design Approach",
    approachIntro: "",
    approachPoints: [
      "Efficient movement between cooking, washing, and storage",
      "Materials selected for durability",
      "Storage planned around real usage"
    ],
    whyChooseTitle: "",
    whyChooseContent: "",
    processTitle: "",
    processIntro: "",
    processSteps: [],
    processOutro: "",
    ctaQuestion: "Looking to remodel or upgrade your kitchen in Dubai?",
    ctaAnswer: "Contact our team to discuss the right solution for your space."
  },
  "living-room": {
    title: "Living Room Interior Design in Dubai",
    heroImage: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    introParagraphs: [
      "The living room is where daily life unfolds. It needs to feel comfortable, open, and easy to use without being overdesigned.",
      "We design living rooms that support everyday routines while maintaining a calm, balanced appearance."
    ],
    scopeTitle: "What This Service Includes",
    scopeItems: [
      { title: "Layout planning and space flow", description: "" },
      { title: "TV unit design", description: "" },
      { title: "False ceiling design", description: "" },
      { title: "Lighting planning", description: "" },
      { title: "Wall finishes and flooring coordination", description: "" }
    ],
    approachTitle: "Our Living Room Approach",
    approachIntro: "Comfort, balance, and ease of maintenance guide every design decision.",
    approachPoints: [],
    whyChooseTitle: "",
    whyChooseContent: "",
    processTitle: "",
    processIntro: "",
    processSteps: [],
    processOutro: "",
    ctaQuestion: "Planning to redesign your living room?",
    ctaAnswer: "Connect with our team to explore design options that fit your home."
  },
  "master-bedroom": {
    title: "Master Bedroom Interior Design in Dubai",
    heroImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    introParagraphs: [
      "A master bedroom is a personal space. It's where the day starts and ends, and it should feel calm, comfortable, and easy to live in. Unlike shared areas of the home, this space is not designed to impress others. It's designed to support rest, routine, and privacy.",
      "In Dubai homes, master bedrooms also need to respond to constant air conditioning, changing natural light, and storage needs that often grow over time. When these factors are not considered properly, bedrooms can quickly feel cluttered, poorly lit, or uncomfortable.",
      "Our Master Bedroom Interior Design service focuses on creating spaces that feel balanced and practical, while maintaining a sense of quiet refinement."
    ],
    scopeTitle: "What This Service Covers",
    scopeIntro: "Master bedroom design works best when layout, storage, and lighting are planned together. Treating these elements separately often leads to compromises later.",
    scopeItems: [
      { title: "Layout Planning & Space Flow", description: "We begin by planning how the room is used on a daily basis. Bed placement, circulation space, and access to wardrobes or balconies are carefully considered to ensure the room feels open and easy to move through." },
      { title: "Wardrobe Design & Storage Planning", description: "Wardrobes are designed around real storage habits, not generic shelving. Internal layouts are planned to accommodate daily clothing, seasonal items, and accessories, helping keep the bedroom organized without overwhelming the space." },
      { title: "Lighting Design", description: "Lighting is planned to support different moments throughout the day. General lighting, bedside lighting, and softer ambient options are combined to create comfort without harsh brightness or visual clutter." },
      { title: "Wall Finishes & Material Selection", description: "Wall finishes and materials are selected to create a calm atmosphere. Colors and textures are chosen to feel warm and balanced, while remaining easy to maintain over time." },
      { title: "Dressing Area Integration", description: "Where space allows, dressing areas are integrated smoothly with wardrobes and mirrors. These areas are planned to avoid congestion and improve daily routines." }
    ],
    approachTitle: "Our Design Approach for Master Bedrooms",
    approachIntro: "A well-designed bedroom should feel natural, not overly styled. We focus on:",
    approachPoints: [
      "Comfort over trends, so the space ages well",
      "Thoughtful storage that supports daily routines",
      "A cohesive look that feels calm and uncluttered"
    ],
    approachOutro: "Every decision is made with long-term usability in mind.",
    whyChooseTitle: "Why Homeowners Choose Us for Master Bedroom Design",
    whyChooseContent: "Homeowners choose us because small mistakes in bedroom design affect comfort every single day. Poor lighting, awkward layouts, or impractical storage quickly become frustrating. We help clients make clear, practical decisions that improve comfort, support better rest, and keep the bedroom easy to maintain over time.",
    processTitle: "How Master Bedroom Projects Are Handled",
    processIntro: "Our process is simple and structured:",
    processSteps: [
      "Understanding lifestyle needs and preferences",
      "Planning layout, storage, and lighting together",
      "Finalizing materials and finishes before execution",
      "Executing with attention to detail and finish quality",
      "Reviewing the space carefully before handover"
    ],
    processOutro: "This approach helps avoid last-minute changes and ensures the final result matches expectations.",
    ctaQuestion: "Planning a master bedroom interior in Dubai?",
    ctaAnswer: "Our team can help you design a space that feels comfortable, balanced, and easy to live in."
  },
  "kids-room": {
    title: "Kids Room Interior Design in Dubai",
    heroImage: "https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    introParagraphs: [
      "A kids' room needs to support more than sleep. It's a place for play, learning, creativity, and quiet time, often all within the same space. As children grow, their needs change quickly, and a poorly planned room can feel outdated or impractical in a short time.",
      "In Dubai homes, kids' rooms also need to handle daily activity, frequent cleaning, and long hours indoors. Design choices that look good initially but lack flexibility or durability often become a problem later.",
      "Our Kids Room Interior Design service focuses on creating spaces that are safe, flexible, and easy to adapt as children grow, without requiring constant redesign."
    ],
    scopeTitle: "What This Service Covers",
    scopeIntro: "A good kids' room design balances structure and freedom. Each element is planned to support everyday use while allowing the room to evolve over time.",
    scopeItems: [
      { title: "Layout Planning & Space Use", description: "We plan layouts that allow clear areas for play, study, and rest without crowding the room. Furniture placement is designed to keep movement open and avoid tight or unsafe zones." },
      { title: "Age-Appropriate Design", description: "Design decisions are guided by the child's current age while keeping future needs in mind. This helps the room grow with the child rather than feeling too specific or restrictive." },
      { title: "Storage & Organization", description: "Storage is planned to support daily routines, from toys and books to clothing and school supplies. Easy-to-reach storage encourages organization while keeping the room visually calm." },
      { title: "Safe Materials & Finishes", description: "Materials and finishes are selected with safety and durability in mind. We avoid fragile surfaces, sharp edges, and finishes that are difficult to maintain in active environments." },
      { title: "Study & Activity Zones", description: "Where space allows, we define clear zones for study, creative activities, and rest. This helps children focus better and keeps the room balanced and functional." }
    ],
    approachTitle: "Our Design Approach for Kids' Rooms",
    approachIntro: "Kids' rooms should feel supportive, not overwhelming. Our approach focuses on:",
    approachPoints: [
      "Flexibility, so the room adapts as needs change",
      "Practical layouts that support daily routines",
      "Finishes that handle wear without constant upkeep"
    ],
    approachOutro: "The goal is to create a space that works well for both children and parents.",
    whyChooseTitle: "Why Parents Choose Us for Kids Room Design",
    whyChooseContent: "Parents choose us because kids' rooms require thoughtful planning. Designs that are too themed or overly decorative often lose relevance quickly and limit future use. We help parents make balanced decisions that support learning, play, and rest, while keeping the room easy to manage over time.",
    processTitle: "How Kids Room Projects Are Handled",
    processIntro: "Our process is clear and structured:",
    processSteps: [
      "Understanding the child's age, habits, and space requirements",
      "Planning layout, storage, and activity zones together",
      "Finalizing materials and finishes before execution",
      "Executing with attention to safety and detailing",
      "Reviewing the room carefully before handover"
    ],
    processOutro: "This approach helps ensure the room remains functional and comfortable long term.",
    ctaQuestion: "Planning a kids' room interior in Dubai?",
    ctaAnswer: "Our team can help design a space that grows with your child and supports everyday life."
  },
  wardrobe: {
    title: "Wardrobe & Storage Solutions in Dubai",
    heroImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    introParagraphs: [
      "Storage affects how a home feels more than most people realize. When wardrobes and storage are poorly planned, rooms start to feel cluttered, movement becomes awkward, and everyday routines feel harder than they should.",
      "In Dubai homes, storage needs are often underestimated. Seasonal clothing, shared wardrobes, and limited apartment space make thoughtful storage design essential. Simply adding cabinets rarely solves the problem if the internal layout doesn't match how the space is actually used.",
      "Our Wardrobe & Storage Solutions focus on creating storage that fits naturally into the room, supports daily habits, and remains practical over time without overwhelming the interior."
    ],
    scopeTitle: "What This Service Covers",
    scopeIntro: "Good storage is about planning, not quantity. Each solution is designed based on space, usage, and lifestyle needs.",
    scopeItems: [
      { title: "Built-In Wardrobes", description: "Built-in wardrobes are designed to integrate seamlessly with the room. We plan proportions, door styles, and internal layouts so the wardrobe feels balanced and does not dominate the space." },
      { title: "Walk-In Wardrobes", description: "Walk-in wardrobes are planned for comfort and accessibility. Hanging areas, shelving, drawers, and mirrors are arranged to allow easy movement and clear visibility without congestion." },
      { title: "Modular Storage Systems", description: "Modular storage systems offer flexibility and efficient installation. These systems work well where clean lines, controlled costs, and adaptability are important." },
      { title: "Custom Storage Solutions", description: "Some spaces require tailored solutions. We design custom storage for irregular layouts, unused corners, and specific needs such as accessories, seasonal items, or shared wardrobes." }
    ],
    approachTitle: "Our Approach to Storage Design",
    approachIntro: "Storage should quietly support daily life rather than draw attention to itself. Our approach focuses on:",
    approachPoints: [
      "Designing internal layouts around real usage",
      "Keeping storage visually balanced with the room",
      "Selecting durable materials and hardware for frequent use"
    ],
    approachOutro: "Every storage solution is planned to remain functional and comfortable over time.",
    whyChooseTitle: "Why Homeowners Choose Us for Wardrobe & Storage Design",
    whyChooseContent: "Homeowners choose us because storage problems are felt every day. Poorly planned storage leads to constant frustration, while well-designed storage improves routines without being noticed. We help clients make practical decisions that improve organization, maintain visual calm, and make better use of available space.",
    processTitle: "How Wardrobe & Storage Projects Are Handled",
    processIntro: "Our process is clear and structured:",
    processSteps: [
      "Understanding storage habits and space limitations",
      "Planning internal layouts and external finishes together",
      "Finalizing details before execution begins",
      "Installing with attention to alignment and functionality",
      "Reviewing operation and finish quality before handover"
    ],
    processOutro: "This approach helps avoid future adjustments and ensures the storage works as intended.",
    ctaQuestion: "Looking to improve storage in your home?",
    ctaAnswer: "Our team can help plan wardrobe and storage solutions that suit your space and lifestyle."
  },
  bathroom: {
    title: "Bathroom Interior Design & Renovation in Dubai",
    heroImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    introParagraphs: [
      "Bathrooms are among the most frequently used spaces in any home, yet they are often the most overlooked during planning. In Dubai homes, bathrooms must handle constant moisture, regular cleaning, and daily use without developing long-term issues such as leaks, staining, or ventilation problems.",
      "A well-designed bathroom should feel comfortable and easy to use while remaining durable over time. Poor layout or material choices can quickly lead to maintenance problems and discomfort.",
      "Our Bathroom Interior Design & Renovation service focuses on creating bathrooms that are practical, well-planned, and built to perform reliably in Dubai's climate."
    ],
    scopeTitle: "What This Service Covers",
    scopeIntro: "Bathroom design requires careful coordination between layout, finishes, and technical elements. Each part of the space needs to work together.",
    scopeItems: [
      { title: "Bathroom Layout Planning", description: "We plan bathroom layouts to allow comfortable movement and proper spacing between fixtures. Clearances, access, and usability are carefully considered to avoid cramped or awkward arrangements." },
      { title: "Vanity Units & Storage", description: "Vanity units are designed to balance storage and accessibility. Storage is planned for daily essentials while keeping surfaces uncluttered and easy to clean." },
      { title: "Tile Selection & Surface Finishes", description: "Tiles and surface finishes are selected based on water exposure, slip resistance, and ease of maintenance. We guide clients toward materials that perform well in humid environments and retain their appearance over time." },
      { title: "Fixtures & Fittings Coordination", description: "Basins, mixers, showers, and accessories are selected to suit water pressure conditions and usage requirements. Coordination ensures reliability, comfort, and consistent visual style." },
      { title: "Shower & Wet Area Design", description: "Wet areas are planned with proper drainage, waterproofing, and ventilation in mind. This helps prevent water damage and moisture-related issues in the long term." }
    ],
    approachTitle: "Our Bathroom Design Approach",
    approachIntro: "A good bathroom design feels simple and intuitive to use. Our approach focuses on:",
    approachPoints: [
      "Functional layouts that support daily routines",
      "Moisture-resistant materials suited to frequent cleaning",
      "Clean, balanced design that avoids unnecessary complexity"
    ],
    approachOutro: "The goal is a bathroom that remains comfortable, reliable, and easy to maintain.",
    whyChooseTitle: "Why Homeowners Choose Us for Bathroom Design",
    whyChooseContent: "Homeowners choose us because bathroom renovations require accuracy and experience. Small mistakes can lead to recurring problems that are costly and disruptive to fix later. We help clients make informed decisions that improve comfort, safety, and durability while keeping the bathroom visually calm and practical.",
    processTitle: "How Bathroom Projects Are Handled",
    processIntro: "Our process is structured to reduce risk and ensure clarity:",
    processSteps: [
      "Reviewing the existing bathroom layout and conditions",
      "Planning layout, finishes, and fixtures together",
      "Finalizing all selections before execution",
      "Executing with attention to waterproofing and detailing",
      "Reviewing functionality and finish quality before handover"
    ],
    processOutro: "This approach helps ensure the bathroom performs well long after completion.",
    ctaQuestion: "Planning a bathroom interior design or renovation in Dubai?",
    ctaAnswer: "Our team can help you create a bathroom that works reliably every day."
  },
  painting: {
    title: "Interior Painting Services in Dubai",
    heroImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    introParagraphs: [
      "Interior painting does more than change how a space looks. It affects how rooms feel, how light behaves, and how well surfaces age over time. In Dubai homes and commercial spaces, paint also needs to handle air conditioning, temperature changes, and regular cleaning without peeling, fading, or staining too quickly.",
      "Poor surface preparation or incorrect paint selection often leads to uneven finishes and early wear. That's why interior painting should be treated as a technical service, not just a finishing touch.",
      "Our Interior Painting Services focus on clean preparation, suitable materials, and consistent application to ensure durable, even results."
    ],
    scopeTitle: "What This Service Covers",
    scopeIntro: "Interior painting is planned around surface condition, usage, and long-term performance.",
    scopeItems: [
      { title: "Wall Painting", description: "Walls are prepared carefully before painting to ensure smooth, even finishes. Paint selection is guided by room usage, lighting conditions, and ease of maintenance." },
      { title: "Door & Window Painting", description: "Doors and windows require paints that resist frequent handling and cleaning. Proper preparation and finishing help prevent chipping and visible wear." },
      { title: "Staircase Painting", description: "Staircases experience heavy use and require durable finishes. Paint systems are selected to maintain appearance while handling foot traffic and regular cleaning." },
      { title: "Tile Repainting", description: "Where full tile replacement is not required, tile repainting provides a refreshed look. This option is considered carefully based on surface condition and suitability." },
      { title: "Surface Preparation & Finishing", description: "All painting work includes proper surface preparation, including cleaning, minor repairs, and priming. This step is essential for long-lasting results." }
    ],
    approachTitle: "Our Painting Approach",
    approachIntro: "A good paint finish depends on what happens before the paint is applied. Our approach focuses on:",
    approachPoints: [
      "Careful surface assessment",
      "Proper preparation and priming",
      "Paint systems suited to room conditions",
      "Clean application and detailing"
    ],
    approachOutro: "This ensures consistent results across different areas of the property.",
    whyChooseTitle: "Why Clients Choose Us for Interior Painting",
    whyChooseContent: "Clients choose us because interior painting affects the overall quality of a space. Uneven finishes or premature wear can undermine an otherwise well-designed interior. We help clients choose appropriate paint solutions and execute the work with attention to detail, minimizing disruption and ensuring reliable results.",
    processTitle: "How Interior Painting Projects Are Handled",
    processIntro: "Our process is straightforward and controlled:",
    processSteps: [
      "Assessing surface conditions and requirements",
      "Recommending suitable paint types and finishes",
      "Preparing surfaces properly before painting",
      "Applying paint with attention to consistency",
      "Reviewing finish quality before completion"
    ],
    processOutro: "This approach helps maintain both appearance and durability.",
    ctaQuestion: "Planning interior painting work in Dubai?",
    ctaAnswer: "Our team can help deliver clean, durable finishes suited to your space."
  },
  gypsum: {
    title: "Gypsum Partitions & False Ceilings in Dubai",
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    introParagraphs: [
      "Gypsum work plays a key role in shaping interior spaces. Whether it's dividing areas, improving proportions, or supporting lighting design, gypsum partitions and false ceilings allow interiors to be refined without heavy structural changes.",
      "In Dubai properties, gypsum installations must be planned carefully to account for ceiling heights, air-conditioning systems, and long-term durability. Poor execution can lead to cracks, uneven finishes, or maintenance issues over time.",
      "Our Gypsum Partitions & False Ceiling services focus on clean execution, practical design, and finishes that integrate seamlessly with the overall interior."
    ],
    scopeTitle: "What This Service Covers",
    scopeIntro: "Gypsum work is approached as part of the interior design process, not as an isolated task.",
    scopeItems: [
      { title: "Gypsum Partitions", description: "Gypsum partitions are used to divide spaces efficiently without permanent construction. We plan partition placement to maintain natural flow, light distribution, and practical use of space." },
      { title: "False Ceiling Design", description: "False ceilings are designed to improve room proportions and support lighting without making the space feel low or enclosed. Designs are kept clean and purposeful, avoiding unnecessary complexity." },
      { title: "Lighting Integration", description: "Gypsum ceilings are planned to accommodate lighting layouts, including recessed and concealed lighting, ensuring fixtures are positioned correctly and evenly." },
      { title: "Concealment of Services", description: "Gypsum work allows electrical wiring, ducting, and other services to be concealed neatly, contributing to a cleaner interior appearance." },
      { title: "Finishing & Detailing", description: "Attention is given to joints, edges, and surface finishes to ensure smooth, uniform results that age well over time." }
    ],
    approachTitle: "Our Gypsum Design Approach",
    approachIntro: "Good gypsum work should feel subtle and well integrated. Our approach focuses on:",
    approachPoints: [
      "Practical layouts that support space usage",
      "Proportions that enhance room height and balance",
      "Clean detailing and long-lasting finishes"
    ],
    approachOutro: "Each installation is planned to support both function and appearance.",
    whyChooseTitle: "Why Clients Choose Us for Gypsum Works",
    whyChooseContent: "Clients choose us because gypsum installations affect both appearance and functionality. Poor planning or finishing can undermine the quality of the entire interior. We ensure gypsum work is executed with precision, aligned with the overall design intent, and completed to a consistent standard.",
    processTitle: "How Gypsum Projects Are Handled",
    processIntro: "Our process is structured and controlled:",
    processSteps: [
      "Reviewing space requirements and ceiling conditions",
      "Planning partition and ceiling layouts",
      "Finalizing lighting and service coordination",
      "Executing gypsum installation with attention to detail",
      "Reviewing finish quality before completion"
    ],
    processOutro: "This approach ensures clean results and minimizes future issues.",
    ctaQuestion: "Planning gypsum partitions or false ceiling work in Dubai?",
    ctaAnswer: "Our team can help design and execute solutions that fit your space and interior style."
  },
  countertops: {
    title: "Quartz & Natural Stone Countertops in Dubai",
    heroImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    introParagraphs: [
      "Countertops are among the most heavily used surfaces in any interior. In kitchens, bathrooms, and dining areas, they must handle heat, moisture, regular cleaning, and daily wear without losing their finish or strength.",
      "In Dubai homes, countertop selection requires extra care. Temperature changes, humidity, and usage patterns can quickly expose poor material choices or improper installation.",
      "Our Quartz & Natural Stone Countertop services focus on selecting the right surface for the right application and installing it with precision to ensure long-term performance and visual consistency."
    ],
    scopeTitle: "What This Service Covers",
    scopeIntro: "We work with a range of quartz and natural stone options, guiding clients based on usage, maintenance expectations, and design goals.",
    scopeItems: [
      { title: "Quartz Countertops", description: "Quartz surfaces are engineered for durability and consistency. They resist staining, require minimal maintenance, and work well in kitchens and bathrooms where hygiene and ease of cleaning are important." },
      { title: "Natural Stone Countertops", description: "Natural stone options such as marble and granite offer unique patterns and character. These materials are selected carefully based on location and usage to ensure they perform well over time." },
      { title: "Countertop Application & Placement", description: "Countertops are planned according to how the space is used. Edge profiles, thickness, and joint placement are considered to balance durability and appearance." },
      { title: "Fabrication & Installation", description: "Accurate measurement, cutting, and installation are essential for a clean finish. Attention is given to alignment, sealing, and surface protection during installation." }
    ],
    approachTitle: "Our Countertop Selection Approach",
    approachIntro: "Choosing a countertop is not just a design decision. We consider:",
    approachPoints: [
      "Heat and moisture exposure",
      "Frequency of use",
      "Maintenance requirements",
      "Compatibility with cabinetry and finishes"
    ],
    approachOutro: "This helps ensure the selected surface remains practical and visually consistent.",
    whyChooseTitle: "Why Clients Choose Us for Countertop Works",
    whyChooseContent: "Clients choose us because countertop issues are difficult and expensive to correct once installed. We help clients understand the differences between materials, manage expectations, and ensure installation is done correctly from the start.",
    processTitle: "How Countertop Projects Are Handled",
    processIntro: "Our process is clear and controlled:",
    processSteps: [
      "Reviewing space requirements and usage",
      "Recommending suitable quartz or stone options",
      "Taking precise measurements",
      "Fabricating and installing with attention to detail",
      "Reviewing finish and sealing before handover"
    ],
    processOutro: "This approach helps deliver reliable, long-lasting results.",
    ctaQuestion: "Planning quartz or natural stone countertops in Dubai?",
    ctaAnswer: "Our team can help you select and install surfaces that balance durability and design."
  },
  outdoor: {
    title: "Outdoor Renovation & Landscaping in Dubai",
    heroImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    introParagraphs: [
      "Outdoor spaces play a major role in how Dubai homes are used. Gardens, terraces, balconies, and outdoor seating areas often function as extensions of the interior, especially in villas and townhouses. When these spaces are poorly planned, they become difficult to use and maintain, particularly in hot weather.",
      "Outdoor renovation in Dubai requires careful material selection, shading considerations, and layouts that remain practical under sun exposure and heat. Design choices that work indoors often fail outdoors if climate conditions are ignored.",
      "Our Outdoor Renovation & Landscaping services focus on creating outdoor spaces that are comfortable, functional, and visually aligned with the interior, while being built to withstand Dubai's environment."
    ],
    scopeTitle: "What This Service Covers",
    scopeIntro: "Outdoor renovation is approached as a combination of layout planning, material selection, and functional design.",
    scopeItems: [
      { title: "Garden & Landscape Remodeling", description: "Gardens and landscaped areas are planned to balance greenery with usability. Plant selection, hardscape areas, and pathways are arranged to create spaces that are easy to maintain and enjoyable to use." },
      { title: "Pergolas & Gazebos", description: "Pergolas and gazebos provide shade and structure to outdoor areas. Designs are planned to improve comfort, define seating zones, and reduce direct sun exposure without blocking airflow." },
      { title: "Outdoor Kitchen & BBQ Areas", description: "Outdoor kitchens and BBQ areas are designed for practicality and durability. Layouts consider ventilation, heat management, and easy cleaning, ensuring these areas remain usable throughout the year." },
      { title: "Balcony & Terrace Renovation", description: "Balconies and terraces are renovated to improve comfort and safety. Flooring, shading, and layout choices are made to maximize usable space while maintaining a clean appearance." },
      { title: "Outdoor Flooring", description: "Outdoor flooring materials are selected for heat resistance, slip resistance, and durability. Proper installation ensures stability and long-term performance." }
    ],
    approachTitle: "Our Outdoor Design Approach",
    approachIntro: "Outdoor spaces require a different mindset from interior design. Our approach focuses on:",
    approachPoints: [
      "Materials suited to sun exposure and temperature changes",
      "Layouts that encourage comfortable use",
      "Designs that remain practical to maintain"
    ],
    approachOutro: "Each outdoor space is planned to feel like a natural extension of the home.",
    whyChooseTitle: "Why Homeowners Choose Us for Outdoor Renovation",
    whyChooseContent: "Homeowners choose us because outdoor renovation mistakes are costly and difficult to correct. Poor material choices can lead to fading, cracking, or safety issues over time. We help clients make informed decisions that balance comfort, durability, and visual appeal while keeping long-term maintenance in mind.",
    processTitle: "How Outdoor Renovation Projects Are Handled",
    processIntro: "Our process is structured and coordinated:",
    processSteps: [
      "Reviewing site conditions and usage needs",
      "Planning layout, shading, and materials together",
      "Finalizing selections before execution",
      "Executing work with attention to detailing",
      "Reviewing safety, finish, and usability before completion"
    ],
    processOutro: "This approach helps ensure outdoor spaces remain functional and reliable.",
    ctaQuestion: "Planning an outdoor renovation or landscaping project in Dubai?",
    ctaAnswer: "Our team can help design and execute outdoor spaces that suit your home and lifestyle."
  },
  "swimming-pool": {
    title: "Swimming Pool Design & Build in Dubai",
    heroImage: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    introParagraphs: [
      "Swimming pools in Dubai are not just leisure features. They are permanent structures that must handle heat, constant sun exposure, water treatment systems, and regular use without developing long-term issues. Poor planning or execution often leads to leaks, surface damage, high maintenance costs, or safety concerns.",
      "A well-designed pool balances appearance, functionality, and technical precision. Every decision, from layout and depth to materials and filtration, affects how the pool performs over time.",
      "Our Swimming Pool Design & Build services focus on delivering pools that are structurally sound, visually refined, and suited to Dubai's climate and lifestyle."
    ],
    scopeTitle: "What This Service Covers",
    scopeIntro: "Swimming pool projects are planned and executed as complete systems rather than isolated features.",
    scopeItems: [
      { title: "Pool Design & Planning", description: "Pool layouts are designed based on available space, intended use, and safety considerations. Depths, access points, and circulation areas are planned to ensure comfort and usability." },
      { title: "Pool Types by Design", description: "We design various pool styles to suit different needs, including lap pools, in-ground pools, plunge pools, overflow pools, and infinity pools. Each type is selected based on space, usage, and visual goals." },
      { title: "Pool Construction & Materials", description: "Construction methods and materials are chosen to ensure durability and structural integrity. Options include concrete pools, fiberglass pools, and epoxy-lined finishes, selected based on performance and maintenance expectations." },
      { title: "Pool Shapes & Custom Designs", description: "Pool shapes are planned to complement the surrounding architecture. Options range from classic rectangular pools to freeform, geometric, L-shaped, round, and fully custom designs." },
      { title: "Pool Lighting & Water Features", description: "Lighting and water features are integrated to enhance safety and visual appeal. Proper planning ensures even illumination and smooth operation without compromising structure." }
    ],
    approachTitle: "Our Pool Design Approach",
    approachIntro: "Swimming pools require precision and coordination. Our approach focuses on:",
    approachPoints: [
      "Structural stability and proper engineering",
      "Materials suited to heat and water exposure",
      "Efficient circulation and filtration planning",
      "Designs that integrate naturally with outdoor spaces"
    ],
    approachOutro: "This ensures the pool remains reliable, safe, and visually consistent.",
    whyChooseTitle: "Why Homeowners Choose Us for Swimming Pool Projects",
    whyChooseContent: "Homeowners choose us because pool construction leaves little room for error. Fixing problems after completion is expensive and disruptive. We guide clients through design choices, explain technical considerations clearly, and ensure execution meets both aesthetic and functional expectations.",
    processTitle: "How Swimming Pool Projects Are Handled",
    processIntro: "Our pool projects follow a structured process:",
    processSteps: [
      "Assessing site conditions and requirements",
      "Designing layout, structure, and systems together",
      "Finalizing materials and technical specifications",
      "Executing construction with quality control",
      "Reviewing safety, finish, and system performance before handover"
    ],
    processOutro: "This approach helps deliver pools that perform well long term.",
    ctaQuestion: "Planning a swimming pool design or build in Dubai?",
    ctaAnswer: "Our team can help create a pool that balances design, safety, and long-term performance."
  },
  "glass-aluminum": {
    title: "Glass & Aluminum Works in Dubai",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    introParagraphs: [
      "Glass and aluminum elements play a key role in modern interiors and exterior structures. They allow light to move through spaces, create visual openness, and provide clean architectural lines. When designed or installed poorly, however, they can lead to safety concerns, heat gain, or long-term maintenance issues.",
      "In Dubai, glass and aluminum works must account for strong sunlight, temperature changes, and structural requirements. Material quality and precision installation are essential to ensure performance and durability.",
      "Our Glass & Aluminum Works services focus on delivering clean finishes, accurate installation, and solutions that integrate seamlessly with the overall design of the property."
    ],
    scopeTitle: "What This Service Covers",
    scopeIntro: "Glass and aluminum works are planned as functional architectural elements, not just decorative additions.",
    scopeItems: [
      { title: "Glass Partitions", description: "Glass partitions are used to divide spaces while maintaining openness and light flow. They are planned to balance privacy, acoustics, and visual clarity." },
      { title: "Aluminum Frames & Structures", description: "Aluminum framing systems are designed for strength and stability. These are used for doors, windows, partitions, and structural elements where durability and precision are required." },
      { title: "Railings & Balustrades", description: "Glass and aluminum railings are designed to meet safety standards while maintaining a clean, modern appearance. Proper fixing and alignment are essential for long-term reliability." },
      { title: "Facades & Exterior Elements", description: "Exterior glass and aluminum elements are selected and installed to handle sun exposure and weather conditions while maintaining visual consistency with the building." },
      { title: "Finishing & Detailing", description: "Attention is given to joints, edges, and fittings to ensure clean lines and a refined finish that holds up over time." }
    ],
    approachTitle: "Our Approach to Glass & Aluminum Works",
    approachIntro: "Precision is critical in glass and aluminum installations. Our approach focuses on:",
    approachPoints: [
      "Accurate measurements and planning",
      "Materials suited to heat and environmental conditions",
      "Secure fixing and alignment",
      "Clean finishing and detailing"
    ],
    approachOutro: "This ensures both safety and visual quality.",
    whyChooseTitle: "Why Clients Choose Us for Glass & Aluminum Works",
    whyChooseContent: "Clients choose us because mistakes in glass and aluminum work are costly and difficult to correct. Poor installation can affect safety, insulation, and appearance. We help clients select suitable systems and execute installations with care and technical accuracy.",
    processTitle: "How Glass & Aluminum Projects Are Handled",
    processIntro: "Our process is structured and controlled:",
    processSteps: [
      "Reviewing design requirements and site conditions",
      "Selecting appropriate glass and aluminum systems",
      "Finalizing technical details before installation",
      "Executing installation with precision",
      "Reviewing safety, finish, and alignment before completion"
    ],
    processOutro: "This approach ensures consistent and reliable results.",
    ctaQuestion: "Planning glass or aluminum works in Dubai?",
    ctaAnswer: "Our team can help deliver clean, durable solutions suited to your space and design requirements."
  },
  commercial: {
    title: "Commercial Interior Design in Dubai",
    heroImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    introParagraphs: [
      "Commercial interiors serve a different purpose than residential spaces. They must support business operations, customer experience, brand identity, and daily functionality, all while meeting safety standards and operational requirements.",
      "In Dubai, commercial spaces also need to reflect a competitive market. Restaurants, retail outlets, and hospitality spaces are judged quickly, and poor layout or design can directly affect customer perception and business performance.",
      "Our Commercial Interior Design services focus on creating functional, well-planned spaces that support business goals while maintaining a clean, professional appearance."
    ],
    scopeTitle: "What This Service Covers",
    scopeIntro: "Commercial interior design requires coordination between design intent, operational needs, and execution.",
    scopeItems: [
      { title: "Restaurant Interior Design", description: "Restaurant interiors are designed to balance customer comfort, staff workflow, and brand presentation. Seating layouts, circulation paths, lighting, and material choices are planned to support both dining experience and operational efficiency." },
      { title: "Hospitality Interior Design", description: "Hospitality spaces such as lounges, serviced apartments, and common areas require a balance between comfort and durability. Designs are planned to handle high foot traffic while maintaining a welcoming atmosphere." },
      { title: "Retail Interior Design", description: "Retail interiors are designed to guide customer movement, highlight products, and support staff operations. Layouts are planned to improve visibility, accessibility, and overall shopping experience." },
      { title: "Space Planning & Layout Design", description: "Commercial layouts are planned with zoning, circulation, and functional separation in mind. This helps ensure efficient use of space without compromising comfort or safety." },
      { title: "Material & Finish Selection", description: "Materials are selected for durability, ease of maintenance, and visual consistency with the brand. Finishes are chosen to perform well under constant use." }
    ],
    approachTitle: "Our Commercial Design Approach",
    approachIntro: "Commercial interiors need to work efficiently before they look impressive. Our approach focuses on:",
    approachPoints: [
      "Understanding business operations and workflow",
      "Planning layouts that support staff and customers",
      "Selecting materials suited to heavy use",
      "Coordinating design and execution carefully"
    ],
    approachOutro: "This ensures the space functions reliably while representing the brand appropriately.",
    whyChooseTitle: "Why Businesses Choose Us for Commercial Interior Design",
    whyChooseContent: "Businesses choose us because commercial interior mistakes are expensive to fix after opening. Poor layouts, inadequate lighting, or impractical materials can disrupt operations and impact revenue. We help business owners make informed decisions early, reducing risk and ensuring the interior supports long-term use.",
    processTitle: "How Commercial Interior Projects Are Handled",
    processIntro: "Our process is structured and collaborative:",
    processSteps: [
      "Understanding business requirements and objectives",
      "Developing layout and design concepts",
      "Finalizing materials, finishes, and technical details",
      "Coordinating execution with attention to timelines",
      "Reviewing the space before handover"
    ],
    processOutro: "This approach helps ensure commercial spaces are ready for operation without unnecessary delays.",
    ctaQuestion: "Planning a commercial interior project in Dubai?",
    ctaAnswer: "Our team can help design and execute a space that supports your business and brand."
  }
};

export default function InteriorServiceDetail() {
  const params = useParams();
  const serviceId = params.serviceId as string;
  
  const service = servicesContent[serviceId];
  
  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <Link href="/services/interior-design">
            <Button>Back to Interior Design</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid={`page-interior-${serviceId}`}>
      {/* HERO SECTION - Professional Two-Column Layout */}
      <section 
        className="relative min-h-[70vh] flex items-center overflow-hidden"
        data-testid="section-hero"
      >
        <div className="absolute inset-0">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/45" />
        </div>
        
        <div className="relative z-10 w-full py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <Link href="/services/interior-design">
              <Button variant="ghost" className="text-white mb-6 hover:bg-white/20" data-testid="button-back">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Interior Design
              </Button>
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-[#970A44] font-semibold text-lg mb-4 tracking-wide"
                >
                  Interior Design & Fit-Out Services
                </motion.p>
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-white mb-4 font-serif"
                  data-testid="text-hero-title"
                >
                  {service.title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-base md:text-lg leading-relaxed text-white/90 mb-6"
                  data-testid="text-hero-paragraph-0"
                >
                  {service.introParagraphs[0]}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-[#970A44] hover:bg-[#720632] text-white font-semibold rounded-full shadow-xl"
                    data-testid="button-hero-cta"
                  >
                    <Link href="/contact">
                      Get Free Consultation
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">15+ Years Experience</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Key Features */}
              {service.scopeItems && service.scopeItems.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="grid grid-cols-2 gap-3"
                  data-testid="hero-features-grid"
                >
                  {service.scopeItems.slice(0, Math.min(4, service.scopeItems.length)).map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
                      data-testid={`hero-feature-${index}`}
                    >
                      <div className="flex justify-center mb-2">
                        <div className="w-10 h-10 bg-[#970A44] rounded-lg flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <p className="text-sm font-medium text-white leading-tight">{item.title}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT THIS SERVICE COVERS */}
      {service.scopeItems.length > 0 && (
        <section className="py-24 bg-background" data-testid="section-scope">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
                {service.scopeTitle || "What This Service Covers"}
              </h2>
              {service.scopeIntro && (
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {service.scopeIntro}
                </p>
              )}
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.scopeItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="h-full border-0 shadow-lg" data-testid={`card-scope-${index}`}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                      {item.description && (
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OUR APPROACH */}
      {service.approachTitle && (
        <section className="py-24 bg-muted/30" data-testid="section-approach">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
                {service.approachTitle}
              </h2>
              {service.approachIntro && (
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                  {service.approachIntro}
                </p>
              )}
            </motion.div>

            {service.approachPoints.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {service.approachPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-lg" data-testid={`card-approach-${index}`}>
                      <CardContent className="p-6 flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[#970A44] flex-shrink-0" />
                        <span className="font-medium">{point}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {service.approachOutro && (
              <motion.p
                {...fadeInUp}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground max-w-3xl mx-auto text-center leading-relaxed"
              >
                {service.approachOutro}
              </motion.p>
            )}
          </div>
        </section>
      )}

      {/* WHY CHOOSE US */}
      {service.whyChooseTitle && (
        <section className="py-24 bg-background" data-testid="section-why-choose">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
                {service.whyChooseTitle}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {service.whyChooseContent}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* HOW PROJECTS ARE HANDLED */}
      {service.processTitle && service.processSteps.length > 0 && (
        <section className="py-24 bg-muted/30" data-testid="section-process">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif">
                {service.processTitle}
              </h2>
              {service.processIntro && (
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                  {service.processIntro}
                </p>
              )}
            </motion.div>

            <div className="max-w-2xl mx-auto space-y-4 mb-8">
              {service.processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                  data-testid={`process-step-${index}`}
                >
                  <div className="w-8 h-8 bg-[#970A44] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-foreground pt-1">{step}</p>
                </motion.div>
              ))}
            </div>

            {service.processOutro && (
              <motion.p
                {...fadeInUp}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground max-w-3xl mx-auto text-center leading-relaxed"
              >
                {service.processOutro}
              </motion.p>
            )}
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="py-24 bg-[#970A44]" data-testid="section-cta">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-serif">
              {service.ctaQuestion}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              {service.ctaAnswer}
            </p>
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-white text-[#970A44] hover:bg-white/90 font-semibold px-8"
                data-testid="button-cta-contact"
              >
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
