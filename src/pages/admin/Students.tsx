
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useStudents } from "@/hooks/useStudents";
import { StudentsHeader } from "@/components/students/StudentsHeader";
import { StudentsList } from "@/components/students/StudentsList";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: students = [], isLoading, error } = useStudents();

  const filteredStudents = students.filter(student =>
    `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
        <StudentsHeader 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        <StudentsList 
          students={students} 
          filteredStudents={filteredStudents} 
        />
      </div>
    </div>
  );
};

export default Students;
