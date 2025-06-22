import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonialsService } from '../services/testimonialsService';
import { Testimonial } from '../types';

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setIsLoading(true);
        const data = await testimonialsService.getFeaturedTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Loading testimonials...</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-20 bg-gray-200 rounded mb-6"></div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our alumni who have successfully transitioned into their dream careers 
            through our training and placement programs.
          </p>
        </div>

        {/* Testimonials Grid */}
        {testimonials.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 relative hover:shadow-lg transition-all duration-300 border border-blue-100"
              >
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 h-8 w-8 text-blue-200" />
                
                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Message */}
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.message}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No testimonials available at the moment.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Success Story?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join hundreds of successful professionals who transformed their careers with our comprehensive training programs.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Enroll Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;