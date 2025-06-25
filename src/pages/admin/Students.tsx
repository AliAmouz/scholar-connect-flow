
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, UserCheck, UserX } from "lucide-react";
import { useStudents } from "@/hooks/useStudents";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateStudent } from "@/hooks/useStudents";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: students = [], isLoading, error } = useStudents();
  const createStudent = useCreateStudent();
  
  // Form state for new student
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
    grade_level: "",
    status: "active" as const
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredStudents = students.filter(student =>
    `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateStudent = async () => {
    if (!newStudent.first_name || !newStudent.last_name) {
      return;
    }

    const studentData = {
      first_name: newStudent.first_name,
      last_name: newStudent.last_name,
      email: newStudent.email || null,
      grade_level: newStudent.grade_level ? parseInt(newStudent.grade_level) : null,
      status: newStudent.status,
      enrollment_date: new Date().toISOString().split('T')[0]
    };

    createStudent.mutate(studentData, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setNewStudent({
          first_name: "",
          last_name: "",
          email: "",
          grade_level: "",
          status: "active"
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="text-center">Loading students...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="text-center text-red-600">Error loading students: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Students</h1>
          <p className="text-gray-600">Manage student enrollments and information</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Enter the student's information to add them to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={newStudent.first_name}
                      onChange={(e) => setNewStudent(prev => ({ ...prev, first_name: e.target.value }))}
                      placeholder="John"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={newStudent.last_name}
                      onChange={(e) => setNewStudent(prev => ({ ...prev, last_name: e.target.value }))}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="student@school.edu"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="grade_level">Grade Level</Label>
                    <Input
                      id="grade_level"
                      type="number"
                      value={newStudent.grade_level}
                      onChange={(e) => setNewStudent(prev => ({ ...prev, grade_level: e.target.value }))}
                      placeholder="9"
                      min="1"
                      max="12"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newStudent.status} onValueChange={(value: "active" | "inactive" | "graduated") => setNewStudent(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="graduated">Graduated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateStudent} disabled={createStudent.isPending}>
                  {createStudent.isPending ? "Adding..." : "Add Student"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {filteredStudents.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">
                {students.length === 0 ? (
                  <>
                    <h3 className="text-lg font-medium mb-2">No students found</h3>
                    <p>Get started by adding your first student.</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-medium mb-2">No students match your search</h3>
                    <p>Try adjusting your search terms.</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {student.first_name[0]}{student.last_name[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{student.first_name} {student.last_name}</h3>
                        <p className="text-gray-600">{student.email || 'No email provided'}</p>
                        <p className="text-sm text-gray-500">
                          Enrolled: {student.enrollment_date ? new Date(student.enrollment_date).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">
                          {student.grade_level ? `Grade ${student.grade_level}` : 'No grade assigned'}
                        </p>
                        <Badge variant={student.status === "active" ? "default" : "secondary"}>
                          {student.status === "active" ? (
                            <UserCheck className="h-3 w-3 mr-1" />
                          ) : (
                            <UserX className="h-3 w-3 mr-1" />
                          )}
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
