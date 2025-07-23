import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  rollNumber: string;
  name: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (rollNumber: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear any existing user session on app start to require explicit login
    localStorage.removeItem('quiz_user');
    setLoading(false);
  }, []);

  const login = async (rollNumber: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      // Call the new Supabase RPC function to handle user login/registration
      const { data, error: rpcError } = await supabase.rpc('handle_user_login', {
        p_roll_number: rollNumber,
        p_name: name
      });

      if (rpcError) {
        console.error('Supabase RPC error (handle_user_login):', rpcError);
        return { success: false, error: rpcError.message || 'Authentication failed due to a database error.' };
      }

      // Check the response from the function
      const result = data as any;
      if (!result || !result.success) {
        if (result && result.code === 'ALREADY_PARTICIPATED') {
          return { success: false, error: result.error || 'You have already participated in this quiz.' };
        }
        return { success: false, error: result ? result.error : 'Login failed due to an unknown reason.' };
      }

      const newUser = { rollNumber, name };
      setUser(newUser);
      localStorage.setItem('quiz_user', JSON.stringify(newUser));
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quiz_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}