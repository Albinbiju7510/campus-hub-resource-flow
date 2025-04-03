
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Trash2, SendHorizontal, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from '@/components/ui/textarea';

const AdminUsers = () => {
  const { users, isAdmin, isPrincipal, deleteUser, sendNotification, user: currentUser, canAccessAdminDashboard } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null);
  const [messageSubject, setMessageSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  
  // Redirect if not admin or principal
  useEffect(() => {
    if (!canAccessAdminDashboard()) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access this page.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [canAccessAdminDashboard, navigate, toast]);
  
  if (!canAccessAdminDashboard()) {
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

  // Handle delete user confirmation
  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setShowDeleteConfirm(true);
  };

  // Handle actual user deletion
  const confirmDelete = () => {
    if (userToDelete) {
      const userToBeDeleted = users.find(u => u.id === userToDelete);
      const success = deleteUser(userToDelete);
      if (success) {
        toast({
          title: "User Deleted",
          description: `${userToBeDeleted?.name} has been removed from the system.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Delete Failed",
          description: "Could not delete this user. You cannot delete yourself or higher-ranked roles.",
        });
      }
    }
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  // Handle message dialog
  const handleMessageClick = (user: (typeof users)[0]) => {
    setSelectedUser(user);
    setMessageSubject('');
    setMessageBody('');
    setShowMessageDialog(true);
  };

  // Send notification to user
  const handleSendMessage = () => {
    if (!selectedUser || !messageSubject.trim() || !messageBody.trim()) {
      toast({
        variant: "destructive",
        title: "Message Error",
        description: "Please provide both a subject and message body.",
      });
      return;
    }

    sendNotification(
      messageSubject,
      messageBody,
      currentUser?.name || 'Administration',
      {
        targetUsers: [selectedUser.id],
        type: 'message'
      }
    );

    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${selectedUser.name}.`,
    });

    setShowMessageDialog(false);
    setSelectedUser(null);
    setMessageSubject('');
    setMessageBody('');
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
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              {user.profileImage ? (
                                <AvatarImage src={user.profileImage} alt={user.name} />
                              ) : null}
                              <AvatarFallback className="bg-campus-primary text-white">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.department || 'N/A'}</TableCell>
                        <TableCell>{user.year || 'N/A'}</TableCell>
                        <TableCell>{user.points}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleMessageClick(user)}
                              title="Send Message"
                            >
                              <SendHorizontal className="h-4 w-4" />
                            </Button>
                            {user.id !== currentUser?.id && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                onClick={() => handleDeleteClick(user.id)}
                                title="Delete User"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-gray-500">
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

      {/* Delete User Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Send Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Message to {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              This will send a notification directly to the user's inbox.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-4 py-2">
            <Avatar>
              {selectedUser?.profileImage ? (
                <AvatarImage src={selectedUser.profileImage} alt={selectedUser.name} />
              ) : (
                <AvatarFallback className="bg-campus-primary text-white">
                  {selectedUser?.name.charAt(0) || <User className="h-4 w-4" />}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="font-medium">{selectedUser?.name}</p>
              <p className="text-sm text-gray-500">{selectedUser?.email}</p>
            </div>
          </div>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <Input 
                id="subject" 
                value={messageSubject} 
                onChange={(e) => setMessageSubject(e.target.value)} 
                placeholder="Enter message subject"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea 
                id="message" 
                value={messageBody} 
                onChange={(e) => setMessageBody(e.target.value)} 
                rows={5} 
                placeholder="Type your message here..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMessageDialog(false)}>Cancel</Button>
            <Button onClick={handleSendMessage}>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AdminUsers;
