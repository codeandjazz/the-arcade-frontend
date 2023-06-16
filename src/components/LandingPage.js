/* eslint-disable max-len */
/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Image, Container, Text, css, Spacer } from '@nextui-org/react';
import { user } from '../reducers/user';
import Header from './Header';
import Footer from './Footer';
import heroImage from '../assets/img/hero-img.jpg';
// import { OuterWrapper, InnerWrapper } from './StyledComponents';
import GamesDisplay10 from './GamesDisplay10';
import Reviews from './Reviews';
import { API_URL } from '../utils/urls';

const LandingPage = () => {
  const dispatch = useDispatch();
  // if local storage has a token, then update the store with the token
  if (localStorage.getItem('accessToken')) {
    const accessToken = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const createdAt = localStorage.getItem('createdAt');
    const reviews = localStorage.getItem('reviews');
    const playedGames = localStorage.getItem('playedGames');
    // const favorites = localStorage.getItem('favorites');
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
    <Container>
      <Header />
      <Text blockquote css={{ textAlign: 'center', marginTop: '2rem', fontFamily: '$sans', fontWeight: '400' }}>
        Welcome to the Arcade.
      </Text>
      <Container
        css={{
          position: 'relative',
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          ) ,url(${heroImage})`,
          height: '80vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem'
        }}
      >
        <Text
          h1
          css={{
            textAlign: 'center',
            color: '#f5e6fe',
            zIndex: 1,
            fontFamily: '$body'
          }}
        >
          Track games you&apos;ve played.
        </Text>
        <Spacer y={0.5} />
        <Text
          h1
          css={{
            textAlign: 'center',
            color: '#f5e6fe',
            zIndex: 1,
            fontFamily: '$body'
          }}
        >
          Save those you want to play.
        </Text>
        <Spacer y={0.5} />
        <Text
          h1
          css={{
            textAlign: 'center',
            color: '#f5e6fe',
            zIndex: 1,
            fontFamily: '$body'
          }}
        >
          Tell your friends what&apos;s awesome.
        </Text>
      </Container>
      <GamesDisplay10 />
      <Reviews />
      <Footer />
    </Container>
  );
};

export default LandingPage;
