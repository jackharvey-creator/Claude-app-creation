'use client'

import { useState } from 'react'
import type { Question, AssessmentAnswer } from '@/lib/chatbot/questions'

interface QuestionStepProps {
  question: Question
  onAnswer: (answer: AssessmentAnswer) => void
  selectedAnswerId?: string
}

export function QuestionStep({ question, onAnswer, selectedAnswerId }: QuestionStepProps) {
  const [selected, setSelected] = useState<string | null>(selectedAnswerId ?? null)

  function handleSelect(optionId: string, points: number) {
    setSelected(optionId)
    // Small delay so the selection is visible before advancing
    setTimeout(() => {
      onAnswer({ questionId: question.id, answerId: optionId, points })
    }, 300)
  }

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          Question {question.number} of 10
        </span>
        <h2 className="text-xl font-semibold text-gray-900 leading-snug">{question.text}</h2>
        {question.subtext && (
          <p className="mt-2 text-sm text-gray-500">{question.subtext}</p>
        )}
      </div>

      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selected === option.id
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id, option.points)}
              className={`
                w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium text-sm
                ${isSelected
                  ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:bg-gray-50'
                }
              `}
            >
              <span className={`
                inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold mr-3
                ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}
              `}>
                {option.id.toUpperCase()}
              </span>
              {option.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}
