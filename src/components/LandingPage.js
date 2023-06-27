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
      <Header />
      <Container md>
        <Text
          blockquote
          css={{
            textAlign: 'center',
            marginTop: '2rem',
            fontFamily: '$sans',
            fontWeight: '400'
          }}
        >
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
              fontSize: '2rem',
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
              fontSize: '2rem',
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
              fontSize: '2rem',
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
      </Container>
    </>
  );
};

export default LandingPage;
