'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Award, Users, Heart, Star, Trophy, Target, 
  TrendingUp, Calendar, BookOpen, MessageCircle, 
  X, Edit3, Settings, Share2, MoreVertical,
  Crown, Zap, Flame, Shield, CheckCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  bio: string
  traits: string[]
  badges: Badge[]
  followers: number
  following: number
  usersHelped: number
  joinDate: string
  level: number
  experience: number
  streak: number
  totalJournalEntries: number
  totalMoodChecks: number
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedDate: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface ProfileAgentProps {
  onClose: () => void
  currentUser: any
}

export function ProfileAgent({ onClose, currentUser }: ProfileAgentProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'progress' | 'community'>('overview')

  useEffect(() => {
    // Simulate loading profile data
    const loadProfile = async () => {
      setLoading(true)
      
      // Demo profile data
      const demoProfile: UserProfile = {
        id: currentUser?.id || '1',
        name: currentUser?.name || 'Demo User',
        email: currentUser?.email || 'demo@example.com',
        avatar: currentUser?.avatar || '/avatars/default.jpg',
        bio: 'Passionate about emotional wellness and helping others on their journey to better mental health.',
        traits: ['Empathetic', 'Supportive', 'Growth-minded', 'Resilient', 'Mindful'],
        badges: [
          {
            id: '1',
            name: 'First Steps',
            description: 'Completed your first mood check',
            icon: '🌟',
            earnedDate: '2024-01-15',
            rarity: 'common'
          },
          {
            id: '2',
            name: 'Journal Master',
            description: 'Wrote 30 journal entries',
            icon: '📝',
            earnedDate: '2024-02-01',
            rarity: 'rare'
          },
          {
            id: '3',
            name: 'Streak Champion',
            description: 'Maintained a 7-day mood tracking streak',
            icon: '🔥',
            earnedDate: '2024-02-10',
            rarity: 'epic'
          },
          {
            id: '4',
            name: 'Community Helper',
            description: 'Helped 50+ users in Vibe Rooms',
            icon: '🤝',
            earnedDate: '2024-02-20',
            rarity: 'legendary'
          }
        ],
        followers: 127,
        following: 89,
        usersHelped: 156,
        joinDate: '2024-01-01',
        level: 8,
        experience: 2340,
        streak: 12,
        totalJournalEntries: 45,
        totalMoodChecks: 89
      }
      
      setTimeout(() => {
        setProfile(demoProfile)
        setLoading(false)
      }, 1000)
    }

    loadProfile()
  }, [currentUser])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100'
      case 'rare': return 'text-blue-600 bg-blue-100'
      case 'epic': return 'text-purple-600 bg-purple-100'
      case 'legendary': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getLevelProgress = () => {
    if (!profile) return 0
    const currentLevelExp = profile.experience % 1000
    return (currentLevelExp / 1000) * 100
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-2xl w-full mx-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg">Loading your profile...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) return null

  return (
    <AnimatePresence>
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
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Agent</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your wellness journey overview</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Header */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profile.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{profile.bio}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>Level {profile.level}</span>
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'badges', label: 'Badges', icon: Award },
              { id: 'progress', label: 'Progress', icon: TrendingUp },
              { id: 'community', label: 'Community', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto max-h-[60vh]">
            {activeTab === 'overview' && (
              <div className="p-6 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.followers}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.following}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.usersHelped}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Users Helped</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                        <Flame className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.streak}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Day Streak</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personality Traits */}
                <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personality Traits</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Level Progress */}
                <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Level Progress</h4>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {profile.experience} / {profile.level * 1000} XP
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${getLevelProgress()}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {1000 - (profile.experience % 1000)} XP until Level {profile.level + 1}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'badges' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{badge.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{badge.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{badge.description}</p>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(badge.rarity)}`}>
                              {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(badge.earnedDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Journaling Progress</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Total Entries</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{profile.totalJournalEntries}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">This Month</span>
                        <span className="font-semibold text-gray-900 dark:text-white">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Average Words</span>
                        <span className="font-semibold text-gray-900 dark:text-white">247</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mood Tracking</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Total Checks</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{profile.totalMoodChecks}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Current Streak</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{profile.streak} days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Best Streak</span>
                        <span className="font-semibold text-gray-900 dark:text-white">23 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'community' && (
              <div className="p-6 space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Community Impact</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You've made a significant positive impact in our community! Your empathetic nature and 
                    willingness to support others has helped {profile.usersHelped} people on their wellness journey. 
                    Your consistent presence in Vibe Rooms and thoughtful journal entries inspire others to 
                    prioritize their mental health.
                  </p>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">Verified Community Helper</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">Helped someone in Anxiety Support room</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">Shared a journal entry about gratitude</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">Reached 100-day mood tracking milestone</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
} 