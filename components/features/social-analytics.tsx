'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, Users, MessageCircle, Heart, Star, X,
  BarChart3, PieChart, Activity, Calendar, Award, Target,
  Share2, UserPlus, UserCheck, MessageSquare, ThumbsUp
} from 'lucide-react'
import toast from 'react-hot-toast'

interface SocialAnalyticsProps {
  onClose: () => void
  currentUser?: any
}

interface SocialMetric {
  id: string
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  icon: React.ReactNode
  color: string
}

interface CommunityActivity {
  date: string
  connections: number
  messages: number
  interactions: number
  supportGiven: number
  supportReceived: number
}

interface TopConnection {
  id: string
  name: string
  avatar: string
  connectionStrength: number
  mutualInterests: number
  lastInteraction: string
  supportScore: number
}

export function SocialAnalytics({ onClose, currentUser }: SocialAnalyticsProps) {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('overview')
  const [loading, setLoading] = useState(true)

  // Mock data for social metrics
  const socialMetrics: SocialMetric[] = [
    {
      id: 'connections',
      name: 'Total Connections',
      value: 127,
      change: 12.5,
      trend: 'up',
      icon: <UserPlus className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'messages',
      name: 'Messages Sent',
      value: 342,
      change: 8.2,
      trend: 'up',
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'interactions',
      name: 'Daily Interactions',
      value: 89,
      change: -2.1,
      trend: 'down',
      icon: <Share2 className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'support',
      name: 'Support Given',
      value: 156,
      change: 15.7,
      trend: 'up',
      icon: <Heart className="w-5 h-5" />,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'wellness',
      name: 'Social Wellness Score',
      value: 87,
      change: 5.3,
      trend: 'up',
      icon: <Star className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'engagement',
      name: 'Community Engagement',
      value: 92,
      change: 3.8,
      trend: 'up',
      icon: <Users className="w-5 h-5" />,
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  // Mock data for community activity
  const communityActivity: CommunityActivity[] = [
    { date: '2024-01-01', connections: 5, messages: 12, interactions: 23, supportGiven: 8, supportReceived: 6 },
    { date: '2024-01-02', connections: 3, messages: 18, interactions: 31, supportGiven: 12, supportReceived: 9 },
    { date: '2024-01-03', connections: 7, messages: 15, interactions: 28, supportGiven: 10, supportReceived: 7 },
    { date: '2024-01-04', connections: 4, messages: 22, interactions: 35, supportGiven: 15, supportReceived: 11 },
    { date: '2024-01-05', connections: 6, messages: 19, interactions: 29, supportGiven: 11, supportReceived: 8 },
    { date: '2024-01-06', connections: 8, messages: 25, interactions: 42, supportGiven: 18, supportReceived: 14 },
    { date: '2024-01-07', connections: 5, messages: 16, interactions: 27, supportGiven: 9, supportReceived: 6 }
  ]

  // Mock data for top connections
  const topConnections: TopConnection[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: '👩‍💼',
      connectionStrength: 95,
      mutualInterests: 8,
      lastInteraction: '2 hours ago',
      supportScore: 92
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      avatar: '👨‍💻',
      connectionStrength: 88,
      mutualInterests: 6,
      lastInteraction: '1 day ago',
      supportScore: 87
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      avatar: '👩‍🎨',
      connectionStrength: 82,
      mutualInterests: 7,
      lastInteraction: '3 hours ago',
      supportScore: 85
    },
    {
      id: '4',
      name: 'David Kim',
      avatar: '👨‍🏫',
      connectionStrength: 79,
      mutualInterests: 5,
      lastInteraction: '5 hours ago',
      supportScore: 78
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      avatar: '👩‍⚕️',
      connectionStrength: 76,
      mutualInterests: 9,
      lastInteraction: '1 day ago',
      supportScore: 81
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />
      case 'down':
        return <TrendingUp className="w-4 h-4 transform rotate-180" />
      default:
        return <Activity className="w-4 h-4" />
    }
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
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Social Analytics</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Track your social wellness and community engagement</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Loading social analytics...</span>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socialMetrics.map((metric) => (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-white`}>
                        {metric.icon}
                      </div>
                      <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
                        {getTrendIcon(metric.trend)}
                        <span className="text-sm font-medium">{metric.change}%</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{metric.value}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{metric.name}</p>
                  </motion.div>
                ))}
              </div>

              {/* Activity Chart */}
              <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Community Activity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Daily Activity</h4>
                    <div className="space-y-3">
                      {communityActivity.slice(-7).map((activity, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{activity.connections}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{activity.messages}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{activity.interactions}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Support Exchange</h4>
                    <div className="space-y-3">
                      {communityActivity.slice(-7).map((activity, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Heart className="w-3 h-3 text-red-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{activity.supportGiven}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <UserCheck className="w-3 h-3 text-green-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{activity.supportReceived}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Connections */}
              <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Connections</h3>
                <div className="space-y-4">
                  {topConnections.map((connection, index) => (
                    <motion.div
                      key={connection.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-500 dark:to-gray-600 rounded-full flex items-center justify-center text-xl">
                        {connection.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">{connection.name}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {connection.connectionStrength}% strength
                            </span>
                            <Star className="w-4 h-4 text-yellow-500" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>{connection.mutualInterests} mutual interests</span>
                          <span>Support score: {connection.supportScore}%</span>
                          <span>{connection.lastInteraction}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Insights */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Social Wellness Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Positive Trends</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Your support given increased by 15.7% this week</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Social wellness score improved by 5.3 points</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Community engagement is at an all-time high</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Recommendations</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span>Try reaching out to 3 new connections this week</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4 text-green-500" />
                        <span>Increase daily message interactions by 20%</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>Focus on providing emotional support to others</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
} 