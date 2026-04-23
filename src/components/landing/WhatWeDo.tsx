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
  { icon: MessageSquare, text: "Messaging and positioning that turn cold prospects into real conversations" },
  { icon: Target, text: "A targeting and pipeline approach that gets you in front of the right buyers consistently" },
  { icon: Mail, text: "Outbound setup across email, LinkedIn and sequencing that holds up at volume" },
  { icon: Database, text: "A CRM and process built so you can actually track, manage and improve your pipeline" },
  { icon: Play, text: "Playbooks your team can run day to day without you in every conversation" },
  { icon: Users, text: "Clear sales roles so the right person can step in and pick up where you left off" },
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
          <p className="eyebrow mb-4">WHAT WE DO</p>
          <h2 className="heading-section mb-6">
            We turn{" "}
            <span className="glow-text-sm">founder knowledge</span>
            {" "}into revenue systems.
          </h2>
          <p className="text-sm font-semibold text-accent mb-4">Business consulting services for B2B founders</p>
          <p className="text-secondary-custom" style={{ fontSize: 15, lineHeight: 1.8 }}>
            Most founders start out as the person closing every deal. As the business grows, you end up split between winning new work and delivering on what you've already sold. Something has to give, and usually it's the pipeline. We take how you already sell, your positioning, your conversations, the way you close, and turn it into a system the business can run without you sitting in every call.
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
            WHAT WE BUILD:
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

      </div>
    </section>
  );
};

export default WhatWeDo;