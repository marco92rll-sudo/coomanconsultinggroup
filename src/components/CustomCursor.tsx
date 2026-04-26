import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      setEnabled(false);
      return;
    }

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    // Hide native cursor everywhere
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
      @keyframes ccg-cursor-pulse {
        0%, 100% {
          transform: translate(-50%, -50%) scale(1);
          filter: drop-shadow(0 0 6px hsl(var(--cta) / 0.9)) drop-shadow(0 0 14px hsl(var(--cta) / 0.55));
        }
        50% {
          transform: translate(-50%, -50%) scale(1.18);
          filter: drop-shadow(0 0 10px hsl(var(--cta))) drop-shadow(0 0 24px hsl(var(--cta) / 0.8));
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.getElementById("custom-cursor-style")?.remove();
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[9999] top-0 left-0"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        opacity: visible ? 1 : 0,
        transition: "opacity 200ms ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 22,
          height: 22,
          color: "hsl(var(--cta))",
          animation: "ccg-cursor-pulse 1.6s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <line x1="11" y1="2" x2="11" y2="20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default CustomCursor;
