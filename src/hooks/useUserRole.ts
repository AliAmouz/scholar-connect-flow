
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useUserRole = (user: User | null) => {
  const [userRole, setUserRole] = useState<string | null>(null);

  // Function to fetch user role from database
  const fetchUserRole = async (userId: string) => {
    try {
      console.log('Fetching role for user:', userId);
      
      // Use the database function to get user role
      const { data, error } = await supabase.rpc('get_user_role', { 
        user_uuid: userId 
      });

      if (error) {
        console.error('Error fetching user role:', error);
        return 'parent'; // Default fallback
      }

      console.log('User role fetched:', data);
      return data || 'parent';
    } catch (error) {
      console.error('Error in fetchUserRole:', error);
      return 'parent'; // Default fallback
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserRole(user.id).then(role => {
        console.log('Setting user role:', role);
        setUserRole(role);
      });
    } else {
      setUserRole(null);
    }
  }, [user]);

  return { userRole, setUserRole, fetchUserRole };
};
