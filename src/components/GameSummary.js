/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable-next-line */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
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
  const accessToken = useSelector((store) => store.user.accessToken);
  const [isLoading, setIsLoading] = useState(true);
  const [coverUrl, setCoverUrl] = useState(null);

  const timestamp = game.first_release_date;
  const date = new Date(timestamp * 1000);
  const releaseDate = date.toLocaleDateString();
  const handleShowReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  useEffect(() => {
    if (game?.cover?.url) {
      setCoverUrl(game.cover.url.replace('t_thumb', 't_cover_big'));
      setIsLoading(false);
    }
  }, [game]);

  const handleAddFavorite = () => {
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

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading state if the cover URL is still loading
  }

  return (
    <section>
      <Container
        md
        width="100%"
        gap={0}
        css={{ marginTop: '-100px', zIndex: '$max' }}
      >
        <Row gap={1}>
          {/* Check if game has a cover image */}
          {coverUrl && (
            <Col>
              <Image
                src={coverUrl}
                alt={`Cover art of the game ${game.name}`}
                width={220}
                height={380}
                objectFit="cover"
              />
              <Container>
                <Spacer y={0.5} />
                <Button
                  size="lg"
                  disabled={!accessToken}
                  onPress={handleShowReviewForm}
                  css={{ margin: '0 auto' }}
                >
                  Write a review
                </Button>
                <Spacer y={1} />
                <Button
                  size="lg"
                  disabled={!accessToken}
                  onPress={handleAddFavorite}
                  css={{ margin: '0 auto' }}
                >
                  ❤️ Add to favorites
                </Button>
                <Spacer y={0.5} />
                <Button
                  size="lg"
                  disabled={!accessToken}
                  onPress={handleAddFavorite}
                  css={{ margin: '0 auto' }}
                >
                  Remove from favorites
                </Button>
              </Container>
            </Col>
          )}
          <Col>
            <Container css={{ marginTop: '100px' }}>
              <h1>{game.name}</h1>
              {/* Map out game genres if available */}
              {game.genres &&
                game.genres.map((genre) => (
                  <Button
                    key={genre.id}
                    css={{
                      backgroundColor: '$purple400',
                      fontSize: '$sm',
                      fontWeight: '$bold',
                      margin: '$2',
                      padding: '$1'
                    }}
                  >
                    <Link to={`/games/genres/${genre.name}`}>
                      {genre.name} &nbsp;
                    </Link>
                  </Button>
                ))}
              {/* Show release date and summary if they are not undefined */}
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
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GameSummary;
