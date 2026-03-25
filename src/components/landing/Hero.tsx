import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const Hero = () => {
  const logoRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.6, rotation: -15 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "power3.out" }
      );
      gsap.to(logoRef.current, {
        scale: 1.02,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.3,
      });
    }
  }, []);

  // Parallax: hero content moves up slightly on scroll
  useEffect(() => {
    let raf: number;
    const animate = () => {
      const section = sectionRef.current;
      if (section) {
        const scrollY = window.scrollY;
        const content = section.querySelector(".hero-content") as HTMLElement;
        if (content) {
          content.style.transform = `translateY(${scrollY * 0.12}px)`;
          content.style.opacity = String(Math.max(1 - scrollY / 800, 0));
        }
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ paddingTop: 80 }}
    >
      <div className="hero-content text-center max-w-4xl mx-auto px-6 relative z-10 will-change-transform">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="eyebrow mb-8"
          style={{ letterSpacing: "0.18em" }}
        >
          Revenue Operations · Sales Systems · Outbound Infrastructure
        </motion.p>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div style={{ filter: "drop-shadow(0 0 20px rgba(139,171,184,0.45))" }}>
            <img
              ref={logoRef}
              src="/logo.png"
              alt="Cooman Consulting Group Logo"
              className="w-20 h-20"
              style={{ mixBlendMode: "lighten", opacity: 0 }}
            />
          </div>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05 }}
        >
          <span className="sr-only">Business Consulting Services: </span>
          <span style={{ color: "#ffffff" }}>From Founder </span>
          <br />
          <span className="glow-text">Instinct</span>
          <span style={{ color: "#ffffff" }}> to</span>
          <br />
          <span>Scalable </span>
          <span className="glow-text">Framework.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mt-8"
          style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 580 }}
        >
          We extract what you know, systemize how you sell, and build the infrastructure that closes deals without you.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <a
            href="/lead-leak-finder"
            className="inline-flex items-center justify-center px-8 py-3 font-semibold transition-all duration-200 glow-btn bg-cta text-white"
            style={{ borderRadius: 6, fontSize: 14 }}
          >
            Pipeline Fix
          </a>
          <a
            href="#get-started"
            className="inline-flex items-center justify-center px-8 py-3 font-semibold transition-all duration-200"
            style={{
              background: "rgba(139,171,184,0.04)",
              color: "#8BAAB8",
              border: "1px solid rgba(139,171,184,0.35)",
              borderRadius: 6,
              fontSize: 14,
            }}
          >
            Virtual Coffee
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
