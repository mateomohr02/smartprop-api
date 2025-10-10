export const calculateHeat = (property) => {
  // Ponderación base de variables
  const WEIGHTS = {
    visualizations: 1,
    interactions: 3,
    reach: 5,
  };

  const baseScore =
    (property.visualizations ?? 0) * WEIGHTS.visualizations +
    (property.interactions ?? 0) * WEIGHTS.interactions +
    (property.reach ?? 0) * WEIGHTS.reach;

  const daysSinceCreated = (Date.now() - new Date(property.createdAt)) / 86400000;
  
  let recencyFactor = 1; 

  if (daysSinceCreated < 7) recencyFactor = 1.3;       
  else if (daysSinceCreated < 15) recencyFactor = 1.1; 
  else if (daysSinceCreated > 30) recencyFactor = 0.8; 

  
  const score = baseScore * recencyFactor;

  return score;
};
