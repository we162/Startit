import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Trophy, TrendingUp } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzIiBjeT0iMyIgcj0iMyIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Bridging the Gap Between
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                {' '}Talent{' '}
              </span>
              and
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                {' '}Opportunity
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-2xl">
              Empowering students and professionals with industry-ready skills and connecting them 
              with top companies for successful career placements.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="#jobs"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Browse Jobs</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105"
              >
                Register Now
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500/20 p-3 rounded-xl">
                  <Users className="h-8 w-8 text-orange-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-blue-200">Students Trained</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500/20 p-3 rounded-xl">
                  <Trophy className="h-8 w-8 text-orange-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold">190+</p>
                  <p className="text-blue-200">Successful Placements</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500/20 p-3 rounded-xl">
                  <TrendingUp className="h-8 w-8 text-orange-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold">95%</p>
                  <p className="text-blue-200">Placement Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;