
// import { useState, useEffect } from "react";
// import { LoginForm } from "@/components/LoginForm";
// import { QuizCard, Question } from "@/components/QuizCard";
// import { LiveLeaderboard } from "@/components/LiveLeaderboard";
// import { sampleQuestions } from "@/data/questions";
// import { useToast } from "@/hooks/use-toast";
// import { useAuth } from "@/hooks/useAuth";
// import { QuizService } from "@/services/quizService";

// type GameState = 'login' | 'playing' | 'results';

// interface Participant {
//   id: string;
//   rollNumber: string;
//   name: string;
//   score: number;
//   questionsAnswered: number;
//   accuracy: number;
//   completionTime: number;
//   timestamp: Date;
// }

// const Index = () => {
//   const [gameState, setGameState] = useState<GameState>('login');
//   const [currentParticipant, setCurrentParticipant] = useState<Participant>({
//     id: '',
//     rollNumber: '',
//     name: '',
//     score: 0,
//     questionsAnswered: 0,
//     accuracy: 0,
//     completionTime: 0,
//     timestamp: new Date()
//   });
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [correctAnswers, setCorrectAnswers] = useState(0);
//   const [startTime, setStartTime] = useState<Date>(new Date());
//   const [answersData, setAnswersData] = useState<any[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { toast } = useToast();
//   const { user, login, logout, loading: authLoading } = useAuth();


//   useEffect(() => {
//     if (user && !authLoading && gameState === 'login') {
//       // User is already logged in, re-validate their participation status
//       handleUserLoginAttempt(user.rollNumber, user.name);
//     }
//   }, [user, authLoading, gameState]);

//   const handleUserLoginAttempt = async (rollNumber: string, name: string) => {
//     const result = await login(rollNumber, name);
    
//     if (result.success) {
//       initializeQuizSession(rollNumber, name);
//     } else {
//       toast({
//         title: "Login Failed",
//         description: result.error || "Unable to start quiz",
//         variant: "destructive"
//       });
//       // Clear stored user data and stay on login page
//       logout();
//       setGameState('login');
//     }
//   };

//   const initializeQuizSession = (rollNumber: string, name: string) => {
//     const participantId = `${rollNumber}_${Date.now()}`;
    
//     setCurrentParticipant({
//       id: participantId,
//       rollNumber,
//       name,
//       score: 0,
//       questionsAnswered: 0,
//       accuracy: 0,
//       completionTime: 0,
//       timestamp: new Date()
//     });

//     setQuestions(sampleQuestions);
//     setCurrentQuestionIndex(0);
//     setCorrectAnswers(0);
//     setAnswersData([]);
//     setStartTime(new Date());
//     setGameState('playing');
    
//     toast({
//       title: "Quiz Started!",
//       description: `Good luck, ${name}! Make it count - you only get one shot! 🚀`
//     });
//   };

//   const handleAnswer = (answer: string, isCorrect: boolean) => {
//     const newScore = currentParticipant.score + (isCorrect ? 1 : -0.3);
//     const newQuestionsAnswered = currentParticipant.questionsAnswered + 1;
//     const newCorrectAnswers = correctAnswers + (isCorrect ? 1 : 0);
//     const newAccuracy = (newCorrectAnswers / newQuestionsAnswered) * 100;

//     // Store answer data
//     const answerRecord = {
//       questionId: questions[currentQuestionIndex].id,
//       question: questions[currentQuestionIndex].question,
//       userAnswer: answer,
//       correctAnswer: questions[currentQuestionIndex].correctAnswer,
//       isCorrect,
//       timeStamp: new Date()
//     };

//     setAnswersData(prev => [...prev, answerRecord]);

//     setCurrentParticipant(prev => ({
//       ...prev,
//       score: Math.max(0, newScore),
//       questionsAnswered: newQuestionsAnswered,
//       accuracy: newAccuracy
//     }));

//     setCorrectAnswers(newCorrectAnswers);

//     if (currentQuestionIndex < questions.length-1 ) {
//       setTimeout(() => {
//         setCurrentQuestionIndex(currentQuestionIndex + 1);
//       }, 500);
//     } else {
//       setTimeout(() => {
//         finishQuiz();
//       }, 500);
//     }
//   };

//   const finishQuiz = async () => {
//     if (isSubmitting) return;
    
//     setIsSubmitting(true);
//     const endTime = new Date();
//     const completionTime = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    
//     const finalParticipant = {
//       ...currentParticipant,
//       score: Math.max(0, currentParticipant.score),
//       accuracy: currentParticipant.questionsAnswered > 0 ? (correctAnswers / currentParticipant.questionsAnswered) * 100 : 0,
//       completionTime,
//       timestamp: endTime
//     };

//     // Submit to Supabase
//     const result = await QuizService.submitQuizResult({
//       rollNumber: finalParticipant.rollNumber,
//       name: finalParticipant.name,
//       score: finalParticipant.score,
//       accuracy: finalParticipant.accuracy,
//       completionTime: finalParticipant.completionTime,
//       questionsAnswered: finalParticipant.questionsAnswered,
//       answersData
//     });

//     if (result.success) {
//       setCurrentParticipant(finalParticipant);
//       setGameState('results');
//       toast({
//         title: "Quiz Complete!",
//         description: `Final score: ${finalParticipant.score.toFixed(1)} points in ${Math.floor(completionTime / 60)}m ${completionTime % 60}s`
//       });
//     } else {
//       toast({
//         title: "Submission Error",
//         description: result.error || "Failed to submit quiz results. Please try again.",
//         variant: "destructive"
//       });
//       // Allow retry
//       setTimeout(() => finishQuiz(), 2000);
//     }
    
//     setIsSubmitting(false);
//   };

//   const resetToLogin = () => {
//     setGameState('login');
//     setCurrentQuestionIndex(0);
//     setQuestions([]);
//     setCorrectAnswers(0);
//     setAnswersData([]);
//     setCurrentParticipant({
//       id: '',
//       rollNumber: '',
//       name: '',
//       score: 0,
//       questionsAnswered: 0,
//       accuracy: 0,
//       completionTime: 0,
//       timestamp: new Date()
//     });
//   };

//   if (gameState === 'login') {
//     return <LoginForm onLogin={handleUserLoginAttempt} />;
//   }

//   if (gameState === 'playing' && questions.length > 0) {
//     return (
//       <QuizCard
//         question={questions[currentQuestionIndex]}
//         questionNumber={currentQuestionIndex + 1}
//         totalQuestions={questions.length}
//         score={currentParticipant.score}
//         playerName={currentParticipant.name}
//         onAnswer={handleAnswer}
//       />
//     );
//   }

//   if (gameState === 'results') {
//     return (
//       <LiveLeaderboard
//         currentParticipant={currentParticipant}
//         onGoHome={resetToLogin}
//         quizEndTime="23:59"
//       />
//     );
//   }

//   if (isSubmitting) {
//     return (
//       <div className="min-h-screen bg-gradient-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-lg text-foreground">Submitting your results...</p>
//         </div>
//       </div>
//     );
//   }

//   return null;
// };

// export default Index;
import { useState, useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";
import { QuizCard, Question } from "@/components/QuizCard";
import { LiveLeaderboard } from "@/components/LiveLeaderboard";
import { sampleQuestions } from "@/data/questions";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { QuizService } from "@/services/quizService";

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
  const [answersData, setAnswersData] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const { user, login, logout, loading: authLoading } = useAuth();

  useEffect(() => {
    if (user && !authLoading && gameState === 'login') {
      handleUserLoginAttempt(user.rollNumber, user.name);
    }
  }, [user, authLoading, gameState]);

  const handleUserLoginAttempt = async (rollNumber: string, name: string) => {
    const result = await login(rollNumber, name);

    if (result.success) {
      initializeQuizSession(rollNumber, name);
    } else {
      toast({
        title: "Login Failed",
        description: result.error || "Unable to start quiz",
        variant: "destructive"
      });
      logout();
      setGameState('login');
    }
  };

  const initializeQuizSession = (rollNumber: string, name: string) => {
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

    setQuestions(sampleQuestions);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setAnswersData([]);
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

    const answerRecord = {
      questionId: questions[currentQuestionIndex].id,
      question: questions[currentQuestionIndex].question,
      userAnswer: answer,
      correctAnswer: questions[currentQuestionIndex].correctAnswer,
      isCorrect,
      timeStamp: new Date()
    };

    setAnswersData(prev => [...prev, answerRecord]);
    setCorrectAnswers(newCorrectAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      // Not last question — just update state and move on
      setCurrentParticipant(prev => ({
        ...prev,
        score: Math.max(0, newScore),
        questionsAnswered: newQuestionsAnswered,
        accuracy: newAccuracy
      }));
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 500);
    } else {
      // Last question — pass updated participant to finishQuiz
      const finalParticipant = {
        ...currentParticipant,
        score: Math.max(0, newScore),
        questionsAnswered: newQuestionsAnswered,
        accuracy: newAccuracy,
        timestamp: new Date()
      };
      setCurrentParticipant(finalParticipant);
      setTimeout(() => {
        finishQuiz(finalParticipant);
      }, 500);
    }
  };

  const finishQuiz = async (finalParticipantParam?: Participant) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const endTime = new Date();
    const completionTime = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

    const finalParticipant = finalParticipantParam ?? {
      ...currentParticipant,
      score: Math.max(0, currentParticipant.score),
      accuracy: currentParticipant.questionsAnswered > 0
        ? (correctAnswers / currentParticipant.questionsAnswered) * 100
        : 0,
      completionTime,
      timestamp: endTime
    };

    const result = await QuizService.submitQuizResult({
      rollNumber: finalParticipant.rollNumber,
      name: finalParticipant.name,
      score: finalParticipant.score,
      accuracy: finalParticipant.accuracy,
      completionTime: finalParticipant.completionTime,
      questionsAnswered: finalParticipant.questionsAnswered,
      answersData
    });

    if (result.success) {
      setCurrentParticipant(finalParticipant);
      setGameState('results');
      toast({
        title: "Quiz Complete!",
        description: `Final score: ${finalParticipant.score.toFixed(1)} points in ${Math.floor(completionTime / 60)}m ${completionTime % 60}s`
      });
    } else {
      toast({
        title: "Submission Error",
        description: result.error || "Failed to submit quiz results. Please try again.",
        variant: "destructive"
      });
      setTimeout(() => finishQuiz(finalParticipant), 2000);
    }

    setIsSubmitting(false);
  };

  const resetToLogin = () => {
    setGameState('login');
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setCorrectAnswers(0);
    setAnswersData([]);
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
    return <LoginForm onLogin={handleUserLoginAttempt} />;
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
        quizEndTime="23:59"
      />
    );
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-foreground">Submitting your results...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
