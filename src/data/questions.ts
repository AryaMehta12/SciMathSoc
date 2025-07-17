import { Question } from "@/components/QuizCard";

export const sampleQuestions: Question[] = [
  // Math Questions
  {
    id: 1,
    type: 'multiple-choice',
    question: 'What is the derivative of x² + 3x - 5?',
    options: ['2x + 3', 'x² + 3', '2x - 5', 'x + 3'],
    correctAnswer: '2x + 3',
    subject: 'math',
    difficulty: 'easy'
  },
  {
    id: 2,
    type: 'text-input',
    question: 'Solve for x: 2x + 7 = 15',
    correctAnswer: '4',
    subject: 'math',
    difficulty: 'easy'
  },
  {
    id: 3,
    type: 'multiple-choice',
    question: 'What is the area of a circle with radius 3?',
    options: ['6π', '9π', '12π', '18π'],
    correctAnswer: '9π',
    subject: 'math',
    difficulty: 'medium'
  },
  {
    id: 4,
    type: 'text-input',
    question: 'What is the square root of 144?',
    correctAnswer: '12',
    subject: 'math',
    difficulty: 'easy'
  },
  {
    id: 5,
    type: 'multiple-choice',
    question: 'Which of these is the quadratic formula?',
    options: [
      'x = (-b ± √(b² - 4ac)) / 2a',
      'x = (b ± √(b² + 4ac)) / 2a', 
      'x = (-b ± √(b² + 4ac)) / 2a',
      'x = (b ± √(b² - 4ac)) / 2a'
    ],
    correctAnswer: 'x = (-b ± √(b² - 4ac)) / 2a',
    subject: 'math',
    difficulty: 'medium'
  },

  // Science Questions
  {
    id: 6,
    type: 'multiple-choice',
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correctAnswer: 'Au',
    subject: 'science',
    difficulty: 'easy'
  },
  {
    id: 7,
    type: 'text-input',
    question: 'How many chambers does a human heart have?',
    correctAnswer: '4',
    subject: 'science',
    difficulty: 'easy'
  },
  {
    id: 8,
    type: 'multiple-choice',
    question: 'What is the speed of light in a vacuum?',
    options: [
      '299,792,458 m/s',
      '300,000,000 m/s',
      '299,000,000 m/s',
      '301,000,000 m/s'
    ],
    correctAnswer: '299,792,458 m/s',
    subject: 'science',
    difficulty: 'hard'
  },
  {
    id: 9,
    type: 'text-input',
    question: 'What gas makes up approximately 78% of Earth\'s atmosphere?',
    correctAnswer: 'nitrogen',
    subject: 'science',
    difficulty: 'medium'
  },
  {
    id: 10,
    type: 'multiple-choice',
    question: 'Who developed the theory of relativity?',
    options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Stephen Hawking'],
    correctAnswer: 'Albert Einstein',
    subject: 'science',
    difficulty: 'easy'
  },
  {
    id: 11,
    type: 'multiple-choice',
    question: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Endoplasmic Reticulum'],
    correctAnswer: 'Mitochondria',
    subject: 'science',
    difficulty: 'easy'
  },
  {
    id: 12,
    type: 'text-input',
    question: 'What is the chemical formula for water?',
    correctAnswer: 'H2O',
    subject: 'science',
    difficulty: 'easy'
  },
  {
    id: 13,
    type: 'multiple-choice',
    question: 'What is the integral of cos(x)?',
    options: ['sin(x) + C', '-sin(x) + C', 'cos(x) + C', '-cos(x) + C'],
    correctAnswer: 'sin(x) + C',
    subject: 'math',
    difficulty: 'medium'
  },
  {
    id: 14,
    type: 'text-input',
    question: 'What planet is known as the Red Planet?',
    correctAnswer: 'mars',
    subject: 'science',
    difficulty: 'easy'
  },
  {
    id: 15,
    type: 'multiple-choice',
    question: 'What is the value of π (pi) to 2 decimal places?',
    options: ['3.14', '3.15', '3.13', '3.16'],
    correctAnswer: '3.14',
    subject: 'math',
    difficulty: 'easy'
  }
];