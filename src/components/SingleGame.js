/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable prefer-template */
/* eslint-disable object-shorthand */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios, { isCancel, AxiosError } from 'axios';
import NotFoundImg from '../assets/img/not-found-404.jpg';
import GameSummary from './GameSummary';
import { API_URL } from '../utils/urls';

// components
import Navbar from './Navbar';

const Game = () => {
  const { slug, id } = useParams();
  const [game, setGame] = useState({});
  const [prompt, setPrompt] = useState('');
  const [imageURL, setImage] = useState('');
  const [loading, setLoading] = useState(true);

  const createImg = async (imageDescription) => {
    const response = await axios.post(
      'https://the-arcade-backend-6426jh4m2a-no.a.run.app/create',
      {
        prompt: imageDescription
      }
    );
    setImage(response.data);
    console.log(imageURL);
    setLoading(false);
  };

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const fetchGameBasedOnId = async () => {
    try {
      const response = await fetch(
        `https://the-arcade-backend-6426jh4m2a-no.a.run.app/games/${id}`
      )
        // const response = await fetch(`${API_URL(`games/${id}`)}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.response);
          if (data.success) {
            setGame(data.response);
            console.log(game);
            setPrompt(data.response.name);
            setLoading(false);
          } else {
            console.log(data.message);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGameBasedOnId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (game.name) {
      createImg(game.name + 'retro video game');
    }
  }, [game]);
  return (
    <>
      <Navbar />
      <article>
        {loading && <p>Loading...</p>}
        {imageURL && (
          <img // This could be a AI generated image based on the game name
            src={imageURL}
            alt={game.name}
          />
        )}
        <GameSummary game={game} />
      </article>
    </>
  );
};

export default Game;
