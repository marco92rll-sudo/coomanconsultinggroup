import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const WEB3FORMS_KEY = "cf479f18-b021-4e42-b854-3c81753f808d";
const SITE_URL = "https://coomanconsultinggroup.lovable.app";

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
    const r = row.report;
    const c = r.client || {};

    // 1) Client email — branded Lovable transactional email
    // Also send copies to CCG inboxes so they receive the same branded report.
    const templateData = {
      company: row.company,
      contactName: row.contact_name,
      date: c.date || new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
      businessType: row.business_type,
      primaryFocus: r.primaryFocus || row.primary_focus,
      hoursReclaimed: r.hoursReclaimed || 0,
      resultsUrl,
      summary: r.summary || {},
      quickWins: r.quickWins || [],
      solutions: r.solutions || [],
      plan: r.plan || [],
      comesAfter: r.comesAfter || [],
      financial: r.financial || {},
      nextSteps: r.nextSteps || [],
    };

    const clientRecipients = [
      { email: row.email, tag: "client" },
      { email: "lcooman.ccg@gmail.com", tag: "ccg-lcooman" },
      { email: "ccooman.ccg@gmail.com", tag: "ccg-ccooman" },
    ];

    for (const r2 of clientRecipients) {
      try {
        const { error: emailErr } = await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "assessment-ready",
            recipientEmail: r2.email,
            idempotencyKey: `assessment-ready-${id}-${r2.tag}`,
            templateData,
          },
        });
        if (emailErr) console.error("send-transactional-email error", r2.tag, emailErr);
      } catch (e) {
        console.error("client email failed", r2.tag, e);
      }
    }

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
