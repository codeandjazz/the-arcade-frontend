/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Image } from '@nextui-org/react';
import NotFoundImg from '../assets/img/not-found-404.jpg';
import GameSummary from './GameSummary';
import { API_URL } from '../utils/urls';

import Header from './Header';

const Game = () => {
  const { slug, id } = useParams();
  console.log(id);
  const [game, setGame] = useState({});

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
          } else {
            console.log(data.message);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  //   try {
  //     const response = await fetch(`${API_URL}games/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => console.log(data));

  //     // const data = await response.json();
  //     // console.log('this is data: ', data);
  //     //
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
        {game && <GameSummary game={game} />}
      </Container>
    </>
  );
};

export default Game;
