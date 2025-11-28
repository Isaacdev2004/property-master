import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonialsData = [
  {
    name: "Sarah Al-Mansouri",
    role: "Homeowner",
    company: "Dubai Marina Residence",
    content: "The Property Masters transformed our apartment into a stunning modern sanctuary. Their interior design expertise and attention to detail exceeded all our expectations!",
    rating: 5,
  },
  {
    name: "Dr. Ahmed Khalid",
    role: "Wellness Center Owner",
    company: "Serenity Spa JLT",
    content: "They designed and built our spa facility from concept to completion. The wellness spaces are serene, functional, and our clients absolutely love the ambiance!",
    rating: 5,
  },
  {
    name: "Robert Chen",
    role: "Property Manager",
    company: "Downtown Properties LLC",
    content: "Outstanding maintenance services! Their team keeps all our properties in perfect condition with quick response times and exceptional quality of work every single time.",
    rating: 5,
  },
  {
    name: "Fatima Al-Hashimi",
    role: "Restaurant Owner",
    company: "The Golden Fork",
    content: "From complete interior fit-out to ongoing maintenance, they handle everything seamlessly. Our restaurant looks stunning and operates smoothly thanks to them!",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Villa Owner",
    company: "Palm Jumeirah",
    content: "Their wellness consultation helped us create a home gym and yoga studio that's both beautiful and functional. Best investment we've made in our property!",
    rating: 5,
  },
  {
    name: "Layla Mohammed",
    role: "Office Manager",
    company: "Tech Hub DIFC",
    content: "Professional office fit-out service with modern design. They completed our 10,000 sq ft space ahead of schedule and within budget. Highly recommended!",
    rating: 5,
  },
  {
    name: "Marco Rossi",
    role: "Hotel Manager",
    company: "Luxury Suites Dubai",
    content: "Their team handles all our property maintenance needs efficiently. From HVAC to plumbing, they're our trusted partner for keeping everything running perfectly.",
    rating: 5,
  },
  {
    name: "Aisha Rahman",
    role: "Homeowner",
    company: "Arabian Ranches",
    content: "We hired them for a complete home renovation and wellness room addition. The result is breathtaking! Our home is now a perfect sanctuary for our family.",
    rating: 5,
  },
];

// Duplicate testimonials for seamless infinite scroll
const allTestimonials = [...testimonialsData, ...testimonialsData];

export default function TestimonialsMarquee() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm uppercase tracking-wider text-[#970A44] font-semibold mb-4">
            Success Powered by The Property Masters
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            Real Stories. Real Results.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from our satisfied clients across Dubai who trust us for their property needs
          </p>
        </motion.div>
      </div>

      {/* First Row - Left to Right */}
      <div className="relative mb-8">
        <motion.div
          className="flex gap-6"
          animate={{
            x: [0, -(400 + 24) * testimonialsData.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {allTestimonials.map((testimonial, index) => (
            <Card
              key={`row1-${index}`}
              className="flex-shrink-0 w-[400px] hover-elevate border-primary/10 shadow-lg"
              data-testid={`testimonial-card-row1-${index}`}
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4" data-testid={`rating-${index}`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#970A44] text-[#970A44]" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#970A44] to-[#720632] flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>

      {/* Second Row - Right to Left */}
      <div className="relative">
        <motion.div
          className="flex gap-6"
          animate={{
            x: [-(400 + 24) * testimonialsData.length, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {allTestimonials.map((testimonial, index) => (
            <Card
              key={`row2-${index}`}
              className="flex-shrink-0 w-[400px] hover-elevate border-primary/10 shadow-lg"
              data-testid={`testimonial-card-row2-${index}`}
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#970A44] text-[#970A44]" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#970A44] to-[#720632] flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
