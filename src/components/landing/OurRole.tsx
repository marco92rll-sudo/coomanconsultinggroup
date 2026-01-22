import Section from "./Section";
import { motion } from "framer-motion";

const OurRole = () => {
  return (
    <Section>
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
          Our Position
        </p>
        <h2 className="heading-section mb-8">
          Senior. Upstream. Strategic.
        </h2>

        <div className="space-y-6 mb-12">
          <p className="body-large">
            We operate as fractional revenue leadership — embedded upstream of execution, accountable for system design, not just activity.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-secondary border border-divider p-8 md:p-10 rounded-lg"
        >
          <p className="text-xl md:text-2xl font-display leading-relaxed">
            "We don't run outbound for you forever.
            <br />
            <span className="text-muted-foreground">We build the system so you don't need us long-term."</span>
          </p>
        </motion.div>
      </div>
    </Section>
  );
};

export default OurRole;
