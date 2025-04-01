
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, Bell, Award, LogOut, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isAdmin, isPrincipal } = useAuth();

  // Active link styling helper
  const isActive = (path: string) => {
    return location.pathname === path ? 'border-campus-primary text-campus-primary' : 'border-transparent text-gray-700 hover:text-campus-primary hover:border-campus-primary';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`${isAuthenticated ? 'bg-white' : 'bg-gradient-to-r from-blue-50 to-indigo-50'} shadow-sm sticky top-0 z-50`}>
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
              {isAuthenticated ? (
                <>
                  <Link to="/notifications" className={`${isActive('/notifications')} border-b-2 px-1 pt-1 pb-3 text-sm font-medium`}>
                    Notifications
                  </Link>
                  <Link to="/points" className={`${isActive('/points')} border-b-2 px-1 pt-1 pb-3 text-sm font-medium`}>
                    Points
                  </Link>
                  {(isAdmin() || isPrincipal()) && (
                    <Link to="/admin" className={`${isActive('/admin')} border-b-2 px-1 pt-1 pb-3 text-sm font-medium`}>
                      Dashboard
                    </Link>
                  )}
                </>
              ) : null}
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
              {isAuthenticated ? (
                <>
                  <Link to="/notifications">
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-red-500">3</Badge>
                    </Button>
                  </Link>
                  <Link to="/points">
                    <Button variant="ghost" size="icon" className="relative">
                      <Award className="h-5 w-5" />
                      {user?.points ? (
                        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full px-1.5 py-0.5">
                          {user.points}
                        </span>
                      ) : null}
                    </Button>
                  </Link>
                  {(isAdmin() || isPrincipal()) && (
                    <Link to="/admin">
                      <Button variant="ghost" size="icon">
                        <ShieldAlert className="h-5 w-5" />
                      </Button>
                    </Link>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-campus-primary text-white">
                            {user?.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/account')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      {(isAdmin() || isPrincipal()) && (
                        <DropdownMenuItem onClick={() => navigate('/admin')}>
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex space-x-2">
                  <Link to="/login">
                    <Button variant="outline">Log in</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Sign up</Button>
                  </Link>
                </div>
              )}
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
          {isAuthenticated && (
            <>
              <Link to="/notifications" className={`${isActive('/notifications') ? 'bg-campus-light border-campus-primary text-campus-primary' : 'border-transparent text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Notifications
              </Link>
              <Link to="/points" className={`${isActive('/points') ? 'bg-campus-light border-campus-primary text-campus-primary' : 'border-transparent text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                Points
              </Link>
              {(isAdmin() || isPrincipal()) && (
                <Link to="/admin" className={`${isActive('/admin') ? 'bg-campus-light border-campus-primary text-campus-primary' : 'border-transparent text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                  Admin Dashboard
                </Link>
              )}
            </>
          )}
          <Link to="/about" className={`${isActive('/about') ? 'bg-campus-light border-campus-primary text-campus-primary' : 'border-transparent text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            About
          </Link>
          <Link to="/contact" className={`${isActive('/contact') ? 'bg-campus-light border-campus-primary text-campus-primary' : 'border-transparent text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            Contact
          </Link>
          {!isAuthenticated && (
            <>
              <Link to="/login" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-300">
                Login
              </Link>
              <Link to="/signup" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-300">
                Sign Up
              </Link>
            </>
          )}
        </div>
        {isAuthenticated && (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-campus-primary flex items-center justify-center text-white">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name}</div>
                <div className="text-sm font-medium text-gray-500">{user?.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link to="/account" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Account
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
