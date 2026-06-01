import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { CandidateAssessment } from '@prisma/client'

export const metadata: Metadata = {
  title: 'Recruitment Dashboard | Comparion Insurance',
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-700',
  EVALUATED: 'bg-blue-100 text-blue-700',
  PASSED: 'bg-green-100 text-green-700',
  FAILED: 'bg-red-100 text-red-700',
  INVITED: 'bg-purple-100 text-purple-700',
  HIRED: 'bg-emerald-100 text-emerald-700',
  REJECTED: 'bg-orange-100 text-orange-700',
}

function ScoreBadge({ pct, passed }: { pct: number; passed: boolean }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${
      passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`}>
      {pct}%
    </span>
  )
}

export default async function RecruitmentPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const [assessments, _stats] = await Promise.all([
    prisma.candidateAssessment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    }),
    prisma.candidateAssessment.groupBy({
      by: ['status'],
      _count: true,
    }),
  ])

  const total = assessments.length
  const passed = assessments.filter((a) => a.passed).length
  const invited = assessments.filter((a) => a.status === 'INVITED' || a.status === 'HIRED').length
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0

  const chatbotUrl = `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/chatbot`

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Insurance Sales Agent candidate assessments</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm">
              <p className="text-gray-500 text-xs mb-0.5">Chatbot Link</p>
              <a
                href={chatbotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium truncate max-w-xs block"
              >
                {chatbotUrl}
              </a>
            </div>
            <a
              href={`${chatbotUrl}?preview=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Preview Chatbot
            </a>
          </div>
        </div>

        {/* Shareable links */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h2 className="font-semibold text-gray-800 mb-3">Shareable Assessment Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: 'Direct / Generic', source: 'direct' },
              { label: 'LinkedIn Ad', source: 'linkedin_ad' },
              { label: 'Indeed Posting', source: 'indeed' },
              { label: 'Facebook Ad', source: 'facebook_ad' },
              { label: 'Email Campaign', source: 'email' },
              { label: 'SMS Campaign', source: 'sms' },
            ].map(({ label, source }) => (
              <div key={source} className="bg-gray-50 rounded-lg px-3 py-2 text-xs">
                <p className="font-medium text-gray-600 mb-1">{label}</p>
                <code className="text-blue-600 break-all">{chatbotUrl}?source={source}</code>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Append <code>?source=</code> to track where candidates are coming from.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Candidates', value: total, color: 'text-gray-800' },
            { label: 'Passed', value: passed, color: 'text-green-700' },
            { label: 'Interview Invited', value: invited, color: 'text-purple-700' },
            { label: 'Pass Rate', value: `${passRate}%`, color: passRate >= 50 ? 'text-green-700' : 'text-amber-700' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Candidates table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Candidates ({total})</h2>
          </div>
          {assessments.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-400 text-sm">No candidates yet. Share your chatbot link to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Candidate</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Score</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Nearest Office</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Source</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map((a: CandidateAssessment) => {
                    const prefillParams = new URLSearchParams({
                      firstName: a.firstName,
                      lastName: a.lastName,
                      email: a.email,
                      phone: a.phone ?? '',
                      city: a.city ?? '',
                      state: a.state ?? '',
                      source: a.campaignSource ?? 'chatbot',
                    })
                    const applyUrl = `${a.nearestJobUrl ?? 'https://www.comparioninsurance.com/careers'}?${prefillParams.toString()}`

                    return (
                      <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-gray-900">{a.firstName} {a.lastName}</p>
                          <p className="text-gray-500 text-xs">{a.email}</p>
                          {a.phone && <p className="text-gray-400 text-xs">{a.phone}</p>}
                        </td>
                        <td className="px-4 py-3.5">
                          <ScoreBadge pct={a.percentScore} passed={a.passed} />
                          <p className="text-xs text-gray-400 mt-0.5">{a.rawScore}/{a.maxScore} pts</p>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                            STATUS_COLORS[a.status] ?? 'bg-gray-100 text-gray-600'
                          }`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-gray-600 text-xs">
                          {a.city && a.state ? `${a.city}, ${a.state}` : '—'}
                        </td>
                        <td className="px-4 py-3.5 text-gray-600 text-xs">
                          {a.nearestOffice ?? '—'}
                          {a.distanceMiles ? <span className="text-gray-400 ml-1">({a.distanceMiles} mi)</span> : null}
                        </td>
                        <td className="px-4 py-3.5">
                          {a.campaignSource ? (
                            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
                              {a.campaignSource}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">direct</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-gray-500 text-xs whitespace-nowrap">
                          {new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <a href={`mailto:${a.email}`} className="text-xs text-blue-600 hover:underline">Email</a>
                            <a href={applyUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline">Apply↗</a>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* AI Summaries */}
        {assessments.filter((a) => a.aiSummary && a.passed).length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold text-gray-800 mb-3">Top Candidate AI Summaries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessments
                .filter((a) => a.aiSummary && a.passed)
                .slice(0, 4)
                .map((a: CandidateAssessment) => (
                  <div key={a.id} className="bg-white rounded-xl border border-green-200 p-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">{a.firstName} {a.lastName}</p>
                      <ScoreBadge pct={a.percentScore} passed={a.passed} />
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{a.aiSummary}</p>
                    {(a.aiStrengths as string[])?.length > 0 && (
                      <div className="text-xs text-green-700 space-y-1">
                        {(a.aiStrengths as string[]).map((s, i) => (
                          <p key={i}>✓ {s}</p>
                        ))}
                      </div>
                    )}
                    {a.aiRecommendation && (
                      <p className="mt-2 text-xs text-blue-600 font-medium italic">{a.aiRecommendation}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
