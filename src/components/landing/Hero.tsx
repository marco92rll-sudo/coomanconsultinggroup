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
  const burnOverlay1 = useRef<HTMLSpanElement>(null);
  const burnOverlay2 = useRef<HTMLSpanElement>(null);
  const burnOverlay3 = useRef<HTMLSpanElement>(null);
  const [animStarted, setAnimStarted] = useState(false);

  useEffect(() => {
    if (animStarted) return;
    setAnimStarted(true);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Hide everything initially
    gsap.set(
      [
        eyebrowRef.current,
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        subRef.current,
        ctaRef.current,
      ],
      { opacity: 0, y: 30 }
    );
    gsap.set(logoRef.current, { opacity: 0, scale: 0.3 });
    gsap.set(logoGlowRef.current, { opacity: 0, scale: 0.2 });
    gsap.set([burnOverlay1.current, burnOverlay2.current, burnOverlay3.current], {
      scaleX: 1,
    });

    // ACT 1: Cinematic logo entrance (the "movie opening")
    tl
      // Logo glow pulse emerges from darkness
      .to(logoGlowRef.current, {
        opacity: 0.8,
        scale: 1.5,
        duration: 1.2,
        ease: "power2.out",
      })
      // Logo materializes inside the glow
      .to(
        logoRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          ease: "back.out(1.4)",
        },
        "-=0.7"
      )
      // Logo glow settles
      .to(
        logoGlowRef.current,
        {
          scale: 1,
          opacity: 0.6,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.4"
      )
      // Brief dramatic pause
      .to({}, { duration: 0.4 })

      // ACT 2: Text burns onto the page like roots from the logo
      // Line 1: "From Founder" — burn reveal
      .to(
        line1Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "+=0.1"
      )
      .to(
        burnOverlay1.current,
        {
          scaleX: 0,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "<"
      )

      // Line 2: "Instinct to" — burn reveal
      .to(
        line2Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.3"
      )
      .to(
        burnOverlay2.current,
        {
          scaleX: 0,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "<"
      )

      // Line 3: "Scalable Framework." — burn reveal
      .to(
        line3Ref.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.3"
      )
      .to(
        burnOverlay3.current,
        {
          scaleX: 0,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "<"
      )

      // ACT 3: Supporting elements fade in
      .to(
        eyebrowRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.2"
      )
      .to(
        subRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.3"
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.3"
      );

    // Idle logo pulse after intro completes
    tl.call(() => {
      gsap.to(logoRef.current, {
        scale: 1.03,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(logoGlowRef.current, {
        opacity: 0.4,
        scale: 1.1,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  }, [animStarted]);

  return (
    <section
      className="min-h-screen flex items-center justify-center relative"
      style={{ paddingTop: 80 }}
    >
      <div className="text-center max-w-4xl mx-auto px-6 relative z-10">
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="eyebrow mb-8"
          style={{ letterSpacing: "0.18em", opacity: 0 }}
        >
          Revenue Operations · Sales Systems · Outbound Infrastructure
        </p>

        {/* Logo — cinematic entrance */}
        <div className="flex justify-center mb-10 relative">
          {/* Glow backdrop */}
          <div
            ref={logoGlowRef}
            className="absolute"
            style={{
              width: 160,
              height: 160,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(139,171,184,0.5) 0%, rgba(139,171,184,0.15) 40%, transparent 70%)",
              borderRadius: "50%",
              opacity: 0,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              filter: "drop-shadow(0 0 30px rgba(139,171,184,0.6))",
            }}
          >
            <img
              ref={logoRef}
              src="/logo.png"
              alt="Cooman Consulting Group Logo"
              className="w-24 h-24"
              style={{ mixBlendMode: "lighten", opacity: 0 }}
            />
          </div>
        </div>

        {/* Headline — burn-reveal lines */}
        <h1
          style={{
            fontSize: "clamp(48px, 7vw, 88px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          <span className="sr-only">Business Consulting Services: </span>

          {/* Line 1 */}
          <span
            ref={line1Ref}
            className="relative inline-block overflow-hidden"
            style={{ opacity: 0 }}
          >
            <span style={{ color: "#ffffff" }}>From Founder </span>
            <span
              ref={burnOverlay1}
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(226,114,91,0.6) 0%, rgba(139,171,184,0.4) 50%, hsl(var(--background)) 100%)",
                transformOrigin: "right center",
                pointerEvents: "none",
              }}
            />
          </span>
          <br />

          {/* Line 2 */}
          <span
            ref={line2Ref}
            className="relative inline-block overflow-hidden"
            style={{ opacity: 0 }}
          >
            <span className="glow-text">Instinct</span>
            <span style={{ color: "#ffffff" }}> to</span>
            <span
              ref={burnOverlay2}
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(226,114,91,0.6) 0%, rgba(139,171,184,0.4) 50%, hsl(var(--background)) 100%)",
                transformOrigin: "right center",
                pointerEvents: "none",
              }}
            />
          </span>
          <br />

          {/* Line 3 */}
          <span
            ref={line3Ref}
            className="relative inline-block overflow-hidden"
            style={{ opacity: 0 }}
          >
            <span>Scalable </span>
            <span className="glow-text">Framework.</span>
            <span
              ref={burnOverlay3}
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(226,114,91,0.6) 0%, rgba(139,171,184,0.4) 50%, hsl(var(--background)) 100%)",
                transformOrigin: "right center",
                pointerEvents: "none",
              }}
            />
          </span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="mx-auto mt-8"
          style={{
            fontSize: 17,
            color: "rgba(255,255,255,0.5)",
            maxWidth: 580,
            opacity: 0,
          }}
        >
          We extract what you know, systemize how you sell, and build the
          infrastructure that gives you more time to focus on delivery.
        </p>

        {/* CTAs */}
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
            Pipeline Fix
          </a>
          <a
            href="https://calendly.com/ccooman-ccg/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 font-semibold transition-all duration-200 glow-btn"
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
