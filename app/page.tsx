'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { LoadingScreen } from '@/components/loading-screen'
import { AuthPage } from '@/components/auth/auth-page'
import { Dashboard } from '@/components/dashboard/dashboard'

export default function HomePage() {
  const { user, loading, initialized } = useAuthStore()
  const router = useRouter()
  const [showAuth, setShowAuth] = useState(false)

  useEffect(() => {
    // Handle password reset redirect
    const urlParams = new URLSearchParams(window.location.search)
    const accessToken = urlParams.get('access_token')
    const refreshToken = urlParams.get('refresh_token')
    
    if (accessToken && refreshToken) {
      // Handle password reset completion
      router.replace('/dashboard')
    }
  }, [router])

  // Force auth page after timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!initialized || loading) {
        console.log('Timeout reached - showing auth page')
        setShowAuth(true)
      }
    }, 1000) // Reduced to 1 second timeout

    return () => clearTimeout(timer)
  }, [initialized, loading])

  // Debug logging
  console.log('App state:', { user, loading, initialized, showAuth })
  
  // In demo mode, always show auth page if not authenticated
  const isDemoMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'your_firebase_api_key'
  
  // Show auth page if timeout reached, not authenticated, or in demo mode
  if (showAuth || (!initialized && !loading) || (isDemoMode && !user)) {
    console.log('Showing auth page')
    return <AuthPage />
  }

  // Show loading screen while initializing
  if (!initialized || loading) {
    console.log('Showing loading screen')
    return <LoadingScreen />
  }

  // Show auth page if not authenticated
  if (!user) {
    return <AuthPage />
  }

  // Show dashboard if authenticated
  return <Dashboard />
} 