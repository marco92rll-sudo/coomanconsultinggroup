import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "They uncovered blind spots in our pipeline we'd been ignoring for two years. Revenue jumped 35% in the first quarter after implementation.",
    title: "CEO, B2B SaaS Company",
    rating: 5,
  },
  {
    quote: "We went from gut-feel selling to a repeatable system. Our new reps are ramping in half the time now.",
    title: "VP of Sales, Professional Services Firm",
    rating: 5,
  },
  {
    quote: "The CRM overhaul alone saved us 10 hours a week. But the real win was finally understanding why we were losing deals.",
    title: "Founder, Digital Agency",
    rating: 5,
  },
  {
    quote: "I was skeptical about another consultant, but they actually got in the trenches with us. The framework they built is now our entire sales playbook.",
    title: "Managing Director, IT Consultancy",
    rating: 5,
  },
  {
    quote: "Our close rate went from 40% to over 65% within 90 days. The diagnostic alone was worth every penny.",
    title: "COO, Financial Services Startup",
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Google Reviews</span>
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
