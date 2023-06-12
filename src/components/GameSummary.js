/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react';
import { Container, Image, Button, Col, Row, Spacer } from '@nextui-org/react';
import ReviewForm from './ReviewForm';

const GameSummary = ({ game }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  // console.log(showReviewForm);
  // console.log(game.cover.url);

  const timestamp = game.first_release_date;
  const date = new Date(timestamp * 1000);
  const releaseDate = date.toLocaleDateString();
  const handleShowReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  return (
    <section>
      <Container width="100%" margin="0 auto" gap={0}>
        <Row gap={1}>
          {game?.cover?.url && ( // Check if cover URL is available
            <Col>
              <Image
                src={game.cover.url.replace('t_thumb', 't_cover_big')}
                alt={`Cover art of the game ${game.name}`}
                width={220}
                height={380}
                objectFit="cover"
              />
              <Button onPress={handleShowReviewForm}>Write a review</Button>
              <Spacer y={0.5} />
              <Button>❤️ Add to favorites</Button>
            </Col>
          )}
          <Col>
            <div>
              <h1>{game.name}</h1>
              {/* Map out game genres if available */}
              {game.genres && game.genres.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
              {/* Add release date and tranform it from unix time stamp to readable date */}
              <p>Release date: {releaseDate}</p>
              <p>{game.summary}</p>
              {/* Add summary, note not all games has summary */}
              {showReviewForm && (
                <ReviewForm
                  setShowReviewForm={setShowReviewForm}
                  showReviewForm={showReviewForm}
                  game={game}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GameSummary;
