/*
  # Create jobs table for Start IT Training website

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text, job title)
      - `company` (text, company name)
      - `location` (text, job location)
      - `degree_level` (text, required degree level)
      - `requirements` (text[], array of requirements)
      - `description` (text, job description)
      - `salary_range` (text, salary information)
      - `application_url` (text, application link)
      - `posted_date` (date, when job was posted)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `jobs` table
    - Add policy for public read access
    - Add policy for authenticated admin write access
*/

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  degree_level text NOT NULL CHECK (degree_level IN ('Diploma', 'Bachelor', 'Master')),
  requirements text[] NOT NULL DEFAULT '{}',
  description text NOT NULL,
  salary_range text NOT NULL,
  application_url text DEFAULT '#apply',
  posted_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policy for public read access (anyone can view jobs)
CREATE POLICY "Anyone can view jobs"
  ON jobs
  FOR SELECT
  TO public
  USING (true);

-- Policy for authenticated admin users to insert jobs
CREATE POLICY "Authenticated users can insert jobs"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for authenticated admin users to update jobs
CREATE POLICY "Authenticated users can update jobs"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy for authenticated admin users to delete jobs
CREATE POLICY "Authenticated users can delete jobs"
  ON jobs
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();