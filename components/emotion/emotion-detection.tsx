'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Camera, 
  Smile, 
  Frown, 
  Heart, 
  Zap, 
  AlertTriangle, 
  Meh,
  X,
  Check,
  RotateCcw
} from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { useAppStore } from '@/store/app-store'
import { logEmotion, createThresholdWarning } from '@/lib/supabase'
import { shouldTriggerThresholdWarning } from '@/lib/ai'
import { EmotionType } from '@/types'
import toast from 'react-hot-toast'

const emotions = [
  { type: 'joy', label: 'Joy', icon: Smile, color: 'bg-emotion-joy', description: 'Happy and content' },
  { type: 'sadness', label: 'Sadness', icon: Frown, color: 'bg-emotion-sadness', description: 'Feeling down' },
  { type: 'anger', label: 'Anger', icon: Zap, color: 'bg-emotion-anger', description: 'Frustrated or mad' },
  { type: 'fear', label: 'Fear', icon: AlertTriangle, color: 'bg-emotion-fear', description: 'Anxious or scared' },
  { type: 'surprise', label: 'Surprise', icon: Zap, color: 'bg-emotion-surprise', description: 'Shocked or amazed' },
  { type: 'disgust', label: 'Disgust', icon: X, color: 'bg-emotion-disgust', description: 'Repulsed or annoyed' },
  { type: 'neutral', label: 'Neutral', icon: Meh, color: 'bg-emotion-neutral', description: 'Calm and balanced' },
]

export function EmotionDetection() {
  const { user } = useAuthStore()
  const { setCurrentEmotion, setEmotionScore, setThresholdWarning } = useAppStore()
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null)
  const [emotionScore, setEmotionScoreLocal] = useState(5)
  const [showCamera, setShowCamera] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleEmotionSelect = (emotion: EmotionType) => {
    setSelectedEmotion(emotion)
  }

  const handleScoreChange = (score: number) => {
    setEmotionScoreLocal(score)
  }

  const handleSubmit = async () => {
    if (!selectedEmotion || !user) return

    setIsProcessing(true)
    try {
      // Log emotion to database
      await logEmotion({
        user_id: user.id,
        emotion_type: selectedEmotion,
        score: emotionScore
      })

      // Update app state
      setCurrentEmotion(selectedEmotion)
      setEmotionScore(emotionScore)

      // Check for threshold warning
      if (shouldTriggerThresholdWarning(selectedEmotion, emotionScore)) {
        await createThresholdWarning({
          user_id: user.id,
          emotion_type: selectedEmotion,
          score: emotionScore
        })
        setThresholdWarning(true)
        toast.error('We noticed you might need some support. Would you like to talk to someone?')
      } else {
        toast.success('Thank you for checking in! Your emotions matter.')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error logging emotion:', error)
      toast.error('Failed to save your emotion. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setShowCamera(true)
    } catch (error) {
      console.error('Error accessing camera:', error)
      toast.error('Unable to access camera. Please use manual selection.')
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
    }
    setShowCamera(false)
  }, [])

  const captureEmotion = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (!context) return

    // Set canvas size to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw video frame to canvas
    context.drawImage(video, 0, 0)

    // Here you would integrate with TensorFlow.js or emotion detection API
    // For now, we'll simulate detection
    setIsProcessing(true)
    
    setTimeout(() => {
      // Simulate emotion detection result
      const detectedEmotion = emotions[Math.floor(Math.random() * emotions.length)]
      setSelectedEmotion(detectedEmotion.type as EmotionType)
      setEmotionScoreLocal(Math.floor(Math.random() * 10) + 1)
      setIsProcessing(false)
      stopCamera()
      toast.success(`Detected: ${detectedEmotion.label}`)
    }, 2000)
  }, [stopCamera])

  const resetForm = () => {
    setSelectedEmotion(null)
    setEmotionScoreLocal(5)
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto text-center space-y-6"
      >
        <div className="card p-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Thank you for checking in!
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We've recorded your emotion and are here to support you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={resetForm}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Check In Again</span>
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          How are you feeling today?
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Take a moment to check in with your emotions. This helps us understand and support you better.
        </p>
      </motion.div>

      {/* Camera Option */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Quick Detection
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use your camera for instant emotion detection
            </p>
          </div>
          <button
            onClick={showCamera ? stopCamera : startCamera}
            className="btn-secondary flex items-center space-x-2"
          >
            <Camera className="w-5 h-5" />
            <span>{showCamera ? 'Stop Camera' : 'Start Camera'}</span>
          </button>
        </div>

        <AnimatePresence>
          {showCamera && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-4"
            >
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full max-w-md mx-auto rounded-lg"
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              
              <div className="flex justify-center space-x-3">
                <button
                  onClick={captureEmotion}
                  disabled={isProcessing}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="spinner"></div>
                  ) : (
                    <Heart className="w-5 h-5" />
                  )}
                  <span>{isProcessing ? 'Analyzing...' : 'Detect Emotion'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Manual Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Or choose manually:
        </h3>

        {/* Emotion Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {emotions.map((emotion) => {
            const Icon = emotion.icon
            const isSelected = selectedEmotion === emotion.type
            
            return (
              <button
                key={emotion.type}
                onClick={() => handleEmotionSelect(emotion.type as EmotionType)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 group ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                }`}
              >
                <div className={`w-12 h-12 ${emotion.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {emotion.label}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {emotion.description}
                </p>
              </button>
            )
          })}
        </div>

        {/* Intensity Slider */}
        {selectedEmotion && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                How intense is this feeling? (1-10)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={emotionScore}
                  onChange={(e) => handleScoreChange(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-lg font-semibold text-gray-900 dark:text-white min-w-[2rem]">
                  {emotionScore}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Mild</span>
                <span>Intense</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="spinner"></div>
              ) : (
                <Heart className="w-5 h-5" />
              )}
              <span>{isProcessing ? 'Saving...' : 'Save Emotion'}</span>
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
      >
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          💡 Tips for emotional awareness
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Take a moment to pause and breathe before selecting</li>
          <li>• Remember that all emotions are valid and temporary</li>
          <li>• Be honest with yourself - this is for your wellness</li>
          <li>• Check in regularly to track your emotional patterns</li>
        </ul>
      </motion.div>
    </div>
  )
} 