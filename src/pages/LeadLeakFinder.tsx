import { useEffect } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const benefits = [
  {
    icon: Search,
    title: "Identify Conversion Gaps",
    desc: "See where prospects are dropping off in your B2B sales funnel and pinpoint the exact stages costing you revenue.",
  },
  {
    icon: TrendingUp,
    title: "Referral Scaling Strategy",
    desc: "Learn how to build a predictable outbound engine so you can scale beyond word-of-mouth and referrals.",
  },
  {
    icon: Zap,
    title: "Immediate Fixes",
    desc: "Get a 15-minute action plan for your B2B funnel with prioritised fixes you can implement today.",
  },
];

const LeadLeakFinder = () => {
  useEffect(() => {
    document.title = "Free Lead Leak Finder | Sales Funnel Diagnostic for Founders";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Take the free 3-minute Lead Leak Finder diagnostic to identify gaps in your B2B sales funnel. Built for consultants and founders ready to scale beyond word-of-mouth."
      );
    }
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: "#090f1a" }}>
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow mb-6"
            style={{ letterSpacing: "0.18em" }}
          >
            Free Diagnostic Tool
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#ffffff",
            }}
          >
            Stop Losing Leads:{" "}
            <span className="glow-text-sm">The 3-Minute Lead Leak Finder</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6"
            style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 560, margin: "24px auto 0" }}
          >
            This tool identifies gaps in B2B sales funnels to help consultants and founders scale beyond word-of-mouth. Answer a few quick questions to uncover where your pipeline is leaking.
          </motion.p>
        </div>
      </section>

      {/* Embedded Diagnostic */}
      <section className="px-6 relative z-10">
        <div className="max-w-4xl mx-auto" style={{ height: "70vh", minHeight: 500 }}>
          <iframe
            src="/lead-leak-finder.html"
            className="w-full h-full border-0 rounded-lg"
            title="3-Minute Lead Leak Finder - Sales Funnel Diagnostic"
            style={{ border: "1px solid rgba(139,171,184,0.15)", borderRadius: 8 }}
          />
        </div>
      </section>

      {/* How It Works / What You Get */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <h2
              className="heading-section"
              style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
            >
              What You <span className="glow-text-sm">Get</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i + 1}
                className="p-6"
                style={{
                  background: "rgba(15,25,38,0.7)",
                  border: "1px solid rgba(139,171,184,0.12)",
                  borderRadius: 8,
                }}
              >
                <b.icon className="mb-4" style={{ color: "#8BAAB8", width: 28, height: 28 }} />
                <h3 className="text-sm font-bold text-white mb-2">{b.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="pb-12 text-center relative z-10">
        <a
          href="/"
          style={{ fontSize: 13, color: "#8BAAB8" }}
          className="hover:underline"
        >
          ← Back to Cooman Consulting Group
        </a>
      </div>
    </div>
  );
};

export default LeadLeakFinder;
