import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, User, Github, Linkedin, Instagram } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Team Members Data
const teamMembers = [
  {
    name: "Albin Biju",
    role: "Team Lead",
    image: "/lovable-uploads/b8392cde-b520-4771-b8ff-a9453b320341.png",
    email: "albinbiju75100@gmail.com",
    github: "https://github.com/Albinbiju7510",
    linkedin: "https://www.linkedin.com/in/albinbiju/",
    instagram: "https://www.instagram.com/mr.___infinity__/"
  },
  {
    name: "Aromal M",
    role: "Team Member",
    image: "/lovable-uploads/6c71d2a3-9a9c-410e-8b71-47df9261bf64.png",
    email: "aromalmanoj100@gmail.com",
    github: "https://github.com/aromalm",
    linkedin: "https://www.linkedin.com/in/aromal-manoj-844454255/",
    instagram: "https://www.instagram.com/_ar_om_al_._/"
  },
  {
    name: "Ansel A Jiji",
    role: "Team Member",
    image: "/lovable-uploads/080d95a4-55f1-4a4f-8ace-5c0411a273f4.png",
    email: "anseljiji@gmail.com",
    github: "https://github.com/anseljiji",
    linkedin: "https://www.linkedin.com/in/ansel-a-jiji-a8a9a2359/",
    instagram: "https://www.instagram.com/_royal_kid_o_/"
  },
  {
    name: "Christo Mathew George",
    role: "Team Member",
    image: "/lovable-uploads/786cb096-9d98-48b2-9ef6-b1560abab967.png",
    email: "christomathewgeorge7@gmail.com",
    github: "https://github.com/christomathew",
    linkedin: "https://www.linkedin.com/in/christo-mathew-george-a4932a255/",
    instagram: "https://www.instagram.com/christo_mathew7/"
  }
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would send the form data to a server
    // For now we'll simulate the process with a timeout
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We've received your message and will respond shortly. The team has been notified.",
      });

      // Show who the message was sent to
      toast({
        title: "Notification Sent",
        description: `Your enquiry has been forwarded to: albinbiju75100@gmail.com, aromalmanoj100@gmail.com, anseljiji@gmail.com, christomathewgeorge7@gmail.com`,
        variant: "default"
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-campus-primary mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions, feedback, or need assistance? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-campus-primary" />
            </div>
            <h3 className="text-xl font-semibold text-campus-primary mb-2">Our Location</h3>
            <p className="text-gray-600">
              College of Engineering Aranmula<br />
              Aranmula P.O, Pathanamthitta<br />
              Kerala, India 689533
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-campus-primary" />
            </div>
            <h3 className="text-xl font-semibold text-campus-primary mb-2">Email Us</h3>
            <p className="text-gray-600 mb-2">General Inquiries:</p>
            <a href="mailto:albinbiju75100@gmail.com" className="text-campus-secondary hover:text-campus-primary">
              albinbiju75100@gmail.com
            </a>
            <p className="text-gray-600 mt-2 mb-2">Support:</p>
            <a href="mailto:aromalmanoj100@gmail.com" className="text-campus-secondary hover:text-campus-primary">
              aromalmanoj100@gmail.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-campus-primary" />
            </div>
            <h3 className="text-xl font-semibold text-campus-primary mb-2">Call Us</h3>
            <p className="text-gray-600 mb-2">Main Office:</p>
            <a href="tel:+917510903774" className="text-campus-secondary hover:text-campus-primary">
              +91 7510903774
            </a>
            <p className="text-gray-600 mt-2 mb-2">Student Support:</p>
            <a href="tel:+917510903774" className="text-campus-secondary hover:text-campus-primary">
              +91 7510903774
            </a>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-campus-secondary mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="bg-campus-primary text-white text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <a 
                    href={`mailto:${member.email}`} 
                    className="text-sm text-gray-600 hover:text-campus-primary flex items-center justify-center gap-1"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{member.email}</span>
                  </a>
                </CardContent>
                <CardFooter className="flex justify-center gap-4 pt-0">
                  <a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-campus-primary"
                    title="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-campus-primary"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href={member.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-campus-primary"
                    title="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-campus-secondary mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="pl-10 w-full"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Your email address"
                      className="pl-10 w-full"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Message subject"
                  className="w-full"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Your message"
                  className="w-full"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full md:w-auto bg-campus-primary hover:bg-blue-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
              
              <p className="text-sm text-gray-500 mt-2">
                Your message will be sent to all team members for prompt assistance.
              </p>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-campus-secondary mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-campus-primary mb-2">How do I book a resource?</h3>
                <p className="text-gray-600">
                  Navigate to the Resources page, find the resource you want to book, and click the "Book Now" button. Follow the prompts to select your desired date and time.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-campus-primary mb-2">How do I earn points on campus?</h3>
                <p className="text-gray-600">
                  You can earn points by booking and using campus facilities, participating in events, attending workshops, and through various academic activities. Visit the Points page to see all ways to earn points.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-campus-primary mb-2">How can I redeem my earned points?</h3>
                <p className="text-gray-600">
                  Visit the Store page to browse available products and services you can redeem with your points. You can also check the Rewards section on your Points page for special offers.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-campus-primary mb-2">Are there any fees for using the platform?</h3>
                <p className="text-gray-600">
                  No, the platform is free for all students and staff with a valid university ID. Some premium resources may have usage fees, but these will be clearly indicated.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-campus-primary mb-2">How do I report an issue with a resource?</h3>
                <p className="text-gray-600">
                  Use the contact form on this page or email our support team at aromalmanoj100@gmail.com with details about the issue. Include the resource name, date, time, and a description of the problem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
