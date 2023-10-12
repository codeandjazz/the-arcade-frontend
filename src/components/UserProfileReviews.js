/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-closing-bracket-location */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import Modal from 'react-modal';
import { formatDate } from '../utils/helpers';

const UserProfileReviews = () => {
  const [review, setReview] = useState([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [editReviewId, setEditReviewId] = useState(null);
  const [showOlder, setShowOlder] = useState(false);

  // get accessToken from store
  const accessToken =
    useSelector((store) => store.user.accessToken) ||
    localStorage.getItem('accessToken');
  // get userId from store
  const userId =
    useSelector((store) => store.user.userId) ||
    localStorage.getItem('userId');

  // ////////////////////////////////////// //

  const fetchLoggedInUserReviews = async (id) => {
    try {
      const response = await fetch(
        `https://the-arcade-backend-6426jh4m2a-no.a.run.app/users/${id}/reviews`
      );
      const data = await response.json();
      if (data.success) {
        setReview(data.response.reverse());
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchLoggedInUserReviews(userId);
    } else {
      console.log('No user id available')
    }
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

  // Modal logic
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  const customStyles = {
    content: {
      backgroundColor: 'black'
    }
  };

  const handleReviewEditSubmit = (reviewId, reviewText) => {
    updateReview(reviewId, reviewText);
    closeModal();
  };

  // Hide other app elements while modal is open
  Modal.setAppElement('#root');

  return (
    <section>
      <h2>
        Reviews
      </h2>
      {review.length < 1 ? <p>No reviews yet.</p> : (
        <section>
          {review
            .slice(0, showOlder ? review.length : 5)
            .map((item) => (
              <div key={item._id}>
                <p>{formatDate(item.createdAt)}</p>
                <p>{item.game_name}</p>
                <p>{item.message}</p>
                <button
                  type="button"
                  onClick={() => {
                    openModal();
                    setEditReviewId(item._id);
                    setNewReviewText(item.message); // Set the initial value to the current review text
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const shouldDelete = window.confirm('Are you sure you want to delete this review?');
                    if (shouldDelete) {
                      deleteReview(item._id);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                Delete
                </button>
                <Modal
                  style={customStyles}
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="Modal">
                  <h4>Write your review here</h4>
                  <textarea
                    type="text"
                    placeholder="Write your review here"
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    required
                  />
                  <button type="button" onClick={closeModal}>
              Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReviewEditSubmit(editReviewId, newReviewText)}
                  >
              Update
                  </button>
                </Modal>
              </div>
            ))}
          {review.length > 5 && (
            <button type="button" onClick={() => setShowOlder(!showOlder)}>
              {showOlder ? 'Show Less' : 'Show Older'}
            </button>
          )}
        </section>
      )}

    </section>
  );
};

export default UserProfileReviews;
