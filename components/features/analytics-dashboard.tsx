'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Calendar, Target, Award, Activity, Heart, Brain, Zap, Clock, X } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface MoodData {
  date: string
  mood: string
  intensity: number
  emotion: string
}

interface JournalEntry {
  id: string
  content: string
  mood: string
  created_at: string
  wordCount: number
}

interface AnalyticsDashboardProps {
  onClose: () => void
}

const moodColors = {
  Joy: '#fbbf24',
  Sadness: '#3b82f6',
  Anger: '#ef4444',
  Excitement: '#f97316',
  Love: '#ec4899',
  Calm: '#10b981',
  Anxiety: '#8b5cf6'
}

const mockMoodData: MoodData[] = [
  { date: '2024-01-01', mood: 'Joy', intensity: 7, emotion: 'Happy' },
  { date: '2024-01-02', mood: 'Calm', intensity: 6, emotion: 'Peaceful' },
  { date: '2024-01-03', mood: 'Anxiety', intensity: 8, emotion: 'Worried' },
  { date: '2024-01-04', mood: 'Sadness', intensity: 5, emotion: 'Down' },
  { date: '2024-01-05', mood: 'Joy', intensity: 8, emotion: 'Excited' },
  { date: '2024-01-06', mood: 'Calm', intensity: 7, emotion: 'Relaxed' },
  { date: '2024-01-07', mood: 'Love', intensity: 9, emotion: 'Grateful' },
  { date: '2024-01-08', mood: 'Anxiety', intensity: 6, emotion: 'Stressed' },
  { date: '2024-01-09', mood: 'Joy', intensity: 7, emotion: 'Content' },
  { date: '2024-01-10', mood: 'Calm', intensity: 8, emotion: 'Mindful' }
]

const mockJournalEntries: JournalEntry[] = [
  { id: '1', content: 'Had a great day today...', mood: 'Joy', created_at: '2024-01-10', wordCount: 150 },
  { id: '2', content: 'Feeling a bit anxious about...', mood: 'Anxiety', created_at: '2024-01-09', wordCount: 200 },
  { id: '3', content: 'Grateful for my family...', mood: 'Love', created_at: '2024-01-08', wordCount: 120 },
  { id: '4', content: 'Work was challenging today...', mood: 'Sadness', created_at: '2024-01-07', wordCount: 180 },
  { id: '5', content: 'Excited about the weekend...', mood: 'Excitement', created_at: '2024-01-06', wordCount: 90 }
]

const insights = [
  {
    id: 1,
    title: 'Mood Improvement Trend',
    description: 'Your overall mood has improved by 15% over the last 7 days',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    id: 2,
    title: 'Consistent Journaling',
    description: 'You\'ve journaled 5 days in a row - great consistency!',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    id: 3,
    title: 'Emotional Awareness',
    description: 'You\'re becoming more aware of your emotional patterns',
    icon: Brain,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20'
  },
  {
    id: 4,
    title: 'Stress Management',
    description: 'Your stress levels have decreased by 20% this week',
    icon: Heart,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100 dark:bg-pink-900/20'
  }
]

const achievements = [
  { id: 1, title: '7-Day Streak', description: 'Journaled for 7 consecutive days', icon: Award, unlocked: true },
  { id: 2, title: 'Mood Master', description: 'Tracked 10 different emotions', icon: Brain, unlocked: true },
  { id: 3, title: 'Reflection Pro', description: 'Wrote 1000+ words in journal', icon: Target, unlocked: true },
  { id: 4, title: 'Calm Seeker', description: 'Achieved 5 calm moments', icon: Heart, unlocked: false },
  { id: 5, title: 'Support Giver', description: 'Helped 3 others in Vibe Rooms', icon: Activity, unlocked: false }
]

export function AnalyticsDashboard({ onClose }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d')
  const [selectedMetric, setSelectedMetric] = useState<'mood' | 'journal' | 'activity'>('mood')

  // Calculate statistics
  const totalEntries = mockJournalEntries.length
  const averageMood = mockMoodData.reduce((sum, data) => sum + data.intensity, 0) / mockMoodData.length
  const totalWords = mockJournalEntries.reduce((sum, entry) => sum + entry.wordCount, 0)
  const moodStreak = 7 // Mock streak calculation

  // Prepare chart data
  const chartData = mockMoodData.map(data => ({
    date: new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    intensity: data.intensity,
    mood: data.mood
  }))

  const moodDistribution = Object.entries(
    mockMoodData.reduce((acc, data) => {
      acc[data.mood] = (acc[data.mood] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  ).map(([mood, count]) => ({
    name: mood,
    value: count,
    color: moodColors[mood as keyof typeof moodColors] || '#6b7280'
  }))

  const journalTrend = mockJournalEntries.map(entry => ({
    date: new Date(entry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    words: entry.wordCount,
    mood: entry.mood
  }))

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your emotional wellness insights</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Time Range Selector */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {(['7d', '30d', '90d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    timeRange === range
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Average Mood</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{averageMood.toFixed(1)}/10</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">Journal Entries</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">{totalEntries}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Current Streak</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{moodStreak} days</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">Words Written</p>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{totalWords}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mood Trend Chart */}
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mood Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" domain={[0, 10]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="intensity" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Mood Distribution */}
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mood Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={moodDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {moodDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Journal Activity */}
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Journal Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={journalTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                  />
                  <Bar dataKey="words" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Insights */}
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Insights</h3>
              <div className="space-y-3">
                {insights.slice(0, 3).map((insight) => {
                  const Icon = insight.icon
                  return (
                    <motion.div
                      key={insight.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg ${insight.bgColor}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${insight.color}`} />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">{insight.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{insight.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      achievement.unlocked
                        ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                        : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        achievement.unlocked
                          ? 'bg-green-600'
                          : 'bg-gray-400'
                      }`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className={`font-medium text-sm ${
                          achievement.unlocked
                            ? 'text-green-900 dark:text-green-100'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {achievement.title}
                        </p>
                        <p className={`text-xs ${
                          achievement.unlocked
                            ? 'text-green-700 dark:text-green-200'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Close Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 