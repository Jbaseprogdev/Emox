import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EmotionType } from '@/types'

interface AppState {
  currentEmotion: EmotionType | null
  emotionScore: number
  isThresholdWarning: boolean
  darkMode: boolean
  lastEmotionCheck: string | null
  
  // Actions
  setCurrentEmotion: (emotion: EmotionType | null) => void
  setEmotionScore: (score: number) => void
  setThresholdWarning: (warning: boolean) => void
  toggleDarkMode: () => void
  setDarkMode: (dark: boolean) => void
  setLastEmotionCheck: (date: string) => void
  resetEmotionState: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentEmotion: null,
      emotionScore: 0,
      isThresholdWarning: false,
      darkMode: false,
      lastEmotionCheck: null,

      setCurrentEmotion: (emotion: EmotionType | null) => {
        set({ currentEmotion: emotion })
      },

      setEmotionScore: (score: number) => {
        set({ emotionScore: score })
      },

      setThresholdWarning: (warning: boolean) => {
        set({ isThresholdWarning: warning })
      },

      toggleDarkMode: () => {
        const { darkMode } = get()
        set({ darkMode: !darkMode })
        // Update document class for Tailwind dark mode
        if (!darkMode) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },

      setDarkMode: (dark: boolean) => {
        set({ darkMode: dark })
        if (dark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },

      setLastEmotionCheck: (date: string) => {
        set({ lastEmotionCheck: date })
      },

      resetEmotionState: () => {
        set({
          currentEmotion: null,
          emotionScore: 0,
          isThresholdWarning: false,
        })
      },
    }),
    {
      name: 'emolinkdn-app-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        lastEmotionCheck: state.lastEmotionCheck,
      }),
    }
  )
) 