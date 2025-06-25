
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  date_of_birth?: string;
  grade_level?: number;
  parent_id?: string;
  status: 'active' | 'inactive' | 'graduated';
  enrollment_date?: string;
  created_at: string;
  updated_at: string;
}

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      console.log('Fetching students...');
      
      // First try to get data without RLS restrictions by temporarily disabling RLS
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('last_name', { ascending: true });
      
      if (error) {
        console.error('Error fetching students:', error);
        // If we get an RLS error, it might be due to missing authentication
        if (error.message.includes('infinite recursion') || error.message.includes('policy')) {
          console.warn('RLS policy issue detected. This might be due to missing authentication or circular policy references.');
        }
        throw new Error(`Failed to fetch students: ${error.message}`);
      }
      
      console.log('Students fetched:', data);
      return (data as Student[]) || [];
    },
    retry: 1,
    retryDelay: 1000,
  });
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Creating student:', studentData);
      const { data, error } = await supabase
        .from('students')
        .insert([studentData])
        .select()
        .single();

      if (error) {
        console.error('Error creating student:', error);
        throw new Error(`Failed to create student: ${error.message}`);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast({
        title: "Success",
        description: "Student created successfully",
      });
    },
    onError: (error: Error) => {
      console.error('Failed to create student:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create student",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...studentData }: Partial<Student> & { id: string }) => {
      console.log('Updating student:', id, studentData);
      const { data, error } = await supabase
        .from('students')
        .update(studentData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating student:', error);
        throw new Error(`Failed to update student: ${error.message}`);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast({
        title: "Success",
        description: "Student updated successfully",
      });
    },
    onError: (error: Error) => {
      console.error('Failed to update student:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update student",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (studentId: string) => {
      console.log('Deleting student:', studentId);
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', studentId);

      if (error) {
        console.error('Error deleting student:', error);
        throw new Error(`Failed to delete student: ${error.message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast({
        title: "Success",
        description: "Student deleted successfully",
      });
    },
    onError: (error: Error) => {
      console.error('Failed to delete student:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete student",
        variant: "destructive",
      });
    },
  });
};
