export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  degreeLevel: 'Diploma' | 'Bachelor' | 'Master';
  requirements: string[];
  description: string;
  salaryRange: string;
  postedDate: string;
  applicationUrl: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  employees: string;
  placementCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  image: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'moderator';
}

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  degreeLevel: 'Diploma' | 'Bachelor' | 'Master';
  requirements: string;
  description: string;
  salaryRange: string;
  applicationUrl: string;
}