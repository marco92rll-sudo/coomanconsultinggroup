import { motion } from "framer-motion";
import { Target, Repeat, Zap, Shield } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Precision Targeting",
    desc: "We only pursue prospects who match your ideal client profile — no spray and pray.",
  },
  {
    icon: Repeat,
    title: "Repeatable Systems",
    desc: "Every framework we build is designed to scale your discovery and conversion rate.",
  },
  {
    icon: Zap,
    title: "Speed to Revenue",
    desc: "90-day sprints with clear deliverables. No 12-month roadmaps that never ship.",
  },
  {
    icon: Shield,
    title: "Full Ownership",
    desc: "You own every asset, platform, and process we build. Nothing is held hostage.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const ValuePillars = () => {
  return (
    <section className="section-padding relative z-10">
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">Our Principles</p>
          <h2 className="heading-section">
            What we <span className="glow-text-sm">stand for.</span>
          </h2>
        </motion.div>

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
                style={{
                  background: "rgba(139,171,184,0.08)",
                }}
              >
                <pillar.icon size={20} style={{ color: "hsl(var(--primary))" }} />
              </div>
              <h3 className="text-sm font-bold mb-2 text-foreground">{pillar.title}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePillars;
