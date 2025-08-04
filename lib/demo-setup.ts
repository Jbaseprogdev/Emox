// Demo setup utilities for testing and demonstration

export interface DemoData {
  users: DemoUser[]
  emotions: DemoEmotion[]
  journalEntries: DemoJournalEntry[]
}

export interface DemoUser {
  id: string
  name: string
  email: string
  avatar: string
  description: string
}

export interface DemoEmotion {
  id: string
  emotion_type: string
  score: number
  created_at: string
  description: string
}

export interface DemoJournalEntry {
  id: string
  content: string
  mood_tag: string
  created_at: string
  summary: string
}

export const demoUsers: DemoUser[] = [
  {
    id: 'sarah',
    name: 'Sarah Johnson',
    email: 'sarah@demo.com',
    avatar: '',
    description: 'Wellness enthusiast'
  },
  {
    id: 'mike',
    name: 'Mike Chen',
    email: 'mike@demo.com',
    avatar: '',
    description: 'Stress management focus'
  },
  {
    id: 'emma',
    name: 'Emma Wilson',
    email: 'emma@demo.com',
    avatar: '',
    description: 'Emotional awareness journey'
  },
  {
    id: 'alex',
    name: 'Alex Rodriguez',
    email: 'alex@demo.com',
    avatar: '',
    description: 'Mindfulness practitioner'
  }
]

export const demoEmotions: DemoEmotion[] = [
  {
    id: '1',
    emotion_type: 'joy',
    score: 8,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    description: 'Had a great day at work'
  },
  {
    id: '2',
    emotion_type: 'sadness',
    score: 4,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Feeling a bit down today'
  },
  {
    id: '3',
    emotion_type: 'anger',
    score: 6,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Frustrated with traffic'
  },
  {
    id: '4',
    emotion_type: 'neutral',
    score: 5,
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Regular day'
  },
  {
    id: '5',
    emotion_type: 'joy',
    score: 9,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Amazing weekend with friends'
  }
]

export const demoJournalEntries: DemoJournalEntry[] = [
  {
    id: '1',
    content: 'Today was really productive! I finished my project ahead of schedule and felt a great sense of accomplishment. The team was supportive and I learned some new skills. Looking forward to what tomorrow brings.',
    mood_tag: 'joy',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Feeling accomplished and optimistic about the future'
  },
  {
    id: '2',
    content: 'Had a difficult conversation with a friend today. We disagreed on something important and it left me feeling unsettled. I\'m trying to process my emotions and understand their perspective better.',
    mood_tag: 'sadness',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Processing difficult emotions from a challenging conversation'
  },
  {
    id: '3',
    content: 'The traffic was absolutely terrible today! I was late for an important meeting and felt so frustrated. I need to work on my patience and maybe leave earlier next time.',
    mood_tag: 'anger',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    summary: 'Frustrated with traffic but recognizing the need for better planning'
  }
]

export const demoVibeRooms = [
  {
    id: '1',
    name: 'Joy & Celebration',
    emotion_tag: 'joy',
    participants: 12,
    description: 'Share your happy moments and celebrate together'
  },
  {
    id: '2',
    name: 'Stress Relief',
    emotion_tag: 'fear',
    participants: 8,
    description: 'Support each other through anxiety and stress'
  },
  {
    id: '3',
    name: 'Mindful Moments',
    emotion_tag: 'neutral',
    participants: 15,
    description: 'Practice mindfulness and find inner peace'
  }
]

// Demo credentials for easy testing
export const DEMO_CREDENTIALS = {
  email: 'demo@emolinkdn.com',
  password: 'demo123'
}

// Function to get demo data for a specific user
export const getDemoDataForUser = (email: string) => {
  const user = demoUsers.find(u => u.email === email)
  if (!user) return null

  return {
    user,
    emotions: demoEmotions,
    journalEntries: demoJournalEntries,
    vibeRooms: demoVibeRooms
  }
}

// Function to simulate demo login
export const simulateDemoLogin = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const user = demoUsers.find(u => u.email === email)
  if (!user || password !== 'demo123') {
    throw new Error('Invalid credentials')
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar
    },
    session: {
      access_token: 'demo_token_' + Date.now(),
      refresh_token: 'demo_refresh_' + Date.now()
    }
  }
} 