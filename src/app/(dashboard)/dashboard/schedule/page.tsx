'use client'

import { useState, useEffect } from 'react'
import { FiSave, FiClock, FiZap, FiCalendar } from 'react-icons/fi'
import toast from 'react-hot-toast'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const OPTIMAL_TIMES: Record<string, { time: string; label: string; reason: string }[]> = {
  FACEBOOK: [
    { time: '09:00', label: '9:00 AM', reason: 'Peak morning engagement' },
    { time: '13:00', label: '1:00 PM', reason: 'Lunch break browsing' },
    { time: '16:00', label: '4:00 PM', reason: 'Afternoon wind-down' },
  ],
  INSTAGRAM: [
    { time: '07:00', label: '7:00 AM', reason: 'Early morning scroll' },
    { time: '12:00', label: '12:00 PM', reason: 'Midday engagement peak' },
    { time: '19:00', label: '7:00 PM', reason: 'Evening browsing' },
  ],
  LINKEDIN: [
    { time: '08:00', label: '8:00 AM', reason: 'Pre-work professional browsing' },
    { time: '10:00', label: '10:00 AM', reason: 'Mid-morning business hours' },
    { time: '17:00', label: '5:00 PM', reason: 'End of workday' },
  ],
  TWITTER: [
    { time: '08:00', label: '8:00 AM', reason: 'Morning news cycle' },
    { time: '12:00', label: '12:00 PM', reason: 'Lunch break engagement' },
    { time: '17:00', label: '5:00 PM', reason: 'Evening commute' },
  ],
}

interface ScheduleSettings {
  postsPerWeek: number
  preferredDays: number[]
  preferredTimes: string[]
  useAutoSchedule: boolean
  timezone: string
}

export default function SchedulePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<ScheduleSettings>({
    postsPerWeek: 5,
    preferredDays: [1, 2, 3, 4, 5],
    preferredTimes: ['09:00', '12:00', '17:00'],
    useAutoSchedule: true,
    timezone: 'America/New_York',
  })
  const [customTime, setCustomTime] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/schedule')
      const data = await res.json()
      if (data) {
        setSettings(data)
      }
    } catch {
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        toast.success('Schedule settings saved!')
      } else {
        toast.error('Failed to save')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const toggleDay = (day: number) => {
    setSettings((prev) => ({
      ...prev,
      preferredDays: prev.preferredDays.includes(day)
        ? prev.preferredDays.filter((d) => d !== day)
        : [...prev.preferredDays, day].sort(),
    }))
  }

  const addTime = (time: string) => {
    if (!settings.preferredTimes.includes(time)) {
      setSettings((prev) => ({
        ...prev,
        preferredTimes: [...prev.preferredTimes, time].sort(),
      }))
    }
  }

  const removeTime = (time: string) => {
    setSettings((prev) => ({
      ...prev,
      preferredTimes: prev.preferredTimes.filter((t) => t !== time),
    }))
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="text-gray-500">Loading...</div></div>
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Schedule Settings</h2>
        <p className="text-gray-600 mt-1">Configure when and how often your content gets posted.</p>
      </div>

      {/* Auto Schedule Toggle */}
      <div className="card">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-amber-50">
            <FiZap className="h-6 w-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Smart Auto-Schedule</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Let InsurePost automatically pick the best times to post for maximum engagement.
                  We analyze your audience&apos;s activity patterns and space out posts optimally.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={settings.useAutoSchedule}
                  onChange={(e) => setSettings({ ...settings, useAutoSchedule: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Posts per week */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Posting Frequency</h3>
        <div>
          <label htmlFor="postsPerWeek" className="label">Posts per week (per platform)</label>
          <div className="flex items-center gap-4">
            <input
              id="postsPerWeek"
              type="range"
              min={1}
              max={14}
              value={settings.postsPerWeek}
              onChange={(e) => setSettings({ ...settings, postsPerWeek: Number(e.target.value) })}
              className="flex-1 accent-primary-600"
            />
            <span className="text-2xl font-bold text-primary-600 w-12 text-center">{settings.postsPerWeek}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Recommended: 3-5 posts/week for optimal engagement without overwhelming followers.
          </p>
        </div>
      </div>

      {/* Preferred Days */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Posting Days</h3>
        <div className="flex flex-wrap gap-2">
          {DAYS.map((day, i) => (
            <button
              key={day}
              onClick={() => toggleDay(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                settings.preferredDays.includes(i)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Preferred Times */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Posting Times</h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {settings.preferredTimes.map((time) => (
            <span key={time} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
              <FiClock className="h-3.5 w-3.5" />
              {time}
              <button onClick={() => removeTime(time)} className="hover:text-red-600 ml-1">&times;</button>
            </span>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="time"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            className="input-field w-40"
          />
          <button
            onClick={() => { if (customTime) { addTime(customTime); setCustomTime('') } }}
            className="btn-secondary text-sm"
          >
            Add Time
          </button>
        </div>

        {/* Optimal time suggestions */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FiZap className="h-4 w-4 text-amber-500" />
            Suggested Optimal Times by Platform
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(OPTIMAL_TIMES).map(([platform, times]) => (
              <div key={platform} className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-2">{platform.charAt(0) + platform.slice(1).toLowerCase()}</p>
                {times.map((t) => (
                  <button
                    key={t.time}
                    onClick={() => addTime(t.time)}
                    className="flex items-center justify-between w-full text-left px-2 py-1.5 rounded hover:bg-white text-sm transition-colors"
                  >
                    <span className="text-gray-700">{t.label} - <span className="text-gray-500">{t.reason}</span></span>
                    {settings.preferredTimes.includes(t.time) ? (
                      <span className="text-green-500 text-xs">Added</span>
                    ) : (
                      <span className="text-primary-600 text-xs">+ Add</span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timezone */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Timezone</h3>
        <select
          value={settings.timezone}
          onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
          className="input-field max-w-xs"
        >
          <option value="America/New_York">Eastern Time (ET)</option>
          <option value="America/Chicago">Central Time (CT)</option>
          <option value="America/Denver">Mountain Time (MT)</option>
          <option value="America/Los_Angeles">Pacific Time (PT)</option>
          <option value="America/Anchorage">Alaska Time (AKT)</option>
          <option value="Pacific/Honolulu">Hawaii Time (HT)</option>
        </select>
      </div>

      {/* Preview */}
      <div className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <FiCalendar className="h-5 w-5 text-primary-600" />
          Schedule Preview
        </h3>
        <p className="text-sm text-gray-600">
          With your current settings, InsurePost will generate <strong>{settings.postsPerWeek} posts per platform per week</strong>,
          scheduled across <strong>{settings.preferredDays.length} days</strong> at <strong>{settings.preferredTimes.length} time slot(s)</strong>.
          {settings.useAutoSchedule && ' Smart scheduling will optimize exact times based on your audience activity.'}
        </p>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
          <FiSave className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save Schedule'}
        </button>
      </div>
    </div>
  )
}
