'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, Camera, Save, X, BarChart3, TrendingUp, Clock,
  Heart, Zap, Target, CheckCircle, AlertCircle, Info,
  Smile, Frown, Meh, Activity, Calendar, Star
} from 'lucide-react'
import toast from 'react-hot-toast'

interface MentalStateSnapshotProps {
  onClose: () => void
  currentUser?: any
}

interface MentalState {
  id: string
  timestamp: string
  overallMood: number
  energy: number
  stress: number
  focus: number
  motivation: number
  anxiety: number
  happiness: number
  notes: string
  activities: string[]
  triggers: string[]
  copingStrategies: string[]
}

interface AssessmentQuestion {
  id: string
  category: string
  question: string
  options: { value: number; label: string; icon: React.ReactNode }[]
}

export function MentalStateSnapshot({ onClose, currentUser }: MentalStateSnapshotProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [snapshot, setSnapshot] = useState<Partial<MentalState>>({
    overallMood: 5,
    energy: 5,
    stress: 5,
    focus: 5,
    motivation: 5,
    anxiety: 5,
    happiness: 5,
    notes: '',
    activities: [],
    triggers: [],
    copingStrategies: []
  })
  const [savedSnapshots, setSavedSnapshots] = useState<MentalState[]>([])
  const [showHistory, setShowHistory] = useState(false)

  const assessmentQuestions: AssessmentQuestion[] = [
    {
      id: 'mood',
      category: 'Overall Mood',
      question: 'How would you describe your overall mood right now?',
      options: [
        { value: 1, label: 'Very Low', icon: <Frown className="w-5 h-5" /> },
        { value: 2, label: 'Low', icon: <Meh className="w-5 h-5" /> },
        { value: 3, label: 'Neutral', icon: <Meh className="w-5 h-5" /> },
        { value: 4, label: 'Good', icon: <Smile className="w-5 h-5" /> },
        { value: 5, label: 'Excellent', icon: <Smile className="w-5 h-5" /> }
      ]
    },
    {
      id: 'energy',
      category: 'Energy Level',
      question: 'How would you rate your current energy level?',
      options: [
        { value: 1, label: 'Exhausted', icon: <Zap className="w-5 h-5" /> },
        { value: 2, label: 'Tired', icon: <Zap className="w-5 h-5" /> },
        { value: 3, label: 'Moderate', icon: <Zap className="w-5 h-5" /> },
        { value: 4, label: 'Energetic', icon: <Zap className="w-5 h-5" /> },
        { value: 5, label: 'Very Energetic', icon: <Zap className="w-5 h-5" /> }
      ]
    },
    {
      id: 'stress',
      category: 'Stress Level',
      question: 'How stressed do you feel at the moment?',
      options: [
        { value: 1, label: 'Very Stressed', icon: <AlertCircle className="w-5 h-5" /> },
        { value: 2, label: 'Stressed', icon: <AlertCircle className="w-5 h-5" /> },
        { value: 3, label: 'Moderate', icon: <AlertCircle className="w-5 h-5" /> },
        { value: 4, label: 'Low', icon: <CheckCircle className="w-5 h-5" /> },
        { value: 5, label: 'Very Low', icon: <CheckCircle className="w-5 h-5" /> }
      ]
    },
    {
      id: 'focus',
      category: 'Focus & Concentration',
      question: 'How focused and concentrated do you feel?',
      options: [
        { value: 1, label: 'Very Distracted', icon: <Target className="w-5 h-5" /> },
        { value: 2, label: 'Distracted', icon: <Target className="w-5 h-5" /> },
        { value: 3, label: 'Moderate', icon: <Target className="w-5 h-5" /> },
        { value: 4, label: 'Focused', icon: <Target className="w-5 h-5" /> },
        { value: 5, label: 'Very Focused', icon: <Target className="w-5 h-5" /> }
      ]
    }
  ]

  const activityOptions = [
    'Work/Study', 'Exercise', 'Meditation', 'Reading', 'Socializing',
    'Creative Activities', 'Rest/Sleep', 'Household Chores', 'Entertainment',
    'Nature/Outdoors', 'Cooking', 'Music', 'Gaming', 'Shopping'
  ]

  const triggerOptions = [
    'Work Pressure', 'Social Interactions', 'Health Issues', 'Financial Concerns',
    'Relationship Problems', 'Sleep Issues', 'Technology Overuse', 'Environmental Factors',
    'Past Trauma', 'Uncertainty', 'Perfectionism', 'Comparison to Others'
  ]

  const copingStrategyOptions = [
    'Deep Breathing', 'Meditation', 'Exercise', 'Talking to Someone',
    'Journaling', 'Creative Expression', 'Nature Walk', 'Music Therapy',
    'Progressive Muscle Relaxation', 'Mindfulness', 'Gratitude Practice',
    'Setting Boundaries', 'Seeking Professional Help'
  ]

  useEffect(() => {
    // Load saved snapshots from localStorage
    const saved = localStorage.getItem('mentalStateSnapshots')
    if (saved) {
      setSavedSnapshots(JSON.parse(saved))
    }
  }, [])

  const handleSaveSnapshot = () => {
    const newSnapshot: MentalState = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...snapshot as MentalState
    }

    const updatedSnapshots = [newSnapshot, ...savedSnapshots].slice(0, 50) // Keep last 50
    setSavedSnapshots(updatedSnapshots)
    localStorage.setItem('mentalStateSnapshots', JSON.stringify(updatedSnapshots))
    
    toast.success('Mental state snapshot saved successfully!')
    setShowHistory(true)
  }

  const getMoodColor = (value: number) => {
    if (value <= 2) return 'text-red-500'
    if (value <= 3) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getMoodGradient = (value: number) => {
    if (value <= 2) return 'from-red-500 to-red-600'
    if (value <= 3) return 'from-yellow-500 to-orange-500'
    return 'from-green-500 to-emerald-500'
  }

  const calculateWellnessScore = () => {
    const scores = [
      snapshot.overallMood || 0,
      snapshot.energy || 0,
      snapshot.happiness || 0,
      (6 - (snapshot.stress || 0)),
      (6 - (snapshot.anxiety || 0)),
      snapshot.focus || 0,
      snapshot.motivation || 0
    ]
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mental State Snapshot</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Capture your current mental and emotional state</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>{showHistory ? 'New Snapshot' : 'History'}</span>
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
          <AnimatePresence mode="wait">
            {!showHistory ? (
              <motion.div
                key="snapshot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex items-center space-x-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          currentStep >= step 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                        }`}>
                          {step}
                        </div>
                        {step < 4 && (
                          <div className={`w-12 h-1 rounded ${
                            currentStep > step ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Step {currentStep} of 4
                  </span>
                </div>

                {/* Step 1: Quick Assessment */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quick Mental State Assessment</h3>
                      <p className="text-gray-600 dark:text-gray-400">Let's start with a quick assessment of your current state</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {assessmentQuestions.map((question) => (
                        <div key={question.id} className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                            {question.options[0].icon}
                            <span>{question.category}</span>
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">{question.question}</p>
                          <div className="space-y-3">
                            {question.options.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => setSnapshot({...snapshot, [question.id]: option.value})}
                                className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                                  snapshot[question.id as keyof typeof snapshot] === option.value
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                }`}
                              >
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  snapshot[question.id as keyof typeof snapshot] === option.value
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-600 text-gray-500'
                                }`}>
                                  {option.value}
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Activities & Triggers */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Activities & Triggers</h3>
                      <p className="text-gray-600 dark:text-gray-400">What have you been doing and what might be affecting your mental state?</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Activities */}
                      <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <Activity className="w-5 h-5 text-green-500" />
                          <span>Recent Activities</span>
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {activityOptions.map((activity) => (
                            <button
                              key={activity}
                              onClick={() => {
                                const current = snapshot.activities || []
                                const updated = current.includes(activity)
                                  ? current.filter(a => a !== activity)
                                  : [...current, activity]
                                setSnapshot({...snapshot, activities: updated})
                              }}
                              className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                                (snapshot.activities || []).includes(activity)
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300'
                                  : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                              }`}
                            >
                              {activity}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Triggers */}
                      <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <span>Potential Triggers</span>
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {triggerOptions.map((trigger) => (
                            <button
                              key={trigger}
                              onClick={() => {
                                const current = snapshot.triggers || []
                                const updated = current.includes(trigger)
                                  ? current.filter(t => t !== trigger)
                                  : [...current, trigger]
                                setSnapshot({...snapshot, triggers: updated})
                              }}
                              className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                                (snapshot.triggers || []).includes(trigger)
                                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300'
                                  : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                              }`}
                            >
                              {trigger}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Coping Strategies */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Coping Strategies</h3>
                      <p className="text-gray-600 dark:text-gray-400">What strategies are you using or would like to use to manage your mental state?</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-pink-500" />
                        <span>Wellness Strategies</span>
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {copingStrategyOptions.map((strategy) => (
                          <button
                            key={strategy}
                            onClick={() => {
                              const current = snapshot.copingStrategies || []
                              const updated = current.includes(strategy)
                                ? current.filter(s => s !== strategy)
                                : [...current, strategy]
                              setSnapshot({...snapshot, copingStrategies: updated})
                            }}
                            className={`p-3 rounded-lg text-sm transition-all duration-200 ${
                              (snapshot.copingStrategies || []).includes(strategy)
                                ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border border-pink-300'
                                : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                            }`}
                          >
                            {strategy}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setCurrentStep(4)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Notes & Summary */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Final Notes & Summary</h3>
                      <p className="text-gray-600 dark:text-gray-400">Add any additional thoughts and review your snapshot</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Notes */}
                      <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <Info className="w-5 h-5 text-blue-500" />
                          <span>Additional Notes</span>
                        </h4>
                        <textarea
                          value={snapshot.notes || ''}
                          onChange={(e) => setSnapshot({...snapshot, notes: e.target.value})}
                          placeholder="Add any additional thoughts, feelings, or observations..."
                          rows={6}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Summary */}
                      <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span>Snapshot Summary</span>
                        </h4>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className={`text-3xl font-bold mb-2 ${getMoodColor(calculateWellnessScore())}`}>
                              {calculateWellnessScore()}/5
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Wellness Score</div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {snapshot.activities?.length || 0}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Activities</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {snapshot.triggers?.length || 0}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Triggers</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {snapshot.copingStrategies?.length || 0}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Strategies</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {new Date().toLocaleDateString()}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Date</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSaveSnapshot}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Snapshot</span>
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Mental State History</h3>
                  <p className="text-gray-600 dark:text-gray-400">Track your mental wellness journey over time</p>
                </div>

                {savedSnapshots.length === 0 ? (
                  <div className="text-center py-12">
                    <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No snapshots yet</h4>
                    <p className="text-gray-600 dark:text-gray-400">Start by creating your first mental state snapshot</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedSnapshots.map((snapshot) => (
                      <motion.div
                        key={snapshot.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getMoodGradient(calculateWellnessScore())} flex items-center justify-center text-white font-bold`}>
                              {calculateWellnessScore()}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {new Date(snapshot.timestamp).toLocaleDateString()}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(snapshot.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600 dark:text-gray-400">Wellness Score</div>
                            <div className={`text-lg font-bold ${getMoodColor(calculateWellnessScore())}`}>
                              {calculateWellnessScore()}/5
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-sm text-gray-600 dark:text-gray-400">Mood</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{snapshot.overallMood}/5</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-600 dark:text-gray-400">Energy</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{snapshot.energy}/5</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-600 dark:text-gray-400">Stress</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{snapshot.stress}/5</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-600 dark:text-gray-400">Focus</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{snapshot.focus}/5</div>
                          </div>
                        </div>

                        {snapshot.notes && (
                          <div className="mb-4">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes:</div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{snapshot.notes}</p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {snapshot.activities?.map((activity) => (
                            <span key={activity} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-xs">
                              {activity}
                            </span>
                          ))}
                          {snapshot.triggers?.map((trigger) => (
                            <span key={trigger} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-xs">
                              {trigger}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
} 