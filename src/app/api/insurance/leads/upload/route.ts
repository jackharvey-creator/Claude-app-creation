export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const agentId = formData.get('agentId') as string | null
    const leadJson = formData.get('lead') as string | null

    if (!file) {
      return Response.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    const lead = leadJson ? JSON.parse(leadJson) : {}

    // In production: upload file to S3/Blob storage, attach URL to Salesforce Lead record
    console.log('[InsuranceLead:DecPage]', {
      agentId,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      lead,
    })

    return Response.json({ success: true })
  } catch {
    return Response.json({ success: false }, { status: 400 })
  }
}
