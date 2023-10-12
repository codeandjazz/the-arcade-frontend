/* eslint-disable*/
import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import './GameSummary.css';

// API URL
import { API_URL } from 'utils/urls';

// components
import ReviewForm from './ReviewForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const GameSummary = ({ game }) => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const [isLoading, setIsLoading] = useState(true);
  const [coverUrl, setCoverUrl] = useState(null);
  const [gameId, setGameId] = useState();
  const [isFavorite, setIsFavorite] = useState(false);

  const timestamp = game.first_release_date;
  const date = new Date(timestamp * 1000);
  const releaseDate = date.toLocaleDateString();

  // Check if game is in user's favorites
    const checkIsFavorite = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            Authorization: accessToken
          }
        };
        const response = await fetch(API_URL('favoritegames'), options);
        const data = await response.json();
        if (data.success) {
          const favGames = data.response;
        const isGameInFavorites = favGames.some(favGame => favGame._id === game._id);
        setIsFavorite(isGameInFavorites);
        setIsLoading(false);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };


  useEffect(() => {
    if (game?.cover?.url) {
      console.log('Original URL:', game.cover.url);
      setCoverUrl(game?.cover?.url.replace('t_thumb', 't_cover_big'));
      console.log('Modified URL:', coverUrl);
      setIsLoading(false);
      setGameId(game._id);
      console.log(`Game Id: ${game._id}`)
    };
    // Check if the game is in the user's favorites
  if (accessToken) {
    checkIsFavorite();
  }
  }, [game, accessToken]);

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
          setIsFavorite(!isFavorite); // Update the isFavorite state when the game is added to favorites
        }
      });
  };

  if (isLoading) {
    return <p>Loading...</p>; // Render a loading state if the cover URL is still loading
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
              <ReviewForm game={game} />
              <button
                type="button"
                disabled={!accessToken}
                onClick={handleAddFavorite}
                className={isFavorite ? 'favorite-button favorite' : 'favorite-button'}
              >
                  <FontAwesomeIcon icon={faHeart} />
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
        </div>
    </section>
  );
};

export default GameSummary;
