
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import WelcomePopup from './WelcomePopup';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <MobileMenu />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      {isAuthenticated && showWelcome && (
        <WelcomePopup onClose={() => setShowWelcome(false)} />
      )}
    </div>
  );
};

export default Layout;
