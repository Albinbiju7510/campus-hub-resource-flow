
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ResourceCard from '@/components/ResourceCard';
import resources from '@/data/resources';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Only take the first 3 resources for the home page
  const featuredResources = resources.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-campus-primary to-campus-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Maximize Your Campus Experience
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Book study spaces, labs, sports facilities, and more. Real-time availability at your fingertips.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="bg-white text-campus-primary hover:bg-blue-50 font-bold py-3 px-6">
                  <Link to="/resources">Explore Resources</Link>
                </Button>
                <Button className="bg-transparent border-2 border-white hover:bg-white/10 py-3 px-6">
                  <Link to="/booking">Book Now</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-campus-accent/10 rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1" 
                alt="Students using campus resources" 
                className="relative z-10 rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-campus-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-campus-primary mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find and book campus resources in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-campus-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-campus-primary mb-3">Find Resources</h3>
              <p className="text-gray-600">
                Browse through various campus resources or use filters to find exactly what you need.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-campus-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-campus-primary mb-3">Check Availability</h3>
              <p className="text-gray-600">
                View real-time availability information and find the perfect time slot.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-campus-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-campus-primary mb-3">Book & Use</h3>
              <p className="text-gray-600">
                Reserve your spot with a few clicks and receive immediate confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-campus-primary">Featured Resources</h2>
            <Link 
              to="/resources" 
              className="text-campus-secondary hover:text-campus-primary font-medium"
            >
              View All Resources
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredResources.map(resource => (
              <ResourceCard 
                key={resource.id}
                id={resource.id}
                title={resource.title}
                description={resource.description}
                image={resource.image}
                type={resource.type}
                availability={resource.availability}
                location={resource.location}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-campus-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-campus-primary mb-2">500+</p>
              <p className="text-gray-600">Campus Resources</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-campus-primary mb-2">5,000+</p>
              <p className="text-gray-600">Weekly Bookings</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-campus-primary mb-2">95%</p>
              <p className="text-gray-600">User Satisfaction</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-campus-primary mb-2">24/7</p>
              <p className="text-gray-600">Resource Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-campus-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students and staff who are maximizing their campus experience with our platform.
          </p>
          <Button className="bg-white text-campus-primary hover:bg-blue-50 font-bold py-3 px-8 text-lg">
            <Link to="/resources">Explore Resources</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
