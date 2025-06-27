
import { Card, CardContent } from "@/components/ui/card";

interface EmptyTeachersStateProps {
  hasTeachers: boolean;
}

export const EmptyTeachersState = ({ hasTeachers }: EmptyTeachersStateProps) => {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="text-gray-500">
          {!hasTeachers ? (
            <>
              <h3 className="text-lg font-medium mb-2">No teachers found</h3>
              <p>Get started by adding your first teacher.</p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium mb-2">No teachers match your search</h3>
              <p>Try adjusting your search terms.</p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
