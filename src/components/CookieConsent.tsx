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

    // Update Google Consent Mode
    const w = window as any;
    if (typeof w.gtag === "function") {
      const granted = choice === "accepted" ? "granted" : "denied";
      w.gtag("consent", "update", {
        ad_storage: granted,
        ad_user_data: granted,
        ad_personalization: granted,
        analytics_storage: granted,
      });
    }

    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: choice }));
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-[100] md:left-6 md:right-auto md:max-w-md"
    >
      <div
        className="rounded-xl p-5 shadow-2xl backdrop-blur-md"
        style={{
          background: "rgba(12, 20, 33, 0.95)",
          border: "1px solid rgba(139,171,184,0.2)",
        }}
      >
        <h2 className="text-white font-semibold text-base mb-2">We use cookies</h2>
        <p className="text-sm mb-4" style={{ color: "rgba(220,230,240,0.75)" }}>
          We use cookies to understand how visitors use the site so we can improve it.
          Nothing creepy, no ads. You can change your mind anytime.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setChoice("accepted")}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "hsl(var(--cta, 18 90% 55%))" }}
          >
            Accept
          </button>
          <button
            onClick={() => setChoice("rejected")}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white/80 transition-colors hover:text-white"
            style={{ background: "transparent", border: "1px solid rgba(139,171,184,0.25)" }}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
