
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
      
      // Set RLS context for the current user
      const { error: configError } = await supabase.rpc('set_config', {
        setting_name: 'app.current_user_roll',
        setting_value: rollNumber,
        is_local: true
      });

      if (configError) {
        console.error('Failed to set RLS context:', configError);
        return { success: false, error: 'Authentication setup failed' };
      }

      // Check if user exists
      const { data: existingUser, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('roll_number', rollNumber)
        .maybeSingle();

      if (userError) {
        console.error('User lookup error:', userError);
        return { success: false, error: 'Database error occurred' };
      }

      // If user exists, check if they've already participated
      if (existingUser) {
        if (existingUser.has_participated) {
          return { success: false, error: 'You have already participated in this quiz' };
        }
        // Update name if different
        if (existingUser.name !== name) {
          const { error: updateError } = await supabase
            .from('users')
            .update({ name })
            .eq('roll_number', rollNumber);

          if (updateError) {
            console.error('User update error:', updateError);
            return { success: false, error: 'Failed to update user information' };
          }
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
          console.error('User creation error:', insertError);
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
