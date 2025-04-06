
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import HeaderLogo from './header/HeaderLogo';
import NavigationLinks from './header/NavigationLinks';
import NotificationButton from './header/NotificationButton';
import UserMenuDropdown from './header/UserMenuDropdown';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkScrollPosition = () => {
      if (headerRef.current) {
        if (window.scrollY > 10) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };
    
    window.addEventListener('scroll', checkScrollPosition);
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);
  
  // Generate background gradient based on scroll position
  const gradientBackground = isSticky 
    ? 'bg-white/80 backdrop-blur-sm border-b' 
    : 'bg-gradient-to-r from-slate-50 to-indigo-50';
  
  return (
    <header 
      ref={headerRef} 
      className={`sticky top-0 z-50 transition-all duration-300 ${gradientBackground}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <HeaderLogo />
          </div>

          <NavigationLinks />

          <div className="flex items-center">
            {!isAuthenticated && (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" className="text-sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {isAuthenticated && (
              <div className="flex items-center">
                <NotificationButton />
                <UserMenuDropdown />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
