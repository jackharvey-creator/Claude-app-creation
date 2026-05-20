'use client'
import type { FlowStep, Message } from '@/lib/insurance/chatFlow'

interface ChatMessageProps {
  message: Message
  onOptionSelect?: (value: string, label: string, stepKey: FlowStep) => void
  optionsDisabled?: boolean
}

export function ChatMessage({ message, onOptionSelect, optionsDisabled }: ChatMessageProps) {
  const isBot = message.role === 'bot'

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}>
      <div className={`max-w-[85%] flex flex-col gap-2 ${isBot ? 'items-start' : 'items-end'}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isBot
              ? 'bg-[#EBF4FF] text-[#1A2B4A] rounded-tl-sm border border-blue-100'
              : 'bg-[#003087] text-white rounded-tr-sm shadow-md shadow-blue-200'
          }`}
        >
          {message.content}
        </div>

        {/* Quick reply options */}
        {isBot && message.options && message.options.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  !optionsDisabled &&
                  message.stepKey &&
                  onOptionSelect?.(opt.value, opt.label, message.stepKey)
                }
                disabled={optionsDisabled}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
                  optionsDisabled
                    ? 'border-gray-200 text-gray-400 cursor-default bg-gray-50'
                    : 'border-[#005EB8] text-[#005EB8] bg-white hover:bg-[#005EB8] hover:text-white active:bg-[#003087] cursor-pointer'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="bg-[#EBF4FF] border border-blue-100 px-4 py-3 rounded-2xl rounded-tl-sm">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#005EB8] animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-[#005EB8] animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-[#005EB8] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}
