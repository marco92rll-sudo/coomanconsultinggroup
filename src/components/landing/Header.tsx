import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Our Offer & Who We Serve", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Fit Assessment", href: "#fit" },
  { label: "Get Started", href: "#get-started" },
  { label: "FAQs", href: "#faq" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(9,15,26,0.97)" : "rgba(9,15,26,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(139,171,184,0.12)",
      }}
    >
      <div className="container-wide py-4 flex items-center justify-between relative">
        {/* Left: Logo + Name */}
        <a href="#" className="flex items-center gap-3 relative z-10">
          <img
            src="/logo.png"
            alt="Cooman Consulting Group Logo"
            className="h-7 w-auto"
            style={{ mixBlendMode: "lighten" }}
          />
          <span
            className="hidden sm:block"
            style={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#8BAAB8",
            }}
          >
            Cooman Consulting Group
          </span>
        </a>

        {/* Centre: Nav - absolutely centered */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors duration-200 whitespace-nowrap"
              style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#8BAAB8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: CTA + Mobile */}
        <div className="flex items-center gap-4">
          <a
            href="https://calendly.com/lcooman-ccg/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block transition-all duration-200"
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              background: "#8BAAB8",
              color: "#090f1a",
              padding: "8px 18px",
              borderRadius: 4,
              boxShadow: "0 0 20px rgba(139,171,184,0.35)",
            }}
          >
            Virtual Coffee
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div style={{ background: "rgba(9,15,26,0.97)", borderTop: "1px solid rgba(139,171,184,0.1)" }}>
          <nav className="container-wide py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}
                className="py-2"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://calendly.com/lcooman-ccg/discovery"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="inline-block w-fit mt-2"
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                background: "#8BAAB8",
                color: "#090f1a",
                padding: "8px 18px",
                borderRadius: 4,
              }}
            >
              Virtual Coffee
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
