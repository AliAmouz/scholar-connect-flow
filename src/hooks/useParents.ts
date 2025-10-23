import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Parent {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  grade_level: number;
  status: string;
  parent_id: string;
}

export const useParents = () => {
  const { data: parents = [], isLoading: parentsLoading } = useQuery({
    queryKey: ['parents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'parent')
        .order('full_name', { ascending: true });
      
      if (error) throw error;
      return data as Parent[];
    },
  });

  const { data: students = [], isLoading: studentsLoading } = useQuery({
    queryKey: ['students-with-parents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .not('parent_id', 'is', null)
        .order('first_name', { ascending: true });
      
      if (error) throw error;
      return data as Student[];
    },
  });

  const getChildrenForParent = (parentId: string) => {
    return students.filter(student => student.parent_id === parentId);
  };

  const stats = {
    totalParents: parents.length,
    parentsWithChildren: parents.filter(parent => 
      students.some(student => student.parent_id === parent.id)
    ).length,
    totalChildren: students.length,
  };

  return {
    parents,
    students,
    isLoading: parentsLoading || studentsLoading,
    getChildrenForParent,
    stats,
  };
};
