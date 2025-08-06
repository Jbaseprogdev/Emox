'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Heart, Shield, Users, CheckCircle, X, Star,
  AlertTriangle, Info, Lightbulb, Award, Target, Clock,
  ChevronRight, ChevronDown, Play, Pause, Volume2, VolumeX
} from 'lucide-react'
import toast from 'react-hot-toast'

interface CommunityGuidelinesProps {
  onClose: () => void
  currentUser?: any
}

interface Guideline {
  id: string
  title: string
  description: string
  category: 'respect' | 'safety' | 'support' | 'privacy' | 'content'
  importance: 'critical' | 'high' | 'medium' | 'low'
  examples: string[]
  consequences: string[]
  icon: React.ReactNode
}

interface LearningModule {
  id: string
  title: string
  description: string
  duration: string
  topics: string[]
  completed: boolean
  progress: number
  quiz?: {
    questions: number
    passed: boolean
    score?: number
  }
}

export function CommunityGuidelines({ onClose, currentUser }: CommunityGuidelinesProps) {
  const [activeTab, setActiveTab] = useState('guidelines')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [quizCompleted, setQuizCompleted] = useState(false)

  const guidelines: Guideline[] = [
    {
      id: 'respect',
      title: 'Treat Everyone with Respect',
      description: 'Show kindness, empathy, and understanding to all community members. Everyone deserves to feel safe and valued.',
      category: 'respect',
      importance: 'critical',
      examples: [
        'Use inclusive and supportive language',
        'Listen actively to others\' experiences',
        'Avoid judgmental or dismissive comments',
        'Respect different perspectives and backgrounds'
      ],
      consequences: [
        'Warning for first offense',
        'Temporary suspension for repeated violations',
        'Permanent ban for severe cases'
      ],
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: 'safety',
      title: 'Prioritize Mental Health Safety',
      description: 'Create a safe environment for mental health discussions. Never give medical advice or encourage harmful behaviors.',
      category: 'safety',
      importance: 'critical',
      examples: [
        'Encourage professional help when needed',
        'Report concerning behavior immediately',
        'Avoid triggering content without warnings',
        'Support crisis intervention resources'
      ],
      consequences: [
        'Immediate content removal',
        'Account suspension',
        'Reporting to authorities if necessary'
      ],
      icon: <Shield className="w-6 h-6" />
    },
    {
      id: 'support',
      title: 'Provide Constructive Support',
      description: 'Offer helpful, evidence-based support while respecting professional boundaries.',
      category: 'support',
      importance: 'high',
      examples: [
        'Share personal experiences appropriately',
        'Recommend evidence-based resources',
        'Encourage healthy coping strategies',
        'Celebrate others\' progress and achievements'
      ],
      consequences: [
        'Guidance on appropriate support',
        'Temporary restriction if boundaries crossed',
        'Moderation review for repeated issues'
      ],
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 'privacy',
      title: 'Respect Privacy and Confidentiality',
      description: 'Protect personal information and respect others\' privacy. Never share private conversations or personal details.',
      category: 'privacy',
      importance: 'high',
      examples: [
        'Don\'t share private messages publicly',
        'Respect requests for anonymity',
        'Use discretion when sharing stories',
        'Report privacy violations immediately'
      ],
      consequences: [
        'Content removal and warning',
        'Account suspension',
        'Legal action for severe violations'
      ],
      icon: <Shield className="w-6 h-6" />
    },
    {
      id: 'content',
      title: 'Share Appropriate Content',
      description: 'Ensure all content is relevant, helpful, and appropriate for a mental health support community.',
      category: 'content',
      importance: 'medium',
      examples: [
        'Keep discussions relevant to mental health',
        'Use appropriate language and tone',
        'Avoid spam, advertising, or off-topic content',
        'Credit sources when sharing information'
      ],
      consequences: [
        'Content removal',
        'Warning for inappropriate content',
        'Temporary posting restrictions'
      ],
      icon: <BookOpen className="w-6 h-6" />
    }
  ]

  const learningModules: LearningModule[] = [
    {
      id: 'active-listening',
      title: 'Active Listening Skills',
      description: 'Learn how to listen effectively and provide meaningful support to others.',
      duration: '15 minutes',
      topics: ['Understanding vs. Fixing', 'Reflective Responses', 'Validation Techniques'],
      completed: false,
      progress: 0,
      quiz: {
        questions: 5,
        passed: false
      }
    },
    {
      id: 'crisis-intervention',
      title: 'Crisis Intervention Basics',
      description: 'Understand how to recognize and respond to crisis situations appropriately.',
      duration: '20 minutes',
      topics: ['Recognizing Crisis Signs', 'Appropriate Responses', 'Professional Resources'],
      completed: false,
      progress: 0,
      quiz: {
        questions: 8,
        passed: false
      }
    },
    {
      id: 'boundaries',
      title: 'Setting Healthy Boundaries',
      description: 'Learn to maintain appropriate boundaries while providing support.',
      duration: '12 minutes',
      topics: ['Personal Boundaries', 'Professional Limits', 'Self-Care'],
      completed: true,
      progress: 100,
      quiz: {
        questions: 6,
        passed: true,
        score: 85
      }
    },
    {
      id: 'inclusive-language',
      title: 'Inclusive Language Guide',
      description: 'Master the use of inclusive and supportive language in mental health discussions.',
      duration: '18 minutes',
      topics: ['Person-First Language', 'Cultural Sensitivity', 'Avoiding Stigma'],
      completed: false,
      progress: 30,
      quiz: {
        questions: 7,
        passed: false
      }
    }
  ]

  const quizQuestions = [
    {
      question: "What should you do if someone shares thoughts of self-harm?",
      options: [
        "Tell them to 'just cheer up'",
        "Listen empathetically and encourage professional help",
        "Ignore the message",
        "Share your own similar experience"
      ],
      correct: 1
    },
    {
      question: "Which of the following is appropriate in a mental health support community?",
      options: [
        "Giving medical advice",
        "Sharing personal coping strategies",
        "Diagnosing others",
        "Promoting unproven treatments"
      ],
      correct: 1
    },
    {
      question: "How should you respond to someone who disagrees with you?",
      options: [
        "Argue until they agree",
        "Respect their perspective and find common ground",
        "Report them to moderators",
        "Ignore them completely"
      ],
      correct: 1
    }
  ]

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'high':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'respect':
        return 'from-pink-500 to-rose-500'
      case 'safety':
        return 'from-red-500 to-orange-500'
      case 'support':
        return 'from-blue-500 to-cyan-500'
      case 'privacy':
        return 'from-purple-500 to-pink-500'
      case 'content':
        return 'from-green-500 to-emerald-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const filteredGuidelines = guidelines.filter(guideline => 
    selectedCategory === 'all' || guideline.category === selectedCategory
  )

  const handleQuizAnswer = (questionIndex: number, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answer }))
  }

  const submitQuiz = () => {
    const correctAnswers = quizAnswers[0] === '1' && quizAnswers[1] === '1' && quizAnswers[2] === '1'
    const score = Object.values(quizAnswers).filter((answer, index) => 
      answer === quizQuestions[index].correct.toString()
    ).length * (100 / quizQuestions.length)
    
    setQuizCompleted(true)
    if (correctAnswers) {
      toast.success(`Quiz completed! Score: ${Math.round(score)}%`)
    } else {
      toast.error(`Quiz failed. Score: ${Math.round(score)}%`)
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
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Community Guidelines</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn about respectful behavior and community policies
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
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Welcome to Our Community
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Our community is built on mutual respect, support, and understanding. 
                    These guidelines help ensure everyone feels safe and valued.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>10,000+ members</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Shield className="w-4 h-4" />
                      <span>Safe & supportive</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>99% satisfaction</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {['guidelines', 'learning', 'quiz'].map((tab) => (
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
              {activeTab === 'guidelines' && (
                <motion.div
                  key="guidelines"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Category Filter */}
                  <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                    {['all', 'respect', 'safety', 'support', 'privacy', 'content'].map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                          selectedCategory === category
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Guidelines List */}
                  <div className="space-y-4">
                    {filteredGuidelines.map((guideline, index) => (
                      <motion.div
                        key={guideline.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(guideline.category)} flex items-center justify-center text-white`}>
                            {guideline.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {guideline.title}
                              </h3>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getImportanceColor(guideline.importance)}`}>
                                {guideline.importance}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              {guideline.description}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span>Examples</span>
                                </h4>
                                <ul className="space-y-2">
                                  {guideline.examples.map((example, idx) => (
                                    <li key={idx} className="flex items-start space-x-2">
                                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-sm text-gray-600 dark:text-gray-400">{example}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                                  <span>Consequences</span>
                                </h4>
                                <ul className="space-y-2">
                                  {guideline.consequences.map((consequence, idx) => (
                                    <li key={idx} className="flex items-start space-x-2">
                                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-sm text-gray-600 dark:text-gray-400">{consequence}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'learning' && (
                <motion.div
                  key="learning"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {learningModules.map((module, index) => (
                      <motion.div
                        key={module.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => setSelectedModule(module)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {module.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-3">
                              {module.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{module.duration}</span>
                              </span>
                              {module.quiz && (
                                <span className="flex items-center space-x-1">
                                  <Target className="w-4 h-4" />
                                  <span>{module.quiz.questions} questions</span>
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {module.completed ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                              <Play className="w-6 h-6 text-blue-500" />
                            )}
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="text-gray-900 dark:text-white font-medium">{module.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${module.progress}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>

                        {/* Topics */}
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Topics Covered</h4>
                          <div className="flex flex-wrap gap-2">
                            {module.topics.map((topic, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-xs"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'quiz' && (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {!showQuiz ? (
                    <div className="text-center py-12">
                      <Target className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Community Guidelines Quiz
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                        Test your understanding of our community guidelines and earn a certification badge.
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>5 minutes</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Target className="w-4 h-4" />
                            <span>{quizQuestions.length} questions</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Award className="w-4 h-4" />
                            <span>Certificate</span>
                          </span>
                        </div>
                        <button
                          onClick={() => setShowQuiz(true)}
                          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
                        >
                          Start Quiz
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-2xl mx-auto">
                      {!quizCompleted ? (
                        <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                          <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Question {currentQuestion + 1} of {quizQuestions.length}
                              </span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {Math.round((Object.keys(quizAnswers).length / quizQuestions.length) * 100)}% Complete
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <motion.div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(Object.keys(quizAnswers).length / quizQuestions.length) * 100}%` }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                            {quizQuestions[currentQuestion].question}
                          </h3>

                          <div className="space-y-3">
                            {quizQuestions[currentQuestion].options.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuizAnswer(currentQuestion, index.toString())}
                                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                                  quizAnswers[currentQuestion] === index.toString()
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                }`}
                              >
                                <span className="text-gray-900 dark:text-white">{option}</span>
                              </button>
                            ))}
                          </div>

                          <div className="flex items-center justify-between mt-6">
                            <button
                              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                              disabled={currentQuestion === 0}
                              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Previous
                            </button>
                            {currentQuestion < quizQuestions.length - 1 ? (
                              <button
                                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                                disabled={!quizAnswers[currentQuestion]}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Next
                              </button>
                            ) : (
                              <button
                                onClick={submitQuiz}
                                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Submit Quiz
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Award className="w-16 h-16 text-green-500 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Quiz Completed!
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Congratulations! You've demonstrated understanding of our community guidelines.
                          </p>
                          <button
                            onClick={() => {
                              setShowQuiz(false)
                              setQuizCompleted(false)
                              setCurrentQuestion(0)
                              setQuizAnswers({})
                            }}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          >
                            Take Quiz Again
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 