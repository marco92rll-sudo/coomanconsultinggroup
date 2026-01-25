import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Manifesto = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">
            Our Manifesto
          </p>
          <h2 className="heading-section mb-12">
            Why We Refuse to Be an Agency
          </h2>

          <div className="prose prose-invert prose-lg max-w-none">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground leading-relaxed mb-8"
            >
              After years of watching agencies trap companies in dependency cycles, we decided to do the opposite.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="my-12 p-8 bg-card border border-border rounded-xl"
            >
              <p className="text-xl font-semibold text-foreground mb-4">
                Agencies sell you fish.
              </p>
              <p className="text-muted-foreground mb-6">
                They want you coming back hungry every month. Their entire business model depends on you never learning to fish yourself.
              </p>
              <p className="text-xl font-semibold text-primary">
                We teach you to fish—then we give you the boat, the gear, and the map to the best fishing spots.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6 mb-12"
            >
              <p className="text-muted-foreground leading-relaxed">
                Here's what that means in practice:
              </p>
              
              <div className="space-y-4">
                {[
                  { bold: "We don't do retainers.", rest: "Fixed engagements only. When the work is done, we leave." },
                  { bold: "We don't gatekeep knowledge.", rest: "Everything we know, you'll know. Full documentation, full transparency." },
                  { bold: "We don't use proprietary platforms.", rest: "You own your tech stack, your data, your processes." },
                  { bold: "We don't measure success by how long you stay.", rest: "We measure it by how quickly you become independent." },
                  { bold: "We don't want you as a customer forever.", rest: "We want you to build something that outlasts us." },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <span className="h-2 w-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-foreground">{item.bold}</span>{" "}
                      {item.rest}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="my-12 p-8 bg-secondary border border-border rounded-xl"
            >
              <p className="text-muted-foreground mb-4">
                This approach costs us revenue. We could make 10x more running retained services. But we sleep better knowing we're building real companies, not revenue leases.
              </p>
              <p className="text-xl font-semibold text-foreground">
                If you want a vendor, hire an agency.{" "}
                <span className="text-primary">If you want to build an asset, work with us.</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center pt-8"
            >
              <Button size="lg" className="group">
                Ready to Build Instead of Rent?
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;
