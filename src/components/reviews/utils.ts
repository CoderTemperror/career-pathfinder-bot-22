
export const getRatingText = (rating: number): string => {
  switch (rating) {
    case 1:
      return "Poor";
    case 2:
      return "Fair";
    case 3:
      return "Good";
    case 4:
      return "Great";
    case 5:
      return "Excellent";
    default:
      return "Select a rating";
  }
};

export const saveReviews = (reviews: Array<{ rating: number; text: string }>): void => {
  localStorage.setItem("sbh2025_reviews", JSON.stringify(reviews));
};

export const loadReviews = (): Array<{ rating: number; text: string }> => {
  const savedData = localStorage.getItem("sbh2025_reviews");
  return savedData ? JSON.parse(savedData) : [];
};
