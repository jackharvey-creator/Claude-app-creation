'use client'

import { useState } from 'react'
import { AGENTS } from '@/lib/insurance/agents'
import { InsuranceChat } from '@/components/insurance/InsuranceChat'

const DEMO_AGENT = AGENTS['demo']

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Your name, your brand',
    body: 'Every prospect sees your name, agency, and license info — not a generic call center.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Pre-qualified leads only',
    body: 'The bot filters intent, coverage type, and contact preference before a lead ever reaches you.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: 'Canopy Connect built in',
    body: "Prospects share their current policy in 10 seconds — so you quote accurately without a 30-minute phone call.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Mobile-first for social traffic',
    body: 'Built for the phone. When someone taps your Instagram link, this is exactly what they see.',
  },
]

export default function QuotePreviewPage() {
  const [chatKey, setChatKey] = useState(0)
  const [flowDone, setFlowDone] = useState(false)

  function restart() {
    setChatKey((k) => k + 1)
    setFlowDone(false)
  }

  return (
    <div className="min-h-screen bg-[#080c14] text-white">

      {/* ── Top preview banner ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 py-2.5 bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-sm">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase flex-shrink-0">
            Agent Preview
          </span>
          <span className="hidden sm:block text-gray-500 text-xs">·</span>
          <span className="hidden sm:block text-gray-400 text-xs truncate">
            This is what your clients see when they tap your personalized link.
          </span>
        </div>
        <button
          onClick={restart}
          className="flex items-center gap-1.5 text-xs text-amber-400 border border-amber-500/40 rounded-full px-3 py-1 hover:bg-amber-500/10 active:bg-amber-500/20 transition-colors flex-shrink-0"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Restart demo
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-45px)]">

        {/* ── Left: value prop panel ─────────────────────────────────────────── */}
        <aside className="lg:w-[380px] xl:w-[420px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-white/8 bg-[#0a0f1a] px-6 py-8 lg:py-12 flex flex-col justify-between">
          <div>
            {/* Logo mark */}
            <div className="flex items-center gap-2.5 mb-10">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-300 tracking-wide">InsurePost</span>
            </div>

            <h1 className="text-2xl xl:text-3xl font-bold text-white leading-tight mb-3">
              Your clients deserve a better first impression.
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Share one link on social. Prospects land in a warm, professional chat that qualifies them and routes the lead directly to you — with Canopy Connect already embedded.
            </p>

            {/* Feature list */}
            <ul className="space-y-5">
              {FEATURES.map((f) => (
                <li key={f.title} className="flex gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1a2235] border border-white/8 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                    {f.icon}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-0.5">{f.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-10 pt-8 border-t border-white/8">
            <p className="text-xs text-gray-500 mb-3">
              The demo runs with a placeholder agent (Alex Rivera). Your version uses your name, photo, and Canopy Connect link.
            </p>
            <a
              href="#"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-gray-900 font-bold text-sm hover:from-amber-400 hover:to-amber-300 active:scale-[.98] transition-all duration-150 shadow-lg shadow-amber-900/30"
            >
              Get my personalized link
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className="text-center text-gray-600 text-xs mt-2">Licensed agents only · Setup in 5 minutes</p>
          </div>
        </aside>

        {/* ── Right: live chat demo ──────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col items-center justify-start lg:justify-center bg-[#080c14] px-4 py-6 lg:py-8">

          {/* Phone frame on lg+ */}
          <div className="w-full max-w-sm lg:max-w-[375px]">
            {/* Frame chrome */}
            <div className="relative rounded-[2.8rem] border-[6px] border-gray-700 bg-[#0d1117] shadow-2xl shadow-black/60 overflow-hidden"
              style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.8)' }}
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-700 rounded-b-2xl z-10" />

              {/* Status bar spacer */}
              <div className="h-8 bg-[#0d1421]" />

              {/* Chat — fixed height so it scrolls inside the frame */}
              <div className="h-[600px] overflow-hidden relative">
                <InsuranceChat
                  key={chatKey}
                  agent={DEMO_AGENT}
                  onComplete={() => setFlowDone(true)}
                />

                {/* Completion overlay */}
                {flowDone && (
                  <div className="absolute inset-0 bg-[#080c14]/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-fadeIn">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-base text-center mb-2">That's the full experience.</h3>
                    <p className="text-gray-400 text-xs text-center leading-relaxed mb-5">
                      Every lead captured here routes to your dashboard — name, zip, coverage type, contact preference, and Canopy Connect status.
                    </p>
                    <button
                      onClick={restart}
                      className="w-full py-2.5 rounded-xl border border-amber-500/40 text-amber-400 text-sm font-medium hover:bg-amber-500/10 transition-colors mb-2"
                    >
                      Replay the demo
                    </button>
                    <a
                      href="#"
                      className="w-full py-2.5 rounded-xl bg-amber-500 text-gray-900 text-sm font-bold text-center hover:bg-amber-400 transition-colors"
                    >
                      Get my personalized link →
                    </a>
                  </div>
                )}
              </div>

              {/* Home indicator */}
              <div className="h-8 bg-[#0d1421] flex items-center justify-center">
                <div className="w-24 h-1 bg-gray-600 rounded-full" />
              </div>
            </div>

            {/* URL bar below frame */}
            <div className="mt-4 flex items-center gap-2 bg-[#111827] border border-white/8 rounded-xl px-3 py-2">
              <svg className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-500 text-xs font-mono truncate">
                yoursite.com/quote/
                <span className="text-amber-400">your-name</span>
              </span>
            </div>

            <p className="text-center text-gray-600 text-xs mt-3">
              ↑ Each agent gets their own unique URL
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
