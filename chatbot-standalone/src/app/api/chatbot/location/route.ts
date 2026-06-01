import { NextRequest, NextResponse } from 'next/server'
import { findNearestJob, resolveLocationFromIp } from '@/lib/chatbot/jobs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { latitude?: number; longitude?: number }
    let lat = body.latitude
    let lng = body.longitude
    let source = 'geolocation'
    if (!lat || !lng) {
      source = 'ip'
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? req.headers.get('x-real-ip') ?? '8.8.8.8'
      const ipLoc = await resolveLocationFromIp(ip)
      if (!ipLoc) return NextResponse.json({ error: 'Could not determine location' }, { status: 422 })
      lat = ipLoc.lat; lng = ipLoc.lng
    }
    const { job, distanceMiles } = findNearestJob(lat, lng)
    return NextResponse.json({ nearestJob: { id: job.id, title: job.title, office: job.office, city: job.city, state: job.stateCode, url: job.url, distanceMiles }, resolvedFrom: source })
  } catch (err) {
    console.error('Location API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
