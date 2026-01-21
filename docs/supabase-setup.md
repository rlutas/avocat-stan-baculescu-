# Supabase Setup Guide

This document explains how to set up and activate Supabase for the Stan-Baculescu law firm website.

## Current Status

Supabase is **pre-configured but not active**. The application runs without Supabase by gracefully degrading functionality:

- Contact form: Sends emails via Resend (no database storage)
- Authentication: Not implemented
- File storage: Not implemented

## Quick Start

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose organization, name, password, and region (EU West recommended for GDPR)
5. Wait for project to be provisioned

### 2. Get API Keys

1. Go to Project Settings > API
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Configure Environment

Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Database Migration

1. Go to SQL Editor in Supabase Dashboard
2. Copy contents of `supabase/migrations/001_contact_submissions.sql`
3. Run the SQL

## Architecture

### Files Structure

```
lib/supabase/
├── client.ts    # Supabase client with graceful degradation
├── types.ts     # TypeScript types for database schema
└── index.ts     # Module exports

supabase/migrations/
└── 001_contact_submissions.sql  # Database schema
```

### Usage

```typescript
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

// Check if Supabase is configured
if (isSupabaseConfigured() && supabase) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert({ name, email, subject, message, locale })
}
```

## Feature: Contact Form Database Storage

To enable storing contact submissions in the database:

### 1. Update Contact API Route

Edit `app/api/contact/route.ts`:

```typescript
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

// Inside POST handler, after sending email:
if (isSupabaseConfigured() && supabase) {
  await supabase.from('contact_submissions').insert({
    name,
    email,
    phone: phone || null,
    subject,
    message,
    locale: 'ro', // or detect from request
    ip_address: request.headers.get('x-forwarded-for'),
    user_agent: request.headers.get('user-agent'),
  })
}
```

### 2. Benefits

- Backup of all contact form submissions
- Admin dashboard for viewing submissions
- Analytics on contact sources
- Mark submissions as read/responded

## Future Features

### Authentication (Not Active)

To enable authentication:

1. Update `lib/supabase/client.ts`:

```typescript
export const supabase = createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    persistSession: true,  // Changed from false
    autoRefreshToken: true, // Changed from false
  },
})
```

2. Enable providers in Supabase Dashboard > Authentication > Providers

### File Storage

For document uploads:

1. Create bucket in Supabase Storage
2. Configure RLS policies
3. Use `supabase.storage.from('documents').upload()`

## Security Notes

- **Never expose service_role key** in client-side code
- Use **anon key** for client-side, **service_role** for server-side
- Enable **Row Level Security (RLS)** on all tables
- Contact submissions table has RLS enabled with insert-only policy

## Troubleshooting

### "Supabase not configured" warnings

Normal behavior when environment variables are not set. The application gracefully degrades.

### TypeScript errors with Supabase types

Regenerate types:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
```

### Connection errors

1. Check environment variables are set correctly
2. Verify project URL includes `https://`
3. Check Supabase project is active (not paused)

## Support

For issues with Supabase setup, contact:
- Email: [developer contact]
- Supabase Documentation: https://supabase.com/docs
