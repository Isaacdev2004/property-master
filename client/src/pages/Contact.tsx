import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { insertContactInquirySchema, type InsertContactInquiry } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import contactHeroImage from "@assets/stock_images/modern_luxury_office_a24abf7a.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["AL Saqr Business Tower", "Office A-36", "Dubai, United Arab Emirates"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+971 585 707 110", "Mon-Sat: 9AM - 6PM"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["Info@thepropertymasters.ae", "24/7 Response Time"],
  },
];

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<InsertContactInquiry>({
    resolver: zodResolver(insertContactInquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactInquiry) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactInquiry) => {
    contactMutation.mutate(data);
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/971585707110", "_blank");
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={contactHeroImage}
            alt="Contact The Property Masters"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Get In Touch
            </h1>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Have a question or ready to start your project? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-[Montserrat]">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-sm mb-1">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div {...fadeInUp}>
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 font-[Montserrat]">Send Us a Message</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} data-testid="input-contact-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} data-testid="input-contact-email" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone *</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+971 585 707 110" {...field} data-testid="input-contact-phone" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject *</FormLabel>
                            <FormControl>
                              <Input placeholder="How can we help you?" {...field} data-testid="input-contact-subject" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your project..."
                                className="resize-none"
                                rows={5}
                                {...field}
                                data-testid="textarea-contact-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" size="lg" disabled={contactMutation.isPending} data-testid="button-submit-contact">
                        {contactMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp} className="space-y-6">
              <div className="bg-muted rounded-lg overflow-hidden aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1234567890123!2d55.2!3d25.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEyJzAwLjAiTiA1NcKwMTInMDAuMCJF!5e0!3m2!1sen!2sae!4v1234567890123!5m2!1sen!2sae"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AL Saqr Business Tower Location"
                />
              </div>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 font-[Montserrat]">Chat with us on WhatsApp</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get instant answers to your questions. We're online and ready to help!
                      </p>
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={openWhatsApp}
                        data-testid="button-whatsapp"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Open WhatsApp
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 font-[Montserrat]">Business Hours</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p><span className="font-medium text-foreground">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                        <p><span className="font-medium text-foreground">Saturday:</span> 10:00 AM - 4:00 PM</p>
                        <p><span className="font-medium text-foreground">Sunday:</span> Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
