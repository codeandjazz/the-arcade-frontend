/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react';
import { API_URL } from 'utils/urls';

const ReviewForm = ({ id }) => {
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);
  //   const [rating, setRating] = useState(0);
  console.log('this is the id: ', id);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    console.log('clicked!');

    try {
      const response = await fetch(API_URL(`games/${id}/reviews`), {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          message,
          userId
        })
      });

      if (!response.ok) {
        throw new Error('Request failed with status ', response.status);
      }
      const data = await response.json();
      console.log(data); // this is the response from the server
    } catch (error) {
      console.error('this is the error: ', error);
    }
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
    </form>
  );
};

export default ReviewForm;
