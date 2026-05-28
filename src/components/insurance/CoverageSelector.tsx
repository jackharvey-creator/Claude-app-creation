'use client'

import { useState } from 'react'
import type { CoverageType } from '@/lib/insurance/chatFlow'

const COVERAGE_OPTIONS: { value: CoverageType; emoji: string; label: string; sub?: string }[] = [
  { value: 'auto', emoji: '🚗', label: 'Auto' },
  { value: 'home', emoji: '🏠', label: 'Home' },
  { value: 'secondary_property', emoji: '🏖️', label: 'Vacation Home', sub: 'Secondary property' },
  { value: 'renters', emoji: '🛋️', label: 'Renters' },
  { value: 'flood', emoji: '🌊', label: 'Flood' },
  { value: 'earthquake', emoji: '🌋', label: 'Earthquake' },
  { value: 'umbrella', emoji: '☂️', label: 'Umbrella' },
  { value: 'jewelry', emoji: '💍', label: 'Jewelry' },
  { value: 'toys', emoji: '⛵', label: 'Toys', sub: 'Boats, RVs, ATVs' },
]

interface CoverageSelectorProps {
  onSubmit: (values: CoverageType[], labels: string[]) => void
}

export function CoverageSelector({ onSubmit }: CoverageSelectorProps) {
  const [selected, setSelected] = useState<Set<CoverageType>>(new Set())

  function toggle(value: CoverageType) {
    setSelected((prev) => {
      const s = new Set(prev)
      if (s.has(value)) s.delete(value)
      else s.add(value)
      return s
    })
  }

  function handleSubmit() {
    const values = Array.from(selected)
    const labels = COVERAGE_OPTIONS.filter((o) => selected.has(o.value)).map((o) => o.label)
    onSubmit(values, labels)
  }

  return (
    <div className="mx-auto max-w-sm mt-2 mb-3">
      <div className="rounded-2xl border border-blue-100 bg-white overflow-hidden shadow-md">
        <div className="h-1 w-full bg-[#003087]" />
        <div className="p-4">
          <p className="text-xs text-gray-400 mb-3">Select all that apply</p>
          <div className="grid grid-cols-3 gap-2">
            {COVERAGE_OPTIONS.map((opt) => {
              const isSelected = selected.has(opt.value)
              return (
                <button
                  key={opt.value}
                  onClick={() => toggle(opt.value)}
                  className={`flex flex-col items-center justify-center py-3 px-1 rounded-xl border-2 transition-all duration-150 text-center ${
                    isSelected
                      ? 'border-[#003087] bg-[#EBF4FF]'
                      : 'border-blue-100 bg-white hover:border-blue-300'
                  }`}
                >
                  <span className="text-xl mb-1">{opt.emoji}</span>
                  <span className={`text-xs font-semibold leading-tight ${isSelected ? 'text-[#003087]' : 'text-gray-600'}`}>
                    {opt.label}
                  </span>
                  {opt.sub && (
                    <span className="text-[9px] text-gray-400 leading-tight mt-0.5">{opt.sub}</span>
                  )}
                </button>
              )
            })}
          </div>
          <button
            onClick={handleSubmit}
            disabled={selected.size === 0}
            className="w-full mt-4 py-3 rounded-xl bg-[#003087] text-white font-bold text-sm hover:bg-[#005EB8] disabled:opacity-30 disabled:cursor-not-allowed active:scale-[.98] transition-all duration-150"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  )
}
