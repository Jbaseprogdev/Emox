'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target, Plus, X, Edit3, Trash2, MoreHorizontal, CheckCircle, Clock, Star, Heart,
  Brain, Users, MessageCircle, Filter, Search, Eye, EyeOff, Share2, Download, Calendar,
  TrendingUp, AlertCircle, Award, Zap, BookOpen, Activity, Settings, Minus
} from 'lucide-react'
import toast from 'react-hot-toast'

interface MindfulGoalsTrackerProps {
  onClose: () => void
  currentUser?: any
}

interface WellnessGoal {
  id: string
  title: string
  description: string
  category: 'emotional' | 'social' | 'physical' | 'cognitive' | 'spiritual' | 'professional'
  type: 'habit' | 'milestone' | 'skill' | 'lifestyle' | 'relationship'
  targetValue: number
  currentValue: number
  unit: string
  deadline: string
  priority: 'high' | 'medium' | 'low'
  status: 'not_started' | 'in_progress' | 'completed' | 'paused'
  progress: number
  kpis: KPI[]
  milestones: Milestone[]
  habits: Habit[]
  reflections: Reflection[]
  createdAt: string
  updatedAt: string
}

interface KPI {
  id: string
  name: string
  description: string
  target: number
  current: number
  unit: string
  trend: 'improving' | 'declining' | 'stable'
  lastUpdated: string
}

interface Milestone {
  id: string
  title: string
  description: string
  targetDate: string
  isCompleted: boolean
  completedDate?: string
  celebration: string
}

interface Habit {
  id: string
  name: string
  description: string
  frequency: 'daily' | 'weekly' | 'monthly'
  streak: number
  bestStreak: number
  lastCompleted: string
  isCompletedToday: boolean
}

interface Reflection {
  id: string
  date: string
  content: string
  mood: number
  insights: string[]
  challenges: string[]
  nextSteps: string[]
}

export function MindfulGoalsTracker({ onClose, currentUser }: MindfulGoalsTrackerProps) {
  const [goals, setGoals] = useState<WellnessGoal[]>([])
  const [activeGoal, setActiveGoal] = useState<WellnessGoal | null>(null)
  const [showCreateGoal, setShowCreateGoal] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'timeline'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const mockGoals: WellnessGoal[] = [
    {
      id: '1',
      title: 'Emotional Resilience Mastery',
      description: 'Build emotional resilience through daily mindfulness practices and stress management techniques',
      category: 'emotional',
      type: 'skill',
      targetValue: 8,
      currentValue: 6.5,
      unit: '/10 resilience score',
      deadline: '2024-03-15',
      priority: 'high',
      status: 'in_progress',
      progress: 65,
      kpis: [
        {
          id: '1',
          name: 'Stress Recovery Time',
          description: 'Time to recover from stressful situations',
          target: 30,
          current: 45,
          unit: 'minutes',
          trend: 'improving',
          lastUpdated: '2024-01-15'
        },
        {
          id: '2',
          name: 'Emotional Awareness',
          description: 'Ability to identify and label emotions',
          target: 9,
          current: 7,
          unit: '/10 score',
          trend: 'improving',
          lastUpdated: '2024-01-15'
        },
        {
          id: '3',
          name: 'Mindfulness Consistency',
          description: 'Daily mindfulness practice adherence',
          target: 90,
          current: 75,
          unit: '%',
          trend: 'stable',
          lastUpdated: '2024-01-15'
        }
      ],
      milestones: [
        {
          id: '1',
          title: 'Complete 30-Day Mindfulness Challenge',
          description: 'Practice mindfulness for 30 consecutive days',
          targetDate: '2024-02-15',
          isCompleted: false,
          celebration: '🎉 Mindfulness Warrior Achievement!'
        },
        {
          id: '2',
          title: 'Stress Recovery Under 30 Minutes',
          description: 'Reduce stress recovery time to under 30 minutes',
          targetDate: '2024-02-28',
          isCompleted: false,
          celebration: '⚡ Quick Recovery Master!'
        },
        {
          id: '3',
          title: 'Emotional Awareness Score 9/10',
          description: 'Achieve high emotional awareness and labeling skills',
          targetDate: '2024-03-15',
          isCompleted: false,
          celebration: '🧠 Emotional Intelligence Expert!'
        }
      ],
      habits: [
        {
          id: '1',
          name: 'Morning Meditation',
          description: '10-minute guided meditation session',
          frequency: 'daily',
          streak: 15,
          bestStreak: 15,
          lastCompleted: '2024-01-15',
          isCompletedToday: true
        },
        {
          id: '2',
          name: 'Emotion Journaling',
          description: 'Record and reflect on daily emotions',
          frequency: 'daily',
          streak: 12,
          bestStreak: 12,
          lastCompleted: '2024-01-15',
          isCompletedToday: true
        },
        {
          id: '3',
          name: 'Breathing Exercises',
          description: '5-minute breathing practice during stress',
          frequency: 'daily',
          streak: 8,
          bestStreak: 8,
          lastCompleted: '2024-01-15',
          isCompletedToday: false
        }
      ],
      reflections: [
        {
          id: '1',
          date: '2024-01-15',
          content: 'Made significant progress in recognizing stress triggers early. The morning meditation routine has been transformative.',
          mood: 8,
          insights: ['Stress triggers are more predictable than I thought', 'Morning routine sets positive tone for entire day'],
          challenges: ['Still struggling with evening stress management', 'Need to improve consistency on weekends'],
          nextSteps: ['Add evening wind-down routine', 'Create weekend mindfulness schedule']
        }
      ],
      createdAt: '2024-01-01T08:00:00Z',
      updatedAt: '2024-01-15T16:30:00Z'
    },
    {
      id: '2',
      title: 'Social Wellness Enhancement',
      description: 'Strengthen social connections and build meaningful relationships',
      category: 'social',
      type: 'lifestyle',
      targetValue: 10,
      currentValue: 7,
      unit: 'meaningful connections',
      deadline: '2024-04-01',
      priority: 'medium',
      status: 'in_progress',
      progress: 70,
      kpis: [
        {
          id: '4',
          name: 'Social Interactions',
          description: 'Weekly meaningful social interactions',
          target: 5,
          current: 3,
          unit: 'interactions/week',
          trend: 'improving',
          lastUpdated: '2024-01-15'
        },
        {
          id: '5',
          name: 'Community Engagement',
          description: 'Active participation in community activities',
          target: 80,
          current: 60,
          unit: '%',
          trend: 'stable',
          lastUpdated: '2024-01-15'
        }
      ],
      milestones: [
        {
          id: '4',
          title: 'Join Wellness Community',
          description: 'Become an active member of the wellness community',
          targetDate: '2024-02-01',
          isCompleted: true,
          completedDate: '2024-01-10',
          celebration: '👥 Community Champion!'
        }
      ],
      habits: [
        {
          id: '4',
          name: 'Weekly Check-ins',
          description: 'Reach out to 3 friends or family members',
          frequency: 'weekly',
          streak: 4,
          bestStreak: 4,
          lastCompleted: '2024-01-14',
          isCompletedToday: false
        }
      ],
      reflections: [],
      createdAt: '2024-01-05T10:00:00Z',
      updatedAt: '2024-01-15T14:20:00Z'
    }
  ]

  useEffect(() => {
    setGoals(mockGoals)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'emotional': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      case 'social': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'physical': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'cognitive': return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30'
      case 'spiritual': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'professional': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'emotional': return <Heart className="w-4 h-4" />
      case 'social': return <Users className="w-4 h-4" />
      case 'physical': return <Activity className="w-4 h-4" />
      case 'cognitive': return <Brain className="w-4 h-4" />
      case 'spiritual': return <Star className="w-4 h-4" />
      case 'professional': return <Target className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'in_progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'paused': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'not_started': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'declining': return <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />
      default: return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const completeHabit = (goalId: string, habitId: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? {
            ...goal,
            habits: goal.habits.map(habit => 
              habit.id === habitId 
                ? { 
                    ...habit, 
                    isCompletedToday: true, 
                    streak: habit.streak + 1,
                    bestStreak: Math.max(habit.bestStreak, habit.streak + 1),
                    lastCompleted: new Date().toISOString()
                  }
                : habit
            )
          }
        : goal
    ))
    toast.success('Habit completed! Keep up the great work!')
  }

  const completeMilestone = (goalId: string, milestoneId: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? {
            ...goal,
            milestones: goal.milestones.map(milestone => 
              milestone.id === milestoneId 
                ? { 
                    ...milestone, 
                    isCompleted: true,
                    completedDate: new Date().toISOString()
                  }
                : milestone
            )
          }
        : goal
    ))
    toast.success('Milestone achieved! 🎉')
  }

  const filteredGoals = goals.filter(goal => {
    const categoryMatch = filterCategory === 'all' || goal.category === filterCategory
    const statusMatch = filterStatus === 'all' || goal.status === filterStatus
    const searchMatch = goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       goal.description.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && statusMatch && searchMatch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
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
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mindful Goals Tracker</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Emotional KPIs and wellness goal management
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCreateGoal(true)}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
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
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search goals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Categories</option>
                <option value="emotional">Emotional</option>
                <option value="social">Social</option>
                <option value="physical">Physical</option>
                <option value="cognitive">Cognitive</option>
                <option value="spiritual">Spiritual</option>
                <option value="professional">Professional</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
              </select>
              <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {['grid', 'list', 'timeline'].map((mode) => (
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

            {/* Goals Grid */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setActiveGoal(goal)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white">
                          {getCategoryIcon(goal.category)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(goal.category)}`}>
                              {goal.category}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(goal.status)}`}>
                              {goal.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(goal.priority)}`}>
                        {goal.priority}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{goal.description}</p>

                    <div className="space-y-3">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Current Value */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Current:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {goal.currentValue} {goal.unit}
                        </span>
                      </div>

                      {/* Deadline */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Deadline:</span>
                        <span className={`font-medium ${
                          getDaysUntilDeadline(goal.deadline) < 7 ? 'text-red-600' : 'text-gray-900 dark:text-white'
                        }`}>
                          {formatDate(goal.deadline)}
                        </span>
                      </div>

                      {/* KPIs Summary */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">KPIs:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {goal.kpis.length} tracked
                        </span>
                      </div>

                      {/* Habits Summary */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Habits:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {goal.habits.filter(h => h.isCompletedToday).length}/{goal.habits.length} today
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Goal Detail Modal */}
            <AnimatePresence>
              {activeGoal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                  onClick={() => setActiveGoal(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white">
                          {getCategoryIcon(activeGoal.category)}
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{activeGoal.title}</h2>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(activeGoal.category)}`}>
                              {activeGoal.category}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activeGoal.status)}`}>
                              {activeGoal.status.replace('_', ' ')}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(activeGoal.priority)}`}>
                              {activeGoal.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveGoal(null)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{activeGoal.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* KPIs */}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Performance Indicators</h4>
                          <div className="space-y-3">
                            {activeGoal.kpis.map((kpi) => (
                              <div key={kpi.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-medium text-gray-900 dark:text-white">{kpi.name}</h5>
                                  {getTrendIcon(kpi.trend)}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{kpi.description}</p>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    {kpi.current} / {kpi.target} {kpi.unit}
                                  </span>
                                  <span className="text-gray-500 dark:text-gray-400">
                                    {formatDate(kpi.lastUpdated)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Habits */}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Daily Habits</h4>
                          <div className="space-y-3">
                            {activeGoal.habits.map((habit) => (
                              <div key={habit.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-medium text-gray-900 dark:text-white">{habit.name}</h5>
                                  <button
                                    onClick={() => completeHabit(activeGoal.id, habit.id)}
                                    disabled={habit.isCompletedToday}
                                    className={`p-2 rounded-lg transition-colors ${
                                      habit.isCompletedToday
                                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30'
                                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-600 dark:text-gray-400'
                                    }`}
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{habit.description}</p>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    🔥 {habit.streak} day streak
                                  </span>
                                  <span className="text-gray-500 dark:text-gray-400">
                                    {habit.frequency}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Milestones */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Milestones</h4>
                        <div className="space-y-3">
                          {activeGoal.milestones.map((milestone) => (
                            <div key={milestone.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900 dark:text-white">{milestone.title}</h5>
                                <button
                                  onClick={() => completeMilestone(activeGoal.id, milestone.id)}
                                  disabled={milestone.isCompleted}
                                  className={`p-2 rounded-lg transition-colors ${
                                    milestone.isCompleted
                                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30'
                                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-600 dark:text-gray-400'
                                  }`}
                                >
                                  <Award className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{milestone.description}</p>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Due: {formatDate(milestone.targetDate)}
                                </span>
                                {milestone.isCompleted && (
                                  <span className="text-green-600 font-medium">Completed!</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 