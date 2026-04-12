import { motion } from "framer-motion";
import { Star } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
};

const testimonials = [
  {
    quote:
      "CCG rebuilt our entire outbound engine in 6 weeks. Pipeline went from unpredictable to consistent — we closed 3 enterprise deals in the first quarter.",
    name: "Mark T.",
    role: "CEO, SaaS Platform",
    metric: "3× pipeline in 90 days",
  },
  {
    quote:
      "We were drowning in leads but closing nothing. They diagnosed the bottleneck, rebuilt the process, and now our close rate is up 40%.",
    name: "Sarah L.",
    role: "VP Sales, FinTech",
    metric: "40% close-rate increase",
  },
  {
    quote:
      "The hyper-personalised playbook alone was worth the engagement. Our reps finally know exactly what to say, when, and to whom.",
    name: "James R.",
    role: "Founder, B2B Agency",
    metric: "2× response rates",
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding relative z-10">
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">Social Proof</p>
          <h2 className="heading-section mb-4">
            What Our Clients <span className="glow-text-sm">Say.</span>
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Real results from real engagements — no fluff, no vanity metrics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i + 1}
              className="card-process p-8 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star
                    key={s}
                    className="w-3.5 h-3.5 fill-cta"
                    style={{ color: "hsl(var(--cta))" }}
                  />
                ))}
              </div>

              <p
                className="flex-1 mb-6"
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                }}
              >
                "{t.quote}"
              </p>

              <div
                className="inline-block self-start mb-4 px-3 py-1 rounded-full"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "hsl(var(--cta))",
                  background: "rgba(226,114,91,0.1)",
                  border: "1px solid rgba(226,114,91,0.25)",
                }}
              >
                {t.metric}
              </div>

              <div>
                <p className="text-sm font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                  {t.name}
                </p>
                <p style={{ fontSize: 12, color: "rgba(139,171,184,0.7)" }}>{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
