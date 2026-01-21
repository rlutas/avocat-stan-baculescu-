/**
 * Supabase Database Types
 *
 * This file defines TypeScript types for your Supabase database schema.
 * Update these types when you modify your database schema.
 *
 * For automatic type generation, run:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
 */

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
      /**
       * Contact form submissions table
       * Stores all contact form submissions for record-keeping
       */
      contact_submissions: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string | null
          subject: string
          message: string
          locale: string
          status: 'pending' | 'read' | 'responded' | 'archived'
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone?: string | null
          subject: string
          message: string
          locale: string
          status?: 'pending' | 'read' | 'responded' | 'archived'
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string
          message?: string
          locale?: string
          status?: 'pending' | 'read' | 'responded' | 'archived'
          ip_address?: string | null
          user_agent?: string | null
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
      contact_status: 'pending' | 'read' | 'responded' | 'archived'
    }
  }
}

/**
 * Helper types for common operations
 */
export type ContactSubmission =
  Database['public']['Tables']['contact_submissions']['Row']
export type ContactSubmissionInsert =
  Database['public']['Tables']['contact_submissions']['Insert']
export type ContactSubmissionUpdate =
  Database['public']['Tables']['contact_submissions']['Update']
