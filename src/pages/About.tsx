
import React from 'react';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-campus-primary mb-4">About CampusHub</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Revolutionizing how students and staff access and utilize campus resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-campus-secondary mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              CampusHub was created with a simple but powerful mission: to maximize the potential of campus resources and enhance the overall campus experience.
            </p>
            <p className="text-gray-700 mb-4">
              We believe that every student and staff member should have easy, equitable access to the rich resources that our campus offers. By providing real-time information and a seamless booking system, we aim to reduce resource wastage and improve accessibility.
            </p>
            <p className="text-gray-700">
              Our platform serves as a bridge between users and administration, streamlining communication and promoting efficient resource management for the benefit of the entire campus community.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
              alt="Students collaborating" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-campus-secondary mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-campus-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-campus-primary mb-3">Efficiency</h3>
              <p className="text-gray-600">
                We strive to make resource utilization as efficient as possible, saving time and reducing waste.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-campus-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-campus-primary mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We believe in equitable access to resources for all members of our diverse campus community.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-campus-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-campus-primary mb-3">Reliability</h3>
              <p className="text-gray-600">
                We provide accurate, real-time information that users can depend on for their planning needs.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-campus-light p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold text-campus-secondary mb-6 text-center">Our Team</h2>
          <p className="text-gray-700 text-center max-w-3xl mx-auto mb-8">
            CampusHub was developed by a passionate team of students and staff who recognized the need for better resource management on campus.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: "Alex Johnson", role: "Project Lead", image: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Samantha Lee", role: "UI/UX Designer", image: "https://randomuser.me/api/portraits/women/44.jpg" },
              { name: "Marcus Chen", role: "Full Stack Developer", image: "https://randomuser.me/api/portraits/men/46.jpg" },
              { name: "Taylor Williams", role: "Resource Coordinator", image: "https://randomuser.me/api/portraits/women/65.jpg" }
            ].map((member, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-campus-primary">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-campus-secondary mb-4">Join Our Mission</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-6">
            We're always looking for feedback and ways to improve. If you have suggestions or want to get involved with improving campus resource management, we'd love to hear from you.
          </p>
          <a 
            href="/contact" 
            className="inline-block campus-button-primary"
          >
            Contact Us
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default About;
