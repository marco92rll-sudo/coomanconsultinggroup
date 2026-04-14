import { useEffect } from "react";

const LeadLeakFinder = () => {
  useEffect(() => {
    document.title = "Free Lead Leak Finder | Sales Funnel Diagnostic for Founders";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Take the free 3-minute Lead Leak Finder diagnostic to identify gaps in your B2B sales funnel. Built for consultants and founders ready to scale beyond word-of-mouth."
      );
    }
  }, []);

  return (
    <iframe
      src="/lead-leak-finder.html"
      className="fixed inset-0 w-full h-full border-0"
      title="3-Minute Lead Leak Finder - Sales Funnel Diagnostic"
      style={{ zIndex: 9999 }}
    />
  );
};

export default LeadLeakFinder;
