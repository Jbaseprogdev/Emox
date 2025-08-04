'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Smile, Frown, Heart, Zap, AlertTriangle, CheckCircle, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface Emotion {
  id: string
  name: string
  icon: any
  color: string
  bgColor: string
  description: string
  intensity: number
}

const emotions: Emotion[] = [
  {
    id: 'joy',
    name: 'Joy',
    icon: Smile,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    description: 'Feeling happy and content',
    intensity: 0
  },
  {
    id: 'sadness',
    name: 'Sadness',
    icon: Frown,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    description: 'Feeling down or melancholic',
    intensity: 0
  },
  {
    id: 'anger',
    name: 'Anger',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/20',
    description: 'Feeling frustrated or angry',
    intensity: 0
  },
  {
    id: 'excitement',
    name: 'Excitement',
    icon: Zap,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    description: 'Feeling energized and excited',
    intensity: 0
  },
  {
    id: 'love',
    name: 'Love',
    icon: Heart,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100 dark:bg-pink-900/20',
    description: 'Feeling loving and connected',
    intensity: 0
  }
]

interface EmotionDetectionProps {
  onEmotionDetected: (emotion: Emotion) => void
  onClose: () => void
}

export function EmotionDetection({ onEmotionDetected, onClose }: EmotionDetectionProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null)
  const [intensity, setIntensity] = useState(5)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [detectedEmotion, setDetectedEmotion] = useState<Emotion | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion)
  }

  const handleIntensityChange = (value: number) => {
    setIntensity(value)
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraActive(true)
      }
    } catch (error) {
      toast.error('Camera access denied. Please use manual selection.')
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      setIsCameraActive(false)
    }
  }

  const simulateFacialDetection = async () => {
    setIsProcessing(true)
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate detected emotion (random for demo)
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]
    const randomIntensity = Math.floor(Math.random() * 10) + 1
    const detected = { ...randomEmotion, intensity: randomIntensity }
    
    setDetectedEmotion(detected)
    setIsProcessing(false)
    toast.success(`Detected: ${detected.name} (Intensity: ${detected.intensity}/10)`)
  }

  const handleSubmit = () => {
    if (selectedEmotion) {
      const emotionWithIntensity = { ...selectedEmotion, intensity }
      onEmotionDetected(emotionWithIntensity)
      toast.success(`Emotion logged: ${selectedEmotion.name} (${intensity}/10)`)
      onClose()
    }
  }

  const handleDetectedSubmit = () => {
    if (detectedEmotion) {
      onEmotionDetected(detectedEmotion)
      toast.success(`Facial detection logged: ${detectedEmotion.name} (${detectedEmotion.intensity}/10)`)
      stopCamera()
      onClose()
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Emotion Detection</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">How are you feeling right now?</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Detection Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Manual Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manual Selection</h3>
              
              {/* Emotion Grid */}
              <div className="grid grid-cols-2 gap-3">
                {emotions.map((emotion) => {
                  const Icon = emotion.icon
                  const isSelected = selectedEmotion?.id === emotion.id
                  
                  return (
                    <motion.button
                      key={emotion.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleEmotionSelect(emotion)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-6 h-6 ${emotion.color}`} />
                        <div className="text-left">
                          <p className="font-medium text-gray-900 dark:text-white">{emotion.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{emotion.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Intensity Slider */}
              {selectedEmotion && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Intensity: {intensity}/10
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {intensity <= 3 ? 'Mild' : intensity <= 7 ? 'Moderate' : 'Strong'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={intensity}
                    onChange={(e) => handleIntensityChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>1</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Facial Detection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Facial Detection</h3>
              
              <div className="space-y-4">
                {!isCameraActive ? (
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                      <Camera className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Use your camera to automatically detect your emotions
                    </p>
                    <button
                      onClick={startCamera}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Start Camera
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-48 bg-gray-900 rounded-lg object-cover"
                      />
                      {isProcessing && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                            <p>Analyzing emotions...</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={simulateFacialDetection}
                        disabled={isProcessing}
                        className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        {isProcessing ? 'Processing...' : 'Detect Emotion'}
                      </button>
                      <button
                        onClick={stopCamera}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        Stop
                      </button>
                    </div>
                  </div>
                )}

                {/* Detected Emotion Display */}
                {detectedEmotion && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900 dark:text-green-100">
                          Detected: {detectedEmotion.name}
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-200">
                          Intensity: {detectedEmotion.intensity}/10
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            
            {selectedEmotion && (
              <button
                onClick={handleSubmit}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Log Manual Emotion
              </button>
            )}
            
            {detectedEmotion && (
              <button
                onClick={handleDetectedSubmit}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Log Detected Emotion
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
} 