import { useEffect, useRef, useState } from "react";

const industries = [
  "B2B SaaS",
  "Renewable Energy",
  "Staffing & Recruitment",
  "Professional Services",
  "Banking & Finance",
  "Retail",
  "Hospitality",
];

const IndustriesStrip = () => {
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let pos = 0;
    const speed = 0.5;

    const animate = () => {
      if (!paused && scrollRef.current) {
        pos += speed;
        const halfWidth = scrollRef.current.scrollWidth / 2;
        if (pos >= halfWidth) pos = 0;
        scrollRef.current.style.transform = `translateX(-${pos}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const doubled = [...industries, ...industries];

  return (
    <section
      id="industries"
      className="relative z-10"
      style={{
        borderTop: "1px solid rgba(139,171,184,0.1)",
        borderBottom: "1px solid rgba(139,171,184,0.1)",
        background: "rgba(9,15,26,0.6)",
      }}
    >
      <div className="container-wide py-5 flex items-center gap-8">
        <span
          className="hidden md:block flex-shrink-0"
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          Industries Served
        </span>

        <div
          className="overflow-hidden flex-1"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div ref={scrollRef} className="flex items-center gap-8 whitespace-nowrap">
            {doubled.map((ind, i) => (
              <span
                key={i}
                style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}
              >
                {ind}
                {i < doubled.length - 1 && (
                  <span className="ml-8" style={{ color: "rgba(139,171,184,0.3)" }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesStrip;
