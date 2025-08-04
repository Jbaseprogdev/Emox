'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Save, Users, Lock, Unlock, Shield, Star, 
  Settings, UserPlus, Crown, Zap, Sparkles, 
  CheckCircle, XCircle, Clock, Award, Target
} from 'lucide-react'
import toast from 'react-hot-toast'

interface RoomCreationProps {
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
}

export function RoomCreationModal({ onClose, onRoomCreated, currentUser }: RoomCreationProps) {
  const [step, setStep] = useState(1)
  const [roomData, setRoomData] = useState({
    name: '',
    description: '',
    emotion: 'Joy',
    isPrivate: false,
    maxMembers: 50,
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced' | 'expert',
    tags: [] as string[]
  })
  
  const [requirements, setRequirements] = useState<RoomRequirements>({
    minLevel: 1,
    minReputation: 10,
    minJoinTime: 1,
    requiredTags: [],
    approvalRequired: false,
    inviteOnly: false,
    maxDailyMessages: 50,
    cooldownPeriod: 1
  })

  const [rules, setRules] = useState<string[]>(['Be respectful and supportive'])

  const emotionThemes = [
    { name: 'Joy', color: 'bg-yellow-100 text-yellow-800', icon: '😊' },
    { name: 'Calm', color: 'bg-blue-100 text-blue-800', icon: '😌' },
    { name: 'Excitement', color: 'bg-orange-100 text-orange-800', icon: '🤩' },
    { name: 'Support', color: 'bg-green-100 text-green-800', icon: '🤗' },
    { name: 'Reflection', color: 'bg-purple-100 text-purple-800', icon: '🤔' },
    { name: 'Motivation', color: 'bg-red-100 text-red-800', icon: '💪' }
  ]

  const availableTags = [
    'positive', 'motivation', 'support', 'philosophy', 'reflection', 
    'intellectual', 'creative', 'wellness', 'mindfulness', 'growth'
  ]

  const levelOptions = [
    { value: 'beginner', label: 'Beginner', description: 'Open to everyone', icon: '🌱' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience required', icon: '🌿' },
    { value: 'advanced', label: 'Advanced', description: 'Deep knowledge needed', icon: '🌳' },
    { value: 'expert', label: 'Expert', description: 'Master level discussions', icon: '🏆' }
  ]

  const handleNext = () => {
    if (step === 1 && (!roomData.name || !roomData.description)) {
      toast.error('Please fill in all required fields')
      return
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
      rules,
      owner: {
        id: currentUser?.id || 'demo-user',
        name: currentUser?.name || 'Demo User',
        avatar: currentUser?.name?.charAt(0) || 'D',
        role: 'owner',
        joinedAt: new Date(),
        lastActive: new Date(),
        isOnline: true,
        reputation: 50,
        permissions: ['manage_room', 'moderate', 'invite', 'kick']
      },
      moderators: [],
      members: [],
      followers: [],
      currentMembers: 1,
      createdAt: new Date(),
      lastActivity: new Date(),
      isActive: true
    }

    onRoomCreated(newRoom)
    toast.success(`Room "${roomData.name}" created successfully!`)
    onClose()
  }

  const addRule = () => {
    setRules([...rules, ''])
  }

  const updateRule = (index: number, value: string) => {
    const newRules = [...rules]
    newRules[index] = value
    setRules(newRules)
  }

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index))
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
        className="w-full max-w-4xl h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-wellness-50 dark:from-primary-900/20 dark:to-wellness-900/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-wellness-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Vibe Room</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step {step} of 3</p>
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
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h3>
                
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
                      Emotional Theme
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {emotionThemes.map((theme) => (
                        <button
                          key={theme.name}
                          onClick={() => setRoomData({ ...roomData, emotion: theme.name })}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                            roomData.emotion === theme.name
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{theme.icon}</span>
                            <span className="font-medium text-gray-900 dark:text-white">{theme.name}</span>
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
                            {option.icon} {option.label} - {option.description}
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Requirements & Permissions</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Member Requirements</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Minimum Level
                      </label>
                      <input
                        type="number"
                        value={requirements.minLevel}
                        onChange={(e) => setRequirements({ ...requirements, minLevel: parseInt(e.target.value) })}
                        min="1"
                        max="10"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Minimum Reputation
                      </label>
                      <input
                        type="number"
                        value={requirements.minReputation}
                        onChange={(e) => setRequirements({ ...requirements, minReputation: parseInt(e.target.value) })}
                        min="0"
                        max="100"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Minimum Join Time (days)
                      </label>
                      <input
                        type="number"
                        value={requirements.minJoinTime}
                        onChange={(e) => setRequirements({ ...requirements, minJoinTime: parseInt(e.target.value) })}
                        min="0"
                        max="365"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
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
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Required Tags
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => toggleRequiredTag(tag)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              requirements.requiredTags.includes(tag)
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Room Rules</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 dark:text-white">Community Guidelines</h4>
                    <button
                      onClick={addRule}
                      className="flex items-center space-x-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/40 transition-colors"
                    >
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-medium">Add Rule</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {rules.map((rule, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={rule}
                          onChange={(e) => updateRule(index, e.target.value)}
                          placeholder="Enter a rule..."
                          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                        <button
                          onClick={() => removeRule(index)}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h5 className="font-medium text-blue-900 dark:text-blue-100">Room Preview</h5>
                    </div>
                    <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                      <p><strong>Name:</strong> {roomData.name || 'Untitled Room'}</p>
                      <p><strong>Theme:</strong> {roomData.emotion}</p>
                      <p><strong>Level:</strong> {roomData.level}</p>
                      <p><strong>Privacy:</strong> {roomData.isPrivate ? 'Private' : 'Public'}</p>
                      <p><strong>Requirements:</strong> Level {requirements.minLevel}, {requirements.minReputation} reputation</p>
                    </div>
                  </div>
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
            {step < 3 ? (
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
                <Sparkles className="w-4 h-4" />
                <span>Create Room</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 