/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react';
import { Container, Image, Button } from '@nextui-org/react';
import ReviewForm from './ReviewForm';

const GameSummary = ({ game }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  // console.log(showReviewForm);
  // console.log(game);

  const handleShowReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  return (
    <section>
      <Container width="100%" margin="0 auto">
        <div>
          <Image />
        </div>
        <div>
          <h1>sadsa</h1>
          <p>[Summary here]</p>
          {/* Add summary, note not all games has summary */}
          <Button onPress={handleShowReviewForm}>Write a review</Button>
          {showReviewForm && (
            <ReviewForm
              setShowReviewForm={setShowReviewForm}
              showReviewForm={showReviewForm}
            />
          )}
        </div>
      </Container>
    </section>
  );
};

export default GameSummary;
