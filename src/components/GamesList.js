/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

// API URL
import { API_URL } from 'utils/urls';

import { useParams, Link } from 'react-router-dom';

// image
import defaultImg from '../assets/img/Ninos_Logo_bl1.png';

// components
import Header from './Header';
import Navbar from './Navbar';

const GameCard = styled.div`
background-color: white;
`

const GamesDisplay = styled.section`
display: flex;
flex-direction: column;
`

const GamesList = () => {
  // Fetch the games from the API when the component mounts
  const [storedGames, setStoredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // Sort by name, rating, etc.
  // For example, /games/genres/action?sortBy=rating
  const [sort, setSort] = useState('');
  const [genreQuery, setGenreQuery] = useState('');
  const [storedGenres, setStoredGenres] = useState([]);
  const PAGE_SIZE = 20;
  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Get the games from the API
        const response = await fetch(API_URL(`games?genre=${genreQuery}&sort=${sort}&page=${currentPage}`));
        const data = await response.json();
        if (data.success) {
          const { games, total } = data.response;
          // Store the games in state
          setStoredGames(games);
          console.log(games);
          setTotalPages(Math.ceil(total / PAGE_SIZE))
        } else {
          console.log(data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, [genreQuery, sort, currentPage]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Get the genres from the API
        const response = await fetch(API_URL('/genres'));
        const data = await response.json();
        if (data.success) {
          const genres = data.response.map((genre) => ({ name: genre }));
          // Store the genres in state
          setStoredGenres(genres);
        } else {
          console.log(data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenres();
  }, []);

  const handleGenre = (genreOption) => {
    setGenreQuery(genreOption);
  };

  const handleSort = (sortOption) => {
    setSort(sortOption);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClearSelection = () => {
    setGenreQuery('');
    setSort('');
  };

  const sortOptions = {
    // eslint-disable-next-line quote-props
    'releasedAsce': 'Oldest first',
    // eslint-disable-next-line quote-props
    'releasedDesc': 'Newest first',
    '': 'Sort by release date'
  };

  const selectedSortText = sortOptions[sort];

  return (
    <>
      <Header />
      <Navbar />
      <article>
        <p>All our games
        </p>
        <div>
          <p>
                Browse and explore a wide range of exciting arcade games. Use the filters
                to narrow down your search by genre and release date. Click on a game card
                to view more details and immerse yourself in the world of arcade gaming.
          </p>
        </div>
        <section>
          <div className="dropdown">
            <button
              type="button"
              // onClick={toggleDropdown}
              className="dropbtn">
              {genreQuery === '' ? 'All genres' : `${genreQuery} games`}
            </button>
            <div id="myDropdown" className="dropdown-content">
              {(genre) => (
                <button
                  key={genre.name}
                  type="button"
                  onClick={() => handleGenre(genre.name)}>
                  {genre.name}
                </button>
              )}
            </div>
          </div>
          <div className="dropdown">
            <button
              type="button"
              // onClick={toggleDropdown}
              className="dropbtn">
              {selectedSortText}
            </button>
            <div id="myDropdown" className="dropdown-content">
              <button
                type="button"
                onClick={() => handleSort('releasedAsce')}>
                  Oldest first
              </button>
              <button
                type="button"
                onClick={() => handleSort('releasedDesc')}>
                  Newest first
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClearSelection}>
          Clear filters
          </button>
        </section>
        <GamesDisplay>
          {loading || storedGames === undefined ? (
            <p>Loading...</p>
          ) : (
            storedGames.map((game, index) => (
            // eslint-disable-next-line no-underscore-dangle
              <div key={game._id}>
                <Link to={`/games/${game.slug}/${game._id}`}>
                  <GameCard>
                    {game.cover && game.cover.url ? (
                      <img
                        width={100}
                        src={game.cover.url}
                        alt="game cover" />
                    ) : (
                      <img
                        width={100}
                        src={defaultImg}
                        alt="game cover" />
                    )}
                    <div>
                      <p>{game.name}</p>
                      {game.genres && game.genres.map((genre) => (
                        <p
                          key={genre.id}>
                          {genre.name} &nbsp;
                        </p>
                      ))}
                    </div>
                  </GameCard>
                </Link>
              </div>
            ))
          )}
          {/* <Pagination total={totalPages} initialPage={currentPage} onChange={handlePageChange} /> */}
        </GamesDisplay>
      </article>
    </>
  );
}

export default GamesList;
