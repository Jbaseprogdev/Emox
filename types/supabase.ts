export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          avatar?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          content: string
          summary: string | null
          mood_tag: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          summary?: string | null
          mood_tag: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          summary?: string | null
          mood_tag?: string
          created_at?: string
          updated_at?: string
        }
      }
      emotions_log: {
        Row: {
          id: string
          user_id: string
          emotion_type: string
          score: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          emotion_type: string
          score: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          emotion_type?: string
          score?: number
          created_at?: string
        }
      }
      vibe_rooms: {
        Row: {
          id: string
          creator_id: string
          emotion_tag: string
          is_private: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          creator_id: string
          emotion_tag: string
          is_private: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          creator_id?: string
          emotion_tag?: string
          is_private?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      vibe_room_participants: {
        Row: {
          id: string
          room_id: string
          user_id: string
          joined_at: string
        }
        Insert: {
          id?: string
          room_id: string
          user_id: string
          joined_at?: string
        }
        Update: {
          id?: string
          room_id?: string
          user_id?: string
          joined_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          room_id: string
          user_id: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          room_id: string
          user_id: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          room_id?: string
          user_id?: string
          message?: string
          created_at?: string
        }
      }
      threshold_warnings: {
        Row: {
          id: string
          user_id: string
          emotion_type: string
          score: number
          triggered_at: string
          resolved_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          emotion_type: string
          score: number
          triggered_at?: string
          resolved_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          emotion_type?: string
          score?: number
          triggered_at?: string
          resolved_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 