import { useEffect, useRef } from "react";

// Keyframe states for morphing
const keyframes = [
  { scroll: 0, clipPath: "circle(50% at 50% 50%)", blur: 60 },
  { scroll: 0.25, clipPath: "polygon(50% 2%, 74% 26%, 98% 50%, 74% 74%, 50% 98%, 26% 74%, 2% 50%, 26% 26%)", blur: 40 },
  { scroll: 0.5, clipPath: "polygon(50% 0%, 68% 12%, 88% 12%, 100% 50%, 88% 88%, 68% 88%, 50% 100%, 32% 88%, 12% 88%, 0% 50%, 12% 12%, 32% 12%)", blur: 20 },
  { scroll: 0.75, clipPath: "polygon(50% 2%, 74% 26%, 98% 50%, 74% 74%, 50% 98%, 26% 74%, 2% 50%, 26% 26%)", blur: 40 },
  { scroll: 1, clipPath: "circle(50% at 50% 50%)", blur: 60 },
];

// Normalize all clip-paths to 12 points for smooth interpolation
function parsePoints(clipPath: string): number[][] {
  if (clipPath.startsWith("circle")) return Array(12).fill([50, 50]);
  const match = clipPath.match(/polygon\((.+)\)/);
  if (!match) return Array(12).fill([50, 50]);
  const pts = match[1].split(",").map(p => {
    const [x, y] = p.trim().replace(/%/g, "").split(/\s+/).map(Number);
    return [x, y];
  });
  // Resample to 12 points
  while (pts.length < 12) {
    // duplicate last point
    pts.push([...pts[pts.length - 1]]);
  }
  return pts.slice(0, 12);
}

// Circle as 12 evenly spaced points
function circlePoints(): number[][] {
  return Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
    return [50 + 50 * Math.cos(angle), 50 + 50 * Math.sin(angle)];
  });
}

const normalizedKeyframes = keyframes.map(kf => ({
  scroll: kf.scroll,
  points: kf.clipPath.startsWith("circle") ? circlePoints() : parsePoints(kf.clipPath),
  blur: kf.blur,
  opacity: kf.scroll >= 0.4 && kf.scroll <= 0.6 ? 0.85 : 0.7,
}));

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function interpolateState(progress: number) {
  let i = 0;
  for (let j = 0; j < normalizedKeyframes.length - 1; j++) {
    if (progress >= normalizedKeyframes[j].scroll && progress <= normalizedKeyframes[j + 1].scroll) {
      i = j;
      break;
    }
  }
  if (progress >= normalizedKeyframes[normalizedKeyframes.length - 1].scroll) {
    i = normalizedKeyframes.length - 2;
  }

  const from = normalizedKeyframes[i];
  const to = normalizedKeyframes[i + 1];
  const range = to.scroll - from.scroll;
  const t = range === 0 ? 0 : (progress - from.scroll) / range;

  const points = from.points.map((pt, idx) => [
    lerp(pt[0], to.points[idx][0], t),
    lerp(pt[1], to.points[idx][1], t),
  ]);

  const blur = lerp(from.blur, to.blur, t);
  const opacity = lerp(from.opacity, to.opacity, t);

  const clipPath = `polygon(${points.map(p => `${p[0].toFixed(1)}% ${p[1].toFixed(1)}%`).join(", ")})`;

  return { clipPath, blur, opacity };
}

const MorphingOrbs = () => {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      const state = interpolateState(progress);

      [orb1Ref, orb2Ref, orb3Ref].forEach(ref => {
        if (ref.current) {
          ref.current.style.clipPath = state.clipPath;
          ref.current.style.filter = `blur(${state.blur}px)`;
          ref.current.style.opacity = String(state.opacity);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Orb 1 - Primary */}
      <div
        ref={orb1Ref}
        className="absolute"
        style={{
          width: 480,
          height: 480,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse at 50% 50%, rgba(139,171,184,0.4) 0%, rgba(27,58,107,0.6) 35%, transparent 65%)",
          animation: "drift1 24s ease-in-out infinite",
        }}
      />
      {/* Orb 2 - Secondary */}
      <div
        ref={orb2Ref}
        className="absolute"
        style={{
          width: 360,
          height: 360,
          top: "10%",
          right: "10%",
          background: "radial-gradient(circle, rgba(27,58,107,0.6), transparent 70%)",
          animation: "drift2 20s ease-in-out infinite",
        }}
      />
      {/* Orb 3 - Ambient */}
      <div
        ref={orb3Ref}
        className="absolute"
        style={{
          width: 300,
          height: 300,
          bottom: "15%",
          left: "10%",
          background: "radial-gradient(circle, rgba(27,58,107,0.4), transparent 70%)",
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
