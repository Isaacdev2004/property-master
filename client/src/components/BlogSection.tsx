import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

import blogImage1 from "@assets/stock_images/modern_luxury_interi_bd2412e2.jpg";
import blogImage2 from "@assets/stock_images/spa_wellness_retreat_7460672e.jpg";
import blogImage3 from "@assets/stock_images/smart_home_technolog_7bd73d0f.jpg";
import blogImage4 from "@assets/stock_images/luxury_kitchen_desig_9dd78270.jpg";

const blogPosts = [
  {
    id: "blog-1",
    title: "2024 Interior Design Trends: Transforming Dubai Homes",
    excerpt: "Discover the latest luxury interior design trends reshaping homes across Dubai. From sustainable materials to smart home integration, explore what's defining modern living spaces.",
    category: "Interior Design",
    author: "Sarah Mitchell",
    date: "Nov 20, 2024",
    readTime: "5 min read",
    image: blogImage1,
    featured: true
  },
  {
    id: "blog-2",
    title: "Creating Your Personal Wellness Sanctuary at Home",
    excerpt: "Learn how to transform a room into a spa-like retreat with expert tips on lighting, aromatherapy, and wellness design principles.",
    category: "Wellness",
    author: "Dr. Aisha Rahman",
    date: "Nov 15, 2024",
    readTime: "4 min read",
    image: blogImage2,
    featured: false
  },
  {
    id: "blog-3",
    title: "Smart Home Automation: The Future of Property Maintenance",
    excerpt: "Explore how IoT and smart technology are revolutionizing property maintenance, from predictive repairs to energy optimization.",
    category: "Maintenance",
    author: "Michael Torres",
    date: "Nov 10, 2024",
    readTime: "6 min read",
    image: blogImage3,
    featured: false
  },
  {
    id: "blog-4",
    title: "Designing the Perfect Modular Kitchen: A Complete Guide",
    excerpt: "From layout optimization to material selection, everything you need to know about creating a functional and beautiful modular kitchen.",
    category: "Furniture",
    author: "James Wilson",
    date: "Nov 5, 2024",
    readTime: "7 min read",
    image: blogImage4,
    featured: false
  }
];

const luxuryEasing = [0.25, 0.46, 0.45, 0.94] as const;

const categoryColors: Record<string, string> = {
  "Interior Design": "bg-[#CD9342]/10 text-[#CD9342] border-[#CD9342]/20",
  "Wellness": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "Maintenance": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "Furniture": "bg-purple-500/10 text-purple-600 border-purple-500/20"
};

export default function BlogSection() {
  const featuredPost = blogPosts.find(p => p.featured);
  const otherPosts = blogPosts.filter(p => !p.featured);

  return (
    <section 
      className="py-24 px-6 lg:px-8 bg-muted/30"
      data-testid="section-blog"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: luxuryEasing }}
        >
          <div>
            <p 
              className="text-sm font-semibold tracking-widest text-[#CD9342] uppercase mb-4"
              data-testid="text-blog-label"
            >
              Insights & Inspiration
            </p>
            <h2 
              className="text-4xl lg:text-5xl font-bold font-serif"
              data-testid="text-blog-title"
            >
              Stay Ahead with Expert Tips
            </h2>
          </div>
          <Link href="/blog">
            <Button 
              variant="outline" 
              className="group gap-2"
              data-testid="link-view-all-blogs"
            >
              View All Articles
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              className="lg:row-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: luxuryEasing }}
              data-testid={`card-blog-${featuredPost.id}`}
            >
              <Link href={`/blog/${featuredPost.id}`}>
                <Card className="h-full overflow-hidden hover-elevate border-primary/10 shadow-lg group cursor-pointer">
                  <div className="relative h-64 lg:h-80 overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      data-testid={`img-blog-${featuredPost.id}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <Badge 
                      className={`absolute top-4 left-4 ${categoryColors[featuredPost.category]}`}
                      data-testid={`badge-category-${featuredPost.id}`}
                    >
                      {featuredPost.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4" data-testid={`meta-${featuredPost.id}`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <h3 
                      className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-[#CD9342] transition-colors"
                      data-testid={`text-title-${featuredPost.id}`}
                    >
                      {featuredPost.title}
                    </h3>
                    <p 
                      className="text-muted-foreground leading-relaxed mb-6"
                      data-testid={`text-excerpt-${featuredPost.id}`}
                    >
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-3" data-testid={`author-${featuredPost.id}`}>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#CD9342] to-[#A67A2E] flex items-center justify-center text-white font-bold text-sm">
                        {featuredPost.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{featuredPost.author}</p>
                        <p className="text-xs text-muted-foreground">Contributing Writer</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )}

          {/* Other Posts */}
          <div className="space-y-6">
            {otherPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: luxuryEasing }}
                data-testid={`card-blog-${post.id}`}
              >
                <Link href={`/blog/${post.id}`}>
                  <Card className="overflow-hidden hover-elevate border-primary/10 shadow-lg group cursor-pointer">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          data-testid={`img-blog-${post.id}`}
                        />
                        <Badge 
                          className={`absolute top-3 left-3 ${categoryColors[post.category]}`}
                          data-testid={`badge-category-${post.id}`}
                        >
                          {post.category}
                        </Badge>
                      </div>
                      <CardContent className="p-5 flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3" data-testid={`meta-${post.id}`}>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 
                          className="text-lg font-bold mb-2 group-hover:text-[#CD9342] transition-colors line-clamp-2"
                          data-testid={`text-title-${post.id}`}
                        >
                          {post.title}
                        </h3>
                        <p 
                          className="text-sm text-muted-foreground line-clamp-2"
                          data-testid={`text-excerpt-${post.id}`}
                        >
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-4" data-testid={`author-${post.id}`}>
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#CD9342] to-[#A67A2E] flex items-center justify-center text-white font-bold text-xs">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <p className="text-xs font-medium">{post.author}</p>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: luxuryEasing }}
          data-testid="blog-cta"
        >
          <p className="text-muted-foreground mb-6">
            Get the latest design tips, wellness insights, and property maintenance advice delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-primary/20 bg-background focus:outline-none focus:ring-2 focus:ring-[#CD9342]/50"
              data-testid="input-newsletter-email"
            />
            <Button 
              className="bg-[#CD9342] hover:bg-[#A67A2E] text-white"
              data-testid="button-subscribe-newsletter"
            >
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
