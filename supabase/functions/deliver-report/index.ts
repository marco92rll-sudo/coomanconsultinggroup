import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const WEB3FORMS_KEY = "cf479f18-b021-4e42-b854-3c81753f808d";
const SITE_URL = "https://coomanconsultinggroup.lovable.app";

function renderReportHtml(r: any, resultsUrl: string): string {
  const c = r.client || {};
  return `<!doctype html><html><body style="margin:0;padding:0;background:#0A1422;font-family:Inter,Arial,sans-serif;color:#D8E2EC;">
<div style="max-width:680px;margin:0 auto;padding:32px 24px;">
  <div style="background:#121E2C;border:1px solid rgba(216,226,236,0.12);border-radius:10px;padding:32px;">
    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8BAAB8;font-weight:700;">CCG · AI Tools Assessment</div>
    <h1 style="font-size:26px;color:#fff;margin:12px 0 4px;text-transform:uppercase;letter-spacing:-0.01em;">Prepared for ${c.company || ""}</h1>
    <div style="color:#6E8493;font-size:13px;">${c.date || ""} · ${c.businessType || ""} · Focus: ${r.primaryFocus || ""}</div>
    <hr style="border:none;border-top:1px solid rgba(216,226,236,0.12);margin:24px 0;">
    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8BAAB8;font-weight:700;">Executive Summary</div>
    <p style="margin:12px 0;line-height:1.6;">${r.summary?.pain || ""}</p>
    <p style="margin:12px 0;line-height:1.6;">${r.summary?.outcome || ""}</p>
    <div style="background:#1A2A3C;border-radius:8px;padding:20px;text-align:center;margin:20px 0;">
      <div style="font-size:36px;font-weight:800;color:#E2735A;">${r.hoursReclaimed || 0} hrs</div>
      <div style="font-size:12px;color:#8BAAB8;letter-spacing:0.1em;text-transform:uppercase;margin-top:4px;">Reclaimed every week</div>
    </div>
    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8BAAB8;font-weight:700;margin-top:24px;">Your 6 Quick Wins</div>
    <ol style="padding-left:20px;">${(r.quickWins || []).map((q: any) => `<li style="margin:10px 0;line-height:1.6;"><strong style="color:#fff;">${q.pain}</strong> → ${q.fix.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#E2735A;">$1</strong>')}</li>`).join("")}</ol>
    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8BAAB8;font-weight:700;margin-top:24px;">Recommended Stack</div>
    <table style="width:100%;border-collapse:collapse;margin-top:12px;">${(r.solutions || []).map((s: any) => `<tr><td style="padding:10px;border-bottom:1px solid rgba(216,226,236,0.08);"><strong style="color:#fff;">${s.tool}</strong><br><span style="color:#8BAAB8;font-size:13px;">${s.use}</span></td><td style="padding:10px;border-bottom:1px solid rgba(216,226,236,0.08);text-align:right;font-size:13px;"><div style="color:#E2735A;font-weight:600;">${s.saves}</div><div style="color:#6E8493;">${s.cost} · ${s.setup}</div></td></tr>`).join("")}</table>
    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8BAAB8;font-weight:700;margin-top:24px;">4-Day Rollout Plan</div>
    ${(r.plan || []).map((p: any) => `<div style="background:#1A2A3C;border-radius:6px;padding:14px;margin:8px 0;"><div style="color:#E2735A;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">${p.label}</div><div style="color:#fff;margin:4px 0;">${p.task}</div><div style="color:#8BAAB8;font-size:12px;">${p.tool}</div></div>`).join("")}
    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8BAAB8;font-weight:700;margin-top:24px;">What Comes After</div>
    <ul style="padding-left:20px;">${(r.comesAfter || []).map((c: any) => `<li style="margin:8px 0;line-height:1.5;">${c.text} <span style="color:#8BAAB8;">— ${c.tool}</span></li>`).join("")}</ul>
    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8BAAB8;font-weight:700;margin-top:24px;">Financial Impact</div>
    <table style="width:100%;margin-top:12px;"><tr><td style="background:#1A2A3C;border-radius:6px;padding:16px;text-align:center;width:33%;"><div style="color:#E2735A;font-size:24px;font-weight:800;">${r.financial?.monthlyRoi}</div><div style="color:#8BAAB8;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-top:4px;">Monthly ROI</div></td><td style="width:8px;"></td><td style="background:#1A2A3C;border-radius:6px;padding:16px;text-align:center;width:33%;"><div style="color:#fff;font-size:24px;font-weight:800;">${r.financial?.weeklyHours}</div><div style="color:#8BAAB8;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-top:4px;">Reclaimed/wk</div></td><td style="width:8px;"></td><td style="background:#1A2A3C;border-radius:6px;padding:16px;text-align:center;width:33%;"><div style="color:#fff;font-size:24px;font-weight:800;">${r.financial?.monthlyToolCost}</div><div style="color:#8BAAB8;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-top:4px;">Tool Cost</div></td></tr></table>
    <p style="color:#6E8493;font-size:12px;margin-top:12px;font-style:italic;">${r.financial?.roiCaption || ""}</p>
    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8BAAB8;font-weight:700;margin-top:24px;">Your Next Steps</div>
    ${(r.nextSteps || []).map((n: any) => `<div style="border-left:3px solid #E2735A;padding:8px 14px;margin:12px 0;"><div style="color:#fff;font-weight:700;">${n.heading}</div><div style="color:#D8E2EC;margin-top:4px;line-height:1.5;">${n.detail}</div></div>`).join("")}
    <div style="text-align:center;margin-top:32px;">
      <a href="${resultsUrl}" style="background:#E2735A;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;font-size:13px;">View your full report</a>
    </div>
    <p style="color:#6E8493;font-size:12px;text-align:center;margin-top:24px;">Reply to this email to schedule your implementation review.<br>— Cooman Consulting Group</p>
  </div>
</div></body></html>`;
}

async function sendWeb3Forms(payload: Record<string, any>): Promise<void> {
  const resp = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...payload }),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`Web3Forms ${resp.status}: ${t}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { id } = await req.json();
    if (!id) return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: row, error } = await supabase
      .from("assessments").select("*").eq("id", id).single();
    if (error || !row || !row.report) throw new Error("Row or report not found");

    const resultsUrl = `${SITE_URL}/assessment/results/${id}`;
    const reportHtml = renderReportHtml(row.report, resultsUrl);

    // 1) Client email — branded HTML report
    await sendWeb3Forms({
      subject: `Your CCG AI Tools Assessment is ready`,
      from_name: "Cooman Consulting Group",
      email: row.email,
      message: `Your personalized AI Tools Assessment for ${row.company} is ready. View it here: ${resultsUrl}`,
      html: reportHtml,
      replyto: "lcooman.ccg@gmail.com",
    });

    // 2) Internal CCG email — lead details + PAYMENT VERIFICATION FLAG
    const isTest = row.payment_method === "test";
    const internalText = [
      isTest
        ? `🧪 BYPASS (TEST) ASSESSMENT — DO NOT INVOICE`
        : `🔔 NEW PAID ASSESSMENT — VERIFY PAYMENT BEFORE REPLYING`,
      ``,
      isTest
        ? `PAYMENT METHOD: bypass (test) — DO NOT INVOICE`
        : `PAYMENT METHOD: ${(row.payment_method || "unknown").toUpperCase()}`,
      `PAYMENT REFERENCE: ${row.payment_reference || "(none provided)"}`,
      `Amount: ${isTest ? "$0 (bypass)" : "$489 USD"}`,
      ``,
      `--- LEAD ---`,
      `Name: ${row.contact_name}`,
      `Email: ${row.email}`,
      `Company: ${row.company}`,
      `Business Type: ${row.business_type}`,
      `Team Size: ${row.team_size}`,
      `Primary Focus: ${row.primary_focus}`,
      `Pains: ${(row.pains || []).join(", ")}`,
      `Hours/week lost: ${row.hours_per_week}`,
      `Current tools: ${(row.tools || []).join(", ") || "(none)"}`,
      `Goal: ${row.goal || "(not specified)"}`,
      ``,
      `Submitted: ${new Date(row.created_at).toLocaleString()}`,
      `Confirmed: ${row.payment_confirmed_at ? new Date(row.payment_confirmed_at).toLocaleString() : "?"}`,
      `Report ready: ${resultsUrl}`,
      `Lead ID: ${row.id}`,
    ].join("\n");

    await sendWeb3Forms({
      subject: isTest
        ? `[BYPASS-TEST] AI Assessment — ${row.company}`
        : `[VERIFY ${(row.payment_method || "?").toUpperCase()}] New AI Assessment — ${row.company}`,
      from_name: "CCG Assessment Bot",
      email: "lcooman.ccg@gmail.com",
      message: internalText,
    });

    await supabase.from("assessments").update({
      status: "delivered",
      delivered_at: new Date().toISOString(),
    }).eq("id", id);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("deliver-report error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
