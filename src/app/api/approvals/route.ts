import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUserId, unauthorizedResponse } from '@/lib/auth-helpers'

export async function GET() {
  const userId = await getAuthenticatedUserId()
  if (!userId) return unauthorizedResponse()

  const batches = await prisma.approvalBatch.findMany({
    where: { userId },
    include: {
      posts: {
        orderBy: { scheduledAt: 'asc' },
      },
    },
    orderBy: { weekStart: 'desc' },
  })

  return NextResponse.json(batches)
}
