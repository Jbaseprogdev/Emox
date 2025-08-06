'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target, CheckCircle, Clock, TrendingUp, Calendar, Star,
  X, Plus, Edit3, Trash2, Bell, Settings, Award, Users
} from 'lucide-react'
import toast from 'react-hot-toast'

interface HabitRecommendationProps {
  onClose: () => void
  currentUser: any
}

interface Habit {
  id: string
  name: string
  description: string
  category: 'wellness' | 'productivity' | 'social' | 'physical' | 'mental'
  frequency: 'daily' | 'weekly' | 'monthly'
  difficulty: 'easy' | 'medium' | 'hard'
  duration: number
  icon: string
  color: string
  isActive: boolean
  streak: number
  completionRate: number
  recommended: boolean
}

const recommendedHabits: Habit[] = [
  {
    id: 'morning-meditation',
    name: 'Morning Meditation',
    description: 'Start your day with 10 minutes of mindfulness',
    category: 'mental',
    frequency: 'daily',
    difficulty: 'easy',
    duration: 10,
    icon: '🧘',
    color: 'from-blue-500 to-cyan-500',
    isActive: true,
    streak: 7,
    completionRate: 85,
    recommended: true
  },
  {
    id: 'daily-gratitude',
    name: 'Daily Gratitude',
    description: 'Write down 3 things you\'re grateful for',
    category: 'mental',
    frequency: 'daily',
    difficulty: 'easy',
    duration: 5,
    icon: '🙏',
    color: 'from-green-500 to-emerald-500',
    isActive: true,
    streak: 12,
    completionRate: 92,
    recommended: true
  },
  {
    id: 'evening-walk',
    name: 'Evening Walk',
    description: 'Take a 20-minute walk to clear your mind',
    category: 'physical',
    frequency: 'daily',
    difficulty: 'medium',
    duration: 20,
    icon: '🚶',
    color: 'from-purple-500 to-indigo-500',
    isActive: false,
    streak: 0,
    completionRate: 0,
    recommended: true
  },
  {
    id: 'weekly-reflection',
    name: 'Weekly Reflection',
    description: 'Review your week and plan for the next',
    category: 'productivity',
    frequency: 'weekly',
    difficulty: 'medium',
    duration: 30,
    icon: '📝',
    color: 'from-orange-500 to-red-500',
    isActive: false,
    streak: 0,
    completionRate: 0,
    recommended: true
  },
  {
    id: 'social-check-in',
    name: 'Social Check-in',
    description: 'Reach out to a friend or family member',
    category: 'social',
    frequency: 'daily',
    difficulty: 'easy',
    duration: 15,
    icon: '💬',
    color: 'from-pink-500 to-rose-500',
    isActive: false,
    streak: 0,
    completionRate: 0,
    recommended: true
  },
  {
    id: 'digital-detox',
    name: 'Digital Detox',
    description: 'Spend 1 hour without screens before bed',
    category: 'wellness',
    frequency: 'daily',
    difficulty: 'hard',
    duration: 60,
    icon: '📱',
    color: 'from-yellow-500 to-orange-500',
    isActive: false,
    streak: 0,
    completionRate: 0,
    recommended: true
  }
]

export function HabitRecommendation({ onClose, currentUser }: HabitRecommendationProps) {
  const [habits, setHabits] = useState<Habit[]>(recommendedHabits)
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null)
  const [showAddHabit, setShowAddHabit] = useState(false)
  const [userStats, setUserStats] = useState({
    totalHabits: 3,
    activeHabits: 2,
    totalStreak: 19,
    averageCompletion: 78
  })

  const toggleHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId 
        ? { ...habit, isActive: !habit.isActive }
        : habit
    ))
    
    const habit = habits.find(h => h.id === habitId)
    if (habit) {
      if (!habit.isActive) {
        toast.success(`Started tracking ${habit.name}`)
        setUserStats(prev => ({
          ...prev,
          activeHabits: prev.activeHabits + 1
        }))
      } else {
        toast.success(`Stopped tracking ${habit.name}`)
        setUserStats(prev => ({
          ...prev,
          activeHabits: prev.activeHabits - 1
        }))
      }
    }
  }

  const completeHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            streak: habit.streak + 1,
            completionRate: Math.min(100, habit.completionRate + 5)
          }
        : habit
    ))
    
    const habit = habits.find(h => h.id === habitId)
    if (habit) {
      toast.success(`Completed ${habit.name}! Streak: ${habit.streak + 1}`)
      setUserStats(prev => ({
        ...prev,
        totalStreak: prev.totalStreak + 1
      }))
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case 'daily': return '📅'
      case 'weekly': return '📆'
      case 'monthly': return '🗓️'
      default: return '📅'
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
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Habit Recommendation</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Build healthy habits</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAddHabit(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Habit</span>
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
          {/* User Stats */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Habit Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{userStats.totalHabits}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Habits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userStats.activeHabits}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Habits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{userStats.totalStreak}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{userStats.averageCompletion}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
              </div>
            </div>
          </div>

          {/* Active Habits */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Active Habits</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {habits.filter(habit => habit.isActive).map((habit) => (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 p-4"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${habit.color} flex items-center justify-center text-lg`}>
                      {habit.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{habit.name}</h4>
                        <button
                          onClick={() => completeHabit(habit.id)}
                          className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{habit.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>🔥 {habit.streak} day streak</span>
                        <span>📊 {habit.completionRate}% completion</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recommended Habits */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Recommended for You</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {habits.filter(habit => !habit.isActive).map((habit) => (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 p-4 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => toggleHabit(habit.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${habit.color} flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300`}>
                      {habit.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{habit.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{habit.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(habit.difficulty)}`}>
                            {habit.difficulty.charAt(0).toUpperCase() + habit.difficulty.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500">{habit.duration} min</span>
                        </div>
                        <span className="text-xs text-gray-500">{getFrequencyIcon(habit.frequency)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Habit Categories */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Habit Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'Wellness', icon: '💚', color: 'from-green-500 to-emerald-500', count: 2 },
                { name: 'Productivity', icon: '⚡', color: 'from-blue-500 to-cyan-500', count: 1 },
                { name: 'Social', icon: '👥', color: 'from-purple-500 to-indigo-500', count: 1 },
                { name: 'Physical', icon: '💪', color: 'from-orange-500 to-red-500', count: 1 },
                { name: 'Mental', icon: '🧠', color: 'from-pink-500 to-rose-500', count: 2 }
              ].map((category) => (
                <div key={category.name} className="text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-xl mx-auto mb-2`}>
                    {category.icon}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</div>
                  <div className="text-xs text-gray-500">{category.count} habits</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                <Bell className="w-4 h-4" />
                <span>Set Reminders</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                <TrendingUp className="w-4 h-4" />
                <span>View Progress</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                <Award className="w-4 h-4" />
                <span>Earn Badges</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors">
                <Users className="w-4 h-4" />
                <span>Share Progress</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 