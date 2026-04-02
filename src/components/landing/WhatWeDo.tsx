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
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, whiteSpace: "pre-line" }}>
            We design and implement outbound sales systems that turn founder-led selling into a predictable pipeline.

            Most founders start as the primary driver of revenue. As the business grows, they get split between closing new deals and delivering on existing ones. Both require full attention. Neither gets it. Growth slows, the pipeline becomes inconsistent, and the business becomes dependent on the founder to keep revenue moving.

            We remove that constraint.

            We take how you already sell—your positioning, conversations, and closing approach—and turn it into a structured, repeatable system that runs without your constant involvement.

            What we build:

            Clear messaging and offer positioning that convert cold prospects into qualified opportunities
            Targeting and pipeline strategy to consistently reach the right buyers
            Outbound infrastructure (email, LinkedIn, sequencing) designed for scale
            CRM and process architecture to track, manage, and optimise the pipeline
            Execution frameworks your team can run without relying on you
            Role definition and sales structure, so the right person can step into the working system
            We do not hire on your behalf. We ensure the system, process, and profile are in place so hiring becomes straightforward and low risk. The outcome is a predictable pipeline engine so revenue no longer depends on when you have time to sell.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDo;
