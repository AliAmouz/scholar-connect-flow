
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate("/admin")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={student.photo} alt={student.name} />
              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{student.name}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Class {student.class}
                </span>
                <span>Age {student.age}</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Active Student
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{student.parentPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{student.parentEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{student.address}</span>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-0">
              <CardContent className="p-6 text-center">
                <p className="text-blue-100 text-sm">Overall Average</p>
                <p className="text-3xl font-bold">{student.averageGrade}</p>
                <p className="text-blue-100 text-xs">out of 10</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="grades" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="grades">Grades & Subjects</TabsTrigger>
            <TabsTrigger value="remarks">Teacher Remarks</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="grades" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Grades</CardTitle>
                  <CardDescription>Grades by subject for this semester</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjects.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: subject.color }}
                          ></div>
                          <span className="font-medium">{subject.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
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
                  <CardTitle>Grade Progression</CardTitle>
                  <CardDescription>Average grade over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={gradeHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 10]} />
                      <Line 
                        type="monotone" 
                        dataKey="average" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="remarks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Teacher Remarks
                </CardTitle>
                <CardDescription>Chronological feed of teacher comments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {remarks.map((remark) => (
                    <div 
                      key={remark.id} 
                      className={`p-4 rounded-lg border-l-4 ${
                        remark.type === 'positive' 
                          ? 'border-green-400 bg-green-50' 
                          : remark.type === 'neutral'
                          ? 'border-yellow-400 bg-yellow-50'
                          : 'border-red-400 bg-red-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{remark.teacher}</span>
                          <Badge variant="outline">{remark.subject}</Badge>
                        </div>
                        <span className="text-sm text-gray-500">{remark.date}</span>
                      </div>
                      <p className="text-gray-700">{remark.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Absence History
                </CardTitle>
                <CardDescription>Record of student absences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {absenceHistory.map((absence, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{absence.date}</p>
                        <p className="text-sm text-gray-600">{absence.reason}</p>
                      </div>
                      <Badge 
                        variant={absence.status === "Excused" ? "default" : "destructive"}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{student.averageGrade}/10</div>
                    <p className="text-gray-600">Overall Average</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Attendance Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">96%</div>
                    <p className="text-gray-600">This Semester</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Parent Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">{student.parentName}</p>
                    <p className="text-sm text-gray-600">{student.parentPhone}</p>
                    <p className="text-sm text-gray-600">{student.parentEmail}</p>
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
