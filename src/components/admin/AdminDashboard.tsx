import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Plus, 
  LogOut, 
  Users, 
  TrendingUp, 
  Calendar,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import JobForm from './JobForm';

const AdminDashboard: React.FC = () => {
  const { currentUser, logout, jobs, deleteJob } = useAdmin();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'add-job'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDegree, setFilterDegree] = useState<string>('All');
  const [editingJob, setEditingJob] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
  };

  const handleDeleteJob = (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJob(jobId);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDegree = filterDegree === 'All' || job.degreeLevel === filterDegree;
    return matchesSearch && matchesDegree;
  });

  const stats = {
    totalJobs: jobs.length,
    recentJobs: jobs.filter(job => {
      const jobDate = new Date(job.postedDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return jobDate >= weekAgo;
    }).length,
    companies: [...new Set(jobs.map(job => job.company))].length,
    degreeBreakdown: {
      Diploma: jobs.filter(job => job.degreeLevel === 'Diploma').length,
      Bachelor: jobs.filter(job => job.degreeLevel === 'Bachelor').length,
      Master: jobs.filter(job => job.degreeLevel === 'Master').length,
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Jobs</p>
              <p className="text-3xl font-bold">{stats.totalJobs}</p>
            </div>
            <Briefcase className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">This Week</p>
              <p className="text-3xl font-bold">{stats.recentJobs}</p>
            </div>
            <Calendar className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Companies</p>
              <p className="text-3xl font-bold">{stats.companies}</p>
            </div>
            <Users className="h-12 w-12 text-orange-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Growth</p>
              <p className="text-3xl font-bold">+12%</p>
            </div>
            <TrendingUp className="h-12 w-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Degree Level Breakdown */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Jobs by Degree Level</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(stats.degreeBreakdown).map(([degree, count]) => (
            <div key={degree} className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-gray-600">{degree} Level</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Job Postings</h3>
        <div className="space-y-4">
          {jobs.slice(0, 5).map(job => (
            <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="font-semibold text-gray-900">{job.title}</h4>
                <p className="text-gray-600">{job.company} • {job.location}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {job.degreeLevel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderJobsList = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={filterDegree}
              onChange={(e) => setFilterDegree(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="All">All Degrees</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Job Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Degree</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Posted</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs.map(job => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{job.title}</p>
                      <p className="text-sm text-gray-600">{job.salaryRange}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{job.company}</td>
                  <td className="px-6 py-4 text-gray-600">{job.location}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {job.degreeLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingJob(job.id)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-lg">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">Start IT Training</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {currentUser?.username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-2xl shadow-md p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === 'dashboard'
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === 'jobs'
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Briefcase className="h-5 w-5" />
                    <span>Manage Jobs</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('add-job')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === 'add-job'
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add New Job</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'jobs' && renderJobsList()}
            {activeTab === 'add-job' && (
              <JobForm 
                onSuccess={() => setActiveTab('jobs')} 
                editingJobId={editingJob}
                onCancel={() => {
                  setEditingJob(null);
                  setActiveTab('jobs');
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;