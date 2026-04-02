import { motion } from "framer-motion";
import { MessageSquare, Target, Mail, Database, Play, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07 },
  }),
};

const items = [
  { icon: MessageSquare, text: "Clear messaging and offer positioning that convert cold prospects into qualified opportunities" },
  { icon: Target, text: "Targeting and pipeline strategy to consistently reach the right buyers" },
  { icon: Mail, text: "Outbound infrastructure (email, LinkedIn, sequencing) designed for scale" },
  { icon: Database, text: "CRM and process architecture to track, manage, and optimise pipeline" },
  { icon: Play, text: "Execution frameworks your team can run without relying on you" },
  { icon: Users, text: "Role definition and sales structure so the right person can step into a working system" },
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
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <p className="eyebrow mb-4">What We Do</p>
          <h2 className="heading-section mb-6">
            We turn{" "}
            <span className="glow-text-sm">founder knowledge</span>
            {" "}into revenue systems.
          </h2>
          <p className="sr-only">Business consulting services for B2B founders</p>
          <p className="text-secondary-custom" style={{ fontSize: 15, lineHeight: 1.8 }}>
            We design and implement outbound sales systems that turn founder-led selling into a predictable pipeline. We take how you already sell, your positioning, conversations, and closing approach, and turn them into a structured, repeatable system that runs without your constant involvement.
          </p>
        </motion.div>

        {/* What we build */}
        <div className="max-w-2xl mx-auto">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-sm font-semibold uppercase tracking-wider text-accent mb-6"
          >
            What we build:
          </motion.p>

          <div className="space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 2}
                className="flex items-start gap-3"
              >
                <item.icon className="w-4 h-4 text-accent mt-0.5 shrink-0" strokeWidth={1.5} />
                <p className="text-secondary-custom" style={{ fontSize: 14, lineHeight: 1.7 }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={9}
          className="max-w-2xl mx-auto text-center mt-14 text-secondary-custom"
          style={{ fontSize: 14, lineHeight: 1.8 }}
        >
          The outcome is a predictable pipeline engine so revenue no longer depends on when you have time to sell.
        </motion.p>
      </div>
    </section>
  );
};

export default WhatWeDo;
