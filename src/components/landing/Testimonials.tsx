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
      "I broke through my own glass ceiling of resistance to change. I generated my first real dataset to inform a more refined plan. Sometimes we stay stuck not because we lack capability — but because we don't push past that first uncomfortable barrier. It was hard. And it was absolutely worth it.",
    name: "J.V",
    role: "Founder, L&D Advisory",
    metric: "LinkedIn Post, 2026",
  },
  {
    quote:
      "Leone has a unique talent for making complex concepts accessible. His mentorship has been invaluable — he is adept at identifying potential and fostering growth in others. Through his guidance I developed skills that enhanced my performance and confidence. I wholeheartedly recommend Leone for any leadership role.",
    name: "Matt.E",
    role: "Senior Analyst",
    metric: "LinkedIn Recommendation, 2024",
  },
  {
    quote:
      "Here is a company that is truly willing to invest time and effort in co-crafting a unique sales system that is a perfect fit for your organisation. Leone is an excellent listener and a strategic thinker who is able to translate your business strategy into a workable, user-friendly system. I highly recommend CCG to business owners and sales leaders who want to up their sales and marketing game.",
    name: "Marco.L",
    role: "Fractional Product Manager",
    metric: "LinkedIn Recommendation, 2026",
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
