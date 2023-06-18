export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Chat: {
        Row: {
          createdAt: string
          id: number
        }
        Insert: {
          createdAt?: string
          id?: number
        }
        Update: {
          createdAt?: string
          id?: number
        }
        Relationships: []
      }
      ChatsUsers: {
        Row: {
          chatId: number
          id: number
          userId: string
        }
        Insert: {
          chatId: number
          id?: number
          userId: string
        }
        Update: {
          chatId?: number
          id?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ChatsUsers_chatId_fkey"
            columns: ["chatId"]
            referencedRelation: "Chat"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ChatsUsers_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Message: {
        Row: {
          chatId: number
          createdAt: string
          id: number
          text: string
          userId: string
        }
        Insert: {
          chatId: number
          createdAt?: string
          id?: number
          text: string
          userId: string
        }
        Update: {
          chatId?: number
          createdAt?: string
          id?: number
          text?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Message_chatId_fkey"
            columns: ["chatId"]
            referencedRelation: "Chat"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Message_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      post: {
        Row: {
          created_at: string
          id: number
          testField: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          testField: string
          title: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          testField?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      User: {
        Row: {
          createdAt: string
          email: string
          id: string
          name: string
        }
        Insert: {
          createdAt?: string
          email: string
          id?: string
          name: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
