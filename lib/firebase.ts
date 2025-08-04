import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updatePassword,
  User as FirebaseUser,
  onAuthStateChanged
} from 'firebase/auth'
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  updateDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { User, JournalEntry, EmotionLog, VibeRoom, ChatMessage, ThresholdWarning } from '@/types'

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

// Auth functions
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { data: { user: userCredential.user }, error: null }
  } catch (error: any) {
    return { data: null, error: { message: error.message } }
  }
}

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return { data: { user: userCredential.user }, error: null }
  } catch (error: any) {
    return { data: null, error: { message: error.message } }
  }
}

export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export const updateUserPassword = async (newPassword: string) => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error('No user logged in')
    await updatePassword(user, newPassword)
    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// User profile functions
export const getUser = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))
    if (userDoc.exists()) {
      return { data: userDoc.data() as User, error: null }
    }
    return { data: null, error: 'User not found' }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

export const createUser = async (userData: Partial<User>) => {
  try {
    const userRef = doc(db, 'users', userData.id!)
    await setDoc(userRef, {
      ...userData,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    })
    return { data: userData as User, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

export const updateUser = async (userId: string, updates: Partial<User>) => {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      ...updates,
      updated_at: serverTimestamp()
    })
    return { data: updates, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

// Journal functions
export const createJournalEntry = async (entry: Omit<JournalEntry, 'id' | 'created_at'>) => {
  try {
    const entryRef = await addDoc(collection(db, 'journal_entries'), {
      ...entry,
      created_at: serverTimestamp()
    })
    return { data: { id: entryRef.id, ...entry }, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

export const getJournalEntries = async (userId: string, limitCount = 10) => {
  try {
    const q = query(
      collection(db, 'journal_entries'),
      where('user_id', '==', userId),
      orderBy('created_at', 'desc'),
      limit(limitCount)
    )
    const querySnapshot = await getDocs(q)
    const entries = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as JournalEntry[]
    return { data: entries, error: null }
  } catch (error: any) {
    return { data: [], error: error.message }
  }
}

// Emotion tracking functions
export const logEmotion = async (emotion: Omit<EmotionLog, 'id' | 'created_at'>) => {
  try {
    const emotionRef = await addDoc(collection(db, 'emotions_log'), {
      ...emotion,
      created_at: serverTimestamp()
    })
    return { data: { id: emotionRef.id, ...emotion }, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

export const getEmotionHistory = async (userId: string, days = 7) => {
  try {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    
    const q = query(
      collection(db, 'emotions_log'),
      where('user_id', '==', userId),
      where('created_at', '>=', Timestamp.fromDate(cutoffDate)),
      orderBy('created_at', 'desc')
    )
    const querySnapshot = await getDocs(q)
    const emotions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as EmotionLog[]
    return { data: emotions, error: null }
  } catch (error: any) {
    return { data: [], error: error.message }
  }
}

// Vibe Room functions
export const createVibeRoom = async (room: Omit<VibeRoom, 'id' | 'created_at'>) => {
  try {
    const roomRef = await addDoc(collection(db, 'vibe_rooms'), {
      ...room,
      created_at: serverTimestamp()
    })
    return { data: { id: roomRef.id, ...room }, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

export const getVibeRooms = async (isPrivate = false) => {
  try {
    const q = query(
      collection(db, 'vibe_rooms'),
      where('is_private', '==', isPrivate),
      orderBy('created_at', 'desc')
    )
    const querySnapshot = await getDocs(q)
    const rooms = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as VibeRoom[]
    return { data: rooms, error: null }
  } catch (error: any) {
    return { data: [], error: error.message }
  }
}

export const joinVibeRoom = async (roomId: string, userId: string) => {
  try {
    const participantRef = await addDoc(collection(db, 'vibe_room_participants'), {
      room_id: roomId,
      user_id: userId,
      joined_at: serverTimestamp()
    })
    return { data: { id: participantRef.id, room_id: roomId, user_id: userId }, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

// Chat functions
export const sendMessage = async (message: Omit<ChatMessage, 'id' | 'created_at'>) => {
  try {
    const messageRef = await addDoc(collection(db, 'chat_messages'), {
      ...message,
      created_at: serverTimestamp()
    })
    return { data: { id: messageRef.id, ...message }, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

export const getChatMessages = async (roomId: string, limitCount = 50) => {
  try {
    const q = query(
      collection(db, 'chat_messages'),
      where('room_id', '==', roomId),
      orderBy('created_at', 'desc'),
      limit(limitCount)
    )
    const querySnapshot = await getDocs(q)
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ChatMessage[]
    return { data: messages.reverse(), error: null }
  } catch (error: any) {
    return { data: [], error: error.message }
  }
}

// Threshold warning functions
export const createThresholdWarning = async (warning: Omit<ThresholdWarning, 'id' | 'triggered_at'>) => {
  try {
    const warningRef = await addDoc(collection(db, 'threshold_warnings'), {
      ...warning,
      triggered_at: serverTimestamp()
    })
    return { data: { id: warningRef.id, ...warning }, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

export const resolveThresholdWarning = async (warningId: string) => {
  try {
    const warningRef = doc(db, 'threshold_warnings', warningId)
    await updateDoc(warningRef, {
      resolved: true,
      resolved_at: serverTimestamp()
    })
    return { data: { id: warningId, resolved: true }, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

// Auth state listener
export const onAuthStateChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback)
} 