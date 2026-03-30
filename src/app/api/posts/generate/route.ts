import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUserId, unauthorizedResponse } from '@/lib/auth-helpers'
import { generatePostsForUser } from '@/lib/content-generator'
import { addDays, setHours, setMinutes, startOfWeek } from 'date-fns'

export async function POST() {
  const userId = await getAuthenticatedUserId()
  if (!userId) return unauthorizedResponse()

  try {
    // Get user's preferences and connected platforms
    const [preferences, lines, accounts, scheduleSettings] = await Promise.all([
      prisma.userPreference.findUnique({ where: { userId } }),
      prisma.userLineOfBusiness.findMany({ where: { userId, isActive: true } }),
      prisma.socialAccount.findMany({ where: { userId, isActive: true } }),
      prisma.scheduleSettings.findUnique({ where: { userId } }),
    ])

    if (lines.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one line of business in your preferences first.' },
        { status: 400 }
      )
    }

    if (accounts.length === 0) {
      return NextResponse.json(
        { error: 'Please connect at least one social media platform first.' },
        { status: 400 }
      )
    }

    const activePlatforms = accounts.map((a) => a.platform)
    const activeLines = lines.map((l) => l.line)

    // Generate content
    const generatedPosts = generatePostsForUser(activeLines, activePlatforms, {
      includeHashtags: preferences?.includeHashtags ?? true,
      includeEmojis: preferences?.includeEmojis ?? false,
      includeCtA: preferences?.includeCtA ?? true,
      tone: preferences?.tone ?? 'PROFESSIONAL',
    })

    // Calculate schedule dates
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
    const preferredDays = scheduleSettings?.preferredDays ?? [1, 2, 3, 4, 5]
    const preferredTimes = scheduleSettings?.preferredTimes ?? ['09:00', '12:00', '17:00']

    // Create posts in database with scheduled times
    const createdPosts = []
    let scheduleIndex = 0

    for (const post of generatedPosts) {
      const dayIndex = scheduleIndex % preferredDays.length
      const timeIndex = Math.floor(scheduleIndex / preferredDays.length) % preferredTimes.length
      const day = preferredDays[dayIndex]
      const [hours, minutes] = preferredTimes[timeIndex].split(':').map(Number)

      // Schedule for next week
      let scheduledAt = addDays(weekStart, 7 + day)
      scheduledAt = setHours(scheduledAt, hours)
      scheduledAt = setMinutes(scheduledAt, minutes)

      const account = accounts.find((a) => a.platform === post.platform)

      const created = await prisma.post.create({
        data: {
          userId,
          platform: post.platform,
          content: post.content,
          imageUrl: post.imageUrl,
          hashtags: post.hashtags,
          lineOfBusiness: post.lineOfBusiness,
          socialAccountId: account?.id,
          status: 'DRAFT',
          scheduledAt,
        },
      })

      createdPosts.push(created)
      scheduleIndex++
    }

    // Create an approval batch for the generated posts
    const nextWeekStart = addDays(weekStart, 7)
    const nextWeekEnd = addDays(nextWeekStart, 6)

    const batch = await prisma.approvalBatch.create({
      data: {
        userId,
        weekStart: nextWeekStart,
        weekEnd: nextWeekEnd,
        status: 'PENDING',
      },
    })

    // Link posts to the batch
    await prisma.post.updateMany({
      where: { id: { in: createdPosts.map((p) => p.id) } },
      data: {
        approvalBatchId: batch.id,
        status: 'PENDING_APPROVAL',
      },
    })

    return NextResponse.json({
      message: `Generated ${createdPosts.length} posts for next week`,
      posts: createdPosts,
      batchId: batch.id,
    })
  } catch (error) {
    console.error('Content generation error:', error)
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 })
  }
}
