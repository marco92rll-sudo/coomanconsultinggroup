import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type AuthorizationDetails = {
  client?: { name?: string; redirect_uri?: string; scope?: string };
  redirect_url?: string;
  redirect_to?: string;
  scopes?: string[];
};

// The @supabase/supabase-js `auth.oauth` namespace is in beta and may not be
// in the shipped types. Keep a small typed shim so we can call it directly.
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: { message: string } | null }>;
};

function oauth(): OAuthApi {
  return (supabase.auth as unknown as { oauth: OAuthApi }).oauth;
}

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }
      setEmail(sess.session.user.email ?? null);
      try {
        const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
        if (!active) return;
        if (error) return setError(error.message);
        const immediate = data?.redirect_url ?? data?.redirect_to;
        if (immediate && !data?.client) {
          window.location.href = immediate;
          return;
        }
        setDetails(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    try {
      const { data, error } = approve
        ? await oauth().approveAuthorization(authorizationId)
        : await oauth().denyAuthorization(authorizationId);
      if (error) {
        setBusy(false);
        return setError(error.message);
      }
      const target = data?.redirect_url ?? data?.redirect_to;
      if (!target) {
        setBusy(false);
        return setError("No redirect returned by the authorization server.");
      }
      window.location.href = target;
    } catch (e) {
      setBusy(false);
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md rounded-xl border border-border bg-card p-6 text-center">
          <h1 className="text-lg font-semibold text-foreground mb-2">Could not load this authorization</h1>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </main>
    );
  }

  if (!details) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Loading…
      </main>
    );
  }

  const clientName = details.client?.name ?? "an app";

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl space-y-5">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-foreground">
            Connect {clientName} to Cooman Consulting Group
          </h1>
          <p className="text-sm text-muted-foreground">
            This lets {clientName} use this app as you.
          </p>
        </div>

        {email && (
          <div className="text-xs text-muted-foreground border border-border rounded-md px-3 py-2">
            Signed in as <span className="text-foreground">{email}</span>
          </div>
        )}

        <div className="text-sm text-muted-foreground space-y-2">
          <p>{clientName} will be able to call this app's enabled tools while you are signed in.</p>
          <p className="text-xs">This does not bypass this app's permissions or backend policies.</p>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1" onClick={() => decide(true)} disabled={busy}>
            Approve
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => decide(false)} disabled={busy}>
            Cancel
          </Button>
        </div>
      </div>
    </main>
  );
}
