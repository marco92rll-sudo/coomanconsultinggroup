import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const goodFit = [
  "You're ready to invest in building real internal capability",
  "You have $5M+ ARR and growth targets that require predictable pipeline",
  "You're willing to hire and own your outbound function",
  "You value independence over short-term convenience",
  "You want a system that gets better after we leave",
];

const badFit = [
  "You want someone to \"just do it\" forever",
  "You're not willing to invest in internal hiring",
  "You need immediate pipeline (we build systems, not rent them)",
  "You're looking for the cheapest option",
  "You want to avoid building in-house expertise",
];

const WhoWeWorkWith = () => {
  return (
    <section id="who" className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">
            Fit Assessment
          </p>
          <h2 className="heading-section mb-6">
            This Isn't For Everyone
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Good Fit */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-success/30 rounded-xl p-8"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <div className="p-2 bg-success/20 rounded-lg">
                <Check className="h-5 w-5 text-success" />
              </div>
              You're a Good Fit If
            </h3>
            <ul className="space-y-4">
              {goodFit.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Bad Fit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-destructive/30 rounded-xl p-8"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <div className="p-2 bg-destructive/20 rounded-lg">
                <X className="h-5 w-5 text-destructive" />
              </div>
              This Won't Work If
            </h3>
            <ul className="space-y-4">
              {badFit.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            Not sure if you're ready? Book a free 30-minute pipeline audit
          </p>
          <Button size="lg">Book Your Free Audit</Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;
