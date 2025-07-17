import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, RotateCcw, Home } from "lucide-react";

interface Player {
  name: string;
  score: number;
  questionsAnswered: number;
  accuracy: number;
}

interface QuizLeaderboardProps {
  currentPlayer: Player;
  leaderboard: Player[];
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const QuizLeaderboard = ({ 
  currentPlayer, 
  leaderboard, 
  onPlayAgain, 
  onGoHome 
}: QuizLeaderboardProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <Award className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return "1st";
      case 2: return "2nd"; 
      case 3: return "3rd";
      default: return `${rank}th`;
    }
  };

  const getPerformanceMessage = () => {
    const accuracy = currentPlayer.accuracy;
    if (accuracy >= 90) return "Exceptional performance! 🌟";
    if (accuracy >= 80) return "Great job! 🎉";
    if (accuracy >= 70) return "Well done! 👏";
    if (accuracy >= 60) return "Good effort! 💪";
    return "Keep practicing! 📚";
  };

  const currentRank = leaderboard.findIndex(p => p.name === currentPlayer.name) + 1;

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-academic rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-academic bg-clip-text text-transparent">
              Quiz Complete!
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Your Results */}
          <div className="lg:col-span-1">
            <Card className="shadow-card border-0 h-full">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-primary">Your Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-academic rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-white">#{currentRank}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{currentPlayer.name}</h3>
                    <p className="text-muted-foreground">{getPerformanceMessage()}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Final Score</span>
                    <span className="text-2xl font-bold text-primary">{currentPlayer.score.toFixed(1)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Questions</span>
                    <span className="font-semibold">{currentPlayer.questionsAnswered}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Accuracy</span>
                    <Badge variant={currentPlayer.accuracy >= 80 ? "default" : "secondary"}>
                      {currentPlayer.accuracy.toFixed(0)}%
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Rank</span>
                    <Badge variant="outline">
                      {getRankBadge(currentRank)}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button 
                    onClick={onPlayAgain}
                    className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Play Again
                  </Button>
                  
                  <Button 
                    onClick={onGoHome}
                    variant="outline"
                    className="w-full"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <Card className="shadow-card border-0 h-full">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((player, index) => (
                    <div 
                      key={player.name}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                        player.name === currentPlayer.name 
                          ? 'bg-primary/10 border-2 border-primary/20' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10">
                          {getRankIcon(index + 1)}
                        </div>
                        <div>
                          <h4 className={`font-semibold ${
                            player.name === currentPlayer.name ? 'text-primary' : 'text-foreground'
                          }`}>
                            {player.name}
                            {player.name === currentPlayer.name && (
                              <span className="ml-2 text-xs text-primary">(You)</span>
                            )}
                          </h4>
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <span>{player.questionsAnswered} questions</span>
                            <span>•</span>
                            <span>{player.accuracy.toFixed(0)}% accuracy</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          player.name === currentPlayer.name ? 'text-primary' : 'text-foreground'
                        }`}>
                          {player.score.toFixed(1)}
                        </div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>

                {leaderboard.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Be the first to set a score!</p>
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