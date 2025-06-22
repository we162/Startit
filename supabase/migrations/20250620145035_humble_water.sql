/*
  # Complete Database Setup for Start IT Training

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `company` (text, required)
      - `location` (text, required)
      - `degree_level` (text, constrained to Diploma/Bachelor/Master)
      - `requirements` (text array)
      - `description` (text, required)
      - `salary_range` (text, required)
      - `application_url` (text, optional)
      - `posted_date` (date, defaults to current date)
      - `created_at` (timestamptz, auto-generated)
      - `updated_at` (timestamptz, auto-updated)

    - `admin_users`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `email` (text, unique)
      - `password_hash` (text, required)
      - `role` (text, constrained to admin/moderator)
      - `created_at` (timestamptz, auto-generated)
      - `updated_at` (timestamptz, auto-updated)

  2. Security
    - Enable RLS on both tables
    - Public read access for jobs
    - Authenticated user access for job management
    - Restricted admin user access

  3. Sample Data
    - 10 realistic job postings across different roles and companies
*/

-- Create jobs table if it doesn't exist
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

-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'moderator')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (safe to run multiple times)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create or replace function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing policies if they exist and recreate them
DO $$
BEGIN
  -- Drop existing policies for jobs table
  DROP POLICY IF EXISTS "Jobs are viewable by everyone" ON jobs;
  DROP POLICY IF EXISTS "Anyone can view jobs" ON jobs;
  DROP POLICY IF EXISTS "Authenticated users can insert jobs" ON jobs;
  DROP POLICY IF EXISTS "Authenticated users can update jobs" ON jobs;
  DROP POLICY IF EXISTS "Authenticated users can delete jobs" ON jobs;
  
  -- Drop existing policies for admin_users table
  DROP POLICY IF EXISTS "Admin users can read their own data" ON admin_users;
  DROP POLICY IF EXISTS "Users can read own data" ON admin_users;
END $$;

-- Create policies for jobs table
CREATE POLICY "Anyone can view jobs"
  ON jobs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert jobs"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update jobs"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete jobs"
  ON jobs
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for admin_users table
CREATE POLICY "Users can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_jobs_updated_at ON jobs;
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;

-- Create triggers for updated_at columns
CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample jobs data (only if table is empty)
INSERT INTO jobs (title, company, location, degree_level, requirements, description, salary_range, application_url)
SELECT * FROM (VALUES
  ('Software Engineer', 'TechCorp Solutions', 'Bangalore, India', 'Bachelor', ARRAY['React', 'Node.js', 'JavaScript', 'MongoDB'], 'Join our dynamic team to build cutting-edge web applications using modern technologies. You will work on scalable solutions and collaborate with cross-functional teams to deliver exceptional user experiences.', '₹6-12 LPA', 'https://techcorp.com/apply'),
  ('Data Analyst', 'DataViz Inc', 'Mumbai, India', 'Bachelor', ARRAY['Python', 'SQL', 'Tableau', 'Excel'], 'Analyze complex datasets to drive business decisions and create insightful visualizations. Perfect opportunity for data enthusiasts to work with big data and machine learning algorithms.', '₹5-9 LPA', 'https://dataviz.com/apply'),
  ('Junior Developer', 'StartupHub', 'Pune, India', 'Diploma', ARRAY['HTML', 'CSS', 'JavaScript', 'Git'], 'Perfect opportunity for fresh graduates to kickstart their career in web development. Learn from experienced mentors and work on exciting projects in a fast-paced startup environment.', '₹3-6 LPA', 'https://startuphub.com/apply'),
  ('Machine Learning Engineer', 'AI Innovations', 'Hyderabad, India', 'Master', ARRAY['Python', 'TensorFlow', 'PyTorch', 'AWS'], 'Work on advanced ML models and AI solutions that impact millions of users. Join our research and development team to build next-generation artificial intelligence systems.', '₹15-25 LPA', 'https://aiinnovations.com/apply'),
  ('UI/UX Designer', 'DesignStudio', 'Chennai, India', 'Bachelor', ARRAY['Figma', 'Sketch', 'Adobe XD', 'Prototyping'], 'Create beautiful and intuitive user experiences for web and mobile applications. Work with product teams to design user-centered solutions that delight customers.', '₹4-8 LPA', 'https://designstudio.com/apply'),
  ('DevOps Engineer', 'CloudTech', 'Delhi, India', 'Master', ARRAY['Docker', 'Kubernetes', 'AWS', 'Jenkins'], 'Manage and optimize cloud infrastructure for high-scale applications. Implement CI/CD pipelines and ensure system reliability for mission-critical services.', '₹12-20 LPA', 'https://cloudtech.com/apply'),
  ('Full Stack Developer', 'WebSolutions', 'Bangalore, India', 'Bachelor', ARRAY['React', 'Node.js', 'PostgreSQL', 'Docker'], 'Build end-to-end web applications using modern full-stack technologies. Work on both frontend and backend development in an agile environment.', '₹8-15 LPA', 'https://websolutions.com/apply'),
  ('Quality Assurance Engineer', 'TestPro', 'Mumbai, India', 'Bachelor', ARRAY['Selenium', 'Java', 'TestNG', 'API Testing'], 'Ensure software quality through comprehensive testing strategies. Develop automated test suites and maintain testing frameworks for continuous integration.', '₹5-10 LPA', 'https://testpro.com/apply'),
  ('Mobile App Developer', 'AppCraft', 'Pune, India', 'Bachelor', ARRAY['React Native', 'Flutter', 'iOS', 'Android'], 'Develop cross-platform mobile applications for iOS and Android. Work on consumer-facing apps with millions of downloads and cutting-edge mobile technologies.', '₹7-14 LPA', 'https://appcraft.com/apply'),
  ('Database Administrator', 'DataSafe', 'Hyderabad, India', 'Master', ARRAY['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'], 'Manage and optimize database systems for high-performance applications. Ensure data security, implement backup strategies, and maintain database performance.', '₹10-18 LPA', 'https://datasafe.com/apply')
) AS sample_jobs(title, company, location, degree_level, requirements, description, salary_range, application_url)
WHERE NOT EXISTS (SELECT 1 FROM jobs LIMIT 1);