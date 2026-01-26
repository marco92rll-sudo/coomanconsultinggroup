import { motion } from "framer-motion";
import { FileText, Wrench, Users, BarChart, MessageSquare, Settings } from "lucide-react";

const phases = [
  {
    number: "01",
    title: "Foundation",
    timeline: "Days 1-30",
    items: [
      "ICP Definition & TAM Analysis",
      "Tech Stack Audit & Optimization",
      "Messaging Framework Development",
      "Hiring Profile Creation",
      "Outbound Playbook Design",
    ],
    deliverables: "Complete outbound playbook, tech stack recommendations, job descriptions",
  },
  {
    number: "02",
    title: "Build",
    timeline: "Days 31-60",
    items: [
      "Recruit & hire your outbound team",
      "Tool implementation & integration",
      "Sequence & cadence development",
      "Data infrastructure setup",
      "Team training & enablement",
    ],
    deliverables: "Hired team, configured systems, tested sequences",
  },
  {
    number: "03",
    title: "Launch & Transfer",
    timeline: "Days 61-90",
    items: [
      "Campaign execution & optimization",
      "Real-time coaching & refinement",
      "Metrics dashboard setup",
      "Documentation & SOPs",
      "Knowledge transfer & handoff",
    ],
    deliverables: "Operating playbook, trained team, live campaigns, full documentation",
  },
];

const HowWeWork = () => {
  return (
    <section id="process" className="section-padding bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">
            Our Process
          </p>
          <h2 className="heading-section mb-6">
            90 Days to Pipeline Independence
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border" />
          <div className="hidden lg:block absolute top-24 left-0 right-2/3 h-0.5 bg-primary" />

          <div className="grid lg:grid-cols-3 gap-8">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Phase number circle */}
                <div className="flex justify-center mb-8">
                  <div className={`
                    relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                    ${index === 0 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-card border-2 border-border text-muted-foreground"
                    }
                  `}>
                    {phase.number}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 h-full card-hover">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="heading-subsection">{phase.title}</h3>
                    <span className="text-sm font-medium text-primary">{phase.timeline}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Deliverables</p>
                    <p className="text-sm text-foreground">{phase.deliverables}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowWeWork;
