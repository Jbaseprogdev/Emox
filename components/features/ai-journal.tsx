'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Sparkles, Send, X, Lightbulb, TrendingUp, Heart, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'

interface JournalEntry {
  id: string
  content: string
  mood: string
  summary: string
  insights: string[]
  created_at: string
  tags: string[]
}

interface AIJournalProps {
  onEntryCreated: (entry: JournalEntry) => void
  onClose: () => void
}

const dailyPrompts = [
  "What's the most meaningful thing that happened today?",
  "How are you feeling right now, and what might be causing those feelings?",
  "What's something you're grateful for today?",
  "Describe a challenge you faced and how you handled it.",
  "What would you like to improve about your emotional well-being?",
  "Share a moment that made you smile today.",
  "What's something you're looking forward to?",
  "How did you take care of yourself today?",
  "What's on your mind that you'd like to explore?",
  "Describe your energy level and what might be affecting it."
]

const moodTags = [
  { name: 'Grateful', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' },
  { name: 'Anxious', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' },
  { name: 'Excited', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300' },
  { name: 'Calm', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' },
  { name: 'Stressed', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' },
  { name: 'Hopeful', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' }
]

export function AIJournal({ onEntryCreated, onClose }: AIJournalProps) {
  const [content, setContent] = useState('')
  const [selectedPrompt, setSelectedPrompt] = useState('')
  const [selectedMood, setSelectedMood] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<{
    summary: string
    insights: string[]
    mood: string
  } | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    // Set a random daily prompt
    const randomPrompt = dailyPrompts[Math.floor(Math.random() * dailyPrompts.length)]
    setSelectedPrompt(randomPrompt)
  }, [])

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt)
    if (!content) {
      setContent(prompt + '\n\n')
    }
  }

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
  }

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const simulateAIAnalysis = async () => {
    if (!content.trim()) {
      toast.error('Please write something before analyzing')
      return
    }

    setIsAnalyzing(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate mock analysis based on content
    const wordCount = content.split(' ').length
    const hasPositiveWords = /happy|joy|grateful|excited|good|great|wonderful|amazing/i.test(content)
    const hasNegativeWords = /sad|angry|frustrated|anxious|worried|stress|bad|terrible/i.test(content)
    
    let mood = 'Neutral'
    if (hasPositiveWords && !hasNegativeWords) mood = 'Positive'
    else if (hasNegativeWords && !hasPositiveWords) mood = 'Negative'
    else if (hasPositiveWords && hasNegativeWords) mood = 'Mixed'
    
    const summary = `Your journal entry reflects a ${mood.toLowerCase()} emotional state. You wrote ${wordCount} words, showing ${wordCount > 100 ? 'detailed reflection' : 'brief thoughts'} on your experiences.`
    
    const insights = [
      'Consider exploring the root causes of your current emotions',
      'Practice self-compassion in your reflections',
      'Notice patterns in your emotional responses',
      'Celebrate small victories and moments of joy',
      'Remember that all emotions are valid and temporary'
    ]
    
    setAnalysis({ summary, insights, mood })
    setIsAnalyzing(false)
    toast.success('AI analysis complete!')
  }

  const handleSave = () => {
    if (!content.trim()) {
      toast.error('Please write something before saving')
      return
    }

    const entry: JournalEntry = {
      id: Date.now().toString(),
      content,
      mood: selectedMood || analysis?.mood || 'Unknown',
      summary: analysis?.summary || 'No analysis available',
      insights: analysis?.insights || [],
      created_at: new Date().toISOString(),
      tags: selectedTags
    }

    onEntryCreated(entry)
    toast.success('Journal entry saved!')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-wellness-100 dark:bg-wellness-900 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-wellness-600 dark:text-wellness-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Journal</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Write, reflect, and get AI insights</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Writing Prompts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <span>Writing Prompts</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dailyPrompts.slice(0, 6).map((prompt, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePromptSelect(prompt)}
                  className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                    selectedPrompt === prompt
                      ? 'border-wellness-500 bg-wellness-50 dark:bg-wellness-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-wellness-300 dark:hover:border-wellness-600'
                  }`}
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300">{prompt}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mood Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span>How are you feeling?</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {moodTags.map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => handleMoodSelect(tag.name)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedMood === tag.name
                      ? tag.color + ' ring-2 ring-offset-2 ring-wellness-500'
                      : tag.color + ' hover:opacity-80'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Journal Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Journal Entry</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your thoughts, feelings, and experiences..."
                className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-wellness-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {content.length} characters
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span>AI Analysis</span>
              </h3>
              <button
                onClick={simulateAIAnalysis}
                disabled={isAnalyzing || !content.trim()}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium rounded-lg transition-colors duration-200"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Analyze Entry</span>
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4"
                >
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">AI Insights</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Summary</h5>
                      <p className="text-sm text-purple-700 dark:text-purple-300">{analysis.summary}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Insights</h5>
                      <ul className="space-y-1">
                        {analysis.insights.map((insight, index) => (
                          <li key={index} className="text-sm text-purple-700 dark:text-purple-300 flex items-start space-x-2">
                            <TrendingUp className="w-3 h-3 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            
            <button
              onClick={handleSave}
              disabled={!content.trim()}
              className="flex-1 bg-wellness-600 hover:bg-wellness-700 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Save Entry
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 