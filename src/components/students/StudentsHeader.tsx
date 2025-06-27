
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AddStudentDialog } from "./AddStudentDialog";

interface StudentsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const StudentsHeader = ({ searchTerm, onSearchChange }: StudentsHeaderProps) => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Students</h1>
        <p className="text-gray-600">Manage student enrollments and information</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <AddStudentDialog />
      </div>
    </>
  );
};
