'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckSquare, Square, Plus, X, Edit3, Trash2, MoreHorizontal,
  Calendar, Clock, Star, Users, MessageCircle, Heart, Brain,
  Target, TrendingUp, Filter, Search, SortAsc, SortDesc,
  Eye, EyeOff, Share2, Download, Archive, Tag, Flag
} from 'lucide-react'
import toast from 'react-hot-toast'

interface MindfulTaskBoardsProps {
  onClose: () => void
  currentUser?: any
}

interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in_progress' | 'completed' | 'mindful_pause'
  priority: 'low' | 'medium' | 'high' | 'mindful'
  emotion: string
  dueDate: string
  estimatedTime: number
  actualTime?: number
  tags: string[]
  mindfulnessNotes: string
  energyLevel: number
  focusRequired: number
  isCollaborative: boolean
  assignees: string[]
  createdAt: string
  completedAt?: string
}

interface Board {
  id: string
  name: string
  description: string
  color: string
  tasks: Task[]
  isShared: boolean
  collaborators: string[]
  mindfulnessTheme: string
}

export function MindfulTaskBoards({ onClose, currentUser }: MindfulTaskBoardsProps) {
  const [boards, setBoards] = useState<Board[]>([])
  const [activeBoard, setActiveBoard] = useState<string>('')
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [showCreateBoard, setShowCreateBoard] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterEmotion, setFilterEmotion] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'mindful'>('kanban')

  const mockBoards: Board[] = [
    {
      id: '1',
      name: 'Daily Wellness',
      description: 'Mindful daily tasks and self-care activities',
      color: 'from-green-500 to-emerald-500',
      tasks: [
        {
          id: '1',
          title: 'Morning Meditation',
          description: '10-minute guided meditation session',
          status: 'completed',
          priority: 'mindful',
          emotion: 'calm',
          dueDate: '2024-01-15T09:00:00Z',
          estimatedTime: 10,
          actualTime: 12,
          tags: ['meditation', 'morning', 'wellness'],
          mindfulnessNotes: 'Felt more centered and focused after this session',
          energyLevel: 8,
          focusRequired: 6,
          isCollaborative: false,
          assignees: [],
          createdAt: '2024-01-15T08:00:00Z',
          completedAt: '2024-01-15T09:12:00Z'
        },
        {
          id: '2',
          title: 'Journal Reflection',
          description: 'Write about today\'s emotional experiences',
          status: 'in_progress',
          priority: 'high',
          emotion: 'contemplative',
          dueDate: '2024-01-15T20:00:00Z',
          estimatedTime: 15,
          tags: ['journaling', 'reflection', 'emotional'],
          mindfulnessNotes: 'Need to process today\'s challenging conversation',
          energyLevel: 5,
          focusRequired: 8,
          isCollaborative: false,
          assignees: [],
          createdAt: '2024-01-15T08:00:00Z'
        }
      ],
      isShared: false,
      collaborators: [],
      mindfulnessTheme: 'daily-wellness'
    },
    {
      id: '2',
      name: 'Work-Life Balance',
      description: 'Professional tasks with mindfulness integration',
      color: 'from-blue-500 to-cyan-500',
      tasks: [
        {
          id: '3',
          title: 'Project Planning',
          description: 'Mindful approach to project timeline',
          status: 'todo',
          priority: 'medium',
          emotion: 'focused',
          dueDate: '2024-01-16T17:00:00Z',
          estimatedTime: 45,
          tags: ['work', 'planning', 'mindful'],
          mindfulnessNotes: 'Take breaks every 25 minutes for mindful breathing',
          energyLevel: 7,
          focusRequired: 9,
          isCollaborative: true,
          assignees: ['Sarah', 'Mike'],
          createdAt: '2024-01-15T10:00:00Z'
        }
      ],
      isShared: true,
      collaborators: ['Sarah', 'Mike', 'Emma'],
      mindfulnessTheme: 'work-balance'
    }
  ]

  useEffect(() => {
    setBoards(mockBoards)
    setActiveBoard(mockBoards[0]?.id || '')
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 dark:bg-gray-700'
      case 'in_progress': return 'bg-blue-100 dark:bg-blue-900/30'
      case 'completed': return 'bg-green-100 dark:bg-green-900/30'
      case 'mindful_pause': return 'bg-purple-100 dark:bg-purple-900/30'
      default: return 'bg-gray-100 dark:bg-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'mindful': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'calm': return <Heart className="w-4 h-4 text-green-500" />
      case 'focused': return <Target className="w-4 h-4 text-blue-500" />
      case 'contemplative': return <Brain className="w-4 h-4 text-purple-500" />
      case 'energized': return <Star className="w-4 h-4 text-yellow-500" />
      default: return <Heart className="w-4 h-4 text-gray-500" />
    }
  }

  const toggleTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setBoards(prev => prev.map(board => ({
      ...board,
      tasks: board.tasks.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus, completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined }
          : task
      )
    })))
    toast.success(`Task moved to ${newStatus.replace('_', ' ')}`)
  }

  const currentBoard = boards.find(board => board.id === activeBoard)
  const filteredTasks = currentBoard?.tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus
    const emotionMatch = filterEmotion === 'all' || task.emotion === filterEmotion
    const searchMatch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       task.description.toLowerCase().includes(searchQuery.toLowerCase())
    return statusMatch && emotionMatch && searchMatch
  }) || []

  const statusColumns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-50 dark:bg-gray-800' },
    { id: 'in_progress', title: 'In Progress', color: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 'mindful_pause', title: 'Mindful Pause', color: 'bg-purple-50 dark:bg-purple-900/20' },
    { id: 'completed', title: 'Completed', color: 'bg-green-50 dark:bg-green-900/20' }
  ]

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
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mindful Task Boards</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Emotion-aware task management with mindfulness integration
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCreateBoard(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
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
            {/* Board Selection */}
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
              {boards.map((board) => (
                <button
                  key={board.id}
                  onClick={() => setActiveBoard(board.id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 whitespace-nowrap ${
                    activeBoard === board.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${board.color}`} />
                  <span className="font-medium">{board.name}</span>
                  {board.isShared && <Users className="w-4 h-4" />}
                </button>
              ))}
            </div>

            {/* Filters and Search */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="mindful_pause">Mindful Pause</option>
                <option value="completed">Completed</option>
              </select>
              <select
                value={filterEmotion}
                onChange={(e) => setFilterEmotion(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Emotions</option>
                <option value="calm">Calm</option>
                <option value="focused">Focused</option>
                <option value="contemplative">Contemplative</option>
                <option value="energized">Energized</option>
              </select>
              <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {['kanban', 'list', 'mindful'].map((mode) => (
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

            {/* Kanban Board */}
            {viewMode === 'kanban' && (
              <div className="grid grid-cols-4 gap-6">
                {statusColumns.map((column) => {
                  const columnTasks = filteredTasks.filter(task => task.status === column.id)
                  return (
                    <div key={column.id} className={`rounded-xl p-4 ${column.color}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{column.title}</h3>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{columnTasks.length}</span>
                      </div>
                      <div className="space-y-3">
                        {columnTasks.map((task) => (
                          <motion.div
                            key={task.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                {task.status === 'completed' ? (
                                  <CheckSquare className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Square className="w-4 h-4 text-gray-400" />
                                )}
                                <h4 className="font-medium text-gray-900 dark:text-white text-sm">{task.title}</h4>
                              </div>
                              <div className="flex items-center space-x-1">
                                {getEmotionIcon(task.emotion)}
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                                  {task.priority}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{task.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                              <span>{task.estimatedTime}min</span>
                              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                            {task.mindfulnessNotes && (
                              <div className="mt-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded text-xs text-purple-700 dark:text-purple-300">
                                💭 {task.mindfulnessNotes}
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex items-center space-x-2">
                          {task.status === 'completed' ? (
                            <CheckSquare className="w-5 h-5 text-green-500" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-400" />
                          )}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getEmotionIcon(task.emotion)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-4">
                        <span>⏱️ {task.estimatedTime}min</span>
                        <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>
                        <span>⚡ Energy: {task.energyLevel}/10</span>
                        <span>🎯 Focus: {task.focusRequired}/10</span>
                      </div>
                      {task.isCollaborative && (
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{task.assignees.join(', ')}</span>
                        </div>
                      )}
                    </div>
                    {task.mindfulnessNotes && (
                      <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm text-purple-700 dark:text-purple-300">
                          💭 <strong>Mindfulness Note:</strong> {task.mindfulnessNotes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Mindful View */}
            {viewMode === 'mindful' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {getEmotionIcon(task.emotion)}
                        <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{task.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Energy Level</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < task.energyLevel ? 'bg-yellow-400' : 'bg-gray-200 dark:bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Focus Required</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < task.focusRequired ? 'bg-blue-400' : 'bg-gray-200 dark:bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {task.mindfulnessNotes && (
                      <div className="mt-4 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-sm text-purple-700 dark:text-purple-300">
                          💭 {task.mindfulnessNotes}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4 text-xs text-gray-600 dark:text-gray-400">
                      <span>⏱️ {task.estimatedTime}min</span>
                      <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
} 