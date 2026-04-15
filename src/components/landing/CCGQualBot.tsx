import { useState, useRef, useEffect } from "react";

const CALENDLY_F2F = "https://calendly.com/lcooman-ccg/f2f";
const CALENDLY_ROE = "https://calendly.com/lcooman-ccg/roe";
const WEB3FORMS_KEY = "cf479f18-b021-4e42-b854-3c81753f808d";

const SYSTEM_PROMPT = `## YOUR JOB
You are Charles, a chat assistant for Cooman Consulting Group (CCG). Your job is to chat with people who visit the website, find out if CCG can genuinely help them, collect their contact details, and get them booked into the right call. You work through five clear steps — in order.

## WHAT CCG DOES
CCG helps business owners and sales leaders make more money through two services:

**F2F (Founder to Founder) — a fixed project:**
For founders who are personally doing most of the selling and need to fix that. CCG helps them:
- Clarify who their best customers are, what makes them different, and how to talk about it
- Turn the founder's sales instincts into a simple process the whole team can follow
- Build a plan for finding and reaching new customers in a consistent, organized way
After the project, CCG stays involved monthly to keep things running and improving.
Good fit if: B2B business (sells to other businesses), 1–20 people, £100K–£3M revenue, sales feel unpredictable or the founder is doing too much of it themselves.

**ROE (Revenue Operations Execution) — ongoing monthly service:**
For businesses ready to build proper systems. Three stages:
- Build tools to find leads and reach out across email, LinkedIn and other channels to get more quality meetings
- Fix what happens after a meeting — improving how deals get closed before adding automation
- Set up systems to run everything at scale — the client keeps full access and owns everything CCG builds
Good fit if: B2B, has a small team, some revenue already, wants someone to build and run their sales systems without hiring full-time. The client owns everything — no lock-in.

## STEP 1 — QUALIFY THEM
Work through these naturally in conversation — never as a list:
1. Are they the decision maker?
2. What sales or revenue problem are they trying to fix?
3. How big is the business and do they sell to other businesses?
4. Is this urgent or just something they're curious about?
5. Are they in a position to invest in outside help?

Who gets what:
- Founder doing most of the selling, unclear messaging, inconsistent pipeline → F2F
- Already sorted positioning, wants outbound systems and scale → ROE
- Both possible → start with F2F, mention ROE as the natural next step

Turn away politely if: not a decision maker, sells to consumers not businesses, solo with no team or revenue, only wants free advice, only cares about cheapest price.

## STEP 2 — TELL THEM WHAT YOU THINK
Once you've decided they're a fit:
- F2F: Acknowledge their problem, explain F2F in one sentence, say you'd like to get them booked in for a Founder Strategy Call — but first you need a couple of details.
- ROE: Same, but explain ROE in one sentence, mention they own everything built, and invite a Revenue Ops Discovery Call.
- Not a fit: Be honest and brief about why.

## STEP 3 — COLLECT THEIR DETAILS (MANDATORY — DO NOT SKIP)
Before any booking happens, you must collect all four of these — one at a time, naturally:
1. Their full name
2. Their company website (e.g. www.example.com)
3. Their email address
4. Their single biggest challenge right now in one sentence

Ask for these one by one in a natural way — not as a form. Example: "Before I get you booked in, can I grab your name?" then "And your company website?" etc. Do not move to booking until you have all four.

Once you have all four details, output this trigger on its own line with no other text on that line:
[LEAD:name|website|email|challenge]
Replace name/website/email/challenge with the actual values the person gave you. Use pipe characters | to separate them. Do not add spaces around the pipes.

## STEP 4 — BOOK THEM IN
Immediately after the [LEAD:...] trigger, tell them you're pulling up the calendar now. Then on a new line output exactly one of:
[BOOK:F2F]
[BOOK:ROE]
This opens the booking calendar automatically with their details pre-filled — they won't need to enter anything twice.

## STEP 5 — CLOSE WARMLY
After the calendar appears, let them know Leone will see all their details ahead of the call so they can hit the ground running. Keep it brief and warm.

## WHAT TO SAY WHEN THEY PUSH BACK
- "How much does it cost?" → "The price depends on what's actually needed — that's what the call figures out. It's 20 minutes, no hard sell."
- "Can you send me info first?" → "The fastest way to know if this is right for you is a quick call — what's stopping you from booking one?"
- "Not ready yet" → "What would need to change for it to feel like the right time?"
- "We already use someone for this" → "What's working well with them? And what isn't?"
- "Need to check with someone else" → "Would it help to get them on the call too, or do you want the overview first?"

## WHAT TO DO WHEN THINGS GO WRONG
- After 8 back-and-forths with no direction: ask "Can I be straight — what would need to come from this conversation for it to be worth your time?" Then book or close.
- Rude or disengaged: "No problem — if anything changes, you know where to find us." Then stop.
- Asked if you're AI: "I'm Charles, an AI assistant for CCG. Leone will be on the actual call — I'm just here to make sure it's worth both your time."
- Never make up numbers, case studies, or client names. If they ask for proof: "Leone will walk you through real examples on the call."

## HOW TO WRITE
- Sound like a confident, friendly human — not a robot
- 1 to 3 sentences max per message
- No bullet points. Plain sentences only.
- Never open with "Great!", "Absolutely!" or "Of course!"
- Use their name occasionally — not every message
- Warm but confident. CCG chooses who it works with.`;

// Colors matching site palette
const C = {
  bg: "#090f1a",
  surface: "#0b1220",
  card: "#0f1926",
  border: "rgba(139,171,184,0.12)",
  borderLight: "rgba(139,171,184,0.25)",
  accent: "#8BAAB8",
  accentDim: "rgba(139,171,184,0.4)",
  accentGlow: "rgba(139,171,184,0.1)",
  text: "#ffffff",
  muted: "rgba(255,255,255,0.45)",
  dim: "rgba(255,255,255,0.25)",
  userBg: "rgba(139,171,184,0.08)",
  botBg: "#0b1220",
  botBorder: "rgba(139,171,184,0.12)",
  danger: "#d05a5a",
};

const botStyles = `
  .ccg-bot *{box-sizing:border-box;margin:0;padding:0}
  .ccg-bot ::-webkit-scrollbar{width:3px}
  .ccg-bot ::-webkit-scrollbar-thumb{background:rgba(139,171,184,0.2);border-radius:2px}
  .ccg-bot textarea,.ccg-bot input{outline:none}
  @keyframes ccgFadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
  @keyframes ccgSpin{to{transform:rotate(360deg)}}
  @keyframes ccgShimmer{0%,100%{opacity:.5}50%{opacity:1}}
  @keyframes ccgSlideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes ccgPulse{0%,100%{box-shadow:0 0 0 0 rgba(139,171,184,0.2)}50%{box-shadow:0 0 0 4px rgba(139,171,184,0.06)}}
  .ccg-msg{animation:ccgFadeUp .22s ease forwards}
  .ccg-cal-panel{animation:ccgSlideIn .3s ease forwards}
`;

async function sendLeadEmail(lead: Lead, bookType: string | null) {
  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New CCG Lead: ${lead.name} — ${bookType === "F2F" ? "Founder Strategy Call" : "Revenue Ops Discovery Call"}`,
        from_name: "Charles · CCG Bot",
        replyto: lead.email,
        to: "leone@coomanconsultinggroup.com,lcooman.ccg@gmail.com",
        cc: "christina@coomanconsultinggroup.com,ccooman.ccg@gmail.com",
        message: `New qualified lead captured by Charles.\n\nName: ${lead.name}\nWebsite: ${lead.website}\nEmail: ${lead.email}\nBiggest Challenge: ${lead.challenge}\nCall Type: ${bookType === "F2F" ? "Founder Strategy Call (F2F)" : "Revenue Ops Discovery Call (ROE)"}`,
      }),
    });
    console.log("Lead email sent:", lead.name);
  } catch (err) {
    console.error("Web3Forms error:", err);
  }
}

interface Lead {
  name: string;
  website: string;
  email: string;
  challenge: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

function CalendlyPanel({ url, lead, onClose }: { url: string; lead: Lead | null; onClose: () => void }) {
  const prefilled = new URL(url);
  if (lead?.name) prefilled.searchParams.set("name", lead.name);
  if (lead?.email) prefilled.searchParams.set("email", lead.email);

  return (
    <div className="ccg-cal-panel" style={{
      position: "absolute", inset: 0, zIndex: 10,
      background: C.bg, display: "flex", flexDirection: "column",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 20px",
        borderBottom: `1px solid ${C.border}`,
        background: C.card,
      }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.accent }}>
            Book Your Call
          </div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 2, letterSpacing: 1 }}>
            Your details are already filled in
          </div>
        </div>
        <button onClick={onClose} style={{
          background: "none", border: `1px solid ${C.border}`,
          borderRadius: 6, color: C.muted, padding: "6px 12px",
          cursor: "pointer", fontSize: 11, fontFamily: "inherit",
        }}>← Back</button>
      </div>
      <iframe
        src={prefilled.toString()}
        width="100%" height="100%"
        frameBorder="0"
        style={{ flex: 1, background: "#fff" }}
        title="Book a call with CCG"
      />
    </div>
  );
}

function LeadBanner({ lead }: { lead: Lead }) {
  return (
    <div style={{
      margin: "8px 0", padding: "12px 14px",
      background: C.accentGlow,
      border: `1px solid ${C.accentDim}`,
      borderRadius: 10, fontSize: 11, color: C.accent, lineHeight: 1.7,
    }}>
      <div style={{ fontWeight: 600, marginBottom: 4, letterSpacing: 1, fontSize: 9, textTransform: "uppercase" }}>
        ✓ Lead captured
      </div>
      <div style={{ color: C.text }}>{lead.name} · {lead.website}</div>
      <div style={{ color: C.muted }}>{lead.email}</div>
    </div>
  );
}

export default function CCGQualBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [calUrl, setCalUrl] = useState<string | null>(null);
  const [calType, setCalType] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "active" | "qualified" | "disqualified">("idle");
  const [lead, setLead] = useState<Lead | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const parseResponse = (raw: string) => {
    let text = raw;
    let bookType: string | null = null;
    let capturedLead: Lead | null = null;

    const leadMatch = raw.match(/\[LEAD:([^\]]+)\]/i);
    if (leadMatch) {
      const parts = leadMatch[1].split("|");
      capturedLead = {
        name: (parts[0] || "").trim(),
        website: (parts[1] || "").trim(),
        email: (parts[2] || "").trim(),
        challenge: (parts[3] || "").trim(),
      };
      text = text.replace(/\[LEAD:[^\]]*\]/gi, "").trim();
    }

    if (/\[BOOK:F2F\]/i.test(raw)) {
      bookType = "F2F";
      text = text.replace(/\[BOOK:F2F\]/gi, "").trim();
    } else if (/\[BOOK:ROE\]/i.test(raw)) {
      bookType = "ROE";
      text = text.replace(/\[BOOK:ROE\]/gi, "").trim();
    }

    return { text, bookType, capturedLead };
  };

  const send = async () => {
    const val = input.trim();
    if (!val || loading) return;
    const updated: Message[] = [...messages, { role: "user", content: val }];
    setMessages(updated);
    setInput("");
    setLoading(true);
    if (phase === "idle") setPhase("active");

    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-with-charles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: updated,
          system: SYSTEM_PROMPT,
        }),
      });
      const data = await res.json();
      const raw = data.text || data.content?.[0]?.text || "Something went wrong — please try again.";
      const { text, bookType, capturedLead } = parseResponse(raw);

      setMessages([...updated, { role: "assistant", content: text }]);

      if (capturedLead) {
        setLead(capturedLead);
        sendLeadEmail(capturedLead, bookType || calType);
      }

      if (bookType) {
        setCalType(bookType);
        setPhase("qualified");
        const baseUrl = bookType === "F2F" ? CALENDLY_F2F : CALENDLY_ROE;
        setTimeout(() => setCalUrl(baseUrl), 700);
      } else if (
        text.toLowerCase().includes("not the right fit") ||
        text.toLowerCase().includes("not a fit")
      ) {
        setPhase("disqualified");
      }
    } catch {
      setMessages([...updated, { role: "assistant", content: "Connection issue — please try again." }]);
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const reset = () => {
    setMessages([]); setInput(""); setLoading(false);
    setCalUrl(null); setCalType(null); setPhase("idle"); setLead(null);
    inputRef.current?.focus();
  };

  const statusBar = () => {
    if (phase === "qualified") return { label: "QUALIFIED", color: "#7d9471", bg: "#0a120a" };
    if (phase === "disqualified") return { label: "NOT A FIT", color: C.danger, bg: "#140606" };
    if (phase === "active") return { label: "IN CONVERSATION", color: C.accent, bg: C.accentGlow };
    return null;
  };
  const bar = statusBar();

  return (
    <>
      <style>{botStyles}</style>
      <div className="ccg-bot" style={{
        width: "100%", maxWidth: 480, height: 560,
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        display: "flex", flexDirection: "column",
        overflow: "hidden", position: "relative",
        boxShadow: `0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px ${C.border}`,
        fontFamily: "'Inter', sans-serif",
      }}>
        {/* Header */}
        <div style={{
          padding: "14px 20px",
          borderBottom: `1px solid ${C.border}`,
          background: C.card,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: C.accentGlow,
              border: `1px solid ${C.accentDim}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 700, color: C.accent,
            }}>C</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: -0.3 }}>Charles</div>
              <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1.5, marginTop: 1 }}>
                COOMAN CONSULTING GROUP
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: C.accent, animation: "ccgPulse 2.5s infinite",
              }} />
              <span style={{ fontSize: 9, color: C.muted, letterSpacing: 1 }}>ONLINE</span>
            </div>
            {bar && (
              <div style={{
                fontSize: 9, letterSpacing: 1.5, fontWeight: 500,
                padding: "4px 9px", borderRadius: 4,
                color: bar.color, background: bar.bg,
                border: `1px solid ${bar.color}30`,
              }}>{bar.label}</div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto",
          padding: "20px 18px",
          display: "flex", flexDirection: "column", gap: 14,
        }}>
          {/* Welcome screen */}
          {messages.length === 0 && (
            <div style={{ margin: "auto", textAlign: "center", padding: "24px 20px" }}>
              <div style={{
                width: 64, height: 64, margin: "0 auto 20px",
                borderRadius: 14,
                background: C.accentGlow,
                border: `1px solid ${C.accentDim}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, fontWeight: 700, color: C.accent,
                boxShadow: `0 0 40px ${C.accentGlow}, 0 8px 32px rgba(0,0,0,0.4)`,
              }}>C</div>
              <div style={{
                fontSize: 20, fontWeight: 600, color: C.text,
                marginBottom: 10, letterSpacing: -0.3,
              }}>Hi, I'm Charles.</div>
              <div style={{
                fontSize: 14, color: C.accent,
                fontStyle: "italic", fontWeight: 500,
                lineHeight: 1.6, maxWidth: 280,
                margin: "0 auto 16px",
              }}>In a perfect world, how would you like to unlock new opportunities?</div>
              <div style={{
                fontSize: 12, color: C.muted, lineHeight: 1.8,
                maxWidth: 280, margin: "0 auto",
              }}>
                Tell me about your business — what's the revenue challenge you're trying to crack?
              </div>
            </div>
          )}

          {/* Message bubbles */}
          {messages.map((m, i) => (
            <div key={i} className="ccg-msg" style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              gap: 8,
            }}>
              {m.role === "assistant" && (
                <div style={{
                  width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                  background: C.accentGlow, border: `1px solid ${C.accentDim}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: C.accent, alignSelf: "flex-end",
                }}>C</div>
              )}
              <div style={{
                maxWidth: "78%", padding: "11px 15px",
                borderRadius: m.role === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                background: m.role === "user" ? C.userBg : C.botBg,
                border: `1px solid ${m.role === "user" ? C.borderLight : C.botBorder}`,
                fontSize: 12.5, lineHeight: 1.7, color: C.text, whiteSpace: "pre-wrap",
              }}>
                {m.content}
              </div>
              {m.role === "user" && (
                <div style={{
                  width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                  background: C.userBg, border: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, color: C.muted, alignSelf: "flex-end",
                }}>You</div>
              )}
            </div>
          ))}

          {lead && <LeadBanner lead={lead} />}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              <div style={{
                width: 26, height: 26, borderRadius: 6,
                background: C.accentGlow, border: `1px solid ${C.accentDim}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700, color: C.accent,
              }}>C</div>
              <div style={{
                padding: "11px 15px",
                background: C.botBg, border: `1px solid ${C.botBorder}`,
                borderRadius: "14px 14px 14px 3px",
                display: "flex", gap: 5, alignItems: "center",
              }}>
                {[0, 0.18, 0.36].map((d, i) => (
                  <div key={i} style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: C.accent,
                    animation: `ccgShimmer 1.2s ${d}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input bar */}
        <div style={{
          borderTop: `1px solid ${C.border}`,
          padding: "12px 16px",
          background: C.card,
          display: "flex", gap: 10, alignItems: "flex-end",
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Tell me about your business…"
            rows={1}
            style={{
              flex: 1, background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 10, padding: "10px 13px",
              color: C.text, fontSize: 12,
              fontFamily: "'Inter', sans-serif",
              resize: "none", lineHeight: 1.6,
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = C.accentDim}
            onBlur={e => e.target.style.borderColor = C.border}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            style={{
              width: 38, height: 38, borderRadius: 9, flexShrink: 0,
              background: loading || !input.trim() ? C.surface : `linear-gradient(135deg, ${C.accentDim}, ${C.accent})`,
              border: `1px solid ${loading || !input.trim() ? C.border : C.accent}`,
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: loading || !input.trim() ? C.dim : "#090f1a",
              fontSize: 15, transition: "all 0.15s",
            }}
          >
            {loading
              ? <div style={{
                  width: 13, height: 13, borderRadius: "50%",
                  border: `2px solid ${C.dim}`, borderTopColor: C.muted,
                  animation: "ccgSpin 0.8s linear infinite",
                }} />
              : "↑"}
          </button>
          {messages.length > 0 && (
            <button onClick={reset} title="Start over" style={{
              width: 38, height: 38, borderRadius: 9, flexShrink: 0,
              background: C.surface, border: `1px solid ${C.border}`,
              color: C.muted, cursor: "pointer", fontSize: 14,
            }}>↺</button>
          )}
        </div>

        {calUrl && (
          <CalendlyPanel url={calUrl} lead={lead} onClose={() => setCalUrl(null)} />
        )}
      </div>
    </>
  );
}
