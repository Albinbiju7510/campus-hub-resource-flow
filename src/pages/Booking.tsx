
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import resources from '@/data/resources';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const resourceId = searchParams.get('resource') || '';
  const resource = resources.find(r => r.id === resourceId);
  
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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
      description: `You have booked ${resource ? resource.title : 'this resource'} for ${formattedDate} at ${selectedTime}.`,
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-campus-primary mb-4">Book a Resource</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Reserve your preferred campus resource by selecting a date and time slot.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select a Resource</CardTitle>
                <CardDescription>Browse available campus resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map(r => (
                    <div 
                      key={r.id} 
                      className={`border rounded-lg p-4 cursor-pointer transition-colors 
                        ${r.id === resourceId ? 'border-campus-primary bg-blue-50' : 'hover:border-gray-300'}`}
                      onClick={() => {
                        const newParams = new URLSearchParams(searchParams);
                        newParams.set('resource', r.id);
                        window.history.pushState({}, '', `?${newParams.toString()}`);
                        window.location.reload();
                      }}
                    >
                      <div className="flex items-center">
                        <div 
                          className="h-12 w-12 rounded bg-cover bg-center mr-4" 
                          style={{ backgroundImage: `url(${r.image})` }}
                        />
                        <div>
                          <h3 className="font-semibold">{r.title}</h3>
                          <p className="text-sm text-gray-600">{r.type.charAt(0).toUpperCase() + r.type.slice(1)}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center text-sm">
                        <span>{r.location}</span>
                        <span 
                          className={`px-2 py-1 rounded-full ${
                            r.availability > 70 ? 'bg-green-100 text-green-800' : 
                            r.availability > 30 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {r.availability}% Available
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book This Resource</CardTitle>
                <CardDescription>
                  {resource ? `Booking ${resource.title}` : 'Select a resource, date, and time'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-2">Select a Date</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="border rounded-lg p-3"
                  />
                </div>
                
                <div>
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
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-campus-primary hover:bg-blue-800"
                  onClick={handleBookNow}
                  disabled={!resource}
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;
