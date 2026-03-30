import { NextResponse } from 'next/server'
import { getAuthenticatedUserId, unauthorizedResponse } from '@/lib/auth-helpers'
import { sendApprovalDigestEmail } from '@/lib/email'

export async function POST() {
  const userId = await getAuthenticatedUserId()
  if (!userId) return unauthorizedResponse()

  try {
    await sendApprovalDigestEmail(userId)
    return NextResponse.json({ message: 'Approval email sent' })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: 'Email sending failed. Please configure SMTP settings.' },
      { status: 500 }
    )
  }
}
