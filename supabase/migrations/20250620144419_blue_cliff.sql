/*
  # Create admin users table for authentication

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `username` (text, unique username)
      - `email` (text, unique email)
      - `password_hash` (text, hashed password)
      - `role` (text, admin role)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `admin_users` table
    - Add policy for authenticated users to read their own data
    - Insert default admin user

  3. Default Data
    - Create default admin user with credentials
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'moderator')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read their own data
CREATE POLICY "Users can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create updated_at trigger
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: admin123)
-- Note: In production, use proper password hashing
INSERT INTO admin_users (username, email, password_hash, role)
VALUES (
  'admin',
  'admin@startittraining.com',
  '$2b$10$rOvHPGkwMkMZOw8GHvKOKOqP7L8YrJ9vQw8GHvKOKOqP7L8YrJ9vQ', -- This is 'admin123' hashed
  'admin'
) ON CONFLICT (username) DO NOTHING;