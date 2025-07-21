
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
    // Check if user is already logged in from localStorage
    const savedUser = localStorage.getItem('quiz_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('quiz_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (rollNumber: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      // Call the centralized user login function
      const { data, error } = await supabase.rpc('handle_user_login', {
        p_roll_number: rollNumber,
        p_name: name
      });

      if (error) {
        console.error('Login RPC error:', error);
        return { success: false, error: 'Authentication failed' };
      }

      // Check the response from the function
      if (!data.success) {
        if (data.code === 'ALREADY_PARTICIPATED') {
          return { success: false, error: 'You have already participated in this quiz' };
        }
        return { success: false, error: data.error || 'Login failed' };
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
