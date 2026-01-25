import { motion } from "framer-motion";
import { X, AlertTriangle, Clock } from "lucide-react";

const columns = [
  {
    title: "Traditional Agency",
    icon: X,
    accentColor: "destructive",
    items: [
      "Monthly retainers that never end",
      "Black box processes you can't replicate",
      "When they leave, your pipeline dies",
      "Incentivized to keep you dependent",
      "Generic playbooks across all clients",
    ],
  },
  {
    title: "In-House (Without CCG)",
    icon: AlertTriangle,
    accentColor: "warning",
    items: [
      "6-12 months to become effective",
      "Expensive trial-and-error learning",
      "No proven frameworks",
      "High turnover kills momentum",
      "Siloed knowledge that walks out the door",
    ],
  },
  {
    title: "CCG Approach",
    icon: Clock,
    accentColor: "primary",
    items: [
      "Fixed 90-day engagement",
      "Full transparency & knowledge transfer",
      "Build systems that outlast us",
      "Incentivized by your independence",
      "Custom playbook tailored to your ICP",
    ],
  },
];

const AgencyTrap = () => {
  return (
    <section id="different" className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">
            The Agency Trap
          </p>
          <h2 className="heading-section mb-6">
            Here's What Agencies Won't Tell You
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {columns.map((column, index) => {
            const Icon = column.icon;
            const isHighlighted = column.accentColor === "primary";
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  bg-card rounded-xl p-6 md:p-8 border
                  ${isHighlighted 
                    ? "border-primary/50 glow-cyan" 
                    : column.accentColor === "destructive"
                    ? "border-destructive/30"
                    : "border-border"
                  }
                `}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`
                    p-2 rounded-lg
                    ${isHighlighted 
                      ? "bg-primary/20 text-primary" 
                      : column.accentColor === "destructive"
                      ? "bg-destructive/20 text-destructive"
                      : "bg-muted text-muted-foreground"
                    }
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className={`
                    font-semibold text-lg
                    ${isHighlighted ? "text-primary" : ""}
                  `}>
                    {column.title}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {column.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <span className={`
                        mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0
                        ${isHighlighted 
                          ? "bg-primary" 
                          : column.accentColor === "destructive"
                          ? "bg-destructive/50"
                          : "bg-muted-foreground/50"
                        }
                      `} />
                      <span className="text-sm text-muted-foreground">{item}</span>
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
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <blockquote className="quote-text text-foreground">
            "Agencies need you to fail without them. We succeed when you don't need us anymore."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default AgencyTrap;
