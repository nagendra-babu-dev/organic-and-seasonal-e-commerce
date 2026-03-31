import { seasons } from '../data/seasons';

export const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 9) return 'monsoon';
  if (month >= 10 && month <= 11) return 'autumn';
  return 'winter';
};

export const getSeasonByName = (seasonId) => {
  return seasons.find(s => s.id === seasonId);
};

export const getSeasonalProducts = (products, seasonId) => {
  return products.filter(p => p.seasonal && p.season?.toLowerCase() === seasonId);
};

export const getSeasonIcon = (seasonId) => {
  const season = seasons.find(s => s.id === seasonId);
  return season?.icon || '🌿';
};

export const getSeasonDescription = (seasonId) => {
  const season = seasons.find(s => s.id === seasonId);
  return season?.description || '';
};