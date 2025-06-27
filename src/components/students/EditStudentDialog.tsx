
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Student, useUpdateStudent } from "@/hooks/useStudents";

interface EditStudentDialogProps {
  student: Student;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditStudentDialog = ({ student, open, onOpenChange }: EditStudentDialogProps) => {
  const updateStudent = useUpdateStudent();
  
  const [formData, setFormData] = useState({
    first_name: student.first_name,
    last_name: student.last_name,
    email: student.email || "",
    grade_level: student.grade_level?.toString() || "",
    status: student.status
  });

  useEffect(() => {
    setFormData({
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email || "",
      grade_level: student.grade_level?.toString() || "",
      status: student.status
    });
  }, [student]);

  const handleSubmit = async () => {
    if (!formData.first_name || !formData.last_name) {
      return;
    }

    const updateData = {
      id: student.id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email || null,
      grade_level: formData.grade_level ? parseInt(formData.grade_level) : null,
      status: formData.status
    };

    updateStudent.mutate(updateData, {
      onSuccess: () => {
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Update the student's information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="grade_level">Grade Level</Label>
              <Input
                id="grade_level"
                type="number"
                value={formData.grade_level}
                onChange={(e) => setFormData(prev => ({ ...prev, grade_level: e.target.value }))}
                min="1"
                max="12"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: "active" | "inactive" | "graduated") => setFormData(prev => ({ ...prev, status: value }))}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={updateStudent.isPending}>
            {updateStudent.isPending ? "Updating..." : "Update Student"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
