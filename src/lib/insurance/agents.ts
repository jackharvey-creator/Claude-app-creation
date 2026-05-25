export interface Agent {
  id: string
  name: string
  firstName: string
  agencyName: string
  phone: string
  email: string
  state: string
  licenseNumber: string
  canopyConnectUrl: string
  avatarInitials: string
  avatarColor: string // hex color for avatar background
}

export const AGENTS: Record<string, Agent> = {
  'sarah-chen': {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    firstName: 'Sarah',
    agencyName: 'Pinnacle Insurance Group',
    phone: '(512) 555-0142',
    email: 'sarah.chen@pinnacleins.com',
    state: 'TX',
    licenseNumber: 'TX-1847293',
    canopyConnectUrl: 'https://connect.canopyconnect.com/sarah-chen',
    avatarInitials: 'SC',
    avatarColor: '#1a5276',
  },
  'marcus-reed': {
    id: 'marcus-reed',
    name: 'Marcus Reed',
    firstName: 'Marcus',
    agencyName: 'Summit Insurance Partners',
    phone: '(404) 555-0187',
    email: 'marcus.reed@summitins.com',
    state: 'GA',
    licenseNumber: 'GA-3920847',
    canopyConnectUrl: 'https://connect.canopyconnect.com/marcus-reed',
    avatarInitials: 'MR',
    avatarColor: '#145a32',
  },
  demo: {
    id: 'demo',
    name: 'Alex Rivera',
    firstName: 'Alex',
    agencyName: 'Meridian Insurance',
    phone: '(555) 555-0100',
    email: 'alex.rivera@meridianins.com',
    state: 'CA',
    licenseNumber: 'CA-7654321',
    canopyConnectUrl: 'https://connect.canopyconnect.com/demo',
    avatarInitials: 'AR',
    avatarColor: '#4a235a',
  },
}

export function getAgent(id: string): Agent | null {
  return AGENTS[id] ?? null
}
