/* eslint-disable quote-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-closing-bracket-location */
import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from 'utils/urls';

const ReviewForm = ({ setShowReviewForm }) => {
  const [message, setMessage] = useState('');
  //   const [rating, setRating] = useState(0);

  console.log(setShowReviewForm);

  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.user_id);
  const onFormSubmit = async (event) => {
    event.preventDefault();
    // console.log('clicked!');

    try {
      const response = await fetch(
        API_URL('games/647b64ecadae08c30fe91f4a/reviews'),
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Authorization': accessToken
          },
          body: JSON.stringify({
            message,
            userId
          })
        }
      );

      if (!response.ok) {
        throw new Error('Request failed with status ', response.status);
      }
      const data = await response.json();
    } catch (error) {
      console.error('this is the error: ', error);
    }
  };

  const handleHideReviewForm = () => {
    setShowReviewForm(false);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="review">message</label>
      <input
        type="text"
        id="review"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Submit</button>
      <Button type="button" onPress={handleHideReviewForm}>
        Cancel
      </Button>
    </form>
  );
};

export default ReviewForm;
