import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StarRating = () => {
  const [rating, setRating] = useState(() => {
    const storedRating = localStorage.getItem('rating');
    return storedRating ? parseFloat(storedRating) : 0;
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://eduxcel-api-30april.onrender.com/ratings');
        const { data } = response;
        setUsersCount(data.length);
        setAverageRating(
          data.reduce((sum, rating) => sum + rating.rating, 0) / data.length
        );
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchData();
  }, []);

  const handleStarClick = async (starIndex) => {
    const newRating = starIndex === rating ? 0 : starIndex;
    setRating(newRating);
    localStorage.setItem('rating', newRating);
  
    try {
      const currentUser = localStorage.getItem('currentUser');
      if (!currentUser) {
        const randomUserId = Math.random().toString(36).substring(7);
        localStorage.setItem('currentUser', randomUserId);
      }
  
      await axios.post('https://eduxcel-api-30april.onrender.com/ratings', {
        userId: localStorage.getItem('currentUser'),
        rating: newRating,
      });
  
      const response = await axios.get('https://eduxcel-api-30april.onrender.com/ratings');
      const { data } = response;
      setUsersCount(data.length);
      setAverageRating(
        data.reduce((sum, rating) => sum + rating.rating, 0) / data.length
      );
  
      // Update current rating display
      setRating(newRating); // Update the current rating to the new rating
    } catch (error) {
      console.error('Error updating ratings:', error);
    }
  };
  const renderStars = (ratingValue) => {
    const starCount = Math.round(ratingValue); // Round the rating value to the nearest whole number
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < starCount) {
        stars.push(<span key={i} style={{ color: '#ffd700' }}>★</span>);
      } else {
        stars.push(<span key={i} style={{ color: '#808080' }}>☆</span>);
      }
    }

    return stars;
  };
  const handleStarHover = (starIndex) => {
    setHoverRating(starIndex);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <div
      onMouseLeave={handleStarLeave}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
          key={index}
          style={{
            cursor: 'pointer',
            fontSize: '24px', // Adjust size as needed
            color: starValue <= (hoverRating || rating) ? '#ffd700' : '#808080', // Use gold color for filled stars and gray color for empty stars
          }}
          onClick={() => handleStarClick(starValue)}
          onMouseEnter={() => handleStarHover(starValue)}
        >
          {starValue <= (hoverRating || rating) ? '★' : '☆'}
        </span>
        
        );
      })}
      {/* Stars for average rating */}
     
      {/* Your existing code for displaying user's rating, total users, and overall rating */}
      <p>My Rating: {hoverRating || rating}/5</p>
      <p>Total Users: {usersCount}</p>
      <div style={{ marginTop: '10px' }}>
        {renderStars(averageRating)}
        <span style={{ marginLeft: '10px' }}>{isNaN(averageRating) ? '0.0' : averageRating.toFixed(1)}/5</span>
      </div>

      <p>Overall Rating: {isNaN(averageRating) ? '0' : averageRating.toFixed(1)}/5</p>
    </div>
  );
};

export default StarRating;
  
