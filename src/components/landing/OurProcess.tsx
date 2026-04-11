import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
};

const steps = [
  {
    num: "01",
    title: "Strategy Assessment",
    subtitle: "Diagnose & Align",
    desc: "We audit your current sales motion — ICP, messaging, pipeline health, and close process — to identify exactly where revenue is leaking and what to fix first.",
    deliverables: ["ICP & positioning audit", "Pipeline gap analysis", "Prioritised roadmap"],
  },
  {
    num: "02",
    title: "Hyperpersonalised Playbook",
    subtitle: "Extract & Systemise",
    desc: "We capture your founder instincts, winning conversations, and deal patterns, then codify them into a repeatable sales framework your team can run.",
    deliverables: ["Messaging frameworks", "Outbound sequences", "Objection-handling scripts"],
  },
  {
    num: "03",
    title: "Implement & Optimise",
    subtitle: "Build & Scale",
    desc: "We deploy the infrastructure — outbound channels, CRM workflows, and automation — then continuously refine until the engine runs without you.",
    deliverables: ["Multichannel outbound", "CRM & pipeline architecture", "Performance dashboards"],
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
            Three steps. <span className="glow-text-sm">One outcome.</span>
          </h2>
          <p className="sr-only">Our consulting process for scaling founder-led businesses</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i + 1}
              className="card-process p-8 md:p-10 flex flex-col"
            >
              {/* Large watermark number */}
              <span
                className="block font-bold leading-none mb-5"
                style={{
                  fontSize: 64,
                  color: "rgba(139,171,184,0.07)",
                  letterSpacing: "-0.04em",
                }}
              >
                {step.num}
              </span>

              <span className="pill-badge mb-4 inline-block self-start">{step.subtitle}</span>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p
                className="mb-6 flex-grow"
                style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}
              >
                {step.desc}
              </p>

              {/* Deliverables */}
              <div
                className="pt-5 mt-auto space-y-2"
                style={{ borderTop: "1px solid rgba(139,171,184,0.1)" }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ color: "rgba(139,171,184,0.5)", letterSpacing: "0.15em" }}
                >
                  Deliverables
                </p>
                {step.deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-2">
                    <div className="step-dot" style={{ width: 4, height: 4, marginTop: 0 }} />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{d}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
