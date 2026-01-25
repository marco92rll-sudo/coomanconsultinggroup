import { motion } from "framer-motion";
import { Calendar, TrendingUp, Quote } from "lucide-react";

const caseStudies = [
  {
    industry: "Sales Enablement Software",
    stage: "Series B, $15M ARR",
    challenge: "Spent $180K/year on agency, pipeline dried up when contract ended",
    built: "3-person SDR team, Clay-powered data engine, multi-channel sequences",
    results: [
      "120 qualified meetings in first 90 days",
      "$2.4M pipeline generated",
      "Team scaled to 7 reps",
    ],
    timeToIndependence: "84 days",
    quote: "We spent more in one year with our agency than CCG's entire engagement. Now we own the system.",
  },
  {
    industry: "B2B Services Marketplace",
    stage: "Series A, $8M ARR",
    challenge: "No outbound motion, relied on inbound that plateaued",
    built: "Hybrid SDR/AE model, account-based sequences, referral engine",
    results: [
      "$1.8M pipeline in 90 days",
      "18% meeting-to-opp conversion",
      "System self-optimizing",
    ],
    timeToIndependence: "91 days",
    quote: "They didn't just build our outbound—they taught us how to evolve it ourselves.",
  },
  {
    industry: "Developer Tools",
    stage: "Growth, $35M ARR",
    challenge: "Outbound team existed but no process, 2% reply rate",
    built: "Complete playbook overhaul, ICP refinement, new tech stack",
    results: [
      "Reply rate jumped to 11%",
      "Cost-per-meeting dropped 64%",
      "Team promoted internally",
    ],
    timeToIndependence: "87 days",
    quote: "We thought we needed more reps. We actually needed a system. CCG built it.",
  },
];

const CaseStudies = () => {
  return (
    <section id="cases" className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">
            Case Studies
          </p>
          <h2 className="heading-section mb-6">
            Companies That Built Independence
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-card border border-border rounded-xl p-6 flex flex-col card-hover"
            >
              {/* Header */}
              <div className="mb-6">
                <p className="text-sm text-primary font-medium">{study.industry}</p>
                <p className="text-xs text-muted-foreground">{study.stage}</p>
              </div>

              {/* Challenge */}
              <div className="mb-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Challenge</p>
                <p className="text-sm text-foreground">{study.challenge}</p>
              </div>

              {/* What We Built */}
              <div className="mb-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">What We Built</p>
                <p className="text-sm text-foreground">{study.built}</p>
              </div>

              {/* Results */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Results</p>
                <ul className="space-y-1">
                  {study.results.map((result, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-3 w-3 text-primary" />
                      <span className="text-primary font-medium">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Time to Independence */}
              <div className="flex items-center gap-2 mb-6 py-3 px-4 bg-primary/10 rounded-lg">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Time to Independence: {study.timeToIndependence}
                </span>
              </div>

              {/* Quote */}
              <div className="mt-auto pt-4 border-t border-border">
                <Quote className="h-4 w-4 text-muted-foreground mb-2" />
                <p className="text-sm italic text-muted-foreground">"{study.quote}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
