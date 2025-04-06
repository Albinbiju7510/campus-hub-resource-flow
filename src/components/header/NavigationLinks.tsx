
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const NavigationLinks: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, isAdmin, isPrincipal } = useAuth();
  
  // Get active page from location
  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.includes('/resources')) return 'resources';
    if (path.includes('/events')) return 'events';
    if (path.includes('/store')) return 'store';
    if (path.includes('/points')) return 'points';
    if (path.includes('/about')) return 'about';
    if (path.includes('/contact')) return 'contact';
    return '';
  };

  const activePage = getActivePage();
  
  return (
    <div className="hidden md:flex items-center space-x-1">
      <Link to="/">
        <Button variant={activePage === 'home' ? 'default' : 'ghost'} className="text-sm">
          Home
        </Button>
      </Link>
      <Link to="/resources">
        <Button variant={activePage === 'resources' ? 'default' : 'ghost'} className="text-sm">
          Resources
        </Button>
      </Link>
      <Link to="/events">
        <Button variant={activePage === 'events' ? 'default' : 'ghost'} className="text-sm">
          Events
        </Button>
      </Link>
      <Link to="/store">
        <Button variant={activePage === 'store' ? 'default' : 'ghost'} className="text-sm">
          Store
        </Button>
      </Link>
      <Link to="/points">
        <Button variant={activePage === 'points' ? 'default' : 'ghost'} className="text-sm">
          CampusCoins
        </Button>
      </Link>
      <Link to="/about">
        <Button variant={activePage === 'about' ? 'default' : 'ghost'} className="text-sm">
          About
        </Button>
      </Link>
      <Link to="/contact">
        <Button variant={activePage === 'contact' ? 'default' : 'ghost'} className="text-sm">
          Contact
        </Button>
      </Link>
    </div>
  );
};

export default NavigationLinks;
