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
    type: 'multiple-choice',
    question: 'You choose 3 unknown natural numbers x, y, z. I can ask you two expressions of the form a·x + b·y + c·z, where I choose integers a, b, c. \n Can I always determine x, y, z using just these two responses?',
    options: ['yes','no'],
    correctAnswer: 'yes',
    subject: 'math',
    difficulty: 'hard'
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
    difficulty: 'easy'
  },
  {
  id: 5,
  type: 'multiple-choice',
  question: `Which of the following is <b>not</b> a property of the <b>axiomatic probability function</b>?`,
  options: [
    `1. \\( \\mathbb{P}(\\Omega) = 1 \\)`,
    `2. Suppose \\( A, B \\in \\mathcal{F} \\) where \\( \\mathcal{F} \\) is the sample space, if \\( A \\subseteq B \\), then
    \\[ \\mathbb{P}(B) = \\mathbb{P}(A) + \\mathbb{P}(A \\cup B^c) \\]`,
    `3. if \\( \\{E_n\\}_n \\) is a sequence of events in sample space such that \\( E_i \\cap E_j = \\emptyset, \\forall \\, i \\neq j \\),
    then \\( \\mathbb{P}\\left( \\bigcup_{i=1}^\\infty E_i \\right) = \\sum_{i=1}^\\infty \\mathbb{P}(E_i) \\)`,
    `4. \\( \\mathbb{P}(E) \\geq 0 \\) for any event E in Sample Space.`
  ],
  correctAnswer:  `2. Suppose \\( A, B \\in \\mathcal{F} \\) where \\( \\mathcal{F} \\) is the sample space, if \\( A \\subseteq B \\), then
    \\[ \\mathbb{P}(B) = \\mathbb{P}(A) + \\mathbb{P}(A \\cup B^c) \\]`,
  subject: 'math',
  difficulty: 'medium'
}

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
