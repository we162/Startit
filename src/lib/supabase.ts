import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: string;
          title: string;
          company: string;
          location: string;
          degree_level: 'Diploma' | 'Bachelor' | 'Master';
          requirements: string[];
          description: string;
          salary_range: string;
          application_url: string;
          posted_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          company: string;
          location: string;
          degree_level: 'Diploma' | 'Bachelor' | 'Master';
          requirements: string[];
          description: string;
          salary_range: string;
          application_url?: string;
          posted_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          company?: string;
          location?: string;
          degree_level?: 'Diploma' | 'Bachelor' | 'Master';
          requirements?: string[];
          description?: string;
          salary_range?: string;
          application_url?: string;
          posted_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          username: string;
          email: string;
          password_hash: string;
          role: 'admin' | 'moderator';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          email: string;
          password_hash: string;
          role?: 'admin' | 'moderator';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          password_hash?: string;
          role?: 'admin' | 'moderator';
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          role: string;
          company: string;
          message: string;
          image: string;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          company: string;
          message: string;
          image: string;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          company?: string;
          message?: string;
          image?: string;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      companies: {
        Row: {
          id: string;
          name: string;
          logo: string;
          description: string;
          industry: string;
          employees: string;
          placement_count: number;
          website_url: string | null;
          is_partner: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo: string;
          description: string;
          industry: string;
          employees: string;
          placement_count?: number;
          website_url?: string;
          is_partner?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo?: string;
          description?: string;
          industry?: string;
          employees?: string;
          placement_count?: number;
          website_url?: string;
          is_partner?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}