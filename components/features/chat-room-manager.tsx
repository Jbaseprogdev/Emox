'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle, Users, Settings, Search, Plus, X,
  Edit, Trash2, Lock, Unlock, Crown, Shield, MoreHorizontal,
  Volume2, VolumeX, Bell, BellOff, Archive, Pin, Heart
} from 'lucide-react'
import toast from 'react-hot-toast'

interface ChatRoomManagerProps {
  onClose: () => void
  currentUser?: any
}

interface ChatRoom {
  id: string
  name: string
  description: string
  type: 'public' | 'private' | 'emotion-based'
  currentEmotion: string
  memberCount: number
  maxMembers: number
  isActive: boolean
  isPinned: boolean
  isMuted: boolean
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  owner: string
  moderators: string[]
  tags: string[]
}

export function ChatRoomManager({ onClose, currentUser }: ChatRoomManagerProps) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [filteredRooms, setFilteredRooms] = useState<ChatRoom[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [loading, setLoading] = useState(true)

  // Mock data for chat rooms
  const mockRooms: ChatRoom[] = [
    {
      id: '1',
      name: 'Calm & Collected',
      description: 'A peaceful space for those feeling calm and centered',
      type: 'emotion-based',
      currentEmotion: 'Calm',
      memberCount: 12,
      maxMembers: 20,
      isActive: true,
      isPinned: true,
      isMuted: false,
      lastMessage: 'Sarah: "This breathing exercise really helped me today"',
      lastMessageTime: '2 minutes ago',
      unreadCount: 3,
      owner: 'Sarah Chen',
      moderators: ['Marcus Johnson'],
      tags: ['meditation', 'breathing', 'peaceful']
    },
    {
      id: '2',
      name: 'Tech Wellness',
      description: 'Discussing mental health in the tech industry',
      type: 'public',
      currentEmotion: 'Focused',
      memberCount: 45,
      maxMembers: 50,
      isActive: true,
      isPinned: false,
      isMuted: false,
      lastMessage: 'David: "Anyone tried the new meditation app?"',
      lastMessageTime: '5 minutes ago',
      unreadCount: 0,
      owner: 'David Kim',
      moderators: ['Emma Rodriguez', 'Lisa Thompson'],
      tags: ['technology', 'workplace', 'stress-management']
    },
    {
      id: '3',
      name: 'Creative Minds',
      description: 'Artists and creators supporting each other',
      type: 'private',
      currentEmotion: 'Excited',
      memberCount: 8,
      maxMembers: 15,
      isActive: true,
      isPinned: false,
      isMuted: true,
      lastMessage: 'Emma: "Just finished my latest painting!"',
      lastMessageTime: '10 minutes ago',
      unreadCount: 7,
      owner: 'Emma Rodriguez',
      moderators: ['Sarah Chen'],
      tags: ['art', 'creativity', 'inspiration']
    },
    {
      id: '4',
      name: 'Gratitude Circle',
      description: 'Sharing daily moments of gratitude',
      type: 'emotion-based',
      currentEmotion: 'Grateful',
      memberCount: 18,
      maxMembers: 25,
      isActive: true,
      isPinned: false,
      isMuted: false,
      lastMessage: 'Lisa: "Grateful for this supportive community"',
      lastMessageTime: '15 minutes ago',
      unreadCount: 1,
      owner: 'Lisa Thompson',
      moderators: ['David Kim'],
      tags: ['gratitude', 'positivity', 'community']
    },
    {
      id: '5',
      name: 'Stress Relief Hub',
      description: 'Quick stress relief techniques and support',
      type: 'public',
      currentEmotion: 'Stressed',
      memberCount: 32,
      maxMembers: 40,
      isActive: true,
      isPinned: false,
      isMuted: false,
      lastMessage: 'Marcus: "The 4-7-8 breathing technique works wonders"',
      lastMessageTime: '20 minutes ago',
      unreadCount: 0,
      owner: 'Marcus Johnson',
      moderators: ['Sarah Chen', 'Emma Rodriguez'],
      tags: ['stress-relief', 'breathing', 'techniques']
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setChatRooms(mockRooms)
      setFilteredRooms(mockRooms)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = chatRooms

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(room => 
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(room => room.type === selectedType)
    }

    // Sort rooms
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
        case 'name':
          return a.name.localeCompare(b.name)
        case 'members':
          return b.memberCount - a.memberCount
        case 'unread':
          return b.unreadCount - a.unreadCount
        default:
          return 0
      }
    })

    setFilteredRooms(filtered)
  }, [chatRooms, searchTerm, selectedType, sortBy])

  const handlePinRoom = (roomId: string) => {
    setChatRooms(rooms => rooms.map(room => 
      room.id === roomId ? { ...room, isPinned: !room.isPinned } : room
    ))
    toast.success('Room pin status updated!')
  }

  const handleMuteRoom = (roomId: string) => {
    setChatRooms(rooms => rooms.map(room => 
      room.id === roomId ? { ...room, isMuted: !room.isMuted } : room
    ))
    toast.success('Room mute status updated!')
  }

  const handleArchiveRoom = (roomId: string) => {
    setChatRooms(rooms => rooms.filter(room => room.id !== roomId))
    toast.success('Room archived!')
  }

  const getRoomTypeIcon = (type: string) => {
    switch (type) {
      case 'public':
        return <Unlock className="w-4 h-4" />
      case 'private':
        return <Lock className="w-4 h-4" />
      case 'emotion-based':
        return <Heart className="w-4 h-4" />
      default:
        return <MessageCircle className="w-4 h-4" />
    }
  }

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case 'public':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'private':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'emotion-based':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Chat Room Manager</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Manage your chat spaces and conversations</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Create Room</span>
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
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search rooms, descriptions, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="emotion-based">Emotion-Based</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recent">Sort by Recent Activity</option>
                <option value="name">Sort by Name</option>
                <option value="members">Sort by Member Count</option>
                <option value="unread">Sort by Unread Messages</option>
              </select>
            </div>
          </div>

          {/* Chat Rooms List */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Loading chat rooms...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRooms.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No chat rooms found</h3>
                  <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria or create a new room</p>
                </div>
              ) : (
                filteredRooms.map((room) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-all duration-200 ${
                      room.isPinned ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Room Icon and Status */}
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl flex items-center justify-center">
                          <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        {room.isPinned && (
                          <Pin className="absolute -top-1 -right-1 w-4 h-4 text-blue-500" />
                        )}
                      </div>

                      {/* Room Info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{room.name}</h3>
                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getRoomTypeColor(room.type)}`}>
                              {getRoomTypeIcon(room.type)}
                            </span>
                            {room.owner === currentUser?.name && (
                              <Crown className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {room.memberCount}/{room.maxMembers} members
                            </span>
                            {room.unreadCount > 0 && (
                              <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                                {room.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-3">{room.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {room.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Last Message */}
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {room.lastMessage}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {room.lastMessageTime}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handlePinRoom(room.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                room.isPinned 
                                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                  : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-600'
                              }`}
                            >
                              <Pin className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleMuteRoom(room.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                room.isMuted 
                                  ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                  : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-400 hover:bg-red-100 hover:text-red-600'
                              }`}
                            >
                              {room.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                            <button className="p-2 rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-400 hover:bg-gray-200 transition-colors">
                              <Settings className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => handleArchiveRoom(room.id)}
                            className="p-2 rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                          >
                            <Archive className="w-4 h-4" />
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
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Chat Room Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{filteredRooms.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Rooms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  {filteredRooms.reduce((acc, room) => acc + room.memberCount, 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {filteredRooms.reduce((acc, room) => acc + room.unreadCount, 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Unread Messages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {filteredRooms.filter(room => room.isActive).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Rooms</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 