
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Class {
  id: string;
  name: string;
  subject: string;
  teacher_id?: string;
  grade_level?: number;
  room_number?: string;
  schedule?: string;
  capacity?: number;
  status: 'active' | 'completed' | 'scheduled';
  created_at: string;
  updated_at: string;
}

export const useClasses = () => {
  return useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      console.log('Fetching classes...');
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          teachers:teacher_id (
            id,
            first_name,
            last_name
          )
        `)
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Error fetching classes:', error);
        throw error;
      }
      
      console.log('Classes fetched:', data);
      return data;
    },
  });
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (classData: Omit<Class, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Creating class:', classData);
      const { data, error } = await supabase
        .from('classes')
        .insert([classData])
        .select()
        .single();

      if (error) {
        console.error('Error creating class:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      toast({
        title: "Success",
        description: "Class created successfully",
      });
    },
    onError: (error) => {
      console.error('Failed to create class:', error);
      toast({
        title: "Error",
        description: "Failed to create class",
        variant: "destructive",
      });
    },
  });
};
