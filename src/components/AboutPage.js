/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable max-len */
import React from 'react';

// components
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const AboutUs = () => {
  return (
    <article>
      <Navbar />
      <p>
        About this website
      </p>
      <p>
        Start your arcade gaming adventure now and embark on an unforgettable
        journey through the world of classic and modern arcade games!
      </p>
      <p>
        Get ready for endless fun and nostalgia as you discover new games and
        revisit old favorites. Create an account to enjoy community features
        such as reviewing games, adding them to your favorites, and more!
      </p>
      {/* <p>
        As an extra touch, we&apos;re proud to present AI-generated visuals in
        the headers for each game. We hope you enjoy them as much as we do!
      </p> */}
      <section>
        {/* Collapse */}
        <p>
            We used React, React Router, and Next.ui to build the front-end of
            our application.
        </p>
        <p>
            We used the MERN stack to build the back-end of our application -
            MongoDB, Express, React, and Node.js. All the game data we used is
            from the API provided by:
        </p>
        <Link to="https://www.igdb.com" target="_blank" rel="noreferrer">
            IGDB.com
        </Link>
        <p>We&apos;d love it if you reported any bugs to us on:</p>
        <a
          href="https://github.com/codeandjazz/the-arcade-frontend/issues/new"
          target="_blank"
          rel="noreferrer"
        >
            Github Issues
        </a>
      </section>
      <div className="footer_container">
        <div className="footer_content">
          <p>Nino Aquilon</p>
          <p>codeandjazz</p>
          <a href="https://github.com/TessAquilon" target="_blank" rel="noreferrer">
            Github
          </a>
        </div>
        <div className="footer_content">
          <p>Daniel Brobäck</p>
          <p>dannebrob</p>
          <p>Making ideas come alive on the internet</p>
          <a href="https://github.com/dannebrob" target="_blank" rel="noreferrer">
            Github
          </a>
        </div>
      </div>
      <Footer />
    </article>
  );
};

export default AboutUs;
