import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  // Mock user data for debugging - you can change the role here to test different user types
  const mockUser = {
    id: 'mock-user-id',
    email: 'debug@test.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    // Add other required User properties as needed
  } as User;

  const mockSession = {
    user: mockUser,
    access_token: 'mock-token',
    refresh_token: 'mock-refresh',
    expires_in: 3600,
    expires_at: Date.now() + 3600000,
    token_type: 'bearer',
  } as Session;

  // Change this role to test different user types: 'admin', 'teacher', 'parent'
  const mockRole = 'admin'; // <-- Change this to test different roles

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('Mock sign in:', email);
    return { error: null };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    console.log('Mock sign up:', email, fullName);
    return { error: null };
  };

  const signOut = async () => {
    console.log('Mock sign out');
  };

  return (
    <AuthContext.Provider value={{
      user: mockUser,
      session: mockSession,
      userRole: mockRole,
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