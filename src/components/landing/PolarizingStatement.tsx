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
          className="space-y-6"
        >
          <div
            className="w-12 mx-auto mb-2"
            style={{ height: 2, background: "hsl(var(--cta))", opacity: 0.5, borderRadius: 1 }}
          />
          <p
            className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed"
            style={{ color: "rgba(255,255,255,0.85)", fontStyle: "italic" }}
          >
            "Focus is finite; spreading it thin lowers quality.{" "}
            <span className="glow-text font-medium">
              We remove that constraint.
            </span>
            "
          </p>
          <p
            className="text-base md:text-lg font-light"
            style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.8, fontStyle: "italic" }}
          >
            {"\n"}
          </p>
          <p
            className="text-sm tracking-widest uppercase pt-2"
            style={{ color: "hsl(var(--cta))", letterSpacing: "0.15em" }}
          >
            - CO-FOUNDER L.COOMAN
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default PolarizingStatement;
