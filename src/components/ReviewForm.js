/* eslint-disable no-underscore-dangle */
/* eslint-disable quote-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-closing-bracket-location */
import { Modal, Button, Textarea, Spacer } from '@nextui-org/react';
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
      <Modal.Header>Write a review</Modal.Header>
      <form
        style={{
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center'
        }}
        onSubmit={onFormSubmit}
      >
        <Textarea
          type="text"
          helperText="Whats the best and worst of this game? (max 140 characters)"
          id="review"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={140}
          style={{ fontWeight: '300' }}
        />
        <Spacer y={1} />
        <Button.Group css={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            auto
            disabled={message.length === 0 || message.length > 139}
            css={{
              borderRadius: '$xs',
              fontWeight: '300',
              color: '$black',
              margin: '1px',
              backgroundColor: '$success'
            }}
            type="submit"
          >
            Submit
          </Button>
          <Button
            auto
            css={{
              borderRadius: '$xs',
              fontWeight: '300',
              color: '$black',
              margin: '1px',
              backgroundColor: '$error'
            }}
            type="button"
            onPress={handleHideReviewForm}
          >
            Cancel
          </Button>
        </Button.Group>
      </form>
    </Modal>
  );
};

export default ReviewForm;
