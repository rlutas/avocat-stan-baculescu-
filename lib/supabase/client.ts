import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

/**
 * Supabase Client Configuration
 *
 * This file initializes the Supabase client for use in the application.
 * Currently used for: Contact form submissions storage (optional)
 * Future use: Authentication, file storage, real-time features
 *
 * Environment Variables Required:
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anonymous key
 *
 * Note: Auth is not active by default. See docs/supabase-setup.md for activation.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * Check if Supabase is properly configured
 * Returns true if both environment variables are set and not placeholder values
 */
export function isSupabaseConfigured(): boolean {
  return !!(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-project.supabase.co' &&
    supabaseAnonKey !== 'your-anon-key'
  )
}

/**
 * Create Supabase client instance
 * Returns null if Supabase is not configured (allows graceful degradation)
 */
export function getSupabaseClient() {
  if (!isSupabaseConfigured()) {
    return null
  }

  return createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      // Auth is disabled by default - see docs/supabase-setup.md for activation
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

/**
 * Singleton instance for convenience
 * Use getSupabaseClient() for null-safety checks
 */
export const supabase = isSupabaseConfigured()
  ? createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null
