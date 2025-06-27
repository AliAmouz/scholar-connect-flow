
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStudentsStateProps {
  hasStudents: boolean;
}

export const EmptyStudentsState = ({ hasStudents }: EmptyStudentsStateProps) => {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="text-gray-500">
          {!hasStudents ? (
            <>
              <h3 className="text-lg font-medium mb-2">No students found</h3>
              <p>Get started by adding your first student.</p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium mb-2">No students match your search</h3>
              <p>Try adjusting your search terms.</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
