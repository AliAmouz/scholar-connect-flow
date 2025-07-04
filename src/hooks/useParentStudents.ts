
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface ParentStudent {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  date_of_birth?: string;
  grade_level?: number;
  status: 'active' | 'inactive' | 'graduated';
  enrollment_date?: string;
  created_at: string;
  updated_at: string;
}

export const useParentStudents = () => {
  const { user, userRole } = useAuth();

  return useQuery({
    queryKey: ['parent-students', user?.id],
    queryFn: async () => {
      if (!user || userRole !== 'parent') {
        return [];
      }

      console.log('Fetching students for parent:', user.id);
      
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('parent_id', user.id)
        .eq('status', 'active')
        .order('first_name', { ascending: true });
      
      if (error) {
        console.error('Error fetching parent students:', error);
        throw new Error(`Failed to fetch students: ${error.message}`);
      }
      
      console.log('Students fetched for parent:', data);
      return (data as ParentStudent[]) || [];
    },
    enabled: !!user && userRole === 'parent',
    retry: 1,
    retryDelay: 1000,
  });
};
