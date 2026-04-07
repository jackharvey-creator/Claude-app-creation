import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

// Simple text extraction from plain-text resumes and basic PDF detection
// For production, integrate a PDF parser (e.g., pdf-parse or a cloud service)
function extractTextFromBuffer(buffer: Buffer, mimeType: string): string {
  if (mimeType === 'text/plain') {
    return buffer.toString('utf-8')
  }
  // For PDF/DOCX, return a placeholder — integrate a real parser in production
  // e.g., npm install pdf-parse  →  pdfParse(buffer).then(d => d.text)
  return '[Resume uploaded — text extraction requires PDF/DOCX parser integration]'
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('resume') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const allowedTypes = [
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload a PDF, DOC, DOCX, or TXT file.' },
        { status: 400 }
      )
    }

    const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5 MB.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const resumeText = extractTextFromBuffer(buffer, file.type)

    return NextResponse.json({
      success: true,
      fileName: file.name,
      resumeText,
      fileSize: file.size,
      mimeType: file.type,
    })
  } catch (err) {
    console.error('Resume upload error:', err)
    return NextResponse.json({ error: 'Failed to process resume' }, { status: 500 })
  }
}
