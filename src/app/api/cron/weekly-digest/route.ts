import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendApprovalDigestEmail } from '@/lib/email'

// This endpoint is designed to be called by a cron job (e.g., Vercel Cron)
// It processes all users who have weekly digest enabled for the current day/time
export async function POST(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()
    const currentDay = now.getDay() // 0=Sunday

    // Find users whose weekly email day matches today
    const users = await prisma.userPreference.findMany({
      where: {
        weeklyEmailDay: currentDay,
      },
      include: {
        user: true,
      },
    })

    const results = []

    for (const pref of users) {
      try {
        // Check if user has pending posts
        const pendingBatch = await prisma.approvalBatch.findFirst({
          where: {
            userId: pref.userId,
            status: 'PENDING',
          },
        })

        if (pendingBatch) {
          await sendApprovalDigestEmail(pref.userId)
          results.push({ userId: pref.userId, status: 'sent' })
        } else {
          results.push({ userId: pref.userId, status: 'no_pending_content' })
        }
      } catch (error) {
        console.error(`Failed to send digest to user ${pref.userId}:`, error)
        results.push({ userId: pref.userId, status: 'failed' })
      }
    }

    return NextResponse.json({
      processed: results.length,
      results,
    })
  } catch (error) {
    console.error('Weekly digest cron error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
