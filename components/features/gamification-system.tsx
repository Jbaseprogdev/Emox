'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Trophy, Star, Heart, Brain, BookOpen, MessageCircle, 
  Camera, Zap, Shield, TreePine, Music, Sun, Moon, 
  Target, TrendingUp, Award, Gift, Flame, Sparkles
} from 'lucide-react'
import toast from 'react-hot-toast'

interface GamificationProps {
  onClose: () => void
  currentUser?: any
  onAchievementUnlocked?: (achievement: any) => void
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: any
  category: 'daily' | 'weekly' | 'milestone' | 'special'
  points: number
  unlocked: boolean
  unlockedAt?: Date
  progress: number
  maxProgress: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  color: string
}

interface UserProgress {
  level: number
  experience: number
  experienceToNext: number
  totalPoints: number
  streak: number
  achievements: Achievement[]
  stats: {
    journalEntries: number
    moodChecks: number
    meditationSessions: number
    chatSessions: number
    breathingExercises: number
  }
}

export function GamificationSystem({ onClose, currentUser, onAchievementUnlocked }: GamificationProps) {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    experience: 0,
    experienceToNext: 100,
    totalPoints: 0,
    streak: 0,
    achievements: [],
    stats: {
      journalEntries: 0,
      moodChecks: 0,
      meditationSessions: 0,
      chatSessions: 0,
      breathingExercises: 0
    }
  })
  const [activeTab, setActiveTab] = useState('overview')
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false)
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null)

  const achievements: Achievement[] = [
    {
      id: 'first-mood-check',
      name: 'First Steps',
      description: 'Complete your first mood check',
      icon: Heart,
      category: 'milestone',
      points: 50,
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      rarity: 'common',
      color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
    },
    {
      id: 'journal-streak-7',
      name: 'Reflection Master',
      description: 'Write in your journal for 7 consecutive days',
      icon: BookOpen,
      category: 'weekly',
      points: 200,
      unlocked: false,
      progress: 0,
      maxProgress: 7,
      rarity: 'rare',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
    },
    {
      id: 'meditation-master',
      name: 'Mindfulness Guru',
      description: 'Complete 10 meditation sessions',
      icon: Brain,
      category: 'milestone',
      points: 300,
      unlocked: false,
      progress: 0,
      maxProgress: 10,
      rarity: 'epic',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
    },
    {
      id: 'mood-streak-30',
      name: 'Emotional Warrior',
      description: 'Track your mood for 30 consecutive days',
      icon: TrendingUp,
      category: 'milestone',
      points: 500,
      unlocked: false,
      progress: 0,
      maxProgress: 30,
      rarity: 'legendary',
      color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
    },
    {
      id: 'ai-coach-sessions',
      name: 'AI Companion',
      description: 'Have 5 conversations with your AI coach',
      icon: MessageCircle,
      category: 'milestone',
      points: 150,
      unlocked: false,
      progress: 0,
      maxProgress: 5,
      rarity: 'rare',
      color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400'
    },
    {
      id: 'breathing-expert',
      name: 'Breathing Expert',
      description: 'Complete 20 breathing exercises',
      icon: TreePine,
      category: 'milestone',
      points: 250,
      unlocked: false,
      progress: 0,
      maxProgress: 20,
      rarity: 'epic',
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
    },
    {
      id: 'daily-wellness',
      name: 'Daily Wellness',
      description: 'Complete all daily wellness activities',
      icon: Target,
      category: 'daily',
      points: 100,
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      rarity: 'common',
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
    },
    {
      id: 'emotional-insights',
      name: 'Emotional Insights',
      description: 'Discover 10 different emotions in your tracking',
      icon: Sparkles,
      category: 'milestone',
      points: 400,
      unlocked: false,
      progress: 0,
      maxProgress: 10,
      rarity: 'epic',
      color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400'
    }
  ]

  const dailyChallenges = [
    {
      id: 'morning-meditation',
      name: 'Morning Meditation',
      description: 'Start your day with 5 minutes of mindfulness',
      icon: Sun,
      points: 25,
      completed: false
    },
    {
      id: 'gratitude-journal',
      name: 'Gratitude Journal',
      description: 'Write down 3 things you\'re grateful for today',
      icon: Heart,
      points: 30,
      completed: false
    },
    {
      id: 'mood-check',
      name: 'Mood Check-in',
      description: 'Track your current emotional state',
      icon: Camera,
      points: 20,
      completed: false
    },
    {
      id: 'breathing-exercise',
      name: 'Breathing Exercise',
      description: 'Practice deep breathing for 3 minutes',
      icon: TreePine,
      points: 25,
      completed: false
    }
  ]

  useEffect(() => {
    // Load user progress from localStorage
    const savedProgress = localStorage.getItem('emolinkdn-progress')
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
    } else {
      // Initialize with achievements
      const initialProgress: UserProgress = {
        ...userProgress,
        achievements: achievements.map(achievement => ({
          ...achievement,
          progress: Math.floor(Math.random() * achievement.maxProgress)
        }))
      }
      setUserProgress(initialProgress)
      localStorage.setItem('emolinkdn-progress', JSON.stringify(initialProgress))
    }
  }, [])

  const addExperience = (points: number) => {
    setUserProgress(prev => {
      const newExperience = prev.experience + points
      const newTotalPoints = prev.totalPoints + points
      let newLevel = prev.level
      let newExperienceToNext = prev.experienceToNext

      // Check for level up
      if (newExperience >= prev.experienceToNext) {
        newLevel += 1
        newExperienceToNext = newLevel * 100
        toast.success(`🎉 Level Up! You're now level ${newLevel}`)
      }

      const updatedProgress = {
        ...prev,
        experience: newExperience,
        experienceToNext: newExperienceToNext,
        level: newLevel,
        totalPoints: newTotalPoints
      }

      localStorage.setItem('emolinkdn-progress', JSON.stringify(updatedProgress))
      return updatedProgress
    })
  }

  const checkAchievements = () => {
    achievements.forEach(achievement => {
      if (!achievement.unlocked) {
        let shouldUnlock = false

        switch (achievement.id) {
          case 'first-mood-check':
            shouldUnlock = userProgress.stats.moodChecks >= 1
            break
          case 'journal-streak-7':
            shouldUnlock = userProgress.streak >= 7
            break
          case 'meditation-master':
            shouldUnlock = userProgress.stats.meditationSessions >= 10
            break
          case 'mood-streak-30':
            shouldUnlock = userProgress.streak >= 30
            break
          case 'ai-coach-sessions':
            shouldUnlock = userProgress.stats.chatSessions >= 5
            break
          case 'breathing-expert':
            shouldUnlock = userProgress.stats.breathingExercises >= 20
            break
        }

        if (shouldUnlock) {
          unlockAchievement(achievement)
        }
      }
    })
  }

  const unlockAchievement = (achievement: Achievement) => {
    setUnlockedAchievement(achievement)
    setShowUnlockAnimation(true)
    
    setUserProgress(prev => {
      const updatedAchievements = prev.achievements.map(a => 
        a.id === achievement.id 
          ? { ...a, unlocked: true, unlockedAt: new Date() }
          : a
      )

      const updatedProgress = {
        ...prev,
        achievements: updatedAchievements
      }

      localStorage.setItem('emolinkdn-progress', JSON.stringify(updatedProgress))
      return updatedProgress
    })

    addExperience(achievement.points)
    
    if (onAchievementUnlocked) {
      onAchievementUnlocked(achievement)
    }

    setTimeout(() => {
      setShowUnlockAnimation(false)
      setUnlockedAchievement(null)
    }, 3000)
  }

  const completeDailyChallenge = (challengeId: string) => {
    const challenge = dailyChallenges.find(c => c.id === challengeId)
    if (challenge && !challenge.completed) {
      addExperience(challenge.points)
      toast.success(`✅ ${challenge.name} completed! +${challenge.points} XP`)
      
      // Update challenge completion
      const updatedChallenges = dailyChallenges.map(c => 
        c.id === challengeId ? { ...c, completed: true } : c
      )
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 dark:border-gray-600'
      case 'rare': return 'border-blue-300 dark:border-blue-600'
      case 'epic': return 'border-purple-300 dark:border-purple-600'
      case 'legendary': return 'border-yellow-300 dark:border-yellow-600'
      default: return 'border-gray-300 dark:border-gray-600'
    }
  }

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common': return ''
      case 'rare': return 'shadow-blue-500/20'
      case 'epic': return 'shadow-purple-500/20'
      case 'legendary': return 'shadow-yellow-500/20'
      default: return ''
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-6xl h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-wellness-50 dark:from-primary-900/20 dark:to-wellness-900/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-wellness-500 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Wellness Journey</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Track your progress and earn rewards</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {['overview', 'achievements', 'challenges', 'stats'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Level Progress */}
                <div className="bg-gradient-to-r from-primary-50 to-wellness-50 dark:from-primary-900/20 dark:to-wellness-900/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Level {userProgress.level}
                    </h3>
                                      <div className="flex items-center space-x-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {userProgress.totalPoints} Total Points
                    </span>
                  </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Experience</span>
                      <span>{userProgress.experience} / {userProgress.experienceToNext}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-400 to-wellness-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(userProgress.experience / userProgress.experienceToNext) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Streak */}
                <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Current Streak</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Keep it going!</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {userProgress.streak} days
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {userProgress.streak === 0 ? 'Start your wellness journey today!' : 'Amazing consistency!'}
                    </p>
                  </div>
                </div>

                {/* Recent Achievements */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userProgress.achievements
                      .filter(a => a.unlocked)
                      .slice(0, 6)
                      .map((achievement) => {
                        const Icon = achievement.icon
                        return (
                          <motion.div
                            key={achievement.id}
                            whileHover={{ scale: 1.05 }}
                            className={`p-4 rounded-xl border-2 ${getRarityColor(achievement.rarity)} ${getRarityGlow(achievement.rarity)} bg-white dark:bg-gray-700 shadow-sm`}
                          >
                            <div className="flex items-center space-x-3">
                              <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-white">{achievement.name}</h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    +{achievement.points} XP
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userProgress.achievements.map((achievement) => {
                    const Icon = achievement.icon
                    return (
                      <motion.div
                        key={achievement.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-6 rounded-xl border-2 ${getRarityColor(achievement.rarity)} ${getRarityGlow(achievement.rarity)} ${
                          achievement.unlocked 
                            ? 'bg-white dark:bg-gray-700' 
                            : 'bg-gray-50 dark:bg-gray-800 opacity-60'
                        } shadow-sm`}
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            achievement.unlocked 
                              ? 'bg-primary-100 dark:bg-primary-900/20' 
                              : 'bg-gray-100 dark:bg-gray-700'
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              achievement.unlocked 
                                ? 'text-primary-600 dark:text-primary-400' 
                                : 'text-gray-400'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{achievement.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {achievement.progress} / {achievement.maxProgress}
                            </span>
                          </div>
                          
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                achievement.unlocked 
                                  ? 'bg-gradient-to-r from-primary-400 to-wellness-500' 
                                  : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{achievement.rarity}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {achievement.points}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'challenges' && (
              <motion.div
                key="challenges"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Challenges</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dailyChallenges.map((challenge) => {
                      const Icon = challenge.icon
                      return (
                        <motion.button
                          key={challenge.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => completeDailyChallenge(challenge.id)}
                          disabled={challenge.completed}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            challenge.completed
                              ? 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-6 h-6 ${
                              challenge.completed 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-gray-600 dark:text-gray-400'
                            }`} />
                            <div className="flex-1 text-left">
                              <h4 className="font-medium text-gray-900 dark:text-white">{challenge.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{challenge.description}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  +{challenge.points} XP
                                </span>
                              </div>
                            </div>
                            {challenge.completed && (
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(userProgress.stats).map(([key, value]) => (
                    <div key={key} className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                          {key === 'journalEntries' && <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
                          {key === 'moodChecks' && <Camera className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
                          {key === 'meditationSessions' && <Brain className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
                          {key === 'chatSessions' && <MessageCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
                          {key === 'breathingExercises' && <TreePine className="w-5 h-5 text-primary-600 dark:text-primary-400" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total completed</p>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Achievement Unlock Animation */}
        <AnimatePresence>
          {showUnlockAnimation && unlockedAchievement && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                exit={{ y: 50 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-md mx-4 text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: 2 }}
                  className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Trophy className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Achievement Unlocked!
                </h3>
                
                <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  {unlockedAchievement.name}
                </p>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {unlockedAchievement.description}
                </p>
                
                <div className="flex items-center justify-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    +{unlockedAchievement.points} XP
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
} 