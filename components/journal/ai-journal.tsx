'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Sparkles, 
  Save, 
  Eye, 
  EyeOff,
  Lightbulb,
  TrendingUp,
  Heart
} from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { createJournalEntry, getJournalEntries } from '@/lib/supabase'
import { analyzeJournalEntry, generateDailyPrompt } from '@/lib/ai'
import { JournalEntry, EmotionType } from '@/types'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const emotions: { type: EmotionType; label: string; color: string }[] = [
  { type: 'joy', label: 'Joy', color: 'bg-emotion-joy' },
  { type: 'sadness', label: 'Sadness', color: 'bg-emotion-sadness' },
  { type: 'anger', label: 'Anger', color: 'bg-emotion-anger' },
  { type: 'fear', label: 'Fear', color: 'bg-emotion-fear' },
  { type: 'surprise', label: 'Surprise', color: 'bg-emotion-surprise' },
  { type: 'disgust', label: 'Disgust', color: 'bg-emotion-disgust' },
  { type: 'neutral', label: 'Neutral', color: 'bg-emotion-neutral' },
]

export function AIJournal() {
  const { user } = useAuthStore()
  const [content, setContent] = useState('')
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null)
  const [dailyPrompt, setDailyPrompt] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (!user) return

      try {
        // Load recent entries
        const { data: journalData } = await getJournalEntries(user.id, 10)
        setEntries(journalData || [])

        // Generate daily prompt
        const prompt = await generateDailyPrompt(user.name)
        setDailyPrompt(prompt)
      } catch (error) {
        console.error('Error loading journal data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user])

  const handleSubmit = async () => {
    if (!content.trim() || !selectedEmotion || !user) {
      toast.error('Please write something and select an emotion')
      return
    }

    setIsAnalyzing(true)
    try {
      // Analyze the entry with AI
      const aiAnalysis = await analyzeJournalEntry({
        content: content.trim(),
        emotion: selectedEmotion,
        userId: user.id
      })

      // Save to database
      await createJournalEntry({
        user_id: user.id,
        content: content.trim(),
        summary: aiAnalysis.summary,
        mood_tag: selectedEmotion
      })

      setAnalysis(aiAnalysis)
      setIsSubmitted(true)
      toast.success('Journal entry saved and analyzed!')

      // Refresh entries list
      const { data: journalData } = await getJournalEntries(user.id, 10)
      setEntries(journalData || [])
    } catch (error) {
      console.error('Error saving journal entry:', error)
      toast.error('Failed to save entry. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetForm = () => {
    setContent('')
    setSelectedEmotion(null)
    setAnalysis(null)
    setIsSubmitted(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
      </div>
    )
  }

  if (isSubmitted && analysis) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Success Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Entry Saved Successfully!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what AI discovered about your entry:
          </p>
        </div>

        {/* AI Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Summary
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {analysis.summary}
            </p>
          </motion.div>

          {/* Mood Insight */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-5 h-5 text-wellness-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Mood Insight
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {analysis.moodInsight}
            </p>
          </motion.div>
        </div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Suggestions for You
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.suggestions.map((suggestion: string, index: number) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {suggestion}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={resetForm}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-5 h-5" />
            <span>Write Another Entry</span>
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI Journal
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Reflect on your day with AI-powered insights and guidance.
        </p>
      </motion.div>

      {/* Daily Prompt */}
      {dailyPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 bg-gradient-to-r from-primary-50 to-wellness-50 dark:from-primary-900/20 dark:to-wellness-900/20"
        >
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Today's Prompt
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {dailyPrompt}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Journal Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="space-y-6">
          {/* Content Editor */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Journal Entry
              </label>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center space-x-1"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showPreview ? 'Edit' : 'Preview'}</span>
              </button>
            </div>

            {showPreview ? (
              <div className="min-h-[200px] p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content || '*Start writing your thoughts...*'}
                </ReactMarkdown>
              </div>
            ) : (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write about your day, your feelings, or anything on your mind. You can use markdown formatting like **bold**, *italic*, and lists."
                className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            )}
          </div>

          {/* Emotion Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              How does this entry make you feel?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {emotions.map((emotion) => (
                <button
                  key={emotion.type}
                  onClick={() => setSelectedEmotion(emotion.type)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                    selectedEmotion === emotion.type
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
                  }`}
                >
                  <div className={`w-8 h-8 ${emotion.color} rounded-full mx-auto mb-2`}></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {emotion.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isAnalyzing || !content.trim() || !selectedEmotion}
            className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <div className="spinner"></div>
            ) : (
              <Save className="w-5 h-5" />
            )}
            <span>{isAnalyzing ? 'Analyzing...' : 'Save & Analyze'}</span>
          </button>
        </div>
      </motion.div>

      {/* Recent Entries */}
      {entries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Entries
          </h3>
          <div className="space-y-4">
            {entries.slice(0, 3).map((entry) => (
              <div
                key={entry.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 bg-emotion-${entry.mood_tag} rounded-full`}></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                      {entry.mood_tag}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(entry.created_at), 'MMM d, yyyy')}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                  {entry.content}
                </p>
                {entry.summary && (
                  <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-blue-800 dark:text-blue-200">
                    <strong>AI Insight:</strong> {entry.summary}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Writing Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
      >
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          ✍️ Journaling Tips
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Write freely without worrying about grammar or structure</li>
          <li>• Focus on your feelings and experiences</li>
          <li>• Use markdown for formatting (**, *, -, etc.)</li>
          <li>• Be honest with yourself - this is your private space</li>
          <li>• Regular journaling helps track emotional patterns</li>
        </ul>
      </motion.div>
    </div>
  )
} 