/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

// motion design
import { Fade } from 'react-awesome-reveal';

// API URL
import { API_URL } from 'utils/urls';

// react paginate
import ReactPaginate from 'react-paginate';

import { useParams, Link } from 'react-router-dom';

// image
import defaultImg from '../assets/img/Ninos_Logo_bl1.png';

// components
import Navbar from './Navbar';

// styles
import './GamesList.css'

const GameCard = styled.div`
background-color: white;
`

const GamesDisplay = styled.section`
display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
`

const GamesList = () => {
  // Fetch the games from the API when the component mounts
  const [storedGames, setStoredGames] = useState([]);

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 20;

  const [sort, setSort] = useState('');
  const [genreQuery, setGenreQuery] = useState('');
  const [storedGenres, setStoredGenres] = useState([]);
  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Get the games from the API
        const response = await fetch(API_URL(`games?genre=${genreQuery}&sort=${sort}&page=${currentPage}`));
        const data = await response.json();
        if (data.success) {
          const { games, total } = data.response;
          // Access and modify the cover image URL
          games.forEach((game) => {
            if (game.cover && game.cover.url) {
              game.cover.url = game.cover.url.replace('t_thumb', 't_cover_big');
              console.log(`Game: ${game.name}`);
              console.log(`Modified Cover Image URL: ${game.cover.url}`);
            }
          });
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
            <label htmlFor="genreSelect">Select Genre:</label>
            <select
              id="genreSelect"
              value={genreQuery}
              onChange={(e) => handleGenre(e.target.value)}>
              <option value="">All genres</option>
              {storedGenres.map((genre) => (
                <option key={genre.name} value={genre.name}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div className="dropdown">
            <label htmlFor="sortSelect">Sort by:</label>
            <select
              id="sortSelect"
              value={sort}
              onChange={(e) => handleSort(e.target.value)}>
              <option value="">Select one...</option>
              <option value="releasedAsce">Oldest first</option>
              <option value="releasedDesc">Newest first</option>
            </select>
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
              <Fade
                duration={400}>
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
                          <span
                            key={genre.id}>
                            {genre.name} &nbsp;
                          </span>
                        ))}
                      </div>
                    </GameCard>
                  </Link>
                </div>
              </Fade>
            ))
          )}
        </GamesDisplay>
        <ReactPaginate
          containerClassName="pagination"
          pageClassName="page-item"
          activeClassName="active"
          initialPage={0}
          onPageChange={(event) => setCurrentPage(event.selected + 1)}
          pageCount={totalPages}
          breakLabel="..."
          previousLabel="previous"
          nextLabel="next" />;
      </article>
    </>
  );
}

export default GamesList;
