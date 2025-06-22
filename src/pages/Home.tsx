import React from 'react';
import Hero from '../components/Hero';
import JobListings from '../components/JobListings';
import Testimonials from '../components/Testimonials';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <JobListings />
      <Testimonials />
    </div>
  );
};

export default Home;