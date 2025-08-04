'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Heart, MessageCircle, User, Shield, Phone, Video, X, CheckCircle, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

interface ThresholdWarning {
  id: string
  emotion: string
  intensity: number
  triggered_at: string
  status: 'active' | 'resolved' | 'escalated'
  support_type: 'ai' | 'mentor' | 'emergency'
}

interface EmotionThresholdProps {
  emotion: string
  intensity: number
  onClose: () => void
  onResolve: () => void
}

const supportOptions = [
  {
    id: 'ai-coach',
    title: 'AI Wellness Coach',
    description: 'Get immediate AI-powered emotional support and guidance',
    icon: MessageCircle,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    responseTime: 'Instant',
    cost: 'Free'
  },
  {
    id: 'mentor',
    title: 'Human Mentor',
    description: 'Connect with a trained emotional wellness mentor',
    icon: User,
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    responseTime: '5-10 min',
    cost: 'Premium'
  },
  {
    id: 'emergency',
    title: 'Emergency Support',
    description: 'Immediate connection to crisis support services',
    icon: Phone,
    color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
    responseTime: 'Immediate',
    cost: 'Free'
  }
]

const aiCoachResponses = [
  "I understand you're feeling intense emotions right now. Let's take a moment to breathe together. Can you tell me what's happening?",
  "Your feelings are valid and temporary. Let's work through this together. What triggered these emotions?",
  "I'm here to support you. Let's practice some grounding techniques. Can you name 5 things you can see right now?",
  "It's okay to feel overwhelmed. Let's break this down into smaller, manageable steps. What's the most pressing concern?",
  "You're not alone in this. Let's explore some coping strategies that might help you right now."
]

const mentorProfiles = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'Anxiety & Stress Management',
    experience: '8 years',
    rating: 4.9,
    available: true,
    avatar: 'SC'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    specialty: 'Emotional Regulation',
    experience: '6 years',
    rating: 4.8,
    available: true,
    avatar: 'MR'
  },
  {
    id: '3',
    name: 'Dr. Emily Watson',
    specialty: 'Crisis Intervention',
    experience: '12 years',
    rating: 4.9,
    available: false,
    avatar: 'EW'
  }
]

export function EmotionThreshold({ emotion, intensity, onClose, onResolve }: EmotionThresholdProps) {
  const [selectedSupport, setSelectedSupport] = useState<string | null>(null)
  const [aiChat, setAiChat] = useState<string[]>([])
  const [aiInput, setAiInput] = useState('')
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [warning, setWarning] = useState<ThresholdWarning>({
    id: Date.now().toString(),
    emotion,
    intensity,
    triggered_at: new Date().toISOString(),
    status: 'active',
    support_type: 'ai'
  })

  const isHighRisk = intensity >= 8
  const isModerateRisk = intensity >= 6 && intensity < 8

  useEffect(() => {
    // Auto-start AI coach for high-risk emotions
    if (isHighRisk) {
      setSelectedSupport('ai-coach')
      const initialMessage = aiCoachResponses[Math.floor(Math.random() * aiCoachResponses.length)]
      setAiChat([initialMessage])
    }
  }, [isHighRisk])

  const handleSupportSelect = (supportId: string) => {
    setSelectedSupport(supportId)
    
    if (supportId === 'ai-coach') {
      const initialMessage = aiCoachResponses[Math.floor(Math.random() * aiCoachResponses.length)]
      setAiChat([initialMessage])
    }
  }

  const handleAiMessage = () => {
    if (!aiInput.trim()) return

    // Add user message
    setAiChat(prev => [...prev, `You: ${aiInput}`])
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I hear you. That sounds really challenging. Can you tell me more about what's happening?",
        "Thank you for sharing that with me. How are you feeling right now?",
        "I understand this is difficult. Let's work through this together. What would be most helpful right now?",
        "Your feelings are completely valid. Let's explore some coping strategies that might help.",
        "I'm here to support you through this. What's one small thing that might help you feel better?"
      ]
      const response = responses[Math.floor(Math.random() * responses.length)]
      setAiChat(prev => [...prev, `AI Coach: ${response}`])
    }, 1000)

    setAiInput('')
  }

  const handleMentorConnect = async (mentorId: string) => {
    setSelectedMentor(mentorId)
    setIsConnecting(true)
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsConnecting(false)
    toast.success('Connected to mentor! Starting video call...')
    
    // Update warning status
    setWarning(prev => ({ ...prev, status: 'resolved', support_type: 'mentor' }))
  }

  const handleEmergencyCall = () => {
    toast.success('Connecting to emergency support services...')
    setWarning(prev => ({ ...prev, status: 'escalated', support_type: 'emergency' }))
    
    // Simulate emergency call
    setTimeout(() => {
      toast.success('Emergency services contacted. Help is on the way.')
    }, 2000)
  }

  const handleResolve = () => {
    setWarning(prev => ({ ...prev, status: 'resolved' }))
    onResolve()
    toast.success('Threshold warning resolved. Take care!')
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isHighRisk ? 'bg-red-100 dark:bg-red-900' : 'bg-yellow-100 dark:bg-yellow-900'
            }`}>
              <AlertTriangle className={`w-5 h-5 ${
                isHighRisk ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'
              }`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {isHighRisk ? 'High-Risk Emotion Detected' : 'Emotion Threshold Warning'}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {emotion} detected at intensity {intensity}/10
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Warning Level */}
          <div className={`p-4 rounded-lg border-2 ${
            isHighRisk 
              ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' 
              : 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
          }`}>
            <div className="flex items-center space-x-3">
              <AlertTriangle className={`w-5 h-5 ${
                isHighRisk ? 'text-red-600' : 'text-yellow-600'
              }`} />
              <div>
                <h3 className={`font-semibold ${
                  isHighRisk ? 'text-red-900 dark:text-red-100' : 'text-yellow-900 dark:text-yellow-100'
                }`}>
                  {isHighRisk ? 'High-Risk Alert' : 'Moderate Risk Alert'}
                </h3>
                <p className={`text-sm ${
                  isHighRisk ? 'text-red-700 dark:text-red-200' : 'text-yellow-700 dark:text-yellow-200'
                }`}>
                  {isHighRisk 
                    ? 'Your emotional state requires immediate attention. Please consider seeking support.'
                    : 'Your emotions are elevated. Consider talking to someone or using coping strategies.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Support Options */}
          {!selectedSupport && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Choose Support Option</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {supportOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSupportSelect(option.id)}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Icon className="w-6 h-6 text-purple-600" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">{option.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{option.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{option.responseTime}</span>
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${option.color}`}>
                          {option.cost}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          )}

          {/* AI Coach Chat */}
          {selectedSupport === 'ai-coach' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <span>AI Wellness Coach</span>
                </h3>
                <button
                  onClick={() => setSelectedSupport(null)}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Change Support
                </button>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-64 overflow-y-auto space-y-3">
                {aiChat.map((message, index) => (
                  <div key={index} className={`flex ${message.startsWith('You:') ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.startsWith('You:') 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white'
                    }`}>
                      <p className="text-sm">{message}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAiMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={handleAiMessage}
                  disabled={!aiInput.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Mentor Selection */}
          {selectedSupport === 'mentor' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <User className="w-5 h-5 text-green-600" />
                  <span>Choose a Mentor</span>
                </h3>
                <button
                  onClick={() => setSelectedSupport(null)}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Change Support
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mentorProfiles.map((mentor) => (
                  <motion.button
                    key={mentor.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMentorConnect(mentor.id)}
                    disabled={!mentor.available || isConnecting}
                    className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                      selectedMentor === mentor.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'
                    } ${!mentor.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {mentor.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{mentor.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{mentor.specialty}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-yellow-600">
                          <span>★</span>
                          <span className="text-sm">{mentor.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">{mentor.experience}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        mentor.available 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
                      }`}>
                        {mentor.available ? 'Available' : 'Unavailable'}
                      </span>
                      {isConnecting && selectedMentor === mentor.id && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                          <span className="text-sm">Connecting...</span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Support */}
          {selectedSupport === 'emergency' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-red-600" />
                  <span>Emergency Support</span>
                </h3>
                <button
                  onClick={() => setSelectedSupport(null)}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Change Support
                </button>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-red-900 dark:text-red-100">Crisis Support Available</h4>
                </div>
                <p className="text-sm text-red-700 dark:text-red-200 mb-4">
                  If you're in crisis or having thoughts of self-harm, immediate help is available. 
                  Our crisis support team is trained to provide compassionate assistance.
                </p>
                <button
                  onClick={handleEmergencyCall}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Connect to Crisis Support</span>
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Dismiss
            </button>
            
            <button
              onClick={handleResolve}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Resolve Warning</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 