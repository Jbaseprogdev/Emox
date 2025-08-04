'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Users, Check } from 'lucide-react'
import toast from 'react-hot-toast'

interface DemoUser {
  id: string
  name: string
  email: string
  avatar: string
  description: string
}

const demoUsers: DemoUser[] = [
  {
    id: 'sarah',
    name: 'Sarah Johnson',
    email: 'sarah@demo.com',
    avatar: '',
    description: 'Wellness enthusiast'
  },
  {
    id: 'mike',
    name: 'Mike Chen',
    email: 'mike@demo.com',
    avatar: '',
    description: 'Stress management focus'
  },
  {
    id: 'emma',
    name: 'Emma Wilson',
    email: 'emma@demo.com',
    avatar: '',
    description: 'Emotional awareness journey'
  },
  {
    id: 'alex',
    name: 'Alex Rodriguez',
    email: 'alex@demo.com',
    avatar: '',
    description: 'Mindfulness practitioner'
  }
]

interface DemoUsersProps {
  onUserSelect: (email: string, password: string) => void
}

export function DemoUsers({ onUserSelect }: DemoUsersProps) {
  const [copiedUser, setCopiedUser] = useState<string | null>(null)

  const handleCopyCredentials = async (user: DemoUser) => {
    const credentials = `Email: ${user.email}\nPassword: demo123`
    
    try {
      await navigator.clipboard.writeText(credentials)
      setCopiedUser(user.id)
      toast.success(`${user.name}'s credentials copied!`)
      
      // Auto-fill the form
      onUserSelect(user.email, 'demo123')
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedUser(null), 2000)
    } catch (error) {
      toast.error('Failed to copy credentials')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
          <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Quick Demo Access
        </h3>
      </div>

      {/* Demo User Cards */}
      <div className="grid grid-cols-2 gap-3">
        {demoUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * demoUsers.indexOf(user) }}
            className="relative p-3 border border-primary-200 dark:border-primary-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition-colors duration-200 cursor-pointer group"
            onClick={() => handleCopyCredentials(user)}
          >
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-wellness-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {user.name.charAt(0)}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>

              {/* Copy Icon */}
              <button
                className="p-1 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCopyCredentials(user)
                }}
              >
                {copiedUser === user.id ? (
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300" />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* More Demo Users Link */}
      <div className="text-center">
        <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200">
          More demo users available
        </button>
      </div>

      {/* Demo Info */}
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-800 dark:text-blue-200 text-center">
          <strong>Demo Password:</strong> demo123 (for all demo accounts)
        </p>
      </div>
    </motion.div>
  )
} 