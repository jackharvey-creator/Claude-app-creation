export type FlowStep =
  | 'greeting'
  | 'greeting_2'
  | 'ask_name'
  | 'ask_zip'
  | 'ask_coverage'
  | 'ask_insured'
  | 'ask_contact_pref'
  | 'capture_contact'
  | 'canopy_connect'
  | 'confirmed'

export type CoverageType = 'auto' | 'home' | 'both'
export type ContactPref = 'call' | 'text' | 'email'

export interface LeadData {
  firstName?: string
  zipCode?: string
  coverageType?: CoverageType
  currentlyInsured?: boolean
  contactPreference?: ContactPref
  contactValue?: string // phone or email
  canopyConnectClicked?: boolean
}

export interface Message {
  id: string
  role: 'bot' | 'user'
  content: string
  type: 'text' | 'typing'
  options?: { label: string; value: string }[]
  /** The flow step this message belongs to — used to correctly route option clicks */
  stepKey?: FlowStep
}

export function getBotMessages(
  step: FlowStep,
  agentFirstName: string,
  lead: LeadData,
): {
  messages: Omit<Message, 'id'>[]
  inputType: 'text' | 'phone' | 'email' | 'none'
  placeholder?: string
} {
  switch (step) {
    case 'greeting':
      return {
        messages: [
          {
            role: 'bot',
            content: `Hey there! I'm ${agentFirstName}'s digital assistant. ${agentFirstName} is a licensed insurance agent who personally handles every quote — no lead farms, no spam, just real coverage from someone who actually cares about your situation.`,
            type: 'text',
            stepKey: 'greeting',
          },
        ],
        inputType: 'none',
      }

    case 'greeting_2':
      return {
        messages: [
          {
            role: 'bot',
            content: `I'll ask you a few quick questions so ${agentFirstName} has everything needed to build you an accurate, personalized quote. Takes about 2 minutes. Ready?`,
            type: 'text',
            options: [{ label: "Let's go →", value: 'ready' }],
            stepKey: 'greeting_2',
          },
        ],
        inputType: 'none',
      }

    case 'ask_name':
      return {
        messages: [
          {
            role: 'bot',
            content: "Great! First — what's your first name?",
            type: 'text',
            stepKey: 'ask_name',
          },
        ],
        inputType: 'text',
        placeholder: 'Your first name…',
      }

    case 'ask_zip':
      return {
        messages: [
          {
            role: 'bot',
            content: `Nice to meet you, ${lead.firstName}! What's your zip code? This helps ${agentFirstName} pull the right rates for your area.`,
            type: 'text',
            stepKey: 'ask_zip',
          },
        ],
        inputType: 'text',
        placeholder: 'ZIP code…',
      }

    case 'ask_coverage':
      return {
        messages: [
          {
            role: 'bot',
            content: 'What type of coverage are you shopping for?',
            type: 'text',
            options: [
              { label: '🚗  Auto', value: 'auto' },
              { label: '🏠  Home', value: 'home' },
              { label: '🚗🏠  Auto + Home', value: 'both' },
            ],
            stepKey: 'ask_coverage',
          },
        ],
        inputType: 'none',
      }

    case 'ask_insured':
      return {
        messages: [
          {
            role: 'bot',
            content: 'Are you currently insured?',
            type: 'text',
            options: [
              { label: 'Yes, I have coverage', value: 'yes' },
              { label: "No, I'm uninsured right now", value: 'no' },
            ],
            stepKey: 'ask_insured',
          },
        ],
        inputType: 'none',
      }

    case 'ask_contact_pref':
      return {
        messages: [
          {
            role: 'bot',
            content: `Perfect. How would you prefer ${agentFirstName} reach out to you?`,
            type: 'text',
            options: [
              { label: '📞  Call', value: 'call' },
              { label: '💬  Text', value: 'text' },
              { label: '📧  Email', value: 'email' },
            ],
            stepKey: 'ask_contact_pref',
          },
        ],
        inputType: 'none',
      }

    case 'capture_contact':
      if (lead.contactPreference === 'email') {
        return {
          messages: [
            {
              role: 'bot',
              content: `What's the best email address for ${agentFirstName} to reach you?`,
              type: 'text',
              stepKey: 'capture_contact',
            },
          ],
          inputType: 'email',
          placeholder: 'your@email.com',
        }
      }
      return {
        messages: [
          {
            role: 'bot',
            content: `What's the best phone number for ${agentFirstName} to reach you?`,
            type: 'text',
            stepKey: 'capture_contact',
          },
        ],
        inputType: 'phone',
        placeholder: '(555) 555-0100',
      }

    case 'canopy_connect':
      return {
        messages: [
          {
            role: 'bot',
            content: `Almost done! To make sure ${agentFirstName} can build you the most accurate quote, we're automatically sending you a secure link to share your current policy details. It'll arrive ${lead.contactPreference === 'email' ? 'by email' : `via ${lead.contactPreference}`} in just a moment — takes about 10 seconds when you're ready and means no long phone interrogation later.`,
            type: 'text',
            stepKey: 'canopy_connect',
          },
        ],
        inputType: 'none',
      }

    case 'confirmed':
      return {
        messages: [
          {
            role: 'bot',
            content: `You're all set, ${lead.firstName}! ${agentFirstName} will reach out ${lead.contactPreference === 'email' ? 'by email' : `by ${lead.contactPreference}`} soon with your personalized quote. Your Canopy Connect link is on its way — completing it means ${agentFirstName} arrives to that conversation already knowing your coverage and ready to save you money. You're in good hands. 🤝`,
            type: 'text',
            stepKey: 'confirmed',
          },
        ],
        inputType: 'none',
      }

    default:
      return { messages: [], inputType: 'none' }
  }
}

export function nextStep(current: FlowStep): FlowStep {
  const map: Record<FlowStep, FlowStep> = {
    greeting: 'greeting_2',
    greeting_2: 'ask_name',
    ask_name: 'ask_zip',
    ask_zip: 'ask_coverage',
    ask_coverage: 'ask_insured',
    ask_insured: 'ask_contact_pref',
    ask_contact_pref: 'capture_contact',
    capture_contact: 'canopy_connect',
    canopy_connect: 'confirmed',
    confirmed: 'confirmed',
  }
  return map[current]
}
