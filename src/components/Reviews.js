/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';

const Reviews = () => {
  const [review, setReview] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        'https://the-arcade-backend-6426jh4m2a-no.a.run.app/reviews'
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data.response);
          if (data.success) {
            setReview(data.response);
          } else {
            console.log(data.message);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(
        `https://the-arcade-backend-6426jh4m2a-no.a.run.app/games/reviews/${reviewId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              '618d80cdb6c1ca5d4aadda4d0f599ad6cfc506d672f18f85dcedb3f7a0bf108695240b29dfdd2654a0d517a569785ee0b19fb239cd307587308b6d85c6c2101e89ae0f0c7ee661ef7fb476853a12f8d03e344f35859332a7170c11500075c5499515b4506417b221287fed8472d501bbd0e1584ab7ce6e033eda8e52a21975ea'
          }
        }
      );
      const data = await response.json();
      if (data.success) {
        // Remove the deleted review from the state
        setReview(review.filter((item) => item._id !== reviewId));
        console.log('Review deleted successfully');
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews();
    console.log(review);
  }, []);

  return (
    <div>
      <h1>Reviews</h1>
      {review.map((item) => (
        <div key={item._id}>
          <p>{item.message}</p>
          <p>Posted by: {item.user.username}</p>
          <button type="button" onClick={() => deleteReview(item._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
