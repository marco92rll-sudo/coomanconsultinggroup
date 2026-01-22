import Section from "./Section";
import { motion } from "framer-motion";

const statements = [
  "We are not an agency.",
  "We don't sell leads, SDRs, or tools.",
  "We build outbound revenue systems — carefully.",
];

const Differentiation = () => {
  return (
    <Section variant="cream" size="small">
      <div className="border-t border-b border-divider py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {statements.map((statement, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="manifesto-text"
            >
              {statement}
            </motion.p>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Differentiation;
