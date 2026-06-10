
# AI Tools Assessment — Build Plan (v2)

A new paid lead-gen flow on the site. Visitor lands on `/assessment`, completes a 3-step form, chooses a payment method (PayPal.me, Monzo, or USDT), pays $489, then clicks "I've completed payment" to unlock a personalized AI report on screen plus a branded PDF emailed to them and to you (lcooman.ccg@gmail.com).

## Important note on payment verification

None of the three payment options you've picked support automated webhook verification — they're all manual/honor-system:

- **PayPal.me** — link with amount pre-filled, no callback.
- **Monzo** — QR code to your Monzo.me page, no callback.
- **USDT (TRC20)** — QR code to your wallet address, on-chain but we're not polling it.

So the flow is: user picks a method, sees the link/QR, pays in their app, comes back and clicks "I've completed payment" with the transaction reference / their PayPal/Monzo email. That triggers the report.

To protect you:
- Every internal lead email to lcooman.ccg@gmail.com is flagged `PAYMENT METHOD: {paypal|monzo|usdt} — VERIFY BEFORE REPLYING`, with the reference they entered so you can match it against your inbox/wallet in 30 seconds.
- AI cost per report is a few cents, so freeloader exposure is small.
- When you're ready I'll swap in built-in Stripe (auto webhook verification) as a focused upgrade — no rewrite of the form, report, or delivery.

## Payment step UI

A single "Choose how to pay" screen with three tabs/cards, all showing $489 USD:

1. **PayPal** — coral button "Pay $489 with PayPal" opening `paypal.me/f2framework/489` in a new tab.
2. **Monzo** — embeds your Monzo QR (the colorful one). Soft white rounded card behind it so the QR isn't distorted, no recoloring. "Open in Monzo" link beneath for mobile users.
3. **USDT (TRC20)** — embeds the USDT QR. Same clean white card treatment. Wallet address shown below with a copy button. Small note: "Send exactly $489 in USDT on the TRON network."

Below the tabs: a "Payment reference / your PayPal or Monzo email" input + "I've completed payment — generate my report" coral button. That fires `confirm-payment`.

QR images will be uploaded via Lovable Assets (CDN, no codebase bloat) and rendered at a fixed size on a clean white rounded panel — the QR itself untouched so scanners read it perfectly.

## Scope (full build, one shot)

1. `/assessment` landing page — premium dark, matches existing site brand (Dark Navy / Blue-Grey / Coral tokens — not the spec's new palette, so it feels native).
2. 3-step assessment form (Business / Time / Stack) with validation.
3. Submission writes a row to a new `assessments` table.
4. Payment step with all three options + manual confirmation.
5. AI report generation via Lovable AI Gateway (Gemini), saved as JSON.
6. `/results/:id` renders the 9-section report on-brand, polling until ready.
7. PDF generated server-side, stored in Supabase Storage, attached to two emails (client + CCG) via Lovable Emails.
8. Entry points: CTA on Lead Leak Finder results + nav link + section on homepage.

## Pages & routes

- `/assessment` — landing + 3-step form + payment chooser.
- `/results/:id` — gated results view, polls until `status = ready`.
- Existing routes untouched except for nav link + Lead Leak Finder CTA injection.

## Visual style

Reuse existing project tokens (Dark Navy bg, Blue-Grey `#8BAAB8` eyebrows, Coral `#E2735A` CTAs, Inter font). Single H1 per page. Coral used sparingly for primary CTAs and headline ROI stat, matching site conventions.

## Backend (Lovable Cloud)

**New table `assessments`** (RLS on; anon can insert only; reads via edge functions with service role):

- contact + company fields, business_type, team_size, primary_focus
- pains text[], tools text[], hours_per_week int, goal text
- status: `pending_payment` → `paid` → `generating` → `ready` → `delivered`
- payment_method (`paypal` | `monzo` | `usdt`), payment_reference text, payment_confirmed_at
- report jsonb, pdf_url, delivered_at

**Edge functions**

- `confirm-payment` — flips status to `paid`, stores method + reference, invokes `generate-report`.
- `generate-report` — loads row, calls Lovable AI (`google/gemini-3-flash-preview`) with the system prompt from Appendix C and the Brightwave example from Appendix G as a one-shot anchor (match voice/structure, not content). Validates JSON shape, retries once on malformed output. Saves to `report`, sets `ready`, invokes `deliver`.
- `deliver` — renders report HTML, generates PDF, uploads to a new `reports` storage bucket, sends two emails via Lovable Emails: branded client email (PDF + results link) and internal lead notification (all answers + payment flag + PDF). Sets `delivered`.
- `get-assessment-status` — small read function the results page polls so the front end never has direct SELECT on the table.

**Secrets** — none required from you. `LOVABLE_API_KEY` already present. Lovable Emails domain setup dialog will trigger when delivery is wired; emails work on the default sender meanwhile.

## Report content

- Schema from Appendix B (9 sections, exact counts: 6 quick wins, 6 solutions, 4-day plan, 3 phase-2 items, 2 next steps).
- System prompt from Appendix C with Brightwave example as one-shot.
- Financial math: conservative "cost of time saved" headline (`hours × 4.33 × $75 − tool cost`), revenue-upside framing in caption.

## Entry points

- **Lead Leak Finder results**: coral CTA block under the score — "Now find the hours AI gives back to your team → Run my AI Assessment ($489)" → `/assessment`.
- **Homepage**: nav link in header + compact section/CTA placed near `GetStarted` so it complements the existing consulting CTA.

## Test / go-live

- `VITE_TEST_MODE` flag adds a "Skip payment (dev)" button for full-flow QA without paying.
- I'll walk it end-to-end and confirm both emails land.
- Upgrade path to real Stripe is a focused swap of the payment step + a webhook function.

## Out of scope

- Stripe/Paddle (deferred).
- Custom email domain verification (can add any time).
- Admin dashboard (use Supabase table view + your inbox).

Ready to build, or want changes to the payment UX / scope first?
