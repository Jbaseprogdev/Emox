'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { useAppStore } from '@/store/app-store'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const { initialize, initialized } = useAuthStore()
  const { setDarkMode } = useAppStore()

  useEffect(() => {
    // Initialize authentication immediately
    console.log('Providers: Initializing auth store...')
    initialize().catch((error) => {
      console.error('Auth initialization failed:', error)
    })

    // Initialize dark mode from system preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(isDark)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [initialize, setDarkMode]) // Removed initialized from dependencies

  return <>{children}</>
} 