import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const GetStarted = () => {
  const [auditOpen, setAuditOpen] = useState(false);

  return (
    <>
      <section id="get-started" className="section-padding relative z-10">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-16"
          >
            <p className="eyebrow mb-4">Next Steps</p>
            <h2 className="heading-section mb-4">
              Here's what to do <span className="glow-text-sm">next.</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
              Not sure where you stand? Run the quick diagnostic. Ready to talk it through? Book a call.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card A - Pipeline Fix (Featured) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={1}
              className="relative p-8"
              style={{
                background: "rgba(15,25,38,0.85)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(226,114,91,0.35)",
                borderRadius: 8,
                boxShadow: "0 0 40px rgba(226,114,91,0.08), inset 0 0 40px rgba(226,114,91,0.03)",
                overflow: "visible",
              }}
            >
              <span
                className="absolute -top-3 left-8 bg-cta text-white"
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  padding: "4px 12px",
                  borderRadius: 4,
                  boxShadow: "0 0 16px rgba(226,114,91,0.5)",
                }}
              >
                Start Here
              </span>

              <h3 className="text-lg font-bold mb-2 mt-2">The 3-Minute Lead Leak Finder</h3>
              <p className="mb-1" style={{ fontSize: 13, color: "rgba(139,171,184,0.7)", fontWeight: 500 }}>
                Takes 3 minutes · 
              </p>
              <p className="mb-6" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                A quick self-assessment that shows you where your pipeline is losing revenue, and what to fix first.
              </p>
              <button
                onClick={() => setAuditOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 font-semibold transition-all duration-200 glow-btn bg-cta text-white"
                style={{ borderRadius: 6, fontSize: 13 }}
              >
                Find My Leaks <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* Card B - Virtual Coffee */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={2}
              className="card-process p-8"
            >
              <h3 className="text-lg font-bold mb-2">Book a Strategy Session</h3>
              <p className="mb-1" style={{ fontSize: 13, color: "rgba(139,171,184,0.7)", fontWeight: 500 }}>
                30 minutes · Zero pressure
              </p>
              <p className="mb-6" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                We'll talk through where you are, what you've tried, and where you want to get to. No pitch, just a straight answer on the best next step.
              </p>
              <a
                href="https://calendly.com/ccooman-ccg/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 font-semibold transition-all duration-200"
                style={{
                  background: "rgba(139,171,184,0.04)",
                  color: "#8BAAB8",
                  border: "1px solid rgba(139,171,184,0.35)",
                  borderRadius: 6,
                  fontSize: 13,
                }}
              >
                Reserve My Spot <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pipeline Fix Audit Modal */}
      <AnimatePresence>
        {auditOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(9,15,26,0.95)" }}
          >
            <button
              onClick={() => setAuditOpen(false)}
              className="absolute top-6 right-6 z-10"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              <X className="h-6 w-6" />
            </button>
            <div className="w-full h-full">
              <iframe
                src="/lead-leak-finder.html"
                className="w-full h-full border-0"
                title="3-Minute Lead Leak Finder"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GetStarted;
