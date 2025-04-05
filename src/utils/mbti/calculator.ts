
import { MBTIAnswer, MBTIResult } from './types';

// Calculate MBTI result from answers
export function calculateMBTIResult(answers: MBTIAnswer[]): MBTIResult {
  // Initialize counters for each dimension
  let e = 0, i = 0, s = 0, n = 0, t = 0, f = 0, j = 0, p = 0;

  // Process each answer
  answers.forEach(answer => {
    if (!answer) return; // Skip if answer is null or undefined

    // Increment the appropriate counter based on the dimension and chosen option
    switch (answer.dimension) {
      case 'I-E':
        answer.selectedOption === 'A' ? i++ : e++;
        break;
      case 'S-N':
        answer.selectedOption === 'A' ? s++ : n++;
        break;
      case 'T-F':
        answer.selectedOption === 'A' ? t++ : f++;
        break;
      case 'J-P':
        answer.selectedOption === 'A' ? j++ : p++;
        break;
    }
  });

  // Determine the dominant trait for each dimension
  const firstLetter = i > e ? 'I' : 'E';
  const secondLetter = s > n ? 'S' : 'N';
  const thirdLetter = t > f ? 'T' : 'F';
  const fourthLetter = j > p ? 'J' : 'P';

  // Calculate percentages
  const ePercentage = Math.round((e / (e + i)) * 100) || 0;
  const iPercentage = Math.round((i / (e + i)) * 100) || 0;
  const sPercentage = Math.round((s / (s + n)) * 100) || 0;
  const nPercentage = Math.round((n / (s + n)) * 100) || 0;
  const tPercentage = Math.round((t / (t + f)) * 100) || 0;
  const fPercentage = Math.round((f / (t + f)) * 100) || 0;
  const jPercentage = Math.round((j / (j + p)) * 100) || 0;
  const pPercentage = Math.round((p / (j + p)) * 100) || 0;

  // Combine the letters to form the MBTI type
  const type = `${firstLetter}${secondLetter}${thirdLetter}${fourthLetter}`;

  // Create the result object
  const result: MBTIResult = {
    type,
    dimensions: {
      IE: { 
        E: ePercentage, 
        I: iPercentage,
        dominant: firstLetter
      },
      SN: { 
        S: sPercentage, 
        N: nPercentage,
        dominant: secondLetter
      },
      TF: { 
        T: tPercentage, 
        F: fPercentage,
        dominant: thirdLetter
      },
      JP: { 
        J: jPercentage, 
        P: pPercentage,
        dominant: fourthLetter
      }
    }
  };

  return result;
}
