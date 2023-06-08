/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Reviews = () => {
  const [review, setReview] = useState([]);

  // get accestoken from store
  const accessToken = useSelector((store) => store.user.accessToken);

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
            Authorization: accessToken
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
