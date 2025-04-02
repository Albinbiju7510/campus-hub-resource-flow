
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'principal';
  department?: string;
  year?: string;
  points: number;
  profileImage?: string;
  activityHistory?: ActivityRecord[];
}

interface ActivityRecord {
  id: string;
  type: string;
  description: string;
  pointsEarned: number;
  timestamp: number;
  category: string;
}

interface Notification {
  id: string;
  title: string;
  body: string;
  sender: string;
  timestamp: number;
  read: boolean;
  targetUsers?: string[]; // IDs of users who should receive this notification
  targetDepartment?: string;
  targetYear?: string;
  type: 'info' | 'alert' | 'success' | 'message';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (userData: Omit<User, 'id' | 'points' | 'activityHistory'> & { password: string }) => boolean;
  logout: () => void;
  updatePoints: (points: number, category: string, description: string) => void;
  updateProfileImage: (imageUrl: string) => void;
  isAdmin: () => boolean;
  isPrincipal: () => boolean;
  users: Array<User & { password: string }>;
  sendNotification: (title: string, body: string, sender: string, options?: {
    targetUsers?: string[],
    targetDepartment?: string,
    targetYear?: string,
    type?: 'info' | 'alert' | 'success' | 'message'
  }) => void;
  getUserNotifications: () => Notification[];
  markNotificationAsRead: (notificationId: string) => void;
  getActivityHistory: () => ActivityRecord[];
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => false,
  signup: () => false,
  logout: () => {},
  updatePoints: () => {},
  updateProfileImage: () => {},
  isAdmin: () => false,
  isPrincipal: () => false,
  users: [],
  sendNotification: () => {},
  getUserNotifications: () => [],
  markNotificationAsRead: () => {},
  getActivityHistory: () => [],
});

// Local storage keys
const USER_STORAGE_KEY = 'campushub-user';
const USERS_STORAGE_KEY = 'campushub-users';
const NOTIFICATIONS_STORAGE_KEY = 'campushub-notifications';

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
          points: 135,
          profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
          activityHistory: [
            {
              id: 'a1',
              type: 'Library Usage',
              description: 'Used the library for 3 hours',
              pointsEarned: 15,
              timestamp: Date.now() - 86400000 * 3,
              category: 'facility'
            },
            {
              id: 'a2',
              type: 'Event Participation',
              description: 'Participated in Tech Fest 2023',
              pointsEarned: 50,
              timestamp: Date.now() - 86400000 * 10,
              category: 'event'
            }
          ]
        },
        {
          id: 'u2',
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'admin123',
          role: 'admin' as const,
          department: 'Administration',
          points: 0,
          profileImage: 'https://randomuser.me/api/portraits/men/44.jpg'
        },
        {
          id: 'u3',
          name: 'Principal',
          email: 'principal@example.com',
          password: 'principal123',
          role: 'principal' as const,
          department: 'Administration',
          points: 0,
          profileImage: 'https://randomuser.me/api/portraits/men/65.jpg'
        }
      ];
      
      setUsers(initialUsers);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
    }

    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      // Initialize with sample notifications
      const initialNotifications: Notification[] = [
        {
          id: 'n1',
          title: 'Library Extended Hours',
          body: 'The main library will be open until 10:00 PM during exam week (May 1-7).',
          sender: 'Administration',
          timestamp: Date.now() - 86400000,
          read: false,
          type: 'info'
        },
        {
          id: 'n2',
          title: 'Campus Store Sale',
          body: 'Enjoy 20% off on all campus merchandise this weekend!',
          sender: 'Campus Store',
          timestamp: Date.now() - 86400000 * 2,
          read: false,
          type: 'info'
        }
      ];
      setNotifications(initialNotifications);
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(initialNotifications));
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

  const signup = (userData: Omit<User, 'id' | 'points' | 'activityHistory'> & { password: string }): boolean => {
    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      return false;
    }
    
    const newUser = {
      ...userData,
      id: `u${users.length + 1}`,
      points: 0,
      activityHistory: []
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

  const updatePoints = (points: number, category: string, description: string) => {
    if (user) {
      // Create new activity record
      const newActivity: ActivityRecord = {
        id: `a${Date.now()}`,
        type: category,
        description,
        pointsEarned: points,
        timestamp: Date.now(),
        category: category.toLowerCase().includes('event') ? 'event' : 
                 category.toLowerCase().includes('academ') ? 'academic' : 
                 category.toLowerCase().includes('library') || category.toLowerCase().includes('lab') ? 'facility' : 'other'
      };

      // Update user history and points
      const updatedHistory = user.activityHistory ? [...user.activityHistory, newActivity] : [newActivity];
      
      const updatedUser = { 
        ...user, 
        points: user.points + points,
        activityHistory: updatedHistory
      };
      
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      
      // Also update in users array
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          return { 
            ...u, 
            points: u.points + points,
            activityHistory: updatedHistory
          };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    }
  };

  const updateProfileImage = (imageUrl: string) => {
    if (user) {
      const updatedUser = { ...user, profileImage: imageUrl };
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      
      // Also update in users array
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          return { ...u, profileImage: imageUrl };
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
  const sendNotification = (title: string, body: string, sender: string, options?: {
    targetUsers?: string[],
    targetDepartment?: string,
    targetYear?: string,
    type?: 'info' | 'alert' | 'success' | 'message'
  }) => {
    const newNotification: Notification = {
      id: `n${Date.now()}`,
      title,
      body,
      sender,
      timestamp: Date.now(),
      read: false,
      type: options?.type || 'info',
      ...(options?.targetUsers && { targetUsers: options.targetUsers }),
      ...(options?.targetDepartment && { targetDepartment: options.targetDepartment }),
      ...(options?.targetYear && { targetYear: options.targetYear })
    };

    const updatedNotifications = [...notifications, newNotification];
    setNotifications(updatedNotifications);
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
  };

  // Function to get notifications for the current user
  const getUserNotifications = () => {
    if (!user) return [];
    
    return notifications.filter(notification => {
      // If notification has specific target users, check if current user is included
      if (notification.targetUsers?.length) {
        return notification.targetUsers.includes(user.id);
      }
      
      // If notification targets a specific department
      if (notification.targetDepartment && user.department) {
        return notification.targetDepartment === user.department;
      }
      
      // If notification targets a specific year (for students)
      if (notification.targetYear && user.year) {
        return notification.targetYear === user.year;
      }
      
      // If no targeting specified, assume it's for everyone
      return true;
    });
  };

  // Function to mark a notification as read
  const markNotificationAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId ? { ...notification, read: true } : notification
    );
    
    setNotifications(updatedNotifications);
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
  };

  // Function to get activity history for the current user
  const getActivityHistory = () => {
    return user?.activityHistory || [];
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
        updateProfileImage,
        isAdmin, 
        isPrincipal,
        users,
        sendNotification,
        getUserNotifications,
        markNotificationAsRead,
        getActivityHistory
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
