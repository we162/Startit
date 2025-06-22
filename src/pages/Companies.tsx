import React, { useState, useEffect } from 'react';
import { Building, Users, MapPin, TrendingUp, Award, Star } from 'lucide-react';
import { companiesService } from '../services/companiesService';
import { Company } from '../types';

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalPlacements: 0,
    activePartners: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [companiesData, statsData] = await Promise.all([
          companiesService.getPartnerCompanies(),
          companiesService.getCompaniesStats()
        ]);
        setCompanies(companiesData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading companies data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const successMetrics = [
    { icon: Building, number: `${stats.activePartners}+`, label: 'Partner Companies' },
    { icon: Users, number: `${stats.totalPlacements}+`, label: 'Successful Placements' },
    { icon: TrendingUp, number: '95%', label: 'Placement Rate' },
    { icon: Award, number: '4.8/5', label: 'Company Satisfaction' }
  ];

  const benefits = [
    {
      title: 'Pre-screened Talent Pool',
      description: 'Access to rigorously trained and assessed candidates ready for immediate contribution.'
    },
    {
      title: 'Reduced Hiring Time',
      description: 'Skip the lengthy screening process with our industry-ready professionals.'
    },
    {
      title: 'Skill Guarantee',
      description: 'All our candidates come with verified skills and project experience.'
    },
    {
      title: 'Ongoing Support',
      description: 'Continued support during the onboarding process and beyond.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Our <span className="text-orange-400">Partner Companies</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Collaborating with industry leaders to create meaningful career opportunities 
              and deliver exceptional talent solutions.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105">
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Partnership Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building lasting relationships that drive mutual growth and success
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <div className="bg-blue-600 p-3 rounded-xl inline-block mb-4">
                    <metric.icon className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{metric.number}</p>
                  <p className="text-gray-600">{metric.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Companies Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading companies across various industries trust us for their talent acquisition needs
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 animate-pulse">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="h-20 bg-gray-200 rounded mb-6"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : companies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-sm text-gray-600">{company.industry}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{company.description}</p>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Company Size</span>
                      <span className="text-sm font-medium text-gray-900">{company.employees}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Placements</span>
                      <span className="text-sm font-medium text-blue-600">{company.placementCount} students</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">Excellent Partnership</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No partner companies available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Partner With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages of partnering with Start IT Training for your talent needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Find Your Next Great Hire?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join our network of successful companies and access top-tier talent trained 
              specifically for today's technology landscape.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105">
                Become a Partner
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200">
                View Talent Pool
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Companies;