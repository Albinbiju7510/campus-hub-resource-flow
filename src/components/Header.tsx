
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, LogOut, User, Shield, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import NotificationDropdown from '@/components/NotificationDropdown';
import { motion } from 'framer-motion';

const Header = () => {
  const { user, logout, isAuthenticated, isAdmin, isPrincipal, getUserNotifications } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
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

  useEffect(() => {
    if (isAuthenticated) {
      const notifications = getUserNotifications();
      const unread = notifications.some(notification => !notification.read);
      setHasUnreadNotifications(unread);
    }
  }, [isAuthenticated, getUserNotifications]);
  
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
  
  // Generate background gradient based on scroll position
  const gradientBackground = isSticky 
    ? 'bg-white/80 backdrop-blur-sm border-b' 
    : 'bg-gradient-to-r from-slate-50 to-indigo-50';

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
    <header 
      ref={headerRef} 
      className={`sticky top-0 z-50 transition-all duration-300 ${gradientBackground}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
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
          </div>

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
                <div className="relative mr-2">
                  <Button
                    variant="ghost"
                    className="relative p-2"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="h-5 w-5" />
                    {hasUnreadNotifications && (
                      <Badge className="absolute -top-1 -right-1 h-2 w-2 p-0 bg-red-500" />
                    )}
                  </Button>

                  {showNotifications && (
                    <NotificationDropdown
                      onClose={() => setShowNotifications(false)}
                    />
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        {user?.profileImage && <AvatarImage src={user.profileImage} alt={user?.name || ''} />}
                        <AvatarFallback className="bg-campus-primary text-white">
                          {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                        {user?.role && (
                          <Badge className={
                            user?.role === 'admin' ? 'bg-blue-500' : 
                            user?.role === 'principal' ? 'bg-purple-500' : 'bg-green-500'
                          }>
                            {user?.role}
                          </Badge>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/profile" className="flex w-full items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    
                    {(isAdmin() || isPrincipal()) && (
                      <DropdownMenuItem>
                        <Link to="/admin" className="flex w-full items-center">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
