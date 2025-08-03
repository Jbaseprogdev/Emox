import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
  return { data, error }
}

export const updatePassword = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password,
  })
  return { data, error }
}

// Database operations
export const getUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

export const createUser = async (userData: {
  id: string
  email: string
  name: string
  avatar?: string
}) => {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single()
  return { data, error }
}

export const updateUser = async (userId: string, updates: Partial<{ name: string; avatar: string }>) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  return { data, error }
}

// Journal operations
export const createJournalEntry = async (entry: {
  user_id: string
  content: string
  summary?: string
  mood_tag: string
}) => {
  const { data, error } = await supabase
    .from('journal_entries')
    .insert([entry])
    .select()
    .single()
  return { data, error }
}

export const getJournalEntries = async (userId: string, limit = 10) => {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)
  return { data, error }
}

// Emotion tracking
export const logEmotion = async (emotion: {
  user_id: string
  emotion_type: string
  score: number
}) => {
  const { data, error } = await supabase
    .from('emotions_log')
    .insert([emotion])
    .select()
    .single()
  return { data, error }
}

export const getEmotionHistory = async (userId: string, days = 7) => {
  const { data, error } = await supabase
    .from('emotions_log')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
    .order('created_at', { ascending: false })
  return { data, error }
}

// Vibe Room operations
export const createVibeRoom = async (room: {
  creator_id: string
  emotion_tag: string
  is_private: boolean
}) => {
  const { data, error } = await supabase
    .from('vibe_rooms')
    .insert([room])
    .select()
    .single()
  return { data, error }
}

export const getVibeRooms = async (emotionTag?: string) => {
  let query = supabase
    .from('vibe_rooms')
    .select(`
      *,
      participants:vibe_room_participants(*)
    `)
    .eq('is_private', false)
    .order('created_at', { ascending: false })

  if (emotionTag) {
    query = query.eq('emotion_tag', emotionTag)
  }

  const { data, error } = await query
  return { data, error }
}

export const joinVibeRoom = async (roomId: string, userId: string) => {
  const { data, error } = await supabase
    .from('vibe_room_participants')
    .insert([{ room_id: roomId, user_id: userId }])
    .select()
    .single()
  return { data, error }
}

// Chat operations
export const sendMessage = async (message: {
  room_id: string
  user_id: string
  message: string
}) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([message])
    .select()
    .single()
  return { data, error }
}

export const getChatMessages = async (roomId: string, limit = 50) => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select(`
      *,
      user:users(id, name, avatar)
    `)
    .eq('room_id', roomId)
    .order('created_at', { ascending: false })
    .limit(limit)
  return { data, error }
}

// Threshold warnings
export const createThresholdWarning = async (warning: {
  user_id: string
  emotion_type: string
  score: number
}) => {
  const { data, error } = await supabase
    .from('threshold_warnings')
    .insert([warning])
    .select()
    .single()
  return { data, error }
}

export const resolveThresholdWarning = async (warningId: string) => {
  const { data, error } = await supabase
    .from('threshold_warnings')
    .update({ resolved_at: new Date().toISOString() })
    .eq('id', warningId)
    .select()
    .single()
  return { data, error }
} 