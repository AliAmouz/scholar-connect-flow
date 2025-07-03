
import { useState } from "react";
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
  BookOpen
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "./components/Sidebar";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Mock data for parent's children - in a real app, this would come from the database
  const children = [
    {
      id: "1",
      name: "Emma Johnson",
      class: "5A",
      age: 11,
      photo: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=150&h=150&fit=crop&crop=face",
      averageGrade: 8.7,
      attendance: 96,
      recentGrades: [
        { subject: "Mathematics", grade: 9.2, color: "#3B82F6" },
        { subject: "Science", grade: 8.8, color: "#10B981" },
        { subject: "English", grade: 8.5, color: "#F59E0B" },
      ]
    },
    {
      id: "2", 
      name: "Alex Johnson",
      class: "3B",
      age: 9,
      photo: "https://images.unsplash.com/photo-1599834562135-b6fc90e642ca?w=150&h=150&fit=crop&crop=face",
      averageGrade: 7.9,
      attendance: 94,
      recentGrades: [
        { subject: "Mathematics", grade: 8.1, color: "#3B82F6" },
        { subject: "Art", grade: 9.5, color: "#8B5CF6" },
        { subject: "Reading", grade: 7.2, color: "#F59E0B" },
      ]
    }
  ];

  const handleViewStudent = (studentId: string) => {
    navigate(`/student/${studentId}`);
  };

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
                    <p className="text-2xl font-bold">{children.length}</p>
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
                    <p className="text-2xl font-bold">
                      {(children.reduce((sum, child) => sum + child.averageGrade, 0) / children.length).toFixed(1)}
                    </p>
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
                    <p className="text-2xl font-bold">
                      {Math.round(children.reduce((sum, child) => sum + child.attendance, 0) / children.length)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Children Cards */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Children</h2>
            
            {children.map((child) => (
              <Card key={child.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={child.photo} alt={child.name} />
                        <AvatarFallback>{child.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{child.name}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Class {child.class}
                          </span>
                          <span>Age {child.age}</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Active
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <Button onClick={() => handleViewStudent(child.id)}>
                      View Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Overall Performance */}
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-lg mb-2">
                        <p className="text-sm opacity-90">Overall Average</p>
                        <p className="text-2xl font-bold">{child.averageGrade}</p>
                        <p className="text-xs opacity-90">out of 10</p>
                      </div>
                    </div>

                    {/* Attendance */}
                    <div className="text-center">
                      <div className="bg-orange-100 p-4 rounded-lg mb-2">
                        <p className="text-sm text-orange-700">Attendance Rate</p>
                        <p className="text-2xl font-bold text-orange-600">{child.attendance}%</p>
                        <p className="text-xs text-orange-600">This semester</p>
                      </div>
                    </div>

                    {/* Recent Grades */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Recent Grades
                      </h4>
                      <div className="space-y-2">
                        {child.recentGrades.map((grade, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: grade.color }}
                              ></div>
                              <span className="truncate">{grade.subject}</span>
                            </div>
                            <span className="font-medium">{grade.grade}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
