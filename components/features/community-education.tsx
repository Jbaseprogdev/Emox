'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap, BookOpen, Users, Award, Play, Pause, Clock,
  CheckCircle, X, Star, Heart, Shield, Lightbulb, Target,
  TrendingUp, Calendar, Video, FileText, Headphones, Globe
} from 'lucide-react'
import toast from 'react-hot-toast'

interface CommunityEducationProps {
  onClose: () => void
  currentUser?: any
}

interface Course {
  id: string
  title: string
  description: string
  category: 'mental-health' | 'communication' | 'leadership' | 'wellness' | 'community'
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  lessons: number
  enrolled: number
  rating: number
  instructor: string
  thumbnail: string
  completed: boolean
  progress: number
  certificate?: boolean
}

interface Lesson {
  id: string
  title: string
  type: 'video' | 'reading' | 'interactive' | 'quiz'
  duration: string
  completed: boolean
  content?: string
  videoUrl?: string
  quiz?: {
    questions: number
    passed: boolean
    score?: number
  }
}

export function CommunityEducation({ onClose, currentUser }: CommunityEducationProps) {
  const [activeTab, setActiveTab] = useState('courses')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showVideo, setShowVideo] = useState(false)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)

  const courses: Course[] = [
    {
      id: 'mental-health-basics',
      title: 'Mental Health Fundamentals',
      description: 'Learn the basics of mental health, common conditions, and how to support others.',
      category: 'mental-health',
      level: 'beginner',
      duration: '4 hours',
      lessons: 12,
      enrolled: 1247,
      rating: 4.8,
      instructor: 'Dr. Sarah Johnson',
      thumbnail: '/courses/mental-health.jpg',
      completed: false,
      progress: 0,
      certificate: true
    },
    {
      id: 'active-listening',
      title: 'Active Listening & Empathy',
      description: 'Master the art of active listening and develop deeper empathy skills.',
      category: 'communication',
      level: 'intermediate',
      duration: '3 hours',
      lessons: 8,
      enrolled: 892,
      rating: 4.9,
      instructor: 'Michael Chen',
      thumbnail: '/courses/listening.jpg',
      completed: false,
      progress: 25,
      certificate: true
    },
    {
      id: 'community-leadership',
      title: 'Community Leadership & Moderation',
      description: 'Learn how to lead and moderate online communities effectively.',
      category: 'leadership',
      level: 'advanced',
      duration: '6 hours',
      lessons: 15,
      enrolled: 456,
      rating: 4.7,
      instructor: 'Emma Davis',
      thumbnail: '/courses/leadership.jpg',
      completed: true,
      progress: 100,
      certificate: true
    },
    {
      id: 'wellness-practices',
      title: 'Daily Wellness Practices',
      description: 'Discover practical wellness techniques for daily life.',
      category: 'wellness',
      level: 'beginner',
      duration: '2 hours',
      lessons: 6,
      enrolled: 1567,
      rating: 4.6,
      instructor: 'Alex Thompson',
      thumbnail: '/courses/wellness.jpg',
      completed: false,
      progress: 0,
      certificate: false
    },
    {
      id: 'crisis-intervention',
      title: 'Crisis Intervention Skills',
      description: 'Learn how to recognize and respond to mental health crises.',
      category: 'mental-health',
      level: 'advanced',
      duration: '5 hours',
      lessons: 10,
      enrolled: 234,
      rating: 4.9,
      instructor: 'Dr. Lisa Brown',
      thumbnail: '/courses/crisis.jpg',
      completed: false,
      progress: 0,
      certificate: true
    }
  ]

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Introduction to Active Listening',
      type: 'video',
      duration: '15 min',
      completed: true,
      videoUrl: 'https://example.com/video1.mp4'
    },
    {
      id: '2',
      title: 'Understanding Non-Verbal Cues',
      type: 'reading',
      duration: '10 min',
      completed: true,
      content: 'Learn to read body language and facial expressions...'
    },
    {
      id: '3',
      title: 'Practice Session: Listening Exercises',
      type: 'interactive',
      duration: '20 min',
      completed: false
    },
    {
      id: '4',
      title: 'Empathy Building Techniques',
      type: 'video',
      duration: '18 min',
      completed: false,
      videoUrl: 'https://example.com/video2.mp4'
    },
    {
      id: '5',
      title: 'Assessment: Listening Skills Quiz',
      type: 'quiz',
      duration: '15 min',
      completed: false,
      quiz: {
        questions: 10,
        passed: false
      }
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mental-health':
        return 'from-blue-500 to-cyan-500'
      case 'communication':
        return 'from-green-500 to-emerald-500'
      case 'leadership':
        return 'from-purple-500 to-pink-500'
      case 'wellness':
        return 'from-orange-500 to-red-500'
      case 'community':
        return 'from-indigo-500 to-purple-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'advanced':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />
      case 'reading':
        return <FileText className="w-4 h-4" />
      case 'interactive':
        return <Users className="w-4 h-4" />
      case 'quiz':
        return <Target className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleEnroll = (courseId: string) => {
    toast.success('Successfully enrolled in course!')
  }

  const handleLessonComplete = (lessonId: string) => {
    toast.success('Lesson completed!')
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
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Community Education</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn skills to build respectful and supportive communities
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
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Build Better Communities Together
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Access expert-led courses on mental health, communication, leadership, and wellness. 
                    Earn certificates and develop skills to create supportive environments.
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>5,000+ learners</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>15+ courses</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>4.8/5 rating</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {['courses', 'my-learning', 'certificates'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab === 'my-learning' ? 'My Learning' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'courses' && (
                <motion.div
                  key="courses"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Search and Filters */}
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      <option value="mental-health">Mental Health</option>
                      <option value="communication">Communication</option>
                      <option value="leadership">Leadership</option>
                      <option value="wellness">Wellness</option>
                      <option value="community">Community</option>
                    </select>
                  </div>

                  {/* Courses Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => setSelectedCourse(course)}
                      >
                        {/* Course Thumbnail */}
                        <div className={`h-32 bg-gradient-to-br ${getCategoryColor(course.category)} relative`}>
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                          {course.certificate && (
                            <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1">
                              <Award className="w-4 h-4 text-green-600" />
                            </div>
                          )}
                        </div>

                        {/* Course Content */}
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(course.level)}`}>
                              {course.level}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{course.rating}</span>
                            </div>
                          </div>

                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {course.description}
                          </p>

                          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{course.lessons} lessons</span>
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              by {course.instructor}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEnroll(course.id)
                              }}
                              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                            >
                              {course.completed ? 'Completed' : 'Enroll'}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'my-learning' && (
                <motion.div
                  key="my-learning"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Learning Progress */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Learning Progress</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">3</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Courses Enrolled</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">67%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Average Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">12</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Lessons Completed</div>
                      </div>
                    </div>
                  </div>

                  {/* Enrolled Courses */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Courses</h3>
                    {courses.filter(c => c.progress > 0 || c.completed).map((course) => (
                      <div
                        key={course.id}
                        className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => setSelectedCourse(course)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${getCategoryColor(course.category)} flex items-center justify-center`}>
                            <GraduationCap className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{course.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                              <span>{course.duration}</span>
                              <span>{course.lessons} lessons</span>
                              <span>by {course.instructor}</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                <span className="font-medium text-gray-900 dark:text-white">{course.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                <motion.div
                                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${course.progress}%` }}
                                  transition={{ duration: 0.5 }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {course.completed ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                              <Play className="w-6 h-6 text-blue-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'certificates' && (
                <motion.div
                  key="certificates"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center py-12">
                    <Award className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Earn Certificates
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Complete courses to earn certificates and showcase your skills.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                      {courses.filter(c => c.certificate && c.completed).map((course) => (
                        <div
                          key={course.id}
                          className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6 text-center"
                        >
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCategoryColor(course.category)} flex items-center justify-center mx-auto mb-3`}>
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Certificate earned</p>
                          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                            Download Certificate
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Course Detail Modal */}
        <AnimatePresence>
          {selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              >
                {/* Course Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedCourse.title}</h3>
                    <button
                      onClick={() => setSelectedCourse(null)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedCourse.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedCourse.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{selectedCourse.lessons} lessons</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{selectedCourse.enrolled} enrolled</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{selectedCourse.rating}/5</span>
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Course Lessons</h4>
                    {lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                        onClick={() => setCurrentLesson(lesson)}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900 dark:text-white">{lesson.title}</h5>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            {getLessonIcon(lesson.type)}
                            <span className="capitalize">{lesson.type}</span>
                            <span>•</span>
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Play className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
} 