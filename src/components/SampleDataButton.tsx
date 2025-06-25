
import { Button } from "@/components/ui/button";
import { useCreateStudent } from "@/hooks/useStudents";
import { useCreateTeacher } from "@/hooks/useTeachers";
import { useCreateAlert } from "@/hooks/useAlerts";
import { useToast } from "@/hooks/use-toast";

const SampleDataButton = () => {
  const createStudent = useCreateStudent();
  const createTeacher = useCreateTeacher();
  const createAlert = useCreateAlert();
  const { toast } = useToast();

  const addSampleData = async () => {
    try {
      // Add sample students
      const sampleStudents = [
        {
          first_name: "Alice",
          last_name: "Johnson",
          email: "alice.johnson@school.edu",
          grade_level: 10,
          status: "active" as const,
          enrollment_date: "2023-09-01"
        },
        {
          first_name: "Bob",
          last_name: "Smith",
          email: "bob.smith@school.edu",
          grade_level: 11,
          status: "active" as const,
          enrollment_date: "2022-09-01"
        },
        {
          first_name: "Carol",
          last_name: "Williams",
          email: "carol.williams@school.edu",
          grade_level: 9,
          status: "inactive" as const,
          enrollment_date: "2024-01-15"
        }
      ];

      // Add sample teachers
      const sampleTeachers = [
        {
          first_name: "Sarah",
          last_name: "Wilson",
          email: "sarah.wilson@school.edu",
          subject: "Mathematics",
          hire_date: "2020-08-15"
        },
        {
          first_name: "John",
          last_name: "Davis",
          email: "john.davis@school.edu",
          subject: "English Literature",
          hire_date: "2019-07-20"
        },
        {
          first_name: "Emily",
          last_name: "Chen",
          email: "emily.chen@school.edu",
          subject: "Science",
          hire_date: "2021-01-10"
        }
      ];

      // Add sample alerts
      const sampleAlerts = [
        {
          alert_type: "absence" as const,
          priority: "medium" as const,
          title: "Student Absence",
          message: "Student was absent from morning classes"
        },
        {
          alert_type: "behavior" as const,
          priority: "high" as const,
          title: "Behavior Issue",
          message: "Disruptive behavior reported in math class"
        },
        {
          alert_type: "academic" as const,
          priority: "low" as const,
          title: "Assignment Missing",
          message: "Missing homework assignment in English"
        }
      ];

      // Create students
      for (const student of sampleStudents) {
        await new Promise(resolve => {
          createStudent.mutate(student, {
            onSettled: () => resolve(undefined)
          });
        });
      }

      // Create teachers
      for (const teacher of sampleTeachers) {
        await new Promise(resolve => {
          createTeacher.mutate(teacher, {
            onSettled: () => resolve(undefined)
          });
        });
      }

      // Create alerts
      for (const alert of sampleAlerts) {
        await new Promise(resolve => {
          createAlert.mutate(alert, {
            onSettled: () => resolve(undefined)
          });
        });
      }

      toast({
        title: "Success",
        description: "Sample data has been added to the database",
      });
    } catch (error) {
      console.error('Error adding sample data:', error);
      toast({
        title: "Error",
        description: "Failed to add sample data",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      onClick={addSampleData}
      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
      disabled={createStudent.isPending || createTeacher.isPending || createAlert.isPending}
    >
      {createStudent.isPending || createTeacher.isPending || createAlert.isPending 
        ? "Adding Sample Data..." 
        : "Add Sample Data"
      }
    </Button>
  );
};

export default SampleDataButton;
