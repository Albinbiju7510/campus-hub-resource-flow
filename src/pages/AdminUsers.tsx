
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const AdminUsers = () => {
  const { users, isAdmin, isPrincipal } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
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
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower) ||
      (user.department && user.department.toLowerCase().includes(searchLower))
    );
  });
  
  // Role badge color mapping
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-blue-500';
      case 'principal':
        return 'bg-purple-500';
      case 'student':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">User Management</h1>
          <Button onClick={() => navigate('/admin')} variant="outline">Back to Dashboard</Button>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              All Registered Users
              <Badge className="ml-2 bg-blue-500">{users.length} Users</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by name, email, role, or department..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.department || 'N/A'}</TableCell>
                        <TableCell>{user.year || 'N/A'}</TableCell>
                        <TableCell>{user.points}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                        No users found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminUsers;
