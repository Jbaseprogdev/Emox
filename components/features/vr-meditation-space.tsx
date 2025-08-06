'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye, EyeOff, Volume2, VolumeX, Play, Pause, SkipBack, SkipForward,
  Settings, X, Maximize, Minimize, RotateCw, Heart, Brain, Sparkles,
  Mountain, Waves, Forest, Sun, Moon, Star, Cloud, Leaf, Flower,
  Target, Timer, Users, MessageCircle, Share2, Download
} from 'lucide-react'
import toast from 'react-hot-toast'

interface VRMeditationSpaceProps {
  onClose: () => void
  currentUser?: any
}

interface MeditationEnvironment {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  gradient: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  features: string[]
  ambientSounds: string[]
  visualEffects: string[]
}

interface MeditationSession {
  id: string
  title: string
  description: string
  duration: number
  type: 'guided' | 'silent' | 'music' | 'nature'
  environment: string
  instructor?: string
  rating: number
  completed: boolean
}

export function VRMeditationSpace({ onClose, currentUser }: VRMeditationSpaceProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(600) // 10 minutes
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('forest')
  const [showControls, setShowControls] = useState(true)
  const [sessionType, setSessionType] = useState<'guided' | 'silent' | 'music' | 'nature'>('guided')
  const [isLoading, setIsLoading] = useState(false)

  const environments: MeditationEnvironment[] = [
    {
      id: 'forest',
      name: 'Enchanted Forest',
      description: 'Immerse yourself in a mystical forest with gentle sunlight filtering through ancient trees',
      icon: <Leaf className="w-6 h-6" />,
      gradient: 'from-green-500 to-emerald-600',
      duration: '10-30 min',
      difficulty: 'beginner',
      features: ['Spatial audio', 'Dynamic lighting', 'Interactive elements'],
      ambientSounds: ['Forest birds', 'Rustling leaves', 'Gentle wind'],
      visualEffects: ['Floating particles', 'Sunlight rays', 'Moving shadows']
    },
    {
      id: 'ocean',
      name: 'Ocean Depths',
      description: 'Dive into the calming depths of the ocean with bioluminescent creatures',
      icon: <Waves className="w-6 h-6" />,
      gradient: 'from-blue-500 to-cyan-600',
      duration: '15-45 min',
      difficulty: 'intermediate',
      features: ['Underwater physics', 'Marine life', 'Pressure simulation'],
      ambientSounds: ['Ocean waves', 'Dolphin calls', 'Water currents'],
      visualEffects: ['Bubble streams', 'Light refraction', 'Fish schools']
    },
    {
      id: 'mountain',
      name: 'Mountain Peak',
      description: 'Reach the summit of a majestic mountain with breathtaking panoramic views',
      icon: <Mountain className="w-6 h-6" />,
      gradient: 'from-purple-500 to-indigo-600',
      duration: '20-60 min',
      difficulty: 'advanced',
      features: ['Altitude simulation', 'Weather changes', '360° views'],
      ambientSounds: ['Mountain wind', 'Eagle calls', 'Rock echoes'],
      visualEffects: ['Cloud formations', 'Sunrise/sunset', 'Snow particles']
    },
    {
      id: 'cosmos',
      name: 'Cosmic Journey',
      description: 'Float through the infinite cosmos surrounded by stars and nebulas',
      icon: <Star className="w-6 h-6" />,
      gradient: 'from-indigo-500 to-purple-600',
      duration: '30-90 min',
      difficulty: 'advanced',
      features: ['Zero gravity', 'Galaxy exploration', 'Time dilation'],
      ambientSounds: ['Space ambience', 'Cosmic frequencies', 'Distant stars'],
      visualEffects: ['Nebula clouds', 'Meteor showers', 'Planet rotations']
    }
  ]

  const meditationSessions: MeditationSession[] = [
    {
      id: '1',
      title: 'Mindful Breathing',
      description: 'Learn to control your breath and find inner peace',
      duration: 600,
      type: 'guided',
      environment: 'forest',
      instructor: 'Sarah Chen',
      rating: 4.8,
      completed: false
    },
    {
      id: '2',
      title: 'Body Scan Meditation',
      description: 'Systematically relax each part of your body',
      duration: 900,
      type: 'guided',
      environment: 'ocean',
      instructor: 'Michael Rodriguez',
      rating: 4.9,
      completed: true
    },
    {
      id: '3',
      title: 'Loving Kindness',
      description: 'Cultivate compassion for yourself and others',
      duration: 1200,
      type: 'guided',
      environment: 'mountain',
      instructor: 'Emma Thompson',
      rating: 4.7,
      completed: false
    }
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      toast.success('Meditation session started')
    } else {
      toast.success('Session paused')
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    toast.success(isFullscreen ? 'Exited fullscreen' : 'Entered fullscreen mode')
  }

  const startSession = (session: MeditationSession) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setDuration(session.duration)
      setCurrentTime(0)
      setIsPlaying(true)
      toast.success(`Starting ${session.title} session`)
    }, 2000)
  }

  const selectedEnv = environments.find(env => env.id === selectedEnvironment)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl ${
          isFullscreen ? 'w-full h-full max-w-none max-h-none' : 'max-w-7xl w-full max-h-[90vh]'
        } overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">VR Meditation Space</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Immersive virtual reality meditation with spatial audio and AI guidance
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* VR Environment Viewer */}
          <div className="flex-1 relative bg-gradient-to-br from-gray-900 to-black overflow-hidden">
            {/* Environment Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${selectedEnv?.gradient} opacity-20`} />
            
            {/* VR Scene */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                  {selectedEnv?.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{selectedEnv?.name}</h3>
                <p className="text-white/80 max-w-md">{selectedEnv?.description}</p>
              </div>
            </div>

            {/* VR Controls Overlay */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-xl p-4"
                >
                  <div className="flex items-center space-x-4">
                    {/* Play/Pause */}
                    <button
                      onClick={togglePlay}
                      className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
                    </button>

                    {/* Progress */}
                    <div className="flex items-center space-x-2 text-white">
                      <span className="text-sm">{formatTime(currentTime)}</span>
                      <div className="w-32 h-1 bg-white/30 rounded-full">
                        <div
                          className="h-full bg-white rounded-full"
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm">{formatTime(duration)}</span>
                    </div>

                    {/* Volume */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white hover:text-white/80 transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(parseInt(e.target.value))}
                        className="w-16"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* VR Stats */}
            <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md rounded-lg p-3 text-white">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm">Heart Rate: 72 BPM</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Brain className="w-4 h-4 text-blue-400" />
                <span className="text-sm">Focus: 89%</span>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="w-80 bg-white dark:bg-gray-700 border-l border-gray-200 dark:border-gray-600 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Environment Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Environments</h3>
                <div className="space-y-3">
                  {environments.map((env) => (
                    <button
                      key={env.id}
                      onClick={() => setSelectedEnvironment(env.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        selectedEnvironment === env.id
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${env.gradient} flex items-center justify-center text-white`}>
                          {env.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{env.name}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{env.duration}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{env.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {env.features.slice(0, 2).map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Types */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Session Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['guided', 'silent', 'music', 'nature'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSessionType(type as any)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        sessionType === type
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          {type === 'guided' && <Users className="w-4 h-4 text-white" />}
                          {type === 'silent' && <VolumeX className="w-4 h-4 text-white" />}
                          {type === 'music' && <Volume2 className="w-4 h-4 text-white" />}
                          {type === 'nature' && <Leaf className="w-4 h-4 text-white" />}
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{type}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Sessions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Sessions</h3>
                <div className="space-y-3">
                  {meditationSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{session.title}</h4>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{session.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{session.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Timer className="w-4 h-4" />
                            <span>{formatTime(session.duration)}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{session.instructor}</span>
                          </span>
                        </div>
                        <button
                          onClick={() => startSession(session)}
                          disabled={isLoading}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 text-sm disabled:opacity-50"
                        >
                          {isLoading ? 'Loading...' : 'Start'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* VR Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">VR Features</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Spatial Audio</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">3D sound positioning</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                    <Target className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Eye Tracking</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Focus monitoring</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                    <Heart className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Biofeedback</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Real-time monitoring</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 