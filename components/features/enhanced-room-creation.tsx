'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Save, Users, Lock, Unlock, Shield, Star, 
  Settings, UserPlus, Crown, Zap, Sparkles, 
  CheckCircle, XCircle, Clock, Award, Target,
  MessageCircle, Heart, Brain, AlertTriangle,
  UserCheck, Users2, Flag, Ban, Mic, MicOff
} from 'lucide-react'
import toast from 'react-hot-toast'

interface EnhancedRoomCreationProps {
  onClose: () => void
  onRoomCreated: (room: any) => void
  currentUser?: any
}

interface RoomRequirements {
  minLevel: number
  minReputation: number
  minJoinTime: number
  requiredTags: string[]
  approvalRequired: boolean
  inviteOnly: boolean
  maxDailyMessages: number
  cooldownPeriod: number
  minFollowers: number
  verifiedAccountRequired: boolean
  followCreatorRequired: boolean
}

interface Moderator {
  id: string
  name: string
  avatar: string
  permissions: string[]
}

export function EnhancedRoomCreation({ onClose, onRoomCreated, currentUser }: EnhancedRoomCreationProps) {
  const [step, setStep] = useState(1)
  const [roomData, setRoomData] = useState({
    name: '',
    description: '',
    emotion: 'Joy',
    isPrivate: false,
    maxMembers: 50,
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced' | 'expert',
    tags: [] as string[],
    purpose: '',
    guidelines: [] as string[]
  })
  
  const [requirements, setRequirements] = useState<RoomRequirements>({
    minLevel: 1,
    minReputation: 10,
    minJoinTime: 1,
    requiredTags: [],
    approvalRequired: false,
    inviteOnly: false,
    maxDailyMessages: 50,
    cooldownPeriod: 1,
    minFollowers: 3,
    verifiedAccountRequired: true,
    followCreatorRequired: true
  })

  const [moderators, setModerators] = useState<Moderator[]>([])
  const [aiModeration, setAiModeration] = useState(true)
  const [autoModeration, setAutoModeration] = useState({
    flagOffensive: true,
    detectEmotions: true,
    suggestCalming: true,
    alertMods: true
  })

  const [userProfile, setUserProfile] = useState({
    followers: 5,
    level: 3,
    reputation: 45,
    verified: true,
    violations: 0
  })

  const emotionThemes = [
    { name: 'Joy', color: 'bg-yellow-100 text-yellow-800', icon: '😊', description: 'Positive and uplifting conversations' },
    { name: 'Calm', color: 'bg-blue-100 text-blue-800', icon: '😌', description: 'Peaceful and mindful discussions' },
    { name: 'Excitement', color: 'bg-orange-100 text-orange-800', icon: '🤩', description: 'Energetic and enthusiastic vibes' },
    { name: 'Support', color: 'bg-green-100 text-green-800', icon: '🤗', description: 'Supportive and caring community' },
    { name: 'Reflection', color: 'bg-purple-100 text-purple-800', icon: '🤔', description: 'Deep thinking and philosophy' },
    { name: 'Motivation', color: 'bg-red-100 text-red-800', icon: '💪', description: 'Inspiring and empowering talks' }
  ]

  const availableTags = [
    'support', 'learning', 'fun', 'philosophy', 'wellness', 
    'creativity', 'technology', 'health', 'mindfulness', 'growth'
  ]

  const levelOptions = [
    { value: 'beginner', label: 'Beginner', description: 'Open to everyone', icon: '🌱', requirements: 'No special requirements' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience required', icon: '🌿', requirements: 'Level 2+, 20 reputation' },
    { value: 'advanced', label: 'Advanced', description: 'Deep knowledge needed', icon: '🌳', requirements: 'Level 5+, 50 reputation' },
    { value: 'expert', label: 'Expert', description: 'Master level discussions', icon: '🏆', requirements: 'Level 8+, 80 reputation' }
  ]

  const defaultGuidelines = [
    'Be respectful and supportive to all members',
    'No hate speech, discrimination, or harassment',
    'Keep discussions relevant to the room topic',
    'Use appropriate language and tone',
    'Report violations to moderators',
    'Respect privacy and confidentiality'
  ]

  const checkCreatorRequirements = () => {
    return {
      followers: userProfile.followers >= requirements.minFollowers,
      verified: userProfile.verified,
      noViolations: userProfile.violations === 0,
      level: userProfile.level >= requirements.minLevel,
      reputation: userProfile.reputation >= requirements.minReputation
    }
  }

  const handleNext = () => {
    if (step === 1 && (!roomData.name || !roomData.description || !roomData.purpose)) {
      toast.error('Please fill in all required fields')
      return
    }
    if (step === 2) {
      const creatorChecks = checkCreatorRequirements()
      if (!Object.values(creatorChecks).every(Boolean)) {
        toast.error('You do not meet all requirements to create this room')
        return
      }
    }
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleCreateRoom = () => {
    const newRoom = {
      id: Date.now().toString(),
      ...roomData,
      requirements,
      moderators,
      aiModeration,
      autoModeration,
      owner: {
        id: currentUser?.id || 'demo-user',
        name: currentUser?.name || 'Demo User',
        avatar: currentUser?.name?.charAt(0) || 'D',
        role: 'owner',
        joinedAt: new Date(),
        lastActive: new Date(),
        isOnline: true,
        reputation: userProfile.reputation,
        permissions: ['manage_room', 'moderate', 'invite', 'kick', 'ban', 'assign_moderators']
      },
      currentMembers: 1,
      createdAt: new Date(),
      lastActivity: new Date(),
      isActive: true,
      aiAssistant: {
        enabled: true,
        greeting: `Welcome to ${roomData.name}! I'm here to help keep our community respectful and supportive.`,
        features: autoModeration
      }
    }

    onRoomCreated(newRoom)
    toast.success(`Room "${roomData.name}" created successfully!`)
    onClose()
  }

  const addGuideline = () => {
    setRoomData({ ...roomData, guidelines: [...roomData.guidelines, ''] })
  }

  const updateGuideline = (index: number, value: string) => {
    const newGuidelines = [...roomData.guidelines]
    newGuidelines[index] = value
    setRoomData({ ...roomData, guidelines: newGuidelines })
  }

  const removeGuideline = (index: number) => {
    setRoomData({ ...roomData, guidelines: roomData.guidelines.filter((_, i) => i !== index) })
  }

  const toggleTag = (tag: string) => {
    if (roomData.tags.includes(tag)) {
      setRoomData({ ...roomData, tags: roomData.tags.filter(t => t !== tag) })
    } else {
      setRoomData({ ...roomData, tags: [...roomData.tags, tag] })
    }
  }

  const toggleRequiredTag = (tag: string) => {
    if (requirements.requiredTags.includes(tag)) {
      setRequirements({ ...requirements, requiredTags: requirements.requiredTags.filter(t => t !== tag) })
    } else {
      setRequirements({ ...requirements, requiredTags: [...requirements.requiredTags, tag] })
    }
  }

  const addModerator = () => {
    const newModerator: Moderator = {
      id: `mod-${Date.now()}`,
      name: 'New Moderator',
      avatar: 'M',
      permissions: ['moderate', 'kick']
    }
    setModerators([...moderators, newModerator])
  }

  const removeModerator = (index: number) => {
    setModerators(moderators.filter((_, i) => i !== index))
  }

  const creatorChecks = checkCreatorRequirements()

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
        className="w-full max-w-5xl h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-wellness-50 dark:from-primary-900/20 dark:to-wellness-900/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-wellness-500 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Respectful VibeRoom</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step {step} of 4</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNumber ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Room Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Room Name *
                    </label>
                    <input
                      type="text"
                      value={roomData.name}
                      onChange={(e) => setRoomData({ ...roomData, name: e.target.value })}
                      placeholder="Enter room name..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={roomData.description}
                      onChange={(e) => setRoomData({ ...roomData, description: e.target.value })}
                      placeholder="Describe what this room is about..."
                      rows={3}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Room Purpose *
                    </label>
                    <textarea
                      value={roomData.purpose}
                      onChange={(e) => setRoomData({ ...roomData, purpose: e.target.value })}
                      placeholder="Why do you want to create this room? What will it accomplish?"
                      rows={3}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Emotional Theme
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {emotionThemes.map((theme) => (
                        <button
                          key={theme.name}
                          onClick={() => setRoomData({ ...roomData, emotion: theme.name })}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            roomData.emotion === theme.name
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-3xl mb-2">{theme.icon}</div>
                            <div className="font-medium text-gray-900 dark:text-white">{theme.name}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{theme.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Max Members
                      </label>
                      <input
                        type="number"
                        value={roomData.maxMembers}
                        onChange={(e) => setRoomData({ ...roomData, maxMembers: parseInt(e.target.value) })}
                        min="5"
                        max="200"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Room Level
                      </label>
                      <select
                        value={roomData.level}
                        onChange={(e) => setRoomData({ ...roomData, level: e.target.value as any })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        {levelOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.icon} {option.label} - {option.requirements}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Room Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            roomData.tags.includes(tag)
                              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Creator Requirements Check</h3>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Your Profile Status</h4>
                  </div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Let's verify you meet the requirements to create this room.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Requirements Check</h4>
                    
                    <div className={`p-4 rounded-lg border-2 ${
                      creatorChecks.followers
                        ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                        : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Users2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Minimum Followers</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              You have {userProfile.followers} followers (need {requirements.minFollowers})
                            </p>
                          </div>
                        </div>
                        {creatorChecks.followers ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${
                      creatorChecks.verified
                        ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                        : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <UserCheck className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Verified Account</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {creatorChecks.verified ? 'Account verified' : 'Verification required'}
                            </p>
                          </div>
                        </div>
                        {creatorChecks.verified ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${
                      creatorChecks.noViolations
                        ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                        : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Account Status</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {creatorChecks.noViolations ? 'No violations' : `${userProfile.violations} violations found`}
                            </p>
                          </div>
                        </div>
                        {creatorChecks.noViolations ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Room Settings</h4>
                    
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={roomData.isPrivate}
                          onChange={(e) => setRoomData({ ...roomData, isPrivate: e.target.checked })}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Private Room</span>
                        <Lock className="w-4 h-4 text-gray-500" />
                      </label>

                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={requirements.approvalRequired}
                          onChange={(e) => setRequirements({ ...requirements, approvalRequired: e.target.checked })}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Require Approval</span>
                        <Shield className="w-4 h-4 text-gray-500" />
                      </label>

                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={requirements.inviteOnly}
                          onChange={(e) => setRequirements({ ...requirements, inviteOnly: e.target.checked })}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Invite Only</span>
                        <UserPlus className="w-4 h-4 text-gray-500" />
                      </label>

                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={aiModeration}
                          onChange={(e) => setAiModeration(e.target.checked)}
                          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Enable AI Moderation</span>
                        <Brain className="w-4 h-4 text-gray-500" />
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Moderation & Guidelines</h3>
                
                <div className="space-y-6">
                  {/* AI Moderation Settings */}
                  {aiModeration && (
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <h4 className="font-medium text-purple-900 dark:text-purple-100">AI Moderation Features</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={autoModeration.flagOffensive}
                            onChange={(e) => setAutoModeration({ ...autoModeration, flagOffensive: e.target.checked })}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Flag offensive language</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={autoModeration.detectEmotions}
                            onChange={(e) => setAutoModeration({ ...autoModeration, detectEmotions: e.target.checked })}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Detect high emotions</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={autoModeration.suggestCalming}
                            onChange={(e) => setAutoModeration({ ...autoModeration, suggestCalming: e.target.checked })}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Suggest calming tips</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={autoModeration.alertMods}
                            onChange={(e) => setAutoModeration({ ...autoModeration, alertMods: e.target.checked })}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Alert moderators</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Moderators */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">Assign Moderators</h4>
                      <button
                        onClick={addModerator}
                        disabled={moderators.length >= 3}
                        className="flex items-center space-x-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span className="text-sm font-medium">Add Moderator</span>
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {moderators.map((moderator, index) => (
                        <div key={moderator.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-wellness-500 rounded-full flex items-center justify-center text-white font-medium">
                            {moderator.avatar}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">{moderator.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Permissions: {moderator.permissions.join(', ')}
                            </p>
                          </div>
                          <button
                            onClick={() => removeModerator(index)}
                            className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      
                      {moderators.length === 0 && (
                        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                          <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No moderators assigned yet</p>
                          <p className="text-sm">You can assign up to 3 moderators</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Community Guidelines */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">Community Guidelines</h4>
                      <button
                        onClick={addGuideline}
                        className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors"
                      >
                        <Zap className="w-4 h-4" />
                        <span className="text-sm font-medium">Add Guideline</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {roomData.guidelines.length > 0 ? (
                        roomData.guidelines.map((guideline, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <input
                              type="text"
                              value={guideline}
                              onChange={(e) => updateGuideline(index, e.target.value)}
                              placeholder="Enter a guideline..."
                              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                            <button
                              onClick={() => removeGuideline(index)}
                              className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                          <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No guidelines set yet</p>
                          <p className="text-sm">Add guidelines to help maintain a respectful community</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Room Preview & Confirmation</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Room Preview */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Room Preview</h4>
                    
                    <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">
                          {emotionThemes.find(t => t.name === roomData.emotion)?.icon}
                        </span>
                        <div>
                          <h5 className="font-semibold text-gray-900 dark:text-white">{roomData.name}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{roomData.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <p><strong>Purpose:</strong> {roomData.purpose}</p>
                        <p><strong>Level:</strong> {roomData.level}</p>
                        <p><strong>Privacy:</strong> {roomData.isPrivate ? 'Private' : 'Public'}</p>
                        <p><strong>Max Members:</strong> {roomData.maxMembers}</p>
                        <p><strong>AI Moderation:</strong> {aiModeration ? 'Enabled' : 'Disabled'}</p>
                        <p><strong>Moderators:</strong> {moderators.length}/3</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {roomData.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Requirements Summary */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Join Requirements</h4>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Member Requirements</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Level {requirements.minLevel}+, {requirements.minReputation} reputation, {requirements.minJoinTime} days membership
                        </p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Access Control</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {requirements.approvalRequired ? 'Approval required' : 'Direct join'} • 
                          {requirements.inviteOnly ? ' Invite only' : ' Open to all'}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Moderation</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {aiModeration ? 'AI + ' : ''}{moderators.length} moderator{moderators.length !== 1 ? 's' : ''} • 
                          {roomData.guidelines.length} guideline{roomData.guidelines.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h5 className="font-medium text-green-900 dark:text-green-100">Ready to Create!</h5>
                  </div>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Your room meets all requirements and is ready to be created. You'll have full control as the room owner.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>

          <div className="flex items-center space-x-3">
            {step < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleCreateRoom}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary-500 to-wellness-500 text-white rounded-lg hover:from-primary-600 hover:to-wellness-600 transition-all duration-200"
              >
                <Crown className="w-4 h-4" />
                <span>Create Room</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 