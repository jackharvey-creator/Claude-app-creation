'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Agent } from '@/lib/insurance/agents'
import {
  type ContactPref,
  type CoverageType,
  type FlowStep,
  type LeadData,
  type Message,
  getBotMessages,
  nextStep,
} from '@/lib/insurance/chatFlow'
import { AgentHeader } from './AgentHeader'
import { ChatMessage, TypingIndicator } from './ChatMessage'

let msgCounter = 0
function uid() {
  return `msg-${++msgCounter}`
}

export function InsuranceChat({ agent, onComplete }: { agent: Agent; onComplete?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [step, setStep] = useState<FlowStep>('greeting')
  const [lead, setLead] = useState<LeadData>({})
  const [isTyping, setIsTyping] = useState(false)
  const [inputDisabled, setInputDisabled] = useState(true)
  const [textInput, setTextInput] = useState('')
  const [activeInputType, setActiveInputType] = useState<'text' | 'phone' | 'email' | 'none'>('none')
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set())

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const stepRef = useRef<FlowStep>('greeting')
  const didInit = useRef(false)

  useEffect(() => { stepRef.current = step }, [step])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, isTyping])

  useEffect(() => {
    if (!inputDisabled && activeInputType !== 'none') inputRef.current?.focus()
  }, [inputDisabled, activeInputType])

  const addBotMessages = useCallback(
    async (s: FlowStep, currentLead: LeadData) => {
      const { messages: newMsgs, inputType } = getBotMessages(s, agent.firstName, currentLead)

      for (let i = 0; i < newMsgs.length; i++) {
        setIsTyping(true)
        await new Promise((r) => setTimeout(r, 850 + Math.random() * 350))
        setIsTyping(false)
        setMessages((prev) => [...prev, { ...newMsgs[i], id: uid() } as Message])
        if (i < newMsgs.length - 1) await new Promise((r) => setTimeout(r, 350))
      }

      setActiveInputType(inputType)
      setInputDisabled(inputType === 'none')
    },
    [agent.firstName],
  )

  useEffect(() => {
    if (didInit.current) return
    didInit.current = true
    async function runGreeting() {
      await new Promise((r) => setTimeout(r, 600))
      await addBotMessages('greeting', {})
      await new Promise((r) => setTimeout(r, 250))
      await addBotMessages('greeting_2', {})
    }
    runGreeting()
  }, [addBotMessages])

  async function advanceFlow(fromStep: FlowStep, currentLead: LeadData) {
    const next = nextStep(fromStep)
    setStep(next)
    await addBotMessages(next, currentLead)

    // canopy_connect auto-advances — no user action required
    if (next === 'canopy_connect') {
      // Brief pause to let the message land, then show "sending" status
      await new Promise((r) => setTimeout(r, 900))
      setIsTyping(true)
      await new Promise((r) => setTimeout(r, 1100))
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: 'bot' as const,
          content: '✓ Canopy Connect request sent.',
          type: 'text' as const,
          stepKey: 'canopy_connect' as FlowStep,
        },
      ])
      await new Promise((r) => setTimeout(r, 500))
      submitLead(currentLead)
      setStep('confirmed')
      await addBotMessages('confirmed', currentLead)
      onComplete?.()
      return
    }

    if (next === 'confirmed') onComplete?.()
  }

  function handleOptionSelect(value: string, label: string, msgStepKey: FlowStep, msgId: string) {
    setSelectedMessages((prev) => { const s = new Set(prev); s.add(msgId); return s })
    setMessages((prev) => [...prev, { id: uid(), role: 'user', content: label, type: 'text' }])

    let updatedLead = { ...lead }
    switch (msgStepKey) {
      case 'ask_coverage':
        updatedLead = { ...updatedLead, coverageType: value as CoverageType }
        break
      case 'ask_insured':
        updatedLead = { ...updatedLead, currentlyInsured: value === 'yes' }
        break
      case 'ask_contact_pref':
        updatedLead = { ...updatedLead, contactPreference: value as ContactPref }
        break
    }

    setLead(updatedLead)
    setInputDisabled(true)
    advanceFlow(msgStepKey, updatedLead)
  }

  function handleTextSubmit() {
    const val = textInput.trim()
    if (!val || inputDisabled) return

    const currentStep = stepRef.current
    setMessages((prev) => [...prev, { id: uid(), role: 'user', content: val, type: 'text' }])
    setTextInput('')
    setInputDisabled(true)
    setActiveInputType('none')

    let updatedLead = { ...lead }
    switch (currentStep) {
      case 'ask_name':
        updatedLead = { ...updatedLead, firstName: val }
        break
      case 'ask_zip':
        updatedLead = { ...updatedLead, zipCode: val }
        break
      case 'capture_contact':
        updatedLead = { ...updatedLead, contactValue: val }
        break
    }

    setLead(updatedLead)
    advanceFlow(currentStep, updatedLead)
  }

  async function submitLead(finalLead: LeadData) {
    if (leadSubmitted) return
    setLeadSubmitted(true)
    try {
      await fetch('/api/insurance/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: agent.id, lead: finalLead }),
      })
    } catch {
      // silently fail
    }
  }

  function getInputPlaceholder() {
    const s = stepRef.current
    if (s === 'ask_name') return 'Your first name…'
    if (s === 'ask_zip') return 'ZIP code…'
    if (s === 'capture_contact' && lead.contactPreference === 'email') return 'your@email.com'
    if (s === 'capture_contact') return '(555) 555-0100'
    return 'Type a message…'
  }

  function getInputMode(): React.InputHTMLAttributes<HTMLInputElement>['inputMode'] {
    if (activeInputType === 'phone') return 'tel'
    if (activeInputType === 'email') return 'email'
    if (stepRef.current === 'ask_zip') return 'numeric'
    return 'text'
  }

  const isInputActive = !inputDisabled && activeInputType !== 'none'

  return (
    <div className="flex flex-col h-screen bg-[#F5F9FF]">
      <AgentHeader agent={agent} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onOptionSelect={(value, label, stepKey) =>
              handleOptionSelect(value, label, stepKey, msg.id)
            }
            optionsDisabled={selectedMessages.has(msg.id)}
          />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      <div className="border-t border-blue-100 bg-white px-4 py-3">
        <div
          className={`flex items-center gap-3 bg-white border-2 rounded-2xl px-4 py-2.5 transition-all duration-200 ${
            isInputActive ? 'border-[#005EB8] opacity-100' : 'border-gray-200 opacity-40 pointer-events-none'
          }`}
        >
          <input
            ref={inputRef}
            type={activeInputType === 'email' ? 'email' : activeInputType === 'phone' ? 'tel' : 'text'}
            inputMode={getInputMode()}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
            placeholder={getInputPlaceholder()}
            disabled={!isInputActive}
            className="flex-1 bg-transparent text-[#1A2B4A] placeholder-gray-400 text-sm outline-none"
          />
          <button
            onClick={handleTextSubmit}
            disabled={!textInput.trim() || !isInputActive}
            className="w-8 h-8 rounded-full bg-[#003087] flex items-center justify-center flex-shrink-0 disabled:opacity-30 active:scale-90 transition-all duration-150 hover:bg-[#005EB8]"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <p className="text-center text-gray-400 text-xs mt-2">
          Secure · Your information is only shared with {agent.firstName}
        </p>
      </div>
    </div>
  )
}
