import { supabase } from '../lib/supabase';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'moderator';
}

export const authService = {
  // Simple authentication using Supabase Auth
  async login(username: string, password: string): Promise<AuthUser | null> {
    try {
      // For demo purposes, we'll use a simple check
      // In production, you'd want proper authentication
      if (username === 'admin' && password === 'admin123') {
        // Sign in with Supabase Auth using email/password
        const { data, error } = await supabase.auth.signInWithPassword({
          email: 'admin@startittraining.com',
          password: 'admin123'
        });

        if (error) {
          // If user doesn't exist, create them
          if (error.message.includes('Invalid login credentials')) {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email: 'admin@startittraining.com',
              password: 'admin123'
            });

            if (signUpError) {
              console.error('Error creating admin user:', signUpError);
              return null;
            }

            // Return user data after signup
            if (signUpData.user) {
              return {
                id: signUpData.user.id,
                username: 'admin',
                email: 'admin@startittraining.com',
                role: 'admin'
              };
            }
          }
          console.error('Authentication error:', error);
          return null;
        }

        if (data.user) {
          return {
            id: data.user.id,
            username: 'admin',
            email: 'admin@startittraining.com',
            role: 'admin'
          };
        }
      }

      return null;
    } catch (error) {
      console.error('Error in login:', error);
      return null;
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error in logout:', error);
    }
  },

  // Get current session
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        return {
          id: session.user.id,
          username: 'admin',
          email: session.user.email || 'admin@startittraining.com',
          role: 'admin'
        };
      }

      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return !!session?.user;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }
};