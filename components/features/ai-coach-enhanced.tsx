'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Send, Mic, MicOff, Sparkles, Heart, Brain, 
  MessageCircle, Video, Phone, BookOpen, Music, 
  Coffee, TreePine, Sun, Moon, Zap, Shield
} from 'lucide-react'
import toast from 'react-hot-toast'

interface AICoachProps {
  onClose: () => void
  currentUser?: any
  currentMood?: any
  onMoodUpdate?: (mood: any) => void
}

interface Message {
  id: string
  type: 'user' | 'ai' | 'system'
  content: string
  timestamp: Date
  emotion?: string
  intensity?: number
}

interface CoachingSession {
  id: string
  startTime: Date
  mood: string
  intensity: number
  goals: string[]
  techniques: string[]
  progress: number
}

export function AICoachEnhanced({ onClose, currentUser, currentMood, onMoodUpdate }: AICoachProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [session, setSession] = useState<CoachingSession | null>(null)
  const [activeTechnique, setActiveTechnique] = useState<string | null>(null)
  const [userMood, setUserMood] = useState(currentMood || { name: 'neutral', intensity: 5 })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const coachingTechniques = [
    {
      id: 'breathing',
      name: 'Breathing Exercise',
      icon: TreePine,
      description: '4-7-8 breathing technique for immediate calm',
      duration: '5 minutes',
      color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
    },
    {
      id: 'meditation',
      name: 'Quick Meditation',
      icon: Brain,
      description: 'Guided mindfulness session',
      duration: '10 minutes',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
    },
    {
      id: 'journaling',
      name: 'Reflection Writing',
      icon: BookOpen,
      description: 'Express your thoughts freely',
      duration: '15 minutes',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
    },
    {
      id: 'movement',
      name: 'Gentle Movement',
      icon: Zap,
      description: 'Light stretching and movement',
      duration: '8 minutes',
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
    },
    {
      id: 'music',
      name: 'Calming Music',
      icon: Music,
      description: 'Soothing sounds and melodies',
      duration: '12 minutes',
      color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400'
    },
    {
      id: 'nature',
      name: 'Nature Connection',
      icon: Sun,
      description: 'Visual and audio nature therapy',
      duration: '7 minutes',
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
    }
  ]

  const emergencyContacts = [
    { name: 'Crisis Helpline', number: '988', type: 'crisis' },
    { name: 'Suicide Prevention', number: '1-800-273-8255', type: 'emergency' },
    { name: 'Mental Health Support', number: '1-800-950-NAMI', type: 'support' }
  ]

  useEffect(() => {
    // Initialize coaching session
    const newSession: CoachingSession = {
      id: Date.now().toString(),
      startTime: new Date(),
      mood: userMood.name,
      intensity: userMood.intensity,
      goals: ['Reduce stress', 'Improve mood', 'Build resilience'],
      techniques: [],
      progress: 0
    }
    setSession(newSession)

    // Welcome message
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'ai',
      content: `Hello ${currentUser?.name || 'there'}! I'm your AI emotional wellness coach. I'm here to support you through whatever you're experiencing. How are you feeling right now?`,
      timestamp: new Date()
    }
    setMessages([welcomeMessage])

    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const simulateAIResponse = async (userInput: string, userEmotion?: string) => {
    setIsTyping(true)
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

    let response = ''
    const intensity = userMood.intensity

    if (userEmotion === 'anger' && intensity > 7) {
      response = "I can sense you're feeling quite intense right now. Let's take a moment to ground ourselves. Would you like to try a quick breathing exercise or would you prefer to talk about what's happening?"
    } else if (userEmotion === 'sadness' && intensity > 6) {
      response = "It sounds like you're going through a difficult time. Your feelings are valid, and it's okay to not be okay. Would you like to explore some gentle self-care techniques together?"
    } else if (userEmotion === 'anxiety' && intensity > 6) {
      response = "I understand anxiety can feel overwhelming. Let's work on some calming strategies. We can start with a simple grounding exercise or I can guide you through a quick meditation."
    } else if (userInput.toLowerCase().includes('help') || userInput.toLowerCase().includes('emergency')) {
      response = "I'm here for you. If you're in crisis, please know that help is available 24/7. Would you like me to connect you with crisis resources, or would you prefer to talk through what's happening?"
    } else {
      const responses = [
        "Thank you for sharing that with me. How can I best support you right now?",
        "I hear you. Let's work together to find what helps you feel better.",
        "That sounds challenging. Would you like to explore some coping strategies?",
        "I'm here to listen and support you. What would be most helpful for you right now?",
        "Thank you for being open with me. Let's find a way forward together."
      ]
      response = responses[Math.floor(Math.random() * responses.length)]
    }

    const aiMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      emotion: userEmotion
    }

    setMessages(prev => [...prev, aiMessage])
    setIsTyping(false)
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Simulate AI response
    await simulateAIResponse(inputMessage, userMood.name)
  }

  const handleVoiceInput = () => {
    if (!isRecording) {
      setIsRecording(true)
      toast.success('Voice recording started...')
      
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false)
        const voiceMessage = "I'm feeling a bit overwhelmed today and could use some support."
        setInputMessage(voiceMessage)
        toast.success('Voice message captured!')
      }, 3000)
    } else {
      setIsRecording(false)
      toast.info('Voice recording stopped')
    }
  }

  const startTechnique = (techniqueId: string) => {
    setActiveTechnique(techniqueId)
    const technique = coachingTechniques.find(t => t.id === techniqueId)
    
    const techniqueMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: `Let's start the ${technique?.name}. I'll guide you through this ${technique?.duration} session. Are you ready to begin?`,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, techniqueMessage])
    toast.success(`Starting ${technique?.name}`)
  }

  const handleEmergencyCall = (contact: any) => {
    if (contact.type === 'crisis') {
      window.open(`tel:${contact.number}`, '_blank')
    } else {
      // Simulate call
      toast.success(`Connecting to ${contact.name}...`)
    }
  }

  const updateMood = (newMood: any) => {
    setUserMood(newMood)
    if (onMoodUpdate) {
      onMoodUpdate(newMood)
    }
    
    const moodMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content: `Mood updated to: ${newMood.name} (intensity: ${newMood.intensity}/10)`,
      timestamp: new Date(),
      emotion: newMood.name,
      intensity: newMood.intensity
    }
    
    setMessages(prev => [...prev, moodMessage])
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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Wellness Coach</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your personal emotional support companion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-primary-600 text-white'
                        : message.type === 'system'
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleVoiceInput}
                  className={`p-3 rounded-full transition-colors ${
                    isRecording
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
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
                  className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Techniques & Tools */}
          <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Current Mood */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Current Mood</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Feeling:</span>
                    <span className="font-medium text-gray-900 dark:text-white capitalize">{userMood.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Intensity:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-red-500 rounded-full"
                          style={{ width: `${(userMood.intensity / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{userMood.intensity}/10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Techniques */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Techniques</h3>
                <div className="space-y-2">
                  {coachingTechniques.map((technique) => {
                    const Icon = technique.icon
                    return (
                      <button
                        key={technique.id}
                        onClick={() => startTechnique(technique.id)}
                        className={`w-full p-3 rounded-lg text-left transition-all duration-200 hover:scale-105 ${technique.color}`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5" />
                          <div className="flex-1">
                            <p className="font-medium">{technique.name}</p>
                            <p className="text-xs opacity-80">{technique.duration}</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3">Emergency Support</h3>
                <div className="space-y-2">
                  {emergencyContacts.map((contact) => (
                    <button
                      key={contact.number}
                      onClick={() => handleEmergencyCall(contact)}
                      className="w-full p-2 text-left text-sm text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span>{contact.name}</span>
                        <Phone className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Progress */}
              {session && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Session Progress</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Duration:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {Math.floor((Date.now() - session.startTime.getTime()) / 60000)}m
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Techniques Used:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {session.techniques.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-400 to-wellness-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${session.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 