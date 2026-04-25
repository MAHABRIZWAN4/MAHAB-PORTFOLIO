-- Contact Messages Table
-- Run this SQL in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
ON contact_messages(created_at DESC);

-- Create index on is_read for filtering
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read
ON contact_messages(is_read);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow insert from anyone (for contact form)
CREATE POLICY "Allow public insert"
ON contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy: Allow select/update only for authenticated users (admin dashboard)
CREATE POLICY "Allow authenticated read"
ON contact_messages
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated update"
ON contact_messages
FOR UPDATE
TO authenticated
USING (true);
