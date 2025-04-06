
import React from 'react';
import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';
import { motion } from 'framer-motion';

const HeaderLogo: React.FC = () => {
  // Animation variants for header title
  const titleContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const titleLetter = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12 } }
  };
  
  const titleText = "CampusHub";
  const titleLetters = titleText.split('');
  
  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center gap-2">
        <div className="bg-campus-primary p-1.5 rounded-md">
          <Award className="h-5 w-5 text-white" />
        </div>
        <motion.div 
          className="hidden sm:flex items-center"
          variants={titleContainer}
          initial="hidden"
          animate="show"
        >
          {titleLetters.map((letter, index) => (
            <motion.span
              key={index}
              className="text-xl font-bold text-campus-primary"
              variants={titleLetter}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </Link>
  );
};

export default HeaderLogo;
