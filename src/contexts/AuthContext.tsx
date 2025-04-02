
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'principal';
  department?: string;
  year?: string;
  points: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (userData: Omit<User, 'id' | 'points'> & { password: string }) => boolean;
  logout: () => void;
  updatePoints: (points: number) => void;
  isAdmin: () => boolean;
  isPrincipal: () => boolean;
  users: Array<User & { password: string }>;
  sendNotification: (title: string, body: string, sender: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => false,
  signup: () => false,
  logout: () => {},
  updatePoints: () => {},
  isAdmin: () => false,
  isPrincipal: () => false,
  users: [],
  sendNotification: () => {},
});

// Local storage keys
const USER_STORAGE_KEY = 'campushub-user';
const USERS_STORAGE_KEY = 'campushub-users';
const NOTIFICATIONS_STORAGE_KEY = 'campushub-notifications';

interface Notification {
  id: string;
  title: string;
  body: string;
  sender: string;
  timestamp: number;
  read: boolean;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Array<User & { password: string }>>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    const storedNotifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Initialize with sample users if no users exist
      const initialUsers = [
        {
          id: 'u1',
          name: 'Alex Johnson',
          email: 'alex@example.com',
          password: 'password123',
          role: 'student' as const,
          department: 'Computer Science',
          year: '3rd Year',
          points: 135
        },
        {
          id: 'u2',
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'admin123',
          role: 'admin' as const,
          department: 'Administration',
          points: 0
        },
        {
          id: 'u3',
          name: 'Principal',
          email: 'principal@example.com',
          password: 'principal123',
          role: 'principal' as const,
          department: 'Administration',
          points: 0
        }
      ];
      
      setUsers(initialUsers);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
    }

    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      // Initialize with empty notifications
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify([]));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const signup = (userData: Omit<User, 'id' | 'points'> & { password: string }): boolean => {
    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      return false;
    }
    
    const newUser = {
      ...userData,
      id: `u${users.length + 1}`,
      points: 0
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
    // Auto-login after signup
    const { password, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    
    // Update localStorage
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const updatePoints = (points: number) => {
    if (user) {
      const updatedUser = { ...user, points: user.points + points };
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      
      // Also update in users array
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          return { ...u, points: u.points + points };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    }
  };

  // Helper function to check if the current user is an admin
  const isAdmin = (): boolean => {
    return user?.role === 'admin';
  };

  // Helper function to check if the current user is a principal
  const isPrincipal = (): boolean => {
    return user?.role === 'principal';
  };

  // Function to send a notification to users
  const sendNotification = (title: string, body: string, sender: string) => {
    const newNotification: Notification = {
      id: `n${Date.now()}`,
      title,
      body,
      sender,
      timestamp: Date.now(),
      read: false
    };

    const updatedNotifications = [...notifications, newNotification];
    setNotifications(updatedNotifications);
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        signup, 
        logout, 
        updatePoints, 
        isAdmin, 
        isPrincipal,
        users,
        sendNotification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
