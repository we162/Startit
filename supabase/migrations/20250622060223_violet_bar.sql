/*
  # Add testimonials and companies tables

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text, person's name)
      - `role` (text, job role)
      - `company` (text, company name)
      - `message` (text, testimonial message)
      - `image` (text, profile image URL)
      - `is_featured` (boolean, whether to show on homepage)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `companies`
      - `id` (uuid, primary key)
      - `name` (text, company name)
      - `logo` (text, logo image URL)
      - `description` (text, company description)
      - `industry` (text, industry type)
      - `employees` (text, employee count range)
      - `placement_count` (integer, number of placements)
      - `website_url` (text, company website)
      - `is_partner` (boolean, active partnership status)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Public read access for both tables
    - Authenticated admin access for management

  3. Sample Data
    - Insert realistic testimonials and company data
*/

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  message text NOT NULL,
  image text NOT NULL,
  is_featured boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo text NOT NULL,
  description text NOT NULL,
  industry text NOT NULL,
  employees text NOT NULL,
  placement_count integer DEFAULT 0,
  website_url text,
  is_partner boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Create policies for testimonials
CREATE POLICY "Anyone can view testimonials"
  ON testimonials
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for companies
CREATE POLICY "Anyone can view companies"
  ON companies
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage companies"
  ON companies
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create triggers for updated_at columns
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample testimonials data
INSERT INTO testimonials (name, role, company, message, image, is_featured) VALUES
('Priya Sharma', 'Software Engineer', 'TechCorp Solutions', 'The training program at Start IT was exceptional. The hands-on approach and industry-relevant curriculum helped me land my dream job. The placement team was incredibly supportive throughout the process.', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', true),
('Rahul Kumar', 'Full Stack Developer', 'WebSolutions', 'From zero coding knowledge to becoming a full-stack developer in 6 months! The mentors were amazing and the project-based learning approach made all the difference in my career transformation.', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', true),
('Anjali Patel', 'Data Analyst', 'DataViz Inc', 'The data analytics program exceeded my expectations. Real-world projects and industry connections helped me secure a position at a leading analytics firm. Highly recommend Start IT Training!', 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', true),
('Vikram Singh', 'DevOps Engineer', 'CloudTech', 'The comprehensive DevOps training program prepared me for real-world challenges. The instructors are industry experts who provided valuable insights and practical knowledge.', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', true),
('Sneha Reddy', 'UI/UX Designer', 'DesignStudio', 'The design program at Start IT helped me transition from a non-technical background to becoming a professional UI/UX designer. The portfolio projects were instrumental in landing my job.', 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', true),
('Arjun Mehta', 'Machine Learning Engineer', 'AI Innovations', 'The ML program provided deep insights into cutting-edge technologies. The hands-on projects and research opportunities prepared me for a challenging role in AI development.', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', true);

-- Insert sample companies data
INSERT INTO companies (name, logo, description, industry, employees, placement_count, website_url, is_partner) VALUES
('TechCorp Solutions', 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', 'Leading software development company specializing in enterprise solutions and digital transformation.', 'Software Development', '500-1000', 25, 'https://techcorp.com', true),
('DataViz Inc', 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', 'Data analytics and visualization company helping businesses make data-driven decisions.', 'Data Analytics', '200-500', 18, 'https://dataviz.com', true),
('CloudTech', 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', 'Cloud infrastructure and DevOps solutions provider for modern businesses.', 'Cloud Computing', '100-200', 15, 'https://cloudtech.com', true),
('AI Innovations', 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', 'Cutting-edge artificial intelligence and machine learning research and development company.', 'Artificial Intelligence', '50-100', 12, 'https://aiinnovations.com', true),
('WebSolutions', 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', 'Full-service web development agency creating innovative digital experiences.', 'Web Development', '50-100', 20, 'https://websolutions.com', true),
('DesignStudio', 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', 'Creative design agency specializing in user experience and interface design.', 'Design & UX', '20-50', 14, 'https://designstudio.com', true),
('StartupHub', 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', 'Innovation hub supporting early-stage startups with technology and talent solutions.', 'Technology Consulting', '20-50', 22, 'https://startuphub.com', true),
('TestPro Services', 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', 'Quality assurance and software testing services for enterprise applications.', 'Software Testing', '100-200', 16, 'https://testpro.com', true),
('AppCraft', 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop', 'Mobile application development company creating innovative iOS and Android apps.', 'Mobile Development', '50-100', 19, 'https://appcraft.com', true);