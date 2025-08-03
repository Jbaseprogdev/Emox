'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/store/auth-store'
import { useAppStore } from '@/store/app-store'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { DashboardHome } from './dashboard-home'
import { EmotionDetection } from '../emotion/emotion-detection'
import { AIJournal } from '../journal/ai-journal'
import { VibeRooms } from '../vibe-rooms/vibe-rooms'
import { ThresholdWarning } from '../threshold/threshold-warning'

type DashboardTab = 'home' | 'emotions' | 'journal' | 'vibe-rooms'

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, signOut } = useAuthStore()
  const { isThresholdWarning } = useAppStore()

  const handleSignOut = async () => {
    await signOut()
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardHome />
      case 'emotions':
        return <EmotionDetection />
      case 'journal':
        return <AIJournal />
      case 'vibe-rooms':
        return <VibeRooms />
      default:
        return <DashboardHome />
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Threshold Warning Modal */}
      <AnimatePresence>
        {isThresholdWarning && (
          <ThresholdWarning />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        onSignOut={handleSignOut}
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          user={user}
          onSignOut={handleSignOut}
        />

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
} 