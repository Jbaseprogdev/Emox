'use client'

import { AuthPage } from '@/components/auth/auth-page'

export default function HomePage() {
  // Simplified version - always show auth page
  console.log('Rendering simplified home page')
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-wellness-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <AuthPage />
    </div>
  )
} 