
import { supabase } from '@/integrations/supabase/client';

export async function setUserContext(rollNumber: string) {
  try {
    // First try to set using SQL function
    const { error } = await supabase.rpc('set_config', {
      setting_name: 'app.current_user_roll',
      setting_value: rollNumber,
      is_local: false
    });

    if (error) {
      console.error('Failed to set user context:', error);
    }
  } catch (error) {
    console.error('Error setting user context:', error);
  }
}
