'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Leaf, Play, Pause, Volume2, VolumeX, Timer, Heart, Brain,
  X, RotateCcw, SkipForward, SkipBack, Settings, Moon, Sun,
  Music, Waves, Wind, Flame, CloudRain, Bird, Sparkles, Target,
  Users, Award, BarChart3, Mic, Headphones, Zap, Star, Clock,
  TrendingUp, Activity, Eye, Mind, Lotus, Infinity, Crown
} from 'lucide-react'
import toast from 'react-hot-toast'

interface MeditationRoomProps {
  onClose: () => void
  onAction?: (action: string, data?: any) => void
  user?: any
}

interface MeditationSession {
  id: string
  name: string
  description: string
  duration: number
  category: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  type: 'breathing' | 'mindfulness' | 'loving-kindness' | 'body-scan' | 'transcendental' | 'zen' | 'vipassana' | 'chakra'
  icon: string
  color: string
  difficulty: number
  tags: string[]
  aiGuided: boolean
  biometricFeedback: boolean
  socialFeatures: boolean
  achievements: string[]
  audioUrl?: string
  instructor?: string
  rating: number
  participants: number
}

interface AmbientSound {
  id: string
  name: string
  icon: React.ReactNode
  volume: number
  isPlaying: boolean
  category: 'nature' | 'instrumental' | 'white-noise' | 'binaural'
  frequency?: number
  description: string
}

interface BiometricData {
  heartRate: number
  breathingRate: number
  stressLevel: number
  focusScore: number
  relaxationLevel: number
  timestamp: Date
}

interface MeditationProgress {
  totalSessions: number
  totalMinutes: number
  currentStreak: number
  longestStreak: number
  averageSessionLength: number
  favoriteType: string
  achievements: string[]
  level: number
  experience: number
}

const advancedMeditationSessions: MeditationSession[] = [
  {
    id: 'ai-breathing-master',
    name: 'AI Breathing Master',
    description: 'AI-guided breathing with real-time biometric feedback',
    duration: 10,
    category: 'expert',
    type: 'breathing',
    icon: '🤖',
    color: 'from-cyan-500 to-blue-500',
    difficulty: 5,
    tags: ['AI-guided', 'Biometric', 'Advanced'],
    aiGuided: true,
    biometricFeedback: true,
    socialFeatures: true,
    achievements: ['AI Master', 'Breathing Expert', 'Biometric Pioneer'],
    instructor: 'AI Coach',
    rating: 4.9,
    participants: 1250
  },
  {
    id: 'zen-mastery',
    name: 'Zen Mastery',
    description: 'Deep zen meditation with ambient nature sounds',
    duration: 45,
    category: 'expert',
    type: 'zen',
    icon: '🧘‍♂️',
    color: 'from-emerald-500 to-teal-500',
    difficulty: 5,
    tags: ['Zen', 'Nature', 'Advanced'],
    aiGuided: false,
    biometricFeedback: true,
    socialFeatures: true,
    achievements: ['Zen Master', 'Nature Lover', 'Deep Meditator'],
    instructor: 'Master Zen',
    rating: 4.8,
    participants: 890
  },
  {
    id: 'chakra-balance',
    name: 'Chakra Balance',
    description: 'Balance your energy centers with guided visualization',
    duration: 30,
    category: 'advanced',
    type: 'chakra',
    icon: '🌈',
    color: 'from-purple-500 to-pink-500',
    difficulty: 4,
    tags: ['Chakra', 'Energy', 'Visualization'],
    aiGuided: true,
    biometricFeedback: true,
    socialFeatures: false,
    achievements: ['Chakra Master', 'Energy Balancer'],
    instructor: 'Energy Guide',
    rating: 4.7,
    participants: 650
  },
  {
    id: 'vipassana-insight',
    name: 'Vipassana Insight',
    description: 'Insight meditation for deep self-awareness',
    duration: 60,
    category: 'expert',
    type: 'vipassana',
    icon: '👁️',
    color: 'from-indigo-500 to-purple-500',
    difficulty: 5,
    tags: ['Vipassana', 'Insight', 'Advanced'],
    aiGuided: false,
    biometricFeedback: true,
    socialFeatures: true,
    achievements: ['Insight Master', 'Self-Awareness Expert'],
    instructor: 'Insight Master',
    rating: 4.9,
    participants: 420
  },
  {
    id: 'mindful-flow',
    name: 'Mindful Flow',
    description: 'Dynamic mindfulness with movement integration',
    duration: 20,
    category: 'intermediate',
    type: 'mindfulness',
    icon: '🌊',
    color: 'from-blue-500 to-cyan-500',
    difficulty: 3,
    tags: ['Flow', 'Movement', 'Dynamic'],
    aiGuided: true,
    biometricFeedback: false,
    socialFeatures: true,
    achievements: ['Flow Master', 'Movement Meditator'],
    instructor: 'Flow Guide',
    rating: 4.6,
    participants: 1200
  },
  {
    id: 'loving-kindness-plus',
    name: 'Loving Kindness Plus',
    description: 'Advanced compassion meditation with AI guidance',
    duration: 25,
    category: 'advanced',
    type: 'loving-kindness',
    icon: '💝',
    color: 'from-pink-500 to-rose-500',
    difficulty: 4,
    tags: ['Compassion', 'AI-guided', 'Advanced'],
    aiGuided: true,
    biometricFeedback: true,
    socialFeatures: true,
    achievements: ['Compassion Master', 'AI Companion'],
    instructor: 'AI Compassion Coach',
    rating: 4.8,
    participants: 780
  }
]

const advancedAmbientSounds: AmbientSound[] = [
  { 
    id: 'binaural-beats', 
    name: 'Binaural Beats', 
    icon: <Brain className="w-5 h-5" />, 
    volume: 60, 
    isPlaying: false,
    category: 'binaural',
    frequency: 432,
    description: '432Hz frequency for deep relaxation'
  },
  { 
    id: 'crystal-bowls', 
    name: 'Crystal Bowls', 
    icon: <Music className="w-5 h-5" />, 
    volume: 50, 
    isPlaying: false,
    category: 'instrumental',
    description: 'Healing crystal bowl frequencies'
  },
  { 
    id: 'forest-ambience', 
    name: 'Forest Ambience', 
    icon: <Leaf className="w-5 h-5" />, 
    volume: 45, 
    isPlaying: false,
    category: 'nature',
    description: 'Complete forest soundscape'
  },
  { 
    id: 'ocean-depths', 
    name: 'Ocean Depths', 
    icon: <Waves className="w-5 h-5" />, 
    volume: 55, 
    isPlaying: false,
    category: 'nature',
    description: 'Deep ocean wave patterns'
  },
  { 
    id: 'white-noise', 
    name: 'White Noise', 
    icon: <Wind className="w-5 h-5" />, 
    volume: 40, 
    isPlaying: false,
    category: 'white-noise',
    description: 'Pure white noise for focus'
  },
  { 
    id: 'rainforest', 
    name: 'Rainforest', 
    icon: <CloudRain className="w-5 h-5" />, 
    volume: 50, 
    isPlaying: false,
    category: 'nature',
    description: 'Lush rainforest atmosphere'
  }
]

export function MeditationRoom({ onClose, onAction, user }: MeditationRoomProps) {
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [currentPhase, setCurrentPhase] = useState('preparation')
  const [ambientSounds, setAmbientSounds] = useState<AmbientSound[]>(advancedAmbientSounds)
  const [showBiometrics, setShowBiometrics] = useState(false)
  const [biometricData, setBiometricData] = useState<BiometricData | null>(null)
  const [showProgress, setShowProgress] = useState(false)
  const [progress, setProgress] = useState<MeditationProgress>({
    totalSessions: 47,
    totalMinutes: 1240,
    currentStreak: 12,
    longestStreak: 28,
    averageSessionLength: 26,
    favoriteType: 'mindfulness',
    achievements: ['Meditation Beginner', 'Streak Master', 'Zen Explorer'],
    level: 8,
    experience: 1240
  })
  const [aiGuidance, setAiGuidance] = useState(false)
  const [socialMode, setSocialMode] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [sessionQuality, setSessionQuality] = useState(0)
  const [breathingPattern, setBreathingPattern] = useState<'box' | '4-7-8' | 'alternate' | 'custom'>('box')
  const [focusMode, setFocusMode] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Simulate biometric data
    if (showBiometrics && isPlaying) {
      const interval = setInterval(() => {
        setBiometricData({
          heartRate: 65 + Math.random() * 20,
          breathingRate: 12 + Math.random() * 4,
          stressLevel: Math.max(0, 50 - Math.random() * 30),
          focusScore: 60 + Math.random() * 40,
          relaxationLevel: 70 + Math.random() * 30,
          timestamp: new Date()
        })
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [showBiometrics, isPlaying])

  const startSession = (session: MeditationSession) => {
    setSelectedSession(session)
    setTotalTime(session.duration * 60)
    setTimeRemaining(session.duration * 60)
    setCurrentPhase('preparation')
    setAiGuidance(session.aiGuided)
    setSocialMode(session.socialFeatures)
    
    toast.success(`Starting ${session.name} meditation`)
    
    // Start timer after 3 seconds
    setTimeout(() => {
      setCurrentPhase('meditation')
      setIsPlaying(true)
      startTimer()
    }, 3000)
  }

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          endSession()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const endSession = () => {
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentPhase('completion')
    if (timerRef.current) clearInterval(timerRef.current)
    
    // Calculate session quality
    const quality = Math.floor(Math.random() * 40) + 60
    setSessionQuality(quality)
    
    // Update progress
    const sessionMinutes = Math.floor((totalTime - timeRemaining) / 60)
    setProgress(prev => ({
      ...prev,
      totalSessions: prev.totalSessions + 1,
      totalMinutes: prev.totalMinutes + sessionMinutes,
      currentStreak: prev.currentStreak + 1,
      experience: prev.experience + sessionMinutes
    }))
    
    toast.success(`Meditation completed! Quality score: ${quality}%`)
    
    setTimeout(() => {
      setCurrentPhase('preparation')
      setSelectedSession(null)
    }, 5000)
  }

  const pauseSession = () => {
    setIsPaused(true)
    if (timerRef.current) clearInterval(timerRef.current)
    toast('Meditation paused')
  }

  const resumeSession = () => {
    setIsPaused(false)
    startTimer()
    toast('Meditation resumed')
  }

  const resetSession = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setTimeRemaining(totalTime)
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentPhase('preparation')
    toast('Session reset')
  }

  const toggleAmbientSound = (soundId: string) => {
    setAmbientSounds(prev => prev.map(sound => 
      sound.id === soundId 
        ? { ...sound, isPlaying: !sound.isPlaying }
        : sound
    ))
  }

  const updateAmbientVolume = (soundId: string, volume: number) => {
    setAmbientSounds(prev => prev.map(sound => 
      sound.id === soundId 
        ? { ...sound, volume }
        : sound
    ))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    return ((totalTime - timeRemaining) / totalTime) * 100
  }

  const getBreathingInstructions = () => {
    switch (breathingPattern) {
      case 'box': return 'Inhale 4s → Hold 4s → Exhale 4s → Hold 4s'
      case '4-7-8': return 'Inhale 4s → Hold 7s → Exhale 8s'
      case 'alternate': return 'Inhale left nostril → Exhale right nostril'
      default: return 'Follow your natural breath'
    }
  }

  const renderMeditationInterface = () => {
    if (!selectedSession) return null

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-full"
      >
        {/* Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${selectedSession.color} opacity-20`} />
        
        {/* Main Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedSession.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedSession.description}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {selectedSession.aiGuided && (
                <div className="flex items-center space-x-1 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                  <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-blue-600 dark:text-blue-400">AI Guided</span>
                </div>
              )}
              {selectedSession.biometricFeedback && (
                <button
                  onClick={() => setShowBiometrics(!showBiometrics)}
                  className="flex items-center space-x-1 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full"
                >
                  <Activity className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-600 dark:text-green-400">Biometrics</span>
                </button>
              )}
            </div>
          </div>

          {/* Timer and Controls */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              {/* Timer Circle */}
              <div className="relative w-64 h-64 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 120}`}
                    strokeDashoffset={`${2 * Math.PI * 120 * (1 - getProgressPercentage() / 100)}`}
                    className="text-blue-500 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 dark:text-white">
                      {formatTime(timeRemaining)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {currentPhase === 'meditation' ? 'Meditating' : 'Preparing...'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={resetSession}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
                {isPlaying && !isPaused ? (
                  <button
                    onClick={pauseSession}
                    className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
                  >
                    <Pause className="w-8 h-8" />
                  </button>
                ) : (
                  <button
                    onClick={isPaused ? resumeSession : startSession.bind(null, selectedSession)}
                    className="p-4 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
                  >
                    <Play className="w-8 h-8" />
                  </button>
                )}
                <button
                  onClick={endSession}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <SkipForward className="w-6 h-6" />
                </button>
              </div>

              {/* Breathing Instructions */}
              {currentPhase === 'meditation' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl backdrop-blur-sm"
                >
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Breathing Pattern
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getBreathingInstructions()}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Biometric Data */}
          {showBiometrics && biometricData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl backdrop-blur-sm mx-6 mb-6"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-500">
                    {Math.round(biometricData.heartRate)} BPM
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Heart Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-500">
                    {Math.round(biometricData.focusScore)}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Focus</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">
                    {Math.round(biometricData.relaxationLevel)}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Relaxation</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    )
  }

  const renderSessionSelection = () => {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Meditation Room
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose your meditation journey
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Progress
            </h3>
            <button
              onClick={() => setShowProgress(!showProgress)}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showProgress ? 'Hide' : 'View Details'}
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {progress.totalSessions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {progress.totalMinutes}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {progress.currentStreak}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                Level {progress.level}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Experience</div>
            </div>
          </div>

          {showProgress && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Achievements
                  </div>
                  <div className="space-y-1">
                    {progress.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Stats
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div>Longest Streak: {progress.longestStreak} days</div>
                    <div>Avg Session: {progress.averageSessionLength} min</div>
                    <div>Favorite: {progress.favoriteType}</div>
                    <div>Experience: {progress.experience} min</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Session Categories */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Advanced Sessions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advancedMeditationSessions.map((session) => (
              <motion.div
                key={session.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startSession(session)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 bg-gradient-to-br ${session.color} text-white relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{session.icon}</div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">{session.rating}</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{session.name}</h4>
                  <p className="text-sm opacity-90 mb-3">{session.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{session.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{session.participants}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    {session.aiGuided && (
                      <div className="px-2 py-1 bg-white/20 rounded-full text-xs">
                        AI Guided
                      </div>
                    )}
                    {session.biometricFeedback && (
                      <div className="px-2 py-1 bg-white/20 rounded-full text-xs">
                        Biometrics
                      </div>
                    )}
                    {session.socialFeatures && (
                      <div className="px-2 py-1 bg-white/20 rounded-full text-xs">
                        Social
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ambient Sounds */}
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Ambient Sounds
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ambientSounds.map((sound) => (
              <div
                key={sound.id}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  sound.isPlaying
                    ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => toggleAmbientSound(sound.id)}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {sound.icon}
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {sound.name}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sound.volume}
                  onChange={(e) => updateAmbientVolume(sound.id, parseInt(e.target.value))}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {sound.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Meditation Room
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Advanced meditation with AI guidance
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedSession ? renderMeditationInterface() : renderSessionSelection()}
      </div>
    </div>
  )
} 