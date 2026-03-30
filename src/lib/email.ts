import nodemailer from 'nodemailer'
import { prisma } from './prisma'
import { format } from 'date-fns'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendApprovalDigestEmail(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      preferences: true,
    },
  })

  if (!user) throw new Error('User not found')

  // Find the most recent pending batch
  const batch = await prisma.approvalBatch.findFirst({
    where: { userId, status: 'PENDING' },
    include: {
      posts: {
        orderBy: { scheduledAt: 'asc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  if (!batch || batch.posts.length === 0) {
    throw new Error('No pending posts to approve')
  }

  const appUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  // Build email HTML
  const postRows = batch.posts
    .map(
      (post) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
          <span style="background: #eff6ff; color: #1d4ed8; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;">
            ${post.platform}
          </span>
          ${
            post.lineOfBusiness
              ? `<span style="background: #f0fdf4; color: #166534; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-left: 4px;">
                  ${post.lineOfBusiness.replace('_', ' ')}
                </span>`
              : ''
          }
        </td>
      </tr>
      <tr>
        <td style="padding: 0 12px 12px; border-bottom: 1px solid #e5e7eb;">
          <p style="margin: 8px 0; color: #374151; font-size: 14px; line-height: 1.5;">${post.content}</p>
          ${
            post.hashtags.length > 0
              ? `<p style="margin: 4px 0; color: #2563eb; font-size: 12px;">${post.hashtags.map((h) => `#${h}`).join(' ')}</p>`
              : ''
          }
          <p style="margin: 4px 0; color: #9ca3af; font-size: 12px;">
            Scheduled: ${post.scheduledAt ? format(new Date(post.scheduledAt), 'EEEE, MMM d \'at\' h:mm a') : 'TBD'}
          </p>
        </td>
      </tr>
    `
    )
    .join('')

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #2563eb; font-size: 28px; margin: 0;">InsurePost</h1>
          <p style="color: #6b7280; margin-top: 4px;">Weekly Content Approval</p>
        </div>

        <!-- Card -->
        <div style="background: white; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden;">
          <div style="padding: 24px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white;">
            <h2 style="margin: 0; font-size: 20px;">Hi ${user.name},</h2>
            <p style="margin: 8px 0 0; opacity: 0.9;">
              Your content for the week of ${format(new Date(batch.weekStart), 'MMM d')} - ${format(new Date(batch.weekEnd), 'MMM d')} is ready for review.
            </p>
          </div>

          <div style="padding: 24px;">
            <p style="color: #374151; margin: 0 0 16px;">
              We&apos;ve prepared <strong>${batch.posts.length} posts</strong> across your connected platforms.
              Please review and approve them before they go live.
            </p>

            <!-- Posts Table -->
            <table style="width: 100%; border-collapse: collapse;">
              ${postRows}
            </table>

            <!-- Action Buttons -->
            <div style="margin-top: 24px; text-align: center;">
              <a href="${appUrl}/dashboard/approvals"
                 style="display: inline-block; background: #2563eb; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-right: 8px;">
                Review in App
              </a>
              <a href="${appUrl}/api/approvals/${batch.id}/approve-all"
                 style="display: inline-block; background: #16a34a; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                Approve All
              </a>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 32px; color: #9ca3af; font-size: 12px;">
          <p>You're receiving this because you have a weekly digest enabled in InsurePost.</p>
          <p>Manage your email preferences in <a href="${appUrl}/dashboard/preferences" style="color: #2563eb;">Settings</a>.</p>
        </div>
      </div>
    </body>
    </html>
  `

  // Send email
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'InsurePost <noreply@insurepost.com>',
    to: user.email,
    subject: `InsurePost: ${batch.posts.length} posts ready for your approval`,
    html,
  })

  // Update batch status
  await prisma.approvalBatch.update({
    where: { id: batch.id },
    data: { status: 'EMAIL_SENT', emailSentAt: new Date() },
  })

  return { sent: true, batchId: batch.id }
}
