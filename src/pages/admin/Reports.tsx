
import { Sidebar } from "../components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, Users, GraduationCap, AlertTriangle } from "lucide-react";
import { useStudents } from "@/hooks/useStudents";
import { useTeachers } from "@/hooks/useTeachers";
import { useClasses } from "@/hooks/useClasses";
import { useAlerts } from "@/hooks/useAlerts";

const Reports = () => {
  const { data: students = [], isLoading: studentsLoading } = useStudents();
  const { data: teachers = [], isLoading: teachersLoading } = useTeachers();
  const { data: classes = [], isLoading: classesLoading } = useClasses();
  const { data: alerts = [], isLoading: alertsLoading } = useAlerts();

  const isLoading = studentsLoading || teachersLoading || classesLoading || alertsLoading;

  // Calculate statistics from real data
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const graduatedStudents = students.filter(s => s.status === 'graduated').length;
  const inactiveStudents = students.filter(s => s.status === 'inactive').length;

  const totalTeachers = teachers.length;
  const totalClasses = classes.length;
  const activeClasses = classes.filter(c => c.status === 'active').length;

  const totalAlerts = alerts.length;
  const unreadAlerts = alerts.filter(a => !a.read).length;
  const urgentAlerts = alerts.filter(a => a.priority === 'urgent' || a.priority === 'high').length;

  // Grade level distribution
  const gradeDistribution = students.reduce((acc, student) => {
    if (student.grade_level) {
      acc[student.grade_level] = (acc[student.grade_level] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

  // Subject distribution from teachers
  const subjectDistribution = teachers.reduce((acc, teacher) => {
    if (teacher.subject) {
      acc[teacher.subject] = (acc[teacher.subject] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Alert type distribution
  const alertTypeDistribution = alerts.reduce((acc, alert) => {
    acc[alert.alert_type] = (acc[alert.alert_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="text-center">Loading reports...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive school data insights and reports</p>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <Button className="bg-gradient-to-r from-blue-600 to-green-600">
            <Download className="h-4 w-4 mr-2" />
            Export Full Report
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate PDF
          </Button>
        </div>

        {/* Overview Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Students</p>
                  <p className="text-3xl font-bold">{totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Active Students</p>
                  <p className="text-3xl font-bold">{activeStudents}</p>
                </div>
                <GraduationCap className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Teachers</p>
                  <p className="text-3xl font-bold">{totalTeachers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Urgent Alerts</p>
                  <p className="text-3xl font-bold">{urgentAlerts}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Student Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Student Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Active Students</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">{activeStudents}</Badge>
                    <span className="text-sm text-gray-500">
                      {totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Graduated Students</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{graduatedStudents}</Badge>
                    <span className="text-sm text-gray-500">
                      {totalStudents > 0 ? Math.round((graduatedStudents / totalStudents) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Inactive Students</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{inactiveStudents}</Badge>
                    <span className="text-sm text-gray-500">
                      {totalStudents > 0 ? Math.round((inactiveStudents / totalStudents) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grade Level Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Grade Level Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(gradeDistribution)
                  .sort(([a], [b]) => parseInt(a) - parseInt(b))
                  .map(([grade, count]) => (
                  <div key={grade} className="flex items-center justify-between">
                    <span>Grade {grade}</span>
                    <Badge variant="outline">{count} students</Badge>
                  </div>
                ))}
                {Object.keys(gradeDistribution).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No grade level data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Class Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Class Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Total Classes</span>
                  <Badge variant="default">{totalClasses}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Active Classes</span>
                  <Badge variant="default">{activeClasses}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Average Class Capacity</span>
                  <Badge variant="outline">
                    {classes.length > 0 
                      ? Math.round(classes.reduce((sum, c) => sum + (c.capacity || 0), 0) / classes.length)
                      : 0
                    }
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alert Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Alert Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Total Alerts</span>
                  <Badge variant="default">{totalAlerts}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Unread Alerts</span>
                  <Badge variant="destructive">{unreadAlerts}</Badge>
                </div>
                <div className="space-y-2">
                  {Object.entries(alertTypeDistribution).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="capitalize">{type} Alerts</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Distribution */}
        {Object.keys(subjectDistribution).length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Subject Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(subjectDistribution).map(([subject, count]) => (
                  <div key={subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{subject}</span>
                    <Badge variant="secondary">{count} teacher{count !== 1 ? 's' : ''}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity Summary */}
        <Card>
          <CardHeader>
            <CardTitle>System Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Students</h3>
                <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
                <p className="text-sm text-gray-600">
                  {activeStudents} active, {graduatedStudents} graduated
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Staff</h3>
                <p className="text-3xl font-bold text-green-600">{totalTeachers}</p>
                <p className="text-sm text-gray-600">
                  Teaching {Object.keys(subjectDistribution).length} subjects
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Classes</h3>
                <p className="text-3xl font-bold text-purple-600">{totalClasses}</p>
                <p className="text-sm text-gray-600">
                  {activeClasses} currently active
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
