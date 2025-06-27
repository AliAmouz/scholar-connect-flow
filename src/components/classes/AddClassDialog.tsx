
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useCreateClass } from "@/hooks/useClasses";

export const AddClassDialog = () => {
  const createClass = useCreateClass();
  
  const [newClass, setNewClass] = useState({
    name: "",
    subject: "",
    grade_level: "",
    room_number: "",
    schedule: "",
    capacity: "",
    status: "active" as "active" | "completed" | "scheduled"
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateClass = async () => {
    if (!newClass.name || !newClass.subject) {
      return;
    }

    const classData = {
      name: newClass.name,
      subject: newClass.subject,
      grade_level: newClass.grade_level ? parseInt(newClass.grade_level) : null,
      room_number: newClass.room_number || null,
      schedule: newClass.schedule || null,
      capacity: newClass.capacity ? parseInt(newClass.capacity) : null,
      status: newClass.status
    };

    createClass.mutate(classData, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setNewClass({
          name: "",
          subject: "",
          grade_level: "",
          room_number: "",
          schedule: "",
          capacity: "",
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
          Create Class
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Class</DialogTitle>
          <DialogDescription>
            Enter the class information to add it to the system.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Class Name</Label>
              <Input
                id="name"
                value={newClass.name}
                onChange={(e) => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Advanced Mathematics"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={newClass.subject}
                onChange={(e) => setNewClass(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Mathematics"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="grade_level">Grade Level</Label>
              <Input
                id="grade_level"
                type="number"
                value={newClass.grade_level}
                onChange={(e) => setNewClass(prev => ({ ...prev, grade_level: e.target.value }))}
                placeholder="9"
                min="1"
                max="12"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="room_number">Room Number</Label>
              <Input
                id="room_number"
                value={newClass.room_number}
                onChange={(e) => setNewClass(prev => ({ ...prev, room_number: e.target.value }))}
                placeholder="Room 201"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="schedule">Schedule</Label>
            <Input
              id="schedule"
              value={newClass.schedule}
              onChange={(e) => setNewClass(prev => ({ ...prev, schedule: e.target.value }))}
              placeholder="Mon, Wed, Fri - 10:00 AM"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={newClass.capacity}
                onChange={(e) => setNewClass(prev => ({ ...prev, capacity: e.target.value }))}
                placeholder="30"
                min="1"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={newClass.status} onValueChange={(value: "active" | "completed" | "scheduled") => setNewClass(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateClass} disabled={createClass.isPending}>
            {createClass.isPending ? "Creating..." : "Create Class"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
