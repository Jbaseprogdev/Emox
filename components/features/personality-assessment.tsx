'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, User, Star, Target, Heart, Zap, Shield, X,
  CheckCircle, Clock, TrendingUp, Award, BookOpen, Users,
  Lightbulb, Eye, EyeOff, Share2, Download, RefreshCw
} from 'lucide-react'
import toast from 'react-hot-toast'

interface PersonalityAssessmentProps {
  onClose: () => void
  currentUser?: any
}

interface AssessmentQuestion {
  id: string
  category: string
  question: string
  options: {
    value: string
    label: string
    description: string
  }[]
}

interface PersonalityTrait {
  name: string
  score: number
  description: string
  strengths: string[]
  challenges: string[]
  color: string
  icon: React.ReactNode
}

interface AssessmentResult {
  traits: PersonalityTrait[]
  overallType: string
  compatibility: string[]
  recommendations: string[]
  insights: string[]
}

export function PersonalityAssessment({ onClose, currentUser }: PersonalityAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)
  const [loading, setLoading] = useState(false)

  const assessmentQuestions: AssessmentQuestion[] = [
    {
      id: 'social-energy',
      category: 'Social Energy',
      question: 'How do you typically feel after spending time with large groups of people?',
      options: [
        { value: 'extrovert', label: 'Energized', description: 'I feel more alive and motivated' },
        { value: 'ambivert', label: 'Mixed', description: 'It depends on the situation and people' },
        { value: 'introvert', label: 'Drained', description: 'I need time alone to recharge' }
      ]
    },
    {
      id: 'decision-making',
      category: 'Decision Making',
      question: 'When making important decisions, you typically:',
      options: [
        { value: 'thinking', label: 'Analyze logically', description: 'Consider facts and data carefully' },
        { value: 'feeling', label: 'Follow your heart', description: 'Consider how it affects others' },
        { value: 'balanced', label: 'Use both approaches', description: 'Combine logic and emotions' }
      ]
    },
    {
      id: 'information-processing',
      category: 'Information Processing',
      question: 'You prefer to receive information that is:',
      options: [
        { value: 'sensing', label: 'Concrete and specific', description: 'Facts, details, and practical examples' },
        { value: 'intuitive', label: 'Abstract and conceptual', description: 'Big picture ideas and possibilities' },
        { value: 'balanced', label: 'A mix of both', description: 'Both specific details and broader concepts' }
      ]
    },
    {
      id: 'lifestyle-preference',
      category: 'Lifestyle Preference',
      question: 'In your daily life, you prefer:',
      options: [
        { value: 'judging', label: 'Structure and planning', description: 'Schedules, lists, and organization' },
        { value: 'perceiving', label: 'Flexibility and spontaneity', description: 'Going with the flow and adapting' },
        { value: 'balanced', label: 'A balance of both', description: 'Some structure with room for spontaneity' }
      ]
    },
    {
      id: 'stress-response',
      category: 'Stress Response',
      question: 'When you\'re stressed, you typically:',
      options: [
        { value: 'action-oriented', label: 'Take action', description: 'Address the problem directly' },
        { value: 'reflection-oriented', label: 'Reflect and process', description: 'Take time to think and feel' },
        { value: 'support-seeking', label: 'Seek support', description: 'Talk to others for help' }
      ]
    },
    {
      id: 'communication-style',
      category: 'Communication Style',
      question: 'In conversations, you tend to:',
      options: [
        { value: 'direct', label: 'Be direct and straightforward', description: 'Get to the point quickly' },
        { value: 'diplomatic', label: 'Be diplomatic and considerate', description: 'Consider others\' feelings' },
        { value: 'adaptable', label: 'Adapt to the situation', description: 'Adjust based on context' }
      ]
    }
  ]

  const personalityTraits: PersonalityTrait[] = [
    {
      name: 'Emotional Intelligence',
      score: 85,
      description: 'High ability to understand and manage emotions',
      strengths: ['Empathetic', 'Self-aware', 'Good at reading others'],
      challenges: ['May take on others\' emotions', 'Can be overly sensitive'],
      color: 'from-blue-500 to-cyan-500',
      icon: <Heart className="w-5 h-5" />
    },
    {
      name: 'Resilience',
      score: 78,
      description: 'Strong ability to bounce back from challenges',
      strengths: ['Adaptable', 'Persistent', 'Optimistic'],
      challenges: ['May push through too much', 'Could benefit from rest'],
      color: 'from-green-500 to-emerald-500',
      icon: <Shield className="w-5 h-5" />
    },
    {
      name: 'Creativity',
      score: 72,
      description: 'Good at thinking outside the box',
      strengths: ['Innovative', 'Imaginative', 'Open-minded'],
      challenges: ['May struggle with routine', 'Could be more practical'],
      color: 'from-purple-500 to-pink-500',
      icon: <Lightbulb className="w-5 h-5" />
    },
    {
      name: 'Social Connection',
      score: 68,
      description: 'Moderate comfort with social interactions',
      strengths: ['Loyal', 'Good listener', 'Supportive'],
      challenges: ['May need alone time', 'Could be more outgoing'],
      color: 'from-orange-500 to-red-500',
      icon: <Users className="w-5 h-5" />
    },
    {
      name: 'Analytical Thinking',
      score: 81,
      description: 'Strong logical and analytical abilities',
      strengths: ['Problem-solver', 'Detail-oriented', 'Objective'],
      challenges: ['May overthink', 'Could be more intuitive'],
      color: 'from-indigo-500 to-purple-500',
      icon: <Brain className="w-5 h-5" />
    }
  ]

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
    
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Assessment complete
      setLoading(true)
      setTimeout(() => {
        const result: AssessmentResult = {
          traits: personalityTraits,
          overallType: 'Balanced Empath',
          compatibility: ['Analytical Thinkers', 'Creative Souls', 'Supportive Friends'],
          recommendations: [
            'Practice setting emotional boundaries',
            'Develop stress management techniques',
            'Balance social time with solitude',
            'Use your empathy to help others while protecting yourself'
          ],
          insights: [
            'Your high emotional intelligence makes you a great friend and supporter',
            'You have strong analytical skills that help you solve problems effectively',
            'Your creativity allows you to see unique solutions to challenges',
            'You benefit from balancing social connection with personal reflection time'
          ]
        }
        setAssessmentResult(result)
        setShowResults(true)
        setLoading(false)
        toast.success('Personality assessment completed!')
      }, 2000)
    }
  }

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / assessmentQuestions.length) * 100
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500'
    if (score >= 60) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Personality Assessment</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Discover your unique personality traits and insights</p>
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
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="assessment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analyzing Your Personality</h3>
                    <p className="text-gray-600 dark:text-gray-400">Our AI is processing your responses...</p>
                  </div>
                ) : (
                  <>
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Question {currentQuestion + 1} of {assessmentQuestions.length}</span>
                        <span>{Math.round(getProgressPercentage())}% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${getProgressPercentage()}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Current Question */}
                    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-8">
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {assessmentQuestions[currentQuestion].category}
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                          {assessmentQuestions[currentQuestion].question}
                        </p>
                      </div>

                      {/* Answer Options */}
                      <div className="space-y-4">
                        {assessmentQuestions[currentQuestion].options.map((option, index) => (
                          <motion.button
                            key={option.value}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleAnswer(assessmentQuestions[currentQuestion].id, option.value)}
                            className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 text-left group"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                                {String.fromCharCode(65 + index)}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                  {option.label}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                  {option.description}
                                </p>
                              </div>
                              <CheckCircle className="w-5 h-5 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                      <div className="flex items-start space-x-3">
                        <Lightbulb className="w-6 h-6 text-blue-500 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Assessment Tips</h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Answer based on how you typically are, not how you wish to be</li>
                            <li>• There are no right or wrong answers - be honest with yourself</li>
                            <li>• Consider your natural tendencies rather than learned behaviors</li>
                            <li>• Take your time and trust your instincts</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {assessmentResult && (
                  <>
                    {/* Overall Result */}
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Your Personality Type: {assessmentResult.overallType}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Based on your responses, here's what makes you unique
                      </p>
                    </div>

                    {/* Personality Traits */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {assessmentResult.traits.map((trait, index) => (
                        <motion.div
                          key={trait.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${trait.color} flex items-center justify-center text-white`}>
                                {trait.icon}
                              </div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{trait.name}</h4>
                            </div>
                            <div className={`text-2xl font-bold ${getScoreColor(trait.score)}`}>
                              {trait.score}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-400 mb-4">{trait.description}</p>
                          
                          <div className="space-y-3">
                            <div>
                              <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">Strengths:</h5>
                              <div className="flex flex-wrap gap-2">
                                {trait.strengths.map((strength) => (
                                  <span key={strength} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-xs">
                                    {strength}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium text-orange-700 dark:text-orange-400 mb-2">Growth Areas:</h5>
                              <div className="flex flex-wrap gap-2">
                                {trait.challenges.map((challenge) => (
                                  <span key={challenge} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-md text-xs">
                                    {challenge}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Compatibility */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                        <Users className="w-5 h-5 text-green-500" />
                        <span>Compatible Personality Types</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {assessmentResult.compatibility.map((type) => (
                          <span key={type} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                        <Target className="w-5 h-5 text-purple-500" />
                        <span>Personal Growth Recommendations</span>
                      </h4>
                      <div className="space-y-3">
                        {assessmentResult.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Insights */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                        <Brain className="w-5 h-5 text-blue-500" />
                        <span>AI-Generated Insights</span>
                      </h4>
                      <div className="space-y-3">
                        {assessmentResult.insights.map((insight, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <p className="text-gray-700 dark:text-gray-300">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center space-x-4">
                      <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200">
                        <Download className="w-4 h-4" />
                        <span>Download Report</span>
                      </button>
                      <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share Results</span>
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
} 