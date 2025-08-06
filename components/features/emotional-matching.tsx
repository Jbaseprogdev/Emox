'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart, Users, MessageCircle, Star, Filter, Search,
  X, UserPlus, UserCheck, UserX, Sparkles, Target
} from 'lucide-react'
import toast from 'react-hot-toast'

interface EmotionalMatchingProps {
  onClose: () => void
  currentUser?: any
}

interface CompatibleUser {
  id: string
  name: string
  avatar: string
  currentEmotion: string
  compatibilityScore: number
  sharedInterests: string[]
  lastActive: string
  isOnline: boolean
  mutualConnections: number
}

const emotionColors = {
  'Happy': 'from-yellow-400 to-orange-500',
  'Calm': 'from-blue-400 to-cyan-500',
  'Excited': 'from-pink-400 to-purple-500',
  'Focused': 'from-green-400 to-emerald-500',
  'Relaxed': 'from-indigo-400 to-blue-500',
  'Grateful': 'from-amber-400 to-yellow-500',
  'Anxious': 'from-red-400 to-pink-500',
  'Stressed': 'from-orange-400 to-red-500'
}

const emotionIcons = {
  'Happy': '😊',
  'Calm': '😌',
  'Excited': '🤩',
  'Focused': '🎯',
  'Relaxed': '😎',
  'Grateful': '🙏',
  'Anxious': '😰',
  'Stressed': '😤'
}

export function EmotionalMatching({ onClose, currentUser }: EmotionalMatchingProps) {
  const [compatibleUsers, setCompatibleUsers] = useState<CompatibleUser[]>([])
  const [filteredUsers, setFilteredUsers] = useState<CompatibleUser[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEmotion, setSelectedEmotion] = useState('all')
  const [sortBy, setSortBy] = useState('compatibility')
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<CompatibleUser | null>(null)

  // Mock data for compatible users
  const mockUsers: CompatibleUser[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: '👩‍💼',
      currentEmotion: 'Calm',
      compatibilityScore: 95,
      sharedInterests: ['Meditation', 'Reading', 'Nature'],
      lastActive: '2 minutes ago',
      isOnline: true,
      mutualConnections: 3
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      avatar: '👨‍💻',
      currentEmotion: 'Focused',
      compatibilityScore: 88,
      sharedInterests: ['Technology', 'Fitness', 'Music'],
      lastActive: '5 minutes ago',
      isOnline: true,
      mutualConnections: 2
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      avatar: '👩‍🎨',
      currentEmotion: 'Excited',
      compatibilityScore: 82,
      sharedInterests: ['Art', 'Travel', 'Photography'],
      lastActive: '10 minutes ago',
      isOnline: false,
      mutualConnections: 1
    },
    {
      id: '4',
      name: 'David Kim',
      avatar: '👨‍🏫',
      currentEmotion: 'Grateful',
      compatibilityScore: 79,
      sharedInterests: ['Teaching', 'Cooking', 'Languages'],
      lastActive: '15 minutes ago',
      isOnline: true,
      mutualConnections: 4
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      avatar: '👩‍⚕️',
      currentEmotion: 'Relaxed',
      compatibilityScore: 76,
      sharedInterests: ['Healthcare', 'Yoga', 'Volunteering'],
      lastActive: '20 minutes ago',
      isOnline: false,
      mutualConnections: 2
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCompatibleUsers(mockUsers)
      setFilteredUsers(mockUsers)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = compatibleUsers

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.sharedInterests.some(interest => 
          interest.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Filter by emotion
    if (selectedEmotion !== 'all') {
      filtered = filtered.filter(user => user.currentEmotion === selectedEmotion)
    }

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'compatibility':
          return b.compatibilityScore - a.compatibilityScore
        case 'recent':
          return new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime()
        case 'connections':
          return b.mutualConnections - a.mutualConnections
        default:
          return 0
      }
    })

    setFilteredUsers(filtered)
  }, [compatibleUsers, searchTerm, selectedEmotion, sortBy])

  const handleConnect = (user: CompatibleUser) => {
    toast.success(`Connection request sent to ${user.name}!`)
    // Here you would typically send a connection request
  }

  const handleMessage = (user: CompatibleUser) => {
    toast.success(`Opening chat with ${user.name}`)
    // Here you would typically open a chat
  }

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-gray-600'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Emotional Matching</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Find compatible friends based on emotions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or interests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedEmotion}
                onChange={(e) => setSelectedEmotion(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="all">All Emotions</option>
                {Object.keys(emotionColors).map(emotion => (
                  <option key={emotion} value={emotion}>{emotion}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="compatibility">Sort by Compatibility</option>
                <option value="recent">Sort by Recent Activity</option>
                <option value="connections">Sort by Mutual Connections</option>
              </select>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Finding compatible friends...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No matches found</h3>
                  <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria</p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Avatar and Status */}
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center text-2xl">
                          {user.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-700 ${
                          user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-medium ${getCompatibilityColor(user.compatibilityScore)}`}>
                              {user.compatibilityScore}% match
                            </span>
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                          </div>
                        </div>

                        {/* Emotion Badge */}
                        <div className="flex items-center space-x-2 mb-3">
                          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${emotionColors[user.currentEmotion as keyof typeof emotionColors]} text-white text-sm font-medium flex items-center space-x-1`}>
                            <span>{emotionIcons[user.currentEmotion as keyof typeof emotionIcons]}</span>
                            <span>{user.currentEmotion}</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {user.lastActive}
                          </span>
                        </div>

                        {/* Shared Interests */}
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Shared interests:</p>
                          <div className="flex flex-wrap gap-2">
                            {user.sharedInterests.map((interest, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-md text-xs"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Mutual Connections */}
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <span>{user.mutualConnections} mutual connections</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleConnect(user)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
                          >
                            <UserPlus className="w-4 h-4" />
                            <span>Connect</span>
                          </button>
                          <button
                            onClick={() => handleMessage(user)}
                            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Message</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Stats */}
          <div className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Matching Insights</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{filteredUsers.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Compatible Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {filteredUsers.length > 0 ? Math.round(filteredUsers.reduce((acc, user) => acc + user.compatibilityScore, 0) / filteredUsers.length) : 0}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Compatibility</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {filteredUsers.filter(user => user.isOnline).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Online Now</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {filteredUsers.reduce((acc, user) => acc + user.mutualConnections, 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Connections</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 