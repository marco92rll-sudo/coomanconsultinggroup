import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Download, ArrowRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type ReportData = any;
type StatusResp = {
  id: string;
  status: string;
  company?: string;
  contact_name?: string;
  email?: string;
  report?: ReportData | null;
};

const LOADING_LINES = [
  "Analyzing your answers",
  "Mapping your quick wins",
  "Picking the right tools",
  "Calculating your ROI",
  "Building your assessment",
];

export default function AssessmentResults() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<StatusResp | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    if (!id) return;
    let timer: number | null = null;
    let cancelled = false;
    const poll = async () => {
      try {
        const resp = await fetch(`${SUPABASE_URL}/functions/v1/get-assessment?id=${id}`, {
          headers: { Authorization: `Bearer ${SUPABASE_KEY}`, apikey: SUPABASE_KEY },
        });
        const json = await resp.json();
        if (cancelled) return;
        if (!resp.ok) { setError(json.error || "Not found"); return; }
        setData(json);
        if (!["ready", "delivered"].includes(json.status)) {
          timer = window.setTimeout(poll, 2500);
        }
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      }
    };
    poll();
    return () => { cancelled = true; if (timer) window.clearTimeout(timer); };
  }, [id]);

  useEffect(() => {
    if (data?.report) return;
    const i = window.setInterval(() => setLineIdx((x) => (x + 1) % LOADING_LINES.length), 1800);
    return () => window.clearInterval(i);
  }, [data?.report]);

  return (
    <div className="min-h-screen relative" style={{ background: "#090f1a" }}>
      <Header />
      <main className="container-wide py-12 md:py-20">
        {error && (
          <div className="mx-auto max-w-2xl rounded-xl border border-white/10 bg-[#121E2C] p-10 text-center">
            <h1 className="text-2xl font-bold uppercase text-white">Report not found</h1>
            <p className="mt-3 text-white/60">{error}</p>
            <Link to="/assessment" className="mt-6 inline-block rounded-lg bg-[#E2735A] px-6 py-3 font-semibold uppercase tracking-wider text-white">Run a new assessment</Link>
          </div>
        )}

        {!error && data && !data.report && (
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#121E2C] p-12 text-center">
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#E2735A]/10">
              <Loader2 className="h-8 w-8 animate-spin text-[#E2735A]" />
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8BAAB8]">
              {data.status === "pending_payment" ? "Awaiting payment confirmation" : "Building your report"}
            </div>
            <h1 className="mt-3 text-3xl font-bold uppercase tracking-tight text-white">
              {data.status === "pending_payment" ? "Complete payment to view your report" : "Hold tight — your assessment is being built"}
            </h1>
            <p className="mt-4 min-h-[24px] text-white/60 transition-opacity duration-500">
              {data.status === "pending_payment" ? (
                <Link to="/assessment" className="text-[#E2735A] underline">Back to payment</Link>
              ) : LOADING_LINES[lineIdx] + "…"}
            </p>
            <p className="mt-8 text-xs text-white/30">This usually takes 30–60 seconds.</p>
          </div>
        )}

        {data?.report && <ReportView data={data} />}
      </main>
      <Footer />
    </div>
  );
}

function ReportView({ data }: { data: StatusResp }) {
  const r = data.report;
  const reportRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const slug = (data.company || "report").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "report";
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setDownloading(true);
    try {
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentW = pageW - margin * 2;
      const contentH = pageH - margin * 2;

      // --- Cover page ---
      pdf.setFillColor(10, 20, 34); // #0A1422
      pdf.rect(0, 0, pageW, pageH, "F");
      pdf.setFillColor(226, 115, 90); // #E2735A accent strip
      pdf.rect(0, 0, pageW, 4, "F");

      pdf.setTextColor(139, 170, 184); // #8BAAB8
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.text("COOMAN CONSULTING GROUP", margin, 30);

      pdf.setTextColor(139, 170, 184);
      pdf.setFontSize(9);
      pdf.text("AI TOOLS ASSESSMENT", margin, 36);

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(28);
      pdf.setFont("helvetica", "bold");
      pdf.text("Prepared for", margin, pageH / 2 - 12);
      pdf.setFontSize(34);
      pdf.setTextColor(226, 115, 90);
      const company = data.company || "Your Company";
      pdf.text(company, margin, pageH / 2 + 2);

      pdf.setFontSize(11);
      pdf.setTextColor(216, 226, 236);
      pdf.setFont("helvetica", "normal");
      pdf.text(`Focus: ${r.primaryFocus || ""}`, margin, pageH / 2 + 14);
      pdf.text(today, margin, pageH / 2 + 21);

      pdf.setFontSize(9);
      pdf.setTextColor(110, 132, 147);
      pdf.text("Confidential — prepared exclusively for the named client.", margin, pageH - margin);

      // --- Content pages: section by section ---
      const sections = Array.from(reportRef.current.querySelectorAll<HTMLElement>("[data-pdf-section]"));
      let cursorY = margin;
      pdf.addPage();
      drawHeaderFooter(pdf, pageW, pageH, margin, company, today);
      cursorY = margin + 8;

      for (const sectionEl of sections) {
        const canvas = await html2canvas(sectionEl, {
          backgroundColor: "#0A1422",
          scale: 2,
          useCORS: true,
          logging: false,
        });
        const imgW = contentW;
        const imgH = (canvas.height * imgW) / canvas.width;
        const usableH = contentH - 8; // leave room for footer header band

        if (imgH <= usableH) {
          // Fits in remaining space of current page?
          if (cursorY + imgH > pageH - margin) {
            pdf.addPage();
            drawHeaderFooter(pdf, pageW, pageH, margin, company, today);
            cursorY = margin + 8;
          }
          pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", margin, cursorY, imgW, imgH);
          cursorY += imgH + 4;
        } else {
          // Section taller than a page — slice it
          const pxPerMm = canvas.width / imgW;
          const sliceHpx = usableH * pxPerMm;
          let offsetPx = 0;
          while (offsetPx < canvas.height) {
            const remaining = canvas.height - offsetPx;
            const thisSlicePx = Math.min(sliceHpx, remaining);
            const slice = document.createElement("canvas");
            slice.width = canvas.width;
            slice.height = thisSlicePx;
            const ctx = slice.getContext("2d")!;
            ctx.fillStyle = "#0A1422";
            ctx.fillRect(0, 0, slice.width, slice.height);
            ctx.drawImage(canvas, 0, offsetPx, canvas.width, thisSlicePx, 0, 0, canvas.width, thisSlicePx);
            const sliceImgH = (thisSlicePx / canvas.width) * imgW;

            if (cursorY + sliceImgH > pageH - margin) {
              pdf.addPage();
              drawHeaderFooter(pdf, pageW, pageH, margin, company, today);
              cursorY = margin + 8;
            }
            pdf.addImage(slice.toDataURL("image/jpeg", 0.92), "JPEG", margin, cursorY, imgW, sliceImgH);
            cursorY += sliceImgH + 2;
            offsetPx += thisSlicePx;
          }
          cursorY += 4;
        }
      }

      pdf.save(`CCG-AI-Assessment-${slug}.pdf`);
    } catch (e) {
      console.error("PDF generation failed", e);
      alert("Sorry — PDF generation failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
            <CheckCircle2 className="h-4 w-4" /> Payment confirmed
          </div>
          <h1 className="mt-2 text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
            {data.company}, your assessment is ready
          </h1>
          <p className="mt-1 text-sm text-white/50">A copy was emailed to {data.email}.</p>
        </div>
        <Button onClick={handleDownloadPDF} disabled={downloading} variant="outline" className="border-white/15 text-white hover:bg-white/5">
          {downloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          {downloading ? "Building PDF…" : "Download PDF"}
        </Button>
      </div>

      <div ref={reportRef} className="space-y-6 print:space-y-4" id="report">
        <Section eyebrow="Executive Summary" title="The Outcome">
          <p className="text-white/80 leading-relaxed">{r.summary?.pain}</p>
          <p className="mt-3 text-white/80 leading-relaxed">{r.summary?.outcome}</p>
          <div className="mt-6 rounded-xl bg-[#1A2A3C] p-6 text-center">
            <div className="text-5xl font-extrabold text-[#E2735A]" style={{ textShadow: "0 0 30px rgba(226,114,91,0.4)" }}>
              {r.hoursReclaimed} hrs
            </div>
            <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8BAAB8]">
              Reclaimed every week
            </div>
          </div>
        </Section>

        <Section eyebrow="Quick Wins" title="Your 6 Highest-Impact Moves">
          <ol className="space-y-3">
            {r.quickWins.map((q: any, i: number) => (
              <li key={i} className="flex gap-4 rounded-lg border border-white/5 bg-[#0A1422] p-4">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E2735A]/15 text-sm font-bold text-[#E2735A]">{i + 1}</div>
                <div>
                  <div className="font-semibold text-white">{q.pain}</div>
                  <div className="mt-1 text-sm text-white/70" dangerouslySetInnerHTML={{ __html: q.fix.replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#E2735A]">$1</strong>') }} />
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section eyebrow="Recommended Stack" title="Six Tools, Configured For You">
          <div className="grid gap-3 md:grid-cols-2">
            {r.solutions.map((s: any, i: number) => (
              <div key={i} className="rounded-lg border border-white/10 bg-[#0A1422] p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-bold text-white">{s.tool}</h3>
                  <span className="text-xs text-white/40">{s.cost}</span>
                </div>
                <p className="mt-1 text-sm text-white/65">{s.use}</p>
                <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 text-xs">
                  <span className="text-white/50">Setup: {s.setup}</span>
                  <span className="font-semibold text-[#E2735A]">Saves {s.saves}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="4-Day Rollout" title="Your Quick Wins Plan">
          <div className="grid gap-3 md:grid-cols-2">
            {r.plan.map((p: any) => (
              <div key={p.day} className="rounded-lg border-l-4 border-[#E2735A] bg-[#0A1422] p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E2735A]">{p.label}</div>
                <div className="mt-2 text-white">{p.task}</div>
                <div className="mt-2 text-xs text-[#8BAAB8]">{p.tool}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Phase 2" title="What Comes After">
          <ul className="space-y-2">
            {r.comesAfter.map((c: any, i: number) => (
              <li key={i} className="flex items-start gap-3 rounded-lg bg-[#0A1422] p-3">
                <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-[#E2735A]" />
                <div>
                  <span className="text-white/85">{c.text}</span>
                  <span className="ml-2 text-xs text-[#8BAAB8]">— {c.tool}</span>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section eyebrow="Financial Impact" title="What This Buys Back">
          <div className="grid gap-3 md:grid-cols-3">
            <Stat label="Monthly ROI" value={r.financial.monthlyRoi} accent caption={r.financial.roiCaption} />
            <Stat label="Reclaimed / week" value={r.financial.weeklyHours} caption={r.financial.hoursCaption} />
            <Stat label="Tool cost" value={r.financial.monthlyToolCost} caption={r.financial.costCaption} />
          </div>
        </Section>

        <Section eyebrow="Next Steps" title="Where You Go From Here">
          <div className="space-y-3">
            {r.nextSteps.map((n: any, i: number) => (
              <div key={i} className="rounded-lg border-l-4 border-[#E2735A] bg-[#0A1422] p-4">
                <div className="font-bold text-white">{n.heading}</div>
                <div className="mt-1 text-sm text-white/70">{n.detail}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center print:hidden">
            <a href="mailto:lcooman.ccg@gmail.com?subject=Implementation%20Review" className="inline-flex items-center gap-2 rounded-lg bg-[#E2735A] px-8 py-4 font-semibold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(226,114,91,0.4)] hover:bg-[#EC8A73]">
              Schedule Your Review Call <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Section>
      </div>
    </div>
  );
}

function drawHeaderFooter(pdf: jsPDF, pageW: number, pageH: number, margin: number, company: string, date: string) {
  // Background
  pdf.setFillColor(10, 20, 34);
  pdf.rect(0, 0, pageW, pageH, "F");
  // Top accent
  pdf.setFillColor(226, 115, 90);
  pdf.rect(0, 0, pageW, 2, "F");
  // Header text
  pdf.setFontSize(8);
  pdf.setTextColor(139, 170, 184);
  pdf.setFont("helvetica", "bold");
  pdf.text("CCG · AI TOOLS ASSESSMENT", margin, 10);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(110, 132, 147);
  pdf.text(company.toUpperCase(), pageW - margin, 10, { align: "right" });
  // Footer
  const page = (pdf as any).internal.getCurrentPageInfo().pageNumber;
  pdf.setFontSize(8);
  pdf.setTextColor(110, 132, 147);
  pdf.text(`coomanconsultinggroup.com · ${date}`, margin, pageH - 6);
  pdf.text(`Page ${page}`, pageW - margin, pageH - 6, { align: "right" });
}

function Stat({ label, value, caption, accent }: { label: string; value: string; caption?: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0A1422] p-5 text-center">
      <div className={`text-3xl font-extrabold ${accent ? "text-[#E2735A]" : "text-white"}`} style={accent ? { textShadow: "0 0 30px rgba(226,114,91,0.4)" } : {}}>
        {value}
      </div>
      <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8BAAB8]">{label}</div>
      {caption && <div className="mt-2 text-xs text-white/45">{caption}</div>}
    </div>
  );
}
