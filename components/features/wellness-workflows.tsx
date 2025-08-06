'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, Plus, X, Edit3, Trash2, MoreHorizontal, Play, Pause, Settings,
  Clock, Calendar, Bell, Heart, Brain, Target, Star, Users, MessageCircle,
  Filter, Search, Eye, EyeOff, Share2, Download, Copy, CheckCircle, AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

interface WellnessWorkflowsProps {
  onClose: () => void
  currentUser?: any
}

interface Workflow {
  id: string
  name: string
  description: string
  category: 'meditation' | 'exercise' | 'nutrition' | 'sleep' | 'social' | 'mindfulness' | 'custom'
  triggers: Trigger[]
  actions: Action[]
  isActive: boolean
  isPublic: boolean
  creator: string
  createdAt: string
  lastRun: string
  runCount: number
  successRate: number
  tags: string[]
  moodConditions: string[]
  timeConditions: string[]
}

interface Trigger {
  id: string
  type: 'time' | 'mood' | 'location' | 'activity' | 'health' | 'social'
  condition: string
  value: any
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'between'
}

interface Action {
  id: string
  type: 'notification' | 'meditation' | 'exercise' | 'journal' | 'social' | 'health_check' | 'custom'
  title: string
  description: string
  parameters: Record<string, any>
  delay?: number
}

export function WellnessWorkflows({ onClose, currentUser }: WellnessWorkflowsProps) {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null)
  const [showCreateWorkflow, setShowCreateWorkflow] = useState(false)
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'flow'>('grid')

  const mockWorkflows: Workflow[] = [
    {
      id: '1',
      name: 'Morning Wellness Routine',
      description: 'Automated morning wellness sequence with meditation and journaling',
      category: 'meditation',
      triggers: [
        {
          id: '1',
          type: 'time',
          condition: 'morning',
          value: '07:00',
          operator: 'equals'
        },
        {
          id: '2',
          type: 'mood',
          condition: 'stress_level',
          value: 5,
          operator: 'greater_than'
        }
      ],
      actions: [
        {
          id: '1',
          type: 'meditation',
          title: 'Start Guided Meditation',
          description: 'Begin 10-minute morning meditation session',
          parameters: {
            duration: 10,
            type: 'guided',
            theme: 'morning_energy'
          }
        },
        {
          id: '2',
          type: 'journal',
          title: 'Gratitude Journaling',
          description: 'Write three things you\'re grateful for',
          parameters: {
            prompt: 'What are three things you\'re grateful for today?',
            duration: 5
          },
          delay: 600
        }
      ],
      isActive: true,
      isPublic: true,
      creator: 'Sarah Chen',
      createdAt: '2024-01-10T08:00:00Z',
      lastRun: '2024-01-15T07:00:00Z',
      runCount: 45,
      successRate: 92,
      tags: ['morning', 'meditation', 'gratitude'],
      moodConditions: ['stressed', 'anxious', 'overwhelmed'],
      timeConditions: ['morning', 'before_work']
    },
    {
      id: '2',
      name: 'Stress Relief Protocol',
      description: 'Automated stress management when stress levels are high',
      category: 'mindfulness',
      triggers: [
        {
          id: '3',
          type: 'mood',
          condition: 'stress_level',
          value: 7,
          operator: 'greater_than'
        },
        {
          id: '4',
          type: 'activity',
          condition: 'work_session',
          value: 2,
          operator: 'greater_than'
        }
      ],
      actions: [
        {
          id: '3',
          type: 'notification',
          title: 'Stress Alert',
          description: 'Gentle reminder to take a break',
          parameters: {
            message: 'You\'ve been working hard. Time for a mindful break!',
            sound: 'gentle_chime'
          }
        },
        {
          id: '4',
          type: 'exercise',
          title: 'Quick Breathing Exercise',
          description: '2-minute breathing exercise for stress relief',
          parameters: {
            duration: 2,
            technique: 'box_breathing',
            guidance: true
          },
          delay: 300
        }
      ],
      isActive: true,
      isPublic: true,
      creator: 'Dr. Emma Thompson',
      createdAt: '2024-01-08T14:00:00Z',
      lastRun: '2024-01-15T14:30:00Z',
      runCount: 23,
      successRate: 87,
      tags: ['stress', 'breathing', 'work_balance'],
      moodConditions: ['stressed', 'overwhelmed', 'frustrated'],
      timeConditions: ['work_hours', 'afternoon']
    },
    {
      id: '3',
      name: 'Evening Wind-Down',
      description: 'Automated evening routine for better sleep preparation',
      category: 'sleep',
      triggers: [
        {
          id: '5',
          type: 'time',
          condition: 'evening',
          value: '21:00',
          operator: 'equals'
        }
      ],
      actions: [
        {
          id: '5',
          type: 'notification',
          title: 'Evening Wind-Down',
          description: 'Begin evening relaxation routine',
          parameters: {
            message: 'Time to start your evening wind-down routine',
            sound: 'soft_bell'
          }
        },
        {
          id: '6',
          type: 'meditation',
          title: 'Sleep Preparation Meditation',
          description: '15-minute meditation for better sleep',
          parameters: {
            duration: 15,
            type: 'guided',
            theme: 'sleep_preparation'
          },
          delay: 300
        },
        {
          id: '7',
          type: 'health_check',
          title: 'Sleep Readiness Check',
          description: 'Assess sleep readiness factors',
          parameters: {
            factors: ['screen_time', 'caffeine', 'exercise', 'stress'],
            recommendations: true
          },
          delay: 900
        }
      ],
      isActive: true,
      isPublic: false,
      creator: 'Mike Johnson',
      createdAt: '2024-01-05T20:00:00Z',
      lastRun: '2024-01-14T21:00:00Z',
      runCount: 12,
      successRate: 95,
      tags: ['sleep', 'evening', 'relaxation'],
      moodConditions: ['tired', 'wound_up', 'anxious'],
      timeConditions: ['evening', 'before_bed']
    }
  ]

  useEffect(() => {
    setWorkflows(mockWorkflows)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meditation': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      case 'exercise': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'nutrition': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'sleep': return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30'
      case 'social': return 'text-pink-600 bg-pink-100 dark:bg-pink-900/30'
      case 'mindfulness': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meditation': return <Brain className="w-4 h-4" />
      case 'exercise': return <Target className="w-4 h-4" />
      case 'nutrition': return <Heart className="w-4 h-4" />
      case 'sleep': return <Clock className="w-4 h-4" />
      case 'social': return <Users className="w-4 h-4" />
      case 'mindfulness': return <Star className="w-4 h-4" />
      default: return <Zap className="w-4 h-4" />
    }
  }

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'time': return <Clock className="w-4 h-4" />
      case 'mood': return <Heart className="w-4 h-4" />
      case 'location': return <Target className="w-4 h-4" />
      case 'activity': return <Zap className="w-4 h-4" />
      case 'health': return <Brain className="w-4 h-4" />
      case 'social': return <Users className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'notification': return <Bell className="w-4 h-4" />
      case 'meditation': return <Brain className="w-4 h-4" />
      case 'exercise': return <Target className="w-4 h-4" />
      case 'journal': return <MessageCircle className="w-4 h-4" />
      case 'social': return <Users className="w-4 h-4" />
      case 'health_check': return <Heart className="w-4 h-4" />
      default: return <Zap className="w-4 h-4" />
    }
  }

  const toggleWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.map(workflow => 
      workflow.id === workflowId 
        ? { ...workflow, isActive: !workflow.isActive }
        : workflow
    ))
    toast.success('Workflow status updated')
  }

  const filteredWorkflows = workflows.filter(workflow => {
    const categoryMatch = filterCategory === 'all' || workflow.category === filterCategory
    const searchMatch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       workflow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       workflow.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return categoryMatch && searchMatch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Wellness Workflows</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No-code automations for emotional wellness and habit building
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowWorkflowBuilder(true)}
              className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all duration-200"
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
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search workflows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Categories</option>
                <option value="meditation">Meditation</option>
                <option value="exercise">Exercise</option>
                <option value="nutrition">Nutrition</option>
                <option value="sleep">Sleep</option>
                <option value="social">Social</option>
                <option value="mindfulness">Mindfulness</option>
              </select>
              <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {['grid', 'list', 'flow'].map((mode) => (
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

            {/* Workflows Grid */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setActiveWorkflow(workflow)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                          {getCategoryIcon(workflow.category)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{workflow.name}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(workflow.category)}`}>
                            {workflow.category}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWorkflow(workflow.id)
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          workflow.isActive
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-600'
                        }`}
                      >
                        {workflow.isActive ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{workflow.description}</p>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Triggers:</p>
                        <div className="space-y-1">
                          {workflow.triggers.slice(0, 2).map((trigger) => (
                            <div key={trigger.id} className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                              {getTriggerIcon(trigger.type)}
                              <span>{trigger.condition}: {trigger.value}</span>
                            </div>
                          ))}
                          {workflow.triggers.length > 2 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              +{workflow.triggers.length - 2} more triggers
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Actions:</p>
                        <div className="space-y-1">
                          {workflow.actions.slice(0, 2).map((action) => (
                            <div key={action.id} className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                              {getActionIcon(action.type)}
                              <span>{action.title}</span>
                            </div>
                          ))}
                          {workflow.actions.length > 2 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              +{workflow.actions.length - 2} more actions
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>🔄 {workflow.runCount} runs</span>
                        <span>📊 {workflow.successRate}% success</span>
                        <span>👤 {workflow.creator}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {workflow.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Flow View */}
            {viewMode === 'flow' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Workflow Flow Diagrams</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredWorkflows.map((workflow) => (
                    <div
                      key={workflow.id}
                      className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-700"
                      onClick={() => setActiveWorkflow(workflow)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{workflow.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(workflow.category)}`}>
                          {workflow.category}
                        </span>
                      </div>

                      <div className="space-y-4">
                        {/* Triggers */}
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Triggers:</p>
                          <div className="space-y-2">
                            {workflow.triggers.map((trigger, index) => (
                              <div key={trigger.id} className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                  {getTriggerIcon(trigger.type)}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">{trigger.condition}</p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">{trigger.value}</p>
                                </div>
                                {index < workflow.triggers.length - 1 && (
                                  <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-2" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Actions:</p>
                          <div className="space-y-2">
                            {workflow.actions.map((action, index) => (
                              <div key={action.id} className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                  {getActionIcon(action.type)}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">{action.title}</p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">{action.description}</p>
                                </div>
                                {action.delay && (
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    +{action.delay}s
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Workflow Detail Modal */}
            <AnimatePresence>
              {activeWorkflow && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                  onClick={() => setActiveWorkflow(null)}
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
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                          {getCategoryIcon(activeWorkflow.category)}
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{activeWorkflow.name}</h2>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(activeWorkflow.category)}`}>
                              {activeWorkflow.category}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              activeWorkflow.isActive 
                                ? 'text-green-600 bg-green-100 dark:bg-green-900/30' 
                                : 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
                            }`}>
                              {activeWorkflow.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleWorkflow(activeWorkflow.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            activeWorkflow.isActive
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                              : 'bg-gray-100 dark:bg-gray-600 text-gray-600'
                          }`}
                        >
                          {activeWorkflow.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setActiveWorkflow(null)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{activeWorkflow.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Triggers</h4>
                          <div className="space-y-3">
                            {activeWorkflow.triggers.map((trigger) => (
                              <div key={trigger.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  {getTriggerIcon(trigger.type)}
                                  <span className="font-medium text-gray-900 dark:text-white">{trigger.condition}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {trigger.operator} {trigger.value}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Actions</h4>
                          <div className="space-y-3">
                            {activeWorkflow.actions.map((action) => (
                              <div key={action.id} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  {getActionIcon(action.type)}
                                  <span className="font-medium text-gray-900 dark:text-white">{action.title}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{action.description}</p>
                                {action.delay && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Delay: {action.delay} seconds
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Total Runs</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{activeWorkflow.runCount}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Success Rate</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{activeWorkflow.successRate}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Last Run</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{formatDate(activeWorkflow.lastRun)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Created</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{formatDate(activeWorkflow.createdAt)}</p>
                          </div>
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