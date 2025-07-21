
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Trophy, Users, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: (rollNumber: string, name: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { totalParticipants } = useLeaderboard();
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!rollNumber.trim() || !name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both roll number and name",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    const result = await login(rollNumber.trim(), name.trim());
    
    if (result.success) {
      onLogin(rollNumber.trim(), name.trim());
      toast({
        title: "Login Successful!",
        description: `Welcome ${name}! Your quiz is starting now.`
      });
    } else {
      toast({
        title: "Login Failed",
        description: result.error || "An error occurred during login",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  // Calculate time left (mock data for now)
  const competitionTimeLeft = "23h 45m";

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <div className="flex items-center space-x-1">
                <span className="text-2xl">🧪</span>
                <span className="text-2xl">📐</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            SciMathSoc Quiz
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Science & Mathematics Society Challenge
          </p>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
              <span>Live Competition</span>
            </span>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-card border-primary/20 shadow-card backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <span className="text-lg">⏱️</span>
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div className="text-lg font-bold text-primary">{competitionTimeLeft}</div>
              <div className="text-xs text-muted-foreground">Time Remaining</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-primary/20 shadow-card backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <span className="text-lg">👥</span>
                <Users className="w-4 h-4 text-success" />
              </div>
              <div className="text-lg font-bold text-success">{totalParticipants || 0}</div>
              <div className="text-xs text-muted-foreground">Active Players</div>
            </CardContent>
          </Card>
        </div>

        {/* Login Form */}
        <Card className="bg-gradient-card border-primary/20 shadow-glow backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-center space-x-2">
              <span>🚀</span>
              <span>Join the Challenge</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your details to compete with fellow scientists & mathematicians
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="rollNumber" className="text-sm font-medium text-foreground flex items-center space-x-2">
                <span>🎓</span>
                <span>Roll Number</span>
              </label>
              <Input
                id="rollNumber"
                type="text"
                placeholder="e.g., 21CS001"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                className="bg-input border-primary/20 text-foreground placeholder:text-muted-foreground focus:ring-primary/20 focus:border-primary py-3 text-lg"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center space-x-2">
                <span>👤</span>
                <span>Full Name</span>
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleLogin()}
                className="bg-input border-primary/20 text-foreground placeholder:text-muted-foreground focus:ring-primary/20 focus:border-primary py-3 text-lg"
                disabled={isLoading}
              />
            </div>
            
            <Button 
              onClick={handleLogin}
              disabled={!rollNumber.trim() || !name.trim() || isLoading}
              className="w-full bg-gradient-primary hover:shadow-primary text-white font-medium h-14 text-lg transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>⚡</span>
                  <span>Start Quiz Challenge</span>
                </div>
              )}
            </Button>

            <div className="text-center pt-2">
              <p className="text-xs text-muted-foreground">
                One attempt per participant • Real-time leaderboard updates
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Competition Info */}
        <Card className="bg-gradient-card border-primary/20 shadow-card backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🏆</span>
              <span className="text-lg font-semibold text-foreground">SciMathSoc Recognition</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-winner-gold/10 to-transparent">
                <span className="text-winner-gold text-lg">🥇</span>
                <span className="text-foreground font-medium">Champion: Certificate + Special Prize</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-winner-silver/10 to-transparent">
                <span className="text-winner-silver text-lg">🥈</span>
                <span className="text-foreground font-medium">Runner-up: Certificate of Excellence</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-winner-bronze/10 to-transparent">
                <span className="text-winner-bronze text-lg">🥉</span>
                <span className="text-foreground font-medium">3rd Place: Certificate of Merit</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-primary/20 text-center">
              <p className="text-xs text-muted-foreground">
                🎯 10 Questions • ⚡ Speed Scoring • 📈 Live Rankings
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
