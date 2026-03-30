'use client'

import { useState, useEffect } from 'react'
import { FiTrendingUp, FiEye, FiHeart, FiMessageSquare, FiShare2, FiBarChart2 } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface AnalyticsData {
  totalPosts: number
  publishedPosts: number
  totalImpressions: number
  totalEngagement: number
  avgEngagementRate: number
  platformBreakdown: Record<string, { posts: number; impressions: number; engagement: number }>
  recentPosts: Array<{
    id: string
    platform: string
    content: string
    publishedAt: string
    impressions: number
    likes: number
    comments: number
    shares: number
  }>
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics')
      const result = await res.json()
      setData(result)
    } catch {
      toast.error('Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="text-gray-500">Loading analytics...</div></div>
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <FiBarChart2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No analytics data yet</h3>
        <p className="text-gray-500">Start publishing content to see your performance metrics.</p>
      </div>
    )
  }

  const stats = [
    { label: 'Total Posts', value: data.totalPosts, icon: FiBarChart2, color: 'text-blue-600 bg-blue-100' },
    { label: 'Published', value: data.publishedPosts, icon: FiShare2, color: 'text-green-600 bg-green-100' },
    { label: 'Total Impressions', value: data.totalImpressions.toLocaleString(), icon: FiEye, color: 'text-purple-600 bg-purple-100' },
    { label: 'Avg. Engagement', value: `${data.avgEngagementRate.toFixed(1)}%`, icon: FiTrendingUp, color: 'text-amber-600 bg-amber-100' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <p className="text-gray-600 mt-1">Track your social media performance across all platforms.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Breakdown */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Platform</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Posts</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Impressions</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.platformBreakdown).map(([platform, stats]) => (
                <tr key={platform} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{platform}</td>
                  <td className="py-3 px-4 text-right text-gray-700">{stats.posts}</td>
                  <td className="py-3 px-4 text-right text-gray-700">{stats.impressions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-gray-700">{stats.engagement.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Performance */}
      {data.recentPosts.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Post Performance</h3>
          <div className="space-y-4">
            {data.recentPosts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {post.platform}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">{post.content}</p>
                  </div>
                  <div className="flex gap-4 text-sm shrink-0">
                    <div className="text-center">
                      <FiEye className="h-4 w-4 text-gray-400 mx-auto" />
                      <p className="text-gray-700 font-medium">{post.impressions}</p>
                    </div>
                    <div className="text-center">
                      <FiHeart className="h-4 w-4 text-red-400 mx-auto" />
                      <p className="text-gray-700 font-medium">{post.likes}</p>
                    </div>
                    <div className="text-center">
                      <FiMessageSquare className="h-4 w-4 text-blue-400 mx-auto" />
                      <p className="text-gray-700 font-medium">{post.comments}</p>
                    </div>
                    <div className="text-center">
                      <FiShare2 className="h-4 w-4 text-green-400 mx-auto" />
                      <p className="text-gray-700 font-medium">{post.shares}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Analytics data shown here is simulated for demo purposes. In production,
          real engagement metrics are pulled from each connected platform&apos;s API.
        </p>
      </div>
    </div>
  )
}
