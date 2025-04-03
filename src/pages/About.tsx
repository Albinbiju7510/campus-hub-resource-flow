
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-campus-primary mb-4">About CampusHub</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Revolutionizing how students and staff access and utilize campus resources at College of Engineering Aranmula.
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Efficiency</h3>
              <p className="text-gray-600">
                We strive to make the most out of available resources, minimizing waste and maximizing value for every campus member.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
              <p className="text-gray-600">
                Everyone should have equal opportunity to use campus resources. Our platform ensures access is equitable and straightforward.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                We build stronger campus communities by facilitating connections and collaborations between students, faculty, and staff.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-campus-secondary mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white">
                  <img 
                    src="/lovable-uploads/b8392cde-b520-4771-b8ff-a9453b320341.png" 
                    alt="Albin Biju" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle>Albin Biju</CardTitle>
                <p className="text-campus-primary font-medium">Team Lead</p>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-gray-600 mb-4">
                  Leads the development team and oversees the architecture of CampusHub.
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="https://github.com/Albinbiju7510" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-campus-primary">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/albinbiju/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-campus-primary">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="mailto:albinbiju75100@gmail.com" className="text-gray-500 hover:text-campus-primary">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white">
                  <img 
                    src="/lovable-uploads/6c71d2a3-9a9c-410e-8b71-47df9261bf64.png" 
                    alt="Aromal M" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle>Aromal M</CardTitle>
                <p className="text-campus-primary font-medium">Developer</p>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-gray-600 mb-4">
                  Frontend developer focusing on UI/UX design and responsive layouts.
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="https://github.com/aromalm" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-campus-primary">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/aromal-manoj-844454255/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-campus-primary">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="mailto:aromalmanoj100@gmail.com" className="text-gray-500 hover:text-campus-primary">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white">
                  <img 
                    src="/lovable-uploads/080d95a4-55f1-4a4f-8ace-5c0411a273f4.png" 
                    alt="Ansel A Jiji" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle>Ansel A Jiji</CardTitle>
                <p className="text-campus-primary font-medium">Developer</p>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-gray-600 mb-4">
                  Backend developer specializing in database management and API integration.
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="https://github.com/anseljiji" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-campus-primary">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/ansel-a-jiji-a8a9a2359/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-campus-primary">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="mailto:anseljiji@gmail.com" className="text-gray-500 hover:text-campus-primary">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white">
                  <img 
                    src="/lovable-uploads/786cb096-9d98-48b2-9ef6-b1560abab967.png" 
                    alt="Christo Mathew George" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <CardHeader className="text-center pb-2">
                <CardTitle>Christo Mathew George</CardTitle>
                <p className="text-campus-primary font-medium">Developer</p>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-gray-600 mb-4">
                  Full-stack developer responsible for system integrations and testing.
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="https://github.com/christomathew" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-campus-primary">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/christo-mathew-george-a4932a255/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-campus-primary">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="mailto:christomathewgeorge7@gmail.com" className="text-gray-500 hover:text-campus-primary">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-campus-secondary mb-6 text-center">Contact Us</h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <p className="text-gray-700 mb-6">
                  We're always looking to improve CampusHub. If you have questions, suggestions, or feedback, please reach out to us.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-campus-primary mr-3" />
                    <span>albinbiju75100@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-campus-primary mr-3" />
                    <span>+91 7510903774</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-campus-primary mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>College of Engineering Aranmula<br />Aranmula, Pathanamthitta<br />Kerala, India</span>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1" 
                  alt="College campus" 
                  className="rounded-lg shadow-md w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
