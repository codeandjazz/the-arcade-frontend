/* eslint-disable react/jsx-closing-bracket-location */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Image } from '@nextui-org/react';
import NotFoundImg from '../assets/img/not-found-404.jpg';
import GameSummary from './GameSummary';

import Header from './Header';

const Game = () => {
  const { slug, id } = useParams();
  const [game, setGame] = useState({});

  const fetchGameBasedOnId = async () => {
    try {
      const response = await fetch(`http://localhost:8080/games/${id}`);
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setGame(data.response);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGameBasedOnId();
    console.log(game);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Container width="100%" margin="0 auto">
        <Image // This could be a AI generated image based on the game name
          src={NotFoundImg}
          alt={game.name}
          css={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }}
        />
        <GameSummary game={game} />
      </Container>
    </>
  );
};

export default Game;
