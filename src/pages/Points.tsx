import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Award, ChevronRight, Gift, Calendar, BookOpen, ShoppingBag, Users, Upload, Info, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import PointAnimation from '@/components/PointAnimation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ProfileImageUpload from '@/components/ProfileImageUpload';

interface PointTransaction {
  id: string;
  description: string;
  points: number;
  category: 'event' | 'facility' | 'library' | 'store' | 'attendance' | 'academic';
  date: string;
  details?: string;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  image: string;
  available: boolean;
  originalPrice?: string;
}

const initialTransactions: PointTransaction[] = [
  {
    id: 'pt1',
    description: 'Attended Campus Cleanup Event',
    points: 50,
    category: 'event',
    date: '2023-04-22T11:20:00',
    details: 'Participated in the annual campus cleanup event, helping to collect waste and beautify the campus grounds for 4 hours.'
  },
  {
    id: 'pt2',
    description: 'Used Study Room for 2 hours',
    points: 10,
    category: 'facility',
    date: '2023-04-20T15:30:00',
    details: 'Utilized the premium study room in the Main Library building from 3:30 PM to 5:30 PM.'
  },
  {
    id: 'pt3',
    description: 'Borrowed 3 Books from Library',
    points: 15,
    category: 'library',
    date: '2023-04-18T10:45:00',
    details: 'Borrowed the following books: "Data Structures", "Algorithms Design", and "Computer Networks" for academic purposes.'
  },
  {
    id: 'pt4',
    description: 'Purchase at Campus Store',
    points: 25,
    category: 'store',
    date: '2023-04-15T14:20:00',
    details: 'Made a purchase of ₹500 at the campus store, including stationery and college merchandise.'
  },
  {
    id: 'pt5',
    description: 'Attended Tech Workshop',
    points: 35,
    category: 'event',
    date: '2023-04-10T09:00:00',
    details: 'Participated in the "Emerging Technologies in Software Development" workshop conducted by the CSE department.'
  },
  {
    id: 'pt6',
    description: 'Perfect Attendance - April',
    points: 30,
    category: 'attendance',
    date: '2023-04-30T23:59:00',
    details: 'Maintained 100% attendance in all classes for the month of April.'
  },
  {
    id: 'pt7',
    description: 'Academic Achievement - Quiz Winner',
    points: 40,
    category: 'academic',
    date: '2023-04-12T14:30:00',
    details: 'Secured first place in the departmental technical quiz competition.'
  }
];

const rewards: Reward[] = [
  {
    id: 'r1',
    title: 'Campus Store Voucher',
    description: '₹500 off your next purchase at the campus store',
    pointsCost: 100,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da',
    available: true,
    originalPrice: '₹500'
  },
  {
    id: 'r2',
    title: 'Cafeteria Meal Pass',
    description: 'Free meals for a week at the campus café',
    pointsCost: 150,
    image: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6',
    available: true,
    originalPrice: '₹700'
  },
  {
    id: 'r3',
    title: 'Premium Study Room Access',
    description: 'Exclusive access to premium study rooms for a month',
    pointsCost: 200,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6',
    available: true,
    originalPrice: '₹1,000'
  },
  {
    id: 'r4',
    title: 'Campus Merchandise',
    description: 'Limited edition campus hoodie with college logo',
    pointsCost: 250,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633',
    available: false,
    originalPrice: '₹1,200'
  },
  {
    id: 'r5',
    title: 'Library Late Fee Waiver',
    description: 'Get your library late fees waived off (up to ₹300)',
    pointsCost: 75,
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
    available: true,
    originalPrice: '₹300'
  },
  {
    id: 'r6',
    title: 'Exam Preparation Package',
    description: 'Study materials, notes, and mock tests for upcoming exams',
    pointsCost: 180,
    image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc',
    available: true,
    originalPrice: '₹850'
  }
];

const pointsAllocationRules = [
  {
    category: 'Academic Achievement',
    allocations: [
      { activity: 'Top rank in semester exams', points: '50-100 pts' },
      { activity: 'Quiz or competition winner', points: '20-50 pts' },
      { activity: 'Research paper publication', points: '100 pts' },
      { activity: 'Academic project completion', points: '30-60 pts' }
    ]
  },
  {
    category: 'Attendance',
    allocations: [
      { activity: '100% monthly attendance', points: '30 pts' },
      { activity: '90-99% monthly attendance', points: '20 pts' },
      { activity: 'No late arrivals in a month', points: '15 pts' }
    ]
  },
  {
    category: 'Campus Facilities Usage',
    allocations: [
      { activity: 'Library visit', points: '5 pts/visit' },
      { activity: 'Study room booking', points: '5 pts/hour' },
      { activity: 'Computer lab usage', points: '5 pts/hour' },
      { activity: 'Sports facility usage', points: '10 pts/session' }
    ]
  },
  {
    category: 'Events & Activities',
    allocations: [
      { activity: 'Organizing campus event', points: '50-100 pts' },
      { activity: 'Event participation', points: '20-30 pts' },
      { activity: 'Volunteering', points: '20-50 pts' },
      { activity: 'Workshop/seminar attendance', points: '15-30 pts' }
    ]
  },
  {
    category: 'Campus Contribution',
    allocations: [
      { activity: 'Campus cleanup participation', points: '25-50 pts' },
      { activity: 'Donation to campus initiatives', points: '10 pts/₹200' },
      { activity: 'Feedback submission', points: '10 pts' },
      { activity: 'Peer tutoring', points: '15 pts/hour' }
    ]
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'event':
      return <Users className="h-5 w-5 text-purple-500" />;
    case 'facility':
      return <Calendar className="h-5 w-5 text-blue-500" />;
    case 'library':
      return <BookOpen className="h-5 w-5 text-green-500" />;
    case 'store':
      return <ShoppingBag className="h-5 w-5 text-orange-500" />;
    case 'attendance':
      return <Calendar className="h-5 w-5 text-indigo-500" />;
    case 'academic':
      return <Award className="h-5 w-5 text-amber-500" />;
    default:
      return <Award className="h-5 w-5 text-gray-500" />;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

const RewardCard = ({ reward }: { reward: Reward }) => {
  const { toast } = useToast();
  const { user, updatePoints } = useAuth();
  const totalPoints = user?.points || 0;
  const canRedeem = totalPoints >= reward.pointsCost && reward.available;
  
  const handleRedeem = () => {
    if (canRedeem) {
      updatePoints(-reward.pointsCost, "rewards", `Redeemed ${reward.title}`);
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${reward.title}. Check your email for details.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Cannot Redeem",
        description: "You don't have enough points or this reward is currently unavailable.",
      });
    }
  };

  return (
    <Card className={`${!reward.available ? 'opacity-60' : ''} hover:shadow-md transition-shadow duration-300`}>
      <div className="h-48 w-full overflow-hidden">
        <img 
          src={reward.image} 
          alt={reward.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{reward.title}</CardTitle>
        <div className="flex justify-between items-center">
          <CardDescription>{reward.pointsCost} points</CardDescription>
          {reward.originalPrice && (
            <span className="text-sm text-gray-500">Value: {reward.originalPrice}</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-gray-700">{reward.description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleRedeem}
          className={`w-full ${!canRedeem ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : ''}`}
          disabled={!canRedeem}
        >
          {canRedeem ? 'Redeem Now' : reward.available ? 'Not Enough Points' : 'Currently Unavailable'}
        </Button>
      </CardFooter>
    </Card>
  );
};

const TransactionItem = ({ transaction }: { transaction: PointTransaction }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className="py-4 hover:bg-gray-50 rounded-lg p-2 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-gray-100 p-2 rounded-full mr-4">
            {getCategoryIcon(transaction.category)}
          </div>
          <div>
            <p className="font-medium">{transaction.description}</p>
            <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-green-600 mr-3">+{transaction.points} pts</span>
          {transaction.details && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1" 
              onClick={() => setShowDetails(!showDetails)}
            >
              <Info className="h-4 w-4 text-gray-400" />
            </Button>
          )}
        </div>
      </div>
      
      {showDetails && transaction.details && (
        <div className="mt-3 ml-12 p-3 bg-gray-50 border-l-2 border-gray-200 text-sm text-gray-700">
          {transaction.details}
        </div>
      )}
    </div>
  );
};

const PointAllocationRules = () => {
  return (
    <div className="space-y-6">
      {pointsAllocationRules.map((category, idx) => (
        <div key={idx}>
          <h3 className="text-lg font-semibold mb-3 text-campus-primary">{category.category}</h3>
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Points Awarded</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {category.allocations.map((allocation, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{allocation.activity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-campus-primary">{allocation.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

const Points = () => {
  const { user, updatePoints, updateProfileImage } = useAuth();
  const { toast } = useToast();
  const totalPoints = user?.points || 0;
  const [activeTab, setActiveTab] = useState('history');
  const [pointTransactions, setPointTransactions] = useState<PointTransaction[]>(initialTransactions);
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

  const getUserTier = () => {
    if (totalPoints >= 1000) return { name: "Platinum", next: "Maximum tier reached", progress: 100, color: "bg-purple-600" };
    if (totalPoints >= 500) return { name: "Gold", next: "Platinum Tier (1000)", progress: (totalPoints - 500) / 5, color: "bg-yellow-500" };
    if (totalPoints >= 200) return { name: "Silver", next: "Gold Tier (500)", progress: (totalPoints - 200) / 3, color: "bg-gray-400" };
    return { name: "Bronze", next: "Silver Tier (200)", progress: totalPoints, color: "bg-amber-600" };
  };

  const userTier = getUserTier();

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
            <div className="flex-1">
              <div className="flex items-center">
                <div className="relative mr-4">
                  <Avatar className="h-16 w-16 border-2 border-white cursor-pointer" onClick={() => setShowProfileUpload(true)}>
                    {profileImage ? (
                      <AvatarImage src={profileImage} alt={user?.name || "User"} />
                    ) : (
                      <AvatarFallback className="bg-campus-primary text-white text-xl">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1">
                    <div 
                      className="bg-campus-primary text-white p-1 rounded-full cursor-pointer"
                      onClick={() => setShowProfileUpload(true)}
                    >
                      <Upload className="h-3 w-3" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold">{user?.name || "User"}</p>
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${userTier.color} text-white`}>
                      {userTier.name} Tier
                    </span>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-600 mr-1">Total Points:</p>
                    <p className="text-2xl font-bold">{totalPoints}</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="ml-1" onClick={() => setShowRules(true)}>
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">View points allocation rules</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">Progress to {userTier.next}</p>
                <Progress value={Math.min(userTier.progress, 100)} className={`h-2 ${userTier.color}`} />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 text-center">
                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-blue-100 text-blue-800 mb-3 hover:scale-105 transition-transform">
                  <Gift className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-semibold">Redeem Points</h3>
                <p className="text-gray-600 mb-3">Exchange your points for exclusive rewards</p>
                <Button 
                  onClick={() => setActiveTab('rewards')}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  View Rewards
                </Button>
              </div>
              
              <div className="flex-1 text-center">
                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 text-green-800 mb-3 hover:scale-105 transition-transform">
                  <Calendar className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-semibold">Earn Points Now</h3>
                <p className="text-gray-600 mb-3">Simulate using a campus facility</p>
                <Button
                  onClick={() => simulateEarnPoints(
                    15, 
                    "Used Study Room for 1 hour", 
                    "facility",
                    "Used the quiet study room in Library Block from 2:00 PM to 3:00 PM for exam preparation."
                  )}
                  variant="outline"
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white border-none"
                >
                  Use Study Room
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="history">Points History</TabsTrigger>
            <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
            <TabsTrigger value="rules">Point Allocation Rules</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Activity History</h3>
              <div className="divide-y">
                {pointTransactions.map(transaction => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="rewards">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Available Rewards</h3>
                <p className="text-gray-600">You have <span className="font-semibold text-campus-primary">{totalPoints} points</span> to redeem</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map(reward => (
                  <RewardCard key={reward.id} reward={reward} />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="rules">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-6">Points Allocation System</h3>
              <PointAllocationRules />
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
          <PointAllocationRules />
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
