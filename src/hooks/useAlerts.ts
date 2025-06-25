
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
      
      // First try to get basic alerts without joins to avoid circular reference issues
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching alerts:', error);
        // Return empty array instead of throwing to prevent blocking the dashboard
        console.warn('Returning empty alerts array due to error:', error.message);
        return [];
      }
      
      console.log('Alerts fetched:', data);
      return (data || []) as Alert[];
    },
    retry: 1,
    retryDelay: 1000,
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
        throw new Error(`Failed to create alert: ${error.message}`);
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
    onError: (error: Error) => {
      console.error('Failed to create alert:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create alert",
        variant: "destructive",
      });
    },
  });
};
