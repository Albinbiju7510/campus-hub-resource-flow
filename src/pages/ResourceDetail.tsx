
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import resources from '@/data/resources';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Find the resource with the matching ID
  const resource = resources.find(r => r.id === id);

  // If resource not found, show an error message
  if (!resource) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Resource Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            The resource you are looking for does not exist or has been removed.
          </p>
          <Button onClick={() => navigate('/resources')}>
            Back to Resources
          </Button>
        </div>
      </Layout>
    );
  }

  // Available time slots (mock data)
  const timeSlots = [
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
  ];

  // Handle booking button click
  const handleBookNow = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Selection Required",
        description: "Please select both a date and time to book this resource.",
        variant: "destructive",
      });
      return;
    }

    // Format the date for display
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    toast({
      title: "Booking Confirmed!",
      description: `You have booked ${resource.title} for ${formattedDate} at ${selectedTime}.`,
    });

    // Redirect to booking confirmation page (would be implemented in a real app)
    // navigate('/booking/confirmation');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb navigation */}
        <div className="mb-6 text-sm">
          <Link to="/" className="text-gray-500 hover:text-campus-primary">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/resources" className="text-gray-500 hover:text-campus-primary">Resources</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-campus-primary">{resource.title}</span>
        </div>

        {/* Resource Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-campus-primary mb-2">{resource.title}</h1>
          <div className="flex flex-wrap items-center text-gray-600 gap-4">
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full mr-2 ${resource.availability > 70 ? 'bg-green-500' : resource.availability > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <span>{resource.availability}% Available</span>
            </div>
            <div>|</div>
            <div>Location: {resource.location}</div>
            <div>|</div>
            <div>Type: {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resource Image and Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <img 
                src={resource.image} 
                alt={resource.title} 
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-campus-primary mb-4">About This Resource</h2>
                <p className="text-gray-700 mb-6">{resource.description}</p>
                
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="rules">Rules</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="py-4">
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Capacity</span>
                        <span>{resource.details.capacity} people</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Hours</span>
                        <span>{resource.details.hours}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Location</span>
                        <span>{resource.location}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Current Availability</span>
                        <span className={`font-medium ${resource.availability > 70 ? 'text-green-600' : resource.availability > 30 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {resource.availability}%
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="amenities" className="py-4">
                    <ul className="space-y-2">
                      {resource.details.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-2 w-2 bg-campus-secondary rounded-full mr-3"></div>
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="rules" className="py-4">
                    <ul className="space-y-2">
                      {resource.details.rules.map((rule, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-2 w-2 bg-campus-primary rounded-full mr-3"></div>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-campus-primary mb-4">Book This Resource</h2>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Select a Date</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border rounded-lg p-3 pointer-events-auto"
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Select a Time Slot</h3>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time, index) => (
                    <Button
                      key={index}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`text-sm justify-start ${selectedTime === time ? 'bg-campus-primary' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full bg-campus-primary hover:bg-blue-800"
                onClick={handleBookNow}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourceDetail;
