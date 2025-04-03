
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Trash2, SendHorizontal, User, Check, X, MinusCircle, Clock } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminUsers = () => {
  const { users, isAdmin, isPrincipal, deleteUser, sendNotification, user: currentUser, canAccessAdminDashboard, approveUser, rejectUser, getPendingUsers, deductPoints, checkInactivity } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showDeductPointsDialog, setShowDeductPointsDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null);
  const [messageSubject, setMessageSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [pointsToDeduct, setPointsToDeduct] = useState<number>(0);
  const [deductionReason, setDeductionReason] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  
  // Get pending users
  const pendingUsers = getPendingUsers();
  
  // Check for user inactivity on component mount
  useEffect(() => {
    checkInactivity();
  }, []);
  
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
  
  const activeUsers = users.filter(u => u.role === 'student' && u.approved);
  
  // Filter users based on search term
  const filteredActiveUsers = activeUsers.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower) ||
      (user.department && user.department.toLowerCase().includes(searchLower)) ||
      (user.ktuid && user.ktuid.toLowerCase().includes(searchLower))
    );
  });
  
  const filteredPendingUsers = pendingUsers.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      (user.department && user.department.toLowerCase().includes(searchLower)) ||
      (user.ktuid && user.ktuid.toLowerCase().includes(searchLower))
    );
  });
  
  const adminUsers = users.filter(u => u.role === 'admin' || u.role === 'principal');
  
  const filteredAdminUsers = adminUsers.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower) ||
      (user.department && user.department.toLowerCase().includes(searchLower))
    );
  });
  
  // Format the last active date
  const formatLastActive = (timestamp?: number) => {
    if (!timestamp) return 'Never';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };
  
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
  
  // Handle approving a user
  const handleApproveUser = (userId: string) => {
    const success = approveUser(userId);
    if (success) {
      const approvedUser = pendingUsers.find(u => u.id === userId);
      toast({
        title: "User Approved",
        description: `${approvedUser?.name} can now log in to the system.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Approval Failed",
        description: "Could not approve this user.",
      });
    }
  };
  
  // Handle rejecting a user
  const handleRejectUser = (userId: string) => {
    const success = rejectUser(userId);
    if (success) {
      toast({
        title: "User Rejected",
        description: `The user has been removed from the system.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Rejection Failed",
        description: "Could not reject this user.",
      });
    }
  };
  
  // Handle deduct points dialog
  const handleDeductPointsClick = (user: (typeof users)[0]) => {
    setSelectedUser(user);
    setPointsToDeduct(0);
    setDeductionReason('');
    setShowDeductPointsDialog(true);
  };
  
  // Handle actual point deduction
  const handleDeductPoints = () => {
    if (!selectedUser || pointsToDeduct <= 0 || !deductionReason.trim()) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please provide a valid point amount and reason.",
      });
      return;
    }
    
    const success = deductPoints(selectedUser.id, pointsToDeduct, deductionReason);
    if (success) {
      toast({
        title: "Points Deducted",
        description: `${pointsToDeduct} points have been deducted from ${selectedUser.name}.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Deduction Failed",
        description: "Could not deduct points from this user.",
      });
    }
    
    setShowDeductPointsDialog(false);
    setSelectedUser(null);
    setPointsToDeduct(0);
    setDeductionReason('');
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
              User Management
              <Badge className="ml-2 bg-blue-500">{users.length} Total Users</Badge>
              {pendingUsers.length > 0 && (
                <Badge className="ml-2 bg-amber-500">{pendingUsers.length} Pending Approval</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by name, email, KTU ID, role, or department..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="active">
                  Active Students 
                  <Badge className="ml-2 bg-green-500">{activeUsers.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending Approval
                  {pendingUsers.length > 0 && (
                    <Badge className="ml-2 bg-amber-500">{pendingUsers.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="admins">
                  Admins & Principal
                  <Badge className="ml-2 bg-blue-500">{adminUsers.length}</Badge>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email / KTU ID</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredActiveUsers.length > 0 ? (
                        filteredActiveUsers.map((user) => (
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
                            <TableCell>
                              <div>
                                <p>{user.email}</p>
                                {user.ktuid && <p className="text-xs text-gray-500">KTU ID: {user.ktuid}</p>}
                              </div>
                            </TableCell>
                            <TableCell>{user.department || 'N/A'}</TableCell>
                            <TableCell>{user.year || 'N/A'}</TableCell>
                            <TableCell>{user.points}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-gray-400" />
                                <span className="text-sm">{formatLastActive(user.lastActive)}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleDeductPointsClick(user)}
                                  title="Deduct Points"
                                >
                                  <MinusCircle className="h-4 w-4 text-amber-500" />
                                </Button>
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
                            No active students found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="pending">
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email / KTU ID</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPendingUsers.length > 0 ? (
                        filteredPendingUsers.map((user) => (
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
                            <TableCell>
                              <div>
                                <p>{user.email}</p>
                                {user.ktuid && <p className="text-xs text-gray-500">KTU ID: {user.ktuid}</p>}
                              </div>
                            </TableCell>
                            <TableCell>{user.department || 'N/A'}</TableCell>
                            <TableCell>{user.year || 'N/A'}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleApproveUser(user.id)}
                                  className="text-green-600 border-green-600 hover:bg-green-50"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleRejectUser(user.id)}
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                            No pending approval requests found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="admins">
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAdminUsers.length > 0 ? (
                        filteredAdminUsers.map((user) => (
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
                            <TableCell>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-gray-400" />
                                <span className="text-sm">{formatLastActive(user.lastActive)}</span>
                              </div>
                            </TableCell>
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
                                {user.id !== currentUser?.id && isPrincipal() && user.role === 'admin' && (
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
                          <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                            No admin users found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
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
      
      {/* Deduct Points Dialog */}
      <Dialog open={showDeductPointsDialog} onOpenChange={setShowDeductPointsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deduct Points from {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              Specify how many points to deduct and provide a reason for the deduction.
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
              <p className="text-sm text-gray-500">Current Points: {selectedUser?.points}</p>
            </div>
          </div>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="points" className="text-sm font-medium">Points to Deduct</label>
              <Input 
                id="points" 
                type="number"
                min="1"
                max={selectedUser?.points || 100}
                value={pointsToDeduct || ''}
                onChange={(e) => setPointsToDeduct(parseInt(e.target.value) || 0)} 
                placeholder="Enter amount of points"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="reason" className="text-sm font-medium">Reason for Deduction</label>
              <Textarea 
                id="reason" 
                value={deductionReason} 
                onChange={(e) => setDeductionReason(e.target.value)} 
                rows={3} 
                placeholder="Explain why points are being deducted..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeductPointsDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleDeductPoints}
              className="bg-amber-500 hover:bg-amber-600"
              disabled={pointsToDeduct <= 0 || !deductionReason.trim()}
            >
              Deduct Points
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AdminUsers;
