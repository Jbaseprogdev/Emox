'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, LogOut, User, BarChart3, BookOpen, MessageCircle, Camera, AlertTriangle, X, Activity } from 'lucide-react'
import toast from 'react-hot-toast'
import { EmotionDetection } from '@/components/features/emotion-detection'
import { AIJournal } from '@/components/features/ai-journal'
import { VibeRooms } from '@/components/features/vibe-rooms'
import { EmotionThreshold } from '@/components/features/emotion-threshold'
import { AnalyticsDashboard } from '@/components/features/analytics-dashboard'

interface DemoUser {
  id: string
  email: string
  name: string
  avatar: string
  created_at: string
  updated_at: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<DemoUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [showEmotionDetection, setShowEmotionDetection] = useState(false)
  const [showAIJournal, setShowAIJournal] = useState(false)
  const [showVibeRooms, setShowVibeRooms] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showThresholdWarning, setShowThresholdWarning] = useState(false)
  const [recentEmotions, setRecentEmotions] = useState<any[]>([])
  const [journalEntries, setJournalEntries] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    // Check for demo user in localStorage
    const demoUser = localStorage.getItem('demoUser')
    if (demoUser) {
      setUser(JSON.parse(demoUser))
    } else {
      // No user found, redirect to login
      router.push('/')
    }
    setLoading(false)
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem('demoUser')
    toast.success('Signed out successfully')
    router.push('/')
  }

  const handleEmotionDetected = (emotion: any) => {
    setRecentEmotions(prev => [emotion, ...prev.slice(0, 4)])
    
    // Check for threshold warning
    if (emotion.intensity >= 7) {
      setShowThresholdWarning(true)
    }
  }

  const handleJournalEntryCreated = (entry: any) => {
    setJournalEntries(prev => [entry, ...prev.slice(0, 4)])
  }

  const handleThresholdResolve = () => {
    setShowThresholdWarning(false)
    toast.success('Threshold warning resolved')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-wellness-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-wellness-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading your wellness dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-wellness-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Heart className="w-8 h-8 text-primary-600" fill="currentColor" />
                <Sparkles className="w-4 h-4 text-wellness-500 absolute -top-1 -right-1 animate-bounce-gentle" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-wellness-600 bg-clip-text text-transparent">
                Emolinkdn
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-wellness-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user.name}! 👋
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Ready to continue your emotional wellness journey? Let's check in on how you're feeling today.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => setShowEmotionDetection(true)}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Emotion Detection</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              How are you feeling right now? Track your emotions with manual selection or facial detection.
            </p>
            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Check In Now
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => setShowAIJournal(true)}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-wellness-100 dark:bg-wellness-900 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-wellness-600 dark:text-wellness-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Journal</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Write about your day and get AI-powered insights and mood analysis.
            </p>
            <button className="w-full bg-wellness-600 hover:bg-wellness-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Start Writing
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => setShowVibeRooms(true)}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Vibe Rooms</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Connect with others who share similar emotions in our supportive chat rooms.
            </p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              Join Room
            </button>
          </motion.div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Analytics Dashboard */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => setShowAnalytics(true)}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Analytics Dashboard</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              View detailed insights, mood trends, and track your emotional wellness progress.
            </p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
              View Analytics
            </button>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            </div>
            
            <div className="space-y-3">
              {recentEmotions.length > 0 ? (
                recentEmotions.map((emotion, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{emotion.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Intensity: {emotion.intensity}/10</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No recent emotions tracked</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Demo Info */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-4"
        >
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">🎉 Demo Mode Active</h3>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            You're currently using Emolinkdn in demo mode. This is a fully functional preview of the app. 
            All features are simulated to show you how the real app would work.
          </p>
        </motion.div>

        {/* Feature Modals */}
        <AnimatePresence>
          {showEmotionDetection && (
            <EmotionDetection
              onEmotionDetected={handleEmotionDetected}
              onClose={() => setShowEmotionDetection(false)}
            />
          )}

          {showAIJournal && (
            <AIJournal
              onEntryCreated={handleJournalEntryCreated}
              onClose={() => setShowAIJournal(false)}
            />
          )}

          {showVibeRooms && (
            <VibeRooms
              onClose={() => setShowVibeRooms(false)}
              currentUser={user?.name || 'Demo User'}
            />
          )}

          {showAnalytics && (
            <AnalyticsDashboard
              onClose={() => setShowAnalytics(false)}
            />
          )}

          {showThresholdWarning && (
            <EmotionThreshold
              emotion="High Intensity"
              intensity={8}
              onClose={() => setShowThresholdWarning(false)}
              onResolve={handleThresholdResolve}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
} 