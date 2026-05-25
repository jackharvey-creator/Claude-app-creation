'use client'

interface CanopyConnectCardProps {
  url: string
  agentFirstName: string
  onSkip: () => void
  onConnect: () => void
}

export function CanopyConnectCard({
  url,
  agentFirstName,
  onSkip,
  onConnect,
}: CanopyConnectCardProps) {
  function handleConnect() {
    window.open(url, '_blank', 'noopener,noreferrer')
    onConnect()
  }

  return (
    <div className="mx-auto max-w-sm">
      <div className="rounded-2xl border border-amber-500/30 bg-[#1a1f2e] overflow-hidden shadow-xl shadow-black/40">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-500 to-amber-400" />

        <div className="p-5">
          {/* Icon + badge */}
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded-full">
              ≈ 10 seconds
            </span>
          </div>

          <h3 className="text-white font-semibold text-base mb-1">Share your insurance info</h3>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            Canopy Connect securely pulls your current policy details so {agentFirstName} can build
            an accurate quote — no digging through paperwork.
          </p>

          {/* Trust points */}
          <ul className="space-y-1.5 mb-5">
            {[
              'Bank-level encryption',
              'Read-only — nothing is changed',
              'Used by thousands of agents nationwide',
            ].map((point) => (
              <li key={point} className="flex items-center gap-2 text-xs text-gray-400">
                <svg
                  className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {point}
              </li>
            ))}
          </ul>

          <button
            onClick={handleConnect}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-gray-900 font-bold text-sm hover:from-amber-400 hover:to-amber-300 active:scale-95 transition-all duration-150 shadow-lg shadow-amber-900/40"
          >
            Connect my insurance info →
          </button>

          <button
            onClick={onSkip}
            className="w-full mt-2 py-2 text-xs text-gray-500 hover:text-gray-400 transition-colors"
          >
            Skip this step — I&apos;ll share details with {agentFirstName} directly
          </button>
        </div>
      </div>
    </div>
  )
}
