import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Check, Copy, ExternalLink, ShieldCheck } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import monzoQr from "@/assets/monzo-qr.jpeg.asset.json";
import usdtQr from "@/assets/usdt-qr.jpeg.asset.json";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const PRICE = "$489";
const PAYPAL_LINK = "https://www.paypal.com/paypalme/f2framework/489";
const USDT_ADDRESS = "TUSDTwalletAddressGoesHereReplaceMe";

const BUSINESS_TYPES = ["Agency / Services", "B2B SaaS", "Professional Services", "E-commerce", "Coaching / Consulting", "Other"];
const TEAM_SIZES = ["Just me", "2–10", "11–50", "50+"];
const FOCUSES = ["Sales", "Marketing", "Operations", "Customer support", "Finance"];
const PAINS = ["Writing proposals", "CRM updates", "Cold/warm outreach", "Meeting notes", "Reporting & dashboards", "Content & social", "Scheduling", "Invoicing & admin", "Customer support"];
const TOOLS = ["ChatGPT", "Claude", "HubSpot", "Salesforce", "Notion", "Zapier", "Google Workspace", "None yet"];

type FormState = {
  company: string; contact_name: string; email: string;
  business_type: string; team_size: string;
  pains: string[]; hours_per_week: number; primary_focus: string;
  tools: string[]; goal: string;
};

const initial: FormState = {
  company: "", contact_name: "", email: "",
  business_type: "", team_size: "",
  pains: [], hours_per_week: 12, primary_focus: "",
  tools: [], goal: "",
};

function Chip({ active, onClick, children, size = "md" }: { active: boolean; onClick: () => void; children: React.ReactNode; size?: "sm" | "md" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 ${size === "sm" ? "py-1.5 text-xs" : "py-2 text-sm"} font-medium transition-all ${
        active
          ? "border-[#E2735A] bg-[#E2735A]/15 text-[#E2735A] shadow-[0_0_20px_rgba(226,114,91,0.2)]"
          : "border-white/15 bg-transparent text-white/70 hover:border-[#8BAAB8]/40 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8BAAB8]">{children}</div>;
}

function StepDots({ current }: { current: 0 | 1 | 2 | 3 | 4 }) {
  const labels = ["Your business", "Where time goes", "Your stack", "Payment"];
  return (
    <div className="mb-10 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.18em]">
      {labels.map((l, i) => (
        <div key={l} className="flex items-center gap-3">
          <div className={`flex items-center gap-2 ${i === current ? "text-[#E2735A]" : i < current ? "text-white" : "text-white/30"}`}>
            <div className={`h-1.5 w-1.5 rounded-full ${i === current ? "bg-[#E2735A] shadow-[0_0_10px_#E2735A]" : i < current ? "bg-white" : "bg-white/20"}`} />
            <span className="hidden sm:inline">{l}</span>
          </div>
          {i < labels.length - 1 && <div className="h-px w-6 bg-white/10" />}
        </div>
      ))}
    </div>
  );
}

export default function Assessment() {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [paymentTab, setPaymentTab] = useState<"paypal" | "monzo" | "usdt">("paypal");
  const [paymentRef, setPaymentRef] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bypassOpen, setBypassOpen] = useState(false);
  const [bypassCode, setBypassCode] = useState("");
  const [bypassError, setBypassError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  const update = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));
  const toggle = (key: "pains" | "tools", v: string) =>
    update({ [key]: form[key].includes(v) ? form[key].filter((x) => x !== v) : [...form[key], v] } as any);

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!form.company.trim()) e.company = "Required";
      if (!form.contact_name.trim()) e.contact_name = "Required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid work email required";
      if (!form.business_type) e.business_type = "Pick one";
      if (!form.team_size) e.team_size = "Pick one";
    }
    if (s === 2) {
      if (form.pains.length === 0) e.pains = "Pick at least one";
      if (!form.primary_focus) e.primary_focus = "Pick one";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitForm = async () => {
    if (!validateStep(2)) { setStep(2); return; }
    setBusy(true);
    try {
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/create-assessment`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${SUPABASE_KEY}`, apikey: SUPABASE_KEY },
        body: JSON.stringify(form),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Failed to submit");
      setAssessmentId(data.id);
      setStep(4);
    } catch (e) {
      alert((e as Error).message);
    } finally { setBusy(false); }
  };

  const confirmPayment = async (method: "paypal" | "monzo" | "usdt" | "test", code?: string) => {
    if (!assessmentId) return;
    if (method !== "test" && !paymentRef.trim()) {
      alert("Please enter your payment reference (your PayPal/Monzo email or USDT TX hash) so we can match it.");
      return;
    }
    if (method === "test") setBypassError(null);
    setBusy(true);
    try {
      const body: Record<string, unknown> = { id: assessmentId, payment_method: method };
      if (method === "test") {
        body.bypass_code = code ?? bypassCode;
      } else {
        body.payment_reference = paymentRef;
      }
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/confirm-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${SUPABASE_KEY}`, apikey: SUPABASE_KEY },
        body: JSON.stringify(body),
      });
      if (!resp.ok) {
        const d = await resp.json().catch(() => ({}));
        if (method === "test" && resp.status === 401) {
          setBypassError("Invalid access code.");
          return;
        }
        throw new Error(d.error || "Failed");
      }
      navigate(`/assessment/results/${assessmentId}`);
    } catch (e) {
      alert((e as Error).message);
    } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen relative" style={{ background: "#090f1a" }}>
      <Header />
      <main className="container-wide py-16 md:py-24">
        {step === 0 ? <Landing onStart={() => setStep(1)} /> : (
          <div className="mx-auto max-w-3xl">
            <StepDots current={step as 1 | 2 | 3 | 4} />
            <div className="rounded-2xl border border-white/10 bg-[#121E2C]/80 p-6 md:p-10 backdrop-blur-sm">
              {step === 1 && (
                <Step1 form={form} update={update} errors={errors} />
              )}
              {step === 2 && (
                <Step2 form={form} update={update} toggle={toggle} errors={errors} />
              )}
              {step === 3 && (
                <Step3 form={form} update={update} toggle={toggle} />
              )}
              {step === 4 && assessmentId && (
                <PaymentStep
                  paymentTab={paymentTab}
                  setPaymentTab={setPaymentTab}
                  paymentRef={paymentRef}
                  setPaymentRef={setPaymentRef}
                  onConfirm={confirmPayment}
                  busy={busy}
                  copied={copied}
                  setCopied={setCopied}
                  bypassOpen={bypassOpen}
                  setBypassOpen={setBypassOpen}
                  bypassCode={bypassCode}
                  setBypassCode={setBypassCode}
                  bypassError={bypassError}
                />
              )}
              {step < 4 && (
                <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                  {step > 1 ? (
                    <button onClick={() => setStep((s) => (s - 1) as any)} className="text-sm text-white/50 hover:text-white">← Back</button>
                  ) : <span />}
                  <Button
                    onClick={async () => {
                      if (step < 3) {
                        if (validateStep(step)) setStep((s) => (s + 1) as any);
                      } else {
                        await submitForm();
                      }
                    }}
                    disabled={busy}
                    className="bg-[#E2735A] text-white hover:bg-[#EC8A73] active:bg-[#C95A42] shadow-[0_0_25px_rgba(226,114,91,0.35)] uppercase tracking-wider font-semibold"
                    size="lg"
                  >
                    {busy ? "Submitting…" : step === 3 ? `Continue to payment →` : "Next →"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <Eyebrow>CCG · AI Readiness</Eyebrow>
        <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
          Find the hours <span className="text-[#E2735A]" style={{ textShadow: "0 0 40px rgba(226,114,91,0.4)" }}>AI gives back</span> to your team.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
          A founder-grade AI adoption assessment. You answer 9 questions in under 4 minutes — we hand you a personalized stack, a 4-day rollout, and the monthly ROI behind it.
        </p>
        <ul className="mt-8 space-y-3">
          {[
            "Personalized 9-section AI assessment",
            "Top 6 quick wins + recommended stack + 4-day rollout",
            "Projected monthly ROI and hours reclaimed",
            "Delivered on screen instantly + emailed report",
          ].map((b) => (
            <li key={b} className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#E2735A]" />
              <span className="text-white/80">{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#121E2C]/80 p-8 backdrop-blur-sm">
        <Eyebrow>AI Tools Assessment</Eyebrow>
        <div className="mt-4 flex items-baseline gap-3">
          <div className="text-6xl font-extrabold text-white">$489</div>
          <div className="text-sm text-white/50">USD · one-time</div>
        </div>
        <div className="mt-1 text-sm text-white/60">Delivered instantly</div>
        <div className="my-6 h-px bg-white/10" />
        <ul className="space-y-3 text-sm">
          {[
            ["Format", "On-screen report + emailed PDF"],
            ["Length", "9 sections, ~12 pages printed"],
            ["Turnaround", "< 60 seconds after payment"],
            ["Guarantee", "14-day money-back, no questions"],
          ].map(([k, v]) => (
            <li key={k} className="flex items-center justify-between">
              <span className="text-white/50">{k}</span>
              <span className="font-medium text-white">{v}</span>
            </li>
          ))}
        </ul>
        <Button
          onClick={onStart}
          className="mt-8 w-full bg-[#E2735A] text-white hover:bg-[#EC8A73] active:bg-[#C95A42] shadow-[0_0_30px_rgba(226,114,91,0.4)] uppercase tracking-wider font-semibold"
          size="xl"
        >
          Run My AI Assessment →
        </Button>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/45">
          <ShieldCheck className="h-3.5 w-3.5" /> 14-day money-back guarantee
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8BAAB8]">{label}</label>
      {children}
      {error && <div className="mt-1 text-xs text-[#E2735A]">{error}</div>}
    </div>
  );
}

function Step1({ form, update, errors }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold uppercase tracking-tight text-white">Step 1 · Your business</h2>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Company" error={errors.company}>
          <Input value={form.company} onChange={(e) => update({ company: e.target.value })} placeholder="Acme Co" className="bg-[#0A1422] border-white/10 text-white" />
        </Field>
        <Field label="Your name" error={errors.contact_name}>
          <Input value={form.contact_name} onChange={(e) => update({ contact_name: e.target.value })} placeholder="Jane Doe" className="bg-[#0A1422] border-white/10 text-white" />
        </Field>
      </div>
      <Field label="Work email" error={errors.email}>
        <Input type="email" value={form.email} onChange={(e) => update({ email: e.target.value })} placeholder="jane@acme.co" className="bg-[#0A1422] border-white/10 text-white" />
      </Field>
      <Field label="Business type" error={errors.business_type}>
        <div className="flex flex-wrap gap-2">
          {BUSINESS_TYPES.map((t) => <Chip key={t} active={form.business_type === t} onClick={() => update({ business_type: t })}>{t}</Chip>)}
        </div>
      </Field>
      <Field label="Team size" error={errors.team_size}>
        <div className="flex flex-wrap gap-2">
          {TEAM_SIZES.map((t) => <Chip key={t} active={form.team_size === t} onClick={() => update({ team_size: t })}>{t}</Chip>)}
        </div>
      </Field>
    </div>
  );
}

function Step2({ form, update, toggle, errors }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold uppercase tracking-tight text-white">Step 2 · Where time goes</h2>
      <Field label="Biggest time-sinks (pick all that apply)" error={errors.pains}>
        <div className="flex flex-wrap gap-2">
          {PAINS.map((p) => <Chip key={p} active={form.pains.includes(p)} onClick={() => toggle("pains", p)}>{p}</Chip>)}
        </div>
      </Field>
      <div>
        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8BAAB8]">Hours per week lost to this</label>
        <div className="rounded-xl border border-white/10 bg-[#0A1422] p-6">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-5xl font-extrabold text-[#E2735A]" style={{ textShadow: "0 0 30px rgba(226,114,91,0.4)" }}>{form.hours_per_week}</span>
            <span className="text-sm text-white/50">hours / week</span>
          </div>
          <Slider value={[form.hours_per_week]} min={1} max={40} step={1} onValueChange={(v) => update({ hours_per_week: v[0] })} />
        </div>
      </div>
      <Field label="Primary focus for AI" error={errors.primary_focus}>
        <div className="flex flex-wrap gap-2">
          {FOCUSES.map((f) => <Chip key={f} active={form.primary_focus === f} onClick={() => update({ primary_focus: f })}>{f}</Chip>)}
        </div>
      </Field>
    </div>
  );
}

function Step3({ form, update, toggle }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold uppercase tracking-tight text-white">Step 3 · Your stack</h2>
      <Field label="Tools you use today (optional)">
        <div className="flex flex-wrap gap-2">
          {TOOLS.map((t) => <Chip key={t} active={form.tools.includes(t)} onClick={() => toggle("tools", t)}>{t}</Chip>)}
        </div>
      </Field>
      <Field label="Anything specific you want to fix or achieve? (optional)">
        <Textarea
          value={form.goal} onChange={(e) => update({ goal: e.target.value })}
          rows={4} placeholder="e.g. cut proposal time in half; respond to inbound leads same-day"
          className="bg-[#0A1422] border-white/10 text-white"
        />
      </Field>
    </div>
  );
}

function PaymentStep({ paymentTab, setPaymentTab, paymentRef, setPaymentRef, onConfirm, busy, copied, setCopied, bypassOpen, setBypassOpen, bypassCode, setBypassCode, bypassError }: any) {
  const copy = async () => {
    await navigator.clipboard.writeText(USDT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const refLabelMap: Record<string, string> = {
    paypal: "Your PayPal email (so we can match the payment)",
    monzo: "Your Monzo name or email",
    usdt: "USDT transaction hash (TXID)",
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold uppercase tracking-tight text-white">Choose how to pay</h2>
        <p className="mt-2 text-sm text-white/55">One-time {PRICE} USD. Your personalized report unlocks the moment payment is confirmed.</p>
      </div>

      <div className="flex gap-2 rounded-full border border-white/10 bg-[#0A1422] p-1">
        {(["paypal", "monzo", "usdt"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setPaymentTab(m)}
            className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all ${
              paymentTab === m ? "bg-[#E2735A] text-white shadow-[0_0_20px_rgba(226,114,91,0.4)]" : "text-white/60 hover:text-white"
            }`}
          >
            {m === "paypal" ? "PayPal" : m === "monzo" ? "Monzo" : "USDT"}
          </button>
        ))}
      </div>

      {paymentTab === "paypal" && (
        <div className="rounded-xl border border-white/10 bg-[#0A1422] p-6 text-center">
          <Eyebrow>PayPal · $489 USD</Eyebrow>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/65">Opens PayPal in a new tab with the amount pre-filled. Pay, then come back and click "I've completed payment" below.</p>
          <a href={PAYPAL_LINK} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#E2735A] px-6 py-3 font-semibold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(226,114,91,0.35)] hover:bg-[#EC8A73]">
            Pay $489 with PayPal <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}

      {paymentTab === "monzo" && (
        <div className="rounded-xl border border-white/10 bg-[#0A1422] p-6 text-center">
          <Eyebrow>Monzo · $489 USD equivalent</Eyebrow>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/65">Scan with the Monzo app. On mobile, tap the QR to open it.</p>
          <div className="mx-auto mt-5 inline-block rounded-2xl bg-white p-4">
            <img src={monzoQr.url} alt="Monzo payment QR code" className="block h-56 w-56 object-contain" />
          </div>
        </div>
      )}

      {paymentTab === "usdt" && (
        <div className="rounded-xl border border-white/10 bg-[#0A1422] p-6 text-center">
          <Eyebrow>USDT · TRC20 · $489 equivalent</Eyebrow>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/65">Send <span className="font-semibold text-white">exactly $489 in USDT</span> on the <span className="font-semibold text-white">TRON (TRC20)</span> network.</p>
          <div className="mx-auto mt-5 inline-block rounded-2xl bg-white p-4">
            <img src={usdtQr.url} alt="USDT TRC20 QR code" className="block h-56 w-56 object-contain" />
          </div>
          <div className="mx-auto mt-4 flex max-w-md items-center gap-2 rounded-lg border border-white/10 bg-[#121E2C] px-3 py-2 text-xs">
            <span className="flex-1 truncate text-left font-mono text-white/70">{USDT_ADDRESS}</span>
            <button onClick={copy} className="flex items-center gap-1 text-[#8BAAB8] hover:text-white">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-white/10 bg-[#121E2C] p-5">
        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8BAAB8]">
          {refLabelMap[paymentTab]}
        </label>
        <Input
          value={paymentRef}
          onChange={(e) => setPaymentRef(e.target.value)}
          placeholder={paymentTab === "usdt" ? "0x… or TRC20 tx hash" : "name@email.com"}
          className="bg-[#0A1422] border-white/10 text-white"
        />
        <Button
          onClick={() => onConfirm(paymentTab)}
          disabled={busy}
          className="mt-4 w-full bg-[#E2735A] text-white hover:bg-[#EC8A73] active:bg-[#C95A42] shadow-[0_0_25px_rgba(226,114,91,0.35)] uppercase tracking-wider font-semibold"
          size="lg"
        >
          {busy ? "Confirming…" : "I've completed payment — generate my report"}
        </Button>
        <p className="mt-3 text-center text-xs text-white/40">
          By clicking above, you confirm you've sent ${"489"}. We verify every payment manually; misuse forfeits the guarantee.
        </p>
      </div>

      <div className="text-center">
        {!bypassOpen ? (
          <button
            type="button"
            onClick={() => setBypassOpen(true)}
            className="text-xs text-white/40 underline-offset-2 hover:text-white/70 hover:underline"
          >
            Have an access code?
          </button>
        ) : (
          <div className="mx-auto max-w-md rounded-xl border border-white/10 bg-[#0A1422] p-4 text-left">
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8BAAB8]">
              Access code
            </label>
            <div className="flex gap-2">
              <Input
                value={bypassCode}
                onChange={(e) => setBypassCode(e.target.value)}
                placeholder="Enter your code"
                className="bg-[#121E2C] border-white/10 text-white"
                onKeyDown={(e) => { if (e.key === "Enter" && bypassCode.trim()) onConfirm("test", bypassCode.trim()); }}
              />
              <Button
                onClick={() => bypassCode.trim() && onConfirm("test", bypassCode.trim())}
                disabled={busy || !bypassCode.trim()}
                className="bg-[#E2735A] text-white hover:bg-[#EC8A73] active:bg-[#C95A42] uppercase tracking-wider font-semibold"
              >
                {busy ? "…" : "Unlock"}
              </Button>
            </div>
            {bypassError && <div className="mt-2 text-xs text-[#E2735A]">{bypassError}</div>}
            <button
              type="button"
              onClick={() => { setBypassOpen(false); setBypassCode(""); }}
              className="mt-3 text-[11px] text-white/40 hover:text-white/70"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
