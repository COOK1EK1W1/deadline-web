import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Deadline O Matic',
  description: 'The upcoming deadlines',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-slate-800 dark:text-white`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
