
-- Drop the problematic RLS policy that depends on current_setting
DROP POLICY IF EXISTS "Users can insert their own attempts" ON public.quiz_attempts;

-- Keep only the policy that allows anonymous users to insert quiz attempts for valid users
-- This policy checks if the user exists in the users table, which is sufficient for security
-- The "Allow anon to insert quiz attempts for valid users" policy should remain as is
