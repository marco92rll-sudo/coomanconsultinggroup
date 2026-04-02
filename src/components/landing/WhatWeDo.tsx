import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const WhatWeDo = () => {
  return (
    <section id="services" className="section-padding relative z-10">
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="eyebrow mb-4">What We Do</p>
          <h2 className="heading-section mb-6">
            We turn{" "}
            <span className="glow-text-sm">founder knowledge</span>
            {" "}into revenue systems.
          </h2>
          <p className="sr-only">Business consulting services for B2B founders</p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
            The outcome is a predictable pipeline engine so revenue no longer depends on when you have time to sell.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDo;
