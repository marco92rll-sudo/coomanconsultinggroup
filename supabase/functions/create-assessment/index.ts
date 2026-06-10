import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const required = ["company", "contact_name", "email", "business_type", "team_size", "primary_focus"];
    for (const f of required) {
      if (!body[f] || typeof body[f] !== "string") {
        return new Response(JSON.stringify({ error: `Missing field: ${f}` }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data, error } = await supabase
      .from("assessments")
      .insert({
        company: String(body.company).slice(0, 200),
        contact_name: String(body.contact_name).slice(0, 200),
        email: String(body.email).slice(0, 255).toLowerCase(),
        business_type: String(body.business_type).slice(0, 100),
        team_size: String(body.team_size).slice(0, 50),
        primary_focus: String(body.primary_focus).slice(0, 100),
        pains: Array.isArray(body.pains) ? body.pains.slice(0, 20).map((p: any) => String(p).slice(0, 100)) : [],
        tools: Array.isArray(body.tools) ? body.tools.slice(0, 20).map((p: any) => String(p).slice(0, 100)) : [],
        hours_per_week: Number.isFinite(Number(body.hours_per_week)) ? Math.min(80, Math.max(0, Math.round(Number(body.hours_per_week)))) : null,
        goal: body.goal ? String(body.goal).slice(0, 1000) : null,
        status: "pending_payment",
      })
      .select("id")
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ id: data.id }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-assessment error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
