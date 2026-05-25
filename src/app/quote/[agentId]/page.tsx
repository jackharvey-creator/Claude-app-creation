import { notFound } from 'next/navigation'
import { getAgent } from '@/lib/insurance/agents'
import { InsuranceChat } from '@/components/insurance/InsuranceChat'

interface Props {
  params: { agentId: string }
}

export default function QuotePage({ params }: Props) {
  const agent = getAgent(params.agentId)
  if (!agent) notFound()
  // notFound() throws, so agent is non-null here — cast to satisfy TypeScript
  return <InsuranceChat agent={agent!} />
}

export function generateMetadata({ params }: Props) {
  const agent = getAgent(params.agentId)
  if (!agent) return {}
  return {
    title: `Get a Quote — ${agent.name} | ${agent.agencyName}`,
    description: `Chat with ${agent.name}'s assistant to get a personalized insurance quote. Fast, easy, and no spam.`,
  }
}
