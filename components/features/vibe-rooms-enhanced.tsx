'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Send, Users, Lock, Unlock, Crown, Shield, Star, 
  MessageCircle, Heart, Settings, UserPlus, UserMinus, 
  Mic, MicOff, Video, VideoOff, MoreVertical, Flag,
  CheckCircle, XCircle, Clock, Award, Zap, Sparkles
} from 'lucide-react'
import toast from 'react-hot-toast'
import { JoinRequestSystem } from './join-request-system'
import { EnhancedRoomCreation } from './enhanced-room-creation'

interface VibeRoomProps {
  onClose: () => void
  currentUser?: any
}

interface RoomMember {
  id: string
  name: string
  avatar: string
  role: 'owner' | 'moderator' | 'member' | 'follower'
  joinedAt: Date
  lastActive: Date
  isOnline: boolean
  reputation: number
  permissions: string[]
}

interface ChatMessage {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  timestamp: Date
  type: 'text' | 'reaction' | 'system'
  reactions: { [key: string]: string[] }
  isEdited?: boolean
  isDeleted?: boolean
}

interface VibeRoom {
  id: string
  name: string
  description: string
  emotion: string
  isPrivate: boolean
  maxMembers: number
  currentMembers: number
  owner: RoomMember
  moderators: RoomMember[]
  members: RoomMember[]
  followers: RoomMember[]
  requirements: RoomRequirements
  rules: string[]
  createdAt: Date
  lastActivity: Date
  isActive: boolean
  tags: string[]
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

interface RoomRequirements {
  minLevel: number
  minReputation: number
  minJoinTime: number // days
  requiredTags: string[]
  approvalRequired: boolean
  inviteOnly: boolean
  maxDailyMessages: number
  cooldownPeriod: number // minutes
}

export function VibeRoomsEnhanced({ onClose, currentUser }: VibeRoomProps) {
  const [activeTab, setActiveTab] = useState<'browse' | 'my-rooms' | 'create'>('browse')
  const [selectedRoom, setSelectedRoom] = useState<VibeRoom | null>(null)
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [showRoomDetails, setShowRoomDetails] = useState(false)
  const [showPermissions, setShowPermissions] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [userRole, setUserRole] = useState<'owner' | 'moderator' | 'member' | 'follower' | 'none'>('none')
  const [showJoinRequest, setShowJoinRequest] = useState(false)
  const [joinRequestReason, setJoinRequestReason] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const emotionThemes = [
    { name: 'Joy', color: 'bg-yellow-100 text-yellow-800', icon: '😊' },
    { name: 'Calm', color: 'bg-blue-100 text-blue-800', icon: '😌' },
    { name: 'Excitement', color: 'bg-orange-100 text-orange-800', icon: '🤩' },
    { name: 'Support', color: 'bg-green-100 text-green-800', icon: '🤗' },
    { name: 'Reflection', color: 'bg-purple-100 text-purple-800', icon: '🤔' },
    { name: 'Motivation', color: 'bg-red-100 text-red-800', icon: '💪' }
  ]

  const mockRooms: VibeRoom[] = [
    {
      id: '1',
      name: 'Morning Sunshine ☀️',
      description: 'Start your day with positive vibes and motivation',
      emotion: 'Joy',
      isPrivate: false,
      maxMembers: 50,
      currentMembers: 23,
      owner: {
        id: 'owner1',
        name: 'Sarah Johnson',
        avatar: 'S',
        role: 'owner',
        joinedAt: new Date('2024-01-01'),
        lastActive: new Date(),
        isOnline: true,
        reputation: 95,
        permissions: ['manage_room', 'moderate', 'invite', 'kick']
      },
      moderators: [],
      members: [],
      followers: [],
      requirements: {
        minLevel: 1,
        minReputation: 10,
        minJoinTime: 1,
        requiredTags: ['positive', 'motivation'],
        approvalRequired: false,
        inviteOnly: false,
        maxDailyMessages: 50,
        cooldownPeriod: 1
      },
      rules: [
        'Be respectful and supportive',
        'No negative energy allowed',
        'Share positive experiences',
        'Encourage others'
      ],
      createdAt: new Date('2024-01-01'),
      lastActivity: new Date(),
      isActive: true,
      tags: ['morning', 'positive', 'motivation'],
      level: 'beginner'
    },
    {
      id: '2',
      name: 'Deep Thoughts 🤔',
      description: 'Philosophical discussions and deep reflections',
      emotion: 'Reflection',
      isPrivate: true,
      maxMembers: 20,
      currentMembers: 15,
      owner: {
        id: 'owner2',
        name: 'Mike Chen',
        avatar: 'M',
        role: 'owner',
        joinedAt: new Date('2024-01-01'),
        lastActive: new Date(),
        isOnline: true,
        reputation: 88,
        permissions: ['manage_room', 'moderate', 'invite', 'kick']
      },
      moderators: [],
      members: [],
      followers: [],
      requirements: {
        minLevel: 5,
        minReputation: 50,
        minJoinTime: 7,
        requiredTags: ['philosophy', 'reflection'],
        approvalRequired: true,
        inviteOnly: true,
        maxDailyMessages: 20,
        cooldownPeriod: 5
      },
      rules: [
        'Respectful intellectual discourse',
        'No personal attacks',
        'Support your arguments',
        'Listen to different perspectives'
      ],
      createdAt: new Date('2024-01-01'),
      lastActivity: new Date(),
      isActive: true,
      tags: ['philosophy', 'reflection', 'intellectual'],
      level: 'advanced'
    }
  ]

  const userProfile = {
    id: currentUser?.id || 'demo-user',
    name: currentUser?.name || 'Demo User',
    avatar: currentUser?.name?.charAt(0) || 'D',
    level: 3,
    reputation: 45,
    joinDate: new Date('2024-01-01'),
    tags: ['positive', 'supportive', 'active']
  }

  useEffect(() => {
    if (selectedRoom) {
      // Simulate loading messages
      const mockMessages: ChatMessage[] = [
        {
          id: '1',
          userId: 'owner1',
          userName: 'Sarah Johnson',
          userAvatar: 'S',
          content: 'Good morning everyone! How are you feeling today? ☀️',
          timestamp: new Date(Date.now() - 300000),
          type: 'text',
          reactions: { '❤️': ['user1', 'user2'], '👍': ['user3'] }
        },
        {
          id: '2',
          userId: 'user1',
          userName: 'Emma Wilson',
          userAvatar: 'E',
          content: 'Feeling great! Just finished my morning workout 💪',
          timestamp: new Date(Date.now() - 240000),
          type: 'text',
          reactions: { '💪': ['owner1', 'user2'] }
        },
        {
          id: '3',
          userId: 'user2',
          userName: 'Alex Rodriguez',
          userAvatar: 'A',
          content: 'Same here! Ready to tackle the day with positive energy ✨',
          timestamp: new Date(Date.now() - 180000),
          type: 'text',
          reactions: { '✨': ['owner1', 'user1'] }
        }
      ]
      setMessages(mockMessages)
      checkUserRole(selectedRoom)
    }
  }, [selectedRoom])

  const checkUserRole = (room: VibeRoom) => {
    if (room.owner.id === userProfile.id) {
      setUserRole('owner')
    } else if (room.moderators.some(mod => mod.id === userProfile.id)) {
      setUserRole('moderator')
    } else if (room.members.some(member => member.id === userProfile.id)) {
      setUserRole('member')
    } else if (room.followers.some(follower => follower.id === userProfile.id)) {
      setUserRole('follower')
    } else {
      setUserRole('none')
    }
  }

  const canJoinRoom = (room: VibeRoom): { canJoin: boolean; reason?: string } => {
    if (room.owner.id === userProfile.id) {
      return { canJoin: true }
    }

    if (room.requirements.minLevel > userProfile.level) {
      return { canJoin: false, reason: `Requires level ${room.requirements.minLevel}` }
    }

    if (room.requirements.minReputation > userProfile.reputation) {
      return { canJoin: false, reason: `Requires ${room.requirements.minReputation} reputation` }
    }

    const daysSinceJoin = Math.floor((Date.now() - userProfile.joinDate.getTime()) / (1000 * 60 * 60 * 24))
    if (room.requirements.minJoinTime > daysSinceJoin) {
      return { canJoin: false, reason: `Requires ${room.requirements.minJoinTime} days membership` }
    }

    const hasRequiredTags = room.requirements.requiredTags.some(tag => userProfile.tags.includes(tag))
    if (!hasRequiredTags) {
      return { canJoin: false, reason: `Requires tags: ${room.requirements.requiredTags.join(', ')}` }
    }

    if (room.currentMembers >= room.maxMembers) {
      return { canJoin: false, reason: 'Room is full' }
    }

    return { canJoin: true }
  }

  const handleJoinRoom = (room: VibeRoom) => {
    const joinCheck = canJoinRoom(room)
    
    if (!joinCheck.canJoin) {
      toast.error(`Cannot join: ${joinCheck.reason}`)
      return
    }

    if (room.requirements.approvalRequired) {
      setSelectedRoom(room)
      setShowJoinRequest(true)
      return
    }

    if (room.requirements.inviteOnly) {
      toast.error('This room is invite-only')
      return
    }

    // Join room
    setSelectedRoom(room)
    toast.success(`Joined ${room.name}!`)
  }

  const submitJoinRequest = () => {
    if (!joinRequestReason.trim()) {
      toast.error('Please provide a reason for joining')
      return
    }

    toast.success('Join request submitted! Room owner will review.')
    setShowJoinRequest(false)
    setJoinRequestReason('')
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedRoom) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: userProfile.id,
      userName: userProfile.name,
      userAvatar: userProfile.avatar,
      content: inputMessage,
      timestamp: new Date(),
      type: 'text',
      reactions: {}
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    
    // Auto-scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleReaction = (messageId: string, reaction: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.reactions }
        if (!reactions[reaction]) {
          reactions[reaction] = []
        }
        
        if (reactions[reaction].includes(userProfile.id)) {
          reactions[reaction] = reactions[reaction].filter(id => id !== userProfile.id)
        } else {
          reactions[reaction] = [...reactions[reaction], userProfile.id]
        }
        
        return { ...msg, reactions }
      }
      return msg
    }))
  }

  const getPermissionLevel = (role: string) => {
    switch (role) {
      case 'owner': return 4
      case 'moderator': return 3
      case 'member': return 2
      case 'follower': return 1
      default: return 0
    }
  }

  const canModerate = () => {
    return getPermissionLevel(userRole) >= 2
  }

  const canInvite = () => {
    return getPermissionLevel(userRole) >= 2
  }

  const canKick = () => {
    return getPermissionLevel(userRole) >= 3
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-6xl h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-wellness-50 dark:from-primary-900/20 dark:to-wellness-900/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-wellness-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Vibe Rooms</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Connect with like-minded people</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCreateRoom(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-wellness-500 text-white rounded-lg hover:from-primary-600 hover:to-wellness-600 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Room</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Room List */}
          {!selectedRoom && (
            <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              {/* Navigation Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {['browse', 'my-rooms', 'create'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>

              {/* Room List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockRooms.map((room) => {
                  const joinCheck = canJoinRoom(room)
                  const theme = emotionThemes.find(t => t.name === room.emotion)
                  
                  return (
                    <motion.div
                      key={room.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        joinCheck.canJoin
                          ? 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-gray-800'
                          : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 opacity-60'
                      }`}
                      onClick={() => handleJoinRoom(room)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{theme?.icon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{room.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{room.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {room.isPrivate && <Lock className="w-4 h-4 text-gray-500" />}
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {room.currentMembers}/{room.maxMembers}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${theme?.color}`}>
                            {room.emotion}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">{room.level}</span>
                          </div>
                        </div>
                        
                        {!joinCheck.canJoin && (
                          <div className="text-xs text-red-600 dark:text-red-400">
                            {joinCheck.reason}
                          </div>
                        )}
                      </div>

                      {room.requirements.approvalRequired && (
                        <div className="mt-2 flex items-center space-x-1">
                          <Shield className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-blue-600 dark:text-blue-400">Approval Required</span>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Main Chat Area */}
          {selectedRoom && (
            <div className="flex-1 flex flex-col">
              {/* Room Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedRoom(null)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">
                      {emotionThemes.find(t => t.name === selectedRoom.emotion)?.icon}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{selectedRoom.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedRoom.currentMembers} members • {selectedRoom.isPrivate ? 'Private' : 'Public'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {userRole !== 'none' && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-primary-100 dark:bg-primary-900/20 rounded-full">
                      <Crown className="w-3 h-3 text-primary-600 dark:text-primary-400" />
                      <span className="text-xs font-medium text-primary-600 dark:text-primary-400 capitalize">
                        {userRole}
                      </span>
                    </div>
                  )}
                  
                  <button
                    onClick={() => setShowRoomDetails(true)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.userId === userProfile.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${message.userId === userProfile.id ? 'order-2' : 'order-1'}`}>
                      <div className={`p-3 rounded-2xl ${
                        message.userId === userProfile.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}>
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-6 h-6 bg-gradient-to-br from-primary-400 to-wellness-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                            {message.userAvatar}
                          </div>
                          <span className="text-sm font-medium">{message.userName}</span>
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      
                      {/* Reactions */}
                      {Object.keys(message.reactions).length > 0 && (
                        <div className="flex items-center space-x-1 mt-2">
                          {Object.entries(message.reactions).map(([reaction, users]) => (
                            <button
                              key={reaction}
                              onClick={() => handleReaction(message.id, reaction)}
                              className={`px-2 py-1 rounded-full text-xs transition-colors ${
                                users.includes(userProfile.id)
                                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                              }`}
                            >
                              {reaction} {users.length}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Mic className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                  
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Join Request System */}
        <AnimatePresence>
          {showJoinRequest && selectedRoom && (
            <JoinRequestSystem
              room={selectedRoom}
              currentUser={currentUser}
              onClose={() => setShowJoinRequest(false)}
              onJoinSuccess={() => {
                setShowJoinRequest(false)
                setSelectedRoom(null)
                toast.success(`Welcome to ${selectedRoom.name}!`)
              }}
            />
          )}
        </AnimatePresence>

        {/* Enhanced Room Creation */}
        <AnimatePresence>
          {showCreateRoom && (
            <EnhancedRoomCreation
              onClose={() => setShowCreateRoom(false)}
              onRoomCreated={(newRoom) => {
                setShowCreateRoom(false)
                toast.success(`Room "${newRoom.name}" created successfully!`)
              }}
              currentUser={currentUser}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
} 