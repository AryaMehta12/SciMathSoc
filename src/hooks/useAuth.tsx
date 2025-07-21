
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
      
      // Note: RLS context will be handled by the backend triggers

      // Check if user exists
      const { data: existingUser, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('roll_number', rollNumber)
        .single();

      if (userError && userError.code !== 'PGRST116') {
        return { success: false, error: 'Database error occurred' };
      }

      // If user exists, check if they've already participated
      if (existingUser) {
        if (existingUser.has_participated) {
          return { success: false, error: 'You have already participated in this quiz' };
        }
        // Update name if different
        if (existingUser.name !== name) {
          await supabase
            .from('users')
            .update({ name })
            .eq('roll_number', rollNumber);
        }
      } else {
        // Create new user
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            roll_number: rollNumber,
            name,
            has_participated: false
          });

        if (insertError) {
          return { success: false, error: 'Failed to register user' };
        }
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
