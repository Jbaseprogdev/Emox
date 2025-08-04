'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, LogOut, User, BarChart3, BookOpen, MessageCircle, Camera, AlertTriangle, X, Activity, Trophy, Brain, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import { EmotionDetection } from '@/components/features/emotion-detection'
import { AIJournal } from '@/components/features/ai-journal'
import { VibeRoomsEnhanced } from '@/components/features/vibe-rooms-enhanced'
import { EmotionThreshold } from '@/components/features/emotion-threshold'
import { AnalyticsDashboard } from '@/components/features/analytics-dashboard'
import { AICoachEnhanced } from '@/components/features/ai-coach-enhanced'
import { GamificationSystem } from '@/components/features/gamification-system'
import { MobileResponsiveLayout } from '@/components/features/mobile-responsive-layout'

interface DemoUser {
  id: string
  name: string
  email: string
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
  const [showAICoach, setShowAICoach] = useState(false)
  const [showGamification, setShowGamification] = useState(false)
  const [recentEmotions, setRecentEmotions] = useState<any[]>([])
  const [journalEntries, setJournalEntries] = useState<any[]>([])
  const [currentMood, setCurrentMood] = useState<any>({ name: 'neutral', intensity: 5 })
  const router = useRouter()

  useEffect(() => {
    const demoUser = localStorage.getItem('demoUser')
    if (demoUser) {
      setUser(JSON.parse(demoUser))
    } else {
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
    setCurrentMood(emotion)
    
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

  const handleAchievementUnlocked = (achievement: any) => {
    toast.success(`🏆 Achievement Unlocked: ${achievement.name}!`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-wellness-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your wellness dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <MobileResponsiveLayout currentUser={user} onSignOut={handleSignOut}>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-wellness-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Desktop Header */}
        <header className="hidden md:block bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-wellness-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-wellness-600 bg-clip-text text-transparent">
                    Emolinkdn
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {user.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowGamification(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200"
                >
                  <Trophy className="w-4 h-4" />
                  <span className="hidden sm:inline">Progress</span>
                </button>
                
                <button
                  onClick={() => setShowAICoach(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-wellness-500 text-white rounded-lg hover:from-primary-600 hover:to-wellness-600 transition-all duration-200"
                >
                  <Brain className="w-4 h-4" />
                  <span className="hidden sm:inline">AI Coach</span>
                </button>
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user.name}!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    How are you feeling today? Let's check in with your emotional wellness.
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">5</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-wellness-600 dark:text-wellness-400">Level 3</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Wellness</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Emotion Detection */}
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

            {/* AI Journal */}
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
                Reflect on your day with AI-powered prompts and insights. Track your emotional journey.
              </p>
              <button className="w-full bg-wellness-600 hover:bg-wellness-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                Start Writing
              </button>
            </motion.div>

            {/* Vibe Rooms */}
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
                Connect with others who share your emotional state. Join supportive conversations.
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                Join Room
              </button>
            </motion.div>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

            {/* AI Coach */}
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setShowAICoach(true)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Wellness Coach</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get personalized emotional support and guidance from your AI wellness companion.
              </p>
              <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
                Chat with Coach
              </button>
            </motion.div>
          </div>

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

          {/* Demo Info */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-blue-800 dark:text-blue-200">Demo Mode Active</h3>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              You're currently using the demo version of Emolinkdn. All features are fully functional with simulated data. 
              Try out the emotion detection, AI journal, vibe rooms, and more!
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
              <VibeRoomsEnhanced
                onClose={() => setShowVibeRooms(false)}
                currentUser={user}
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

            {showAICoach && (
              <AICoachEnhanced
                onClose={() => setShowAICoach(false)}
                currentUser={user}
                currentMood={currentMood}
                onMoodUpdate={setCurrentMood}
              />
            )}

            {showGamification && (
              <GamificationSystem
                onClose={() => setShowGamification(false)}
                currentUser={user}
                onAchievementUnlocked={handleAchievementUnlocked}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </MobileResponsiveLayout>
  )
} 