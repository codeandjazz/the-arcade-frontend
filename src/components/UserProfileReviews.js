/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-closing-bracket-location */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Text, Modal, Card, Button } from '@nextui-org/react';
import { formatDate } from '../utils/helpers';

const UserProfileReviews = () => {
  const [review, setReview] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [editReviewId, setEditReviewId] = useState(null);

  // get accessToken from store
  const accessToken =
    useSelector((store) => store.user.accessToken) ||
    localStorage.getItem('accessToken');
  console.log(accessToken);
  // get userId from store
  const userId =
    useSelector((store) => store.user.userId) || localStorage.getItem('userId');
  console.log(userId);

  // ////////////////////////////////////// //

  const fetchLoggedInUserReviews = async (id) => {
    try {
      const response = await fetch(
        `https://the-arcade-backend-6426jh4m2a-no.a.run.app/users/${id}/reviews`
      );
      const data = await response.json();
      if (data.success) {
        console.log(data.response);
        setReview(data.response);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLoggedInUserReviews(userId);
    console.log(userId);
  }, []);

  // ////////////////////////////////////// //

  const updateReview = async (reviewId, reviewText) => {
    console.log(reviewId);
    console.log(reviewText);
    try {
      const response = await fetch(
        `https://the-arcade-backend-6426jh4m2a-no.a.run.app/games/reviews/${reviewId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
          },
          body: JSON.stringify({ message: newReviewText })
        }
      );
      const data = await response.json();
      if (data.success) {
        // Update the review in the state
        // Find the index of the review in the state
        const reviewIndex = review.findIndex((item) => item._id === reviewId);
        if (reviewIndex !== -1) {
          // Create a new array with the updated review
          const updatedReview = [...review];
          updatedReview[reviewIndex].message = newReviewText;
          // Update the state with the new array
          setReview(updatedReview);
          console.log('Review updated successfully');
        }
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewEditSubmit = (reviewId, reviewText) => {
    updateReview(reviewId, reviewText);
    setShowReviewForm(false);
  };

  const showEditReviewModal = (reviewId) => {
    if (reviewId === editReviewId) {
      return (
        <Modal open onClose={() => setShowReviewForm(false)}>
          <p>Write your review here</p>
          <textarea
            type="text"
            placeholder="Write your review here"
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
            required
          />
          <button type="button" onClick={() => setShowReviewForm(false)}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleReviewEditSubmit(reviewId, newReviewText)}
          >
            Update
          </button>
        </Modal>
      );
    }
    return null;
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

  return (
    <Container>
      <h1>Reviews</h1>
      {review.map((item) => (
        <Card gap={2}>
          <Grid xs={12} md={12}>
            {/* <Text h4>{item.game}</Text> */}
          </Grid>
          <Grid xs={12} md={12}>
            <Text h5>{item.message}</Text>
          </Grid>
          <Grid xs={12} md={12}>
            <Text h6>{formatDate(item.createdAt)}</Text>
          </Grid>
          <Grid xs={12} md={12}>
            <Button.Group css={{ maxWidth: '40%' }} vertical>
              <Button type="button" onClick={() => deleteReview(item._id)}>
                Delete
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setShowReviewForm(true);
                  setEditReviewId(item._id);
                }}
              >
                Edit
              </Button>
            </Button.Group>
          </Grid>
          {showReviewForm && showEditReviewModal(item._id)}
        </Card>
      ))}
    </Container>
  );
};

export default UserProfileReviews;
