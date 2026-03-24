const Footer = () => {
  return (
    <footer
      className="relative z-10 py-8"
      style={{ borderTop: "1px solid rgba(139,171,184,0.08)" }}
    >
      <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="CCG"
            className="h-6 w-auto"
            style={{ mixBlendMode: "lighten" }}
          />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
            © 2025 Cooman Consulting Group
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#8BAAB8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
          >
            LinkedIn
          </a>
          <a
            href="/privacy"
            className="transition-colors duration-200"
            style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#8BAAB8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
