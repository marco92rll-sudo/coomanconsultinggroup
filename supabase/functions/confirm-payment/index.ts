import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { id, payment_method, payment_reference, bypass_code } = await req.json();
    if (!id || !payment_method) {
      return new Response(JSON.stringify({ error: "Missing id or payment_method" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!["paypal", "monzo", "usdt", "test"].includes(payment_method)) {
      return new Response(JSON.stringify({ error: "Invalid payment_method" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Server-side bypass-code gate. The code never leaves the server.
    if (payment_method === "test") {
      const expected = Deno.env.get("ASSESSMENT_BYPASS_CODE");
      if (!expected || !bypass_code || String(bypass_code) !== expected) {
        return new Response(JSON.stringify({ error: "Invalid access code" }), {
          status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: row, error: fetchErr } = await supabase
      .from("assessments").select("id, status").eq("id", id).single();
    if (fetchErr || !row) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const storedRef = payment_method === "test"
      ? "bypass (test)"
      : (payment_reference ? String(payment_reference).slice(0, 300) : null);

    if (row.status === "pending_payment") {
      await supabase.from("assessments").update({
        status: "paid",
        payment_method,
        payment_reference: storedRef,
        payment_confirmed_at: new Date().toISOString(),
      }).eq("id", id);
    }

    // Fire-and-forget invoke generate-report
    const projectUrl = Deno.env.get("SUPABASE_URL")!;
    fetch(`${projectUrl}/functions/v1/generate-report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!}`,
      },
      body: JSON.stringify({ id }),
    }).catch((e) => console.error("invoke generate-report failed", e));

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("confirm-payment error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
