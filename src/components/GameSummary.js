/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Image,
  Button,
  Col,
  Row,
  Spacer,
  Text
} from '@nextui-org/react';
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
    };
    fetch(API_URL(`games/${game._id}/addfavorite`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
        }
      });
  };

  return (
    <section>
      <Container
        md
        width="100%"
        gap={0}
        css={{ marginTop: '-100px', zIndex: '$max' }}
      >
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
              <Button disabled={!accessToken} onPress={handleShowReviewForm}>Write a review</Button>
              <Spacer y={0.5} />
              <Button disabled={!accessToken} onPress={HandleAddFavorite}>
                ❤️ Add to favorites
              </Button>
              <Button disabled={!accessToken} onPress={HandleAddFavorite}>
                Remove from favorites
              </Button>
            </Col>
          )}
          <Col>
            <Container css={{ marginTop: '100px' }}>
              <Text h1 css={{ fontFamily: '$body' }}>{game.name}</Text>
              {/* Map out game genres if available */}
              {game.genres
              && game.genres.map((genre) => (
                <Button
                  type="button"
                  flat
                  color="secondary"
                  key={genre.id}
                  css={{
                    margin: '$2',
                    padding: '$1',
                    borderRadius: '$xs'
                  }}
                >
                  <Link to={`/games/genres/${genre.name}`}>
                    <Text>{genre.name} &nbsp;</Text>
                  </Link>
                </Button>
              ))}
              {releaseDate
              && (
                <>
                  <Text h4>Release date:</Text>
                  <Text> {releaseDate}</Text>
                </>)}
              {game.summary
              && (
                <>
                  <Text h4>Summary:</Text>
                  <Text>{game.summary}</Text>
                </>)}
              {showReviewForm && (
                <ReviewForm
                  setShowReviewForm={setShowReviewForm}
                  showReviewForm={showReviewForm}
                  game={game}
                />
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GameSummary;
