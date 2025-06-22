import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import JobCard from './JobCard';

const JobListings: React.FC = () => {
  const { jobs } = useAdmin();
  const [selectedDegree, setSelectedDegree] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const degreeOptions = ['All', 'Diploma', 'Bachelor', 'Master'];

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesDegree = selectedDegree === 'All' || job.degreeLevel === selectedDegree;
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDegree && matchesSearch;
    });
  }, [jobs, selectedDegree, searchTerm]);

  return (
    <section id="jobs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Job Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exciting career opportunities from our partner companies, 
            categorized by education level and skillset requirements.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search jobs, companies, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Degree Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
              >
                {degreeOptions.map(option => (
                  <option key={option} value={option}>
                    {option === 'All' ? 'All Degree Levels' : `${option} Level`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span> job{filteredJobs.length !== 1 ? 's' : ''}
            {selectedDegree !== 'All' && (
              <span> for <span className="font-semibold text-blue-600">{selectedDegree}</span> level</span>
            )}
          </p>
        </div>

        {/* Job Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;