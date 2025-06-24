
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  GraduationCap, 
  AlertTriangle, 
  MessageSquare, 
  Phone,
  CheckCircle,
  Clock,
  ArrowLeft
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TeacherPanel = () => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [newGrade, setNewGrade] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [remark, setRemark] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const students = [
    {
      id: 1,
      name: "Emma Johnson",
      class: "5A",
      photo: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=100&h=100&fit=crop&crop=face",
      currentGrades: { Math: 9.2, Science: 8.8, English: 8.5 },
      parentPhone: "+1 (555) 123-4567",
      lastAbsence: null,
      status: "present"
    },
    {
      id: 2,
      name: "Michael Chen",
      class: "5A",
      photo: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=100&h=100&fit=crop&crop=face",
      currentGrades: { Math: 8.7, Science: 9.1, English: 8.9 },
      parentPhone: "+1 (555) 234-5678",
      lastAbsence: "2024-01-10",
      status: "present"
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      class: "5A",
      photo: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=100&h=100&fit=crop&crop=face",
      currentGrades: { Math: 8.9, Science: 8.4, English: 9.2 },
      parentPhone: "+1 (555) 345-6789",
      lastAbsence: null,
      status: "absent"
    },
  ];

  const subjects = ["Mathematics", "Science", "English", "History", "Art", "Physical Education"];

  const recentAlerts = [
    { student: "Sofia Rodriguez", time: "1 hour ago", status: "sent", type: "Absence" },
    { student: "Michael Chen", time: "Yesterday", status: "sent", type: "Late arrival" },
  ];

  const handleAddGrade = async () => {
    if (!selectedStudent || !newGrade || !selectedSubject) {
      toast({
        title: "Missing Information",
        description: "Please select a student, subject, and enter a grade.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Grade Added",
        description: `Grade ${newGrade} added for ${selectedStudent.name} in ${selectedSubject}`,
      });
      setNewGrade("");
      setSelectedSubject("");
      setIsLoading(false);
    }, 1000);
  };

  const handleAddRemark = async () => {
    if (!selectedStudent || !remark) {
      toast({
        title: "Missing Information",
        description: "Please select a student and enter a remark.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Remark Added",
        description: `Remark added for ${selectedStudent.name}`,
      });
      setRemark("");
      setIsLoading(false);
    }, 1000);
  };

  const handleMarkAbsent = async (student: any) => {
    setIsLoading(true);
    
    // Simulate webhook call to n8n
    setTimeout(() => {
      toast({
        title: "Student Marked Absent",
        description: `${student.name} has been marked absent. Parent notification sent via WhatsApp.`,
      });
      
      // Update student status
      student.status = "absent";
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Panel</h1>
              <p className="text-gray-600">Manage grades, remarks, and attendance for Class 5A</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
                <CardContent className="p-4 text-center">
                  <p className="text-green-100 text-sm">Students Present</p>
                  <p className="text-2xl font-bold">{students.filter(s => s.status === "present").length}/{students.length}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Student Management</TabsTrigger>
            <TabsTrigger value="grades">Add Grades</TabsTrigger>
            <TabsTrigger value="remarks">Add Remarks</TabsTrigger>
            <TabsTrigger value="alerts">Alert System</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <Card key={student.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={student.photo} alt={student.name} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{student.name}</h3>
                        <p className="text-gray-600">Class {student.class}</p>
                        <Badge 
                          variant={student.status === "present" ? "default" : "destructive"}
                          className="mt-1"
                        >
                          {student.status === "present" ? "Present" : "Absent"}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium">Current Grades:</p>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        {Object.entries(student.currentGrades).map(([subject, grade]) => (
                          <div key={subject} className="text-center p-2 bg-gray-50 rounded">
                            <p className="font-medium">{grade}</p>
                            <p className="text-xs text-gray-600">{subject}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <Users className="h-4 w-4 mr-1" />
                        Select
                      </Button>
                      
                      {student.status === "present" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              Mark Absent
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Mark Student Absent</DialogTitle>
                              <DialogDescription>
                                This will mark {student.name} as absent and automatically send a WhatsApp notification to their parent.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                              <Phone className="h-5 w-5 text-gray-500" />
                              <span>Parent will be notified at: {student.parentPhone}</span>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">Cancel</Button>
                              <Button 
                                variant="destructive"
                                onClick={() => handleMarkAbsent(student)}
                                disabled={isLoading}
                              >
                                {isLoading ? "Processing..." : "Mark Absent & Send Alert"}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Grade</CardTitle>
                <CardDescription>Select a student and subject to add a grade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Selected Student</Label>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      {selectedStudent ? (
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={selectedStudent.photo} />
                            <AvatarFallback>{selectedStudent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{selectedStudent.name}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">No student selected</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade (1-10)</Label>
                    <Input
                      id="grade"
                      type="number"
                      min="1"
                      max="10"
                      step="0.1"
                      value={newGrade}
                      onChange={(e) => setNewGrade(e.target.value)}
                      placeholder="Enter grade"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleAddGrade}
                  disabled={isLoading || !selectedStudent || !newGrade || !selectedSubject}
                  className="w-full"
                >
                  {isLoading ? "Adding Grade..." : "Add Grade"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="remarks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Teacher Remark</CardTitle>
                <CardDescription>Leave a comment about student behavior or performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Selected Student</Label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {selectedStudent ? (
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={selectedStudent.photo} />
                          <AvatarFallback>{selectedStudent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{selectedStudent.name}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500">No student selected</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remark">Remark</Label>
                  <Textarea
                    id="remark"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Enter your remark about the student..."
                    rows={4}
                  />
                </div>

                <Button 
                  onClick={handleAddRemark}
                  disabled={isLoading || !selectedStudent || !remark}
                  className="w-full"
                >
                  {isLoading ? "Adding Remark..." : "Add Remark"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    WhatsApp Alert System
                  </CardTitle>
                  <CardDescription>Automatic parent notifications via n8n webhook</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">System Active</span>
                      </div>
                      <p className="text-sm text-green-700">
                        When you mark a student as absent, a webhook is automatically triggered to send a WhatsApp message to their parent.
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
                      <ol className="text-sm text-blue-700 space-y-1">
                        <li>1. Mark student as absent</li>
                        <li>2. System triggers n8n webhook</li>
                        <li>3. WhatsApp message sent to parent</li>
                        <li>4. Confirmation received</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Alerts
                  </CardTitle>
                  <CardDescription>Status of recently sent notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAlerts.map((alert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{alert.student}</p>
                          <p className="text-sm text-gray-600">{alert.type}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="default" className="bg-green-100 text-green-700 mb-1">
                            {alert.status}
                          </Badge>
                          <p className="text-xs text-gray-500">{alert.time}</p>
                        </div>
                      </div>
                    ))}
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

export default TeacherPanel;
