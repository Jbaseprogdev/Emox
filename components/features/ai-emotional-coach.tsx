'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, MessageCircle, Heart, Star, Target, Zap, Shield, X,
  CheckCircle, Clock, TrendingUp, Award, BookOpen, Users,
  Lightbulb, Eye, EyeOff, Share2, Download, RefreshCw, Play,
  Pause, Volume2, VolumeX, Mic, MicOff, Send, Smile, Frown,
  Meh, Activity, BarChart3, Calendar, Target as TargetIcon
} from 'lucide-react'
import toast from 'react-hot-toast'

interface AIEmotionalCoachProps {
  onClose: () => void
  currentUser?: any
}

interface CoachingSession {
  id: string
  title: string
  description: string
  duration: string
  category: 'emotional-intelligence' | 'stress-management' | 'communication' | 'self-awareness' | 'relationships'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  completed: boolean
  progress: number
  exercises: Exercise[]
}

interface Exercise {
  id: string
  type: 'reflection' | 'practice' | 'assessment' | 'meditation'
  title: string
  description: string
  duration: string
  completed: boolean
  instructions: string[]
}

interface EmotionalInsight {
  id: string
  type: 'strength' | 'growth' | 'pattern' | 'recommendation'
  title: string
  description: string
  icon: React.ReactNode
  color: string
  actionable: boolean
}

export function AIEmotionalCoach({ onClose, currentUser }: AIEmotionalCoachProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [currentSession, setCurrentSession] = useState<CoachingSession | null>(null)
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [sessionProgress, setSessionProgress] = useState(0)
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null)
  const [userResponse, setUserResponse] = useState('')
  const [showInsights, setShowInsights] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [aiThinking, setAiThinking] = useState(false)

  const coachingSessions: CoachingSession[] = [
    {
      id: 'emotional-awareness',
      title: 'Emotional Self-Awareness',
      description: 'Develop deeper understanding of your emotional patterns and triggers',
      duration: '45 min',
      category: 'self-awareness',
      difficulty: 'beginner',
      completed: false,
      progress: 0,
      exercises: [
        {
          id: 'emotion-journal',
          type: 'reflection',
          title: 'Emotion Journaling',
          description: 'Reflect on your emotional experiences throughout the day',
          duration: '10 min',
          completed: false,
          instructions: [
            'Find a quiet space where you won\'t be interrupted',
            'Take 3 deep breaths to center yourself',
            'Reflect on your emotional experiences today',
            'Write down what triggered different emotions',
            'Note how you responded to each emotion'
          ]
        },
        {
          id: 'body-scan',
          type: 'practice',
          title: 'Body Sensation Awareness',
          description: 'Learn to recognize physical sensations associated with emotions',
          duration: '15 min',
          completed: false,
          instructions: [
            'Sit comfortably with your eyes closed',
            'Focus on your breath for 1 minute',
            'Scan your body from head to toe',
            'Notice any physical sensations',
            'Connect sensations to emotional states'
          ]
        }
      ]
    },
    {
      id: 'stress-management',
      title: 'Stress Management Techniques',
      description: 'Learn effective strategies to manage and reduce stress',
      duration: '60 min',
      category: 'stress-management',
      difficulty: 'intermediate',
      completed: false,
      progress: 25,
      exercises: [
        {
          id: 'progressive-relaxation',
          type: 'meditation',
          title: 'Progressive Muscle Relaxation',
          description: 'Systematically relax your muscles to reduce tension',
          duration: '20 min',
          completed: true,
          instructions: [
            'Lie down in a comfortable position',
            'Start with your toes and work up to your head',
            'Tense each muscle group for 5 seconds',
            'Release and feel the relaxation',
            'Continue through all major muscle groups'
          ]
        }
      ]
    },
    {
      id: 'communication-skills',
      title: 'Effective Communication',
      description: 'Improve your communication skills for better relationships',
      duration: '90 min',
      category: 'communication',
      difficulty: 'advanced',
      completed: true,
      progress: 100,
      exercises: [
        {
          id: 'active-listening',
          type: 'practice',
          title: 'Active Listening Practice',
          description: 'Practice active listening techniques in conversations',
          duration: '30 min',
          completed: true,
          instructions: [
            'Focus entirely on the speaker',
            'Maintain eye contact and open body language',
            'Avoid interrupting or planning your response',
            'Ask clarifying questions when needed',
            'Reflect back what you heard'
          ]
        }
      ]
    }
  ]

  const emotionalInsights: EmotionalInsight[] = [
    {
      id: 'strength-1',
      type: 'strength',
      title: 'High Empathy',
      description: 'You show strong ability to understand and connect with others\' emotions',
      icon: <Heart className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
      actionable: false
    },
    {
      id: 'growth-1',
      type: 'growth',
      title: 'Stress Response',
      description: 'Consider developing more adaptive stress management techniques',
      icon: <Target className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      actionable: true
    },
    {
      id: 'pattern-1',
      type: 'pattern',
      title: 'Emotional Patterns',
      description: 'You tend to experience heightened emotions in social situations',
      icon: <Activity className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      actionable: true
    },
    {
      id: 'recommendation-1',
      type: 'recommendation',
      title: 'Daily Practice',
      description: 'Try 10 minutes of mindfulness meditation each morning',
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500',
      actionable: true
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'emotional-intelligence':
        return 'from-blue-500 to-cyan-500'
      case 'stress-management':
        return 'from-green-500 to-emerald-500'
      case 'communication':
        return 'from-purple-500 to-pink-500'
      case 'self-awareness':
        return 'from-orange-500 to-red-500'
      case 'relationships':
        return 'from-indigo-500 to-purple-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'advanced':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const startSession = (session: CoachingSession) => {
    setCurrentSession(session)
    setIsSessionActive(true)
    setSessionProgress(0)
    setCurrentExercise(session.exercises[0])
    toast.success(`Starting ${session.title} session`)
  }

  const completeExercise = () => {
    if (currentExercise && currentSession) {
      setCurrentExercise({ ...currentExercise, completed: true })
      setSessionProgress(prev => prev + (100 / currentSession.exercises.length))
      toast.success('Exercise completed!')
    }
  }

  const handleAIResponse = () => {
    setAiThinking(true)
    setTimeout(() => {
      setAiThinking(false)
      toast.success('AI coach has provided personalized feedback!')
    }, 2000)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    toast.success(isRecording ? 'Recording stopped' : 'Recording started')
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
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Emotional Coach</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Personalized emotional intelligence coaching and guidance
              </p>
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
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {['dashboard', 'sessions', 'insights', 'practice'].map((tab) => (
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
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Welcome Banner */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Welcome to Your AI Emotional Coach
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          I'm here to help you develop emotional intelligence, manage stress, and build better relationships. 
                          Let's work together to enhance your emotional well-being.
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Target className="w-4 h-4" />
                            <span>Personalized coaching</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Flexible sessions</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>Track progress</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">12</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Sessions Completed</div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">85%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Emotional IQ</div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">7</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">24</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Insights Gained</div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {coachingSessions.slice(0, 3).map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getCategoryColor(session.category)} flex items-center justify-center`}>
                              <Brain className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{session.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{session.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {session.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {session.progress}% complete
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'sessions' && (
                <motion.div
                  key="sessions"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Sessions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coachingSessions.map((session, index) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => startSession(session)}
                      >
                        {/* Session Header */}
                        <div className={`h-32 bg-gradient-to-br ${getCategoryColor(session.category)} relative`}>
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Brain className="w-8 h-8 text-white" />
                          </div>
                          {session.completed && (
                            <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                          )}
                        </div>

                        {/* Session Content */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(session.difficulty)}`}>
                              {session.difficulty}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{session.duration}</span>
                            </div>
                          </div>

                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                            {session.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {session.description}
                          </p>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                              <span>Progress</span>
                              <span>{session.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <motion.div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${session.progress}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                          </div>

                          <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 text-sm font-medium">
                            {session.completed ? 'Review Session' : 'Start Session'}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'insights' && (
                <motion.div
                  key="insights"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* AI Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {emotionalInsights.map((insight, index) => (
                      <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${insight.color} flex items-center justify-center text-white`}>
                            {insight.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{insight.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-3">{insight.description}</p>
                            {insight.actionable && (
                              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm">
                                Take Action
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Emotional Patterns Chart */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emotional Patterns</h3>
                    <div className="h-64 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 dark:text-gray-400">Emotional pattern visualization</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'practice' && (
                <motion.div
                  key="practice"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Live Coaching Session */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Live Coaching Session</h3>
                    
                    {/* AI Coach Interface */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 bg-gray-100 dark:bg-gray-600 rounded-lg p-4">
                          <p className="text-gray-900 dark:text-white">
                            How are you feeling today? I'm here to help you process your emotions and develop better emotional awareness.
                          </p>
                        </div>
                      </div>

                      {/* User Response */}
                      <div className="flex items-end space-x-4">
                        <div className="flex-1">
                          <textarea
                            value={userResponse}
                            onChange={(e) => setUserResponse(e.target.value)}
                            placeholder="Share your thoughts and feelings..."
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                            rows={3}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={toggleRecording}
                            className={`p-3 rounded-lg transition-colors ${
                              isRecording 
                                ? 'bg-red-500 text-white' 
                                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                          </button>
                          <button
                            onClick={handleAIResponse}
                            disabled={aiThinking || !userResponse.trim()}
                            className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
                          >
                            {aiThinking ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                              <Send className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Exercises */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Breathing Exercise</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Take a moment to center yourself with this simple breathing technique.
                      </p>
                      <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
                        <Play className="w-4 h-4 mr-2 inline" />
                        Start Exercise
                      </button>
                    </div>

                    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Emotion Check-in</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Assess your current emotional state and identify what you're feeling.
                      </p>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200">
                        <TargetIcon className="w-4 h-4 mr-2 inline" />
                        Check In
                      </button>
                    </div>
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