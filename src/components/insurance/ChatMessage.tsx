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
              ? 'bg-[#1e2737] text-gray-100 rounded-tl-sm'
              : 'bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-tr-sm shadow-lg shadow-amber-900/30'
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
                    ? 'border-white/10 text-gray-600 cursor-default'
                    : 'border-amber-500/60 text-amber-400 hover:bg-amber-500/10 active:bg-amber-500/20 cursor-pointer'
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
      <div className="bg-[#1e2737] px-4 py-3 rounded-2xl rounded-tl-sm">
        <div className="flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  )
}
