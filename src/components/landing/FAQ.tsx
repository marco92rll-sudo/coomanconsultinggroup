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
    a: "Agencies run campaigns. We build the thing underneath that makes any campaign, and any salesperson, work better. We take what already works for you, write it down as a process, and pressure test it until it holds up without you.",
  },
  {
    q: "What kind of results can we expect?",
    a: "Most clients see a 30% lift in qualified pipeline inside the first 90 days. The bigger win is that the systems we build keep working long after we're done.",
  },
  {
    q: "How long does an engagement typically last?",
    a: "Usually 90 to 180 days, depending on scope. We work in 90-day sprints (diagnose, build, deploy) so you see real traction quickly, not months of strategy decks.",
  },
  {
    q: "Do you replace our existing sales team?",
    a: "No. We make the team you already have a lot more effective. They get the playbook, messaging and systems to close consistently instead of relying on gut instinct.",
  },
  {
    q: "What does the first week look like?",
    a: "We dig into your pipeline, messaging and conversion data. By the end of week one you'll know exactly where revenue is leaking and what to fix first.",
  },
  {
    q: "Is this only for B2B companies?",
    a: "Yes. We work with fractional leaders and founder-led firms in complex B2B sales, mostly professional services and high-value consulting where relationships and positioning are what actually move deals.",
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
