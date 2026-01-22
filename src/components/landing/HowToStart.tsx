import Section from "./Section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HowToStart = () => {
  return (
    <Section>
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
          Getting Started
        </p>
        <h2 className="heading-section mb-8">
          Every engagement starts with a diagnostic.
        </h2>

        <div className="space-y-6 mb-12">
          <p className="body-large">
            We'll assess whether outbound makes sense for your business, stage, and goals. If it doesn't, we'll tell you.
          </p>
          <p className="body-regular">
            No long-term lock-ins. No pressure. Just a candid conversation about your revenue growth.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Button variant="hero" size="xl">
            Request a Revenue Diagnostic
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </Section>
  );
};

export default HowToStart;
