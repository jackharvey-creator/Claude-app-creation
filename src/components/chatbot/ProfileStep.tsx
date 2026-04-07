'use client'

import { useRef, useState } from 'react'

interface ProfileData {
  linkedInUrl?: string
  resumeFileName?: string
  resumeText?: string
  skipped?: boolean
}

interface ProfileStepProps {
  onComplete: (data: ProfileData) => void
}

export function ProfileStep({ onComplete }: ProfileStepProps) {
  const [mode, setMode] = useState<'choose' | 'linkedin' | 'resume'>('choose')
  const [linkedInUrl, setLinkedInUrl] = useState('')
  const [urlError, setUrlError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function validateLinkedIn() {
    const trimmed = linkedInUrl.trim()
    if (!trimmed) {
      setUrlError('Please enter your LinkedIn URL')
      return
    }
    if (!trimmed.includes('linkedin.com/in/')) {
      setUrlError('Please enter a valid LinkedIn profile URL (linkedin.com/in/...)')
      return
    }
    setUrlError('')
    onComplete({ linkedInUrl: trimmed })
  }

  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError('')

    const formData = new FormData()
    formData.append('resume', file)

    try {
      const res = await fetch('/api/chatbot/upload-resume', { method: 'POST', body: formData })
      const data = await res.json() as { success?: boolean; fileName?: string; resumeText?: string; error?: string }

      if (!data.success || data.error) {
        setUploadError(data.error ?? 'Upload failed. Please try again.')
        return
      }

      setUploadedFile(data.fileName ?? file.name)
      setTimeout(() => {
        onComplete({ resumeFileName: data.fileName, resumeText: data.resumeText })
      }, 600)
    } catch {
      setUploadError('Network error. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  if (mode === 'choose') {
    return (
      <div className="animate-fadeIn">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Tell us more about your background</h2>
          <p className="mt-2 text-sm text-gray-500">
            Connect your LinkedIn profile or upload your resume so we can personalize your match. This step is optional.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setMode('linkedin')}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0A66C2] flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Connect LinkedIn</p>
              <p className="text-sm text-gray-500">Auto-pull your work history and profile</p>
            </div>
          </button>

          <button
            onClick={() => setMode('resume')}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Upload Resume</p>
              <p className="text-sm text-gray-500">PDF, DOC, DOCX, or TXT — up to 5 MB</p>
            </div>
          </button>

          <button
            onClick={() => onComplete({ skipped: true })}
            className="w-full text-center px-5 py-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Skip this step →
          </button>
        </div>
      </div>
    )
  }

  if (mode === 'linkedin') {
    return (
      <div className="animate-fadeIn">
        <button onClick={() => setMode('choose')} className="text-sm text-blue-600 mb-4 flex items-center gap-1">
          ← Back
        </button>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Enter your LinkedIn URL</h2>
        <p className="text-sm text-gray-500 mb-6">
          You can find this by going to your LinkedIn profile and copying the URL from your browser.
        </p>

        <div className="space-y-3">
          <input
            type="url"
            value={linkedInUrl}
            onChange={(e) => setLinkedInUrl(e.target.value)}
            placeholder="https://linkedin.com/in/your-name"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
            onKeyDown={(e) => e.key === 'Enter' && validateLinkedIn()}
          />
          {urlError && <p className="text-red-500 text-sm">{urlError}</p>}

          <button
            onClick={validateLinkedIn}
            className="w-full py-3 bg-[#0A66C2] text-white font-semibold rounded-xl hover:bg-[#004182] transition-colors"
          >
            Connect LinkedIn
          </button>
        </div>
      </div>
    )
  }

  // Resume upload
  return (
    <div className="animate-fadeIn">
      <button onClick={() => setMode('choose')} className="text-sm text-blue-600 mb-4 flex items-center gap-1">
        ← Back
      </button>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload your resume</h2>
      <p className="text-sm text-gray-500 mb-6">Accepted: PDF, DOC, DOCX, TXT — Max 5 MB</p>

      <div
        onClick={() => fileRef.current?.click()}
        className={`
          w-full border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
          ${uploadedFile ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'}
        `}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Uploading...</p>
          </div>
        ) : uploadedFile ? (
          <div className="flex flex-col items-center gap-2">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="font-medium text-green-700">{uploadedFile}</p>
            <p className="text-sm text-green-600">Resume uploaded successfully!</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="font-medium text-gray-700">Click to upload your resume</p>
            <p className="text-sm text-gray-400">or drag and drop</p>
          </div>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
        onChange={handleResumeUpload}
      />

      {uploadError && <p className="mt-3 text-red-500 text-sm">{uploadError}</p>}
    </div>
  )
}
