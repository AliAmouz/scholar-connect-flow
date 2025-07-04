
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  GraduationCap, 
  TrendingUp, 
  Calendar, 
  Clock,
  User,
  BookOpen,
  Users
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "./components/Sidebar";
import { useParentStudents } from "@/hooks/useParentStudents";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: students = [], isLoading, error } = useParentStudents();

  const handleViewStudent = (studentId: string) => {
    navigate(`/student/${studentId}`);
  };

  // Calculate average statistics from real data
  const calculateAverageGrade = () => {
    // For now, return a mock average since we don't have grades data yet
    return 8.5;
  };

  const calculateAverageAttendance = () => {
    // For now, return a mock average since we don't have attendance data yet
    return 95;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="lg:ml-64 p-4 lg:p-6">
          <div className="pt-16 lg:pt-0">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your children's information...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="lg:ml-64 p-4 lg:p-6">
          <div className="pt-16 lg:pt-0">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="text-red-500 mb-4">
                  <Users className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-600 mb-4">Unable to load student information</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:ml-64 p-4 lg:p-6">
        <div className="pt-16 lg:pt-0">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Parent Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's an overview of your children's progress.</p>
              </div>
              <Button 
                variant="outline" 
                onClick={signOut}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Check if parent has any students */}
          {students.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-blue-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Students Found</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                It looks like you don't have any students associated with your account yet. 
                Please contact the school administration to link your children to your parent account.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-yellow-800">
                  <strong>Need help?</strong> Make sure the school has your email address ({user?.email}) 
                  on file for your children's records.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Children</p>
                        <p className="text-2xl font-bold">{students.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Average Grade</p>
                        <p className="text-2xl font-bold">{calculateAverageGrade()}</p>
                        <p className="text-xs text-gray-500">Coming Soon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-100 p-3 rounded-full">
                        <Clock className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Avg Attendance</p>
                        <p className="text-2xl font-bold">{calculateAverageAttendance()}%</p>
                        <p className="text-xs text-gray-500">Coming Soon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Children Cards */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Children</h2>
                
                {students.map((student) => (
                  <Card key={student.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-600">
                              {student.first_name[0]}{student.last_name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-xl">{student.first_name} {student.last_name}</CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-1">
                              {student.grade_level && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  Grade {student.grade_level}
                                </span>
                              )}
                              {student.date_of_birth && (
                                <span>
                                  Age {new Date().getFullYear() - new Date(student.date_of_birth).getFullYear()}
                                </span>
                              )}
                              <Badge variant="secondary" className="bg-green-100 text-green-700 capitalize">
                                {student.status}
                              </Badge>
                            </CardDescription>
                          </div>
                        </div>
                        <Button onClick={() => handleViewStudent(student.id)}>
                          View Details
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Student Info */}
                        <div className="text-center">
                          <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-lg mb-2">
                            <p className="text-sm opacity-90">Student ID</p>
                            <p className="text-lg font-bold truncate">{student.id.slice(0, 8)}...</p>
                            <p className="text-xs opacity-90">Enrolled: {student.enrollment_date ? new Date(student.enrollment_date).toLocaleDateString() : 'N/A'}</p>
                          </div>
                        </div>

                        {/* Placeholder for future grades */}
                        <div className="text-center">
                          <div className="bg-orange-100 p-4 rounded-lg mb-2">
                            <p className="text-sm text-orange-700">Overall Grade</p>
                            <p className="text-2xl font-bold text-orange-600">--</p>
                            <p className="text-xs text-orange-600">Coming Soon</p>
                          </div>
                        </div>

                        {/* Placeholder for recent subjects */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            Academic Progress
                          </h4>
                          <div className="space-y-2">
                            <div className="text-sm text-gray-500 text-center py-4">
                              Grade and attendance tracking will be available soon
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
