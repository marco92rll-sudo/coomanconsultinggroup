## Three fixes

### 1. Client never receives the report email
Web3Forms is a contact-form relay — it always routes to the form-owner's inbox no matter what `email` field you set. That's why you only saw the internal CCG-bound email and the client got nothing.

**Fix:** Switch to **Lovable Emails** (built-in transactional, sends from your own subdomain).
- Set up an email subdomain (one-time, ~5 min DNS via the in-product setup dialog).
- Scaffold app-email infrastructure + a branded `assessment-ready` React Email template that renders the full report (mirrors the current on-screen sections: executive summary, hours-reclaimed hero, quick wins, stack, 4-day plan, what comes after, financial impact, next steps, CTA to view full report).
- Rewrite `deliver-report` to:
  - Invoke `send-transactional-email` with `templateName: "assessment-ready"`, `recipientEmail: row.email`, `idempotencyKey: "assessment-ready-<id>"`, and the report data.
  - Continue to fire the existing Web3Forms call **only for the internal CCG notification** (that one works fine for an inbox alert).
- Keep `lcooman.ccg@gmail.com` as reply-to so client replies still reach you.

### 2. Stop asking for email twice
On the payment step you currently re-ask for "Your PayPal email / Monzo name / USDT TXID" as `payment_reference`.

**Fix:** Pre-fill the reference field with the email captured in Step 1 for PayPal and Monzo tabs (still ask for the TXID on the USDT tab — different shape of data). Show it as "We'll match against `jane@acme.co` — change if you paid from a different account." That removes the duplicate ask while keeping the matching ability intact.

### 3. PDF download looks cheap (window.print)
Replace `window.print()` with a real on-demand PDF generator that produces a premium, paginated A4 document.

**Approach (client-side, no extra backend):**
- Add `jspdf` + `html2canvas`.
- Tag each report section (`<Section>`) with `data-pdf-section` and add a hidden, print-optimized `#pdf-root` clone styled for paper (white bg, dark text, generous margins, brand accent retained on numbers/CTA only).
- New `handleExportPDF`:
  - A4 portrait, 15 mm margins, 4 mm gap between sections.
  - Loop sections → `html2canvas(section, { scale: 2, backgroundColor: '#ffffff' })` → scale to fit content width → check remaining page space → add page if needed.
  - Add a branded cover page (CCG logo wordmark, "AI Tools Assessment", client company, prepared date) and a header/footer band on every page with `Cooman Consulting Group · Prepared for {company} · Page X of Y`.
  - File name: `CCG-AI-Assessment-{company-slug}.pdf`.
- Keep the "Print / Save as PDF" button but relabel it **Download PDF** and run the new generator. Show a spinner while rendering.

### Technical notes (for me)
- Files touched:
  - `supabase/functions/_shared/transactional-email-templates/assessment-ready.tsx` (new)
  - `supabase/functions/_shared/transactional-email-templates/registry.ts` (register)
  - `supabase/functions/deliver-report/index.ts` (use `send-transactional-email`, keep Web3Forms only for internal)
  - `src/pages/Assessment.tsx` (pre-fill `paymentRef` from `form.email` when entering payment step; copy update)
  - `src/pages/AssessmentResults.tsx` (jsPDF generator, section markers, cover page, footer)
  - `package.json` (add `jspdf`, `html2canvas`)
- Email infra prerequisites are handled by the email-domain setup dialog + `setup_email_infra` + `scaffold_transactional_email` before writing the template.

### Out of scope
- Replacing PayPal/Monzo/USDT with a real Stripe checkout (still on the deferred list).
- Server-side PDF rendering (overkill; client-side jsPDF is fast and looks great when laid out per-section).

Approve and I'll kick off email-domain setup, then build everything.
