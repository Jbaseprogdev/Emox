'use client'

import { Heart, Sparkles } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-wellness-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Logo and branding */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="relative">
            <Heart className="w-12 h-12 text-primary-600 animate-pulse-gentle" fill="currentColor" />
            <Sparkles className="w-6 h-6 text-wellness-500 absolute -top-2 -right-2 animate-bounce-gentle" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-wellness-600 bg-clip-text text-transparent">
              Emolinkdn
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Link Emotions. Empower People.
            </p>
          </div>
        </div>

        {/* Loading animation */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-wellness-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Preparing your wellness journey...
        </p>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary-300 rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-wellness-300 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-20 w-2 h-2 bg-primary-200 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-10 w-3 h-3 bg-wellness-200 rounded-full animate-float opacity-30" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
    </div>
  )
} 