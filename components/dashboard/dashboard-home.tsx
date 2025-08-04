'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Activity,
  Plus,
  Heart,
  BookOpen,
  Users
} from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { getEmotionHistory, getJournalEntries } from '@/lib/firebase'
import { EmotionData, DashboardStats } from '@/types'
import { format, subDays } from 'date-fns'

export function DashboardHome() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return

      try {
        // Get emotion history for the last 7 days
        const { data: emotionData } = await getEmotionHistory(user.id, 7)
        
        // Get journal entries
        const { data: journalData } = await getJournalEntries(user.id, 5)

        // Calculate stats
        const weeklyMoodData: EmotionData[] = emotionData?.map(emotion => ({
          type: emotion.emotion_type as any,
          score: emotion.score,
          timestamp: new Date(emotion.created_at)
        })) || []

        const averageMood = weeklyMoodData.length > 0 
          ? weeklyMoodData.reduce((sum, emotion) => sum + emotion.score, 0) / weeklyMoodData.length 
          : 0

        const emotionCounts = weeklyMoodData.reduce((acc, emotion) => {
          acc[emotion.type] = (acc[emotion.type] || 0) + 1
          return acc
        }, {} as Record<string, number>)

        const mostFrequentEmotion = Object.entries(emotionCounts).reduce((a, b) => 
          (emotionCounts[a[0]] || 0) > (emotionCounts[b[0]] || 0) ? a : b
        )[0] as any

        setStats({
          total_entries: journalData?.length || 0,
          current_streak: calculateStreak(weeklyMoodData),
          average_mood: Math.round(averageMood * 10) / 10,
          most_frequent_emotion: mostFrequentEmotion || 'neutral',
          weekly_mood_data: weeklyMoodData
        })
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [user])

  const calculateStreak = (moodData: EmotionData[]): number => {
    if (moodData.length === 0) return 0
    
    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    for (let i = 0; i < 7; i++) {
      const checkDate = subDays(today, i)
      const hasEntry = moodData.some(emotion => {
        const emotionDate = new Date(emotion.timestamp)
        emotionDate.setHours(0, 0, 0, 0)
        return emotionDate.getTime() === checkDate.getTime()
      })
      
      if (hasEntry) {
        streak++
      } else {
        break
      }
    }
    
    return streak
  }

  const quickActions = [
    {
      title: 'Check In',
      description: 'Record your current mood',
      icon: Heart,
      color: 'bg-emotion-joy',
      href: '#emotions'
    },
    {
      title: 'Journal',
      description: 'Write about your day',
      icon: BookOpen,
      color: 'bg-primary-500',
      href: '#journal'
    },
    {
      title: 'Connect',
      description: 'Join a vibe room',
      icon: Users,
      color: 'bg-wellness-500',
      href: '#vibe-rooms'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-50 to-wellness-50 dark:from-primary-900/20 dark:to-wellness-900/20 rounded-xl p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {user?.name.split(' ')[0]}! 💙
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ready to check in on your emotional wellness today?
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.current_streak || 0} days
              </p>
            </div>
            <div className="w-12 h-12 bg-emotion-joy rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Mood</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.average_mood || 0}/10
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Journal Entries</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.total_entries || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-wellness-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Most Frequent</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                {stats?.most_frequent_emotion || 'neutral'}
              </p>
            </div>
            <div className="w-12 h-12 bg-emotion-neutral rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={action.title}
                className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors duration-200 group"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            View all
          </button>
        </div>
        
        {stats?.weekly_mood_data && stats.weekly_mood_data.length > 0 ? (
          <div className="space-y-3">
            {stats.weekly_mood_data.slice(0, 3).map((emotion, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className={`w-3 h-3 bg-emotion-${emotion.type} rounded-full`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {emotion.type}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {format(emotion.timestamp, 'MMM d, yyyy')} • Score: {emotion.score}/10
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              No recent activity. Start by checking in with your emotions!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
} 