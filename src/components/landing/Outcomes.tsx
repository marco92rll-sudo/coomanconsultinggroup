import Section from "./Section";
import { motion } from "framer-motion";

const outcomes = [
  {
    title: "Predictable Pipeline",
    description: "Outbound generates consistent, qualified opportunities every month.",
  },
  {
    title: "Reduced Founder Dependency",
    description: "Revenue generation no longer rests on the CEO's personal network.",
  },
  {
    title: "Sales Clarity",
    description: "Your team knows exactly who to target, what to say, and when to engage.",
  },
  {
    title: "Repeatable Motion",
    description: "A documented, trainable system that scales with your team.",
  },
];

const Outcomes = () => {
  return (
    <Section variant="cream">
      <div className="max-w-4xl">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
          What Changes
        </p>
        <h2 className="heading-section mb-12">
          Outcomes, not metrics.
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-l-2 border-foreground/10 pl-6"
            >
              <h3 className="heading-subsection mb-2">{outcome.title}</h3>
              <p className="body-regular">{outcome.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Outcomes;
