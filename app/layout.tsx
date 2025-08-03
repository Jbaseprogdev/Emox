import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Emolinkdn - Link Emotions. Empower People.',
  description: 'A smart emotional wellness app that empowers users to understand, track, and regulate their emotions through journaling, mood detection, and social connection.',
  keywords: 'emotional wellness, mental health, mood tracking, journaling, AI coaching, social support',
  authors: [{ name: 'Emolinkdn Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Emolinkdn - Link Emotions. Empower People.',
    description: 'A smart emotional wellness app that empowers users to understand, track, and regulate their emotions.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emolinkdn - Link Emotions. Empower People.',
    description: 'A smart emotional wellness app that empowers users to understand, track, and regulate their emotions.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--background-start-rgb)',
                color: 'var(--foreground-rgb)',
                border: '1px solid var(--border-rgb)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
} 