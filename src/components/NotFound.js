/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import { Link } from 'react-router-dom';
import { useGlitch } from 'react-powerglitch';

import NotFound404 from '../assets/img/not-found-404.jpg';

const NotFound = () => {
  const glitch = useGlitch();

  return (
    // Add image as background and style h1 with glitch effect
    <article
      className="404"
      style={{
        background: ` no-repeat center url(${NotFound404})`,
        height: '100vh'
      }}
    >
      <section
      >
        <div ref={glitch.ref}>
          <h2>
            Game over
          </h2>
        </div>
        <h3>
          404 - Page not found
        </h3>

        <Link to="/" css={{ color: 'White' }}>
          Go home
        </Link>
      </section>
    </article>
  );
};

export default NotFound;
