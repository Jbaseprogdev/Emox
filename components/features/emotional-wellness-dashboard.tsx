'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, TrendingUp, TrendingDown, Calendar, BookOpen, 
  Target, Award, Brain, Heart, Zap, Sparkles, 
  BarChart3, PieChart, Activity, Clock, Star,
  Sun, Moon, Filter, RefreshCw, ChevronLeft, ChevronRight
} from 'lucide-react'
import toast from 'react-hot-toast'

interface EmotionalWellnessProps {
  onClose: () => void
  currentUser?: any
}

interface MoodEntry {
  id: string
  date: string
  moodScore: number
  emotion: string
  journalEntry?: string
  wordCount?: number
  timestamp: Date
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: Date
  progress: number
  maxProgress: number
  category: 'streak' | 'mood' | 'journal' | 'support' | 'reflection'
}

interface Insight {
  id: string
  type: 'improvement' | 'consistency' | 'pattern' | 'achievement' | 'suggestion'
  title: string
  description: string
  icon: string
  color: string
  timestamp: Date
}

export function EmotionalWellnessDashboard({ onClose, currentUser }: EmotionalWellnessProps) {
  const [timeFilter, setTimeFilter] = useState<'7d' | '30d' | '90d'>('7d')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock data - in real app, this would come from Firebase/Supabase
  const mockMoodEntries: MoodEntry[] = [
    { id: '1', date: '2024-01-01', moodScore: 7, emotion: 'Joy', journalEntry: 'Great start to the year!', wordCount: 45, timestamp: new Date('2024-01-01') },
    { id: '2', date: '2024-01-02', moodScore: 6, emotion: 'Calm', journalEntry: 'Feeling peaceful today.', wordCount: 32, timestamp: new Date('2024-01-02') },
    { id: '3', date: '2024-01-03', moodScore: 8, emotion: 'Joy', journalEntry: 'Amazing day with friends!', wordCount: 78, timestamp: new Date('2024-01-03') },
    { id: '4', date: '2024-01-04', moodScore: 5, emotion: 'Anxiety', journalEntry: 'A bit stressed about work.', wordCount: 56, timestamp: new Date('2024-01-04') },
    { id: '5', date: '2024-01-05', moodScore: 9, emotion: 'Love', journalEntry: 'Perfect day with family!', wordCount: 120, timestamp: new Date('2024-01-05') },
    { id: '6', date: '2024-01-06', moodScore: 7, emotion: 'Calm', journalEntry: 'Relaxing weekend vibes.', wordCount: 89, timestamp: new Date('2024-01-06') },
    { id: '7', date: '2024-01-07', moodScore: 6, emotion: 'Sadness', journalEntry: 'Missing someone today.', wordCount: 67, timestamp: new Date('2024-01-07') },
    { id: '8', date: '2024-01-08', moodScore: 8, emotion: 'Joy', journalEntry: 'Back to positive energy!', wordCount: 95, timestamp: new Date('2024-01-08') },
    { id: '9', date: '2024-01-09', moodScore: 7, emotion: 'Calm', journalEntry: 'Balanced and centered.', wordCount: 58, timestamp: new Date('2024-01-09') }
  ]

  const mockAchievements: Achievement[] = [
    { id: '1', name: '7-Day Streak', description: 'Journaled for 7 consecutive days', icon: '🔥', unlocked: true, unlockedAt: new Date('2024-01-07'), progress: 7, maxProgress: 7, category: 'streak' },
    { id: '2', name: 'Mood Master', description: 'Tracked 10 different emotions', icon: '🎭', unlocked: false, progress: 6, maxProgress: 10, category: 'mood' },
    { id: '3', name: 'Reflection Pro', description: 'Wrote 1000+ words', icon: '✍️', unlocked: true, unlockedAt: new Date('2024-01-05'), progress: 1200, maxProgress: 1000, category: 'journal' },
    { id: '4', name: 'Calm Seeker', description: 'Logged 5 calm moments', icon: '😌', unlocked: true, unlockedAt: new Date('2024-01-06'), progress: 5, maxProgress: 5, category: 'mood' },
    { id: '5', name: 'Support Giver', description: 'Helped 3 users in Vibe Rooms', icon: '🤗', unlocked: false, progress: 2, maxProgress: 3, category: 'support' }
  ]

  const mockInsights: Insight[] = [
    { id: '1', type: 'improvement', title: 'Mood Improvement', description: 'Your overall mood has improved by 15% over the last 7 days.', icon: '📈', color: 'text-green-600', timestamp: new Date() },
    { id: '2', type: 'consistency', title: 'Great Consistency', description: 'You\'ve journaled 5 days in a row — great consistency!', icon: '🔥', color: 'text-orange-600', timestamp: new Date() },
    { id: '3', type: 'pattern', title: 'Emotional Awareness', description: 'You\'re becoming more aware of your emotional patterns.', icon: '🧠', color: 'text-blue-600', timestamp: new Date() },
    { id: '4', type: 'achievement', title: 'New Achievement', description: 'Congratulations! You unlocked "7-Day Streak"!', icon: '🏆', color: 'text-purple-600', timestamp: new Date() }
  ]

  // Calculate filtered data based on time filter
  const filteredData = useMemo(() => {
    const now = new Date()
    const daysToSubtract = timeFilter === '7d' ? 7 : timeFilter === '30d' ? 30 : 90
    const startDate = new Date(now.getTime() - (daysToSubtract * 24 * 60 * 60 * 1000))
    
    return mockMoodEntries.filter(entry => entry.timestamp >= startDate)
  }, [timeFilter])

  // Calculate metrics
  const metrics = useMemo(() => {
    const averageMood = filteredData.length > 0 
      ? (filteredData.reduce((sum, entry) => sum + entry.moodScore, 0) / filteredData.length).toFixed(1)
      : '0.0'
    
    const journalEntries = filteredData.length
    const totalWords = filteredData.reduce((sum, entry) => sum + (entry.wordCount || 0), 0)
    
    // Calculate current streak
    let currentStreak = 0
    const sortedEntries = [...filteredData].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    for (let i = 0; i < sortedEntries.length; i++) {
      if (i === 0 || 
          (sortedEntries[i-1].timestamp.getTime() - sortedEntries[i].timestamp.getTime()) <= 24 * 60 * 60 * 1000) {
        currentStreak++
      } else {
        break
      }
    }

    return {
      averageMood: parseFloat(averageMood),
      journalEntries,
      currentStreak,
      totalWords
    }
  }, [filteredData])

  // Calculate emotion distribution
  const emotionDistribution = useMemo(() => {
    const emotionCounts: { [key: string]: number } = {}
    filteredData.forEach(entry => {
      emotionCounts[entry.emotion] = (emotionCounts[entry.emotion] || 0) + 1
    })
    
    const total = Object.values(emotionCounts).reduce((sum, count) => sum + count, 0)
    return Object.entries(emotionCounts).map(([emotion, count]) => ({
      emotion,
      percentage: Math.round((count / total) * 100),
      count
    })).sort((a, b) => b.percentage - a.percentage)
  }, [filteredData])

  const emotionColors = {
    'Joy': '#FCD34D',
    'Calm': '#60A5FA',
    'Anxiety': '#F59E0B',
    'Sadness': '#8B5CF6',
    'Love': '#EC4899',
    'Excitement': '#EF4444',
    'Gratitude': '#10B981'
  }

  const emotionIcons = {
    'Joy': '😊',
    'Calm': '😌',
    'Anxiety': '😰',
    'Sadness': '😢',
    'Love': '🥰',
    'Excitement': '🤩',
    'Gratitude': '🙏'
  }

  const handleRefresh = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
    toast.success('Analytics refreshed!')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-7xl h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-wellness-50 dark:from-primary-900/20 dark:to-wellness-900/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-wellness-500 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Emotional Wellness Insights</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Track your emotional journey and celebrate progress</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-300 ${loading ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
            </button>
            
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Time Filter */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Period:</span>
            </div>
            
            <div className="flex items-center space-x-1">
              {(['7d', '30d', '90d'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    timeFilter === filter
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {filter === '7d' ? '7 Days' : filter === '30d' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">          <div className="space-y-6">
            {/* Metrics Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {metrics.averageMood}/10
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Average Mood Score</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {filteredData.length} entries tracked
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {metrics.journalEntries}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Journal Entries</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {timeFilter === '7d' ? 'This week' : timeFilter === '30d' ? 'This month' : 'This quarter'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl border border-orange-200 dark:border-orange-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {metrics.currentStreak}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Current Streak</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {metrics.currentStreak > 0 ? 'days in a row' : 'Start journaling!'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {metrics.totalWords}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Words Written</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Across all entries
                </p>
              </motion.div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mood Trend Graph */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mood Trend</h3>
                  <BarChart3 className="w-5 h-5 text-gray-500" />
                </div>
                
                <div className="h-64 flex items-end justify-between space-x-2">
                  {filteredData.map((entry, index) => {
                    const height = (entry.moodScore / 10) * 100
                    return (
                      <div key={entry.id} className="flex-1 flex flex-col items-center">
                        <div className="relative group">
                          <div
                            className="bg-gradient-to-t from-primary-500 to-primary-300 rounded-t-lg transition-all duration-300 group-hover:from-primary-600 group-hover:to-primary-400"
                            style={{ height: `${height}%`, minHeight: '20px' }}
                          />
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {entry.moodScore}/10
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 text-center">
                          {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </motion.div>

              {/* Mood Distribution Pie Chart */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="p-6 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Emotion Distribution</h3>
                  <PieChart className="w-5 h-5 text-gray-500" />
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="w-32 h-32 relative">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {emotionDistribution.map((item, index) => {
                        const previousPercentages = emotionDistribution
                          .slice(0, index)
                          .reduce((sum, item) => sum + item.percentage, 0)
                        const startAngle = (previousPercentages / 100) * 360
                        const endAngle = ((previousPercentages + item.percentage) / 100) * 360
                        
                        const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                        const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                        const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                        const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
                        
                        const largeArcFlag = item.percentage > 50 ? 1 : 0
                        
                        return (
                          <path
                            key={item.emotion}
                            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={emotionColors[item.emotion as keyof typeof emotionColors] || '#6B7280'}
                            className="transition-all duration-300 hover:opacity-80"
                          />
                        )
                      })}
                    </svg>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {emotionDistribution.map((item) => (
                      <div key={item.emotion} className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: emotionColors[item.emotion as keyof typeof emotionColors] || '#6B7280' }}
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {emotionIcons[item.emotion as keyof typeof emotionIcons]} {item.emotion}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Journal Activity Bar Graph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="p-6 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Journal Activity</h3>
                <Activity className="w-5 h-5 text-gray-500" />
              </div>
              
              <div className="h-48 flex items-end justify-between space-x-2">
                {filteredData.map((entry) => {
                  const maxWords = Math.max(...filteredData.map(e => e.wordCount || 0))
                  const height = maxWords > 0 ? ((entry.wordCount || 0) / maxWords) * 100 : 0
                  return (
                    <div key={entry.id} className="flex-1 flex flex-col items-center">
                      <div className="relative group">
                        <div
                          className="bg-gradient-to-t from-wellness-500 to-wellness-300 rounded-t-lg transition-all duration-300 group-hover:from-wellness-600 group-hover:to-wellness-400"
                          style={{ height: `${height}%`, minHeight: '20px' }}
                        />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {entry.wordCount} words
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2 text-center">
                        {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Insights and Achievements Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Insights</h3>
                
                <div className="space-y-3">
                  {mockInsights.map((insight) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{insight.icon}</div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${insight.color}`}>{insight.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {insight.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Achievements</h3>
                
                <div className="space-y-3">
                  {mockAchievements.map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        achievement.unlocked
                          ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800'
                          : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`text-2xl ${achievement.unlocked ? 'animate-pulse' : 'opacity-50'}`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${achievement.unlocked ? 'text-yellow-800 dark:text-yellow-200' : 'text-gray-900 dark:text-white'}`}>
                            {achievement.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {achievement.description}
                          </p>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                              <span>Progress</span>
                              <span>{achievement.progress}/{achievement.maxProgress}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  achievement.unlocked
                                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                                    : 'bg-primary-500'
                                }`}
                                style={{ width: `${Math.min((achievement.progress / achievement.maxProgress) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        {achievement.unlocked && (
                          <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 
