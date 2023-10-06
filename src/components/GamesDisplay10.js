/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { API_URL } from 'utils/urls';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

import 'pure-react-carousel/dist/react-carousel.es.css';

import defaultImg from '../assets/img/Ninos_Logo_wh1.png';

const GamesDisplay10 = () => {
  const [storedGames, setStoredGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the games from the API when the component mounts
  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Get the games from the API
        const response = await fetch(API_URL('games'));
        const data = await response.json();
        const getRandomGames = (games, count) => {
          const shuffled = games.slice().sort(() => 0.5 - Math.random());
          return shuffled.slice(0, count);
        };
        if (data.success) {
          const games = data.response.games;
          console.log('this is games from gamesDisplay: ', games);
          // Get 10 random games
          const randomGames = getRandomGames(games, 6);
          console.log('this is randomGames from gamesDisplay: ', randomGames);
          // Store the games in state
          setStoredGames(randomGames);
        } else {
          console.log(data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, []);

  return (
    <article>
      <p>
        Featured games
      </p>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={storedGames.length}
          >
            <Slider>
              {storedGames.map((game, index) => (
                <Slide index={index} key={game._id}>
                  <div>
                    <Link to={`/games/${game._id}`}>
                      {game.cover && game.cover.url ? (
                        <img
                          src={game.cover.url}
                          alt="game cover"
                          width={70}
                        />
                      ) : (
                        <img
                          src={defaultImg}
                          alt="game cover"
                          width={70}
                        />
                      )}
                      <p>{game.name}</p>
                      {game.genres &&
                          game.genres.map((genre) => (
                            <p
                              key={genre.id}
                            >
                              {genre.name} &nbsp;
                            </p>
                          ))}
                    </Link>
                  </div>
                </Slide>
              ))}
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </CarouselProvider>
        )}
      </div>
    </article>
  );
};

export default GamesDisplay10;
