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
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
            We don't sell consulting.{" "}
            <span className="glow-text">
              We sell systems that run without you.
            </span>
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default PolarizingStatement;
