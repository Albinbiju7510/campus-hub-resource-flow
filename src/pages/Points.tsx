
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import PointAnimation from '@/components/PointAnimation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ProfileImageUpload from '@/components/ProfileImageUpload';

// Import our newly created components
import { PointsHistory } from '@/components/points/PointsHistory';
import { RewardsList } from '@/components/points/RewardsList';
import { PointAllocationRules } from '@/components/points/PointAllocationRules';
import { UserProfileCard } from '@/components/points/UserProfileCard';
import { ActionCards } from '@/components/points/ActionCards';

// Import the data
import { initialTransactions, rewards, pointsAllocationRules } from '@/data/pointsData';

const Points = () => {
  const { user, updatePoints, updateProfileImage } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('history');
  const [pointTransactions, setPointTransactions] = useState(initialTransactions);
  const [showPointAnimation, setShowPointAnimation] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [pointText, setPointText] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showRules, setShowRules] = useState(false);
  const [showProfileUpload, setShowProfileUpload] = useState(false);
  
  useEffect(() => {
    const storedImage = localStorage.getItem('user-profile-image');
    if (storedImage) {
      setProfileImage(storedImage);
    } else if (user?.profileImage) {
      setProfileImage(user.profileImage);
    }
  }, [user]);

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

  const simulateEarnPoints = (amount: number, description: string, category: 'event' | 'facility' | 'library' | 'store' | 'attendance' | 'academic', details?: string) => {
    setEarnedPoints(amount);
    setPointText(`${amount} Points Earned!`);
    setShowPointAnimation(true);
    
    updatePoints(amount, category, description);
    
    const newTransaction = {
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
    simulateEarnPoints(
      15, 
      "Used Study Room for 1 hour", 
      "facility",
      "Used the quiet study room in Library Block from 2:00 PM to 3:00 PM for exam preparation."
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-campus-primary mb-2">Your Campus Points</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Earn points by participating in campus events, using facilities, and more. Redeem them for exclusive rewards!
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <UserProfileCard 
              profileImage={profileImage} 
              setShowProfileUpload={setShowProfileUpload} 
              setShowRules={setShowRules}
            />
            
            <ActionCards 
              onViewRewards={() => setActiveTab('rewards')}
              onEarnPoints={handleUseStudyRoom}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
              <h3 className="text-xl font-semibold mb-6">Points Allocation System</h3>
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
            <DialogTitle className="text-xl font-bold text-campus-primary">Points Allocation Rules</DialogTitle>
            <DialogDescription>
              Learn how points are awarded throughout the campus
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
    </Layout>
  );
};

export default Points;
