/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react';
import { API_URL } from 'utils/urls';

const ReviewForm = ({ gameId }) => {
  const [review, setReview] = useState('');
  //   const [rating, setRating] = useState(0);
  const [userId, setUserId] = useState(null);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    console.log('clicked!');

    try {
      const response = await fetch(API_URL(`/games/${gameId}/reviews`), {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          review,
          userId
        })
      });
      const data = await response.json();
      console.log(data); // this is the response from the server
    } catch (error) {
      console.error(error);
    }

    return (
      <form>
        <label htmlFor="review">Review</label>
        <input
          type="text"
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </form>
    );
  };
};

export default ReviewForm;
