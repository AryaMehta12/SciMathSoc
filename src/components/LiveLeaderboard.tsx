
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, RotateCcw, Home, Clock, Users, Zap } from "lucide-react";

interface Participant {
  id: string;
  rollNumber: string;
  name: string;
  score: number;
  questionsAnswered: number;
  accuracy: number;
  completionTime: number; // in seconds
  timestamp: Date;
}

interface LiveLeaderboardProps {
  currentParticipant: Participant;
  onPlayAgain?: () => void;
  onGoHome: () => void;
}

// Mock live data - in real app this would come from Supabase real-time subscription
const mockLeaderboardData: Participant[] = [
  { id: '1', rollNumber: 'CS001', name: 'Arjun Patel', score: 8.7, questionsAnswered: 15, accuracy: 87, completionTime: 180, timestamp: new Date(Date.now() - 120000) },
  { id: '2', rollNumber: 'CS045', name: 'Priya Sharma', score: 8.4, questionsAnswered: 15, accuracy: 84, completionTime: 195, timestamp: new Date(Date.now() - 180000) },
  { id: '3', rollNumber: 'IT032', name: 'Rahul Kumar', score: 8.1, questionsAnswered: 15, accuracy: 81, completionTime: 165, timestamp: new Date(Date.now() - 240000) },
  { id: '4', rollNumber: 'CS078', name: 'Sneha Gupta', score: 7.8, questionsAnswered: 15, accuracy: 78, completionTime: 220, timestamp: new Date(Date.now() - 300000) },
  { id: '5', rollNumber: 'IT019', name: 'Vikram Singh', score: 7.5, questionsAnswered: 15, accuracy: 75, completionTime: 210, timestamp: new Date(Date.now() - 360000) },
];

export const LiveLeaderboard = ({ currentParticipant, onPlayAgain, onGoHome }: LiveLeaderboardProps) => {
  const [leaderboard, setLeaderboard] = useState<Participant[]>([]);
  const [liveStats, setLiveStats] = useState({ totalParticipants: 156, timeLeft: "22h 15m" });

  useEffect(() => {
    // Simulate adding current participant to leaderboard
    const updatedLeaderboard = [...mockLeaderboardData, currentParticipant]
      .sort((a, b) => {
        // First sort by score
        if (b.score !== a.score) return b.score - a.score;
        // If scores are equal, sort by completion time (faster wins)
        return a.completionTime - b.completionTime;
      })
      .slice(0, 10);
    
    setLeaderboard(updatedLeaderboard);

    // Simulate live updates every 10 seconds
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        totalParticipants: prev.totalParticipants + Math.floor(Math.random() * 3)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, [currentParticipant]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-winner-gold" />;
      case 2: return <Medal className="w-6 h-6 text-winner-silver" />;
      case 3: return <Medal className="w-6 h-6 text-winner-bronze" />;
      default: return <Award className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getRankBadge = (rank: number) => {
    const badges = ["🥇", "🥈", "🥉"];
    return rank <= 3 ? badges[rank - 1] : `#${rank}`;
  };

  const getPerformanceMessage = () => {
    const accuracy = currentParticipant.accuracy;
    if (accuracy >= 90) return "Outstanding! 🌟";
    if (accuracy >= 80) return "Excellent! 🎉";
    if (accuracy >= 70) return "Great work! 👏";
    if (accuracy >= 60) return "Good effort! 💪";
    return "Keep learning! 📚";
  };

  const currentRank = leaderboard.findIndex(p => p.id === currentParticipant.id) + 1;
  const isTopThree = currentRank <= 3;

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with Live Stats */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-primary">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-display bg-gradient-primary bg-clip-text text-transparent">
              Live Results
            </h1>
            <div className="live-indicator w-3 h-3 bg-live-indicator rounded-full"></div>
          </div>

          <div className="flex justify-center space-x-4">
            <div className="flex items-center space-x-2 bg-card rounded-full px-4 py-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{liveStats.timeLeft}</span>
            </div>
            <div className="flex items-center space-x-2 bg-card rounded-full px-4 py-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{liveStats.totalParticipants} participants</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Your Result Card */}
          <div className="lg:col-span-1">
            <Card className={`bg-gradient-card border-border/50 shadow-card h-full ${isTopThree ? 'winner-card' : ''}`}>
              <CardHeader className="text-center">
                <CardTitle className="text-heading text-foreground flex items-center justify-center space-x-2">
                  <span>Your Result</span>
                  {isTopThree && <Zap className="w-5 h-5 text-winner-gold animate-pulse" />}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-primary">
                    <span className="text-xl font-bold text-white">{getRankBadge(currentRank)}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{currentParticipant.name}</h3>
                    <p className="text-sm text-muted-foreground">Roll: {currentParticipant.rollNumber}</p>
                    <p className="text-primary font-medium">{getPerformanceMessage()}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Score</span>
                    <span className="text-2xl font-bold text-primary">{currentParticipant.score.toFixed(1)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Accuracy</span>
                    <Badge variant={currentParticipant.accuracy >= 80 ? "default" : "secondary"} className="bg-primary/20 text-primary">
                      {currentParticipant.accuracy.toFixed(0)}%
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Time</span>
                    <span className="font-medium">{Math.floor(currentParticipant.completionTime / 60)}m {currentParticipant.completionTime % 60}s</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Rank</span>
                    <Badge variant="outline" className="border-primary text-primary">
                      #{currentRank}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  {onPlayAgain && (
                    <Button 
                      onClick={onPlayAgain}
                      className="w-full bg-gradient-primary hover:opacity-90 text-white font-medium shadow-primary"
                      disabled
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      One Attempt Only
                    </Button>
                  )}
                  
                  <Button 
                    onClick={onGoHome}
                    variant="outline"
                    className="w-full border-border hover:bg-muted"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Leaderboard */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border/50 shadow-card h-full">
              <CardHeader>
                <CardTitle className="text-heading text-foreground flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span>Live Leaderboard</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-live-indicator rounded-full animate-pulse"></div>
                    <span>Live</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((participant, index) => (
                    <div 
                      key={participant.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                        participant.id === currentParticipant.id 
                          ? 'bg-primary/20 border-2 border-primary/30 shadow-primary' 
                          : 'bg-muted/30 hover:bg-muted/50'
                      } ${index < 3 ? 'winner-card' : ''}`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10">
                          {getRankIcon(index + 1)}
                        </div>
                        <div>
                          <h4 className={`font-semibold ${
                            participant.id === currentParticipant.id ? 'text-primary' : 'text-foreground'
                          }`}>
                            {participant.name}
                            {participant.id === currentParticipant.id && (
                              <span className="ml-2 text-xs text-primary">(You)</span>
                            )}
                          </h4>
                          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                            <span>{participant.rollNumber}</span>
                            <span>•</span>
                            <span>{participant.accuracy.toFixed(0)}% accuracy</span>
                            <span>•</span>
                            <span>{Math.floor(participant.completionTime / 60)}m {participant.completionTime % 60}s</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-xl font-bold ${
                          participant.id === currentParticipant.id ? 'text-primary' : 'text-foreground'
                        }`}>
                          {participant.score.toFixed(1)}
                        </div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Winners Announcement */}
                {isTopThree && (
                  <div className="mt-6 p-4 bg-gradient-primary/10 border border-primary/20 rounded-lg">
                    <div className="text-center">
                      <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h3 className="font-bold text-primary">Congratulations!</h3>
                      <p className="text-sm text-muted-foreground">
                        You're in the top 3! Check our Instagram for your shoutout.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
