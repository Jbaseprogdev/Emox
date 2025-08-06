'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar, Plus, X, Edit3, Trash2, MoreHorizontal,
  Heart, Brain, Star, Target, Clock, Users, MessageCircle,
  Filter, Search, ChevronLeft, ChevronRight, Eye, EyeOff,
  Share2, Download, Settings, Bell, CheckCircle, AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'

interface MoodBasedCalendarPlannerProps {
  onClose: () => void
  currentUser?: any
}

interface CalendarEvent {
  id: string
  title: string
  description: string
  startTime: string
  endTime: string
  mood: string
  energyLevel: number
  stressLevel: number
  category: 'work' | 'personal' | 'wellness' | 'social' | 'mindful'
  priority: 'low' | 'medium' | 'high' | 'mindful'
  isRecurring: boolean
  recurrencePattern?: string
  location?: string
  attendees?: string[]
  notes: string
  moodInsights: string
  wellnessSuggestions: string[]
  tags: string[]
}

interface MoodData {
  date: string
  mood: string
  energyLevel: number
  stressLevel: number
  dominantEmotion: string
  moodNotes: string
}

export function MoodBasedCalendarPlanner({ onClose, currentUser }: MoodBasedCalendarPlannerProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [moodData, setMoodData] = useState<MoodData[]>([])
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'mood'>('month')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterMood, setFilterMood] = useState<string>('all')

  const mockEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Morning Meditation',
      description: 'Guided meditation for emotional balance',
      startTime: '2024-01-15T08:00:00Z',
      endTime: '2024-01-15T08:30:00Z',
      mood: 'calm',
      energyLevel: 7,
      stressLevel: 2,
      category: 'wellness',
      priority: 'mindful',
      isRecurring: true,
      recurrencePattern: 'daily',
      notes: 'Focus on breathing and present moment awareness',
      moodInsights: 'This session helps maintain emotional stability throughout the day',
      wellnessSuggestions: ['Deep breathing exercises', 'Mindful walking', 'Gratitude practice'],
      tags: ['meditation', 'morning', 'wellness']
    },
    {
      id: '2',
      title: 'Team Meeting',
      description: 'Weekly project status update',
      startTime: '2024-01-15T10:00:00Z',
      endTime: '2024-01-15T11:00:00Z',
      mood: 'focused',
      energyLevel: 8,
      stressLevel: 5,
      category: 'work',
      priority: 'high',
      isRecurring: true,
      recurrencePattern: 'weekly',
      attendees: ['Sarah', 'Mike', 'Emma'],
      notes: 'Prepare presentation slides and updates',
      moodInsights: 'High energy but moderate stress - good for productive discussion',
      wellnessSuggestions: ['Take breaks every 25 minutes', 'Stay hydrated', 'Practice active listening'],
      tags: ['work', 'meeting', 'collaboration']
    },
    {
      id: '3',
      title: 'Lunch with Friend',
      description: 'Catch up with close friend',
      startTime: '2024-01-15T12:30:00Z',
      endTime: '2024-01-15T13:30:00Z',
      mood: 'happy',
      energyLevel: 6,
      stressLevel: 1,
      category: 'social',
      priority: 'medium',
      isRecurring: false,
      location: 'Local Cafe',
      notes: 'Social connection and emotional support',
      moodInsights: 'Social interactions boost mood and reduce stress',
      wellnessSuggestions: ['Practice active listening', 'Share positive experiences', 'Express gratitude'],
      tags: ['social', 'lunch', 'friendship']
    }
  ]

  const mockMoodData: MoodData[] = [
    {
      date: '2024-01-15',
      mood: 'balanced',
      energyLevel: 7,
      stressLevel: 4,
      dominantEmotion: 'content',
      moodNotes: 'Feeling balanced and productive today'
    },
    {
      date: '2024-01-14',
      mood: 'stressed',
      energyLevel: 5,
      stressLevel: 8,
      dominantEmotion: 'anxious',
      moodNotes: 'Work pressure affecting mood'
    },
    {
      date: '2024-01-13',
      mood: 'happy',
      energyLevel: 9,
      stressLevel: 2,
      dominantEmotion: 'joyful',
      moodNotes: 'Great day with family'
    }
  ]

  useEffect(() => {
    setEvents(mockEvents)
    setMoodData(mockMoodData)
  }, [])

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'calm': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'focused': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      case 'stressed': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'balanced': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      case 'personal': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'wellness': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
      case 'social': return 'text-pink-600 bg-pink-100 dark:bg-pink-900/30'
      case 'mindful': return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Heart className="w-4 h-4 text-green-500" />
      case 'calm': return <Brain className="w-4 h-4 text-blue-500" />
      case 'focused': return <Target className="w-4 h-4 text-purple-500" />
      case 'stressed': return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'balanced': return <Star className="w-4 h-4 text-yellow-500" />
      default: return <Heart className="w-4 h-4 text-gray-500" />
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    return { daysInMonth, startingDay }
  }

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return events.filter(event => {
      const eventDate = new Date(event.startTime).toISOString().split('T')[0]
      return eventDate === dateString
    })
  }

  const getMoodForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return moodData.find(mood => mood.date === dateString)
  }

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const filteredEvents = events.filter(event => {
    const categoryMatch = filterCategory === 'all' || event.category === filterCategory
    const moodMatch = filterMood === 'all' || event.mood === filterMood
    return categoryMatch && moodMatch
  })

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
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mood-Based Calendar Planner</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Schedule with emotional intelligence and wellness insights
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCreateEvent(true)}
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
            {/* Navigation and Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="wellness">Wellness</option>
                  <option value="social">Social</option>
                  <option value="mindful">Mindful</option>
                </select>
                <select
                  value={filterMood}
                  onChange={(e) => setFilterMood(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">All Moods</option>
                  <option value="happy">Happy</option>
                  <option value="calm">Calm</option>
                  <option value="focused">Focused</option>
                  <option value="stressed">Stressed</option>
                  <option value="balanced">Balanced</option>
                </select>
                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  {['month', 'week', 'day', 'mood'].map((mode) => (
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
            </div>

            {/* Calendar Grid */}
            {viewMode === 'month' && (
              <div className="space-y-4">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: startingDay }, (_, i) => (
                    <div key={`empty-${i}`} className="h-32 bg-gray-50 dark:bg-gray-800 rounded-lg" />
                  ))}
                  
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                    const dayEvents = getEventsForDate(date)
                    const dayMood = getMoodForDate(date)
                    const isToday = date.toDateString() === new Date().toDateString()
                    
                    return (
                      <div
                        key={day}
                        className={`h-32 p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                          isToday ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600' : ''
                        }`}
                        onClick={() => setSelectedDate(date)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm font-medium ${
                            isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                          }`}>
                            {day}
                          </span>
                          {dayMood && getMoodIcon(dayMood.mood)}
                        </div>
                        
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`p-1 rounded text-xs truncate ${
                                event.category === 'work' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                event.category === 'wellness' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                                event.category === 'social' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300' :
                                'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Mood View */}
            {viewMode === 'mood' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mood Insights & Patterns</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {moodData.map((mood) => (
                    <div
                      key={mood.date}
                      className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getMoodIcon(mood.mood)}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {new Date(mood.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            </h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMoodColor(mood.mood)}`}>
                              {mood.mood}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Energy Level</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(10)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < mood.energyLevel ? 'bg-yellow-400' : 'bg-gray-200 dark:bg-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Stress Level</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(10)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < mood.stressLevel ? 'bg-red-400' : 'bg-gray-200 dark:bg-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          💭 {mood.moodNotes}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Events List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
              
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex items-center space-x-2">
                          {getMoodIcon(event.mood)}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{event.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMoodColor(event.mood)}`}>
                          {event.mood}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-4">
                        <span>⏰ {new Date(event.startTime).toLocaleTimeString()}</span>
                        <span>📅 {new Date(event.startTime).toLocaleDateString()}</span>
                        <span>⚡ Energy: {event.energyLevel}/10</span>
                        <span>😰 Stress: {event.stressLevel}/10</span>
                      </div>
                      {event.attendees && event.attendees.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    {event.moodInsights && (
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          🧠 <strong>Mood Insight:</strong> {event.moodInsights}
                        </p>
                      </div>
                    )}

                    {event.wellnessSuggestions && event.wellnessSuggestions.length > 0 && (
                      <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                          💡 <strong>Wellness Suggestions:</strong>
                        </p>
                        <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                          {event.wellnessSuggestions.map((suggestion, index) => (
                            <li key={index}>• {suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 