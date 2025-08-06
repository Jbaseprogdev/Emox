import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/components/providers'
import { ErrorBoundary } from '@/lib/error-boundary'
import { initializePerformanceMonitoring } from '@/lib/performance'
import { enableDevTesting } from '@/lib/testing'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Emolinkdn - Link Emotions. Empower People.',
  description: 'A smart emotional wellness app that empowers users to understand, track, and regulate their emotions through journaling, mood detection, and social connection.',
  keywords: 'emotional wellness, mental health, mood tracking, journaling, AI coaching, social support',
  authors: [{ name: 'Emolinkdn Team' }],
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
          <ErrorBoundary>
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
          </ErrorBoundary>
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                try {
                  ${initializePerformanceMonitoring.toString()}();
                  ${enableDevTesting.toString()}();
                } catch (error) {
                  console.warn('Performance monitoring initialization failed:', error);
                }
              }
            `,
          }}
        />
      </body>
    </html>
  )
} 