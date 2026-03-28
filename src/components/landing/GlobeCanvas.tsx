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
    const radius = size / 2 - 8;

    let rotation = 0;

    const drawGlobe = () => {
      ctx.clearRect(0, 0, size, size);

      // Outer glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.15);
      glowGrad.addColorStop(0, "rgba(139,171,184,0.06)");
      glowGrad.addColorStop(1, "rgba(139,171,184,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Globe fill - subtle gradient
      const bgGrad = ctx.createRadialGradient(cx * 0.7, cy * 0.7, 0, cx, cy, radius);
      bgGrad.addColorStop(0, "rgba(139,171,184,0.08)");
      bgGrad.addColorStop(0.6, "rgba(9,15,26,0.95)");
      bgGrad.addColorStop(1, "rgba(9,15,26,0.98)");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = bgGrad;
      ctx.fill();

      // Globe border
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(139,171,184,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 1, 0, Math.PI * 2);
      ctx.clip();

      // Latitude lines
      const latLines = 7;
      for (let i = 1; i < latLines; i++) {
        const lat = (Math.PI / latLines) * i - Math.PI / 2;
        const y = cy + Math.sin(lat) * radius;
        const r = Math.cos(lat) * radius;
        ctx.beginPath();
        ctx.ellipse(cx, y, Math.abs(r), Math.abs(r) * 0.15, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(139,171,184,0.06)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Longitude lines (rotating)
      const lonLines = 8;
      for (let i = 0; i < lonLines; i++) {
        const lon = (Math.PI / lonLines) * i + rotation;
        const xOffset = Math.cos(lon) * radius;
        const squeeze = Math.abs(Math.sin(lon));

        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.max(squeeze * radius, 1), radius, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139,171,184,${0.04 + squeeze * 0.06})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Dot particles on surface
      const dotCount = 60;
      for (let i = 0; i < dotCount; i++) {
        const phi = (i / dotCount) * Math.PI * 2;
        const theta = Math.acos(2 * ((i * 0.618033988749895) % 1) - 1);

        const x3d = Math.sin(theta) * Math.cos(phi + rotation * 2);
        const y3d = Math.cos(theta);
        const z3d = Math.sin(theta) * Math.sin(phi + rotation * 2);

        if (z3d < -0.1) continue; // behind globe

        const px = cx + x3d * radius * 0.9;
        const py = cy + y3d * radius * 0.9;
        const alpha = 0.08 + z3d * 0.12;

        ctx.beginPath();
        ctx.arc(px, py, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,171,184,${alpha})`;
        ctx.fill();
      }

      // Orbital rings (like reference image but subtle)
      for (let r = 0; r < 3; r++) {
        const ringAngle = -0.3 + r * 0.3;
        const ringRadius = radius * (0.7 + r * 0.2);
        const ringAlpha = 0.06 - r * 0.015;
        const ringRotation = rotation * (0.5 + r * 0.3);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ringRotation * 0.3);
        ctx.beginPath();
        ctx.ellipse(0, 0, ringRadius, ringRadius * 0.2, ringAngle, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139,171,184,${ringAlpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();

      rotation += 0.003;
      animRef.current = requestAnimationFrame(drawGlobe);
    };

    drawGlobe();

    return () => {
      cancelAnimationFrame(animRef.current);
    };
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
