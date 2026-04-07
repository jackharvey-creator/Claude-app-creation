'use client'

import { useEffect, useState } from 'react'
import { QUESTIONS, type AssessmentAnswer } from '@/lib/chatbot/questions'
import { ProgressBar } from './ProgressBar'
import { QuestionStep } from './QuestionStep'
import { ContactStep, type ContactInfo } from './ContactStep'
import { ProfileStep } from './ProfileStep'
import { ResultScreen } from './ResultScreen'

type Step =
  | { type: 'welcome' }
  | { type: 'contact' }
  | { type: 'questions'; index: number }
  | { type: 'profile' }
  | { type: 'submitting' }
  | { type: 'result'; data: AssessmentResult }
  | { type: 'error'; message: string }

interface AssessmentResult {
  passed: boolean
  percentScore: number
  rawScore: number
  maxScore: number
  aiSummary?: string
  aiStrengths?: string[]
  aiConcerns?: string[]
  aiRecommendation?: string
  nearestJob?: {
    title: string
    office: string
    city: string
    state: string
    url: string
    distanceMiles: number
  } | null
}

interface ProfileData {
  linkedInUrl?: string
  resumeFileName?: string
  resumeText?: string
  skipped?: boolean
}

interface ChatBotProps {
  campaignSource?: string
}

export function ChatBot({ campaignSource }: ChatBotProps) {
  const [step, setStep] = useState<Step>({ type: 'welcome' })
  const [contact, setContact] = useState<ContactInfo | null>(null)
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([])
  const [profile, setProfile] = useState<ProfileData>({})
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Request geolocation on mount (non-blocking)
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => null, // silently ignore — fallback to IP geolocation in API
        { timeout: 5000 }
      )
    }
  }, [])

  function handleContactComplete(info: ContactInfo) {
    setContact(info)
    setStep({ type: 'questions', index: 0 })
  }

  function handleAnswer(answer: AssessmentAnswer) {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    const nextIndex = (step as { type: 'questions'; index: number }).index + 1
    if (nextIndex < QUESTIONS.length) {
      setStep({ type: 'questions', index: nextIndex })
    } else {
      setStep({ type: 'profile' })
    }
  }

  async function handleProfileComplete(data: ProfileData) {
    setProfile(data)
    setStep({ type: 'submitting' })

    try {
      const body = {
        firstName: contact!.firstName,
        lastName: contact!.lastName,
        email: contact!.email,
        phone: contact!.phone || undefined,
        answers,
        latitude: location?.lat,
        longitude: location?.lng,
        linkedInUrl: data.linkedInUrl,
        resumeFileName: data.resumeFileName,
        resumeText: data.resumeText,
        campaignSource: campaignSource ?? (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('source') ?? undefined : undefined),
      }

      const res = await fetch('/api/chatbot/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const json = await res.json() as {
        success?: boolean
        result?: AssessmentResult
        error?: string
      }

      if (!json.success || !json.result) {
        setStep({ type: 'error', message: json.error ?? 'Something went wrong. Please try again.' })
        return
      }

      setStep({ type: 'result', data: json.result })
    } catch {
      setStep({ type: 'error', message: 'Network error. Please check your connection and try again.' })
    }
  }

  const currentQ = step.type === 'questions' ? QUESTIONS[step.index] : null
  const questionsAnswered = step.type === 'questions' ? step.index : answers.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Comparion Insurance</p>
            <p className="text-xs text-gray-500">Sales Agent Readiness Assessment</p>
          </div>
        </div>
        {step.type === 'questions' && (
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            {questionsAnswered}/{QUESTIONS.length} answered
          </span>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Progress bar for question steps */}
          {step.type === 'questions' && (
            <div className="mb-6">
              <ProgressBar
                current={step.index + 1}
                total={QUESTIONS.length}
                label={`Question ${step.index + 1} of ${QUESTIONS.length}`}
              />
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            {/* Welcome */}
            {step.type === 'welcome' && (
              <div className="animate-fadeIn text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  Join Our Team of Insurance Professionals
                </h1>
                <p className="text-gray-600 mb-2 text-sm leading-relaxed">
                  Take our <strong>2-minute readiness assessment</strong> to find out if you're a great fit for a career as an Insurance Sales Agent with Comparion Insurance.
                </p>
                <ul className="text-left text-sm text-gray-600 space-y-2 mb-6 bg-gray-50 rounded-xl p-4">
                  <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> 10 multiple-choice questions</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Instant AI-powered match decision</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> See the nearest open position near you</li>
                  <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Qualified candidates get an immediate interview invitation</li>
                </ul>
                <button
                  onClick={() => setStep({ type: 'contact' })}
                  className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors text-base"
                >
                  Start My Assessment →
                </button>
                <p className="mt-3 text-xs text-gray-400">
                  Takes about 2 minutes · No account required
                </p>
              </div>
            )}

            {/* Contact */}
            {step.type === 'contact' && (
              <ContactStep onComplete={handleContactComplete} />
            )}

            {/* Questions */}
            {step.type === 'questions' && currentQ && (
              <QuestionStep
                key={currentQ.id}
                question={currentQ}
                onAnswer={handleAnswer}
                selectedAnswerId={answers.find((a) => a.questionId === currentQ.id)?.answerId}
              />
            )}

            {/* Profile */}
            {step.type === 'profile' && (
              <ProfileStep onComplete={handleProfileComplete} />
            )}

            {/* Submitting */}
            {step.type === 'submitting' && (
              <div className="animate-fadeIn text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Evaluating your profile…</h2>
                <p className="text-sm text-gray-500">
                  Our AI is analyzing your responses and finding the best opportunity near you.
                </p>
                <div className="mt-6 space-y-2 text-xs text-gray-400">
                  <p>✓ Scoring your assessment</p>
                  <p>✓ Matching your location</p>
                  <p className="animate-pulse">⟳ Running AI evaluation…</p>
                </div>
              </div>
            )}

            {/* Result */}
            {step.type === 'result' && (
              <ResultScreen
                passed={step.data.passed}
                percentScore={step.data.percentScore}
                rawScore={step.data.rawScore}
                maxScore={step.data.maxScore}
                firstName={contact?.firstName ?? ''}
                aiSummary={step.data.aiSummary}
                aiStrengths={step.data.aiStrengths}
                aiConcerns={step.data.aiConcerns}
                aiRecommendation={step.data.aiRecommendation}
                nearestJob={step.data.nearestJob}
              />
            )}

            {/* Error */}
            {step.type === 'error' && (
              <div className="animate-fadeIn text-center py-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h2>
                <p className="text-sm text-gray-500 mb-5">{step.message}</p>
                <button
                  onClick={() => setStep({ type: 'submitting' })}
                  className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-4">
            © {new Date().getFullYear()} Comparion Insurance Agency · Powered by AI
          </p>
        </div>
      </main>
    </div>
  )
}
