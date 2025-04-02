
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  image: string;
  available: boolean;
  originalPrice?: string;
}

interface RewardsListProps {
  rewards: Reward[];
}

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

const RewardsList: React.FC<RewardsListProps> = ({ rewards }) => {
  const { user } = useAuth();
  const totalPoints = user?.points || 0;

  return (
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
  );
};

export { RewardsList, type Reward };
