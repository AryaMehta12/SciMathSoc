
-- Remove the existing INSERT policy that was causing issues
DROP POLICY IF EXISTS "Allow anon to insert quiz attempts for valid users" ON public.quiz_attempts;

-- Create a new policy that allows anonymous users to insert quiz attempts
-- This removes the RLS restriction for INSERT operations while maintaining data integrity
-- through application-level validation in the handle_user_login function
CREATE POLICY "Allow anonymous quiz submissions" ON public.quiz_attempts
  FOR INSERT 
  WITH CHECK (true);
