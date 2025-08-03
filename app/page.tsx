'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { LoadingScreen } from '@/components/loading-screen'
import { AuthPage } from '@/components/auth/auth-page'
import { Dashboard } from '@/components/dashboard/dashboard'

export default function HomePage() {
  const { user, loading, initialized } = useAuthStore()
  const router = useRouter()

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

  // Show loading screen while initializing
  if (!initialized || loading) {
    return <LoadingScreen />
  }

  // Show auth page if not authenticated
  if (!user) {
    return <AuthPage />
  }

  // Show dashboard if authenticated
  return <Dashboard />
} 