/* eslint-disable no-underscore-dangle */
/* eslint-disable quote-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react';

import { useSelector } from 'react-redux';

// API URL
import { API_URL } from 'utils/urls';

const ReviewForm = ({ showReviewForm, setShowReviewForm, game }) => {
  const [message, setMessage] = useState('');
  //   const [rating, setRating] = useState(0);
  console.log(game);
  const accessToken = useSelector((store) => store.user.accessToken);
  // console.log(accessToken);
  const userId = useSelector((store) => store.user.user_id);
  // console.log(userId);
  const onFormSubmit = async (event) => {
    event.preventDefault();
    setShowReviewForm(!showReviewForm);
    // console.log('clicked!');

    try {
      const response = await fetch(API_URL(`games/${game._id}/reviews`), {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': accessToken
        },
        body: JSON.stringify({
          message,
          userId
        })
      });

      if (!response.ok) {
        throw new Error('Request failed with status ', response.status);
      } else {
        const data = await response.json();
      }
    } catch (error) {
      console.error('this is the error: ', error);
    }
  };

  const handleHideReviewForm = () => {
    console.log(showReviewForm);
    setShowReviewForm(!showReviewForm);
  };

  return (
    <article>
      {/* Modal */}
      <p>Write a review</p>
      <form
        onSubmit={onFormSubmit}
      >
        <textarea
          type="text"
          placeholder="Whats the best and worst of this game? (max 140 characters)"
          id="review"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={140}
        />
        <section>
          <button
            disabled={message.length === 0 || message.length > 139}
            type="submit"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleHideReviewForm}
          >
            Cancel
          </button>
        </section>
      </form>
    </article>
  );
};

export default ReviewForm;
