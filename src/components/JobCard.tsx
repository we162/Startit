import React from 'react';
import { MapPin, Calendar, DollarSign, ExternalLink } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const getDegreeColor = (level: string) => {
    switch (level) {
      case 'Diploma': return 'bg-green-100 text-green-800';
      case 'Bachelor': return 'bg-blue-100 text-blue-800';
      case 'Master': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleApplyClick = () => {
    if (job.applicationUrl && job.applicationUrl !== '#apply') {
      window.open(job.applicationUrl, '_blank');
    } else {
      // Fallback to a contact form or general application page
      window.open('/contact', '_blank');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
            {job.title}
          </h3>
          <p className="text-lg text-gray-700 font-medium">{job.company}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDegreeColor(job.degreeLevel)}`}>
          {job.degreeLevel}
        </span>
      </div>

      {/* Location and Salary */}
      <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
        <div className="flex items-center space-x-1">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{job.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <DollarSign className="h-4 w-4" />
          <span className="text-sm font-medium">{job.salaryRange}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{formatDate(job.postedDate)}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

      {/* Requirements */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Requirements:</h4>
        <div className="flex flex-wrap gap-2">
          {job.requirements.slice(0, 4).map((req, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {req}
            </span>
          ))}
          {job.requirements.length > 4 && (
            <span className="text-gray-500 text-sm">+{job.requirements.length - 4} more</span>
          )}
        </div>
      </div>

      {/* Apply Button */}
      <button 
        onClick={handleApplyClick}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 group"
      >
        <span>Apply Now</span>
        <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default JobCard;