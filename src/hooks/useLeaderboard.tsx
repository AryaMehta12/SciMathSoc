
import { useState, useEffect } from 'react';
import { QuizService, LeaderboardEntry } from '@/services/quizService';

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch leaderboard
        const { data, error: leaderboardError } = await QuizService.getLeaderboard();
        if (leaderboardError) {
          setError(leaderboardError);
        } else {
          setLeaderboard(data);
        }

        // Fetch total participants
        const participants = await QuizService.getTotalParticipants();
        setTotalParticipants(participants);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    // Subscribe to real-time updates
    const unsubscribe = QuizService.subscribeToLeaderboard((newData) => {
      setLeaderboard(newData);
      // Refresh participant count when leaderboard updates
      QuizService.getTotalParticipants().then(setTotalParticipants);
    });

    return unsubscribe;
  }, []);

  return { leaderboard, totalParticipants, loading, error };
}
