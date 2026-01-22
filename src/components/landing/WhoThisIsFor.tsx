import Section from "./Section";
import { Check, X } from "lucide-react";

const forList = [
  "Growing B2B companies with proven product-market fit",
  "Founder-led or early-stage sales teams",
  "Revenue between early traction and scale",
  "Businesses seeking predictable, repeatable pipeline",
];

const notForList = [
  "Companies wanting mass lead volume",
  "Teams looking for cheap execution",
  "Businesses unwilling to engage strategically",
];

const WhoThisIsFor = () => {
  return (
    <Section id="fit">
      <div className="max-w-4xl">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
          Fit Assessment
        </p>
        <h2 className="heading-section mb-12">
          We choose our clients carefully.
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="heading-subsection mb-6">This is for you if</h3>
            <ul className="space-y-4">
              {forList.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                  <span className="body-regular text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="heading-subsection mb-6 text-muted-foreground">This is not for you if</h3>
            <ul className="space-y-4">
              {notForList.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="body-regular">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WhoThisIsFor;
