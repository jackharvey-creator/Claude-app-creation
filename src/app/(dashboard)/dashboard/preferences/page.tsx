'use client'

import { useState, useEffect } from 'react'
import { FiSave, FiCheck } from 'react-icons/fi'
import toast from 'react-hot-toast'

const LINES_OF_BUSINESS = [
  { value: 'AUTO', label: 'Auto Insurance', emoji: '🚗' },
  { value: 'HOME', label: 'Homeowners Insurance', emoji: '🏠' },
  { value: 'LIFE', label: 'Life Insurance', emoji: '💚' },
  { value: 'HEALTH', label: 'Health Insurance', emoji: '🏥' },
  { value: 'COMMERCIAL', label: 'Commercial Insurance', emoji: '🏢' },
  { value: 'UMBRELLA', label: 'Umbrella Insurance', emoji: '☂️' },
  { value: 'FLOOD', label: 'Flood Insurance', emoji: '🌊' },
  { value: 'MOTORCYCLE', label: 'Motorcycle Insurance', emoji: '🏍️' },
  { value: 'BOAT', label: 'Boat Insurance', emoji: '⛵' },
  { value: 'RV', label: 'RV Insurance', emoji: '🚐' },
  { value: 'RENTERS', label: 'Renters Insurance', emoji: '🔑' },
  { value: 'PET', label: 'Pet Insurance', emoji: '🐾' },
  { value: 'TRAVEL', label: 'Travel Insurance', emoji: '✈️' },
  { value: 'DISABILITY', label: 'Disability Insurance', emoji: '♿' },
  { value: 'LONG_TERM_CARE', label: 'Long-Term Care', emoji: '🏥' },
  { value: 'ANNUITIES', label: 'Annuities', emoji: '📈' },
  { value: 'MEDICARE', label: 'Medicare', emoji: '🩺' },
]

const TONES = [
  { value: 'PROFESSIONAL', label: 'Professional', desc: 'Formal, authoritative tone' },
  { value: 'FRIENDLY', label: 'Friendly', desc: 'Warm, approachable tone' },
  { value: 'EDUCATIONAL', label: 'Educational', desc: 'Informative, teaching tone' },
  { value: 'HUMOROUS', label: 'Humorous', desc: 'Light, witty tone' },
  { value: 'URGENT', label: 'Urgent', desc: 'Time-sensitive, action-driven' },
  { value: 'EMPATHETIC', label: 'Empathetic', desc: 'Understanding, caring tone' },
]

export default function PreferencesPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedLines, setSelectedLines] = useState<string[]>([])
  const [preferences, setPreferences] = useState({
    tone: 'PROFESSIONAL',
    includeHashtags: true,
    includeEmojis: false,
    includeCtA: true,
    targetAudience: '',
    weeklyEmailDay: 1,
    weeklyEmailTime: '09:00',
    autoApprove: false,
  })

  useEffect(() => {
    fetchPreferences()
  }, [])

  const fetchPreferences = async () => {
    try {
      const res = await fetch('/api/preferences')
      const data = await res.json()
      if (data.preferences) {
        setPreferences({
          tone: data.preferences.tone,
          includeHashtags: data.preferences.includeHashtags,
          includeEmojis: data.preferences.includeEmojis,
          includeCtA: data.preferences.includeCtA,
          targetAudience: data.preferences.targetAudience || '',
          weeklyEmailDay: data.preferences.weeklyEmailDay,
          weeklyEmailTime: data.preferences.weeklyEmailTime,
          autoApprove: data.preferences.autoApprove,
        })
      }
      if (data.linesOfBusiness) {
        setSelectedLines(data.linesOfBusiness.map((l: { line: string }) => l.line))
      }
    } catch {
      toast.error('Failed to load preferences')
    } finally {
      setLoading(false)
    }
  }

  const toggleLine = (value: string) => {
    setSelectedLines((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...preferences, linesOfBusiness: selectedLines }),
      })

      if (res.ok) {
        toast.success('Preferences saved!')
      } else {
        toast.error('Failed to save preferences')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="text-gray-500">Loading...</div></div>
  }

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Preferences</h2>
        <p className="text-gray-600 mt-1">Customize your content generation and posting preferences.</p>
      </div>

      {/* Lines of Business */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Lines of Business</h3>
        <p className="text-sm text-gray-600 mb-4">Select the insurance lines you sell. We&apos;ll generate content specifically for these areas.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {LINES_OF_BUSINESS.map((line) => {
            const isSelected = selectedLines.includes(line.value)
            return (
              <button
                key={line.value}
                onClick={() => toggleLine(line.value)}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 text-left text-sm font-medium transition-all ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <span>{line.emoji}</span>
                <span className="flex-1">{line.label}</span>
                {isSelected && <FiCheck className="h-4 w-4 text-primary-600" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content Tone */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Tone</h3>
        <p className="text-sm text-gray-600 mb-4">Choose the voice that best represents your brand.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TONES.map((tone) => (
            <button
              key={tone.value}
              onClick={() => setPreferences({ ...preferences, tone: tone.value })}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                preferences.tone === tone.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className="font-medium text-gray-900">{tone.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{tone.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Content Options */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Options</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.includeHashtags}
              onChange={(e) => setPreferences({ ...preferences, includeHashtags: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <p className="font-medium text-gray-900">Include Hashtags</p>
              <p className="text-sm text-gray-500">Add relevant hashtags to increase discoverability</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.includeEmojis}
              onChange={(e) => setPreferences({ ...preferences, includeEmojis: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <p className="font-medium text-gray-900">Include Emojis</p>
              <p className="text-sm text-gray-500">Add emojis to make posts more engaging</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.includeCtA}
              onChange={(e) => setPreferences({ ...preferences, includeCtA: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <p className="font-medium text-gray-900">Include Call-to-Action</p>
              <p className="text-sm text-gray-500">Add a CTA like &quot;Contact us today!&quot; or &quot;Get a free quote&quot;</p>
            </div>
          </label>
        </div>

        <div className="mt-6">
          <label htmlFor="audience" className="label">Target Audience Description</label>
          <textarea
            id="audience"
            value={preferences.targetAudience}
            onChange={(e) => setPreferences({ ...preferences, targetAudience: e.target.value })}
            className="input-field h-24 resize-none"
            placeholder="e.g., Homeowners in suburban areas aged 30-55, small business owners..."
          />
        </div>
      </div>

      {/* Weekly Email Settings */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Approval Email</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="emailDay" className="label">Send Day</label>
            <select
              id="emailDay"
              value={preferences.weeklyEmailDay}
              onChange={(e) => setPreferences({ ...preferences, weeklyEmailDay: Number(e.target.value) })}
              className="input-field"
            >
              {dayNames.map((day, i) => (
                <option key={i} value={i}>{day}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="emailTime" className="label">Send Time</label>
            <input
              id="emailTime"
              type="time"
              value={preferences.weeklyEmailTime}
              onChange={(e) => setPreferences({ ...preferences, weeklyEmailTime: e.target.value })}
              className="input-field"
            />
          </div>
        </div>
        <label className="flex items-center gap-3 cursor-pointer mt-4">
          <input
            type="checkbox"
            checked={preferences.autoApprove}
            onChange={(e) => setPreferences({ ...preferences, autoApprove: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <div>
            <p className="font-medium text-gray-900">Auto-Approve All Posts</p>
            <p className="text-sm text-gray-500">Skip the approval step and post automatically (not recommended)</p>
          </div>
        </label>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
          <FiSave className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  )
}
