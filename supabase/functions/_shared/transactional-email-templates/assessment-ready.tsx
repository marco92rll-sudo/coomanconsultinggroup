/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Button, Hr, Row, Column,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface QuickWin { pain: string; fix: string }
interface Solution { tool: string; use: string; cost: string; setup: string; saves: string }
interface PlanItem { day: number; label: string; task: string; tool: string }
interface ComesAfter { text: string; tool: string }
interface NextStep { heading: string; detail: string }

interface Props {
  company?: string
  contactName?: string
  date?: string
  businessType?: string
  primaryFocus?: string
  hoursReclaimed?: number
  resultsUrl?: string
  summary?: { pain?: string; outcome?: string }
  quickWins?: QuickWin[]
  solutions?: Solution[]
  plan?: PlanItem[]
  comesAfter?: ComesAfter[]
  financial?: {
    monthlyRoi?: string
    weeklyHours?: string
    monthlyToolCost?: string
    roiCaption?: string
  }
  nextSteps?: NextStep[]
}

const BG = '#0A1422'
const CARD = '#121E2C'
const INNER = '#1A2A3C'
const ACCENT = '#E2735A'
const MUTED = '#8BAAB8'
const TEXT = '#D8E2EC'
const BORDER = 'rgba(216,226,236,0.12)'

const main = { backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif', margin: 0, padding: '0' } as const
const outer = { backgroundColor: BG, padding: '32px 16px' } as const
const container = { backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '32px 28px', maxWidth: '640px', margin: '0 auto' } as const
const eyebrow = { fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: MUTED, fontWeight: 700, margin: '0 0 8px 0' }
const h1 = { fontSize: '24px', color: '#ffffff', margin: '4px 0 4px 0', textTransform: 'uppercase' as const, letterSpacing: '-0.01em', fontWeight: 800 }
const meta = { color: '#6E8493', fontSize: '13px', margin: '0' }
const hr = { borderColor: BORDER, borderTop: `1px solid ${BORDER}`, margin: '24px 0' }
const section = { marginTop: '24px' }
const sectionLabel = { ...eyebrow, marginBottom: '10px' }
const p = { color: TEXT, fontSize: '14px', lineHeight: '1.6', margin: '10px 0' }
const heroBox = { backgroundColor: INNER, borderRadius: '8px', padding: '22px', textAlign: 'center' as const, margin: '18px 0' }
const heroNum = { fontSize: '36px', fontWeight: 800, color: ACCENT, margin: 0 }
const heroLabel = { fontSize: '11px', color: MUTED, letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginTop: '4px' }
const itemRow = { backgroundColor: INNER, borderRadius: '6px', padding: '14px', marginBottom: '8px' }
const dayLabel = { color: ACCENT, fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, margin: 0 }
const dayTask = { color: '#ffffff', margin: '4px 0', fontSize: '14px' }
const dayTool = { color: MUTED, fontSize: '12px', margin: 0 }
const stackRow = { borderBottom: `1px solid ${BORDER}`, padding: '12px 0' }
const stackTool = { color: '#ffffff', fontWeight: 700, fontSize: '14px', margin: 0 }
const stackUse = { color: MUTED, fontSize: '13px', margin: '2px 0 0 0' }
const stackMeta = { color: ACCENT, fontWeight: 600, fontSize: '13px', textAlign: 'right' as const, margin: 0 }
const stackCost = { color: '#6E8493', fontSize: '12px', textAlign: 'right' as const, margin: '2px 0 0 0' }
const nextStepBox = { borderLeft: `3px solid ${ACCENT}`, padding: '8px 14px', margin: '12px 0' }
const nextStepHead = { color: '#ffffff', fontWeight: 700, fontSize: '14px', margin: 0 }
const nextStepDetail = { color: TEXT, marginTop: '4px', fontSize: '13px', lineHeight: '1.5' }
const ctaWrap = { textAlign: 'center' as const, margin: '32px 0 8px 0' }
const cta = { backgroundColor: ACCENT, color: '#ffffff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' as const, fontSize: '13px' }
const footer = { color: '#6E8493', fontSize: '12px', textAlign: 'center' as const, marginTop: '20px' }
const statCell = { backgroundColor: INNER, borderRadius: '6px', padding: '14px', textAlign: 'center' as const }
const statNum = { fontSize: '20px', fontWeight: 800, margin: 0 }
const statLabel = { color: MUTED, fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginTop: '4px' }

function renderFix(fix: string): React.ReactNode {
  // Bold **text** segments in coral
  const parts = fix.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: ACCENT }}>{part.slice(2, -2)}</strong>
    }
    return <React.Fragment key={i}>{part}</React.Fragment>
  })
}

const Email = ({
  company = '', contactName = '', date = '', businessType = '', primaryFocus = '',
  hoursReclaimed = 0, resultsUrl = '#',
  summary = {}, quickWins = [], solutions = [], plan = [], comesAfter = [],
  financial = {}, nextSteps = [],
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`Your AI Tools Assessment — ${hoursReclaimed} hours/week reclaimed`}</Preview>
    <Body style={main}>
      <Section style={outer}>
        <Container style={container}>
          <Text style={eyebrow}>CCG · AI Tools Assessment</Text>
          <Heading as="h1" style={h1}>Prepared for {company}</Heading>
          <Text style={meta}>{date}{businessType ? ` · ${businessType}` : ''}{primaryFocus ? ` · Focus: ${primaryFocus}` : ''}</Text>

          <Hr style={hr} />

          <Text style={sectionLabel}>Executive Summary</Text>
          {summary.pain && <Text style={p}>{summary.pain}</Text>}
          {summary.outcome && <Text style={p}>{summary.outcome}</Text>}

          <Section style={heroBox}>
            <Text style={heroNum}>{hoursReclaimed} hrs</Text>
            <Text style={heroLabel}>Reclaimed every week</Text>
          </Section>

          <Section style={section}>
            <Text style={sectionLabel}>Your 6 Quick Wins</Text>
            {quickWins.map((q, i) => (
              <Section key={i} style={itemRow}>
                <Text style={{ ...stackTool, margin: 0 }}>{i + 1}. {q.pain}</Text>
                <Text style={{ ...p, margin: '4px 0 0 0' }}>{renderFix(q.fix)}</Text>
              </Section>
            ))}
          </Section>

          <Section style={section}>
            <Text style={sectionLabel}>Recommended Stack</Text>
            {solutions.map((s, i) => (
              <Row key={i} style={stackRow}>
                <Column>
                  <Text style={stackTool}>{s.tool}</Text>
                  <Text style={stackUse}>{s.use}</Text>
                </Column>
                <Column align="right">
                  <Text style={stackMeta}>Saves {s.saves}</Text>
                  <Text style={stackCost}>{s.cost} · {s.setup}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Section style={section}>
            <Text style={sectionLabel}>4-Day Rollout Plan</Text>
            {plan.map((d, i) => (
              <Section key={i} style={itemRow}>
                <Text style={dayLabel}>{d.label}</Text>
                <Text style={dayTask}>{d.task}</Text>
                <Text style={dayTool}>{d.tool}</Text>
              </Section>
            ))}
          </Section>

          <Section style={section}>
            <Text style={sectionLabel}>What Comes After</Text>
            {comesAfter.map((c, i) => (
              <Text key={i} style={{ ...p, margin: '6px 0' }}>
                • {c.text} <span style={{ color: MUTED }}>— {c.tool}</span>
              </Text>
            ))}
          </Section>

          <Section style={section}>
            <Text style={sectionLabel}>Financial Impact</Text>
            <Row>
              <Column style={{ width: '32%' }}>
                <Section style={statCell}>
                  <Text style={{ ...statNum, color: ACCENT }}>{financial.monthlyRoi || '—'}</Text>
                  <Text style={statLabel}>Monthly ROI</Text>
                </Section>
              </Column>
              <Column style={{ width: '2%' }}>&nbsp;</Column>
              <Column style={{ width: '32%' }}>
                <Section style={statCell}>
                  <Text style={{ ...statNum, color: '#ffffff' }}>{financial.weeklyHours || '—'}</Text>
                  <Text style={statLabel}>Reclaimed/wk</Text>
                </Section>
              </Column>
              <Column style={{ width: '2%' }}>&nbsp;</Column>
              <Column style={{ width: '32%' }}>
                <Section style={statCell}>
                  <Text style={{ ...statNum, color: '#ffffff' }}>{financial.monthlyToolCost || '—'}</Text>
                  <Text style={statLabel}>Tool Cost</Text>
                </Section>
              </Column>
            </Row>
            {financial.roiCaption && (
              <Text style={{ color: '#6E8493', fontSize: '12px', fontStyle: 'italic', marginTop: '10px' }}>
                {financial.roiCaption}
              </Text>
            )}
          </Section>

          <Section style={section}>
            <Text style={sectionLabel}>Your Next Steps</Text>
            {nextSteps.map((n, i) => (
              <Section key={i} style={nextStepBox}>
                <Text style={nextStepHead}>{n.heading}</Text>
                <Text style={nextStepDetail}>{n.detail}</Text>
              </Section>
            ))}
          </Section>

          <Section style={ctaWrap}>
            <Button href={resultsUrl} style={cta}>View your full report</Button>
          </Section>

          <Text style={footer}>
            Reply to this email to schedule your implementation review.<br />
            — Cooman Consulting Group
          </Text>
        </Container>
      </Section>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Props) => `Your CCG AI Tools Assessment is ready${data.company ? ` — ${data.company}` : ''}`,
  displayName: 'Assessment Ready',
  previewData: {
    company: 'Acme Co',
    contactName: 'Jane Doe',
    date: 'June 2026',
    businessType: 'Agency / Services',
    primaryFocus: 'Sales',
    hoursReclaimed: 12,
    resultsUrl: 'https://coomanconsultinggroup.lovable.app/assessment/results/preview',
    summary: {
      pain: 'Your team loses ~12 hours/week to manual content and CRM work.',
      outcome: 'A focused stack reclaims those hours and puts ~$3.6k/month back on the table.',
    },
    quickWins: [
      { pain: 'Content writing', fix: 'Turn one transcript into a week of posts — **70% faster output**.' },
    ],
    solutions: [
      { tool: 'Claude', use: 'Long-form writing', cost: '$20/mo', setup: '<1 day', saves: '4 hrs/wk' },
    ],
    plan: [
      { day: 1, label: 'Day One', task: 'Stand up Claude with your style guide', tool: 'Claude' },
    ],
    comesAfter: [{ text: 'Train a custom assistant', tool: 'Claude' }],
    financial: {
      monthlyRoi: '$3.6k', weeklyHours: '12 hrs', monthlyToolCost: '$344/mo',
      roiCaption: 'Net of tool cost at $75/hr blended rate',
    },
    nextSteps: [
      { heading: 'Launch Day 1', detail: 'Stand up Claude this week.' },
      { heading: 'Book your review', detail: 'Schedule with CCG.' },
    ],
  },
} satisfies TemplateEntry
