export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  created_at: string
  updated_at: string
}

export interface JournalEntry {
  id: string
  user_id: string
  content: string
  summary?: string
  mood_tag: EmotionType
  created_at: string
  updated_at: string
}

export interface EmotionLog {
  id: string
  user_id: string
  emotion_type: EmotionType
  score: number
  created_at: string
}

export interface VibeRoom {
  id: string
  creator_id: string
  emotion_tag: EmotionType
  is_private: boolean
  created_at: string
  updated_at: string
  participants?: VibeRoomParticipant[]
}

export interface VibeRoomParticipant {
  id: string
  room_id: string
  user_id: string
  joined_at: string
  user?: User
}

export interface ChatMessage {
  id: string
  room_id: string
  user_id: string
  message: string
  created_at: string
  user?: User
}

export interface ThresholdWarning {
  id: string
  user_id: string
  emotion_type: EmotionType
  score: number
  triggered_at: string
  resolved_at?: string
}

export type EmotionType = 
  | 'joy' 
  | 'sadness' 
  | 'anger' 
  | 'fear' 
  | 'surprise' 
  | 'disgust' 
  | 'neutral'

export interface EmotionData {
  type: EmotionType
  score: number
  timestamp: Date
}

export interface MoodStreak {
  current_streak: number
  longest_streak: number
  last_entry_date?: string
}

export interface AIResponse {
  summary: string
  suggestions: string[]
  mood_insight: string
}

export interface DashboardStats {
  total_entries: number
  current_streak: number
  average_mood: number
  most_frequent_emotion: EmotionType
  weekly_mood_data: EmotionData[]
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export interface AppState {
  currentEmotion: EmotionType | null
  emotionScore: number
  isThresholdWarning: boolean
  darkMode: boolean
} 