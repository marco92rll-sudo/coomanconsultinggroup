import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const PolarizingStatement = () => {
  return (
    <section className="py-20 md:py-28 relative z-10">
      <div className="container-narrow text-center">
        <motion.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="space-y-4"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
            Focus is finite; spreading it thin lowers quality.{" "}
            <span className="glow-text">
              We remove that constraint.
            </span>
          </p>
          <p
            className="text-base md:text-lg"
            style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}
          >
            The outcome is a predictable pipeline engine so revenue no longer depends on when you have time to sell.
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default PolarizingStatement;
