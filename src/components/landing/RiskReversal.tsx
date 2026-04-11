import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const RiskReversal = () => {
  return (
    <section className="py-16 md:py-20 relative z-10">
      <div className="container-narrow">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center p-8 md:p-12"
          style={{
            background: "rgba(139,171,184,0.04)",
            border: "1px solid rgba(139,171,184,0.12)",
            borderRadius: 10,
          }}
        >
          <ShieldCheck
            className="mx-auto mb-5"
            style={{ color: "#8BAAB8", width: 28, height: 28 }}
            strokeWidth={1.5}
          />
          <h3 className="text-lg md:text-xl font-bold mb-3">Our Guarantee</h3>
          <p
            className="max-w-xl mx-auto"
            style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}
          >
            If we don't deliver measurable pipeline growth within 90 days, we keep working until we do — at no extra cost. We only win when you do.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RiskReversal;
