'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, TrendingUp, Calendar, BarChart3, PieChart, Activity, X,
  Filter, Download, Share2, Eye, EyeOff, RefreshCw, Target, Zap,
  AlertTriangle, CheckCircle, Clock, Star, Heart, Smile, Frown,
  Meh, Lightbulb, Users, MessageCircle, Bell, Settings, Leaf
} from 'lucide-react'
import toast from 'react-hot-toast'

interface AIEmotionPredictorProps {
  onClose: () => void
  currentUser?: any
}

interface EmotionPrediction {
  id: string
  date: string
  predictedEmotion: string
  confidence: number
  factors: string[]
  recommendations: string[]
  riskLevel: 'low' | 'medium' | 'high'
  actualEmotion?: string
  accuracy?: number
}

interface EmotionalPattern {
  id: string
  pattern: string
  frequency: number
  triggers: string[]
  impact: 'positive' | 'negative' | 'neutral'
  confidence: number
}

interface WellnessRecommendation {
  id: string
  type: 'preventive' | 'reactive' | 'enhancement'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  estimatedImpact: number
  timeRequired: string
  category: string
}

export function AIEmotionPredictor({ onClose, currentUser }: AIEmotionPredictorProps) {
  const [activeTab, setActiveTab] = useState('predictions')
  const [predictions, setPredictions] = useState<EmotionPrediction[]>([])
  const [patterns, setPatterns] = useState<EmotionalPattern[]>([])
  const [recommendations, setRecommendations] = useState<WellnessRecommendation[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showInsights, setShowInsights] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')
  const [predictionAccuracy, setPredictionAccuracy] = useState(87.5)

  const emotionPredictions: EmotionPrediction[] = [
    {
      id: '1',
      date: '2024-01-15',
      predictedEmotion: 'Happy',
      confidence: 92,
      factors: ['Good sleep quality', 'Positive social interactions', 'Achievement of goals'],
      recommendations: ['Continue current routine', 'Share positive experiences', 'Practice gratitude'],
      riskLevel: 'low'
    },
    {
      id: '2',
      date: '2024-01-16',
      predictedEmotion: 'Stressed',
      confidence: 78,
      factors: ['Work deadline approaching', 'Reduced sleep hours', 'Social isolation'],
      recommendations: ['Practice deep breathing', 'Take short breaks', 'Reach out to friends'],
      riskLevel: 'medium'
    },
    {
      id: '3',
      date: '2024-01-17',
      predictedEmotion: 'Anxious',
      confidence: 85,
      factors: ['Uncertainty about future', 'Financial concerns', 'Health worries'],
      recommendations: ['Mindfulness meditation', 'Focus on present moment', 'Seek support'],
      riskLevel: 'high'
    }
  ]

  const emotionalPatterns: EmotionalPattern[] = [
    {
      id: '1',
      pattern: 'Monday Blues',
      frequency: 85,
      triggers: ['Work stress', 'Weekend ending', 'Sleep disruption'],
      impact: 'negative',
      confidence: 89
    },
    {
      id: '2',
      pattern: 'Post-Exercise High',
      frequency: 92,
      triggers: ['Physical activity', 'Endorphin release', 'Achievement'],
      impact: 'positive',
      confidence: 94
    },
    {
      id: '3',
      pattern: 'Social Anxiety',
      frequency: 67,
      triggers: ['Large gatherings', 'New people', 'Performance pressure'],
      impact: 'negative',
      confidence: 76
    }
  ]

  const wellnessRecommendations: WellnessRecommendation[] = [
    {
      id: '1',
      type: 'preventive',
      title: 'Morning Meditation Routine',
      description: 'Start each day with 10 minutes of mindfulness to prevent stress buildup',
      priority: 'high',
      estimatedImpact: 85,
      timeRequired: '10 min daily',
      category: 'Mindfulness'
    },
    {
      id: '2',
      type: 'reactive',
      title: 'Stress Response Training',
      description: 'Learn quick stress management techniques for immediate relief',
      priority: 'high',
      estimatedImpact: 78,
      timeRequired: '5 min when needed',
      category: 'Stress Management'
    },
    {
      id: '3',
      type: 'enhancement',
      title: 'Social Connection Building',
      description: 'Strengthen relationships to improve emotional resilience',
      priority: 'medium',
      estimatedImpact: 72,
      timeRequired: '30 min weekly',
      category: 'Social Wellness'
    }
  ]

  useEffect(() => {
    setPredictions(emotionPredictions)
    setPatterns(emotionalPatterns)
    setRecommendations(wellnessRecommendations)
  }, [])

  const runAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      toast.success('AI analysis completed! New insights available.')
      setShowInsights(true)
    }, 3000)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'negative': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'neutral': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Emotion Predictor</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced machine learning to predict emotional patterns and provide proactive wellness
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
            {/* Accuracy Overview */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Prediction Accuracy</h3>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{predictionAccuracy}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${predictionAccuracy}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                AI model accuracy based on historical predictions vs actual emotions
              </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {['predictions', 'patterns', 'recommendations', 'insights'].map((tab) => (
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
              {activeTab === 'predictions' && (
                <motion.div
                  key="predictions"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Timeframe Filter */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Emotion Predictions</h3>
                    <div className="flex items-center space-x-2">
                      <select
                        value={selectedTimeframe}
                        onChange={(e) => setSelectedTimeframe(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="7d">Next 7 days</option>
                        <option value="14d">Next 14 days</option>
                        <option value="30d">Next 30 days</option>
                      </select>
                      <button
                        onClick={runAnalysis}
                        disabled={isAnalyzing}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50"
                      >
                        {isAnalyzing ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Analyzing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <RefreshCw className="w-4 h-4" />
                            <span>Run Analysis</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Predictions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {predictions.map((prediction) => (
                      <motion.div
                        key={prediction.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <Brain className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{prediction.predictedEmotion}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{prediction.date}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(prediction.riskLevel)}`}>
                            {prediction.riskLevel} risk
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Confidence</p>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                                style={{ width: `${prediction.confidence}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{prediction.confidence}%</p>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Factors</p>
                            <div className="space-y-1">
                              {prediction.factors.slice(0, 3).map((factor, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                  <span className="text-xs text-gray-600 dark:text-gray-400">{factor}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recommendations</p>
                            <div className="space-y-1">
                              {prediction.recommendations.slice(0, 2).map((rec, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  <span className="text-xs text-gray-600 dark:text-gray-400">{rec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'patterns' && (
                <motion.div
                  key="patterns"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Emotional Patterns</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {patterns.map((pattern) => (
                      <div
                        key={pattern.id}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{pattern.pattern}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(pattern.impact)}`}>
                            {pattern.impact}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Frequency</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{pattern.frequency}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                              style={{ width: `${pattern.frequency}%` }}
                            />
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Triggers</p>
                            <div className="flex flex-wrap gap-2">
                              {pattern.triggers.map((trigger, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs text-gray-700 dark:text-gray-300 rounded-full"
                                >
                                  {trigger}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Confidence</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{pattern.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'recommendations' && (
                <motion.div
                  key="recommendations"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Wellness Recommendations</h3>
                  
                  <div className="space-y-4">
                    {recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{rec.title}</h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(rec.priority)}`}>
                                {rec.priority} priority
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-3">{rec.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{rec.estimatedImpact}%</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Impact</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{rec.timeRequired}</span>
                            </span>
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded-full text-xs">
                              {rec.category}
                            </span>
                          </div>
                          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 text-sm">
                            Start Now
                          </button>
                        </div>
                      </div>
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
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Insights</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Lightbulb className="w-6 h-6 text-blue-600" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Pattern Recognition</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Your emotional patterns show a strong correlation between physical activity and positive mood states.
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Confidence: 94% | Based on 127 data points
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Target className="w-6 h-6 text-green-600" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Optimization Opportunity</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Morning routines significantly impact your daily emotional trajectory. Consider earlier exercise sessions.
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Potential Impact: +23% mood improvement
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <AlertTriangle className="w-6 h-6 text-purple-600" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Risk Alert</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Social isolation patterns detected. Consider proactive social engagement to prevent mood decline.
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Risk Level: Medium | Timeframe: 3-5 days
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Progress Tracking</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Your emotional resilience has improved by 18% over the past month. Keep up the great work!
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Trend: Positive | Duration: 30 days
                      </div>
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