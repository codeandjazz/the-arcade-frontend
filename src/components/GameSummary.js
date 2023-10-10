/* eslint-disable*/
import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

// API URL
import { API_URL } from 'utils/urls';

// components
import ReviewForm from './ReviewForm';

const GameSummary = ({ game }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const accessToken = useSelector((store) => store.user.accessToken);
  const [isLoading, setIsLoading] = useState(true);
  const [coverUrl, setCoverUrl] = useState(null);
  const [gameId, setGameId] = useState();

  const timestamp = game.first_release_date;
  const date = new Date(timestamp * 1000);
  const releaseDate = date.toLocaleDateString();
  const handleShowReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  useEffect(() => {
    if (game?.cover?.url) {
      console.log('Original URL:', game.cover.url);
      setCoverUrl(game?.cover?.url.replace('t_thumb', 't_cover_big'));
      console.log('Modified URL:', coverUrl);
      setIsLoading(false);
      setGameId(game._id);
      console.log(`Game Id: ${game._id}`)
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
        {/* Check if game has a cover image */}
      {coverUrl && (
          <div>
            <img
              src={coverUrl}
              alt={`Cover art of the game ${game.name}`}
              width={220}
              height={380}
            />
          </div>
        )}
        {accessToken && (
            <div>
              <button
                type="button"
                disabled={!accessToken}
                onClick={handleShowReviewForm}
              >
                  Review this game
              </button>
              <button
                type="button"
                disabled={!accessToken}
                onClick={handleAddFavorite}
              >
                  Add to favorites
              </button>
              <button
                type="button"
                disabled={!accessToken}
                onClick={handleAddFavorite}
              >
                  Remove from favorites
              </button>
            </div>
        )}
            {!accessToken && <p>Login or sign up to review, add to favorites and more.</p>}
        <div>
          <h2>{game.name}</h2>
          {/* Map out game genres if available */}
          {game.genres &&
                game.genres.map((genre) => (
                  <span>
                      {genre.name} &nbsp;
                    </span>
                ))}
          {releaseDate ? (<p>Release date: {releaseDate}</p>) : (<p>Release date: Unknown</p>)}
          {game.summary ? (<p>{game.summary}</p>) : (<p>Game summary not available</p>)}
          {showReviewForm && (
            <ReviewForm
              setShowReviewForm={setShowReviewForm}
              showReviewForm={showReviewForm}
              game={game}
            />
          )}
        </div>
    </section>
  );
};

export default GameSummary;
