'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Plus, X, Edit3, Trash2, MoreHorizontal, Download, Share2,
  Heart, Brain, Star, Target, Clock, Users, MessageCircle, Filter, Search,
  Eye, EyeOff, Copy, CheckCircle, Bookmark, ThumbsUp, Calendar, Zap
} from 'lucide-react'
import toast from 'react-hot-toast'

interface TemplateGalleryProps {
  onClose: () => void
  currentUser?: any
}

interface Template {
  id: string
  name: string
  description: string
  category: 'journal' | 'ritual' | 'reflection' | 'meditation' | 'exercise' | 'social'
  type: 'daily' | 'weekly' | 'monthly' | 'special' | 'custom'
  content: string
  prompts: string[]
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  moodTags: string[]
  author: string
  createdAt: string
  downloads: number
  likes: number
  rating: number
  isPublic: boolean
  isFeatured: boolean
  preview: string
  instructions: string[]
  benefits: string[]
}

export function TemplateGallery({ onClose, currentUser }: TemplateGalleryProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null)
  const [showCreateTemplate, setShowCreateTemplate] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'featured'>('grid')
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'rating'>('popular')

  const mockTemplates: Template[] = [
    {
      id: '1',
      name: 'Morning Gratitude Journal',
      description: 'Start your day with gratitude and positive reflection',
      category: 'journal',
      type: 'daily',
      content: `# Morning Gratitude Journal

## Today's Date: {{date}}

### 1. Gratitude Reflection
What are three things you're grateful for today?

1. 
2. 
3. 

### 2. Morning Intentions
What would you like to accomplish today?

- 
- 
- 

### 3. Energy Check-in
How are you feeling this morning? (1-10 scale)
Energy Level: ___
Mood: ___

### 4. Positive Affirmation
Write a positive statement about yourself:

"I am..."

### 5. Daily Focus
What will be your main focus today?

### 6. Self-Care Reminder
What small act of self-care will you practice today?`,
      prompts: [
        'What are three things you\'re grateful for today?',
        'What would you like to accomplish today?',
        'How are you feeling this morning?',
        'Write a positive affirmation for yourself',
        'What will be your main focus today?',
        'What small act of self-care will you practice?'
      ],
      duration: 10,
      difficulty: 'beginner',
      tags: ['gratitude', 'morning', 'intention', 'self-care'],
      moodTags: ['grateful', 'hopeful', 'motivated'],
      author: 'Sarah Chen',
      createdAt: '2024-01-10T08:00:00Z',
      downloads: 234,
      likes: 89,
      rating: 4.8,
      isPublic: true,
      isFeatured: true,
      preview: 'Start your day with gratitude and positive reflection. This template helps you cultivate a positive mindset and set clear intentions for the day ahead.',
      instructions: [
        'Find a quiet space in the morning',
        'Take 3 deep breaths to center yourself',
        'Complete each section thoughtfully',
        'Be honest and authentic in your responses',
        'Review your intentions throughout the day'
      ],
      benefits: [
        'Increases positive mindset',
        'Improves focus and clarity',
        'Reduces stress and anxiety',
        'Enhances self-awareness',
        'Builds gratitude habit'
      ]
    },
    {
      id: '2',
      name: 'Evening Reflection Ritual',
      description: 'End your day with mindful reflection and learning',
      category: 'ritual',
      type: 'daily',
      content: `# Evening Reflection Ritual

## Date: {{date}}

### 1. Day Review
How was your day overall? (1-10 scale)
Rating: ___

### 2. High Points
What were the best moments of your day?

- 
- 
- 

### 3. Challenges
What challenges did you face today?

- 
- 
- 

### 4. Lessons Learned
What did you learn about yourself today?

### 5. Tomorrow's Preparation
What can you do to prepare for tomorrow?

### 6. Gratitude
What are you thankful for from today?

### 7. Self-Compassion
What would you like to say to yourself right now?

### 8. Sleep Intention
What intention do you want to carry into your sleep?`,
      prompts: [
        'How was your day overall?',
        'What were the best moments?',
        'What challenges did you face?',
        'What did you learn about yourself?',
        'How can you prepare for tomorrow?',
        'What are you thankful for?',
        'What would you like to say to yourself?',
        'What intention do you want for sleep?'
      ],
      duration: 15,
      difficulty: 'intermediate',
      tags: ['reflection', 'evening', 'learning', 'gratitude'],
      moodTags: ['contemplative', 'peaceful', 'grateful'],
      author: 'Dr. Emma Thompson',
      createdAt: '2024-01-08T20:00:00Z',
      downloads: 156,
      likes: 67,
      rating: 4.6,
      isPublic: true,
      isFeatured: false,
      preview: 'A comprehensive evening ritual to reflect on your day, learn from experiences, and prepare for tomorrow with intention.',
      instructions: [
        'Find a comfortable, quiet space',
        'Light a candle or use soft lighting',
        'Take time to reflect on each question',
        'Be honest and non-judgmental',
        'Practice self-compassion throughout'
      ],
      benefits: [
        'Improves self-awareness',
        'Enhances learning from experiences',
        'Reduces stress and anxiety',
        'Better sleep preparation',
        'Builds self-compassion'
      ]
    },
    {
      id: '3',
      name: 'Weekly Goal Setting & Review',
      description: 'Comprehensive weekly planning and reflection template',
      category: 'reflection',
      type: 'weekly',
      content: `# Weekly Goal Setting & Review

## Week of: {{week_start}} - {{week_end}}

### 1. Last Week's Review
What went well last week?
- 
- 
- 

What could have been better?
- 
- 
- 

### 2. This Week's Goals
Primary Goal: 
Secondary Goals:
- 
- 
- 

### 3. Daily Breakdown
Monday: 
Tuesday: 
Wednesday: 
Thursday: 
Friday: 
Weekend: 

### 4. Potential Obstacles
What might get in the way?
- 
- 
- 

### 5. Support Systems
Who or what will help you succeed?
- 
- 
- 

### 6. Self-Care Plan
How will you take care of yourself this week?
- 
- 
- 

### 7. Success Metrics
How will you measure success this week?

### 8. Weekly Affirmation
"I am capable of achieving my goals because..."`,
      prompts: [
        'What went well last week?',
        'What could have been better?',
        'What are your primary goals this week?',
        'What might get in the way?',
        'Who or what will help you succeed?',
        'How will you take care of yourself?',
        'How will you measure success?',
        'Complete the affirmation: "I am capable..."'
      ],
      duration: 30,
      difficulty: 'intermediate',
      tags: ['planning', 'goals', 'weekly', 'review'],
      moodTags: ['focused', 'determined', 'organized'],
      author: 'Mike Johnson',
      createdAt: '2024-01-05T10:00:00Z',
      downloads: 189,
      likes: 78,
      rating: 4.7,
      isPublic: true,
      isFeatured: true,
      preview: 'A comprehensive weekly template for setting goals, planning your week, and reviewing progress with intention.',
      instructions: [
        'Set aside dedicated time for planning',
        'Review last week\'s progress first',
        'Set realistic and achievable goals',
        'Break down goals into daily actions',
        'Plan for obstacles and support systems'
      ],
      benefits: [
        'Improves goal achievement',
        'Enhances time management',
        'Increases accountability',
        'Reduces overwhelm',
        'Builds planning skills'
      ]
    }
  ]

  useEffect(() => {
    setTemplates(mockTemplates)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'journal': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'ritual': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      case 'reflection': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'meditation': return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30'
      case 'exercise': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
      case 'social': return 'text-pink-600 bg-pink-100 dark:bg-pink-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'journal': return <BookOpen className="w-4 h-4" />
      case 'ritual': return <Star className="w-4 h-4" />
      case 'reflection': return <Brain className="w-4 h-4" />
      case 'meditation': return <Heart className="w-4 h-4" />
      case 'exercise': return <Target className="w-4 h-4" />
      case 'social': return <Users className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const downloadTemplate = (template: Template) => {
    // Simulate download
    toast.success(`Downloaded: ${template.name}`)
    setTemplates(prev => prev.map(t => 
      t.id === template.id ? { ...t, downloads: t.downloads + 1 } : t
    ))
  }

  const likeTemplate = (template: Template) => {
    setTemplates(prev => prev.map(t => 
      t.id === template.id ? { ...t, likes: t.likes + 1 } : t
    ))
    toast.success('Template liked!')
  }

  const filteredTemplates = templates.filter(template => {
    const categoryMatch = filterCategory === 'all' || template.category === filterCategory
    const typeMatch = filterType === 'all' || template.type === filterType
    const searchMatch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return categoryMatch && typeMatch && searchMatch
  })

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloads - a.downloads
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const featuredTemplates = sortedTemplates.filter(t => t.isFeatured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Template Gallery</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pre-built journal templates, rituals, and reflection prompts
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCreateTemplate(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
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
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Categories</option>
                <option value="journal">Journal</option>
                <option value="ritual">Ritual</option>
                <option value="reflection">Reflection</option>
                <option value="meditation">Meditation</option>
                <option value="exercise">Exercise</option>
                <option value="social">Social</option>
              </select>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Types</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="special">Special</option>
                <option value="custom">Custom</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="popular">Most Popular</option>
                <option value="recent">Most Recent</option>
                <option value="rating">Highest Rated</option>
              </select>
              <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {['grid', 'list', 'featured'].map((mode) => (
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

            {/* Featured Templates */}
            {viewMode === 'featured' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Featured Templates</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700"
                      onClick={() => setActiveTemplate(template)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                            {getCategoryIcon(template.category)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{template.name}</h4>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(template.category)}`}>
                                {template.category}
                              </span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(template.difficulty)}`}>
                                {template.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{template.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.preview}</p>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Benefits:</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            {template.benefits.slice(0, 3).map((benefit, index) => (
                              <li key={index}>• {benefit}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>⏱️ {template.duration}min</span>
                          <span>📥 {template.downloads} downloads</span>
                          <span>❤️ {template.likes} likes</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-xs text-blue-700 dark:text-blue-300 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Templates Grid */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setActiveTemplate(template)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                          {getCategoryIcon(template.category)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(template.category)}`}>
                              {template.category}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(template.difficulty)}`}>
                              {template.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      {template.isFeatured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>⏱️ {template.duration}min</span>
                        <span>📊 {template.rating} ★</span>
                        <span>👤 {template.author}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              downloadTemplate(template)
                            }}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <Download className="w-4 h-4 text-blue-500" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              likeTemplate(template)
                            }}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <Heart className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(template.createdAt)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {template.tags.slice(0, 3).map((tag, index) => (
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

            {/* Template Detail Modal */}
            <AnimatePresence>
              {activeTemplate && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                  onClick={() => setActiveTemplate(null)}
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
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                          {getCategoryIcon(activeTemplate.category)}
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{activeTemplate.name}</h2>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(activeTemplate.category)}`}>
                              {activeTemplate.category}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(activeTemplate.difficulty)}`}>
                              {activeTemplate.difficulty}
                            </span>
                            {activeTemplate.isFeatured && (
                              <span className="px-2 py-1 text-xs font-medium rounded-full text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => downloadTemplate(activeTemplate)}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActiveTemplate(null)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{activeTemplate.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Instructions</h4>
                          <ul className="space-y-2">
                            {activeTemplate.instructions.map((instruction, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                <span className="text-blue-500 font-medium">{index + 1}.</span>
                                <span>{instruction}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Benefits</h4>
                          <ul className="space-y-2">
                            {activeTemplate.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                <Heart className="w-4 h-4 text-green-500 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Template Preview</h4>
                        <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 p-4 max-h-64 overflow-y-auto">
                          <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {activeTemplate.content}
                          </pre>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Duration</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{activeTemplate.duration} minutes</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Rating</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{activeTemplate.rating} ★</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Downloads</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{activeTemplate.downloads}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Created</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{formatDate(activeTemplate.createdAt)}</p>
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