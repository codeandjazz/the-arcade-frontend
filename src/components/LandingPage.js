/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import styled from 'styled-components/macro';

// motion design
import { Fade } from 'react-awesome-reveal';

import { useDispatch } from 'react-redux';
import { user } from '../reducers/user';

// components
import Header from './Header';
import Footer from './Footer';
import GamesDisplay10 from './GamesDisplay10';
import Reviews from './Reviews';
import Navbar from './Navbar';

// image
import heroImage from '../assets/img/hero-img_generated.png';

// API URL
import { API_URL } from '../utils/urls';

const LandingPage = () => {
  const dispatch = useDispatch();
  // if local storage has a token, then update the store with the token
  if (sessionStorage.getItem('accessToken')) {
    const accessToken = sessionStorage.getItem('accessToken');
    const username = sessionStorage.getItem('username');
    const userId = sessionStorage.getItem('userId');
    const createdAt = sessionStorage.getItem('createdAt');
    const reviews = sessionStorage.getItem('reviews');
    const playedGames = sessionStorage.getItem('playedGames');
    // const favorites = sessionStorage.getItem('favorites');
    dispatch(
      user.actions.setAccessToken({
        accessToken,
        username,
        userId,
        createdAt,
        reviews,
        playedGames
        // favorites
      })
    );
  }

  const HeroImage = styled.div`
  position: relative;
  background-image: url(${heroImage});
  height: 80vh;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  `

  const H1 = styled.h1`
  font-size: 68px;
  line-height: 1.75;
  text-align: center;
  color: white;
  zIndex: 1;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #1B3DA6, 0 0 20px #1B3DA6, 0 0 25px #1B3DA6, 0 0 30px #1B3DA6, 0 0 35px #1B3DA6;
  // animation: glow 1s ease-in-out infinite alternate;
}

// @keyframes glow {
//   from {
//     text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6;
//   }
//   to {
//     text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0073e6, 0 0 40px #0073e6, 0 0 50px #0073e6, 0 0 60px #0073e6, 0 0 70px #0073e6;
//   }
// }
  `

  return (
    <>
      <Header />
      <Navbar />
      <HeroImage>
        <Fade
          duration={2000}>
          <H1>Track games you&apos;ve played.</H1>
          <H1>Save those you want to play.</H1>
          <H1>Tell your friends what&apos;s awesome.</H1>
        </Fade>
      </HeroImage>
      <GamesDisplay10 />
      <Reviews />
      <Footer />
    </>
  );
};

export default LandingPage;
