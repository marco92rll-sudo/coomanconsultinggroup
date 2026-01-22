import Section from "./Section";

const problems = [
  {
    title: "Referrals have plateaued",
    description: "The warm leads that built your business are no longer enough to hit growth targets.",
  },
  {
    title: "Founders still carry pipeline",
    description: "Your best salesperson is also your CEO — and that doesn't scale.",
  },
  {
    title: "Sales teams are stretched thin",
    description: "Reps are juggling prospecting and closing, doing neither well.",
  },
  {
    title: "Outbound feels risky",
    description: "You've heard the horror stories — or lived them. Noisy campaigns, damaged reputation, wasted budget.",
  },
];

const Problem = () => {
  return (
    <Section id="problem">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
          The Reality
        </p>
        <h2 className="heading-section mb-6">
          Growth stalls not because of product or market fit.
        </h2>
        <p className="body-large mb-12">
          It stalls because pipeline isn't predictable.
        </p>

        <div className="grid gap-8 md:gap-10">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="border-l-2 border-divider pl-6 hover:border-foreground/30 transition-colors duration-300"
            >
              <h3 className="heading-subsection mb-2">{problem.title}</h3>
              <p className="body-regular">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Problem;
