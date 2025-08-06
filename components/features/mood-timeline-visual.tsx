'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, Calendar, BarChart3, PieChart, Activity, X,
  Filter, Download, Share2, Eye, EyeOff, RefreshCw,
  Smile, Frown, Meh, Heart, Zap, Target, Star, Brain
} from 'lucide-react'
import toast from 'react-hot-toast'

interface MoodTimelineVisualProps {
  onClose: () => void
  currentUser?: any
}

interface MoodEntry {
  id: string
  date: string
  mood: number
  energy: number
  stress: number
  focus: number
  motivation: number
  anxiety: number
  happiness: number
  notes: string
  activities: string[]
  tags: string[]
}

interface MoodInsight {
  type: 'trend' | 'pattern' | 'correlation' | 'recommendation'
  title: string
  description: string
  icon: React.ReactNode
  color: string
  value?: string
}

export function MoodTimelineVisual({ onClose, currentUser }: MoodTimelineVisualProps) {
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('mood')
  const [viewMode, setViewMode] = useState('timeline')
  const [loading, setLoading] = useState(true)

  // Mock data for mood entries
  const mockMoodEntries: MoodEntry[] = [
    { id: '1', date: '2024-01-01', mood: 4, energy: 3, stress: 2, focus: 4, motivation: 3, anxiety: 2, happiness: 4, notes: 'Great start to the year!', activities: ['Meditation', 'Exercise'], tags: ['positive', 'energetic'] },
    { id: '2', date: '2024-01-02', mood: 3, energy: 4, stress: 3, focus: 3, motivation: 4, anxiety: 3, happiness: 3, notes: 'Productive day at work', activities: ['Work', 'Reading'], tags: ['productive', 'focused'] },
    { id: '3', date: '2024-01-03', mood: 5, energy: 5, stress: 1, focus: 5, motivation: 5, anxiety: 1, happiness: 5, notes: 'Amazing day with friends!', activities: ['Socializing', 'Music'], tags: ['social', 'joyful'] },
    { id: '4', date: '2024-01-04', mood: 2, energy: 2, stress: 4, focus: 2, motivation: 2, anxiety: 4, happiness: 2, notes: 'Feeling a bit down today', activities: ['Rest'], tags: ['low-energy', 'stress'] },
    { id: '5', date: '2024-01-05', mood: 3, energy: 3, stress: 3, focus: 3, motivation: 3, anxiety: 3, happiness: 3, notes: 'Balanced day', activities: ['Walking', 'Cooking'], tags: ['balanced', 'neutral'] },
    { id: '6', date: '2024-01-06', mood: 4, energy: 4, stress: 2, focus: 4, motivation: 4, anxiety: 2, happiness: 4, notes: 'Good recovery day', activities: ['Exercise', 'Meditation'], tags: ['recovery', 'positive'] },
    { id: '7', date: '2024-01-07', mood: 5, energy: 4, stress: 1, focus: 5, motivation: 5, anxiety: 1, happiness: 5, notes: 'Perfect weekend!', activities: ['Nature', 'Creative'], tags: ['weekend', 'creative'] }
  ]

  const moodInsights: MoodInsight[] = [
    {
      type: 'trend',
      title: 'Upward Trend',
      description: 'Your mood has been improving over the last 7 days',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
      value: '+15%'
    },
    {
      type: 'pattern',
      title: 'Weekend Effect',
      description: 'You consistently feel better on weekends',
      icon: <Calendar className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      type: 'correlation',
      title: 'Exercise Impact',
      description: 'Exercise days show 20% higher mood scores',
      icon: <Zap className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      value: '+20%'
    },
    {
      type: 'recommendation',
      title: 'Stress Management',
      description: 'Consider more meditation on high-stress days',
      icon: <Heart className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const getMoodColor = (value: number) => {
    if (value <= 2) return 'text-red-500'
    if (value <= 3) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getMoodIcon = (value: number) => {
    if (value <= 2) return <Frown className="w-5 h-5" />
    if (value <= 3) return <Meh className="w-5 h-5" />
    return <Smile className="w-5 h-5" />
  }

  const getMoodGradient = (value: number) => {
    if (value <= 2) return 'from-red-500 to-red-600'
    if (value <= 3) return 'from-yellow-500 to-orange-500'
    return 'from-green-500 to-emerald-500'
  }

  const calculateAverageMood = () => {
    const total = mockMoodEntries.reduce((sum, entry) => sum + entry.mood, 0)
    return (total / mockMoodEntries.length).toFixed(1)
  }

  const getMoodTrend = () => {
    const recent = mockMoodEntries.slice(-3)
    const earlier = mockMoodEntries.slice(-6, -3)
    const recentAvg = recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length
    const earlierAvg = earlier.reduce((sum, entry) => sum + entry.mood, 0) / earlier.length
    return recentAvg > earlierAvg ? 'up' : recentAvg < earlierAvg ? 'down' : 'stable'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mood Timeline Visual</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visual mood history and trend analysis</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Loading mood timeline...</span>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Smile className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Avg Mood</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{calculateAverageMood()}/5</div>
                  <div className="flex items-center space-x-1 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+15% this week</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Entries</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{mockMoodEntries.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">This period</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Best Day</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">5.0</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Jan 3, 2024</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Streak</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">3</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Days improving</div>
                </motion.div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mood Timeline</h3>
                  <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('timeline')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === 'timeline'
                          ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      Timeline
                    </button>
                    <button
                      onClick={() => setViewMode('chart')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === 'chart'
                          ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      Chart
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Timeline View */}
              {viewMode === 'timeline' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {mockMoodEntries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                    >
                      <div className="flex items-start space-x-4">
                        {/* Date and Mood Icon */}
                        <div className="text-center">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getMoodGradient(entry.mood)} flex items-center justify-center text-white text-xl font-bold mb-2`}>
                            {entry.mood}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>

                        {/* Mood Details */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {getMoodIcon(entry.mood)}
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                Mood Level {entry.mood}/5
                              </h4>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                              <span>Energy: {entry.energy}/5</span>
                              <span>Stress: {entry.stress}/5</span>
                              <span>Focus: {entry.focus}/5</span>
                            </div>
                          </div>

                          {entry.notes && (
                            <p className="text-gray-600 dark:text-gray-400 mb-3">{entry.notes}</p>
                          )}

                          {/* Activities and Tags */}
                          <div className="flex flex-wrap gap-2">
                            {entry.activities.map((activity) => (
                              <span
                                key={activity}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-xs"
                              >
                                {activity}
                              </span>
                            ))}
                            {entry.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Trend Indicator */}
                        <div className="flex flex-col items-center space-y-2">
                          {index > 0 && (
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              entry.mood > mockMoodEntries[index - 1].mood
                                ? 'bg-green-100 text-green-600'
                                : entry.mood < mockMoodEntries[index - 1].mood
                                ? 'bg-red-100 text-red-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {entry.mood > mockMoodEntries[index - 1].mood ? '↗' : entry.mood < mockMoodEntries[index - 1].mood ? '↘' : '→'}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Chart View */}
              {viewMode === 'chart' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                >
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Mood Trends Chart</h4>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {mockMoodEntries.map((entry, index) => (
                      <div key={entry.id} className="flex-1 flex flex-col items-center space-y-2">
                        <div
                          className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-80 ${
                            getMoodGradient(entry.mood).includes('red') ? 'bg-red-500' :
                            getMoodGradient(entry.mood).includes('yellow') ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ height: `${(entry.mood / 5) * 200}px` }}
                        ></div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
                          <div className="font-medium">{entry.mood}</div>
                          <div>{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* AI Insights */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  <span>AI Mood Insights</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {moodInsights.map((insight, index) => (
                    <motion.div
                      key={insight.type}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${insight.color} flex items-center justify-center text-white`}>
                          {insight.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{insight.title}</h4>
                            {insight.value && (
                              <span className="text-sm font-medium text-green-600">{insight.value}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{insight.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
} 