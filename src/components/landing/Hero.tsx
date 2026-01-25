import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-12 bg-background relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary opacity-50" />
      
      {/* Glow effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm uppercase tracking-widest text-primary font-semibold mb-6"
            >
              Anti-Agency Revenue Systems
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="heading-hero mb-6"
            >
              Stop Renting Your Revenue Engine.{" "}
              <span className="gradient-text">Build It.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="body-large max-w-xl mb-8"
            >
              We help B2B companies build world-class in-house outbound teams in 90 days—then we leave. No retainers. No dependency. Just sustainable growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="group">
                Book Pipeline Audit
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Why We're Not an Agency
              </Button>
            </motion.div>
          </div>

          {/* Right: Split-screen visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Agency Model */}
            <div className="bg-card border border-destructive/30 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-destructive/50" />
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="h-5 w-5 text-destructive" />
                <span className="text-sm font-semibold text-destructive">Agency Model</span>
              </div>
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground">Monthly payments</div>
                <div className="flex gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="h-6 w-2 bg-destructive/40 rounded" />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mt-4">Your ownership</div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-destructive rounded-full" />
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  $180K-$300K/year<br/>
                  <span className="text-destructive">Zero ownership when they leave</span>
                </p>
              </div>
            </div>

            {/* CCG Model */}
            <div className="bg-card border border-primary/30 rounded-xl p-6 relative overflow-hidden glow-cyan">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary">CCG Model</span>
              </div>
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground">One-time investment</div>
                <div className="flex gap-1">
                  <div className="h-6 w-8 bg-primary rounded" />
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="h-6 w-2 bg-muted rounded opacity-30" />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mt-4">Your ownership</div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-full bg-primary rounded-full" />
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  $45K-$85K one time<br/>
                  <span className="text-primary">You own it forever</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
