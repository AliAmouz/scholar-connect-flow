
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Teacher {
  id: string;
  user_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  subject?: string;
  hire_date?: string;
  created_at: string;
  updated_at: string;
}

export const useTeachers = () => {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      console.log('Fetching teachers...');
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('last_name', { ascending: true });
      
      if (error) {
        console.error('Error fetching teachers:', error);
        throw new Error(`Failed to fetch teachers: ${error.message}`);
      }
      
      console.log('Teachers fetched:', data);
      return (data as Teacher[]) || [];
    },
    retry: 1,
    retryDelay: 1000,
  });
};

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (teacherData: Omit<Teacher, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Creating teacher:', teacherData);
      const { data, error } = await supabase
        .from('teachers')
        .insert([teacherData])
        .select()
        .single();

      if (error) {
        console.error('Error creating teacher:', error);
        throw new Error(`Failed to create teacher: ${error.message}`);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      toast({
        title: "Success",
        description: "Teacher created successfully",
      });
    },
    onError: (error: Error) => {
      console.error('Failed to create teacher:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create teacher",
        variant: "destructive",
      });
    },
  });
};
