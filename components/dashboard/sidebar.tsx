'use client'

import { motion } from 'framer-motion'
import { 
  Home, 
  Heart, 
  BookOpen, 
  Users, 
  LogOut, 
  X, 
  User,
  Settings,
  Bell
} from 'lucide-react'
import { User as UserType } from '@/types'

type DashboardTab = 'home' | 'emotions' | 'journal' | 'vibe-rooms'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
  user: UserType
  onSignOut: () => void
}

const navigationItems: Array<{
  id: DashboardTab
  label: string
  icon: any
  description: string
}> = [
  {
    id: 'home',
    label: 'Dashboard',
    icon: Home,
    description: 'Overview and insights'
  },
  {
    id: 'emotions',
    label: 'Emotion Detection',
    icon: Heart,
    description: 'Track your feelings'
  },
  {
    id: 'journal',
    label: 'AI Journal',
    icon: BookOpen,
    description: 'Reflect and grow'
  },
  {
    id: 'vibe-rooms',
    label: 'Vibe Rooms',
    icon: Users,
    description: 'Connect with others'
  }
]

export function Sidebar({ isOpen, onClose, activeTab, onTabChange, user, onSignOut }: SidebarProps) {
  return (
    <>
      {/* Mobile sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl lg:hidden"
      >
        <SidebarContent
          activeTab={activeTab}
          onTabChange={onTabChange}
          user={user}
          onSignOut={onSignOut}
          onClose={onClose}
        />
      </motion.div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-xl">
        <SidebarContent
          activeTab={activeTab}
          onTabChange={onTabChange}
          user={user}
          onSignOut={onSignOut}
        />
      </div>
    </>
  )
}

function SidebarContent({ 
  activeTab, 
  onTabChange, 
  user, 
  onSignOut, 
  onClose 
}: {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
  user: UserType
  onSignOut: () => void
  onClose?: () => void
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-wellness-600 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">Emolinkdn</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-wellness-500 rounded-full flex items-center justify-center">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
            ) : (
              <User className="w-6 h-6 text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 group ${
                isActive
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className={`w-5 h-5 ${
                isActive 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
            </button>
          )
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
          <Settings className="w-5 h-5 text-gray-400" />
          <span className="text-sm">Settings</span>
        </button>
        
        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="text-sm">Notifications</span>
        </button>

        <button
          onClick={onSignOut}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  )
} 