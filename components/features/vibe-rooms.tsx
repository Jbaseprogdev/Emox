'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Users, Heart, Plus, X, Send, User, Shield, Clock, Hash } from 'lucide-react'
import toast from 'react-hot-toast'

interface VibeRoom {
  id: string
  name: string
  emotion: string
  creator: string
  participants: string[]
  isPrivate: boolean
  maxParticipants: number
  created_at: string
  description: string
}

interface ChatMessage {
  id: string
  roomId: string
  userId: string
  userName: string
  message: string
  timestamp: string
  isSystem?: boolean
}

interface VibeRoomsProps {
  onClose: () => void
  currentUser: string
}

const emotionThemes = [
  { name: 'Joy', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300', icon: '😊' },
  { name: 'Sadness', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300', icon: '😢' },
  { name: 'Anger', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300', icon: '😠' },
  { name: 'Excitement', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300', icon: '🤩' },
  { name: 'Anxiety', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300', icon: '😰' },
  { name: 'Calm', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300', icon: '😌' }
]

export function VibeRooms({ onClose, currentUser }: VibeRoomsProps) {
  const [rooms, setRooms] = useState<VibeRoom[]>([])
  const [selectedRoom, setSelectedRoom] = useState<VibeRoom | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [newRoomData, setNewRoomData] = useState({
    name: '',
    emotion: '',
    description: '',
    isPrivate: false,
    maxParticipants: 5
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Generate demo rooms
  useEffect(() => {
    const demoRooms: VibeRoom[] = [
      {
        id: '1',
        name: 'Joyful Vibes Only',
        emotion: 'Joy',
        creator: 'Sarah',
        participants: ['Sarah', 'Mike', 'Emma'],
        isPrivate: false,
        maxParticipants: 8,
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        description: 'Share your happy moments and spread positivity!'
      },
      {
        id: '2',
        name: 'Calm & Collected',
        emotion: 'Calm',
        creator: 'Alex',
        participants: ['Alex', 'Mike'],
        isPrivate: false,
        maxParticipants: 5,
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        description: 'A peaceful space for mindful conversations'
      },
      {
        id: '3',
        name: 'Anxiety Support',
        emotion: 'Anxiety',
        creator: 'Emma',
        participants: ['Emma', 'Sarah'],
        isPrivate: true,
        maxParticipants: 4,
        created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        description: 'Supportive space for those feeling anxious'
      }
    ]
    setRooms(demoRooms)
  }, [])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleCreateRoom = () => {
    if (!newRoomData.name || !newRoomData.emotion) {
      toast.error('Please fill in all required fields')
      return
    }

    const newRoom: VibeRoom = {
      id: Date.now().toString(),
      name: newRoomData.name,
      emotion: newRoomData.emotion,
      creator: currentUser,
      participants: [currentUser],
      isPrivate: newRoomData.isPrivate,
      maxParticipants: newRoomData.maxParticipants,
      created_at: new Date().toISOString(),
      description: newRoomData.description
    }

    setRooms(prev => [newRoom, ...prev])
    setShowCreateRoom(false)
    setNewRoomData({
      name: '',
      emotion: '',
      description: '',
      isPrivate: false,
      maxParticipants: 5
    })
    toast.success('Room created successfully!')
  }

  const handleJoinRoom = (room: VibeRoom) => {
    if (room.participants.includes(currentUser)) {
      toast.error('You are already in this room')
      return
    }

    if (room.participants.length >= room.maxParticipants) {
      toast.error('Room is full')
      return
    }

    const updatedRoom = {
      ...room,
      participants: [...room.participants, currentUser]
    }

    setRooms(prev => prev.map(r => r.id === room.id ? updatedRoom : r))
    
    // Add system message
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      roomId: room.id,
      userId: 'system',
      userName: 'System',
      message: `${currentUser} joined the room`,
      timestamp: new Date().toISOString(),
      isSystem: true
    }

    setMessages(prev => [...prev, systemMessage])
    toast.success(`Joined ${room.name}!`)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedRoom) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      roomId: selectedRoom.id,
      userId: currentUser,
      userName: currentUser,
      message: newMessage.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Simulate other users responding
    setTimeout(() => {
      const otherParticipants = selectedRoom.participants.filter(p => p !== currentUser)
      if (otherParticipants.length > 0 && Math.random() > 0.7) {
        const randomUser = otherParticipants[Math.floor(Math.random() * otherParticipants.length)]
        const responses = [
          'That\'s really interesting!',
          'I can relate to that.',
          'Thanks for sharing!',
          'How are you feeling about that?',
          'That sounds challenging.',
          'I\'m here to listen.'
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        
        const responseMessage: ChatMessage = {
          id: Date.now().toString(),
          roomId: selectedRoom.id,
          userId: randomUser,
          userName: randomUser,
          message: randomResponse,
          timestamp: new Date().toISOString()
        }
        setMessages(prev => [...prev, responseMessage])
      }
    }, 1000 + Math.random() * 3000)
  }

  const handleLeaveRoom = () => {
    if (!selectedRoom) return

    const updatedRoom = {
      ...selectedRoom,
      participants: selectedRoom.participants.filter(p => p !== currentUser)
    }

    setRooms(prev => prev.map(r => r.id === selectedRoom.id ? updatedRoom : r))
    
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      roomId: selectedRoom.id,
      userId: 'system',
      userName: 'System',
      message: `${currentUser} left the room`,
      timestamp: new Date().toISOString(),
      isSystem: true
    }

    setMessages(prev => [...prev, systemMessage])
    setSelectedRoom(null)
    toast.success('Left the room')
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Vibe Rooms</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Connect with others who share your emotions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Room List */}
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowCreateRoom(true)}
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Create Room</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {rooms.map((room) => {
                const emotionTheme = emotionThemes.find(e => e.name === room.emotion)
                const isInRoom = room.participants.includes(currentUser)
                const isCreator = room.creator === currentUser

                return (
                  <motion.div
                    key={room.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRoom(room)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedRoom?.id === room.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{emotionTheme?.icon}</span>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{room.name}</h3>
                        {room.isPrivate && <Shield className="w-4 h-4 text-gray-500" />}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${emotionTheme?.color}`}>
                        {room.emotion}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{room.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{room.participants.length}/{room.maxParticipants}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(room.created_at).toLocaleTimeString()}</span>
                      </div>
                    </div>

                    {!isInRoom && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleJoinRoom(room)
                        }}
                        className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-1 px-3 rounded transition-colors duration-200"
                      >
                        Join Room
                      </button>
                    )}

                    {isInRoom && (
                      <div className="flex items-center space-x-2 mt-3">
                        <span className="text-xs text-green-600 dark:text-green-400">✓ Joined</span>
                        {isCreator && <span className="text-xs text-purple-600 dark:text-purple-400">Creator</span>}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedRoom ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Hash className="w-4 h-4 text-gray-500" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">{selectedRoom.name}</h3>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        emotionThemes.find(e => e.name === selectedRoom.emotion)?.color
                      }`}>
                        {selectedRoom.emotion}
                      </span>
                    </div>
                    <button
                      onClick={handleLeaveRoom}
                      className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                    >
                      Leave Room
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedRoom.description}</p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.filter(m => m.roomId === selectedRoom.id).map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.userId === currentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md ${
                        message.isSystem 
                          ? 'w-full text-center'
                          : message.userId === currentUser 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      } rounded-lg px-3 py-2`}>
                        {!message.isSystem && (
                          <div className="flex items-center space-x-2 mb-1">
                            <User className="w-3 h-3" />
                            <span className="text-xs font-medium opacity-80">{message.userName}</span>
                          </div>
                        )}
                        <p className={`text-sm ${message.isSystem ? 'text-gray-500 dark:text-gray-400 italic' : ''}`}>
                          {message.message}
                        </p>
                        <p className="text-xs opacity-60 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg transition-colors duration-200"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Select a Room</h3>
                  <p className="text-gray-600 dark:text-gray-400">Choose a vibe room to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create Room Modal */}
        <AnimatePresence>
          {showCreateRoom && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-60">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Room</h3>
                  <button
                    onClick={() => setShowCreateRoom(false)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Room Name
                    </label>
                    <input
                      type="text"
                      value={newRoomData.name}
                      onChange={(e) => setNewRoomData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter room name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Emotion Theme
                    </label>
                    <select
                      value={newRoomData.emotion}
                      onChange={(e) => setNewRoomData(prev => ({ ...prev, emotion: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select emotion</option>
                      {emotionThemes.map((emotion) => (
                        <option key={emotion.name} value={emotion.name}>
                          {emotion.icon} {emotion.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newRoomData.description}
                      onChange={(e) => setNewRoomData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Describe your room"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newRoomData.isPrivate}
                        onChange={(e) => setNewRoomData(prev => ({ ...prev, isPrivate: e.target.checked }))}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Private Room</span>
                    </label>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Max Participants
                      </label>
                      <select
                        value={newRoomData.maxParticipants}
                        onChange={(e) => setNewRoomData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={8}>8</option>
                        <option value={10}>10</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setShowCreateRoom(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateRoom}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Create Room
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
} 