import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUserId, unauthorizedResponse } from '@/lib/auth-helpers'

export async function GET() {
  const userId = await getAuthenticatedUserId()
  if (!userId) return unauthorizedResponse()

  const posts = await prisma.post.findMany({
    where: { userId },
  })

  const totalPosts = posts.length
  const publishedPosts = posts.filter((p) => p.status === 'PUBLISHED').length

  // Simulated analytics (in production, pull from platform APIs)
  const platformBreakdown: Record<string, { posts: number; impressions: number; engagement: number }> = {}

  for (const post of posts) {
    if (!platformBreakdown[post.platform]) {
      platformBreakdown[post.platform] = { posts: 0, impressions: 0, engagement: 0 }
    }
    platformBreakdown[post.platform].posts++

    if (post.status === 'PUBLISHED') {
      // Simulated metrics
      const impressions = Math.floor(Math.random() * 5000) + 500
      const engagement = Math.floor(impressions * (Math.random() * 0.08 + 0.02))
      platformBreakdown[post.platform].impressions += impressions
      platformBreakdown[post.platform].engagement += engagement
    }
  }

  const totalImpressions = Object.values(platformBreakdown).reduce((sum, p) => sum + p.impressions, 0)
  const totalEngagement = Object.values(platformBreakdown).reduce((sum, p) => sum + p.engagement, 0)
  const avgEngagementRate = totalImpressions > 0 ? (totalEngagement / totalImpressions) * 100 : 0

  // Recent published posts with simulated engagement
  const recentPosts = posts
    .filter((p) => p.status === 'PUBLISHED')
    .slice(0, 10)
    .map((post) => ({
      id: post.id,
      platform: post.platform,
      content: post.content,
      publishedAt: post.publishedAt?.toISOString() ?? post.createdAt.toISOString(),
      impressions: Math.floor(Math.random() * 3000) + 200,
      likes: Math.floor(Math.random() * 150) + 10,
      comments: Math.floor(Math.random() * 30) + 1,
      shares: Math.floor(Math.random() * 20),
    }))

  return NextResponse.json({
    totalPosts,
    publishedPosts,
    totalImpressions,
    totalEngagement,
    avgEngagementRate,
    platformBreakdown,
    recentPosts,
  })
}
