import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a senior consultant at Cooman Consulting Group (CCG). You produce concise, realistic AI-adoption assessments for founder-led B2B businesses. Given a client's intake answers, output a personalized "AI Tools Assessment" as STRICT JSON matching the provided schema — no prose, no markdown, JSON only.

Rules:
- Voice: direct, founder-to-founder, confident, specific. No hype, no filler.
- Recommend only real, current tools appropriate to their primary focus and existing stack (e.g. ChatGPT Team, Claude, Fireflies.ai, Clay, HubSpot AI, Zapier, Notion AI). Prefer tools that complement what they already use.
- quickWins: 6 items mapping a real pain THEY listed (and sensible adjacent ones) to a concrete AI fix with a bold, quantified outcome.
- solutions: 6 tools with realistic monthly cost, setup time (<1 day / 1 day / 2 days), and weekly hours saved. The saved hours across tools should roughly reconcile with their stated hours_per_week.
- plan: a sensible 4-day rollout, each day one task + one tool.
- comesAfter: 3 bigger phase-2 moves.
- financial: monthlyRoi = (hours_per_week × 4.33 × $75/hr) minus total monthly tool cost, rounded sensibly; weeklyHours = their reclaimable hours; monthlyToolCost = sum of the 6 tools. Write one-line captions.
- nextSteps: 2 clear actions; the second invites booking a review call.
- Keep every string tight enough to fit a slide. Fill client/date/focus/hoursReclaimed from the inputs.

Here is one example of a well-formed report for a different client; match its voice, specificity, and JSON shape exactly — do NOT copy its content:

${JSON.stringify({
  client: { company: "Brightwave Partners", contactName: "Jordan Lee", businessType: "Agency / Services", teamSize: "11–50", date: "June 2026" },
  primaryFocus: "Sales",
  hoursReclaimed: 14,
  summary: {
    pain: "Your team loses about 14 hours a week to proposal writing, CRM hygiene, and follow-up — the highest-paid people doing the lowest-leverage work.",
    outcome: "With a focused AI stack on the sales motion, Brightwave can reclaim those hours, respond to leads same-day, and put roughly $9.4k/month back on the table — without adding headcount.",
  },
  quickWins: [
    { pain: "Writing proposals", fix: "Draft tailored proposals from a call transcript + template in minutes — **cuts proposal time ~70%**." },
    { pain: "CRM updates", fix: "Auto-log calls, emails, and next steps to HubSpot from meeting notes — **zero manual data entry**." },
    { pain: "Warm outreach", fix: "Generate researched, personalized first-touch emails at scale — **3× the outreach volume**." },
    { pain: "Meeting notes", fix: "Auto-transcribe and summarize every call with action items — **saves ~3 hrs/wk per rep**." },
    { pain: "Reporting", fix: "Natural-language pipeline dashboards refreshed automatically — **kills the Monday report scramble**." },
    { pain: "Follow-up cadence", fix: "AI drafts the next follow-up the moment a deal goes quiet — **nothing slips through**." },
  ],
  solutions: [
    { tool: "ChatGPT Team", use: "Proposal & email drafting", cost: "$30/mo", setup: "<1 day", saves: "4 hrs/wk" },
    { tool: "Fireflies.ai", use: "Call transcription & summaries", cost: "$18/mo", setup: "<1 day", saves: "3 hrs/wk" },
    { tool: "HubSpot AI", use: "Auto-logging & pipeline hygiene", cost: "Included", setup: "1 day", saves: "2 hrs/wk" },
    { tool: "Clay", use: "Lead research & enrichment", cost: "$149/mo", setup: "2 days", saves: "3 hrs/wk" },
    { tool: "Zapier", use: "No-code automations", cost: "$50/mo", setup: "1 day", saves: "1 hr/wk" },
    { tool: "Notion AI", use: "Living playbooks", cost: "$20/mo", setup: "<1 day", saves: "1 hr/wk" },
  ],
  plan: [
    { day: 1, label: "Day One", task: "Stand up ChatGPT Team and load your 5 best proposal templates", tool: "ChatGPT Team" },
    { day: 2, label: "Day Two", task: "Connect Fireflies to your calendar", tool: "Fireflies.ai" },
    { day: 3, label: "Day Three", task: "Turn on HubSpot AI logging and one Zapier follow-up", tool: "HubSpot AI + Zapier" },
    { day: 4, label: "Day Four", task: "Build one Clay list and send your first AI-assisted outreach batch", tool: "Clay" },
  ],
  comesAfter: [
    { text: "Train a custom GPT on your won-deal proposals", tool: "ChatGPT Team" },
    { text: "Add AI lead scoring to route hot inbound first", tool: "HubSpot AI" },
    { text: "Automate post-sale onboarding handoff", tool: "Zapier" },
  ],
  financial: {
    monthlyRoi: "$9.4k", weeklyHours: "14 hrs", monthlyToolCost: "$287/mo",
    roiCaption: "Net of tool cost, at a blended $75/hr",
    hoursCaption: "Reclaimed every week and redirected to selling",
    costCaption: "Six tools, fully loaded — less than one billable hour a week",
  },
  nextSteps: [
    { heading: "Run the 4-day plan", detail: "Start with ChatGPT Team and Fireflies this week — you'll feel the time back by Friday." },
    { heading: "Book your implementation review", detail: "We'll tailor the rollout to your pipeline and train your team live. Schedule your call with CCG." },
  ],
})}

Output JSON only.`;

function validateReport(r: any): boolean {
  try {
    if (!r || typeof r !== "object") return false;
    if (!r.client || !r.summary || !r.financial) return false;
    if (!Array.isArray(r.quickWins) || r.quickWins.length !== 6) return false;
    if (!Array.isArray(r.solutions) || r.solutions.length !== 6) return false;
    if (!Array.isArray(r.plan) || r.plan.length !== 4) return false;
    if (!Array.isArray(r.comesAfter) || r.comesAfter.length !== 3) return false;
    if (!Array.isArray(r.nextSteps) || r.nextSteps.length !== 2) return false;
    return true;
  } catch { return false; }
}

async function callAi(userPrompt: string): Promise<any> {
  const apiKey = Deno.env.get("LOVABLE_API_KEY")!;
  const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`AI gateway ${resp.status}: ${t}`);
  }
  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty AI response");
  return JSON.parse(content);
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

    const { data: row, error: fetchErr } = await supabase
      .from("assessments").select("*").eq("id", id).single();
    if (fetchErr || !row) throw new Error("Row not found");

    if (!["paid", "generating"].includes(row.status)) {
      return new Response(JSON.stringify({ error: `Status is ${row.status}` }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await supabase.from("assessments").update({ status: "generating" }).eq("id", id);

    const userPrompt = `Generate the AI Tools Assessment for this client. Output JSON only matching the schema you were given.

Client intake:
- Company: ${row.company}
- Contact name: ${row.contact_name}
- Business type: ${row.business_type}
- Team size: ${row.team_size}
- Primary focus for AI: ${row.primary_focus}
- Biggest time-sinks (pains): ${(row.pains || []).join(", ") || "(none specified)"}
- Hours per week lost: ${row.hours_per_week ?? "unknown"}
- Tools used today: ${(row.tools || []).join(", ") || "(none)"}
- Goal / what they want to fix: ${row.goal || "(not specified)"}
- Today's date: ${new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}

Required JSON schema:
{
  "client": { "company": string, "contactName": string, "businessType": string, "teamSize": string, "date": "Month YYYY" },
  "primaryFocus": string,
  "hoursReclaimed": number,
  "summary": { "pain": string, "outcome": string },
  "quickWins": [{ "pain": string, "fix": string }] (exactly 6),
  "solutions": [{ "tool": string, "use": string, "cost": string, "setup": string, "saves": string }] (exactly 6),
  "plan": [{ "day": number, "label": string, "task": string, "tool": string }] (exactly 4),
  "comesAfter": [{ "text": string, "tool": string }] (exactly 3),
  "financial": { "monthlyRoi": string, "weeklyHours": string, "monthlyToolCost": string, "roiCaption": string, "hoursCaption": string, "costCaption": string },
  "nextSteps": [{ "heading": string, "detail": string }] (exactly 2)
}`;

    let report: any;
    try {
      report = await callAi(userPrompt);
      if (!validateReport(report)) throw new Error("Schema invalid");
    } catch (e) {
      console.warn("First AI call failed/malformed, retrying:", e);
      report = await callAi(userPrompt + "\n\nReturn JSON only, no markdown, no commentary. Match the schema exactly.");
      if (!validateReport(report)) throw new Error("AI returned malformed report twice");
    }

    await supabase.from("assessments").update({
      status: "ready",
      report,
    }).eq("id", id);

    // Fire-and-forget delivery
    const projectUrl = Deno.env.get("SUPABASE_URL")!;
    fetch(`${projectUrl}/functions/v1/deliver-report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!}`,
      },
      body: JSON.stringify({ id }),
    }).catch((e) => console.error("invoke deliver failed", e));

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-report error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
