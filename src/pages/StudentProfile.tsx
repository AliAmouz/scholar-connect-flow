
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  TrendingUp, 
  MessageSquare,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { Sidebar } from "./components/Sidebar";

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock student data
  const student = {
    id: 1,
    name: "Emma Johnson",
    class: "5A",
    age: 11,
    photo: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=150&h=150&fit=crop&crop=face",
    parentName: "Sarah Johnson",
    parentPhone: "+1 (555) 123-4567",
    parentEmail: "sarah.johnson@email.com",
    address: "123 Maple Street, Springfield",
    enrollmentDate: "2023-09-01",
    averageGrade: 8.7
  };

  const subjects = [
    { name: "Mathematics", currentGrade: 9.2, trend: "up", color: "#3B82F6" },
    { name: "Science", currentGrade: 8.8, trend: "up", color: "#10B981" },
    { name: "English", currentGrade: 8.5, trend: "stable", color: "#F59E0B" },
    { name: "History", currentGrade: 8.3, trend: "down", color: "#EF4444" },
    { name: "Art", currentGrade: 9.5, trend: "up", color: "#8B5CF6" },
    { name: "Physical Education", currentGrade: 8.9, trend: "stable", color: "#06B6D4" },
  ];

  const remarks = [
    {
      id: 1,
      teacher: "Ms. Anderson",
      subject: "Mathematics",
      date: "2024-01-15",
      comment: "Emma showed excellent problem-solving skills in today's algebra lesson. Keep up the great work!",
      type: "positive"
    },
    {
      id: 2,
      teacher: "Mr. Thompson",
      subject: "Science",
      date: "2024-01-12",
      comment: "Great participation in the chemistry experiment. Emma asked thoughtful questions.",
      type: "positive"
    },
    {
      id: 3,
      teacher: "Ms. Rodriguez",
      subject: "English",
      date: "2024-01-10",
      comment: "Please work on completing homework assignments on time.",
      type: "neutral"
    },
  ];

  const absenceHistory = [
    { date: "2024-01-08", reason: "Sick", status: "Excused" },
    { date: "2023-12-15", reason: "Family emergency", status: "Excused" },
    { date: "2023-11-22", reason: "Medical appointment", status: "Excused" },
  ];

  const gradeHistory = [
    { month: "Sep", average: 8.2 },
    { month: "Oct", average: 8.4 },
    { month: "Nov", average: 8.6 },
    { month: "Dec", average: 8.5 },
    { month: "Jan", average: 8.7 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:ml-64 p-4 lg:p-6">
        <div className="pt-16 lg:pt-0 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate("/admin/students")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Students
          </Button>
          
          <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 flex-1 w-full">
              <Avatar className="w-16 h-16 lg:w-20 lg:h-20 mx-auto sm:mx-0">
                <AvatarImage src={student.photo} alt={student.name} />
                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left w-full sm:w-auto">
                <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-2">{student.name}</h1>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 lg:gap-4 text-gray-600 mb-4 text-sm lg:text-base">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Class {student.class}
                  </span>
                  <span>Age {student.age}</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Active Student
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 gap-2 text-xs lg:text-sm">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="break-all">{student.parentPhone}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="break-all">{student.parentEmail}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="break-all">{student.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-0 w-full sm:w-auto lg:w-48">
              <CardContent className="p-4 lg:p-6 text-center">
                <p className="text-blue-100 text-sm">Overall Average</p>
                <p className="text-2xl lg:text-3xl font-bold">{student.averageGrade}</p>
                <p className="text-blue-100 text-xs">out of 10</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="grades" className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-4 h-auto min-w-fit">
              <TabsTrigger value="grades" className="text-xs lg:text-sm p-2 lg:p-3 whitespace-nowrap">Grades</TabsTrigger>
              <TabsTrigger value="remarks" className="text-xs lg:text-sm p-2 lg:p-3 whitespace-nowrap">Remarks</TabsTrigger>
              <TabsTrigger value="attendance" className="text-xs lg:text-sm p-2 lg:p-3 whitespace-nowrap">Attendance</TabsTrigger>
              <TabsTrigger value="overview" className="text-xs lg:text-sm p-2 lg:p-3 whitespace-nowrap">Overview</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grades" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">Current Grades</CardTitle>
                  <CardDescription className="text-sm">Grades by subject for this semester</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 lg:space-y-4">
                    {subjects.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div 
                            className="w-3 h-3 lg:w-4 lg:h-4 rounded-full flex-shrink-0"
                            style={{ backgroundColor: subject.color }}
                          ></div>
                          <span className="font-medium text-sm lg:text-base truncate">{subject.name}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-lg font-bold">{subject.currentGrade}</span>
                          <TrendingUp 
                            className={`h-4 w-4 ${
                              subject.trend === 'up' ? 'text-green-500' : 
                              subject.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                            }`} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">Grade Progression</CardTitle>
                  <CardDescription className="text-sm">Average grade over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full overflow-x-auto">
                    <ResponsiveContainer width="100%" height={250} minWidth={300}>
                      <LineChart data={gradeHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis domain={[0, 10]} fontSize={12} />
                        <Line 
                          type="monotone" 
                          dataKey="average" 
                          stroke="#3B82F6" 
                          strokeWidth={3}
                          dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="remarks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <MessageSquare className="h-5 w-5" />
                  Teacher Remarks
                </CardTitle>
                <CardDescription className="text-sm">Chronological feed of teacher comments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {remarks.map((remark) => (
                    <div 
                      key={remark.id} 
                      className={`p-3 lg:p-4 rounded-lg border-l-4 ${
                        remark.type === 'positive' 
                          ? 'border-green-400 bg-green-50' 
                          : remark.type === 'neutral'
                          ? 'border-yellow-400 bg-yellow-50'
                          : 'border-red-400 bg-red-50'
                      }`}
                    >
                      <div className="flex flex-col gap-2 mb-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-sm lg:text-base">{remark.teacher}</span>
                          <Badge variant="outline" className="text-xs">{remark.subject}</Badge>
                        </div>
                        <span className="text-xs lg:text-sm text-gray-500">{remark.date}</span>
                      </div>
                      <p className="text-gray-700 text-sm lg:text-base break-words">{remark.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <Clock className="h-5 w-5" />
                  Absence History
                </CardTitle>
                <CardDescription className="text-sm">Record of student absences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {absenceHistory.map((absence, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-lg gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm lg:text-base">{absence.date}</p>
                        <p className="text-xs lg:text-sm text-gray-600">{absence.reason}</p>
                      </div>
                      <Badge 
                        variant={absence.status === "Excused" ? "default" : "destructive"}
                        className="self-start sm:self-center flex-shrink-0"
                      >
                        {absence.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">Academic Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-2">{student.averageGrade}/10</div>
                    <p className="text-gray-600 text-sm lg:text-base">Overall Average</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">Attendance Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">96%</div>
                    <p className="text-gray-600 text-sm lg:text-base">This Semester</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="sm:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">Parent Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium text-sm lg:text-base">{student.parentName}</p>
                    <p className="text-xs lg:text-sm text-gray-600 break-all">{student.parentPhone}</p>
                    <p className="text-xs lg:text-sm text-gray-600 break-all">{student.parentEmail}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentProfile;
