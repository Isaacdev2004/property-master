import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Check, Calendar, User, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

const fadeInUp = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3 }
};

const steps = [
  { id: 1, title: "Service", icon: User },
  { id: 2, title: "Schedule", icon: Calendar },
  { id: 3, title: "Details", icon: MapPin },
  { id: 4, title: "Confirm", icon: Check },
];

export default function BookService() {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      serviceType: "",
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      return apiRequest("POST", "/api/bookings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking submitted!",
        description: "We'll contact you shortly to confirm your appointment.",
      });
      form.reset();
      setCurrentStep(1);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBooking) => {
    bookingMutation.mutate(data);
  };

  const nextStep = async () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = await form.trigger(["serviceType"]);
    } else if (currentStep === 2) {
      isValid = await form.trigger(["preferredDate", "preferredTime"]);
    } else if (currentStep === 3) {
      isValid = await form.trigger(["fullName", "email", "phone", "address", "city"]);
    }
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <section className="py-24 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-[Montserrat]">Book a Service</h1>
            <p className="text-xl text-muted-foreground">Tell us about your project and we'll get back to you</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        currentStep >= step.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`text-sm mt-2 font-medium hidden sm:block ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 ${currentStep > step.id ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div key="step1" {...fadeInUp}>
                        <h2 className="text-2xl font-bold mb-6 font-[Montserrat]">Select Service Type</h2>
                        <FormField
                          control={form.control}
                          name="serviceType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-service-type">
                                    <SelectValue placeholder="Choose a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="interior-design">Interior Design</SelectItem>
                                  <SelectItem value="home-maintenance">Home Maintenance</SelectItem>
                                  <SelectItem value="commercial-maintenance">Commercial Maintenance</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div key="step2" {...fadeInUp}>
                        <h2 className="text-2xl font-bold mb-6 font-[Montserrat]">Choose Date & Time</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="preferredDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Date *</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} data-testid="input-date" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="preferredTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Time *</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-time">
                                      <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="9:00 AM - 12:00 PM">9:00 AM - 12:00 PM</SelectItem>
                                    <SelectItem value="12:00 PM - 3:00 PM">12:00 PM - 3:00 PM</SelectItem>
                                    <SelectItem value="3:00 PM - 6:00 PM">3:00 PM - 6:00 PM</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div key="step3" {...fadeInUp}>
                        <h2 className="text-2xl font-bold mb-6 font-[Montserrat]">Contact Information</h2>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} data-testid="input-name" />
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
                                    <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
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
                                    <Input type="tel" placeholder="+971 585 707 110" {...field} data-testid="input-phone" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Street address" {...field} data-testid="input-address" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Dubai" {...field} data-testid="input-city" />
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
                                <FormLabel>Additional Notes (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Tell us more about your project..."
                                    className="resize-none"
                                    rows={4}
                                    {...field}
                                    data-testid="textarea-message"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 4 && (
                      <motion.div key="step4" {...fadeInUp}>
                        <h2 className="text-2xl font-bold mb-6 font-[Montserrat]">Confirm Your Booking</h2>
                        <div className="space-y-4 bg-muted/30 rounded-lg p-6">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Service</p>
                            <p className="font-medium capitalize">{form.getValues("serviceType")?.replace("-", " ")}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Date</p>
                              <p className="font-medium">{form.getValues("preferredDate")}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Time</p>
                              <p className="font-medium">{form.getValues("preferredTime")}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Contact</p>
                            <p className="font-medium">{form.getValues("fullName")}</p>
                            <p className="text-sm">{form.getValues("email")}</p>
                            <p className="text-sm">{form.getValues("phone")}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Location</p>
                            <p className="font-medium">{form.getValues("address")}</p>
                            <p className="text-sm">{form.getValues("city")}</p>
                          </div>
                          {form.getValues("message") && (
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Additional Notes</p>
                              <p className="text-sm">{form.getValues("message")}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between pt-6 border-t border-border">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      data-testid="button-previous"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    {currentStep < steps.length ? (
                      <Button type="button" onClick={nextStep} data-testid="button-next">
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button type="submit" disabled={bookingMutation.isPending} data-testid="button-submit">
                        {bookingMutation.isPending ? "Submitting..." : "Submit Booking"}
                        <Check className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
