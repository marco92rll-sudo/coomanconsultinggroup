import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 bg-background">
      <div className="container-wide">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm uppercase tracking-widest text-muted-foreground mb-6"
          >
            Revenue Systems for Growth-Stage B2B
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="heading-hero mb-8"
          >
            Predictable outbound pipeline for growing businesses that have outgrown referrals — but aren't ready to gamble on hiring or agencies.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="body-large max-w-2xl mb-12"
          >
            We help B2B companies build controlled outbound revenue systems that generate qualified pipeline — without brand damage or wasted spend.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="hero" size="xl">
              Request a Revenue Diagnostic
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="heroOutline" size="xl">
              See how it works
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
