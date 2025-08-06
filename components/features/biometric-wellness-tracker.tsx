'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart, Brain, Activity, TrendingUp, Calendar, BarChart3, PieChart, X,
  Filter, Download, Share2, Eye, EyeOff, RefreshCw, Target, Zap,
  AlertTriangle, CheckCircle, Clock, Star, Smile, Frown, Meh, Lightbulb,
  Users, MessageCircle, Bell, Settings, Thermometer, Droplets, Wifi,
  Battery, Smartphone, Watch, Headphones, Camera
} from 'lucide-react'
import toast from 'react-hot-toast'

interface BiometricWellnessTrackerProps {
  onClose: () => void
  currentUser?: any
}

interface BiometricData {
  id: string
  timestamp: string
  heartRate: number
  bloodPressure: { systolic: number; diastolic: number }
  oxygenSaturation: number
  bodyTemperature: number
  stressLevel: number
  sleepQuality: number
  steps: number
  calories: number
  hydration: number
  mood: string
  energy: number
  focus: number
}

interface WellnessInsight {
  id: string
  type: 'health' | 'fitness' | 'mental' | 'lifestyle'
  title: string
  description: string
  severity: 'low' | 'medium' | 'high'
  recommendation: string
  impact: number
  timeframe: string
}

interface DeviceConnection {
  id: string
  name: string
  type: 'smartwatch' | 'fitness_tracker' | 'heart_monitor' | 'sleep_tracker'
  status: 'connected' | 'disconnected' | 'low_battery'
  batteryLevel: number
  lastSync: string
  icon: React.ReactNode
}

export function BiometricWellnessTracker({ onClose, currentUser }: BiometricWellnessTrackerProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [biometricData, setBiometricData] = useState<BiometricData[]>([])
  const [insights, setInsights] = useState<WellnessInsight[]>([])
  const [connectedDevices, setConnectedDevices] = useState<DeviceConnection[]>([])
  const [isTracking, setIsTracking] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [showAlerts, setShowAlerts] = useState(true)

  const mockBiometricData: BiometricData[] = [
    {
      id: '1',
      timestamp: '2024-01-15T10:00:00Z',
      heartRate: 72,
      bloodPressure: { systolic: 120, diastolic: 80 },
      oxygenSaturation: 98,
      bodyTemperature: 36.8,
      stressLevel: 25,
      sleepQuality: 85,
      steps: 8420,
      calories: 1850,
      hydration: 75,
      mood: 'happy',
      energy: 85,
      focus: 78
    },
    {
      id: '2',
      timestamp: '2024-01-15T14:00:00Z',
      heartRate: 78,
      bloodPressure: { systolic: 125, diastolic: 82 },
      oxygenSaturation: 97,
      bodyTemperature: 37.1,
      stressLevel: 35,
      sleepQuality: 85,
      steps: 12450,
      calories: 2100,
      hydration: 60,
      mood: 'focused',
      energy: 90,
      focus: 85
    },
    {
      id: '3',
      timestamp: '2024-01-15T18:00:00Z',
      heartRate: 85,
      bloodPressure: { systolic: 130, diastolic: 85 },
      oxygenSaturation: 96,
      bodyTemperature: 37.2,
      stressLevel: 45,
      sleepQuality: 85,
      steps: 15800,
      calories: 2350,
      hydration: 45,
      mood: 'tired',
      energy: 65,
      focus: 70
    }
  ]

  const wellnessInsights: WellnessInsight[] = [
    {
      id: '1',
      type: 'health',
      title: 'Elevated Heart Rate Pattern',
      description: 'Your heart rate has been consistently elevated during work hours',
      severity: 'medium',
      recommendation: 'Consider stress management techniques and regular breaks',
      impact: 75,
      timeframe: 'Next 2 hours'
    },
    {
      id: '2',
      type: 'fitness',
      title: 'Excellent Step Count',
      description: 'You\'ve exceeded your daily step goal by 20%',
      severity: 'low',
      recommendation: 'Maintain this activity level for optimal health',
      impact: 90,
      timeframe: 'Daily goal'
    },
    {
      id: '3',
      type: 'mental',
      title: 'Stress Level Increase',
      description: 'Stress levels have increased by 40% since morning',
      severity: 'high',
      recommendation: 'Take a 10-minute meditation break',
      impact: 60,
      timeframe: 'Immediate'
    }
  ]

  const deviceConnections: DeviceConnection[] = [
    {
      id: '1',
      name: 'Apple Watch Series 8',
      type: 'smartwatch',
      status: 'connected',
      batteryLevel: 85,
      lastSync: '2 minutes ago',
      icon: <Watch className="w-5 h-5" />
    },
    {
      id: '2',
      name: 'Fitbit Charge 5',
      type: 'fitness_tracker',
      status: 'connected',
      batteryLevel: 92,
      lastSync: '5 minutes ago',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: '3',
      name: 'Oura Ring',
      type: 'sleep_tracker',
      status: 'low_battery',
      batteryLevel: 15,
      lastSync: '1 hour ago',
      icon: <Heart className="w-5 h-5" />
    }
  ]

  useEffect(() => {
    setBiometricData(mockBiometricData)
    setInsights(wellnessInsights)
    setConnectedDevices(deviceConnections)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getDeviceStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'disconnected': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'low_battery': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="w-4 h-4 text-green-500" />
      case 'focused': return <Target className="w-4 h-4 text-blue-500" />
      case 'tired': return <Meh className="w-4 h-4 text-yellow-500" />
      default: return <Smile className="w-4 h-4 text-gray-500" />
    }
  }

  const currentData = biometricData[biometricData.length - 1]

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
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Biometric Wellness Tracker</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real-time health monitoring with AI-powered insights and device integration
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
            {/* Real-time Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Heart Rate</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentData?.heartRate} BPM</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Normal range</div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Oxygen</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentData?.oxygenSaturation}%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">SpO2 level</div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Steps</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentData?.steps.toLocaleString()}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Daily goal: 10,000</div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Stress</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentData?.stressLevel}%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Stress level</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {['overview', 'devices', 'insights', 'history'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Blood Pressure */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Blood Pressure</h3>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">
                          {currentData?.bloodPressure.systolic}/{currentData?.bloodPressure.diastolic}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">mmHg</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                        <div className="text-sm font-medium text-green-600">Normal</div>
                      </div>
                    </div>
                  </div>

                  {/* Wellness Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sleep Quality</h3>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentData?.sleepQuality}%</div>
                        <Star className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${currentData?.sleepQuality}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Energy Level</h3>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentData?.energy}%</div>
                        <Zap className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                          style={{ width: `${currentData?.energy}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Current Mood */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Mood</h3>
                    <div className="flex items-center space-x-4">
                      {getMoodIcon(currentData?.mood || 'happy')}
                      <div>
                        <div className="text-lg font-medium text-gray-900 dark:text-white capitalize">
                          {currentData?.mood}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Focus: {currentData?.focus}% | Energy: {currentData?.energy}%
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'devices' && (
                <motion.div
                  key="devices"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connected Devices</h3>
                  
                  <div className="space-y-4">
                    {connectedDevices.map((device) => (
                      <div
                        key={device.id}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                              {device.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{device.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                {device.type.replace('_', ' ')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDeviceStatusColor(device.status)}`}>
                              {device.status.replace('_', ' ')}
                            </span>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Battery: {device.batteryLevel}%
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Last sync: {device.lastSync}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'insights' && (
                <motion.div
                  key="insights"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Wellness Insights</h3>
                  
                  <div className="space-y-4">
                    {insights.map((insight) => (
                      <div
                        key={insight.id}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{insight.title}</h4>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(insight.severity)}`}>
                                {insight.severity} priority
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-3">{insight.description}</p>
                            <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-3">
                              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Recommendation:</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{insight.recommendation}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{insight.impact}%</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Impact</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>Timeframe: {insight.timeframe}</span>
                          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 text-sm">
                            Take Action
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'history' && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Biometric History</h3>
                    <select
                      value={selectedTimeframe}
                      onChange={(e) => setSelectedTimeframe(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      <option value="24h">Last 24 hours</option>
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    {biometricData.map((data) => (
                      <div
                        key={data.id}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
                              <Heart className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {new Date(data.timestamp).toLocaleTimeString()}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(data.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {getMoodIcon(data.mood)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Heart Rate:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">{data.heartRate} BPM</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Steps:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">{data.steps.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Stress:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">{data.stressLevel}%</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Energy:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">{data.energy}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 