/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
  const accessToken = useSelector((store) => store.user.accessToken);
  useEffect(() => {
    if (accessToken) {
      // If there is an accessToken in the store, hydrate the store with values from localStorage
      const storedAccessToken = localStorage.getItem('accessToken');
      const storedUsername = localStorage.getItem('username');
      const storedUserId = localStorage.getItem('userId');
      const storedCreatedAt = localStorage.getItem('createdAt');
      const storedReviews = localStorage.getItem('reviews');
      // Update the Redux store with the values from localStorage
      dispatch(
        user.actions.setAccessToken(storedAccessToken)
      );
      dispatch(
        user.actions.setUsername(storedUsername)
      );
      dispatch(
        user.actions.setUserId(storedUserId)
      );
      dispatch(
        user.actions.setCreatedAt(storedCreatedAt)
      );
      dispatch(
        user.actions.setReviews(storedReviews)
      );
    }
  }, [accessToken, dispatch])
  const { username, user_id } = useSelector((store) => store.user);
  return (
    <>
      <Navbar />
      <Hero />
      {!accessToken && (<SignUp buttonText="Get started- it's free!" showIcon={false} />)}
      {accessToken && (<p>Welcome back, <Link to={`/users/${user_id}`}>{username}</Link>.</p>)}
      <GamesDisplay10 />
      <Reviews />
      <Footer />
    </>
  );
}

export default LandingPage;
