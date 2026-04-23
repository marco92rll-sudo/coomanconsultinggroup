const Footer = () => {
  return (
    <footer
      className="relative z-10 py-12"
      style={{ borderTop: "1px solid rgba(139,171,184,0.08)" }}
    >
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/logo.png"
                alt="Cooman Consulting Group Logo"
                className="h-6 w-auto"
                style={{ mixBlendMode: "lighten" }}
              />
              <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
                Cooman Consulting Group
              </span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", maxWidth: 360, lineHeight: 1.6 }}>
              We turn how founders sell into systems the business can run without them.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <nav className="flex items-center gap-5">
              {[
                { label: "Our Offer", href: "#services" },
                { label: "Process", href: "#process" },
                { label: "Fit", href: "#fit" },
                { label: "FAQs", href: "#faq" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors duration-200 hover:text-accent"
                  style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href="https://calendly.com/ccooman-ccg/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2 font-semibold transition-all duration-200"
              style={{
                fontSize: 12,
                color: "#8BAAB8",
                border: "1px solid rgba(139,171,184,0.25)",
                borderRadius: 5,
              }}
            >
              Book a Virtual Coffee
            </a>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(139,171,184,0.06)" }}
        >
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.15)" }}>
            © 2025 Cooman Consulting Group. All rights reserved.
          </span>
          <a
            href="https://www.linkedin.com/company/cooman-consulting-group/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#8BAAB8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
