
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, Award } from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAdmin, isPrincipal } = useAuth();
  const navigate = useNavigate();
  
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
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">
          {isPrincipal() ? 'Principal Dashboard' : 'Admin Dashboard'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/admin/users')}>
            <CardHeader className="bg-campus-primary text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" /> User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p>View and manage all registered users including students, admins, and principal.</p>
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
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate('/admin/points')}>
                Manage Points
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
