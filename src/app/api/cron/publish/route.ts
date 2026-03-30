import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// This endpoint is designed to be called by a cron job every 15 minutes
// It publishes approved posts that are scheduled for the current time or earlier
export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()

    // Find approved posts that are due for publishing
    const duePosts = await prisma.post.findMany({
      where: {
        status: 'APPROVED',
        scheduledAt: { lte: now },
      },
      include: {
        socialAccount: true,
        user: true,
      },
    })

    const results = []

    for (const post of duePosts) {
      try {
        // In production, this would call the actual platform API:
        // - Facebook Graph API for Facebook/Instagram
        // - LinkedIn API for LinkedIn
        // - Twitter API v2 for Twitter/X
        //
        // Each publisher would:
        // 1. Check token freshness, refresh if needed
        // 2. Upload media if present
        // 3. Create the post via API
        // 4. Return the platform post ID

        // For now, simulate successful publishing
        await prisma.post.update({
          where: { id: post.id },
          data: {
            status: 'PUBLISHED',
            publishedAt: now,
          },
        })

        results.push({ postId: post.id, platform: post.platform, status: 'published' })
      } catch (error) {
        console.error(`Failed to publish post ${post.id}:`, error)

        await prisma.post.update({
          where: { id: post.id },
          data: { status: 'FAILED' },
        })

        results.push({ postId: post.id, platform: post.platform, status: 'failed' })
      }
    }

    return NextResponse.json({
      processed: results.length,
      results,
    })
  } catch (error) {
    console.error('Publish cron error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
