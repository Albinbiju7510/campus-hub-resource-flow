
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ThumbsUp, 
  Heart, 
  SmilePlus, 
  Rocket, 
  ThumbsDown,
  Frown
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from '@/contexts/AuthContext';

interface NotificationReactionsProps {
  notificationId: string;
  currentReaction?: string | null;
}

const NotificationReactions: React.FC<NotificationReactionsProps> = ({
  notificationId,
  currentReaction = null
}) => {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(currentReaction);
  const { user } = useAuth();
  
  // This would be replaced with actual backend function when Supabase is integrated
  const handleReaction = (reaction: string) => {
    if (selectedReaction === reaction) {
      setSelectedReaction(null);
      // Remove reaction from database
      console.log(`Removed ${reaction} reaction from notification ${notificationId}`);
    } else {
      setSelectedReaction(reaction);
      // Update reaction in database
      console.log(`Added ${reaction} reaction to notification ${notificationId}`);
    }
  };
  
  const reactions = [
    { name: 'like', icon: <ThumbsUp className="h-4 w-4" />, label: 'Like' },
    { name: 'love', icon: <Heart className="h-4 w-4" />, label: 'Love' },
    { name: 'haha', icon: <SmilePlus className="h-4 w-4" />, label: 'Haha' },
    { name: 'wow', icon: <Rocket className="h-4 w-4" />, label: 'Wow' },
    { name: 'sad', icon: <Frown className="h-4 w-4" />, label: 'Sad' },
    { name: 'angry', icon: <ThumbsDown className="h-4 w-4" />, label: 'Dislike' },
  ];
  
  return (
    <div className="flex space-x-1 mt-2">
      {reactions.map(reaction => (
        <TooltipProvider key={reaction.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`p-1 h-auto ${selectedReaction === reaction.name ? 'bg-blue-100 text-blue-600' : ''}`}
                onClick={() => handleReaction(reaction.name)}
              >
                {reaction.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{reaction.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default NotificationReactions;
