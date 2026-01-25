import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Foundation Build",
    price: "$45,000",
    description: "For teams with existing headcount who need systems & process",
    features: [
      "Complete outbound playbook",
      "Tech stack audit & recommendations",
      "Messaging frameworks",
      "Sequence templates",
      "12 weeks of implementation support",
    ],
    highlighted: false,
  },
  {
    name: "Full Build",
    price: "$85,000",
    description: "For teams building outbound from scratch",
    features: [
      "Everything in Foundation",
      "Recruiting support (we help hire your team)",
      "Full tech stack implementation",
      "Live campaign launch & optimization",
      "Team training & certification",
      "90 days of coaching & refinement",
    ],
    highlighted: true,
  },
];

const Pricing = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">
            Investment
          </p>
          <h2 className="heading-section mb-6">
            What It Actually Costs
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`
                bg-card rounded-xl p-8 border
                ${plan.highlighted 
                  ? "border-primary/50 glow-cyan" 
                  : "border-border"
                }
              `}
            >
              {plan.highlighted && (
                <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-4xl font-bold text-primary mb-2">{plan.price}</p>
              <p className="text-sm text-muted-foreground mb-6">flat fee • 90 days</p>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full group" 
                variant={plan.highlighted ? "default" : "outline"}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Comparison Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-8 max-w-3xl mx-auto"
        >
          <h4 className="font-semibold text-lg mb-6 text-center">The Real Comparison</h4>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <p className="text-sm text-muted-foreground mb-2">Traditional Agency</p>
              <p className="text-2xl font-bold text-destructive">$180K-$300K/year</p>
              <p className="text-xs text-muted-foreground mt-2">And you're back to zero when they leave</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">CCG</p>
              <p className="text-2xl font-bold text-primary">$45K-$85K one time</p>
              <p className="text-xs text-primary mt-2">You own it forever</p>
            </div>
          </div>
        </motion.div>

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-muted-foreground mt-8"
        >
          <strong className="text-foreground">Guarantee:</strong> If we don't deliver a functioning outbound system in 90 days, we keep working for free until we do.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
