
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NotificationDropdown from '@/components/NotificationDropdown';
import { useAuth } from '@/contexts/AuthContext';

const NotificationButton: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const { isAuthenticated, getUserNotifications } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      const notifications = getUserNotifications();
      const unread = notifications.some(notification => !notification.read);
      setHasUnreadNotifications(unread);
    }
  }, [isAuthenticated, getUserNotifications]);
  
  return (
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
  );
};

export default NotificationButton;
