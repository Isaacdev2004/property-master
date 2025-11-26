import { motion } from "framer-motion";
import { Star, Quote, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const customerStories = [
  {
    name: "Sarah Al-Mansouri",
    role: "Homeowner",
    company: "Dubai Marina Villa",
    content: "The Property Masters transformed our apartment into a stunning modern sanctuary. Their interior design expertise exceeded all expectations. The attention to detail was remarkable - from the custom furniture to the lighting design. Worth every dirham!",
    rating: 5,
    image: null,
    featured: true
  },
  {
    name: "Dr. Ahmed Khalid",
    role: "Wellness Center Owner",
    company: "Serenity Spa, JLT",
    content: "They designed and built our spa facility from concept to completion. The wellness spaces they created are serene and functional. Our clients constantly compliment the ambiance!",
    rating: 5,
    image: null,
    featured: false
  },
  {
    name: "Michael Thompson",
    role: "CEO",
    company: "Thompson Holdings",
    content: "Our new corporate office is a testament to their design excellence. The team understood our brand perfectly and created a workspace that inspires productivity and impresses clients.",
    rating: 5,
    image: null,
    featured: false
  },
  {
    name: "Fatima Hassan",
    role: "Property Manager",
    company: "Elite Properties Dubai",
    content: "Their maintenance services keep all our properties in perfect condition. Quick response time, professional team, and excellent quality of work every time. They're our go-to partner.",
    rating: 5,
    image: null,
    featured: false
  },
  {
    name: "James Wilson",
    role: "Hotel General Manager",
    company: "Azure Beach Resort",
    content: "The restaurant and lobby redesign exceeded our expectations. Guest feedback has been overwhelmingly positive, and we've seen a significant increase in bookings since the renovation.",
    rating: 5,
    image: null,
    featured: false
  },
  {
    name: "Aisha Rahman",
    role: "Homeowner",
    company: "Palm Jumeirah",
    content: "From the modular kitchen to the custom wardrobes, every piece was crafted with precision. The 3D visualization helped us see exactly what we were getting before construction began.",
    rating: 5,
    image: null,
    featured: false
  }
];

const luxuryEasing = [0.25, 0.46, 0.45, 0.94] as const;

export default function ListenToCustomers() {
  const featuredStory = customerStories.find(s => s.featured);
  const otherStories = customerStories.filter(s => !s.featured);

  return (
    <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: luxuryEasing }}
        >
          <p className="text-sm font-semibold tracking-widest text-[#D7A144] uppercase mb-4">
            Success Stories
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold font-serif mb-4">
            Listen to Our Customers
          </h2>
          <p className="text-xl text-muted-foreground">
            Real experiences from clients who trusted us with their vision
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        {featuredStory && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: luxuryEasing }}
          >
            <Card className="relative overflow-hidden border-[#D7A144]/20 shadow-xl bg-gradient-to-br from-[#D7A144]/5 to-transparent">
              <CardContent className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Quote Section */}
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-16 h-16 text-[#D7A144]/20" />
                    <div className="relative z-10">
                      <div className="flex gap-1 mb-6" data-testid="featured-rating">
                        {[...Array(featuredStory.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#D7A144] text-[#D7A144]" />
                        ))}
                      </div>
                      <p className="text-xl lg:text-2xl leading-relaxed mb-8 font-serif italic">
                        "{featuredStory.content}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D7A144] to-[#C69136] flex items-center justify-center text-white font-bold text-xl">
                          {featuredStory.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-lg">{featuredStory.name}</p>
                          <p className="text-muted-foreground">
                            {featuredStory.role} • {featuredStory.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video/Visual Section */}
                  <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D7A144]/20 to-black/60 flex items-center justify-center">
                      <motion.div
                        className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Play className="w-8 h-8 text-[#D7A144] fill-[#D7A144] ml-1" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm font-semibold">Watch Customer Story</p>
                      <p className="text-xs text-white/70">2:34 min</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Other Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherStories.slice(0, 5).map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: luxuryEasing }}
              data-testid={`customer-story-${index}`}
            >
              <Card className="h-full hover-elevate border-primary/10 shadow-lg">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D7A144] text-[#D7A144]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                    "{story.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D7A144] to-[#C69136] flex items-center justify-center text-white font-bold">
                      {story.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold">{story.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {story.role} • {story.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: luxuryEasing }}
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-full bg-muted/50 border border-primary/10">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D7A144] to-[#C69136] border-2 border-background flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium ml-2">500+ Happy Clients</span>
            </div>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D7A144] text-[#D7A144]" />
                ))}
              </div>
              <span className="text-sm font-medium">4.9/5 Average Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
