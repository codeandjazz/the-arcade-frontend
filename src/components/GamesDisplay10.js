/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './GamesDisplay10.css';

import { API_URL } from 'utils/urls';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';

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
          // Filter games with cover images
          const gamesWithOriginalCovers = storedGames.filter((game) => game.cover);
          // Access and modify the cover image URL
          gamesWithOriginalCovers.forEach((game) => {
            if (game.cover && game.cover.url) {
              game.cover.url = game.cover.url.replace('t_thumb', 't_cover_big');
              console.log(`Game: ${game.name}`);
              console.log(`Modified Cover Image URL: ${game.cover.url}`);
            }
          });
          console.log('this is games from gamesDisplay: ', games);
          // Get 10 random games
          const randomGames = getRandomGames(games, 20);
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
      <h3>
        Featured games
      </h3>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={storedGames.length}
            infinite
            isPlaying
            visibleSlides={4}
          >
            <Slider>
              {storedGames.map((game, index) => (
                <Slide index={index} key={game._id} className="games_slide">
                  <div className="games_container">
                    <Link to={`/games/${game._id}`}>
                      <Image
                        hasMasterSpinner
                      >
                        {game.cover && game.cover.url ? (
                          <img
                            src={game.cover.url}
                            alt="game cover"
                            width={100}
                          />
                        ) : (
                          <img
                            src={defaultImg}
                            alt="game cover"
                            height={100}
                          />
                        )}
                      </Image>
                      {/* <h4>{game.name}</h4>
                      {game.genres &&
                          game.genres.map((genre) => (
                            <p
                              key={genre.id}
                            >
                              {genre.name} &nbsp;
                            </p>
                          ))} */}
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
