import { create } from 'zustand'
import { User } from '@/types'
import { signIn, signUp, signOut, resetPassword, getUser, createUser, onAuthStateChange } from '@/lib/firebase'
import { User as FirebaseUser } from 'firebase/auth'

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

  initialize: async (): Promise<void> => {
    set({ loading: true })
    try {
      // Demo mode - skip real auth check if using demo credentials
      const isDemoMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'your_firebase_api_key'
      
      if (isDemoMode) {
        set({ user: null, loading: false, initialized: true })
        return
      }
      
      // Listen for auth state changes
      const unsubscribe = onAuthStateChange(async (firebaseUser) => {
        if (firebaseUser) {
          // Get user profile from database
          const { data: userData, error } = await getUser(firebaseUser.uid)
          
          if (error || !userData) {
            // Create user profile if it doesn't exist
            const { data: newUser, error: createError } = await createUser({
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              name: firebaseUser.displayName || 'User',
              avatar: firebaseUser.photoURL || ''
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
      })
      
      // Cleanup subscription on unmount
      // Note: unsubscribe is handled by Firebase automatically
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({ user: null, loading: false, error: 'Failed to initialize authentication', initialized: true })
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null })
    try {
      // Demo mode - allow demo users to sign in
      if (email.includes('@demo.com') && password === 'demo123') {
        const demoUser = {
          id: 'demo-user',
          email: email,
          name: email.split('@')[0].replace('.', ' '),
          avatar: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        set({ user: demoUser, loading: false })
        return { success: true }
      }
      
      const { data, error } = await signIn(email, password)
      
      if (error) {
        set({ loading: false, error: error.message })
        return { success: false, error: error.message }
      }

      if (data.user) {
        // Get user profile
        const { data: userData, error: userError } = await getUser(data.user.uid)
        
        if (userError || !userData) {
          // Create user profile if it doesn't exist
          const { data: newUser, error: createError } = await createUser({
            id: data.user.uid,
            email: data.user.email!,
            name: data.user.displayName || 'User',
            avatar: data.user.photoURL || ''
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
          id: data.user.uid,
          email: data.user.email!,
          name: name,
          avatar: data.user.photoURL || ''
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
      const { success, error } = await resetPassword(email)
      
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