'use client'
import type { Agent } from '@/lib/insurance/agents'

export function AgentHeader({ agent }: { agent: Agent }) {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      {/* Real Desk accent line */}
      <div className="h-[3px] bg-gradient-to-r from-[#0EA5E9] to-[#2DD4BF]" />

      <div className="flex items-center gap-3 px-4 py-3">
        {/* Avatar with teal ring */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{
            backgroundColor: agent.avatarColor,
            boxShadow: '0 0 0 2px #0EA5E9, 0 0 0 4px rgba(14,165,233,0.15)',
          }}
        >
          {agent.avatarInitials}
        </div>

        {/* Agent info */}
        <div className="flex-1 min-w-0">
          <p className="text-[#334155] font-semibold text-sm leading-tight truncate">{agent.name}</p>
          <p className="text-slate-400 text-xs truncate">
            {agent.agencyName} · Licensed in {agent.state}
          </p>
        </div>

        {/* Status + brand */}
        <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-600 text-[11px] font-medium">Available</span>
          </div>
          <span className="text-[8px] font-bold tracking-[1.5px] uppercase text-[#0EA5E9] opacity-75">Real Desk</span>
        </div>
      </div>
    </div>
  )
}
