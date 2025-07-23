
-- Create users table with roll number as primary key
CREATE TABLE public.users (
  roll_number TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  has_participated BOOLEAN DEFAULT FALSE,
  last_participation_date DATE
);

-- Create quiz attempts table
CREATE TABLE public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roll_number TEXT REFERENCES public.users(roll_number) ON DELETE CASCADE,
  score DECIMAL(5,2) NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  completion_time INTEGER NOT NULL, -- in seconds
  questions_answered INTEGER NOT NULL,
  answers_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leaderboard cache for optimized queries
CREATE TABLE public.leaderboard_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roll_number TEXT REFERENCES public.users(roll_number) ON DELETE CASCADE,
  name TEXT NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  completion_time INTEGER NOT NULL,
  rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_cache ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT USING (roll_number = current_setting('app.current_user_roll', true));

CREATE POLICY "Users can insert their own data" ON public.users
  FOR INSERT WITH CHECK (roll_number = current_setting('app.current_user_roll', true));

CREATE POLICY "Users can update their own data" ON public.users
  FOR UPDATE USING (roll_number = current_setting('app.current_user_roll', true));

-- RLS Policies for quiz_attempts table
CREATE POLICY "Users can view their own attempts" ON public.quiz_attempts
  FOR SELECT USING (roll_number = current_setting('app.current_user_roll', true));

CREATE POLICY "Users can insert their own attempts" ON public.quiz_attempts
  FOR INSERT WITH CHECK (roll_number = current_setting('app.current_user_roll', true));

-- RLS Policies for leaderboard (public read access)
CREATE POLICY "Anyone can view leaderboard" ON public.leaderboard_cache
  FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX idx_quiz_attempts_score ON public.quiz_attempts (score DESC, completion_time ASC);
CREATE INDEX idx_leaderboard_rank ON public.leaderboard_cache (rank ASC);
CREATE INDEX idx_users_participation ON public.users (has_participated, last_participation_date);

-- Enable real-time for leaderboard updates
ALTER TABLE public.leaderboard_cache REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.leaderboard_cache;

-- Function to update leaderboard cache
CREATE OR REPLACE FUNCTION update_leaderboard_cache()
RETURNS TRIGGER AS $$
BEGIN
  -- Delete existing entry for this user
  DELETE FROM public.leaderboard_cache WHERE roll_number = NEW.roll_number;
  
  -- Insert new entry with rank calculation
  WITH ranked_scores AS (
    SELECT 
      u.roll_number,
      u.name,
      qa.score,
      qa.accuracy,
      qa.completion_time,
      ROW_NUMBER() OVER (ORDER BY qa.score DESC, qa.completion_time ASC) as rank
    FROM public.users u
    JOIN public.quiz_attempts qa ON u.roll_number = qa.roll_number
    WHERE qa.created_at = (
      SELECT MAX(created_at) 
      FROM public.quiz_attempts qa2 
      WHERE qa2.roll_number = u.roll_number
    )
  )
  INSERT INTO public.leaderboard_cache (roll_number, name, score, accuracy, completion_time, rank)
  SELECT roll_number, name, score, accuracy, completion_time, rank
  FROM ranked_scores;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update leaderboard cache when quiz attempts are inserted
CREATE TRIGGER update_leaderboard_on_attempt
  AFTER INSERT ON public.quiz_attempts
  FOR EACH ROW
  EXECUTE FUNCTION update_leaderboard_cache();
