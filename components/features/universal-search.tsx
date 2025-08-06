'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, X, Filter, Tag, Heart, Brain, Users, BookOpen, MessageCircle, Calendar,
  Target, Star, Clock, TrendingUp, Eye, EyeOff, Download, Share2, MoreHorizontal,
  ArrowRight, Hash, HashIcon, Sparkles, Zap, Activity, Settings
} from 'lucide-react'
import toast from 'react-hot-toast'

interface UniversalSearchProps {
  onClose: () => void
  currentUser?: any
}

interface SearchResult {
  id: string
  type: 'journal' | 'emotion' | 'goal' | 'habit' | 'community' | 'template' | 'workflow' | 'insight'
  title: string
  description: string
  content: string
  emotionTags: string[]
  wellnessTags: string[]
  category: string
  relevance: number
  lastUpdated: string
  author?: string
  stats?: {
    views?: number
    likes?: number
    shares?: number
  }
  preview: string
}

interface EmotionTag {
  name: string
  category: 'positive' | 'negative' | 'neutral'
  frequency: number
  color: string
}

interface SearchFilter {
  type: string[]
  emotion: string[]
  category: string[]
  dateRange: 'all' | 'today' | 'week' | 'month' | 'year'
  relevance: 'all' | 'high' | 'medium' | 'low'
}

export function UniversalSearch({ onClose, currentUser }: UniversalSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [activeFilters, setActiveFilters] = useState<SearchFilter>({
    type: [],
    emotion: [],
    category: [],
    dateRange: 'all',
    relevance: 'all'
  })
  const [showFilters, setShowFilters] = useState(false)
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'journal',
      title: 'Morning Gratitude Practice',
      description: 'Daily gratitude journal entry with positive reflections',
      content: 'Today I am grateful for the peaceful morning routine that sets the tone for my entire day...',
      emotionTags: ['grateful', 'peaceful', 'hopeful', 'content'],
      wellnessTags: ['gratitude', 'mindfulness', 'morning-routine', 'positive-thinking'],
      category: 'daily-wellness',
      relevance: 95,
      lastUpdated: '2024-01-15T08:00:00Z',
      author: 'Sarah Chen',
      stats: { views: 12, likes: 8, shares: 3 },
      preview: 'A reflection on morning gratitude practices and their impact on daily mood...'
    },
    {
      id: '2',
      type: 'emotion',
      title: 'Stress Management During Work',
      description: 'Emotion tracking entry during high-stress work period',
      content: 'Experienced high stress levels during the project deadline. Used breathing techniques...',
      emotionTags: ['stressed', 'overwhelmed', 'determined', 'relieved'],
      wellnessTags: ['stress-management', 'breathing', 'work-life-balance', 'coping-strategies'],
      category: 'work-wellness',
      relevance: 88,
      lastUpdated: '2024-01-14T16:30:00Z',
      author: 'Mike Johnson',
      stats: { views: 25, likes: 15, shares: 7 },
      preview: 'Documentation of stress management techniques during challenging work situations...'
    },
    {
      id: '3',
      type: 'goal',
      title: 'Emotional Resilience Building',
      description: 'Wellness goal focused on building emotional resilience',
      content: 'Goal: Build emotional resilience through daily mindfulness practices...',
      emotionTags: ['determined', 'focused', 'optimistic', 'committed'],
      wellnessTags: ['emotional-resilience', 'mindfulness', 'personal-growth', 'self-improvement'],
      category: 'personal-development',
      relevance: 92,
      lastUpdated: '2024-01-10T10:00:00Z',
      author: 'Emma Wilson',
      stats: { views: 18, likes: 12, shares: 5 },
      preview: 'A comprehensive goal for building emotional resilience through consistent practices...'
    },
    {
      id: '4',
      type: 'habit',
      title: 'Evening Wind-Down Routine',
      description: 'Daily habit for better sleep and relaxation',
      content: 'Habit: 30-minute evening wind-down routine including meditation and reading...',
      emotionTags: ['calm', 'relaxed', 'peaceful', 'content'],
      wellnessTags: ['sleep-hygiene', 'evening-routine', 'relaxation', 'meditation'],
      category: 'sleep-wellness',
      relevance: 85,
      lastUpdated: '2024-01-12T20:00:00Z',
      author: 'Alex Rodriguez',
      stats: { views: 30, likes: 20, shares: 10 },
      preview: 'A structured evening routine designed to promote better sleep and relaxation...'
    },
    {
      id: '5',
      type: 'community',
      title: 'Anxiety Support Group Discussion',
      description: 'Community discussion about anxiety management techniques',
      content: 'Group discussion about effective anxiety management strategies...',
      emotionTags: ['anxious', 'supported', 'hopeful', 'understood'],
      wellnessTags: ['anxiety-management', 'community-support', 'coping-strategies', 'mental-health'],
      category: 'community-support',
      relevance: 90,
      lastUpdated: '2024-01-13T14:00:00Z',
      author: 'Community',
      stats: { views: 45, likes: 28, shares: 12 },
      preview: 'A supportive community discussion about managing anxiety and finding effective coping strategies...'
    },
    {
      id: '6',
      type: 'template',
      title: 'Weekly Reflection Template',
      description: 'Pre-built template for weekly emotional reflection',
      content: 'Template includes prompts for weekly emotional review, achievements, challenges...',
      emotionTags: ['reflective', 'contemplative', 'grateful', 'hopeful'],
      wellnessTags: ['weekly-reflection', 'emotional-review', 'goal-setting', 'self-awareness'],
      category: 'templates',
      relevance: 87,
      lastUpdated: '2024-01-08T12:00:00Z',
      author: 'Dr. Emma Thompson',
      stats: { views: 60, likes: 35, shares: 18 },
      preview: 'A comprehensive weekly reflection template designed to promote emotional awareness and growth...'
    }
  ]

  const emotionTags: EmotionTag[] = [
    { name: 'grateful', category: 'positive', frequency: 45, color: 'text-green-600 bg-green-100' },
    { name: 'stressed', category: 'negative', frequency: 32, color: 'text-red-600 bg-red-100' },
    { name: 'peaceful', category: 'positive', frequency: 28, color: 'text-blue-600 bg-blue-100' },
    { name: 'anxious', category: 'negative', frequency: 25, color: 'text-orange-600 bg-orange-100' },
    { name: 'hopeful', category: 'positive', frequency: 22, color: 'text-purple-600 bg-purple-100' },
    { name: 'overwhelmed', category: 'negative', frequency: 18, color: 'text-red-600 bg-red-100' },
    { name: 'calm', category: 'positive', frequency: 15, color: 'text-teal-600 bg-teal-100' },
    { name: 'determined', category: 'positive', frequency: 12, color: 'text-indigo-600 bg-indigo-100' }
  ]

  const searchSuggestions = [
    'morning routine', 'stress management', 'gratitude practice', 'anxiety coping',
    'meditation techniques', 'sleep hygiene', 'emotional resilience', 'mindfulness',
    'work-life balance', 'self-care practices', 'breathing exercises', 'positive thinking'
  ]

  useEffect(() => {
    setResults(mockResults)
    setFilteredResults(mockResults)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (searchQuery.length > 2) {
      performSearch(searchQuery)
    } else {
      setFilteredResults(results)
    }
  }, [searchQuery, results])

  const performSearch = (query: string) => {
    setIsSearching(true)
    
    // Simulate search delay
    setTimeout(() => {
      const searchTerms = query.toLowerCase().split(' ')
      const filtered = results.filter(result => {
        const searchableText = `${result.title} ${result.description} ${result.content} ${result.emotionTags.join(' ')} ${result.wellnessTags.join(' ')}`.toLowerCase()
        return searchTerms.some(term => searchableText.includes(term))
      })
      
      // Sort by relevance
      const sorted = filtered.sort((a, b) => b.relevance - a.relevance)
      setFilteredResults(sorted)
      setIsSearching(false)
      
      // Add to search history
      if (query.trim() && !searchHistory.includes(query.trim())) {
        setSearchHistory(prev => [query.trim(), ...prev.slice(0, 9)])
      }
    }, 300)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'journal': return <BookOpen className="w-4 h-4" />
      case 'emotion': return <Heart className="w-4 h-4" />
      case 'goal': return <Target className="w-4 h-4" />
      case 'habit': return <Activity className="w-4 h-4" />
      case 'community': return <Users className="w-4 h-4" />
      case 'template': return <Hash className="w-4 h-4" />
      case 'workflow': return <Zap className="w-4 h-4" />
      case 'insight': return <Brain className="w-4 h-4" />
      default: return <Search className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'journal': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'emotion': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'goal': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'habit': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      case 'community': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
      case 'template': return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30'
      case 'workflow': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'insight': return 'text-teal-600 bg-teal-100 dark:bg-teal-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900/30'
    if (relevance >= 80) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
    if (relevance >= 70) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
    return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const addEmotionFilter = (emotion: string) => {
    if (!activeFilters.emotion.includes(emotion)) {
      setActiveFilters(prev => ({
        ...prev,
        emotion: [...prev.emotion, emotion]
      }))
    }
  }

  const removeEmotionFilter = (emotion: string) => {
    setActiveFilters(prev => ({
      ...prev,
      emotion: prev.emotion.filter(e => e !== emotion)
    }))
  }

  const clearAllFilters = () => {
    setActiveFilters({
      type: [],
      emotion: [],
      category: [],
      dateRange: 'all',
      relevance: 'all'
    })
  }

  const handleResultClick = (result: SearchResult) => {
    setSelectedResult(result)
    toast.success(`Opening ${result.type}: ${result.title}`)
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Universal Search</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Search across all content with emotion tags and intelligent discovery
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
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search journals, emotions, goals, habits, community posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-20 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                {isSearching && (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                )}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded-lg transition-colors ${
                    showFilters 
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-600'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search Suggestions */}
            {!searchQuery && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(suggestion)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Emotion Tags */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Emotion Tags</h3>
              <div className="flex flex-wrap gap-2">
                {emotionTags.map((tag) => (
                  <button
                    key={tag.name}
                    onClick={() => addEmotionFilter(tag.name)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${tag.color} hover:opacity-80`}
                  >
                    {tag.name} ({tag.frequency})
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            {(activeFilters.emotion.length > 0 || activeFilters.type.length > 0) && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Active Filters</h3>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.emotion.map((emotion) => (
                    <span
                      key={emotion}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm flex items-center space-x-1"
                    >
                      <span>{emotion}</span>
                      <button
                        onClick={() => removeEmotionFilter(emotion)}
                        className="ml-1 hover:text-blue-900 dark:hover:text-blue-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}

            {/* Search Results */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Search Results ({filteredResults.length})
                </h3>
                {searchQuery && (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Results for "{searchQuery}"
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {filteredResults.map((result) => (
                  <div
                    key={result.id}
                    className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(result.type)}`}>
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{result.title}</h4>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRelevanceColor(result.relevance)}`}>
                              {result.relevance}% match
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(result.type)}`}>
                              {result.type}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{result.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {result.emotionTags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {result.wellnessTags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-4">
                            {result.author && (
                              <span>By {result.author}</span>
                            )}
                            <span>{formatDate(result.lastUpdated)}</span>
                          </div>
                          {result.stats && (
                            <div className="flex items-center space-x-3">
                              <span>👁️ {result.stats.views}</span>
                              <span>❤️ {result.stats.likes}</span>
                              <span>📤 {result.stats.shares}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>

              {filteredResults.length === 0 && searchQuery && !isSearching && (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No results found for "{searchQuery}"</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Try different keywords or check your filters</p>
                </div>
              )}
            </div>

            {/* Search History */}
            {searchHistory.length > 0 && !searchQuery && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Recent Searches</h3>
                <div className="space-y-2">
                  {searchHistory.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(query)}
                      className="w-full text-left px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
                    >
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">{query}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
} 