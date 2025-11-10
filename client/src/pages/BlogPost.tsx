import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@shared/schema";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const post = posts.find(p => p.slug === params?.slug);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog" data-testid="link-back-to-blog">
            <Button>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = posts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-20">
      <article>
        <section className="py-12 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto px-6">
            <Link href="/blog" data-testid="link-back-to-blog">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-[Montserrat]" data-testid="text-post-title">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
                <span className="font-medium">{post.author}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  5 min read
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-8 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div {...fadeInUp}>
              <div className="aspect-[21/9] rounded-lg overflow-hidden mb-8 bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="prose prose-lg max-w-none mb-12" data-testid="text-post-content">
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <div className="text-foreground leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="flex items-center justify-between py-6 border-t border-border">
              <Badge variant="secondary">{post.category}</Badge>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </motion.div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div {...fadeInUp}>
                <h2 className="text-3xl font-bold mb-8 font-[Montserrat]">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost, index) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <Card className="group h-full hover-elevate transition-all duration-300 overflow-hidden cursor-pointer">
                        <CardContent className="p-0">
                          <div className="aspect-[16/9] overflow-hidden bg-muted">
                            <img
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="p-6">
                            <Badge variant="secondary" className="mb-3">{relatedPost.category}</Badge>
                            <h3 className="text-lg font-bold mb-2 font-[Montserrat] line-clamp-2 group-hover:text-primary transition-colors">
                              {relatedPost.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
