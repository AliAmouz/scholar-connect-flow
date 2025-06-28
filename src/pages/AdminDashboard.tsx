
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Sidebar } from "./components/Sidebar";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentAlerts from "@/components/dashboard/RecentAlerts";
import SampleDataButton from "@/components/SampleDataButton";

const AdminDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");

  // Mock data for charts (can be replaced with real data later)
  const attendanceData = [
    { day: "Mon", present: 1180, absent: 67 },
    { day: "Tue", present: 1203, absent: 44 },
    { day: "Wed", present: 1156, absent: 91 },
    { day: "Thu", present: 1224, absent: 23 },
    { day: "Fri", present: 1189, absent: 58 },
  ];

  const gradeData = [
    { subject: "Math", average: 8.5 },
    { subject: "Science", average: 7.9 },
    { subject: "English", average: 8.1 },
    { subject: "History", average: 8.3 },
    { subject: "Art", average: 9.1 },
  ];

  const classDistribution = [
    { name: "Grade 1-3", value: 380, color: "#3B82F6" },
    { name: "Grade 4-6", value: 420, color: "#10B981" },
    { name: "Grade 7-9", value: 285, color: "#F59E0B" },
    { name: "Grade 10-12", value: 162, color: "#EF4444" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:ml-64 p-4 lg:p-8">
        <div className="pt-16 lg:pt-0 mb-6 lg:mb-8 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600 text-sm lg:text-base">Welcome back! Here's what's happening at your school today.</p>
          </div>
          <div className="lg:self-start">
            <SampleDataButton />
          </div>
        </div>

        <div className="mb-6 lg:mb-8">
          <StatsCards />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Attendance Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Weekly Attendance</CardTitle>
              <CardDescription className="text-sm">Student attendance for this week (Sample Data)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250} className="lg:h-[300px]">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Bar dataKey="present" fill="#10B981" name="Present" />
                  <Bar dataKey="absent" fill="#EF4444" name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Grade Averages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Subject Performance</CardTitle>
              <CardDescription className="text-sm">Average grades by subject (Sample Data)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250} className="lg:h-[300px]">
                <LineChart data={gradeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" fontSize={12} />
                  <YAxis domain={[0, 10]} fontSize={12} />
                  <Line type="monotone" dataKey="average" stroke="#3B82F6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Class Distribution */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Class Distribution</CardTitle>
              <CardDescription className="text-sm">Students by grade level (Sample Data)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200} className="lg:h-[250px]">
                <PieChart>
                  <Pie
                    data={classDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                    className="lg:innerRadius-[60] lg:outerRadius-[100]"
                  >
                    {classDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {classDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs lg:text-sm">{item.name}</span>
                    </div>
                    <span className="text-xs lg:text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-1 xl:col-span-2">
            <RecentAlerts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
