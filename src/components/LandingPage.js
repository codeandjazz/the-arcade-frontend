import React from 'react';
import Header from './Header';
import Footer from './Footer';
import GamesDisplay10 from './GamesDisplay10';
import { InnerWrapper, OuterWrapper } from './GlobalStyles';

const LandingPage = () => {
  return (
    <OuterWrapper>
      <InnerWrapper />
      <Header />
      <main>
        <section className="hero">HERO</section>
        <GamesDisplay10 />
        <section className="featured">FEATURED</section>
        <section className="new">NEW GAMES</section>
        <section className="popular">POPULAR</section>
      </main>
      <Footer />
      <InnerWrapper />
    </OuterWrapper>
  );
};

export default LandingPage;
