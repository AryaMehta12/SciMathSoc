
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, RotateCcw, Home, Users, Zap, Target } from "lucide-react";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useAuth } from "@/hooks/useAuth";
import { CountdownTimer } from "@/components/CountdownTimer";
import TillEndDate from "@/components/TillEndDate";

interface Participant {
  id: string;
  rollNumber: string;
  name: string;
  score: number;
  questionsAnswered: number;
  accuracy: number;
  completionTime: number;
  timestamp: Date;
}

interface LiveLeaderboardProps {
  currentParticipant: Participant;
  onPlayAgain?: () => void;
  onGoHome: () => void;
  quizEndTime?: string; // Format: "HH:MM" (24-hour format)
}

export const LiveLeaderboard = ({ currentParticipant, onPlayAgain, onGoHome, quizEndTime = <TillEndDate/>}: LiveLeaderboardProps) => {
  const { leaderboard, totalParticipants, loading } = useLeaderboard();
  const { logout } = useAuth();
  
  // Get current top score
  const currentTopScore = leaderboard.length > 0 ? leaderboard[0].score : 0;

  const handleGoHome = () => {
    logout();
    onGoHome();
  };

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

  // Find current participant in leaderboard
  const currentRank = leaderboard.findIndex(p => p.roll_number === currentParticipant.rollNumber) + 1 || 
                     leaderboard.length + 1;
  const isTopThree = currentRank <= 3;

  // Convert leaderboard data to display format
  const displayLeaderboard = leaderboard.map((entry, index) => ({
    id: entry.roll_number,
    rollNumber: entry.roll_number,
    name: entry.name,
    score: entry.score,
    questionsAnswered: currentParticipant.questionsAnswered, // This should ideally come from the database
    accuracy: entry.accuracy,
    completionTime: entry.completion_time,
    timestamp: new Date()
  }));

  // Add current participant if not in top 10
  if (currentRank > 10) {
    displayLeaderboard.push(currentParticipant);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

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
            <CountdownTimer endTime={quizEndTime} />
            <div className="flex items-center space-x-2 bg-card rounded-full px-4 py-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{totalParticipants} participants</span>
            </div>
            <div className="flex items-center space-x-2 bg-card rounded-full px-4 py-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Top: {currentTopScore.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Your Result Card */}
          <div className="lg:col-span-1">
            <Card className={`bg-gradient-card border-border/50 shadow-card h-full ${true ? 'winner-card' : ''}`}>
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
                    onClick={handleGoHome}
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
                  {displayLeaderboard.slice(0, 10).map((participant, index) => (
                    <div 
                      key={participant.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                        participant.id === currentParticipant.rollNumber 
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
                            participant.id === currentParticipant.rollNumber ? 'text-primary' : 'text-foreground'
                          }`}>
                            {participant.name}
                            {participant.id === currentParticipant.rollNumber && (
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
                          participant.id === currentParticipant.rollNumber ? 'text-primary' : 'text-foreground'
                        }`}>
                          {participant.score.toFixed(1)}
                        </div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Winners Announcement */}
                {currentRank === 1 && (
                  <div className="mt-6 p-4 bg-gradient-primary/10 border border-primary/20 rounded-lg">
                    <div className="text-center">
                      <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h3 className="font-bold text-primary">🎉 WINNER! 🎉</h3>
                      <p className="text-sm text-muted-foreground">
                        1st Place: Instagram shoutout + special prize!
                      </p>
                    </div>
                  </div>
                )}
                {currentRank >= 2 && currentRank <= 5 && (
                  <div className="mt-6 p-4 bg-gradient-primary/10 border border-primary/20 rounded-lg">
                    <div className="text-center">
                      <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                      <h3 className="font-bold text-primary">Congratulations!</h3>
                      <p className="text-sm text-muted-foreground">
                        Top 5: Instagram shoutout coming your way!
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
