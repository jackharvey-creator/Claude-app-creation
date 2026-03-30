import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUserId, unauthorizedResponse } from '@/lib/auth-helpers'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = await getAuthenticatedUserId()
  if (!userId) return unauthorizedResponse()

  const post = await prisma.post.findFirst({
    where: { id: params.id, userId },
  })

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const body = await request.json()
  const updated = await prisma.post.update({
    where: { id: params.id },
    data: {
      ...(body.content !== undefined && { content: body.content }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.scheduledAt !== undefined && { scheduledAt: body.scheduledAt }),
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const userId = await getAuthenticatedUserId()
  if (!userId) return unauthorizedResponse()

  const post = await prisma.post.findFirst({
    where: { id: params.id, userId },
  })

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  await prisma.post.delete({ where: { id: params.id } })

  return NextResponse.json({ message: 'Deleted' })
}
