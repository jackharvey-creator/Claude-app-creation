'use client'

import { useState } from 'react'
import Link from 'next/link'

const AGENT = {
  name: 'Jack Harvey',
  title: 'Agency Manager · Comparion Insurance',
  initials: 'JH',
  location: 'Greater Boston Area',
  connections: '500+ connections',
  followers: '847 followers',
}

const POST_CONTENT = [
  "🚀 I'm growing my team at Comparion Insurance — and you might be exactly who I'm looking for.",
  "I'm not looking for someone with years of experience. I'm looking for someone motivated, coachable, and hungry to build something real.",
  "Here's what we offer:\n✅ No prior insurance experience required\n✅ Full licensing support provided\n✅ Uncapped commission + performance bonuses\n✅ Flexible schedule with full training\n✅ Work under a nationally recognized brand",
  "Want to see if you're a fit? I set up a quick 90-second career assessment — no resume needed, no application form.",
  "👇 Click the link below. Answer 10 questions. Get an instant result.",
  "#InsuranceCareers #NowHiring #Comparion #SalesJobs #BostonJobs",
]

export default function Demo1Page() {
  const [activeTab, setActiveTab] = useState<'linkedin' | 'facebook'>('linkedin')
  const [copied, setCopied] = useState(false)

  const chatbotUrl = `/chatbot?source=${activeTab}-post&agent=jack-harvey&agency=comparion-boston`

  function copyLink() {
    navigator.clipboard.writeText(window.location.origin + chatbotUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen font-sans" style={{ background: '#F3F4F6' }}>

      {/* Demo banner */}
      <div className="text-white text-center text-xs font-semibold py-2 px-4 tracking-wide" style={{ background: '#003A7A' }}>
        SOCIAL RECRUITING DEMO — This shows how an agency manager's social post drives candidates into the chatbot
      </div>

      {/* Nav */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded" style={{ background: '#005BAC' }} />
            <span className="font-bold tracking-tight" style={{ color: '#005BAC' }}>
              Comparion<span className="font-light">Insurance</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/demo" className="text-xs text-gray-500 hover:text-blue-700 transition-colors">← Website Demo</Link>
            <Link
              href={chatbotUrl}
              className="px-4 py-2 rounded-lg text-white text-xs font-semibold transition-opacity hover:opacity-90"
              style={{ background: '#005BAC' }}
            >
              Experience as Candidate →
            </Link>
          </div>
        </div>
      </header>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 pt-10 pb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#005BAC' }}>Social Media Recruiting Flow</h1>
        <p className="text-gray-500 text-sm mb-8">Agency managers post to LinkedIn or Facebook with their unique link. Candidates self-screen in 90 seconds. You only hear from qualified matches.</p>
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { step: '1', icon: '📲', title: 'Manager Posts', body: 'Share the post below on your LinkedIn or Facebook. Each manager gets a unique tracked link.' },
            { step: '2', icon: '🖱️', title: 'Candidate Clicks', body: 'Interested candidates click the link in your post and take a 90-second AI-powered assessment.' },
            { step: '3', icon: '✅', title: 'Auto-Qualified', body: 'Qualified candidates are matched to your nearest opening and sent an interview invitation — automatically.' },
          ].map((s) => (
            <div key={s.step} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#005BAC' }}>Step {s.step}</div>
              <p className="font-semibold text-gray-900 text-sm mb-1">{s.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform tabs */}
      <section className="max-w-5xl mx-auto px-6 pb-10">
        <div className="flex items-center gap-1 mb-5 bg-white rounded-xl p-1 w-fit shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveTab('linkedin')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'linkedin' ? 'text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            style={activeTab === 'linkedin' ? { background: '#0A66C2' } : {}}
          >
            LinkedIn
          </button>
          <button
            onClick={() => setActiveTab('facebook')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'facebook' ? 'text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            style={activeTab === 'facebook' ? { background: '#1877F2' } : {}}
          >
            Facebook
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">

          {/* Social post mockup */}
          <div className="lg:col-span-3">
            {activeTab === 'linkedin' ? (
              <LinkedInPost chatbotUrl={chatbotUrl} />
            ) : (
              <FacebookPost chatbotUrl={chatbotUrl} />
            )}
          </div>

          {/* Sidebar: unique link panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">Your Unique Tracking Link</h3>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                Each agency manager gets their own link. Submissions are automatically tagged to your agency so you only see your candidates in the dashboard.
              </p>
              <div className="bg-gray-50 rounded-lg px-3 py-2.5 font-mono text-xs text-gray-700 break-all border border-gray-200 mb-3">
                yoursite.com{chatbotUrl}
              </div>
              <button
                onClick={copyLink}
                className="w-full py-2.5 rounded-lg text-white text-xs font-semibold transition-all"
                style={{ background: copied ? '#16a34a' : '#005BAC' }}
              >
                {copied ? '✓ Copied to Clipboard!' : 'Copy Link'}
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">What candidates see</h3>
              <div className="space-y-2 text-xs text-gray-600">
                {[
                  'Your name & agency in the chatbot header',
                  '10 quick qualification questions',
                  'Instant pass/fail determination',
                  'Nearest Comparion office matched by location',
                  'Qualified candidates receive interview invite',
                  'You get notified of every qualified match',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={chatbotUrl}
              className="block w-full py-3.5 rounded-xl text-white text-sm font-bold text-center transition-opacity hover:opacity-90"
              style={{ background: '#005BAC' }}
            >
              Experience It as a Candidate →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function LinkedInPost({ chatbotUrl }: { chatbotUrl: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Post header */}
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: '#005BAC' }}>
            {AGENT.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-gray-900 text-sm leading-tight hover:underline cursor-pointer">{AGENT.name}</p>
                <p className="text-xs text-gray-500 leading-tight">{AGENT.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{AGENT.location} · <span className="hover:underline cursor-pointer">2h</span> · 🌐</p>
              </div>
              <button className="text-xs font-semibold px-3 py-1 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors shrink-0">
                + Follow
              </button>
            </div>
          </div>
        </div>

        {/* Post body */}
        <div className="mt-3 text-sm text-gray-800 leading-relaxed space-y-2">
          {POST_CONTENT.map((para, i) => (
            <p key={i} style={{ whiteSpace: 'pre-line' }}>{para}</p>
          ))}
        </div>
      </div>

      {/* Link card */}
      <Link href={chatbotUrl} className="block border-t border-gray-100 hover:bg-gray-50 transition-colors">
        <div className="h-28 flex items-center justify-center text-white text-sm font-semibold" style={{ background: '#005BAC' }}>
          <div className="text-center px-4">
            <div className="text-2xl mb-1">🎯</div>
            <p className="font-bold">Comparion Career Assessment</p>
            <p className="text-white/70 text-xs mt-0.5">Find out if you're a great fit in 90 seconds</p>
          </div>
        </div>
        <div className="px-4 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-wide">comparioninsurance.com</p>
          <p className="font-semibold text-gray-900 text-sm">Are You a Fit for a Sales Career with Comparion?</p>
          <p className="text-xs text-gray-500 mt-0.5">Answer 10 quick questions and get an instant AI-powered match result — no resume required.</p>
        </div>
      </Link>

      {/* Engagement */}
      <div className="px-4 pb-1 pt-2">
        <div className="flex items-center justify-between text-xs text-gray-400 pb-2 border-b border-gray-100">
          <span>👍❤️ 47</span>
          <span>12 comments · 8 reposts</span>
        </div>
        <div className="flex pt-1">
          {['👍 Like', '💬 Comment', '🔁 Repost', '📤 Send'].map((action) => (
            <button key={action} className="flex-1 py-2 text-xs text-gray-500 font-medium hover:bg-gray-50 rounded-lg transition-colors">
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function FacebookPost({ chatbotUrl }: { chatbotUrl: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Post header */}
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: '#005BAC' }}>
            {AGENT.initials}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm hover:underline cursor-pointer">{AGENT.name}</p>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span>2h</span>
              <span>·</span>
              <span>🌐</span>
            </div>
          </div>
        </div>

        {/* Post body */}
        <div className="mt-3 text-sm text-gray-800 leading-relaxed space-y-2">
          {POST_CONTENT.map((para, i) => (
            <p key={i} style={{ whiteSpace: 'pre-line' }}>{para}</p>
          ))}
        </div>
      </div>

      {/* Link card */}
      <Link href={chatbotUrl} className="block hover:opacity-95 transition-opacity">
        <div className="h-32 flex items-center justify-center text-white" style={{ background: '#005BAC' }}>
          <div className="text-center px-4">
            <div className="text-3xl mb-1">🎯</div>
            <p className="font-bold text-base">Comparion Career Assessment</p>
            <p className="text-white/70 text-sm">90-second fit assessment · No resume needed</p>
          </div>
        </div>
        <div className="px-3 py-2.5 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-400 uppercase tracking-wide">COMPARIONINSURANCE.COM</p>
          <p className="font-semibold text-gray-900 text-sm leading-snug">Are You a Fit for a Sales Career with Comparion?</p>
        </div>
      </Link>

      {/* Engagement */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between text-xs text-gray-400 pb-2 border-b border-gray-100">
          <span>👍 ❤️ 34</span>
          <span>9 comments · 5 shares</span>
        </div>
        <div className="flex gap-1 pt-1">
          {[['👍', 'Like'], ['💬', 'Comment'], ['↗️', 'Share']].map(([icon, label]) => (
            <button key={label} className="flex-1 py-2 text-xs text-gray-500 font-semibold hover:bg-gray-50 rounded-lg flex items-center justify-center gap-1 transition-colors">
              <span>{icon}</span><span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
