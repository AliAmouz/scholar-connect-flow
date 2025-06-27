
import { Teacher } from "@/hooks/useTeachers";
import { TeacherCard } from "./TeacherCard";
import { EmptyTeachersState } from "./EmptyTeachersState";

interface TeachersListProps {
  teachers: Teacher[];
  filteredTeachers: Teacher[];
}

export const TeachersList = ({ teachers, filteredTeachers }: TeachersListProps) => {
  if (filteredTeachers.length === 0) {
    return <EmptyTeachersState hasTeachers={teachers.length > 0} />;
  }

  return (
    <div className="grid gap-4">
      {filteredTeachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </div>
  );
};
