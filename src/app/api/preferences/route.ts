import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUserId, unauthorizedResponse } from '@/lib/auth-helpers'

export async function GET() {
  const userId = await getAuthenticatedUserId()
  if (!userId) return unauthorizedResponse()

  const [preferences, linesOfBusiness] = await Promise.all([
    prisma.userPreference.findUnique({ where: { userId } }),
    prisma.userLineOfBusiness.findMany({ where: { userId, isActive: true } }),
  ])

  return NextResponse.json({ preferences, linesOfBusiness })
}

export async function PUT(request: Request) {
  const userId = await getAuthenticatedUserId()
  if (!userId) return unauthorizedResponse()

  try {
    const body = await request.json()
    const { linesOfBusiness, ...prefs } = body

    // Update preferences
    await prisma.userPreference.upsert({
      where: { userId },
      update: {
        tone: prefs.tone,
        includeHashtags: prefs.includeHashtags,
        includeEmojis: prefs.includeEmojis,
        includeCtA: prefs.includeCtA,
        targetAudience: prefs.targetAudience || null,
        weeklyEmailDay: prefs.weeklyEmailDay,
        weeklyEmailTime: prefs.weeklyEmailTime,
        autoApprove: prefs.autoApprove,
      },
      create: {
        userId,
        tone: prefs.tone,
        includeHashtags: prefs.includeHashtags,
        includeEmojis: prefs.includeEmojis,
        includeCtA: prefs.includeCtA,
        targetAudience: prefs.targetAudience || null,
        weeklyEmailDay: prefs.weeklyEmailDay,
        weeklyEmailTime: prefs.weeklyEmailTime,
        autoApprove: prefs.autoApprove,
      },
    })

    // Update lines of business
    if (linesOfBusiness && Array.isArray(linesOfBusiness)) {
      // Deactivate all existing
      await prisma.userLineOfBusiness.updateMany({
        where: { userId },
        data: { isActive: false },
      })

      // Upsert selected lines
      for (const line of linesOfBusiness) {
        await prisma.userLineOfBusiness.upsert({
          where: { userId_line: { userId, line } },
          update: { isActive: true },
          create: { userId, line, isActive: true },
        })
      }
    }

    return NextResponse.json({ message: 'Preferences saved' })
  } catch {
    return NextResponse.json({ error: 'Failed to save preferences' }, { status: 500 })
  }
}
