
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import resources from '@/data/resources';
import PointAnimation from '@/components/PointAnimation';
import { Clock, AlertCircle } from 'lucide-react';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const resourceId = searchParams.get('resource') || '';
  const resource = resources.find(r => r.id === resourceId);
  
  const { toast } = useToast();
  const { user, isAuthenticated, updatePoints, addFacilityBooking, canBookResource } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showPointAnimation, setShowPointAnimation] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [bookingStatus, setBookingStatus] = useState<{canBook: boolean, cooldownRemaining: number}>({
    canBook: true,
    cooldownRemaining: 0
  });

  // Check if resource can be booked
  useEffect(() => {
    if (resourceId && isAuthenticated) {
      const status = canBookResource(resourceId);
      setBookingStatus(status);
    }
  }, [resourceId, isAuthenticated, canBookResource]);

  // If not authenticated, prompt login
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book resources.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [isAuthenticated, navigate, toast]);

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

  // Format remaining time
  const formatRemainingTime = (ms: number) => {
    if (ms <= 0) return "Ready to book";
    
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes}m ${seconds}s`;
  };

  const handleBookNow = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Selection Required",
        description: "Please select both a date and time to book this resource.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book resources.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (!bookingStatus.canBook) {
      toast({
        title: "Booking Not Available",
        description: `You can book this resource again in ${formatRemainingTime(bookingStatus.cooldownRemaining)}.`,
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

    // Points to award based on resource type
    const pointsToAward = calculatePointsForResource(resource?.type || '');
    
    // Calculate cooldown time (60 minutes for study rooms, 30 minutes for others)
    const cooldownTime = resource?.type.toLowerCase() === 'study' ? 60 * 60 * 1000 : 30 * 60 * 1000;
    const now = Date.now();
    
    // Add booking record
    addFacilityBooking({
      resourceId: resourceId,
      resourceName: resource?.title || 'Unknown Resource',
      date: selectedDate.toISOString(),
      timeSlot: selectedTime,
      bookingTime: now,
      cooldownUntil: now + cooldownTime
    });
    
    // Update points in user profile
    if (pointsToAward > 0) {
      updatePoints(
        pointsToAward, 
        'facility', 
        `Booked ${resource?.title || 'resource'} for ${formattedDate} at ${selectedTime}`
      );
      
      // Set up point animation
      setEarnedPoints(pointsToAward);
      setShowPointAnimation(true);
    }

    // Confirm booking
    toast({
      title: "Booking Confirmed!",
      description: `You have booked ${resource ? resource.title : 'this resource'} for ${formattedDate} at ${selectedTime}.${pointsToAward > 0 ? ` You earned ${pointsToAward} points!` : ''}`,
    });
    
    // Reset selection
    setSelectedTime(null);
    
    // Update booking status
    setBookingStatus({
      canBook: false,
      cooldownRemaining: cooldownTime
    });
  };

  // Calculate points based on resource type
  const calculatePointsForResource = (resourceType: string): number => {
    switch (resourceType.toLowerCase()) {
      case 'study':
        return 10;
      case 'computer':
        return 15;
      case 'lab':
        return 20;
      case 'meeting':
        return 10;
      case 'sports':
        return 25;
      default:
        return 5;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-campus-primary mb-4">Book a Resource</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Reserve your preferred campus resource by selecting a date and time slot.
            Earn points when you book and use campus facilities!
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
                        navigate({ search: newParams.toString() });
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
                      {resource && resource.id === r.id && (
                        <div className="mt-2 text-sm text-green-600 font-medium">
                          Earn {calculatePointsForResource(r.type)} points when you book and use this facility!
                        </div>
                      )}
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
                {resource && !bookingStatus.canBook && (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Booking Cooldown</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        You can book this resource again in: <span className="font-bold">{formatRemainingTime(bookingStatus.cooldownRemaining)}</span>
                      </p>
                    </div>
                  </div>
                )}
              
                <div>
                  <h3 className="text-md font-medium mb-2">Select a Date</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="border rounded-lg p-3"
                    disabled={!bookingStatus.canBook}
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
                        disabled={!bookingStatus.canBook}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {resource && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-1">Points Reward</h4>
                    <p className="text-sm text-blue-700">
                      You'll earn <span className="font-bold">{calculatePointsForResource(resource.type)} points</span> for booking and using this facility!
                    </p>
                    {resource.type.toLowerCase() === 'study' && (
                      <p className="text-sm text-blue-700 mt-2 flex items-center">
                        <Clock className="h-3 w-3 mr-1 inline-block" />
                        Cooldown period: 60 minutes between bookings
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-campus-primary hover:bg-blue-800"
                  onClick={handleBookNow}
                  disabled={!resource || !bookingStatus.canBook}
                >
                  {!bookingStatus.canBook ? `Available in ${formatRemainingTime(bookingStatus.cooldownRemaining)}` : "Book Now"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      {showPointAnimation && (
        <PointAnimation 
          points={earnedPoints} 
          text={`${earnedPoints} Points Earned!`}
          onComplete={() => setShowPointAnimation(false)} 
        />
      )}
    </Layout>
  );
};

export default Booking;
