import { Question } from "@/components/QuizCard";

export const sampleQuestions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'Two witches make a nightly visit to an all-night coffee shop. Each arrives at a random time between 0:00 and 1:00. Each one of them stays for exactly 30 minutes. On any one given night, what is the probability that the witches will meet at the coffee shop?',
    options: ['1', '0.5', '0.25', '0.75'],
    correctAnswer: '0.75',
    subject: 'math',
    difficulty: 'medium'
  },
  {  
    id: 2,
    type: 'text-input',
    question: 'What is the first name of the person who made the official SciMathSoc Website (To see the light one needs to enter the dark) \n Answer IN ALL CAPS EG: XAVIER , **Answer to all easter Egg questions are on the website!(cant gpt this one 😔) ',
    correctAnswer: 'ANANY',
    subject: 'EasterEgg',
    difficulty: 'easy'
  },

  {
    id: 3,
    type: 'multiple-choice',
    question: 'On a distant island, there are three kinds of chameleons: 13 are red, 15 are green, and 17 are blue. When two chameleons of different colors encounter each other, they change their color to the third color. For instance, if a green chameleon and a red chameleon meet, they both become blue. Can all the chameleons ever be the same color?',
    options: ['yes','no'],
    correctAnswer: 'no',
    subject: 'math',
    difficulty: 'easy'
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: 'You are allowed to measure the total mass and the center of mass position of a sealed box. Inside, there are three point masses placed at unknown positions along a straight line.  \nCan you always determine the exact positions of all three masses from just these two measurements? ',
    options: ['yes','no'],
    correctAnswer: 'no',
    subject: 'phy',
    difficulty: 'medium'
  },
  {
  id: 5,
  type: 'multiple-choice',
  question: `<img src="/images/probability-axiom-question.png" alt="Probability Axiom Question" style="max-width:100%" />`,
  options: [
    '1','2','3','4'
  ],
  correctAnswer:  `4`,
  subject: 'math',
  difficulty: 'medium'
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: 'You have three quantum particles in a box. Each time any two particles interact, they both switch to a new quantum state distinct from their previous states (but always among three possible states: A, B, C). Is it ever possible, by repeatedly allowing pairs to interact, for all three particles to end up in the same quantum state? ',
    options: ['yes','no'],
    correctAnswer: 'no',
    subject: 'phy',
    difficulty: 'medium'
  },

  {
    id: 7,
    type: 'multiple-choice',
    question: 'You choose 3 unknown natural numbers x, y, z. I can ask you two expressions of the form a·x + b·y + c·z, where I choose integers a, b, c. \n Can I always determine x, y, z using just these two responses?',
    options: ['yes','no'],
    correctAnswer: 'yes',
    subject: 'math',
    difficulty: 'hard'
  },
  {
    id: 8,
    type: 'text-input',
    question: 'Welcome to the final questionn, to get yourself on the leaderboard you must find the last easter egg on the website! (To become worthy, find a tiny piece of our Mind Stone) ',
    correctAnswer: '2006',
    subject: 'EasterEgg',
    difficulty: 'hard'

  },

  // {
  //   id: 5,
  //   type: 'multiple-choice',
  //   question: 'Q5 - Question 5',
  //   options: ['1', '2', '3', '4'],
  //   correctAnswer: '1',
  //   subject: 'math',
  //   difficulty: 'medium'
  // },
  // {
  //   id: 6,
  //   type: 'multiple-choice',
  //   question: 'Q6 - Question 6',
  //   options: ['1', '2', '3', '4'],
  //   correctAnswer: '1',
  //   subject: 'science',
  //   difficulty: 'easy'
  // },
  // {
  //   id: 7,
  //   type: 'text-input',
  //   question: 'Q7 - Question 7',
  //   correctAnswer: '1',
  //   subject: 'science',
  //   difficulty: 'easy'
  // },
  // {
  //   id: 8,
  //   type: 'multiple-choice',
  //   question: 'Q8 - Question 8',
  //   options: ['1', '2', '3', '4'],
  //   correctAnswer: '1',
  //   subject: 'science',
  //   difficulty: 'hard'
  // },
  // {
  //   id: 9,
  //   type: 'text-input',
  //   question: 'Q9 - Question 9',
  //   correctAnswer: '1',
  //   subject: 'science',
  //   difficulty: 'medium'
  // },
  // {
  //   id: 10,
  //   type: 'multiple-choice',
  //   question: 'Q10 - Question 10',
  //   options: ['1', '2', '3', '4'],
  //   correctAnswer: '1',
  //   subject: 'science',
  //   difficulty: 'easy'
  // },
  // {
  //   id: 11,
  //   type: 'multiple-choice',
  //   question: 'Q11 - Question 11',
  //   options: ['1', '2', '3', '4'],
  //   correctAnswer: '1',
  //   subject: 'science',
  //   difficulty: 'easy'
  // },
  // {
  //   id: 12,
  //   type: 'text-input',
  //   question: 'Q12 - Question 12',
  //   correctAnswer: '1',
  //   subject: 'science',
  //   difficulty: 'easy'
  // },
  // {
  //   id: 13,
  //   type: 'multiple-choice',
  //   question: 'Q13 - Question 13',
  //   options: ['1', '2', '3', '4'],
  //   correctAnswer: '1',
  //   subject: 'math',
  //   difficulty: 'medium'
  // },
  // {
  //   id: 14,
  //   type: 'text-input',
  //   question: 'Q14 - Question 14',
  //   correctAnswer: '1',
  //   subject: 'science',
  //   difficulty: 'easy'
  // },
  // {
  //   id: 15,
  //   type: 'multiple-choice',
  //   question: 'Q15 - Question 15',
  //   options: ['1', '2', '3', '4'],
  //   correctAnswer: '1',
  //   subject: 'math',
  //   difficulty: 'easy'
  // }
];
