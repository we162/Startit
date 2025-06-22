import { supabase } from '../lib/supabase';
import { Job } from '../types';

// Transform database row to Job type
const transformDbJobToJob = (dbJob: any): Job => ({
  id: dbJob.id,
  title: dbJob.title,
  company: dbJob.company,
  location: dbJob.location,
  degreeLevel: dbJob.degree_level,
  requirements: dbJob.requirements || [],
  description: dbJob.description,
  salaryRange: dbJob.salary_range,
  applicationUrl: dbJob.application_url,
  postedDate: dbJob.posted_date
});

// Transform Job type to database insert format
const transformJobToDbInsert = (job: Omit<Job, 'id' | 'postedDate'>) => ({
  title: job.title,
  company: job.company,
  location: job.location,
  degree_level: job.degreeLevel,
  requirements: job.requirements,
  description: job.description,
  salary_range: job.salaryRange,
  application_url: job.applicationUrl
});

export const jobService = {
  // Get all jobs
  async getAllJobs(): Promise<Job[]> {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
        throw error;
      }

      return data?.map(transformDbJobToJob) || [];
    } catch (error) {
      console.error('Error in getAllJobs:', error);
      return [];
    }
  },

  // Get job by ID
  async getJobById(id: string): Promise<Job | null> {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching job:', error);
        return null;
      }

      return data ? transformDbJobToJob(data) : null;
    } catch (error) {
      console.error('Error in getJobById:', error);
      return null;
    }
  },

  // Add new job
  async addJob(jobData: Omit<Job, 'id' | 'postedDate'>): Promise<Job | null> {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert([transformJobToDbInsert(jobData)])
        .select()
        .single();

      if (error) {
        console.error('Error adding job:', error);
        throw error;
      }

      return data ? transformDbJobToJob(data) : null;
    } catch (error) {
      console.error('Error in addJob:', error);
      throw error;
    }
  },

  // Update job
  async updateJob(id: string, jobData: Partial<Omit<Job, 'id' | 'postedDate'>>): Promise<Job | null> {
    try {
      const updateData: any = {};
      
      if (jobData.title) updateData.title = jobData.title;
      if (jobData.company) updateData.company = jobData.company;
      if (jobData.location) updateData.location = jobData.location;
      if (jobData.degreeLevel) updateData.degree_level = jobData.degreeLevel;
      if (jobData.requirements) updateData.requirements = jobData.requirements;
      if (jobData.description) updateData.description = jobData.description;
      if (jobData.salaryRange) updateData.salary_range = jobData.salaryRange;
      if (jobData.applicationUrl) updateData.application_url = jobData.applicationUrl;

      const { data, error } = await supabase
        .from('jobs')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating job:', error);
        throw error;
      }

      return data ? transformDbJobToJob(data) : null;
    } catch (error) {
      console.error('Error in updateJob:', error);
      throw error;
    }
  },

  // Delete job
  async deleteJob(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting job:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteJob:', error);
      return false;
    }
  },

  // Get jobs statistics
  async getJobsStats() {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('degree_level, created_at');

      if (error) {
        console.error('Error fetching job stats:', error);
        return {
          total: 0,
          recent: 0,
          degreeBreakdown: { Diploma: 0, Bachelor: 0, Master: 0 }
        };
      }

      const total = data?.length || 0;
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const recent = data?.filter(job => 
        new Date(job.created_at) >= weekAgo
      ).length || 0;

      const degreeBreakdown = data?.reduce((acc, job) => {
        acc[job.degree_level] = (acc[job.degree_level] || 0) + 1;
        return acc;
      }, { Diploma: 0, Bachelor: 0, Master: 0 }) || { Diploma: 0, Bachelor: 0, Master: 0 };

      return { total, recent, degreeBreakdown };
    } catch (error) {
      console.error('Error in getJobsStats:', error);
      return {
        total: 0,
        recent: 0,
        degreeBreakdown: { Diploma: 0, Bachelor: 0, Master: 0 }
      };
    }
  }
};