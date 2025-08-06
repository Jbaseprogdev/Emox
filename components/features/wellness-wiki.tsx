'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Plus, X, Edit3, Trash2, MoreHorizontal,
  Search, Filter, Share2, Download, Eye, EyeOff,
  Users, Heart, Brain, Star, Target, Clock, Calendar,
  Tag, Bookmark, MessageCircle, ThumbsUp, BookOpenCheck
} from 'lucide-react'
import toast from 'react-hot-toast'

interface WellnessWikiProps {
  onClose: () => void
  currentUser?: any
}

interface WikiPage {
  id: string
  title: string
  content: string
  category: 'meditation' | 'nutrition' | 'exercise' | 'mental-health' | 'sleep' | 'stress-management' | 'mindfulness' | 'custom'
  tags: string[]
  author: string
  createdAt: string
  updatedAt: string
  isPublic: boolean
  collaborators: string[]
  likes: number
  views: number
  moodTags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  timeRequired: number
  wellnessBenefits: string[]
  relatedPages: string[]
}

interface WikiCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  pageCount: number
}

export function WellnessWiki({ onClose, currentUser }: WellnessWikiProps) {
  const [pages, setPages] = useState<WikiPage[]>([])
  const [categories, setCategories] = useState<WikiCategory[]>([])
  const [activePage, setActivePage] = useState<WikiPage | null>(null)
  const [showCreatePage, setShowCreatePage] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'mood'>('grid')
  const [isEditing, setIsEditing] = useState(false)

  const mockPages: WikiPage[] = [
    {
      id: '1',
      title: 'Morning Meditation Guide',
      content: `# Morning Meditation Guide

## Introduction
Start your day with intention and mindfulness through this comprehensive morning meditation guide.

## Benefits
- Reduces stress and anxiety
- Improves focus and concentration
- Sets positive tone for the day
- Enhances emotional regulation

## Step-by-Step Process

### 1. Find Your Space
Choose a quiet, comfortable space where you won't be disturbed for 10-20 minutes.

### 2. Get Comfortable
Sit in a comfortable position with your back straight and hands resting gently.

### 3. Focus on Breath
- Close your eyes
- Take deep breaths in through your nose
- Exhale slowly through your mouth
- Focus on the sensation of breathing

### 4. Body Scan
Starting from your toes, slowly scan your body for any tension and release it.

### 5. Mindful Awareness
When thoughts arise, acknowledge them without judgment and return to your breath.

## Tips for Success
- Start with just 5 minutes and gradually increase
- Be consistent with timing
- Don't judge your meditation experience
- Practice self-compassion

## Related Practices
- Evening reflection
- Mindful walking
- Gratitude journaling`,
      category: 'meditation',
      tags: ['meditation', 'morning', 'mindfulness', 'stress-relief'],
      author: 'Sarah Chen',
      createdAt: '2024-01-10T08:00:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      isPublic: true,
      collaborators: ['Mike Johnson', 'Emma Thompson'],
      likes: 45,
      views: 234,
      moodTags: ['calm', 'focused', 'peaceful'],
      difficulty: 'beginner',
      timeRequired: 15,
      wellnessBenefits: ['Stress reduction', 'Improved focus', 'Emotional balance', 'Better sleep'],
      relatedPages: ['Evening Reflection', 'Breathing Techniques', 'Mindful Walking']
    },
    {
      id: '2',
      title: 'Stress Management Techniques',
      content: `# Stress Management Techniques

## Understanding Stress
Stress is a natural response to challenges, but chronic stress can impact our health and well-being.

## Immediate Relief Techniques

### 1. Deep Breathing
- 4-7-8 breathing technique
- Box breathing
- Diaphragmatic breathing

### 2. Progressive Muscle Relaxation
Systematically tense and release muscle groups to reduce physical tension.

### 3. Grounding Techniques
- 5-4-3-2-1 sensory exercise
- Mindful observation
- Body awareness

## Long-term Strategies

### 1. Regular Exercise
- Cardiovascular activities
- Strength training
- Yoga and stretching

### 2. Healthy Sleep Habits
- Consistent sleep schedule
- Sleep hygiene practices
- Relaxation before bed

### 3. Social Support
- Connect with friends and family
- Join support groups
- Seek professional help when needed

## When to Seek Help
- Persistent stress symptoms
- Difficulty functioning
- Physical health concerns`,
      category: 'stress-management',
      tags: ['stress', 'anxiety', 'relaxation', 'coping'],
      author: 'Dr. Emma Thompson',
      createdAt: '2024-01-08T14:00:00Z',
      updatedAt: '2024-01-12T16:45:00Z',
      isPublic: true,
      collaborators: ['Sarah Chen'],
      likes: 67,
      views: 456,
      moodTags: ['anxious', 'overwhelmed', 'tension'],
      difficulty: 'intermediate',
      timeRequired: 20,
      wellnessBenefits: ['Reduced anxiety', 'Better sleep', 'Improved mood', 'Enhanced resilience'],
      relatedPages: ['Breathing Exercises', 'Sleep Hygiene', 'Mindfulness Practices']
    },
    {
      id: '3',
      title: 'Mindful Eating Guide',
      content: `# Mindful Eating Guide

## What is Mindful Eating?
Mindful eating involves paying full attention to the experience of eating and drinking.

## Benefits
- Better digestion
- Weight management
- Reduced emotional eating
- Enhanced enjoyment of food

## Practice Steps

### 1. Before Eating
- Check in with your hunger levels
- Express gratitude for your food
- Take a moment to breathe

### 2. During the Meal
- Eat slowly and savor each bite
- Notice flavors, textures, and aromas
- Put down utensils between bites
- Listen to your body's signals

### 3. After Eating
- Reflect on how you feel
- Notice satisfaction levels
- Practice gratitude

## Common Challenges
- Distractions while eating
- Emotional eating triggers
- Time constraints
- Social pressure

## Tips for Success
- Start with one meal per day
- Remove distractions
- Practice portion awareness
- Be patient with yourself`,
      category: 'nutrition',
      tags: ['nutrition', 'mindful-eating', 'health', 'wellness'],
      author: 'Mike Johnson',
      createdAt: '2024-01-05T12:00:00Z',
      updatedAt: '2024-01-10T09:15:00Z',
      isPublic: true,
      collaborators: [],
      likes: 34,
      views: 189,
      moodTags: ['mindful', 'present', 'grateful'],
      difficulty: 'beginner',
      timeRequired: 30,
      wellnessBenefits: ['Better digestion', 'Weight management', 'Reduced stress', 'Enhanced enjoyment'],
      relatedPages: ['Nutrition Basics', 'Emotional Eating', 'Gratitude Practices']
    }
  ]

  const mockCategories: WikiCategory[] = [
    {
      id: 'meditation',
      name: 'Meditation',
      description: 'Guided practices and techniques for mindfulness',
      icon: <Brain className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      pageCount: 12
    },
    {
      id: 'nutrition',
      name: 'Nutrition',
      description: 'Healthy eating and mindful nutrition',
      icon: <Heart className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
      pageCount: 8
    },
    {
      id: 'exercise',
      name: 'Exercise',
      description: 'Physical wellness and movement',
      icon: <Target className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      pageCount: 15
    },
    {
      id: 'mental-health',
      name: 'Mental Health',
      description: 'Emotional well-being and psychological support',
      icon: <Star className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500',
      pageCount: 20
    },
    {
      id: 'sleep',
      name: 'Sleep',
      description: 'Sleep hygiene and rest optimization',
      icon: <Clock className="w-5 h-5" />,
      color: 'from-indigo-500 to-purple-500',
      pageCount: 6
    },
    {
      id: 'stress-management',
      name: 'Stress Management',
      description: 'Coping strategies and relaxation techniques',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'from-red-500 to-pink-500',
      pageCount: 18
    }
  ]

  useEffect(() => {
    setPages(mockPages)
    setCategories(mockCategories)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meditation': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      case 'nutrition': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'exercise': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'mental-health': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'sleep': return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30'
      case 'stress-management': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
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

  const filteredPages = pages.filter(page => {
    const categoryMatch = selectedCategory === 'all' || page.category === selectedCategory
    const searchMatch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       page.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       page.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return categoryMatch && searchMatch
  })

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
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Wellness Wiki</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Collaborative wellness knowledge and custom pages
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCreatePage(true)}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
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
                  placeholder="Search wellness articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {['grid', 'list', 'mood'].map((mode) => (
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

            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-3`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{category.description}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{category.pageCount} pages</span>
                </button>
              ))}
            </div>

            {/* Pages Grid */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPages.map((page) => (
                  <div
                    key={page.id}
                    className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setActivePage(page)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{page.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                          {page.content.substring(0, 150)}...
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(page.category)}`}>
                          {page.category.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(page.difficulty)}`}>
                          {page.difficulty}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {page.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>⏱️ {page.timeRequired}min</span>
                        <span>👁️ {page.views} views</span>
                        <span>❤️ {page.likes} likes</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          By {page.author}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(page.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Mood-Based View */}
            {viewMode === 'mood' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mood-Based Wellness Articles</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPages.map((page) => (
                    <div
                      key={page.id}
                      className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700"
                      onClick={() => setActivePage(page)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{page.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(page.category)}`}>
                          {page.category.replace('-', ' ')}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Mood Tags:</p>
                          <div className="flex flex-wrap gap-1">
                            {page.moodTags.map((mood, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-xs text-indigo-700 dark:text-indigo-300 rounded-full"
                              >
                                {mood}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Wellness Benefits:</p>
                          <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                            {page.wellnessBenefits.slice(0, 3).map((benefit, index) => (
                              <li key={index}>• {benefit}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                          <span>⏱️ {page.timeRequired}min</span>
                          <span>📊 {page.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Page Detail Modal */}
            <AnimatePresence>
              {activePage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                  onClick={() => setActivePage(null)}
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
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{activePage.title}</h2>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(activePage.category)}`}>
                              {activePage.category.replace('-', ' ')}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(activePage.difficulty)}`}>
                              {activePage.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setIsEditing(!isEditing)}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActivePage(null)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                      <div className="prose prose-gray dark:prose-invert max-w-none">
                        <div className="whitespace-pre-wrap text-gray-900 dark:text-white">
                          {activePage.content}
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Wellness Benefits</h4>
                            <ul className="space-y-2">
                              {activePage.wellnessBenefits.map((benefit, index) => (
                                <li key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                  <Heart className="w-4 h-4 text-green-500" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Related Pages</h4>
                            <div className="space-y-2">
                              {activePage.relatedPages.map((relatedPage, index) => (
                                <div key={index} className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 cursor-pointer">
                                  {relatedPage}
                                </div>
                              ))}
                            </div>
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