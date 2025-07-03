import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GED',
  description: 'Created with zini',
  generator: 'zini.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
