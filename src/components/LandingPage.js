import React from 'react';
import Header from './Header';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <section className="hero">HERO</section>
        <section className="featured">FEATURED</section>
        <section className="new">NEW GAMES</section>
        <section className="popular">POPULAR</section>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
