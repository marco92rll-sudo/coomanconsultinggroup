import { useEffect, useState } from "react";

const STORAGE_KEY = "ccg_cookie_consent";

type Consent = "accepted" | "rejected" | null;

export const getCookieConsent = (): Consent => {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem(STORAGE_KEY) as Consent) || null;
};

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookieConsent()) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const setChoice = (choice: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);

    // Load Google Analytics on accept; on decline, leave consent denied and never load it.
    const w = window as any;
    if (choice === "accepted" && typeof w.__loadGtag === "function") {
      w.__loadGtag();
    }

    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: choice }));
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className={`fixed bottom-4 left-4 right-4 z-[100] md:left-6 md:right-auto md:max-w-sm transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div
        className="flex items-center gap-3 rounded-full pl-4 pr-2 py-2 shadow-2xl backdrop-blur-xl"
        style={{
          background: "rgba(12, 20, 33, 0.85)",
          border: "1px solid rgba(139,171,184,0.18)",
          boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)",
        }}
      >
        <span className="text-xl leading-none select-none" aria-hidden="true">🍪</span>
        <p className="flex-1 text-sm leading-snug" style={{ color: "rgba(220,230,240,0.85)" }}>
          We use cookies to improve the site.{" "}
          <button
            onClick={() => setChoice("rejected")}
            className="underline underline-offset-2 transition-colors hover:text-white"
            style={{ color: "rgba(220,230,240,0.55)" }}
          >
            No thanks
          </button>
        </p>
        <button
          onClick={() => setChoice("accepted")}
          autoFocus
          className="shrink-0 px-5 py-2 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
          style={{
            background: "hsl(var(--cta, 18 90% 55%))",
            boxShadow: "0 6px 20px -6px hsl(var(--cta, 18 90% 55%) / 0.6)",
          }}
        >
          Sure
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
