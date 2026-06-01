import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateScore, type AssessmentAnswer } from '@/lib/chatbot/questions'
import { evaluateCandidate } from '@/lib/chatbot/evaluate'
import { findNearestJob, resolveLocationFromIp } from '@/lib/chatbot/jobs'
import { sendCandidateInvite, sendManagerNotification } from '@/lib/chatbot/email'

export const maxDuration = 60

interface AssessRequest {
  firstName: string
  lastName: string
  email: string
  phone?: string
  answers: AssessmentAnswer[]
  latitude?: number
  longitude?: number
  city?: string
  state?: string
  zipCode?: string
  linkedInUrl?: string
  linkedInData?: object
  resumeFileName?: string
  resumeText?: string
  campaignSource?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AssessRequest

    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!Array.isArray(body.answers) || body.answers.length === 0) {
      return NextResponse.json({ error: 'No answers provided' }, { status: 400 })
    }

    const score = calculateScore(body.answers)

    let lat = body.latitude
    let lng = body.longitude
    let city = body.city
    let state = body.state

    if (!lat || !lng) {
      const ip =
        req.headers.get('x-forwarded-for')?.split(',')[0] ??
        req.headers.get('x-real-ip') ??
        '8.8.8.8'
      const ipLoc = await resolveLocationFromIp(ip)
      if (ipLoc) {
        lat = ipLoc.lat
        lng = ipLoc.lng
        city = city || ipLoc.city
        state = state || ipLoc.state
      }
    }

    const nearest = lat && lng ? findNearestJob(lat, lng) : null

    const aiResult = await evaluateCandidate({
      firstName: body.firstName,
      lastName: body.lastName,
      answers: body.answers,
      ...score,
      resumeText: body.resumeText,
      linkedInData: body.linkedInData as Parameters<typeof evaluateCandidate>[0]['linkedInData'],
    })

    const assessment = await prisma.candidateAssessment.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        city,
        state,
        zipCode: body.zipCode,
        latitude: lat,
        longitude: lng,
        nearestJobId: nearest?.job.id,
        nearestJobTitle: nearest?.job.title,
        nearestJobUrl: nearest?.job.url,
        nearestOffice: nearest?.job.office,
        distanceMiles: nearest?.distanceMiles,
        linkedInUrl: body.linkedInUrl,
        linkedInData: body.linkedInData ? (body.linkedInData as object) : undefined,
        resumeFileName: body.resumeFileName,
        resumeText: body.resumeText,
        answers: body.answers as object[],
        rawScore: score.rawScore,
        maxScore: score.maxScore,
        percentScore: score.percentScore,
        passed: score.passed,
        aiSummary: aiResult.summary,
        aiStrengths: aiResult.strengths,
        aiConcerns: aiResult.concerns,
        aiRecommendation: aiResult.recommendation,
        status: score.passed ? 'PASSED' : 'FAILED',
        campaignSource: body.campaignSource,
      },
    })

    const emailPromises: Promise<void>[] = []

    if (score.passed) {
      emailPromises.push(
        sendCandidateInvite(assessment).catch((err) =>
          console.error('Failed to send candidate invite:', err)
        )
      )
    }

    emailPromises.push(
      sendManagerNotification(assessment).catch((err) =>
        console.error('Failed to send manager notification:', err)
      )
    )

    await Promise.allSettled(emailPromises)

    if (score.passed) {
      await prisma.candidateAssessment.update({
        where: { id: assessment.id },
        data: { inviteSentAt: new Date(), managerNotifiedAt: new Date(), status: 'INVITED' },
      })
    } else {
      await prisma.candidateAssessment.update({
        where: { id: assessment.id },
        data: { managerNotifiedAt: new Date() },
      })
    }

    return NextResponse.json({
      success: true,
      assessmentId: assessment.id,
      result: {
        passed: score.passed,
        percentScore: score.percentScore,
        rawScore: score.rawScore,
        maxScore: score.maxScore,
        aiSummary: aiResult.summary,
        aiStrengths: aiResult.strengths,
        aiConcerns: aiResult.concerns,
        aiRecommendation: aiResult.recommendation,
        nearestJob: nearest
          ? {
              title: nearest.job.title,
              office: nearest.job.office,
              city: nearest.job.city,
              state: nearest.job.stateCode,
              url: nearest.job.url,
              distanceMiles: nearest.distanceMiles,
            }
          : null,
        inviteSent: score.passed,
      },
    })
  } catch (err) {
    console.error('Assessment API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
