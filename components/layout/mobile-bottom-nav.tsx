'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Heart, BookOpen, MessageCircle, BarChart3, Home,
  Camera, Brain, TrendingUp, Users
} from 'lucide-react'

interface MobileBottomNavProps {
  activeSection: string
  onNavigate: (section: string) => void
}

const mobileNavItems = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    priority: 1
  },
  {
    id: 'emotion-detection',
    label: 'Check In',
    icon: Camera,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    priority: 2
  },
  {
    id: 'ai-journal',
    label: 'Journal',
    icon: BookOpen,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    priority: 3
  },
  {
    id: 'vibe-rooms',
    label: 'Connect',
    icon: MessageCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    priority: 4
  },
  {
    id: 'analytics',
    label: 'Insights',
    icon: BarChart3,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    priority: 5
  }
]

export function MobileBottomNav({ activeSection, onNavigate }: MobileBottomNavProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileNavItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-200 ${
              activeSection === item.id
                ? `${item.bgColor} dark:bg-gray-800 ${item.color} dark:text-white`
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: item.priority * 0.1 }}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
      
      {/* Quick Action Floating Button */}
      <motion.button
        onClick={() => onNavigate('ai-coach')}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Brain className="w-6 h-6" />
      </motion.button>
    </div>
  )
} 