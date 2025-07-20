
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Trophy, Users, Clock } from "lucide-react";

interface LoginFormProps {
  onLogin: (rollNumber: string, name: string) => void;
  competitionTimeLeft?: string;
  totalParticipants?: number;
}

export const LoginForm = ({ onLogin, competitionTimeLeft = "23h 45m", totalParticipants = 142 }: LoginFormProps) => {
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (rollNumber.trim() && name.trim()) {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin(rollNumber.trim(), name.trim());
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-primary">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-display bg-gradient-primary bg-clip-text text-transparent">
            Quiz Championship
          </h1>
          
          <p className="text-body text-muted-foreground">
            Showcase your knowledge. Compete for glory.
          </p>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4 text-center">
              <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{competitionTimeLeft}</div>
              <div className="text-xs text-muted-foreground">Time Left</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-4 text-center">
              <Users className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">{totalParticipants}</div>
              <div className="text-xs text-muted-foreground">Participants</div>
            </CardContent>
          </Card>
        </div>

        {/* Login Form */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-heading text-foreground">
              Enter Competition
            </CardTitle>
            <CardDescription className="text-body">
              One attempt per participant
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="rollNumber" className="text-sm font-medium text-foreground">
                Roll Number
              </label>
              <Input
                id="rollNumber"
                type="text"
                placeholder="Enter your roll number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary"
              />
            </div>
            
            <Button 
              onClick={handleLogin}
              disabled={!rollNumber.trim() || !name.trim() || isLoading}
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-medium h-12 shadow-primary"
            >
              {isLoading ? "Joining..." : "Start Quiz"}
            </Button>

            <div className="text-center pt-2">
              <p className="text-xs text-muted-foreground">
                Daily competition • Top 3 winners featured
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Competition Info */}
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Daily Prizes</span>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div>🥇 1st Place: Instagram shoutout + Recognition</div>
              <div>🥈 2nd Place: Instagram shoutout</div>
              <div>🥉 3rd Place: Instagram shoutout</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
