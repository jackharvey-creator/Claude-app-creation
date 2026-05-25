'use client'
import type { Agent } from '@/lib/insurance/agents'

export function AgentHeader({ agent }: { agent: Agent }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0d1421]/80 backdrop-blur-sm">
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ring-2 ring-white/20"
        style={{ backgroundColor: agent.avatarColor }}
      >
        {agent.avatarInitials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm leading-tight truncate">{agent.name}</p>
        <p className="text-gray-400 text-xs truncate">
          {agent.agencyName} · Licensed in {agent.state}
        </p>
      </div>

      {/* Status dot */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-400 text-xs font-medium">Available</span>
      </div>
    </div>
  )
}
