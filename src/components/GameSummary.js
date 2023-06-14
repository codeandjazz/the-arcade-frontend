/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Image, Button, Col, Row, Spacer, Text } from '@nextui-org/react';
import { API_URL } from 'utils/urls';
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
  const accessToken = useSelector((store) => store.user.accessToken);
  // Patch request to add a favorite game to the user
  const HandleAddFavorite = () => {
    const options = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken
      }
    }
    fetch(API_URL(`games/${game._id}/addfavorite`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
        }
      })
  }

  return (
    <section>
      <Container md width="100%" margin="0 auto" gap={0}>
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
              <Button
                disabled={!accessToken}
                onPress={HandleAddFavorite}>
                ❤️ Add to favorites
              </Button>
            </Col>
          )}
          <Col>
            <div>
              <h1>{game.name}</h1>
              {/* Map out game genres if available */}
              {game.genres && game.genres.map((genre) => (
                <Button
                  key={genre.id}
                  css={{ backgroundColor: '$purple400', fontSize: '$sm', fontWeight: '$bold', margin: '$2', padding: '$1' }}>
                  <Link to={`/games/genres/${genre.name}`}>{genre.name} &nbsp;</Link>
                </Button>
              ))}
              {/* Show release date and summary if they are not undefined */}
              ? {releaseDate} : <p>Release date: {releaseDate}</p> : <p>Release date: Unknown</p>
              ? {game.summary} : <p>{game.summary}</p> : <p>No summary available</p>
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
