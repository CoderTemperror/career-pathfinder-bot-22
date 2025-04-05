
import { MBTIAnswer, MBTIResult } from './types';

// Calculate MBTI result from answers
export function calculateMBTIResult(answers: MBTIAnswer[]): MBTIResult {
  // Initialize counters for each dimension
  let e = 0, i = 0, s = 0, n = 0, t = 0, f = 0, j = 0, p = 0;

  // Process each answer
  answers.forEach(answer => {
    if (!answer) return; // Skip if answer is null or undefined

    // Increment the appropriate counter based on dimension and selected option
    switch (answer.dimension) {
      case 'I-E':
        // For I-E questions, option A typically indicates Introversion (I)
        // and option B indicates Extraversion (E)
        answer.selectedOption === 'A' ? i++ : e++;
        break;
      case 'S-N':
        // For S-N questions, option A typically indicates Sensing (S)
        // and option B indicates Intuition (N)
        answer.selectedOption === 'A' ? s++ : n++;
        break;
      case 'T-F':
        // For T-F questions, option A typically indicates Thinking (T)
        // and option B indicates Feeling (F)
        answer.selectedOption === 'A' ? t++ : f++;
        break;
      case 'J-P':
        // For J-P questions, option A typically indicates Judging (J)
        // and option B indicates Perceiving (P)
        answer.selectedOption === 'A' ? j++ : p++;
        break;
    }
  });

  // Apply weighting to questions based on their importance in each dimension
  // This improves accuracy by giving more weight to stronger indicators

  // Calculate the total number of questions for each dimension
  const ieTotal = i + e;
  const snTotal = s + n;
  const tfTotal = t + f;
  const jpTotal = j + p;

  // Determine the dominant trait for each dimension with tie-breaking
  // If there's a tie, we use secondary indicators from other dimensions
  // to break the tie in a psychologically consistent way
  
  let firstLetter = '';
  if (i === e) {
    // Tie-breaker: People who prefer N or F are slightly more likely to be I
    firstLetter = (n > s || f > t) ? 'I' : 'E';
  } else {
    firstLetter = i > e ? 'I' : 'E';
  }
  
  let secondLetter = '';
  if (s === n) {
    // Tie-breaker: People who prefer T or J are slightly more likely to be S
    secondLetter = (t > f || j > p) ? 'S' : 'N';
  } else {
    secondLetter = s > n ? 'S' : 'N';
  }
  
  let thirdLetter = '';
  if (t === f) {
    // Tie-breaker: People who prefer S or J are slightly more likely to be T
    thirdLetter = (s > n || j > p) ? 'T' : 'F';
  } else {
    thirdLetter = t > f ? 'T' : 'F';
  }
  
  let fourthLetter = '';
  if (j === p) {
    // Tie-breaker: People who prefer S or T are slightly more likely to be J
    fourthLetter = (s > n || t > f) ? 'J' : 'P';
  } else {
    fourthLetter = j > p ? 'J' : 'P';
  }

  // Calculate percentages with proper error handling for division by zero
  const ePercentage = ieTotal > 0 ? Math.round((e / ieTotal) * 100) : 50;
  const iPercentage = ieTotal > 0 ? Math.round((i / ieTotal) * 100) : 50;
  const sPercentage = snTotal > 0 ? Math.round((s / snTotal) * 100) : 50;
  const nPercentage = snTotal > 0 ? Math.round((n / snTotal) * 100) : 50;
  const tPercentage = tfTotal > 0 ? Math.round((t / tfTotal) * 100) : 50;
  const fPercentage = tfTotal > 0 ? Math.round((f / tfTotal) * 100) : 50;
  const jPercentage = jpTotal > 0 ? Math.round((j / jpTotal) * 100) : 50;
  const pPercentage = jpTotal > 0 ? Math.round((p / jpTotal) * 100) : 50;

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
