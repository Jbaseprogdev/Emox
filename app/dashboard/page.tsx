'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ModernNavigation } from '@/components/layout/modern-navigation'
import { DashboardGrid } from '@/components/layout/dashboard-grid'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, TrendingUp, Users, Brain, Target, 
  Heart, BookOpen, Zap, Leaf, MessageCircle,
  BarChart3, Bell, Settings, User, Plus, X,
  LogOut, Shield, Key, UserCheck, AlertTriangle,
  MoreVertical
} from 'lucide-react'
import toast from 'react-hot-toast'

// Import all feature components
import { EmotionDetection } from '@/components/features/emotion-detection'
import { AIJournal } from '@/components/features/ai-journal'
import { StressGames } from '@/components/features/stress-games'
import { MeditationRoom } from '@/components/features/meditation-room'
import { VibeRooms } from '@/components/features/vibe-rooms'
import { AnalyticsDashboard } from '@/components/features/analytics-dashboard'
import { EmotionalWellnessDashboard } from '@/components/features/emotional-wellness-dashboard'
import { HabitRecommendation } from '@/components/features/habit-recommendation'
import { EmotionThreshold } from '@/components/features/emotion-threshold'
import { GamificationSystem } from '@/components/features/gamification-system'
import { AICoachEnhanced } from '@/components/features/ai-coach-enhanced'
import { EmotionalMatching } from '@/components/features/emotional-matching'
import { ChatRoomManager } from '@/components/features/chat-room-manager'
import { SocialAnalytics } from '@/components/features/social-analytics'
import { EnhancedProfile } from '@/components/features/enhanced-profile'
import { MentalStateSnapshot } from '@/components/features/mental-state-snapshot'
import { MoodTimelineVisual } from '@/components/features/mood-timeline-visual'
import { PersonalityAssessment } from '@/components/features/personality-assessment'
import { NotificationCenter } from '@/components/features/notification-center'
import { RoomPermissions } from '@/components/features/room-permissions'
import { CommunityGuidelines } from '@/components/features/community-guidelines'
import { CommunityEducation } from '@/components/features/community-education'
import { ProfilePhotoUpload } from '@/components/features/profile-photo-upload'
import { CoverPhotoManager } from '@/components/features/cover-photo-manager'
import { AIEmotionalCoach } from '@/components/features/ai-emotional-coach'
import { AIEmotionPredictor } from '@/components/features/ai-emotion-predictor'
import { VRMeditationSpace } from '@/components/features/vr-meditation-space'
import { BiometricWellnessTracker } from '@/components/features/biometric-wellness-tracker'
import { SocialWellnessCommunity } from '@/components/features/social-wellness-community'
import { MindfulTaskBoards } from '@/components/features/mindful-task-boards'
import { MoodBasedCalendarPlanner } from '@/components/features/mood-based-calendar-planner'
import { WellnessWiki } from '@/components/features/wellness-wiki'
import { WellnessWorkflows } from '@/components/features/wellness-workflows'
import { TemplateGallery } from '@/components/features/template-gallery'
import { CollaborativeHealingBoards } from '@/components/features/collaborative-healing-boards'
import { MoodProgressReports } from '@/components/features/mood-progress-reports'
import { MindfulGoalsTracker } from '@/components/features/mindful-goals-tracker'
import { UniversalSearch } from '@/components/features/universal-search'

interface DemoUser {
  id: string
  name: string
  email: string
  avatar: string
}

// Feature component mapping
const featureComponents: { [key: string]: React.ComponentType<any> } = {
  'emotion-detection': EmotionDetection,
  'ai-journal': AIJournal,
  'stress-games': StressGames,
  'meditation-room': MeditationRoom,
  'vibe-rooms': VibeRooms,
  'analytics': AnalyticsDashboard,
  'emotional-wellness': EmotionalWellnessDashboard,
  'habit-recommendation': HabitRecommendation,
  'emotion-threshold': EmotionThreshold,
  'gamification': GamificationSystem,
  'ai-coach': AICoachEnhanced,
  'emotional-matching': EmotionalMatching,
  'chat-room-manager': ChatRoomManager,
  'social-analytics': SocialAnalytics,
  'enhanced-profile': EnhancedProfile,
  'mental-state-snapshot': MentalStateSnapshot,
  'mood-timeline-visual': MoodTimelineVisual,
  'personality-assessment': PersonalityAssessment,
  'notification-center': NotificationCenter,
  'room-permissions': RoomPermissions,
  'community-guidelines': CommunityGuidelines,
  'community-education': CommunityEducation,
  'profile-photo-upload': ProfilePhotoUpload,
  'cover-photo-manager': CoverPhotoManager,
  'ai-emotional-coach': AIEmotionalCoach,
  'ai-emotion-predictor': AIEmotionPredictor,
  'vr-meditation-space': VRMeditationSpace,
  'biometric-wellness-tracker': BiometricWellnessTracker,
  'social-wellness-community': SocialWellnessCommunity,
  'mindful-task-boards': MindfulTaskBoards,
  'mood-based-calendar-planner': MoodBasedCalendarPlanner,
  'wellness-wiki': WellnessWiki,
  'wellness-workflows': WellnessWorkflows,
  'template-gallery': TemplateGallery,
  'collaborative-healing-boards': CollaborativeHealingBoards,
  'mood-progress-reports': MoodProgressReports,
  'mindful-goals-tracker': MindfulGoalsTracker,
  'universal-search': UniversalSearch
}

export default function DashboardPage() {
  const [user, setUser] = useState<DemoUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [showFeatureModal, setShowFeatureModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Simulate user data loading
    const demoUser: DemoUser = {
      id: '1',
      name: 'Demo User',
      email: 'demo@emolinkdn.com',
      avatar: '👤'
    }
    setUser(demoUser)
    setLoading(false)
  }, [])

  const handleFeatureClick = (feature: string) => {
    console.log('Feature clicked:', feature)
    
    // Check if feature component exists
    if (featureComponents[feature]) {
      setActiveFeature(feature)
      setShowFeatureModal(true)
      toast.success(`Opening ${feature.replace('-', ' ')}`)
    } else {
      toast.error('Feature coming soon!')
    }
  }

  const handleCloseFeatureModal = () => {
    setShowFeatureModal(false)
    setActiveFeature(null)
    toast.success('Returned to dashboard')
  }

  const handleHomeClick = () => {
    // Close any open modals
    setShowFeatureModal(false)
    setActiveFeature(null)
    setShowUserMenu(false)
    setShowLogoutModal(false)
    
    // Set active section to home
    setActiveSection('home')
    
    // Show success message
    toast.success('Welcome back to your dashboard!')
  }

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleFeatureAction = (action: string, data?: any) => {
    console.log('Feature action:', action, data)
    toast.success(`Action completed: ${action}`)
  }

  // Logout functionality
  const handleLogout = async () => {
    setLogoutLoading(true)
    
    try {
      // Clear user state
      setUser(null)
      
      // Clear local storage
      localStorage.removeItem('user')
      localStorage.removeItem('session')
      localStorage.removeItem('preferences')
      
      // Clear all cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
      })
      
      // Show success message
      toast.success('Successfully logged out!')
      
      // Redirect to authentication screen
      router.push('/')
      
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Error during logout')
    } finally {
      setLogoutLoading(false)
      setShowLogoutModal(false)
      setShowUserMenu(false)
    }
  }

  const handleLogoutConfirm = () => {
    setShowLogoutModal(true)
    setShowUserMenu(false)
  }

  const handleCancelLogout = () => {
    setShowLogoutModal(false)
  }

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
  }

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showUserMenu && !target.closest('.user-menu-container')) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  // Keyboard support for closing modals
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showFeatureModal) {
          handleCloseFeatureModal()
        }
        if (showLogoutModal) {
          handleCancelLogout()
        }
        if (showUserMenu) {
          setShowUserMenu(false)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showFeatureModal, showLogoutModal, showUserMenu])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your wellness dashboard...</p>
        </div>
      </div>
    )
  }

  const userStats = {
    dayStreak: 7,
    wellnessLevel: 8.5,
    totalEntries: 45,
    moodAverage: 7.2
  }

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, isActive: true, badge: null },
    { id: 'explore', label: 'Explore', icon: TrendingUp, isActive: false, badge: 3 },
    { id: 'community', label: 'Community', icon: Users, isActive: false, badge: null },
    { id: 'wellness', label: 'Wellness', icon: Brain, isActive: false, badge: 5 },
    { id: 'progress', label: 'Progress', icon: Target, isActive: false, badge: null }
  ]

  // Get the active feature component
  const ActiveFeatureComponent = activeFeature ? featureComponents[activeFeature] : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Top Navigation Bar */}
      <ModernNavigation 
        currentUser={user}
        onFeatureClick={handleFeatureClick}
        onThemeToggle={handleThemeToggle}
        isDarkMode={isDarkMode}
      />
      
      <div className="flex pt-16">
        {/* Left Sidebar */}
        <motion.aside 
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-64 h-screen bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-r border-white/30 dark:border-gray-700/50 shadow-xl fixed left-0 top-16 z-40"
        >
          <div className="p-6">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Emolinkdn
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Link Emotions. Empower People.
                </p>
              </div>
            </div>

            {/* User Info Section - Moved to Top */}
            <div className="user-menu-container mb-6 p-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 dark:border-gray-600/50 rounded-xl relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {user?.name || 'Demo User'}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {user?.email || 'demo@emolinkdn.com'}
                  </p>
                </div>
                <button 
                  onClick={toggleUserMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors relative"
                  title="User options"
                >
                  <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  {/* Smart notification dot for new features */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </button>
              </motion.div>

              {/* Enhanced User Menu Dropdown */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    {/* User Info Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            {user?.name || 'Demo User'}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {user?.email || 'demo@emolinkdn.com'}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-green-600 dark:text-green-400">Online</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {/* Profile Section */}
                      <div className="px-3 py-2">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                          Profile
                        </p>
                        <button 
                          onClick={() => {
                            handleFeatureClick('enhanced-profile')
                            setShowUserMenu(false)
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">My Profile</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                              New
                            </span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      </div>

                      {/* Settings Section */}
                      <div className="px-3 py-2">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                          Settings
                        </p>
                        <button 
                          onClick={() => {
                            handleFeatureClick('settings-modal')
                            setShowUserMenu(false)
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Settings</span>
                          </div>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => {
                            handleFeatureClick('profile-photo-upload')
                            setShowUserMenu(false)
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm text-gray-700 dark:text-gray-300">Change Photo</span>
                          </div>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      {/* Privacy & Security */}
                      <div className="px-3 py-2">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                          Privacy & Security
                        </p>
                        <button 
                          onClick={() => {
                            handleFeatureClick('room-permissions')
                            setShowUserMenu(false)
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Privacy Settings</span>
                          </div>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => {
                            handleFeatureClick('notification-center')
                            setShowUserMenu(false)
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <Bell className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Notifications</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full">
                              3 new
                            </span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      </div>

                      {/* Analytics & Progress */}
                      <div className="px-3 py-2">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                          Analytics & Progress
                        </p>
                        <button 
                          onClick={() => {
                            handleFeatureClick('analytics')
                            setShowUserMenu(false)
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Progress Report</span>
                          </div>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => {
                            handleFeatureClick('gamification')
                            setShowUserMenu(false)
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <span className="text-sm text-gray-700 dark:text-gray-300">Achievements</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-full">
                              5 new
                            </span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                      {/* Account Actions */}
                      <div className="px-3 py-2">
                        <button 
                          onClick={() => {
                            toast.success('Opening help center...')
                            handleFeatureClick('help-center')
                            setShowUserMenu(false)
                          }}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-gray-700 dark:text-gray-300">Help & Support</span>
                          </div>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <button 
                          onClick={handleLogoutConfirm}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
                            <span className="text-sm text-red-600 dark:text-red-400 font-medium">Sign Out</span>
                          </div>
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search features, people..."
                className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 dark:border-gray-600/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Navigation Items */}
            <nav className="space-y-4">
              {/* Main Navigation */}
              <div className="space-y-2">
                {/* Home - Active */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={handleHomeClick}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Home className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Home</span>
                  </div>
                </motion.button>

                {/* Profile */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => handleFeatureClick('enhanced-profile')}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <UserCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium">Profile</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                      New
                    </span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>

                {/* Explore */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setActiveSection('explore')}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="font-medium">Explore</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      3
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>
              </div>

              {/* Settings Section */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4">
                  SETTINGS
                </p>
                
                {/* Community */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => setActiveSection('community')}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="font-medium">Community</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>

                {/* Change Photo */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  onClick={() => handleFeatureClick('profile-photo-upload')}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="font-medium">Change Photo</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>

                {/* Wellness */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={() => setActiveSection('wellness')}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="font-medium">Wellness</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      5
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>
              </div>

              {/* Privacy & Security Section */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4">
                  PRIVACY & SECURITY
                </p>
                
                {/* Privacy Settings */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  onClick={() => handleFeatureClick('room-permissions')}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="font-medium">Privacy Settings</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>

                {/* Progress */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  onClick={() => setActiveSection('progress')}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="font-medium">Progress</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>

                {/* Notifications */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  onClick={() => handleFeatureClick('notification-center')}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <Bell className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="font-medium">Notifications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                        3
                      </div>
                      <span className="text-xs text-orange-600 dark:text-orange-400">new</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>
              </div>

              {/* Analytics & Progress Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-4">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    ANALYTICS & PROGRESS
                  </p>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {/* Progress Report */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  onClick={() => handleFeatureClick('analytics')}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="font-medium">Progress Report</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>

                {/* Achievements */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 }}
                  onClick={() => handleFeatureClick('gamification')}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <span className="font-medium">Achievements</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center">
                      5
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>
              </div>
            </nav>

            {/* Sign Out Button - Replaced Bottom User Section */}
            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                onClick={handleLogoutConfirm}
                className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 shadow-lg group"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </motion.button>
            </div>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-64">
          <div className="p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-3xl p-8 border border-white/40 dark:border-gray-700/60 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <motion.h1 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3"
                    >
                      Welcome back, {user?.name || 'Demo User'}! 👋
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-lg text-gray-600 dark:text-gray-300 mb-4"
                    >
                      Here's your personalized wellness overview and insights
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Online</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Last active: 2 minutes ago</span>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="hidden md:flex items-center space-x-4"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">7</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Day Streak</div>
                    </div>
                    <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">8.5</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Wellness</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-8"
            >
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-white/40 dark:border-gray-700/60 shadow-2xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {/* Day Streak */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center group"
                  >
                    <div className="relative">
                      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                        {userStats.dayStreak}
                      </div>
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      Day Streak
                    </div>
                    <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mt-2"></div>
                  </motion.div>

                  {/* Wellness Level */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center group"
                  >
                    <div className="relative">
                      <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                        {userStats.wellnessLevel}
                      </div>
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      Wellness Level
                    </div>
                    <div className="w-8 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mt-2"></div>
                  </motion.div>

                  {/* Total Entries */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center group"
                  >
                    <div className="relative">
                      <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                        {userStats.totalEntries}
                      </div>
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      Total Entries
                    </div>
                    <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mt-2"></div>
                  </motion.div>

                  {/* Mood Average */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-center group"
                  >
                    <div className="relative">
                      <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                        {userStats.moodAverage}
                      </div>
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                      Mood Average
                    </div>
                    <div className="w-8 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto mt-2"></div>
                  </motion.div>
                </div>

                {/* Progress Bar */}
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  transition={{ delay: 1.0, duration: 1.5 }}
                  className="mt-8"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Weekly Progress</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ delay: 1.2, duration: 1.5 }}
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="mt-8 flex flex-wrap gap-4 justify-center"
                >
                  <button
                    onClick={() => handleFeatureClick('ai-journal')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5" />
                      <span>New Entry</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleFeatureClick('meditation-room')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <Leaf className="w-5 h-5" />
                      <span>Meditate</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleFeatureClick('stress-games')}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <Zap className="w-5 h-5" />
                      <span>Play Games</span>
                    </div>
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* Features Grid */}
            <DashboardGrid 
              onFeatureClick={handleFeatureClick}
              userStats={userStats}
            />
          </div>
        </main>
      </div>

      {/* Feature Modal */}
      <AnimatePresence>
        {showFeatureModal && ActiveFeatureComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseFeatureModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {activeFeature?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h2>
                <button
                  onClick={handleCloseFeatureModal}
                  className="p-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 group relative"
                  title="Close (Esc)"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                  <div className="absolute inset-0 bg-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <ActiveFeatureComponent 
                  onAction={handleFeatureAction}
                  user={user}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCancelLogout}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button for logout modal */}
              <button
                onClick={handleCancelLogout}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                title="Close (Esc)"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogOut className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Sign Out
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Are you sure you want to sign out? You'll be redirected to the login screen.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancelLogout}
                    className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={logoutLoading}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {logoutLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing Out...</span>
                      </>
                    ) : (
                      <>
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 
