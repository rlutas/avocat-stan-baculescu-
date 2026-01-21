/**
 * Supabase Module Exports
 *
 * Central export file for Supabase-related functionality.
 */

export { supabase, getSupabaseClient, isSupabaseConfigured } from './client'
export type {
  Database,
  Json,
  ContactSubmission,
  ContactSubmissionInsert,
  ContactSubmissionUpdate,
} from './types'
