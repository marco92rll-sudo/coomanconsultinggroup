import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How is this different from hiring a sales agency?",
    a: "Agencies run campaigns. We build the blueprint that makes every campaign and every sales leader more effective. We capture your founder edge, codify it into a repeatable framework, and stress test it until it's bulletproof.",
  },
  {
    q: "What kind of results can we expect?",
    a: "Clients typically see a 30–50% increase in qualified pipeline within the first 90 days. But the real value is compounding. The systems we build keep producing for as long as you need them to.",
  },
  {
    q: "How long does an engagement typically last?",
    a: "Most engagements run 90 -180 days, depending on scope. We work in focused sprints — diagnose, build, deploy so you see traction fast, not months of 'strategy decks.'",
  },
  {
    q: "Do you replace our existing sales team?",
    a: "No. We make your existing team significantly more effective. We give them the playbook, messaging, and systems to consistently close — instead of relying on gut instinct.",
  },
  {
    q: "What does the first week look like?",
    a: "We start with a deep diagnostic — auditing your pipeline, messaging, and conversion data. By the end of week one, you'll have a clear map of where revenue is leaking and a prioritized plan to fix it.",
  },
  {
    q: "Is this only for B2B companies?",
    a: "Yes. Our frameworks are built for fractional leaders or founder-led firms in complex B2B sales cycles — typically professional services and high-value consulting businesses where relationships and positioning drive revenue.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FAQ = () => {
  return (
    <section id="faq" className="section-padding relative z-10">
      <div className="container-wide max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="heading-section">
            Questions we get <span className="glow-text-sm">asked</span>.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-none rounded-lg px-6"
                style={{
                  background: "rgba(139,171,184,0.04)",
                  border: "1px solid rgba(139,171,184,0.1)",
                }}
              >
                <AccordionTrigger
                  className="hover:no-underline py-5"
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.7,
                  }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
