import { useState } from "react";
import { QuizWelcome } from "@/components/QuizWelcome";
import { QuizCard, Question } from "@/components/QuizCard";
import { QuizLeaderboard } from "@/components/QuizLeaderboard";
import { sampleQuestions } from "@/data/questions";
import { useToast } from "@/hooks/use-toast";

type GameState = 'welcome' | 'playing' | 'results';

interface Player {
  name: string;
  score: number;
  questionsAnswered: number;
  accuracy: number;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [currentPlayer, setCurrentPlayer] = useState<Player>({
    name: '',
    score: 0,
    questionsAnswered: 0,
    accuracy: 0
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [leaderboard, setLeaderboard] = useState<Player[]>([
    { name: 'Alex Chen', score: 47.2, questionsAnswered: 50, accuracy: 96 },
    { name: 'Sarah Kim', score: 45.8, questionsAnswered: 48, accuracy: 94 },
    { name: 'Mike Rodriguez', score: 43.1, questionsAnswered: 45, accuracy: 91 },
    { name: 'Emma Thompson', score: 41.7, questionsAnswered: 44, accuracy: 89 },
    { name: 'David Park', score: 39.4, questionsAnswered: 42, accuracy: 87 }
  ]);

  const { toast } = useToast();

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = (name: string) => {
    const shuffledQuestions = shuffleArray(sampleQuestions).slice(0, 10);
    setQuestions(shuffledQuestions);
    setCurrentPlayer({
      name,
      score: 0,
      questionsAnswered: 0,
      accuracy: 0
    });
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setGameState('playing');
    
    toast({
      title: "Quiz Started!",
      description: `Good luck, ${name}! 🚀`
    });
  };

  const handleAnswer = (answer: string, isCorrect: boolean) => {
    const newScore = currentPlayer.score + (isCorrect ? 1 : -0.3);
    const newQuestionsAnswered = currentPlayer.questionsAnswered + 1;
    const newCorrectAnswers = correctAnswers + (isCorrect ? 1 : 0);
    const newAccuracy = (newCorrectAnswers / newQuestionsAnswered) * 100;

    setCurrentPlayer({
      ...currentPlayer,
      score: Math.max(0, newScore),
      questionsAnswered: newQuestionsAnswered,
      accuracy: newAccuracy
    });

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
    const finalPlayer = {
      ...currentPlayer,
      score: Math.max(0, currentPlayer.score),
      accuracy: (correctAnswers / currentPlayer.questionsAnswered) * 100
    };

    const newLeaderboard = [...leaderboard, finalPlayer]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setLeaderboard(newLeaderboard);
    setCurrentPlayer(finalPlayer);
    setGameState('results');

    toast({
      title: "Quiz Complete!",
      description: `Final score: ${finalPlayer.score.toFixed(1)} points`
    });
  };

  const resetQuiz = () => {
    setGameState('welcome');
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setCorrectAnswers(0);
  };

  const playAgain = () => {
    const shuffledQuestions = shuffleArray(sampleQuestions).slice(0, 10);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setCurrentPlayer({
      ...currentPlayer,
      score: 0,
      questionsAnswered: 0,
      accuracy: 0
    });
    setGameState('playing');
  };

  if (gameState === 'welcome') {
    return <QuizWelcome onStartQuiz={startQuiz} />;
  }

  if (gameState === 'playing' && questions.length > 0) {
    return (
      <QuizCard
        question={questions[currentQuestionIndex]}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        score={currentPlayer.score}
        playerName={currentPlayer.name}
        onAnswer={handleAnswer}
      />
    );
  }

  if (gameState === 'results') {
    return (
      <QuizLeaderboard
        currentPlayer={currentPlayer}
        leaderboard={leaderboard}
        onPlayAgain={playAgain}
        onGoHome={resetQuiz}
      />
    );
  }

  return null;
};

export default Index;
