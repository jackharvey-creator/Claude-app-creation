import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUserId, unauthorizedResponse } from '@/lib/auth-helpers'

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const userId = await getAuthenticatedUserId()
  if (!userId) return unauthorizedResponse()

  const account = await prisma.socialAccount.findFirst({
    where: { id: params.id, userId },
  })

  if (!account) {
    return NextResponse.json({ error: 'Account not found' }, { status: 404 })
  }

  await prisma.socialAccount.delete({ where: { id: params.id } })

  return NextResponse.json({ message: 'Disconnected' })
}
