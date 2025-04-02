
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const AdminMessaging = () => {
  const { user, users, isAdmin, isPrincipal, sendNotification } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messageTitle, setMessageTitle] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [targetAudience, setTargetAudience] = useState('all');
  const [department, setDepartment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
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
      // Send notification
      if (user) {
        sendNotification(
          messageTitle,
          messageBody,
          `${user.name} (${user.role})`
        );
        
        toast({
          title: "Message Sent",
          description: `Your message has been sent to ${targetAudience === 'all' ? 'all users' : `${department} department`}.`,
        });
        
        // Reset form
        setMessageTitle('');
        setMessageBody('');
        setTargetAudience('all');
        setDepartment('');
      }
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Messaging System</h1>
          <Button onClick={() => navigate('/admin')} variant="outline">Back to Dashboard</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Send Notification</CardTitle>
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
                  <label htmlFor="audience" className="text-sm font-medium">Target Audience</label>
                  <Select value={targetAudience} onValueChange={setTargetAudience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="students">All Students</SelectItem>
                      <SelectItem value="department">Specific Department</SelectItem>
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
                
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleSendMessage}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Messaging Guidelines</CardTitle>
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
                  For urgent matters requiring immediate attention, consider using additional communication channels.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminMessaging;
