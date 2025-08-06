'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, Play, Pause, Target, Award, Timer, Heart, Brain, X, Volume2, VolumeX,
  RotateCcw, Star, Trophy, Users, Sparkles, Crown, TrendingUp, MessageCircle,
  Share2, Download, Eye, EyeOff, Settings, Mic, Video, Camera, Smile, Frown,
  Meh, ArrowUp, ArrowDown, Minus, Plus, CheckCircle, AlertCircle, Clock, Music,
  Palette, Dumbbell, Leaf, Rainbow, Mountain, Sun, Moon
} from 'lucide-react'
import toast from 'react-hot-toast'

interface StressGamesProps {
  onClose: () => void
  currentUser: any
}

interface Game {
  id: string
  name: string
  description: string
  category: 'breathing' | 'puzzle' | 'meditation' | 'physical' | 'creative' | 'social' | 'ai-powered' | 'multiplayer'
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  points: number
  icon: string
  color: string
  features: string[]
  aiFeatures: string[]
  multiplayer: boolean
  maxPlayers: number
  stressReliefLevel: number
  cognitiveBenefits: string[]
  socialBenefits: string[]
  aiCoaching: boolean
  realTimeFeedback: boolean
  adaptiveDifficulty: boolean
  progressTracking: boolean
  achievements: Achievement[]
  leaderboard: boolean
  voiceControl: boolean
  gestureControl: boolean
  biofeedback: boolean
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  maxProgress: number
}

interface GameSession {
  id: string
  gameId: string
  startTime: Date
  endTime?: Date
  score: number
  stressReduction: number
  moodImprovement: number
  focusEnhancement: number
  aiInsights: string[]
  socialInteractions: number
  achievements: string[]
}

interface Player {
  id: string
  name: string
  avatar: string
  score: number
  level: number
  isOnline: boolean
  currentGame?: string
}

export function StressGames({ onClose, currentUser }: StressGamesProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [score, setScore] = useState(0)
  const [gameMode, setGameMode] = useState<'single' | 'multiplayer' | 'ai-coached'>('single')
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [currentSession, setCurrentSession] = useState<GameSession | null>(null)
  const [onlinePlayers, setOnlinePlayers] = useState<Player[]>([])
  const [aiCoaching, setAiCoaching] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [gestureEnabled, setGestureEnabled] = useState(false)
  const [biofeedbackEnabled, setBiofeedbackEnabled] = useState(false)
  const [gameStats, setGameStats] = useState({
    totalGames: 0,
    totalScore: 0,
    stressReduction: 0,
    moodImprovement: 0,
    focusEnhancement: 0,
    socialConnections: 0
  })

  // Game state management
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'completed'>('menu')
  const [currentLevel, setCurrentLevel] = useState(1)
  const [gameProgress, setGameProgress] = useState(0)
  const [aiFeedback, setAiFeedback] = useState<string>('')
  const [multiplayerPlayers, setMultiplayerPlayers] = useState<Player[]>([])
  const [gameEvents, setGameEvents] = useState<any[]>([])

  // Game-specific states
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [breathingTimer, setBreathingTimer] = useState(0)
  const [puzzleGrid, setPuzzleGrid] = useState<any[][]>([])
  const [puzzleMoves, setPuzzleMoves] = useState(0)
  const [meditationParticipants, setMeditationParticipants] = useState<Player[]>([])
  const [artCanvas, setArtCanvas] = useState<any>(null)
  const [fitnessReps, setFitnessReps] = useState(0)
  const [mindfulnessStep, setMindfulnessStep] = useState(0)
  const [bubblePopCount, setBubblePopCount] = useState(0)
  const [colorMatchScore, setColorMatchScore] = useState(0)
  const [soundWaveLevel, setSoundWaveLevel] = useState(0)
  const [zenGardenProgress, setZenGardenProgress] = useState(0)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const gameCanvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const gameEngineRef = useRef<any>(null)

  // Mock online players
  const mockOnlinePlayers: Player[] = [
    { id: '1', name: 'Sarah Chen', avatar: '👩‍🦰', score: 2840, level: 15, isOnline: true, currentGame: 'ai-breathing-master' },
    { id: '2', name: 'Mike Johnson', avatar: '👨‍🦱', score: 2150, level: 12, isOnline: true, currentGame: 'mindful-puzzle-pro' },
    { id: '3', name: 'Emma Wilson', avatar: '👩‍🦳', score: 3420, level: 18, isOnline: true, currentGame: 'social-meditation-hub' },
    { id: '4', name: 'Alex Rodriguez', avatar: '👨‍🦲', score: 1890, level: 10, isOnline: false },
    { id: '5', name: 'Lisa Park', avatar: '👩‍🦱', score: 2760, level: 14, isOnline: true, currentGame: 'ai-emotion-artist' }
  ]

  // Initialize online players
  useEffect(() => {
    setOnlinePlayers(mockOnlinePlayers)
  }, [])

  // World-class games with AI and social features
  const games: Game[] = [
    {
      id: 'ai-breathing-master',
      name: 'AI Breathing Master',
      description: 'Master your breath with AI guidance and real-time biofeedback',
      category: 'ai-powered',
      duration: 8,
      difficulty: 'intermediate',
      points: 150,
      icon: '🧠',
      color: 'from-purple-500 to-indigo-600',
      features: ['Real-time biofeedback', 'AI coaching', 'Adaptive difficulty', 'Voice control'],
      aiFeatures: ['Breathing pattern analysis', 'Stress level detection', 'Personalized coaching', 'Progress prediction'],
      multiplayer: true,
      maxPlayers: 4,
      stressReliefLevel: 9,
      cognitiveBenefits: ['Improved focus', 'Better emotional regulation', 'Enhanced mindfulness'],
      socialBenefits: ['Group breathing sessions', 'Shared achievements', 'Community support'],
      aiCoaching: true,
      realTimeFeedback: true,
      adaptiveDifficulty: true,
      progressTracking: true,
      achievements: [
        { id: '1', name: 'Breathing Master', description: 'Complete 10 perfect breathing cycles', icon: '👑', unlocked: false, progress: 0, maxProgress: 10 },
        { id: '2', name: 'Stress Buster', description: 'Reduce stress by 50% in one session', icon: '⚡', unlocked: false, progress: 0, maxProgress: 50 },
        { id: '3', name: 'Social Butterfly', description: 'Join 5 group breathing sessions', icon: '🦋', unlocked: false, progress: 0, maxProgress: 5 }
      ],
      leaderboard: true,
      voiceControl: true,
      gestureControl: true,
      biofeedback: true
    },
    {
      id: 'mindful-puzzle-pro',
      name: 'Mindful Puzzle Pro',
      description: 'Solve puzzles with mindfulness and AI-generated challenges',
      category: 'puzzle',
      duration: 12,
      difficulty: 'advanced',
      points: 200,
      icon: '🧩',
      color: 'from-blue-500 to-cyan-600',
      features: ['AI-generated puzzles', 'Multiplayer collaboration', 'Real-time hints', 'Progress tracking'],
      aiFeatures: ['Dynamic puzzle generation', 'Difficulty adaptation', 'Collaboration suggestions', 'Learning analytics'],
      multiplayer: true,
      maxPlayers: 6,
      stressReliefLevel: 8,
      cognitiveBenefits: ['Enhanced problem-solving', 'Improved memory', 'Better concentration'],
      socialBenefits: ['Team collaboration', 'Shared problem-solving', 'Community challenges'],
      aiCoaching: true,
      realTimeFeedback: true,
      adaptiveDifficulty: true,
      progressTracking: true,
      achievements: [
        { id: '4', name: 'Puzzle Master', description: 'Solve 100 puzzles', icon: '🏆', unlocked: false, progress: 0, maxProgress: 100 },
        { id: '5', name: 'Team Player', description: 'Complete 20 collaborative puzzles', icon: '🤝', unlocked: false, progress: 0, maxProgress: 20 },
        { id: '6', name: 'Speed Demon', description: 'Solve a puzzle in under 30 seconds', icon: '⚡', unlocked: false, progress: 0, maxProgress: 1 }
      ],
      leaderboard: true,
      voiceControl: false,
      gestureControl: true,
      biofeedback: false
    },
    {
      id: 'social-meditation-hub',
      name: 'Social Meditation Hub',
      description: 'Meditate together with AI guidance and community support',
      category: 'social',
      duration: 15,
      difficulty: 'beginner',
      points: 120,
      icon: '🧘',
      color: 'from-green-500 to-emerald-600',
      features: ['Group meditation', 'AI guidance', 'Real-time chat', 'Mood sharing'],
      aiFeatures: ['Meditation guidance', 'Group dynamics analysis', 'Mood tracking', 'Session optimization'],
      multiplayer: true,
      maxPlayers: 20,
      stressReliefLevel: 9,
      cognitiveBenefits: ['Reduced anxiety', 'Improved sleep', 'Better emotional balance'],
      socialBenefits: ['Community building', 'Shared experiences', 'Peer support'],
      aiCoaching: true,
      realTimeFeedback: true,
      adaptiveDifficulty: false,
      progressTracking: true,
      achievements: [
        { id: '7', name: 'Meditation Guru', description: 'Complete 50 meditation sessions', icon: '🧘‍♀️', unlocked: false, progress: 0, maxProgress: 50 },
        { id: '8', name: 'Community Leader', description: 'Lead 10 group sessions', icon: '👑', unlocked: false, progress: 0, maxProgress: 10 },
        { id: '9', name: 'Peace Keeper', description: 'Help 5 users achieve calm state', icon: '🕊️', unlocked: false, progress: 0, maxProgress: 5 }
      ],
      leaderboard: true,
      voiceControl: true,
      gestureControl: false,
      biofeedback: true
    },
    {
      id: 'ai-emotion-artist',
      name: 'AI Emotion Artist',
      description: 'Express emotions through art with AI analysis and social sharing',
      category: 'creative',
      duration: 10,
      difficulty: 'intermediate',
      points: 180,
      icon: '🎨',
      color: 'from-pink-500 to-rose-600',
      features: ['AI art generation', 'Emotion analysis', 'Social gallery', 'Therapeutic guidance'],
      aiFeatures: ['Emotion detection', 'Art style suggestions', 'Mood-based themes', 'Creative coaching'],
      multiplayer: true,
      maxPlayers: 8,
      stressReliefLevel: 8,
      cognitiveBenefits: ['Creative expression', 'Emotional processing', 'Stress reduction'],
      socialBenefits: ['Art sharing', 'Community feedback', 'Collaborative projects'],
      aiCoaching: true,
      realTimeFeedback: true,
      adaptiveDifficulty: true,
      progressTracking: true,
      achievements: [
        { id: '10', name: 'Digital Artist', description: 'Create 25 artworks', icon: '🎨', unlocked: false, progress: 0, maxProgress: 25 },
        { id: '11', name: 'Emotion Explorer', description: 'Express 10 different emotions through art', icon: '🌈', unlocked: false, progress: 0, maxProgress: 10 },
        { id: '12', name: 'Community Curator', description: 'Receive 50 likes on your artwork', icon: '❤️', unlocked: false, progress: 0, maxProgress: 50 }
      ],
      leaderboard: true,
      voiceControl: false,
      gestureControl: true,
      biofeedback: false
    },
    {
      id: 'biofeedback-fitness',
      name: 'Biofeedback Fitness',
      description: 'Physical stress relief with real-time biofeedback and AI coaching',
      category: 'physical',
      duration: 6,
      difficulty: 'expert',
      points: 250,
      icon: '💪',
      color: 'from-orange-500 to-red-600',
      features: ['Real-time biofeedback', 'AI movement analysis', 'Social challenges', 'Progress tracking'],
      aiFeatures: ['Movement optimization', 'Stress level monitoring', 'Personalized workouts', 'Recovery analysis'],
      multiplayer: true,
      maxPlayers: 12,
      stressReliefLevel: 9,
      cognitiveBenefits: ['Improved energy', 'Better sleep', 'Enhanced mood'],
      socialBenefits: ['Group workouts', 'Fitness challenges', 'Motivational support'],
      aiCoaching: true,
      realTimeFeedback: true,
      adaptiveDifficulty: true,
      progressTracking: true,
      achievements: [
        { id: '13', name: 'Fitness Champion', description: 'Complete 100 workout sessions', icon: '🏆', unlocked: false, progress: 0, maxProgress: 100 },
        { id: '14', name: 'Stress Crusher', description: 'Reduce stress by 75% in one session', icon: '💥', unlocked: false, progress: 0, maxProgress: 75 },
        { id: '15', name: 'Motivator', description: 'Inspire 10 users to complete workouts', icon: '🔥', unlocked: false, progress: 0, maxProgress: 10 }
      ],
      leaderboard: true,
      voiceControl: true,
      gestureControl: true,
      biofeedback: true
    },
    {
      id: 'ai-mindfulness-journey',
      name: 'AI Mindfulness Journey',
      description: 'Personalized mindfulness journey with AI guidance and community support',
      category: 'meditation',
      duration: 20,
      difficulty: 'beginner',
      points: 300,
      icon: '🌱',
      color: 'from-teal-500 to-cyan-600',
      features: ['AI personalization', 'Community support', 'Progress tracking', 'Guided sessions'],
      aiFeatures: ['Personalized guidance', 'Progress analysis', 'Mood prediction', 'Adaptive content'],
      multiplayer: true,
      maxPlayers: 15,
      stressReliefLevel: 10,
      cognitiveBenefits: ['Enhanced mindfulness', 'Better self-awareness', 'Improved focus'],
      socialBenefits: ['Community learning', 'Shared insights', 'Peer mentoring'],
      aiCoaching: true,
      realTimeFeedback: true,
      adaptiveDifficulty: true,
      progressTracking: true,
      achievements: [
        { id: '16', name: 'Mindfulness Master', description: 'Complete 30-day mindfulness journey', icon: '🌿', unlocked: false, progress: 0, maxProgress: 30 },
        { id: '17', name: 'Wisdom Seeker', description: 'Learn 50 mindfulness techniques', icon: '📚', unlocked: false, progress: 0, maxProgress: 50 },
        { id: '18', name: 'Community Guide', description: 'Help 20 users start their journey', icon: '🌟', unlocked: false, progress: 0, maxProgress: 20 }
      ],
      leaderboard: true,
      voiceControl: true,
      gestureControl: false,
      biofeedback: true
    },
    {
      id: 'bubble-pop-stress-relief',
      name: 'Bubble Pop Stress Relief',
      description: 'Pop virtual bubbles to release stress and tension instantly',
      category: 'creative',
      duration: 5,
      difficulty: 'beginner',
      points: 100,
      icon: '🫧',
      color: 'from-cyan-500 to-blue-600',
      features: ['Satisfying bubble popping', 'Sound effects', 'Visual feedback', 'Stress release'],
      aiFeatures: ['Stress level detection', 'Adaptive bubble patterns', 'Calming effects', 'Progress tracking'],
      multiplayer: false,
      maxPlayers: 1,
      stressReliefLevel: 7,
      cognitiveBenefits: ['Instant stress relief', 'Improved mood', 'Better focus'],
      socialBenefits: ['Personal relaxation', 'Mood improvement', 'Stress management'],
      aiCoaching: false,
      realTimeFeedback: true,
      adaptiveDifficulty: true,
      progressTracking: true,
      achievements: [
        { id: '19', name: 'Bubble Master', description: 'Pop 1000 bubbles', icon: '🫧', unlocked: false, progress: 0, maxProgress: 1000 },
        { id: '20', name: 'Stress Buster', description: 'Reduce stress by 80% in one session', icon: '💨', unlocked: false, progress: 0, maxProgress: 80 },
        { id: '21', name: 'Speed Popper', description: 'Pop 50 bubbles in 30 seconds', icon: '⚡', unlocked: false, progress: 0, maxProgress: 50 }
      ],
      leaderboard: true,
      voiceControl: false,
      gestureControl: true,
      biofeedback: false
    },
    {
      id: 'color-harmony-match',
      name: 'Color Harmony Match',
      description: 'Match colors to create beautiful harmonies and reduce stress',
      category: 'puzzle',
      duration: 8,
      difficulty: 'intermediate',
      points: 120,
      icon: '🎨',
      color: 'from-rainbow-500 to-violet-600',
      features: ['Color matching', 'Harmony creation', 'Visual therapy', 'Stress reduction'],
      aiFeatures: ['Color psychology', 'Harmony suggestions', 'Mood-based themes', 'Visual feedback'],
      multiplayer: true,
      maxPlayers: 4,
      stressReliefLevel: 6,
      cognitiveBenefits: ['Visual processing', 'Color recognition', 'Pattern matching'],
      socialBenefits: ['Shared creations', 'Community galleries', 'Collaborative art'],
      aiCoaching: true,
      realTimeFeedback: true,
      adaptiveDifficulty: true,
      progressTracking: true,
      achievements: [
        { id: '22', name: 'Color Master', description: 'Create 50 color harmonies', icon: '🌈', unlocked: false, progress: 0, maxProgress: 50 },
        { id: '23', name: 'Harmony Seeker', description: 'Match 100 perfect color combinations', icon: '🎭', unlocked: false, progress: 0, maxProgress: 100 },
        { id: '24', name: 'Visual Artist', description: 'Complete 25 visual therapy sessions', icon: '👁️', unlocked: false, progress: 0, maxProgress: 25 }
      ],
      leaderboard: true,
      voiceControl: false,
      gestureControl: true,
      biofeedback: false
    },
    {
      id: 'sound-wave-meditation',
      name: 'Sound Wave Meditation',
      description: 'Create and follow sound waves for deep meditation and relaxation',
      category: 'meditation',
      duration: 12,
      difficulty: 'intermediate',
      points: 150,
      icon: '🌊',
      color: 'from-indigo-500 to-purple-600',
      features: ['Sound wave creation', 'Meditation guidance', 'Audio therapy', 'Deep relaxation'],
      aiFeatures: ['Sound pattern analysis', 'Meditation optimization', 'Stress level monitoring', 'Personalized audio'],
      multiplayer: true,
      maxPlayers: 6,
      stressReliefLevel: 8,
      cognitiveBenefits: ['Deep relaxation', 'Improved sleep', 'Better concentration'],
      socialBenefits: ['Group meditation', 'Shared soundscapes', 'Community healing'],
      aiCoaching: true,
      realTimeFeedback: true,
      adaptiveDifficulty: true,
      progressTracking: true,
      achievements: [
        { id: '25', name: 'Sound Master', description: 'Create 30 sound wave patterns', icon: '🎵', unlocked: false, progress: 0, maxProgress: 30 },
        { id: '26', name: 'Meditation Guru', description: 'Complete 40 sound meditation sessions', icon: '🧘‍♂️', unlocked: false, progress: 0, maxProgress: 40 },
        { id: '27', name: 'Harmony Creator', description: 'Design 20 harmonious soundscapes', icon: '🎼', unlocked: false, progress: 0, maxProgress: 20 }
      ],
      leaderboard: true,
      voiceControl: true,
      gestureControl: false,
      biofeedback: true
    },
    {
      id: 'zen-garden-creator',
      name: 'Zen Garden Creator',
      description: 'Design and maintain your own digital zen garden for peace and tranquility',
      category: 'creative',
      duration: 15,
      difficulty: 'beginner',
      points: 180,
      icon: '🏮',
      color: 'from-emerald-500 to-green-600',
      features: ['Garden design', 'Zen elements', 'Peaceful environment', 'Stress relief'],
      aiFeatures: ['Garden optimization', 'Zen principles', 'Peace enhancement', 'Personalized spaces'],
      multiplayer: true,
      maxPlayers: 8,
      stressReliefLevel: 9,
      cognitiveBenefits: ['Creative expression', 'Peace of mind', 'Stress reduction'],
      socialBenefits: ['Shared gardens', 'Community spaces', 'Peaceful connections'],
      aiCoaching: true,
      realTimeFeedback: true,
      adaptiveDifficulty: true,
      progressTracking: true,
      achievements: [
        { id: '28', name: 'Zen Master', description: 'Create 10 zen gardens', icon: '🏮', unlocked: false, progress: 0, maxProgress: 10 },
        { id: '29', name: 'Peace Keeper', description: 'Maintain gardens for 30 days', icon: '🕊️', unlocked: false, progress: 0, maxProgress: 30 },
        { id: '30', name: 'Garden Designer', description: 'Design 25 unique garden elements', icon: '🌿', unlocked: false, progress: 0, maxProgress: 25 }
      ],
      leaderboard: true,
      voiceControl: false,
      gestureControl: true,
      biofeedback: false
    }
  ]

  // Game Engine Functions
  const initializeGameEngine = (gameId: string) => {
    switch (gameId) {
      case 'ai-breathing-master':
        return initializeBreathingGame()
      case 'mindful-puzzle-pro':
        return initializePuzzleGame()
      case 'social-meditation-hub':
        return initializeMeditationGame()
      case 'ai-emotion-artist':
        return initializeArtGame()
      case 'biofeedback-fitness':
        return initializeFitnessGame()
      case 'ai-mindfulness-journey':
        return initializeMindfulnessGame()
      case 'bubble-pop-stress-relief':
        return initializeBubbleGame()
      case 'color-harmony-match':
        return initializeColorGame()
      case 'sound-wave-meditation':
        return initializeSoundGame()
      case 'zen-garden-creator':
        return initializeZenGame()
      default:
        return null
    }
  }

  const initializeBreathingGame = () => {
    const breathingPatterns = [
      { inhale: 4, hold: 4, exhale: 6 }, // Box breathing
      { inhale: 4, hold: 7, exhale: 8 }, // 4-7-8 technique
      { inhale: 5, hold: 5, exhale: 5 }, // Equal breathing
    ]
    
    return {
      pattern: breathingPatterns[Math.floor(Math.random() * breathingPatterns.length)],
      phase: 'inhale',
      timer: 0,
      cycles: 0,
      maxCycles: 10,
      accuracy: 0,
      stressLevel: 100
    }
  }

  const initializePuzzleGame = () => {
    const gridSize = 3 + Math.floor(currentLevel / 3)
    const grid = Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill(null).map(() => ({
        value: Math.floor(Math.random() * 6) + 1,
        matched: false,
        selected: false
      }))
    )
    
    return {
      grid,
      moves: 0,
      maxMoves: gridSize * gridSize * 2,
      matches: 0,
      targetMatches: Math.floor((gridSize * gridSize) / 2),
      timeLimit: 300 - (currentLevel * 10)
    }
  }

  const initializeMeditationGame = () => {
    const participants = mockOnlinePlayers.slice(0, 5).map((p: Player) => ({
      ...p,
      meditationState: 'joining',
      focusLevel: 0,
      breathingRate: 0
    }))
    
    return {
      participants,
      sessionType: 'mindfulness',
      duration: 15 * 60,
      guidance: 'Focus on your breath. Inhale deeply, exhale slowly.',
      groupEnergy: 0,
      sharedInsights: []
    }
  }

  const initializeArtGame = () => {
    return {
      canvas: null,
      brushSize: 5,
      color: '#ff6b6b',
      emotions: ['joy', 'calm', 'energy', 'reflection'],
      currentEmotion: 'joy',
      strokes: [],
      aiSuggestions: [],
      communityRating: 0
    }
  }

  const initializeFitnessGame = () => {
    return {
      exerciseType: 'stress-relief',
      reps: 0,
      targetReps: 20,
      form: 100,
      heartRate: 70,
      energy: 100,
      motivation: 100,
      aiCoaching: true
    }
  }

  const initializeMindfulnessGame = () => {
    return {
      journeyStep: 0,
      totalSteps: 30,
      dailyPractice: 0,
      insights: [],
      communitySupport: 0,
      personalGrowth: 0,
      aiGuidance: true
    }
  }

  const initializeBubbleGame = () => {
    return {
      bubbles: [],
      maxBubbles: 50,
      popCount: 0,
      stressLevel: 100,
      satisfaction: 0,
      timeLimit: 300
    }
  }

  const initializeColorGame = () => {
    return {
      colorPalette: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'],
      currentColors: [],
      targetHarmony: [],
      matches: 0,
      score: 0,
      timeLimit: 480
    }
  }

  const initializeSoundGame = () => {
    return {
      soundWaves: [],
      frequency: 440,
      amplitude: 1,
      meditationLevel: 0,
      stressReduction: 0,
      timeLimit: 720
    }
  }

  const initializeZenGame = () => {
    return {
      gardenElements: [],
      zenLevel: 0,
      peaceScore: 0,
      maintenanceDays: 0,
      communityRating: 0,
      timeLimit: 900
    }
  }

  // Game Loop
  const gameLoop = () => {
    if (!selectedGame || gameState !== 'playing') return

    const engine = gameEngineRef.current
    if (!engine) return

    switch (selectedGame.id) {
      case 'ai-breathing-master':
        updateBreathingGame(engine)
        break
      case 'mindful-puzzle-pro':
        updatePuzzleGame(engine)
        break
      case 'social-meditation-hub':
        updateMeditationGame(engine)
        break
      case 'ai-emotion-artist':
        updateArtGame(engine)
        break
      case 'biofeedback-fitness':
        updateFitnessGame(engine)
        break
      case 'ai-mindfulness-journey':
        updateMindfulnessGame(engine)
        break
      case 'bubble-pop-stress-relief':
        updateBubbleGame(engine)
        break
      case 'color-harmony-match':
        updateColorGame(engine)
        break
      case 'sound-wave-meditation':
        updateSoundGame(engine)
        break
      case 'zen-garden-creator':
        updateZenGame(engine)
        break
    }

    animationRef.current = requestAnimationFrame(gameLoop)
  }

  const updateBreathingGame = (engine: any) => {
    engine.timer++
    
    const pattern = engine.pattern
    let currentPhase = engine.phase
    
    if (engine.timer >= pattern[currentPhase]) {
      engine.timer = 0
      
      if (currentPhase === 'inhale') {
        currentPhase = 'hold'
        setAiFeedback('Hold your breath...')
      } else if (currentPhase === 'hold') {
        currentPhase = 'exhale'
        setAiFeedback('Exhale slowly...')
      } else {
        currentPhase = 'inhale'
        engine.cycles++
        setAiFeedback('Great! Now inhale deeply...')
        
        if (engine.cycles >= engine.maxCycles) {
          completeGame()
          return
        }
      }
      
      engine.phase = currentPhase
      setBreathingPhase(currentPhase)
    }
    
    // Update stress level
    engine.stressLevel = Math.max(0, engine.stressLevel - 0.5)
    setGameProgress((engine.cycles / engine.maxCycles) * 100)
    
    // Add score based on breathing accuracy
    addScore(Math.floor(engine.stressLevel / 10))
  }

  const updatePuzzleGame = (engine: any) => {
    if (!engine || !engine.grid) return
    
    // Check for matches
    const matches = findMatches(engine.grid)
    if (matches.length > 0) {
      engine.matches += matches.length
      engine.moves++
      setPuzzleMoves(engine.moves)
      
      // Update score
      addScore(matches.length * 10)
      
      // Check win condition
      if (engine.matches >= engine.targetMatches) {
        completeGame()
        return
      }
    }
    
    // Check time limit
    if (timeLeft <= 0) {
      endGame()
      return
    }
    
    setGameProgress((engine.matches / engine.targetMatches) * 100)
  }

  const updateMeditationGame = (engine: any) => {
    if (!engine || !engine.participants) return
    
    // Update participant states
    engine.participants.forEach((participant: any) => {
      participant.focusLevel = Math.min(100, participant.focusLevel + Math.random() * 2)
      participant.breathingRate = 60 + Math.sin(Date.now() / 1000) * 10
    })
    
    // Calculate group energy
    engine.groupEnergy = engine.participants.reduce((sum: number, p: any) => sum + p.focusLevel, 0) / engine.participants.length
    
    // Add shared insights
    if (Math.random() < 0.1) {
      const insights = [
        'I feel more centered now',
        'The group energy is amazing',
        'This is exactly what I needed',
        'I can feel the stress melting away'
      ]
      engine.sharedInsights.push({
        user: engine.participants[Math.floor(Math.random() * engine.participants.length)].name,
        message: insights[Math.floor(Math.random() * insights.length)],
        timestamp: Date.now()
      })
    }
    
    setGameProgress((timeLeft / (selectedGame?.duration || 15 * 60)) * 100)
  }

  const updateArtGame = (engine: any) => {
    // AI analyzes the artwork
    if (engine.strokes.length > 10) {
      const emotionAnalysis = analyzeArtwork(engine.strokes)
      engine.currentEmotion = emotionAnalysis.emotion
      engine.aiSuggestions.push(emotionAnalysis.suggestion)
    }
    
    // Community interaction simulation
    if (Math.random() < 0.05) {
      engine.communityRating += Math.random() * 5
      addScore(Math.floor(engine.communityRating))
    }
    
    setGameProgress((engine.strokes.length / 50) * 100)
  }

  const updateFitnessGame = (engine: any) => {
    // Simulate exercise progress
    if (Math.random() < 0.3) {
      engine.reps++
      setFitnessReps(engine.reps)
      
      // Update form and energy
      engine.form = Math.max(50, engine.form - Math.random() * 2)
      engine.energy = Math.max(0, engine.energy - Math.random() * 3)
      engine.heartRate = Math.min(180, engine.heartRate + Math.random() * 5)
      
      // AI coaching
      if (engine.form < 70) {
        setAiFeedback('Focus on your form! Keep your back straight.')
      } else if (engine.energy < 30) {
        setAiFeedback('Great work! Take a moment to catch your breath.')
      } else {
        setAiFeedback('Excellent form! Keep going!')
      }
      
      addScore(engine.form)
    }
    
    // Check completion
    if (engine.reps >= engine.targetReps) {
      completeGame()
      return
    }
    
    setGameProgress((engine.reps / engine.targetReps) * 100)
  }

  const updateMindfulnessGame = (engine: any) => {
    // Progress through mindfulness journey
    if (timeLeft % 60 === 0) {
      engine.journeyStep++
      setMindfulnessStep(engine.journeyStep)
      
      // Generate insights
      const insights = [
        'I notice my thoughts are becoming clearer',
        'I feel more connected to the present moment',
        'My awareness is expanding',
        'I\'m learning to observe without judgment'
      ]
      
      engine.insights.push({
        step: engine.journeyStep,
        insight: insights[Math.floor(Math.random() * insights.length)],
        timestamp: Date.now()
      })
      
      // Community support
      engine.communitySupport += Math.random() * 10
      engine.personalGrowth += Math.random() * 15
      
      addScore(engine.personalGrowth)
    }
    
    setGameProgress((engine.journeyStep / engine.totalSteps) * 100)
  }

  const updateBubbleGame = (engine: any) => {
    // Generate new bubbles
    if (Math.random() < 0.1 && engine.bubbles.length < engine.maxBubbles) {
      engine.bubbles.push({
        id: Date.now(),
        x: Math.random() * 100,
        y: 100,
        size: Math.random() * 30 + 20,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)],
        speed: Math.random() * 2 + 1
      })
    }
    
    // Update bubble positions
    engine.bubbles.forEach((bubble: any) => {
      bubble.y -= bubble.speed
      if (bubble.y < -50) {
        engine.bubbles = engine.bubbles.filter((b: any) => b.id !== bubble.id)
      }
    })
    
    // Update stress level
    engine.stressLevel = Math.max(0, engine.stressLevel - 0.2)
    setGameProgress((engine.popCount / 100) * 100)
    
    addScore(engine.popCount)
  }

  const updateColorGame = (engine: any) => {
    // Generate new color combinations
    if (Math.random() < 0.05) {
      engine.targetHarmony = engine.colorPalette.slice(0, 3).sort(() => Math.random() - 0.5)
    }
    
    // Check for matches
    if (engine.currentColors.length === 3) {
      const match = engine.currentColors.every((color: string, index: number) => 
        color === engine.targetHarmony[index]
      )
      
      if (match) {
        engine.matches++
        engine.score += 50
        addScore(50)
        toast.success('Perfect color harmony! 🎨')
      }
      
      engine.currentColors = []
    }
    
    setGameProgress((engine.matches / 20) * 100)
  }

  const updateSoundGame = (engine: any) => {
    // Generate sound waves
    if (Math.random() < 0.1) {
      engine.soundWaves.push({
        id: Date.now(),
        frequency: engine.frequency + Math.random() * 100 - 50,
        amplitude: engine.amplitude,
        duration: Math.random() * 5 + 2
      })
    }
    
    // Update meditation level
    engine.meditationLevel = Math.min(100, engine.meditationLevel + Math.random() * 0.5)
    engine.stressReduction = Math.min(100, engine.stressReduction + Math.random() * 0.3)
    
    setGameProgress((engine.meditationLevel / 100) * 100)
    addScore(Math.floor(engine.meditationLevel))
  }

  const updateZenGame = (engine: any) => {
    // Add garden elements
    if (Math.random() < 0.05) {
      const elements = ['rock', 'sand', 'moss', 'bamboo', 'water', 'bridge']
      engine.gardenElements.push({
        id: Date.now(),
        type: elements[Math.floor(Math.random() * elements.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 50 + 25
      })
    }
    
    // Update zen level
    engine.zenLevel = Math.min(100, engine.zenLevel + Math.random() * 0.3)
    engine.peaceScore = Math.min(100, engine.peaceScore + Math.random() * 0.2)
    
    setGameProgress((engine.zenLevel / 100) * 100)
    addScore(Math.floor(engine.zenLevel))
  }

  const findMatches = (grid: any[][]) => {
    const matches: any[] = []
    
    // Check horizontal matches
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length - 2; col++) {
        if (grid[row][col].value === grid[row][col + 1].value && 
            grid[row][col].value === grid[row][col + 2].value) {
          matches.push({ row, col, direction: 'horizontal' })
        }
      }
    }
    
    // Check vertical matches
    for (let row = 0; row < grid.length - 2; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col].value === grid[row + 1][col].value && 
            grid[row][col].value === grid[row + 2][col].value) {
          matches.push({ row, col, direction: 'vertical' })
        }
      }
    }
    
    return matches
  }

  const analyzeArtwork = (strokes: any[]) => {
    const colors = strokes.map(s => s.color)
    const redCount = colors.filter(c => c.includes('ff')).length
    const blueCount = colors.filter(c => c.includes('00')).length
    const greenCount = colors.filter(c => c.includes('00') && c.includes('ff')).length
    
    let emotion = 'joy'
    let suggestion = 'Try adding more vibrant colors!'
    
    if (redCount > blueCount && redCount > greenCount) {
      emotion = 'energy'
      suggestion = 'Your energy is amazing! Try some calming blues.'
    } else if (blueCount > redCount && blueCount > greenCount) {
      emotion = 'calm'
      suggestion = 'Beautiful calm energy! Add some warm tones for balance.'
    } else if (greenCount > redCount && greenCount > blueCount) {
      emotion = 'growth'
      suggestion = 'I see growth and renewal! Add some purples for wisdom.'
    }
    
    return { emotion, suggestion }
  }

  const completeGame = () => {
    if (!selectedGame) return
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    setGameState('completed')
    setIsPlaying(false)
    setAiCoaching(false)
    
    // Calculate final score
    const finalScore = score + (timeLeft * 2) + Math.floor(gameProgress * 10)
    setScore(finalScore)
    
    // Unlock achievements
    const newAchievements = selectedGame.achievements.filter(a => !a.unlocked)
    if (newAchievements.length > 0) {
      const randomAchievement = newAchievements[Math.floor(Math.random() * newAchievements.length)]
      randomAchievement.unlocked = true
      toast.success(`Achievement Unlocked: ${randomAchievement.name}! 🏆`)
    }
    
    toast.success(`Game completed! Final score: ${finalScore} 🎉`)
  }

  // Interactive Game Controls
  const handlePuzzleClick = (row: number, col: number) => {
    if (!selectedGame || selectedGame.id !== 'mindful-puzzle-pro') return
    
    const engine = gameEngineRef.current
    if (!engine) return
    
    // Toggle selection
    engine.grid[row][col].selected = !engine.grid[row][col].selected
    
    // Check for matches
    const matches = findMatches(engine.grid)
    if (matches.length > 0) {
      // Clear matches
      matches.forEach(match => {
        if (match.direction === 'horizontal') {
          for (let i = 0; i < 3; i++) {
            engine.grid[match.row][match.col + i].matched = true
          }
        } else {
          for (let i = 0; i < 3; i++) {
            engine.grid[match.row + i][match.col].matched = true
          }
        }
      })
      
      // Add new tiles
      setTimeout(() => {
        matches.forEach(match => {
          if (match.direction === 'horizontal') {
            for (let i = 0; i < 3; i++) {
              engine.grid[match.row][match.col + i] = {
                value: Math.floor(Math.random() * 6) + 1,
                matched: false,
                selected: false
              }
            }
          } else {
            for (let i = 0; i < 3; i++) {
              engine.grid[match.row + i][match.col] = {
                value: Math.floor(Math.random() * 6) + 1,
                matched: false,
                selected: false
              }
            }
          }
        })
        setPuzzleGrid([...engine.grid])
      }, 300)
    }
    
    setPuzzleGrid([...engine.grid])
  }

  const handleArtStroke = (x: number, y: number, color: string) => {
    if (!selectedGame || selectedGame.id !== 'ai-emotion-artist') return
    
    const engine = gameEngineRef.current
    if (!engine) return
    
    engine.strokes.push({
      x,
      y,
      color,
      timestamp: Date.now()
    })
    
    addScore(5)
  }

  const handleFitnessAction = () => {
    if (!selectedGame || selectedGame.id !== 'biofeedback-fitness') return
    
    const engine = gameEngineRef.current
    if (!engine) return
    
    engine.reps++
    setFitnessReps(engine.reps)
    
    // Simulate form variation
    engine.form = Math.max(50, engine.form - Math.random() * 5)
    
    addScore(engine.form)
  }

  const handleBubblePop = (bubbleId: number) => {
    if (!selectedGame || selectedGame.id !== 'bubble-pop-stress-relief') return
    
    const engine = gameEngineRef.current
    if (!engine) return
    
    engine.bubbles = engine.bubbles.filter((b: any) => b.id !== bubbleId)
    engine.popCount++
    setBubblePopCount(engine.popCount)
    
    // Satisfying pop effect
    toast.success('Pop! 💨')
    addScore(10)
  }

  const handleColorSelect = (color: string) => {
    if (!selectedGame || selectedGame.id !== 'color-harmony-match') return
    
    const engine = gameEngineRef.current
    if (!engine) return
    
    engine.currentColors.push(color)
    
    if (engine.currentColors.length === 3) {
      // Check for harmony
      const match = engine.currentColors.every((c: string, index: number) => 
        c === engine.targetHarmony[index]
      )
      
      if (match) {
        engine.matches++
        engine.score += 50
        addScore(50)
        toast.success('Perfect harmony! 🎨')
      } else {
        toast.error('Try again! 🎨')
      }
      
      engine.currentColors = []
    }
  }

  const handleSoundWaveCreate = () => {
    if (!selectedGame || selectedGame.id !== 'sound-wave-meditation') return
    
    const engine = gameEngineRef.current
    if (!engine) return
    
    engine.soundWaves.push({
      id: Date.now(),
      frequency: engine.frequency + Math.random() * 100 - 50,
      amplitude: engine.amplitude,
      duration: Math.random() * 5 + 2
    })
    
    engine.meditationLevel = Math.min(100, engine.meditationLevel + 5)
    addScore(20)
    toast.success('Beautiful sound wave! 🌊')
  }

  const handleZenElementAdd = (elementType: string) => {
    if (!selectedGame || selectedGame.id !== 'zen-garden-creator') return
    
    const engine = gameEngineRef.current
    if (!engine) return
    
    engine.gardenElements.push({
      id: Date.now(),
      type: elementType,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 50 + 25
    })
    
    engine.zenLevel = Math.min(100, engine.zenLevel + 10)
    addScore(30)
    toast.success('Peaceful addition! 🏮')
  }

  // Enhanced startGame function
  const startGame = (game: Game) => {
    setSelectedGame(game)
    setIsPlaying(true)
    setGameState('playing')
    setTimeLeft(game.duration * 60)
    setScore(0)
    setGameProgress(0)
    setCurrentLevel(1)
    setAiFeedback('')
    
    // Initialize game engine
    const engine = initializeGameEngine(game.id)
    gameEngineRef.current = engine
    
    // Initialize game-specific states
    if (game.id === 'mindful-puzzle-pro') {
      setPuzzleGrid(engine.grid)
      setPuzzleMoves(0)
    } else if (game.id === 'social-meditation-hub') {
      setMeditationParticipants(engine.participants)
    } else if (game.id === 'biofeedback-fitness') {
      setFitnessReps(0)
    } else if (game.id === 'ai-mindfulness-journey') {
      setMindfulnessStep(0)
    } else if (game.id === 'bubble-pop-stress-relief') {
      setBubblePopCount(0)
    } else if (game.id === 'color-harmony-match') {
      setColorMatchScore(0)
    } else if (game.id === 'sound-wave-meditation') {
      setSoundWaveLevel(0)
    } else if (game.id === 'zen-garden-creator') {
      setZenGardenProgress(0)
    }
    
    const session: GameSession = {
      id: Date.now().toString(),
      gameId: game.id,
      startTime: new Date(),
      score: 0,
      stressReduction: 0,
      moodImprovement: 0,
      focusEnhancement: 0,
      aiInsights: [],
      socialInteractions: 0,
      achievements: []
    }
    setCurrentSession(session)

    // Start AI coaching if enabled
    if (game.aiCoaching) {
      setAiCoaching(true)
      toast.success('AI Coach activated! 🤖')
    }

    // Start timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Start game loop
    gameLoop()

    toast.success(`Starting ${game.name}! 🎮`)
  }

  // Enhanced endGame function
  const endGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    setIsPlaying(false)
    setGameState('completed')
    setAiCoaching(false)

    if (currentSession && selectedGame) {
      const finalSession: GameSession = {
        ...currentSession,
        endTime: new Date(),
        score: score,
        stressReduction: Math.floor(Math.random() * 40) + 60,
        moodImprovement: Math.floor(Math.random() * 30) + 70,
        focusEnhancement: Math.floor(Math.random() * 35) + 65,
        aiInsights: [
          'Great focus maintained throughout the session!',
          'Your breathing pattern shows excellent stress management.',
          'Consider trying the advanced difficulty next time.'
        ],
        socialInteractions: Math.floor(Math.random() * 5) + 1,
        achievements: ['First Session', 'Stress Buster']
      }
      setCurrentSession(finalSession)

      // Update game stats
      setGameStats(prev => ({
        ...prev,
        totalGames: prev.totalGames + 1,
        totalScore: prev.totalScore + score,
        stressReduction: prev.stressReduction + finalSession.stressReduction,
        moodImprovement: prev.moodImprovement + finalSession.moodImprovement,
        focusEnhancement: prev.focusEnhancement + finalSession.focusEnhancement,
        socialConnections: prev.socialConnections + finalSession.socialInteractions
      }))

      toast.success(`Session completed! Score: ${score} 🎉`)
    }
  }

  // Enhanced pauseGame function
  const pauseGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    setIsPlaying(false)
    setGameState('paused')
    toast.success('Game paused ⏸️')
  }

  // Enhanced resumeGame function
  const resumeGame = () => {
    setIsPlaying(true)
    setGameState('playing')
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    gameLoop()
    toast.success('Game resumed ▶️')
  }

  const addScore = (points: number) => {
    setScore(prev => prev + points)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'advanced': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30'
      case 'expert': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai-powered': return <Brain className="w-5 h-5" />
      case 'social': return <Users className="w-5 h-5" />
      case 'multiplayer': return <MessageCircle className="w-5 h-5" />
      case 'breathing': return <Heart className="w-5 h-5" />
      case 'puzzle': return <Target className="w-5 h-5" />
      case 'meditation': return <Sparkles className="w-5 h-5" />
      case 'physical': return <Zap className="w-5 h-5" />
      case 'creative': return <Star className="w-5 h-5" />
      default: return <Trophy className="w-5 h-5" />
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Stress Relief Games</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Interactive games for instant stress relief and mental wellness
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                <Trophy className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowAchievements(!showAchievements)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                <Award className="w-5 h-5" />
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
            {!selectedGame ? (
              <div className="space-y-6">
                {/* Game Stats */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{gameStats.totalGames}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Games Played</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{gameStats.totalScore}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Score</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{gameStats.stressReduction}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Stress Reduced</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{gameStats.moodImprovement}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Mood Improved</div>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">{gameStats.focusEnhancement}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Focus Enhanced</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{gameStats.socialConnections}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Social Connections</div>
                  </div>
                </div>

                {/* Online Players */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-500" />
                    <span>Online Players ({onlinePlayers.filter(p => p.isOnline).length})</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {onlinePlayers.filter(p => p.isOnline).map((player) => (
                      <div key={player.id} className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{player.avatar}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-gray-900 dark:text-white">{player.name}</h4>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                              <span>Level {player.level}</span>
                              <span>{player.score} pts</span>
                            </div>
                          </div>
                          {player.currentGame && (
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                              Playing
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Games Grid */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Your Stress Relief Game</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map((game) => (
                      <motion.div
                        key={game.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => startGame(game)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${game.color} flex items-center justify-center text-white text-xl`}>
                            {game.icon}
                          </div>
                          <div className="flex items-center space-x-2">
                            {game.aiCoaching && <Brain className="w-4 h-4 text-purple-500" />}
                            {game.multiplayer && <Users className="w-4 h-4 text-blue-500" />}
                            {game.voiceControl && <Mic className="w-4 h-4 text-green-500" />}
                            {game.biofeedback && <Heart className="w-4 h-4 text-red-500" />}
                          </div>
                        </div>

                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{game.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{game.description}</p>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Difficulty:</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(game.difficulty)}`}>
                              {game.difficulty}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Duration:</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{game.duration} min</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Points:</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{game.points}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Stress Relief:</span>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${
                                    i < Math.floor(game.stressReliefLevel / 2) ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          {game.multiplayer && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Max Players:</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{game.maxPlayers}</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                          <div className="flex flex-wrap gap-1">
                            {game.features.slice(0, 3).map((feature, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Game Interface */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedGame.color} flex items-center justify-center text-white text-2xl`}>
                        {selectedGame.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedGame.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{selectedGame.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {gameState === 'playing' && (
                        <button
                          onClick={pauseGame}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors"
                        >
                          <Pause className="w-5 h-5" />
                        </button>
                      )}
                      {gameState === 'paused' && (
                        <button
                          onClick={resumeGame}
                          className="p-2 rounded-lg bg-green-100 hover:bg-green-200 dark:bg-green-600 dark:hover:bg-green-500 transition-colors"
                        >
                          <Play className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedGame(null)
                          setGameState('menu')
                          setIsPlaying(false)
                        }}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Game Stats */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatTime(timeLeft)}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Time Left</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{score}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{selectedGame.stressReliefLevel}/10</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Stress Relief</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{Math.floor(gameProgress)}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
                    </div>
                  </div>

                  {/* AI Coaching Panel */}
                  {aiCoaching && (
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Brain className="w-6 h-6 text-purple-600" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">AI Coach</h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {aiFeedback || "Great progress! Your breathing pattern is showing excellent stress management. Try to maintain this rhythm."}
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">Real-time feedback active</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Interactive Game Canvas */}
                  <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
                    {selectedGame.id === 'ai-breathing-master' && (
                      <div className="text-center">
                        <div className={`w-32 h-32 mx-auto mb-6 rounded-full border-4 transition-all duration-1000 ${
                          breathingPhase === 'inhale' ? 'border-blue-500 scale-110' :
                          breathingPhase === 'hold' ? 'border-yellow-500 scale-125' :
                          'border-green-500 scale-100'
                        }`}>
                          <div className="flex items-center justify-center h-full">
                            <Heart className={`w-12 h-12 ${
                              breathingPhase === 'inhale' ? 'text-blue-500' :
                              breathingPhase === 'hold' ? 'text-yellow-500' :
                              'text-green-500'
                            }`} />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 capitalize">{breathingPhase}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {breathingPhase === 'inhale' ? 'Breathe in deeply...' :
                           breathingPhase === 'hold' ? 'Hold your breath...' :
                           'Breathe out slowly...'}
                        </p>
                        <div className="flex justify-center space-x-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{Math.floor(gameProgress)}%</div>
                            <div className="text-sm text-gray-600">Progress</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{Math.floor(100 - gameProgress)}%</div>
                            <div className="text-sm text-gray-600">Stress Reduced</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedGame.id === 'mindful-puzzle-pro' && (
                      <div className="text-center">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold mb-2">Match the Colors</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Click tiles to match 3 or more of the same color
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-4">
                          {puzzleGrid.map((row, rowIndex) => 
                            row.map((tile, colIndex) => (
                              <button
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => handlePuzzleClick(rowIndex, colIndex)}
                                className={`w-16 h-16 rounded-lg border-2 transition-all ${
                                  tile.matched ? 'bg-gray-300 opacity-50' :
                                  tile.selected ? 'border-blue-500 bg-blue-100' :
                                  'border-gray-300 hover:border-blue-400'
                                }`}
                                style={{
                                  backgroundColor: tile.matched ? '#e5e7eb' : 
                                    ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][tile.value - 1]
                                }}
                              >
                                {tile.value}
                              </button>
                            ))
                          )}
                        </div>
                        <div className="flex justify-center space-x-6">
                          <div className="text-center">
                            <div className="text-xl font-bold text-blue-600">{puzzleMoves}</div>
                            <div className="text-sm text-gray-600">Moves</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-green-600">{Math.floor(gameProgress)}%</div>
                            <div className="text-sm text-gray-600">Progress</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedGame.id === 'social-meditation-hub' && (
                      <div className="text-center">
                        <div className="mb-6">
                          <h3 className="text-lg font-bold mb-2">Group Meditation</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {meditationParticipants.length} people meditating together
                          </p>
                          <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
                            {meditationParticipants.map((participant, index) => (
                              <div key={participant.id} className="text-center">
                                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-lg">
                                  {participant.avatar}
                                </div>
                                <div className="text-xs text-gray-600">{participant.name}</div>
                                <div className="text-xs text-green-600">
                                  {Math.floor(Math.random() * 100)}% focused
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold mb-2">Group Energy</h4>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${Math.floor(gameProgress)}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            {Math.floor(gameProgress)}% collective focus
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedGame.id === 'ai-emotion-artist' && (
                      <div className="text-center">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold mb-2">Express Your Emotions</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Create art that reflects your current emotional state
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-4">
                          <canvas
                            ref={gameCanvasRef}
                            className="w-full h-48 bg-white rounded-lg border border-gray-200 cursor-crosshair"
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect()
                              const x = e.clientX - rect.left
                              const y = e.clientY - rect.top
                              const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3']
                              const color = colors[Math.floor(Math.random() * colors.length)]
                              handleArtStroke(x, y, color)
                            }}
                          />
                        </div>
                        <div className="flex justify-center space-x-4">
                          <div className="text-center">
                            <div className="text-xl font-bold text-purple-600">{Math.floor(gameProgress)}%</div>
                            <div className="text-sm text-gray-600">Art Progress</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-pink-600">Joy</div>
                            <div className="text-sm text-gray-600">Detected Emotion</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedGame.id === 'biofeedback-fitness' && (
                      <div className="text-center">
                        <div className="mb-6">
                          <h3 className="text-lg font-bold mb-2">Stress Relief Workout</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Follow the AI coach for optimal form and stress relief
                          </p>
                          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-2xl animate-pulse">
                            💪
                          </div>
                          <button
                            onClick={handleFitnessAction}
                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-semibold"
                          >
                            Complete Rep
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-xl font-bold text-orange-600">{fitnessReps}</div>
                            <div className="text-sm text-gray-600">Reps</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-green-600">85%</div>
                            <div className="text-sm text-gray-600">Form</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-blue-600">120</div>
                            <div className="text-sm text-gray-600">Heart Rate</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedGame.id === 'ai-mindfulness-journey' && (
                      <div className="text-center">
                        <div className="mb-6">
                          <h3 className="text-lg font-bold mb-2">Mindfulness Journey</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Day {mindfulnessStep} of your 30-day mindfulness journey
                          </p>
                          <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-3xl">
                            🌱
                          </div>
                          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg p-4 mb-4">
                            <h4 className="font-semibold mb-2">Today's Insight</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              "I notice my thoughts are becoming clearer and more focused as I practice mindfulness."
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-xl font-bold text-teal-600">{mindfulnessStep}</div>
                            <div className="text-sm text-gray-600">Days Completed</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-cyan-600">{Math.floor(gameProgress)}%</div>
                            <div className="text-sm text-gray-600">Journey Progress</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedGame.id === 'bubble-pop-stress-relief' && (
                      <div className="text-center">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold mb-2">Pop Stress Away!</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Click bubbles to pop them and release stress
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-4 h-64 relative overflow-hidden">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => handleBubblePop(i)}
                              className="absolute animate-bounce"
                              style={{
                                left: `${Math.random() * 80 + 10}%`,
                                top: `${Math.random() * 80 + 10}%`,
                                width: `${Math.random() * 40 + 20}px`,
                                height: `${Math.random() * 40 + 20}px`,
                                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)],
                                borderRadius: '50%',
                                border: '2px solid rgba(255,255,255,0.3)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                            />
                          ))}
                        </div>
                        <div className="flex justify-center space-x-6">
                          <div className="text-center">
                            <div className="text-xl font-bold text-cyan-600">{bubblePopCount}</div>
                            <div className="text-sm text-gray-600">Bubbles Popped</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-blue-600">{Math.floor(gameProgress)}%</div>
                            <div className="text-sm text-gray-600">Stress Released</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedGame.id === 'color-harmony-match' && (
                      <div className="text-center">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold mb-2">Create Color Harmony</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Select colors to create beautiful harmonies
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-rainbow-50 to-violet-50 dark:from-rainbow-900/20 dark:to-violet-900/20 rounded-lg p-4 mb-4">
                          <div className="grid grid-cols-6 gap-2 mb-4">
                            {['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'].map((color, index) => (
                              <button
                                key={index}
                                onClick={() => handleColorSelect(color)}
                                className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <div className="flex justify-center space-x-2 mb-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <div
                                key={i}
                                className="w-8 h-8 rounded border-2 border-gray-300"
                                style={{ backgroundColor: i < 2 ? '#e5e7eb' : 'transparent' }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-center space-x-6">
                          <div className="text-center">
                            <div className="text-xl font-bold text-rainbow-600">{colorMatchScore}</div>
                            <div className="text-sm text-gray-600">Harmonies</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-violet-600">{Math.floor(gameProgress)}%</div>
                            <div className="text-sm text-gray-600">Progress</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedGame.id === 'sound-wave-meditation' && (
                      <div className="text-center">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold mb-2">Sound Wave Meditation</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Create and follow sound waves for deep relaxation
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-4">
                          <div className="h-32 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg mb-4 relative overflow-hidden">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className="absolute top-1/2 transform -translate-y-1/2 animate-pulse"
                                style={{
                                  left: `${i * 20}%`,
                                  width: '2px',
                                  height: '60px',
                                  backgroundColor: 'rgba(255,255,255,0.8)',
                                  borderRadius: '1px'
                                }}
                              />
                            ))}
                          </div>
                          <button
                            onClick={handleSoundWaveCreate}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
                          >
                            Create Wave
                          </button>
                        </div>
                        <div className="flex justify-center space-x-6">
                          <div className="text-center">
                            <div className="text-xl font-bold text-indigo-600">{soundWaveLevel}</div>
                            <div className="text-sm text-gray-600">Waves Created</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-purple-600">{Math.floor(gameProgress)}%</div>
                            <div className="text-sm text-gray-600">Meditation Level</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedGame.id === 'zen-garden-creator' && (
                      <div className="text-center">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold mb-2">Create Your Zen Garden</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Add elements to create a peaceful zen garden
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg p-4 mb-4">
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            {['rock', 'sand', 'moss', 'bamboo', 'water', 'bridge'].map((element, index) => (
                              <button
                                key={index}
                                onClick={() => handleZenElementAdd(element)}
                                className="p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                              >
                                <div className="text-2xl mb-1">
                                  {element === 'rock' ? '🪨' : 
                                   element === 'sand' ? '🏖️' : 
                                   element === 'moss' ? '🌿' : 
                                   element === 'bamboo' ? '🎋' : 
                                   element === 'water' ? '💧' : '🌉'}
                                </div>
                                <div className="text-xs text-gray-600 capitalize">{element}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-center space-x-6">
                          <div className="text-center">
                            <div className="text-xl font-bold text-emerald-600">{zenGardenProgress}</div>
                            <div className="text-sm text-gray-600">Elements Added</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-green-600">{Math.floor(gameProgress)}%</div>
                            <div className="text-sm text-gray-600">Zen Level</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {!['ai-breathing-master', 'mindful-puzzle-pro', 'social-meditation-hub', 'ai-emotion-artist', 'biofeedback-fitness', 'ai-mindfulness-journey', 'bubble-pop-stress-relief', 'color-harmony-match', 'sound-wave-meditation', 'zen-garden-creator'].includes(selectedGame.id) && (
                      <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                          {selectedGame.name} is running with AI-powered features and real-time feedback!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 