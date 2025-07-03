
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string, role?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  // Function to handle role-based navigation
  const navigateBasedOnRole = (role: string) => {
    console.log('Navigating based on role:', role);
    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'teacher':
        navigate('/teacher');
        break;
      case 'parent':
        navigate('/parent');
        break;
      default:
        console.log('Unknown role, defaulting to parent dashboard');
        navigate('/parent');
        break;
    }
  };

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fetch user role when user is authenticated
          setTimeout(async () => {
            const role = await fetchUserRole(session.user.id);
            console.log('Setting user role:', role);
            setUserRole(role);
            
            // Auto-navigate based on role for successful sign-in or token refresh
            if (role && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
              navigateBasedOnRole(role);
            }
            
            setLoading(false);
          }, 0);
        } else {
          setUserRole(null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Checking existing session:', session?.user?.email);
      if (session) {
        setSession(session);
        setUser(session.user);
        
        fetchUserRole(session.user.id).then(role => {
          console.log('Existing session role:', role);
          setUserRole(role);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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
      // The onAuthStateChange will handle the navigation
    }

    return { error };
  };

  const signOut = async () => {
    setLoading(true);
    console.log('Signing out user');
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error:', error);
    }
    
    setUser(null);
    setSession(null);
    setUserRole(null);
    setLoading(false);
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      userRole,
      loading,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
