import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoGlowRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const scanFrameRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const authTextRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [animStarted, setAnimStarted] = useState(false);

  // Matrix rain on canvas
  const startMatrixRain = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return () => {};
    const ctx = canvas.getContext("2d");
    if (!ctx) return () => {};

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω<>{}[]|/\\=+*&^%$#@!0123456789";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    let animId: number;
    let opacity = 1;

    const draw = () => {
      ctx.fillStyle = `rgba(9, 15, 26, 0.06)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Mix of brand colors: primary blue-gray and accent coral
        if (Math.random() > 0.92) {
          ctx.fillStyle = `rgba(226, 114, 91, ${opacity * 0.9})`;
          ctx.font = `bold ${fontSize}px monospace`;
        } else {
          ctx.fillStyle = `rgba(139, 171, 184, ${opacity * (0.3 + Math.random() * 0.5)})`;
          ctx.font = `${fontSize}px monospace`;
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    return (fadeOut = false) => {
      if (fadeOut) {
        const fade = () => {
          opacity -= 0.02;
          if (opacity <= 0) {
            cancelAnimationFrame(animId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
          }
          requestAnimationFrame(fade);
        };
        fade();
      } else {
        cancelAnimationFrame(animId);
      }
    };
  }, []);

  useEffect(() => {
    if (animStarted) return;
    setAnimStarted(true);

    // Start matrix rain immediately
    const stopRain = startMatrixRain();

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Hide everything initially
    gsap.set(
      [eyebrowRef.current, line1Ref.current, line2Ref.current, line3Ref.current, subRef.current, ctaRef.current],
      { opacity: 0, y: 40 }
    );
    gsap.set(logoRef.current, { opacity: 0, scale: 0.1 });
    gsap.set(logoGlowRef.current, { opacity: 0, scale: 0.1 });
    gsap.set(scanLineRef.current, { opacity: 0, top: "0%" });
    gsap.set(scanFrameRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(overlayRef.current, { opacity: 1 });
    gsap.set(authTextRef.current, { opacity: 0 });

    // === ACT 1: Matrix rain + biometric boot sequence ===
    tl
      // Auth text typing effect
      .to(authTextRef.current, { opacity: 1, duration: 0.3 }, "+=0.8")
      .call(() => {
        const el = authTextRef.current;
        if (!el) return;
        const lines = [
          "> INITIALIZING CCG PROTOCOL...",
          "> SCANNING BIOMETRICS...",
          "> IDENTITY VERIFIED",
          "> ACCESS GRANTED_",
        ];
        let lineIdx = 0;
        let charIdx = 0;
        el.textContent = "";
        const typeInterval = setInterval(() => {
          if (lineIdx >= lines.length) {
            clearInterval(typeInterval);
            return;
          }
          const currentLine = lines[lineIdx];
          charIdx++;
          const displayedLines = lines.slice(0, lineIdx).join("\n");
          const currentTyped = currentLine.substring(0, charIdx);
          el.textContent = (displayedLines ? displayedLines + "\n" : "") + currentTyped;
          if (charIdx >= currentLine.length) {
            lineIdx++;
            charIdx = 0;
          }
        }, 35);
      })

      // === ACT 2: Biometric scan frame appears ===
      .to(scanFrameRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      }, "+=1.0")

      // Scan line sweeps
      .to(scanLineRef.current, { opacity: 1, duration: 0.1 })
      .to(scanLineRef.current, {
        top: "100%",
        duration: 1.2,
        ease: "power1.inOut",
      })
      .to(scanLineRef.current, {
        top: "0%",
        duration: 1.0,
        ease: "power1.inOut",
      })
      .to(scanLineRef.current, { opacity: 0, duration: 0.2 })

      // === ACT 3: Logo explodes into existence ===
      .to(logoGlowRef.current, {
        opacity: 1,
        scale: 2,
        duration: 0.15,
        ease: "power4.out",
      })
      .to(logoRef.current, {
        opacity: 1,
        scale: 1.2,
        duration: 0.1,
        ease: "power4.out",
      }, "<")
      // Flash effect
      .to(overlayRef.current, {
        background: "rgba(139,171,184,0.3)",
        duration: 0.08,
      })
      .to(overlayRef.current, {
        background: "rgba(9,15,26,0)",
        duration: 0.4,
      })
      // Logo settles with glitch
      .to(logoRef.current, { scale: 0.95, duration: 0.05, ease: "none" })
      .to(logoRef.current, { scale: 1.05, x: -3, duration: 0.04, ease: "none" })
      .to(logoRef.current, { scale: 0.98, x: 3, duration: 0.04, ease: "none" })
      .to(logoRef.current, { scale: 1, x: 0, duration: 0.3, ease: "elastic.out(1, 0.5)" })
      .to(logoGlowRef.current, { scale: 1, opacity: 0.6, duration: 0.6, ease: "power2.inOut" }, "<")

      // Fade out matrix rain and scan frame
      .call(() => stopRain(true))
      .to(canvasRef.current, { opacity: 0, duration: 1.2 }, "<")
      .to(scanFrameRef.current, { opacity: 0, duration: 0.6 }, "<")
      .to(authTextRef.current, { opacity: 0, duration: 0.4 }, "<")

      // === ACT 4: Text burns in like data stream roots ===
      .to({}, { duration: 0.3 })

      // Line 1 — glitch-burn reveal
      .to(line1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power4.out",
      })
      

      // Line 2
      .to(line2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power4.out",
      }, "-=0.15")
      

      // Line 3
      .to(line3Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power4.out",
      }, "-=0.15")
      

      // ACT 5: Supporting elements
      .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.1")
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

    // Idle animations
    tl.call(() => {
      gsap.to(logoRef.current, {
        scale: 1.03,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(logoGlowRef.current, {
        opacity: 0.35,
        scale: 1.15,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  }, [animStarted, startMatrixRain]);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ paddingTop: 80 }}
    >
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: "none" }}
      />

      {/* Flash overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[5] pointer-events-none"
      />

      {/* Biometric auth text */}
      <div
        ref={authTextRef}
        className="absolute z-[6] pointer-events-none"
        style={{
          top: "12%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Courier New', monospace",
          fontSize: 13,
          color: "#8BAAB8",
          whiteSpace: "pre-line",
          textAlign: "left",
          textShadow: "0 0 8px rgba(139,171,184,0.6)",
          opacity: 0,
          minWidth: 340,
        }}
      />

      <div className="text-center max-w-4xl mx-auto px-6 relative z-10">
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="eyebrow mb-8"
          style={{ letterSpacing: "0.18em", opacity: 0 }}
        >
          Revenue Operations · Sales Systems · Outbound Infrastructure
        </p>

        {/* Logo with biometric scan */}
        <div className="flex justify-center mb-10 relative">
          {/* Scan frame */}
          <div
            ref={scanFrameRef}
            className="absolute"
            style={{
              width: 140,
              height: 140,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: "#8BAAB8" }} />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: "#8BAAB8" }} />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: "#8BAAB8" }} />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: "#8BAAB8" }} />
            {/* Scan line */}
            <div
              ref={scanLineRef}
              className="absolute left-0 right-0"
              style={{
                height: 2,
                background: "linear-gradient(90deg, transparent, rgba(226,114,91,0.8), rgba(139,171,184,0.9), rgba(226,114,91,0.8), transparent)",
                boxShadow: "0 0 15px rgba(226,114,91,0.5), 0 0 30px rgba(139,171,184,0.3)",
                opacity: 0,
                top: "0%",
              }}
            />
          </div>

          {/* Glow */}
          <div
            ref={logoGlowRef}
            className="absolute"
            style={{
              width: 200,
              height: 200,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(139,171,184,0.6) 0%, rgba(226,114,91,0.15) 30%, transparent 65%)",
              borderRadius: "50%",
              opacity: 0,
              pointerEvents: "none",
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

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(48px, 7vw, 88px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
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

      {/* Scanlines overlay for CRT feel */}
      <div
        className="absolute inset-0 pointer-events-none z-[4]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
          mixBlendMode: "multiply",
        }}
      />
    </section>
  );
};

// Glitch effect: briefly scrambles text then restores
function glitchText(el: HTMLElement | null, cycles: number) {
  if (!el) return;
  const original = el.innerHTML;
  const glitchChars = "!@#$%^&*01{}[]<>/\\|";
  let count = 0;

  const interval = setInterval(() => {
    if (count >= cycles) {
      el.innerHTML = original;
      clearInterval(interval);
      return;
    }
    el.innerHTML = original.replace(/[A-Za-z]/g, (ch) =>
      Math.random() > 0.6
        ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
        : ch
    );
    count++;
  }, 40);
}

export default Hero;
