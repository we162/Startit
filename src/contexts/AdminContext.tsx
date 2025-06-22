import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job } from '../types';
import { jobService } from '../services/jobService';
import { authService, AuthUser } from '../services/authService';

interface AdminContextType {
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  jobs: Job[];
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  addJob: (jobData: Omit<Job, 'id' | 'postedDate'>) => Promise<void>;
  updateJob: (id: string, jobData: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  getJob: (id: string) => Job | undefined;
  refreshJobs: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize authentication and load jobs
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setIsAuthenticated(true);
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      }
    };

    initializeAuth();
  }, []);

  // Load jobs on component mount
  useEffect(() => {
    refreshJobs();
  }, []);

  const refreshJobs = async () => {
    try {
      setIsLoading(true);
      const jobsData = await jobService.getAllJobs();
      setJobs(jobsData);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const user = await authService.login(username, password);
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const addJob = async (jobData: Omit<Job, 'id' | 'postedDate'>) => {
    try {
      const newJob = await jobService.addJob(jobData);
      if (newJob) {
        setJobs(prev => [newJob, ...prev]);
      }
    } catch (error) {
      console.error('Error adding job:', error);
      throw error;
    }
  };

  const updateJob = async (id: string, jobData: Partial<Job>) => {
    try {
      const updatedJob = await jobService.updateJob(id, jobData);
      if (updatedJob) {
        setJobs(prev => prev.map(job => 
          job.id === id ? updatedJob : job
        ));
      }
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  };

  const deleteJob = async (id: string) => {
    try {
      const success = await jobService.deleteJob(id);
      if (success) {
        setJobs(prev => prev.filter(job => job.id !== id));
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  };

  const getJob = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      currentUser,
      jobs,
      isLoading,
      login,
      logout,
      addJob,
      updateJob,
      deleteJob,
      getJob,
      refreshJobs
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};