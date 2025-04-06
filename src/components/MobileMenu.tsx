
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';

const MobileMenu = () => {
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
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] max-w-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">CampusHub</h2>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </SheetTrigger>
          </div>
          <nav className="flex flex-col gap-4">
            <Link to="/">
              <Button variant={activePage === 'home' ? 'default' : 'ghost'} className="w-full justify-start">
                Home
              </Button>
            </Link>
            <Link to="/resources">
              <Button variant={activePage === 'resources' ? 'default' : 'ghost'} className="w-full justify-start">
                Resources
              </Button>
            </Link>
            <Link to="/events">
              <Button variant={activePage === 'events' ? 'default' : 'ghost'} className="w-full justify-start">
                Events
              </Button>
            </Link>
            <Link to="/store">
              <Button variant={activePage === 'store' ? 'default' : 'ghost'} className="w-full justify-start">
                Store
              </Button>
            </Link>
            <Link to="/points">
              <Button variant={activePage === 'points' ? 'default' : 'ghost'} className="w-full justify-start">
                CampusCoins
              </Button>
            </Link>
            <Link to="/about">
              <Button variant={activePage === 'about' ? 'default' : 'ghost'} className="w-full justify-start">
                About
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant={activePage === 'contact' ? 'default' : 'ghost'} className="w-full justify-start">
                Contact
              </Button>
            </Link>

            {isAuthenticated && (isAdmin() || isPrincipal()) && (
              <Link to="/admin">
                <Button variant={location.pathname.includes('/admin') ? 'default' : 'ghost'} className="w-full justify-start">
                  Admin Dashboard
                </Button>
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
