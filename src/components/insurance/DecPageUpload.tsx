'use client'

import { useRef, useState } from 'react'

interface DecPageUploadProps {
  agentFirstName: string
  onUpload: (file: File) => void
  onSwitchToCanopy: () => void
}

export function DecPageUpload({ agentFirstName, onUpload, onSwitchToCanopy }: DecPageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function validateAndSet(file: File) {
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File must be under 10 MB.')
      return
    }
    setError(null)
    setSelectedFile(file)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) validateAndSet(file)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) validateAndSet(file)
  }

  return (
    <div className="mx-auto max-w-sm mt-2 mb-3">
      <div className="rounded-2xl border border-blue-100 bg-white overflow-hidden shadow-md">
        <div className="h-1 w-full bg-[#003087]" />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#003087]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-[#005EB8] bg-blue-50 border border-blue-100 px-2 py-1 rounded-full">
              PDF only · Max 10 MB
            </span>
          </div>

          <h3 className="text-[#003087] font-semibold text-base mb-1">Upload your declarations page</h3>
          <p className="text-gray-500 text-sm mb-4 leading-relaxed">
            {agentFirstName} will receive it as an attachment — no email required.
          </p>

          {/* Drop zone */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors duration-150 ${
              isDragging
                ? 'border-[#005EB8] bg-blue-50'
                : selectedFile
                ? 'border-emerald-300 bg-emerald-50'
                : 'border-blue-200 hover:border-[#005EB8] hover:bg-blue-50'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedFile ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-emerald-700 truncate max-w-[180px]">{selectedFile.name}</span>
              </div>
            ) : (
              <div>
                <svg className="w-8 h-8 text-blue-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-gray-500">Tap to browse or drag & drop</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}

          <button
            onClick={() => selectedFile && onUpload(selectedFile)}
            disabled={!selectedFile}
            className="w-full mt-4 py-3 rounded-xl bg-[#003087] text-white font-bold text-sm hover:bg-[#005EB8] disabled:opacity-30 disabled:cursor-not-allowed active:scale-[.98] transition-all duration-150"
          >
            Send to {agentFirstName} →
          </button>

          <button
            onClick={onSwitchToCanopy}
            className="w-full mt-2 py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Send me the secure link instead
          </button>
        </div>
      </div>
    </div>
  )
}
