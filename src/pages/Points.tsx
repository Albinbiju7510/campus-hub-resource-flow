
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Award, ChevronRight, Gift, Calendar, BookOpen, ShoppingBag, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import PointAnimation from '@/components/PointAnimation';

interface PointTransaction {
  id: string;
  description: string;
  points: number;
  category: 'event' | 'facility' | 'library' | 'store';
  date: string;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  image: string;
  available: boolean;
}

const initialTransactions: PointTransaction[] = [
  {
    id: 'pt1',
    description: 'Attended Campus Cleanup Event',
    points: 50,
    category: 'event',
    date: '2023-04-22T11:20:00'
  },
  {
    id: 'pt2',
    description: 'Used Study Room for 2 hours',
    points: 10,
    category: 'facility',
    date: '2023-04-20T15:30:00'
  },
  {
    id: 'pt3',
    description: 'Borrowed 3 Books from Library',
    points: 15,
    category: 'library',
    date: '2023-04-18T10:45:00'
  },
  {
    id: 'pt4',
    description: 'Purchase at Campus Store',
    points: 25,
    category: 'store',
    date: '2023-04-15T14:20:00'
  },
  {
    id: 'pt5',
    description: 'Attended Tech Workshop',
    points: 35,
    category: 'event',
    date: '2023-04-10T09:00:00'
  }
];

const rewards: Reward[] = [
  {
    id: 'r1',
    title: 'Campus Store Voucher',
    description: '$10 off your next purchase at the campus store',
    pointsCost: 100,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da',
    available: true
  },
  {
    id: 'r2',
    title: 'Coffee Shop Gift Card',
    description: 'Free coffee for a week at the campus café',
    pointsCost: 150,
    image: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6',
    available: true
  },
  {
    id: 'r3',
    title: 'Premium Study Room Access',
    description: 'Exclusive access to premium study rooms for a month',
    pointsCost: 200,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6',
    available: true
  },
  {
    id: 'r4',
    title: 'Campus Merchandise',
    description: 'Limited edition campus hoodie',
    pointsCost: 250,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633',
    available: false
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
    default:
      return <Award className="h-5 w-5 text-gray-500" />;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
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
      updatePoints(-reward.pointsCost);
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
        <CardDescription>{reward.pointsCost} points</CardDescription>
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

const Points = () => {
  const { user, updatePoints } = useAuth();
  const totalPoints = user?.points || 0;
  const [activeTab, setActiveTab] = useState('history');
  const [pointTransactions, setPointTransactions] = useState<PointTransaction[]>(initialTransactions);
  const [showPointAnimation, setShowPointAnimation] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [pointText, setPointText] = useState('');

  // Demo function to simulate earning points
  const simulateEarnPoints = (amount: number, description: string) => {
    // Show animation
    setEarnedPoints(amount);
    setPointText(`${amount} Points Earned!`);
    setShowPointAnimation(true);
    
    // Update points in auth context
    updatePoints(amount);
    
    // Add new transaction
    const newTransaction: PointTransaction = {
      id: `pt${Date.now()}`,
      description,
      points: amount,
      category: 'facility',
      date: new Date().toISOString()
    };
    
    setPointTransactions(prev => [newTransaction, ...prev]);
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
            <div className="flex-1">
              <div className="flex items-center">
                <Award className="h-12 w-12 text-campus-primary mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Total Points</p>
                  <h2 className="text-3xl font-bold">{totalPoints}</h2>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">Progress to next tier</p>
                <Progress value={Math.min((totalPoints / 500) * 100, 100)} className="h-2" />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>0</span>
                  <span>500 (Silver Tier)</span>
                </div>
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
                  onClick={() => simulateEarnPoints(15, "Used Study Room for 1 hour")}
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="history">Points History</TabsTrigger>
            <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="divide-y">
                {pointTransactions.map(transaction => (
                  <div key={transaction.id} className="py-4 flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 transition-colors">
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
                      <span className="font-semibold text-green-600">+{transaction.points} pts</span>
                      <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
                    </div>
                  </div>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {rewards.map(reward => (
                  <RewardCard key={reward.id} reward={reward} />
                ))}
              </div>
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
    </Layout>
  );
};

export default Points;
