import { Challenge } from '../types';

export const DEBUG_CHALLENGES: Challenge[] = [
  {
    id: 'js-1',
    type: 'debug',
    question: 'Find and fix the bug in this JavaScript code:',
    code: `function calculateSum(numbers) {
  let sum = 0;
  for (let i = 0; i <= numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}`,
    answer: 'i < numbers.length',
    timeLimit: 30,
    difficulty: 'easy',
    hints: ['Check the loop condition', 'Array indices start at 0']
  },
  {
    id: 'js-2',
    type: 'debug',
    question: 'Fix the closure bug in this code:',
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}`,
    answer: 'let i = 0',
    timeLimit: 45,
    difficulty: 'medium',
    hints: ['Think about variable scope', 'ES6 introduced block-scoped variables']
  },
  {
    id: 'py-1',
    type: 'debug',
    question: 'Find the bug in this Python code:',
    code: `def find_average(numbers):
    total = 0
    count = 0
    for num in numbers:
        if num > 0:
            total += num
            count += 1
    return total / count`,
    answer: 'if count == 0: return 0',
    timeLimit: 40,
    difficulty: 'medium',
    hints: ['What happens with an empty list?', 'Division by zero is dangerous']
  }
];