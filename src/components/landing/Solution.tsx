import Section from "./Section";
import { motion } from "framer-motion";

const phases = [
  {
    number: "01",
    title: "Diagnostic",
    description: "Deep-dive into your market, ICP, existing sales motion, and outbound readiness.",
  },
  {
    number: "02",
    title: "System Design",
    description: "Architecture of messaging, targeting, channels, and sequencing tailored to your business.",
  },
  {
    number: "03",
    title: "Controlled Execution",
    description: "Careful launch with real-time optimisation, protecting your brand while building momentum.",
  },
  {
    number: "04",
    title: "Handover & Enablement",
    description: "Transfer ownership to your team with documentation, training, and ongoing support.",
  },
];

const Solution = () => {
  return (
    <Section variant="cream" id="program">
      <div className="max-w-4xl">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
          The Engagement
        </p>
        <h2 className="heading-section mb-4">
          Predictable Pipeline Program™
        </h2>
        <p className="body-large mb-12">
          A 3–6 month engagement to design, launch, and stabilise your outbound revenue system — then hand it over.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-divider p-6 md:p-8 rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <span className="text-sm font-body text-muted-foreground mb-3 block">
                Phase {phase.number}
              </span>
              <h3 className="heading-subsection mb-3">{phase.title}</h3>
              <p className="body-regular">{phase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Solution;
