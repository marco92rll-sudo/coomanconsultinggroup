import { useEffect, useRef } from "react";

const MorphingOrbs = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;

    const animate = () => {
      const scrollY = window.scrollY;
      const container = containerRef.current;
      if (!container) return;

      const children = container.children;

      // Orb 1 — large primary, slow parallax up
      const orb1 = children[0] as HTMLElement;
      orb1.style.transform = `translate(-50%, -50%) translateY(${scrollY * -0.15}px)`;

      // Orb 2 — top-right accent, faster parallax
      const orb2 = children[1] as HTMLElement;
      orb2.style.transform = `translateY(${scrollY * -0.25}px)`;

      // Orb 3 — bottom-left ambient, medium parallax
      const orb3 = children[2] as HTMLElement;
      orb3.style.transform = `translateY(${scrollY * -0.1}px)`;

      // Subtle opacity fade as you scroll deeper
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      const globalOpacity = 1 - progress * 0.4;
      container.style.opacity = String(globalOpacity);

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Orb 1 — Large centered glow */}
      <div
        className="absolute will-change-transform"
        style={{
          width: 600,
          height: 600,
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(139,171,184,0.18) 0%, rgba(27,58,107,0.25) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Orb 2 — Top-right accent */}
      <div
        className="absolute will-change-transform"
        style={{
          width: 400,
          height: 400,
          top: "5%",
          right: "5%",
          background:
            "radial-gradient(circle, rgba(27,58,107,0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Orb 3 — Bottom-left ambient */}
      <div
        className="absolute will-change-transform"
        style={{
          width: 350,
          height: 350,
          bottom: "10%",
          left: "8%",
          background:
            "radial-gradient(circle, rgba(27,58,107,0.2) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,171,184,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,171,184,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top vignette glow */}
      <div
        className="fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(27,58,107,0.2) 0%, transparent 55%)",
        }}
      />
    </div>
  );
};

export default MorphingOrbs;
