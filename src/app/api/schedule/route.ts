import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUserId, unauthorizedResponse } from '@/lib/auth-helpers'

export async function GET() {
  const userId = await getAuthenticatedUserId()
  if (!userId) return unauthorizedResponse()

  const settings = await prisma.scheduleSettings.findUnique({ where: { userId } })

  return NextResponse.json(settings || {
    postsPerWeek: 5,
    preferredDays: [1, 2, 3, 4, 5],
    preferredTimes: ['09:00', '12:00', '17:00'],
    useAutoSchedule: true,
    timezone: 'America/New_York',
  })
}

export async function PUT(request: Request) {
  const userId = await getAuthenticatedUserId()
  if (!userId) return unauthorizedResponse()

  try {
    const body = await request.json()

    await prisma.scheduleSettings.upsert({
      where: { userId },
      update: {
        postsPerWeek: body.postsPerWeek,
        preferredDays: body.preferredDays,
        preferredTimes: body.preferredTimes,
        useAutoSchedule: body.useAutoSchedule,
        timezone: body.timezone,
      },
      create: {
        userId,
        postsPerWeek: body.postsPerWeek,
        preferredDays: body.preferredDays,
        preferredTimes: body.preferredTimes,
        useAutoSchedule: body.useAutoSchedule,
        timezone: body.timezone,
      },
    })

    return NextResponse.json({ message: 'Schedule saved' })
  } catch {
    return NextResponse.json({ error: 'Failed to save schedule' }, { status: 500 })
  }
}
