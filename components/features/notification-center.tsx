'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell, X, Settings, Filter, Search, CheckCircle, AlertCircle,
  Info, Clock, Star, Heart, Users, MessageCircle, Award,
  Trash2, Archive, Eye, EyeOff, MoreHorizontal, RefreshCw
} from 'lucide-react'
import toast from 'react-hot-toast'

interface NotificationCenterProps {
  onClose: () => void
  currentUser?: any
}

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error' | 'reminder' | 'social' | 'achievement'
  title: string
  message: string
  timestamp: string
  isRead: boolean
  isImportant: boolean
  category: string
  action?: {
    label: string
    onClick: () => void
  }
  metadata?: {
    sender?: string
    roomId?: string
    achievementId?: string
    moodScore?: number
  }
}

export function NotificationCenter({ onClose, currentUser }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [loading, setLoading] = useState(true)

  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'reminder',
      title: 'Time for your daily mood check-in',
      message: 'It\'s been 24 hours since your last mood entry. Take a moment to reflect on how you\'re feeling.',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      isImportant: true,
      category: 'wellness',
      action: {
        label: 'Check In Now',
        onClick: () => toast.success('Opening mood check-in...')
      }
    },
    {
      id: '2',
      type: 'social',
      title: 'New message from Sarah',
      message: 'Sarah sent you a message in the "Anxiety Support" room',
      timestamp: '2024-01-15T09:15:00Z',
      isRead: false,
      isImportant: false,
      category: 'social',
      metadata: {
        sender: 'Sarah',
        roomId: 'anxiety-support-123'
      },
      action: {
        label: 'View Message',
        onClick: () => toast.success('Opening chat...')
      }
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Congratulations! You earned a new badge',
      message: 'You\'ve completed 7 days of consecutive journaling. You\'re now a "Consistent Writer"!',
      timestamp: '2024-01-15T08:45:00Z',
      isRead: true,
      isImportant: false,
      category: 'achievements',
      metadata: {
        achievementId: 'consistent-writer-7'
      },
      action: {
        label: 'View Badge',
        onClick: () => toast.success('Opening achievement details...')
      }
    },
    {
      id: '4',
      type: 'info',
      title: 'New meditation session available',
      message: 'A new guided meditation for stress relief has been added to your recommended sessions.',
      timestamp: '2024-01-15T07:30:00Z',
      isRead: true,
      isImportant: false,
      category: 'content',
      action: {
        label: 'Start Session',
        onClick: () => toast.success('Opening meditation room...')
      }
    },
    {
      id: '5',
      type: 'warning',
      title: 'High stress level detected',
      message: 'Your recent mood entries indicate elevated stress levels. Consider trying some stress relief activities.',
      timestamp: '2024-01-14T22:15:00Z',
      isRead: false,
      isImportant: true,
      category: 'wellness',
      metadata: {
        moodScore: 2
      },
      action: {
        label: 'Get Help',
        onClick: () => toast.success('Opening stress relief tools...')
      }
    },
    {
      id: '6',
      type: 'success',
      title: 'Journal entry saved successfully',
      message: 'Your reflection on "Managing Work Stress" has been saved and analyzed.',
      timestamp: '2024-01-14T20:30:00Z',
      isRead: true,
      isImportant: false,
      category: 'wellness'
    },
    {
      id: '7',
      type: 'social',
      title: 'You have 3 new followers',
      message: 'Alex, Maria, and Jordan started following your wellness journey.',
      timestamp: '2024-01-14T18:45:00Z',
      isRead: false,
      isImportant: false,
      category: 'social',
      action: {
        label: 'View Followers',
        onClick: () => toast.success('Opening followers list...')
      }
    },
    {
      id: '8',
      type: 'reminder',
      title: 'Weekly wellness check-in due',
      message: 'Your weekly wellness assessment is ready. Take 5 minutes to reflect on your progress.',
      timestamp: '2024-01-14T16:20:00Z',
      isRead: true,
      isImportant: false,
      category: 'wellness',
      action: {
        label: 'Start Assessment',
        onClick: () => toast.success('Opening wellness assessment...')
      }
    }
  ]

  useEffect(() => {
    // Simulate loading notifications
    setTimeout(() => {
      setNotifications(mockNotifications)
      setLoading(false)
    }, 1000)
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'reminder':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'social':
        return <Users className="w-5 h-5 text-purple-500" />
      case 'achievement':
        return <Award className="w-5 h-5 text-yellow-500" />
      default:
        return <Info className="w-5 h-5 text-gray-500" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50 dark:bg-green-900/20'
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      case 'error':
        return 'border-l-red-500 bg-red-50 dark:bg-red-900/20'
      case 'reminder':
        return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20'
      case 'social':
        return 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/20'
      case 'achievement':
        return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      default:
        return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    )
    toast.success('All notifications marked as read')
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
    toast.success('Notification deleted')
  }

  const archiveNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    )
    toast.success('Notification archived')
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || notification.type === filter
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const unreadCount = notifications.filter(n => !n.isRead).length
  const importantCount = notifications.filter(n => n.isImportant && !n.isRead).length

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notification Center</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {unreadCount} unread • {importantCount} important
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={markAllAsRead}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
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
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Loading notifications...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                  {['all', 'info', 'success', 'warning', 'error', 'reminder', 'social', 'achievement'].map((filterType) => (
                    <button
                      key={filterType}
                      onClick={() => setFilter(filterType)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                        filter === filterType
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notifications List */}
              <div className="space-y-3">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No notifications</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {searchQuery ? 'No notifications match your search.' : 'You\'re all caught up!'}
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-xl border border-gray-200 dark:border-gray-600 ${getNotificationColor(notification.type)} ${
                        !notification.isRead ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {notification.title}
                                </h4>
                                {notification.isImportant && (
                                  <Star className="w-4 h-4 text-yellow-500" />
                                )}
                                {!notification.isRead && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatTimestamp(notification.timestamp)}
                                </span>
                                {notification.action && (
                                  <button
                                    onClick={() => {
                                      notification.action?.onClick()
                                      markAsRead(notification.id)
                                    }}
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                                  >
                                    {notification.action.label}
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                title="Mark as read"
                              >
                                <Eye className="w-4 h-4 text-gray-400" />
                              </button>
                              <button
                                onClick={() => archiveNotification(notification.id)}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                title="Archive"
                              >
                                <Archive className="w-4 h-4 text-gray-400" />
                              </button>
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Load More */}
              {filteredNotifications.length > 0 && (
                <div className="text-center pt-4">
                  <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    <span>Load More</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
} 