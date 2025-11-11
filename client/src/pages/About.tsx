import { motion } from "framer-motion";
import { Building2, Users, Award, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stats = [
  { icon: Users, label: "Happy Clients", value: "500+" },
  { icon: Building2, label: "Projects Completed", value: "1,000+" },
  { icon: Award, label: "Years of Excellence", value: "15+" },
  { icon: Target, label: "Satisfaction Rate", value: "98%" },
];

const values = [
  {
    title: "Excellence",
    description: "We strive for perfection in every project, ensuring the highest standards of quality and craftsmanship.",
  },
  {
    title: "Innovation",
    description: "Embracing cutting-edge design trends and technologies to create spaces that inspire and function beautifully.",
  },
  {
    title: "Integrity",
    description: "Building trust through transparency, honesty, and ethical business practices in all our relationships.",
  },
  {
    title: "Customer-Centric",
    description: "Your vision and satisfaction are at the heart of everything we do, from concept to completion.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1 {...fadeInUp} className="text-5xl lg:text-6xl font-bold mb-6 font-[Montserrat]">
            About The Property Masters
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Transforming spaces and enriching lives through exceptional design and dedicated service since 2009
          </motion.p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold mb-6 font-[Montserrat]">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in Dubai in 2009, The Property Masters began with a simple vision: to create beautiful, 
                functional spaces that enhance the way people live and work. What started as a small interior 
                design studio has grown into a comprehensive property solutions company serving clients across 
                the UAE.
              </p>
              <p>
                Today, we specialize in three core areas: Interior Design & Fit-Out Works, Wellness Services, 
                and Maintenance Services. Our integrated approach allows us to deliver complete solutions that 
                not only look exceptional but also function flawlessly for years to come.
              </p>
              <p>
                With over 1,000 completed projects and a team of experienced professionals, we continue to push 
                the boundaries of design excellence while maintaining the personalized service that has been our 
                hallmark since day one.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center hover-elevate">
                <stat.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold mb-2 font-[Montserrat]">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </motion.div>
        </div>

        <motion.div {...fadeInUp} className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center font-[Montserrat]">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="p-6 h-full hover-elevate">
                  <h3 className="text-xl font-bold mb-3 text-primary font-[Montserrat]">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeInUp} className="text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4 font-[Montserrat]">Why Choose Us?</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            We combine creative excellence with technical expertise and unwavering commitment to quality. 
            Our comprehensive services, from initial design concepts to ongoing maintenance, ensure your 
            space remains beautiful and functional for years to come. With a proven track record of 
            successful projects and satisfied clients, we're your trusted partner in creating exceptional 
            environments.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-background px-4 py-2 rounded-full">Licensed & Insured</div>
            <div className="bg-background px-4 py-2 rounded-full">Experienced Team</div>
            <div className="bg-background px-4 py-2 rounded-full">Quality Guaranteed</div>
            <div className="bg-background px-4 py-2 rounded-full">On-Time Delivery</div>
            <div className="bg-background px-4 py-2 rounded-full">Competitive Pricing</div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
