
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import PointAnimation from '@/components/PointAnimation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ProfileImageUpload from '@/components/ProfileImageUpload';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

import { PointsHistory } from '@/components/points/PointsHistory';
import { RewardsList } from '@/components/points/RewardsList';
import { PointAllocationRules } from '@/components/points/PointAllocationRules';
import { UserProfileCard } from '@/components/points/UserProfileCard';
import { ActionCards } from '@/components/points/ActionCards';

import { initialTransactions, rewards, pointsAllocationRules, PointTransaction } from '@/data/pointsData';

const Points = () => {
  const { user, updatePoints, updateProfileImage } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('history');
  const [pointTransactions, setPointTransactions] = useState<PointTransaction[]>(initialTransactions);
  const [showPointAnimation, setShowPointAnimation] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [pointText, setPointText] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showRules, setShowRules] = useState(false);
  const [showProfileUpload, setShowProfileUpload] = useState(false);
  
  // Study room booking states
  const [showStudyRoomDialog, setShowStudyRoomDialog] = useState(false);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [studyTimeElapsed, setStudyTimeElapsed] = useState(0);
  const [studyTimeDuration, setStudyTimeDuration] = useState(60); // 60 seconds for demo, would be longer in production
  const [studyRoomCooldown, setStudyRoomCooldown] = useState(0);
  const [cooldownInterval, setCooldownInterval] = useState<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const storedImage = localStorage.getItem('user-profile-image');
    if (storedImage) {
      setProfileImage(storedImage);
    } else if (user?.profileImage) {
      setProfileImage(user.profileImage);
    }
    
    // Check if there's an active cooldown for the study room
    const lastBooking = user?.bookings?.filter(b => b.resourceId === 'study-room')
      .sort((a, b) => b.bookingTime - a.bookingTime)[0];
    
    if (lastBooking && lastBooking.cooldownUntil > Date.now()) {
      setStudyRoomCooldown(Math.floor((lastBooking.cooldownUntil - Date.now()) / 1000));
      startCooldownTimer();
    }
  }, [user]);
  
  // Start cooldown timer
  const startCooldownTimer = () => {
    if (cooldownInterval) {
      clearInterval(cooldownInterval);
    }
    
    const interval = setInterval(() => {
      setStudyRoomCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setCooldownInterval(interval);
  };
  
  // Cleanup timers on component unmount
  useEffect(() => {
    return () => {
      if (cooldownInterval) {
        clearInterval(cooldownInterval);
      }
    };
  }, [cooldownInterval]);

  const handleProfileUpdate = (imageUrl: string) => {
    setProfileImage(imageUrl);
    localStorage.setItem('user-profile-image', imageUrl);
    if (updateProfileImage) {
      updateProfileImage(imageUrl);
    }
    toast({
      title: "Profile Image Updated",
      description: "Your profile image has been successfully updated."
    });
  };
  
  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const simulateEarnPoints = (amount: number, description: string, category: 'event' | 'facility' | 'library' | 'store' | 'attendance' | 'academic', details?: string) => {
    setEarnedPoints(amount);
    setPointText(`${amount} CampusCoins Earned!`);
    setShowPointAnimation(true);
    launchConfetti();
    
    updatePoints(amount, category, description);
    
    const newTransaction: PointTransaction = {
      id: `pt${Date.now()}`,
      description,
      points: amount,
      category,
      date: new Date().toISOString(),
      details
    };
    
    setPointTransactions(prev => [newTransaction, ...prev]);
  };

  const handleUseStudyRoom = () => {
    // Check if there's a cooldown
    if (studyRoomCooldown > 0) {
      const minutes = Math.floor(studyRoomCooldown / 60);
      const seconds = studyRoomCooldown % 60;
      
      toast({
        title: "Booking Not Available",
        description: `You can book the study room again in ${minutes}:${seconds.toString().padStart(2, '0')}`,
        variant: "destructive"
      });
      return;
    }
    
    setShowStudyRoomDialog(true);
    setStudyTimeElapsed(0);
    setBookingInProgress(true);
    
    // Simulate study time progress
    const interval = setInterval(() => {
      setStudyTimeElapsed(prev => {
        if (prev >= studyTimeDuration) {
          clearInterval(interval);
          completeStudySession();
          return studyTimeDuration;
        }
        return prev + 1;
      });
    }, 1000);
    
    // Cleanup function
    return () => clearInterval(interval);
  };
  
  const completeStudySession = () => {
    setBookingInProgress(false);
    setShowStudyRoomDialog(false);
    
    // Add points and create transaction
    simulateEarnPoints(
      15, 
      "Used Study Room for 1 hour", 
      "facility",
      `Used the quiet study room in Library Block from ${new Date().toLocaleTimeString()} for exam preparation.`
    );
    
    // Set cooldown
    const cooldownDuration = 3 * 60; // 3 minutes
    setStudyRoomCooldown(cooldownDuration);
    
    // Add booking with cooldown
    if (user) {
      const cooldownUntil = Date.now() + (cooldownDuration * 1000);
      const booking = {
        resourceId: 'study-room',
        resourceName: 'Study Room',
        date: new Date().toISOString().split('T')[0],
        timeSlot: `${new Date().toLocaleTimeString()} - ${new Date(Date.now() + 3600000).toLocaleTimeString()}`,
        bookingTime: Date.now(),
        cooldownUntil
      };
      
      useAuth().addFacilityBooking(booking);
      startCooldownTimer();
    }
  };
  
  const cancelStudySession = () => {
    setBookingInProgress(false);
    setShowStudyRoomDialog(false);
    setStudyTimeElapsed(0);
  };
  
  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-campus-primary mb-2">CampusCoin Rewards</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Earn CampusCoins by participating in campus events, using facilities, and more. Redeem them for exclusive rewards!
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg shadow-md p-6 mb-8 animate-scale-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <UserProfileCard 
              profileImage={profileImage} 
              setShowProfileUpload={setShowProfileUpload} 
              setShowRules={setShowRules}
            />
            
            <ActionCards 
              onViewRewards={() => setActiveTab('rewards')}
              onEarnPoints={handleUseStudyRoom}
              cooldownRemaining={studyRoomCooldown}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full animate-fade-in">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="history">Points History</TabsTrigger>
            <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
            <TabsTrigger value="rules">Point Allocation Rules</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history">
            <PointsHistory transactions={pointTransactions} />
          </TabsContent>
          
          <TabsContent value="rewards">
            <RewardsList rewards={rewards} />
          </TabsContent>
          
          <TabsContent value="rules">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-6">CampusCoin Allocation System</h3>
              <PointAllocationRules allocationRules={pointsAllocationRules} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {showPointAnimation && (
        <PointAnimation 
          points={earnedPoints} 
          text={pointText}
          onComplete={() => setShowPointAnimation(false)} 
        />
      )}
      
      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-campus-primary">CampusCoin Allocation Rules</DialogTitle>
            <DialogDescription>
              Learn how CampusCoins are awarded throughout the campus
            </DialogDescription>
          </DialogHeader>
          <PointAllocationRules allocationRules={pointsAllocationRules} />
        </DialogContent>
      </Dialog>

      <Dialog open={showProfileUpload} onOpenChange={setShowProfileUpload}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-campus-primary">Update Profile Picture</DialogTitle>
            <DialogDescription>
              Upload a new profile picture to personalize your account
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <ProfileImageUpload
              currentImage={profileImage || undefined}
              onImageUpdate={handleProfileUpdate}
            />
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Study Room Session Dialog */}
      <Dialog open={showStudyRoomDialog} onOpenChange={(open) => {
        if (!open && !bookingInProgress) setShowStudyRoomDialog(false);
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-campus-primary">Study Room Session</DialogTitle>
            <DialogDescription>
              Your study session is in progress. Please complete the required time to earn CampusCoins.
            </DialogDescription>
          </DialogHeader>
          <div className="my-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span>Progress:</span>
              <span className="font-medium">
                {formatTimeRemaining(studyTimeElapsed)} / {formatTimeRemaining(studyTimeDuration)}
              </span>
            </div>
            <Progress value={Math.round((studyTimeElapsed / studyTimeDuration) * 100)} className="h-2" />
            
            <div className="flex items-center text-amber-600 p-3 bg-amber-50 rounded-md text-sm">
              <AlertCircle className="h-4 w-4 mr-2" />
              <p>Please remain active to receive your CampusCoins. Leaving early will forfeit the rewards.</p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={cancelStudySession}
              disabled={!bookingInProgress}
            >
              Cancel Session
            </Button>
            
            <Button 
              onClick={completeStudySession} 
              disabled={studyTimeElapsed < studyTimeDuration}
            >
              {studyTimeElapsed >= studyTimeDuration ? "Claim 15 CampusCoins" : "In Progress..."}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Points;
