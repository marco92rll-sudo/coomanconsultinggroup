import { motion } from "framer-motion";
import { MessageSquare, Target, Mail, Database, Play, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const deliverables = [
  {
    icon: MessageSquare,
    title: "Messaging & Offer Positioning",
    description: "Clear messaging and offer positioning that converts cold prospects into qualified opportunities.",
  },
  {
    icon: Target,
    title: "Targeting & Pipeline Strategy",
    description: "Targeting and pipeline strategy to consistently reach the right buyers.",
  },
  {
    icon: Mail,
    title: "Outbound Infrastructure",
    description: "Outbound infrastructure (email, LinkedIn, sequencing) designed for scale.",
  },
  {
    icon: Database,
    title: "CRM & Process Architecture",
    description: "CRM and process architecture to track, manage, and optimise pipeline.",
  },
  {
    icon: Play,
    title: "Execution Frameworks",
    description: "Execution frameworks your team can run without relying on you.",
  },
  {
    icon: Users,
    title: "Role Definition & Sales Structure",
    description: "Role definition and sales structure so the right person can step into a working system.",
  },
];

const WhatWeDo = () => {
  return (
    <section id="services" className="section-padding relative z-10">
      <div className="container-wide">
        {/* Intro */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="max-w-3xl mx-auto text-center mb-16"
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

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 1}
              className="card-process p-6 md:p-8"
            >
              <pillar.icon
                className="w-5 h-5 text-accent mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-base font-semibold mb-2 text-foreground">
                {pillar.title}
              </h3>
              <p className="text-secondary-custom" style={{ fontSize: 14, lineHeight: 1.7 }}>
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={6}
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
