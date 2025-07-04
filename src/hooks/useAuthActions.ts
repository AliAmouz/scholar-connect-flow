
import { supabase } from '@/integrations/supabase/client';

export const useAuthActions = (setLoading: (loading: boolean) => void) => {
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    console.log('Attempting to sign in:', email);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      setLoading(false);
    }

    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string, role: string = 'parent') => {
    setLoading(true);
    console.log('Attempting to sign up:', email, 'with role:', role);
    
    // Since email confirmation is disabled, user will be automatically signed in
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role
        }
      }
    });

    if (error) {
      console.error('Sign up error:', error);
      setLoading(false);
    } else {
      console.log('Sign up successful, user should be signed in automatically:', data);
      // Profile will be created automatically by the database trigger
      // User will be automatically signed in since email confirmation is disabled
      // The onAuthStateChange will handle the navigation and parent-student linking
    }

    return { error };
  };

  const signOut = async (navigate: (path: string) => void) => {
    setLoading(true);
    console.log('Signing out user');
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error:', error);
    }
    
    setLoading(false);
    navigate('/auth');
  };

  return { signIn, signUp, signOut };
};
