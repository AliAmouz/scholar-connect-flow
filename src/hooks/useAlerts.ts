
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Alert {
  id: string;
  student_id?: string;
  teacher_id?: string;
  alert_type: 'absence' | 'late' | 'behavior' | 'academic' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  updated_at: string;
}

export const useAlerts = () => {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      console.log('Fetching alerts...');
      const { data, error } = await supabase
        .from('alerts')
        .select(`
          *,
          students:student_id (
            id,
            first_name,
            last_name
          ),
          teachers:teacher_id (
            id,
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching alerts:', error);
        throw error;
      }
      
      console.log('Alerts fetched:', data);
      return data;
    },
  });
};

export const useCreateAlert = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (alertData: Omit<Alert, 'id' | 'created_at' | 'updated_at' | 'read'>) => {
      console.log('Creating alert:', alertData);
      const { data, error } = await supabase
        .from('alerts')
        .insert([{ ...alertData, read: false }])
        .select()
        .single();

      if (error) {
        console.error('Error creating alert:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      toast({
        title: "Success",
        description: "Alert created successfully",
      });
    },
    onError: (error) => {
      console.error('Failed to create alert:', error);
      toast({
        title: "Error",
        description: "Failed to create alert",
        variant: "destructive",
      });
    },
  });
};
