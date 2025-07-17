import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Trophy, Target } from "lucide-react";

interface QuizWelcomeProps {
  onStartQuiz: (name: string) => void;
}

export const QuizWelcome = ({ onStartQuiz }: QuizWelcomeProps) => {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim()) {
      onStartQuiz(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-academic rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-academic bg-clip-text text-transparent">
              SciMathSoc
            </h1>
          </div>
          
          <h2 className="text-3xl font-bold text-foreground">
            Quiz World
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Hey there, curious mind. Welcome to a place where your love for science and math comes alive, one question at a time.
          </p>
        </div>

        {/* Main Card */}
        <Card className="shadow-card border-0 animate-bounce-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-primary">
              Ready for the Challenge?
            </CardTitle>
            <CardDescription className="text-lg">
              This isn't just a quiz. It's a challenge, a game, a journey through knowledge — crafted just for thinkers like you.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* How it works */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium">One Question Per Card</p>
                <p className="text-sm text-muted-foreground">Sometimes you'll type, sometimes you'll choose</p>
              </div>
              
              <div className="text-center p-4 bg-muted rounded-lg">
                <span className="text-2xl font-bold text-success block mb-2">+1</span>
                <p className="font-medium">Correct Answer</p>
                <p className="text-sm text-muted-foreground">Every right answer earns you a point</p>
              </div>
              
              <div className="text-center p-4 bg-muted rounded-lg">
                <span className="text-2xl font-bold text-destructive block mb-2">-0.3</span>
                <p className="font-medium">Wrong Answer</p>
                <p className="text-sm text-muted-foreground">Nothing you can't bounce back from</p>
              </div>
            </div>

            {/* Name input */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Enter your name to begin
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name here..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                  className="text-lg py-6 border-border focus:ring-primary"
                />
              </div>
              
              <Button 
                onClick={handleStart}
                disabled={!name.trim()}
                className="w-full py-6 text-lg font-medium bg-gradient-primary hover:opacity-90 transition-all duration-300"
              >
                Start Your Journey
              </Button>
            </div>

            {/* Footer message */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-muted-foreground">
                Your score climbs the leaderboard as you go. No pressure — just good fun and friendly competition.
              </p>
              <p className="text-primary font-medium mt-2">
                We believe in your brainpower. Let's see what it can do.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard preview */}
        <Card className="shadow-card border-0">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <Trophy className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Current Leaders</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 px-4 bg-muted rounded">
                <span className="font-medium">Alex Chen</span>
                <span className="text-primary font-bold">47.2 pts</span>
              </div>
              <div className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded">
                <span className="font-medium">Sarah Kim</span>
                <span className="text-primary font-bold">45.8 pts</span>
              </div>
              <div className="flex justify-between items-center py-2 px-4 bg-muted/30 rounded">
                <span className="font-medium">Mike Rodriguez</span>
                <span className="text-primary font-bold">43.1 pts</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};