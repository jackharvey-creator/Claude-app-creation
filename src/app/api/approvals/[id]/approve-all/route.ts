import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUserId, unauthorizedResponse } from '@/lib/auth-helpers'

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const userId = await getAuthenticatedUserId()
  if (!userId) return unauthorizedResponse()

  const batch = await prisma.approvalBatch.findFirst({
    where: { id: params.id, userId },
    include: { posts: true },
  })

  if (!batch) {
    return NextResponse.json({ error: 'Batch not found' }, { status: 404 })
  }

  // Approve all pending posts in this batch
  await prisma.post.updateMany({
    where: {
      approvalBatchId: batch.id,
      status: { in: ['PENDING_APPROVAL', 'DRAFT'] },
    },
    data: { status: 'APPROVED' },
  })

  await prisma.approvalBatch.update({
    where: { id: batch.id },
    data: { status: 'FULLY_APPROVED', reviewedAt: new Date() },
  })

  return NextResponse.json({ message: 'All posts approved' })
}
