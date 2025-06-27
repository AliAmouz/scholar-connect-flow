
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { useTeachers, useCreateTeacher } from "@/hooks/useTeachers";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { TeachersList } from "@/components/teachers/TeachersList";

const Teachers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: teachers = [], isLoading, error } = useTeachers();
  const createTeacher = useCreateTeacher();
  
  // Form state for new teacher
  const [newTeacher, setNewTeacher] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredTeachers = teachers.filter(teacher =>
    `${teacher.first_name} ${teacher.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (teacher.subject && teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTeacher = async () => {
    if (!newTeacher.first_name || !newTeacher.last_name || !newTeacher.email) {
      return;
    }

    const teacherData = {
      first_name: newTeacher.first_name,
      last_name: newTeacher.last_name,
      email: newTeacher.email,
      subject: newTeacher.subject || null,
      hire_date: new Date().toISOString().split('T')[0]
    };

    createTeacher.mutate(teacherData, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setNewTeacher({
          first_name: "",
          last_name: "",
          email: "",
          subject: ""
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="text-center">Loading teachers...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="text-center text-red-600">Error loading teachers: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teachers</h1>
          <p className="text-gray-600">Manage teaching staff and assignments</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Teacher
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
                <DialogDescription>
                  Enter the teacher's information to add them to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={newTeacher.first_name}
                      onChange={(e) => setNewTeacher(prev => ({ ...prev, first_name: e.target.value }))}
                      placeholder="Jane"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={newTeacher.last_name}
                      onChange={(e) => setNewTeacher(prev => ({ ...prev, last_name: e.target.value }))}
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="teacher@school.edu"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject (Optional)</Label>
                  <Input
                    id="subject"
                    value={newTeacher.subject}
                    onChange={(e) => setNewTeacher(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Mathematics"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTeacher} disabled={createTeacher.isPending}>
                  {createTeacher.isPending ? "Adding..." : "Add Teacher"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <TeachersList 
          teachers={teachers} 
          filteredTeachers={filteredTeachers} 
        />
      </div>
    </div>
  );
};

export default Teachers;
