'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  AlertTriangle, 
  Heart, 
  MessageCircle, 
  Users, 
  X, 
  Phone,
  BookOpen,
  CheckCircle
} from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { useAppStore } from '@/store/app-store'
import { generateCoachingResponse } from '@/lib/ai'
import toast from 'react-hot-toast'

export function ThresholdWarning() {
  const { user } = useAuthStore()
  const { currentEmotion, emotionScore, setThresholdWarning } = useAppStore()
  const [aiResponse, setAiResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleClose = () => {
    setThresholdWarning(false)
  }

  const handleGetAIResponse = async () => {
    if (!currentEmotion) return

    setLoading(true)
    try {
      const response = await generateCoachingResponse(currentEmotion, emotionScore)
      setAiResponse(response)
      setSelectedOption('ai')
    } catch (error) {
      console.error('Error getting AI response:', error)
      toast.error('Failed to get AI response')
    } finally {
      setLoading(false)
    }
  }

  const handleConnectWithMentor = () => {
    setSelectedOption('mentor')
    toast.success('Connecting you with a mentor...')
    // Here you would integrate with your mentor/coach system
  }

  const handleEmergencyContact = () => {
    setSelectedOption('emergency')
    toast.success('Emergency contact information displayed')
    // Here you would show emergency contact information
  }

  const supportOptions = [
    {
      id: 'ai',
      title: 'AI Wellness Coach',
      description: 'Get immediate AI-powered support and guidance',
      icon: Heart,
      color: 'bg-primary-500',
      action: handleGetAIResponse
    },
    {
      id: 'mentor',
      title: 'Connect with Mentor',
      description: 'Talk to a trained emotional wellness mentor',
      icon: Users,
      color: 'bg-wellness-500',
      action: handleConnectWithMentor
    },
    {
      id: 'emergency',
      title: 'Emergency Resources',
      description: 'Access crisis support and emergency contacts',
      icon: Phone,
      color: 'bg-red-500',
      action: handleEmergencyContact
    }
  ]

  const emotionLabels = {
    joy: 'Joy',
    sadness: 'Sadness',
    anger: 'Anger',
    fear: 'Fear',
    surprise: 'Surprise',
    disgust: 'Disgust',
    neutral: 'Neutral'
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Wellness Check-In
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We noticed you might need some support
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current State */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Current Emotional State
            </h3>
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 bg-emotion-${currentEmotion} rounded-full`}></div>
              <span className="text-gray-700 dark:text-gray-300">
                {emotionLabels[currentEmotion as keyof typeof emotionLabels]} (Intensity: {emotionScore}/10)
              </span>
            </div>
          </div>

          {/* Support Options */}
          {!selectedOption && (
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                How would you like to get support?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {supportOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.id}
                      onClick={option.action}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 text-left group"
                    >
                      <div className={`w-10 h-10 ${option.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        {option.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {option.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* AI Response */}
          {selectedOption === 'ai' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI Wellness Coach Response
                </h3>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="spinner"></div>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">
                    Getting personalized support...
                  </span>
                </div>
              ) : aiResponse ? (
                <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {aiResponse}
                  </p>
                </div>
              ) : null}

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedOption(null)}
                  className="btn-secondary"
                >
                  Back to Options
                </button>
                <button
                  onClick={handleClose}
                  className="btn-primary flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>I'm Feeling Better</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Mentor Connection */}
          {selectedOption === 'mentor' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-5 h-5 text-wellness-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Connect with a Mentor
                </h3>
              </div>

              <div className="p-4 bg-wellness-50 dark:bg-wellness-900/20 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our trained emotional wellness mentors are here to support you. 
                  They can provide guidance, listen to your concerns, and help you 
                  develop coping strategies.
                </p>
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Available 24/7 for support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Trained in emotional wellness</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Confidential and supportive</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedOption(null)}
                  className="btn-secondary"
                >
                  Back to Options
                </button>
                <button
                  onClick={handleClose}
                  className="btn-primary flex items-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Chat</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Emergency Resources */}
          {selectedOption === 'emergency' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Phone className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Emergency Resources
                </h3>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-red-800 dark:text-red-200 font-medium mb-3">
                  If you're in immediate danger or having thoughts of self-harm, 
                  please call emergency services immediately.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        National Suicide Prevention Lifeline
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Available 24/7
                      </p>
                    </div>
                    <a
                      href="tel:988"
                      className="btn-primary text-sm"
                    >
                      Call 988
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Crisis Text Line
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Text HOME to 741741
                      </p>
                    </div>
                    <a
                      href="sms:741741&body=HOME"
                      className="btn-primary text-sm"
                    >
                      Text Now
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Emergency Services
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        For immediate danger
                      </p>
                    </div>
                    <a
                      href="tel:911"
                      className="btn-primary text-sm"
                    >
                      Call 911
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedOption(null)}
                  className="btn-secondary"
                >
                  Back to Options
                </button>
                <button
                  onClick={handleClose}
                  className="btn-primary"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Remember: Your feelings are valid and temporary. You're not alone, and help is always available.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 