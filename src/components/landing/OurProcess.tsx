import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const card1Steps = [
  {
    title: "Revenue Positioning Reset",
    desc: "Clarifying your ideal client profile, messaging & differentiation",
  },
  {
    title: "Founder Knowledge Extraction",
    desc: "Structured Q&A that transforms founder instincts into documented sales frameworks",
  },
  {
    title: "Outbound Recommendations",
    desc: "Packaged strategy & tech stack recommendations",
  },
];

const card2Steps = [
  {
    title: "Outbound Infrastructure",
    desc: "Lead gen & multichannel outbound messaging to drive valuable engagement",
  },
  {
    title: "Performance Acceleration",
    desc: "Improving the meeting-to-close process before introducing any automation",
  },
  {
    title: "Scale & Automate",
    desc: "You own every platform and system we build; we manage and maintain it for you",
  },
];

const OurProcess = () => {
  return (
    <section
      id="process"
      className="section-padding relative z-10"
      style={{
        background: "rgba(11,18,32,0.7)",
        borderTop: "1px solid rgba(139,171,184,0.08)",
      }}
    >
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">Our Process</p>
          <h2 className="heading-section">
            Two functions. <span className="glow-text-sm">One outcome.</span>
          </h2>
          <p className="sr-only">Our consulting process for scaling founder-led businesses</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 - F2F */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={1}
            className="card-process p-8 md:p-11"
          >
            <span className="pill-badge mb-5 inline-block">F2F</span>
            <h3 className="text-xl font-bold mb-3">Founder to Framework™</h3>
            <p className="mb-8" style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
              We capture your sales DNA — the instincts, positioning, and edge that wins — and systemize it so your team can replicate it.
            </p>
            <div className="space-y-5">
              {card1Steps.map((step) => (
                <div key={step.title} className="flex items-start gap-3">
                  <div className="step-dot" />
                  <div>
                    <div className="text-sm font-semibold text-white">{step.title}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                      {step.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2 - ROE */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={2}
            className="card-process p-8 md:p-11"
          >
            <span className="pill-badge mb-5 inline-block">ROE</span>
            <h3 className="text-xl font-bold mb-3">Rev-Ops Engine™</h3>
            <p className="mb-8" style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
              We leverage your F2F playbook to build the outbound infrastructure that generates meetings, refines your close, and then automates what's already working.
            </p>
            <div className="space-y-5">
              {card2Steps.map((step) => (
                <div key={step.title} className="flex items-start gap-3">
                  <div className="step-dot" />
                  <div>
                    <div className="text-sm font-semibold text-white">{step.title}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                      {step.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
