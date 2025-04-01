
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, LockKeyhole, BookOpen, Building, ShieldAlert } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('student');
  
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as const,
    department: '',
    year: ''
  });
  
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin' as const,
    department: 'Administration',
    adminCode: ''
  });
  
  const [principalData, setPrincipalData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'principal' as const,
    department: 'Administration',
    principalCode: ''
  });

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrincipalData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setStudentData(prev => ({ ...prev, [name]: value }));
  };

  const handleStudentSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (studentData.password !== studentData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please ensure both passwords are identical",
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      const { confirmPassword, ...userData } = studentData;
      const success = signup(userData);
      
      if (success) {
        toast({
          title: "Account Created",
          description: "Welcome to CampusHub! Your student account has been created successfully.",
        });
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: "This email is already registered. Please use a different email.",
        });
      }
      setIsLoading(false);
    }, 1000); // Simulate network delay
  };

  const handleAdminSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (adminData.password !== adminData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please ensure both passwords are identical",
      });
      return;
    }
    
    // Verify admin code (simple validation for demo)
    if (adminData.adminCode !== 'admin123') {
      toast({
        variant: "destructive",
        title: "Invalid Admin Code",
        description: "Please enter a valid administrator access code.",
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      const { confirmPassword, adminCode, ...userData } = adminData;
      const success = signup(userData);
      
      if (success) {
        toast({
          title: "Admin Account Created",
          description: "Welcome to CampusHub! Your administrator account has been created successfully.",
        });
        navigate('/admin');
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: "This email is already registered. Please use a different email.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handlePrincipalSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (principalData.password !== principalData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please ensure both passwords are identical",
      });
      return;
    }
    
    // Verify principal code (simple validation for demo)
    if (principalData.principalCode !== 'principal123') {
      toast({
        variant: "destructive",
        title: "Invalid Principal Code",
        description: "Please enter a valid principal access code.",
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      const { confirmPassword, principalCode, ...userData } = principalData;
      const success = signup(userData);
      
      if (success) {
        toast({
          title: "Principal Account Created",
          description: "Welcome to CampusHub! Your principal account has been created successfully.",
        });
        navigate('/admin');
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: "This email is already registered. Please use a different email.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-campus-primary">CampusHub</h1>
          <p className="text-gray-600 mt-2">Join our campus community</p>
        </div>
        
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Select your role and enter your information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="principal">Principal</TabsTrigger>
              </TabsList>
              
              <TabsContent value="student">
                <form onSubmit={handleStudentSignup} className="space-y-4 mt-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="name"
                      placeholder="Full Name"
                      value={studentData.name}
                      onChange={handleStudentChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={studentData.email}
                      onChange={handleStudentChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={studentData.password}
                      onChange={handleStudentChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      value={studentData.confirmPassword}
                      onChange={handleStudentChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        name="department"
                        placeholder="Department"
                        value={studentData.department}
                        onChange={handleStudentChange}
                        className="pl-10"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        name="year"
                        placeholder="Year (e.g., 1st Year)"
                        value={studentData.year}
                        onChange={handleStudentChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Sign Up as Student"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="admin">
                <form onSubmit={handleAdminSignup} className="space-y-4 mt-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="name"
                      placeholder="Admin Name"
                      value={adminData.name}
                      onChange={handleAdminChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Admin Email"
                      value={adminData.email}
                      onChange={handleAdminChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={adminData.password}
                      onChange={handleAdminChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      value={adminData.confirmPassword}
                      onChange={handleAdminChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <ShieldAlert className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="adminCode"
                      type="password"
                      placeholder="Admin Access Code"
                      value={adminData.adminCode}
                      onChange={handleAdminChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Sign Up as Admin"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="principal">
                <form onSubmit={handlePrincipalSignup} className="space-y-4 mt-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="name"
                      placeholder="Principal Name"
                      value={principalData.name}
                      onChange={handlePrincipalChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Principal Email"
                      value={principalData.email}
                      onChange={handlePrincipalChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={principalData.password}
                      onChange={handlePrincipalChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      value={principalData.confirmPassword}
                      onChange={handlePrincipalChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <ShieldAlert className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      name="principalCode"
                      type="password"
                      placeholder="Principal Access Code"
                      value={principalData.principalCode}
                      onChange={handlePrincipalChange}
                      className="pl-10"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Sign Up as Principal"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-campus-primary hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
