
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useCreateStudent } from "@/hooks/useStudents";

export const AddStudentDialog = () => {
  const createStudent = useCreateStudent();
  
  const [newStudent, setNewStudent] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    grade_level: string;
    status: "active" | "inactive" | "graduated";
  }>({
    first_name: "",
    last_name: "",
    email: "",
    grade_level: "",
    status: "active"
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  return (
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
  );
};
