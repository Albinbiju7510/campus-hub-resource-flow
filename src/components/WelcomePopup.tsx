
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Award, Calendar, Book, Target } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WelcomePopupProps {
  onClose: () => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const { user } = useAuth();
  
  useEffect(() => {
    // Check if this is the first login of the day
    const lastLoginDate = localStorage.getItem('last-login-date');
    const today = new Date().toDateString();
    
    if (lastLoginDate !== today) {
      setIsOpen(true);
      localStorage.setItem('last-login-date', today);
      
      // Trigger confetti effect
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 500);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };
  
  const nextStep = () => {
    if (step < features.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };
  
  const features = [
    {
      icon: <Award className="h-12 w-12 text-indigo-500" />,
      title: "Welcome to CampusHub",
      description: `Hi ${user?.name || 'there'}! Ready to make the most of campus life? CampusHub helps you earn CampusCoins by participating in activities and using facilities around campus.`,
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: <Calendar className="h-12 w-12 text-emerald-500" />,
      title: "Book Campus Resources",
      description: "Use the study rooms, library, and other campus facilities to earn CampusCoins. Each facility has a cooldown period before you can earn again.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: <Target className="h-12 w-12 text-rose-500" />,
      title: "Complete Activities",
      description: "Attend events, participate in workshops, and engage in academic activities to boost your CampusCoin balance and unlock special rewards.",
      color: "from-rose-500 to-pink-600"
    },
    {
      icon: <Book className="h-12 w-12 text-amber-500" />,
      title: "Redeem Rewards",
      description: "Visit the rewards section to exchange your CampusCoins for special benefits, vouchers, and campus merchandise. The more you participate, the more you earn!",
      color: "from-amber-500 to-orange-600"
    }
  ];
  
  const currentFeature = features[step];
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 overflow-hidden max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className={`bg-gradient-to-br ${currentFeature.color} p-6 text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                {currentFeature.icon}
                <div className="w-40 h-40 rounded-full bg-white opacity-10 absolute -top-20 -right-20" />
              </div>
              
              <div className="flex items-center mb-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-lg mr-4">
                  {currentFeature.icon}
                </div>
                <h2 className="text-2xl font-bold">{currentFeature.title}</h2>
              </div>
              
              <p className="text-white text-opacity-90 mb-3 leading-relaxed">
                {currentFeature.description}
              </p>
              
              <div className="flex justify-between items-center mt-6">
                <div className="flex space-x-1">
                  {features.map((_, i) => (
                    <div 
                      key={i}
                      className={`w-2 h-2 rounded-full ${i === step ? 'bg-white' : 'bg-white bg-opacity-40'}`}
                    />
                  ))}
                </div>
                
                <Button 
                  variant="secondary"
                  onClick={nextStep}
                  className="text-gray-800"
                >
                  {step === features.length - 1 ? "Get Started" : "Next"}
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;
