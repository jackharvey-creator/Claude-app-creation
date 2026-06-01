import Anthropic from '@anthropic-ai/sdk'
import { QUESTIONS, type AssessmentAnswer } from './questions'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export interface EvaluationInput {
  firstName: string
  lastName: string
  answers: AssessmentAnswer[]
  rawScore: number
  maxScore: number
  percentScore: number
  passed: boolean
  resumeText?: string
  linkedInData?: {
    headline?: string
    summary?: string
    positions?: Array<{ title: string; company: string; duration: string }>
    skills?: string[]
  }
}

export interface EvaluationResult {
  summary: string
  strengths: string[]
  concerns: string[]
  recommendation: string
}

export async function evaluateCandidate(input: EvaluationInput): Promise<EvaluationResult> {
  const answerSummary = input.answers
    .map((a) => {
      const question = QUESTIONS.find((q) => q.id === a.questionId)
      const option = question?.options.find((o) => o.id === a.answerId)
      return `Q: ${question?.text}\nA: ${option?.text} (${a.points}/${Math.max(...(question?.options.map((o) => o.points) ?? [0]))} pts)`
    })
    .join('\n\n')

  const linkedInContext = input.linkedInData
    ? `\nLinkedIn Profile:\n- Headline: ${input.linkedInData.headline ?? 'N/A'}\n- Summary: ${input.linkedInData.summary ?? 'N/A'}\n- Recent Positions: ${input.linkedInData.positions?.map((p) => `${p.title} at ${p.company} (${p.duration})`).join(', ') ?? 'N/A'}\n- Skills: ${input.linkedInData.skills?.join(', ') ?? 'N/A'}`
    : ''

  const resumeContext = input.resumeText
    ? `\nResume Content:\n${input.resumeText.slice(0, 2000)}`
    : ''

  const prompt = `You are an expert recruiter for Comparion Insurance Agency evaluating a candidate for an Insurance Sales Agent position.\n\nCandidate: ${input.firstName} ${input.lastName}\nAssessment Score: ${input.rawScore}/${input.maxScore} (${input.percentScore}%) — ${input.passed ? 'PASSED' : 'DID NOT PASS'}\n\nAssessment Answers:\n${answerSummary}\n${linkedInContext}\n${resumeContext}\n\nBased on ALL available information, provide a concise candidate evaluation. Be honest and specific.\n\nRespond with a JSON object with exactly these fields:\n{\n  "summary": "2-3 sentence overall assessment of this candidate's fit for an insurance sales agent role",\n  "strengths": ["strength 1", "strength 2", "strength 3"],\n  "concerns": ["concern 1", "concern 2"],\n  "recommendation": "One sentence recommendation for the hiring manager"\n}`

  const stream = client.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    thinking: { type: 'adaptive' },
    messages: [{ role: 'user', content: prompt }],
    system:
      'You are a recruitment expert for Comparion Insurance. Evaluate candidates fairly and concisely. Always respond with valid JSON only — no markdown, no extra text.',
  })

  const response = await stream.finalMessage()

  const textBlock = response.content.find((b) => b.type === 'text')
  const raw = textBlock?.type === 'text' ? textBlock.text.trim() : '{}'

  try {
    const jsonStr = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
    const parsed = JSON.parse(jsonStr) as EvaluationResult
    return {
      summary: parsed.summary ?? '',
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      concerns: Array.isArray(parsed.concerns) ? parsed.concerns : [],
      recommendation: parsed.recommendation ?? '',
    }
  } catch {
    return {
      summary: `${input.firstName} scored ${input.percentScore}% on the readiness assessment.`,
      strengths: ['Completed the full assessment'],
      concerns: ['Unable to generate detailed AI analysis'],
      recommendation: input.passed
        ? 'Recommend reviewing profile and scheduling an interview.'
        : 'Score below threshold — review manually before proceeding.',
    }
  }
}
