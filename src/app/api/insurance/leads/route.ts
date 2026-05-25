import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json() as { agentId?: string; lead?: unknown }
    // Production: write to DB, fire webhook to CRM, notify agent via email/SMS
    console.log('[InsuranceLead]', JSON.stringify(body, null, 2))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
