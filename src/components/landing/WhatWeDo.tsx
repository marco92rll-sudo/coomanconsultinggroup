import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const buildItems = [
  "Clear messaging and offer positioning that convert cold prospects into qualified opportunities",
  "Targeting and pipeline strategy to consistently reach the right buyers",
  "Outbound infrastructure (email, LinkedIn, sequencing) designed for scale",
  "CRM and process architecture to track, manage, and optimise the pipeline",
  "Execution frameworks your team can run without relying on you",
  "Role definition and sales structure, so the right person can step into the working system",
];

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
          className="max-w-3xl mx-auto"
        >
          <p className="eyebrow mb-4 text-center">What We Do</p>
          <h2 className="heading-section mb-8 text-center">
            We turn{" "}
            <span className="glow-text-sm">founder knowledge</span>
            {" "}into revenue systems.
          </h2>
          <p className="sr-only">Business consulting services for B2B founders</p>

          <div className="space-y-5 text-secondary-custom" style={{ fontSize: 15, lineHeight: 1.8 }}>
            <p>
              We design and implement outbound sales systems that turn founder-led selling into a predictable pipeline.
            </p>
            <p>
              Most founders start as the primary driver of revenue. As the business grows, they get split between closing new deals and delivering on existing ones. Both require full attention. Neither gets it. Growth slows, the pipeline becomes inconsistent, and the business becomes dependent on the founder to keep revenue moving.
            </p>
            <p className="text-accent font-medium" style={{ fontSize: 16 }}>
              We remove that constraint.
            </p>
            <p>
              We take how you already sell—your positioning, conversations, and closing approach—and turn it into a structured, repeatable system that runs without your constant involvement.
            </p>

            <div className="mt-8">
              <p className="text-accent font-semibold mb-4" style={{ fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                What we build
              </p>
              <ul className="space-y-3">
                {buildItems.map((item, i) => (
                  <motion.li
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i + 2}
                    className="flex items-start gap-3"
                  >
                    <span className="step-dot mt-1.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <p className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(139,171,184,0.1)" }}>
              We do not hire on your behalf. We ensure the system, process, and profile are in place so hiring becomes straightforward and low risk. The outcome is a predictable pipeline engine so revenue no longer depends on when you have time to sell.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDo;
