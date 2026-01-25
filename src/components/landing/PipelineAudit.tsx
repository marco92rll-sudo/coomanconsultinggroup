import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import { useState } from "react";

const auditIncludes = [
  "Current outbound maturity assessment",
  "Tech stack efficiency review",
  "ICP targeting analysis",
  "Quick-win recommendations",
  "Build vs. buy cost analysis",
];

const PipelineAudit = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    arr: "",
    approach: "",
    challenge: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section id="resources" className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">
              Start Here
            </p>
            <h2 className="heading-section mb-6">
              Not Ready to Commit?<br />
              <span className="text-primary">Start With a Pipeline Audit.</span>
            </h2>
            <p className="body-large mb-8">
              A free 30-minute call to understand your current state and determine if building in-house makes sense for you.
            </p>

            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <h3 className="font-semibold mb-4">Your Free Pipeline Audit Includes:</h3>
              <ul className="space-y-3">
                {auditIncludes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-8"
          >
            <h3 className="text-xl font-semibold mb-6">Book Your Free Audit</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Name</label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Company</label>
                  <Input
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Work Email</label>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Current ARR</label>
                  <Select
                    value={formData.arr}
                    onValueChange={(value) => setFormData({ ...formData, arr: value })}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<5m">&lt;$5M</SelectItem>
                      <SelectItem value="5-15m">$5-15M</SelectItem>
                      <SelectItem value="15-30m">$15-30M</SelectItem>
                      <SelectItem value="30-50m">$30-50M</SelectItem>
                      <SelectItem value="50m+">$50M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Current Outbound Approach</label>
                  <Select
                    value={formData.approach}
                    onValueChange={(value) => setFormData({ ...formData, approach: value })}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select approach" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No outbound</SelectItem>
                      <SelectItem value="inhouse">In-house team</SelectItem>
                      <SelectItem value="agency">Using agency</SelectItem>
                      <SelectItem value="mix">Mix</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Biggest Challenge</label>
                <Textarea
                  placeholder="Tell us about your current pipeline challenges..."
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  className="bg-background min-h-[100px]"
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Book Your Free Audit
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                No spam. No pressure. Just a candid conversation about your pipeline.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PipelineAudit;
