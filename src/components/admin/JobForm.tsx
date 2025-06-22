import React, { useState, useEffect } from 'react';
import { Save, X, Briefcase } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { JobFormData } from '../../types';

interface JobFormProps {
  onSuccess: () => void;
  editingJobId?: string | null;
  onCancel: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ onSuccess, editingJobId, onCancel }) => {
  const { addJob, updateJob, getJob } = useAdmin();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    company: '',
    location: '',
    degreeLevel: 'Bachelor',
    requirements: '',
    description: '',
    salaryRange: '',
    applicationUrl: ''
  });

  const isEditing = !!editingJobId;

  useEffect(() => {
    if (isEditing && editingJobId) {
      const job = getJob(editingJobId);
      if (job) {
        setFormData({
          title: job.title,
          company: job.company,
          location: job.location,
          degreeLevel: job.degreeLevel,
          requirements: job.requirements.join(', '),
          description: job.description,
          salaryRange: job.salaryRange,
          applicationUrl: job.applicationUrl
        });
      }
    }
  }, [isEditing, editingJobId, getJob]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const jobData = {
        ...formData,
        requirements: formData.requirements.split(',').map(req => req.trim()).filter(req => req)
      };

      if (isEditing && editingJobId) {
        await updateJob(editingJobId, jobData);
      } else {
        await addJob(jobData);
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Error saving job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      degreeLevel: 'Bachelor',
      requirements: '',
      description: '',
      salaryRange: '',
      applicationUrl: ''
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-3 rounded-xl">
            <Briefcase className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Job' : 'Add New Job'}
            </h2>
            <p className="text-gray-600">
              {isEditing ? 'Update job details' : 'Create a new job posting'}
            </p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 p-2"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g., Software Engineer"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g., TechCorp Solutions"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g., Bangalore, India"
            />
          </div>

          <div>
            <label htmlFor="degreeLevel" className="block text-sm font-semibold text-gray-700 mb-2">
              Degree Level *
            </label>
            <select
              id="degreeLevel"
              name="degreeLevel"
              value={formData.degreeLevel}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
            >
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="salaryRange" className="block text-sm font-semibold text-gray-700 mb-2">
              Salary Range *
            </label>
            <input
              type="text"
              id="salaryRange"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g., ₹6-12 LPA"
            />
          </div>

          <div>
            <label htmlFor="applicationUrl" className="block text-sm font-semibold text-gray-700 mb-2">
              Application URL
            </label>
            <input
              type="url"
              id="applicationUrl"
              name="applicationUrl"
              value={formData.applicationUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="https://company.com/apply"
            />
          </div>
        </div>

        <div>
          <label htmlFor="requirements" className="block text-sm font-semibold text-gray-700 mb-2">
            Requirements *
          </label>
          <input
            type="text"
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="e.g., React, Node.js, JavaScript, MongoDB (comma-separated)"
          />
          <p className="text-sm text-gray-500 mt-1">Separate multiple requirements with commas</p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Job Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Describe the job role, responsibilities, and what makes it exciting..."
          />
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 hover:shadow-lg'
            } text-white`}
          >
            <Save className="h-5 w-5" />
            <span>{isLoading ? 'Saving...' : (isEditing ? 'Update Job' : 'Create Job')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;