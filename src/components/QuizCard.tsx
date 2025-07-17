import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Award, Brain } from "lucide-react";

export interface Question {
  id: number;
  type: 'multiple-choice' | 'text-input';
  question: string;
  options?: string[];
  correctAnswer: string;
  subject: 'math' | 'science';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  playerName: string;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  showResult?: boolean;
  isCorrect?: boolean;
  userAnswer?: string;
}

export const QuizCard = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  score, 
  playerName, 
  onAnswer,
  showResult = false,
  isCorrect = false,
  userAnswer = ""
}: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [textInput, setTextInput] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);

  const progress = (questionNumber / totalQuestions) * 100;

  useEffect(() => {
    setSelectedAnswer("");
    setTextInput("");
    setHasAnswered(false);
  }, [question.id]);

  const handleSubmit = () => {
    if (hasAnswered) return;
    
    const answer = question.type === 'multiple-choice' ? selectedAnswer : textInput;
    if (!answer.trim()) return;

    const correct = answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
    setHasAnswered(true);
    
    setTimeout(() => {
      onAnswer(answer, correct);
    }, 1500);
  };

  const getSubjectIcon = () => {
    return question.subject === 'math' ? '📐' : '🔬';
  };

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-primary';
      case 'hard': return 'text-destructive';
      default: return 'text-primary';
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-medium text-foreground">{playerName}</h1>
                <p className="text-sm text-muted-foreground">{questionNumber}/{totalQuestions}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-foreground" />
                <span className="text-xl font-bold text-foreground">{score.toFixed(1)}</span>
              </div>
            </div>
          </div>
          
          <Progress value={progress} className="h-1" />
        </div>

        {/* Question Card */}
        <Card className={`border transition-all duration-500 ${
          hasAnswered 
            ? (selectedAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim() || textInput.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim())
              ? 'border-success' 
              : 'border-destructive'
            : ''
        }`}>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-foreground">
              {question.question}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Answer options */}
            {question.type === 'multiple-choice' && question.options && (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === option ? "default" : "outline"}
                    className={`w-full p-4 h-auto text-left justify-start transition-all duration-200 ${
                      selectedAnswer === option 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    } ${
                      hasAnswered 
                        ? option === question.correctAnswer
                          ? 'bg-success text-success-foreground border-success'
                          : selectedAnswer === option && option !== question.correctAnswer
                            ? 'bg-destructive text-destructive-foreground border-destructive'
                            : 'opacity-50'
                        : ''
                    }`}
                    onClick={() => !hasAnswered && setSelectedAnswer(option)}
                    disabled={hasAnswered}
                  >
                    <span className="mr-3 font-semibold">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                    {hasAnswered && option === question.correctAnswer && (
                      <CheckCircle className="w-5 h-5 ml-auto" />
                    )}
                    {hasAnswered && selectedAnswer === option && option !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 ml-auto" />
                    )}
                  </Button>
                ))}
              </div>
            )}

            {/* Text input */}
            {question.type === 'text-input' && (
              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="Type your answer here..."
                  value={textInput}
                  onChange={(e) => !hasAnswered && setTextInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  disabled={hasAnswered}
                  className={`text-lg py-6 ${
                    hasAnswered 
                      ? textInput.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()
                        ? 'border-success bg-success/10'
                        : 'border-destructive bg-destructive/10'
                      : 'border-border focus:ring-primary'
                  }`}
                />
                {hasAnswered && (
                  <div className="flex items-center space-x-2 text-sm">
                    {textInput.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim() ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-success">Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-destructive" />
                        <span className="text-destructive">
                          Incorrect. The answer was: <strong>{question.correctAnswer}</strong>
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Submit button */}
            {!hasAnswered && (
              <Button 
                onClick={handleSubmit}
                disabled={question.type === 'multiple-choice' ? !selectedAnswer : !textInput.trim()}
                className="w-full py-4 font-medium"
              >
                Submit
              </Button>
            )}

            {/* Result feedback */}
            {hasAnswered && (
              <div className="text-center pt-4 border-t">
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded text-sm ${
                  (selectedAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim() || 
                   textInput.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim())
                    ? 'bg-success/10 text-success' 
                    : 'bg-destructive/10 text-destructive'
                }`}>
                  {(selectedAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim() || 
                    textInput.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>+1.0</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      <span>-0.3</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};