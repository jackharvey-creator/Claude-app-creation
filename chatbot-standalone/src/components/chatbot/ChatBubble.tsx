'use client'

import { useState, useEffect } from 'react'
import { ChatBot } from './ChatBot'

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowPrompt(true), 2800)
    return () => clearTimeout(t)
  }, [])

  function open() { setShowPrompt(false); setIsOpen(true) }
  function close() { setIsOpen(false) }

  return (
    <>
      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-[430px] h-[88vh] max-h-[700px] flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-3.5 shrink-0" style={{ background: '#005BAC' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ background: '#005BAC' }}>C</div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">Comparion Career Assessment</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    <span className="text-white/60 text-xs">AI-Powered · 3 min</span>
                  </div>
                </div>
              </div>
              <button onClick={close} className="text-white/60 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-lg">✕</button>
            </div>

            {/* Chatbot content */}
            <div className="flex-1 overflow-y-auto bg-white">
              <ChatBot previewMode campaignSource="homepage-bubble" />
            </div>
          </div>
        </div>
      )}

      {/* Speech bubble prompt */}
      {!isOpen && showPrompt && (
        <div className="fixed bottom-[88px] right-6 z-40 w-72 animate-slideUp">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 relative">
            <button
              onClick={() => setShowPrompt(false)}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-400 hover:bg-gray-500 text-white text-xs flex items-center justify-center transition-colors"
            >✕</button>
            <p className="text-sm font-semibold text-gray-900 leading-snug">
              Interested in a sales career with Comparion?
            </p>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              Find out if you&apos;re a great fit in <strong>90 seconds</strong> — no resume required!
            </p>
            <button
              onClick={open}
              className="mt-3 w-full py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ background: '#005BAC' }}
            >
              Start My Free Assessment →
            </button>
          </div>
          {/* Pointer triangle */}
          <div className="absolute -bottom-[7px] right-9 w-3.5 h-3.5 bg-white border-r border-b border-gray-100 rotate-45" />
        </div>
      )}

      {/* Floating bubble button */}
      <button
        onClick={isOpen ? close : open}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 animate-bounceIn"
        style={{ background: isOpen ? '#003A7A' : '#005BAC' }}
        aria-label="Career Assessment"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>
    </>
  )
}
