
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Bell, Info, AlertTriangle, CheckCircle, Mail, User, Calendar, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface NotificationDisplay {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'alert' | 'success' | 'message';
  date: string;
  read: boolean;
  sender?: string;
}

const Notifications = () => {
  const { user, getUserNotifications, markNotificationAsRead } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationDisplay[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  // Fetch notifications for the current user
  useEffect(() => {
    if (user) {
      const userNotifications = getUserNotifications();
      
      const formattedNotifications = userNotifications.map(notification => ({
        id: notification.id,
        title: notification.title,
        message: notification.body,
        type: notification.type,
        date: new Date(notification.timestamp).toISOString(),
        read: notification.read,
        sender: notification.sender
      }));
      
      setNotifications(formattedNotifications);
    }
  }, [user, getUserNotifications]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'message':
        return <Mail className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id);
    
    // Update local state
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    
    toast({
      title: "Notification marked as read",
      description: "This notification has been marked as read."
    });
  };

  const handleMarkAllAsRead = () => {
    // Mark all notifications as read in context
    notifications.forEach(notification => {
      if (!notification.read) {
        markNotificationAsRead(notification.id);
      }
    });
    
    // Update local state
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read."
    });
  };

  const handleDeleteNotification = (id: string) => {
    // Remove from local state only
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
    
    toast({
      title: "Notification deleted",
      description: "This notification has been removed from your list."
    });
  };

  const handleDeleteAllNotifications = () => {
    // Clear all notifications from local state
    setNotifications([]);
    
    toast({
      title: "All notifications deleted",
      description: "All notifications have been cleared from your list."
    });
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-campus-primary mb-2">Notifications</h1>
            <p className="text-gray-600">Stay updated with important campus announcements and alerts</p>
          </div>
          {unreadCount > 0 && (
            <div className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              <Bell className="h-5 w-5 mr-2" />
              <span>{unreadCount} unread</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="info">Announcements</TabsTrigger>
                <TabsTrigger value="message">Messages</TabsTrigger>
                <TabsTrigger value="success">Points</TabsTrigger>
              </TabsList>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                  Mark All as Read
                </Button>
                <Button variant="outline" size="sm" onClick={handleDeleteAllNotifications} className="text-red-500 border-red-200 hover:bg-red-50">
                  Clear All
                </Button>
              </div>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map(notification => (
                  <Card key={notification.id} className={`mb-4 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {getIcon(notification.type)}
                          <CardTitle className="ml-2 text-lg">{notification.title}</CardTitle>
                          {!notification.read && (
                            <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                              New
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{formatDate(notification.date)}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-gray-700 mb-2">{notification.message}</p>
                      {notification.sender && (
                        <div className="flex items-center text-gray-500 text-sm mt-2">
                          <User className="h-4 w-4 mr-1" />
                          <span>From: {notification.sender}</span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-end pt-2 space-x-2">
                      {!notification.read && (
                        <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                          Mark as Read
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700" 
                        onClick={() => handleDeleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500">No notifications</h3>
                  <p className="text-gray-400">You don't have any {activeTab !== 'all' ? activeTab : ''} notifications at the moment.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
