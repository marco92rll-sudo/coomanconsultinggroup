import { useEffect, useRef } from "react";

const MorphingOrbs = () => {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const currentBlur = useRef(60);
  const currentOpacity = useRef(0.7);
  const currentScale = useRef(1);

  useEffect(() => {
    let targetBlur = 60;
    let targetOpacity = 0.7;
    let targetScale = 1;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      // Smooth target values based on scroll — gentle wave curve
      const wave = Math.sin(progress * Math.PI);
      targetBlur = 60 - wave * 40;
      targetOpacity = 0.7 + wave * 0.15;
      targetScale = 1 + wave * 0.08;
    };

    const animate = () => {
      // Lerp towards targets for buttery smooth transitions
      const lerpFactor = 0.06;
      currentBlur.current += (targetBlur - currentBlur.current) * lerpFactor;
      currentOpacity.current += (targetOpacity - currentOpacity.current) * lerpFactor;
      currentScale.current += (targetScale - currentScale.current) * lerpFactor;

      const blur = currentBlur.current.toFixed(1);
      const opacity = currentOpacity.current.toFixed(3);
      const scale = currentScale.current.toFixed(4);

      [orb1Ref, orb2Ref, orb3Ref].forEach(ref => {
        if (ref.current) {
          ref.current.style.filter = `blur(${blur}px)`;
          ref.current.style.opacity = opacity;
          ref.current.style.transform = ref.current.dataset.baseTransform
            ? `${ref.current.dataset.baseTransform} scale(${scale})`
            : `scale(${scale})`;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    // Set base transforms
    if (orb1Ref.current) orb1Ref.current.dataset.baseTransform = "translate(-50%, -50%)";
    if (orb2Ref.current) orb2Ref.current.dataset.baseTransform = "";
    if (orb3Ref.current) orb3Ref.current.dataset.baseTransform = "";

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Orb 1 - Primary */}
      <div
        ref={orb1Ref}
        className="absolute will-change-[filter,opacity,transform]"
        style={{
          width: 480,
          height: 480,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse at 50% 50%, rgba(139,171,184,0.4) 0%, rgba(27,58,107,0.6) 35%, transparent 65%)",
          borderRadius: "50%",
          animation: "drift1 24s ease-in-out infinite",
        }}
      />
      {/* Orb 2 - Secondary */}
      <div
        ref={orb2Ref}
        className="absolute will-change-[filter,opacity,transform]"
        style={{
          width: 360,
          height: 360,
          top: "10%",
          right: "10%",
          background: "radial-gradient(circle, rgba(27,58,107,0.6), transparent 70%)",
          borderRadius: "50%",
          animation: "drift2 20s ease-in-out infinite",
        }}
      />
      {/* Orb 3 - Ambient */}
      <div
        ref={orb3Ref}
        className="absolute will-change-[filter,opacity,transform]"
        style={{
          width: 300,
          height: 300,
          bottom: "15%",
          left: "10%",
          background: "radial-gradient(circle, rgba(27,58,107,0.4), transparent 70%)",
          borderRadius: "50%",
          animation: "drift3 28s ease-in-out infinite",
        }}
      />

      {/* Grid overlay */}
      <div
        className="fixed inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(139,171,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,171,184,0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(27,58,107,0.3) 0%, transparent 60%)",
        }}
      />

      <style>{`
        @keyframes drift1 {
          0%, 100% { transform: translate(-50%, -50%) translate(0px, 0px); }
          33% { transform: translate(-50%, -50%) translate(60px, -40px); }
          66% { transform: translate(-50%, -50%) translate(-40px, 60px); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0px, 0px); }
          33% { transform: translate(-80px, 40px); }
          66% { transform: translate(40px, -60px); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate(0px, 0px); }
          33% { transform: translate(60px, 80px); }
          66% { transform: translate(-60px, -40px); }
        }
      `}</style>
    </div>
  );
};

export default MorphingOrbs;
