import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Game = () => {
  const { slug, id } = useParams();
  const [game, setGame] = useState({});

  /* Slug of the game */
  console.log(slug);
  /* id of the game */
  console.log(id);

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
  }, []);

  return (
    <section>
      <h1>{game.name}</h1>
      <p>{game.summary}</p>
    </section>
  );
};

export default Game;
