/* eslint-disable no-underscore-dangle */
/* eslint-disable quote-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import Modal from 'react-modal';

// API URL
import { API_URL } from 'utils/urls';

const ReviewForm = ({ game }) => {
  const [message, setMessage] = useState('');

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

  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.user_id);
  const onFormSubmit = async (event) => {
    event.preventDefault();
    closeModal();

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

  // Hide other app elements while modal is open
  Modal.setAppElement('#root');

  return (
    <article>
      {/* Modal */}
      <button
        type="button"
        disabled={!accessToken}
        onClick={openModal}
      >
                  Review this game
      </button>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal">
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
              onClick={closeModal}
            >
            Cancel
            </button>
          </section>
        </form>
      </Modal>
    </article>
  );
};

export default ReviewForm;
