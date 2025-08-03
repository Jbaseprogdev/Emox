'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Plus, 
  MessageCircle, 
  Heart, 
  Settings,
  User,
  Send,
  ArrowLeft,
  Lock,
  Globe
} from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { getVibeRooms, createVibeRoom, joinVibeRoom, getChatMessages, sendMessage } from '@/lib/supabase'
import { VibeRoom, ChatMessage, EmotionType } from '@/types'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

const emotions: { type: EmotionType; label: string; color: string; description: string }[] = [
  { type: 'joy', label: 'Joy', color: 'bg-emotion-joy', description: 'Happy and positive vibes' },
  { type: 'sadness', label: 'Sadness', color: 'bg-emotion-sadness', description: 'Support and comfort' },
  { type: 'anger', label: 'Anger', color: 'bg-emotion-anger', description: 'Venting and understanding' },
  { type: 'fear', label: 'Fear', color: 'bg-emotion-fear', description: 'Anxiety and reassurance' },
  { type: 'surprise', label: 'Surprise', color: 'bg-emotion-surprise', description: 'Excitement and wonder' },
  { type: 'disgust', label: 'Disgust', color: 'bg-emotion-disgust', description: 'Frustration and relief' },
  { type: 'neutral', label: 'Neutral', color: 'bg-emotion-neutral', description: 'Calm and balanced' },
]

export function VibeRooms() {
  const { user } = useAuthStore()
  const [rooms, setRooms] = useState<VibeRoom[]>([])
  const [selectedRoom, setSelectedRoom] = useState<VibeRoom | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null)
  const [isPrivate, setIsPrivate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    loadRooms()
  }, [])

  useEffect(() => {
    if (selectedRoom) {
      loadMessages(selectedRoom.id)
    }
  }, [selectedRoom])

  const loadRooms = async () => {
    try {
      const { data } = await getVibeRooms()
      setRooms(data || [])
    } catch (error) {
      console.error('Error loading rooms:', error)
      toast.error('Failed to load rooms')
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (roomId: string) => {
    try {
      const { data } = await getChatMessages(roomId)
      setMessages(data || [])
    } catch (error) {
      console.error('Error loading messages:', error)
      toast.error('Failed to load messages')
    }
  }

  const handleCreateRoom = async () => {
    if (!selectedEmotion || !user) return

    try {
      const { data: newRoom } = await createVibeRoom({
        creator_id: user.id,
        emotion_tag: selectedEmotion,
        is_private: isPrivate
      })

      if (newRoom) {
        setRooms(prev => [newRoom, ...prev])
        setShowCreateRoom(false)
        setSelectedEmotion(null)
        setIsPrivate(false)
        toast.success('Room created successfully!')
      }
    } catch (error) {
      console.error('Error creating room:', error)
      toast.error('Failed to create room')
    }
  }

  const handleJoinRoom = async (room: VibeRoom) => {
    if (!user) return

    try {
      await joinVibeRoom(room.id, user.id)
      setSelectedRoom(room)
      toast.success('Joined room!')
    } catch (error) {
      console.error('Error joining room:', error)
      toast.error('Failed to join room')
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom || !user) return

    setSending(true)
    try {
      await sendMessage({
        room_id: selectedRoom.id,
        user_id: user.id,
        message: newMessage.trim()
      })

      setNewMessage('')
      // Reload messages
      await loadMessages(selectedRoom.id)
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
      </div>
    )
  }

  if (selectedRoom) {
    return (
      <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
        {/* Room Header */}
        <div className="card p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedRoom(null)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 ${emotions.find(e => e.type === selectedRoom.emotion_tag)?.color} rounded-full`}></div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {emotions.find(e => e.type === selectedRoom.emotion_tag)?.label} Room
                </h2>
                {selectedRoom.is_private && <Lock className="w-4 h-4 text-gray-400" />}
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Users className="w-4 h-4" />
              <span>{selectedRoom.participants?.length || 0} participants</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 card p-4 mb-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.user_id === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                    message.user_id === user?.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium opacity-75">
                        {message.user?.name || 'Anonymous'}
                      </span>
                      <span className="text-xs opacity-75">
                        {format(new Date(message.created_at), 'HH:mm')}
                      </span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No messages yet. Start the conversation!</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Input */}
        <div className="card p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 input-field"
              disabled={sending}
            />
            <button
              onClick={handleSendMessage}
              disabled={sending || !newMessage.trim()}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              {sending ? (
                <div className="spinner"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Vibe Rooms
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with others who share similar emotions. Find support and understanding.
        </p>
      </motion.div>

      {/* Create Room Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center"
      >
        <button
          onClick={() => setShowCreateRoom(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Room</span>
        </button>
      </motion.div>

      {/* Create Room Modal */}
      <AnimatePresence>
        {showCreateRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowCreateRoom(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Create a Vibe Room
              </h3>

              <div className="space-y-4">
                {/* Emotion Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    What emotion will this room focus on?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
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
                        <div className={`w-6 h-6 ${emotion.color} rounded-full mx-auto mb-2`}></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {emotion.label}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {emotion.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Privacy Setting */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsPrivate(!isPrivate)}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      isPrivate
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        : 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                    }`}
                  >
                    {isPrivate ? <Lock className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                  </button>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {isPrivate ? 'Private Room' : 'Public Room'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {isPrivate ? 'Only invited users can join' : 'Anyone can join'}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowCreateRoom(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateRoom}
                    disabled={!selectedEmotion}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    Create Room
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rooms Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => handleJoinRoom(room)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 ${emotions.find(e => e.type === room.emotion_tag)?.color} rounded-full`}></div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {emotions.find(e => e.type === room.emotion_tag)?.label} Room
                  </h3>
                </div>
                {room.is_private && <Lock className="w-4 h-4 text-gray-400" />}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {emotions.find(e => e.type === room.emotion_tag)?.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{room.participants?.length || 0} participants</span>
                </div>
                <span>{format(new Date(room.created_at), 'MMM d')}</span>
              </div>

              <button className="w-full mt-4 btn-primary text-sm">
                Join Room
              </button>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No rooms available
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Be the first to create a vibe room and start connecting!
            </p>
          </div>
        )}
      </motion.div>

      {/* Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
      >
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          🤝 Community Guidelines
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Be kind, supportive, and respectful to others</li>
          <li>• Share your experiences, but avoid giving medical advice</li>
          <li>• Respect privacy and don't share personal information</li>
          <li>• Report any inappropriate behavior</li>
          <li>• Remember that everyone's journey is unique</li>
        </ul>
      </motion.div>
    </div>
  )
} 