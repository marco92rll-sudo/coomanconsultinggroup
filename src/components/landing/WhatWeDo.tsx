import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, ShieldCheck } from "lucide-react";

const testimonials = [
  {
    quote: "They uncovered 5 opportunities in our existing data. Revenue jumped 35% that quarter.",
    title: "CEO, Renewable Energy SaaS",
    rating: 5,
  },
  {
    quote: "We went from selling on gut feelings to systematic demand gen that allows us to focus more on delivery.",
    title: "IP Lawyer, Legal Firm",
    rating: 5,
  },
  {
    quote: "They shared such simple yet profound principles on sales and outbound frameworks. This modern b2b sales and marketing space is so overwhelming and complicated, but CCG really simplified it for us.",
    title: "Program Manager, Marketing Firm",
    rating: 5,
  },
  {
    quote: "I was skeptical about another consultant, but they actually got in the trenches with us. The framework they built is now our entire sales playbook.",
    title: "Founder, Business Coaching",
    rating: 5,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const WhatWeDo = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section id="services" className="section-padding relative z-10">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            custom={0}
          >
            <p className="eyebrow mb-4">What We Do</p>
            <h2 className="heading-section mb-6">
              We turn{" "}
              <span className="glow-text-sm">founder knowledge</span>
              {" "}into revenue systems.
            </h2>
            <p className="sr-only">Business consulting services for B2B founders</p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
              Most founders are the best salesperson in their business but can't explain why they win — let alone teach it. We capture that edge, build the framework around it, and deploy the infrastructure to replicate it without you in every deal.
            </p>
          </motion.div>

          {/* Right - Testimonial Orb */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={1}
            className="flex justify-center"
          >
            <div
              className="relative w-[320px] h-[320px] md:w-[360px] md:h-[360px] rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle at 30% 30%, rgba(139,171,184,0.12), rgba(9,15,26,0.9) 70%)",
                border: "1px solid rgba(139,171,184,0.15)",
                boxShadow: "0 0 60px rgba(139,171,184,0.08), inset 0 0 40px rgba(139,171,184,0.04)",
              }}
            >
              {/* Google G logo area */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full"
                style={{ background: "rgba(15,25,38,0.9)", border: "1px solid rgba(139,171,184,0.2)" }}>
                <ShieldCheck size={16} color="hsl(var(--cta))" />
                <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Client Reviews</span>
              </div>

              {/* Stars */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="hsl(var(--cta))" color="hsl(var(--cta))" />
                ))}
              </div>

              {/* Testimonial content */}
              <div className="px-8 md:px-10 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontStyle: "italic" }}>
                      "{t.quote}"
                    </p>
                    <p className="mt-4" style={{ fontSize: 11, fontWeight: 600, color: "hsl(var(--primary))" }}>
                      — {t.title}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dot indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background: i === current ? "hsl(var(--cta))" : "rgba(139,171,184,0.3)",
                      transform: i === current ? "scale(1.3)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
