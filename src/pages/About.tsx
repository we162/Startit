import React from 'react';
import { Target, Eye, Award, Users, BookOpen, TrendingUp } from 'lucide-react';

const About: React.FC = () => {
  const services = [
    {
      icon: BookOpen,
      title: 'Comprehensive Training Programs',
      description: 'Industry-focused curriculum covering latest technologies and best practices in software development.'
    },
    {
      icon: Users,
      title: 'Expert Mentorship',
      description: 'Learn from experienced professionals who have worked in top tech companies worldwide.'
    },
    {
      icon: TrendingUp,
      title: 'Career Placement Assistance',
      description: 'Dedicated placement team working with 100+ partner companies to secure your dream job.'
    },
    {
      icon: Award,
      title: 'Industry Certifications',
      description: 'Earn recognized certifications that validate your skills and enhance your professional credibility.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Students Trained' },
    { number: '190+', label: 'Successful Placements' },
    { number: '50+', label: 'Partner Companies' },
    { number: '95%', label: 'Placement Rate' }
  ];

  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Director & Founder',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: '15+ years in IT education and industry experience'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Placements',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Former HR director at major tech companies'
    },
    {
      name: 'Amit Patel',
      role: 'Senior Technical Trainer',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Full-stack developer with 12+ years experience'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              About <span className="text-orange-400">Start IT Training</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto">
              Transforming careers through comprehensive IT training and strategic placement services 
              since 2018. We're committed to bridging the skills gap in the technology industry.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-blue-600 p-3 rounded-xl">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                To empower individuals with cutting-edge technical skills and provide them with 
                meaningful career opportunities in the rapidly evolving technology landscape. 
                We strive to create a pipeline of skilled professionals who can drive innovation 
                and contribute to India's digital transformation.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-orange-600 p-3 rounded-xl">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                To become the leading IT training and placement organization in India, 
                recognized for our commitment to excellence in education, innovation in training 
                methodologies, and successful career transformation of our students. 
                We envision a future where every student achieves their career aspirations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions designed to prepare you for success in the technology industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
                    <service.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Numbers that reflect our commitment to student success and industry impact
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 rounded-2xl p-8 hover:bg-white/20 transition-colors">
                  <p className="text-4xl lg:text-5xl font-bold text-orange-400 mb-2">{stat.number}</p>
                  <p className="text-blue-100 text-lg">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to your success and career growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Start IT Training?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Here's what sets us apart from other training institutes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Industry-relevant curriculum updated regularly',
              'Hands-on project-based learning approach',
              'Personal mentorship and career guidance',
              'Strong industry connections and partnerships',
              'Flexible learning schedules and formats',
              '100% placement assistance guarantee'
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="bg-orange-500 rounded-full p-1 mt-1 flex-shrink-0">
                  <Award className="h-4 w-4 text-white" />
                </div>
                <p className="text-blue-100">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;