'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Sun, Moon, Brain, Users, Target } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        />
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 3, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-20 left-20 w-28 h-28 bg-gradient-to-br from-pink-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-50"
        />
      </div>

      {/* Theme toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 shadow-lg"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600" />
        )}
      </motion.button>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="mb-8">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl mb-6"
              >
                <Brain className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
              >
                Emolinkdn
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              >
                Link Emotions. Empower People.
              </motion.p>
            </div>

            {/* Feature Highlights */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">Track your emotional wellness journey</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">Connect with like-minded individuals</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">Achieve your wellness goals</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-md">
              {/* Auth Form */}
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/50 p-8"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {mode === 'signin' && 'Welcome Back'}
                    {mode === 'signup' && 'Join Our Community'}
                    {mode === 'forgot' && 'Reset Password'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {mode === 'signin' && 'Sign in to continue your wellness journey'}
                    {mode === 'signup' && 'Create your account and start your journey'}
                    {mode === 'forgot' && 'Enter your email to reset your password'}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {getFormComponent()}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 