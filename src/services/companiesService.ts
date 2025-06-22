import { supabase } from '../lib/supabase';
import { Company } from '../types';

// Transform database row to Company type
const transformDbCompanyToCompany = (dbCompany: any): Company => ({
  id: dbCompany.id,
  name: dbCompany.name,
  logo: dbCompany.logo,
  description: dbCompany.description,
  industry: dbCompany.industry,
  employees: dbCompany.employees,
  placementCount: dbCompany.placement_count
});

export const companiesService = {
  // Get all partner companies
  async getPartnerCompanies(): Promise<Company[]> {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('is_partner', true)
        .order('placement_count', { ascending: false });

      if (error) {
        console.error('Error fetching companies:', error);
        throw error;
      }

      return data?.map(transformDbCompanyToCompany) || [];
    } catch (error) {
      console.error('Error in getPartnerCompanies:', error);
      return [];
    }
  },

  // Get all companies
  async getAllCompanies(): Promise<Company[]> {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all companies:', error);
        throw error;
      }

      return data?.map(transformDbCompanyToCompany) || [];
    } catch (error) {
      console.error('Error in getAllCompanies:', error);
      return [];
    }
  },

  // Add new company
  async addCompany(companyData: Omit<Company, 'id'>): Promise<Company | null> {
    try {
      const { data, error } = await supabase
        .from('companies')
        .insert([{
          name: companyData.name,
          logo: companyData.logo,
          description: companyData.description,
          industry: companyData.industry,
          employees: companyData.employees,
          placement_count: companyData.placementCount,
          is_partner: true
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding company:', error);
        throw error;
      }

      return data ? transformDbCompanyToCompany(data) : null;
    } catch (error) {
      console.error('Error in addCompany:', error);
      throw error;
    }
  },

  // Update company
  async updateCompany(id: string, companyData: Partial<Company>): Promise<Company | null> {
    try {
      const updateData: any = {};
      
      if (companyData.name) updateData.name = companyData.name;
      if (companyData.logo) updateData.logo = companyData.logo;
      if (companyData.description) updateData.description = companyData.description;
      if (companyData.industry) updateData.industry = companyData.industry;
      if (companyData.employees) updateData.employees = companyData.employees;
      if (companyData.placementCount !== undefined) updateData.placement_count = companyData.placementCount;

      const { data, error } = await supabase
        .from('companies')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating company:', error);
        throw error;
      }

      return data ? transformDbCompanyToCompany(data) : null;
    } catch (error) {
      console.error('Error in updateCompany:', error);
      throw error;
    }
  },

  // Delete company
  async deleteCompany(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting company:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteCompany:', error);
      return false;
    }
  },

  // Get companies statistics
  async getCompaniesStats() {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('placement_count, is_partner');

      if (error) {
        console.error('Error fetching company stats:', error);
        return {
          totalCompanies: 0,
          totalPlacements: 0,
          activePartners: 0
        };
      }

      const totalCompanies = data?.length || 0;
      const totalPlacements = data?.reduce((sum, company) => sum + (company.placement_count || 0), 0) || 0;
      const activePartners = data?.filter(company => company.is_partner).length || 0;

      return { totalCompanies, totalPlacements, activePartners };
    } catch (error) {
      console.error('Error in getCompaniesStats:', error);
      return {
        totalCompanies: 0,
        totalPlacements: 0,
        activePartners: 0
      };
    }
  }
};