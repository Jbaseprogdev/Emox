'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Heart, BookOpen, MessageCircle, BarChart3, TrendingUp,
  Award, Brain, Camera, Zap, Users, Target, Sparkles, Leaf, AlertTriangle, Trophy, User, Bell, Shield, GraduationCap, Image, Eye, CheckSquare, Calendar, Search
} from 'lucide-react'

interface DashboardGridProps {
  onFeatureClick: (feature: string) => void
  userStats: {
    dayStreak: number
    wellnessLevel: number
    totalEntries: number
    moodAverage: number
  }
}

const featureCards = [
  {
    id: 'emotion-detection',
    title: 'Emotion Detection',
    description: 'Check in with your emotions using manual selection or facial detection',
    icon: Camera,
    gradient: 'from-red-500 to-pink-500',
    priority: 1,
    category: 'Daily Wellness',
    cta: 'Check In Now',
    stats: 'Daily mood tracking'
  },
  {
    id: 'ai-journal',
    title: 'AI Journal',
    description: 'Reflect on your day with AI-powered prompts and insights',
    icon: BookOpen,
    gradient: 'from-purple-500 to-indigo-500',
    priority: 2,
    category: 'Daily Wellness',
    cta: 'Start Writing',
    stats: 'Smart prompts & analysis'
  },
  {
    id: 'stress-games',
    title: 'Stress Games',
    description: 'Advanced stress relief activities and games',
    icon: Zap,
    gradient: 'from-orange-500 to-red-500',
    priority: 3,
    category: 'Daily Wellness',
    cta: 'Play Now',
    stats: 'Fun stress relief'
  },
  {
    id: 'meditation-room',
    title: 'Meditation Room',
    description: 'Peaceful meditation space with guided sessions',
    icon: Leaf,
    gradient: 'from-green-500 to-emerald-500',
    priority: 4,
    category: 'Daily Wellness',
    cta: 'Meditate',
    stats: 'Guided sessions'
  },
  {
    id: 'vibe-rooms',
    title: 'Vibe Rooms',
    description: 'Connect with others who share your emotional state',
    icon: MessageCircle,
    gradient: 'from-green-500 to-emerald-500',
    priority: 5,
    category: 'Social Features',
    cta: 'Join Room',
    stats: 'Emotion-based matching'
  },
  {
    id: 'analytics',
    title: 'Analytics Dashboard',
    description: 'View detailed insights and track your emotional wellness progress',
    icon: BarChart3,
    gradient: 'from-indigo-500 to-purple-500',
    priority: 6,
    category: 'Analytics & Progress',
    cta: 'View Analytics',
    stats: 'Mood trends & patterns'
  },
  {
    id: 'emotional-wellness',
    title: 'Emotional Wellness',
    description: 'AI-generated insights and personalized wellness recommendations',
    icon: TrendingUp,
    gradient: 'from-orange-500 to-red-500',
    priority: 7,
    category: 'Analytics & Progress',
    cta: 'Get Insights',
    stats: 'AI-powered analysis'
  },
  {
    id: 'habit-recommendation',
    title: 'Habit Recommendation',
    description: 'Build healthy habits based on your wellness data',
    icon: Target,
    gradient: 'from-blue-500 to-cyan-500',
    priority: 8,
    category: 'Analytics & Progress',
    cta: 'Build Habits',
    stats: 'Personalized recommendations'
  },
  {
    id: 'emotion-threshold',
    title: 'Emotion Threshold',
    description: 'Get alerts when emotions reach concerning levels',
    icon: AlertTriangle,
    gradient: 'from-red-500 to-orange-500',
    priority: 9,
    category: 'Guidance & Support',
    cta: 'Set Alerts',
    stats: 'Early warning system'
  },
  {
    id: 'gamification',
    title: 'Gamification',
    description: 'Earn rewards and achievements for your wellness journey',
    icon: Trophy,
    gradient: 'from-yellow-500 to-orange-500',
    priority: 10,
    category: 'Analytics & Progress',
    cta: 'View Rewards',
    stats: 'Achievement system'
  },
  {
    id: 'ai-coach',
    title: 'AI Wellness Coach',
    description: 'Get personalized emotional support and guidance',
    icon: Brain,
    gradient: 'from-teal-500 to-green-500',
    priority: 11,
    category: 'Guidance & Support',
    cta: 'Chat with Coach',
    stats: '24/7 emotional support'
  },
  {
    id: 'emotional-matching',
    title: 'Emotional Matching',
    description: 'Find compatible friends based on emotions',
    icon: Heart,
    gradient: 'from-pink-500 to-rose-500',
    priority: 12,
    category: 'Social Features',
    cta: 'Find Friends',
    stats: 'Compatibility matching'
  },
  {
    id: 'chat-room-manager',
    title: 'Chat Room Manager',
    description: 'Manage your chat spaces and conversations',
    icon: MessageCircle,
    gradient: 'from-blue-500 to-cyan-500',
    priority: 13,
    category: 'Social Features',
    cta: 'Manage Rooms',
    stats: 'Conversation management'
  },
  {
    id: 'social-analytics',
    title: 'Social Analytics',
    description: 'Track your social wellness and community engagement',
    icon: TrendingUp,
    gradient: 'from-green-500 to-emerald-500',
    priority: 14,
    category: 'Analytics & Progress',
    cta: 'View Analytics',
    stats: 'Social wellness tracking'
  },
  {
    id: 'enhanced-profile',
    title: 'Enhanced Profile',
    description: 'Advanced profile management and customization',
    icon: User,
    gradient: 'from-purple-500 to-pink-500',
    priority: 15,
    category: 'Social Features',
    cta: 'Manage Profile',
    stats: 'Advanced customization'
  },
  {
    id: 'mental-state-snapshot',
    title: 'Mental State Snapshot',
    description: 'Capture and track your current mental state',
    icon: Brain,
    gradient: 'from-blue-500 to-cyan-500',
    priority: 16,
    category: 'Daily Wellness',
    cta: 'Take Snapshot',
    stats: 'Mental state tracking'
  },
  {
    id: 'mood-timeline-visual',
    title: 'Mood Timeline Visual',
    description: 'Visual mood history and trend analysis',
    icon: TrendingUp,
    gradient: 'from-purple-500 to-pink-500',
    priority: 17,
    category: 'Analytics & Progress',
    cta: 'View Timeline',
    stats: 'Visual mood tracking'
  },
  {
    id: 'personality-assessment',
    title: 'Personality Assessment',
    description: 'Discover your unique personality traits and insights',
    icon: Brain,
    gradient: 'from-indigo-500 to-purple-500',
    priority: 18,
    category: 'Daily Wellness',
    cta: 'Start Assessment',
    stats: 'Personality insights'
  },
  {
    id: 'notification-center',
    title: 'Notification Center',
    description: 'Stay updated with alerts, reminders, and community updates',
    icon: Bell,
    gradient: 'from-blue-500 to-cyan-500',
    priority: 19,
    category: 'Social Features',
    cta: 'View Notifications',
    stats: 'Stay connected'
  },
  {
    id: 'room-permissions',
    title: 'Room Permissions',
    description: 'Control access requests and manage room security settings',
    icon: Shield,
    gradient: 'from-red-500 to-orange-500',
    priority: 20,
    category: 'Social Features',
    cta: 'Manage Permissions',
    stats: 'Security control'
  },
  {
    id: 'community-guidelines',
    title: 'Community Guidelines',
    description: 'Learn respectful policies and community behavior standards',
    icon: BookOpen,
    gradient: 'from-green-500 to-emerald-500',
    priority: 21,
    category: 'Social Features',
    cta: 'Read Guidelines',
    stats: 'Community rules'
  },
  {
    id: 'community-education',
    title: 'Community Education',
    description: 'Interactive courses and learning modules for community building',
    icon: GraduationCap,
    gradient: 'from-indigo-500 to-purple-500',
    priority: 22,
    category: 'Social Features',
    cta: 'Start Learning',
    stats: '5+ courses'
  },
  {
    id: 'profile-photo-upload',
    title: 'Profile Photo Upload',
    description: 'Advanced photo editing with AI enhancement and filters',
    icon: Camera,
    gradient: 'from-pink-500 to-rose-500',
    priority: 23,
    category: 'Social Features',
    cta: 'Upload Photo',
    stats: 'AI enhanced'
  },
  {
    id: 'cover-photo-manager',
    title: 'Cover Photo Manager',
    description: 'Create stunning cover photos with multiple layouts and social optimization',
    icon: Image,
    gradient: 'from-blue-500 to-cyan-500',
    priority: 24,
    category: 'Social Features',
    cta: 'Manage Cover',
    stats: 'Multi-layout'
  },
  {
    id: 'ai-emotional-coach',
    title: 'AI Emotional Coach',
    description: 'Personalized emotional intelligence coaching and guidance',
    icon: Brain,
    gradient: 'from-purple-500 to-pink-500',
    priority: 25,
    category: 'Guidance & Support',
    cta: 'Start Coaching',
    stats: 'AI powered'
  },
  {
    id: 'ai-emotion-predictor',
    title: 'AI Emotion Predictor',
    description: 'Advanced machine learning to predict emotional patterns',
    icon: TrendingUp,
    gradient: 'from-indigo-500 to-purple-500',
    priority: 26,
    category: 'Guidance & Support',
    cta: 'Predict Emotions',
    stats: 'ML powered'
  },
  {
    id: 'vr-meditation-space',
    title: 'VR Meditation Space',
    description: 'Immersive virtual reality meditation with spatial audio',
    icon: Eye,
    gradient: 'from-cyan-500 to-blue-500',
    priority: 27,
    category: 'Daily Wellness',
    cta: 'Enter VR',
    stats: 'Immersive'
  },
  {
    id: 'biometric-wellness-tracker',
    title: 'Biometric Wellness Tracker',
    description: 'Real-time health monitoring with AI-powered insights',
    icon: Heart,
    gradient: 'from-red-500 to-pink-500',
    priority: 28,
    category: 'Daily Wellness',
    cta: 'Track Health',
    stats: 'Real-time'
  },
  {
    id: 'social-wellness-community',
    title: 'Social Wellness Community',
    description: 'Connect with wellness enthusiasts and join challenges',
    icon: Users,
    gradient: 'from-green-500 to-blue-500',
    priority: 29,
    category: 'Social Features',
    cta: 'Join Community',
    stats: 'Community'
  },
  {
    id: 'mindful-task-boards',
    title: 'Mindful Task Boards',
    description: 'Emotion-aware task management with mindfulness integration',
    icon: CheckSquare,
    gradient: 'from-purple-500 to-pink-500',
    priority: 30,
    category: 'Daily Wellness',
    cta: 'Manage Tasks',
    stats: 'Mindful'
  },
  {
    id: 'mood-based-calendar-planner',
    title: 'Mood-Based Calendar Planner',
    description: 'Schedule with emotional intelligence and wellness insights',
    icon: Calendar,
    gradient: 'from-blue-500 to-purple-500',
    priority: 31,
    category: 'Daily Wellness',
    cta: 'Plan Schedule',
    stats: 'Emotional'
  },
  {
    id: 'wellness-wiki',
    title: 'Wellness Wiki',
    description: 'Collaborative wellness knowledge and custom pages',
    icon: BookOpen,
    gradient: 'from-indigo-500 to-purple-500',
    priority: 32,
    category: 'Social Features',
    cta: 'Explore Wiki',
    stats: 'Knowledge'
  },
  {
    id: 'wellness-workflows',
    title: 'Wellness Workflows',
    description: 'No-code automations for emotional wellness and habit building',
    icon: Zap,
    gradient: 'from-yellow-500 to-orange-500',
    priority: 33,
    category: 'Daily Wellness',
    cta: 'Create Workflows',
    stats: 'Automation'
  },
  {
    id: 'template-gallery',
    title: 'Template Gallery',
    description: 'Pre-built journal templates, rituals, and reflection prompts',
    icon: BookOpen,
    gradient: 'from-blue-500 to-purple-500',
    priority: 34,
    category: 'Guidance & Support',
    cta: 'Browse Templates',
    stats: 'Templates'
  },
  {
    id: 'collaborative-healing-boards',
    title: 'Collaborative Healing Boards',
    description: 'Shared journals and reflections with community support',
    icon: Users,
    gradient: 'from-purple-500 to-pink-500',
    priority: 35,
    category: 'Social Features',
    cta: 'Join Boards',
    stats: 'Community'
  },
  {
    id: 'mood-progress-reports',
    title: 'Mood Progress Reports',
    description: 'Detailed analytics with actionable insights for emotional growth',
    icon: BarChart3,
    gradient: 'from-blue-500 to-purple-500',
    priority: 36,
    category: 'Analytics & Progress',
    cta: 'View Reports',
    stats: 'Actionable insights'
  },
  {
    id: 'mindful-goals-tracker',
    title: 'Mindful Goals Tracker',
    description: 'Emotional KPIs and wellness goal management',
    icon: Target,
    gradient: 'from-green-500 to-emerald-500',
    priority: 37,
    category: 'Analytics & Progress',
    cta: 'Track Goals',
    stats: 'Emotional KPIs'
  },
  {
    id: 'universal-search',
    title: 'Universal Search',
    description: 'Search across all content with emotion tags and intelligent discovery',
    icon: Search,
    gradient: 'from-indigo-500 to-purple-500',
    priority: 38,
    category: 'Guidance & Support',
    cta: 'Search Now',
    stats: 'Intelligent discovery'
  }
]

export function DashboardGrid({ onFeatureClick, userStats }: DashboardGridProps) {
  // Sort features by priority
  const sortedFeatures = featureCards.sort((a, b) => a.priority - b.priority)

  return (
    <div className="space-y-8">
      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedFeatures.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => onFeatureClick(feature.id)}
            className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-2"
          >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            
            <div className="relative p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {feature.stats}
                  </span>
                </div>
                <div className="flex items-center space-x-2 group-hover:space-x-3 transition-all duration-300">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {feature.cta}
                  </span>
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-white text-xs font-bold">→</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-200/50 dark:border-indigo-800/50"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">⚡</span>
          </div>
          <span>Quick Actions</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFeatureClick('emotion-check')}
            className="p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 text-center group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Emotion Check</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFeatureClick('journal-entry')}
            className="p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 text-center group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Journal</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFeatureClick('meditation')}
            className="p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 text-center group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Meditate</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFeatureClick('stress-games')}
            className="p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 text-center group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Stress Relief</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/30 dark:border-gray-700/50 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">📊</span>
          </div>
          <span>Recent Activity</span>
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Journal entry completed</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Mood check-in: Happy</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">4 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Achievement unlocked: 7-day streak</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 