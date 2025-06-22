import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Office',
      details: ['123 Tech Hub Street', 'Innovation District', 'Bangalore, Karnataka 560001'],
      color: 'text-blue-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 98765 43211', 'Mon-Sat: 9:00 AM - 6:00 PM'],
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@startittraining.com', 'admissions@startittraining.com', 'We reply within 24 hours'],
      color: 'text-orange-600'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 7:00 PM', 'Saturday: 9:00 AM - 5:00 PM', 'Sunday: Closed'],
      color: 'text-purple-600'
    }
  ];

  const subjects = [
    'General Inquiry',
    'Course Information',
    'Placement Assistance',
    'Corporate Training',
    'Partnership Opportunity',
    'Technical Support',
    'Other'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Get In <span className="text-orange-400">Touch</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto">
              Ready to transform your career? Have questions about our programs? 
              We're here to help you take the next step towards success.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gray-50 mb-6`}>
                  <info.icon className={`h-8 w-8 ${info.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isSubmitted
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 hover:shadow-lg'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Message Sent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Find Us Here</h3>
              
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-100">
                <div className="aspect-video bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-700 font-medium">Interactive Map</p>
                    <p className="text-gray-600 text-sm">123 Tech Hub Street, Innovation District</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Getting Here</h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>• 5 minutes walk from Tech City Metro Station</p>
                    <p>• Ample parking available</p>
                    <p>• Accessible by bus routes 15, 23, 45</p>
                    <p>• Located in the heart of Innovation District</p>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Need Immediate Help?</h4>
                <p className="text-gray-600 mb-6">
                  For urgent inquiries or immediate assistance, don't hesitate to call us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+919876543210"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 text-center"
                  >
                    Call Now
                  </a>
                  <a
                    href="mailto:info@startittraining.com"
                    className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 text-center"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;