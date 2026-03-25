import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
            <p className="eyebrow mb-4">Get Started</p>
            <h2 className="heading-section mb-4">
              Pick your <span className="glow-text-sm">entry point.</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)" }}>
              Two ways in. Both get you clarity fast.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card A - Pipeline Fix */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={1}
              className="relative p-8"
              style={{
                background: "linear-gradient(135deg, rgba(13,148,136,0.08) 0%, rgba(15,25,38,0.85) 60%)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(13,148,136,0.25)",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {/* Subtle teal top-line */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{ height: 2, background: "linear-gradient(90deg, #0D9488, transparent)" }}
              />
              <h3 className="text-lg font-bold mb-3">The 3-Minute Lead Leak Finder</h3>
              <p className="mb-6" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                A fast self-assessment that diagnoses exactly where your pipeline is leaking. Instant results. No call needed.
              </p>
              <button
                onClick={() => setAuditOpen(true)}
                className="inline-flex items-center gap-2 justify-center px-6 py-2.5 font-semibold transition-all duration-200"
                style={{
                  background: "#0D9488",
                  color: "#ffffff",
                  borderRadius: 6,
                  fontSize: 13,
                  boxShadow: "0 0 24px rgba(13,148,136,0.35)",
                }}
              >
                Start the diagnostic
                <span style={{ fontSize: 16, fontWeight: 700 }}>→</span>
              </button>
            </motion.div>

            {/* Card B - Virtual Coffee (Featured) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={2}
              className="relative p-8"
              style={{
                background: "rgba(15,25,38,0.85)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(197,160,89,0.3)",
                borderRadius: 8,
                boxShadow: "0 0 40px rgba(197,160,89,0.06), inset 0 0 40px rgba(197,160,89,0.02)",
                overflow: "visible",
              }}
            >
              {/* Most Popular badge */}
              <span
                className="absolute -top-3 left-8"
                style={{
                  background: "#C5A059",
                  color: "#090f1a",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  padding: "4px 12px",
                  borderRadius: 4,
                  boxShadow: "0 0 16px rgba(197,160,89,0.4)",
                }}
              >
                Most Popular
              </span>

              <h3 className="text-lg font-bold mb-3 mt-2">Virtual Coffee</h3>
              <p className="mb-6" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                Tell us your biggest challenge. We'll spend 30 minutes showing you exactly what we'd do about it.
              </p>
              <a
                href="https://calendly.com/lcooman-ccg/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 font-semibold transition-all duration-200"
                style={{
                  background: "rgba(139,171,184,0.04)",
                  color: "#8BAAB8",
                  border: "1px solid rgba(139,171,184,0.35)",
                  borderRadius: 6,
                  fontSize: 13,
                }}
              >
                Reserve My Spot
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
