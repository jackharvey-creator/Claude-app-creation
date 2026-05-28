'use client'

import { useState } from 'react'
import { AGENTS } from '@/lib/insurance/agents'
import { InsuranceChat } from '@/components/insurance/InsuranceChat'
import { StoryStrip } from '@/components/insurance/StoryStrip'

const DEMO_AGENT = AGENTS['demo']

const PIPELINE_STEPS = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    label: "Prospect taps agent's social link",
    sub: 'Instagram, Facebook, LinkedIn — any channel',
    highlight: false,
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    label: 'AI chat qualifies the lead',
    sub: 'Name, zip, coverage type, insured status, contact pref',
    highlight: false,
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Salesforce Lead created & assigned',
    sub: 'Auto-routed to the agent whose link was clicked',
    highlight: true,
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    label: 'Canopy Connect request fires automatically',
    sub: "Sent via the prospect's preferred channel — no agent action needed",
    highlight: true,
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    label: 'Agent receives a fully loaded lead',
    sub: 'Contact info + coverage intent + policy data — ready to quote',
    highlight: false,
  },
]

function AgentLeadCard() {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white overflow-hidden shadow-md">
      <div className="flex items-center justify-between px-4 py-3 bg-[#003087] border-b border-blue-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white font-semibold text-xs tracking-wide uppercase">New Lead</span>
        </div>
        <span className="text-blue-200 text-xs">Just now · Social Media</span>
      </div>

      <div className="p-4 space-y-3 text-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-gray-400 text-xs mb-0.5">Prospect</p>
            <p className="text-[#003087] font-semibold">Sarah M.</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs mb-0.5">ZIP Code</p>
            <p className="text-[#003087] font-semibold">78701</p>
          </div>
        </div>
        <div className="h-px bg-blue-50" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-gray-400 text-xs mb-0.5">Coverage</p>
            <p className="text-gray-800">Auto + Home</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs mb-0.5">Currently insured</p>
            <p className="text-emerald-600 font-medium">Yes</p>
          </div>
        </div>
        <div className="h-px bg-blue-50" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-gray-400 text-xs mb-0.5">Preferred contact</p>
            <p className="text-gray-800">📞 Call</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs mb-0.5">Phone</p>
            <p className="text-gray-800">(512) 555-••••</p>
          </div>
        </div>
        <div className="h-px bg-blue-50" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs mb-0.5">Canopy Connect</p>
            <p className="text-[#005EB8] text-xs font-medium">✓ Request sent · Awaiting completion</p>
          </div>
        </div>
        <div className="h-px bg-blue-50" />
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-xs">Assigned to</p>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#4a235a] flex items-center justify-center text-xs font-bold text-white">A</div>
            <span className="text-[#003087] text-xs font-medium">Alex Rivera</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 bg-blue-50 border-t border-blue-100 flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-[#005EB8] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-[#005EB8] text-xs">Zero manual entry. Routed directly from the prospect&apos;s chat session.</p>
      </div>
    </div>
  )
}

function MockAdScreen({ onTap }: { onTap: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] overflow-y-auto">
      {/* App header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-2.5 flex items-center justify-between z-10">
        <span className="text-lg font-black text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>Instagram</span>
        <div className="flex items-center gap-4">
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </div>

      {/* Stories */}
      <div className="bg-white border-b border-gray-100 py-3 px-3 flex gap-3">
        {[
          { name: 'Your story', add: true },
          { name: 'mike_r', add: false },
          { name: 'sarah.k', add: false },
          { name: 'j_lee', add: false },
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${s.add ? 'bg-gray-100 border-2 border-dashed border-gray-300' : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5'}`}>
              {s.add
                ? <span className="text-base text-gray-400">+</span>
                : <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center"><span className="text-[10px] text-gray-500 font-semibold">{s.name[0].toUpperCase()}</span></div>
              }
            </div>
            <span className="text-[9px] text-gray-500 w-11 text-center truncate">{s.name}</span>
          </div>
        ))}
      </div>

      {/* Organic post (partial, creates context of a feed) */}
      <div className="bg-white mb-1.5 border-b border-gray-100">
        <div className="flex items-center px-3 py-2 gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-300 to-blue-400 flex-shrink-0" />
          <span className="text-xs font-semibold text-gray-900">jamie_travels</span>
          <span className="ml-auto text-gray-400 text-lg leading-none">···</span>
        </div>
        <div className="h-28 bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center">
          <span className="text-3xl">🏖️✈️</span>
        </div>
        <div className="px-3 pt-2 pb-1 flex gap-3">
          <span className="text-base">🤍</span>
          <span className="text-base">💬</span>
        </div>
        <div className="px-3 pb-2">
          <p className="text-xs text-gray-700"><span className="font-semibold">jamie_travels</span> Finally on vacation! 🌊✨</p>
        </div>
      </div>

      {/* Sponsored ad */}
      <div className="bg-white">
        <div className="flex items-center px-3 py-2 gap-2">
          <div className="w-8 h-8 rounded-full bg-[#4a235a] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">A</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-gray-900">Alex Rivera · Insurance Agent</div>
            <div className="text-[10px] text-gray-400">Sponsored</div>
          </div>
          <span className="text-gray-400 text-lg leading-none">···</span>
        </div>

        <div className="bg-[#003087] px-5 py-6 text-center text-white">
          <div className="text-3xl mb-3">📈💸</div>
          <h3 className="text-base font-bold mb-2 leading-tight">
            Did your auto &amp; home insurance go up AGAIN this year?
          </h3>
          <p className="text-blue-200 text-xs leading-relaxed">
            Get a free quote from a local licensed agent in under 2 minutes. No spam. No data selling.
          </p>
        </div>

        <button
          onClick={onTap}
          className="w-full py-3 bg-white hover:bg-blue-50 active:scale-[.98] transition-all border-t border-gray-100 text-[#003087] font-bold text-sm flex items-center justify-center gap-2"
        >
          Get My Free Quote
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <div className="px-3 py-2 flex gap-3 items-center">
          <span className="text-base">🤍</span>
          <span className="text-base">💬</span>
          <p className="ml-auto text-[10px] text-gray-400 italic">Tap above to see how it works</p>
        </div>
      </div>
    </div>
  )
}

export default function QuotePreviewPage() {
  const [chatKey, setChatKey] = useState(0)
  const [flowDone, setFlowDone] = useState(false)
  const [adClicked, setAdClicked] = useState(false)

  function restart() {
    setChatKey((k) => k + 1)
    setFlowDone(false)
    setAdClicked(false)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── Preview banner ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 py-2.5 bg-[#003087] border-b border-blue-800">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-xs font-bold tracking-widest text-white uppercase flex-shrink-0">Live Demo</span>
          <span className="hidden sm:block text-blue-300 text-xs">·</span>
          <span className="hidden sm:block text-blue-200 text-xs truncate">
            Tap the ad in the demo to get started — this is exactly what your clients experience.
          </span>
        </div>
        <button
          onClick={restart}
          className="flex items-center gap-1.5 text-xs text-white border border-white/30 rounded-full px-3 py-1 hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Restart
        </button>
      </div>

      <div className="flex flex-col xl:flex-row min-h-[calc(100vh-45px)]">

        {/* ── Left: Story panel ──────────────────────────────────────────────── */}
        <div className="xl:w-[480px] flex-shrink-0 border-b xl:border-b-0 xl:border-r border-blue-100 bg-white px-6 pt-10 pb-4 xl:py-14 overflow-y-auto">

          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-8 h-8 rounded-lg bg-[#003087] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[#003087] tracking-wide">Agent in the Loop</span>
          </div>

          {/* Headline */}
          <div className="mb-8">
            <h1 className="text-3xl xl:text-4xl font-bold text-[#003087] leading-tight mb-3">
              First to market.<br />
              <span className="text-[#005EB8]">Zero manual steps.</span>
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              A hybrid acquisition experience where AI handles qualification and routing — and your licensed agents stay at the center of every quote, every relationship, every close.
            </p>
          </div>

          {/* Pipeline */}
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5">How it works</p>
            <div className="relative">
              <div className="absolute left-4 top-4 bottom-4 w-px bg-blue-100" />
              <div className="space-y-0">
                {PIPELINE_STEPS.map((s, i) => (
                  <div key={i} className="relative flex gap-4 pb-5 last:pb-0">
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      s.highlight
                        ? 'bg-[#003087] text-white shadow-md shadow-blue-200'
                        : 'bg-blue-50 border border-blue-200 text-[#005EB8]'
                    }`}>
                      {s.icon}
                    </div>
                    <div className="pt-1">
                      <p className={`text-sm font-medium mb-0.5 ${s.highlight ? 'text-[#003087]' : 'text-gray-700'}`}>
                        {s.label}
                        {s.highlight && (
                          <span className="ml-2 text-xs font-normal text-[#005EB8]">← automated</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400 leading-relaxed">{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            {[
              { stat: '~90 sec', label: 'Average chat completion' },
              { stat: '0', label: 'Manual steps for the agent' },
              { stat: '100%', label: 'Leads auto-assigned in Salesforce' },
              { stat: 'Existing', label: 'Canopy Connect setup — no changes' },
            ].map((f) => (
              <div key={f.label} className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <p className="text-[#003087] font-bold text-lg leading-tight">{f.stat}</p>
                <p className="text-gray-500 text-xs leading-snug mt-0.5">{f.label}</p>
              </div>
            ))}
          </div>

          {/* Story strip */}
          <div className="mb-0">
            <StoryStrip />
          </div>

          {/* Lead card — appears after demo completes */}
          <div className={flowDone ? 'mt-8' : 'hidden'}>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
              What lands in your agent&apos;s Salesforce queue
            </p>
            <AgentLeadCard />
          </div>

          {/* CTA */}
          <div className={`hidden xl:block mt-8 pt-8 border-t border-blue-100 transition-opacity duration-500 ${flowDone ? 'opacity-100' : 'opacity-60'}`}>
            {!flowDone && (
              <p className="text-xs text-gray-400 mb-3">
                Complete the demo chat to see what your agents receive in Salesforce →
              </p>
            )}
            <a
              href="#"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#003087] text-white font-bold text-sm hover:bg-[#005EB8] active:scale-[.98] transition-all duration-150 shadow-lg shadow-blue-200"
            >
              Get your agents set up
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className="text-center text-gray-400 text-xs mt-2">
              Works with your existing Salesforce + Canopy Connect setup
            </p>
          </div>
        </div>

        {/* ── Right: Live demo ───────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col items-center justify-start xl:justify-center bg-[#F0F6FF] px-4 pt-4 pb-8 xl:py-12">
          <div className="w-full max-w-sm">

            {/* Phone frame */}
            <div
              className="relative rounded-[2.8rem] border-[6px] border-[#1A2B4A] bg-white overflow-hidden"
              style={{ boxShadow: '0 0 0 1px rgba(0,48,135,0.1), 0 40px 80px rgba(0,48,135,0.2)' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1A2B4A] rounded-b-2xl z-10" />
              <div className="h-8 bg-[#003087]" />

              <div className="h-[590px] overflow-hidden relative">
                {!adClicked ? (
                  <MockAdScreen onTap={() => setAdClicked(true)} />
                ) : (
                  <InsuranceChat
                    key={chatKey}
                    agent={DEMO_AGENT}
                    onComplete={() => setFlowDone(true)}
                  />
                )}

                {flowDone && (
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-fadeIn">
                    <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-[#003087]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-[#003087] font-bold text-base text-center mb-2">Lead captured.</h3>
                    <p className="text-gray-500 text-xs text-center leading-relaxed mb-1">
                      Salesforce record created. Canopy Connect sent.
                    </p>
                    <p className="text-gray-400 text-xs text-center leading-relaxed mb-5">
                      See what landed in the agent&apos;s queue ←
                    </p>
                    <button
                      onClick={restart}
                      className="w-full py-2.5 rounded-xl border border-blue-200 text-[#005EB8] text-sm font-medium hover:bg-blue-50 transition-colors"
                    >
                      Run it again
                    </button>
                  </div>
                )}
              </div>

              <div className="h-8 bg-[#003087] flex items-center justify-center">
                <div className="w-24 h-1 bg-blue-400/40 rounded-full" />
              </div>
            </div>

            {/* URL bar */}
            <div className="mt-4 flex items-center gap-2 bg-white border border-blue-100 rounded-xl px-3 py-2.5 shadow-sm">
              <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-400 text-xs font-mono truncate">
                yoursite.com/quote/<span className="text-[#003087] font-semibold">alex-rivera</span>
              </span>
            </div>

            <p className="text-center text-gray-400 text-xs mt-2.5">
              Each agent gets their own unique link — shared anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
