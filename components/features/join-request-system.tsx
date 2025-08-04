'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, CheckCircle, XCircle, Shield, UserCheck, Heart, 
  AlertTriangle, Clock, Star, Crown, Users, Lock,
  MessageCircle, Zap, Sparkles, Target, Award
} from 'lucide-react'
import toast from 'react-hot-toast'

interface JoinRequestProps {
  room: any
  currentUser: any
  onClose: () => void
  onJoinSuccess: () => void
}

interface JoinRequirements {
  approvalRequired: boolean
  followRequired: boolean
  verifiedAccount: boolean
  communityCodeAgreement: boolean
  noViolations: boolean
  minFollowers: number
  userFollowers: number
}

export function JoinRequestSystem({ room, currentUser, onClose, onJoinSuccess }: JoinRequestProps) {
  const [step, setStep] = useState(1)
  const [requirements, setRequirements] = useState<JoinRequirements>({
    approvalRequired: true,
    followRequired: true,
    verifiedAccount: false,
    communityCodeAgreement: false,
    noViolations: true,
    minFollowers: 3,
    userFollowers: 5
  })
  
  const [joinReason, setJoinReason] = useState('')
  const [agreedToCode, setAgreedToCode] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [loading, setLoading] = useState(false)

  const communityRespectCode = [
    "I will treat all members with respect and kindness",
    "I will not use offensive, discriminatory, or harmful language",
    "I will contribute positively to discussions and support others",
    "I will report any violations I witness to moderators",
    "I will follow the room's specific guidelines and rules",
    "I understand that violations may result in temporary or permanent removal"
  ]

  const checkRequirements = () => {
    const checks = {
      followers: requirements.userFollowers >= requirements.minFollowers,
      verified: isVerified,
      following: isFollowing,
      agreed: agreedToCode,
      noViolations: requirements.noViolations
    }
    
    return checks
  }

  const handleFollowCreator = () => {
    setIsFollowing(true)
    toast.success(`Now following ${room.owner.name}!`)
  }

  const handleVerifyAccount = () => {
    setIsVerified(true)
    toast.success('Account verified successfully!')
  }

  const handleSubmitRequest = async () => {
    if (!joinReason.trim()) {
      toast.error('Please provide a reason for joining')
      return
    }

    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setLoading(false)
    toast.success('Join request submitted! Room owner will review.')
    onClose()
  }

  const handleDirectJoin = async () => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setLoading(false)
    toast.success(`Welcome to ${room.name}!`)
    onJoinSuccess()
  }

  const requirementsCheck = checkRequirements()
  const canJoinDirectly = Object.values(requirementsCheck).every(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-wellness-50 dark:from-primary-900/20 dark:to-wellness-900/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-wellness-500 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Join {room.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Complete requirements to join</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center justify-between">
            {['Verification', 'Community Code', 'Approval'].map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step > index
                    ? 'bg-green-600 text-white'
                    : step === index + 1
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {step > index ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {stepName}
                </span>
                {index < 2 && (
                  <div className={`w-12 h-1 mx-3 ${
                    step > index + 1 ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Step 1: Verification */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Account Verification</h3>
              
              <div className="space-y-4">
                {/* Followers Check */}
                <div className={`p-4 rounded-lg border-2 ${
                  requirementsCheck.followers
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                    : 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Minimum Followers</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          You have {requirements.userFollowers} followers (need {requirements.minFollowers})
                        </p>
                      </div>
                    </div>
                    {requirementsCheck.followers ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                </div>

                {/* Account Verification */}
                <div className={`p-4 rounded-lg border-2 ${
                  isVerified
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                    : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <UserCheck className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Verified Account</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {isVerified ? 'Account verified' : 'Email or phone verification required'}
                        </p>
                      </div>
                    </div>
                    {isVerified ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <button
                        onClick={handleVerifyAccount}
                        className="px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                      >
                        Verify Now
                      </button>
                    )}
                  </div>
                </div>

                {/* Follow Room Creator */}
                <div className={`p-4 rounded-lg border-2 ${
                  isFollowing
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                    : 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Follow Room Creator</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Follow {room.owner.name} to join this room
                        </p>
                      </div>
                    </div>
                    {isFollowing ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <button
                        onClick={handleFollowCreator}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </div>

                {/* Violation Check */}
                <div className={`p-4 rounded-lg border-2 ${
                  requirements.noViolations
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                    : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Account Status</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {requirements.noViolations ? 'No violations found' : 'Account has violations'}
                        </p>
                      </div>
                    </div>
                    {requirements.noViolations ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Community Code */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Community Respect Code</h3>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Our Community Values</h4>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  By joining this room, you agree to uphold these principles and create a respectful, supportive environment for all members.
                </p>
              </div>

              <div className="space-y-3">
                {communityRespectCode.map((rule, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{rule}</p>
                  </div>
                ))}
              </div>

              <label className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <input
                  type="checkbox"
                  checked={agreedToCode}
                  onChange={(e) => setAgreedToCode(e.target.checked)}
                  className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">I agree to the Community Respect Code</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    I understand that violating these principles may result in removal from the room.
                  </p>
                </div>
              </label>
            </motion.div>
          )}

          {/* Step 3: Approval */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Join Request</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Why do you want to join this room? *
                  </label>
                  <textarea
                    value={joinReason}
                    onChange={(e) => setJoinReason(e.target.value)}
                    placeholder="Tell us about your interest in this room and how you plan to contribute..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  />
                </div>

                {canJoinDirectly ? (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium text-green-900 dark:text-green-100">All Requirements Met!</h4>
                    </div>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      You can join this room immediately. No approval needed!
                    </p>
                  </div>
                ) : (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-5 h-5 text-yellow-600" />
                      <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Approval Required</h4>
                    </div>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      Your request will be reviewed by the room owner. You'll be notified once approved.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>

          <div className="flex items-center space-x-3">
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={(step === 1 && !isVerified) || (step === 2 && !agreedToCode)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={canJoinDirectly ? handleDirectJoin : handleSubmitRequest}
                disabled={!joinReason.trim() || loading}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary-500 to-wellness-500 text-white rounded-lg hover:from-primary-600 hover:to-wellness-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{canJoinDirectly ? 'Join Room' : 'Submit Request'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 