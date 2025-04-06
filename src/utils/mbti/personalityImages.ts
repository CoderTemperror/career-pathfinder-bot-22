
export interface PersonalityImage {
  type: string;
  description: string;
  imageUrl: string;
  category: 'Analysts' | 'Diplomats' | 'Sentinels' | 'Explorers';
}

export const personalityImages: Record<string, PersonalityImage> = {
  'INTJ': {
    type: 'INTJ',
    description: 'Imaginative and strategic thinkers, with a plan for everything.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Analysts'
  },
  'INTP': {
    type: 'INTP',
    description: 'Innovative inventors with an unquenchable thirst for knowledge.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Analysts'
  },
  'ENTJ': {
    type: 'ENTJ',
    description: 'Bold, imaginative and strong-willed leaders, always finding a way - or making one.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Analysts'
  },
  'ENTP': {
    type: 'ENTP',
    description: 'Smart and curious thinkers who cannot resist an intellectual challenge.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Analysts'
  },
  'INFJ': {
    type: 'INFJ',
    description: 'Quiet and mystical, yet very inspiring and tireless idealists.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Diplomats'
  },
  'INFP': {
    type: 'INFP',
    description: 'Poetic, kind and altruistic people, always eager to help a good cause.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Diplomats'
  },
  'ENFJ': {
    type: 'ENFJ',
    description: 'Charismatic and inspiring leaders, able to mesmerize their listeners.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Diplomats'
  },
  'ENFP': {
    type: 'ENFP',
    description: 'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Diplomats'
  },
  'ISTJ': {
    type: 'ISTJ',
    description: 'Practical and fact-minded individuals, whose reliability cannot be doubted.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Sentinels'
  },
  'ISFJ': {
    type: 'ISFJ',
    description: 'Very dedicated and warm protectors, always ready to defend their loved ones.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Sentinels'
  },
  'ESTJ': {
    type: 'ESTJ',
    description: 'Excellent administrators, unsurpassed at managing things - or people.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Sentinels'
  },
  'ESFJ': {
    type: 'ESFJ',
    description: 'Extraordinarily caring, social and popular people, always eager to help.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Sentinels'
  },
  'ISTP': {
    type: 'ISTP',
    description: 'Bold and practical experimenters, masters of all kinds of tools.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Explorers'
  },
  'ISFP': {
    type: 'ISFP',
    description: 'Flexible and charming artists, always ready to explore and experience something new.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Explorers'
  },
  'ESTP': {
    type: 'ESTP',
    description: 'Smart, energetic and very perceptive people, who truly enjoy living on the edge.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Explorers'
  },
  'ESFP': {
    type: 'ESFP',
    description: 'Spontaneous, energetic and enthusiastic entertainers - life is never boring around them.',
    imageUrl: '/lovable-uploads/302d34c2-57b9-4f30-ad34-0c2d02568669.png',
    category: 'Explorers'
  }
};

export const getCategoryColor = (category: string): string => {
  switch(category) {
    case 'Analysts':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    case 'Diplomats':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'Sentinels':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'Explorers':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300';
  }
};

export const getPersonalityImage = (mbtiType: string): PersonalityImage => {
  return personalityImages[mbtiType] || {
    type: mbtiType,
    description: 'Your unique personality type combines several traits.',
    imageUrl: '',
    category: 'Analysts'
  };
};
