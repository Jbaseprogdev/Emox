'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, Plus, X, Edit3, Trash2, MoreHorizontal, Heart, MessageCircle, Share2,
  Lock, Unlock, Eye, EyeOff, Download, Copy, CheckCircle, AlertCircle, Star,
  Filter, Search, Calendar, Clock, User, Shield, Crown, ThumbsUp, Bookmark, Brain
} from 'lucide-react'
import toast from 'react-hot-toast'

interface CollaborativeHealingBoardsProps {
  onClose: () => void
  currentUser?: any
}

interface HealingBoard {
  id: string
  title: string
  description: string
  category: 'grief' | 'anxiety' | 'depression' | 'trauma' | 'relationships' | 'self-love' | 'general'
  type: 'shared_journal' | 'reflection_circle' | 'support_group' | 'healing_ritual'
  isPrivate: boolean
  isModerated: boolean
  creator: string
  createdAt: string
  lastActivity: string
  memberCount: number
  maxMembers: number
  posts: Post[]
  tags: string[]
  moodTags: string[]
  guidelines: string[]
  moderators: string[]
  joinRequirements: string[]
}

interface Post {
  id: string
  author: string
  authorAvatar: string
  content: string
  type: 'reflection' | 'support' | 'celebration' | 'question' | 'resource'
  mood: string
  isAnonymous: boolean
  createdAt: string
  likes: number
  comments: Comment[]
  tags: string[]
  isPinned: boolean
  isModerated: boolean
}

interface Comment {
  id: string
  author: string
  authorAvatar: string
  content: string
  createdAt: string
  likes: number
  isSupportive: boolean
}

export function CollaborativeHealingBoards({ onClose, currentUser }: CollaborativeHealingBoardsProps) {
  const [boards, setBoards] = useState<HealingBoard[]>([])
  const [activeBoard, setActiveBoard] = useState<HealingBoard | null>(null)
  const [showCreateBoard, setShowCreateBoard] = useState(false)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'activity'>('grid')
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'active'>('recent')

  const mockBoards: HealingBoard[] = [
    {
      id: '1',
      title: 'Grief Support Circle',
      description: 'A safe space for sharing experiences with loss and finding healing together',
      category: 'grief',
      type: 'support_group',
      isPrivate: false,
      isModerated: true,
      creator: 'Sarah Chen',
      createdAt: '2024-01-10T08:00:00Z',
      lastActivity: '2024-01-15T14:30:00Z',
      memberCount: 45,
      maxMembers: 100,
      posts: [
        {
          id: '1',
          author: 'Emma Thompson',
          authorAvatar: '/avatars/emma.jpg',
          content: 'Today marks 6 months since I lost my mother. Some days are easier than others, but I\'m learning to be gentle with myself. This community has been such a source of comfort and understanding. Thank you all for being here.',
          type: 'reflection',
          mood: 'contemplative',
          isAnonymous: false,
          createdAt: '2024-01-15T14:30:00Z',
          likes: 12,
          comments: [
            {
              id: '1',
              author: 'Mike Johnson',
              authorAvatar: '/avatars/mike.jpg',
              content: 'Emma, your strength and vulnerability inspire me. Grief has no timeline, and being gentle with yourself is exactly what you need. Sending you love and understanding.',
              createdAt: '2024-01-15T15:00:00Z',
              likes: 8,
              isSupportive: true
            }
          ],
          tags: ['grief', 'mother', 'healing'],
          isPinned: false,
          isModerated: false
        }
      ],
      tags: ['grief', 'loss', 'healing', 'support'],
      moodTags: ['sad', 'contemplative', 'hopeful'],
      guidelines: [
        'Be compassionate and supportive',
        'Respect everyone\'s unique grieving process',
        'No judgment or unsolicited advice',
        'Maintain confidentiality',
        'Report any harmful content'
      ],
      moderators: ['Sarah Chen', 'Dr. Emma Thompson'],
      joinRequirements: ['Respect for others', 'Willingness to support']
    },
    {
      id: '2',
      title: 'Anxiety Warriors',
      description: 'A community for those dealing with anxiety to share coping strategies and support each other',
      category: 'anxiety',
      type: 'shared_journal',
      isPrivate: false,
      isModerated: true,
      creator: 'Dr. Emma Thompson',
      createdAt: '2024-01-08T14:00:00Z',
      lastActivity: '2024-01-15T16:45:00Z',
      memberCount: 78,
      maxMembers: 150,
      posts: [
        {
          id: '2',
          author: 'Alex Rodriguez',
          authorAvatar: '/avatars/alex.jpg',
          content: 'Had a panic attack this morning before my presentation. Used the 4-7-8 breathing technique we discussed last week and it really helped. Sharing in case it helps someone else. Remember: you\'re not alone in this.',
          type: 'support',
          mood: 'hopeful',
          isAnonymous: false,
          createdAt: '2024-01-15T16:45:00Z',
          likes: 23,
          comments: [
            {
              id: '2',
              author: 'Sarah Chen',
              authorAvatar: '/avatars/sarah.jpg',
              content: 'Thank you for sharing this, Alex! The 4-7-8 technique has been a lifesaver for me too. Proud of you for getting through it and helping others.',
              createdAt: '2024-01-15T17:00:00Z',
              likes: 15,
              isSupportive: true
            }
          ],
          tags: ['anxiety', 'panic_attack', 'breathing', 'coping'],
          isPinned: true,
          isModerated: false
        }
      ],
      tags: ['anxiety', 'coping', 'support', 'strategies'],
      moodTags: ['anxious', 'hopeful', 'determined'],
      guidelines: [
        'Share coping strategies and experiences',
        'Be supportive and non-judgmental',
        'No medical advice - consult professionals',
        'Celebrate small victories',
        'Maintain a safe environment'
      ],
      moderators: ['Dr. Emma Thompson', 'Sarah Chen'],
      joinRequirements: ['Respect for others', 'Willingness to learn and share']
    },
    {
      id: '3',
      title: 'Self-Love Journey',
      description: 'A private space for exploring self-compassion and building healthy self-esteem',
      category: 'self-love',
      type: 'reflection_circle',
      isPrivate: true,
      isModerated: true,
      creator: 'Mike Johnson',
      createdAt: '2024-01-05T10:00:00Z',
      lastActivity: '2024-01-15T12:20:00Z',
      memberCount: 23,
      maxMembers: 50,
      posts: [
        {
          id: '3',
          author: 'Lisa Wang',
          authorAvatar: '/avatars/lisa.jpg',
          content: 'Today I practiced self-compassion by taking a long bath and reading my favorite book. It\'s amazing how small acts of kindness to ourselves can make such a difference. What acts of self-love did you practice today?',
          type: 'celebration',
          mood: 'joyful',
          isAnonymous: false,
          createdAt: '2024-01-15T12:20:00Z',
          likes: 18,
          comments: [
            {
              id: '3',
              author: 'Mike Johnson',
              authorAvatar: '/avatars/mike.jpg',
              content: 'Lisa, that sounds wonderful! I went for a walk in nature and practiced gratitude. It\'s beautiful how we\'re all learning to be kinder to ourselves.',
              createdAt: '2024-01-15T12:45:00Z',
              likes: 12,
              isSupportive: true
            }
          ],
          tags: ['self_love', 'self_care', 'gratitude'],
          isPinned: false,
          isModerated: false
        }
      ],
      tags: ['self_love', 'self_compassion', 'healing', 'growth'],
      moodTags: ['loving', 'joyful', 'peaceful'],
      guidelines: [
        'Practice self-compassion',
        'Celebrate each other\'s growth',
        'No self-criticism or judgment',
        'Share positive experiences',
        'Support each other\'s journey'
      ],
      moderators: ['Mike Johnson', 'Lisa Wang'],
      joinRequirements: ['Commitment to self-growth', 'Respect for privacy']
    }
  ]

  useEffect(() => {
    setBoards(mockBoards)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'grief': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      case 'anxiety': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'depression': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
      case 'trauma': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'relationships': return 'text-pink-600 bg-pink-100 dark:bg-pink-900/30'
      case 'self-love': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      default: return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'grief': return <Heart className="w-4 h-4" />
      case 'anxiety': return <AlertCircle className="w-4 h-4" />
      case 'depression': return <Brain className="w-4 h-4" />
      case 'trauma': return <Shield className="w-4 h-4" />
      case 'relationships': return <Users className="w-4 h-4" />
      case 'self-love': return <Star className="w-4 h-4" />
      default: return <Users className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'shared_journal': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'reflection_circle': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'support_group': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      case 'healing_ritual': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'contemplative': return <Brain className="w-4 h-4 text-purple-500" />
      case 'hopeful': return <Star className="w-4 h-4 text-yellow-500" />
      case 'joyful': return <Heart className="w-4 h-4 text-red-500" />
      case 'sad': return <Heart className="w-4 h-4 text-blue-500" />
      case 'anxious': return <AlertCircle className="w-4 h-4 text-orange-500" />
      default: return <Heart className="w-4 h-4 text-gray-500" />
    }
  }

  const joinBoard = (boardId: string) => {
    setBoards(prev => prev.map(board => 
      board.id === boardId 
        ? { ...board, memberCount: board.memberCount + 1 }
        : board
    ))
    toast.success('Joined the healing board!')
  }

  const likePost = (boardId: string, postId: string) => {
    setBoards(prev => prev.map(board => 
      board.id === boardId 
        ? {
            ...board,
            posts: board.posts.map(post => 
              post.id === postId 
                ? { ...post, likes: post.likes + 1 }
                : post
            )
          }
        : board
    ))
    toast.success('Post liked!')
  }

  const filteredBoards = boards.filter(board => {
    const categoryMatch = filterCategory === 'all' || board.category === filterCategory
    const searchMatch = board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       board.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       board.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return categoryMatch && searchMatch
  })

  const sortedBoards = [...filteredBoards].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
      case 'popular':
        return b.memberCount - a.memberCount
      case 'active':
        return b.posts.length - a.posts.length
      default:
        return 0
    }
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Collaborative Healing Boards</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Shared journals and reflections with community support
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCreateBoard(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
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
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search healing boards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Categories</option>
                <option value="grief">Grief</option>
                <option value="anxiety">Anxiety</option>
                <option value="depression">Depression</option>
                <option value="trauma">Trauma</option>
                <option value="relationships">Relationships</option>
                <option value="self-love">Self-Love</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="active">Most Active</option>
              </select>
              <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {['grid', 'list', 'activity'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as any)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === mode
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Boards Grid */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedBoards.map((board) => (
                  <div
                    key={board.id}
                    className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setActiveBoard(board)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white">
                          {getCategoryIcon(board.category)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{board.title}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(board.category)}`}>
                              {board.category}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(board.type)}`}>
                              {board.type.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {board.isPrivate ? (
                          <Lock className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Unlock className="w-4 h-4 text-green-500" />
                        )}
                        {board.isModerated && (
                          <Shield className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{board.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>👥 {board.memberCount}/{board.maxMembers} members</span>
                        <span>📝 {board.posts.length} posts</span>
                        <span>⏰ {formatDate(board.lastActivity)}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              joinBoard(board.id)
                            }}
                            className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                          >
                            Join
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveBoard(board)
                            }}
                            className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                          >
                            View
                          </button>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          By {board.creator}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {board.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Activity View */}
            {viewMode === 'activity' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                
                <div className="space-y-4">
                  {sortedBoards.flatMap(board => 
                    board.posts.map(post => ({
                      ...post,
                      boardTitle: board.title,
                      boardCategory: board.category
                    }))
                  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10).map((post) => (
                    <div
                      key={post.id}
                      className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white">
                          {post.authorAvatar ? (
                            <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full" />
                          ) : (
                            <User className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {post.isAnonymous ? 'Anonymous' : post.author}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.boardCategory)}`}>
                              {post.boardCategory}
                            </span>
                            {getMoodIcon(post.mood)}
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">{post.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => likePost(post.boardTitle, post.id)}
                                className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Heart className="w-4 h-4" />
                                <span className="text-sm">{post.likes}</span>
                              </button>
                              <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-sm">{post.comments.length}</span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              in {post.boardTitle}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Board Detail Modal */}
            <AnimatePresence>
              {activeBoard && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                  onClick={() => setActiveBoard(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white">
                          {getCategoryIcon(activeBoard.category)}
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{activeBoard.title}</h2>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(activeBoard.category)}`}>
                              {activeBoard.category}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(activeBoard.type)}`}>
                              {activeBoard.type.replace('_', ' ')}
                            </span>
                            {activeBoard.isPrivate && (
                              <span className="px-2 py-1 text-xs font-medium rounded-full text-gray-600 bg-gray-100 dark:bg-gray-900/30">
                                Private
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setShowCreatePost(true)}
                          className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActiveBoard(null)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{activeBoard.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Community Guidelines</h4>
                          <ul className="space-y-2">
                            {activeBoard.guidelines.map((guideline, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                <span className="text-purple-500 font-medium">•</span>
                                <span>{guideline}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Moderators</h4>
                          <div className="space-y-2">
                            {activeBoard.moderators.map((moderator, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                <Crown className="w-4 h-4 text-yellow-500" />
                                <span>{moderator}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Recent Posts</h4>
                        {activeBoard.posts.map((post) => (
                          <div key={post.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white">
                                {post.authorAvatar ? (
                                  <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full" />
                                ) : (
                                  <User className="w-4 h-4" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {post.isAnonymous ? 'Anonymous' : post.author}
                                  </span>
                                  {getMoodIcon(post.mood)}
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatDate(post.createdAt)}
                                  </span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">{post.content}</p>
                                <div className="flex items-center space-x-4">
                                  <button
                                    onClick={() => likePost(activeBoard.id, post.id)}
                                    className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                                  >
                                    <Heart className="w-4 h-4" />
                                    <span className="text-sm">{post.likes}</span>
                                  </button>
                                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                                    <MessageCircle className="w-4 h-4" />
                                    <span className="text-sm">{post.comments.length}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 