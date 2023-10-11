/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import styled from 'styled-components/macro';

import { useDispatch } from 'react-redux';
import { user } from '../reducers/user';

// components
import Footer from './Footer';
import GamesDisplay10 from './GamesDisplay10';
import Reviews from './Reviews';
import Navbar from './Navbar';
import SignUp from './SignUp';
import Hero from './Hero';

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
  return (
    <>
      <Navbar />
      <Hero />
      <SignUp buttonText="Get started- it's free!" showIcon={false} />
      <GamesDisplay10 />
      <Reviews />
      <Footer />
    </>
  );
}

export default LandingPage;
