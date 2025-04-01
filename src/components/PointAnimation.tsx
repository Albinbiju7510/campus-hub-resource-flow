
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PointAnimationProps {
  points: number;
  text?: string;
  onComplete?: () => void;
}

const PointAnimation: React.FC<PointAnimationProps> = ({ 
  points, 
  text = 'Points Earned!',
  onComplete 
}) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: [0.5, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-1"
            >
              +{points}
            </motion.div>
            <p className="opacity-90">{text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PointAnimation;
