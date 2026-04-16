import { motion } from "framer-motion";
import { Crosshair, Settings, BookOpen, TrendingUp, Clock, ShieldCheck } from "lucide-react";

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
    deliverables: ["ICP & positioning audit", "Pipeline gap analysis", "Prioritized roadmap"],
  },
  {
    num: "02",
    title: "Hyper-personalized Playbook",
    subtitle: "Extract & Systemize",
    desc: "We capture your founder instincts, winning conversations, and deal patterns, then codify them into a repeatable sales framework your team can run.",
    deliverables: ["Messaging frameworks", "Outbound sequences", "Objection-handling scripts"],
  },
  {
    num: "03",
    title: "Implement & Optimize",
    subtitle: "Build & Scale",
    desc: "We deploy the infrastructure — outbound channels, CRM workflows, and automation — then continuously refine until we've achieved desired results.",
    deliverables: ["Multichannel outbound", "CRM & pipeline architecture", "Performance dashboards"],
  },
];

const pillars = [
  {
    icon: Crosshair,
    title: "Revenue Positioning Reset",
    desc: "Clarifies your ICP, messaging, differentiation, and value narratives that convert outreach into opportunities.",
  },
  {
    icon: Settings,
    title: "Pipeline Infrastructure Build",
    desc: "Installs proven outbound systems, CRM architecture, reporting dashboards, and qualification frameworks.",
  },
  {
    icon: BookOpen,
    title: "Sales Knowledge Transfer",
    desc: "Extracts your founder-led sales instincts and turns them into a documented, trainable process your team can execute.",
  },
  {
    icon: TrendingUp,
    title: "Performance Acceleration",
    desc: "Improves meeting-to-close conversion before you ever need to scale headcount.",
  },
];

const effortAvoided = [
  "Without hiring a full-time Head of Sales",
  "Without doubling headcount",
  "Without replacing your CRM",
  "Without burning your brand through spam outreach",
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
        {/* Process Steps Header */}
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

        {/* Process Steps */}
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

        {/* POSA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mt-28 mb-16"
        >
          <p className="eyebrow mb-4">THE FOUNDER TO FRAMEWORK PROCESS</p>
          <h3 className="heading-section text-2xl md:text-3xl">
            FTF<span className="glow-text-sm">™</span>
          </h3>
          <p
            className="mt-4 max-w-2xl mx-auto"
            style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}
          >
            Four pillars that transform how you sell — from founder-dependent chaos to a system that scales.
          </p>
        </motion.div>

        {/* POSA Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i + 1}
              className="text-center p-6 rounded-lg"
              style={{
                background: "rgba(139,171,184,0.03)",
                border: "1px solid rgba(139,171,184,0.08)",
              }}
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4"
                style={{ background: "rgba(139,171,184,0.08)" }}
              >
                <pillar.icon size={20} style={{ color: "hsl(var(--primary))" }} />
              </div>
              <h4 className="text-sm font-bold mb-2 text-foreground">{pillar.title}</h4>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* What's In It For You */}
        <div className="mt-20 max-w-3xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Effort Avoided */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={1}
          >
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck size={18} style={{ color: "hsl(var(--primary))" }} />
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "rgba(139,171,184,0.5)", letterSpacing: "0.15em" }}
              >
                Extra Effort Avoided
              </p>
            </div>
            <div className="space-y-3">
              {effortAvoided.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="step-dot" style={{ width: 4, height: 4, marginTop: 0 }} />
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Timeframe to Results */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={2}
          >
            <div className="flex items-center gap-2 mb-5">
              <Clock size={18} style={{ color: "hsl(var(--primary))" }} />
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "rgba(139,171,184,0.5)", letterSpacing: "0.15em" }}
              >
                Timeframe to Results
              </p>
            </div>
            <p
              className="rounded-lg p-5"
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                background: "rgba(139,171,184,0.03)",
                border: "1px solid rgba(139,171,184,0.08)",
              }}
            >
              Installed pipeline infrastructure to{" "}
              <span className="font-bold text-foreground">5× your new business conversations</span>{" "}
              in <span className="font-bold text-foreground">90 days</span>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
