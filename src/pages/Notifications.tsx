
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Bell, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'alert' | 'success';
  date: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 'n1',
    title: 'Library Extended Hours',
    message: 'The main library will be open until midnight during finals week (May 1-7).',
    type: 'info',
    date: '2023-04-25T14:30:00',
    read: false
  },
  {
    id: 'n2',
    title: 'Campus Store Sale',
    message: 'Enjoy 20% off on all campus merchandise this weekend!',
    type: 'info',
    date: '2023-04-24T09:15:00',
    read: false
  },
  {
    id: 'n3',
    title: 'Scheduled Maintenance',
    message: 'The science lab will be closed for maintenance on April 30th.',
    type: 'alert',
    date: '2023-04-23T16:45:00',
    read: true
  },
  {
    id: 'n4',
    title: 'Points Added',
    message: 'You earned 50 points for attending the campus cleanup event!',
    type: 'success',
    date: '2023-04-22T11:20:00',
    read: true
  },
  {
    id: 'n5',
    title: 'Booking Confirmed',
    message: 'Your study room reservation for April 28th has been confirmed.',
    type: 'success',
    date: '2023-04-21T13:10:00',
    read: true
  }
];

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className={`mb-4 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
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
        <p className="text-gray-700">{notification.message}</p>
      </CardContent>
      <CardFooter className="flex justify-end pt-2">
        {!notification.read && (
          <Button variant="ghost" size="sm">
            Mark as Read
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const Notifications = () => {
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Notifications</h2>
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
          </div>

          <div>
            {notifications.map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
