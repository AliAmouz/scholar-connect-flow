
import { supabase } from '@/integrations/supabase/client';

// Function to link parent to students after signup
export const linkParentToStudents = async (userId: string, email: string) => {
  try {
    console.log('Linking parent to students:', userId, email);
    
    // First check if there are students with this parent email
    const { data: students, error: studentsError } = await supabase.rpc('get_students_by_parent_email', { 
      email_address: email 
    });

    if (studentsError) {
      console.error('Error checking for students:', studentsError);
      return;
    }

    if (students && students.length > 0) {
      console.log('Found students to link:', students);
      
      // Link the parent to students
      const { error: linkError } = await supabase.rpc('link_parent_to_students', {
        parent_user_id: userId,
        parent_email_address: email
      });

      if (linkError) {
        console.error('Error linking parent to students:', linkError);
      } else {
        console.log('Successfully linked parent to students');
      }
    } else {
      console.log('No students found with parent email:', email);
    }
  } catch (error) {
    console.error('Error in linkParentToStudents:', error);
  }
};
