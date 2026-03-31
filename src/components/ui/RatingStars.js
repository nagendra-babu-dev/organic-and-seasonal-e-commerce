import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating, reviewCount, showCount = false }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-warning me-1" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-warning me-1" />);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-muted me-1" />);
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <div className="d-flex">{stars}</div>
      {showCount && reviewCount && (
        <small className="text-muted">({reviewCount} reviews)</small>
      )}
    </div>
  );
};

export default RatingStars;