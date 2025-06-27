
import { Student } from "@/hooks/useStudents";
import { StudentCard } from "./StudentCard";
import { EmptyStudentsState } from "./EmptyStudentsState";

interface StudentsListProps {
  students: Student[];
  filteredStudents: Student[];
}

export const StudentsList = ({ students, filteredStudents }: StudentsListProps) => {
  if (filteredStudents.length === 0) {
    return <EmptyStudentsState hasStudents={students.length > 0} />;
  }

  return (
    <div className="grid gap-4">
      {filteredStudents.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
};
