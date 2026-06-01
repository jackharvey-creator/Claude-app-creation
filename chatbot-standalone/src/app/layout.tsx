import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Comparion Insurance — Sales Agent Readiness Assessment',
  description: 'AI-powered candidate screening for Insurance Sales Agent positions at Comparion Insurance.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
