/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';

import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import UserProfile from './UserProfile';
import defaultImg from '../assets/img/default-img.png';

import Navbar from './Navbar';
import Footer from './Footer';
import UserProfileReviews from './UserProfileReviews';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  const createdAt = useSelector((store) => store.user.createdAt);
  const [loading, setLoading] = useState(true);
  const [favoriteGames, setFavoriteGames] = useState([]);
  // Extract the year and month from the createdAt string
  const joinedDate = new Date(createdAt);
  const joinedYear = joinedDate.getFullYear();
  const joinedMonth = joinedDate.toLocaleString('default', { month: 'long' });

  // Get the user's favorite games
  useEffect(() => {
    const fetchFavoriteGames = async () => {
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
          console.log(favGames);
          setFavoriteGames(favGames);
        } else {
          console.log(data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavoriteGames();
  }, [accessToken]);

  // Check if there is no access token, and navigate to the home page
  if (!accessToken) {
    navigate('/');
    return null;
  }

  return (
    <>
      <Navbar />
      <section>
        <UserProfile />
        <p>
                    Joined in {joinedMonth} {joinedYear}
        </p>
        <h3>Favorite Games</h3>
        {loading && <p>Loading...</p>}
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={favoriteGames.length}
          infinite
          visibleSlides={1}
          hasMasterSpinner
        >
          <Slider>
            {favoriteGames.map((game) => (
              <Link to={`/games/${game.slug}/${game._id}`}>
                <Slide>
                  {game.cover && game.cover.url ? (
                    <Image
                      src={game.cover.url}
                      alt="game cover"
                      width={100}
                    />
                  ) : (
                    <Image
                      src={defaultImg}
                      alt="game cover"
                      width={100}
                    />
                  )}
                  <p>{game.name}</p>
                </Slide>
              </Link>
            ))}
          </Slider>
        </CarouselProvider>
        {!loading && favoriteGames.length === 0 && (
          <p
          >
                      No favorite games yet.
          </p>
        )}

        <UserProfileReviews />
      </section>
      <Footer />
    </>
  );
};

export default UserProfilePage;
