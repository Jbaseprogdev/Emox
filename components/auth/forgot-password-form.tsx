'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, Send } from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import toast from 'react-hot-toast'

interface ForgotPasswordFormData {
  email: string
}

interface ForgotPasswordFormProps {
  onModeChange: (mode: 'signin' | 'signup' | 'forgot') => void
}

export function ForgotPasswordForm({ onModeChange }: ForgotPasswordFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { resetPassword, loading } = useAuthStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>()

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const result = await resetPassword(data.email)
    
    if (result.success) {
      setIsSubmitted(true)
      toast.success('Password reset email sent! Check your inbox.')
    } else {
      toast.error(result.error || 'Failed to send reset email')
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
          <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Check your email
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            We've sent you a password reset link. Please check your email and follow the instructions to reset your password.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onModeChange('signin')}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Sign In</span>
          </button>
          
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full btn-secondary"
          >
            Send another email
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Forgot your password?
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          No worries! Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              id="email"
              className="input-field pl-10"
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <Send className="w-5 h-5" />
          )}
          <span>{loading ? 'Sending...' : 'Send Reset Link'}</span>
        </button>
      </form>

      {/* Back to Sign In */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => onModeChange('signin')}
          className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200 flex items-center justify-center space-x-1 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </button>
      </div>
    </motion.div>
  )
} 