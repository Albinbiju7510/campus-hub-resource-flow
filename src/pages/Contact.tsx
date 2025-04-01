
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    toast({
      title: "Message Sent!",
      description: "We've received your message and will respond shortly.",
    });

    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
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
              123 Campus Avenue<br />
              University District<br />
              City, State 12345
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-campus-primary" />
            </div>
            <h3 className="text-xl font-semibold text-campus-primary mb-2">Email Us</h3>
            <p className="text-gray-600 mb-2">General Inquiries:</p>
            <a href="mailto:info@campushub.edu" className="text-campus-secondary hover:text-campus-primary">
              info@campushub.edu
            </a>
            <p className="text-gray-600 mt-2 mb-2">Support:</p>
            <a href="mailto:support@campushub.edu" className="text-campus-secondary hover:text-campus-primary">
              support@campushub.edu
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-campus-primary" />
            </div>
            <h3 className="text-xl font-semibold text-campus-primary mb-2">Call Us</h3>
            <p className="text-gray-600 mb-2">Main Office:</p>
            <a href="tel:+15551234567" className="text-campus-secondary hover:text-campus-primary">
              (555) 123-4567
            </a>
            <p className="text-gray-600 mt-2 mb-2">Support Hotline:</p>
            <a href="tel:+15557891234" className="text-campus-secondary hover:text-campus-primary">
              (555) 789-1234
            </a>
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
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Your email address"
                    className="w-full"
                  />
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
                />
              </div>
              
              <Button type="submit" className="w-full md:w-auto bg-campus-primary hover:bg-blue-800">
                Send Message
              </Button>
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
                <h3 className="text-lg font-semibold text-campus-primary mb-2">Can I cancel a booking?</h3>
                <p className="text-gray-600">
                  Yes, you can cancel a booking up to 2 hours before the scheduled time. Go to your account dashboard and find the booking you wish to cancel.
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
                  Use the contact form on this page or email support@campushub.edu with details about the issue. Include the resource name, date, time, and a description of the problem.
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
