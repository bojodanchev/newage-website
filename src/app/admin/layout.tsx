import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { plusJakarta, inter, jetbrainsMono } from '@/lib/fonts'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Admin · NewAge',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-primary text-foreground font-body antialiased">{children}</body>
    </html>
  )
}
