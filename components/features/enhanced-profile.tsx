'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Camera, Edit3, Save, X, Upload, Image as ImageIcon,
  Heart, Star, Award, Users, MapPin, Calendar, Mail, Phone,
  Globe, Instagram, Twitter, Linkedin, Facebook, Settings,
  Palette, Eye, EyeOff, Shield, Lock, Unlock, Crown
} from 'lucide-react'
import toast from 'react-hot-toast'

interface EnhancedProfileProps {
  onClose: () => void
  currentUser?: any
}

interface ProfileSection {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  isActive: boolean
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedDate: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export function EnhancedProfile({ onClose, currentUser }: EnhancedProfileProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || 'John Doe',
    bio: 'Passionate about emotional wellness and helping others grow.',
    location: 'San Francisco, CA',
    website: 'https://emolinkdn.com',
    email: currentUser?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    social: {
      instagram: '@johndoe',
      twitter: '@johndoe',
      linkedin: 'john-doe',
      facebook: 'johndoe'
    },
    interests: ['Meditation', 'Yoga', 'Reading', 'Hiking', 'Cooking'],
    wellnessGoals: ['Reduce stress', 'Improve sleep', 'Build resilience'],
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      showLocation: true
    }
  })

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const [coverPreview, setCoverPreview] = useState<string>('')
  
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const profileSections: ProfileSection[] = [
    {
      id: 'overview',
      title: 'Overview',
      icon: <User className="w-5 h-5" />,
      description: 'Basic profile information',
      isActive: true
    },
    {
      id: 'photos',
      title: 'Photos',
      icon: <Camera className="w-5 h-5" />,
      description: 'Avatar and cover photos',
      isActive: true
    },
    {
      id: 'achievements',
      title: 'Achievements',
      icon: <Award className="w-5 h-5" />,
      description: 'Badges and milestones',
      isActive: true
    },
    {
      id: 'social',
      title: 'Social',
      icon: <Users className="w-5 h-5" />,
      description: 'Social media links',
      isActive: true
    },
    {
      id: 'privacy',
      title: 'Privacy',
      icon: <Shield className="w-5 h-5" />,
      description: 'Privacy settings',
      isActive: true
    }
  ]

  const badges: Badge[] = [
    {
      id: '1',
      name: 'Mindful Master',
      description: 'Completed 30 days of meditation',
      icon: '🧘‍♀️',
      earnedDate: '2024-01-15',
      rarity: 'epic'
    },
    {
      id: '2',
      name: 'Emotion Explorer',
      description: 'Logged emotions for 7 consecutive days',
      icon: '💭',
      earnedDate: '2024-01-10',
      rarity: 'rare'
    },
    {
      id: '3',
      name: 'Support Champion',
      description: 'Helped 10 community members',
      icon: '🤝',
      earnedDate: '2024-01-08',
      rarity: 'legendary'
    },
    {
      id: '4',
      name: 'Wellness Warrior',
      description: 'Achieved 5 wellness goals',
      icon: '🏆',
      earnedDate: '2024-01-05',
      rarity: 'epic'
    },
    {
      id: '5',
      name: 'Gratitude Guru',
      description: 'Practiced gratitude for 21 days',
      icon: '🙏',
      earnedDate: '2024-01-01',
      rarity: 'rare'
    }
  ]

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setAvatarPreview(e.target?.result as string)
      reader.readAsDataURL(file)
      toast.success('Avatar uploaded successfully!')
    }
  }

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCoverFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setCoverPreview(e.target?.result as string)
      reader.readAsDataURL(file)
      toast.success('Cover photo uploaded successfully!')
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    toast.success('Profile updated successfully!')
  }

  const getBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500'
      case 'epic': return 'from-purple-400 to-pink-500'
      case 'rare': return 'from-blue-400 to-cyan-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Enhanced Profile</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Advanced profile management and customization</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar Navigation */}
          <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="p-4">
              <nav className="space-y-2">
                {profileSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === section.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800'
                    }`}
                  >
                    {section.icon}
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className={`text-xs ${activeTab === section.id ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'}`}>
                        {section.description}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Basic Information */}
                      <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <User className="w-5 h-5 text-purple-500" />
                          <span>Basic Information</span>
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Full Name
                            </label>
                            {isEditing ? (
                              <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-900 dark:text-white">{profileData.name}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Bio
                            </label>
                            {isEditing ? (
                              <textarea
                                value={profileData.bio}
                                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-600 dark:text-gray-400">{profileData.bio}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Location
                            </label>
                            {isEditing ? (
                              <input
                                type="text"
                                value={profileData.location}
                                onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                                <MapPin className="w-4 h-4" />
                                <span>{profileData.location}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <Mail className="w-5 h-5 text-blue-500" />
                          <span>Contact Information</span>
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Email
                            </label>
                            {isEditing ? (
                              <input
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>{profileData.email}</span>
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Phone
                            </label>
                            {isEditing ? (
                              <input
                                type="tel"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>{profileData.phone}</span>
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Website
                            </label>
                            {isEditing ? (
                              <input
                                type="url"
                                value={profileData.website}
                                onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                                <Globe className="w-4 h-4" />
                                <span>{profileData.website}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interests and Goals */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <Heart className="w-5 h-5 text-red-500" />
                          <span>Interests</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {profileData.interests.map((interest, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span>Wellness Goals</span>
                        </h3>
                        <div className="space-y-2">
                          {profileData.wellnessGoals.map((goal, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-gray-700 dark:text-gray-300">{goal}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'photos' && (
                  <motion.div
                    key="photos"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Avatar Upload */}
                      <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <Camera className="w-5 h-5 text-blue-500" />
                          <span>Profile Picture</span>
                        </h3>
                        <div className="text-center">
                          <div className="relative inline-block">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center text-4xl mb-4 overflow-hidden">
                              {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-16 h-16 text-purple-500" />
                              )}
                            </div>
                            <button
                              onClick={() => avatarInputRef.current?.click()}
                              className="absolute bottom-2 right-2 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                            >
                              <Camera className="w-4 h-4" />
                            </button>
                          </div>
                          <input
                            ref={avatarInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="hidden"
                          />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Click the camera icon to upload a new profile picture
                          </p>
                        </div>
                      </div>

                      {/* Cover Photo Upload */}
                      <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                          <ImageIcon className="w-5 h-5 text-green-500" />
                          <span>Cover Photo</span>
                        </h3>
                        <div className="text-center">
                          <div className="relative">
                            <div className="w-full h-32 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-4 overflow-hidden">
                              {coverPreview ? (
                                <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-12 h-12 text-blue-500" />
                              )}
                            </div>
                            <button
                              onClick={() => coverInputRef.current?.click()}
                              className="absolute top-2 right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                              <Upload className="w-4 h-4" />
                            </button>
                          </div>
                          <input
                            ref={coverInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleCoverUpload}
                            className="hidden"
                          />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Click the upload icon to change your cover photo
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'achievements' && (
                  <motion.div
                    key="achievements"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                        <Award className="w-5 h-5 text-yellow-500" />
                        <span>Your Achievements</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {badges.map((badge) => (
                          <motion.div
                            key={badge.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-gradient-to-br ${getBadgeColor(badge.rarity)} text-white`}
                          >
                            <div className="text-center">
                              <div className="text-3xl mb-2">{badge.icon}</div>
                              <h4 className="font-semibold mb-1">{badge.name}</h4>
                              <p className="text-xs opacity-90 mb-2">{badge.description}</p>
                              <div className="text-xs opacity-75">
                                Earned {new Date(badge.earnedDate).toLocaleDateString()}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'social' && (
                  <motion.div
                    key="social"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        <span>Social Media Links</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(profileData.social).map(([platform, handle]) => (
                          <div key={platform} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                            {platform === 'instagram' && <Instagram className="w-5 h-5 text-pink-500" />}
                            {platform === 'twitter' && <Twitter className="w-5 h-5 text-blue-400" />}
                            {platform === 'linkedin' && <Linkedin className="w-5 h-5 text-blue-600" />}
                            {platform === 'facebook' && <Facebook className="w-5 h-5 text-blue-600" />}
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                {platform}
                              </label>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={handle}
                                  onChange={(e) => setProfileData({
                                    ...profileData,
                                    social: { ...profileData.social, [platform]: e.target.value }
                                  })}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-500 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                                />
                              ) : (
                                <p className="text-sm text-gray-600 dark:text-gray-400">{handle}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'privacy' && (
                  <motion.div
                    key="privacy"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-green-500" />
                        <span>Privacy Settings</span>
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(profileData.privacy).map(([setting, value]) => (
                          <div key={setting} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                                {setting.replace(/([A-Z])/g, ' $1').trim()}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Control who can see this information
                              </p>
                            </div>
                            {isEditing ? (
                              <select
                                value={value}
                                onChange={(e) => setProfileData({
                                  ...profileData,
                                  privacy: { ...profileData.privacy, [setting]: e.target.value }
                                })}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              >
                                <option value="public">Public</option>
                                <option value="friends">Friends Only</option>
                                <option value="private">Private</option>
                              </select>
                            ) : (
                              <div className="flex items-center space-x-2">
                                {value === 'public' ? <Unlock className="w-4 h-4 text-green-500" /> : <Lock className="w-4 h-4 text-red-500" />}
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{value}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 