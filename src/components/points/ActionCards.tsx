
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Award, Clock } from 'lucide-react';

interface ActionCardsProps {
  onViewRewards: () => void;
  onEarnPoints: () => void;
  cooldownRemaining?: number;
}

export const ActionCards = ({ onViewRewards, onEarnPoints, cooldownRemaining = 0 }: ActionCardsProps) => {
  const formatCooldown = (seconds: number) => {
    if (seconds <= 0) return "";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')} remaining`;
  };
  
  return (
    <div className="w-full md:w-1/2 flex flex-col sm:flex-row gap-4">
      <Card className="w-full sm:w-1/2 bg-white hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Award className="h-6 w-6 text-campus-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Reward Store</h3>
          <p className="text-gray-600 text-sm">Redeem your points for campus rewards and exclusive items.</p>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0">
          <Button 
            variant="outline" 
            className="w-full hover:border-campus-primary hover:text-campus-primary"
            onClick={onViewRewards}
          >
            View Rewards
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-full sm:w-1/2 bg-white hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Calendar className="h-6 w-6 text-campus-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Study Room</h3>
          <p className="text-gray-600 text-sm">Use the campus study room to earn points and boost your GPA.</p>
          {cooldownRemaining > 0 && (
            <div className="flex items-center text-amber-600 text-sm mt-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>{formatCooldown(cooldownRemaining)}</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0">
          <Button 
            variant={cooldownRemaining > 0 ? "outline" : "default"}
            className="w-full"
            disabled={cooldownRemaining > 0}
            onClick={onEarnPoints}
          >
            {cooldownRemaining > 0 ? "On Cooldown" : "Use Study Room"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
