import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code, Users, MapPin, Phone, Shield } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Code },
    { path: '/about', label: 'About', icon: Users },
    { path: '/companies', label: 'Companies', icon: MapPin },
    { path: '/contact', label: 'Contact', icon: Phone }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Start IT Training</h1>
              <p className="text-xs text-gray-600 -mt-1">& Placement Wing</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* Admin Link */}
            <Link
              to="/admin"
              className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-gray-50 border border-gray-200"
            >
              <Shield className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-gray-50 border border-gray-200"
              >
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;