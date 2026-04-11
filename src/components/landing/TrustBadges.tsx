import { motion } from "framer-motion";
import { Check } from "lucide-react";

const badges = [
  "No retainers",
  "90-day engagements",
  "Revenue-focused",
  "Founder-involved",
];

const TrustBadges = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative z-10 py-8"
    >
      <div className="container-wide">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {badges.map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2"
            >
              <Check
                size={14}
                className="flex-shrink-0"
                style={{ color: "hsl(var(--cta))" }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.02em",
                }}
              >
                {badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TrustBadges;
