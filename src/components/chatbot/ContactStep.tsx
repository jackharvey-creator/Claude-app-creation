'use client'

import { useState } from 'react'

export interface ContactInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface ContactStepProps {
  onComplete: (info: ContactInfo) => void
}

export function ContactStep({ onComplete }: ContactStepProps) {
  const [form, setForm] = useState<ContactInfo>({ firstName: '', lastName: '', email: '', phone: '' })
  const [errors, setErrors] = useState<Partial<ContactInfo>>({})

  function validate(): boolean {
    const e: Partial<ContactInfo> = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim()) e.lastName = 'Last name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'A valid email is required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) onComplete(form)
  }

  function field(name: keyof ContactInfo, label: string, type = 'text', placeholder = '') {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
          type={type}
          value={form[name]}
          onChange={(ev) => setForm((p) => ({ ...p, [name]: ev.target.value }))}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none transition-colors ${
            errors[name] ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
          }`}
        />
        {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
      </div>
    )
  }

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Let's get started</h2>
        <p className="mt-2 text-sm text-gray-500">
          Tell us a little about yourself before we begin the assessment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {field('firstName', 'First Name', 'text', 'Jane')}
          {field('lastName', 'Last Name', 'text', 'Smith')}
        </div>
        {field('email', 'Email Address', 'email', 'jane@example.com')}
        {field('phone', 'Phone Number (optional)', 'tel', '(555) 000-0000')}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors mt-2"
        >
          Begin Assessment →
        </button>
      </form>
    </div>
  )
}
