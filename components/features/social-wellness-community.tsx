'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, Heart, Star, MessageCircle, Share2, Plus, X, Search,
  Filter, Calendar, Target, Award, TrendingUp, Users2, Shield,
  CheckCircle, Clock, Bell, Settings, Eye, EyeOff, Download,
  Camera, Video, Mic, Send, ThumbsUp, Bookmark, MoreHorizontal
} from 'lucide-react'
import toast from 'react-hot-toast'

interface SocialWellnessCommunityProps {
  onClose: () => void
  currentUser?: any
}

interface WellnessCircle {
  id: string
  name: string
  description: string
  category: 'meditation' | 'fitness' | 'mental_health' | 'nutrition' | 'sleep'
  memberCount: number
  maxMembers: number
  isPrivate: boolean
  isActive: boolean
  createdBy: string
  avatar: string
  tags: string[]
  lastActivity: string
  upcomingEvents: number
}

interface CommunityChallenge {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly'
  participants: number
  maxParticipants: number
  progress: number
  daysLeft: number
  reward: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  isJoined: boolean
}

interface CommunityPost {
  id: string
  author: {
    name: string
    avatar: string
    verified: boolean
  }
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  timestamp: string
  category: string
  tags: string[]
}

export function SocialWellnessCommunity({ onClose, currentUser }: SocialWellnessCommunityProps) {
  const [activeTab, setActiveTab] = useState('circles')
  const [wellnessCircles, setWellnessCircles] = useState<WellnessCircle[]>([])
  const [challenges, setChallenges] = useState<CommunityChallenge[]>([])
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const mockWellnessCircles: WellnessCircle[] = [
    {
      id: '1',
      name: 'Mindful Meditation Masters',
      description: 'Advanced meditation techniques and mindfulness practices for daily life',
      category: 'meditation',
      memberCount: 156,
      maxMembers: 200,
      isPrivate: false,
      isActive: true,
      createdBy: 'Sarah Chen',
      avatar: '🧘',
      tags: ['meditation', 'mindfulness', 'zen'],
      lastActivity: '2 minutes ago',
      upcomingEvents: 3
    },
    {
      id: '2',
      name: 'Fitness Warriors',
      description: 'Supportive community for fitness enthusiasts and health goals',
      category: 'fitness',
      memberCount: 89,
      maxMembers: 150,
      isPrivate: false,
      isActive: true,
      createdBy: 'Mike Johnson',
      avatar: '💪',
      tags: ['fitness', 'workout', 'health'],
      lastActivity: '15 minutes ago',
      upcomingEvents: 2
    },
    {
      id: '3',
      name: 'Mental Health Support',
      description: 'Safe space for mental health discussions and emotional support',
      category: 'mental_health',
      memberCount: 234,
      maxMembers: 300,
      isPrivate: true,
      isActive: true,
      createdBy: 'Dr. Emma Thompson',
      avatar: '🧠',
      tags: ['mental-health', 'support', 'therapy'],
      lastActivity: '1 hour ago',
      upcomingEvents: 1
    }
  ]

  const mockChallenges: CommunityChallenge[] = [
    {
      id: '1',
      title: '30-Day Meditation Challenge',
      description: 'Meditate for at least 10 minutes every day for 30 days',
      type: 'monthly',
      participants: 1247,
      maxParticipants: 2000,
      progress: 65,
      daysLeft: 12,
      reward: 'Mindfulness Master Badge',
      category: 'meditation',
      difficulty: 'beginner',
      isJoined: true
    },
    {
      id: '2',
      title: 'Weekly Fitness Goals',
      description: 'Complete 5 workouts this week and share your progress',
      type: 'weekly',
      participants: 892,
      maxParticipants: 1000,
      progress: 78,
      daysLeft: 3,
      reward: 'Fitness Warrior Badge',
      category: 'fitness',
      difficulty: 'intermediate',
      isJoined: false
    },
    {
      id: '3',
      title: 'Gratitude Journal Challenge',
      description: 'Write down 3 things you\'re grateful for every day',
      type: 'daily',
      participants: 567,
      maxParticipants: 800,
      progress: 45,
      daysLeft: 7,
      reward: 'Gratitude Guru Badge',
      category: 'mental_health',
      difficulty: 'beginner',
      isJoined: true
    }
  ]

  const mockPosts: CommunityPost[] = [
    {
      id: '1',
      author: {
        name: 'Sarah Chen',
        avatar: '🧘',
        verified: true
      },
      content: 'Just completed my 100th day of meditation! The journey has been incredible. Remember, consistency beats perfection. What\'s your meditation streak?',
      likes: 89,
      comments: 23,
      shares: 12,
      timestamp: '2 hours ago',
      category: 'meditation',
      tags: ['meditation', 'streak', 'mindfulness']
    },
    {
      id: '2',
      author: {
        name: 'Mike Johnson',
        avatar: '💪',
        verified: false
      },
      content: 'Hit a new personal record today! 5K in 22 minutes. The community support here has been amazing. Keep pushing your limits!',
      likes: 156,
      comments: 45,
      shares: 28,
      timestamp: '4 hours ago',
      category: 'fitness',
      tags: ['fitness', 'running', 'achievement']
    },
    {
      id: '3',
      author: {
        name: 'Dr. Emma Thompson',
        avatar: '🧠',
        verified: true
      },
      content: 'Mental health tip of the day: Practice self-compassion. Treat yourself with the same kindness you would offer a friend. You deserve it.',
      likes: 234,
      comments: 67,
      shares: 89,
      timestamp: '6 hours ago',
      category: 'mental_health',
      tags: ['mental-health', 'self-compassion', 'tips']
    }
  ]

  useEffect(() => {
    setWellnessCircles(mockWellnessCircles)
    setChallenges(mockChallenges)
    setPosts(mockPosts)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meditation': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      case 'fitness': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'mental_health': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'nutrition': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
      case 'sleep': return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const joinCircle = (circleId: string) => {
    setWellnessCircles(prev => prev.map(circle => 
      circle.id === circleId 
        ? { ...circle, memberCount: circle.memberCount + 1 }
        : circle
    ))
    toast.success('Joined wellness circle!')
  }

  const joinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, isJoined: true, participants: challenge.participants + 1 }
        : challenge
    ))
    toast.success('Joined challenge!')
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
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Social Wellness Community</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connect, support, and grow with like-minded wellness enthusiasts
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
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
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search circles, challenges, or posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Categories</option>
                <option value="meditation">Meditation</option>
                <option value="fitness">Fitness</option>
                <option value="mental_health">Mental Health</option>
                <option value="nutrition">Nutrition</option>
                <option value="sleep">Sleep</option>
              </select>
            </div>

            {/* Tabs */}
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {['circles', 'challenges', 'feed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'circles' && (
                <motion.div
                  key="circles"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Wellness Circles</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wellnessCircles.map((circle) => (
                      <div
                        key={circle.id}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-2xl">
                              {circle.avatar}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{circle.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{circle.createdBy}</p>
                            </div>
                          </div>
                          {circle.isPrivate && <Shield className="w-4 h-4 text-gray-400" />}
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{circle.description}</p>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Members</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {circle.memberCount}/{circle.maxMembers}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                              style={{ width: `${(circle.memberCount / circle.maxMembers) * 100}%` }}
                            />
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {circle.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs text-gray-700 dark:text-gray-300 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>Last active: {circle.lastActivity}</span>
                            <span>{circle.upcomingEvents} events</span>
                          </div>

                          <button
                            onClick={() => joinCircle(circle.id)}
                            className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 text-sm"
                          >
                            Join Circle
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'challenges' && (
                <motion.div
                  key="challenges"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Community Challenges</h3>
                  
                  <div className="space-y-4">
                    {challenges.map((challenge) => (
                      <div
                        key={challenge.id}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{challenge.title}</h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                                {challenge.difficulty}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-3">{challenge.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{challenge.progress}%</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Participants</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {challenge.participants}/{challenge.maxParticipants}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                              style={{ width: `${challenge.progress}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>Days left: {challenge.daysLeft}</span>
                            <span>Reward: {challenge.reward}</span>
                          </div>

                          <button
                            onClick={() => joinChallenge(challenge.id)}
                            disabled={challenge.isJoined}
                            className={`w-full px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                              challenge.isJoined
                                ? 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700'
                            }`}
                          >
                            {challenge.isJoined ? 'Joined' : 'Join Challenge'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'feed' && (
                <motion.div
                  key="feed"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Community Feed</h3>
                  
                  <div className="space-y-6">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                      >
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-xl">
                            {post.author.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{post.author.name}</h4>
                              {post.author.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}>
                                {post.category.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{post.timestamp}</p>
                          </div>
                        </div>

                        <p className="text-gray-900 dark:text-white mb-4">{post.content}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs text-gray-700 dark:text-gray-300 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
                              <Heart className="w-4 h-4" />
                              <span className="text-sm">{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-sm">{post.comments}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors">
                              <Share2 className="w-4 h-4" />
                              <span className="text-sm">{post.shares}</span>
                            </button>
                          </div>
                          <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 