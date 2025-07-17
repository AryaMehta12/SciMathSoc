import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Trophy, Target } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Theme Toggle */}
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Quiz World
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Clean questions, simple interface, focused thinking.
          </p>
        </div>

        {/* Main Card */}
        <Card className="border animate-bounce-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-foreground">
              Ready for the Challenge?
            </CardTitle>
            <CardDescription className="text-lg">
              Simple questions, clean interface, your brain at work.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* How it works */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 border rounded">
                <Target className="w-6 h-6 text-foreground mx-auto mb-2" />
                <p className="text-sm font-medium">Questions</p>
              </div>
              
              <div className="text-center p-3 border rounded">
                <span className="text-lg font-bold text-success block mb-2">+1</span>
                <p className="text-sm font-medium">Correct</p>
              </div>
              
              <div className="text-center p-3 border rounded">
                <span className="text-lg font-bold text-destructive block mb-2">-0.3</span>
                <p className="text-sm font-medium">Wrong</p>
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
                className="w-full py-6 text-lg font-medium"
              >
                Start Quiz
              </Button>
            </div>

            {/* Footer message */}
            <div className="text-center pt-4 border-t">
              <p className="text-muted-foreground text-sm">
                Clean. Simple. Focused.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard preview */}
        <Card className="border">
          <CardHeader className="text-center pb-3">
            <div className="flex items-center justify-center space-x-2">
              <Trophy className="w-4 h-4 text-foreground" />
              <CardTitle className="text-base">Leaders</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between items-center py-1 px-2 text-sm">
                <span>Alex Chen</span>
                <span className="font-medium">47.2</span>
              </div>
              <div className="flex justify-between items-center py-1 px-2 text-sm">
                <span>Sarah Kim</span>
                <span className="font-medium">45.8</span>
              </div>
              <div className="flex justify-between items-center py-1 px-2 text-sm">
                <span>Mike Rodriguez</span>
                <span className="font-medium">43.1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};