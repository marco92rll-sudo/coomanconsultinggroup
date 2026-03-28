import { useEffect, useRef } from "react";

interface GlobeCanvasProps {
  size: number;
}

const GlobeCanvas = ({ size }: GlobeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 2;

    let rotation = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // 1. Soft outer atmospheric glow
      const atmo = ctx.createRadialGradient(cx, cy, r * 0.88, cx, cy, r * 1.05);
      atmo.addColorStop(0, "rgba(139,171,184,0)");
      atmo.addColorStop(0.7, "rgba(139,171,184,0.04)");
      atmo.addColorStop(1, "rgba(139,171,184,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.05, 0, Math.PI * 2);
      ctx.fillStyle = atmo;
      ctx.fill();

      // 2. Main sphere — dark fill with very subtle inner light
      const sphereGrad = ctx.createRadialGradient(
        cx - r * 0.25, cy - r * 0.25, 0,
        cx, cy, r
      );
      sphereGrad.addColorStop(0, "rgba(20,32,48,0.6)");
      sphereGrad.addColorStop(0.5, "rgba(9,15,26,0.92)");
      sphereGrad.addColorStop(1, "rgba(9,15,26,0.98)");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // 3. Sphere edge highlight — thin luminous rim
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(139,171,184,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Clip to sphere for internal elements
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r - 1, 0, Math.PI * 2);
      ctx.clip();

      // 4. Very faint longitude meridians — only at edges, fading toward center
      const lonCount = 6;
      for (let i = 0; i < lonCount; i++) {
        const angle = (Math.PI / lonCount) * i + rotation;
        const squeeze = Math.abs(Math.sin(angle));
        
        // Only draw when meridian is near the edges (squeeze < 0.5 means near-edge)
        const alpha = squeeze < 0.35 ? 0.035 + squeeze * 0.02 : squeeze * 0.025;
        
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.max(squeeze * r, 0.5), r * 0.98, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139,171,184,${alpha})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }

      // 5. Equator line — very faint
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * 0.98, r * 0.12, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(139,171,184,0.03)";
      ctx.lineWidth = 0.4;
      ctx.stroke();

      // 6. Sparse edge dots — only along the visible rim, like stars on a globe's silhouette
      const dotCount = 30;
      for (let i = 0; i < dotCount; i++) {
        const phi = (i / dotCount) * Math.PI * 2;
        const theta = Math.acos(2 * ((i * 0.618033988749895) % 1) - 1);

        const x3d = Math.sin(theta) * Math.cos(phi + rotation * 1.5);
        const y3d = Math.cos(theta);
        const z3d = Math.sin(theta) * Math.sin(phi + rotation * 1.5);

        // Only show dots near the edge of the sphere (rim zone)
        if (z3d < 0.0 || z3d > 0.4) continue;

        const px = cx + x3d * r * 0.92;
        const py = cy + y3d * r * 0.92;

        ctx.beginPath();
        ctx.arc(px, py, 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,171,184,${0.08 + z3d * 0.06})`;
        ctx.fill();
      }

      ctx.restore();

      // 7. Top specular highlight — subtle glass-like reflection
      const specGrad = ctx.createRadialGradient(
        cx - r * 0.15, cy - r * 0.4, 0,
        cx - r * 0.15, cy - r * 0.4, r * 0.5
      );
      specGrad.addColorStop(0, "rgba(139,171,184,0.04)");
      specGrad.addColorStop(1, "rgba(139,171,184,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = specGrad;
      ctx.fill();

      rotation += 0.002;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, position: "absolute", top: 0, left: 0 }}
      className="pointer-events-none"
    />
  );
};

export default GlobeCanvas;
