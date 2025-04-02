
import React from 'react';
import { Button } from '@/components/ui/button';
import { Gift, Calendar } from 'lucide-react';

interface ActionCardsProps {
  onViewRewards: () => void;
  onEarnPoints: () => void;
}

const ActionCards: React.FC<ActionCardsProps> = ({ onViewRewards, onEarnPoints }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 text-center">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-blue-100 text-blue-800 mb-3 hover:scale-105 transition-transform">
          <Gift className="h-12 w-12" />
        </div>
        <h3 className="text-lg font-semibold">Redeem Points</h3>
        <p className="text-gray-600 mb-3">Exchange your points for exclusive rewards</p>
        <Button 
          onClick={onViewRewards}
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
          onClick={onEarnPoints}
          variant="outline"
          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white border-none"
        >
          Use Study Room
        </Button>
      </div>
    </div>
  );
};

export { ActionCards };
