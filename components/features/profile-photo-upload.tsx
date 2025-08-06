'use client'

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Camera, Upload, X, RotateCw, ZoomIn, ZoomOut, Crop, Palette,
  Sparkles, Download, Share2, Heart, Star, CheckCircle, AlertCircle,
  Image as ImageIcon, Trash2, Edit3, Filter, Settings
} from 'lucide-react'
import toast from 'react-hot-toast'

interface ProfilePhotoUploadProps {
  onClose: () => void
  currentUser?: any
  onPhotoUpdate?: (photoUrl: string) => void
}

interface Filter {
  id: string
  name: string
  icon: React.ReactNode
  effect: string
}

interface CropPreset {
  id: string
  name: string
  aspectRatio: number
  icon: React.ReactNode
}

export function ProfilePhotoUpload({ onClose, currentUser, onPhotoUpdate }: ProfilePhotoUploadProps) {
  const [activeTab, setActiveTab] = useState('upload')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFilter, setSelectedFilter] = useState<string>('')
  const [selectedCrop, setSelectedCrop] = useState<string>('square')
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [showAIEnhance, setShowAIEnhance] = useState(false)
  const [isAIEnhancing, setIsAIEnhancing] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const filters: Filter[] = [
    { id: 'none', name: 'Original', icon: <ImageIcon className="w-4 h-4" />, effect: 'none' },
    { id: 'warm', name: 'Warm', icon: <Palette className="w-4 h-4" />, effect: 'sepia(0.3) hue-rotate(30deg)' },
    { id: 'cool', name: 'Cool', icon: <Palette className="w-4 h-4" />, effect: 'hue-rotate(180deg) saturate(1.2)' },
    { id: 'vintage', name: 'Vintage', icon: <Filter className="w-4 h-4" />, effect: 'sepia(0.5) contrast(1.1)' },
    { id: 'blackwhite', name: 'B&W', icon: <Filter className="w-4 h-4" />, effect: 'grayscale(1)' },
    { id: 'dramatic', name: 'Dramatic', icon: <Sparkles className="w-4 h-4" />, effect: 'contrast(1.3) brightness(0.9)' }
  ]

  const cropPresets: CropPreset[] = [
    { id: 'square', name: 'Square', aspectRatio: 1, icon: <Crop className="w-4 h-4" /> },
    { id: 'portrait', name: 'Portrait', aspectRatio: 3/4, icon: <Crop className="w-4 h-4" /> },
    { id: 'landscape', name: 'Landscape', aspectRatio: 4/3, icon: <Crop className="w-4 h-4" /> },
    { id: 'circle', name: 'Circle', aspectRatio: 1, icon: <Crop className="w-4 h-4" /> }
  ]

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      toast.success('Image selected successfully!')
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
          toast.success('Profile photo updated successfully!')
          if (onPhotoUpdate && previewUrl) {
            onPhotoUpdate(previewUrl)
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
    setSelectedFilter('')
    toast.success('Edits reset')
  }

  const getFilterStyle = () => {
    const filter = filters.find(f => f.id === selectedFilter)
    return filter ? filter.effect : 'none'
  }

  const getImageStyle = () => {
    return {
      transform: `scale(${zoom}) rotate(${rotation}deg)`,
      filter: `${getFilterStyle()} brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Photo Upload</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload and edit your profile photo with advanced tools
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
              {['upload', 'edit', 'enhance'].map((tab) => (
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
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {!selectedFile ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                          <Upload className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Upload Your Photo
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Drag and drop your image here, or click to browse
                          </p>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-medium"
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
                        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-600">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            style={getImageStyle()}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Photo Selected
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
                              onClick={() => setActiveTab('edit')}
                              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                            >
                              <Edit3 className="w-4 h-4 mr-2" />
                              Edit Photo
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
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                        <span className="text-gray-900 dark:text-white font-medium">Uploading...</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
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

                  {/* Quick Actions */}
                  {selectedFile && !isUploading && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => setShowAIEnhance(true)}
                        className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
                      >
                        <Sparkles className="w-6 h-6 mx-auto mb-2" />
                        <span className="font-medium">AI Enhance</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('edit')}
                        className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
                      >
                        <Edit3 className="w-6 h-6 mx-auto mb-2" />
                        <span className="font-medium">Edit Photo</span>
                      </button>
                      <button
                        onClick={simulateUpload}
                        className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                      >
                        <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                        <span className="font-medium">Save Photo</span>
                      </button>
                    </div>
                  )}
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

                    {/* Filters and Crop */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Filters & Crop</h3>
                      
                      {/* Filters */}
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Filters</label>
                        <div className="grid grid-cols-3 gap-2">
                          {filters.map((filter) => (
                            <button
                              key={filter.id}
                              onClick={() => setSelectedFilter(filter.id)}
                              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                                selectedFilter === filter.id
                                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                {filter.icon}
                                <span className="text-xs font-medium">{filter.name}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Crop Presets */}
                      <div>
                        <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Crop Presets</label>
                        <div className="grid grid-cols-2 gap-2">
                          {cropPresets.map((preset) => (
                            <button
                              key={preset.id}
                              onClick={() => setSelectedCrop(preset.id)}
                              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                                selectedCrop === preset.id
                                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                {preset.icon}
                                <span className="text-xs font-medium">{preset.name}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Reset Button */}
                      <button
                        onClick={resetEdits}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <RotateCw className="w-4 h-4 mr-2 inline" />
                        Reset All Edits
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'enhance' && selectedFile && (
                <motion.div
                  key="enhance"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center py-12">
                    <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      AI-Powered Enhancements
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Let AI automatically improve your photo with advanced algorithms.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                      <button
                        onClick={handleAIEnhance}
                        disabled={isAIEnhancing}
                        className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50"
                      >
                        {isAIEnhancing ? (
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        ) : (
                          <Sparkles className="w-8 h-8 mx-auto mb-2" />
                        )}
                        <span className="font-medium">
                          {isAIEnhancing ? 'Enhancing...' : 'Auto Enhance'}
                        </span>
                      </button>
                      
                      <button
                        onClick={() => setActiveTab('edit')}
                        className="p-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Edit3 className="w-8 h-8 mx-auto mb-2" />
                        <span className="font-medium">Manual Edit</span>
                      </button>
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