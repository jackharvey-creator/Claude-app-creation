'use client'

import { useState } from 'react'

interface NearestJob { title: string; office: string; city: string; state: string; url: string; distanceMiles: number }

interface ResultScreenProps {
  passed: boolean; percentScore: number; rawScore: number; maxScore: number; firstName: string
  aiSummary?: string; aiStrengths?: string[]; aiConcerns?: string[]; aiRecommendation?: string
  nearestJob?: NearestJob | null
}

type ContactPref = 'email' | 'call' | 'text'

export function ResultScreen({ passed, firstName, aiSummary, aiStrengths, aiConcerns, nearestJob }: ResultScreenProps) {
  const [contactPref, setContactPref] = useState<ContactPref | null>(null)
  const prefLabel = contactPref === 'email' ? 'email' : contactPref === 'call' ? 'phone call' : contactPref === 'text' ? 'text message' : null

  if (passed) return (
    <div className="animate-fadeIn space-y-5">
      <div className="rounded-2xl p-7 text-center bg-green-50 border-2 border-green-200">
        <div className="inline-flex items-center justify-center rounded-full bg-green-100 mb-4" style={{ width: '72px', height: '72px' }}>
          <svg className="w-9 h-9 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-2xl font-extrabold text-green-800 leading-tight">You Look to Be a Great Fit, {firstName}!</h2>
        <p className="mt-3 text-green-700 text-sm">You matched well for our Insurance Sales Agent role. Our recruiting team will be in touch shortly.</p>
        <p className="mt-2 text-xs font-semibold text-green-600">✉ An interview invitation has been sent to your email.</p>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-800 mb-1">How would you prefer we contact you?</p>
        <p className="text-xs text-gray-500 mb-3">Our recruiting team will follow up soon — choose your preference:</p>
        <div className="grid grid-cols-3 gap-3">
          {(['email', 'call', 'text'] as ContactPref[]).map((pref) => {
            const labels: Record<ContactPref, { icon: string; label: string }> = { email: { icon: '✉', label: 'Email' }, call: { icon: '📞', label: 'Phone Call' }, text: { icon: '💬', label: 'Text Message' } }
            const { icon, label } = labels[pref]; const isSelected = contactPref === pref
            return (
              <button key={pref} onClick={() => setContactPref(pref)} className={`py-3 px-2 border-2 rounded-xl text-sm font-semibold transition-colors text-center leading-snug ${isSelected ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600 hover:border-blue-400 hover:bg-blue-50'}`}>
                <span className="block text-lg mb-1">{icon}</span>{label}
              </button>
            )
          })}
        </div>
      </div>
      {nearestJob && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h3 className="font-semibold text-blue-900 mb-1">Nearest Open Position</h3>
          <p className="text-blue-800 font-medium">{nearestJob.title}</p>
          <p className="text-sm text-blue-600">{nearestJob.office} — {nearestJob.city}, {nearestJob.state}</p>
          {nearestJob.distanceMiles > 0 && <p className="text-xs text-blue-500 mt-1">~{nearestJob.distanceMiles} miles from your location</p>}
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-gray-700 text-center mb-3">What would you like to do next?</p>
        {nearestJob && <a href={nearestJob.url} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-base mb-3">Apply to the Role Near You →</a>}
        <p className="text-center text-xs text-gray-400 my-2">— or —</p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-sm font-semibold text-gray-700">Be on the lookout for a call from Comparion directly.</p>
          <p className="text-xs text-gray-500 mt-1">{prefLabel ? <>Our team will reach out by <strong>{prefLabel}</strong>.</> : 'Select your contact preference above so we know how to reach you.'}</p>
        </div>
      </div>
      <p className="text-center text-xs text-gray-400">Your results have been shared with our recruiting team. We&apos;ll be in touch soon.</p>
      <p className="text-xs text-gray-400 border-t border-gray-100 pt-4 leading-relaxed"><strong className="text-gray-500">Disclaimer:</strong> This assessment is a matching tool only and does not constitute an offer of employment. Completing this assessment does not guarantee a job offer or interview. Qualifying responses are matched with open positions that candidates may choose to apply for.</p>
    </div>
  )

  return (
    <div className="animate-fadeIn space-y-5">
      {/* Honest, respectful result */}
      <div className="rounded-2xl p-7 text-center bg-gray-50 border-2 border-gray-200">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Thank you, {firstName}.</h2>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          We appreciate you taking the time to complete our career assessment. After reviewing your responses, we are not able to move forward with your application at this time.
        </p>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          This does not reflect on your overall abilities or potential — it simply means this particular role and timing may not be the right match.
        </p>
      </div>

      {/* Encouraging next steps */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
        <h3 className="font-semibold text-gray-800">What's next</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5 shrink-0">→</span>
            <span>Your results have been received. A member of our team may still reach out if a different opportunity becomes available.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5 shrink-0">→</span>
            <span>You're welcome to retake the assessment in 90 days if your situation or experience has changed.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5 shrink-0">→</span>
            <span>If you'd still like to explore opportunities, you can view our full careers page below.</span>
          </div>
        </div>
      </div>

      {/* Careers link */}
      <a
        href="https://www.comparioninsurance.com/careers"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 transition-colors text-sm"
      >
        View Comparion Careers Page →
      </a>

      <p className="text-xs text-gray-400 border-t border-gray-100 pt-4 leading-relaxed">
        <strong className="text-gray-500">Disclaimer:</strong> This assessment is a matching tool only and does not constitute a formal hiring decision. Results are based solely on your responses to this screening questionnaire.
      </p>
    </div>
  )
}
