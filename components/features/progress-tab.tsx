'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Award, Trophy, Target, TrendingUp, Calendar, 
  BookOpen, Flame, Star, Zap, Crown, Shield,
  CheckCircle, Clock, Gift, Heart, Users
} from 'lucide-react'

interface ProgressTabProps {
  currentUser: any
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedDate?: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  progress: number
  maxProgress: number
  unlocked: boolean
}

interface Milestone {
  id: string
  name: string
  description: string
  icon: string
  achievedDate?: string
  type: 'streak' | 'journal' | 'community' | 'mood'
  value: number
  target: number
  achieved: boolean
}

export function ProgressTab({ currentUser }: ProgressTabProps) {
  const [activeSection, setActiveSection] = useState<'badges' | 'streaks' | 'milestones'>('badges')
  const [badges, setBadges] = useState<Badge[]>([])
  const [milestones, setMilestones] = useState<Milestone[]>([])

  useEffect(() => {
    // Demo data
    const demoBadges: Badge[] = [
      {
        id: '1',
        name: 'First Steps',
        description: 'Complete your first mood check',
        icon: '🌟',
        earnedDate: '2024-01-15',
        rarity: 'common',
        progress: 1,
        maxProgress: 1,
        unlocked: true
      },
      {
        id: '2',
        name: 'Journal Master',
        description: 'Write 30 journal entries',
        icon: '📝',
        earnedDate: '2024-02-01',
        rarity: 'rare',
        progress: 30,
        maxProgress: 30,
        unlocked: true
      },
      {
        id: '3',
        name: 'Streak Champion',
        description: 'Maintain a 7-day mood tracking streak',
        icon: '🔥',
        earnedDate: '2024-02-10',
        rarity: 'epic',
        progress: 7,
        maxProgress: 7,
        unlocked: true
      },
      {
        id: '4',
        name: 'Community Helper',
        description: 'Help 50+ users in Vibe Rooms',
        icon: '🤝',
        rarity: 'legendary',
        progress: 35,
        maxProgress: 50,
        unlocked: false
      },
      {
        id: '5',
        name: 'Mood Explorer',
        description: 'Track 100 different moods',
        icon: '🌈',
        rarity: 'rare',
        progress: 67,
        maxProgress: 100,
        unlocked: false
      },
      {
        id: '6',
        name: 'Wellness Guru',
        description: 'Complete 365 days of wellness tracking',
        icon: '👑',
        rarity: 'legendary',
        progress: 89,
        maxProgress: 365,
        unlocked: false
      }
    ]

    const demoMilestones: Milestone[] = [
      {
        id: '1',
        name: '7-Day Streak',
        description: 'Track your mood for 7 consecutive days',
        icon: '🔥',
        achievedDate: '2024-02-10',
        type: 'streak',
        value: 7,
        target: 7,
        achieved: true
      },
      {
        id: '2',
        name: 'First Journal Entry',
        description: 'Write your first journal entry',
        icon: '📝',
        achievedDate: '2024-01-15',
        type: 'journal',
        value: 1,
        target: 1,
        achieved: true
      },
      {
        id: '3',
        name: 'Community Helper',
        description: 'Help 25 users in Vibe Rooms',
        icon: '🤝',
        type: 'community',
        value: 35,
        target: 25,
        achieved: true
      },
      {
        id: '4',
        name: '30-Day Streak',
        description: 'Track your mood for 30 consecutive days',
        icon: '🔥',
        type: 'streak',
        value: 12,
        target: 30,
        achieved: false
      },
      {
        id: '5',
        name: '50 Journal Entries',
        description: 'Write 50 journal entries',
        icon: '📝',
        type: 'journal',
        value: 45,
        target: 50,
        achieved: false
      },
      {
        id: '6',
        name: 'Mood Master',
        description: 'Track 10 different mood types',
        icon: '🌈',
        type: 'mood',
        value: 8,
        target: 10,
        achieved: false
      }
    ]

    setBadges(demoBadges)
    setMilestones(demoMilestones)
  }, [])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100 dark:bg-gray-700'
      case 'rare': return 'text-blue-600 bg-blue-100 dark:bg-blue-900'
      case 'epic': return 'text-purple-600 bg-purple-100 dark:bg-purple-900'
      case 'legendary': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700'
    }
  }

  const getProgressPercentage = (progress: number, maxProgress: number) => {
    return Math.min((progress / maxProgress) * 100, 100)
  }

  const unlockedBadges = badges.filter(badge => badge.unlocked)
  const lockedBadges = badges.filter(badge => !badge.unlocked)
  const achievedMilestones = milestones.filter(milestone => milestone.achieved)
  const pendingMilestones = milestones.filter(milestone => !milestone.achieved)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Progress & Achievements</h2>
          <p className="text-gray-600 dark:text-gray-400">Track your wellness journey and celebrate milestones</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{unlockedBadges.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Badges</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{achievedMilestones.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Milestones</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'badges', label: 'Badges', icon: Award },
          { id: 'streaks', label: 'Streaks', icon: Flame },
          { id: 'milestones', label: 'Milestones', icon: Target }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === tab.id
                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeSection === 'badges' && (
        <div className="space-y-6">
          {/* Unlocked Badges */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Unlocked Badges ({unlockedBadges.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unlockedBadges.map((badge) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
                        {badge.earnedDate && (
                          <span className="text-xs text-gray-500">
                            {new Date(badge.earnedDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Locked Badges */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              In Progress ({lockedBadges.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lockedBadges.map((badge) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl opacity-50">{badge.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{badge.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{badge.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="text-gray-900 dark:text-white">
                            {badge.progress}/{badge.maxProgress}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getProgressPercentage(badge.progress, badge.maxProgress)}%` }}
                          ></div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(badge.rarity)}`}>
                          {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'streaks' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Streaks */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Streaks</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Flame className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Mood Tracking</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Daily mood checks</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">12</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">days</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Journaling</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Daily writing</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">8</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Streaks */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Best Streaks</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Mood Tracking</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Best record</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-600">23</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">days</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Journaling</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Best record</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">15</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'milestones' && (
        <div className="space-y-6">
          {/* Achieved Milestones */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Achieved Milestones ({achievedMilestones.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievedMilestones.map((milestone) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{milestone.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{milestone.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{milestone.description}</p>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-700 dark:text-green-300">
                          Achieved {milestone.achievedDate && new Date(milestone.achievedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pending Milestones */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Upcoming Milestones ({pendingMilestones.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingMilestones.map((milestone) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl opacity-50">{milestone.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{milestone.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{milestone.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="text-gray-900 dark:text-white">
                            {milestone.value}/{milestone.target}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getProgressPercentage(milestone.value, milestone.target)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 