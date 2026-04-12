'use client'

import { useState } from 'react'

interface NearestJob {
  title: string
  office: string
  city: string
  state: string
  url: string
  distanceMiles: number
}

interface ResultScreenProps {
  passed: boolean
  percentScore: number
  rawScore: number
  maxScore: number
  firstName: string
  aiSummary?: string
  aiStrengths?: string[]
  aiConcerns?: string[]
  aiRecommendation?: string
  nearestJob?: NearestJob | null
}

type ContactPref = 'email' | 'call' | 'text'

export function ResultScreen({
  passed,
  firstName,
  aiSummary,
  aiStrengths,
  aiConcerns,
  nearestJob,
}: ResultScreenProps) {
  const [contactPref, setContactPref] = useState<ContactPref | null>(null)

  const prefLabel =
    contactPref === 'email' ? 'email'
    : contactPref === 'call' ? 'phone call'
    : contactPref === 'text' ? 'text message'
    : null

  if (passed) {
    return (
      <div className="animate-fadeIn space-y-5">
        {/* Celebratory pass header */}
        <div className="rounded-2xl p-7 text-center bg-green-50 border-2 border-green-200">
          <div className="inline-flex items-center justify-center w-18 h-18 rounded-full bg-green-100 mb-4" style={{ width: '72px', height: '72px' }}>
            <svg className="w-9 h-9 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-green-800 leading-tight">
            You Look to Be a Great Fit, {firstName}!
          </h2>
          <p className="mt-3 text-green-700 text-sm">
            You matched well for our Insurance Sales Agent role. Our recruiting team will be in touch shortly.
          </p>
          <p className="mt-2 text-xs font-semibold text-green-600">
            ✉ An interview invitation has been sent to your email.
          </p>
        </div>

        {/* Contact preference */}
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-1">How would you prefer we contact you?</p>
          <p className="text-xs text-gray-500 mb-3">Our recruiting team will follow up soon — choose your preference:</p>
          <div className="grid grid-cols-3 gap-3">
            {(['email', 'call', 'text'] as ContactPref[]).map((pref) => {
              const labels: Record<ContactPref, { icon: string; label: string }> = {
                email: { icon: '✉', label: 'Email' },
                call: { icon: '📞', label: 'Phone Call' },
                text: { icon: '💬', label: 'Text Message' },
              }
              const { icon, label } = labels[pref]
              const isSelected = contactPref === pref
              return (
                <button
                  key={pref}
                  onClick={() => setContactPref(pref)}
                  className={`py-3 px-2 border-2 rounded-xl text-sm font-semibold transition-colors text-center leading-snug ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  <span className="block text-lg mb-1">{icon}</span>
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Nearest job */}
        {nearestJob && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h3 className="font-semibold text-blue-900 mb-1 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Nearest Open Position
            </h3>
            <p className="text-blue-800 font-medium">{nearestJob.title}</p>
            <p className="text-sm text-blue-600">{nearestJob.office} — {nearestJob.city}, {nearestJob.state}</p>
            {nearestJob.distanceMiles > 0 && (
              <p className="text-xs text-blue-500 mt-1">~{nearestJob.distanceMiles} miles from your location</p>
            )}
          </div>
        )}

        {/* Next steps */}
        <div>
          <p className="text-sm font-semibold text-gray-700 text-center mb-3">What would you like to do next?</p>
          {nearestJob && (
            <a
              href={nearestJob.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-base mb-3"
            >
              Apply to the Role Near You →
            </a>
          )}
          <p className="text-center text-xs text-gray-400 my-2">— or —</p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-sm font-semibold text-gray-700">Be on the lookout for a call from Comparion directly.</p>
            <p className="text-xs text-gray-500 mt-1">
              {prefLabel
                ? <>Our team will reach out by <strong>{prefLabel}</strong>.</>
                : 'Select your contact preference above so we know how to reach you.'}
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          Your results have been shared with our recruiting team. We&apos;ll be in touch soon.
        </p>
      </div>
    )
  }

  // Not a match
  return (
    <div className="animate-fadeIn space-y-5">
      <div className="rounded-2xl p-6 text-center bg-amber-50 border-2 border-amber-200">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
          <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-amber-800">Thanks for applying, {firstName}!</h2>
        <p className="mt-2 text-amber-700">
          Based on your responses, this role may not be the best fit right now.
        </p>
        <p className="mt-1 text-sm text-amber-600">
          We encourage you to check back as requirements evolve.
        </p>
      </div>

      {/* AI Summary (manager-only in production, shown here for context) */}
      {aiSummary && (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            AI Profile Summary
          </h3>
          <p className="text-sm text-gray-600">{aiSummary}</p>
        </div>
      )}

      {/* Strengths & Concerns */}
      {((aiStrengths && aiStrengths.length > 0) || (aiConcerns && aiConcerns.length > 0)) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aiStrengths && aiStrengths.length > 0 && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-green-800 mb-2">Strengths</h4>
              <ul className="space-y-1">
                {aiStrengths.map((s, i) => (
                  <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                    <span className="mt-0.5 text-green-500">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {aiConcerns && aiConcerns.length > 0 && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-amber-800 mb-2">Areas to Develop</h4>
              <ul className="space-y-1">
                {aiConcerns.map((c, i) => (
                  <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                    <span className="mt-0.5 text-amber-500">○</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {nearestJob && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-semibold text-blue-900 mb-1 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Nearest Open Position
          </h3>
          <p className="text-blue-800 font-medium">{nearestJob.title}</p>
          <p className="text-sm text-blue-600">{nearestJob.office} — {nearestJob.city}, {nearestJob.state}</p>
          {nearestJob.distanceMiles > 0 && (
            <p className="text-xs text-blue-500 mt-1">~{nearestJob.distanceMiles} miles from your location</p>
          )}
          <a
            href={nearestJob.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-900 underline underline-offset-2"
          >
            View Full Job Posting →
          </a>
        </div>
      )}

      <p className="text-center text-xs text-gray-400">
        Your results have been shared with our recruiting team. We&apos;ll be in touch soon.
      </p>
    </div>
  )
}
