'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp, BarChart3, PieChart, Activity, Calendar, X, Filter, Download, Share2,
  Eye, EyeOff, RefreshCw, Target, Zap, AlertCircle, CheckCircle, Clock, Star, Heart,
  Brain, Users, MessageCircle, Bell, Settings, ArrowUp, ArrowDown, Minus
} from 'lucide-react'
import toast from 'react-hot-toast'

interface MoodProgressReportsProps {
  onClose: () => void
  currentUser?: any
}

interface ProgressReport {
  id: string
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  startDate: string
  endDate: string
  overallScore: number
  previousScore: number
  change: number
  trend: 'improving' | 'declining' | 'stable'
  insights: Insight[]
  recommendations: Recommendation[]
  achievements: Achievement[]
  challenges: Challenge[]
  nextSteps: NextStep[]
}

interface Insight {
  id: string
  type: 'positive' | 'negative' | 'neutral' | 'actionable'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  category: string
  data: any
}

interface Recommendation {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  category: 'mindfulness' | 'social' | 'physical' | 'cognitive' | 'emotional'
  estimatedTime: number
  difficulty: 'easy' | 'moderate' | 'challenging'
  expectedImpact: number
}

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  type: 'streak' | 'milestone' | 'improvement' | 'consistency'
  value: number
  icon: string
}

interface Challenge {
  id: string
  title: string
  description: string
  severity: 'mild' | 'moderate' | 'severe'
  frequency: number
  impact: number
  copingStrategies: string[]
}

interface NextStep {
  id: string
  title: string
  description: string
  deadline: string
  priority: 'high' | 'medium' | 'low'
  category: string
  isCompleted: boolean
}

export function MoodProgressReports({ onClose, currentUser }: MoodProgressReportsProps) {
  const [reports, setReports] = useState<ProgressReport[]>([])
  const [activeReport, setActiveReport] = useState<ProgressReport | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly'>('weekly')
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'comparison'>('overview')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [showCreateReport, setShowCreateReport] = useState(false)

  const mockReports: ProgressReport[] = [
    {
      id: '1',
      period: 'weekly',
      startDate: '2024-01-08',
      endDate: '2024-01-15',
      overallScore: 7.8,
      previousScore: 6.9,
      change: 13.0,
      trend: 'improving',
      insights: [
        {
          id: '1',
          type: 'positive',
          title: 'Consistent Morning Routine',
          description: 'Your morning meditation and journaling routine has been maintained 6 out of 7 days this week, showing strong consistency.',
          impact: 'high',
          category: 'mindfulness',
          data: { consistency: 85, days: 6, total: 7 }
        },
        {
          id: '2',
          type: 'actionable',
          title: 'Social Connection Opportunity',
          description: 'Your social wellness score increased by 15% when you engaged in group activities. Consider joining more community events.',
          impact: 'medium',
          category: 'social',
          data: { improvement: 15, activities: 3, connections: 8 }
        },
        {
          id: '3',
          type: 'negative',
          title: 'Stress Management',
          description: 'Stress levels peaked on Wednesday and Thursday. Consider implementing stress-reduction techniques during mid-week.',
          impact: 'medium',
          category: 'emotional',
          data: { peakDays: ['Wednesday', 'Thursday'], stressLevel: 8.5 }
        }
      ],
      recommendations: [
        {
          id: '1',
          title: 'Implement Mid-Week Stress Relief',
          description: 'Add a 10-minute breathing exercise on Wednesday and Thursday to manage stress peaks.',
          priority: 'high',
          category: 'mindfulness',
          estimatedTime: 10,
          difficulty: 'easy',
          expectedImpact: 8
        },
        {
          id: '2',
          title: 'Join Weekly Wellness Circle',
          description: 'Participate in the community wellness circle to maintain social connections and accountability.',
          priority: 'medium',
          category: 'social',
          estimatedTime: 60,
          difficulty: 'moderate',
          expectedImpact: 7
        },
        {
          id: '3',
          title: 'Optimize Sleep Schedule',
          description: 'Your mood improves significantly when you get 7-8 hours of sleep. Focus on consistent bedtime routine.',
          priority: 'medium',
          category: 'physical',
          estimatedTime: 30,
          difficulty: 'moderate',
          expectedImpact: 6
        }
      ],
      achievements: [
        {
          id: '1',
          title: '7-Day Mindfulness Streak',
          description: 'Completed daily mindfulness practice for 7 consecutive days',
          date: '2024-01-15',
          type: 'streak',
          value: 7,
          icon: '🧘'
        },
        {
          id: '2',
          title: 'Mood Improvement Milestone',
          description: 'Achieved 13% improvement in overall mood score',
          date: '2024-01-15',
          type: 'improvement',
          value: 13,
          icon: '📈'
        },
        {
          id: '3',
          title: 'Social Wellness Boost',
          description: 'Increased social connections by 25% this week',
          date: '2024-01-15',
          type: 'milestone',
          value: 25,
          icon: '👥'
        }
      ],
      challenges: [
        {
          id: '1',
          title: 'Mid-Week Stress Peaks',
          description: 'Stress levels consistently rise on Wednesday and Thursday',
          severity: 'moderate',
          frequency: 2,
          impact: 6,
          copingStrategies: ['Deep breathing exercises', 'Short walks', 'Mindfulness breaks']
        },
        {
          id: '2',
          title: 'Inconsistent Sleep Pattern',
          description: 'Sleep schedule varies by 1-2 hours on weekdays vs weekends',
          severity: 'mild',
          frequency: 5,
          impact: 4,
          copingStrategies: ['Consistent bedtime routine', 'Screen time reduction', 'Relaxation techniques']
        }
      ],
      nextSteps: [
        {
          id: '1',
          title: 'Schedule Mid-Week Stress Relief',
          description: 'Set up automated reminders for Wednesday and Thursday stress management',
          deadline: '2024-01-17',
          priority: 'high',
          category: 'mindfulness',
          isCompleted: false
        },
        {
          id: '2',
          title: 'Join Community Wellness Circle',
          description: 'Register for the weekly wellness circle starting next week',
          deadline: '2024-01-20',
          priority: 'medium',
          category: 'social',
          isCompleted: false
        },
        {
          id: '3',
          title: 'Optimize Sleep Routine',
          description: 'Create a consistent bedtime routine with 30-minute wind-down period',
          deadline: '2024-01-18',
          priority: 'medium',
          category: 'physical',
          isCompleted: false
        }
      ]
    }
  ]

  useEffect(() => {
    setReports(mockReports)
    if (mockReports.length > 0) {
      setActiveReport(mockReports[0])
    }
  }, [])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <ArrowUp className="w-4 h-4 text-green-500" />
      case 'declining': return <ArrowDown className="w-4 h-4 text-red-500" />
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />
      default: return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'declining': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'stable': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'negative': return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'actionable': return <Target className="w-4 h-4 text-blue-500" />
      case 'neutral': return <Minus className="w-4 h-4 text-gray-500" />
      default: return <Minus className="w-4 h-4 text-gray-500" />
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mindfulness': return <Brain className="w-4 h-4" />
      case 'social': return <Users className="w-4 h-4" />
      case 'physical': return <Activity className="w-4 h-4" />
      case 'cognitive': return <Brain className="w-4 h-4" />
      case 'emotional': return <Heart className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const generateReport = () => {
    toast.success('Generating new progress report...')
    // Simulate report generation
    setTimeout(() => {
      toast.success('Progress report generated successfully!')
    }, 2000)
  }

  const exportReport = (report: ProgressReport) => {
    toast.success(`Exporting ${report.period} progress report...`)
    // Simulate export
    setTimeout(() => {
      toast.success('Report exported successfully!')
    }, 1500)
  }

  const shareReport = (report: ProgressReport) => {
    toast.success(`Sharing ${report.period} progress report...`)
    // Simulate sharing
    setTimeout(() => {
      toast.success('Report shared successfully!')
    }, 1000)
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mood Progress Reports</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detailed analytics with actionable insights for emotional growth
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={generateReport}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Categories</option>
                <option value="mindfulness">Mindfulness</option>
                <option value="social">Social</option>
                <option value="physical">Physical</option>
                <option value="cognitive">Cognitive</option>
                <option value="emotional">Emotional</option>
              </select>
              <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {['overview', 'detailed', 'comparison'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as any)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === mode
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Report Overview */}
            {activeReport && viewMode === 'overview' && (
              <div className="space-y-6">
                {/* Score Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Overall Score</h3>
                      <div className={`px-2 py-1 text-xs font-medium rounded-full ${getTrendColor(activeReport.trend)}`}>
                        {getTrendIcon(activeReport.trend)}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {activeReport.overallScore}/10
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className={`${activeReport.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {activeReport.change >= 0 ? '+' : ''}{activeReport.change.toFixed(1)}%
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">vs previous period</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Insights</h3>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {activeReport.insights.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Actionable insights identified
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommendations</h3>
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                      {activeReport.recommendations.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Personalized recommendations
                    </div>
                  </div>
                </div>

                {/* Key Insights */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeReport.insights.slice(0, 4).map((insight) => (
                      <div
                        key={insight.id}
                        className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4"
                      >
                        <div className="flex items-start space-x-3">
                          {getInsightIcon(insight.type)}
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">{insight.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{insight.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                insight.impact === 'high' ? 'text-red-600 bg-red-100 dark:bg-red-900/30' :
                                insight.impact === 'medium' ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30' :
                                'text-green-600 bg-green-100 dark:bg-green-900/30'
                              }`}>
                                {insight.impact} impact
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{insight.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Recommendations</h3>
                  <div className="space-y-3">
                    {activeReport.recommendations
                      .filter(rec => rec.priority === 'high')
                      .slice(0, 3)
                      .map((recommendation) => (
                        <div
                          key={recommendation.id}
                          className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4"
                        >
                          <div className="flex items-start space-x-3">
                            {getCategoryIcon(recommendation.category)}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-gray-900 dark:text-white">{recommendation.title}</h4>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(recommendation.priority)}`}>
                                  {recommendation.priority}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{recommendation.description}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                                <span>⏱️ {recommendation.estimatedTime}min</span>
                                <span>📊 {recommendation.expectedImpact}/10 impact</span>
                                <span className="capitalize">{recommendation.difficulty}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Detailed View */}
            {activeReport && viewMode === 'detailed' && (
              <div className="space-y-6">
                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeReport.achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{achievement.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {formatDate(achievement.date)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Challenges & Coping Strategies</h3>
                  <div className="space-y-4">
                    {activeReport.challenges.map((challenge) => (
                      <div
                        key={challenge.id}
                        className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">{challenge.title}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            challenge.severity === 'severe' ? 'text-red-600 bg-red-100 dark:bg-red-900/30' :
                            challenge.severity === 'moderate' ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30' :
                            'text-green-600 bg-green-100 dark:bg-green-900/30'
                          }`}>
                            {challenge.severity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{challenge.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                          <span>📅 {challenge.frequency}x this period</span>
                          <span>📊 {challenge.impact}/10 impact</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Coping Strategies:</p>
                          <div className="flex flex-wrap gap-2">
                            {challenge.copingStrategies.map((strategy, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                              >
                                {strategy}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Steps */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Next Steps</h3>
                  <div className="space-y-3">
                    {activeReport.nextSteps.map((step) => (
                      <div
                        key={step.id}
                        className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4"
                      >
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={step.isCompleted}
                            onChange={() => {
                              // Toggle completion
                              setActiveReport(prev => prev ? {
                                ...prev,
                                nextSteps: prev.nextSteps.map(s => 
                                  s.id === step.id ? { ...s, isCompleted: !s.isCompleted } : s
                                )
                              } : null)
                            }}
                            className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className={`font-medium ${step.isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                                {step.title}
                              </h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(step.priority)}`}>
                                {step.priority}
                              </span>
                            </div>
                            <p className={`text-sm ${step.isCompleted ? 'text-gray-500' : 'text-gray-600 dark:text-gray-400'}`}>
                              {step.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <span>📅 Due: {formatDate(step.deadline)}</span>
                              <span className="capitalize">{step.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {activeReport && (
              <div className="flex items-center justify-center space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => exportReport(activeReport)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Report</span>
                </button>
                <button
                  onClick={() => shareReport(activeReport)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Report</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
} 