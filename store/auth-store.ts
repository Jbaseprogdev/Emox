import { create } from 'zustand'
import { User } from '@/types'
import { signIn, signUp, signOut, resetPassword, getUser, createUser } from '@/lib/supabase'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  initialized: boolean
  
  // Actions
  initialize: () => Promise<void>
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  clearError: () => void
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  initialized: false,

  initialize: async () => {
    set({ loading: true })
    try {
      // Check for existing session
      const { data: { session } } = await import('@/lib/supabase').then(m => m.supabase.auth.getSession())
      
      if (session?.user) {
        // Get user profile from database
        const { data: userData, error } = await getUser(session.user.id)
        
        if (error || !userData) {
          // Create user profile if it doesn't exist
          const { data: newUser, error: createError } = await createUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name || 'User',
            avatar: session.user.user_metadata?.avatar
          })
          
          if (createError) {
            console.error('Error creating user profile:', createError)
            set({ user: null, loading: false, initialized: true })
            return
          }
          
          set({ user: newUser, loading: false, initialized: true })
        } else {
          set({ user: userData, loading: false, initialized: true })
        }
      } else {
        set({ user: null, loading: false, initialized: true })
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({ user: null, loading: false, error: 'Failed to initialize authentication', initialized: true })
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await signIn(email, password)
      
      if (error) {
        set({ loading: false, error: error.message })
        return { success: false, error: error.message }
      }

      if (data.user) {
        // Get user profile
        const { data: userData, error: userError } = await getUser(data.user.id)
        
        if (userError || !userData) {
          // Create user profile if it doesn't exist
          const { data: newUser, error: createError } = await createUser({
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name || 'User',
            avatar: data.user.user_metadata?.avatar
          })
          
          if (createError) {
            set({ loading: false, error: 'Failed to create user profile' })
            return { success: false, error: 'Failed to create user profile' }
          }
          
          set({ user: newUser, loading: false })
        } else {
          set({ user: userData, loading: false })
        }
      }
      
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign in failed'
      set({ loading: false, error: errorMessage })
      return { success: false, error: errorMessage }
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await signUp(email, password, name)
      
      if (error) {
        set({ loading: false, error: error.message })
        return { success: false, error: error.message }
      }

      if (data.user) {
        // Create user profile
        const { data: userData, error: createError } = await createUser({
          id: data.user.id,
          email: data.user.email!,
          name: name,
          avatar: data.user.user_metadata?.avatar
        })
        
        if (createError) {
          set({ loading: false, error: 'Failed to create user profile' })
          return { success: false, error: 'Failed to create user profile' }
        }
        
        set({ user: userData, loading: false })
      }
      
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed'
      set({ loading: false, error: errorMessage })
      return { success: false, error: errorMessage }
    }
  },

  signOut: async () => {
    set({ loading: true })
    try {
      await signOut()
      set({ user: null, loading: false, error: null })
    } catch (error) {
      console.error('Sign out error:', error)
      set({ loading: false, error: 'Failed to sign out' })
    }
  },

  resetPassword: async (email: string) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await resetPassword(email)
      
      if (error) {
        set({ loading: false, error: error.message })
        return { success: false, error: error.message }
      }
      
      set({ loading: false })
      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Password reset failed'
      set({ loading: false, error: errorMessage })
      return { success: false, error: errorMessage }
    }
  },

  clearError: () => {
    set({ error: null })
  },

  setUser: (user: User | null) => {
    set({ user })
  },
})) 