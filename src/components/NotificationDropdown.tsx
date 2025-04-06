
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Info, AlertTriangle, CheckCircle, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationReactions from './NotificationReactions';

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const { getUserNotifications, markNotificationAsRead } = useAuth();
  const notifications = getUserNotifications();

  useEffect(() => {
    // Handle click outside to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('notification-dropdown');
      if (dropdown && !dropdown.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return format(date, 'MMM d, h:mm a');
  };

  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id);
  };

  return (
    <Card
      id="notification-dropdown"
      className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto shadow-lg z-50 p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <Badge variant="secondary">
          {notifications.length}
        </Badge>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-6 text-gray-500">No notifications yet</div>
      ) : (
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`py-3 px-3 mb-2 rounded-md ${
                !notification.read ? 'bg-blue-50' : 'bg-gray-50'
              }`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <div className="flex">
                <div className="mr-3 mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm">{notification.title}</h3>
                    {!notification.read && (
                      <Badge className="ml-2 bg-blue-500 text-[10px] px-1.5">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.body}</p>
                  
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <div>
                      <span>From: {notification.sender}</span>
                      <span className="block">{formatTimestamp(notification.timestamp)}</span>
                    </div>
                  </div>
                  
                  <NotificationReactions 
                    notificationId={notification.id}
                    currentReaction={null} // This would come from database in real implementation
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
      
      <div className="text-center mt-2">
        <button
          className="text-sm text-campus-secondary hover:text-campus-primary"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Card>
  );
};

export default NotificationDropdown;
