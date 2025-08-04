'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, Home, Heart, MessageCircle, BookOpen, BarChart3, 
  Settings, Bell, User, Camera, Sparkles, Shield, Zap
} from 'lucide-react'

interface MobileLayoutProps {
  children: React.ReactNode
  currentUser?: any
  onSignOut?: () => void
}

export function MobileResponsiveLayout({ children, currentUser, onSignOut }: MobileLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-blue-600' },
    { id: 'emotions', label: 'Emotions', icon: Heart, color: 'text-red-600' },
    { id: 'vibe-rooms', label: 'Vibe Rooms', icon: MessageCircle, color: 'text-purple-600' },
    { id: 'journal', label: 'Journal', icon: BookOpen, color: 'text-green-600' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'text-indigo-600' },
    { id: 'ai-coach', label: 'AI Coach', icon: Sparkles, color: 'text-yellow-600' },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    setIsMobileMenuOpen(false)
  }

  if (!isMobile) {
    return <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-wellness-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {children}
    </div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-wellness-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Mobile Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-wellness-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-wellness-600 bg-clip-text text-transparent">
                Emolinkdn
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Emotional Wellness</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* User Profile */}
                <div className="flex items-center space-x-4 mb-8 p-4 bg-gradient-to-r from-primary-50 to-wellness-50 dark:from-primary-900/20 dark:to-wellness-900/20 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-wellness-500 rounded-full flex items-center justify-center text-white font-medium">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {currentUser?.name || 'Demo User'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {currentUser?.email || 'demo@emolinkdn.com'}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabChange(item.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                          activeTab === item.id
                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${item.color}`} />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    )
                  })}
                </nav>

                {/* Quick Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Camera className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700 dark:text-gray-300">Mood Check</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700 dark:text-gray-300">Safety Mode</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Zap className="w-5 h-5 text-yellow-600" />
                      <span className="text-gray-700 dark:text-gray-300">Emergency</span>
                    </button>
                  </div>
                </div>

                {/* Settings & Sign Out */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700 dark:text-gray-300">Settings</span>
                  </button>
                  <button 
                    onClick={onSignOut}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-2"
                  >
                    <User className="w-5 h-5 text-red-600" />
                    <span className="text-red-600">Sign Out</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="pt-20 pb-24">
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-around px-4 py-2">
          {navigationItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </motion.nav>
    </div>
  )
} 