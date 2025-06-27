
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCheck, UserX } from "lucide-react";
import { Student } from "@/hooks/useStudents";
import { StudentActions } from "./StudentActions";

interface StudentCardProps {
  student: Student;
}

export const StudentCard = ({ student }: StudentCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
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
            <StudentActions student={student} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
