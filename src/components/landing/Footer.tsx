import Section from "./Section";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide py-16 md:py-20">
        <div className="max-w-2xl mb-12">
          <p className="font-display text-2xl md:text-3xl leading-relaxed mb-8">
            We help companies outgrow us.
          </p>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Calm confidence. Long-term thinking. Revenue systems that last.
          </p>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-display text-lg tracking-tight">
            Cooman Consulting Group
          </p>
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
