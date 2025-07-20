
import { useState, useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";
import { QuizCard, Question } from "@/components/QuizCard";
import { LiveLeaderboard } from "@/components/LiveLeaderboard";
import { sampleQuestions } from "@/data/questions";
import { useToast } from "@/hooks/use-toast";

type GameState = 'login' | 'playing' | 'results';

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

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('login');
  const [currentParticipant, setCurrentParticipant] = useState<Participant>({
    id: '',
    rollNumber: '',
    name: '',
    score: 0,
    questionsAnswered: 0,
    accuracy: 0,
    completionTime: 0,
    timestamp: new Date()
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [startTime, setStartTime] = useState<Date>(new Date());

  const { toast } = useToast();

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleLogin = (rollNumber: string, name: string) => {
    // In real app, this would validate with Supabase
    // For now, simulate authentication
    const participantId = `${rollNumber}_${Date.now()}`;
    
    setCurrentParticipant({
      id: participantId,
      rollNumber,
      name,
      score: 0,
      questionsAnswered: 0,
      accuracy: 0,
      completionTime: 0,
      timestamp: new Date()
    });

    const shuffledQuestions = shuffleArray(sampleQuestions);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setStartTime(new Date());
    setGameState('playing');
    
    toast({
      title: "Quiz Started!",
      description: `Good luck, ${name}! Make it count - you only get one shot! 🚀`
    });
  };

  const handleAnswer = (answer: string, isCorrect: boolean) => {
    const newScore = currentParticipant.score + (isCorrect ? 1 : -0.3);
    const newQuestionsAnswered = currentParticipant.questionsAnswered + 1;
    const newCorrectAnswers = correctAnswers + (isCorrect ? 1 : 0);
    const newAccuracy = (newCorrectAnswers / newQuestionsAnswered) * 100;

    setCurrentParticipant(prev => ({
      ...prev,
      score: Math.max(0, newScore),
      questionsAnswered: newQuestionsAnswered,
      accuracy: newAccuracy
    }));

    setCorrectAnswers(newCorrectAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 500);
    } else {
      setTimeout(() => {
        finishQuiz();
      }, 500);
    }
  };

  const finishQuiz = () => {
    const endTime = new Date();
    const completionTime = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    
    const finalParticipant = {
      ...currentParticipant,
      score: Math.max(0, currentParticipant.score),
      accuracy: (correctAnswers / currentParticipant.questionsAnswered) * 100,
      completionTime,
      timestamp: endTime
    };

    setCurrentParticipant(finalParticipant);
    setGameState('results');

    toast({
      title: "Quiz Complete!",
      description: `Final score: ${finalParticipant.score.toFixed(1)} points in ${Math.floor(completionTime / 60)}m ${completionTime % 60}s`
    });
  };

  const resetToLogin = () => {
    setGameState('login');
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setCorrectAnswers(0);
    setCurrentParticipant({
      id: '',
      rollNumber: '',
      name: '',
      score: 0,
      questionsAnswered: 0,
      accuracy: 0,
      completionTime: 0,
      timestamp: new Date()
    });
  };

  if (gameState === 'login') {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (gameState === 'playing' && questions.length > 0) {
    return (
      <QuizCard
        question={questions[currentQuestionIndex]}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        score={currentParticipant.score}
        playerName={currentParticipant.name}
        onAnswer={handleAnswer}
      />
    );
  }

  if (gameState === 'results') {
    return (
      <LiveLeaderboard
        currentParticipant={currentParticipant}
        onGoHome={resetToLogin}
      />
    );
  }

  return null;
};

export default Index;
