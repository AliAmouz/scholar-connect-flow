
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Auth = () => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedRole, setSelectedRole] = useState("parent");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { signIn, signUp, user, userRole } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to their appropriate dashboard
  useEffect(() => {
    if (user && userRole) {
      console.log('User is authenticated, redirecting based on role:', userRole);
      switch (userRole) {
        case 'admin':
          navigate('/admin');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        case 'parent':
          navigate('/parent');
          break;
        default:
          navigate('/parent');
          break;
      }
    }
  }, [user, userRole, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    console.log('Attempting login for:', email);
    const { error } = await signIn(email, password);

    if (error) {
      let errorMessage = "Invalid email or password";
      
      if (error.message?.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please check your credentials.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsLoading(false);
    } else {
      console.log('Login successful - user will be redirected automatically');
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      // Navigation will be handled by AuthContext
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password || !confirmPassword || !fullName || !selectedRole) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    console.log('Creating account for:', email, 'Role:', selectedRole);
    const { error } = await signUp(email, password, fullName, selectedRole);

    if (error) {
      let errorMessage = "Failed to create account";
      
      if (error.message?.includes("already registered")) {
        errorMessage = "An account with this email already exists";
      } else if (error.message?.includes("email")) {
        errorMessage = "Please enter a valid email address";
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error('Signup error:', error);
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsLoading(false);
    } else {
      console.log('Signup successful - user will be signed in automatically');
      toast({
        title: "Welcome to EduManage!",
        description: "Your account has been created successfully. You're now signed in!",
      });
      // User will be automatically signed in and redirected by AuthContext
      // No need to show success message or reset form
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
    setSelectedRole("parent");
  };

  const toggleMode = () => {
    setIsCreatingAccount(!isCreatingAccount);
    setShowSuccessMessage(false);
    resetForm();
  };

  // Remove the success message component since users are automatically signed in
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EduManage</h1>
          <p className="text-gray-600">School Management System</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isCreatingAccount ? "Create Account" : "Sign In"}
            </CardTitle>
            <CardDescription className="text-center">
              {isCreatingAccount 
                ? "Join EduManage and start managing education seamlessly" 
                : "Welcome back! Sign in to access your dashboard"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={isCreatingAccount ? handleCreateAccount : handleLogin} className="space-y-4">
              {isCreatingAccount && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>

              {isCreatingAccount && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11"
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-11 bg-green-600 hover:bg-green-700 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading 
                  ? (isCreatingAccount ? "Creating Account..." : "Signing in...") 
                  : (isCreatingAccount ? "Create Account" : "Sign In")
                }
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={toggleMode}
                className="text-sm text-gray-600 hover:text-gray-800"
                disabled={isLoading}
              >
                {isCreatingAccount 
                  ? "Already have an account? Sign in" 
                  : "Don't have an account? Create one"
                }
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>Join thousands of educators and parents using EduManage</p>
          <p className="mt-1">• Admin: Full system access • Teacher: Class management • Parent: Student progress</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
