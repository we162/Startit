/*
  # Insert sample job data

  1. Sample Data
    - Insert initial job postings for demonstration
    - Cover all degree levels
    - Include various companies and locations
*/

INSERT INTO jobs (title, company, location, degree_level, requirements, description, salary_range, application_url) VALUES
(
  'Software Engineer',
  'TechCorp Solutions',
  'Bangalore, India',
  'Bachelor',
  ARRAY['React', 'Node.js', 'JavaScript', 'MongoDB'],
  'Join our dynamic team to build cutting-edge web applications using modern technologies.',
  '₹6-12 LPA',
  '#apply'
),
(
  'Data Analyst',
  'DataViz Inc',
  'Mumbai, India',
  'Bachelor',
  ARRAY['Python', 'SQL', 'Tableau', 'Excel'],
  'Analyze complex datasets to drive business decisions and create insightful visualizations.',
  '₹5-9 LPA',
  '#apply'
),
(
  'Junior Developer',
  'StartupHub',
  'Pune, India',
  'Diploma',
  ARRAY['HTML', 'CSS', 'JavaScript', 'Git'],
  'Perfect opportunity for fresh graduates to kickstart their career in web development.',
  '₹3-6 LPA',
  '#apply'
),
(
  'Machine Learning Engineer',
  'AI Innovations',
  'Hyderabad, India',
  'Master',
  ARRAY['Python', 'TensorFlow', 'PyTorch', 'AWS'],
  'Work on advanced ML models and AI solutions for cutting-edge applications.',
  '₹15-25 LPA',
  '#apply'
),
(
  'UI/UX Designer',
  'DesignStudio',
  'Chennai, India',
  'Bachelor',
  ARRAY['Figma', 'Sketch', 'Adobe XD', 'Prototyping'],
  'Create beautiful and intuitive user experiences for web and mobile applications.',
  '₹4-8 LPA',
  '#apply'
),
(
  'DevOps Engineer',
  'CloudTech',
  'Delhi, India',
  'Master',
  ARRAY['Docker', 'Kubernetes', 'AWS', 'Jenkins'],
  'Manage and optimize cloud infrastructure for scalable applications.',
  '₹12-20 LPA',
  '#apply'
),
(
  'Frontend Developer',
  'WebCraft Solutions',
  'Bangalore, India',
  'Bachelor',
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
  'Build responsive and interactive user interfaces for modern web applications.',
  '₹7-13 LPA',
  '#apply'
),
(
  'Quality Assurance Tester',
  'TestPro Services',
  'Noida, India',
  'Diploma',
  ARRAY['Manual Testing', 'Selenium', 'JIRA', 'API Testing'],
  'Ensure software quality through comprehensive testing and bug identification.',
  '₹4-7 LPA',
  '#apply'
);