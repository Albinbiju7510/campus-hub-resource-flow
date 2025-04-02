
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Upload, HelpCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface UserProfileCardProps {
  profileImage: string | null;
  setShowProfileUpload: (show: boolean) => void;
  setShowRules: (show: boolean) => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ 
  profileImage, 
  setShowProfileUpload,
  setShowRules 
}) => {
  const { user } = useAuth();
  
  // Determine user tier based on points
  const getUserTier = () => {
    const totalPoints = user?.points || 0;
    if (totalPoints >= 1000) return { name: "Platinum", next: "Maximum tier reached", progress: 100, color: "bg-purple-600" };
    if (totalPoints >= 500) return { name: "Gold", next: "Platinum Tier (1000)", progress: (totalPoints - 500) / 5, color: "bg-yellow-500" };
    if (totalPoints >= 200) return { name: "Silver", next: "Gold Tier (500)", progress: (totalPoints - 200) / 3, color: "bg-gray-400" };
    return { name: "Bronze", next: "Silver Tier (200)", progress: totalPoints, color: "bg-amber-600" };
  };

  const userTier = getUserTier();
  const totalPoints = user?.points || 0;

  return (
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
  );
};

export { UserProfileCard };
