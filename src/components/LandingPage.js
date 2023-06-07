import React from 'react';
import { Image, Container } from '@nextui-org/react';
import Header from './Header';
import Footer from './Footer';
import heroImage from '../assets/img/hero-img.png';
// import { OuterWrapper, InnerWrapper } from './StyledComponents';
import GamesDisplay10 from './GamesDisplay10';

const LandingPage = () => {
  return (
    <Container md>
      <Header />
      <main>
        <section className="hero">
          <Image src={heroImage} alt="hero image" />
        </section>
        <GamesDisplay10 />
        <section className="featured">FEATURED</section>
        <section className="new">NEW GAMES</section>
        <section className="popular">POPULAR</section>
      </main>
      <Footer />
    </Container>
  );
};

export default LandingPage;
