/*
  # Fix leaderboard trigger security

  1. Changes
    - Drop and recreate the leaderboard cache function with SECURITY DEFINER
    - This allows the trigger to bypass RLS policies when updating leaderboard_cache
    - Recreate the trigger to use the updated function

  2. Security
    - Function runs with elevated privileges to perform internal database operations
    - RLS policies remain in place for direct client access
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS update_leaderboard_on_attempt ON public.quiz_attempts;
DROP FUNCTION IF EXISTS public.update_leaderboard_cache_function();

-- Create the function with SECURITY DEFINER to bypass RLS
CREATE OR REPLACE FUNCTION public.update_leaderboard_cache_function()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_name TEXT;
BEGIN
    -- Get the user's name
    SELECT name INTO user_name FROM public.users WHERE roll_number = NEW.roll_number;

    -- Delete any existing entry for this user in the cache
    -- This ensures only the latest attempt is in the cache for this user
    DELETE FROM public.leaderboard_cache
    WHERE roll_number = NEW.roll_number;

    -- Insert the new attempt into leaderboard_cache
    INSERT INTO public.leaderboard_cache (id, roll_number, name, score, accuracy, completion_time, created_at, updated_at)
    VALUES (gen_random_uuid(), NEW.roll_number, user_name, NEW.score, NEW.accuracy, NEW.completion_time, NOW(), NOW());

    -- Recalculate ranks for all entries in leaderboard_cache
    WITH ranked_leaderboard AS (
        SELECT
            id,
            RANK() OVER (ORDER BY score DESC, completion_time ASC) as new_rank
        FROM public.leaderboard_cache
    )
    UPDATE public.leaderboard_cache lc
    SET rank = rl.new_rank,
        updated_at = NOW()
    FROM ranked_leaderboard rl
    WHERE lc.id = rl.id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger
CREATE TRIGGER update_leaderboard_on_attempt
AFTER INSERT ON public.quiz_attempts
FOR EACH ROW
EXECUTE FUNCTION public.update_leaderboard_cache_function();