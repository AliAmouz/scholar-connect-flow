
import { Teacher } from "@/hooks/useTeachers";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users } from "lucide-react";

interface TeacherCardProps {
  teacher: Teacher;
}

export const TeacherCard = ({ teacher }: TeacherCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
              {teacher.first_name[0]}{teacher.last_name[0]}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{teacher.first_name} {teacher.last_name}</h3>
              <p className="text-gray-600">{teacher.email}</p>
              <p className="text-sm text-gray-500 font-medium">
                {teacher.subject || 'No subject assigned'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <BookOpen className="h-4 w-4" />
                0 Classes
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <Users className="h-4 w-4" />
                0 Students
              </div>
            </div>
            <div className="text-right">
              <Badge variant="default">
                Active
              </Badge>
              <div className="mt-2">
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
