
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, HelpCircle, FileText, DownloadCloud } from 'lucide-react';

const pointCategories = [
  { id: 'academic', name: 'Academic Achievement' },
  { id: 'attendance', name: 'Attendance' },
  { id: 'facility', name: 'Facility Usage' },
  { id: 'event', name: 'Event Participation' },
  { id: 'extracurricular', name: 'Extracurricular Activity' },
  { id: 'community', name: 'Community Service' }
];

const AdminPoints = () => {
  const { users, isAdmin, isPrincipal, sendNotification } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [pointsToAdd, setPointsToAdd] = useState('5');
  const [pointCategory, setPointCategory] = useState('');
  const [reason, setReason] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('award');
  
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
    if (!selectedStudent || !pointsToAdd || !pointCategory || !reason) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill all required fields.",
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      // In a real app, this would make an API call to update points
      const student = students.find(s => s.id === selectedStudent);
      
      if (student) {
        // Send notification to the student
        sendNotification(
          `Points Added: ${pointsToAdd} points`,
          `You have been awarded ${pointsToAdd} points for ${reason}. ${detailedDescription ? `Details: ${detailedDescription}` : ''}`,
          "Points System Administrator"
        );
        
        toast({
          title: "Points Added",
          description: `${pointsToAdd} points have been added to ${student.name}'s account.`,
        });
      }
      
      // Reset form
      setSelectedStudent('');
      setPointsToAdd('5');
      setPointCategory('');
      setReason('');
      setDetailedDescription('');
      setIsLoading(false);
    }, 1000);
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Points allocation report has been generated and is ready for download.",
    });
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Points Management System</h1>
          <Button onClick={() => navigate('/admin')} variant="outline">Back to Dashboard</Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="award">Award Points</TabsTrigger>
            <TabsTrigger value="leaderboard">Points Leaderboard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="award" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Award Points</CardTitle>
                  <CardDescription>Allocate points to students for various activities</CardDescription>
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
                          <SelectItem value="15">15 points</SelectItem>
                          <SelectItem value="20">20 points</SelectItem>
                          <SelectItem value="25">25 points</SelectItem>
                          <SelectItem value="30">30 points</SelectItem>
                          <SelectItem value="50">50 points</SelectItem>
                          <SelectItem value="100">100 points</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">Point Category</label>
                      <Select value={pointCategory} onValueChange={setPointCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {pointCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
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
                          <SelectItem value="volunteer">Volunteer Work</SelectItem>
                          <SelectItem value="competition">Competition Winner</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="details" className="text-sm font-medium">Detailed Description (Optional)</label>
                      <Textarea
                        placeholder="Provide additional details about the activity or achievement"
                        value={detailedDescription}
                        onChange={(e) => setDetailedDescription(e.target.value)}
                        rows={3}
                      />
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
                  <CardTitle>Points Allocation Guidelines</CardTitle>
                  <CardDescription>Follow these guidelines when awarding points to ensure consistency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-campus-primary mb-2">Academic Achievement</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Top rank in semester exams: 50-100 points</li>
                        <li>Quiz or competition winner: 20-50 points</li>
                        <li>Research paper publication: 100 points</li>
                        <li>Academic project completion: 30-60 points</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-campus-primary mb-2">Attendance</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>100% monthly attendance: 30 points</li>
                        <li>90-99% monthly attendance: 20 points</li>
                        <li>No late arrivals in a month: 15 points</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-campus-primary mb-2">Campus Facilities Usage</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Library visit: 5 points per visit</li>
                        <li>Study room booking: 5 points per hour</li>
                        <li>Computer lab usage: 5 points per hour</li>
                        <li>Sports facility usage: 10 points per session</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-campus-primary mb-2">Events & Activities</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Organizing campus event: 50-100 points</li>
                        <li>Event participation: 20-30 points</li>
                        <li>Volunteering: 20-50 points</li>
                        <li>Workshop/seminar attendance: 15-30 points</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                      <div className="flex items-start">
                        <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                        <div>
                          <h4 className="font-medium text-blue-700">Important Note</h4>
                          <p className="text-sm text-blue-600">
                            Points should be awarded fairly and consistently across all students. Any awarded points will trigger an automatic notification to the student with the details provided.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                      <Button variant="outline" onClick={handleGenerateReport} className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Report
                      </Button>
                      <Button variant="outline" className="flex items-center">
                        <DownloadCloud className="mr-2 h-4 w-4" />
                        Download Guidelines
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Student Points Leaderboard</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="cs">Computer Science</SelectItem>
                        <SelectItem value="me">Mechanical Engineering</SelectItem>
                        <SelectItem value="ec">Electronics</SelectItem>
                        <SelectItem value="ee">Electrical Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Filter by year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students by name, email, or department..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12 text-center">#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Points</TableHead>
                        <TableHead className="text-right">Tier</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.length > 0 ? (
                        // Sort by points (highest first)
                        [...filteredStudents]
                          .sort((a, b) => b.points - a.points)
                          .map((student, index) => {
                            // Determine student tier
                            let tier;
                            if (student.points >= 1000) tier = "Platinum";
                            else if (student.points >= 500) tier = "Gold";
                            else if (student.points >= 200) tier = "Silver";
                            else tier = "Bronze";
                            
                            // Determine tier color
                            let tierColor;
                            switch (tier) {
                              case "Platinum": tierColor = "bg-purple-100 text-purple-800"; break;
                              case "Gold": tierColor = "bg-yellow-100 text-yellow-800"; break;
                              case "Silver": tierColor = "bg-gray-100 text-gray-800"; break;
                              default: tierColor = "bg-amber-100 text-amber-800"; break;
                            }
                            
                            return (
                              <TableRow key={student.id}>
                                <TableCell className="font-medium text-center">{index + 1}</TableCell>
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell>{student.department || 'N/A'}</TableCell>
                                <TableCell>{student.year || 'N/A'}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell className="text-right font-bold">
                                  {student.points}
                                </TableCell>
                                <TableCell className="text-right">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${tierColor}`}>
                                    {tier}
                                  </span>
                                </TableCell>
                              </TableRow>
                            );
                          })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                            No students found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPoints;
