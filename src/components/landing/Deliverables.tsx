import { motion } from "framer-motion";
import { FileText, Wrench, Users, Database, Mail, Settings } from "lucide-react";

const deliverables = [
  {
    icon: FileText,
    title: "Custom Outbound Playbook",
    items: [
      "Your ICP definition",
      "Messaging frameworks",
      "Sequencing strategies",
      "Channel selection matrix",
      "Objection handling scripts",
    ],
  },
  {
    icon: Wrench,
    title: "Tech Stack Blueprint",
    items: [
      "Tool recommendations",
      "Integration architecture",
      "Data flow diagrams",
      "Cost optimization plan",
      "Vendor negotiation strategies",
    ],
  },
  {
    icon: Users,
    title: "Hiring & Training System",
    items: [
      "Role definitions",
      "Interview scorecards",
      "Onboarding curriculum",
      "Performance frameworks",
      "Comp benchmarking",
    ],
  },
  {
    icon: Database,
    title: "Data Infrastructure",
    items: [
      "Lead enrichment workflows",
      "CRM configuration",
      "Reporting dashboards",
      "Data hygiene protocols",
      "Attribution modeling",
    ],
  },
  {
    icon: Mail,
    title: "Campaign Library",
    items: [
      "Tested email sequences",
      "LinkedIn cadences",
      "Call scripts",
      "Video prospecting templates",
      "Multi-channel orchestration",
    ],
  },
  {
    icon: Settings,
    title: "Operating System",
    items: [
      "Weekly meeting rhythms",
      "KPI tracking frameworks",
      "Optimization protocols",
      "Hiring playbooks",
      "Continuous improvement systems",
    ],
  },
];

const Deliverables = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">
            What You Get
          </p>
          <h2 className="heading-section mb-6">
            Unlike Agencies, You Own Everything We Build
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 card-hover"
              >
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((listItem, listIndex) => (
                    <li key={listIndex} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{listItem}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every deliverable includes full documentation, source files, and transfer of ownership. 
            No ongoing licenses. No proprietary platforms. <span className="text-foreground font-medium">It's all yours.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Deliverables;
