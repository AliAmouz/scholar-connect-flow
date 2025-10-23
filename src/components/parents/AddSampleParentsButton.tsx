import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Users } from 'lucide-react';

export const AddSampleParentsButton = () => {
  const { toast } = useToast();

  const addSampleParents = async () => {
    try {
      // Generate unique IDs for parents
      const parentIds = [
        crypto.randomUUID(),
        crypto.randomUUID(),
        crypto.randomUUID(),
        crypto.randomUUID(),
        crypto.randomUUID(),
      ];

      // Add sample parents
      const { data: parents, error: parentsError } = await supabase
        .from('profiles')
        .insert([
          { id: parentIds[0], email: 'john.smith@parent.com', full_name: 'John Smith', role: 'parent' },
          { id: parentIds[1], email: 'mary.johnson@parent.com', full_name: 'Mary Johnson', role: 'parent' },
          { id: parentIds[2], email: 'david.williams@parent.com', full_name: 'David Williams', role: 'parent' },
          { id: parentIds[3], email: 'sarah.brown@parent.com', full_name: 'Sarah Brown', role: 'parent' },
          { id: parentIds[4], email: 'michael.davis@parent.com', full_name: 'Michael Davis', role: 'parent' },
        ])
        .select();

      if (parentsError) throw parentsError;

      // Get first 5 students to link to parents
      const { data: students, error: studentsError } = await supabase
        .from('students')
        .select('*')
        .limit(5);

      if (studentsError) throw studentsError;

      // Link students to parents
      if (students && parents && students.length > 0 && parents.length > 0) {
        for (let i = 0; i < students.length; i++) {
          const { error: updateError } = await supabase
            .from('students')
            .update({
              parent_id: parents[i]?.id || parents[0].id,
              parent_email: parents[i]?.email || parents[0].email,
            })
            .eq('id', students[i].id);

          if (updateError) throw updateError;
        }
      }

      toast({
        title: 'Sample data added',
        description: 'Successfully added 5 sample parents and linked them to students',
      });
    } catch (error) {
      console.error('Error adding sample parents:', error);
      toast({
        title: 'Error',
        description: 'Failed to add sample parent data',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button onClick={addSampleParents} variant="outline">
      <Users className="h-4 w-4 mr-2" />
      Add Sample Parents
    </Button>
  );
};
