/*
  # Add roll number validation

  1. Updates
    - Modify handle_user_login function to validate roll number range (250001 - 251350)
    - Return appropriate error message for invalid roll numbers

  2. Security
    - Maintains existing RLS policies
    - Adds input validation before database operations
*/

CREATE OR REPLACE FUNCTION public.handle_user_login(
  p_roll_number TEXT,
  p_name TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  roll_number_int INTEGER;
  existing_user RECORD;
BEGIN
  -- Validate roll number format (must be numeric)
  BEGIN
    roll_number_int := p_roll_number::INTEGER;
  EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Roll number must be a valid number',
      'code', 'INVALID_FORMAT'
    );
  END;

  -- Validate roll number range (250001 - 251350)
  IF roll_number_int < 250001 OR roll_number_int > 251350 THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Roll number must be between 250001 and 251350',
      'code', 'INVALID_RANGE'
    );
  END IF;

  -- Set the RLS context for the current user
  PERFORM set_config('app.current_user_roll', p_roll_number, true);

  -- Check if user already exists
  SELECT * INTO existing_user FROM users WHERE roll_number = p_roll_number;

  IF existing_user IS NOT NULL THEN
    -- User exists, check if they have already participated
    IF existing_user.has_participated = true THEN
      RETURN json_build_object(
        'success', false,
        'error', 'You have already participated in this quiz. Only one attempt is allowed.',
        'code', 'ALREADY_PARTICIPATED'
      );
    ELSE
      -- User exists but hasn't participated, update their name if different
      IF existing_user.name != p_name THEN
        UPDATE users 
        SET name = p_name, updated_at = now()
        WHERE roll_number = p_roll_number;
      END IF;
      
      RETURN json_build_object(
        'success', true,
        'message', 'Login successful'
      );
    END IF;
  ELSE
    -- User doesn't exist, create new user
    INSERT INTO users (roll_number, name, has_participated, created_at)
    VALUES (p_roll_number, p_name, false, now());
    
    RETURN json_build_object(
      'success', true,
      'message', 'User created and login successful'
    );
  END IF;

EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object(
    'success', false,
    'error', 'An unexpected error occurred: ' || SQLERRM,
    'code', 'UNEXPECTED_ERROR'
  );
END;
$$;