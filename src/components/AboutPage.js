/* eslint-disable max-len */
import React from 'react';
import { Text, Container, Collapse, Link } from '@nextui-org/react';
import Header from './Header';

const AboutUs = () => {
  return (
    <Container md>
      <Header />
      <Text h2>About this website</Text>
      <Text>Hi! We are two passionate students from a coding bootcamp who teamed up to bring you the ultimate arcade gaming website.
         Get ready for endless fun and nostalgia as you discover new games and revisit old favorites.
        Create an account to enjoy community features such as reviewing games, adding them to your personal collections, and more!
      </Text>
      <Text>
        Start your arcade gaming adventure now and embark on an unforgettable journey
        through the world of classic and modern arcade games!
      </Text>
      <Text>As an extra touch, we&apos;re proud to present AI-generated visuals in the headers for
        each game, providing a unique and visually stunning experience for our users.
      </Text>
      <Text h2>Tech</Text>
      <Collapse.Group>
        <Collapse title="Front-end">
          <Text>We used React, React Router, and Next.ui to build the front-end of our application.</Text>
        </Collapse>
        <Collapse title="Back-end">
          <Text>
            We used the MERN stack to build the back-end of our application - MongoDB, Express, React, and Node.js.
            All the game data we used is from <Link href="https://www.igdb.com" isExternal>IGDB.com</Link>.
          </Text>
        </Collapse>
        <Collapse title="Generative art">
          <Text>We owe the very fascinating header art to Open AI&apos;s generative art tool.</Text>
        </Collapse>
        <Collapse title="Found a bug?">
          <Text>
            We&apos;d love it if you reported any bugs to us on:
          </Text>
        </Collapse>
      </Collapse.Group>
    </Container>
  )
};

export default AboutUs;