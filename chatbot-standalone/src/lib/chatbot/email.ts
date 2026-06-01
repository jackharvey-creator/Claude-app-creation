import nodemailer from 'nodemailer'
import type { CandidateAssessment } from '@prisma/client'

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT ?? '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
}

const FROM_ADDRESS = process.env.EMAIL_FROM ?? 'recruiting@comparioninsurance.com'
const MANAGER_EMAIL = process.env.MANAGER_EMAIL ?? 'hiring@comparioninsurance.com'
const COMPANY_NAME = 'Comparion Insurance'

export async function sendCandidateInvite(assessment: CandidateAssessment): Promise<void> {
  const transport = createTransport()
  const candidateName = `${assessment.firstName} ${assessment.lastName}`
  const jobTitle = assessment.nearestJobTitle ?? 'Insurance Sales Agent'
  const office = assessment.nearestOffice ?? 'a local office'
  const jobUrl = assessment.nearestJobUrl ?? 'https://www.comparioninsurance.com/careers'
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;color:#333;line-height:1.6;margin:0;padding:0;background:#f9f9f9}.container{max-width:600px;margin:30px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1)}.header{background:#1a3a6b;color:#fff;padding:28px 32px}.body{padding:32px}.score-badge{display:inline-block;background:#e8f5e9;color:#2e7d32;border-radius:20px;padding:6px 18px;font-weight:bold;font-size:16px;margin-bottom:20px}.cta-button{display:inline-block;background:#1a3a6b;color:#fff;text-decoration:none;padding:14px 32px;border-radius:6px;font-size:16px;font-weight:bold;margin:20px 0}.footer{background:#f4f4f4;padding:20px 32px;font-size:12px;color:#888;text-align:center}</style></head><body><div class="container"><div class="header"><h1 style="margin:0;font-size:22px">Congratulations, ${candidateName}!</h1><p style="margin:6px 0 0;opacity:.85;font-size:14px">${COMPANY_NAME} — Recruitment Team</p></div><div class="body"><p>Thank you for completing your readiness assessment for the <strong>${jobTitle}</strong> position.</p><div class="score-badge">✅ Assessment Score: ${assessment.percentScore}%</div><p>We're excited to let you know that you are a <strong>strong match</strong> for our team at <strong>${office}</strong>!</p><p>Click below to view the full job posting and apply or schedule your interview:</p><a href="${jobUrl}" class="cta-button">View Job &amp; Schedule Interview →</a><p>Best regards,<br><strong>The ${COMPANY_NAME} Recruiting Team</strong></p></div><div class="footer">${COMPANY_NAME} · <a href="https://www.comparioninsurance.com/careers">comparioninsurance.com/careers</a></div></div></body></html>`
  await transport.sendMail({ from: FROM_ADDRESS, to: assessment.email, subject: `🎉 You're a Great Fit — Interview Invitation | ${COMPANY_NAME}`, html })
}

export async function sendManagerNotification(assessment: CandidateAssessment): Promise<void> {
  const transport = createTransport()
  const candidateName = `${assessment.firstName} ${assessment.lastName}`
  const statusBadge = assessment.passed ? `<span style="color:#2e7d32;font-weight:bold">✅ PASSED (${assessment.percentScore}%)</span>` : `<span style="color:#c62828;font-weight:bold">❌ DID NOT PASS (${assessment.percentScore}%)</span>`
  const aiSection = assessment.aiSummary ? `<h3 style="color:#1a3a6b">AI Evaluation</h3><p>${assessment.aiSummary}</p><p><strong>Strengths:</strong> ${(assessment.aiStrengths as string[]).join(', ')}</p><p><strong>Concerns:</strong> ${(assessment.aiConcerns as string[]).join(', ')}</p><p><strong>Recommendation:</strong> ${assessment.aiRecommendation}</p>` : ''
  const prefillParams = new URLSearchParams({ firstName: assessment.firstName, lastName: assessment.lastName, email: assessment.email, phone: assessment.phone ?? '', city: assessment.city ?? '', state: assessment.state ?? '', source: assessment.campaignSource ?? 'chatbot' })
  const applyUrl = `${assessment.nearestJobUrl ?? 'https://www.comparioninsurance.com/careers'}?${prefillParams.toString()}`
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;color:#333;line-height:1.6;margin:0;padding:0;background:#f9f9f9}.container{max-width:640px;margin:30px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1)}.header{background:#1a3a6b;color:#fff;padding:24px 32px}.body{padding:32px}.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;background:#f4f6fa;border-radius:6px;padding:16px;margin:16px 0}.info-item{font-size:14px}.info-item strong{display:block;color:#555;font-size:11px;text-transform:uppercase}.cta-button{display:inline-block;background:#1a3a6b;color:#fff;text-decoration:none;padding:12px 28px;border-radius:6px;font-size:15px;font-weight:bold;margin:8px 4px}.cta-button.secondary{background:#546e7a}.footer{background:#f4f4f4;padding:16px 32px;font-size:12px;color:#888;text-align:center}</style></head><body><div class="container"><div class="header"><h1 style="margin:0;font-size:20px">New Candidate Alert — ${candidateName}</h1></div><div class="body"><p>Result: ${statusBadge}</p><h3 style="color:#1a3a6b">Candidate Info</h3><div class="info-grid"><div class="info-item"><strong>Name</strong>${candidateName}</div><div class="info-item"><strong>Email</strong>${assessment.email}</div><div class="info-item"><strong>Phone</strong>${assessment.phone ?? 'Not provided'}</div><div class="info-item"><strong>Location</strong>${assessment.city ?? ''}, ${assessment.state ?? ''}</div><div class="info-item"><strong>Nearest Office</strong>${assessment.nearestOffice ?? 'N/A'}</div><div class="info-item"><strong>Score</strong>${assessment.rawScore}/${assessment.maxScore} (${assessment.percentScore}%)</div></div>${aiSection}<a href="${applyUrl}" class="cta-button">Open Pre-Filled Application →</a><a href="mailto:${assessment.email}" class="cta-button secondary">Email Candidate</a></div><div class="footer">${COMPANY_NAME} Recruitment System · Powered by AI</div></div></body></html>`
  await transport.sendMail({ from: FROM_ADDRESS, to: MANAGER_EMAIL, subject: `[Recruiting] New Candidate: ${candidateName} — ${assessment.passed ? `✅ PASSED ${assessment.percentScore}%` : `❌ ${assessment.percentScore}%`}`, html })
}
