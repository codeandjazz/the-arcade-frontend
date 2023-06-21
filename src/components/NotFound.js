/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import { Container, Text, Grid, css, textTransforms } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { useGlitch } from 'react-powerglitch';

import NotFound404 from '../assets/img/not-found-404.jpg';

const NotFound = () => {
  const glitch = useGlitch();

  return (
    // Add image as background and style h1 with glitch effect
    <Container
      className="404"
      css={{
        background: ` no-repeat center url(${NotFound404})`,
        height: '100vh'
      }}
    >
      <Grid.Container
        justify="center"
        alignItems="center"
        direction="column"
        css={{ height: '100vh' }}
      >
        <Grid ref={glitch.ref}>
          <Text h1 style={{ color: 'white' }}>
            Game over
          </Text>
        </Grid>
        <Text h2 css={{ color: 'White' }}>
          404 - Page not found
        </Text>

        <Link to="/" css={{ color: 'White' }}>
          Go home
        </Link>
      </Grid.Container>
    </Container>
  );
};

export default NotFound;
