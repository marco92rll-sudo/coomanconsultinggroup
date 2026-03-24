import { motion } from "framer-motion";

const stats = [
  { number: "80%", desc: "Win rate achieved on high-value enterprise pipeline" },
  { number: "40%", desc: "Pipeline increase delivered in under 90 days" },
  { number: "120+", desc: "Businesses supported through funding & growth stages" },
  { number: "5yr+", desc: "CRM automation and hygiene expertise" },
];

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
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
          >
            <p className="eyebrow mb-4">What We Do</p>
            <h2 className="heading-section mb-6">
              We turn{" "}
              <span className="glow-text-sm">founder knowledge</span>
              {" "}into revenue systems.
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
              Most founders are the best salesperson in their business but can't explain why they win — let alone teach it. We capture that edge, build the framework around it, and deploy the infrastructure to replicate it without you in every deal.
            </p>
          </motion.div>

          {/* Right - Stats */}
          <div>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="flex items-start gap-6 py-5"
                style={{
                  borderBottom: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <span
                  className="flex-shrink-0"
                  style={{
                    fontSize: 38,
                    fontWeight: 700,
                    color: "#8BAAB8",
                    textShadow: "0 0 30px rgba(139,171,184,0.45)",
                    lineHeight: 1,
                    minWidth: 90,
                  }}
                >
                  {stat.number}
                </span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, paddingTop: 4 }}>
                  {stat.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
