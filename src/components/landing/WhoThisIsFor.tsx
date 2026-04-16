import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const forList = [
  "Founder-led businesses generating revenue but lacking a consistent pipeline",
  "Offers that already convert: you've closed deals, but it's not repeatable",
  "Teams stuck between delivery and growth, relying heavily on referrals",
  "Founders who want to step out of day-to-day selling without losing control of revenue",
];

const notForList = [
  "Pre-revenue business searching for product-market fit",
  "The founder expects outsourced sales without internal involvement",
  "The company is just looking for lead lists or short-term hires without a strategy",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const WhoThisIsFor = () => {
  return (
    <section id="fit" className="section-padding relative z-10">
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">Fit Assessment</p>
          <h2 className="heading-section">
            Who is this <span className="glow-text-sm">for</span>?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-4xl mx-auto">
          {/* For you */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={1}
            className="rounded-xl p-8"
            style={{
              background: "rgba(139,171,184,0.04)",
              border: "1px solid rgba(139,171,184,0.12)",
            }}
          >
            <h3
              className="mb-6"
              style={{
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "hsl(var(--primary))",
              }}
            >
              BEST FITS
            </h3>
            <ul className="space-y-4">
              {forList.map((item, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  custom={i + 2}
                  className="flex items-start gap-3"
                >
                  <Check
                    className="mt-0.5 flex-shrink-0"
                    size={18}
                    style={{ color: "hsl(var(--cta))" }}
                  />
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Not for you */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={2}
            className="rounded-xl p-8"
            style={{
              background: "rgba(139,171,184,0.02)",
              border: "1px solid rgba(139,171,184,0.08)",
            }}
          >
            <h3
              className="mb-6"
              style={{
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              NOT A FIT IF
            </h3>
            <ul className="space-y-4">
              {notForList.map((item, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  custom={i + 3}
                  className="flex items-start gap-3"
                >
                  <X
                    className="mt-0.5 flex-shrink-0"
                    size={18}
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  />
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoThisIsFor;
