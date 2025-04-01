
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { User, Settings, Bell, Award, BookOpen, LogOut, Users, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'student' | 'admin' | 'principal';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  year?: string;
  points?: number;
}

// Mock user data - in a real app, this would come from an auth system
const currentUser: UserProfile = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex.johnson@campus.edu',
  role: 'student',
  department: 'Computer Science',
  year: '3rd Year',
  points: 135
};

const Account = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  
  const handleRoleChange = (role: UserRole) => {
    // This is just for demo purposes - in a real app, role changing would be through auth
    toast({
      title: "Role Changed",
      description: `Switched to ${role} view. In a real app, this would be controlled by authentication.`,
    });
  };

  const getRoleContent = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Resource Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Manage all campus resources and bookings</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Manage</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Oversee user accounts and permissions</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Manage</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Send Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Broadcast messages to all or select users</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Create</Button>
              </CardFooter>
            </Card>
          </div>
        );
      
      case 'principal':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Usage Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">View detailed reports on campus resource usage</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Reports</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Administrative Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Approve or deny important resource changes</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Requests</Button>
              </CardFooter>
            </Card>
          </div>
        );
      
      case 'student':
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">My Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">View and manage your upcoming bookings</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">My Points</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">You have {currentUser.points} points to redeem</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Redeem</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">You have 3 unread notifications</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View</Button>
              </CardFooter>
            </Card>
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-campus-primary mb-2">Account</h1>
            <p className="text-gray-600">Manage your profile and preferences</p>
          </div>
          
          {/* Role Switcher (for demo purposes) */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">View As:</span>
            <div className="flex space-x-1">
              <Button 
                variant={currentUser.role === 'student' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleRoleChange('student')}
                className="flex items-center"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Student
              </Button>
              <Button 
                variant={currentUser.role === 'admin' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleRoleChange('admin')}
                className="flex items-center"
              >
                <Users className="h-4 w-4 mr-1" />
                Admin
              </Button>
              <Button 
                variant={currentUser.role === 'principal' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => handleRoleChange('principal')}
                className="flex items-center"
              >
                <Briefcase className="h-4 w-4 mr-1" />
                Principal
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 bg-campus-primary text-white">
            <div className="flex items-center">
              <div className="h-20 w-20 rounded-full bg-white text-campus-primary flex items-center justify-center mr-6">
                <User className="h-12 w-12" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                <p>{currentUser.email}</p>
                <div className="flex items-center mt-1">
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                    {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{currentUser.department}</span>
                  {currentUser.year && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{currentUser.year}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Role-specific dashboard */}
          <div className="p-6">
            {getRoleContent(currentUser.role)}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center justify-center">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center justify-center">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="points" className="flex items-center justify-center">
              <Award className="h-4 w-4 mr-2" />
              Points
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center justify-center">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <input type="text" className="w-full mt-1 p-2 border rounded-md" defaultValue={currentUser.name} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input type="email" className="w-full mt-1 p-2 border rounded-md" defaultValue={currentUser.email} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Department</label>
                    <input type="text" className="w-full mt-1 p-2 border rounded-md" defaultValue={currentUser.department} />
                  </div>
                  {currentUser.year && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Year</label>
                      <input type="text" className="w-full mt-1 p-2 border rounded-md" defaultValue={currentUser.year} />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control when and how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive email updates about your bookings and campus news</p>
                    </div>
                    <div className="h-6 w-12 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer">
                      <div className="h-4 w-4 bg-white rounded-full transform translate-x-6"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Booking Reminders</h4>
                      <p className="text-sm text-gray-600">Get reminded before your scheduled bookings</p>
                    </div>
                    <div className="h-6 w-12 bg-campus-primary rounded-full flex items-center p-1 cursor-pointer">
                      <div className="h-4 w-4 bg-white rounded-full transform translate-x-6"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Point Alerts</h4>
                      <p className="text-sm text-gray-600">Be notified when you earn or can redeem points</p>
                    </div>
                    <div className="h-6 w-12 bg-campus-primary rounded-full flex items-center p-1 cursor-pointer">
                      <div className="h-4 w-4 bg-white rounded-full transform translate-x-6"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="points">
            <Card>
              <CardHeader>
                <CardTitle>Points Summary</CardTitle>
                <CardDescription>View your points history and redemptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="h-10 w-10 text-campus-primary mr-4" />
                      <div>
                        <p className="text-sm text-gray-600">Total Points</p>
                        <h2 className="text-2xl font-bold">{currentUser.points}</h2>
                      </div>
                    </div>
                    <Button>Redeem Points</Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <span>Attended Campus Cleanup Event</span>
                      <span className="text-green-600 font-medium">+50 pts</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <span>Used Study Room for 2 hours</span>
                      <span className="text-green-600 font-medium">+10 pts</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <span>Borrowed 3 Books from Library</span>
                      <span className="text-green-600 font-medium">+15 pts</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Full History</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Change Password</h4>
                  <div className="space-y-3">
                    <input type="password" placeholder="Current Password" className="w-full p-2 border rounded-md" />
                    <input type="password" placeholder="New Password" className="w-full p-2 border rounded-md" />
                    <input type="password" placeholder="Confirm New Password" className="w-full p-2 border rounded-md" />
                  </div>
                  <Button className="mt-3">Update Password</Button>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Danger Zone</h4>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h5 className="text-red-600 font-medium">Delete Account</h5>
                    <p className="text-sm text-gray-600 mb-3">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700">
                      <LogOut className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Account;
