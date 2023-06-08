/* eslint-disable no-underscore-dangle */
/* eslint-disable quote-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-closing-bracket-location */
import { Modal, Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
    <Modal open onClose={handleHideReviewForm}>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="review">Write your review here: </label>
        <input
          type="text"
          id="review"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={140}
        />
        <Button type="submit">Submit</Button>
        <Button type="button" onPress={handleHideReviewForm}>
          Cancel
        </Button>
      </form>
    </Modal>
  );
};

export default ReviewForm;
