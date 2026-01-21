-- Contact Submissions Table
-- Stores all contact form submissions for record-keeping
-- Run this migration in Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

-- Create enum for contact submission status
CREATE TYPE contact_status AS ENUM ('pending', 'read', 'responded', 'archived');

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'ro',
  status contact_status DEFAULT 'pending' NOT NULL,
  ip_address INET,
  user_agent TEXT
);

-- Create index for faster queries by status
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);

-- Create index for faster queries by date
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access (API routes)
-- Note: Public access is disabled by default for security
-- The service_role key (not anon key) should be used server-side to insert records
CREATE POLICY "Service role can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Create policy for reading submissions (admin only - future use)
-- This policy allows reading all submissions but requires authenticated user
-- Uncomment and modify when implementing admin dashboard
-- CREATE POLICY "Authenticated users can read contact submissions"
--   ON contact_submissions
--   FOR SELECT
--   USING (auth.role() = 'authenticated');

-- Add helpful comments
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the website';
COMMENT ON COLUMN contact_submissions.id IS 'Unique identifier for each submission';
COMMENT ON COLUMN contact_submissions.created_at IS 'Timestamp when the submission was created';
COMMENT ON COLUMN contact_submissions.name IS 'Name of the person submitting the form';
COMMENT ON COLUMN contact_submissions.email IS 'Email address of the submitter';
COMMENT ON COLUMN contact_submissions.phone IS 'Optional phone number';
COMMENT ON COLUMN contact_submissions.subject IS 'Subject/service area selected';
COMMENT ON COLUMN contact_submissions.message IS 'Message content';
COMMENT ON COLUMN contact_submissions.locale IS 'Language locale (ro/en) when form was submitted';
COMMENT ON COLUMN contact_submissions.status IS 'Current status of the submission';
COMMENT ON COLUMN contact_submissions.ip_address IS 'IP address of the submitter (for spam detection)';
COMMENT ON COLUMN contact_submissions.user_agent IS 'Browser user agent (for debugging)';
