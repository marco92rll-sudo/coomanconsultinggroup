/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const Email = () => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Welcome</Preview>
    <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
      <Container style={{ padding: '20px 25px' }}>
        <Heading>Hello</Heading>
        <Text>This is a placeholder transactional email.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Hello from Cooman Consulting Group',
  displayName: 'Placeholder',
  previewData: {},
} satisfies TemplateEntry
