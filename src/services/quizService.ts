
// import { supabase } from '@/integrations/supabase/client';

// export interface QuizResult {
//   rollNumber: string;
//   name: string;
//   score: number;
//   accuracy: number;
//   completionTime: number;
//   questionsAnswered: number;
//   answersData: any[];
// }

// export interface LeaderboardEntry {
//   roll_number: string;
//   name: string;
//   score: number;
//   accuracy: number;
//   completion_time: number;
//   rank: number;
// }

// export class QuizService {
//   static async submitQuizResult(result: QuizResult): Promise<{ success: boolean; error?: string }> {
//     try {
//       // Note: RLS context will be handled by the backend triggers

//       // Insert quiz attempt
//       const { error: attemptError } = await supabase
//         .from('quiz_attempts')
//         .insert({
//           roll_number: result.rollNumber,
//           score: result.score,
//           accuracy: result.accuracy,
//           completion_time: result.completionTime,
//           questions_answered: result.questionsAnswered,
//           answers_data: result.answersData
//         });

//       if (attemptError) {
//         console.error('Quiz attempt error:', attemptError);
//         return { success: false, error: 'Failed to save quiz results' };
//       }

//       // Update user participation status
//       const { error: userError } = await supabase
//         .from('users')
//         .update({
//           has_participated: true,
//           last_participation_date: new Date().toISOString().split('T')[0]
//         })
//         .eq('roll_number', result.rollNumber);

//       if (userError) {
//         console.error('User update error:', userError);
//         return { success: false, error: 'Failed to update user status' };
//       }

//       return { success: true };
//     } catch (error) {
//       console.error('Submit quiz error:', error);
//       return { success: false, error: 'An unexpected error occurred' };
//     }
//   }

//   static async getLeaderboard(): Promise<{ data: LeaderboardEntry[]; error?: string }> {
//     try {
//       const { data, error } = await supabase
//         .from('leaderboard_cache')
//         .select('*')
//         .order('rank', { ascending: true })
//         .limit(10);

//       if (error) {
//         console.error('Leaderboard error:', error);
//         return { data: [], error: 'Failed to fetch leaderboard' };
//       }

//       return { data: data || [] };
//     } catch (error) {
//       console.error('Get leaderboard error:', error);
//       return { data: [], error: 'An unexpected error occurred' };
//     }
//   }

//   static async getTotalParticipants(): Promise<number> {
//     try {
//       const { count, error } = await supabase
//         .from('users')
//         .select('*', { count: 'exact', head: true })
//         .eq('has_participated', true);

//       if (error) {
//         console.error('Participants count error:', error);
//         return 0;
//       }

//       return count || 0;
//     } catch (error) {
//       console.error('Get participants error:', error);
//       return 0;
//     }
//   }

//   static subscribeToLeaderboard(callback: (data: LeaderboardEntry[]) => void) {
//     const channel = supabase
//       .channel('leaderboard-changes')
//       .on(
//         'postgres_changes',
//         {
//           event: '*',
//           schema: 'public',
//           table: 'leaderboard_cache'
//         },
//         async () => {
//           const { data } = await this.getLeaderboard();
//           callback(data);
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }
// }
import { supabase } from '@/integrations/supabase/client';

export interface QuizResult {
  rollNumber: string;
  name: string;
  score: number;
  accuracy: number;
  completionTime: number;
  questionsAnswered: number;
  answersData: any[];
}

export interface LeaderboardEntry {
  roll_number: string;
  name: string;
  score: number;
  accuracy: number;
  completion_time: number;
  rank: number;
}

export class QuizService {
  static async submitQuizResult(result: QuizResult): Promise<{ success: boolean; error?: string }> {
    try {
      // ✅ Step 1: Ensure user exists
      const { data: user, error: userCheckError } = await supabase
        .from('users')
        .select('roll_number')
        .eq('roll_number', result.rollNumber)
        .maybeSingle();

      if (userCheckError) {
        console.error('Error checking user existence:', userCheckError);
        return { success: false, error: 'Failed to verify user existence' };
      }

      if (!user) {
        return { success: false, error: 'User not found. Please register first.' };
      }

      // ✅ Step 2: Insert quiz attempt
      const { error: attemptError } = await supabase
        .from('quiz_attempts')
        .insert({
          roll_number: result.rollNumber,
          score: result.score,
          accuracy: result.accuracy,
          completion_time: result.completionTime,
          questions_answered: result.questionsAnswered,
          answers_data: result.answersData
        });

      if (attemptError) {
        console.error('Quiz attempt error:', attemptError);
        return { success: false, error: attemptError.message || 'Failed to save quiz results' };
      }

      // ✅ Step 3: Update user participation
      const { error: userError } = await supabase
        .from('users')
        .update({
          has_participated: true,
          last_participation_date: new Date().toISOString().split('T')[0]
        })
        .eq('roll_number', result.rollNumber);

      if (userError) {
        console.error('User update error:', userError);
        return { success: false, error: userError.message || 'Failed to update user status' };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Submit quiz error:', error);
      return { success: false, error: error.message || 'An unexpected error occurred' };
    }
  }

  static async getLeaderboard(): Promise<{ data: LeaderboardEntry[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('leaderboard_cache')
        .select('*')
        .order('rank', { ascending: true })
        .limit(10);

      if (error) {
        console.error('Leaderboard error:', error);
        return { data: [], error: 'Failed to fetch leaderboard' };
      }

      return { data: data || [] };
    } catch (error: any) {
      console.error('Get leaderboard error:', error);
      return { data: [], error: error.message || 'An unexpected error occurred' };
    }
  }

  static async getTotalParticipants(): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('has_participated', true);

      if (error) {
        console.error('Participants count error:', error);
        return 0;
      }

      return count || 0;
    } catch (error: any) {
      console.error('Get participants error:', error);
      return 0;
    }
  }

  static subscribeToLeaderboard(callback: (data: LeaderboardEntry[]) => void) {
    const channel = supabase
      .channel('leaderboard-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leaderboard_cache'
        },
        async () => {
          const { data } = await this.getLeaderboard();
          callback(data);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
}
