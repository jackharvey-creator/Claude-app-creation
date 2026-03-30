'use client'

import { useState, useEffect } from 'react'
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiLink, FiTrash2, FiCheck, FiExternalLink } from 'react-icons/fi'
import toast from 'react-hot-toast'

type Platform = 'FACEBOOK' | 'INSTAGRAM' | 'LINKEDIN' | 'TWITTER'

interface SocialAccount {
  id: string
  platform: Platform
  accountName: string
  isActive: boolean
  createdAt: string
}

const platformConfig: Record<Platform, { name: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  FACEBOOK: { name: 'Facebook', icon: FiFacebook, color: 'text-blue-600', bg: 'bg-blue-50' },
  INSTAGRAM: { name: 'Instagram', icon: FiInstagram, color: 'text-pink-600', bg: 'bg-pink-50' },
  LINKEDIN: { name: 'LinkedIn', icon: FiLinkedin, color: 'text-blue-700', bg: 'bg-blue-50' },
  TWITTER: { name: 'Twitter / X', icon: FiTwitter, color: 'text-sky-500', bg: 'bg-sky-50' },
}

export default function PlatformsPage() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState<Platform | null>(null)

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      const res = await fetch('/api/social-accounts')
      const data = await res.json()
      setAccounts(data)
    } catch {
      toast.error('Failed to load accounts')
    } finally {
      setLoading(false)
    }
  }

  const connectPlatform = async (platform: Platform) => {
    setConnecting(platform)
    try {
      const res = await fetch('/api/social-accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform }),
      })

      if (!res.ok) {
        const data = await res.json()
        toast.error(data.error || 'Failed to connect')
        return
      }

      toast.success(`${platformConfig[platform].name} connected!`)
      fetchAccounts()
    } catch {
      toast.error('Failed to connect platform')
    } finally {
      setConnecting(null)
    }
  }

  const disconnectPlatform = async (id: string, platform: Platform) => {
    if (!confirm(`Disconnect ${platformConfig[platform].name}?`)) return

    try {
      const res = await fetch(`/api/social-accounts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Platform disconnected')
        fetchAccounts()
      }
    } catch {
      toast.error('Failed to disconnect')
    }
  }

  const connectedPlatforms = accounts.map((a) => a.platform)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Connected Platforms</h2>
        <p className="text-gray-600 mt-1">Link your social media accounts to start auto-posting content.</p>
      </div>

      {/* Available Platforms */}
      <div className="grid sm:grid-cols-2 gap-6">
        {(Object.entries(platformConfig) as [Platform, typeof platformConfig[Platform]][]).map(([key, config]) => {
          const connected = accounts.find((a) => a.platform === key)
          const Icon = config.icon

          return (
            <div key={key} className="card">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${config.bg}`}>
                    <Icon className={`h-8 w-8 ${config.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{config.name}</h3>
                    {connected ? (
                      <div className="flex items-center gap-1.5 mt-1">
                        <FiCheck className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">Connected as {connected.accountName}</span>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 mt-1">Not connected</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                {connected ? (
                  <>
                    <button className="btn-secondary text-sm flex items-center gap-1.5">
                      <FiExternalLink className="h-4 w-4" />
                      View Profile
                    </button>
                    <button
                      onClick={() => disconnectPlatform(connected.id, key)}
                      className="btn-danger text-sm flex items-center gap-1.5"
                    >
                      <FiTrash2 className="h-4 w-4" />
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => connectPlatform(key)}
                    disabled={connecting === key}
                    className="btn-primary text-sm flex items-center gap-1.5"
                  >
                    <FiLink className="h-4 w-4" />
                    {connecting === key ? 'Connecting...' : `Connect ${config.name}`}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> In production, connecting a platform will redirect you to the platform&apos;s
          OAuth flow to securely authorize InsurePost. For this demo, connections are simulated.
        </p>
      </div>
    </div>
  )
}
