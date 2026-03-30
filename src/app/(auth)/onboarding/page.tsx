'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiShield, FiCheck, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import toast from 'react-hot-toast'

const LINES_OF_BUSINESS = [
  { value: 'AUTO', label: 'Auto', emoji: '🚗' },
  { value: 'HOME', label: 'Home', emoji: '🏠' },
  { value: 'LIFE', label: 'Life', emoji: '💚' },
  { value: 'HEALTH', label: 'Health', emoji: '🏥' },
  { value: 'COMMERCIAL', label: 'Commercial', emoji: '🏢' },
  { value: 'UMBRELLA', label: 'Umbrella', emoji: '☂️' },
  { value: 'FLOOD', label: 'Flood', emoji: '🌊' },
  { value: 'MOTORCYCLE', label: 'Motorcycle', emoji: '🏍️' },
  { value: 'BOAT', label: 'Boat', emoji: '⛵' },
  { value: 'RV', label: 'RV', emoji: '🚐' },
  { value: 'RENTERS', label: 'Renters', emoji: '🔑' },
  { value: 'PET', label: 'Pet', emoji: '🐾' },
  { value: 'TRAVEL', label: 'Travel', emoji: '✈️' },
  { value: 'DISABILITY', label: 'Disability', emoji: '♿' },
  { value: 'LONG_TERM_CARE', label: 'Long-Term Care', emoji: '🏥' },
  { value: 'ANNUITIES', label: 'Annuities', emoji: '📈' },
  { value: 'MEDICARE', label: 'Medicare', emoji: '🩺' },
]

const TONES = [
  { value: 'PROFESSIONAL', label: 'Professional', desc: 'Authoritative & polished' },
  { value: 'FRIENDLY', label: 'Friendly', desc: 'Warm & approachable' },
  { value: 'EDUCATIONAL', label: 'Educational', desc: 'Informative & helpful' },
  { value: 'HUMOROUS', label: 'Humorous', desc: 'Light & witty' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [selectedLines, setSelectedLines] = useState<string[]>([])
  const [selectedTone, setSelectedTone] = useState('PROFESSIONAL')
  const [postsPerWeek, setPostsPerWeek] = useState(5)

  const toggleLine = (value: string) => {
    setSelectedLines((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const handleComplete = async () => {
    setSaving(true)
    try {
      // Save preferences
      await fetch('/api/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tone: selectedTone,
          includeHashtags: true,
          includeEmojis: false,
          includeCtA: true,
          weeklyEmailDay: 1,
          weeklyEmailTime: '09:00',
          autoApprove: false,
          linesOfBusiness: selectedLines,
        }),
      })

      // Save schedule
      await fetch('/api/schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postsPerWeek,
          preferredDays: [1, 2, 3, 4, 5],
          preferredTimes: ['09:00', '12:00', '17:00'],
          useAutoSchedule: true,
          timezone: 'America/New_York',
        }),
      })

      toast.success('Setup complete! Welcome to InsurePost!')
      router.push('/dashboard')
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const steps = [
    // Step 1: Lines of Business
    <div key="lines" className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">What insurance do you sell?</h2>
        <p className="text-gray-600 mt-2">Select all lines of business you offer. We&apos;ll create content for each.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
        {LINES_OF_BUSINESS.map((line) => {
          const isSelected = selectedLines.includes(line.value)
          return (
            <button
              key={line.value}
              onClick={() => toggleLine(line.value)}
              className={`flex items-center gap-2 p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <span>{line.emoji}</span>
              <span className="flex-1 text-left">{line.label}</span>
              {isSelected && <FiCheck className="h-4 w-4 text-primary-600" />}
            </button>
          )
        })}
      </div>
    </div>,

    // Step 2: Tone
    <div key="tone" className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">What&apos;s your brand voice?</h2>
        <p className="text-gray-600 mt-2">Choose the tone that best represents your agency.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
        {TONES.map((tone) => (
          <button
            key={tone.value}
            onClick={() => setSelectedTone(tone.value)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              selectedTone === tone.value
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="font-semibold text-gray-900">{tone.label}</p>
            <p className="text-sm text-gray-500 mt-1">{tone.desc}</p>
          </button>
        ))}
      </div>
    </div>,

    // Step 3: Frequency
    <div key="frequency" className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">How often do you want to post?</h2>
        <p className="text-gray-600 mt-2">We&apos;ll auto-schedule posts at optimal times.</p>
      </div>
      <div className="max-w-sm mx-auto text-center">
        <div className="text-6xl font-bold text-primary-600 mb-2">{postsPerWeek}</div>
        <p className="text-gray-600 mb-6">posts per platform per week</p>
        <input
          type="range"
          min={1}
          max={14}
          value={postsPerWeek}
          onChange={(e) => setPostsPerWeek(Number(e.target.value))}
          className="w-full accent-primary-600"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>1/week</span>
          <span>7/week</span>
          <span>14/week</span>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          We recommend 3-5 posts per week for optimal engagement.
        </p>
      </div>
    </div>,
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <FiShield className="h-10 w-10 text-primary-600 mx-auto" />
          <span className="text-2xl font-bold text-gray-900">InsurePost Setup</span>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step ? 'w-12 bg-primary-600' : i < step ? 'w-8 bg-primary-400' : 'w-8 bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="card min-h-[400px] flex flex-col">
          <div className="flex-1">{steps[step]}</div>

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="btn-secondary flex items-center gap-2">
                <FiArrowLeft className="h-4 w-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 0 && selectedLines.length === 0}
                className="btn-primary flex items-center gap-2"
              >
                Next <FiArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={saving}
                className="btn-success flex items-center gap-2"
              >
                {saving ? 'Setting up...' : 'Complete Setup'}
                <FiCheck className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
