import type { Metadata } from 'next'
import { ChatBot } from '@/components/chatbot/ChatBot'

export const metadata: Metadata = {
  title: 'Insurance Sales Agent — Readiness Assessment | Comparion Insurance',
  description:
    'Find out if you\'re a great fit for a career as an Insurance Sales Agent with Comparion Insurance. Take our 2-minute readiness assessment and get an instant decision.',
  robots: 'index, follow',
  openGraph: {
    title: 'Are You a Great Fit for Insurance Sales? — Find Out in 2 Minutes',
    description:
      'Answer 10 quick questions and get an instant AI-powered match decision. Qualified candidates receive an immediate interview invitation.',
    type: 'website',
  },
}

interface ChatbotPageProps {
  searchParams: { source?: string }
}

export default function ChatbotPage({ searchParams }: ChatbotPageProps) {
  return <ChatBot campaignSource={searchParams.source} />
}
