
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Bell, Info, AlertTriangle, CheckCircle, Mail, User, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'alert' | 'success' | 'message';
  date: string;
  read: boolean;
  sender?: string;
}

const Notifications = () => {
  const { user, users } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  // Fetch notifications from localStorage
  useEffect(() => {
    const storedNotifications = localStorage.getItem('campushub-notifications');
    if (storedNotifications) {
      const parsedNotifications = JSON.parse(storedNotifications);
      setNotifications(parsedNotifications);
    } else {
      // Sample notifications if none exist
      const initialNotifications: Notification[] = [
        {
          id: 'n1',
          title: 'Library Extended Hours',
          message: 'The main library will be open until midnight during finals week (May 1-7).',
          type: 'info',
          date: new Date().toISOString(),
          read: false,
          sender: 'Administration'
        },
        {
          id: 'n2',
          title: 'Campus Store Sale',
          message: 'Enjoy 20% off on all campus merchandise this weekend!',
          type: 'info',
          date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          read: false,
          sender: 'Campus Store'
        },
        {
          id: 'n3',
          title: 'Scheduled Maintenance',
          message: 'The science lab will be closed for maintenance on April 30th.',
          type: 'alert',
          date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          read: true,
          sender: 'Facilities Department'
        },
        {
          id: 'n4',
          title: 'Points Added',
          message: 'You earned 50 points for attending the campus cleanup event!',
          type: 'success',
          date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          read: true
        },
        {
          id: 'n5',
          title: 'Welcome Message',
          message: 'Welcome to CampusHub! We\'re excited to have you join our platform.',
          type: 'message',
          date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
          read: true,
          sender: 'Principal'
        }
      ];
      setNotifications(initialNotifications);
      localStorage.setItem('campushub-notifications', JSON.stringify(initialNotifications));
    }
  }, []);

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

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('campushub-notifications', JSON.stringify(updatedNotifications));
    toast({
      title: "Notification marked as read",
      description: "This notification has been marked as read."
    });
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem('campushub-notifications', JSON.stringify(updatedNotifications));
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read."
    });
  };

  const deleteNotification = (id: string) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem('campushub-notifications', JSON.stringify(updatedNotifications));
    toast({
      title: "Notification deleted",
      description: "This notification has been removed."
    });
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem('campushub-notifications', JSON.stringify([]));
    toast({
      title: "All notifications deleted",
      description: "All notifications have been cleared."
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
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark All as Read
                </Button>
                <Button variant="outline" size="sm" onClick={deleteAllNotifications} className="text-red-500 border-red-200 hover:bg-red-50">
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
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                          Mark as Read
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => deleteNotification(notification.id)}>
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
