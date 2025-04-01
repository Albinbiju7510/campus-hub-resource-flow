
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search } from 'lucide-react';

const AdminPoints = () => {
  const { users, isAdmin, isPrincipal } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [pointsToAdd, setPointsToAdd] = useState('5');
  const [reason, setReason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
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
  
  // Filter only students
  const students = users.filter(user => user.role === 'student');
  
  // Filter students based on search term
  const filteredStudents = students.filter(student => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower) ||
      (student.department && student.department.toLowerCase().includes(searchLower))
    );
  });
  
  const handleAddPoints = () => {
    if (!selectedStudent || !pointsToAdd || !reason) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select a student, enter points, and provide a reason.",
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      // In a real app, this would make an API call to update points
      // For this demo, we'll simulate the points update
      
      toast({
        title: "Points Added",
        description: `${pointsToAdd} points have been added to the student's account.`,
      });
      
      // Reset form
      setSelectedStudent('');
      setPointsToAdd('5');
      setReason('');
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Points Management</h1>
          <Button onClick={() => navigate('/admin')} variant="outline">Back to Dashboard</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Award Points</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="student" className="text-sm font-medium">Select Student</label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name} ({student.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="points" className="text-sm font-medium">Points to Add</label>
                  <Select value={pointsToAdd} onValueChange={setPointsToAdd}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select points" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 point</SelectItem>
                      <SelectItem value="5">5 points</SelectItem>
                      <SelectItem value="10">10 points</SelectItem>
                      <SelectItem value="25">25 points</SelectItem>
                      <SelectItem value="50">50 points</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="reason" className="text-sm font-medium">Reason</label>
                  <Select value={reason} onValueChange={setReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facility-usage">Facility Usage</SelectItem>
                      <SelectItem value="event-participation">Event Participation</SelectItem>
                      <SelectItem value="classroom-attendance">Classroom Attendance</SelectItem>
                      <SelectItem value="extracurricular">Extracurricular Activity</SelectItem>
                      <SelectItem value="achievement">Academic Achievement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleAddPoints}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Adding Points..."
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" /> Award Points
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Student Points Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search students..."
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
                      <TableHead>Department</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length > 0 ? (
                      // Sort by points (highest first)
                      [...filteredStudents]
                        .sort((a, b) => b.points - a.points)
                        .map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.department || 'N/A'}</TableCell>
                          <TableCell>{student.year || 'N/A'}</TableCell>
                          <TableCell className="text-right font-bold">
                            {student.points}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                          No students found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPoints;
