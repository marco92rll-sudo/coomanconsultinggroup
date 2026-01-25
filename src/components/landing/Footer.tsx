import { Linkedin, Mail } from "lucide-react";

const footerLinks = {
  company: [
    { label: "Manifesto", href: "#manifesto" },
    { label: "Case Studies", href: "#cases" },
    { label: "Our Process", href: "#process" },
  ],
  resources: [
    { label: "Pipeline Audit", href: "#resources" },
    { label: "Blog", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="font-bold text-xl tracking-tight text-foreground mb-4 block">
              CCG
            </a>
            <p className="text-sm text-muted-foreground mb-6">
              Building independent outbound engines for B2B companies.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@coomanconsulting.com"
                className="p-2 bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cooman Consulting Group. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            hello@coomanconsulting.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
