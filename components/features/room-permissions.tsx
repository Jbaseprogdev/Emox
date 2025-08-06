'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Users, Lock, Unlock, Settings, X, CheckCircle, XCircle,
  UserPlus, UserMinus, Crown, AlertTriangle, Eye, EyeOff, Filter,
  Search, MoreHorizontal, Ban, Volume2, VolumeX, Star, Clock
} from 'lucide-react'
import toast from 'react-hot-toast'

interface RoomPermissionsProps {
  onClose: () => void
  currentUser?: any
}

interface RoomMember {
  id: string
  name: string
  avatar: string
  role: 'owner' | 'moderator' | 'member' | 'guest'
  joinDate: string
  lastActive: string
  permissions: string[]
  status: 'active' | 'muted' | 'banned' | 'pending'
}

interface PermissionRequest {
  id: string
  userId: string
  userName: string
  userAvatar: string
  requestType: 'join' | 'moderator' | 'permission'
  requestedPermission?: string
  message: string
  timestamp: string
  status: 'pending' | 'approved' | 'denied'
}

interface RoomSettings {
  id: string
  name: string
  type: 'public' | 'private' | 'invite-only'
  joinRequirements: string[]
  moderationLevel: 'low' | 'medium' | 'high' | 'strict'
  autoModeration: boolean
  contentFiltering: boolean
  slowMode: boolean
  slowModeInterval: number
}

export function RoomPermissions({ onClose, currentUser }: RoomPermissionsProps) {
  const [activeTab, setActiveTab] = useState('members')
  const [selectedRoom, setSelectedRoom] = useState<RoomSettings | null>(null)
  const [members, setMembers] = useState<RoomMember[]>([])
  const [requests, setRequests] = useState<PermissionRequest[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [loading, setLoading] = useState(true)

  // Mock data
  const mockRooms: RoomSettings[] = [
    {
      id: 'anxiety-support',
      name: 'Anxiety Support Group',
      type: 'private',
      joinRequirements: ['Approval required', 'Age 18+', 'Respectful behavior'],
      moderationLevel: 'high',
      autoModeration: true,
      contentFiltering: true,
      slowMode: false,
      slowModeInterval: 0
    },
    {
      id: 'stress-relief',
      name: 'Stress Relief Community',
      type: 'public',
      joinRequirements: ['Age 16+', 'No spam'],
      moderationLevel: 'medium',
      autoModeration: true,
      contentFiltering: true,
      slowMode: true,
      slowModeInterval: 30
    },
    {
      id: 'mindfulness',
      name: 'Mindfulness & Meditation',
      type: 'invite-only',
      joinRequirements: ['Invitation only', 'Meditation experience'],
      moderationLevel: 'strict',
      autoModeration: true,
      contentFiltering: true,
      slowMode: false,
      slowModeInterval: 0
    }
  ]

  const mockMembers: RoomMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      role: 'owner',
      joinDate: '2024-01-01',
      lastActive: '2024-01-15T10:30:00Z',
      permissions: ['manage_members', 'moderate_content', 'edit_room', 'ban_users'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg',
      role: 'moderator',
      joinDate: '2024-01-05',
      lastActive: '2024-01-15T09:15:00Z',
      permissions: ['moderate_content', 'mute_users', 'delete_messages'],
      status: 'active'
    },
    {
      id: '3',
      name: 'Emma Davis',
      avatar: '/avatars/emma.jpg',
      role: 'member',
      joinDate: '2024-01-10',
      lastActive: '2024-01-15T08:45:00Z',
      permissions: ['send_messages', 'react_to_messages'],
      status: 'muted'
    },
    {
      id: '4',
      name: 'Alex Thompson',
      avatar: '/avatars/alex.jpg',
      role: 'guest',
      joinDate: '2024-01-12',
      lastActive: '2024-01-15T07:30:00Z',
      permissions: ['view_messages'],
      status: 'pending'
    }
  ]

  const mockRequests: PermissionRequest[] = [
    {
      id: '1',
      userId: '5',
      userName: 'David Wilson',
      userAvatar: '/avatars/david.jpg',
      requestType: 'join',
      message: 'I\'m looking for support with anxiety and would love to join this community.',
      timestamp: '2024-01-15T10:00:00Z',
      status: 'pending'
    },
    {
      id: '2',
      userId: '6',
      userName: 'Lisa Brown',
      userAvatar: '/avatars/lisa.jpg',
      requestType: 'moderator',
      message: 'I have experience moderating mental health communities and would like to help.',
      timestamp: '2024-01-15T09:30:00Z',
      status: 'pending'
    },
    {
      id: '3',
      userId: '7',
      userName: 'James Miller',
      userAvatar: '/avatars/james.jpg',
      requestType: 'permission',
      requestedPermission: 'pin_messages',
      message: 'I\'d like to be able to pin important resources for the community.',
      timestamp: '2024-01-15T08:15:00Z',
      status: 'pending'
    }
  ]

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setSelectedRoom(mockRooms[0])
      setMembers(mockMembers)
      setRequests(mockRequests)
      setLoading(false)
    }, 1000)
  }, [])

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-4 h-4 text-yellow-500" />
      case 'moderator':
        return <Shield className="w-4 h-4 text-blue-500" />
      case 'member':
        return <Users className="w-4 h-4 text-green-500" />
      case 'guest':
        return <Eye className="w-4 h-4 text-gray-500" />
      default:
        return <Users className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'muted':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'banned':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'pending':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case 'join':
        return <UserPlus className="w-4 h-4 text-green-500" />
      case 'moderator':
        return <Shield className="w-4 h-4 text-blue-500" />
      case 'permission':
        return <Settings className="w-4 h-4 text-purple-500" />
      default:
        return <MoreHorizontal className="w-4 h-4 text-gray-500" />
    }
  }

  const handleRequestAction = (requestId: string, action: 'approve' | 'deny') => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: action === 'approve' ? 'approved' : 'denied' } : req
      )
    )
    toast.success(`Request ${action}d successfully`)
  }

  const handleMemberAction = (memberId: string, action: string) => {
    setMembers(prev =>
      prev.map(member =>
        member.id === memberId
          ? {
              ...member,
              status: action === 'ban' ? 'banned' : action === 'mute' ? 'muted' : 'active',
              role: action === 'promote' ? 'moderator' : action === 'demote' ? 'member' : member.role
            }
          : member
      )
    )
    toast.success(`Member ${action} successful`)
  }

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === 'all' || member.role === filterRole
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const filteredRequests = requests.filter(request => {
    return request.status === 'pending' && 
           request.userName.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Room Permissions</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage access control and moderation for your rooms
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Loading room permissions...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Room Selection */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Room</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockRooms.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedRoom?.id === room.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        {room.type === 'private' ? (
                          <Lock className="w-4 h-4 text-red-500" />
                        ) : room.type === 'invite-only' ? (
                          <Shield className="w-4 h-4 text-purple-500" />
                        ) : (
                          <Unlock className="w-4 h-4 text-green-500" />
                        )}
                        <h4 className="font-medium text-gray-900 dark:text-white">{room.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {room.type.charAt(0).toUpperCase() + room.type.slice(1)} • {room.moderationLevel} moderation
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {selectedRoom && (
                <>
                  {/* Room Settings */}
                  <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {selectedRoom.name} Settings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Room Configuration</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Room Type</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                              {selectedRoom.type}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Moderation Level</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                              {selectedRoom.moderationLevel}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Auto Moderation</span>
                            <span className={`text-sm font-medium ${selectedRoom.autoModeration ? 'text-green-600' : 'text-red-600'}`}>
                              {selectedRoom.autoModeration ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Content Filtering</span>
                            <span className={`text-sm font-medium ${selectedRoom.contentFiltering ? 'text-green-600' : 'text-red-600'}`}>
                              {selectedRoom.contentFiltering ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Join Requirements</h4>
                        <div className="space-y-2">
                          {selectedRoom.joinRequirements.map((req, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    {['members', 'requests', 'settings'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeTab === tab
                            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <AnimatePresence mode="wait">
                    {activeTab === 'members' && (
                      <motion.div
                        key="members"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        {/* Search and Filters */}
                        <div className="flex items-center space-x-4">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search members..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="all">All Roles</option>
                            <option value="owner">Owner</option>
                            <option value="moderator">Moderator</option>
                            <option value="member">Member</option>
                            <option value="guest">Guest</option>
                          </select>
                          <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="muted">Muted</option>
                            <option value="banned">Banned</option>
                            <option value="pending">Pending</option>
                          </select>
                        </div>

                        {/* Members List */}
                        <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Member
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Role
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Joined
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                {filteredMembers.map((member) => (
                                  <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                          {member.name.charAt(0)}
                                        </div>
                                        <div>
                                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {member.name}
                                          </div>
                                          <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {member.permissions.length} permissions
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center space-x-2">
                                        {getRoleIcon(member.role)}
                                        <span className="text-sm text-gray-900 dark:text-white capitalize">
                                          {member.role}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                                        {member.status}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                      {formatTimestamp(member.joinDate)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center space-x-2">
                                        {member.role === 'member' && (
                                          <button
                                            onClick={() => handleMemberAction(member.id, 'promote')}
                                            className="p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                            title="Promote to Moderator"
                                          >
                                            <Shield className="w-4 h-4 text-blue-500" />
                                          </button>
                                        )}
                                        {member.status === 'active' && (
                                          <button
                                            onClick={() => handleMemberAction(member.id, 'mute')}
                                            className="p-1 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                                            title="Mute User"
                                          >
                                            <VolumeX className="w-4 h-4 text-yellow-500" />
                                          </button>
                                        )}
                                        {member.status === 'muted' && (
                                          <button
                                            onClick={() => handleMemberAction(member.id, 'unmute')}
                                            className="p-1 rounded hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                                            title="Unmute User"
                                          >
                                            <Volume2 className="w-4 h-4 text-green-500" />
                                          </button>
                                        )}
                                        <button
                                          onClick={() => handleMemberAction(member.id, 'ban')}
                                          className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                          title="Ban User"
                                        >
                                          <Ban className="w-4 h-4 text-red-500" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'requests' && (
                      <motion.div
                        key="requests"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        {/* Requests List */}
                        <div className="space-y-4">
                          {filteredRequests.length === 0 ? (
                            <div className="text-center py-12">
                              <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No pending requests</h3>
                              <p className="text-gray-600 dark:text-gray-400">
                                All permission requests have been processed.
                              </p>
                            </div>
                          ) : (
                            filteredRequests.map((request) => (
                              <div
                                key={request.id}
                                className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                                      {request.userName.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 mb-2">
                                        {getRequestTypeIcon(request.requestType)}
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                          {request.userName}
                                        </h4>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                          • {request.requestType.replace('-', ' ')}
                                        </span>
                                      </div>
                                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                                        {request.message}
                                      </p>
                                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                        <span>{formatTimestamp(request.timestamp)}</span>
                                        {request.requestedPermission && (
                                          <span>Requesting: {request.requestedPermission}</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => handleRequestAction(request.id, 'approve')}
                                      className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                      <span>Approve</span>
                                    </button>
                                    <button
                                      onClick={() => handleRequestAction(request.id, 'deny')}
                                      className="flex items-center space-x-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                      <XCircle className="w-4 h-4" />
                                      <span>Deny</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'settings' && (
                      <motion.div
                        key="settings"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        {/* Security Settings */}
                        <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Settings</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Require 2FA for room access</p>
                              </div>
                              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                Enable
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-white">Session Management</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Manage active sessions</p>
                              </div>
                              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                View Sessions
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Advanced Permissions */}
                        <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Advanced Permissions</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <h5 className="font-medium text-gray-900 dark:text-white">Content Moderation</h5>
                              <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded" defaultChecked />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Auto-delete spam</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded" defaultChecked />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Filter inappropriate content</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Require approval for links</span>
                                </label>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <h5 className="font-medium text-gray-900 dark:text-white">Member Management</h5>
                              <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded" defaultChecked />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Allow member invites</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Require profile completion</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded" defaultChecked />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Auto-archive inactive members</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
} 