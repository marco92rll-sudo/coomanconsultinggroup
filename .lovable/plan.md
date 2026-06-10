## Goal
Add a secret bypass code so you (or collaborators) can unlock the full assessment report without paying $489. Safe to leave live in production; revocable any time by changing the code.

## How it works
1. On the payment step, a small "Have an access code?" link appears below the three payment tabs.
2. Clicking it reveals an input + "Unlock" button.
3. Entering the correct code calls `confirm-payment` with `payment_method: "test"` and the code itself as the reference.
4. `confirm-payment` validates the code server-side against the `ASSESSMENT_BYPASS_CODE` secret. Match → flips to `paid`, kicks off `generate-report`, same as a real payment. Mismatch → 401.
5. The internal lead email is flagged `PAYMENT METHOD: bypass (test) — DO NOT INVOICE` so you can tell test runs apart from real ones in your inbox.

## Why a server-side secret (not a hard-coded string)
If the code lived in the frontend, anyone viewing the bundle could find it and claim a free report. Storing it as a Lovable Cloud secret keeps it invisible to the browser, and you can rotate it without a redeploy.

## Changes

**Backend — `supabase/functions/confirm-payment/index.ts`**
- Accept an optional `bypass_code` field on the request.
- If `payment_method === "test"`: require `bypass_code` to equal `Deno.env.get("ASSESSMENT_BYPASS_CODE")`. Reject with 401 otherwise. Strip the code from what gets stored — save `payment_reference` as `"bypass (test)"`.
- Existing `paypal` / `monzo` / `usdt` paths untouched.

**Frontend — `src/pages/Assessment.tsx`**
- Under the payment tabs, add a subtle "Have an access code?" toggle.
- When open: code input + "Unlock report" button (coral, same style as the main confirm).
- On submit: POST to `confirm-payment` with `{ id, payment_method: "test", bypass_code }`. On 401 show "Invalid code"; on success route to `/results/:id` just like the paid flow.
- Remove the old `VITE_TEST_MODE`-gated dev link (replaced by this).

**Internal email — `supabase/functions/deliver-report/index.ts`**
- When `payment_method === "test"`, change the flag line to `PAYMENT METHOD: bypass (test) — DO NOT INVOICE` so test runs are unmistakable.

**Secret**
- Add one Lovable Cloud secret: `ASSESSMENT_BYPASS_CODE`. You'll set its value (e.g. `CCG-INTERNAL-2026`) via the secret prompt. To rotate later: update the secret — no code change needed.

## Out of scope
- Multi-use codes / per-collaborator codes / expiry. Single shared code is enough for testing; can grow later if needed.
- Real Stripe integration (still deferred).

Ready to build? On approval I'll request the `ASSESSMENT_BYPASS_CODE` secret from you, then ship the three file changes.