import type { ComponentType } from 'npm:react@18.3.1'
import { template as placeholder } from './placeholder.tsx'
import { template as assessmentReady } from './assessment-ready.tsx'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, unknown>
  to?: string | ((data: any) => string)
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  placeholder,
  'assessment-ready': assessmentReady,
}
