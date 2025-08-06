'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Settings, LogOut, Heart, BookOpen, MessageCircle,
  BarChart3, Award, Zap, Menu, X, ChevronDown, Home,
  TrendingUp, Users, Brain, Sun, Moon, Leaf, Target, Trophy, AlertTriangle, Camera, Bell, Shield
} from 'lucide-react'
import toast from 'react-hot-toast'

interface NavigationBarProps {
  currentUser: any
  onNavigate: (section: string) => void
  activeSection: string
}

const navigationGroups = {
  'Daily Wellness': [
    { id: 'emotion-detection', label: 'Emotion Detection', icon: Camera, color: 'from-red-500 to-pink-500' },
    { id: 'ai-journal', label: 'AI Journal', icon: BookOpen, color: 'from-purple-500 to-indigo-500' },
    { id: 'stress-games', label: 'Stress Games', icon: Zap, color: 'from-orange-500 to-red-500' },
    { id: 'meditation-room', label: 'Meditation Room', icon: Leaf, color: 'from-green-500 to-emerald-500' },
    { id: 'habit-recommendation', label: 'Habit Recommendation', icon: Target, color: 'from-blue-500 to-cyan-500' },
    { id: 'mental-state-snapshot', label: 'Mental State Snapshot', icon: Brain, color: 'from-blue-500 to-cyan-500' },
    { id: 'personality-assessment', label: 'Personality Assessment', icon: Brain, color: 'from-indigo-500 to-purple-500' }
  ],
  'Social Features': [
    { id: 'vibe-rooms', label: 'Vibe Rooms', icon: MessageCircle, color: 'from-green-500 to-emerald-500' },
    { id: 'emotional-matching', label: 'Emotional Matching', icon: Heart, color: 'from-pink-500 to-rose-500' },
    { id: 'chat-room-manager', label: 'Chat Room Manager', icon: MessageCircle, color: 'from-blue-500 to-cyan-500' },
    { id: 'profile-agent', label: 'Profile Agent', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { id: 'enhanced-profile', label: 'Enhanced Profile', icon: User, color: 'from-purple-500 to-pink-500' },
    { id: 'notification-center', label: 'Notification Center', icon: Bell, color: 'from-blue-500 to-cyan-500' },
    { id: 'room-permissions', label: 'Room Permissions', icon: Shield, color: 'from-red-500 to-orange-500' },
    { id: 'community-guidelines', label: 'Community Guidelines', icon: BookOpen, color: 'from-green-500 to-emerald-500' }
  ],
  'Analytics & Progress': [
    { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3, color: 'from-indigo-500 to-purple-500' },
    { id: 'emotional-wellness', label: 'Emotional Wellness', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
    { id: 'habit-recommendation', label: 'Habit Recommendation', icon: Target, color: 'from-blue-500 to-cyan-500' },
    { id: 'social-analytics', label: 'Social Analytics', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { id: 'gamification', label: 'Gamification', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
    { id: 'progress', label: 'Progress', icon: Award, color: 'from-yellow-500 to-orange-500' }
  ],
  'Guidance & Support': [
    { id: 'ai-coach', label: 'AI Coach', icon: Brain, color: 'from-teal-500 to-green-500' },
    { id: 'emotion-threshold', label: 'Emotion Threshold', icon: AlertTriangle, color: 'from-red-500 to-orange-500' }
  ]
}

const userTools = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'sign-out', label: 'Sign Out', icon: LogOut }
]

export function NavigationBar({ currentUser, onNavigate, activeSection }: NavigationBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleNavigation = (sectionId: string) => {
    if (sectionId === 'sign-out') {
      localStorage.removeItem('demoUser')
      toast.success('Signed out successfully!')
      window.location.href = '/'
      return
    }
    
    onNavigate(sectionId)
    setIsMobileMenuOpen(false)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Emolinkdn</h1>
                <p className="text-sm text-blue-600 dark:text-blue-400">Welcome back, {currentUser?.name}</p>
              </div>
            </div>

            {/* Main Navigation Groups */}
            <div className="flex items-center space-x-8">
              {Object.entries(navigationGroups).map(([groupName, items]) => (
                <div key={groupName} className="relative group">
                  <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <span className="text-sm font-medium">{groupName}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-2">
                      <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {groupName}
                      </h3>
                      {items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleNavigation(item.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            activeSection === item.id
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                            <item.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* User Tools and Theme Toggle */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {currentUser?.name?.charAt(0)}
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    {userTools.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => handleNavigation(tool.id)}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <tool.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{tool.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Emolinkdn</h1>
                <p className="text-xs text-blue-600 dark:text-blue-400">{currentUser?.name}</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <div className="px-4 py-4 space-y-6">
                {Object.entries(navigationGroups).map(([groupName, items]) => (
                  <div key={groupName}>
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      {groupName}
                    </h3>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleNavigation(item.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                            activeSection === item.id
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                            <item.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}