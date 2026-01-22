import Section from "./Section";
import { motion } from "framer-motion";

const options = [
  {
    title: "Hiring too early",
    description: "SDRs without systems fail. You build a team before you have a proven motion — and burn cash training people on chaos.",
  },
  {
    title: "Agencies",
    description: "Volume without ownership. They optimise for activity metrics, not revenue. And when they leave, so does the system.",
  },
  {
    title: "DIY tools",
    description: "Powerful but dangerous. LinkedIn, email automation, intent data — all capable of damaging your brand in minutes without proper orchestration.",
  },
];

const WhyOptionsFail = () => {
  return (
    <Section variant="cream" id="how-it-works">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
          The Cost of Wrong Decisions
        </p>
        <h2 className="heading-section mb-12">
          Outbound fails when it's treated as a volume activity instead of a revenue function.
        </h2>

        <div className="space-y-10">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-6"
            >
              <span className="text-4xl font-display text-muted-foreground/30 leading-none">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="heading-subsection mb-2">{option.title}</h3>
                <p className="body-regular">{option.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default WhyOptionsFail;
