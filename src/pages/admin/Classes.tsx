
import { Sidebar } from "../components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Users, BookOpen } from "lucide-react";

const Classes = () => {
  const classes = [
    {
      id: 1,
      name: "Advanced Mathematics",
      teacher: "Dr. Sarah Wilson",
      schedule: "Mon, Wed, Fri - 10:00 AM",
      students: 24,
      room: "Room 201",
      status: "Active",
    },
    {
      id: 2,
      name: "English Literature",
      teacher: "Mr. John Davis",
      schedule: "Tue, Thu - 2:00 PM",
      students: 19,
      room: "Room 105",
      status: "Active",
    },
    {
      id: 3,
      name: "Biology Lab",
      teacher: "Ms. Emily Chen",
      schedule: "Wed - 1:00 PM",
      students: 16,
      room: "Lab 301",
      status: "On Hold",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Classes</h1>
          <p className="text-gray-600">Manage class schedules and assignments</p>
        </div>

        <div className="flex justify-end mb-6">
          <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Class
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{classItem.name}</CardTitle>
                  <Badge variant={classItem.status === "Active" ? "default" : "secondary"}>
                    {classItem.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen className="h-4 w-4" />
                  <span>{classItem.teacher}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{classItem.schedule}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{classItem.students} students</span>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium text-gray-700">{classItem.room}</p>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
