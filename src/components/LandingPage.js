import React from 'react';
import { useDispatch } from 'react-redux';
import { Image, Container } from '@nextui-org/react';
import { user } from '../reducers/user';
import Header from './Header';
import Footer from './Footer';
import heroImage from '../assets/img/hero-img.png';
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
    <Container md>
      <Header />
      <main>
        <section className="hero">
          <Image src={heroImage} alt="hero image" />
        </section>
        <GamesDisplay10 />
        <Reviews />
        <section className="featured">FEATURED</section>
        <section className="new">NEW GAMES</section>
        <section className="popular">POPULAR</section>
      </main>
      <Footer />
    </Container>
  );
};

export default LandingPage;
