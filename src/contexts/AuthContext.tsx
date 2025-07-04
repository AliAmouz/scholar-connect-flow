
import React, { createContext, useContext, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from '@/hooks/useAuthState';
import { useUserRole } from '@/hooks/useUserRole';
import { useAuthActions } from '@/hooks/useAuthActions';
import { linkParentToStudents } from '@/utils/parentStudentLinking';
import { navigateBasedOnRole } from '@/utils/authNavigation';

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
  const navigate = useNavigate();
  const { user, session, loading, setLoading } = useAuthState();
  const { userRole, setUserRole, fetchUserRole } = useUserRole(user);
  const { signIn, signUp, signOut: authSignOut } = useAuthActions(setLoading);

  // Handle auth state changes for role fetching and navigation
  useEffect(() => {
    if (user && session) {
      setTimeout(async () => {
        const role = await fetchUserRole(user.id);
        console.log('Setting user role:', role);
        setUserRole(role);
        
        // If this is a new parent signup, link them to students
        if (role === 'parent' && user.email) {
          await linkParentToStudents(user.id, user.email);
        }
        
        // Auto-navigate based on role for successful sign-in
        if (role) {
          navigateBasedOnRole(role, navigate);
        }
        
        setLoading(false);
      }, 0);
    }
  }, [user, session, fetchUserRole, setUserRole, navigate, setLoading]);

  const signOut = async () => {
    await authSignOut(navigate);
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
