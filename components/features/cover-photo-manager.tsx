'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Image, Upload, X, RotateCw, ZoomIn, ZoomOut, Crop, Palette,
  Sparkles, Download, Share2, Heart, Star, CheckCircle, AlertCircle,
  ImageIcon, Trash2, Edit3, Filter, Settings, Layout, Grid3X3,
  Instagram, Facebook, Twitter, Linkedin, Globe, Eye, EyeOff
} from 'lucide-react'
import toast from 'react-hot-toast'

interface CoverPhotoManagerProps {
  onClose: () => void
  currentUser?: any
  onCoverUpdate?: (coverUrl: string) => void
}

interface Layout {
  id: string
  name: string
  icon: React.ReactNode
  aspectRatio: number
  description: string
  preview: string
}

interface SocialPlatform {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  aspectRatio: number
}

export function CoverPhotoManager({ onClose, currentUser, onCoverUpdate }: CoverPhotoManagerProps) {
  const [activeTab, setActiveTab] = useState('upload')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedLayout, setSelectedLayout] = useState<string>('hero')
  const [selectedPlatform, setSelectedPlatform] = useState<string>('')
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [showAIEnhance, setShowAIEnhance] = useState(false)
  const [isAIEnhancing, setIsAIEnhancing] = useState(false)
  const [showSocialPreview, setShowSocialPreview] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const layouts: Layout[] = [
    {
      id: 'hero',
      name: 'Hero Banner',
      icon: <Layout className="w-4 h-4" />,
      aspectRatio: 21/9,
      description: 'Wide banner perfect for main profile',
      preview: '/layouts/hero-preview.jpg'
    },
    {
      id: 'social',
      name: 'Social Media',
      icon: <Grid3X3 className="w-4 h-4" />,
      aspectRatio: 16/9,
      description: 'Optimized for social platforms',
      preview: '/layouts/social-preview.jpg'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      icon: <Layout className="w-4 h-4" />,
      aspectRatio: 3/1,
      description: 'Clean and simple design',
      preview: '/layouts/minimal-preview.jpg'
    },
    {
      id: 'creative',
      name: 'Creative',
      icon: <Sparkles className="w-4 h-4" />,
      aspectRatio: 2/1,
      description: 'Artistic and expressive',
      preview: '/layouts/creative-preview.jpg'
    }
  ]

  const socialPlatforms: SocialPlatform[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="w-4 h-4" />,
      color: 'from-pink-500 to-purple-500',
      aspectRatio: 1.91/1
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4" />,
      color: 'from-blue-500 to-blue-600',
      aspectRatio: 1.91/1
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: <Twitter className="w-4 h-4" />,
      color: 'from-blue-400 to-blue-500',
      aspectRatio: 2/1
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4" />,
      color: 'from-blue-600 to-blue-700',
      aspectRatio: 4/1
    }
  ]

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      toast.success('Cover photo selected successfully!')
    } else {
      toast.error('Please select a valid image file')
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [handleFileSelect])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          toast.success('Cover photo updated successfully!')
          if (onCoverUpdate && previewUrl) {
            onCoverUpdate(previewUrl)
          }
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleAIEnhance = () => {
    setIsAIEnhancing(true)
    setTimeout(() => {
      setIsAIEnhancing(false)
      setBrightness(110)
      setContrast(105)
      setSaturation(110)
      toast.success('AI enhancement applied!')
    }, 2000)
  }

  const resetEdits = () => {
    setZoom(1)
    setRotation(0)
    setBrightness(100)
    setContrast(100)
    setSaturation(100)
    toast.success('Edits reset')
  }

  const getImageStyle = () => {
    return {
      transform: `scale(${zoom}) rotate(${rotation}deg)`,
      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
    }
  }

  const getLayoutStyle = () => {
    const layout = layouts.find(l => l.id === selectedLayout)
    return layout ? { aspectRatio: layout.aspectRatio } : {}
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Image className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Cover Photo Manager</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create stunning cover photos with AI enhancement and social media optimization
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
            {/* Tabs */}
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {['upload', 'layouts', 'social', 'edit'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  disabled={!selectedFile && tab !== 'upload'}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'upload' && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {!selectedFile ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                          <Upload className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Upload Your Cover Photo
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Drag and drop your image here, or click to browse
                          </p>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
                          >
                            Choose File
                          </button>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Supports JPG, PNG, GIF up to 10MB
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden border-4 border-gray-200 dark:border-gray-600">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-32 object-cover"
                            style={getImageStyle()}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Cover Photo Selected
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                          <div className="flex items-center justify-center space-x-3">
                            <button
                              onClick={() => {
                                setSelectedFile(null)
                                setPreviewUrl('')
                              }}
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove
                            </button>
                            <button
                              onClick={() => setActiveTab('layouts')}
                              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                            >
                              <Layout className="w-4 h-4 mr-2" />
                              Choose Layout
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                        <span className="text-gray-900 dark:text-white font-medium">Uploading...</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {uploadProgress}% complete
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'layouts' && selectedFile && (
                <motion.div
                  key="layouts"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Layout Preview */}
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-center min-h-48">
                      <div className="relative w-full max-w-2xl">
                        <div 
                          className="w-full rounded-lg overflow-hidden shadow-lg"
                          style={getLayoutStyle()}
                        >
                          <img
                            src={previewUrl}
                            alt="Layout Preview"
                            className="w-full h-full object-cover"
                            style={getImageStyle()}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Layout Options */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Layout</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {layouts.map((layout) => (
                        <button
                          key={layout.id}
                          onClick={() => setSelectedLayout(layout.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                            selectedLayout === layout.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            {layout.icon}
                            <span className="font-medium text-gray-900 dark:text-white">{layout.name}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{layout.description}</p>
                          <div className="w-full h-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {layout.aspectRatio.toFixed(2)}:1
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setShowAIEnhance(true)}
                      className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
                    >
                      <Sparkles className="w-6 h-6 mx-auto mb-2" />
                      <span className="font-medium">AI Enhance</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('social')}
                      className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
                    >
                      <Globe className="w-6 h-6 mx-auto mb-2" />
                      <span className="font-medium">Social Preview</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('edit')}
                      className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                    >
                      <Edit3 className="w-6 h-6 mx-auto mb-2" />
                      <span className="font-medium">Edit Photo</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'social' && selectedFile && (
                <motion.div
                  key="social"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Social Platform Preview */}
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-center min-h-64">
                      <div className="relative w-full max-w-md">
                        <div className="w-full rounded-lg overflow-hidden shadow-lg">
                          <img
                            src={previewUrl}
                            alt="Social Preview"
                            className="w-full h-32 object-cover"
                            style={getImageStyle()}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Platform Options */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Social Media Platforms</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {socialPlatforms.map((platform) => (
                        <button
                          key={platform.id}
                          onClick={() => setSelectedPlatform(platform.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                            selectedPlatform === platform.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                              {platform.icon}
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">{platform.name}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Optimized for {platform.name}
                          </p>
                          <div className="w-full h-12 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {platform.aspectRatio.toFixed(2)}:1
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Social Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setShowSocialPreview(true)}
                      className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                    >
                      <Eye className="w-6 h-6 mx-auto mb-2" />
                      <span className="font-medium">Preview on Social</span>
                    </button>
                    <button
                      onClick={simulateUpload}
                      className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
                    >
                      <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                      <span className="font-medium">Save Cover Photo</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'edit' && selectedFile && (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Image Preview */}
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-center min-h-64">
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Edit Preview"
                          className="max-w-full max-h-64 rounded-lg shadow-lg"
                          style={getImageStyle()}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Edit Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Adjustments */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Basic Adjustments</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Zoom</label>
                          <div className="flex items-center space-x-2">
                            <ZoomOut className="w-4 h-4 text-gray-400" />
                            <input
                              type="range"
                              min="0.5"
                              max="2"
                              step="0.1"
                              value={zoom}
                              onChange={(e) => setZoom(parseFloat(e.target.value))}
                              className="flex-1"
                            />
                            <ZoomIn className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Rotation</label>
                          <div className="flex items-center space-x-2">
                            <RotateCw className="w-4 h-4 text-gray-400" />
                            <input
                              type="range"
                              min="-180"
                              max="180"
                              value={rotation}
                              onChange={(e) => setRotation(parseInt(e.target.value))}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Brightness</label>
                          <input
                            type="range"
                            min="50"
                            max="150"
                            value={brightness}
                            onChange={(e) => setBrightness(parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Contrast</label>
                          <input
                            type="range"
                            min="50"
                            max="150"
                            value={contrast}
                            onChange={(e) => setContrast(parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Saturation</label>
                          <input
                            type="range"
                            min="0"
                            max="200"
                            value={saturation}
                            onChange={(e) => setSaturation(parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* AI Enhancement */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">AI Enhancement</h3>
                      
                      <div className="space-y-4">
                        <button
                          onClick={handleAIEnhance}
                          disabled={isAIEnhancing}
                          className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50"
                        >
                          {isAIEnhancing ? (
                            <div className="flex items-center justify-center space-x-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>Enhancing...</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center space-x-2">
                              <Sparkles className="w-4 h-4" />
                              <span>Auto Enhance</span>
                            </div>
                          )}
                        </button>

                        <button
                          onClick={resetEdits}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <RotateCw className="w-4 h-4 mr-2 inline" />
                          Reset All Edits
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </motion.div>
    </div>
  )
} 