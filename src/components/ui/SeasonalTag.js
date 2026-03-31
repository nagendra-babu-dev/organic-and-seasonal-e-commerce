import React from 'react';
import { FaLeaf } from 'react-icons/fa';

const SeasonalTag = ({ season }) => {
  const seasonIcons = {
    Spring: '🌸',
    Summer: '☀️',
    Monsoon: '🌧️',
    Autumn: '🍂',
    Winter: '❄️'
  };

  const icon = seasonIcons[season] || '🌿';

  return (
    <div className="seasonal-badge">
      {icon} {season} Seasonal
    </div>
  );
};

export default SeasonalTag;