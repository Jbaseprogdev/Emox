'use client'

import { AuthPage } from '@/components/auth/auth-page'
import { motion } from 'framer-motion'

export default function HomePage() {
  // Simplified version - always show auth page
  console.log('Rendering simplified home page')
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <AuthPage />
      </motion.div>
    </div>
  )
} 