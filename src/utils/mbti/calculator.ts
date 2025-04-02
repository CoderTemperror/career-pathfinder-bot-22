
import { MBTIAnswer } from './types';
import { mbtiQuestions } from './questions';

export function calculateMBTIType(answers: MBTIAnswer[]): string {
  const scores = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0
  };

  answers.forEach(answer => {
    const question = mbtiQuestions.find(q => q.id === answer.questionId);
    if (!question) return;

    const { dimension } = question;
    
    if (answer.answer === 'A') {
      switch (question.directionA) {
        case 'E': scores.EI += 1; break;
        case 'S': scores.SN += 1; break;
        case 'T': scores.TF += 1; break;
        case 'J': scores.JP += 1; break;
      }
    } else {
      switch (question.directionB) {
        case 'I': scores.EI -= 1; break;
        case 'N': scores.SN -= 1; break;
        case 'F': scores.TF -= 1; break;
        case 'P': scores.JP -= 1; break;
      }
    }
  });

  const E_or_I = scores.EI >= 0 ? 'E' : 'I';
  const S_or_N = scores.SN >= 0 ? 'S' : 'N';
  const T_or_F = scores.TF >= 0 ? 'T' : 'F';
  const J_or_P = scores.JP >= 0 ? 'J' : 'P';

  return `${E_or_I}${S_or_N}${T_or_F}${J_or_P}`;
}
