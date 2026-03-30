import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUserId, unauthorizedResponse } from '@/lib/auth-helpers'
import { z } from 'zod'

export async function GET() {
  const userId = await getAuthenticatedUserId()
  if (!userId) return unauthorizedResponse()

  const accounts = await prisma.socialAccount.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(accounts)
}

const connectSchema = z.object({
  platform: z.enum(['FACEBOOK', 'INSTAGRAM', 'LINKEDIN', 'TWITTER']),
})

export async function POST(request: Request) {
  const userId = await getAuthenticatedUserId()
  if (!userId) return unauthorizedResponse()

  try {
    const body = await request.json()
    const { platform } = connectSchema.parse(body)

    const existing = await prisma.socialAccount.findUnique({
      where: { userId_platform: { userId, platform } },
    })

    if (existing) {
      return NextResponse.json({ error: 'Platform already connected' }, { status: 409 })
    }

    // In production, this would redirect to OAuth flow.
    // For demo, we simulate a successful connection.
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const account = await prisma.socialAccount.create({
      data: {
        userId,
        platform,
        accountName: `${user?.name || 'User'} (${platform.toLowerCase()})`,
        accountId: `demo_${platform.toLowerCase()}_${Date.now()}`,
        accessToken: 'demo_token',
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      },
    })

    return NextResponse.json(account, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid platform' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to connect platform' }, { status: 500 })
  }
}
