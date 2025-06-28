
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
      <div className="mb-6 lg:mb-8 pt-16 lg:pt-0">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Students</h1>
        <p className="text-gray-600 text-sm lg:text-base">Manage student enrollments and information</p>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="w-full">
          <AddStudentDialog />
        </div>
      </div>
    </>
  );
};
