import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Hero = () => {
  const logoRef = useRef<HTMLImageElement>(null);
  const logoGlowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [animStarted, setAnimStarted] = useState(false);

  useEffect(() => {
    if (animStarted) return;
    setAnimStarted(true);

    const elements = [
      logoGlowRef.current,
      logoRef.current,
      eyebrowRef.current,
      line1Ref.current,
      line2Ref.current,
      line3Ref.current,
      subRef.current,
      ctaRef.current,
    ];

    // Set initial state — everything invisible and slightly below
    gsap.set(elements, { opacity: 0, y: 30 });
    gsap.set(logoRef.current, { scale: 0.9 });
    gsap.set(logoGlowRef.current, { scale: 0.8 });

    // Smooth cascading wave — each element flows in like a tide
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.8 },
      delay: 0.3,
    });

    tl
      // Logo fades in gently
      .to(logoGlowRef.current, { opacity: 0.6, y: 0, scale: 1, duration: 1.2 })
      .to(logoRef.current, { opacity: 1, y: 0, scale: 1, duration: 1 }, "-=1")
      // Text flows in with staggered wave timing
      .to(eyebrowRef.current, { opacity: 1, y: 0 }, "-=0.5")
      .to(line1Ref.current, { opacity: 1, y: 0 }, "-=0.55")
      .to(line2Ref.current, { opacity: 1, y: 0 }, "-=0.55")
      .to(line3Ref.current, { opacity: 1, y: 0 }, "-=0.55")
      .to(subRef.current, { opacity: 1, y: 0 }, "-=0.45")
      .to(ctaRef.current, { opacity: 1, y: 0 }, "-=0.4");

    // Gentle breathing loop after intro completes
    tl.call(() => {
      gsap.to(logoRef.current, {
        scale: 1.03, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1,
      });
      gsap.to(logoGlowRef.current, {
        opacity: 0.35, scale: 1.1, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1,
      });
    });
  }, [animStarted]);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ paddingTop: 80 }}
    >
      <div className="text-center max-w-4xl mx-auto px-6 relative z-10">
        <p
          ref={eyebrowRef}
          className="eyebrow mb-8"
          style={{ letterSpacing: "0.18em", opacity: 0 }}
        >
          Revenue Operations · Sales Systems · Outbound Infrastructure
        </p>

        <div className="flex justify-center mb-10 relative">
          <div
            ref={logoGlowRef}
            className="absolute"
            style={{
              width: 200, height: 200, top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(139,171,184,0.6) 0%, rgba(226,114,91,0.15) 30%, transparent 65%)",
              borderRadius: "50%", opacity: 0, pointerEvents: "none",
            }}
          />
          <div style={{ filter: "drop-shadow(0 0 35px rgba(139,171,184,0.7))" }}>
            <img
              ref={logoRef}
              src="/logo.png"
              alt="Cooman Consulting Group Logo"
              className="w-24 h-24"
              style={{ mixBlendMode: "lighten", opacity: 0 }}
            />
          </div>
        </div>

        <h1
          style={{
            fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 700,
            letterSpacing: "-0.02em", lineHeight: 1.05,
          }}
        >
          <span className="sr-only">Business Consulting Services: </span>
          <span ref={line1Ref} className="inline-block" style={{ opacity: 0 }}>
            <span style={{ color: "#ffffff" }}>From Founder </span>
          </span>
          <br />
          <span ref={line2Ref} className="inline-block" style={{ opacity: 0 }}>
            <span className="glow-text">Instinct</span>
            <span style={{ color: "#ffffff" }}> to</span>
          </span>
          <br />
          <span ref={line3Ref} className="inline-block" style={{ opacity: 0 }}>
            <span>Scalable </span>
            <span className="glow-text">Framework.</span>
          </span>
        </h1>

        <p
          ref={subRef}
          className="mx-auto mt-8"
          style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 580, opacity: 0 }}
        >
          We extract what you know, systemize how you sell, and build the
          infrastructure that gives you more time to focus on delivery.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          style={{ opacity: 0 }}
        >
          <a
            href="/lead-leak-finder"
            className="inline-flex items-center justify-center px-8 py-3 font-semibold transition-all duration-200 glow-btn bg-cta text-white"
            style={{ borderRadius: 6, fontSize: 14 }}
          >
            Free Diagnosis
          </a>
          <a
            href="https://calendly.com/ccooman-ccg/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 font-semibold transition-all duration-200 glow-btn"
            style={{
              background: "rgba(139,171,184,0.04)", color: "#8BAAB8",
              border: "1px solid rgba(139,171,184,0.35)", borderRadius: 6, fontSize: 14,
            }}
          >
            Virtual Coffee
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
