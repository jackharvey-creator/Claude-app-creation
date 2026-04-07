export interface AnswerOption {
  id: string
  text: string
  points: number
}

export interface Question {
  id: string
  number: number
  text: string
  subtext?: string
  options: AnswerOption[]
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    number: 1,
    text: 'Are you currently licensed as an insurance agent, or willing to obtain your license?',
    subtext: 'A license is required within 90 days of hire.',
    options: [
      { id: 'a', text: 'Yes — I already hold an active insurance license', points: 4 },
      { id: 'b', text: "Yes — I'm willing to obtain my license within 90 days", points: 3 },
      { id: 'c', text: "I'm not sure yet", points: 1 },
      { id: 'd', text: "No — I'm not willing to obtain a license", points: 0 },
    ],
  },
  {
    id: 'q2',
    number: 2,
    text: 'How would you describe your sales experience?',
    options: [
      { id: 'a', text: '3+ years of professional sales (any industry)', points: 4 },
      { id: 'b', text: '1–3 years of sales experience', points: 3 },
      { id: 'c', text: 'Less than 1 year of sales experience', points: 2 },
      { id: 'd', text: 'No formal sales experience', points: 1 },
    ],
  },
  {
    id: 'q3',
    number: 3,
    text: 'How comfortable are you working in a commission-based compensation structure?',
    subtext: 'Insurance sales agents earn primarily through commissions and bonuses.',
    options: [
      { id: 'a', text: 'Very comfortable — I thrive on performance-based pay', points: 4 },
      { id: 'b', text: 'Comfortable with a mix of base pay + commission', points: 3 },
      { id: 'c', text: "I'm open to it but prefer more guaranteed income", points: 2 },
      { id: 'd', text: 'I strongly prefer a fixed salary', points: 0 },
    ],
  },
  {
    id: 'q4',
    number: 4,
    text: 'How do you feel about prospecting — reaching out to new potential clients?',
    options: [
      { id: 'a', text: 'I enjoy it and actively seek new clients', points: 4 },
      { id: 'b', text: "I'm comfortable with it and see it as part of the job", points: 3 },
      { id: 'c', text: "I'm willing to learn and improve this skill", points: 2 },
      { id: 'd', text: "I find cold outreach very uncomfortable", points: 0 },
    ],
  },
  {
    id: 'q5',
    number: 5,
    text: 'What is your availability for this role?',
    options: [
      { id: 'a', text: 'Full-time, 40+ hours per week', points: 4 },
      { id: 'b', text: 'Full-time, 30–40 hours per week', points: 3 },
      { id: 'c', text: 'Part-time, 20–30 hours per week', points: 2 },
      { id: 'd', text: 'Part-time, fewer than 20 hours per week', points: 1 },
    ],
  },
  {
    id: 'q6',
    number: 6,
    text: 'What is your primary motivation for pursuing a career in insurance sales?',
    options: [
      { id: 'a', text: 'Long-term career helping families protect what matters most', points: 4 },
      { id: 'b', text: 'High earning potential and financial independence', points: 3 },
      { id: 'c', text: 'Flexibility and work-life balance', points: 2 },
      { id: 'd', text: "I'm exploring my options right now", points: 1 },
    ],
  },
  {
    id: 'q7',
    number: 7,
    text: 'How would you rate your ability to explain complex concepts in simple, relatable terms?',
    options: [
      { id: 'a', text: 'Excellent — I do this naturally and regularly', points: 4 },
      { id: 'b', text: 'Good — I can do this with a bit of preparation', points: 3 },
      { id: 'c', text: "Fair — I'm still developing this skill", points: 2 },
      { id: 'd', text: 'I often struggle to simplify complex information', points: 1 },
    ],
  },
  {
    id: 'q8',
    number: 8,
    text: 'Do you have reliable transportation to meet with clients?',
    options: [
      { id: 'a', text: 'Yes — I have my own reliable vehicle', points: 4 },
      { id: 'b', text: 'Yes — I can use public transit or rideshare reliably', points: 3 },
      { id: 'c', text: 'I have limited but workable transportation options', points: 2 },
      { id: 'd', text: 'Transportation is a significant challenge for me', points: 0 },
    ],
  },
  {
    id: 'q9',
    number: 9,
    text: 'How do you typically respond when a potential client says "no" or rejects your offer?',
    options: [
      { id: 'a', text: "I see it as part of the process — it doesn't slow me down", points: 4 },
      { id: 'b', text: 'I take a moment to reflect, then move forward with energy', points: 3 },
      { id: 'c', text: "It's challenging, but I push through it", points: 2 },
      { id: 'd', text: 'Rejection is very discouraging and difficult for me', points: 0 },
    ],
  },
  {
    id: 'q10',
    number: 10,
    text: 'Are you able to pass a background check?',
    subtext: 'A clean background check is required to obtain an insurance license.',
    options: [
      { id: 'a', text: 'Yes — I have a clean background record', points: 4 },
      { id: 'b', text: 'Yes — I have minor issues that should not affect licensing', points: 2 },
      { id: 'c', text: "I'm not certain — I'd need to review my record", points: 1 },
      { id: 'd', text: 'I have issues that may prevent me from being licensed', points: 0 },
    ],
  },
]

export const MAX_SCORE = QUESTIONS.reduce(
  (sum, q) => sum + Math.max(...q.options.map((o) => o.points)),
  0
)

export const PASS_THRESHOLD_PERCENT = 65 // 65% to pass

export interface AssessmentAnswer {
  questionId: string
  answerId: string
  points: number
}

export function calculateScore(answers: AssessmentAnswer[]): {
  rawScore: number
  maxScore: number
  percentScore: number
  passed: boolean
} {
  const rawScore = answers.reduce((sum, a) => sum + a.points, 0)
  const percentScore = Math.round((rawScore / MAX_SCORE) * 100)
  return {
    rawScore,
    maxScore: MAX_SCORE,
    percentScore,
    passed: percentScore >= PASS_THRESHOLD_PERCENT,
  }
}
