'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Search, Bell, User, Settings, LogOut, Plus, MessageCircle,
  Heart, Bookmark, Share2, MoreHorizontal, Camera, Video, Mic,
  Sparkles, TrendingUp, Users, Calendar, Target, Brain, Zap,
  Sun, Moon, ChevronDown, ChevronUp, X, Menu, Grid3X3,
  CheckCircle, AlertCircle, Info, Clock, Star, Award, Gift
} from 'lucide-react'
import toast from 'react-hot-toast'

interface ModernNavigationProps {
  currentUser?: any
  onFeatureClick: (feature: string) => void
  onThemeToggle: () => void
  isDarkMode: boolean
  onLogout?: () => void
}

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

interface UserMenuItem {
  id: string
  label: string
  icon: React.ReactNode
  onClick: () => void
  badge?: string
  divider?: boolean
}

export function ModernNavigation({ 
  currentUser, 
  onFeatureClick, 
  onThemeToggle, 
  isDarkMode 
}: ModernNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')

  // Smart theme detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }
    
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Smart notifications system
  useEffect(() => {
    // Simulate smart notifications
    const smartNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: 'Wellness Streak! 🎉',
        message: 'You\'ve maintained your wellness routine for 7 days!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        action: {
          label: 'View Progress',
          onClick: () => onFeatureClick('analytics')
        }
      },
      {
        id: '2',
        type: 'info',
        title: 'AI Coach Available',
        message: 'Your personalized AI coach has new insights for you.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        action: {
          label: 'Chat Now',
          onClick: () => onFeatureClick('ai-coach')
        }
      },
      {
        id: '3',
        type: 'warning',
        title: 'Stress Level Alert',
        message: 'Your stress levels are elevated. Consider a quick meditation.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        read: true,
        action: {
          label: 'Meditate Now',
          onClick: () => onFeatureClick('meditation-room')
        }
      },
      {
        id: '4',
        type: 'success',
        title: 'Community Achievement',
        message: 'You\'ve helped 5 people today! You\'re making a difference.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        read: true
      }
    ]

    setNotifications(smartNotifications)
    setUnreadCount(smartNotifications.filter(n => !n.read).length)
  }, [onFeatureClick])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    console.log('Searching for:', query)
  }

  const handleQuickAction = (actionId: string) => {
    onFeatureClick(actionId)
    setShowQuickActions(false)
    toast.success(`Opening ${actionId}`)
  }

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
    
    // Execute action if available
    if (notification.action) {
      notification.action.onClick()
    }
    
    setShowNotifications(false)
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
    toast.success('All notifications marked as read')
  }

  const handleThemeToggle = () => {
    onThemeToggle()
    toast.success(`Switched to ${isDarkMode ? 'light' : 'dark'} mode`)
  }

  const userMenuItems: UserMenuItem[] = [
    {
      id: 'profile',
      label: 'My Profile',
      icon: <User className="w-4 h-4" />,
      onClick: () => onFeatureClick('enhanced-profile')
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
      onClick: () => onFeatureClick('settings-modal')
    },
    {
      id: 'achievements',
      label: 'Achievements',
      icon: <Award className="w-4 h-4" />,
      onClick: () => onFeatureClick('gamification'),
      badge: '3 new'
    },
    {
      id: 'progress',
      label: 'Progress Report',
      icon: <TrendingUp className="w-4 h-4" />,
      onClick: () => onFeatureClick('analytics')
    },
    { divider: true },
    {
      id: 'logout',
      label: 'Sign Out',
      icon: <LogOut className="w-4 h-4" />,
      onClick: () => {
        toast.success('Signing out...')
        // This will be handled by the parent component
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user')
          window.location.href = '/'
        }
      }
    }
  ]

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/50 shadow-lg"
    >
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Side - Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-4"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Emolinkdn
            </h1>
          </div>
        </motion.div>

        {/* Center - Search Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 max-w-md mx-8 hidden lg:block"
        >
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search features, emotions, or insights..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300 text-sm"
            />
          </div>
        </motion.div>

        {/* Right Side - Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center space-x-3"
        >
          {/* Smart Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
                            !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex items-start space-x-3">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatTimeAgo(notification.timestamp)}
                                </span>
                                {notification.action && (
                                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                                    {notification.action.label}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Smart Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleThemeToggle}
            className="p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300"
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>

          {/* Smart User Avatar */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="relative p-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white shadow-lg hover:shadow-xl transition-all duration-300"
              title="User menu"
            >
              <User className="w-4 h-4" />
            </motion.button>

            {/* User Menu Dropdown */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/30 dark:border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden"
                >
                  {/* User Info Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {currentUser?.name || 'Demo User'}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {currentUser?.email || 'demo@emolinkdn.com'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {userMenuItems.map((item) => (
                      <React.Fragment key={item.id}>
                        {item.divider ? (
                          <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                        ) : (
                          <motion.button
                            whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                            onClick={() => {
                              item.onClick()
                              setShowUserMenu(false)
                            }}
                            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="text-gray-600 dark:text-gray-400">
                                {item.icon}
                              </div>
                              <span className="text-sm text-gray-900 dark:text-white">
                                {item.label}
                              </span>
                            </div>
                            {item.badge && (
                              <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </motion.button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden p-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300"
          >
            <Menu className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false)
            setShowUserMenu(false)
          }}
        />
      )}
    </motion.nav>
  )
} 