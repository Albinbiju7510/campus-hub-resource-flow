
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Search, Bell, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Active link styling helper
  const isActive = (path: string) => {
    return location.pathname === path ? 'border-campus-primary text-campus-primary' : 'border-transparent text-gray-700 hover:text-campus-primary hover:border-campus-primary';
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-campus-primary">CampusHub</span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/" className={`${isActive('/')} border-b-2 px-1 pt-1 pb-3 text-sm font-medium`}>
                Home
              </Link>
              <Link to="/resources" className={`${isActive('/resources')} border-b-2 px-1 pt-1 pb-3 text-sm font-medium`}>
                Resources
              </Link>
              <Link to="/notifications" className={`${isActive('/notifications')} border-b-2 px-1 pt-1 pb-3 text-sm font-medium`}>
                Notifications
              </Link>
              <Link to="/points" className={`${isActive('/points')} border-b-2 px-1 pt-1 pb-3 text-sm font-medium`}>
                Points
              </Link>
              <Link to="/about" className={`${isActive('/about')} border-b-2 px-1 pt-1 pb-3 text-sm font-medium`}>
                About
              </Link>
              <Link to="/contact" className={`${isActive('/contact')} border-b-2 px-1 pt-1 pb-3 text-sm font-medium`}>
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:flex sm:items-center sm:space-x-2">
              <Link to="/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-red-500">3</Badge>
                </Button>
              </Link>
              <Link to="/points">
                <Button variant="ghost" size="icon" className="relative">
                  <Award className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Link to="/account">
                <Button variant="outline" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </Button>
              </Link>
            </div>
            <div className="flex items-center sm:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-campus-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-campus-primary"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link to="/" className={`${isActive('/') ? 'bg-campus-light border-campus-primary text-campus-primary' : 'border-transparent text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            Home
          </Link>
          <Link to="/resources" className={`${isActive('/resources') ? 'bg-campus-light border-campus-primary text-campus-primary' : 'border-transparent text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            Resources
          </Link>
          <Link to="/notifications" className={`${isActive('/notifications') ? 'bg-campus-light border-campus-primary text-campus-primary' : 'border-transparent text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            Notifications
          </Link>
          <Link to="/points" className={`${isActive('/points') ? 'bg-campus-light border-campus-primary text-campus-primary' : 'border-transparent text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            Points
          </Link>
          <Link to="/about" className={`${isActive('/about') ? 'bg-campus-light border-campus-primary text-campus-primary' : 'border-transparent text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            About
          </Link>
          <Link to="/contact" className={`${isActive('/contact') ? 'bg-campus-light border-campus-primary text-campus-primary' : 'border-transparent text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            Contact
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-campus-primary flex items-center justify-center text-white">
                <User className="h-6 w-6" />
              </div>
            </div>
            <div className="ml-3">
              <Link to="/account" className="text-base font-medium text-gray-800">Account</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
