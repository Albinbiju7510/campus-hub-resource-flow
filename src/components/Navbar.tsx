
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-campus-primary">CampusHub</span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-700 hover:text-campus-primary border-b-2 hover:border-campus-primary px-1 pt-1 pb-3 text-sm font-medium">
                Home
              </Link>
              <Link to="/resources" className="border-transparent text-gray-700 hover:text-campus-primary border-b-2 hover:border-campus-primary px-1 pt-1 pb-3 text-sm font-medium">
                Resources
              </Link>
              <Link to="/booking" className="border-transparent text-gray-700 hover:text-campus-primary border-b-2 hover:border-campus-primary px-1 pt-1 pb-3 text-sm font-medium">
                Booking
              </Link>
              <Link to="/about" className="border-transparent text-gray-700 hover:text-campus-primary border-b-2 hover:border-campus-primary px-1 pt-1 pb-3 text-sm font-medium">
                About
              </Link>
              <Link to="/contact" className="border-transparent text-gray-700 hover:text-campus-primary border-b-2 hover:border-campus-primary px-1 pt-1 pb-3 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:flex sm:items-center sm:space-x-2">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
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
          <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-campus-primary hover:text-campus-primary">
            Home
          </Link>
          <Link to="/resources" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-campus-primary hover:text-campus-primary">
            Resources
          </Link>
          <Link to="/booking" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-campus-primary hover:text-campus-primary">
            Booking
          </Link>
          <Link to="/about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-campus-primary hover:text-campus-primary">
            About
          </Link>
          <Link to="/contact" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-campus-primary hover:text-campus-primary">
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
              <div className="text-base font-medium text-gray-800">Login / Sign Up</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
