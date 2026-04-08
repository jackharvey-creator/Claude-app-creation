import type { Metadata } from 'next'
import { ChatBot } from '@/components/chatbot/ChatBot'

export const metadata: Metadata = {
  title: 'Preview — Insurance Sales Agent Assessment | Comparion Insurance',
  description: 'Preview of the candidate readiness assessment chatbot.',
  robots: 'noindex, nofollow',
}

export default function ChatbotPreviewPage() {
  return <ChatBot previewMode />
}
