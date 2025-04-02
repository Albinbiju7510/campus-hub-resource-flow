
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MessageSquare, 
  Award, 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  Layers, 
  Activity 
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Mock data for activity distribution
const activityData = [
  { name: 'Academic', value: 35 },
  { name: 'Facility', value: 25 },
  { name: 'Events', value: 20 },
  { name: 'Attendance', value: 15 },
  { name: 'Other', value: 5 },
];

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Mock data for monthly points awarded
const monthlyPointsData = [
  { month: 'Jan', points: 120 },
  { month: 'Feb', points: 180 },
  { month: 'Mar', points: 200 },
  { month: 'Apr', points: 250 },
  { month: 'May', points: 300 },
  { month: 'Jun', points: 220 },
];

const AdminDashboard = () => {
  const { user, users, isAdmin, isPrincipal } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'analytics'>('overview');
  
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
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/')}>Return to Home</Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }
  
  // Get counts of users by role
  const studentCount = users.filter(u => u.role === 'student').length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const principalCount = users.filter(u => u.role === 'principal').length;
  
  // Get total points awarded
  const totalPoints = users.reduce((sum, user) => sum + user.points, 0);
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-campus-primary">
              {isPrincipal() ? 'Principal Dashboard' : 'Admin Dashboard'}
            </h1>
            <p className="text-gray-600">
              Manage campus resources, users, and communication
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              variant={selectedTab === 'overview' ? 'default' : 'outline'} 
              onClick={() => setSelectedTab('overview')}
            >
              Overview
            </Button>
            <Button 
              variant={selectedTab === 'analytics' ? 'default' : 'outline'} 
              onClick={() => setSelectedTab('analytics')}
            >
              Analytics
            </Button>
          </div>
        </div>
        
        {selectedTab === 'overview' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Total Students</p>
                      <p className="text-3xl font-bold">{studentCount}</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-green-600">Total Points Awarded</p>
                      <p className="text-3xl font-bold">{totalPoints}</p>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Resources</p>
                      <p className="text-3xl font-bold">18</p>
                    </div>
                    <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Layers className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Active Bookings</p>
                      <p className="text-3xl font-bold">7</p>
                    </div>
                    <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/admin/users')}>
                <CardHeader className="bg-campus-primary text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" /> User Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p>View and manage all registered users including students, admins, and principal.</p>
                  <div className="mt-4 flex justify-between text-sm">
                    <span className="text-gray-500">Total Users: {users.length}</span>
                    <span className="text-campus-primary">View Details →</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/admin/users')}>
                    Manage Users
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/admin/messaging')}>
                <CardHeader className="bg-campus-primary text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" /> Messaging System
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p>Send notifications and messages to students, faculty and staff.</p>
                  <div className="mt-4 flex justify-between text-sm">
                    <span className="text-gray-500">Target users by department or year</span>
                    <span className="text-campus-primary">View Details →</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/admin/messaging')}>
                    Send Messages
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/admin/points')}>
                <CardHeader className="bg-campus-primary text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" /> Points Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p>Manage and award points to students for facility usage and event participation.</p>
                  <div className="mt-4 flex justify-between text-sm">
                    <span className="text-gray-500">Convert points to rewards</span>
                    <span className="text-campus-primary">View Details →</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/admin/points')}>
                    Manage Points
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest activities across the campus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      id: 1, 
                      user: 'Alex Johnson', 
                      action: 'Earned 50 points for library usage', 
                      time: '2 hours ago',
                      icon: <BookOpen className="h-4 w-4" />
                    },
                    { 
                      id: 2, 
                      user: 'Admin User', 
                      action: 'Sent announcement to Computer Science department', 
                      time: '3 hours ago',
                      icon: <MessageSquare className="h-4 w-4" />
                    },
                    { 
                      id: 3, 
                      user: 'Shreya Patel', 
                      action: 'Booked Computer Lab for Saturday', 
                      time: '5 hours ago',
                      icon: <Calendar className="h-4 w-4" />
                    },
                    { 
                      id: 4, 
                      user: 'Principal', 
                      action: 'Added 100 points to Student Council members', 
                      time: '1 day ago',
                      icon: <Award className="h-4 w-4" />
                    },
                  ].map(activity => (
                    <div key={activity.id} className="flex items-start p-3 hover:bg-gray-50 rounded-md">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" size="sm">View All Activities</Button>
              </CardFooter>
            </Card>
          </>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Points Distribution by Category</CardTitle>
                  <CardDescription>Breakdown of points awarded by activity type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={activityData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {activityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Points Awarded</CardTitle>
                  <CardDescription>Total points awarded per month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyPointsData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="points" fill="#8884d8" name="Points Awarded" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Student Engagement Metrics</CardTitle>
                <CardDescription>Key performance indicators for student participation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Facility Usage</h3>
                        <p className="text-sm text-gray-500">Growth from last month</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-2xl font-bold">+24%</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Activity className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Active Students</h3>
                        <p className="text-sm text-gray-500">Students with 100+ points</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-2xl font-bold">65%</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Event Participation</h3>
                        <p className="text-sm text-gray-500">Average per student</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-2xl font-bold">3.2</span>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
