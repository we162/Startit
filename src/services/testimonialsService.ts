import { supabase } from '../lib/supabase';
import { Testimonial } from '../types';

// Transform database row to Testimonial type
const transformDbTestimonialToTestimonial = (dbTestimonial: any): Testimonial => ({
  id: dbTestimonial.id,
  name: dbTestimonial.name,
  role: dbTestimonial.role,
  company: dbTestimonial.company,
  message: dbTestimonial.message,
  image: dbTestimonial.image
});

export const testimonialsService = {
  // Get all featured testimonials
  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
      }

      return data?.map(transformDbTestimonialToTestimonial) || [];
    } catch (error) {
      console.error('Error in getFeaturedTestimonials:', error);
      return [];
    }
  },

  // Get all testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all testimonials:', error);
        throw error;
      }

      return data?.map(transformDbTestimonialToTestimonial) || [];
    } catch (error) {
      console.error('Error in getAllTestimonials:', error);
      return [];
    }
  },

  // Add new testimonial
  async addTestimonial(testimonialData: Omit<Testimonial, 'id'>): Promise<Testimonial | null> {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([{
          name: testimonialData.name,
          role: testimonialData.role,
          company: testimonialData.company,
          message: testimonialData.message,
          image: testimonialData.image,
          is_featured: true
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding testimonial:', error);
        throw error;
      }

      return data ? transformDbTestimonialToTestimonial(data) : null;
    } catch (error) {
      console.error('Error in addTestimonial:', error);
      throw error;
    }
  },

  // Update testimonial
  async updateTestimonial(id: string, testimonialData: Partial<Testimonial>): Promise<Testimonial | null> {
    try {
      const updateData: any = {};
      
      if (testimonialData.name) updateData.name = testimonialData.name;
      if (testimonialData.role) updateData.role = testimonialData.role;
      if (testimonialData.company) updateData.company = testimonialData.company;
      if (testimonialData.message) updateData.message = testimonialData.message;
      if (testimonialData.image) updateData.image = testimonialData.image;

      const { data, error } = await supabase
        .from('testimonials')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating testimonial:', error);
        throw error;
      }

      return data ? transformDbTestimonialToTestimonial(data) : null;
    } catch (error) {
      console.error('Error in updateTestimonial:', error);
      throw error;
    }
  },

  // Delete testimonial
  async deleteTestimonial(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting testimonial:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteTestimonial:', error);
      return false;
    }
  }
};