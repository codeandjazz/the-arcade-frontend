/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-closing-bracket-location */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Text,
  Modal,
  Card,
  Button,
  Textarea,
  Spacer
} from '@nextui-org/react';
import { formatDate } from '../utils/helpers';

const UserProfileReviews = () => {
  const [review, setReview] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [editReviewId, setEditReviewId] = useState(null);

  // get accessToken from store
  const accessToken =
    useSelector((store) => store.user.accessToken) ||
    sessionStorage.getItem('accessToken');
  console.log(accessToken);
  // get userId from store
  const userId =
    useSelector((store) => store.user.userId) ||
    sessionStorage.getItem('userId');
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
  }, [userId]);

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
          <Text h4>Write your review here</Text>
          <Textarea
            type="text"
            placeholder="Write your review here"
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
            required
          />
          <Button.Group css={{ margin: '1rem auto' }}>
            <Button type="button" onPress={() => setShowReviewForm(false)}>
              Cancel
            </Button>
            <Spacer x={0.5} />
            <Button
              onPress={() => handleReviewEditSubmit(reviewId, newReviewText)}
            >
              Update
            </Button>
          </Button.Group>
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

  console.log('This is review ', review);

  return (
    <Container>
      <Text h2 css={{ fontFamily: '$body' }}>
        Reviews
      </Text>
      {review.map((item) => (
        <Card
          gap={2}
          css={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '4rem',
            padding: '1.5rem 1.5rem',
            borderRadius: '$xs',
            marginBottom: '5px'
          }}
        >
          <section style={{ display: 'flex', flexDirection: 'column' }}>
            <Text>{formatDate(item.createdAt)}</Text>
            <Text h4>{item.game_name}</Text>
            <Text blockquote>{item.message}</Text>
            <Button.Group css={{ margin: 'auto 0' }}>
              <Button
                type="button"
                css={{
                  borderRadius: '$xs',
                  fontWeight: '300',
                  color: '$black',
                  margin: '1px',
                  backgroundColor: '$success'
                }}
                onClick={() => {
                  setShowReviewForm(true);
                  setEditReviewId(item._id);
                }}
              >
                Edit
              </Button>
              <Button
                color="error"
                css={{
                  borderRadius: '$xs',
                  fontWeight: '300',
                  color: '$black',
                  margin: '1px',
                  backgroundColor: '$error'
                }}
                type="button"
                onClick={() => deleteReview(item._id)}
              >
                Delete
              </Button>
            </Button.Group>
          </section>
          {showReviewForm && showEditReviewModal(item._id)}
        </Card>
      ))}
    </Container>
  );
};

export default UserProfileReviews;
