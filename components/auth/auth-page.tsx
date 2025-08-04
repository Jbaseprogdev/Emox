'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Sun, Moon } from 'lucide-react'
import { useAppStore } from '@/store/app-store'
import { SignInForm } from './sign-in-form'
import { SignUpForm } from './sign-up-form'
import { ForgotPasswordForm } from './forgot-password-form'

type AuthMode = 'signin' | 'signup' | 'forgot'

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('signin')
  const { darkMode, toggleDarkMode } = useAppStore()

  const getFormComponent = () => {
    switch (mode) {
      case 'signin':
        return <SignInForm onModeChange={setMode} />
      case 'signup':
        return <SignUpForm onModeChange={setMode} />
      case 'forgot':
        return <ForgotPasswordForm onModeChange={setMode} />
      default:
        return <SignInForm onModeChange={setMode} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-wellness-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-wellness-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600" />
        )}
      </button>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Heart className="w-12 h-12 text-primary-600" fill="currentColor" />
              <Sparkles className="w-6 h-6 text-wellness-500 absolute -top-2 -right-2 animate-bounce-gentle" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-wellness-600 bg-clip-text text-transparent">
                Emolinkdn
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Link Emotions. Empower People.
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {mode === 'signin' && 'Welcome back to your wellness journey'}
            {mode === 'signup' && 'Start your emotional wellness journey'}
            {mode === 'forgot' && 'Reset your password'}
          </p>
        </motion.div>

        {/* Auth Form */}
        <motion.div
          key={mode}
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="card p-8 shadow-2xl"
        >
          <AnimatePresence mode="wait">
            {getFormComponent()}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400"
        >
          <p>Your emotional wellness matters. We're here to support you.</p>
        </motion.div>
      </div>
    </div>
  )
} 