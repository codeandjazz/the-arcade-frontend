/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';

import './GameReviews.css';

import avatar from 'assets/img/the-arcade_avatar.png';

// API URL
import { API_URL } from 'utils/urls';

import { formatDate } from '../utils/helpers';

const GameReviews = ({ game }) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviewsForGame = async () => {
      try {
        // eslint-disable-next-line no-underscore-dangle
        const response = await fetch(API_URL(`games/${game._id}/reviews`));
        const data = await response.json();
        if (data.success) {
          setReviews(data.response)
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviewsForGame();
  // eslint-disable-next-line no-underscore-dangle
  }, [game._id]);
  return (
    <section>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((item) => (
          <div key={item._id} className="game-reviews_review">
            <p>
              {formatDate(item.createdAt)}
            </p>
            <div className="avatar">
              <img src={avatar} alt="avatar" />
            </div>
            <p>@{item.user.username}</p>
            <p>{item.message}</p>
          </div>
        ))
      ) : <p>This game has no reviews yet. Be the first to write one!</p>}

    </section>
  )
};

export default GameReviews;