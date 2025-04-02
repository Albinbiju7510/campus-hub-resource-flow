
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Bell, CheckCircle, Clock, Info, Mail, Send, User, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AdminMessaging = () => {
  const { user, users, isAdmin, isPrincipal, sendNotification } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messageTitle, setMessageTitle] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [targetAudience, setTargetAudience] = useState('all');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [urgentMessage, setUrgentMessage] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [messageType, setMessageType] = useState<'info' | 'alert' | 'success'>('info');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('compose');
  const [sentMessages, setSentMessages] = useState<Array<{
    id: string;
    title: string;
    body: string;
    audience: string;
    date: string;
    sender: string;
    type: 'info' | 'alert' | 'success';
  }>>([
    {
      id: 'm1',
      title: 'Library Extended Hours',
      body: 'The main library will be open until midnight during finals week (May 1-7).',
      audience: 'All Users',
      date: new Date().toISOString(),
      sender: 'Admin',
      type: 'info'
    },
    {
      id: 'm2',
      title: 'Scheduled Maintenance',
      body: 'The science lab will be closed for maintenance on April 30th.',
      audience: 'Science Department',
      date: new Date(Date.now() - 86400000).toISOString(),
      sender: 'Admin',
      type: 'alert'
    }
  ]);
  
  // Redirect if not admin or principal
  if (!isAdmin() && !isPrincipal()) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-12 px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">Access Denied</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You do not have permission to access this page.</p>
              <Button onClick={() => navigate('/')} className="mt-4">Return to Home</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  // Get unique departments from users
  const departments = Array.from(new Set(
    users.filter(u => u.department).map(u => u.department as string)
  ));
  
  // Get unique years from student users
  const years = Array.from(new Set(
    users.filter(u => u.year).map(u => u.year as string)
  ));
  
  const handleSendMessage = () => {
    if (!messageTitle.trim() || !messageBody.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide both a title and message content.",
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      if (user) {
        // Configure notification options based on targeting
        const notificationOptions: {
          type: 'info' | 'alert' | 'success' | 'message',
          targetUsers?: string[],
          targetDepartment?: string,
          targetYear?: string
        } = {
          type: urgentMessage ? 'alert' : messageType
        };
        
        // Set target audience
        switch (targetAudience) {
          case 'department':
            notificationOptions.targetDepartment = department;
            break;
          case 'year':
            notificationOptions.targetYear = year;
            break;
          case 'students': 
            notificationOptions.targetUsers = users
              .filter(u => u.role === 'student')
              .map(u => u.id);
            break;
          // 'all' is default, no targeting needed
        }
        
        // Send notification through context
        sendNotification(
          messageTitle,
          messageBody,
          `${user.name} (${user.role})`,
          notificationOptions
        );
        
        // Add to sent messages history
        const newMessage = {
          id: `m${Date.now()}`,
          title: messageTitle,
          body: messageBody,
          audience: getAudienceDescription(),
          date: new Date().toISOString(),
          sender: user.name,
          type: notificationOptions.type
        };
        
        setSentMessages(prev => [newMessage, ...prev]);
        
        toast({
          title: "Message Sent",
          description: `Your message has been sent to ${getAudienceDescription()}.`,
        });
        
        // Reset form
        setMessageTitle('');
        setMessageBody('');
        setTargetAudience('all');
        setDepartment('');
        setYear('');
        setUrgentMessage(false);
        setSendEmail(false);
        setMessageType('info');
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const getAudienceDescription = () => {
    switch (targetAudience) {
      case 'all':
        return 'All Users';
      case 'students':
        return 'All Students';
      case 'department':
        return `${department} Department`;
      case 'year':
        return `${year} Students`;
      default:
        return 'Selected Users';
    }
  };
  
  const getMessageTypeIcon = (type: string) => {
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
    return date.toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Messaging System</h1>
          <Button onClick={() => navigate('/admin')} variant="outline">Back to Dashboard</Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="compose">Compose Message</TabsTrigger>
            <TabsTrigger value="sent">Sent Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compose" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Send Notification</CardTitle>
                  <CardDescription>Create and send messages to campus users</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">Message Title</label>
                      <Input
                        id="title"
                        placeholder="Enter message title"
                        value={messageTitle}
                        onChange={(e) => setMessageTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message Content</label>
                      <Textarea
                        id="message"
                        placeholder="Enter your message"
                        rows={6}
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="type" className="text-sm font-medium">Message Type</label>
                      <Select value={messageType} onValueChange={(value) => setMessageType(value as 'info' | 'alert' | 'success')}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select message type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Information</SelectItem>
                          <SelectItem value="alert">Alert/Warning</SelectItem>
                          <SelectItem value="success">Success/Positive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="audience" className="text-sm font-medium">Target Audience</label>
                      <Select value={targetAudience} onValueChange={setTargetAudience}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select target audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="students">All Students</SelectItem>
                          <SelectItem value="department">Specific Department</SelectItem>
                          <SelectItem value="year">Specific Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {targetAudience === 'department' && (
                      <div className="space-y-2">
                        <label htmlFor="department" className="text-sm font-medium">Department</label>
                        <Select value={department} onValueChange={setDepartment}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    {targetAudience === 'year' && (
                      <div className="space-y-2">
                        <label htmlFor="year" className="text-sm font-medium">Year</label>
                        <Select value={year} onValueChange={setYear}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((yr) => (
                              <SelectItem key={yr} value={yr}>{yr}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="urgent"
                          checked={urgentMessage}
                          onCheckedChange={setUrgentMessage}
                        />
                        <Label htmlFor="urgent" className="cursor-pointer">Mark as Urgent</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="email"
                          checked={sendEmail}
                          onCheckedChange={setSendEmail}
                        />
                        <Label htmlFor="email" className="cursor-pointer">Also Send Email</Label>
                      </div>
                    </div>
                    
                    <Button
                      type="button"
                      className="w-full"
                      onClick={handleSendMessage}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Messaging Guidelines</CardTitle>
                  <CardDescription>Best practices for effective communication</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 list-disc pl-5">
                    <li>
                      <strong>Be Clear and Concise:</strong> Keep your messages clear and to the point.
                    </li>
                    <li>
                      <strong>Important Information First:</strong> Place the most important information at the beginning of your message.
                    </li>
                    <li>
                      <strong>Avoid All Caps:</strong> Using all capital letters can come across as shouting.
                    </li>
                    <li>
                      <strong>Include Action Items:</strong> Clearly state any actions required from the recipients.
                    </li>
                    <li>
                      <strong>Target Your Audience:</strong> Only send messages to relevant users to prevent notification fatigue.
                    </li>
                    <li>
                      <strong>Proofread:</strong> Check your message for spelling and grammar errors before sending.
                    </li>
                  </ul>
                  
                  <div className="mt-8 p-4 bg-blue-50 rounded-md border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">Notification Distribution</h3>
                    <p className="text-blue-700 text-sm">
                      Notifications will be delivered to all users immediately and will be available in their notification feed. 
                      For urgent matters requiring immediate attention, select the "Mark as Urgent" option, which will highlight the notification in recipients' feeds.
                    </p>
                  </div>
                  
                  <div className="mt-4 p-4 bg-yellow-50 rounded-md border border-yellow-200">
                    <h3 className="font-semibold text-yellow-800 mb-2">Email Delivery</h3>
                    <p className="text-yellow-700 text-sm">
                      When you select "Also Send Email", recipients will receive this message via email in addition to the in-app notification.
                      Use this option sparingly for important communications only.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sent">
            <Card>
              <CardHeader>
                <CardTitle>Sent Messages History</CardTitle>
                <CardDescription>Review previously sent notifications and messages</CardDescription>
              </CardHeader>
              <CardContent>
                {sentMessages.length > 0 ? (
                  <div className="space-y-4">
                    {sentMessages.map((message) => (
                      <Card key={message.id} className="overflow-hidden border-l-4 border-l-blue-500">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              {getMessageTypeIcon(message.type)}
                              <CardTitle className="ml-2 text-lg">{message.title}</CardTitle>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="bg-gray-100">
                                {message.audience}
                              </Badge>
                              <span className="text-sm text-gray-500 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatDate(message.date)}
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-gray-700">{message.body}</p>
                        </CardContent>
                        <CardFooter className="pt-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            <span>Sent by: {message.sender}</span>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">No messages sent yet</h3>
                    <p className="text-gray-400">Messages you send will appear here for future reference.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminMessaging;
