export const calculateProgress = (topics) => {
  if (!Array.isArray(topics) || topics.length === 0) {
    return 0;
  }
  const completed = topics.filter(t => t.completed).length;
  return Math.round((completed / topics.length) * 100);
};


export const calculateCategoryProgress = (skills) => {
  if (!skills.length) return 0;

  const total = skills.reduce((sum, skill) => {
    return sum + calculateProgress(skill.topics);
  }, 0);

  return Math.round(total / skills.length);
};
